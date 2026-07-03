/**
 * Content collections (SPEC §2, §6).
 *
 * - projects:     MDX case studies in src/content/projects/
 * - notes:        MDX essays in src/content/notes/
 * - publications: single YAML file (array) — entries default to real:false,
 *                 which suppresses JSON-LD until the owner adds real papers.
 * - photos:       single YAML file (array) feeding the /photography Lightbox.
 */
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** Matches ArtVariant in src/components/interactive/PlaceholderArt.astro. */
const artVariant = z.enum(['reef', 'satellite', 'twin', 'field', 'data', 'story']);

/** Research areas — slugs must match src/pages/research/[area].astro paths. */
const researchArea = z.enum(['coral-reefs', 'digital-twins', 'remote-sensing-gis']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One-line hook shown on cards and detail hero. */
    hook: z.string(),
    summary: z.string(),
    /** May be a bracketed placeholder like "[Year]". */
    year: z.string(),
    role: z.string(),
    methods: z.array(z.string()),
    tools: z.array(z.string()),
    tags: z.array(z.string()),
    art: artVariant,
    seed: z.number(),
    featured: z.boolean().default(false),
    /** true → the "Sample project — replace with your own work" banner renders. */
    sample: z.boolean().default(true),
    order: z.number(),
    area: researchArea,
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

const publications = defineCollection({
  loader: file('src/content/publications/publications.yaml'),
  schema: z.object({
    id: z.string(),
    citation: z.string(),
    year: z.string(),
    venue: z.string(),
    tags: z.array(z.string()),
    links: z
      .object({
        pdf: z.string().optional(),
        doi: z.string().optional(),
        code: z.string().optional(),
      })
      .default({}),
    /** Only entries the owner marks real:true emit ScholarlyArticle JSON-LD. */
    real: z.boolean().default(false),
  }),
});

const photos = defineCollection({
  loader: file('src/content/photos/photos.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    caption: z.string(),
    alt: z.string(),
    art: artVariant,
    seed: z.number(),
  }),
});

export const collections = { projects, notes, publications, photos };

export type ResearchArea = z.infer<typeof researchArea>;
