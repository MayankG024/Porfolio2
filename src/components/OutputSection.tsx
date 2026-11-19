import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import posthog from "posthog-js";
import { projects, type Project } from "@/data/projects";
import { useMediaQuery } from "@/lib/useMediaQuery";
import SectionLabel from "./SectionLabel";

const NOISE = "        ....::-=+01";
// Static, deterministic ASCII noise per project so the placeholder never flickers or shifts between renders.
function noisePanel(seed: string, cols = 140, rows = 32) {
  let h = 0;
  for (const c of seed) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0;
  let out = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
      out += NOISE[(h >>> 24) % NOISE.length];
    }
    out += "\n";
  }
  return out;
}

function ProjectMedia({ project }: { project: Project }) {
  const ref = useRef(null);
  const touch = useMediaQuery("(hover: none)");
  const centered = useInView(ref, { amount: 0.6 });

  return (
    <div
      ref={ref}
      data-active={touch && centered && project.image ? "true" : "false"}
      className="project-media relative aspect-video overflow-hidden mb-5 -mx-6 -mt-6"
      style={{ borderBottom: "1px solid var(--theme-border-faint)", background: "var(--theme-bg)" }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <pre
            className="absolute inset-0 m-0 p-3 font-mono leading-[1.15] overflow-hidden select-none"
            style={{ color: "var(--theme-text-faint)", fontSize: "10px", opacity: 0.6 }}
          >
            {noisePanel(project.id)}
          </pre>
          <span
            className="relative px-3 py-1.5 text-[9px] font-mono tracking-[0.3em]"
            style={{ color: "var(--theme-text-label)", background: "var(--theme-bg)", border: "1px solid var(--theme-border-faint)" }}
          >
            NO_SIGNAL // AWAITING_CAPTURE
          </span>
        </div>
      )}
    </div>
  );
}


function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleCardClick = () => {
    posthog.capture("project_card_clicked", {
      projectId: project.id,
      title: project.title,
      category: project.category
    });
  };

  const handleLinkClick = (type: "live" | "github") => {
    posthog.capture("project_link_clicked", {
      projectId: project.id,
      title: project.title,
      linkType: type,
      url: type === "live" ? project.live : project.github
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onClick={handleCardClick}
      className="terminal-border p-6 group card-hover flex flex-col cursor-pointer overflow-hidden"
    >
      <ProjectMedia project={project} />

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
            onClick={(e) => {
              e.stopPropagation();
              handleLinkClick("live");
            }}
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] group-hover:gap-3 transition-[gap] duration-200"
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
            onClick={(e) => {
              e.stopPropagation();
              handleLinkClick("github");
            }}
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] group-hover:gap-3 transition-[gap] duration-200"
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
  return (
    <section id="output" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="SEQ_03 // SYS.MY_WORK" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
