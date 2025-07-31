import { Metadata } from 'next';
import { Category } from '../categories';

const SITE_NAME = 'Agentic Design';
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
      section: category?.name || 'Design Patterns',
      tags: keywords,
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

export function generatePageMetadata(config: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  imageUrl?: string;
}): Metadata {
  const { title, description, path, keywords = [], type = 'website', imageUrl } = config;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImageUrl = imageUrl || `${SITE_URL}/api/og/default`;

  const defaultKeywords = [
    'AI agents',
    'design patterns',
    'artificial intelligence',
    'software architecture',
    'agentic systems',
    'machine learning patterns',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: 'Agentic Design Team' }],
    creator: 'Agentic Design',
    publisher: 'Agentic Design',
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
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

export function generateAuthPageMetadata(config: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return generatePageMetadata({
    ...config,
    keywords: ['authentication', 'user account', 'security'],
    type: 'website',
  });
}

export function generateUserPageMetadata(config: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return generatePageMetadata({
    ...config,
    keywords: ['user dashboard', 'account management', 'profile'],
    type: 'website',
  });
}

export function generateHubPageMetadata(config: {
  title: string;
  description: string;
  path: string;
  hubType: string;
}): Metadata {
  return generatePageMetadata({
    ...config,
    keywords: [config.hubType, 'AI tools', 'resources', 'development'],
    type: 'website',
  });
}

export function generatePromptPageMetadata(config: {
  provider: string;
  model: string;
  date: string;
  path: string;
  description?: string;
}): Metadata {
  const { provider, model, date, path, description } = config;
  const title = `${provider} ${model} System Prompt`;
  const defaultDescription = `Leaked system prompt for ${provider} ${model} (${date}). Explore the hidden instructions that define this AI model's behavior, personality, and capabilities.`;
  
  return generatePageMetadata({
    title,
    description: description || defaultDescription,
    path,
    keywords: [
      provider.toLowerCase(),
      model.toLowerCase(),
      'system prompt',
      'AI prompts',
      'leaked prompts',
      'AI behavior',
      'prompt engineering',
      'AI instructions',
    ],
    type: 'article',
  });
}

export function generateArticleStructuredData(title: string, description: string, url: string, category?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "Agentic Design Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Agentic Design",
      "url": SITE_URL
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "articleSection": category || "AI Design Patterns",
    "keywords": ["AI agents", "design patterns", "artificial intelligence", "software architecture"]
  };
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateDefaultMetadata(config: Metadata = {}): Metadata {
  const defaults: Metadata = {
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
      'intelligent systems',
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
        },
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

  return {
    ...defaults,
    ...config,
    openGraph: {
      ...defaults.openGraph,
      ...config.openGraph,
      title: config.title ?? defaults.openGraph?.title,
      description: config.description ?? defaults.openGraph?.description,
    },
    twitter: {
      ...defaults.twitter,
      ...config.twitter,
      title: config.title ?? defaults.twitter?.title,
      description: config.description ?? defaults.twitter?.description,
    },
  };
}
