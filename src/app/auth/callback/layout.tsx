import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Completing Sign In',
  description: 'Completing your authentication with Agentic Design. Please wait while we redirect you to your dashboard.',
  path: '/auth/callback',
});

export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}