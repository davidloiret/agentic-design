import { SidenavLayout } from '../../components/SidenavLayout';
import { RoutedTechniquesList } from '../../components/RoutedTechniquesList';

export default function PatternsLayout({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidenavLayout
      sidebarContent={<RoutedTechniquesList />}
      sidebarTitle="Patterns"
      pathSegmentIndex={1}
    >
      {content}
    </SidenavLayout>
  );
}