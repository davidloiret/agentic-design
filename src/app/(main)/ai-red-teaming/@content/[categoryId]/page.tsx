import { RedTeamingCategoryDetails } from '../../../../components/RedTeamingCategoryDetails';
import { categories } from '../../../../categories';
import { generateCategoryMetadata } from '../../../../lib/metadata';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return categories
    .filter(cat => cat.detailedDescription)
    .map((category) => ({
      categoryId: category.id,
    }));
}

interface CategoryContentPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export async function generateMetadata({ params }: CategoryContentPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return generateCategoryMetadata(category);
}

export default async function CategoryContentPage({ params }: CategoryContentPageProps) {
  const { categoryId } = await params;
  return <RedTeamingCategoryDetails categoryId={categoryId} />;
}