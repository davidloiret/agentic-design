import { generateDefaultMetadata } from '../../lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateDefaultMetadata({
    title: 'AI Red Teaming Hub - Agentic Design',
    description: 'Learn AI red teaming techniques, defensive security practices, and vulnerability assessment methods for AI systems.',
    keywords: ['AI red teaming', 'AI security', 'adversarial testing', 'AI vulnerabilities', 'defensive security']
  });
}

export default function AIRedTeamingPage() {
  return null;
}