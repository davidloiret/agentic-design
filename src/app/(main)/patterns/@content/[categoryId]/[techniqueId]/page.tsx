import { TechniqueDetails } from '../../../../../components/TechniqueDetails';
import { techniques } from '../../../../../techniques';
import { categories } from '../../../../../categories';
import { useCases } from '../../../../../use-cases';
import { redirect } from 'next/navigation';

interface ContentTechniquePageProps {
  params: { categoryId: string; techniqueId: string };
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