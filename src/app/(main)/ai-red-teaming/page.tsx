import { generateHubPageMetadata } from '../../lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateHubPageMetadata({
    title: 'AI Red Teaming Hub',
    description: 'Learn AI red teaming techniques, defensive security practices, and vulnerability assessment methods for AI systems. Comprehensive guide to adversarial testing and AI security.',
    path: '/ai-red-teaming',
    hubType: 'AI security',
  });
}

export default function AIRedTeamingPage() {
  return null;
}