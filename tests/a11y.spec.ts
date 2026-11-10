import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes } from './routes'

/** WCAG 2.2 nivel AA (playbook web: A11Y). */
const themes = ['light', 'dark'] as const

for (const route of routes) {
  for (const width of [360, 1440]) {
    for (const theme of themes) {
      test(`${route} pasa axe WCAG 2.2 AA a ${width}px (${theme})`, async ({ browser }) => {
        // Sin animaciones: axe revisa el contraste del estado final, no de un fotograma intermedio.
        const context = await browser.newContext({
          reducedMotion: 'reduce',
          colorScheme: theme,
          viewport: { width, height: 900 }
        })
        const page = await context.newPage()
        await page.goto(route)
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()
        const summary = results.violations.map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`
        )
        await context.close()
        expect(summary).toEqual([])
      })
    }
  }
}
