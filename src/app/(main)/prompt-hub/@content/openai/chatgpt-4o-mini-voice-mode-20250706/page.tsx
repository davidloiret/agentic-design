import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import ChatGPT4oMiniVoiceMode20250706PageContent from './content';

const pageData = getPromptHubPageById('openai/chatgpt-4o-mini-voice-mode-20250706')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function ChatGPT4oMiniVoiceMode20250706Page() {
  return <ChatGPT4oMiniVoiceMode20250706PageContent />;
}
