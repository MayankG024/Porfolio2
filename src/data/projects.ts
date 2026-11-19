// Projects shown in SEQ // MY_WORK. To add one: copy an object below and edit it.
// `image`: drop a 16:9 screenshot (≈1600×900 .webp) into public/projects/ and set e.g. "/projects/ethi.webp".
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
    id: "001_ETHI",
    category: "CRM / HEALTH_TECH",
    title: "Ethi CRM",
    description:
      "Clinic and patient management CRM built with PostgreSQL, Railway, Redis, and PubMed integrations. The platform handles medical feeds, nutritionist workflows, patient records, and production deployment for active healthcare users.",
    tags: ["POSTGRESQL", "RAILWAY", "REDIS", "PUBMED_API"],
    github: "https://github.com/MayankG024/Ethi",
    live: "https://ethi.life/",
    image: "", // e.g. "/projects/ethi.webp"
  },
  {
    id: "002_MUSIGO",
    category: "AI_PLATFORM",
    title: "Musigo - AI Music Discovery",
    description:
      "AI-powered music discovery platform using FastAPI, LangChain, ChromaDB, RAG, and vector search pipelines. The backend uses semantic retrieval and LLM workflows to turn natural-language prompts into personalized recommendations.",
    tags: ["FASTAPI", "LANGCHAIN", "CHROMADB", "RAG"],
    github: "https://github.com/MayankG024/Musigo",
    live: "",
    image: "", // e.g. "/projects/musigo.webp"
  },
  {
    id: "003_KIARA",
    category: "E_COMMERCE",
    title: "Kiara Jewellery Dubai",
    description:
      "E-commerce store for a Luxury Jewellery Brand based out of Dubai. Built custom Liquid theme sections, location based app integrations, fluid animations, and deployment workflows through Shopify CLI.",
    tags: ["SHOPIFY_LIQUID", "CUSTOM_APP", "ECOMMERCE"],
    github: "",
    live: "https://www.kiarajewellers.com/",
    image: "", // e.g. "/projects/kiara.webp"
  },
  {
    id: "004_HEALTHYSWAP",
    category: "AI_NUTRITION",
    title: "Healthyswap",
    description:
      "AI nutrition application that improves meals with Gemini workflows, ChromaDB retrieval, TypeScript interfaces, and motion-rich UX. The system connects food context to practical meal swaps and nutrition suggestions.",
    tags: ["TYPESCRIPT", "GEMINI", "CHROMADB", "FRAMER_MOTION"],
    github: "https://github.com/MayankG024/Healthyswap",
    live: "https://healthyswap-lime.vercel.app/",
    image: "", // e.g. "/projects/healthyswap.webp"
  },
  {
    id: "005_BLUENCORE",
    category: "E_COMMERCE",
    title: "Bluencore USA",
    description:
      "E-commerce store for Educational board games brand based out of USA. Handled end to end development and delivery, Built custom Liquid theme sections, app integrations, cart and discount logic, and Auth based views for production",
    tags: ["SHOPIFY_LIQUID", "CUSTOM_APP", "ECOMMERCE"],
    github: "",
    live: "https://bluencore-wholesale.com/",
    image: "", // e.g. "/projects/bluencore.webp"
  },
  {
    id: "006_PORTFOLIO",
    category: "WEB_DEVELOPMENT",
    title: "Retro Portfolio",
    description:
      "React, TypeScript, and Tailwind CSS portfolio and knowledge base focused on performant frontend architecture, personal writing, project documentation, and search-friendly technical content.",
    tags: ["REACT", "TYPESCRIPT", "TAILWIND"],
    github: "https://github.com/MayankG024/Portfolio-website",
    live: "https://mynk.site",
    image: "", // e.g. "/projects/portfolio.webp"
  },
];
