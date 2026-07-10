// Site-wide branding edited via Pages CMS (src/content/settings.json).
// `logo` is an image path; when empty the SVG mark + site name are shown instead.
import data from '@/content/settings.json';

export interface SiteSettings {
  logo: string;
  siteName: string;
}

export const site = data as unknown as SiteSettings;
