import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import WindsurfCascadeR120250201PageContent from './content';

const pageData = getPromptHubPageById('codeium/windsurf-cascade-r1-20250201')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function WindsurfCascadeR120250201Page() {
  return <WindsurfCascadeR120250201PageContent />;
}
