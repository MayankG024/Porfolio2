import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";
import GalaxyBackground from "@/components/GalaxyBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickStatsSection from "@/components/QuickStatsSection";
import ModulesSection from "@/components/ModulesSection";
import OutputSection from "@/components/OutputSection";
import LogsSection from "@/components/LogsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

function AppContent() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} theme={theme} />

      <div
        className="fixed inset-0 z-[1] pointer-events-none grid-overlay"
        style={{ opacity: 0.75 }}
      />

      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "var(--theme-divider)" }}
          />

          <ModulesSection />

          <QuickStatsSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "var(--theme-divider)" }}
          />

          <OutputSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "var(--theme-divider)" }}
          />

          <LogsSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "var(--theme-divider)" }}
          />

          <TestimonialsSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "var(--theme-divider)" }}
          />

          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
