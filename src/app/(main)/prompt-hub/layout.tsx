import { SidenavLayout } from '../../components/SidenavLayout';
import { PromptHubNavigation } from '../../components/PromptHubNavigation';
import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'Prompt Hub',
  description: 'Explore leaked AI system prompts and understand how major AI models are programmed to behave. Learn about system prompt vulnerabilities, extraction techniques, and AI security implications.',
  path: '/prompt-hub',
  hubType: 'prompt analysis',
});

export default function PromptHubLayout({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidenavLayout
      sidebarContent={<PromptHubNavigation />}
      sidebarTitle="Prompt Hub"
      pathSegmentIndex={1}
    >
      {content}
    </SidenavLayout>
  );
}