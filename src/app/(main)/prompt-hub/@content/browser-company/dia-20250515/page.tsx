import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import Dia20250515PageContent from './content';

const pageData = getPromptHubPageById('browser-company/dia-20250515')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function Dia20250515Page() {
  return <Dia20250515PageContent />;
}
