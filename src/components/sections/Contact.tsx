import type { Profile, SectionCopy } from '@/content/types'
import { ActionLink } from '@/components/ui/ActionLink'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactForm } from './ContactForm'

export function Contact({ copy, profile }: { copy: SectionCopy; profile: Profile }) {
  return (
    <section id="contacto" className="border-t border-line bg-surface-alt">
      <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeader copy={copy} index={5} />
          <div className="mt-8 flex flex-col gap-3 sm:max-w-sm" data-reveal>
            <ActionLink
              action={{ label: 'Escribir por WhatsApp', to: 'whatsapp' }}
              profile={profile}
            />
            <ActionLink
              action={{ label: 'Descargar CV', to: 'cv' }}
              profile={profile}
              variant="secondary"
            />
            {profile.email ? (
              <ActionLink
                action={{ label: profile.email, to: 'email' }}
                profile={profile}
                variant="secondary"
              />
            ) : null}
            {profile.social.map((item) => (
              <ActionLink
                key={item.url}
                action={{ label: item.label, to: item.url }}
                profile={profile}
                variant="secondary"
              />
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
