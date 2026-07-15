// @ts-check

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * src/lib/images.ts glob-imports every CMS raster so getImage can optimize
 * them, which makes Vite emit the multi-MB originals into dist/_astro even
 * though only the WebP renditions are ever referenced. Visitors never fetch
 * them, but they bloat every deploy — prune any raster original that no
 * built html/js/css file mentions.
 * @returns {import('astro').AstroIntegration}
 */
function pruneUnusedOriginals() {
  return {
    name: 'prune-unused-originals',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        /** @type {string[]} */
        const texts = [];
        /** @type {string[]} */
        const rasters = [];
        const walk = async (/** @type {string} */ d) => {
          for (const e of await readdir(d, { withFileTypes: true })) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (/\.(html|js|css|json|xml)$/i.test(e.name)) texts.push(p);
            else if (
              /\.(png|jpe?g|gif)$/i.test(e.name) &&
              path.dirname(p).endsWith('_astro')
            )
              rasters.push(p);
          }
        };
        await walk(dist);
        const corpus = (
          await Promise.all(texts.map((f) => readFile(f, 'utf8')))
        ).join('\n');
        let pruned = 0;
        let bytes = 0;
        for (const f of rasters) {
          const name = path.basename(f);
          if (corpus.includes(name) || corpus.includes(encodeURI(name)))
            continue;
          bytes += (await stat(f)).size;
          await unlink(f);
          pruned++;
        }
        if (pruned > 0)
          logger.info(
            `pruned ${pruned} unreferenced original image(s), ${(bytes / 1024 / 1024).toFixed(1)}MB`,
          );
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://ummahtech.net',
  integrations: [sitemap(), react(), pruneUnusedOriginals()],

  // Headings use Arial Black and body uses Helvetica Neue — system fonts set as CSS
  // stacks in global.css, so no webfont provider is needed for them. Only Geist Mono
  // (used by --font-mono for code) is loaded via the font pipeline.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      // Only the regular face is ever rendered — mono is used for small
      // uppercase labels; no 500-weight or italic usage anywhere.
      weights: ['400'],
      styles: ['normal'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
