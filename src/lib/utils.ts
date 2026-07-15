import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Only real URLs open in a new tab / are worth linking — the CMS placeholder
 * `#` (and internal `/#anchor` links) must not.
 */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
