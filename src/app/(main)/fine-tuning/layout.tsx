import { SidenavLayout } from '../../components/SidenavLayout';
import { FineTuningNavigation } from '../../components/FineTuningNavigation';

export default function FineTuningLayout({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidenavLayout
      sidebarContent={<FineTuningNavigation />}
      sidebarTitle="Fine-Tuning Guide"
      pathSegmentIndex={1}
    >
      {content}
    </SidenavLayout>
  );
}