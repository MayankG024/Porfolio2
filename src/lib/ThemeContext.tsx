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
      if (!root.classList.contains("light")) root.classList.add("light");
    } else {
      if (root.classList.contains("light")) root.classList.remove("light");
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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const overlay = document.createElement("div");

    if (!isMobile) {
      // Desktop: Rich glassmorphic frosted blur circle (fully preserved and unaffected)
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
      `;
    } else {
      // Mobile: Hardware-composited expanding radial circle without heavy framebuffer readbacks.
      // Eliminates the GPU stall and dark Skia edge clipping artifacts on mobile screens.
      const mobileBackground = nextTheme === "light"
        ? "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 70%, transparent 100%)"
        : "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)";

      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        pointer-events: none;
        background: ${mobileBackground};
        clip-path: circle(0% at 50% 50%);
        transition: clip-path 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out;
        will-change: clip-path, opacity;
      `;
    }
    document.body.appendChild(overlay);

    // Commit the initial clip state on the isolated overlay element before theme styles change.
    // This prevents mobile browsers from coalescing the initial and animated frames.
    void overlay.offsetWidth;

    // Apply the theme class to the document root immediately and synchronously.
    // This ensures all CSS variables and themed element transitions trigger in the
    // exact same frame as the overlay animation, eliminating the delay/glitch on mobile.
    const root = document.documentElement;
    if (nextTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", nextTheme);

    // Switch React theme state for components that need it (GalaxyBackground, icons)
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
