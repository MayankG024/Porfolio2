import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { playHoverSound, playClickSound } from "@/lib/audio";

interface ScrollRailProps {
  scrollY: number;
}

const SECTIONS = [
  { id: "identity", seq: "SEQ_01", label: "INIT" },
  { id: "modules", seq: "SEQ_02", label: "SYS.SKILLS" },
  { id: "output", seq: "SEQ_03", label: "SYS.MY_WORK" },
  { id: "process", seq: "SEQ_04", label: "SYS.HOW_I_BUILD" },
  { id: "logs", seq: "SEQ_05", label: "SYS.EXPERIENCE" },
  { id: "eval", seq: "SEQ_06", label: "SYS.EVAL" },
  { id: "writings", seq: "SEQ_07", label: "SYS.WRITINGS" },
  { id: "contact", seq: "SEQ_08", label: "SYS.CONNECT" },
];

const RAIL_H = 320;

// Tiny satellite that rides the head of the progress line and banks with scroll velocity.
function Probe() {
  const { scrollYProgress, scrollY } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, RAIL_H]);
  const tilt = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], [-35, 0, 35]), { stiffness: 120, damping: 14 });

  return (
    <motion.div className="absolute pointer-events-none" style={{ top: -5, left: "calc(50% + 7px)", y, rotate: tilt }} aria-hidden="true">
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <rect x="4.5" y="3" width="3" height="4" fill="var(--theme-text-bold)" />
        <rect x="0.5" y="4" width="3" height="2" stroke="var(--theme-text-dim)" strokeWidth="1" />
        <rect x="8.5" y="4" width="3" height="2" stroke="var(--theme-text-dim)" strokeWidth="1" />
        <path d="M6 3V1" stroke="var(--theme-text-dim)" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

export default function ScrollRail({ scrollY }: ScrollRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight / 3;

    let active = 0;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          active = i;
        }
      }
    }
    setActiveIndex(active);

    // Calculate continuous scroll progress
    const totalHeight = document.documentElement.scrollHeight - viewportHeight;
    if (totalHeight > 0) {
      setScrollProgress(window.scrollY / totalHeight);
    }
  }, [scrollY]);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      playClickSound();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
      <div className="relative flex flex-col items-center py-4" style={{ height: RAIL_H }}>
        
        {/* Track Line (inactive) */}
        <div 
          className="absolute w-[1px] h-full"
          style={{
            background: "var(--theme-border-faint)",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0
          }}
        />

        {/* Fill Line (active progress) */}
        <div 
          className="absolute w-[1px] transition-[height] duration-100 ease-out"
          style={{
            background: "var(--theme-dot-timeline)",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`
          }}
        />

        <Probe />

        {/* Timeline Dots */}
        <div className="h-full flex flex-col justify-between items-center relative z-10">
          {SECTIONS.map((section, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;

            return (
              <div 
                key={section.id} 
                className="group relative flex items-center justify-center cursor-pointer"
                onClick={() => handleDotClick(section.id)}
                onMouseEnter={playHoverSound}
                style={{ width: "24px", height: "24px" }}
              >
                {/* Visual Dot */}
                <div 
                  className="w-1.5 h-1.5 rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out"
                  style={{
                    background: isActive 
                      ? "var(--theme-text-bold)" 
                      : isPassed 
                        ? "var(--theme-dot)" 
                        : "var(--theme-text-faint)",
                    transform: isActive ? "scale(1.6)" : "scale(1)",
                    boxShadow: isActive ? "0 0 8px var(--theme-dot)" : "none",
                  }}
                />

                {/* Cyberpunk HUD Tooltip */}
                <div 
                  className="absolute left-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-[opacity,transform] duration-200 transform translate-x-[-8px] group-hover:translate-x-0 whitespace-nowrap py-1 px-2.5 rounded-sm border"
                  style={{
                    background: "var(--theme-card-bg-alpha)",
                    borderColor: "var(--theme-border)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span className="font-mono text-[9px] tracking-[0.15em] block leading-none" style={{ color: "var(--theme-text-label)" }}>
                    {section.seq}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.05em] block mt-1 uppercase" style={{ color: "var(--theme-text-bold)" }}>
                    {section.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
