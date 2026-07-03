/**
 * The three research areas (SPEC §4, §6) — shared by the home strip,
 * /research index, and /research/[area] pages so copy lives in one place.
 * All of this is domain copy (what the fields *are*), not biographical claim.
 */
import type { ArtVariant } from '@/components/interactive/PlaceholderArt.astro';
import type { ResearchArea } from '@/content.config';

export interface ResearchAreaDef {
  slug: ResearchArea;
  title: string;
  /** Short card blurb (home strip, research index). */
  blurb: string;
  /** Longer hero statement on the area page. */
  hero: string;
  questions: string[];
  methods: string[];
  art: ArtVariant;
  seed: number;
}

export const researchAreas: ResearchAreaDef[] = [
  {
    slug: 'coral-reefs',
    title: 'Coral reefs',
    blurb:
      'Mapping and monitoring reef habitats — from photo-quadrats on the reef flat to multi-year satellite archives — to see change while there is still time to respond to it.',
    hero: 'Coral reefs are the most structurally complex ecosystems in the ocean, and among the fastest-changing. Monitoring them well means working across scales: a single colony photographed on a transect, a reef flat stitched from thousands of survey images, an entire shelf observed from orbit every five days. My work connects those scales, so that what a diver records underwater and what a satellite records from 786 km up can be read as one continuous story of habitat change.',
    questions: [
      'How do we detect habitat change early enough for it to matter — bleaching, mortality, and recovery at the scale of individual reefs?',
      'What is lost when a 3D reef becomes a 2D map, and how much structural complexity can satellites actually see?',
      'How can long-term monitoring data be presented so that non-specialists — managers, communities, funders — can act on it?',
    ],
    methods: [
      'photo-quadrat transects',
      'benthic habitat classification',
      'time-series change detection',
      'structural complexity metrics',
      'field validation surveys',
    ],
    art: 'reef',
    seed: 3,
  },
  {
    slug: 'digital-twins',
    title: 'Digital twins',
    blurb:
      'Turning photogrammetric surveys into navigable 3D reef models — measurable digital counterparts of real places that scientists and the public can explore in a browser.',
    hero: 'A digital twin is more than a 3D model: it is a measurable, revisitable counterpart of a real place. Photograph a reef plot thoroughly enough and structure-from-motion can rebuild it as a dense 3D surface, accurate to the centimeter. Repeat the survey next year and you can difference the two — growth here, collapse there — with a precision no memory or field notebook can match. I build the pipelines that produce these models and the browser-based tools that make them explorable, because a twin no one can open is just an archive.',
    questions: [
      'How precisely can repeat photogrammetry quantify coral growth and erosion between survey seasons?',
      'What does a reef digital twin need — resolution, texture, annotation — to be useful to ecologists rather than just impressive?',
      'How do we deliver gigabyte-scale 3D reconstructions through a browser on a normal connection?',
    ],
    methods: [
      'structure-from-motion photogrammetry',
      'dense point-cloud processing',
      'mesh simplification & LOD streaming',
      'change detection between epochs',
      'WebGL delivery',
    ],
    art: 'twin',
    seed: 5,
  },
  {
    slug: 'remote-sensing-gis',
    title: 'Remote sensing & GIS',
    blurb:
      'Reading shallow seas from orbit — correcting, classifying, and validating satellite imagery to map benthic habitats across areas no field team could ever cover.',
    hero: 'Shallow coastal water is one of the hardest places on Earth to observe from space: the atmosphere, the water surface, and the water column all stand between the sensor and the seafloor. But when those effects are corrected carefully, satellites become the only instrument that can map benthic habitats across hundreds of kilometers of coastline, and revisit them every few days for decades. I work on the full chain — correction, classification, accuracy assessment — with particular attention to the last step, because a habitat map without an honest error estimate is a picture, not a measurement.',
    questions: [
      'How far can open Sentinel-2 and Landsat archives be pushed for benthic mapping before commercial high-resolution imagery is genuinely needed?',
      'Which correction steps — atmospheric, sun-glint, water-column — matter most for classification accuracy in practice?',
      'How should map uncertainty be communicated visually, so users trust the map exactly as much as they should?',
    ],
    methods: [
      'atmospheric & sun-glint correction',
      'supervised classification',
      'Google Earth Engine at archive scale',
      'accuracy assessment & error matrices',
      'cloud-native geospatial formats',
    ],
    art: 'satellite',
    seed: 8,
  },
];

export function getArea(slug: string): ResearchAreaDef {
  const area = researchAreas.find((a) => a.slug === slug);
  if (!area) throw new Error(`Unknown research area: ${slug}`);
  return area;
}
