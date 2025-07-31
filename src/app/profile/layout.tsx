import { Metadata } from 'next';
import { generateUserPageMetadata } from '../lib/metadata';

export const metadata: Metadata = generateUserPageMetadata({
  title: 'Profile',
  description: 'Manage your Agentic Design profile information, update personal details, and configure your account settings.',
  path: '/profile',
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}