import { SearchResult } from '@/contexts/SearchContext';

export interface SearchableContent {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  category: string;
  subcategory?: string;
  type: 'page' | 'prompt' | 'pattern' | 'technique' | 'article' | 'project';
  tags?: string[];
  metadata?: Record<string, any>;
}

// Extended content database with all pages
export const searchIndex: SearchableContent[] = [
  // Main Navigation Pages
  {
    id: 'home',
    title: 'Home',
    description: 'Learn how to build reliable and secure AI systems',
    content: 'Welcome to Agentic Design. Explore comprehensive resources for building AI agents, including design patterns, red teaming techniques, fine-tuning guides, and more.',
    url: '/',
    category: 'main',
    type: 'page',
    tags: ['home', 'overview', 'getting started']
  },
  
  // Patterns Section
  {
    id: 'patterns-overview',
    title: 'AI Patterns Overview',
    description: 'Comprehensive collection of AI agent design patterns',
    content: 'Discover proven patterns for building AI systems including prompt chaining, routing, parallelization, orchestration, evaluation, tool use, and multi-agent architectures.',
    url: '/patterns',
    category: 'patterns',
    type: 'page',
    tags: ['patterns', 'design patterns', 'architecture', 'best practices']
  },
  
  // AI Red Teaming
  {
    id: 'red-teaming-overview',
    title: 'AI Red Teaming',
    description: 'Security testing and vulnerability assessment for AI systems',
    content: 'Learn about AI security, adversarial testing, prompt injection, data poisoning, model extraction, and defense strategies.',
    url: '/ai-red-teaming',
    category: 'security',
    type: 'page',
    tags: ['red teaming', 'security', 'vulnerabilities', 'testing', 'adversarial']
  },
  
  // Fine-Tuning
  {
    id: 'fine-tuning-overview',
    title: 'Fine-Tuning Guide',
    description: 'Master the art of fine-tuning AI models',
    content: 'Comprehensive guide to fine-tuning techniques, frameworks, cloud and local setups, model selection, and optimization strategies.',
    url: '/fine-tuning',
    category: 'training',
    type: 'page',
    tags: ['fine-tuning', 'training', 'optimization', 'models']
  },
  {
    id: 'fine-tuning-techniques',
    title: 'Fine-Tuning Techniques',
    description: 'Advanced techniques for model fine-tuning',
    content: 'Explore LoRA, QLoRA, full fine-tuning, adapter methods, and parameter-efficient fine-tuning techniques.',
    url: '/fine-tuning/techniques',
    category: 'training',
    subcategory: 'techniques',
    type: 'page',
    tags: ['lora', 'qlora', 'peft', 'adapters']
  },
  {
    id: 'fine-tuning-frameworks',
    title: 'Fine-Tuning Frameworks',
    description: 'Popular frameworks for model fine-tuning',
    content: 'Compare Hugging Face Transformers, DeepSpeed, Axolotl, and other fine-tuning frameworks.',
    url: '/fine-tuning/frameworks',
    category: 'training',
    subcategory: 'frameworks',
    type: 'page',
    tags: ['huggingface', 'deepspeed', 'axolotl', 'frameworks']
  },
  {
    id: 'fine-tuning-cloud',
    title: 'Cloud Fine-Tuning',
    description: 'Fine-tune models using cloud services',
    content: 'Guide to fine-tuning on AWS SageMaker, Google Cloud, Azure ML, and specialized platforms.',
    url: '/fine-tuning/cloud',
    category: 'training',
    subcategory: 'infrastructure',
    type: 'page',
    tags: ['cloud', 'aws', 'gcp', 'azure', 'sagemaker']
  },
  {
    id: 'fine-tuning-local',
    title: 'Local Fine-Tuning',
    description: 'Set up local fine-tuning environments',
    content: 'Configure local GPU setups, manage VRAM, optimize batch sizes, and troubleshoot common issues.',
    url: '/fine-tuning/local',
    category: 'training',
    subcategory: 'infrastructure',
    type: 'page',
    tags: ['local', 'gpu', 'cuda', 'setup']
  },
  
  // AI Inference
  {
    id: 'ai-inference-overview',
    title: 'AI Inference',
    description: 'Deploy and optimize AI models for production',
    content: 'Learn about model deployment, inference optimization, serving strategies, and production best practices.',
    url: '/ai-inference',
    category: 'deployment',
    type: 'page',
    tags: ['inference', 'deployment', 'production', 'serving']
  },
  {
    id: 'ai-inference-optimization',
    title: 'Inference Optimization',
    description: 'Optimize model inference performance',
    content: 'Techniques for quantization, pruning, distillation, caching, and hardware acceleration.',
    url: '/ai-inference/optimization',
    category: 'deployment',
    subcategory: 'optimization',
    type: 'page',
    tags: ['optimization', 'quantization', 'performance', 'latency']
  },
  {
    id: 'ai-inference-providers',
    title: 'Inference Providers',
    description: 'Compare AI inference service providers',
    content: 'Overview of OpenAI, Anthropic, Google, AWS Bedrock, and other inference providers.',
    url: '/ai-inference/providers',
    category: 'deployment',
    subcategory: 'providers',
    type: 'page',
    tags: ['providers', 'openai', 'anthropic', 'google', 'aws']
  },
  {
    id: 'ai-inference-deployment',
    title: 'Deployment Strategies',
    description: 'Deploy AI models at scale',
    content: 'Container deployment, serverless inference, edge deployment, and scaling strategies.',
    url: '/ai-inference/deployment',
    category: 'deployment',
    subcategory: 'strategies',
    type: 'page',
    tags: ['deployment', 'containers', 'serverless', 'kubernetes']
  },
  
  // Prompt Hub
  {
    id: 'prompt-hub-overview',
    title: 'Prompt Hub',
    description: 'Collection of system prompts from various AI models',
    content: 'Explore and analyze system prompts from Claude, GPT-4, Gemini, and other leading AI models.',
    url: '/prompt-hub',
    category: 'prompts',
    type: 'page',
    tags: ['prompts', 'system prompts', 'examples']
  },
  {
    id: 'prompt-claude-3-opus',
    title: 'Claude 3 Opus System Prompt',
    description: 'Anthropic Claude 3 Opus model system prompt',
    content: 'Detailed analysis of Claude 3 Opus system prompt, capabilities, and best practices.',
    url: '/prompt-hub/anthropic/claude-3-opus-20240306',
    category: 'prompts',
    subcategory: 'anthropic',
    type: 'prompt',
    tags: ['claude', 'anthropic', 'opus', 'system prompt']
  },
  {
    id: 'prompt-gpt-4o',
    title: 'GPT-4o System Prompt',
    description: 'OpenAI GPT-4o model system prompt',
    content: 'Analysis of GPT-4o system prompt, multimodal capabilities, and usage guidelines.',
    url: '/prompt-hub/openai/chatgpt-4o-20241210',
    category: 'prompts',
    subcategory: 'openai',
    type: 'prompt',
    tags: ['gpt-4', 'openai', 'multimodal', 'system prompt']
  },
  
  // Learning Hub
  {
    id: 'learning-hub',
    title: 'Learning Hub',
    description: 'Educational resources and tutorials',
    content: 'Access comprehensive tutorials, guides, courses, and educational content for AI development.',
    url: '/learning-hub',
    category: 'education',
    type: 'page',
    tags: ['learning', 'tutorials', 'courses', 'education']
  },
  
  // Project Hub
  {
    id: 'project-hub',
    title: 'Project Hub',
    description: 'Showcase of AI projects and implementations',
    content: 'Explore real-world AI projects, case studies, and implementation examples.',
    url: '/project-hub',
    category: 'projects',
    type: 'page',
    tags: ['projects', 'showcase', 'examples', 'case studies']
  },
  
  // News Hub
  {
    id: 'news-hub',
    title: 'News Hub',
    description: 'Latest updates in AI and technology',
    content: 'Stay updated with the latest news, research papers, and developments in AI.',
    url: '/news-hub',
    category: 'news',
    type: 'page',
    tags: ['news', 'updates', 'research', 'announcements']
  },
  
  // Interactive Demo
  {
    id: 'interactive-demo',
    title: 'Interactive Demo',
    description: 'Try AI patterns in action',
    content: 'Interactive demonstrations of AI patterns, prompt engineering, and agent architectures.',
    url: '/interactive-demo',
    category: 'main',
    type: 'page',
    tags: ['demo', 'interactive', 'playground', 'examples']
  },
  
  // User Pages
  {
    id: 'profile',
    title: 'Profile',
    description: 'Manage your user profile',
    content: 'View and edit your profile information, preferences, and account settings.',
    url: '/profile',
    category: 'user',
    type: 'page',
    tags: ['profile', 'account', 'user']
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Application settings and preferences',
    content: 'Configure application settings, notifications, privacy, and preferences.',
    url: '/settings',
    category: 'user',
    type: 'page',
    tags: ['settings', 'preferences', 'configuration']
  },
  {
    id: 'billing',
    title: 'Billing',
    description: 'Manage billing and subscriptions',
    content: 'View billing information, manage subscriptions, and payment methods.',
    url: '/billing',
    category: 'user',
    type: 'page',
    tags: ['billing', 'subscription', 'payment']
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'View and manage notifications',
    content: 'Check your notifications, updates, and alerts.',
    url: '/notifications',
    category: 'user',
    type: 'page',
    tags: ['notifications', 'alerts', 'updates']
  },
  
  // Help & About
  {
    id: 'help',
    title: 'Help Center',
    description: 'Get help and support',
    content: 'Access documentation, FAQs, tutorials, and contact support.',
    url: '/help',
    category: 'support',
    type: 'page',
    tags: ['help', 'support', 'documentation', 'faq']
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn about Agentic Design',
    content: 'Discover our mission, team, and the story behind Agentic Design.',
    url: '/about',
    category: 'main',
    type: 'page',
    tags: ['about', 'team', 'mission', 'company']
  }
];

// Helper function to get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  searchIndex.forEach(item => categories.add(item.category));
  return Array.from(categories).sort();
}

// Helper function to get all unique types
export function getAllTypes(): string[] {
  const types = new Set<string>();
  searchIndex.forEach(item => types.add(item.type));
  return Array.from(types).sort();
}

// Helper function to get popular tags
export function getPopularTags(limit: number = 10): string[] {
  const tagCount = new Map<string, number>();
  
  searchIndex.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    }
  });
  
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}