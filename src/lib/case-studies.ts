import { getCollection } from 'astro:content';

import type { CaseStudyFrontmatter } from '@/lib/types';

export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const entries = await getCollection('case-studies');
  const studies = entries.map((entry) => entry.data as CaseStudyFrontmatter);

  return studies.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
}
