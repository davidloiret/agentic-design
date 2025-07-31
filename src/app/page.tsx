import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata } from './lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Agentic Design Patterns',
  description: 'Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems. Explore proven patterns for prompt chaining, routing, parallelization, and advanced agentic workflows.',
  path: '/',
  keywords: [
    'AI development',
    'intelligent systems',
    'agentic workflows',
    'prompt engineering',
    'LLM patterns',
    'agent architecture',
  ],
  type: 'website',
});

export default function Home() {
  redirect('/patterns');
}
