// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ummah-tech.pages.dev',
  integrations: [mdx(), sitemap(), react()],

  // Headings use Arial Black and body uses Helvetica Neue — system fonts set as CSS
  // stacks in global.css, so no webfont provider is needed for them. Only Geist Mono
  // (used by --font-mono for code) is loaded via the font pipeline.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: ['400', '500'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
