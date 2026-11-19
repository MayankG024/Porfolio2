import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

const SRC = "/hero/headshot.webp";
const MATTE = "/hero/headshot-matte.png"; // hand-traced subject alpha, keeps the blurred background out of the glyphs
const RAMP = " .-:=+*cxoakhbd#&%8@";
const NOISE = "01<>/\\[]{}#$%*+=";
const COLS = 78;

type Cell = { ch: string; a: number };

// ASCII portrait: the photo is rendered as glyphs; a spring-driven spotlight under the cursor reveals the real image.
export default function AsciiPortrait() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const gridRef = useRef<{ cells: Cell[]; cols: number; rows: number; cw: number; ch: number; color: string } | null>(null);
  const [ready, setReady] = useState(false);

  const radius = useSpring(0, { stiffness: 140, damping: 22 });
  const mx = useSpring(0, { stiffness: 320, damping: 32 });
  const my = useSpring(0, { stiffness: 320, damping: 32 });
  const hovering = useRef(false);
  const revealed = useRef(false);
  const pointer = useMotionValue({ x: -999, y: -999 });

  const setVar = (k: string, v: number) => imgRef.current?.style.setProperty(k, `${v}px`);
  useMotionValueEvent(radius, "change", (v) => setVar("--r", v));
  useMotionValueEvent(mx, "change", (v) => setVar("--mx", v));
  useMotionValueEvent(my, "change", (v) => setVar("--my", v));

  // Build the glyph grid from the photo; rebuilt on resize and theme change.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const img = new Image();
    img.src = SRC;
    const matte = new Image();
    matte.src = MATTE;
    let cancelled = false;

    const build = () => {
      if (cancelled || !img.complete || !img.naturalWidth || !matte.complete || !matte.naturalWidth) return;
      const { width, height } = wrap.getBoundingClientRect();
      if (!width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cw = width / COLS;
      const ch = cw / 0.6; // monospace glyph aspect
      const rows = Math.floor(height / ch);
      const sample = document.createElement("canvas");
      sample.width = COLS;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true })!;
      sctx.drawImage(img, 0, 0, COLS, rows);
      const data = sctx.getImageData(0, 0, COLS, rows).data;
      sctx.clearRect(0, 0, COLS, rows);
      sctx.drawImage(matte, 0, 0, COLS, rows);
      const alpha = sctx.getImageData(0, 0, COLS, rows).data;

      const dark = document.documentElement.classList.contains("light") === false;
      const color = getComputedStyle(document.documentElement).getPropertyValue("--theme-text").trim() || "#e8e8e8";
      const lum = (i: number) => (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      // stretch contrast using the subject's own 4th–96th percentile so the face gets the full glyph range
      const inside: number[] = [];
      for (let i = 0; i < alpha.length; i += 4) if (alpha[i] > 128) inside.push(lum(i));
      inside.sort((a, b) => a - b);
      const lo = inside[Math.floor(inside.length * 0.04)] ?? 0;
      const hi = inside[Math.floor(inside.length * 0.96)] ?? 1;
      const cells: Cell[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = (y * COLS + x) * 4;
          const l = Math.min(1, Math.max(0, (lum(i) - lo) / Math.max(0.05, hi - lo)));
          const m = alpha[i] / 255;
          let d = dark ? l : 1 - l;
          // subject keeps a density floor so dark hair still reads; background fades to a faint field
          d = m * Math.max(d, 0.14) + (1 - m) * d * 0.1;
          const idx = Math.min(RAMP.length - 1, Math.floor(d * RAMP.length));
          cells.push({ ch: RAMP[idx], a: 0.25 + 0.75 * d });
        }
      }
      gridRef.current = { cells, cols: COLS, rows, cw, ch, color };

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${ch * 0.92}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = color;
      cells.forEach((c, k) => {
        if (c.ch === " ") return;
        ctx.globalAlpha = c.a;
        ctx.fillText(c.ch, (k % COLS) * cw, Math.floor(k / COLS) * ch);
      });
      ctx.globalAlpha = 1;
      setReady(true);
    };

    img.onload = build;
    matte.onload = build;
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    // fonts may land after first paint
    document.fonts?.ready.then(build);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [theme]);

  // Subtle glyph flicker + scramble near the cursor. Paused offscreen, in hidden tabs and for reduced motion.
  useEffect(() => {
    if (reduce || !ready) return;
    const canvas = canvasRef.current!;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let dirty: number[] = [];

    const paint = (ctx: CanvasRenderingContext2D, k: number, ch: string, a: number) => {
      const g = gridRef.current!;
      const x = (k % g.cols) * g.cw;
      const y = Math.floor(k / g.cols) * g.ch;
      ctx.clearRect(x, y, g.cw, g.ch);
      if (ch === " ") return;
      ctx.globalAlpha = a;
      ctx.fillText(ch, x, y);
    };

    const id = window.setInterval(() => {
      const g = gridRef.current;
      if (!visible || document.hidden || !g) return;
      const ctx = canvas.getContext("2d")!;
      ctx.font = `${g.ch * 0.92}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = g.color;
      dirty.forEach((k) => paint(ctx, k, g.cells[k].ch, g.cells[k].a));
      dirty = [];
      const n = g.cells.length;
      const pick = (k: number) => {
        if (g.cells[k].ch === " ") return;
        dirty.push(k);
        paint(ctx, k, NOISE[(Math.random() * NOISE.length) | 0], g.cells[k].a);
      };
      for (let i = 0; i < n * 0.008; i++) pick((Math.random() * n) | 0);
      const p = pointer.get();
      if (hovering.current && p.x > 0) {
        const ring = radius.get() + 20;
        for (let i = 0; i < 40; i++) {
          const t = Math.random() * Math.PI * 2;
          const r = ring - Math.random() * 30;
          const cx = Math.floor((p.x + Math.cos(t) * r) / g.cw);
          const cy = Math.floor((p.y + Math.sin(t) * r) / g.ch);
          if (cx >= 0 && cy >= 0 && cx < g.cols && cy < g.rows) pick(cy * g.cols + cx);
        }
      }
      ctx.globalAlpha = 1;
    }, 120);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [reduce, ready, pointer, radius]);

  // One-time intro sweep that hints the portrait is interactive.
  useEffect(() => {
    if (!ready || reduce) return;
    const wrap = wrapRef.current!;
    const { width, height } = wrap.getBoundingClientRect();
    mx.jump(0); // intro glow blooms from the left edge
    my.jump(height * 0.45);
    let ctrl: ReturnType<typeof animate> | undefined;
    const t = window.setTimeout(() => {
      if (hovering.current) return;
      ctrl = animate(0, 1, {
        duration: 1.6,
        ease: [0.77, 0, 0.175, 1],
        onUpdate: (v) => {
          if (hovering.current || revealed.current) return;
          radius.set(Math.sin(v * Math.PI) * width * 0.45);
        },
      });
    }, 1400);
    return () => {
      clearTimeout(t);
      ctrl?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reduce]);

  const localPoint = (e: React.PointerEvent) => {
    const rect = wrapRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height };
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const p = localPoint(e);
    pointer.set(p);
    mx.set(p.x);
    my.set(p.y);
  };

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const p = localPoint(e);
    hovering.current = true;
    mx.jump(p.x);
    my.jump(p.y);
    radius.set(p.w * 0.5);
  };

  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = false;
    pointer.set({ x: -999, y: -999 });
    if (!revealed.current) radius.set(0);
  };

  // Touch / keyboard: toggle a full reveal.
  const toggle = () => {
    const rect = wrapRef.current!.getBoundingClientRect();
    revealed.current = !revealed.current;
    mx.set(rect.width / 2);
    my.set(rect.height * 0.4);
    radius.set(revealed.current ? Math.hypot(rect.width, rect.height) : 0);
  };

  return (
    <figure className="relative w-full select-none">
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-label="Portrait of Mayank Gupta. Press to decode from ASCII to photo."
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onClick={(e) => {
          if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") toggle();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="ascii-portrait corner-bracket relative aspect-[9/10] overflow-hidden outline-none cursor-crosshair"
        style={{ border: "1px solid var(--theme-border-faint)", background: "var(--theme-bg)" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <img
          ref={imgRef}
          src={SRC}
          alt=""
          width={800}
          height={888}
          fetchPriority="high"
          decoding="async"
          className="ascii-portrait__photo absolute inset-0 w-full h-full object-cover"
        />
        <noscript>
          <img src={SRC} alt="Mayank Gupta" className="absolute inset-0 w-full h-full object-cover" />
        </noscript>
      </div>

    </figure>
  );
}
