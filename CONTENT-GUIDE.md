# Content Guide

This site ships with **real, finished domain copy** (what coral remote sensing is, how photogrammetry pipelines work, the site's design philosophy) but **placeholder biographical facts** — your legacy site couldn't be reached from the build environment, so nothing about your name, employers, degrees, or publications was invented. Every fact you need to supply is a visible bracketed slot like `[Year]` or `[University]`.

Search the repo for `[` to find every remaining slot, or work through the list below.

## 1. Identity — `src/config/site.ts`

- `name`: currently `'A. Benavidez'` — verify your full display name.
- `social`: ORCID, Google Scholar, and LinkedIn entries have `href: '#'` and `placeholder: true`. Add the real URL and delete `placeholder: true` for each one you fill in — this also makes it appear in the home page's Person JSON-LD `sameAs`.
- `email` and GitHub URL are already real.

## 2. CV — `src/data/cv.ts`

Every entry in `experience`, `education`, `awards`, `talks`, and `teaching` has bracketed placeholders (`[Year]`, `[Current role title]`, `[University]`, etc.). The prose *summaries* on each experience entry are written for real and can stay or be adjusted — only the org/title/year/degree fields need your facts. `skillGroups` are real domain skill lists; edit freely to match your actual toolkit.

- **`/cv.pdf`**: the CV page links to `/cv.pdf` with a visible note "[Add cv.pdf to /public]". Add a PDF export of your resume to `public/cv.pdf` and the note can be removed from `src/pages/cv.astro`.

## 3. Projects — `src/content/projects/*.mdx`

Six sample projects (reef digital twin, satellite habitat classification, coral story map, photogrammetry pipeline, ocean data art, field photography series). Each has `sample: true` in its frontmatter, which renders a "Sample project — replace with your own work" banner on the detail page. Per file:

- `year`, `role` frontmatter fields are bracketed.
- Body text has inline slots like `[Site name]`, `[N]` (a count), `[Year]`.
- When you replace a project with real work, set `sample: false` to remove the banner, and swap the `art`/`seed` generative placeholder for a real screenshot if you have one (see §6).

## 4. Publications — `src/content/publications/publications.yaml`

Three placeholder entries with citations like `[Author list]. ([Year]). [Paper title]. [Journal].`. Replace with your real bibliography. Set `real: true` on any entry that should emit `ScholarlyArticle` JSON-LD (schema.org structured data) — it's `false` by default specifically so no placeholder entry is ever presented to search engines as real.

## 5. Photography — `src/content/photos/photos.yaml`

Ten placeholder entries using generative art in place of photos, with captions containing `[Location]` (and one `[Year]`). To swap in real photos: add an image to `public/images/photos/` and add a `src` field to that entry (the `Lightbox`/`LightboxItem` type already supports `src` as an alternative to `art`).

## 6. Generative placeholder art

Every image-shaped slot on the site (project cards, comparison sliders, the photography gallery, the about-page portrait) currently uses `<PlaceholderArt variant="…" seed={n} />` — a deterministic, theme-aware SVG generator with six variants (`reef`, `satellite`, `twin`, `field`, `data`, `story`). This is intentional placeholder art, not a bug: it's stable across builds and reads as intentional rather than broken. Replace it incrementally with real photography, screenshots, or renders as you have them — nothing needs to change at once.

## 7. Now page — `src/pages/now.astro`

`focusItems` array and the "Updated [Month Year]" line are placeholders — update whenever your current focus changes.

## 8. About page — `src/pages/about.astro`

The "Who I am" section has one inline slot for your background/field of study; the portrait uses `PlaceholderArt` with a "[Portrait photo]" caption — replace with a real photo when ready.

---

None of the above blocks a working build or deployment — the site is fully functional today with placeholders in place. Treat this file as a punch list, not a blocker.
