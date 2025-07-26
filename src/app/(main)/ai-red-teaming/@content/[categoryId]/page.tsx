import { RedTeamingCategoryDetails } from '../../../../components/RedTeamingCategoryDetails';

interface CategoryContentPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryContentPage({ params }: CategoryContentPageProps) {
  return <RedTeamingCategoryDetails categoryId={params.categoryId} />;
}