import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import posthog from "posthog-js";
import { FaGithub } from "react-icons/fa";
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
      className="project-media relative aspect-[2/1] overflow-hidden mb-4 -mx-5 -mt-5"
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
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: [0, 0.05, 0.09][index % 3], ease: [0.23, 1, 0.32, 1] }}
      onClick={handleCardClick}
      className="terminal-border p-5 group card-hover flex flex-col cursor-pointer overflow-hidden"
    >
      <ProjectMedia project={project} />

      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[9px] font-mono tracking-[0.25em] shrink-0" style={{ color: "var(--theme-text-label)" }}>
          PRJ_ID: {project.id}
        </span>
        <span className="text-[9px] font-mono tracking-[0.2em] truncate" style={{ color: "var(--theme-text-label)" }}>
          {project.category}
        </span>
      </div>

      <h3
        className="font-mono font-bold mb-2 tracking-tight"
        style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", color: "var(--theme-text-bold)" }}
      >
        {project.title}
      </h3>

      <p
        className="font-mono leading-relaxed mb-4 line-clamp-2"
        style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
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

// Spare columns in the last grid row (2 cols at md, 3 at lg) so the GitHub panel fills them.
const md = 2 - (projects.length % 2);
const lg = 3 - (projects.length % 3);
const moreSpan = `${md === 2 ? "md:col-span-2" : "md:col-span-1"} ${lg === 3 ? "lg:col-span-3" : lg === 2 ? "lg:col-span-2" : "lg:col-span-1"}`;

export default function OutputSection() {
  return (
    <section id="output" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="SEQ_03 // MY_WORK" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          {/* fills the rest of the last row; spans adjust to how many cards sit in it */}
          <a
            href="https://github.com/MayankG024"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("github_more_clicked", { source: "my_work" })}
            className={`more-work group flex flex-col items-center justify-center gap-3 p-8 min-h-[160px] ${moreSpan}`}
            style={{ border: "1px dashed var(--theme-border)" }}
          >
            <FaGithub size={22} style={{ color: "var(--theme-text-mid)" }} aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-[0.25em] flex items-center gap-2" style={{ color: "var(--theme-text-bold)" }}>
              VISIT GITHUB TO SEE MORE <span className="more-work__arrow inline-block" aria-hidden="true">-&gt;</span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
              GITHUB.COM/MAYANKG024
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
