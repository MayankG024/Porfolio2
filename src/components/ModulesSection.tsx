import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  { name: "TYPESCRIPT", sub: "V.5.0+ // CORE", icon: "{ }" },
  { name: "REACT.JS", sub: "DOM // UI_LAYER", icon: "◎" },
  { name: "NODE.JS", sub: "RUNTIME // ENV", icon: "⬡" },
  { name: "THREE.JS", sub: "WEBGL // RENDER", icon: "△" },
  { name: "RUST", sub: "SYSTEMS // WASM", icon: "⬛" },
  { name: "POSTGRES", sub: "DATA // STORAGE", icon: "▣" },
  { name: "DOCKER", sub: "CONTAINERS // OPS", icon: "⧫" },
  { name: "FIGMA", sub: "DESIGN // PROTO", icon: "◈" },
];

function ModuleCard({ mod, index }: { mod: typeof modules[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative terminal-border p-4 transition-all duration-300 cursor-default"
      style={{ background: "var(--theme-card-bg)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--theme-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--theme-card-bg)")}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-sm font-mono font-bold tracking-[0.1em] mb-1" style={{ color: "var(--theme-text-bold)" }}>
            {mod.name}
          </div>
          <div className="text-[10px] font-mono tracking-[0.15em]" style={{ color: "var(--theme-text-label)" }}>
            {mod.sub}
          </div>
        </div>
        <div
          className="text-lg font-mono group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--theme-text-faint)" }}
        >
          {mod.icon}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{ width: "0%", background: "var(--theme-progress-bar)" }}
      />

      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: "var(--theme-progress-bar)" }}
        initial={{ width: "0%" }}
        animate={isInView ? { width: "30%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
      />
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
          <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_02 // SYS.MODULES</span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.name} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
