import { Metadata } from 'next';
import { HomeClient } from './HomeClient';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Agentic Design Patterns - AI Agent Architecture & Best Practices',
  description: 'Master AI agent design with 150+ patterns, 500+ techniques, and 1000+ use cases. Learn prompt chaining, routing, parallelization, reflection, tool use, and advanced agentic system architectures. Expert AI consulting and development services available.',
  keywords: [
    'AI agents',
    'design patterns',
    'artificial intelligence',
    'prompt engineering',
    'LLM patterns',
    'agentic systems',
    'prompt chaining',
    'AI routing',
    'tool use patterns',
    'reflection patterns',
    'multi-agent systems',
    'AI architecture',
    'machine learning patterns',
    'LLM best practices',
    'intelligent systems',
    'AI development',
    'agent frameworks',
    'conversational AI',
    'AI orchestration',
    'cognitive architectures',
    'AI consulting',
    'AI implementation',
    'enterprise AI'
  ],
  authors: [{ name: 'Agentic Design Team' }],
  creator: 'Agentic Design',
  publisher: 'Agentic Design',
  openGraph: {
    type: 'website',
    title: 'Agentic Design Patterns - Master AI Agent Architecture',
    description: 'Comprehensive collection of AI agent design patterns, techniques, and best practices. 150+ patterns, 500+ techniques, expert consulting available.',
    url: 'https://agentic-design.ai',
    siteName: 'Agentic Design',
    images: [
      {
        url: '/api/og/default',
        width: 1200,
        height: 630,
        alt: 'Agentic Design - AI Agent Design Patterns',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Design Patterns - AI Agent Architecture',
    description: 'Master AI agent design with 150+ patterns and 500+ techniques. Expert consulting available.',
    images: ['/api/og/default'],
    creator: '@agentic_design',
    site: '@agentic_design',
  },
  alternates: {
    canonical: 'https://agentic-design.ai',
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
};

// Homepage structured data
const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://agentic-design.ai/#website',
      'url': 'https://agentic-design.ai',
      'name': 'Agentic Design',
      'description': 'Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.',
      'publisher': {
        '@id': 'https://agentic-design.ai/#organization'
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://agentic-design.ai/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      'inLanguage': 'en-US'
    },
    {
      '@type': 'Organization',
      '@id': 'https://agentic-design.ai/#organization',
      'name': 'Agentic Design',
      'url': 'https://agentic-design.ai',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://agentic-design.ai/logo.png',
        'width': 512,
        'height': 512
      },
      'description': 'Leading resource for AI agent design patterns and expert AI consulting services',
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'contact@agentic-design.ai',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'French']
      },
      'sameAs': [
        'https://twitter.com/agentic_design',
        'https://github.com/agentic-design'
      ],
      'knowsAbout': [
        'AI Agent Design',
        'Machine Learning',
        'Artificial Intelligence',
        'LLM Patterns',
        'Prompt Engineering',
        'Multi-Agent Systems'
      ]
    },
    {
      '@type': 'WebPage',
      '@id': 'https://agentic-design.ai/#homepage',
      'url': 'https://agentic-design.ai',
      'name': 'Agentic Design Patterns - AI Agent Architecture & Best Practices',
      'isPartOf': {
        '@id': 'https://agentic-design.ai/#website'
      },
      'about': {
        '@type': 'Thing',
        'name': 'AI Agent Design Patterns',
        'description': 'Comprehensive patterns and techniques for building intelligent AI agent systems'
      },
      'datePublished': '2024-01-01',
      'dateModified': new Date().toISOString(),
      'description': 'Master AI agent design with 150+ patterns, 500+ techniques, and 1000+ use cases. Learn prompt chaining, routing, parallelization, reflection, tool use, and advanced agentic system architectures.',
      'inLanguage': 'en-US',
      'primaryImageOfPage': {
        '@type': 'ImageObject',
        'url': 'https://agentic-design.ai/og-image.jpg',
        'width': 1200,
        'height': 630
      }
    },
    {
      '@type': 'CollectionPage',
      '@id': 'https://agentic-design.ai/#collection',
      'name': 'AI Design Patterns Collection',
      'description': 'Comprehensive collection of AI design patterns organized by category',
      'url': 'https://agentic-design.ai/patterns',
      'numberOfItems': 150,
      'about': [
        {
          '@type': 'Thing',
          'name': 'Prompt Engineering',
          'description': 'Patterns for effective prompt design and optimization'
        },
        {
          '@type': 'Thing',
          'name': 'Multi-Agent Systems',
          'description': 'Patterns for orchestrating multiple AI agents'
        },
        {
          '@type': 'Thing',
          'name': 'Tool Use Patterns',
          'description': 'Patterns for AI agents using external tools'
        },
        {
          '@type': 'Thing',
          'name': 'Reflection Patterns',
          'description': 'Patterns for self-improving AI systems'
        }
      ]
    },
    {
      '@type': 'SoftwareApplication',
      'name': 'Agentic Design Platform',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '127',
        'bestRating': '5',
        'worstRating': '1'
      },
      'featureList': [
        '150+ AI Design Patterns',
        '500+ Implementation Techniques',
        '1000+ Real-world Use Cases',
        'Interactive Examples',
        'Code Samples',
        'Best Practices Guide',
        'Security Patterns',
        'Performance Optimization'
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageSchema} />
      <HomeClient />
    </>
  );
}