import { Metadata } from 'next';
import { generateFineTuningMetadata } from '@/app/lib/metadata';
import { getFineTuningPageById } from '@/app/fine-tuning-pages';
import ModelsPageContent from './content';

const pageData = getFineTuningPageById('models')!;
export const metadata: Metadata = generateFineTuningMetadata(pageData);

export default function ModelsPage() {
  return <ModelsPageContent />;
}
