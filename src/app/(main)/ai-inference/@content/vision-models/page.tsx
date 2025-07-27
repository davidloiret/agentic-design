import { InferenceTab } from '../../../../components/InferenceTab';

export default function VisionModelsPage() {
  return (
    <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
      <InferenceTab activeCategory="vlm-inference" />
    </div>
  );
}