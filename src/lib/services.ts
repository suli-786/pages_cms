import { getCollection } from 'astro:content';

import type { ServiceFrontmatter } from '@/lib/types';

export async function getAllServices(): Promise<ServiceFrontmatter[]> {
  const entries = await getCollection('services');
  const services = entries.map((entry) => entry.data as ServiceFrontmatter);

  return services.sort((a, b) => a.order - b.order);
}
