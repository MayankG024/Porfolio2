import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "001_ETHI",
    category: "CRM / HEALTH_TECH",
    title: "Ethi CRM",
    description:
      "Clinic and patient management CRM built with PostgreSQL, Railway, Redis, and PubMed integrations. The platform handles medical feeds, nutritionist workflows, patient records, and production deployment for active healthcare users.",
    tags: ["POSTGRESQL", "RAILWAY", "REDIS", "PUBMED_API"],
    github: "https://github.com/MayankG024/Ethi",
    live: "https://ethi.site",
  },
  {
    id: "002_MUSIGO",
    category: "AI_PLATFORM",
    title: "Musigo - AI Music Discovery",
    description:
      "AI-powered music discovery platform using FastAPI, LangChain, ChromaDB, RAG, and vector search pipelines. The backend uses semantic retrieval and LLM workflows to turn natural-language prompts into personalized recommendations.",
    tags: ["FASTAPI", "LANGCHAIN", "CHROMADB", "RAG"],
    github: "https://github.com/MayankG024/Musigo",
    live: "",
  },
  {
    id: "003_BLUENCORE",
    category: "E_COMMERCE",
    title: "Bluencore Store",
    description:
      "Shopify ecommerce implementation for an educational board and strategy games store. Built custom Liquid theme sections, app integrations, cart logic, and deployment workflows through Shopify CLI.",
    tags: ["SHOPIFY_LIQUID", "CUSTOM_APP", "ECOMMERCE"],
    github: "",
    live: "https://bluencore-wholesale.com/",
  },
  {
    id: "004_HEALTHYSWAP",
    category: "AI_NUTRITION",
    title: "Healthyswap",
    description:
      "AI nutrition application that improves meals with OpenAI workflows, ChromaDB retrieval, TypeScript interfaces, and motion-rich UX. The system connects food context to practical meal swaps and nutrition suggestions.",
    tags: ["TYPESCRIPT", "OPENAI", "CHROMADB", "FRAMER_MOTION"],
    github: "https://github.com/MayankG024/Healthyswap",
    live: "https://maynk.me/Healthyswap",
  },
  {
    id: "005_PORTFOLIO",
    category: "WEB_DEVELOPMENT",
    title: "Retro Portfolio",
    description:
      "React, TypeScript, and Tailwind CSS portfolio and knowledge base focused on performant frontend architecture, personal writing, project documentation, and search-friendly technical content.",
    tags: ["REACT", "TYPESCRIPT", "TAILWIND"],
    github: "https://github.com/MayankG024/Portfolio-website",
    live: "https://mynk.site",
  },
  {
    id: "006_WORKLIFE",
    category: "WEB_APP",
    title: "Worklife Desks",
    description:
      "Workplace management application built with Vite, Zustand, Sonner, and Resend. The app organizes desk workflows, operational state, notification feedback, and email-driven communication for office teams.",
    tags: ["VITE", "ZUSTAND", "RESEND", "WEB_APP"],
    github: "https://github.com/MayankG024/worklife-desks",
    live: "",
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
      className="terminal-border p-6 transition-all duration-300 group card-hover flex flex-col"
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

      <div className="flex items-center gap-6 mt-auto">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] group-hover:gap-3 transition-all duration-200"
            style={{ color: "var(--theme-text-bold)", borderBottom: "1px solid var(--theme-btn-border)" }}
          >
            Live_Site
            <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] group-hover:gap-3 transition-all duration-200"
            style={{ color: "var(--theme-text-bold)", borderBottom: "1px solid var(--theme-btn-border)" }}
          >
            View_Repository
            <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
          </a>
        )}
      </div>
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
