// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://armander001.github.io',
  integrations: [
    mdx(),
    // /dev/* pages are internal proving grounds (WP-B demo) — keep them out
    // of the sitemap so crawlers are never pointed at them.
    sitemap({ filter: (page) => !page.includes('/dev/') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
