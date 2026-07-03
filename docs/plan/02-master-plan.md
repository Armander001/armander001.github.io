# Phase 3 — Master Plan & Work Breakdown

Stack decision record, work packages, dependencies, and QA gates. Full design/technical detail lives in [SPEC.md](./SPEC.md).

## Stack decision

| Option | Verdict | Why |
|---|---|---|
| **Astro 5 + Tailwind 4 + TS (chosen)** | ✅ | Zero-JS by default → Lighthouse 95+ is the default, not a fight. Typed content collections + MDX = markdown-driven content the owner can edit without touching components. Islands give WebGL/3D an upgrade path without taxing every page. Ages well; tiny dependency surface. |
| Next.js static export | ❌ | React runtime tax on every page for a content site; export mode fights image/OG features; heavier maintenance. |
| Vite + React SPA | ❌ | SEO and a11y start from behind; routing/meta all hand-rolled. |
| Plain HTML/CSS | ❌ | No content pipeline; 20+ pages of duplication; poor long-term expandability. |

GSAP/Three.js: deferred, by design — v1 interactions are dependency-free; `04-interactive-roadmap.md` defines how heavy islands land later without regressing performance.

## Work packages

| WP | Objective | Depends on | Complexity | Priority | Acceptance |
|---|---|---|---|---|---|
| **WP-0** | Plan docs in repo (this) | — | S | P0 | Docs committed |
| **WP-A** | Scaffold: Astro+Tailwind+MDX+sitemap, tokens, global CSS, BaseLayout, Nav/Footer/ThemeToggle/SEO, primitives (Section, Button, Tag, Card), deploy workflow, robots/favicon | WP-0 | M | P0 | `npm run build` + `astro check` clean; dark/light toggle pre-paint, no FOUC; nav a11y complete |
| **WP-B** | Interactive library: OceanField, CompareSlider, Timeline, ProjectCard, Lightbox, StatBand, ContourDivider, scroll-reveal | WP-A | L | P0 | Each component keyboard-operable, reduced-motion-safe, no-JS fallback; demo page proves each |
| **WP-C** | Content collections, cv data, all 15+ pages, seed content, copywriting | WP-B | L | P0 | All SPEC §6 pages built; placeholders bracketed + enumerated; build clean |
| **WP-D** | Architect review & QA: a11y sweep, SEO verify, perf audit, fixes, CONTENT-GUIDE.md, README | WP-C | M | P0 | SPEC §8 quality bars met; issue list closed |
| Future | Real content migration; photos; CV PDF; MapLibre story maps; three.js reef viewer; `<model-viewer>` photogrammetry | launch | — | P1+ | See interactive roadmap |

## Execution model

Orchestrator (this agent) writes specs, dispatches one implementation agent per WP (sequential — each builds on the last within the same working tree), then performs Phase 5/6 review with direct fixes and revision notes. Commits land per-WP on `claude/portfolio-redesign-github-pages-7whhri`.

## Risks

1. **Unverifiable biography** (blocked legacy-site audit) → placeholder-slot strategy; CONTENT-GUIDE enumerates every slot. *Owner action required before treating content as final.*
2. **Interactivity vs performance** → dependency-free v1; JS budget <60KB; islands lazy.
3. **Placeholder content mistaken for fact** → visible bracketed markers + sample-project banners + `real:` flag gating publication structured data.
4. **GitHub Pages config** → workflow deploys from `main`; README documents the one manual step (Pages → Source: GitHub Actions).

## QA gate (Phase 6, run before final push)

- [ ] `astro check` + `npm run build` clean, zero console errors on key pages
- [ ] Keyboard-only pass: nav, menu, toggle, slider, lightbox, cards
- [ ] Reduced-motion pass: no movement beyond opacity; canvas static
- [ ] Contrast spot-check of every token pair in both themes
- [ ] Meta/OG/JSON-LD/sitemap/robots present and valid
- [ ] 360px / 768px / 1440px layouts intentional, no horizontal scroll
- [ ] Every placeholder appears in CONTENT-GUIDE.md
