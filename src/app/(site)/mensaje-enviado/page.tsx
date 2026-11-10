import type { Metadata } from 'next'
import Link from 'next/link'
import { getSite } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSite()
  return {
    title: pages.sent.seo.title,
    description: pages.sent.seo.description,
    robots: { index: false, follow: false }
  }
}

/** Destino del formulario cuando se envía sin JavaScript. */
export default async function SentPage() {
  const { pages } = await getSite()
  return (
    <div className="container-page flex flex-col items-start py-24 sm:py-32">
      <p className="eyebrow">{'// 200 OK'}</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{pages.sent.title}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{pages.sent.text}</p>
      <Link href="/" className="mt-8 font-semibold text-brand underline underline-offset-4">
        Volver al inicio
      </Link>
    </div>
  )
}
