import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

/** Títulos, cuerpo y detalles de código. Las tres tienen ñ, tildes, ü, ¿ y ¡. */
export const displayFont = Space_Grotesk({
  variable: '--font-display-family',
  subsets: ['latin'],
  display: 'swap'
})

export const bodyFont = Inter({
  variable: '--font-body-family',
  subsets: ['latin'],
  display: 'swap'
})

export const monoFont = JetBrains_Mono({
  variable: '--font-mono-family',
  subsets: ['latin'],
  display: 'swap'
})
