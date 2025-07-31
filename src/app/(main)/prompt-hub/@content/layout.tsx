import { Metadata } from 'next';
import { generatePageMetadata } from '../../../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Prompt Hub Overview',
  description: 'Explore leaked AI system prompts organized by provider. Understand how major AI models including Claude, ChatGPT, Gemini, and others are programmed to behave.',
  path: '/prompt-hub',
  keywords: [
    'system prompts',
    'AI prompts',
    'leaked prompts',
    'Claude prompts',
    'ChatGPT prompts',
    'AI behavior',
    'prompt engineering',
    'AI transparency',
  ],
  type: 'website',
});

export default function PromptHubContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}