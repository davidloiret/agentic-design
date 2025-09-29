import { Metadata } from 'next';
import { generateAIInferenceMetadata } from '@/app/lib/metadata';
import { getAIInferencePageById } from '@/app/ai-inference-pages';
import { InferenceTab } from '../../../../components/InferenceTab';

const pageData = getAIInferencePageById('agentic-patterns')!;

export const metadata: Metadata = generateAIInferenceMetadata(pageData);

export default function AgenticPatternsPage() {
  return (
    <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
      <InferenceTab activeCategory="agentic-inference" />
    </div>
  );
}