import { Metadata } from 'next';
import { generatePromptPageMetadata } from '../../../../../lib/metadata';

export const metadata: Metadata = generatePromptPageMetadata({
  provider: 'OpenAI',
  model: 'ChatGPT-4o',
  date: '2024-12-10',
  path: '/prompt-hub/openai/chatgpt-4o-20241210',
  description: 'Leaked system prompt for OpenAI ChatGPT-4o revealing enhanced multimodal capabilities, image analysis instructions, and advanced reasoning frameworks.',
});

export default function ChatGPT4oLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}