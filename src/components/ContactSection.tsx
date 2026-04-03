import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mayankynr24@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Mission Intel from ${form.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Transmission failed");
        alert("TRANSMISSION_FAILED. Please try again or use direct email.");
      }
    } catch (error) {
      console.error("Transmission error", error);
      alert("NETWORK_ERROR. Check connection and re-transmit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full border p-8 md:p-12 lg:p-16 card-hover"
          style={{
            borderColor: "var(--theme-border-dim)",
          }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-dot)" }} />
            <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: "var(--theme-text-label)" }}>SEQ_06 // SYS.CONNECT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2
                className="font-mono font-black leading-[0.95] mb-6 uppercase tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4rem)", color: "var(--theme-text-bold)" }}
              >
                Establish
                <br />
                Contact_
              </h2>
              <p className="text-sm font-mono leading-relaxed mb-8 max-w-lg" style={{ color: "var(--theme-text-muted)" }}>
                OPEN TO NEW PROJECTS AND COLLABORATIONS. Reach out if you have
                an interesting problem that needs brutal engineering.
              </p>

              <div className="space-y-4">
                {[
                  { label: "EMAIL", value: "MAYANKYNR24@GMAIL.COM" },
                  { label: "GITHUB", value: "GITHUB.COM/MAYANKYNR24" },
                  { label: "LOCATION", value: "HIMALAYAS" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-xs font-mono tracking-[0.2em] w-24" style={{ color: "var(--theme-text-label)" }}>
                      {item.label}
                    </span>
                    <div className="flex-1 h-px" style={{ background: "var(--theme-border-faint)" }} />
                    <span className="text-sm font-mono tracking-[0.1em]" style={{ color: "var(--theme-text-mid)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "var(--theme-text-label)" }}>
                      HANDLE
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text-bold)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-input-focus)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--theme-border)")}
                      placeholder="IDENTIFIER"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "var(--theme-text-label)" }}>
                      COMM_CHANNEL
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text-bold)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-input-focus)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--theme-border)")}
                      placeholder="EMAIL_ADDRESS"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono tracking-[0.2em] block mb-2" style={{ color: "var(--theme-text-label)" }}>
                      MESSAGE_PAYLOAD
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full bg-transparent border px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors resize-none"
                      style={{
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text-bold)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--theme-input-focus)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--theme-border)")}
                      placeholder="DESCRIBE_OBJECTIVE..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-mono text-xs tracking-[0.2em] transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    style={{
                      color: "var(--theme-cta-fg)",
                      background: "var(--theme-cta-bg)",
                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = "var(--theme-cta-hover)")}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.background = "var(--theme-cta-bg)")}
                  >
                    {isSubmitting ? "Transmitting..." : "Transmit Message"}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mb-4" style={{ boxShadow: "0 0 10px rgba(74,222,128,0.8)" }} />
                  <div className="text-sm font-mono font-bold mb-2" style={{ color: "var(--theme-text-bold)" }}>TRANSMISSION_RECEIVED</div>
                  <div className="text-[10px] font-mono" style={{ color: "var(--theme-text-dim)" }}>
                    Response will follow within 24_HOURS
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
