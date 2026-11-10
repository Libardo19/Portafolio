import { site } from '@/content/site'
import type { Site } from '@/content/types'

/**
 * Capa de datos. Hoy devuelve el contenido local de `src/content/site.ts`; si algún día
 * el contenido sale de un API, solo cambia este archivo.
 */
export async function getSite(): Promise<Site> {
  return site
}
