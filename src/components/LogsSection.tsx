import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Software Developer",
    period: "2026_PRESENT",
    company: "INCUBR",
    description: "Developed scalable frontend and backend production systems. Developed end-to-end CRM system and workplace management webapp. (Delhi, India - On-site)",
    tags: ["FRONTEND", "BACKEND", "SYSTEMS"],
  },
  {
    title: "Freelance Web Developer",
    period: "ONGOING",
    company: "FREELANCE",
    description: "Delivered production-grade web applications and interfaces for a number of clients. (Remote)",
    tags: ["FULLSTACK", "WEB_DEV", "UI"],
  },
  {
    title: "Student Ambassador",
    period: "2024_2025",
    company: "BLACKBOX_AI",
    description: "Worked with LLM tools and promoted AI adoption and education. (Dehradun, India)",
    tags: ["LLM", "AI", "EDUCATION"],
  },
  {
    title: "Core Team",
    period: "2024_PRESENT",
    company: "FOSS_UNITED_DEHRADUN",
    description: "Created technical content and organized developer events to promote Free and open source software. (Dehradun, India)",
    tags: ["OPEN_SOURCE", "EVENTS", "CONTENT"],
  },
];

function ExperienceEntry({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-10"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, var(--theme-timeline-start), var(--theme-timeline-end))` }}
      />

      <div
        className="absolute left-0 top-6 -translate-x-1/2"
        style={{ width: "5px", height: "5px", background: "var(--theme-dot-timeline)" }}
      />

      <div 
        className="p-6 rounded-sm border card-hover"
        style={{ 
          borderColor: "var(--theme-border-faint)"
        }}
      >
        <div className="flex flex-wrap items-baseline gap-3 mb-1">
          <h4 className="text-base font-mono font-bold tracking-[0.05em]" style={{ color: "var(--theme-text-bold)" }}>
            {exp.title}
          </h4>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
            {exp.period}
          </span>
          <span style={{ color: "var(--theme-text-faint)" }}>//</span>
          <span className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-dim)" }}>
            {exp.company}
          </span>
        </div>

        <p
          className="text-sm font-mono leading-relaxed mb-4"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-[0.15em] px-2 py-1"
              style={{
                color: "var(--theme-text-dim)",
                border: "1px solid var(--theme-border-faint)",
              }}
            >
              [ {tag} ]
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function LogsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="logs" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
          <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_04 // SYS.EXPERIENCE</span>
        </motion.div>

        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceEntry key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
