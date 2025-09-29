import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import DevinAI20250515PageContent from './content';

const pageData = getPromptHubPageById('cognition/devin-20250515')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function DevinAI20250515Page() {
  return <DevinAI20250515PageContent />;
}
