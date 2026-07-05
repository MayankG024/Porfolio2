import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import DecryptText from "./DecryptText";
import CountUp from "./CountUp";


export default function QuickStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "EXPERIENCE", value: "2+ Years" },
    { label: "EDUCATION", value: <>Bachelor's<br />Computer Science</> },
    { label: "LANGUAGES", value: <>English <br />Hindi </> },
  ];

  return (
    <section className="relative pt-12 pb-24 px-6 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-4 px-2 card-hover"
              style={{
                border: "1px solid var(--theme-border)",
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
                {stat.label === "EXPERIENCE" ? (
                  <CountUp start={0.0} end={2.0} decimals={1} suffix="+ Years" trigger={isInView} delay={150} />
                ) : stat.label === "EDUCATION" ? (
                  <>
                    <DecryptText text="Bachelor's" trigger={isInView} delay={250} />
                    <br />
                    <DecryptText text="Computer Science" trigger={isInView} delay={250} />
                  </>
                ) : stat.label === "LANGUAGES" ? (
                  <>
                    <DecryptText text="English" trigger={isInView} delay={350} />
                    <br />
                    <DecryptText text="Hindi" trigger={isInView} delay={350} />
                  </>
                ) : (
                  stat.value
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
