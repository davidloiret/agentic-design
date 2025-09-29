import { RedTeamingTechniqueDetails } from '../../../../../components/RedTeamingTechniqueDetails';
import { techniques } from '../../../../../techniques';
import { categories } from '../../../../../categories';
import { generateTechniqueMetadata } from '../../../../../lib/metadata';
import { Metadata } from 'next';

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

export async function generateMetadata({ params }: TechniqueContentPageProps): Promise<Metadata> {
  const { categoryId, techniqueId } = await params;
  const technique = techniques.find(t => t.id === techniqueId);
  const category = categories.find(cat => cat.id === categoryId);

  if (!technique) {
    return {
      title: 'Technique Not Found',
      description: 'The requested technique could not be found.',
    };
  }

  return generateTechniqueMetadata(technique, category);
}

export default async function TechniqueContentPage({ params }: TechniqueContentPageProps) {
  const { categoryId, techniqueId } = await params;
  return <RedTeamingTechniqueDetails categoryId={categoryId} techniqueId={techniqueId} />;
}