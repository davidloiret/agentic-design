import { NewsTab } from '../../components/NewsTab';
import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'News Hub',
  description: 'Stay updated with the latest AI developments, research breakthroughs, and industry trends. Curated news and insights for AI professionals and enthusiasts.',
  path: '/news-hub',
  hubType: 'AI news',
});

export default function NewsHubPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
        <NewsTab />
      </div>
    </div>
  );
}