import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container-page flex flex-1 flex-col items-start justify-center py-24">
      <p className="eyebrow">{'// 404 Not Found'}</p>
      <h1 className="mt-4 text-4xl font-semibold">Esta página no existe</h1>
      <Link href="/" className="mt-8 font-semibold text-brand underline underline-offset-4">
        Volver al inicio
      </Link>
    </main>
  )
}
