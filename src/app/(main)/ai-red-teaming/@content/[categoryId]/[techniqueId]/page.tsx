import { RedTeamingTechniqueDetails } from '../../../../../components/RedTeamingTechniqueDetails';

interface TechniqueContentPageProps {
  params: Promise<{
    categoryId: string;
    techniqueId: string;
  }>;
}

export default async function TechniqueContentPage({ params }: TechniqueContentPageProps) {
  const { categoryId, techniqueId } = await params;
  return <RedTeamingTechniqueDetails categoryId={categoryId} techniqueId={techniqueId} />;
}