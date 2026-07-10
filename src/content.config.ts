import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const isoDate = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val).toISOString().slice(0, 10));

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    date: isoDate,
    image: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string().optional(),
    }),
    readTime: z.string().optional(),
    pinned: z.boolean().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    id: z.string(),
    sector: z.string(),
    practice: z.string(),
    outcome: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
    forum: z.string(),
    year: z.string(),
    date: isoDate,
    image: z.string(),
    pinned: z.boolean().optional(),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
        avatar: z.string().optional(),
      })
      .optional(),
  }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    slug: z.string(),
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
    image: z.string(),
    subAreas: z.array(z.string()),
    partner: z.object({
      name: z.string(),
      role: z.string(),
    }),
    representativeCase: z.object({
      title: z.string(),
      metric: z.string(),
      metricLabel: z.string(),
      slug: z.string(),
    }),
  }),
});

export const collections = { blog, 'case-studies': caseStudies, services };
