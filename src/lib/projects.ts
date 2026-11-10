import type { Project } from '@/content/types'

export type PlacedProject = { project: Project; reverse: boolean; full: boolean }

/**
 * Orden de la grilla de proyectos: primero los que tienen captura (vitrinas anchas, alternando
 * el lado de la imagen), luego las tarjetas; si queda una tarjeta sola, ocupa toda la fila.
 */
export function placeProjects(projects: Project[]): PlacedProject[] {
  const wide = projects.filter((project) => project.image?.src)
  const cards = projects.filter((project) => !project.image?.src)
  return [
    ...wide.map((project, index) => ({ project, reverse: index % 2 === 1, full: false })),
    ...cards.map((project, index) => ({
      project,
      reverse: false,
      full: cards.length % 2 === 1 && index === cards.length - 1
    }))
  ]
}
