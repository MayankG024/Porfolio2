import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Globe, Mail, FileText } from "lucide-react";

export const socialLinks = [
  { icon: <FaLinkedinIn size={19} />, href: "https://www.linkedin.com/in/mayankg02/", label: "LinkedIn Profile" },
  { icon: <FaGithub size={19} />, href: "https://github.com/MayankG024", label: "GitHub Profile" },
  { icon: <FaXTwitter size={19} />, href: "https://x.com/MayankG024", label: "X (Twitter) Profile" },
  { icon: <Globe size={19} />, href: "https://mynk.site", label: "Personal Website" },
  { icon: <Mail size={19} />, href: "mailto:mayankynr24@gmail.com", label: "Email Contact" },
  { icon: <FileText size={19} />, href: "/Mayank_Resume.pdf", label: "Resume Download", download: true },
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
          download={link.download}
          className="w-12 h-12 flex items-center justify-center card-hover"
          style={{
            border: "1px solid rgba(150, 150, 150, 0.2)",
            borderRadius: "3px",
            color: "var(--theme-text-bold)",
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
