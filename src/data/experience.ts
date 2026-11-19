// Experience shown on the horizontal timeline (SEQ // EXPERIENCE).
// To add a role: copy an object. `start` (YYYY-MM) controls order — the timeline sorts oldest → newest automatically.

export interface Experience {
  title: string;
  period: string;
  start: string;
  company: string;
  description: string;
  tags: string[];
}

const entries: Experience[] = [
  {
    title: "Software Developer",
    period: "JAN 2026 - MAY 2026",
    start: "2026-01",
    company: "INCUBR",
    description: "Led cross-functional team of developers and designers. Built medical CRM serving doctors and nutritionists. Integrated PubMed API. Owned Architecture and deployment (Delhi, India - On-site)",
    tags: ["FRONTEND", "BACKEND", "SYSTEMS"],
  },
  {
    title: "Freelance Web Developer",
    period: "APRIL 2024 - PRESENT",
    start: "2024-04",
    company: "FREELANCE",
    description: "Delivered production web applications, internal company tools and Ecommerce Websites (education toys, games and jewellery) for a number of clients within India and Abroad. (Remote)",
    tags: ["FULLSTACK", "WEB_DEV", "UI"],
  },
  {
    title: "AI Ambassador",
    period: "OCT 2024 - DEC 2025",
    start: "2024-10",
    company: "BLACKBOX_AI",
    description: "Collaborated and worked with a global network of AI Mavericks and creating awareness and learning AI chatbots , LLMs and NLP and RAG pipelines.",
    tags: ["LLM", "AI", "EDUCATION"],
  },
  {
    title: "Core Team",
    period: "SEPT 2024 - NOV 2025",
    start: "2024-09",
    company: "FOSS_UNITED_DEHRADUN",
    description: "Created technical content and organized developer events to promote Free and open source software. (Dehradun, India)",
    tags: ["OPEN_SOURCE", "EVENTS", "CONTENT"],
  },
];

export const experiences = [...entries].sort((a, b) => a.start.localeCompare(b.start));
