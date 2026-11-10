import type { CSSProperties } from 'react'
import type { Introduction as IntroductionData, Profile } from '@/content/types'
import { FlipCard } from '@/components/motion/FlipCard'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'

/** Carta de presentación: tarjeta con foto que se inclina en 3D y se voltea para leer la carta. */
export function Introduction({
  introduction,
  profile
}: {
  introduction: IntroductionData
  profile: Profile
}) {
  const front = (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card p-4 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)]">
      <Media
        image={profile.photo}
        className="aspect-[4/5] w-full rounded-2xl"
        sizes="(min-width: 1024px) 26rem, 90vw"
      />
      <div className="flex items-end justify-between gap-4 px-2 pt-5 pb-2">
        <div>
          <p className="font-display text-2xl font-semibold">{profile.fullName}</p>
          <p className="text-muted">{profile.role}</p>
        </div>
        <span className="font-mono text-sm text-brand">{profile.name.toLowerCase()}_</span>
      </div>
      <span aria-hidden className="sheen absolute inset-y-0 left-0 w-1/3" />
      <span aria-hidden className="glare absolute inset-0" />
    </div>
  )

  const back = (
    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] border border-line bg-card p-7 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)] sm:p-9">
      <div className="space-y-4 text-[15px] leading-relaxed text-ink sm:text-base">
        <p className="eyebrow">{'// '}carta.md</p>
        {introduction.letter.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="font-display text-xl font-semibold text-brand">— {introduction.signature}</p>
      <span aria-hidden className="glare absolute inset-0" />
    </div>
  )

  return (
    <section id="presentacion" className="border-y border-line bg-surface-alt">
      <div className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader
            copy={{ eyebrow: introduction.eyebrow, title: introduction.title }}
            index={1}
          />
          <dl className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {introduction.facts.map((fact, index) => (
              <div
                key={fact.label}
                className="border-l-2 border-brand pl-4"
                data-reveal
                style={{ '--reveal-delay': 120 * (index + 1) } as CSSProperties}
              >
                <dt className="font-mono text-xs text-muted uppercase">{fact.label}</dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-md" data-reveal>
          <FlipCard
            front={front}
            back={back}
            hint={introduction.hint}
            flipLabel="Leer mi carta"
            unflipLabel="Ver mi foto"
          />
        </div>
      </div>
    </section>
  )
}
