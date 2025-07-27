import { InferenceTab } from '../../../../components/InferenceTab';

export default function DeploymentPage() {
  return (
    <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
      <InferenceTab activeCategory="deployment" />
    </div>
  );
}