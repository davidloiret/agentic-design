import { SidenavLayout } from '../../components/SidenavLayout';
import { PromptHubNavigation } from '../../components/PromptHubNavigation';

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