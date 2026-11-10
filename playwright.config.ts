import { defineConfig } from '@playwright/test'

/**
 * QA del mockup. Corre contra el build de producción (`npm run build` antes; `npm run qa` lo hace todo).
 * Navegador: el Chromium de Playwright (`npx playwright install chromium`). Para usar un Chrome
 * ya instalado: `PW_CHANNEL=chrome npm test`.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  workers: 1,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: 'http://localhost:3000',
    channel: process.env.PW_CHANNEL || undefined,
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
})
