import { CategoryDetails } from '../../../../components/CategoryDetails';
import { categories } from '../../../../categories';
import { techniques } from '../../../../techniques';
import { generateCategoryMetadata } from '../../../lib/metadata';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface ContentCategoryPageProps {
  params: { categoryId: string };
}

export async function generateMetadata({ params }: ContentCategoryPageProps): Promise<Metadata> {
  const category = categories.find(cat => cat.id === params.categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return generateCategoryMetadata(category);
}

export default function ContentCategoryPage({ params }: ContentCategoryPageProps) {
  const category = categories.find(cat => cat.id === params.categoryId);
  
  if (!category) {
    redirect('/patterns');
  }

  if (!category.detailedDescription) {
    redirect('/patterns');
  }

  return (
    <div className="lg:col-span-3 overflow-y-auto">
      <CategoryDetails
        category={category}
        techniques={techniques}
      />
    </div>
  );
}