import { expect, test } from '@playwright/test'
import { isPendingWhatsapp } from '../src/lib/actions'
import { routes, site } from './routes'

test('menú móvil abre, navega y se cierra', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  const menu = page.getByRole('navigation', { name: 'Móvil' })
  await expect(menu).toBeVisible()
  await menu.getByRole('link', { name: 'Proyectos' }).click()
  await expect(menu).toBeHidden()
  await expect(page).toHaveURL(/\/proyectos$/)
})

test('el sitio se lee completo sin JavaScript (carta incluida)', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  for (const route of routes) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
  }
  await page.goto('/')
  await expect(page.getByText(site.introduction.letter[0])).toBeVisible()
  await expect(page.getByRole('heading', { name: site.sections.contact.title })).toBeVisible()
  await context.close()
})

test('con movimiento reducido no se esconde nada', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/motion/)
  await expect(page.getByText(site.introduction.letter[0])).toBeVisible()
  await context.close()
})

test('el tema cambia, se recuerda y no parpadea al recargar', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Cambiar entre tema claro y oscuro' }).click()
  await expect(html).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'dark')
})

test('la carta de presentación se voltea', async ({ page }) => {
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Leer mi carta' })
  await button.scrollIntoViewIfNeeded()
  await button.click()
  await expect(page.getByRole('button', { name: 'Ver mi foto' })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
})

test('honestidad: sin WhatsApp definido no hay links a wa.me', async ({ page }) => {
  test.skip(!isPendingWhatsapp(site.profile.whatsapp), 'ya hay número de WhatsApp')
  for (const route of routes) {
    await page.goto(route)
    await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0)
  }
})

test('inventario de pendientes (fotos)', async ({ page }) => {
  let images = 0
  for (const route of routes) {
    await page.goto(route)
    images += await page.locator('[data-pending-image]').count()
  }
  // No falla: deja la cuenta en el reporte.
  test.info().annotations.push({ type: 'pendientes', description: `${images} fotos pendientes` })
  console.log(`Pendientes: ${images} fotos`)
})
