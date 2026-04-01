import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function QuickStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "EXPERIENCE", value: "2+ Years" },
    { label: "EDUCATION", value: <>Bachelor's<br />Computer Science</> },
    { label: "LANGUAGES", value: <>English,<br />Hindi</> },
  ];

  return (
    <section className="relative pb-24 px-6 md:px-8 lg:px-16 pt-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-6 px-4 transition-colors duration-300"
              style={{
                border: "1px solid var(--theme-border)",
                background: "var(--theme-card-bg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--theme-btn-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--theme-card-bg)";
              }}
            >
              <span
                className="font-mono text-[9px] tracking-[0.2em] mb-3 uppercase"
                style={{ color: "var(--theme-text-label)" }}
              >
                {stat.label}
              </span>
              <span
                className="font-mono font-bold tracking-tight text-center"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)", color: "var(--theme-text-bold)", lineHeight: "1.2" }}
              >
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
