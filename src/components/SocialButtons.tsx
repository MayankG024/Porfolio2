import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Globe, Mail, FileText } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/audio";

export const socialLinks = [
  { icon: <FaLinkedinIn size={19} />, href: "https://www.linkedin.com/in/mayankg02/", label: "LinkedIn Profile", name: "LinkedIn" },
  { icon: <FaGithub size={19} />, href: "https://github.com/MayankG024", label: "GitHub Profile", name: "GitHub" },
  { icon: <FaXTwitter size={19} />, href: "https://x.com/MayankG024", label: "X (Twitter) Profile", name: "Twitter" },
  { icon: <Globe size={19} />, href: "https://mynk.site", label: "Personal Website", name: "My Blog Website!" },
  { icon: <Mail size={19} />, href: "mailto:mayankynr24@gmail.com", label: "Email Contact", name: "Email" },
  { icon: <FileText size={19} />, href: "/Mayank_Resume.pdf", label: "Resume Download", download: true, name: "Resume" },
];

export default function SocialButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link, i) => (
        <div key={i} className="relative group flex flex-col items-center">
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            download={link.download}
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="relative overflow-hidden w-12 h-12 flex items-center justify-center"
            style={{
              border: "1px solid rgba(150, 150, 150, 0.2)",
              borderRadius: "3px",
              color: "var(--theme-text-bold)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--theme-text-bold)", background: "transparent" }}>
              {link.icon}
            </div>
            <div 
              className="absolute left-0 top-0 bottom-0 w-0 overflow-hidden group-hover:w-full"
              style={{ 
                background: "var(--theme-text-bold)",
                transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              <div 
                className="flex items-center justify-center w-12 h-12"
                style={{ color: "var(--theme-bg)" }}
              >
                {link.icon}
              </div>
            </div>
          </a>
          <div 
            className="absolute top-[115%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 font-mono text-[10px] tracking-widest uppercase"
            style={{
              color: "var(--theme-text-bold)"
            }}
          >
            {link.name}
          </div>
        </div>
      ))}
    </div>
  );
}
