# SPEC.md — Authoritative Design & Technical Specification

This is the single source of truth for all implementation agents. Read it fully before writing code. Where this spec and your own judgment conflict, follow the spec; where the spec is silent, favor minimalism, accessibility, and performance.

## 0. Positioning

One message everywhere: **"I transform scientific data into meaningful interactive experiences."**

The site is a digital exhibition, not a homepage: part academic profile, part design-studio portfolio. It must read as credible to a professor and impressive to a design studio. Voice: first person, confident, concrete, no buzzword soup. Motion has purpose; nothing animates just because it can.

Owner identity: display name **"A. Benavidez"** (verified full name pending — keep it only in `src/config/site.ts` so it is a one-line change). Email `manditob@gmail.com`. Deployed at `https://armander001.github.io` (base `/`).

## 1. Stack (decided — do not substitute)

- **Astro 5** (static output), **TypeScript strict**
- **Tailwind CSS 4** via `@tailwindcss/vite` (CSS-first config in `src/styles/global.css`, no tailwind.config.js)
- **@astrojs/mdx**, **@astrojs/sitemap**
- Fonts self-hosted via `@fontsource-variable/fraunces` (display), `@fontsource-variable/inter` (body), `@fontsource/jetbrains-mono` (data/mono accents)
- **No** React, GSAP, Three.js, jQuery, or CSS frameworks beyond Tailwind. Interactivity = small vanilla TS in Astro `<script>` tags or custom elements. (Three.js/MapLibre are documented as future islands in `docs/plan/04-interactive-roadmap.md`, not v1 dependencies.)
- Package manager: npm. Node 22.

## 2. Repository layout

```
astro.config.mjs          # site: 'https://armander001.github.io', integrations: mdx, sitemap
package.json  tsconfig.json (astro/tsconfigs/strict)
public/                   # favicon.svg, robots.txt, og-default.png (SVG-derived), CV placeholder note
src/
  config/site.ts          # name, tagline, email, social links, nav items — ONE place
  styles/global.css       # @import 'tailwindcss'; @theme tokens; base styles; prose styles
  layouts/BaseLayout.astro       # <html> shell, SEO head, skip-link, Nav, Footer, theme script
  layouts/ProseLayout.astro      # MDX/article wrapper (notes, project bodies)
  components/
    Nav.astro  Footer.astro  ThemeToggle.astro  SEO.astro
    Section.astro  SectionHeading.astro  Button.astro  Tag.astro  Card.astro
    interactive/   # WP-B components (see §5)
  content.config.ts       # collections: projects, notes, publications(data), photos(data)
  content/
    projects/*.mdx  notes/*.mdx  publications/publications.yaml  photos/photos.yaml
  data/cv.ts              # typed CV data: experience, education, skills, awards, talks, teaching
  pages/
    index.astro  about.astro  contact.astro  now.astro  cv.astro  404.astro
    projects/index.astro  projects/[...slug].astro
    research/index.astro  research/[area].astro   # coral-reefs, digital-twins, remote-sensing-gis
    publications.astro  visualizations.astro  photography.astro
    notes/index.astro  notes/[...slug].astro
.github/workflows/deploy.yml    # withastro/action → GitHub Pages
docs/plan/*.md            # this plan
CONTENT-GUIDE.md          # how the owner replaces placeholders
```

## 3. Design system — "Abyssal Light"

Dark-mode first (default), light mode via toggle + `prefers-color-scheme`. Theme = `data-theme="dark|light"` on `<html>`, set by a tiny inline script in `<head>` (before paint, reads localStorage, falls back to system). Toggle in nav, accessible button with `aria-label`.

### Color tokens (define as CSS custom properties in `@theme` / `:root`, semantic names)

Dark (default):
- `--color-abyss` `#050D16` page background (deep ocean at depth)
- `--color-surface` `#0B1826` cards/panels · `--color-surface-2` `#12233A` raised
- `--color-line` `#1E3247` hairline borders
- `--color-ink` `#E8F0F7` primary text · `--color-ink-mute` `#8FA6BA` secondary
- `--color-cyan` `#4FD8EB` (links, focus, data accents) · `--color-teal` `#2DD4A8`
- `--color-coral` `#FF7059` (rare, warm emphasis: CTAs, highlights)
- `--color-sand` `#E9D8B4` (subtle warm notes, serif display accents)

Light:
- bg `#F7F4EC` (warm sand-white), surface `#FFFFFF`, line `#E2DCCD`, ink `#0B1B26`, mute `#4E6577`, cyan `#0E7C97`, teal `#0F8A6C`, coral `#D9482F`, sand `#8A6D3B`.

