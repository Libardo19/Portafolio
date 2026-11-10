/**
 * Modelo de contenido del portafolio. Todo el texto vive en `site.ts` con estos tipos:
 * los componentes no llevan texto propio, así actualizar el portafolio es editar datos
 * y `npm run typecheck` avisa si falta un campo.
 */

/**
 * Imagen. Sin `src` se pinta un marcador visible con `pending` (qué foto falta):
 * nunca se rellena con una foto de stock.
 */
export type ImageRef = {
  src?: string
  alt: string
  pending?: string
  width?: number
  height?: number
}

/**
 * Destino de un botón. `whatsapp` y `email` salen de `profile`; `cv` es el PDF del CV
 * (o la página /cv mientras no exista el PDF); también rutas internas, anclas y URLs.
 */
export type ActionTarget =
  'whatsapp' | 'email' | 'cv' | `/${string}` | `#${string}` | `/#${string}` | `https://${string}`

export type Action = { label: string; to: ActionTarget }

export type SocialLink = { label: string; url: `https://${string}` }

export type Profile = {
  /** Nombre corto (logo, saludo). */
  name: string
  /** Nombre completo (SEO, footer, CV). */
  fullName: string
  role: string
  city: string
  /** Solo dígitos con indicativo, sin "+": "573001234567". Vacío = pendiente. */
  whatsapp: string
  /** Vacío = pendiente: el botón de correo lleva al formulario. */
  email: string
  /** Ruta del PDF en `public/` ("/cv-libardo.pdf"). Vacío = el botón lleva a /cv. */
  cvPdf: string
  photo: ImageRef
  social: SocialLink[]
}

export type Hero = {
  eyebrow: string
  /** El nombre se escribe letra por letra; `title` es el h1 completo. */
  greeting: string
  title: string
  text: string
  primary: Action
  secondary: Action
  /** Líneas del JSON de la tarjeta de terminal: [clave, valor ya formateado]. */
  terminal: { request: string; lines: [string, string][] }
}

export type Introduction = {
  eyebrow: string
  title: string
  /** Carta de presentación: el reverso de la tarjeta. */
  letter: string[]
  signature: string
  facts: { label: string; value: string }[]
  hint: string
}

export type Experience = {
  role: string
  company: string
  period: string
  summary: string
  highlights: string[]
  current?: boolean
}

export type Project = {
  slug: string
  title: string
  /** Nombre corto para enlaces compactos ("Usado en"). */
  shortTitle?: string
  context: string
  summary: string
  description: string[]
  stack: string[]
  /** Ruta del caso de estudio o URL pública del sitio en producción. */
  href?: `/${string}` | `https://${string}`
  hrefLabel?: string
  /** Captura en escritorio (16:10) y, opcional, en celular: se muestran juntas. */
  image?: ImageRef
  imageMobile?: ImageRef
  /** Aclaración bajo la captura (datos de prueba, créditos de otros). */
  imageNote?: string
  featured?: boolean
}

export type SkillIcon = 'server' | 'database' | 'layout' | 'cloud' | 'sparkles' | 'git'

export type SkillGroup = {
  title: string
  icon: SkillIcon
  /** Qué hago con esto, en una frase. Sin porcentajes ni niveles inventados. */
  summary: string
  items: string[]
  /** Slugs de proyectos donde se usó: se muestran como enlaces. */
  usedIn?: string[]
  /** Columnas que ocupa en el grid de escritorio. */
  span?: 2 | 3
}

export type CaseStudy = {
  slug: string
  eyebrow: string
  title: string
  lead: string
  context: string[]
  decisions: { title: string; text: string }[]
  result: string[]
  stack: string[]
  note: string
}

export type CvData = {
  summary: string
  education: { title: string; place: string; period: string }[]
  languages: { name: string; level: string }[]
}

export type Seo = { title: string; description: string; image?: string }

export type SectionCopy = { eyebrow: string; title: string; text?: string }

export type Site = {
  profile: Profile
  seo: Seo
  nav: { label: string; href: `/${string}` | `/#${string}` }[]
  hero: Hero
  introduction: Introduction
  sections: {
    experience: SectionCopy
    projects: SectionCopy
    skills: SectionCopy
    contact: SectionCopy
  }
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  /** Tecnologías de la cinta animada. */
  marquee: string[]
  caseStudy: CaseStudy
  cv: CvData
  pages: {
    projects: { seo: Seo; eyebrow: string; title: string; text: string }
    cv: { seo: Seo; eyebrow: string; title: string }
    sent: { seo: Seo; title: string; text: string }
  }
}
