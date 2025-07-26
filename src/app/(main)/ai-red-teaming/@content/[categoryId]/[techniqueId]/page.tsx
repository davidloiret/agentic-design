import { RedTeamingTechniqueDetails } from '../../../../../components/RedTeamingTechniqueDetails';

interface TechniqueContentPageProps {
  params: {
    categoryId: string;
    techniqueId: string;
  };
}

export default function TechniqueContentPage({ params }: TechniqueContentPageProps) {
  return <RedTeamingTechniqueDetails categoryId={params.categoryId} techniqueId={params.techniqueId} />;
}