import SocialButtons from "./SocialButtons";

export default function Footer() {
  return (
    <footer
      className="relative py-8 px-6 md:px-8 lg:px-16"
      style={{ borderTop: "1px solid var(--theme-footer-border)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <div
            className="w-3 h-3 flex items-center justify-center"
            style={{ border: "1px solid var(--theme-logo-border-footer)" }}
          >
            <div className="w-1.5 h-1.5" style={{ background: "var(--theme-logo-fill-footer)" }} />
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
            Copyright @2026 Mayank Gupta. All rights reserved.
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex justify-center">
          <SocialButtons />
        </div>
      </div>
    </footer>
  );
}
