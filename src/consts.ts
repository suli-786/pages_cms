// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = 'Verdict';
export const SITE_TITLE = 'Verdict — trusted legal help when it matters most';
export const SITE_DESCRIPTION =
  'Senior lawyers on every case. Proven results in court. Clear fees, no surprises.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Astro',
    'React',
    'TypeScript',
    'TailwindCSS',
    'Template',
    'Shadcn/UI',
    'Landing Page',
    'Law Firm',
    'Litigation',
    'Legal',
  ],
  authors: [{ name: 'Verdict - Shadcnblocks.com' }],
  creator: 'Verdict - Shadcnblocks.com',
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
    creator: '@shadcnblocks',
  },
};
