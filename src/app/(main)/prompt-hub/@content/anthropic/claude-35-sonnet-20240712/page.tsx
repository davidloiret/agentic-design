import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Claude35Sonnet20240712PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-35-sonnet-20240712')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Claude35Sonnet20240712Page() {
  return <Claude35Sonnet20240712PageContent />;
}
