// Asserts the three-way colour-palette contract:
//
//   .pages.yml `palette` select values
//     <-> PALETTES in src/lib/theme.ts
//     <-> .theme-<id> rule PAIRS in src/styles/themes.css
//
// Getting two of the three right renders the default palette while emitting
// the new one's browser-chrome colour — a silent, plausible-looking wrong
// result nobody notices. Nothing else in the codebase catches that.
//
// The highest-value assertion is the second rule block per palette: `.dark` is
// a static per-section island (hero, final CTA, footer, scrolled navbar) and
// global.css redeclares 31 of 32 tokens directly on those elements, so a
// palette missing its dark half leaves half the homepage on the old colours.
//
// Run by `npm run check`. Deliberately gates developer authoring, not editor
// input — an admin's palette choice can never fail a build (see the fail-soft
// preprocess in src/lib/site.ts).
//
// Plain node, no dependencies: this repo has no test tooling and one assertion
// does not justify adding a framework.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const THEME_TS = 'src/lib/theme.ts';
const THEMES_CSS = 'src/styles/themes.css';
const PAGES_YML = '.pages.yml';

const errors = [];
const fail = (file, msg, fix) =>
  errors.push(`  ${file}\n    ${msg}\n    fix: ${fix}`);

// --- 1. Parse PALETTES out of theme.ts -------------------------------------
// Regex rather than an import: this runs before any build step and must work
// on a .ts file without a TypeScript loader.
const themeTs = read(THEME_TS);
const palettes = [
  ...themeTs.matchAll(
    /\{\s*id:\s*'([^']+)',[\s\S]*?htmlClass:\s*'([^']*)',[\s\S]*?themeColor:\s*'([^']+)',?\s*\}/g,
  ),
].map(([, id, htmlClass, themeColor]) => ({ id, htmlClass, themeColor }));

if (palettes.length === 0) {
  console.error(`\ncheck-palettes: could not parse PALETTES from ${THEME_TS}.`);
  console.error('  The regex expects { id, label, htmlClass, themeColor } in');
  console.error('  that order with single quotes. Update this script if the');
  console.error('  shape changed intentionally.\n');
  process.exit(1);
}

// --- 2. Every non-default palette has BOTH rule blocks in themes.css -------
// Strip comments first: that file's header documents selector shapes verbatim
// (including the "NO .theme-indigo block" rule), and scanning raw text matches
// the prose instead of the CSS.
const css = read(THEMES_CSS).replace(/\/\*[\s\S]*?\*\//g, '');

for (const { id, htmlClass } of palettes) {
  if (!htmlClass) continue; // the default palette IS global.css

  // Match the selector wherever it appears in the rule's selector list, so
  // reordering `:root.theme-x, .theme-x.theme-x` does not break the check.
  const light = new RegExp(
    `(:root\\.${htmlClass}|\\.${htmlClass}\\.${htmlClass})[^{}]*\\{`,
  ).test(css);
  const dark = new RegExp(
    `(:root\\.${htmlClass}|\\.${htmlClass}\\.${htmlClass})[^{}]*\\.dark[^{}]*\\{`,
  ).test(css);

  if (!light)
    fail(
      THEMES_CSS,
      `palette '${id}' has no light rule block.`,
      `add ':root.${htmlClass}, .${htmlClass}.${htmlClass} { … }'`,
    );
  if (!dark)
    fail(
      THEMES_CSS,
      `palette '${id}' has no .dark rule block — the hero, final CTA, footer and scrolled navbar would keep the previous palette's colours.`,
      `add ':root.${htmlClass} .dark, .${htmlClass}.${htmlClass} .dark { … }'`,
    );
}

// --- 3. The default palette must not be duplicated in themes.css ----------
const defaultPalette = palettes.find((p) => !p.htmlClass);
if (defaultPalette && new RegExp(`\\.theme-${defaultPalette.id}\\b`).test(css))
  fail(
    THEMES_CSS,
    `a .theme-${defaultPalette.id} rule exists, but global.css :root/.dark already IS that palette.`,
    `delete the block — two sources of truth will drift`,
  );

// --- 4. .pages.yml select values match PALETTE_IDS, in order --------------
const yml = read(PAGES_YML);
const selectBlock = yml.match(
  /- name: palette[\s\S]*?options:\s*\n\s*values:\s*\n([\s\S]*?)\n\s{6}(?:- |description:)/,
);

if (!selectBlock) {
  fail(
    PAGES_YML,
    'could not find the `palette` select and its options.values list.',
    'keep the field shape used by the socials `platform` select',
  );
} else {
  const ymlIds = [...selectBlock[1].matchAll(/value:\s*([A-Za-z0-9_-]+)/g)].map(
    ([, v]) => v,
  );
  const tsIds = palettes.map((p) => p.id);
  if (ymlIds.join(',') !== tsIds.join(','))
    fail(
      PAGES_YML,
      `select values [${ymlIds.join(', ')}] do not match PALETTES in ${THEME_TS} [${tsIds.join(', ')}].`,
      'the admin would see an option that renders the default palette',
    );
}

// --- Report ---------------------------------------------------------------
if (errors.length) {
  console.error(`\ncheck-palettes: ${errors.length} problem(s)\n`);
  console.error(errors.join('\n\n'));
  console.error(
    `\nThe contract is documented in the header of ${THEMES_CSS}.\n`,
  );
  process.exit(1);
}

console.log(
  `check-palettes: ${palettes.length} palette(s) consistent across ${THEME_TS}, ${THEMES_CSS} and ${PAGES_YML}`,
);
