import { Metadata } from 'next';
import { generateHubPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = generateHubPageMetadata({
  title: 'Fine-Tuning Hub',
  description: 'Comprehensive guide to fine-tuning AI models, including cloud and local training techniques, frameworks, model selection, and optimization strategies for custom AI applications.',
  path: '/fine-tuning',
  hubType: 'fine-tuning',
});

export default function FineTuningPage() {
  return null;
}