import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import posthog from "posthog-js";
import { writings, BLOG_INDEX, type Writing } from "@/data/writings";
import { playHoverSound } from "@/lib/audio";
import SectionLabel from "./SectionLabel";
import DecryptText from "./DecryptText";

function WritingRow({ w, index, show }: { w: Writing; index: number; show: boolean }) {
  // bump the key on hover so DecryptText replays its scramble
  const [pass, setPass] = useState(0);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.45, delay: [0, 0.05, 0.09, 0.12][index] ?? 0.14, ease: [0.23, 1, 0.32, 1] }}
      style={{ borderTop: "1px solid var(--theme-border-faint)" }}
    >
      <a
        href={w.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          setPass((p) => p + 1);
          playHoverSound();
        }}
        onClick={() => posthog.capture("writing_clicked", { title: w.title })}
        className="writing-row relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr_auto] gap-x-4 md:gap-x-8 items-start px-4 py-7 -mx-4"
      >
        {/* index carries the order; meta sits above the title so the title leads */}
        <span className="font-mono tabular-nums pt-6" style={{ color: "var(--theme-text-faint)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.22em] tabular-nums mb-2.5" style={{ color: "var(--theme-text-label)" }}>
            {w.date}
            <span aria-hidden="true" style={{ color: "var(--theme-text-faint)" }}>·</span>
            {w.readTime} READ
          </span>
          <span className="writing-row__title block font-mono font-bold tracking-tight leading-snug mb-2" style={{ color: "var(--theme-text-bold)", fontSize: "clamp(1.05rem, 2vw, 1.35rem)" }}>
            {pass ? <DecryptText key={pass} text={w.title} trigger /> : w.title}
          </span>
          <span className="block font-mono leading-relaxed max-w-[60ch]" style={{ color: "var(--theme-text-muted)", fontSize: "13.5px" }}>
            {w.summary}
          </span>
        </span>
        <span
          className="writing-row__cta hidden md:flex self-center items-center gap-2 px-3 py-2 text-[10px] font-mono tracking-[0.25em] whitespace-nowrap"
          style={{ color: "var(--theme-text-mid)", border: "1px solid var(--theme-border-faint)" }}
        >
          READ <span className="writing-row__arrow inline-block" aria-hidden="true">-&gt;</span>
        </span>
      </a>
    </motion.li>
  );
}

export default function WritingsSection() {
  const ref = useRef(null);
  const show = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="writings" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="SEQ_06 // WRITINGS" />

        <ul ref={ref} className="max-w-5xl" style={{ borderBottom: "1px solid var(--theme-border-faint)" }}>
          {writings.map((w, i) => (
            <WritingRow key={w.url} w={w} index={i} show={show} />
          ))}
        </ul>

        <a
          href={BLOG_INDEX}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 mt-8 text-[10px] font-mono tracking-[0.25em]"
          style={{ color: "var(--theme-text-bold)", borderBottom: "1px solid var(--theme-btn-border)" }}
        >
          ALL_TRANSMISSIONS <span aria-hidden="true">-&gt;</span> BLOG.MAYNK.ME
        </a>
      </div>
    </section>
  );
}
