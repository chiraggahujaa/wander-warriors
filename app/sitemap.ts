import { MetadataRoute } from 'next';
import { getAllTrekSlugs } from '@/lib/treks-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wanderwarriors.com';

  // Get all trek slugs
  const trekSlugs = getAllTrekSlugs();

  // Generate trek URLs
  const trekUrls = trekSlugs.map((slug) => ({
    url: `${baseUrl}/treks/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...trekUrls,
  ];
}