Contrast: all text/background pairs must pass WCAG AA (4.5:1 body, 3:1 large). Accent-on-abyss usages above pass; verify anything new.

Gradients: hero/background may use very subtle radial glows (cyan/teal at 4–8% opacity on abyss). No neon, no generic bootstrap blue anywhere.

### Typography
- Display: **Fraunces Variable** (optical size high, weight 480–600) — editorial, organic, slightly futuristic in negative space. Used for h1/h2 and pull-quotes.
- Body/UI: **Inter Variable**. Mono: **JetBrains Mono** for data labels, coordinates, figure captions, nav-index numbers ("01 / Research").
- Scale (fluid, clamp-based): h1 `clamp(2.5rem, 6vw, 4.5rem)`; h2 `clamp(1.75rem, 3.5vw, 2.5rem)`; body 1rem/1.7; small `.875rem`. Max prose width 68ch. Generous whitespace: section padding `clamp(4rem, 10vh, 8rem)`.

### Texture & iconography
- Recurring visual motif: **bathymetric contour lines** (concentric organic SVG contours, 1px, `--color-line`/accent at low opacity) used in hero background, section dividers, 404. One shared SVG partial, not per-page copies.
- Icons: inline SVG (Lucide-style paths pasted inline, `stroke="currentColor"`, `aria-hidden="true"`). No icon font, no icon package dependency.

### Motion
- Durations 200–500ms, ease `cubic-bezier(0.22,1,0.36,1)`. Scroll-reveal: elements with `data-reveal` fade/rise 12px via one shared IntersectionObserver in BaseLayout.
- `@media (prefers-reduced-motion: reduce)`: all reveals become instant, canvas animations render a static frame, smooth-scroll disabled. This is mandatory in every animated component.
- View Transitions API for page transitions if trivial (`@view-transition` CSS rule); do not add JS routers.

## 4. Information architecture

Primary nav (7): `Work` (/projects) · `Research` (/research) · `Visualizations` (/visualizations) · `Photography` (/photography) · `Notes` (/notes) · `About` (/about) · `CV` (/cv). Nav shows mono index numbers. Footer: Contact, Now, Publications, GitHub/ORCID/Scholar/LinkedIn slots (from site.ts), copyright, "Built with Astro" line optional.

Mobile: hamburger → full-screen overlay menu (no JS framework; `<dialog>` or hidden-panel pattern, focus-trapped, Esc closes, `aria-expanded` correct).

## 5. Interactive component contracts (WP-B)

All are dependency-free, reduced-motion-safe, keyboard-accessible, and degrade to static content without JS.

