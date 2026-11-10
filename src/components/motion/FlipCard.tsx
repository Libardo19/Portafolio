'use client'

import { RotateCw } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

const MAX_TILT = 10

/**
 * Tarjeta que se inclina con el puntero (o con el giro del celular, donde el navegador lo
 * permite sin pedir permiso) y se voltea al tocarla. El botón "Voltear" es el camino por teclado.
 */
export function FlipCard({
  front,
  back,
  hint,
  flipLabel,
  unflipLabel
}: {
  front: ReactNode
  back: ReactNode
  hint: string
  flipLabel: string
  unflipLabel: string
}) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)
  const [turning, setTurning] = useState(false)

  const setTilt = (rx: number, ry: number, gx = 50, gy = 0) => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', `${rx}deg`)
    card.style.setProperty('--ry', `${ry}deg`)
    card.style.setProperty('--gx', `${gx}%`)
    card.style.setProperty('--gy', `${gy}%`)
  }

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('motion')) return
    const coarse = matchMedia('(pointer: coarse)').matches
    const needsPermission =
      typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent
    if (!coarse || needsPermission) return

    const onOrient = (event: DeviceOrientationEvent) => {
      const beta = Math.max(-30, Math.min(30, (event.beta ?? 45) - 45))
      const gamma = Math.max(-30, Math.min(30, event.gamma ?? 0))
      setTilt((-beta / 30) * MAX_TILT * 0.6, (gamma / 30) * MAX_TILT * 0.6)
    }
    window.addEventListener('deviceorientation', onOrient)
    return () => window.removeEventListener('deviceorientation', onOrient)
  }, [])

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !document.documentElement.classList.contains('motion'))
      return
    const box = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width
    const py = (event.clientY - box.top) / box.height
    setTilt((0.5 - py) * MAX_TILT * 2, (px - 0.5) * MAX_TILT * 2, px * 100, py * 100)
  }

  const flip = () => {
    if (!document.documentElement.classList.contains('motion')) return
    setTurning(true)
    setFlipped((value) => !value)
    window.setTimeout(() => setTurning(false), 800)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={sceneRef}
        className="flip-scene w-full"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt(0, 0)}
        onClick={flip}
      >
        <div
          ref={cardRef}
          className="flip-card"
          data-flipped={flipped ? '' : undefined}
          data-turning={turning ? '' : undefined}
        >
          <div className="flip-face flip-front">{front}</div>
          <div className="flip-face flip-back">{back}</div>
        </div>
      </div>
      <div className="motion-only">
        <button
          type="button"
          onClick={flip}
          aria-pressed={flipped}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-5 text-sm font-semibold text-ink transition-colors hover:border-brand"
        >
          <RotateCw className="size-4" aria-hidden />
          {flipped ? unflipLabel : flipLabel}
        </button>
        <p className="mt-2 text-center text-sm text-muted">{hint}</p>
      </div>
    </div>
  )
}
