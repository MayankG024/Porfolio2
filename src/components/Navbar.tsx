import { motion } from "framer-motion";

const navItems = [
  { label: "[01] IDENTITY", href: "#identity" },
  { label: "[02] MODULES", href: "#modules" },
  { label: "[03] OUTPUT", href: "#output" },
  { label: "[04] LOGS", href: "#logs" },
];

export default function Navbar() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      style={{
        background: "rgba(9, 9, 9, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      {/* Logo / wordmark */}
      <div className="flex items-center gap-3">
        <div className="w-3.5 h-3.5 border border-white flex items-center justify-center shrink-0">
          <div className="w-2 h-2 bg-white" />
        </div>
        <span
          className="text-white font-mono font-semibold tracking-[0.22em]"
          style={{ fontSize: "13px" }}
        >
          SYS.PORTFOLIO // MAYANK GUPTA
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-7">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.href)}
            className="font-mono tracking-[0.2em] text-white/55 hover:text-white transition-colors duration-200"
            style={{ fontSize: "12px" }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden text-white/50 hover:text-white transition-colors">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
          <rect y="0" width="18" height="1.5" />
          <rect y="6" width="18" height="1.5" />
          <rect y="12" width="18" height="1.5" />
        </svg>
      </button>
    </motion.nav>
  );
}
