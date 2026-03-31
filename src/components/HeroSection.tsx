import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono">SEQ_01 // INIT</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1
              className="font-mono font-black text-white leading-[0.9] tracking-tight mb-4"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              MAYANK
              <br />
              GUPTA
            </h1>
            <div
              className="font-mono font-semibold text-white/70 tracking-[0.15em] mb-8 uppercase"
              style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)" }}
            >
              Engineer <span className="mx-2 text-white/30">|</span> Software Developer <span className="mx-2 text-white/30">|</span> Generalist
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm leading-relaxed mb-10 max-w-md font-mono"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}
          >
            Extracting structure from noise. Designing brutal, scalable backend
            systems and high-performance client interfaces. Exploring the void
            between code and aesthetic logic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={handleContact}
              className="px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
              style={{ letterSpacing: "0.1em" }}
            >
              INITIATE_CONTACT
            </button>
            <button
              className="px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-black bg-white hover:bg-white/90 transition-all duration-200"
              style={{ letterSpacing: "0.1em" }}
            >
              GET_RESUME.PDF
            </button>
          </motion.div>
        </div>

        {/* Card section completely removed temporarily */}
        <div className="w-full lg:w-auto" aria-hidden="true"></div>
      </div>

      <div
        className="fixed bottom-6 md:bottom-10 right-6 md:right-8 lg:right-16 flex items-center gap-4 z-50 pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        <div className="text-[9px] tracking-[0.3em] font-mono text-white">POS_X: {mousePos.x.toString().padStart(4, '0')}</div>
        <div className="w-px h-3 bg-white/40" />
        <div className="text-[9px] tracking-[0.3em] font-mono text-white">POS_Y: {mousePos.y.toString().padStart(4, '0')}</div>
        <div className="w-px h-3 bg-white/40" />
        <div className="text-[9px] tracking-[0.3em] font-mono text-white flex items-center gap-2">
          SYS_STATUS:
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 blink block" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}></span>
          ACTIVE
        </div>
      </div>
    </section>
  );
}
