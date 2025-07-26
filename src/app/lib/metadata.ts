import { Metadata } from 'next';
import { Category } from '../categories';

const SITE_NAME = 'Agentic Design Patterns';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai';
const SITE_DESCRIPTION = 'Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.';

export function generateCategoryMetadata(category: Category): Metadata {
  const title = `${category.name} - ${SITE_NAME}`;
  const description = category.description || `Explore ${category.name} design patterns and techniques for AI agents.`;
  const url = `${SITE_URL}/patterns/${category.id}`;
  
  // Generate a more detailed description from category content
  let extendedDescription = description;
  if (category.detailedDescription) {
    extendedDescription = category.detailedDescription.length > 160 
      ? category.detailedDescription.substring(0, 157) + '...'
      : category.detailedDescription;
  }

  return {
    title,
    description: extendedDescription,
    keywords: [
      'AI agents',
      'design patterns',
      category.name.toLowerCase(),
      'artificial intelligence',
      'software architecture',
      'agentic systems',
      'machine learning patterns'
    ],
    authors: [{ name: 'Agentic Design Team' }],
    creator: 'Agentic Design',
    publisher: 'Agentic Design',
    openGraph: {
      type: 'article',
      title,
      description: extendedDescription,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og/category?id=${category.id}`,
          width: 1200,
          height: 630,
          alt: `${category.name} - ${SITE_NAME}`,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: extendedDescription,
      images: [`${SITE_URL}/api/og/category?id=${category.id}`],
      creator: '@agentic_design',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateTechniqueMetadata(technique: any, category?: Category): Metadata {
  const title = `${technique.name}${technique.abbr ? ` (${technique.abbr})` : ''} - ${SITE_NAME}`;
  const description = technique.description || `Learn about ${technique.name}, an advanced AI agent design pattern.`;
  const url = `${SITE_URL}/patterns/${technique.category}/${technique.id}`;
  
  // Generate extended description from technique content
  let extendedDescription = description;
  if (technique.detailedDescription) {
    extendedDescription = technique.detailedDescription.length > 160
      ? technique.detailedDescription.substring(0, 157) + '...'
      : technique.detailedDescription;
  } else if (technique.whenToUse && technique.whenToUse.length > 0) {
    const whenToUse = technique.whenToUse[0];
    extendedDescription = `${description} Best used when ${whenToUse.toLowerCase()}`;
    if (extendedDescription.length > 160) {
      extendedDescription = extendedDescription.substring(0, 157) + '...';
    }
  }

  const keywords = [
    'AI agents',
    'design patterns',
    technique.name.toLowerCase(),
    technique.category.toLowerCase(),
    'artificial intelligence',
    'software architecture',
    'agentic systems',
    'machine learning patterns',
    `${technique.complexity} complexity`,
  ];

  if (technique.abbr) {
    keywords.push(technique.abbr.toLowerCase());
  }

  if (category) {
    keywords.push(category.name.toLowerCase());
  }

  return {
    title,
    description: extendedDescription,
    keywords,
    authors: [{ name: 'Agentic Design Team' }],
    creator: 'Agentic Design',
    publisher: 'Agentic Design',
    openGraph: {
      type: 'article',
      title,
      description: extendedDescription,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og/technique?id=${technique.id}`,
          width: 1200,
          height: 630,
          alt: `${technique.name} - ${SITE_NAME}`,
        }
      ],
      locale: 'en_US',
      article: {
        section: category?.name || 'Design Patterns',
        tags: keywords,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: extendedDescription,
      images: [`${SITE_URL}/api/og/technique?id=${technique.id}`],
      creator: '@agentic_design',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateDefaultMetadata(): Metadata {
  return {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    keywords: [
      'AI agents',
      'design patterns',
      'artificial intelligence',
      'software architecture',
      'agentic systems',
      'machine learning patterns',
      'AI development',
      'intelligent systems'
    ],
    authors: [{ name: 'Agentic Design Team' }],
    creator: 'Agentic Design',
    publisher: 'Agentic Design',
    openGraph: {
      type: 'website',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og/default`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/api/og/default`],
      creator: '@agentic_design',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}