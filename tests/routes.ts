import { site } from '../src/content/site'

/** Rutas públicas del portafolio: todas pasan por responsive, axe y vitals. */
export const routes = [
  '/',
  '/proyectos',
  `/proyectos/${site.caseStudy.slug}`,
  '/cv',
  '/mensaje-enviado'
]

export const slug = (route: string) => (route === '/' ? 'home' : route.slice(1).replace(/\//g, '-'))

export { site }
