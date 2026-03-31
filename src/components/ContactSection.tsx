import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono">SEQ_06 // SYS.CONNECT</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="font-mono font-black text-white leading-[0.95] mb-6 uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Establish
              <br />
              Contact_
            </h2>
            <p className="text-xs font-mono leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Open to new projects and collaborations. Reach out if you have
              an interesting problem that needs brutal engineering.
            </p>

            <div className="space-y-3">
              {[
                { label: "EMAIL", value: "john.doe@system.io" },
                { label: "GITHUB", value: "github.com/johndoe" },
                { label: "LOCATION", value: "SECTOR_7G, NEW_YORK" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-[0.2em] w-20" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {item.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <span className="text-[11px] font-mono tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="terminal-border p-6 bg-black/40"
            style={{ backdropFilter: "blur(4px)" }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    HANDLE
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                    placeholder="IDENTIFIER"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    COMM_CHANNEL
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                    placeholder="EMAIL_ADDRESS"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    MESSAGE_PAYLOAD
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                    placeholder="DESCRIBE_OBJECTIVE..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-mono text-xs tracking-[0.2em] text-black bg-white hover:bg-white/90 transition-colors"
                >
                  TRANSMIT_MESSAGE
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mb-4" style={{ boxShadow: "0 0 10px rgba(74,222,128,0.8)" }} />
                <div className="text-sm font-mono font-bold text-white mb-2">TRANSMISSION_RECEIVED</div>
                <div className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Response will follow within 24_HOURS
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
