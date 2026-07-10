import { getCollection } from 'astro:content';

import type { BlogFrontmatter } from '@/lib/types';

export async function getAllPosts(): Promise<BlogFrontmatter[]> {
  const entries = await getCollection('blog');
  const posts = entries.map((entry) => entry.data as BlogFrontmatter);

  return posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
}
