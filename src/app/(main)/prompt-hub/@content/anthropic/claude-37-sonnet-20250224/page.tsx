import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Claude37Sonnet20250224PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-37-sonnet-20250224')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Claude37Sonnet20250224Page() {
  return <Claude37Sonnet20250224PageContent />;
}
