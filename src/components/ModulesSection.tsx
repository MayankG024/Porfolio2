import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ── Brand icons (Simple Icons via react-icons) ── */
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiExpress, SiPostgresql, SiSupabase, SiGraphql,
  SiGithub, SiPostman, SiFigma, SiShopify, SiOpenai,
  SiDocker, SiKubernetes, SiGithubactions, SiNginx, SiSentry,
} from "react-icons/si";

/* ── Generic icons (lucide — already installed) ── */
import { Paintbrush, Globe, Cpu, Cloud, Code2 } from "lucide-react";

/* ── Icon map keyed by skill name ── */
const iconMap: Record<string, ReactNode> = {
  // Frontend
  "TypeScript":               <SiTypescript />,
  "React":                    <SiReact />,
  "Next.js":                  <SiNextdotjs />,
  "Tailwind CSS":             <SiTailwindcss />,
  "Framer Motion":            <SiFramer />,
  "UI/UX Design Principles":  <Paintbrush size={15} strokeWidth={1.5} />,
  "Three.js / WebGL":         <SiThreedotjs />,

  // Backend
  "Node.js":                  <SiNodedotjs />,
  "Express.js":               <SiExpress />,
  "PostgreSQL":               <SiPostgresql />,
  "Supabase":                 <SiSupabase />,
  "GraphQL APIs":             <SiGraphql />,
  "REST API Design":          <Globe size={15} strokeWidth={1.5} />,

  // Tools
  "Git & GitHub":                     <SiGithub />,
  "Postman":                          <SiPostman />,
  "Figma (UI/UX)":                    <SiFigma />,
  "Shopify":                          <SiShopify />,
  "MCP (Model Context Protocol)":     <Cpu size={15} strokeWidth={1.5} />,
  "AI Agents (LangChain, OpenAI)":    <SiOpenai />,
  "VS Code + Extensions":             <Code2 size={15} strokeWidth={1.5} />,

  // DevOps
  "Docker":                   <SiDocker />,
  "Kubernetes":               <SiKubernetes />,
  "CI/CD (GitHub Actions)":   <SiGithubactions />,
  "AWS / GCP":                <Cloud size={15} strokeWidth={1.5} />,
  "Nginx":                    <SiNginx />,
  "Monitoring (Sentry)":      <SiSentry />,
};

const categories = [
  {
    title: "FRONTEND",
    version: "v3.2",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX Design Principles",
      "Three.js / WebGL",
    ],
  },
  {
    title: "BACKEND",
    version: "v4.0",
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "GraphQL APIs",
      "REST API Design",
    ],
  },
  {
    title: "TOOLS",
    version: "v2.5",
    skills: [
      "Git & GitHub",
      "Postman",
      "Figma (UI/UX)",
      "Shopify",
      "MCP (Model Context Protocol)",
      "AI Agents (LangChain, OpenAI)",
      "VS Code + Extensions",
    ],
  },
  {
    title: "DEVOPS",
    version: "v2.1",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "AWS / GCP",
      "Nginx",
      "Monitoring (Sentry)",
    ],
  },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="terminal-border p-6 flex flex-col"
      style={{ background: "var(--theme-card-bg)" }}
    >
      {/* Header row */}
      <div className="flex items-baseline justify-between mb-6 pb-4" style={{ borderBottom: "1px solid var(--theme-border-dim)" }}>
        <h3
          className="font-mono font-bold tracking-[0.12em]"
          style={{ fontSize: "18px", color: "var(--theme-text-bold)" }}
        >
          {category.title}
        </h3>
        <span
          className="font-mono tracking-[0.15em]"
          style={{ fontSize: "12px", color: "var(--theme-text-faint)" }}
        >
          {category.version}
        </span>
      </div>

      {/* Skill rows */}
      <div className="flex flex-col gap-[14px]">
        {category.skills.map((skill) => (
          <div key={skill} className="flex items-center gap-3 min-w-0">
            <span
              className="shrink-0 flex items-center justify-center"
              style={{
                width: "16px",
                height: "16px",
                color: "var(--theme-text-dim)",
                fontSize: "15px",
              }}
            >
              {iconMap[skill] ?? null}
            </span>
            <span
              className="font-mono truncate"
              style={{ fontSize: "15px", color: "var(--theme-text-mid)" }}
            >
              {skill}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ModulesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="modules" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
          <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_02 // SYS.SKILLS</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
