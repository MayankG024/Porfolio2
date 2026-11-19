import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DecryptText from "./DecryptText";

// The "SEQ_0N // SYS.X" header used by every section; decrypts once when it scrolls into view.
export default function SectionLabel({ text, className = "mb-12", children }: { text: string; className?: string; children?: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
      <DecryptText text={text} trigger={isInView} className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }} />
      {children}
    </motion.div>
  );
}
