import { Metadata } from 'next';
import { generateAIInferenceMetadata } from '@/app/lib/metadata';
import { getAIInferencePageById } from '@/app/ai-inference-pages';


const pageData = getAIInferencePageById('overview')!;

export const metadata: Metadata = generateAIInferenceMetadata(pageData);

export default function OverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Inference Overview</h1>
      <p className="text-gray-300 text-lg leading-relaxed">
        Learn the fundamentals of AI inference, from basic concepts to advanced optimization techniques.
      </p>
    </div>
  );
}