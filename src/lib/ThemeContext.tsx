import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });
  const isAnimating = useRef(false);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Keep the source of truth current even if mobile rendering is delayed
    // between two taps near the end of the transition lockout.
    const nextTheme: Theme = themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = nextTheme;
    const tintColor = nextTheme === "light"
      ? "rgba(255, 255, 255, 0.18)"
      : "rgba(0, 0, 0, 0.18)";

    // Glassmorphic circle overlay — expands from center
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      background: ${tintColor};
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      clip-path: circle(0% at 50% 50%);
      transition: clip-path 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out;
      will-change: clip-path, opacity;
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      contain: paint;
    `;
    document.body.appendChild(overlay);

    // Commit the initial clip state before changing the theme. This prevents
    // mobile browsers from coalescing the first and last animation frames.
    void overlay.offsetWidth;

    // Switch theme immediately so elements morph underneath
    setTheme(nextTheme);

    // Expand the frosted circle slowly from center
    requestAnimationFrame(() => {
      overlay.style.clipPath = "circle(150% at 50% 50%)";
    });

    // Fade out the overlay after it has fully expanded
    setTimeout(() => {
      overlay.style.opacity = "0";
    }, 650);

    // Clean up
    setTimeout(() => {
      overlay.remove();
      isAnimating.current = false;
    }, 1000);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
