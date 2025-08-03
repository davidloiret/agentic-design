import { RedTeamingTechniqueDetails } from '../../../../../components/RedTeamingTechniqueDetails';
import { techniques } from '../../../../../techniques';
import { categories } from '../../../../../categories';

export async function generateStaticParams() {
  const params: { categoryId: string; techniqueId: string }[] = [];
  
  for (const category of categories) {
    for (const technique of techniques) {
      if (technique.category === category.id) {
        params.push({
          categoryId: category.id,
          techniqueId: technique.id,
        });
      }
    }
  }
  
  return params;
}

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