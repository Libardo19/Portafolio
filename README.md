# Portafolio · Libardo

Portafolio personal de desarrollador full stack: home con animaciones, carta de presentación en
tarjeta 3D, proyectos, caso de estudio con diagrama animado, CV imprimible y formulario de
contacto que llega al correo.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Playwright + axe.
Base: [jelix-web-starter](https://github.com/Jelix-co/jelix-web-starter) (estructura, tipografías,
SEO y compuerta de calidad).

## Uso

```bash
npm install
npx playwright install chromium   # una vez por máquina
cp .env.example .env.local        # y llenar las variables
npm run dev                       # http://localhost:3000
npm run qa                        # lint + typecheck + prettier + build + Playwright
```

## Dónde se edita

| Qué | Dónde |
|---|---|
| Todo el texto (perfil, experiencia, proyectos, CV) | `src/content/site.ts` |
| Colores claro/oscuro | `src/app/theme.css` |
| Animaciones | `src/app/globals.css` (sección ANIMACIONES) y `src/components/motion/` |
| Foto | `public/images/` + `profile.photo.src` en `site.ts` |
| CV en PDF | `npm run cv:pdf` lo genera desde `site.ts` en `public/cv-libardo.pdf` (regenerar tras cambiar el contenido) |

Lo marcado `REVISAR` en `site.ts` son datos pendientes.

## Despliegue (Vercel)

1. Importar el repo en Vercel (framework: Next.js, sin configuración extra).
2. Cargar las variables de `.env.example`, con `NEXT_PUBLIC_SITE_URL` = la URL final.
3. Cada push a `main` despliega producción; las ramas generan previews.
