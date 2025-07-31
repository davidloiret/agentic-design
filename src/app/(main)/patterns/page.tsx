import { generatePageMetadata } from '../../lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'AI Agent Design Patterns',
    description: 'Explore comprehensive collection of AI agent design patterns including prompt chaining, routing, parallelization, multi-agent systems, memory management, and advanced agentic workflows.',
    path: '/patterns',
    keywords: [
      'prompt chaining',
      'AI routing',
      'parallelization',
      'multi-agent systems',
      'memory management',
      'workflow orchestration',
      'tool use patterns',
      'reflection patterns',
    ],
    type: 'website',
  });
}

export default function PatternsPage() {
  return null;
}