import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useMotionValueEvent, useReducedMotion, useScroll, useTransform, useVelocity } from "framer-motion";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface ScrollRailProps {
  scrollY: number;
}

const SECTIONS = [
  { id: "identity", seq: "SEQ_01", label: "INIT" },
  { id: "modules", seq: "SEQ_02", label: "SKILLS" },
  { id: "output", seq: "SEQ_03", label: "MY_WORK" },
  { id: "logs", seq: "SEQ_04", label: "EXPERIENCE" },
  { id: "eval", seq: "SEQ_05", label: "EVAL" },
  { id: "writings", seq: "SEQ_06", label: "WRITINGS" },
  { id: "contact", seq: "SEQ_07", label: "CONNECT" },
];

const RAIL_H = 320;

// Line-drawn Starship riding the progress line, always vertical. Scrolling up fires the engines, scrolling down
// deploys the flaps (belly-flop descent). Clicking it climbs, then turns into the galaxy core with an "AD ASTRA!" call-out.
function Probe() {
  const { scrollYProgress, scrollY } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, RAIL_H]);
  const velocity = useVelocity(scrollY);
  const [dir, setDir] = useState<"up" | "down" | "idle">("idle");
  const [launching, setLaunching] = useState(false);
  const [scope, animateEl] = useAnimate();
  const reduce = useReducedMotion();

  useMotionValueEvent(velocity, "change", (v) => {
    const next = v < -40 ? "up" : v > 40 ? "down" : "idle";
    setDir((d) => (d === next ? d : next));
  });

  const busy = useRef(false);
  const launch = async () => {
    if (busy.current) return;
    busy.current = true;
    setLaunching(true);
    playClickSound();
    if (reduce) {
      await new Promise((r) => setTimeout(r, 1100));
      setLaunching(false);
      busy.current = false;
      return;
    }
    const el = scope.current as HTMLElement;
    const r = el.getBoundingClientRect();
    // vertical climb first (kept on screen), then a gravity turn toward the galaxy core at the viewport centre
    const climb = -Math.min(180, Math.max(60, r.top - 80));
    const dx = window.innerWidth / 2 - (r.left + r.width / 2);
    const dy = window.innerHeight / 2 - (r.top + r.height / 2);
    const heading = (Math.atan2(dx, -(dy - climb)) * 180) / Math.PI;
    await animateEl(
      el,
      {
        x: [0, 0, 0, dx],
        y: [0, climb * 0.35, climb, dy],
        rotate: [0, 0, heading, heading],
        scale: [1, 1, 0.95, 0.12],
        opacity: [1, 1, 1, 0],
      },
      // ~3s: lift-off, climb to apex while turning, then accelerate into the core
      { duration: 2.9, times: [0, 0.22, 0.5, 1], ease: ["easeIn", "easeOut", [0.55, 0, 0.9, 0.4]] },
    );
    setLaunching(false);
    await animateEl(el, { x: 0, y: 0, rotate: 0 }, { duration: 0 });
    await animateEl(el, { opacity: 1, scale: 1 }, { duration: 0.35, delay: 0.4, ease: [0.23, 1, 0.32, 1] });
    busy.current = false;
  };

  return (
    <motion.div className="absolute" style={{ top: -26, left: "calc(50% - 26px)", y }}>
      <AnimatePresence>
        {launching && (
          <motion.span
            initial={{ opacity: 0, x: -4, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-[44px] top-4 whitespace-nowrap px-2 py-1 font-mono text-[10px] tracking-[0.3em] pointer-events-none"
            style={{ color: "var(--theme-text-bold)", background: "var(--theme-nav-bg)", border: "1px solid var(--theme-border)" }}
          >
            AD ASTRA!
          </motion.span>
        )}
      </AnimatePresence>
      <button
        ref={scope}
        type="button"
        onClick={launch}
        aria-label="Launch the Starship"
        className="starship block cursor-pointer"
        data-dir={dir}
        data-thrust={dir === "up" || launching}
      >
        <svg width="16" height="64" viewBox="0 0 12 48" fill="none" stroke="var(--theme-text-mid)" strokeWidth="0.85" strokeLinejoin="round" aria-hidden="true">
          {/* engine plume (scroll up / launch) */}
          <path className="starship__plume" d="M4.2 37.2C4 40.5 5 44.6 6 47.6c1-3 2-7.1 1.8-10.4Z" fill="var(--theme-text-mid)" stroke="none" />
          {/* ship body */}
          <path d="M6 0.6C4.4 2.2 3.8 4.2 3.8 6.4V17h4.4V6.4C8.2 4.2 7.6 2.2 6 0.6Z" fill="var(--theme-bg)" />
          {/* forward flaps (deploy on scroll down) */}
          <path className="starship__flap starship__flap--l" d="M3.8 5.6 2.3 8.4l1.5.4" />
          <path className="starship__flap starship__flap--r" d="M8.2 5.6l1.5 2.8-1.5.4" />
          {/* aft flaps */}
          <path className="starship__flap starship__flap--l starship__flap--aft" d="M3.8 12.6 1.6 16.6l2.2.3" />
          <path className="starship__flap starship__flap--r starship__flap--aft" d="M8.2 12.6l2.2 4-2.2.3" />
          {/* hot-stage ring + booster with grid fins */}
          <path d="M3.8 17.8h4.4" />
          <rect x="3.8" y="18.6" width="4.4" height="15.4" fill="var(--theme-bg)" />
          <path d="M3.8 19.6H2.4v1.8h1.4M8.2 19.6h1.4v1.8H8.2" />
          {/* engine bells */}
          <path d="M4.4 34v1.6l-.5 1.2M6 34v2.8M7.6 34v1.6l.5 1.2" stroke="var(--theme-text-dim)" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function ScrollRail({ scrollY }: ScrollRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight / 3;

    let active = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          active = i;
        }
      }
    }
    setActiveIndex(active);

    // Calculate continuous scroll progress
    const totalHeight = document.documentElement.scrollHeight - viewportHeight;
    if (totalHeight > 0) {
      setScrollProgress(window.scrollY / totalHeight);
    }
  }, [scrollY]);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      playClickSound();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
      <div className="relative flex flex-col items-center py-4" style={{ height: RAIL_H }}>
        
        {/* Track Line (inactive) */}
        <div 
          className="absolute w-[1px] h-full"
          style={{
            background: "var(--theme-border-faint)",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0
          }}
        />

        {/* Fill Line (active progress) */}
        <div 
          className="absolute w-[1px] transition-[height] duration-100 ease-out"
          style={{
            background: "var(--theme-dot-timeline)",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`
          }}
        />

        <Probe />

        {/* Timeline Dots */}
        <div className="h-full flex flex-col justify-between items-center relative z-10">
          {SECTIONS.map((section, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;

            return (
              <div 
                key={section.id} 
                className="group relative flex items-center justify-center cursor-pointer"
                onClick={() => handleDotClick(section.id)}
                onMouseEnter={playHoverSound}
                style={{ width: "24px", height: "24px" }}
              >
                {/* Visual Dot */}
                <div 
                  className="w-1.5 h-1.5 rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out"
                  style={{
                    background: isActive 
                      ? "var(--theme-text-bold)" 
                      : isPassed 
                        ? "var(--theme-dot)" 
                        : "var(--theme-text-faint)",
                    transform: isActive ? "scale(1.6)" : "scale(1)",
                    boxShadow: isActive ? "0 0 8px var(--theme-dot)" : "none",
                  }}
                />

                {/* Cyberpunk HUD Tooltip */}
                <div 
                  className="absolute left-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-[opacity,transform] duration-200 transform translate-x-[-8px] group-hover:translate-x-0 whitespace-nowrap py-1 px-2.5 rounded-sm border"
                  style={{
                    background: "var(--theme-card-bg-alpha)",
                    borderColor: "var(--theme-border)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span className="font-mono text-[9px] tracking-[0.15em] block leading-none" style={{ color: "var(--theme-text-label)" }}>
                    {section.seq}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.05em] block mt-1 uppercase" style={{ color: "var(--theme-text-bold)" }}>
                    {section.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
