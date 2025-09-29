export interface FineTuningPage {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
  priority?: number;
}

export const fineTuningPages: FineTuningPage[] = [
  {
    id: 'cheatsheet',
    title: 'Fine-Tuning Cheatsheet',
    description: 'Quick reference guide for fine-tuning AI models including hyperparameters, techniques, and best practices. Complete cheatsheet.',
    keywords: ['fine-tuning cheatsheet', 'model training', 'hyperparameters', 'quick reference'],
    priority: 0.8
  },
  {
    id: 'cloud',
    title: 'Cloud Fine-Tuning Platforms',
    description: 'Fine-tune AI models on cloud platforms including AWS, GCP, Azure, Replicate, and Together AI. Compare features and pricing.',
    keywords: ['cloud fine-tuning', 'AWS SageMaker', 'GCP Vertex AI', 'Azure ML'],
    priority: 0.8
  },
  {
    id: 'local',
    title: 'Local Fine-Tuning',
    description: 'Fine-tune AI models locally with your own hardware. Setup guides for CUDA, ROCm, and consumer GPUs.',
    keywords: ['local fine-tuning', 'GPU training', 'CUDA', 'self-hosted training'],
    priority: 0.7
  },
  {
    id: 'frameworks',
    title: 'Fine-Tuning Frameworks',
    description: 'Popular fine-tuning frameworks including Hugging Face, Axolotl, LLaMA Factory, Unsloth, and more.',
    keywords: ['fine-tuning frameworks', 'Hugging Face', 'Axolotl', 'LLaMA Factory'],
    priority: 0.8
  },
  {
    id: 'techniques',
    title: 'Fine-Tuning Techniques',
    description: 'Advanced fine-tuning techniques including LoRA, QLoRA, PEFT, full fine-tuning, and instruction tuning.',
    keywords: ['LoRA', 'QLoRA', 'PEFT', 'instruction tuning', 'model adaptation'],
    priority: 0.8
  },
  {
    id: 'models',
    title: 'Models for Fine-Tuning',
    description: 'Best open-source models for fine-tuning including LLaMA, Mistral, Phi, Qwen, and more. Model selection guide.',
    keywords: ['fine-tuning models', 'LLaMA', 'Mistral', 'open source models'],
    priority: 0.7
  },
  {
    id: 'gaps',
    title: 'Fine-Tuning Gaps and Challenges',
    description: 'Current limitations in fine-tuning technology including data requirements, compute costs, and quality challenges.',
    keywords: ['fine-tuning challenges', 'limitations', 'data requirements', 'costs'],
    priority: 0.6
  }
];

export function getFineTuningPageById(id: string): FineTuningPage | undefined {
  return fineTuningPages.find(page => page.id === id);
}