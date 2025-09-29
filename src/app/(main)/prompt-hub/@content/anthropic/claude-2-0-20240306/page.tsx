import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Claude20_20240306PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-2-0-20240306')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Claude20_20240306Page() {
  return <Claude20_20240306PageContent />;
}
