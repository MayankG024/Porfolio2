import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "001_NEBULA",
    category: "VISUALIZATION",
    title: "Nebula Metrics",
    description: "A high-performance WebGL dashboard for visualizing real-time container metrics. Built to handle million-point datasets with zero frame drops utilizing custom shaders.",
    tags: ["THREE.JS", "REACT", "WEBSOCKETS"],
    link: "View_Deployment",
    href: "#",
  },
  {
    id: "002_VOID",
    category: "SYSTEM_ARCHITECTURE",
    title: "Void Engine",
    description: "Headless CMS architecture tailored for brutalist portfolio sites. Features a Git-backed content resolution system and heavily cached Edge deployment pipeline.",
    tags: ["NEXT.JS", "RUST", "GRAPHQL"],
    link: "View_Repository",
    href: "#",
  },
  {
    id: "003_PULSAR",
    category: "AUDIO_INTERFACE",
    title: "Pulsar Synth",
    description: "Web Audio API based modular synthesizer interface. Design focused on skeuomorphic wireframes and exact control mapping mimicking physical hardware.",
    tags: ["WEB_AUDIO", "CANVAS_API", "ZUSTAND"],
    link: "Launch_Application",
    href: "#",
  },
  {
    id: "004_HORIZON",
    category: "E_COMMERCE",
    title: "Event Horizon",
    description: "Minimalist, high-conversion storefront framework. Stripped away all non-essential UI to create a pure, content-first purchasing experience.",
    tags: ["SHOPIFY_API", "TAILWIND", "REMIX"],
    link: "View_Case_Study",
    href: "#",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="terminal-border p-6 transition-all duration-300 group"
      style={{ background: "var(--theme-card-bg)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--theme-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--theme-card-bg)")}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] font-mono tracking-[0.25em]" style={{ color: "var(--theme-text-label)" }}>
          PRJ_ID: {project.id}
        </span>
        <span className="text-[9px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-faint)" }}>
          {project.category}
        </span>
      </div>

      <h3
        className="font-mono font-bold mb-3 tracking-tight"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "var(--theme-text-bold)" }}
      >
        {project.title}
      </h3>

      <p
        className="text-xs font-mono leading-relaxed mb-6"
        style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono tracking-[0.15em] px-2 py-1"
            style={{
              color: "var(--theme-text-link)",
              border: "1px solid var(--theme-border-tag)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.href}
        className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] group-hover:gap-3 transition-all duration-200"
        style={{ color: "var(--theme-text-bold)", borderBottom: "1px solid var(--theme-btn-border)" }}
      >
        {project.link}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  );
}

export default function OutputSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="output" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
          <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_03 // SYS.MY_WORK</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
