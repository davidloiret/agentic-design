import { Metadata } from 'next';
import { generateUserPageMetadata } from '../lib/metadata';

export const metadata: Metadata = generateUserPageMetadata({
  title: 'Notifications',
  description: 'View and manage your Agentic Design notifications, achievements, learning progress updates, and system alerts.',
  path: '/notifications',
});

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}