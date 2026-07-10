export interface CaseStudyTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface CaseStudyFrontmatter {
  title: string
  slug: string
  description: string
  id: string
  sector: string
  practice: string
  outcome: string
  metric: string
  metricLabel: string
  forum: string
  year: string
  date: string
  image: string
  pinned?: boolean
  testimonial?: CaseStudyTestimonial
}

export interface CaseStudy {
  slug: string
  content: string
  frontmatter: CaseStudyFrontmatter
}

export interface ServicePartner {
  name: string
  role: string
}

export interface ServiceRepresentativeCase {
  title: string
  metric: string
  metricLabel: string
  slug: string
}

export interface ServiceFrontmatter {
  slug: string
  id: string
  name: string
  tagline: string
  description: string
  /** Lucide icon name — resolved at render time via the icon map. */
  icon: string
  order: number
  image: string
  subAreas: string[]
  partner: ServicePartner
  representativeCase: ServiceRepresentativeCase
}

export interface ServiceArticle {
  slug: string
  content: string
  frontmatter: ServiceFrontmatter
}

export interface BlogAuthor {
  name: string
  role: string
  avatar?: string
}

export interface BlogFrontmatter {
  title: string
  slug: string
  excerpt: string
  date: string
  image: string
  category: string
  tags?: string[]
  author: BlogAuthor
  readTime?: string
  pinned?: boolean
}

export interface BlogPost {
  slug: string
  content: string
  frontmatter: BlogFrontmatter
}
