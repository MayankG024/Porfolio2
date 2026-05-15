import { Helmet } from "react-helmet-async";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://maynk.me/#person",
        name: "Mayank Gupta",
        url: "https://maynk.me",
        image: "https://maynk.me/og-image.png",
        sameAs: [
          "https://github.com/MayankG024",
          "https://www.linkedin.com/in/mayankg02/",
          "https://x.com/MayankG024",
        ],
        jobTitle: "Full Stack & AI Engineer",
        knowsAbout: [
          "React",
          "TypeScript",
          "Python",
          "FastAPI",
          "LangChain",
          "AI Agents",
          "Automation Systems",
          "LLM Systems",
          "Scalable Backend Systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://maynk.me/#website",
        url: "https://maynk.me",
        name: "Mayank Gupta Portfolio",
        alternateName: "Mayank Gupta | Full Stack & AI Engineer",
        publisher: {
          "@id": "https://maynk.me/#person",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
