@AGENTS.md

# CLAUDE.md — portafolio

Portafolio personal de Libardo (desarrollador full stack), para adjuntar a LinkedIn y desplegado en Vercel.
Nació de `jelix-web-starter`, pero **no es un mockup de JELIX_**: no hay modo propuesta y el sitio se indexa.

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Playwright + axe.

## Cómo está armado

| Qué | Dónde | Regla |
|---|---|---|
| Texto | `src/content/site.ts` (tipos en `types.ts`) | Nada de texto en componentes. |
| Colores | `src/app/theme.css` | Variables en `:root` (claro) y `[data-theme='dark']`; contraste AA en ambos. |
| Tema | script de `src/app/layout.tsx` + `ThemeToggle` | Se fija antes de pintar (sin parpadeo). |
| Animaciones | `globals.css` (ANIMACIONES) + `src/components/motion/` | Solo bajo la clase `motion` en `<html>`. |
| Contacto | `src/app/api/contact/route.ts` + `ContactForm` | Resend por `fetch`; sin variables responde 503. |

Rutas: `/`, `/proyectos`, `/proyectos/video-ia`, `/cv`, `/mensaje-enviado` (noindex), `/api/contact`.

## Reglas no negociables

1. **Nada inventado.** Fechas, cargos, cifras y logros salen de Libardo. Si falta: `// REVISAR: …` en `site.ts`.
2. **Confidencialidad.** De finCreator y de clientes no se muestra código, datos ni capturas internas.
3. **Animaciones con red de seguridad.** Todo efecto depende de la clase `motion` (JS activo y sin
   `prefers-reduced-motion`). Sin ella, el contenido se ve completo y quieto. Nada de animar el
   contenido de forma que tape el LCP o rompa la lectura sin JavaScript.
4. **Accesibilidad y rendimiento** no se negocian: si `npm run qa` falla, no se despliega.
5. **Next 16 cambió APIs.** Antes de usar una API que no esté ya en el repo, leer `node_modules/next/dist/docs/`.

## Compuerta de calidad

```bash
npm run qa        # lint + typecheck + prettier + build + Playwright
```

Playwright recorre todas las rutas: responsive a 360/768/1440 sin scroll horizontal, un solo `h1`,
sin errores de consola; axe WCAG 2.2 AA en tema claro y oscuro; menú móvil; lectura sin JavaScript
y con movimiento reducido; tema persistente; tarjeta que se voltea; API de contacto; LCP ≤ 2,5 s y CLS ≤ 0,1.

## Convenciones

- Código, nombres y commits en inglés (Conventional Commits); contenido en español colombiano.
- Prettier: sin punto y coma, comillas simples, 100 columnas.
