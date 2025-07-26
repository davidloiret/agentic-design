import { RoutedTechniquesList } from '../../../../../components/RoutedTechniquesList';

interface SidebarTechniquePageProps {
  params: { categoryId: string; techniqueId: string };
}

export default function SidebarTechniquePage({ params }: SidebarTechniquePageProps) {
  return <RoutedTechniquesList selectedCategory={params.categoryId} selectedTechnique={params.techniqueId} />;
}