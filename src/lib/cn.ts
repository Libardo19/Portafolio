import clsx, { type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Une clases y resuelve conflictos de Tailwind (la última gana).
 * Los nombres de color son los tokens de `src/app/theme.css`: si agregas uno, agrégalo aquí.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ['brand', 'on-brand', 'surface', 'surface-alt', 'card', 'ink', 'muted', 'line']
    }
  }
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
