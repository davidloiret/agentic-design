import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Interactive Pattern Demo',
  description: 'Interactive demonstration of AI agent design patterns with visual flow diagrams, real-time execution, and hands-on learning experiences.',
  path: '/interactive-demo',
  keywords: [
    'interactive demo',
    'pattern visualization',
    'hands-on learning',
    'visual flow diagrams',
    'AI pattern simulation',
    'educational tools',
  ],
  type: 'website',
});

export default function InteractiveDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}