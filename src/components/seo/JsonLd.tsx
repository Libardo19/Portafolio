import type { Profile } from '@/content/types'
import { siteUrl } from '@/lib/site'

/** Datos estructurados de la persona (schema.org). Solo campos confirmados. */
export function JsonLd({ profile }: { profile: Profile }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: profile.role,
    url: siteUrl,
    ...(profile.email && { email: `mailto:${profile.email}` }),
    ...(profile.social.length && { sameAs: profile.social.map((item) => item.url) })
  }
  return (
    <script
      type="application/ld+json"
      // JSON.stringify no escapa "<": se reemplaza para que el contenido no pueda cerrar el <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  )
}
