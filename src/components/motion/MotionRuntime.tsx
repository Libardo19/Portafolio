'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const motionOn = () => document.documentElement.classList.contains('motion')
const finePointer = () => matchMedia('(pointer: fine)').matches

/**
 * Un solo componente para los efectos de toda la página:
 * - `data-reveal` / `data-diagram`: les pone `data-shown` al entrar en pantalla.
 * - `.spotlight`: el borde sigue al puntero (--mx/--my).
 * - `.magnetic`: el botón se acerca un poco al puntero (--tx/--ty).
 * Sin la clase `motion` (sin JS o con movimiento reducido) no hace nada y todo se ve quieto.
 */
export function MotionRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-diagram]')
    if (!motionOn() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-shown', ''))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-shown', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!motionOn() || !finePointer()) return
    let magnet: HTMLElement | null = null

    const release = () => {
      magnet?.style.removeProperty('--tx')
      magnet?.style.removeProperty('--ty')
      magnet = null
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const card = target?.closest<HTMLElement>('.spotlight')
      if (card) {
        const box = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - box.left}px`)
        card.style.setProperty('--my', `${event.clientY - box.top}px`)
      }
      const button = target?.closest<HTMLElement>('.magnetic') ?? null
      if (button !== magnet) release()
      if (button) {
        magnet = button
        const box = button.getBoundingClientRect()
        const dx = event.clientX - (box.left + box.width / 2)
        const dy = event.clientY - (box.top + box.height / 2)
        button.style.setProperty('--tx', `${dx * 0.25}px`)
        button.style.setProperty('--ty', `${dy * 0.35}px`)
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', release)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', release)
    }
  }, [])

  return null
}
