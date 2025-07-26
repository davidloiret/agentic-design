import { TechniqueDetails } from '../../../../../components/TechniqueDetails';
import { techniques } from '../../../../../techniques';
import { categories } from '../../../../../categories';
import { useCases } from '../../../../../use-cases';
import { generateTechniqueMetadata } from '../../../../../lib/metadata';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface ContentTechniquePageProps {
  params: { categoryId: string; techniqueId: string };
}

export async function generateMetadata({ params }: ContentTechniquePageProps): Promise<Metadata> {
  const technique = techniques.find(t => t.id === params.techniqueId);
  const category = categories.find(cat => cat.id === params.categoryId);
  
  if (!technique) {
    return {
      title: 'Technique Not Found',
      description: 'The requested technique could not be found.',
    };
  }

  return generateTechniqueMetadata(technique, category);
}

export default function ContentTechniquePage({ params }: ContentTechniquePageProps) {
  const technique = techniques.find(t => t.id === params.techniqueId);
  
  if (!technique) {
    redirect('/patterns');
  }

  return (
    <div className="lg:col-span-3 overflow-y-auto">
      <TechniqueDetails
        selectedTechnique={technique}
        categories={categories}
        useCases={useCases}
      />
    </div>
  );
}