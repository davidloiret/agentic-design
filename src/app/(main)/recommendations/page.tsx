import { generatePageMetadata } from '../../lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'AI Agent Pattern Recommendations',
    description: 'Get personalized AI agent pattern recommendations based on your specific use case, complexity level, and constraints. Find the perfect agentic design patterns for your needs.',
    path: '/recommendations',
    keywords: [
      'AI pattern recommendations',
      'agentic pattern suggestions',
      'AI use case patterns',
      'pattern matching',
      'AI system design',
      'personalized patterns',
      'pattern selection',
      'AI pattern advisor',
    ],
    type: 'website',
  });
}

export default function RecommendationsPage() {
  return null;
}