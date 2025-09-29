export interface AIInferencePage {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
  priority?: number;
}

export const aiInferencePages: AIInferencePage[] = [
  {
    id: 'overview',
    title: 'AI Inference Overview',
    description: 'Complete guide to AI inference, deployment strategies, optimization techniques, and best practices for running language models in production.',
    keywords: ['AI inference', 'model deployment', 'LLM inference', 'production AI'],
    priority: 0.9
  },
  {
    id: 'providers',
    title: 'AI Inference Providers',
    description: 'Compare AI inference providers including OpenAI, Anthropic, Replicate, Together AI, and more. Pricing, features, and performance benchmarks.',
    keywords: ['inference providers', 'AI API', 'LLM providers', 'model hosting'],
    priority: 0.8
  },
  {
    id: 'libraries',
    title: 'AI Inference Libraries',
    description: 'Popular inference libraries and frameworks including vLLM, TGI, Ollama, llama.cpp, and more for running models locally or in production.',
    keywords: ['inference libraries', 'vLLM', 'TGI', 'Ollama', 'llama.cpp'],
    priority: 0.8
  },
  {
    id: 'deployment',
    title: 'AI Model Deployment',
    description: 'Deploy AI models to production with Docker, Kubernetes, serverless platforms, and edge devices. Complete deployment guide.',
    keywords: ['model deployment', 'Docker', 'Kubernetes', 'serverless AI', 'production deployment'],
    priority: 0.8
  },
  {
    id: 'optimization',
    title: 'AI Inference Optimization',
    description: 'Optimize AI inference performance with quantization, batching, caching, and hardware acceleration. Reduce latency and costs.',
    keywords: ['inference optimization', 'quantization', 'model optimization', 'performance tuning'],
    priority: 0.8
  },
  {
    id: 'monitoring',
    title: 'AI Inference Monitoring',
    description: 'Monitor AI inference systems with observability, logging, metrics, and alerting. Track performance, costs, and quality.',
    keywords: ['inference monitoring', 'AI observability', 'model monitoring', 'performance metrics'],
    priority: 0.7
  },
  {
    id: 'vision-models',
    title: 'Vision Language Models (VLMs)',
    description: 'Deploy and optimize vision language models like GPT-4V, Claude with vision, LLaVA, and more for multimodal AI applications.',
    keywords: ['vision models', 'VLM', 'multimodal AI', 'image understanding'],
    priority: 0.8
  },
  {
    id: 'edge-mobile',
    title: 'Edge and Mobile AI Inference',
    description: 'Run AI models on edge devices and mobile platforms with TensorFlow Lite, Core ML, ONNX Runtime, and quantized models.',
    keywords: ['edge AI', 'mobile inference', 'on-device AI', 'TensorFlow Lite', 'Core ML'],
    priority: 0.7
  },
  {
    id: 'web-inference',
    title: 'Web-Based AI Inference',
    description: 'Run AI models in the browser with WebGPU, ONNX.js, TensorFlow.js, and Transformers.js for client-side inference.',
    keywords: ['web inference', 'WebGPU', 'browser AI', 'client-side inference'],
    priority: 0.7
  },
  {
    id: 'examples',
    title: 'AI Inference Examples',
    description: 'Real-world examples and code samples for deploying and running AI inference in production environments.',
    keywords: ['inference examples', 'code samples', 'production examples'],
    priority: 0.7
  },
  {
    id: 'agentic-patterns',
    title: 'Agentic Inference Patterns',
    description: 'Design patterns for agentic AI systems including tool use, multi-step reasoning, and autonomous agent architectures.',
    keywords: ['agentic patterns', 'AI agents', 'autonomous systems', 'tool use'],
    priority: 0.8
  },
  {
    id: 'critical-gaps',
    title: 'Critical Gaps in AI Inference',
    description: 'Current limitations and gaps in AI inference technology including latency, costs, reliability, and scalability challenges.',
    keywords: ['AI limitations', 'inference gaps', 'challenges', 'future improvements'],
    priority: 0.6
  }
];

export function getAIInferencePageById(id: string): AIInferencePage | undefined {
  return aiInferencePages.find(page => page.id === id);
}