import { MotionRuntime } from '@/components/motion/MotionRuntime'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { getSite } from '@/lib/content'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const site = await getSite()
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-card focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <SiteHeader site={site} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter site={site} />
      <WhatsAppFloat profile={site.profile} />
      <MotionRuntime />
    </>
  )
}
