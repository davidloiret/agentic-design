import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import V020250306PageContent from './content';

const pageData = getPromptHubPageById('vercel/v0-20250306')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function V020250306Page() {
  return <V020250306PageContent />;
}
