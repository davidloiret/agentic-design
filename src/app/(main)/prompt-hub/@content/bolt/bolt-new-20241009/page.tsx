import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import BoltNew20241009PageContent from './content';

const pageData = getPromptHubPageById('bolt/bolt-new-20241009')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function BoltNew20241009Page() {
  return <BoltNew20241009PageContent />;
}
