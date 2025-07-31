import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'AI Inference Hub',
  description: 'Complete guide to AI inference deployment, optimization, and best practices. Learn about edge computing, mobile inference, provider APIs, monitoring, and performance optimization for production AI systems.',
  path: '/ai-inference',
  hubType: 'AI inference',
});

export default function AiInferencePage() {
  return null;
}