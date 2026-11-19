import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { MotionConfig, useInView } from "framer-motion";
import { ThemeProvider } from "@/lib/ThemeContext";
import GalaxyBackground from "@/components/GalaxyBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StructuredData from "@/components/SEO/StructuredData";
import ScrollRail from "@/components/ScrollRail";


const QuickStatsSection = lazy(() => import("@/components/QuickStatsSection"));
const ModulesSection = lazy(() => import("@/components/ModulesSection"));
const OutputSection = lazy(() => import("@/components/OutputSection"));
const LogsSection = lazy(() => import("@/components/LogsSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const WritingsSection = lazy(() => import("@/components/WritingsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Hairline section divider; a light sweeps across it once when it scrolls into view.
function Divider() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  return <div ref={ref} data-seen={seen} className="divider-scan mx-6 md:mx-8 lg:mx-16" />;
}

let greeted = false;
function greetConsole() {
  if (greeted) return;
  greeted = true;
  const art = [
    "   /\\",
    "  /  \\   hello, fellow engineer.",
    " |    |   you found the console. source: https://github.com/MayankG024",
    " |    |   say hi: mayankynr24@gmail.com",
    "/|_||_|\\",
  ].join("\n");
  console.log(`%c${art}`, "font-family: monospace; color: #9a9a9a;");
}

function AppContent() {
  useEffect(greetConsole, []);

  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    let frameId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
        setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
        frameId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <StructuredData />
      <GalaxyBackground scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} />

      <div
        className="fixed inset-0 z-[1] pointer-events-none grid-overlay"
        style={{ opacity: 0.75 }}
      />

      <div className="relative z-10">
        <Navbar />
        <ScrollRail scrollY={scrollY} />

        <main>
          <HeroSection />

          <Suspense fallback={null}>
            <Divider />

            <ModulesSection />

            <QuickStatsSection />

            <Divider />

            <OutputSection />

            <Divider />

            <ProcessSection />

            <Divider />

            <LogsSection />

            <Divider />

            <TestimonialsSection />

            <Divider />

            <WritingsSection />

            <Divider />

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
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </ThemeProvider>
  );
}
