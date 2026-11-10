import type { CSSProperties } from 'react'
import type { Hero as HeroData, Profile } from '@/content/types'
import { ActionLink } from '@/components/ui/ActionLink'

const delay = (ms: number) => ({ '--rise-delay': ms }) as CSSProperties

/**
 * Hero: el saludo se escribe letra por letra y el resto sube en cascada.
 * El h1 completo va en texto para lectores de pantalla y buscadores; las letras animadas
 * son decorativas (`aria-hidden`). Sin `motion`, todo aparece de una vez.
 */
export function Hero({ hero, profile }: { hero: HeroData; profile: Profile }) {
  const rest = hero.title.slice(hero.greeting.length).trim()
  const typingEnd = 250 + hero.greeting.length * 55

  return (
    <section
      id="inicio"
      className="container-page grid items-center gap-12 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-28"
    >
      <div>
        <p className="eyebrow" data-rise style={delay(0)}>
          {'// '}
          {hero.eyebrow} · {profile.city}
        </p>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
          <span className="sr-only">{hero.title}</span>
          <span aria-hidden>
            <span className="block">
              {Array.from(hero.greeting).map((char, index) => (
                <span key={index} className="type-letter" style={{ '--i': index } as CSSProperties}>
                  {char}
                </span>
              ))}
              <span className="caret" />
            </span>
            <span className="mt-2 block text-muted" data-rise style={delay(typingEnd)}>
              {rest}
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted" data-rise style={delay(typingEnd + 150)}>
          {hero.text}
        </p>
        <div className="mt-8 flex flex-wrap gap-3" data-rise style={delay(typingEnd + 300)}>
          <ActionLink action={hero.primary} profile={profile} />
          <ActionLink action={hero.secondary} profile={profile} variant="secondary" />
          <ActionLink
            action={{ label: 'WhatsApp', to: 'whatsapp' }}
            profile={profile}
            variant="secondary"
          />
        </div>
      </div>

      <div
        className="overflow-hidden rounded-card border border-line bg-card shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]"
        data-rise
        style={delay(typingEnd + 200)}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-2 font-mono text-xs text-muted">
            {hero.terminal.request} · 200 OK
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
          <code>
            <span className="block">{'{'}</span>
            {hero.terminal.lines.map(([key, value], index) => (
              <span
                key={key}
                className="block pl-4"
                data-rise
                style={delay(typingEnd + 500 + index * 180)}
              >
                <span className="text-brand">&quot;{key}&quot;</span>: {value}
                {index < hero.terminal.lines.length - 1 ? ',' : ''}
              </span>
            ))}
            <span className="block">
              {'}'}
              <span className="caret" />
            </span>
          </code>
        </pre>
      </div>
    </section>
  )
}
