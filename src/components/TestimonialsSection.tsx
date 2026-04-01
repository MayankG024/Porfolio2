import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "John doesn't just write code; he constructs architecture. The systems he built for us are virtually indestructible and perform at levels we didn't think possible in the browser.",
    author: "Sarah Jenkins",
    role: "CTO, NOVA_CORP",
  },
  {
    quote: "A rare blend of hardcore technical understanding and aesthetic sensibility. The WebGL pipeline he established for our studio cut render times down drastically while looking incredible.",
    author: "Marcus Wei",
    role: "DIRECTOR, STUDIO_VOID",
  },
  {
    quote: "Brutal, efficient, and exceptionally clean code. Working with his APIs is a breeze, and his frontend implementations exactly match the brutalist design specs we require.",
    author: "Elena Rostova",
    role: "LEAD DESIGNER, INDEP",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="terminal-border p-6"
      style={{ background: "var(--theme-card-bg)" }}
    >
      <div className="mb-4" style={{ color: "var(--theme-quote-mark)", fontSize: "2rem", fontFamily: "serif", lineHeight: 1 }}>
        "
      </div>
      <p
        className="text-xs font-mono leading-relaxed mb-6 italic"
        style={{ color: "var(--theme-text-muted)", fontSize: "12px" }}
      >
        "{testimonial.quote}"
      </p>
      <div>
        <div className="text-xs font-mono font-bold tracking-[0.1em]" style={{ color: "var(--theme-text-bold)" }}>
          {testimonial.author}
        </div>
        <div className="text-[10px] font-mono tracking-[0.2em] mt-1" style={{ color: "var(--theme-text-label)" }}>
          {testimonial.role}
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
          <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_05 // SYS.EVAL</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
