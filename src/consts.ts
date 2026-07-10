// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = 'Ummah Tech';
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
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
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
    creator: '@ummahtech',
  },
};
