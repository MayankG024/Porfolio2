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
