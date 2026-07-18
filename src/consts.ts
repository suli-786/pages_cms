// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = 'Ummah Tech';

// The browser-chrome colour now follows the selected palette and lives in
// src/lib/theme.ts (PALETTES[].themeColor), read by BaseHead.astro. It is
// deliberately NOT re-exported from here: this module is imported by the
// hydrated navbar and footer, and src/lib/site.ts throws at module scope, so
// re-exporting would drag zod and settings.json into two client bundles.

// Primary navigation — one list shared by the navbar and the footer's
// "Explore" column so the two can't drift apart.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/#event' },
  { label: 'Partner With Us', href: '/#partners' },
  { label: 'About', href: '/#vision' },
];
export const SITE_TITLE = 'Ummah Tech Conference — Save the date for 2026';
export const SITE_DESCRIPTION =
  'The annual Ummah Tech Conference brings together Muslim founders, technologists and innovators. 7 November 2026, Johannesburg, South Africa.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Ummah Tech',
    'Ummah Tech Conference',
    'Muslim technologists',
    'tech conference',
    'Johannesburg',
    'Cape Town',
    'South Africa',
    'founders',
    'innovation',
    'community',
  ],
  authors: [{ name: 'Ummah Tech' }],
  creator: 'Ummah Tech',
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    // Ummah Tech brand mark. SVG (scalable) for modern browsers; PNGs as
    // raster fallbacks. Generated from public/logo/graphic-blue.svg.
    icon: [
      { url: '/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo/favicon-180.png', sizes: '180x180' }],
    shortcut: [{ url: '/logo/favicon.svg' }],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        // TODO: replace with an Ummah Tech Conference OG image.
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
    // Matches the real X profile (settings.json → x.com/ummah_tech).
    creator: '@ummah_tech',
  },
};
