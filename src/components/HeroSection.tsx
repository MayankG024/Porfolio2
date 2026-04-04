import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SocialButtons from "./SocialButtons";
import { playHoverSound, playClickSound } from "@/lib/audio";

// Language sequence: Japanese -> Chinese -> Greek -> Hindi -> Russian -> English
const MAYANK_SEQ = ["マヤンク", "马扬克", "Μαγιανκ", "मयंक","Маянк",  "MAYANK"];
const GUPTA_SEQ = ["グプタ", "古普塔",   "Γκουπτα","गुप्ता","Гупта", "GUPTA"];

function TranslationCycle({ sequence, delay = 0, interval = 450 }: { sequence: string[]; delay?: number; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cycleInterval: ReturnType<typeof setInterval>;
    
    // Wait for the initial delay before starting the cycle
    const timeout = setTimeout(() => {
      let step = 0;
      cycleInterval = setInterval(() => {
        step++;
        if (step >= sequence.length - 1) {
          clearInterval(cycleInterval);
        }
        setIndex(step);
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(cycleInterval);
    };
  }, [delay, interval, sequence.length]);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-block whitespace-nowrap"
        >
          {sequence[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
    playClickSound();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMyWork = () => {
    playClickSound();
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
              <TranslationCycle sequence={MAYANK_SEQ} delay={450} interval={350} />
              <br />
              <TranslationCycle sequence={GUPTA_SEQ} delay={450} interval={350} />
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
                onMouseEnter={playHoverSound}
                className="group relative overflow-hidden font-mono text-xs tracking-[0.15em]"
                style={{
                  letterSpacing: "0.1em",
                  border: "1px solid var(--theme-btn-border)",
                }}
              >
                <div className="px-5 py-2.5" style={{ color: "var(--theme-text-bold)", background: "transparent" }}>
                  ESTABLISH CONTACT
                </div>
                <div 
                  className="absolute left-0 top-0 bottom-0 w-0 overflow-hidden group-hover:w-full"
                  style={{ 
                    background: "var(--theme-text-bold)",
                    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <div 
                    className="flex w-max items-center h-full px-5 py-2.5"
                    style={{ color: "var(--theme-bg)" }}
                  >
                    ESTABLISH CONTACT
                  </div>
                </div>
              </button>
              <button
                onClick={handleMyWork}
                onMouseEnter={playHoverSound}
                className="group relative overflow-hidden font-mono text-xs tracking-[0.15em]"
                style={{
                  letterSpacing: "0.1em",
                  border: "1px solid var(--theme-cta-bg)",
                }}
              >
                <div className="px-5 py-2.5" style={{ color: "var(--theme-cta-fg)", background: "var(--theme-cta-bg)" }}>
                  MY WORK
                </div>
                <div 
                  className="absolute left-0 top-0 bottom-0 w-0 overflow-hidden group-hover:w-full"
                  style={{ 
                    background: "var(--theme-cta-fg)",
                    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <div 
                    className="flex w-max items-center h-full px-5 py-2.5"
                    style={{ color: "var(--theme-cta-bg)" }}
                  >
                    MY WORK
                  </div>
                </div>
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
