import { Metadata } from 'next';
import { generateUserPageMetadata } from '../lib/metadata';

export const metadata: Metadata = generateUserPageMetadata({
  title: 'Settings',
  description: 'Configure your Agentic Design account settings, preferences, notifications, privacy controls, and appearance options.',
  path: '/settings',
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}