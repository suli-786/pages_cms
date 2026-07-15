// Site-wide branding edited via Pages CMS (src/content/settings.json).
// `logo` is an image path; when empty the SVG mark + site name are shown instead.
// `socials` is entered once here and read by the hero (and, later, the footer) —
// the same cross-feed idea as speakers/partners in home.ts.
//
// Mirrors the `settings` block in .pages.yml — change both together. Parsing is
// forgiving for the reason described in home.ts: editors can clear any optional
// field in Pages CMS, which writes null into the JSON.
import { z } from 'astro/zod';

import { SOCIAL_PLATFORMS } from '@/components/elements/social-icons';
import data from '@/content/settings.json';

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
  logo: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  siteName: z.string(),
  // The single WhatsApp community URL. Any link field set to the token
  // `whatsapp` resolves to this at parse time (the `link` schema in home.ts),
  // so it is entered once.
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
