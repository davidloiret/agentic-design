import { ProjectHub } from '../../components/ProjectHub';
import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'Project Hub',
  description: 'Discover and showcase AI agent projects, implementations, and real-world applications. Connect with the community and explore innovative agentic system builds.',
  path: '/project-hub',
  hubType: 'project showcase',
});

export default function ProjectHubPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-0 sm:px-6 py-0 sm:py-8">
        <ProjectHub />
      </div>
    </div>
  );
}