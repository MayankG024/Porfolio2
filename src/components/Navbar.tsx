import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { Sun, Moon, Music, VolumeX } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

const navItems = [
  { label: " IDENTITY ", href: "#identity" },
  { label: " SKILLS ", href: "#modules" },
  { label: " MY WORK", href: "#output" },
  { label: " EXPERIENCE ", href: "#logs" },
];

/* ── Shared icon-button style matching the theme toggle ── */
function NavIconButton({
  onClick,
  ariaLabel,
  title,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      className="relative flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "transparent",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

/* ── Music toggle button ── */
function MusicToggleButton() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio("/Time-trimmed.mp3");
    audio.loop = true;
    audio.volume = 0.45;

    // Fallback to ensure it restarts if standard loop fails
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(() => { });
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => { }); // suppress autoplay policy errors
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  const iconColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";

  return (
    <NavIconButton
      onClick={toggle}
      ariaLabel={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.div
            key="music-on"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Music size={18} strokeWidth={1.5} style={{ color: iconColor }} />
          </motion.div>
        ) : (
          <motion.div
            key="music-off"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <VolumeX size={18} strokeWidth={1.5} style={{ color: iconColor }} />
          </motion.div>
        )}
      </AnimatePresence>
    </NavIconButton>
  );
}

/* ── Theme toggle button ── */
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <NavIconButton
      onClick={toggleTheme}
      ariaLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
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
            <Sun size={18} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.7)" }} />
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
            <Moon size={18} strokeWidth={1.5} style={{ color: "rgba(0,0,0,0.65)" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </NavIconButton>
  );
}

export default function Navbar() {
  useTheme();

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
           // MAYANK GUPTA
        </span>
      </div>

      <div className="hidden md:flex items-center gap-5">
        {navItems.map((item, index) => (
          <div key={item.label} className="flex items-center gap-5">
            <button
              onClick={() => handleClick(item.href)}
              className="font-mono tracking-[0.2em] transition-colors duration-200"
              style={{ fontSize: "12px", color: "var(--theme-text-nav)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--theme-text-bold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--theme-text-nav)")}
            >
              {item.label.trim()}
            </button>
            {index < navItems.length - 1 && (
              <span className="font-mono" style={{ color: "var(--theme-border)", fontSize: "12px" }}>|</span>
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="w-px h-4" style={{ background: "var(--theme-border)" }} />

        {/* Music toggle */}
        <MusicToggleButton />

        {/* Theme toggle */}
        <ThemeToggleButton />
      </div>

      {/* Mobile: music + theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-3">
        <MusicToggleButton />
        <ThemeToggleButton />
        <button className="transition-colors" style={{ color: "var(--theme-text-nav)" }}>
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
