import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import ChatGPT4oPageContent from './content';

const pageData = getPromptHubPageById('openai/chatgpt-4o-20241210')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function ChatGPT4oPage() {
  return <ChatGPT4oPageContent />;
}
