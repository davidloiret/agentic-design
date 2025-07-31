import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Create Account',
  description: 'Create your Agentic Design account to unlock interactive learning journeys, track achievements, and master AI agent development patterns.',
  path: '/auth/register',
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}