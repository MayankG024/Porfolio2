import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/process";
import SectionLabel from "./SectionLabel";

const STAGGER = [0, 0.05, 0.09, 0.12];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const onScreen = useInView(ref);

  return (
    <section id="process" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="SEQ_04 // SYS.HOW_I_BUILD" />

        <div ref={ref} style={{ "--packet-state": onScreen ? "running" : "paused" } as React.CSSProperties}>
          {/* connector with a single travelling packet (desktop) */}
          <div className="hidden lg:block packet-track mb-6 mx-[12.5%]" aria-hidden="true">
            <span className="packet-track__dot" />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.code}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: STAGGER[i] ?? i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                className="terminal-border card-hover p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono tracking-[0.3em] tabular-nums" style={{ color: "var(--theme-text-label)" }}>
                    STEP_{step.code}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--theme-text-dim)" }} aria-hidden="true">
                    {step.glyph}
                  </span>
                </div>
                <h3 className="font-mono font-bold tracking-[0.08em] mb-3" style={{ color: "var(--theme-text-bold)", fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)" }}>
                  {step.title}
                </h3>
                <p className="font-mono leading-relaxed" style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}>
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
