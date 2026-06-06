# SEO Implementation Plan — maynk.me (React + Vite SPA)

Repository:
- https://github.com/MayankG024/Portfolio2

Goal:
Improve SEO, indexing, discoverability, semantic relevance, and performance for a single-page portfolio website.

---

# 1. Install SEO Support

```bash
npm install react-helmet-async
```

Wrap app:

```tsx
import { HelmetProvider } from 'react-helmet-async'

<HelmetProvider>
  <App />
</HelmetProvider>
```

---

# 2. Add Global Metadata

Modify `index.html`:

```html
<title>Mayank Gupta — Full Stack & AI Engineer</title>

<meta
  name="description"
  content="AI-focused full stack engineer building scalable products, AI workflows, automation systems, and modern web applications."
/>

<meta
  name="keywords"
  content="Mayank Gupta, Full Stack Engineer, AI Engineer, React, FastAPI, LangChain, AI Agents, TypeScript, Python"
/>

<meta name="author" content="Mayank Gupta" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://maynk.me" />
```

---

# 3. Add OpenGraph + Twitter Metadata

Inside `<head>`:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Mayank Gupta — Full Stack & AI Engineer" />
<meta
  property="og:description"
  content="Portfolio featuring AI systems, automation platforms, scalable backend systems, and full stack engineering projects."
/>
<meta property="og:url" content="https://maynk.me" />
<meta property="og:image" content="https://maynk.me/og-image.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Mayank Gupta" />
<meta
  name="twitter:description"
  content="Full Stack & AI Engineer building scalable systems and AI-driven products."
/>
```

Create:

```bash
/public/og-image.png
```

Specs:
- 1200x630
- Include:
  - Mayank Gupta
  - Full Stack & AI Engineer
  - React • Python • AI Agents • FastAPI

---

# 4. Add Structured Data

Create:

```bash
src/components/SEO/StructuredData.tsx
```

```tsx
import { Helmet } from 'react-helmet-async'

export default function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Mayank Gupta',
          url: 'https://maynk.me',
          sameAs: [
            'https://github.com/MayankG024'
          ],
          jobTitle: 'Full Stack & AI Engineer',
          knowsAbout: [
            'React',
            'TypeScript',
            'Python',
            'FastAPI',
            'LangChain',
            'AI Agents',
            'Automation',
            'LLM Systems'
          ]
        })}
      </script>
    </Helmet>
  )
}
```

Mount globally.

---

# 5. Add robots.txt

Create:

```bash
/public/robots.txt
```

```txt
User-agent: *
Allow: /

Sitemap: https://maynk.me/sitemap.xml
```

---

# 6. Add sitemap.xml

Create:

```bash
/public/sitemap.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://maynk.me/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

Submit in Google Search Console:

```txt
Indexing → Sitemaps
```

Submit:

```txt
https://maynk.me/sitemap.xml
```

---

# 8. Improve Crawlable Text

Add explicit searchable text in hero/about sections.

Example:

```txt
Full Stack & AI Engineer focused on scalable web applications, AI agents, automation systems, React interfaces, Python backends, FastAPI services, and LLM-powered workflows.
```

---

# 9. Expand Project meta Descriptions

Every project's meta tags should include:
- problem solved
- technologies
- backend systems
- AI systems
- deployment stack
- architecture summary

Example:

```txt
Musigo is an AI-powered music discovery platform built using FastAPI, LangChain, ChromaDB, and vector search pipelines. The system uses semantic retrieval and LLM workflows to deliver natural language-based recommendations.
```

---

# 10. Performance Optimization

Run Lighthouse:

```txt
F12 → Lighthouse → Analyze Page
```

Targets:

| Metric | Target |
|---|---|
| Performance | 90+ |
| SEO | 90+ |
| Accessibility | 85+ |

---

# 11. Optimize Bundle Size

Install:

```bash
npm install rollup-plugin-visualizer --save-dev
```

Analyze and reduce:
- oversized dependencies
- large libraries

# 14. Improve Core Web Vitals

Monitor:

```txt
Search Console → Core Web Vitals
```

Targets:

| Metric | Goal |
|---|---|
| LCP | <2.5s |
| CLS | <0.1 |
| INP | <200ms |

---

# 15. Request Google Indexing

Search Console:

```txt
URL Inspection
```

Submit:

```txt
https://maynk.me
```

Click:

```txt
Request Indexing
```

Repeat after major updates.

---

# 17. Improve GitHub Discoverability

Each major repository should contain:
- architecture overview
- deployment details
- screenshots
- AI stack explanation
- link to maynk.me

---

# 18. Semantic Reinforcement

Consistently reinforce these terms across site + GitHub:

```txt
Full Stack Engineer
AI Engineer
React Developer
Python Developer
FastAPI
LangChain
LLM Systems
AI Agents
Automation Systems
Scalable Backend Systems
```

---

# 19. Optional Improvements

## Add PWA Support

```bash
npm install vite-plugin-pwa
```

## Add Google Analytics

Track:
- traffic
- search impressions
- click-through rates
- project engagement

---
# 20. Add a decriptive readme to the repository

# Success Criteria

- Google indexes maynk.me correctly
- Lighthouse SEO score > 90
- Core Web Vitals pass
- Social previews render correctly
- Website appears for:
  - Mayank Gupta AI Engineer
  - Full Stack Engineer Portfolio
  - React FastAPI Portfolio
  - AI Agent Developer
- Site loads quickly on mobile

