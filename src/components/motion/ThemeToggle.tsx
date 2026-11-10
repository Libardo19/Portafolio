'use client'

import { Moon, Sun } from 'lucide-react'
import type { MouseEvent } from 'react'

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

/**
 * Cambia entre claro y oscuro y lo recuerda. Con View Transitions, el tema nuevo se abre
 * en círculo desde el botón; sin ellas (o con movimiento reducido), cambia de una vez.
 * Los íconos se alternan por CSS para que el HTML del servidor no dependa del tema.
 */
export function ThemeToggle() {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      root.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        // Sin almacenamiento (ventana privada): el tema dura hasta recargar.
      }
    }

    const doc = document as ViewTransitionDocument
    if (!doc.startViewTransition || !root.classList.contains('motion')) {
      apply()
      return
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre tema claro y oscuro"
      className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-card text-ink transition-colors hover:border-brand"
    >
      <Moon className="size-5 dark:hidden" aria-hidden />
      <Sun className="hidden size-5 dark:block" aria-hidden />
    </button>
  )
}
