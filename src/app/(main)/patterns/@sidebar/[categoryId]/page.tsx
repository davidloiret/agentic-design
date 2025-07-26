import { RoutedTechniquesList } from '../../../../components/RoutedTechniquesList';

interface SidebarCategoryPageProps {
  params: { categoryId: string };
}

export default function SidebarCategoryPage({ params }: SidebarCategoryPageProps) {
  return <RoutedTechniquesList selectedCategory={params.categoryId} />;
}