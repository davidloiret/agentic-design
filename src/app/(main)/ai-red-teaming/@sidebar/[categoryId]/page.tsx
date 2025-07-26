import { RoutedRedTeamingTechniquesList } from '../../../../components/RoutedRedTeamingTechniquesList';

interface CategorySidebarPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategorySidebarPage({ params }: CategorySidebarPageProps) {
  return <RoutedRedTeamingTechniquesList selectedCategory={params.categoryId} />;
}