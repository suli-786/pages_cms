// Site-wide settings edited via Pages CMS (src/content/settings.json): the
// colour palette, the WhatsApp community URL and the social links, each entered
// once and read across the site. (The logo lockup is still hardcoded — it lives
// in components/layout/logo.tsx and is artwork, not colour tokens.)
//
// Mirrors the `settings` block in .pages.yml — change both together. Parsing is
// forgiving for the reason described in home.ts: editors can clear any optional
// field in Pages CMS, which writes null into the JSON.
import { z } from 'astro/zod';

import { SOCIAL_PLATFORMS } from '@/components/elements/social-icons';
import data from '@/content/settings.json';
import { DEFAULT_PALETTE_ID, PALETTE_IDS, type PaletteId } from '@/lib/theme';

/**
 * A social link is only useful once it has a URL, so rows the editor added but
 * never filled in are dropped instead of rendering a dead icon. A platform with
 * no glyph is dropped for the same reason.
 */
const socialsSchema = z.preprocess(
  (v) =>
    Array.isArray(v)
      ? v.filter(
          (s) =>
            s != null &&
            typeof s === 'object' &&
            typeof s.href === 'string' &&
            s.href !== '' &&
            SOCIAL_PLATFORMS.includes(s.platform),
        )
      : [],
  z.array(z.object({ platform: z.enum(SOCIAL_PLATFORMS), href: z.string() })),
);

const settingsSchema = z.object({
  // Colour palette chosen in Pages CMS, resolved by src/lib/theme.ts. Fail-soft
  // on purpose: missing, null, or an id a developer has since removed all land
  // on the brand default. The safeParse below THROWS on a mismatch, and that
  // throw sits in an import graph reached by hydrated components — so a bad
  // value here would take the whole site down for an admin who cannot revert a
  // commit or read a build log. A palette is decoration; it must never be the
  // thing that breaks a build.
  palette: z.preprocess(
    (v) =>
      typeof v === 'string' && (PALETTE_IDS as readonly string[]).includes(v)
        ? v
        : DEFAULT_PALETTE_ID,
    z.enum(PALETTE_IDS as unknown as [PaletteId, ...PaletteId[]]),
  ),
  // The single WhatsApp community URL. Any link field set to the token
  // `whatsapp` resolves to this at parse time (the `link` schema in home.ts),
  // so it is entered once. The footer also links it directly when set.
  whatsapp: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  socials: socialsSchema,
});

export type SocialLink = z.infer<typeof socialsSchema>[number];
export type SiteSettings = z.infer<typeof settingsSchema>;

const parsed = settingsSchema.safeParse(data);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join('.') || '(root)'} — ${i.message}`)
    .join('\n');
  throw new Error(
    `src/content/settings.json does not match the site settings model.\n` +
      `Fix these fields (usually via Pages CMS):\n${issues}`,
  );
}

export const site: SiteSettings = parsed.data;
