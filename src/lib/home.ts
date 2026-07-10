// Typed access to the homepage content edited via Pages CMS (src/content/home.json).
// Each section component takes the matching interface below as its `content` prop.
import data from '@/content/home.json';

export interface CtaLink {
  label: string;
  href: string;
}

export interface Media {
  src: string;
  alt: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  facts: string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  footnote: string;
  saveDate: { label: string; value: string; cta: CtaLink };
  eventDetails: { label: string; value: string }[];
}

export interface VisionContent {
  badge: string;
  heading: string;
  lead: string;
  learnMore: CtaLink;
  card: { image: string; title: string; subtitle: string; cta: CtaLink };
  paragraphs: string[];
}

export interface ConferenceContent {
  heading: string;
  body: string;
  facts: string[];
  image: Media;
  cta: CtaLink;
}

export interface WhyAttendContent {
  heading: string;
  benefits: string[];
  image: Media;
  cta: CtaLink;
}

export interface Speaker {
  name: string;
  role: string;
  theme: string;
  portrait: string;
}

export interface SpeakersContent {
  badge: string;
  heading: string;
  description: string;
  cta: CtaLink;
  items: Speaker[];
}

export interface PartnerLogo {
  src: string;
  alt: string;
  href: string;
}

export interface PartnersContent {
  heading: string;
  description: string;
  items: PartnerLogo[];
}

export interface FinalCtaContent {
  eyebrow: string;
  heading: string;
  body: string;
  cta: CtaLink;
  image: Media;
}

export interface NewsletterContent {
  badge: string;
  heading: string;
  description: string;
  formEyebrow: string;
  formHeading: string;
  successMessage: string;
  perksCard: { eyebrow: string; heading: string; perks: string[] };
}

export interface HomeContent {
  hero: HeroContent;
  vision: VisionContent;
  conference: ConferenceContent;
  whyAttend: WhyAttendContent;
  speakers: SpeakersContent;
  partners: PartnersContent;
  finalCta: FinalCtaContent;
  newsletter: NewsletterContent;
}

export const home = data as unknown as HomeContent;
