export default function Footer() {
  return (
    <footer
      className="relative py-8 px-6 md:px-8 lg:px-16"
      style={{ borderTop: "1px solid var(--theme-footer-border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 flex items-center justify-center"
            style={{ border: "1px solid var(--theme-logo-border-footer)" }}
          >
            <div className="w-1.5 h-1.5" style={{ background: "var(--theme-logo-fill-footer)" }} />
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--theme-text-label)" }}>
            SYS.PORTFOLIO // J.DOE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono tracking-[0.15em]" style={{ color: "var(--theme-text-faint)" }}>
            SYSTEM_VERSION: 2.4.1
          </span>
          <div className="w-px h-3" style={{ background: "var(--theme-border)" }} />
          <span className="text-[10px] font-mono tracking-[0.15em]" style={{ color: "var(--theme-text-faint)" }}>
            ALL_RIGHTS_RESERVED // 2024
          </span>
        </div>
      </div>
    </footer>
  );
}
