// Projects shown in SEQ // MY_WORK, in display order. To add one: copy an object below and edit it.
// `image`: a screenshot (≈1200px wide .webp) in public/projects/, e.g. "/projects/ethi.webp". Keep `description` under ~85 chars so it fits 2 lines.
// Leave github/live/image as "" to hide that link or show the NO_SIGNAL placeholder.

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "001_BRAINFIT",
    category: "E_COMMERCE / EDTECH",
    title: "Brainfit",
    description: "Shopify store for a psychologist-led brain-fitness brand, built from Figma.",
    tags: ["SHOPIFY_LIQUID", "OS_2.0", "FIGMA"],
    github: "",
    live: "https://brainfit.in/",
    image: "/projects/brainfit.webp",
  },
  {
    id: "002_DILIGENT",
    category: "SAAS / JOB_DISCOVERY",
    title: "Diligent Apply",
    description: "Surfaces fresh LinkedIn and Naukri jobs in India, with scheduled email digests.",
    tags: ["NEXT.JS", "POSTGRESQL", "APIFY", "CASHFREE"],
    github: "",
    live: "https://diligentgrowth.com/apply",
    image: "/projects/diligent-apply.webp",
  },
  {
    id: "003_ETHI",
    category: "CRM / HEALTH_TECH",
    title: "Ethi CRM",
    description: "Clinic CRM for doctors and nutritionists, with patient records and PubMed feeds.",
    tags: ["POSTGRESQL", "RAILWAY", "REDIS", "PUBMED_API"],
    github: "https://github.com/MayankG024/Ethi",
    live: "https://ethi.life/",
    image: "/projects/ethi.webp",
  },
  {
    id: "004_MUSIGO",
    category: "AI_PLATFORM",
    title: "Musigo",
    description: "Music discovery from plain-language prompts, powered by RAG and vector search.",
    tags: ["FASTAPI", "LANGCHAIN", "CHROMADB", "RAG"],
    github: "https://github.com/MayankG024/Musigo",
    live: "",
    image: "/projects/musigo.webp",
  },
  {
    id: "005_KIARA",
    category: "E_COMMERCE",
    title: "Kiara Jewellery Dubai",
    description: "Luxury jewellery store for a Dubai brand, with custom Liquid sections and motion.",
    tags: ["SHOPIFY_LIQUID", "CUSTOM_APP", "ECOMMERCE"],
    github: "",
    live: "https://www.kiarajewellers.com/",
    image: "/projects/kiara.webp",
  },
  {
    id: "006_HEALTHYSWAP",
    category: "AI_NUTRITION",
    title: "Healthyswap",
    description: "AI nutrition app that suggests practical meal swaps with Gemini and ChromaDB.",
    tags: ["TYPESCRIPT", "GEMINI", "CHROMADB", "FRAMER_MOTION"],
    github: "https://github.com/MayankG024/Healthyswap",
    live: "https://healthyswap-lime.vercel.app/",
    image: "/projects/healthyswap.webp",
  },
  {
    id: "007_BLUENCORE",
    category: "E_COMMERCE",
    title: "Bluencore USA",
    description: "End-to-end Shopify build for a US board-game brand: sections, cart and discounts.",
    tags: ["SHOPIFY_LIQUID", "CUSTOM_APP", "ECOMMERCE"],
    github: "",
    live: "https://bluencore-wholesale.com/",
    image: "/projects/bluencore.webp",
  },
];
