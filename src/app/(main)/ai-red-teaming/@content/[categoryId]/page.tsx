import { RedTeamingCategoryDetails } from '../../../../components/RedTeamingCategoryDetails';
import { categories } from '../../../../categories';

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

export default async function CategoryContentPage({ params }: CategoryContentPageProps) {
  const { categoryId } = await params;
  return <RedTeamingCategoryDetails categoryId={categoryId} />;
}