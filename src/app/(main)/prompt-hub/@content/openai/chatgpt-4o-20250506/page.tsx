import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import ChatGPT4o20250506PageContent from './content';

const pageData = getPromptHubPageById('openai/chatgpt-4o-20250506')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function ChatGPT4o20250506Page() {
  return <ChatGPT4o20250506PageContent />;
}
