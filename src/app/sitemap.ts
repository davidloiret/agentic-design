import { MetadataRoute } from 'next'
import { categories } from './categories'
import { techniques } from './techniques'
import { aiDrivenDevPages } from './ai-driven-dev-pages'
import { aiInferencePages } from './ai-inference-pages'
import { fineTuningPages } from './fine-tuning-pages'
import { promptHubPages } from './prompt-hub-pages'

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
    {
      url: `${baseUrl}/ai-inference`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fine-tuning`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prompt-hub`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-red-teaming`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning-hub`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/project-hub`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news-hub`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/interactive-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pattern-cards`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pattern-card-game`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pattern-evaluation`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ai-agent-fundamentals`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ai-driven-dev`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recommendations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/prompt-optimizer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/system-builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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

  // AI-Driven Dev pages
  const aiDrivenDevPageEntries = aiDrivenDevPages.map(page => ({
    url: `${baseUrl}/ai-driven-dev/${page.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority || 0.7,
  }))

  // AI-Inference pages
  const aiInferencePageEntries = aiInferencePages.map(page => ({
    url: `${baseUrl}/ai-inference/${page.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority || 0.7,
  }))

  // Fine-Tuning pages
  const fineTuningPageEntries = fineTuningPages.map(page => ({
    url: `${baseUrl}/fine-tuning/${page.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority || 0.7,
  }))

  // Prompt-Hub pages
  const promptHubPageEntries = promptHubPages.map(page => ({
    url: `${baseUrl}/prompt-hub/${page.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page.priority || 0.8,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...techniquePages,
    ...aiDrivenDevPageEntries,
    ...aiInferencePageEntries,
    ...fineTuningPageEntries,
    ...promptHubPageEntries,
  ]
}