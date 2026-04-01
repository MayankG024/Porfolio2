import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Lead System Architect",
    period: "2022_PRESENT",
    company: "NOVA_CORP",
    description: "Directing a team of 8 engineers in the migration from legacy monolithic architecture to a distributed micro-frontend system. Improved system fault tolerance by 40% and reduced CI/CD pipeline execution time by half.",
    tags: ["NODE_JS", "KUBERNETES", "AWS"],
  },
  {
    title: "Creative Developer",
    period: "2020_2022",
    company: "STUDIO_VOID",
    description: "Built immersive WebGL experiences for high-end fashion and tech brands. Bridged the gap between the design team's Figma concepts and performant shader-based browser execution.",
    tags: ["THREE_JS", "GLSL", "GSAP"],
  },
  {
    title: "Frontend Engineer",
    period: "2018_2020",
    company: "DATA_SYNC_LLC",
    description: "Developed enterprise dashboard interfaces for real-time data monitoring. Implemented strict design system tokens and created an internal library of reusable React components.",
    tags: ["REACT", "REDUX", "D3_JS"],
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
        className="p-6 rounded-sm border transition-colors duration-300"
        style={{ 
          background: "rgba(10, 10, 10, 0.45)", 
          backdropFilter: "blur(6px)",
          borderColor: "var(--theme-border-faint)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(15, 15, 15, 0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10, 10, 10, 0.45)";
        }}
      >
        <div className="flex flex-wrap items-baseline gap-3 mb-1">
          <h4 className="text-sm font-mono font-bold tracking-[0.05em]" style={{ color: "var(--theme-text-bold)" }}>
            {exp.title}
          </h4>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
            {exp.period}
          </span>
          <span style={{ color: "var(--theme-text-faint)" }}>//</span>
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-dim)" }}>
            {exp.company}
          </span>
        </div>

        <p
          className="text-xs font-mono leading-relaxed mb-4"
          style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}
        >
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono tracking-[0.15em] px-2 py-1"
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
