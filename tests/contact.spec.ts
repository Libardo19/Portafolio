import { expect, test } from '@playwright/test'

/** El API de contacto valida, frena bots y no finge enviar si falta configuración. */
test.describe('API de contacto', () => {
  test('rechaza datos inválidos', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: { name: '', email: 'no-es-correo', message: 'hola' }
    })
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(Object.keys(body.errors)).toEqual(['name', 'email', 'message'])
  })

  test('el campo trampa responde ok sin enviar', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: { name: 'Bot', email: 'bot@spam.com', message: 'mensaje de spam', website: 'x' }
    })
    expect(response.status()).toBe(200)
  })

  test('sin Resend configurado responde 503 (no finge éxito)', async ({ request }) => {
    test.skip(!!process.env.RESEND_API_KEY, 'Resend está configurado en este entorno')
    const response = await request.post('/api/contact', {
      data: { name: 'Ana', email: 'ana@empresa.com', message: 'Hola, quiero hablar contigo.' },
      headers: { 'x-forwarded-for': '203.0.113.7' }
    })
    expect(response.status()).toBe(503)
  })

  test('el formulario muestra errores de validación', async ({ page }) => {
    await page.goto('/#contacto')
    await page.getByRole('button', { name: 'Enviar mensaje' }).click()
    await expect(page.getByText('Escribe tu nombre.')).toBeVisible()
  })
})
