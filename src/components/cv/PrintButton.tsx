'use client'

import { Printer } from 'lucide-react'

/** Mientras no exista el PDF del CV: el navegador lo guarda como PDF desde la vista de impresión. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="magnetic inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-on-brand transition-opacity hover:opacity-90"
    >
      <Printer className="size-4" aria-hidden />
      {label}
    </button>
  )
}
