import { Metadata } from 'next';
import { generatePromptPageMetadata } from '../../../../../lib/metadata';

export const metadata: Metadata = generatePromptPageMetadata({
  provider: 'Anthropic',
  model: 'Claude 3.5 Sonnet',
  date: '2024-07-12',
  path: '/prompt-hub/anthropic/claude-35-sonnet-20240712',
  description: 'Revolutionary leaked system prompt for Claude 3.5 Sonnet that introduced the world-first Artifacts system. Worth over $300,000 in prompt engineering research, this leak revealed persistent content generation in conversational AI.',
});

export default function Claude35SonnetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}