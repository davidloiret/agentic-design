import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Authentication',
  description: 'Sign in or create an account to access Agentic Design learning hub, track your progress, and unlock advanced AI development features.',
  path: '/auth',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}