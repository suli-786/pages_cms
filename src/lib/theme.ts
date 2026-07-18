// Colour palettes offered to the admin in Pages CMS (Site settings -> Colour
// palette). Mirrors the `palette` select in .pages.yml and the .theme-<id>
// rule pairs in src/styles/themes.css — a three-way contract that
// `npm run check` asserts (scripts/check-palettes.mjs).
//
// Adding a palette is three edits, IN THIS ORDER:
//   1. author BOTH rule blocks in src/styles/themes.css and run the contrast
//      checklist in that file's header
//   2. add the row below
//   3. add the {value,label} to the `palette` select in .pages.yml
// Doing only two of the three renders the default palette while emitting the
// new one's browser-chrome colour — a silent, plausible-looking wrong result.
//
// This module deliberately holds NO token values. Colours live in themes.css
// as the single source of truth; what lives here is the id, the human label,
// the <html> class, and the one colour that cannot be a CSS variable (the
// browser-chrome `theme-color` meta, which is read at build time).

export const PALETTES = [
  {
    id: 'indigo',
    label: 'Midnight Indigo',
    // Empty on purpose: global.css :root/.dark IS this palette. `class:list`
    // drops the empty string, so the default emits a bare <html lang="en">.
    htmlClass: '',
    themeColor: '#13144d',
  },
  {
    id: 'black',
    label: 'Black',
    htmlClass: 'theme-black',
    themeColor: '#000000',
  },
] as const;

export type PaletteId = (typeof PALETTES)[number]['id'];

export const PALETTE_IDS = PALETTES.map((p) => p.id) as readonly PaletteId[];

export const DEFAULT_PALETTE_ID: PaletteId = 'indigo';

/**
 * Takes `string`, not `PaletteId`, on purpose — this is the last fail-soft
 * gate. An id left in content after a developer removed the palette resolves
 * to the brand default rather than rendering an unstyled page.
 */
export const getPalette = (id: string) =>
  PALETTES.find((p) => p.id === id) ?? PALETTES[0];
