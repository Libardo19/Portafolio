import { expect, test } from '@playwright/test'
import { routes, slug } from './routes'

const widths = [360, 768, 1440]

for (const route of routes) {
  for (const width of widths) {
    test(`${route} se ve bien a ${width}px`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))

      await page.setViewportSize({ width, height: width < 768 ? 800 : 900 })
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)

      await expect(page.locator('h1')).toHaveCount(1)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        'sin scroll horizontal'
      ).toBe(true)
      expect(
        await page
          .locator('img')
          .evaluateAll((images: HTMLImageElement[]) =>
            images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src)
          ),
        'sin imágenes rotas'
      ).toEqual([])

      if (width !== 768) {
        await page.screenshot({ path: `qa/${slug(route)}-${width}.png`, fullPage: true })
      }
      expect(errors, 'sin errores en consola').toEqual([])
    })
  }
}
