import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SocialButtons from "./SocialButtons";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMyWork = () => {
    const el = document.querySelector("#output");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="identity"
      className="relative min-h-screen flex items-center pt-20 px-6 md:px-8 lg:px-16"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
            <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_01 // INIT</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1
              className="font-mono font-black leading-[0.9] tracking-tight mb-4"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "var(--theme-text-bold)",
              }}
            >
              MAYANK
              <br />
              GUPTA
            </h1>
            <div
              className="font-mono font-semibold tracking-[0.15em] mb-8 uppercase"
              style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)", color: "var(--theme-text-mid)" }}
            >
              Engineer <span style={{ color: "var(--theme-text-label)", margin: "0 0.5rem" }}>|</span> Software Developer <span style={{ color: "var(--theme-text-label)", margin: "0 0.5rem" }}>|</span> Generalist
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm leading-relaxed mb-10 max-w-md font-mono"
            style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}
          >
            Extracting structure from noise. With 2+ years of Designing brutal, scalable backend
            systems and high-performance client interfaces. Exploring the void
            between code and aesthetic logic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 w-full lg:w-[calc(200%+5rem)] mb-10"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleContact}
                className="px-5 py-2.5 font-mono text-xs tracking-[0.15em] transition-all duration-200"
                style={{
                  letterSpacing: "0.1em",
                  color: "var(--theme-text-bold)",
                  border: "1px solid var(--theme-btn-border)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--theme-btn-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                ESTABLISH CONTACT
              </button>
              <button
                onClick={handleMyWork}
                className="px-5 py-2.5 font-mono text-xs tracking-[0.15em] transition-all duration-200"
                style={{
                  letterSpacing: "0.1em",
                  color: "var(--theme-cta-fg)",
                  background: "var(--theme-cta-bg)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--theme-cta-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--theme-cta-bg)")}
              >
                MY WORK
              </button>
            </div>

            <SocialButtons />
          </motion.div>
        </div>

        {/* Card section completely removed temporarily */}
        <div className="w-full lg:w-auto" aria-hidden="true"></div>
      </div>

      <div className="fixed bottom-6 md:bottom-10 right-6 md:right-8 lg:right-16 flex flex-col items-end gap-5 z-50">

        {/* Status Bar */}
        <div
          className="flex items-center gap-4 pointer-events-none"
          style={{ opacity: 0.6 }}
        >
          <div className="text-[9px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-bold)" }}>POS_X: {mousePos.x.toString().padStart(4, '0')}</div>
          <div className="w-px h-3" style={{ background: "var(--theme-text-label)" }} />
          <div className="text-[9px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-bold)" }}>POS_Y: {mousePos.y.toString().padStart(4, '0')}</div>
          <div className="w-px h-3" style={{ background: "var(--theme-text-label)" }} />
          <div className="text-[9px] tracking-[0.3em] font-mono flex items-center gap-2" style={{ color: "var(--theme-text-bold)" }}>
            SYS_STATUS:
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 blink block" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}></span>
            ACTIVE
          </div>
        </div>
      </div>
    </section>
  );
}
