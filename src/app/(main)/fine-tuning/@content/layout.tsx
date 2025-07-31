import { Metadata } from 'next';
import { generatePageMetadata } from '../../../lib/metadata';

// Define metadata for each fine-tuning page
const pageMetadata: Record<string, Metadata> = {
  '/fine-tuning': generatePageMetadata({
    title: 'Fine-Tuning Hub',
    description: 'Comprehensive guide to fine-tuning AI models, including cloud and local training techniques, frameworks, model selection, and optimization strategies.',
    path: '/fine-tuning',
    keywords: ['fine-tuning', 'model training', 'AI customization', 'machine learning'],
    type: 'website',
  }),
  '/fine-tuning/cheatsheet': generatePageMetadata({
    title: 'Fine-Tuning Cheatsheet',
    description: 'Quick reference guide for fine-tuning AI models with essential commands, parameters, and best practices for different frameworks.',
    path: '/fine-tuning/cheatsheet',
    keywords: ['fine-tuning cheatsheet', 'training commands', 'model parameters', 'quick reference'],
    type: 'article',
  }),
  '/fine-tuning/techniques': generatePageMetadata({
    title: 'Fine-Tuning Techniques',
    description: 'Advanced fine-tuning techniques including LoRA, QLoRA, parameter-efficient training, and transfer learning strategies.',
    path: '/fine-tuning/techniques',
    keywords: ['LoRA', 'QLoRA', 'parameter-efficient training', 'transfer learning', 'fine-tuning techniques'],
    type: 'article',
  }),
  '/fine-tuning/frameworks': generatePageMetadata({
    title: 'Fine-Tuning Frameworks',
    description: 'Popular frameworks for fine-tuning AI models including Hugging Face Transformers, Axolotl, and specialized training libraries.',
    path: '/fine-tuning/frameworks',
    keywords: ['Hugging Face', 'Transformers', 'Axolotl', 'training frameworks', 'fine-tuning tools'],
    type: 'article',
  }),
  '/fine-tuning/cloud': generatePageMetadata({
    title: 'Cloud Fine-Tuning Services',
    description: 'Guide to cloud-based fine-tuning services including OpenAI fine-tuning, Google Vertex AI, AWS SageMaker, and other managed solutions.',
    path: '/fine-tuning/cloud',
    keywords: ['cloud fine-tuning', 'OpenAI fine-tuning', 'Vertex AI', 'SageMaker', 'managed training'],
    type: 'article',
  }),
  '/fine-tuning/local': generatePageMetadata({
    title: 'Local Fine-Tuning Setup',
    description: 'Complete guide to setting up local fine-tuning environments, hardware requirements, and optimization for personal and small-scale training.',
    path: '/fine-tuning/local',
    keywords: ['local fine-tuning', 'training setup', 'hardware requirements', 'personal training'],
    type: 'article',
  }),
  '/fine-tuning/models': generatePageMetadata({
    title: 'Models for Fine-Tuning',
    description: 'Comprehensive overview of base models suitable for fine-tuning including LLaMA, Mistral, GPT variants, and specialized architectures.',
    path: '/fine-tuning/models',
    keywords: ['LLaMA', 'Mistral', 'GPT models', 'base models', 'model selection'],
    type: 'article',
  }),
};

// Default metadata for the main fine-tuning section
export const metadata: Metadata = pageMetadata['/fine-tuning'] || generatePageMetadata({
  title: 'Fine-Tuning Hub',
  description: 'Comprehensive guide to fine-tuning AI models for custom applications.',
  path: '/fine-tuning',
  keywords: ['fine-tuning', 'model training', 'AI customization'],
  type: 'website',
});

export default function FineTuningContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}