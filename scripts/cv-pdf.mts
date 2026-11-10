/**
 * Genera el CV en PDF (A4) desde `src/content/site.ts`: la web, la página /cv y el PDF salen
 * del mismo contenido y nunca se contradicen.
 *
 *   npm run cv:pdf            → public/cv-libardo.pdf (+ vista previa en qa/cv-preview.png)
 *
 * Usa el Chrome instalado (PW_CHANNEL=chromium para el de Playwright).
 * Texto real y seleccionable (sirve para ATS y LinkedIn); el orden del HTML pone primero el
 * contenido principal, así un lector automático lo lee en orden aunque la barra lateral se
 * pinte a la izquierda.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { site } from '../src/content/site.ts'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'public', 'cv-libardo.pdf')
const preview = path.join(root, 'qa', 'cv-preview.png')

const { profile, cv, experience, projects, skills } = site
const pending: string[] = []

const esc = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Dato faltante: se ve marcado en el PDF y se lista en la consola. */
const missing = (label: string) => {
  pending.push(label)
  return `<span class="pending">[${esc(label)}]</span>`
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
const portfolio = siteUrl && !siteUrl.includes('localhost') ? siteUrl : ''
const bare = (url: string) =>
  decodeURIComponent(url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))
const link = (url: string, text = bare(url)) => `<a href="${esc(url)}">${esc(text)}</a>`

const linkedin = profile.social.find((item) => /linkedin/i.test(item.label))
const github = profile.social.find((item) => /github/i.test(item.label))

const fullName = profile.fullName.trim().includes(' ')
  ? esc(profile.fullName)
  : `${esc(profile.fullName)} ${missing('apellidos')}`

const contact = [
  [
    'Correo',
    profile.email
      ? `<a href="mailto:${esc(profile.email)}">${esc(profile.email).replace('@', '<wbr>@')}</a>`
      : missing('correo')
  ],
  [
    'WhatsApp',
    profile.whatsapp
      ? link(
          `https://wa.me/${profile.whatsapp}`,
          `+${profile.whatsapp}`.replace(/^\+57(\d{3})(\d{3})(\d{4})$/, '+57 $1 $2 $3')
        )
      : missing('número')
  ],
  ['LinkedIn', linkedin ? link(linkedin.url) : missing('URL de LinkedIn')],
  ['GitHub', github ? link(github.url) : missing('GitHub')],
  // Hasta que el portafolio esté publicado (NEXT_PUBLIC_SITE_URL), la fila no aparece.
  ...(portfolio ? [['Portafolio', link(portfolio)]] : [])
]

const experienceHtml = experience
  .map(
    (item) => `
    <article class="job">
      <header>
        <h3>${esc(item.role)} <span class="at">· ${esc(item.company)}</span></h3>
        <span class="period">${item.period === 'Actual' ? `${missing('fecha de inicio')} – actual` : esc(item.period)}</span>
      </header>
      <p class="lead">${esc(item.summary)}</p>
      <ul>${item.highlights.map((highlight) => `<li>${esc(highlight)}</li>`).join('')}</ul>
    </article>`
  )
  .join('')

// Una página: los cuatro proyectos con captura o caso de estudio (el resto vive en la web).
const cvProjects = projects.filter((project) => project.featured || project.image?.src).slice(0, 4)

const projectsHtml = cvProjects
  .map((project) => {
    const url = project.href?.startsWith('https://')
      ? project.href
      : project.href && portfolio
        ? `${portfolio.replace(/\/$/, '')}${project.href}`
        : ''
    return `
    <article class="project">
      <h3>${esc(project.title)}</h3>
      <p class="context">${esc(project.context)}</p>
      ${url ? `<p class="url">${link(url)}</p>` : ''}
      <p>${esc(project.summary)}</p>
      <p class="stack">${project.stack.map(esc).join(' · ')}</p>
    </article>`
  })
  .join('')

