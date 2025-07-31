import { Metadata } from 'next';
import { generateUserPageMetadata } from '../lib/metadata';

export const metadata: Metadata = generateUserPageMetadata({
  title: 'Billing',
  description: 'Manage your Agentic Design subscription, billing information, payment methods, and view your invoice history.',
  path: '/billing',
});

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}