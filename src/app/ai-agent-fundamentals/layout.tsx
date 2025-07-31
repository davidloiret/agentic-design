import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'AI Agent Fundamentals',
  description: 'Master the core concepts of AI agents through interactive flashcards and quizzes. Learn about agent architectures, perception, planning, reasoning, and multi-agent systems.',
  path: '/ai-agent-fundamentals',
  keywords: [
    'AI agent fundamentals',
    'agent architectures',
    'perception sensing',
    'planning reasoning',
    'multi-agent systems',
    'learning adaptation',
    'interactive learning',
    'flashcards',
    'AI education',
  ],
  type: 'website',
});

export default function AIAgentFundamentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}