import { useEffect, useState, lazy, Suspense } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";
import GalaxyBackground from "@/components/GalaxyBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StructuredData from "@/components/SEO/StructuredData";

const QuickStatsSection = lazy(() => import("@/components/QuickStatsSection"));
const ModulesSection = lazy(() => import("@/components/ModulesSection"));
const OutputSection = lazy(() => import("@/components/OutputSection"));
const LogsSection = lazy(() => import("@/components/LogsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
      <StructuredData />
      <GalaxyBackground scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} theme={theme} />

      <div
        className="fixed inset-0 z-[1] pointer-events-none grid-overlay"
        style={{ opacity: 0.75 }}
      />

      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />

          <Suspense fallback={null}>
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
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
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
