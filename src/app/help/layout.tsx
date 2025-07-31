import { Metadata } from 'next';
import { generatePageMetadata } from '../lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Help & Support',
  description: 'Get help with Agentic Design. Browse FAQ, contact support, and access resources including documentation, tutorials, and community forums.',
  path: '/help',
  keywords: [
    'help',
    'support',
    'FAQ',
    'documentation',
    'tutorials',
    'troubleshooting',
    'contact support',
    'resources',
  ],
  type: 'website',
});

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}