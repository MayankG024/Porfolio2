import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { label: "[01] IDENTITY", href: "#identity" },
  { label: "[02] MODULES", href: "#modules" },
  { label: "[03] OUTPUT", href: "#output" },
  { label: "[04] LOGS", href: "#logs" },
];

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(255,255,255,0.14)"
          : "rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun
              size={18}
              strokeWidth={1.5}
              style={{ color: "rgba(255,255,255,0.7)" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon
              size={18}
              strokeWidth={1.5}
              style={{ color: "rgba(0,0,0,0.65)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  useTheme(); // ensure context is available

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
        background: "var(--theme-nav-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--theme-border-nav)",
      }}
    >
      {/* Logo / wordmark */}
      <div className="flex items-center gap-3">
        <div
          className="w-3.5 h-3.5 flex items-center justify-center shrink-0"
          style={{ border: "1px solid var(--theme-logo-border)" }}
        >
          <div className="w-2 h-2" style={{ background: "var(--theme-logo-fill)" }} />
        </div>
        <span
          className="font-mono font-semibold tracking-[0.22em]"
          style={{ fontSize: "13px", color: "var(--theme-text-bold)" }}
        >
          SYS.PORTFOLIO // MAYANK GUPTA
        </span>
      </div>

      {/* Nav links + theme toggle */}
      <div className="hidden md:flex items-center gap-7">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.href)}
            className="font-mono tracking-[0.2em] transition-colors duration-200"
            style={{
              fontSize: "12px",
              color: "var(--theme-text-nav)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--theme-text-bold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--theme-text-nav)")}
          >
            {item.label}
          </button>
        ))}

        {/* Divider */}
        <div
          className="w-px h-4"
          style={{ background: "var(--theme-border)" }}
        />

        {/* Theme toggle */}
        <ThemeToggleButton />
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggleButton />
        <button
          className="transition-colors"
          style={{ color: "var(--theme-text-nav)" }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
            <rect y="0" width="18" height="1.5" />
            <rect y="6" width="18" height="1.5" />
            <rect y="12" width="18" height="1.5" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
