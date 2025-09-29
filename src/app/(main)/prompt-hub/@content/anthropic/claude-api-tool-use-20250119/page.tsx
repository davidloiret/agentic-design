import { Metadata } from 'next';
import { generatePromptHubMetadata } from '@/app/lib/metadata';
import { getPromptHubPageById } from '@/app/prompt-hub-pages';
import ClaudeAPIToolUse20250119PageContent from './content';

const pageData = getPromptHubPageById('anthropic/claude-api-tool-use-20250119')!;
export const metadata: Metadata = generatePromptHubMetadata(pageData);

export default function ClaudeAPIToolUse20250119Page() {
  return <ClaudeAPIToolUse20250119PageContent />;
}
