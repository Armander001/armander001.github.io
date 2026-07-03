/**
 * Typed CV data rendered by /cv (and the skills summary on /about).
 *
 * CONTENT RULE (SPEC §6): every biographical fact — employer, institution,
 * degree, year, award, venue — is a visible bracketed placeholder the owner
 * must replace. Skill names and role *descriptions* are domain copy and are
 * written for real.
 */

export interface CvExperience {
  period: string;
  title: string;
  org: string;
  summary: string;
  tags?: string[];
}

export interface CvEducation {
  period: string;
  degree: string;
  institution: string;
  detail?: string;
}

export interface CvSkillGroup {
  group: string;
  skills: string[];
}

export interface CvAward {
  year: string;
  title: string;
  org: string;
}

export interface CvTalk {
  year: string;
  title: string;
  venue: string;
}

export interface CvTeaching {
  period: string;
  title: string;
  org: string;
  detail?: string;
}

export const experience: CvExperience[] = [
  {
    period: '[Year] — now',
    title: '[Current role title]',
    org: '[Current institution / employer]',
    summary:
      'Building interactive representations of shallow reef systems — photogrammetric 3D models, multispectral classification, and browser-based visualization tools that let scientists and the public explore the same data.',
    tags: ['digital twins', 'photogrammetry', 'visualization'],
  },
  {
    period: '[Year] — [Year]',
    title: '[Previous role title]',
    org: '[Previous lab / employer]',
    summary:
      'Developed satellite habitat-classification workflows for benthic mapping: atmospheric and sun-glint correction, supervised classification, and accuracy assessment against field survey data.',
    tags: ['remote sensing', 'GIS'],
  },
  {
    period: '[Year] — [Year]',
    title: '[Earlier role title]',
    org: '[Organization]',
    summary:
      'Designed data-driven visual explainers that translated field measurements into public-facing graphics and interactives for research communication.',
    tags: ['scientific visualization', 'design'],
  },
];

export const education: CvEducation[] = [
  {
    period: '[Year] — [Year]',
    degree: '[Degree, e.g. MSc in Marine Science / Geoinformatics]',
    institution: '[University]',
    detail: '[Thesis or focus area]',
  },
  {
    period: '[Year] — [Year]',
    degree: '[Degree, e.g. BSc]',
    institution: '[University]',
  },
];

export const skillGroups: CvSkillGroup[] = [
  {
    group: 'Remote sensing & GIS',
    skills: [
      'Google Earth Engine',
      'QGIS',
      'Sentinel-2 / Landsat processing',
      'benthic habitat classification',
      'radiometric & sun-glint correction',
      'accuracy assessment',
      'GDAL',
      'PostGIS',
    ],
  },
  {
    group: 'Scientific visualization',
    skills: [
      'D3.js',
      'Three.js',
      'WebGL',
      'MapLibre GL',
      'scrollytelling',
      'cartographic design',
      'SVG animation',
    ],
  },
  {
    group: 'Programming',
    skills: ['Python', 'TypeScript / JavaScript', 'R', 'SQL', 'Astro', 'Node.js', 'Git'],
  },
  {
    group: 'Data & ML',
    skills: [
      'scikit-learn',
      'random forests & gradient boosting',
      'NumPy / pandas / xarray',
      'rasterio',
      'cross-validation design',
      'uncertainty communication',
    ],
  },
  {
    group: 'Field & lab',
    skills: [
      'structure-from-motion photogrammetry',
      'underwater survey photography',
      'GNSS / ground control',
      'photo-quadrat transects',
      'drone piloting',
      'dive-based data collection',
    ],
  },
  {
    group: 'Design & media',
    skills: [
      'photography',
      'Adobe Lightroom',
      'Figma',
      'Blender',
      'typography & editorial layout',
      'data storytelling',
    ],
  },
];

export const awards: CvAward[] = [
  {
    year: '[Year]',
    title: '[Award or grant title]',
    org: '[Awarding body]',
  },
  {
    year: '[Year]',
    title: '[Fellowship / scholarship title]',
    org: '[Institution]',
  },
];

export const talks: CvTalk[] = [
  {
    year: '[Year]',
    title: '[Talk title on reef mapping or scientific visualization]',
    venue: '[Conference / venue]',
  },
  {
    year: '[Year]',
    title: '[Invited talk or workshop title]',
    venue: '[Institution / event]',
  },
];

export const teaching: CvTeaching[] = [
  {
    period: '[Year] — [Year]',
    title: '[Course or workshop title, e.g. Intro to remote sensing]',
    org: '[Institution]',
    detail: '[Role — e.g. instructor, teaching assistant]',
  },
];
