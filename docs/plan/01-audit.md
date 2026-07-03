# Phase 1 — Discovery Audit

**Date:** 2026-07-03 · **Auditor:** Lead Architect (orchestration agent)

## Scope attempted

1. Live site `https://abenavidez.github.io/` — direct fetch, search-engine index, and Wayback Machine.
2. Repository `armander001/armander001.github.io` (this repo).

## Findings

### Repository
- Effectively empty: a single `README.md` containing the repo name. No site source, no history of a prior build (3 commits: initial, CNAME add, CNAME delete).
- The deleted CNAME suggests a custom domain was tried and abandoned — deployment should target `https://armander001.github.io/` with base `/`.

### Live legacy site
- **Not auditable from this environment.** The sandbox network egress policy (allowlist) blocks `abenavidez.github.io` and `archive.org`; the site is not indexed by search engines; GitHub API access in this session is scoped to this repository only.
- Consequence: no layout/technology/content audit of the legacy site is possible. The audit below is therefore a *constraints and content-inventory audit* based on the owner's brief.

### Content inventory (from owner's brief)
Domains: scientific visualization, remote sensing, coral reef research, digital twins, GIS, interactive media, data storytelling, photography, HCI, environmental science, computational research.
Required sections: Home, About, Research, Projects, Publications, Interactive Visualizations, Photography, Coral Research, GIS, Digital Twins, Skills, Experience, Education, Awards, Talks, Teaching, CV, Contact, Blog/Notes, Now, Current Research, Downloads, Gallery.

### Gaps / risks identified
| Gap | Mitigation |
|---|---|
| No verified biographical facts (name spelling, degrees, publications, dates) | All person-specific facts live in typed data files with explicit `PLACEHOLDER` markers; `CONTENT-GUIDE.md` walks the owner through replacement. Nothing fabricated is presented as fact. |
| 23 requested sections would produce a bloated nav | IA consolidates into 10 routes + footer links; Skills/Experience/Education/Awards/Talks/Teaching fold into CV + About; Coral/GIS/Digital-Twin become research-area pages under `/research/`. |
| Heavy interactivity (WebGL, 3D, maps) vs. Lighthouse 95+ | Zero-JS-by-default architecture (Astro islands); v1 ships dependency-free custom interactions; 3D/map viewers are lazy islands documented in the interactive roadmap. |
| Photography/imagery not available | Generative placeholder art (inline SVG/canvas, ocean-derived) + documented image slots. |

## Strengths to build on
- Clean slate: no legacy tech debt, free choice of stack.
- Exceptionally clear positioning from the owner: *"I transform scientific data into meaningful interactive experiences."* Every page reinforces this line.
