import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Claude21_20240306PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-2-1-20240306')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Claude21_20240306Page() {
  return <Claude21_20240306PageContent />;
}
