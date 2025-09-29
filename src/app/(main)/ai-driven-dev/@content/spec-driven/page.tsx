import { Metadata } from 'next';
import { generateAIDrivenDevMetadata } from '@/app/lib/metadata';
import { getAIDrivenDevPageById } from '@/app/ai-driven-dev-pages';
import SpecDrivenContent from './content';

import JsonLd from '@/components/JsonLd';

const pageData = getAIDrivenDevPageById('spec-driven')!;

export const metadata: Metadata = generateAIDrivenDevMetadata(pageData);


const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: pageData.title,
  description: pageData.description,
  author: {
    '@type': 'Organization',
    name: 'Agentic Design Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Agentic Design',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai'
  },
  datePublished: new Date().toISOString(),
  dateModified: new Date().toISOString(),
  articleSection: pageData.category,
  keywords: pageData.keywords?.join(', ')
};

export default function SpecDrivenPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SpecDrivenContent />
    </>
  );
}
