import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import DallE320231007PageContent from './content';

const pageData = getPromptHubPageById('openai/dalle-3-20231007')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function DallE320231007Page() {
  return <DallE320231007PageContent />;
}
