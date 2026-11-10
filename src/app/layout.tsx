import type { Metadata, Viewport } from 'next'
import { site } from '@/content/site'
import { bodyFont, displayFont, monoFont } from '@/lib/fonts'
import { siteUrl } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s` },
  description: site.seo.description,
  openGraph: {
    type: 'profile',
    locale: 'es_CO',
    siteName: site.profile.fullName,
    ...(site.seo.image && { images: [{ url: site.seo.image, alt: site.profile.fullName }] })
  },
  twitter: { card: 'summary_large_image' }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1015' }
  ]
}

/**
 * Corre antes de pintar: fija el tema (lo guardado o el del sistema) para que no parpadee,
 * y activa las animaciones solo si hay JavaScript y no se pidió reducir el movimiento.
 */
const bootScript = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion')}})()`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es-CO"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
