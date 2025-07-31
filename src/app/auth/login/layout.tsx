import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Sign In',
  description: 'Sign in to your Agentic Design account to access the learning hub, track your progress, and explore advanced AI agent design patterns.',
  path: '/auth/login',
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}