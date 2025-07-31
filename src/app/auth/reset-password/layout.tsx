import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Reset Password',
  description: 'Create a new password for your Agentic Design account. Enter your new password to regain access to your learning journey.',
  path: '/auth/reset-password',
});

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}