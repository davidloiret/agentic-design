import { SidenavLayout } from '../../components/SidenavLayout';
import { AiInferenceNavigation } from '../../components/AiInferenceNavigation';

export default function AiInferenceLayout({
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidenavLayout
      sidebarContent={<AiInferenceNavigation />}
      sidebarTitle="AI Inference Guide"
      pathSegmentIndex={1}
    >
      {content}
    </SidenavLayout>
  );
}