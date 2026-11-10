import fs from 'node:fs'
import { expect, test } from '@playwright/test'
import { routes, slug } from './routes'

/**
 * Medición de LABORATORIO en el build local (no son datos de campo ni un puntaje de Lighthouse).
 * Umbrales del playbook web (PERF-01): LCP ≤ 2,5 s y CLS ≤ 0,1. INP no se mide en laboratorio.
 */
const report: { route: string; width: number; lcp: number; cls: number }[] = []

test.afterAll(() => {
  fs.mkdirSync('qa', { recursive: true })
  fs.writeFileSync('qa/vitals.json', JSON.stringify(report, null, 2))
})

for (const route of routes) {
  for (const width of [390, 1440]) {
    test(`${route} vitals a ${width}px`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 900 }
      })
      const page = await context.newPage()
      await page.addInitScript(() => {
        const vitals = { lcp: 0, cls: 0 }
        Object.assign(window, { __vitals: vitals })
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) vitals.lcp = entry.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & {
            value: number
            hadRecentInput: boolean
          })[])
            if (!entry.hadRecentInput) vitals.cls += entry.value
        }).observe({ type: 'layout-shift', buffered: true })
      })
      await page.goto(route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1000)
      const vitals = await page.evaluate(
        () => (window as unknown as { __vitals: { lcp: number; cls: number } }).__vitals
      )
      report.push({ route: slug(route), width, ...vitals })
      await context.close()
      expect(vitals.lcp, 'LCP (ms)').toBeLessThanOrEqual(2500)
      expect(vitals.cls, 'CLS').toBeLessThanOrEqual(0.1)
    })
  }
}
