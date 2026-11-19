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
      initial={{ opacity: 0, y: 12 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
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
        className="writing-row grid grid-cols-[1fr_auto] md:grid-cols-[7.5rem_1fr_auto] gap-x-6 gap-y-2 items-baseline px-4 py-6 -mx-4"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] tabular-nums col-span-2 md:col-span-1" style={{ color: "var(--theme-text-label)" }}>
          {w.date}
        </span>
        <span className="min-w-0">
          <span className="block font-mono font-bold tracking-tight mb-1.5" style={{ color: "var(--theme-text-bold)", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
            {pass ? <DecryptText key={pass} text={w.title} trigger /> : w.title}
          </span>
          <span className="block font-mono leading-relaxed max-w-[62ch]" style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}>
            {w.summary}
          </span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] whitespace-nowrap flex items-center gap-3" style={{ color: "var(--theme-text-label)" }}>
          {w.readTime}
          <span className="writing-row__arrow inline-block" aria-hidden="true">-&gt;</span>
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
        <SectionLabel text="SEQ_07 // SYS.WRITINGS" />

        <ul ref={ref} className="max-w-4xl" style={{ borderBottom: "1px solid var(--theme-border-faint)" }}>
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
