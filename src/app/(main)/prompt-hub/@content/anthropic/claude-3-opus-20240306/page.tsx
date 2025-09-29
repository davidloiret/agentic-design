import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Claude3Opus20240306PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-3-opus-20240306')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Claude3Opus20240306Page() {
  return <Claude3Opus20240306PageContent />;
}
