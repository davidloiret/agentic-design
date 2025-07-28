import { RedTeamingCategoryDetails } from '../../../../components/RedTeamingCategoryDetails';

interface CategoryContentPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryContentPage({ params }: CategoryContentPageProps) {
  const { categoryId } = await params;
  return <RedTeamingCategoryDetails categoryId={categoryId} />;
}