const skillsHtml = skills
  .map(
    (group) => `
    <div class="skill">
      <h4>${esc(group.title)}</h4>
      <ul class="chips">${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
    </div>`
  )
  .join('')

const educationHtml = cv.education
  .map(
    (item) => `
    <div class="edu">
      <p class="strong">${/por confirmar/i.test(item.title) ? missing('carrera') : esc(item.title)}</p>
      <p>${esc(item.place)}</p>
      <p class="muted">${esc(item.period)}</p>
    </div>`
  )
  .join('')

const languages = [...cv.languages]
if (!languages.some((language) => /ingl/i.test(language.name)))
  languages.push({ name: 'Inglés', level: '' })
const languagesHtml = languages
  .map(
    (language) =>
      `<li><span class="strong">${esc(language.name)}</span> ${language.level ? esc(language.level) : missing('nivel')}</li>`
  )
  .join('')

const initials = profile.name.slice(0, 1).toUpperCase()

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>CV · ${esc(profile.fullName)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap">
<style>
  @page { size: A4; margin: 0; }
  :root {
    --brand: #0f766e; --brand-soft: #e6f2f0; --ink: #15171c; --muted: #535864;
    --line: #dcddd8; --side: #f1f4f2; --side-w: 64mm;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    font-family: Inter, system-ui, sans-serif; font-size: 8.5pt; line-height: 1.4;
    color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  /* Fondo de la barra lateral en todas las páginas. */
  .side-bg { position: fixed; inset: 0 auto 0 0; width: var(--side-w); background: var(--side); z-index: -1; }
  .page { display: grid; grid-template-columns: var(--side-w) 1fr; grid-template-areas: 'side main'; }
  main { grid-area: main; padding: 11mm 11mm 9mm 9mm; }
  aside { grid-area: side; padding: 11mm 7mm 9mm 8mm; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; margin: 0; letter-spacing: -0.01em; }
  p { margin: 0; }
  .mono, .period, .stack, .context, .role, .eyebrow { font-family: 'JetBrains Mono', monospace; }
  .strong { font-weight: 600; }
  .muted { color: var(--muted); }
  .pending { color: #b45309; font-weight: 600; }

  /* Encabezado */
  .top { padding-bottom: 4mm; border-bottom: 2px solid var(--ink); margin-bottom: 4mm; }
  .role { color: var(--brand); font-size: 9pt; letter-spacing: 0.02em; }
  h1 { font-size: 25pt; line-height: 1.05; font-weight: 700; margin-top: 1.5mm; }
  h1 .cursor { color: var(--brand); }
  .tagline { margin-top: 2.5mm; color: var(--muted); font-size: 9.5pt; }

  /* Secciones */
  section { margin-bottom: 4mm; }
  h2 {
    font-size: 8pt; text-transform: uppercase; letter-spacing: 0.14em; color: var(--brand);
    font-family: 'JetBrains Mono', monospace; font-weight: 500; margin-bottom: 2.6mm;
    display: flex; align-items: center; gap: 2.5mm;
  }
  h2::after { content: ''; flex: 1; height: 1px; background: var(--line); }

  .job { position: relative; padding-left: 4.2mm; margin-bottom: 2.8mm; break-inside: avoid; }
  .job::before { content: ''; position: absolute; left: 0; top: 1.6mm; width: 1.8mm; height: 1.8mm; border-radius: 50%; background: var(--brand); }
  .job::after { content: ''; position: absolute; left: 0.8mm; top: 4mm; bottom: -3mm; width: 0.25mm; background: var(--line); }
  .job:last-child::after { display: none; }
  .job header { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  h3 { font-size: 10.5pt; font-weight: 600; }
  .at { color: var(--brand); }
  .period { font-size: 7.5pt; color: var(--muted); white-space: nowrap; }
  .lead { color: var(--muted); margin-top: 0.6mm; }
  ul { margin: 1.2mm 0 0; padding-left: 4mm; }
  li { margin-bottom: 0.6mm; }
  li::marker { color: var(--brand); }

  .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm 5mm; }
  .project { break-inside: avoid; border-top: 1px solid var(--line); padding-top: 2mm; }
  .project h3 { font-size: 9.6pt; }
  .project .url { font-family: 'JetBrains Mono', monospace; font-size: 7pt; color: var(--brand); margin-bottom: 0.8mm; }
  .context { font-size: 6.8pt; color: var(--muted); margin: 0.4mm 0 0.8mm; }
  .stack { font-size: 7pt; color: var(--brand); margin-top: 1mm; }

  /* Barra lateral */
  .avatar {
    width: 22mm; height: 22mm; border-radius: 50%; background: var(--ink); color: #fff;
    display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-size: 20pt; font-weight: 700;
    margin-bottom: 5mm; overflow: hidden;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .avatar span { color: var(--brand); filter: brightness(1.6); }
  aside section { margin-bottom: 4.5mm; }
  aside h2 { margin-bottom: 2.2mm; }
  .contact { list-style: none; padding: 0; margin: 0; }
  .contact li { margin-bottom: 1.4mm; word-break: break-word; }
  .contact .label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 6.6pt; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .skill { margin-bottom: 2.2mm; }
  .skill h4 { font-size: 8.4pt; font-weight: 600; margin-bottom: 1mm; }
  .chips { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1mm; }
  .chips li { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 6.6pt; padding: 0.5mm 1.6mm; border-radius: 1.2mm; background: #fff; border: 1px solid var(--line); }
  .edu p { margin-bottom: 0.4mm; }
  .langs { list-style: none; padding: 0; margin: 0; }
  .langs li { margin-bottom: 1mm; }
</style>
</head>
<body>
<div class="side-bg"></div>
<div class="page">
  <main>
    <div class="top">
      <p class="role">// ${esc(profile.role)} · ${esc(profile.city)}</p>
      <h1>${fullName}<span class="cursor">_</span></h1>
      <p class="tagline">${esc(site.hero.text)}</p>
    </div>
    <section>
      <h2>Perfil</h2>
      <p>${esc(cv.summary)}</p>
    </section>
    <section>
      <h2>Experiencia</h2>
      ${experienceHtml}
    </section>
    <section>
      <h2>Proyectos</h2>
      <div class="projects">${projectsHtml}</div>
    </section>
  </main>
  <aside>
    <div class="avatar">${
      profile.photo.src
        ? `<img src="${esc(pathToFileURL(path.join(root, 'public', profile.photo.src)).href)}" alt="">`
        : `${initials}<span>_</span>`
    }</div>
    <section>
      <h2>Contacto</h2>
      <ul class="contact">${contact
        .map(([label, value]) => `<li><span class="label">${label}</span>${value}</li>`)
        .join('')}</ul>
    </section>
    <section>
      <h2>Habilidades</h2>
      ${skillsHtml}
    </section>
    <section>
      <h2>Educación</h2>
      ${educationHtml}
    </section>
    <section>
      <h2>Idiomas</h2>
      <ul class="langs">${languagesHtml}</ul>
    </section>
  </aside>
</div>
</body>
</html>`

const browser = await chromium.launch(
  process.env.PW_CHANNEL === 'chromium' ? {} : { channel: process.env.PW_CHANNEL || 'chrome' }
)
const page = await browser.newPage()
// Las rutas locales (foto) se cargan desde file://.
const htmlPath = path.join(root, 'qa', 'cv.html')
fs.mkdirSync(path.dirname(htmlPath), { recursive: true })
fs.writeFileSync(htmlPath, html)
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true })
await page.setViewportSize({ width: 794, height: 1123 })
await page.screenshot({ path: preview, fullPage: true })
await browser.close()

console.log(`CV listo: ${path.relative(root, out)} (vista previa: ${path.relative(root, preview)})`)
if (pending.length) console.log(`Datos pendientes en el PDF: ${[...new Set(pending)].join(', ')}`)
