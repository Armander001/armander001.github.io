# A. Benavidez — Portfolio

Personal portfolio and digital exhibition: scientific visualization, remote sensing, coral reefs, and digital twins. One message everywhere: *"I transform scientific data into meaningful interactive experiences."*

Live at **https://armander001.github.io**.

## Stack

- [Astro 5](https://astro.build) (static output, TypeScript strict)
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` — CSS-first config in `src/styles/global.css` (no `tailwind.config.js`)
- `@astrojs/mdx` + `@astrojs/sitemap`
- Self-hosted fonts: Fraunces Variable (display), Inter Variable (body), JetBrains Mono (data/mono accents)
- No frameworks or animation libraries — interactivity is small vanilla TS in Astro `<script>` tags

## Development

Requires Node 22 and npm.

```sh
npm install     # install dependencies
npm run dev     # dev server at localhost:4321
npm run build   # production build to dist/
npm run preview # preview the production build
npm run check   # astro check (type/diagnostic pass)
```

## Deployment

Deploys automatically to GitHub Pages from `main` via `.github/workflows/deploy.yml` (`withastro/action` → `actions/deploy-pages`).

One-time setup: in the repository settings, enable **Pages → Build and deployment → Source: GitHub Actions**.

## Documentation

- `docs/plan/` — design and technical plan; `docs/plan/SPEC.md` is the authoritative spec.
- `CONTENT-GUIDE.md` (coming with the content work package) — how to replace every placeholder with real content.
- Site identity (name, email, social links, nav) lives in one place: `src/config/site.ts`.
