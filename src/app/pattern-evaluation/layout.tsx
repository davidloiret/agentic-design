import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pattern Evaluation Lab',
  description: 'Compare and evaluate AI agent design patterns side-by-side. Test different reasoning approaches, analyze outputs, and optimize pattern performance for your use cases.',
  path: '/pattern-evaluation',
  keywords: [
    'pattern evaluation',
    'AI comparison',
    'pattern testing',
    'performance analysis',
    'side-by-side comparison',
    'reasoning evaluation',
    'pattern optimization',
    'A/B testing',
  ],
  type: 'website',
});

export default function PatternEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}