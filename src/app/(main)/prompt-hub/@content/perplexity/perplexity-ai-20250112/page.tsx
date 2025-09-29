import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import PerplexityAI20250112PageContent from './content';

const pageData = getPromptHubPageById('perplexity/perplexity-ai-20250112')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function PerplexityAI20250112Page() {
  return <PerplexityAI20250112PageContent />;
}
