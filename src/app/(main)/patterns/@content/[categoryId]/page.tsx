import { CategoryDetails } from '../../../../components/CategoryDetails';
import { categories } from '../../../../categories';
import { techniques } from '../../../../techniques';
import { redirect } from 'next/navigation';

interface ContentCategoryPageProps {
  params: { categoryId: string };
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