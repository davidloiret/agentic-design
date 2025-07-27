import { NewsTab } from '../../components/NewsTab';

export default function NewsHubPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
        <NewsTab />
      </div>
    </div>
  );
}