import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GalaxyBackground from "@/components/GalaxyBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import OutputSection from "@/components/OutputSection";
import LogsSection from "@/components/LogsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

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
    <div className="relative min-h-screen" style={{ background: "#090909" }}>
      <GalaxyBackground scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} />

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
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          <ModulesSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          <OutputSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          <LogsSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          <TestimonialsSection />

          <div
            className="mx-6 md:mx-8 lg:mx-16"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
