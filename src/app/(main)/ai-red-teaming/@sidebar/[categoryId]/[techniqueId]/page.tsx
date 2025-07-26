import { RoutedRedTeamingTechniquesList } from '../../../../../components/RoutedRedTeamingTechniquesList';

interface TechniqueSidebarPageProps {
  params: {
    categoryId: string;
    techniqueId: string;
  };
}

export default function TechniqueSidebarPage({ params }: TechniqueSidebarPageProps) {
  return <RoutedRedTeamingTechniquesList 
    selectedCategory={params.categoryId} 
    selectedTechnique={params.techniqueId} 
  />;
}