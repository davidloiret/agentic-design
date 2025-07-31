import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'Learning Hub',
  description: 'Master AI engineering through three comprehensive learning journeys: AI Agent Fundamentals, Advanced Agentic Patterns, and Real-World Applications. Interactive courses with achievements and progress tracking.',
  path: '/learning-hub',
  hubType: 'learning platform',
});

export default function LearningHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}