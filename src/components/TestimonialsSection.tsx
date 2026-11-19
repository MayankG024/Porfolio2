import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import SectionLabel from "./SectionLabel";
import { MdFace3, MdFace6 } from "react-icons/md";

// Placeholder avatars: Material face glyphs, distinct silhouettes for male / female.
const AVATAR = { male: MdFace6, female: MdFace3 } as const;

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const pending = !testimonial.quote;
  const Icon = AVATAR[testimonial.avatar];

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: [0, 0.06, 0.1][index % 3], ease: [0.23, 1, 0.32, 1] }}
      className="terminal-border p-6 card-hover flex flex-col"
    >
      <div className="mb-4" style={{ color: "var(--theme-quote-mark)", fontSize: "2rem", fontFamily: "serif", lineHeight: 1 }}>
        "
      </div>
      <blockquote className="text-xs font-mono leading-relaxed mb-6 italic flex-1" style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}>
        {pending ? <span className="not-italic tracking-[0.2em]" style={{ color: "var(--theme-text-faint)" }}>[ AWAITING_TRANSMISSION — fill src/data/testimonials.ts ]</span> : `"${testimonial.quote}"`}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div
          className="corner-bracket shrink-0 w-11 h-11 flex items-center justify-center overflow-hidden"
          style={{ color: "var(--theme-text)", background: "var(--theme-btn-hover)", border: "1px solid var(--theme-border)" }}
        >
          {testimonial.photo ? (
            <img src={testimonial.photo} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
          ) : (
            <Icon size={30} aria-hidden="true" />
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
        <SectionLabel text="SEQ_05 // EVAL" />

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
