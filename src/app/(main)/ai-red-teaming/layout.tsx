import { SidenavLayout } from '../../components/SidenavLayout';
import { RoutedRedTeamingTechniquesList } from '../../components/RoutedRedTeamingTechniquesList';

export default function AIRedTeamingLayout({
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <SidenavLayout
      sidebarContent={<RoutedRedTeamingTechniquesList />}
      sidebarTitle="AI Red Teaming"
      pathSegmentIndex={1}
    >
      {content}
    </SidenavLayout>
  );
}