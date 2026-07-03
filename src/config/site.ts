/**
 * Single source of truth for site identity, navigation, and social links.
 * Everything owner-specific lives here so it is a one-line change later.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** True when the URL is a stand-in the owner must replace. */
  placeholder?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  /** Mono index number shown next to the label, e.g. "01". */
  monoIndex: string;
}

export interface SiteConfig {
  /** Display name. TODO: verify full name with the owner (SPEC §0). */
  name: string;
  tagline: string;
  role: string;
  email: string;
  url: string;
  social: SocialLink[];
  nav: NavItem[];
}

export const site: SiteConfig = {
  name: 'A. Benavidez', // PLACEHOLDER: verify full display name
  tagline: 'I transform scientific data into meaningful interactive experiences.',
  role: 'Researcher & creative technologist — scientific visualization, remote sensing, coral reefs, digital twins',
  email: 'manditob@gmail.com',
  url: 'https://armander001.github.io',
  social: [
    { label: 'GitHub', href: 'https://github.com/armander001' },
    { label: 'ORCID', href: '#', placeholder: true }, // PLACEHOLDER: add ORCID URL
    { label: 'Google Scholar', href: '#', placeholder: true }, // PLACEHOLDER: add Scholar URL
    { label: 'LinkedIn', href: '#', placeholder: true }, // PLACEHOLDER: add LinkedIn URL
  ],
  nav: [
    { label: 'Work', href: '/projects', monoIndex: '01' },
    { label: 'Research', href: '/research', monoIndex: '02' },
    { label: 'Visualizations', href: '/visualizations', monoIndex: '03' },
    { label: 'Photography', href: '/photography', monoIndex: '04' },
    { label: 'Notes', href: '/notes', monoIndex: '05' },
    { label: 'About', href: '/about', monoIndex: '06' },
    { label: 'CV', href: '/cv', monoIndex: '07' },
  ],
};
