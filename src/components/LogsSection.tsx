import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experiences, type Experience } from "@/data/experience";
import { useMediaQuery } from "@/lib/useMediaQuery";
import SectionLabel from "./SectionLabel";
import DecryptText from "./DecryptText";

const LABEL = "SEQ_05 // SYS.EXPERIENCE";
const CARD_W = 400;
const GAP = 32;
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const stamp = (start: string) => `${MONTHS[Number(start.slice(5, 7)) - 1]} ${start.slice(0, 4)}`;

function ExperienceCard({ exp, className = "", style }: { exp: Experience; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`p-6 rounded-sm border card-hover ${className}`} style={{ borderColor: "var(--theme-border-faint)", ...style }}>
      <div className="flex flex-wrap items-baseline gap-3 mb-1">
        <h4 className="text-base font-mono font-bold tracking-[0.05em]" style={{ color: "var(--theme-text-bold)" }}>
          {exp.title}
        </h4>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
        <span className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
          {exp.period}
        </span>
        <span style={{ color: "var(--theme-text-faint)" }}>//</span>
        <span className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-dim)" }}>
          {exp.company}
        </span>
      </div>

      <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: "var(--theme-text-muted)" }}>
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono tracking-[0.15em] px-2 py-1"
            style={{ color: "var(--theme-text-dim)", border: "1px solid var(--theme-border-faint)" }}
          >
            [ {tag} ]
          </span>
        ))}
      </div>
    </div>
  );
}

/* Vertical list — used on mobile/tablet and for reduced motion */
function ExperienceEntry({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-8 pb-10"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, var(--theme-timeline-start), var(--theme-timeline-end))` }}
      />
      <div
        className="absolute left-0 top-6 -translate-x-1/2"
        style={{ width: "5px", height: "5px", background: "var(--theme-dot-timeline)" }}
      />
      <div className="text-[10px] font-mono tracking-[0.3em] mb-2" style={{ color: "var(--theme-text-label)" }}>
        T+ {stamp(exp.start)}
      </div>
      <ExperienceCard exp={exp} />
    </motion.div>
  );
}

function VerticalTimeline() {
  return (
    <section id="logs" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text={LABEL} />
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceEntry key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Desktop: the section pins and vertical scroll drives the track left → right, oldest → newest */
function HorizontalTimeline() {
  const n = experiences.length;
  const targetRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  // small holds at both ends so the first and last entries get a beat on screen
  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -distance], { clamp: true });
  const steps = useTransform(scrollYProgress, [0.06, 0.94], [0, n - 1], { clamp: true });
  const fill = useTransform(steps, (v) => v / (n - 1));

  useMotionValueEvent(steps, "change", (v) => {
    const next = scrollYProgress.get() < 0.02 ? -1 : Math.round(v);
    setActive((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const track = n * CARD_W + (n - 1) * GAP;
      setDistance(Math.max(0, track - el.clientWidth + 48)); // 48 = the wrapper's horizontal padding
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n]);

  return (
    <section id="logs" ref={targetRef} className="relative" style={{ height: `${100 + n * 55}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <SectionLabel text={LABEL} className="mb-16">
            <span className="ml-auto text-[10px] font-mono tracking-[0.3em] tabular-nums" style={{ color: "var(--theme-text-label)" }}>
              LOG {String(Math.max(active, 0) + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </SectionLabel>

          {/* clipped with soft edges so the track never slides under the scroll rail */}
          <div
            ref={viewportRef}
            className="relative overflow-hidden -mx-6 px-6"
            style={{ maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)" }}
          >
            <motion.div style={{ x }} className="relative will-change-transform" >
              {/* rail */}
              <div className="relative h-10 mb-6" style={{ width: (n - 1) * (CARD_W + GAP) + 8 }}>
                <div className="absolute left-0 right-0 top-[27px] h-px" style={{ background: "var(--theme-border-faint)" }} />
                <motion.div
                  className="absolute left-0 right-0 top-[27px] h-px origin-left"
                  style={{ scaleX: fill, background: "var(--theme-text-mid)" }}
                />
                {experiences.map((exp, i) => {
                  const lit = i <= active;
                  return (
                    <div key={exp.company} className="absolute top-0" style={{ left: i * (CARD_W + GAP) }}>
                      <div className="text-[10px] font-mono tracking-[0.3em] h-4 mb-[7px] whitespace-nowrap" style={{ color: lit ? "var(--theme-text-bold)" : "var(--theme-text-faint)", transition: "color 300ms ease" }}>
                        {lit ? <DecryptText text={`T+ ${stamp(exp.start)}`} trigger /> : `T+ ${stamp(exp.start)}`}
                      </div>
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          border: "1px solid var(--theme-dot-timeline)",
                          background: lit ? "var(--theme-text-bold)" : "var(--theme-bg)",
                          boxShadow: i === active ? "0 0 10px var(--theme-text-mid)" : "none",
                          transition: "background-color 250ms ease, box-shadow 250ms ease",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex" style={{ gap: GAP }}>
                {experiences.map((exp, i) => (
                  <div
                    key={exp.company}
                    className="shrink-0"
                    style={{ width: CARD_W, opacity: i <= active ? 1 : 0.35, transition: "opacity 400ms var(--ease-out-strong)" }}
                  >
                    <ExperienceCard
                      exp={exp}
                      className="h-full"
                      style={{ borderColor: i === active ? "var(--theme-border)" : "var(--theme-border-faint)" }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LogsSection() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return wide && !reduce ? <HorizontalTimeline /> : <VerticalTimeline />;
}
