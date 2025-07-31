import { Metadata } from 'next';
import { generateAuthPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateAuthPageMetadata({
  title: 'Forgot Password',
  description: 'Reset your Agentic Design account password. Enter your email address to receive a secure password reset link.',
  path: '/auth/forgot-password',
});

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}