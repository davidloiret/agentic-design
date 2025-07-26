import { MetadataRoute } from 'next'
import { categories } from './categories'
import { techniques } from './techniques'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/patterns`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Category pages
  const categoryPages = categories
    .filter(category => category.detailedDescription) // Only categories with detailed pages
    .map(category => ({
      url: `${baseUrl}/patterns/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Technique pages
  const techniquePages = techniques.map(technique => ({
    url: `${baseUrl}/patterns/${technique.category}/${technique.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...techniquePages,
  ]
}