import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import SectionLabel from "./SectionLabel";

// Line-art placeholder busts, drawn in the current text colour.
function AvatarBust({ kind }: { kind: Testimonial["avatar"] }) {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      {kind === "female" ? (
        <>
          <path d="M12.5 22c-1-3-1.2-6.5.2-9.4C14.2 9.4 17 8 20 8s5.8 1.4 7.3 4.6c1.4 2.9 1.2 6.4.2 9.4" />
          <circle cx="20" cy="16" r="5.5" />
          <path d="M13 22.5c1.6 1.3 3.2 1.6 4.4 1.4M27 22.5c-1.6 1.3-3.2 1.6-4.4 1.4" />
          <path d="M8 38c.8-6.5 5.6-10.5 12-10.5S31.2 31.5 32 38" />
        </>
      ) : (
        <>
          <circle cx="20" cy="16" r="6" />
          <path d="M14.2 14.3c.9-3.4 3.2-5.3 5.8-5.3 2.9 0 5.2 1.8 5.9 5.1-2.4-1.2-6.8-1.6-11.7.2Z" />
          <path d="M7 38c.9-7 6-11 13-11s12.1 4 13 11" />
        </>
      )}
    </svg>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const pending = !testimonial.quote;

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: [0, 0.06, 0.1][index % 3], ease: [0.23, 1, 0.32, 1] }}
      className="terminal-border p-6 card-hover flex flex-col"
    >
      <div className="mb-4" style={{ color: "var(--theme-quote-mark)", fontSize: "2rem", fontFamily: "serif", lineHeight: 1 }}>
        "
      </div>
      <blockquote className="text-xs font-mono leading-relaxed mb-6 italic flex-1" style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}>
        {pending ? <span className="not-italic tracking-[0.2em]" style={{ color: "var(--theme-text-faint)" }}>[ AWAITING_TRANSMISSION — fill src/data/testimonials.ts ]</span> : `"${testimonial.quote}"`}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="corner-bracket shrink-0 w-10 h-10 p-1 overflow-hidden" style={{ color: "var(--theme-text-dim)", background: "var(--theme-btn-hover)" }}>
          {testimonial.photo ? (
            <img src={testimonial.photo} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
          ) : (
            <AvatarBust kind={testimonial.avatar} />
          )}
        </div>
        <div>
          <div className="text-xs font-mono font-bold tracking-[0.1em]" style={{ color: "var(--theme-text-bold)" }}>
            {testimonial.author}
          </div>
          <div className="text-[10px] font-mono tracking-[0.2em] mt-1" style={{ color: "var(--theme-text-label)" }}>
            {testimonial.role}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export default function TestimonialsSection() {
  // Unfilled TODO slots are visible while developing, never in production.
  const visible = testimonials.filter((t) => t.quote || import.meta.env.DEV);

  return (
    <section id="eval" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="SEQ_06 // SYS.EVAL" />

        {visible.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visible.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
            FEEDBACK_LOG // syncing — references available on{" "}
            <a href="#contact" className="underline underline-offset-4" style={{ color: "var(--theme-text-bold)" }}>
              request
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