1. **`OceanField.astro`** — hero background canvas. 2D canvas: slow-drifting particle field + faint bathymetric contour distortion evoking a satellite view of a reef shelf; ~60fps budget with devicePixelRatio cap 2, pauses when offscreen/`document.hidden`; static gradient fallback (also used for reduced-motion & no-JS via CSS background behind canvas).
2. **`CompareSlider.astro`** — before/after image comparison (e.g., reef 2016 vs 2024, RGB vs classified raster). Custom element: pointer + keyboard (arrow keys move divider, it's a `role="slider"` with `aria-valuenow`), clip-path based, labels for both layers. Props: `before`, `after`, `beforeLabel`, `afterLabel`, `alt`.
3. **`Timeline.astro`** — vertical research/experience timeline; entries from props array; scroll-reveal per entry; semantic `<ol>`.
4. **`ProjectCard.astro`** — image/placeholder-art area, mono index, title, one-line hook, tags; hover: subtle lift + accent underline sweep; whole card is one `<a>` with proper focus ring.
5. **`Lightbox.astro`** + gallery grid — photography grid (CSS columns/grid), click opens native `<dialog>` lightbox with caption, Esc/backdrop close, arrow-key navigation, focus restored on close.
6. **`StatBand.astro`** — row of key numbers (e.g., "12 reef sites mapped"); count-up on reveal (skip when reduced motion); numbers in JetBrains Mono.
7. **`ContourDivider.astro`** — decorative SVG section divider (the motif), `aria-hidden`.

Each component gets a brief usage comment at top of file. Placeholder imagery: generate as inline SVG data-art (gradient + contour motif), no external images, no binary files except tiny favicons/og if needed (prefer SVG; for og-default.png a build-time copy of an SVG-rendered simple design is acceptable — if PNG generation is awkward, ship og-default.svg and reference a simple 1200×630 PNG placeholder generated with a script-less checked-in file only if trivially possible; otherwise leave og image path configurable and documented).

## 6. Pages (WP-C) — content requirements

Global rule for placeholder facts: anything the owner must verify is written inside visible bracketed slots, e.g. `[PLACEHOLDER: institution]`, and enumerated in CONTENT-GUIDE.md. Domain copy (what coral remote sensing *is*, what digital twins *are*, framing language) may be written for real — it is subject-matter copy, not biographical claim. Never invent citations, degrees, employers, or awards as fact.

- **Home**: full-viewport hero (OceanField behind; kicker in mono "Scientific visualization · Remote sensing · Digital twins"; h1 = the core message rephrased personally, e.g. "I turn scientific data into experiences people can explore."; two CTAs: View work / About me). Then: 3-sentence intro; StatBand; Featured projects (3 ProjectCards); Research areas strip (3 cards → /research/*); latest 2 notes; contact CTA band.
- **About**: portrait slot (SVG placeholder), narrative bio (3 short sections: who / approach / beyond research), "how I work" values list, condensed skills cloud, link to CV.
- **Research index**: intro + 3 area cards. **Area pages** (coral-reefs, digital-twins, remote-sensing-gis): hero statement, "questions I'm exploring", methods list, related projects (filtered), CompareSlider demo on coral page, current-research callout ("Now" style).
- **Projects**: index grid of ProjectCards with tag filter (tiny vanilla JS, works without JS by showing all). 4–6 seed MDX projects spanning the domains (reef digital twin, satellite habitat classification, interactive story map, photogrammetry pipeline, data-art piece, field-photography series) — each explicitly framed as template/sample with `draft`-style banner note "Sample project — replace with your own" in frontmatter-driven callout. Detail page: hero, meta sidebar (role, methods, tools, year as placeholders), body, prev/next.
- **Publications**: grouped by year from YAML; entry = citation line, venue tag, links (PDF/DOI/code) optional; seeded with 3 obviously-marked placeholder entries; schema.org ScholarlyArticle JSON-LD only when `real: true` flag set (default false → no structured data emitted for placeholders).
- **Visualizations**: gallery of interactive demos: embed CompareSlider, a small inline animated SVG diagram (e.g., animated NDVI/spectral bands explainer), StatBand, and cards linking to future WebGL/3D work (marked "in development" honestly).
- **Photography**: intro on field photography as research practice; Lightbox gallery with SVG placeholder art slots + caption pattern.
- **Notes** (blog): index list (date, title, dek); 2 seed posts: (1) "Why scientific data deserves better interfaces" — a real, publishable essay on the site's philosophy; (2) "Building this site" — colophon/tech notes. Both genuinely written, not lorem ipsum.
- **Now**: dated "what I'm focused on now" list, placeholders marked.
- **CV**: HTML resume from `src/data/cv.ts` (sections: Experience, Education, Skills, Awards, Talks, Teaching — all placeholder-marked), print stylesheet (`@media print`: light, single column, no nav), "Download PDF" button pointing at `/cv.pdf` slot documented in CONTENT-GUIDE.
- **Contact**: email link (from site.ts), social links, short invitation line re: collaborations/talks. No form (no backend).
- **404**: contour motif, "You've drifted off the chart", link home.

## 7. SEO / metadata

`SEO.astro` in head: title template `%s — A. Benavidez`, description, canonical, OpenGraph (og:type website/article, image), Twitter card summary_large_image, JSON-LD `Person` on home (name/url/sameAs from site.ts). `robots.txt` allowing all + sitemap ref. Sitemap via integration. Clean trailing-slash-consistent URLs.

## 8. Quality bars (all WPs)

- Lighthouse targets: Perf ≥95, A11y 100, Best Practices 100, SEO 100. Budget: < 60KB JS total shipped, fonts subset to latin, `font-display: swap` (fontsource default ok).
- Semantic HTML (one h1/page, landmarks: header/nav/main/footer), skip-to-content link, visible focus states (accent outline), all interactive elements keyboard operable, alt text everywhere (placeholder art gets meaningful alt or `alt=""` if decorative).
- `npm run build` and `astro check` must pass clean. No console errors.
- Responsive: 360px, 768px, 1024px, 1440px+ all intentional; no horizontal scroll.

## 9. Deployment (WP-A)

`.github/workflows/deploy.yml`: on push to `main` (and manual dispatch), `withastro/action@v3` + `actions/deploy-pages@v4`, permissions `pages: write, id-token: write`. Note in README: enable Pages → Source: GitHub Actions.
