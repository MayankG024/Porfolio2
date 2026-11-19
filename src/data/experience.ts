// Experience shown on the horizontal timeline (SEQ // EXPERIENCE).
// To add a role: copy an object. `start` (YYYY-MM) controls order — the timeline sorts oldest → newest automatically.
// `logo`: a square image in public/logos/. `current: true` shows the ACTIVE badge.

export interface Experience {
  title: string;
  company: string;
  logo: string;
  meta: string;
  period: string;
  start: string;
  current?: boolean;
  description: string;
  tags: string[];
}

const entries: Experience[] = [
  {
    title: "Technical Lead — E-commerce & Digital Platform",
    company: "Happy Hive",
    logo: "/logos/happyhive.webp",
    meta: "Brishti Foods · Part-time · Remote",
    period: "SEP 2026 - PRESENT",
    start: "2026-09",
    current: true,
    description: "Leading the e-commerce storefront and digital platform: Shopify theme development, integrations and the technical roadmap.",
    tags: ["ECOMMERCE", "SHOPIFY", "TECH_LEAD"],
  },
  {
    title: "Software Developer",
    company: "Incubr",
    logo: "/logos/incubr.webp",
    meta: "Delhi, India · On-site",
    period: "JAN 2026 - MAY 2026",
    start: "2026-01",
    description: "Led a cross-functional team of developers and designers. Built a medical CRM for doctors and nutritionists, integrated the PubMed API, and owned architecture and deployment.",
    tags: ["FRONTEND", "BACKEND", "SYSTEMS"],
  },
  {
    title: "Freelance Web Developer",
    company: "Freelance",
    logo: "/logos/freelance.webp",
    meta: "Remote",
    period: "APR 2024 - PRESENT",
    start: "2024-04",
    current: true,
    description: "Delivering production web apps, internal company tools and e-commerce stores (educational toys, games and jewellery) for clients in India and abroad.",
    tags: ["FULLSTACK", "WEB_DEV", "UI"],
  },
  {
    title: "AI Ambassador",
    company: "Blackbox AI",
    logo: "/logos/blackbox.webp",
    meta: "Global community",
    period: "OCT 2024 - DEC 2025",
    start: "2024-10",
    description: "Worked with a global network of AI builders, raising awareness and teaching AI chatbots, LLMs, NLP and RAG pipelines.",
    tags: ["LLM", "AI", "EDUCATION"],
  },
  {
    title: "Core Team",
    company: "FOSS United Dehradun",
    logo: "/logos/foss.webp",
    meta: "Dehradun, India",
    period: "SEPT 2024 - NOV 2025",
    start: "2024-09",
    description: "Created technical content and organised developer events to promote free and open-source software.",
    tags: ["OPEN_SOURCE", "EVENTS", "CONTENT"],
  },
];

export const experiences = [...entries].sort((a, b) => a.start.localeCompare(b.start));
