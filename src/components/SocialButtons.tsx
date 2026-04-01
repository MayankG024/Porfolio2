import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Globe } from "lucide-react";

export const socialLinks = [
  { icon: <FaLinkedinIn size={19} />, href: "https://www.linkedin.com/in/mayankg02/", label: "LinkedIn Profile" },
  { icon: <FaGithub size={19} />, href: "https://github.com/MayankG024", label: "GitHub Profile" },
  { icon: <FaXTwitter size={19} />, href: "https://x.com/MayankG024", label: "X (Twitter) Profile" },
  { icon: <Globe size={19} />, href: "https://mynk.site", label: "Personal Website" },
];

export default function SocialButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300"
          style={{
            background: "var(--theme-card-bg)",
            border: "1px solid rgba(150, 150, 150, 0.2)",
            borderRadius: "3px",
            color: "var(--theme-text-bold)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--theme-btn-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--theme-card-bg)";
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
