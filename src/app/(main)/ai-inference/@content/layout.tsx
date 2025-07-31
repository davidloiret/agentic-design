import { Metadata } from 'next';
import { generatePageMetadata } from '../../../lib/metadata';
import { notFound } from 'next/navigation';

// Define metadata for each AI inference page
const pageMetadata: Record<string, Metadata> = {
  '/ai-inference': generatePageMetadata({
    title: 'AI Inference Overview',
    description: 'Complete guide to AI inference deployment, optimization, and best practices. Learn about edge computing, mobile inference, provider APIs, and performance optimization.',
    path: '/ai-inference',
    keywords: ['AI inference', 'model deployment', 'edge computing', 'mobile AI', 'optimization'],
    type: 'website',
  }),
  '/ai-inference/overview': generatePageMetadata({
    title: 'AI Inference Overview',
    description: 'Comprehensive overview of AI inference technologies, deployment strategies, and optimization techniques for production systems.',
    path: '/ai-inference/overview',
    keywords: ['AI inference overview', 'deployment strategies', 'production AI'],
    type: 'article',
  }),
  '/ai-inference/agentic-patterns': generatePageMetadata({
    title: 'Agentic AI Inference Patterns',
    description: 'Specialized inference patterns for agentic AI systems, including multi-step reasoning, tool usage, and autonomous decision-making.',
    path: '/ai-inference/agentic-patterns',
    keywords: ['agentic AI', 'inference patterns', 'autonomous AI', 'multi-step reasoning'],
    type: 'article',
  }),
  '/ai-inference/optimization': generatePageMetadata({
    title: 'AI Inference Optimization',
    description: 'Advanced techniques for optimizing AI inference performance, including quantization, pruning, distillation, and hardware acceleration.',
    path: '/ai-inference/optimization',
    keywords: ['AI optimization', 'quantization', 'model pruning', 'hardware acceleration'],
    type: 'article',
  }),
  '/ai-inference/web-inference': generatePageMetadata({
    title: 'Web-Based AI Inference',
    description: 'Guide to running AI inference in web browsers using WebGL, WebAssembly, and JavaScript frameworks for client-side AI applications.',
    path: '/ai-inference/web-inference',
    keywords: ['web AI', 'browser inference', 'WebGL', 'WebAssembly', 'client-side AI'],
    type: 'article',
  }),
  '/ai-inference/edge-mobile': generatePageMetadata({
    title: 'Edge and Mobile AI Inference',
    description: 'Deploying AI models on edge devices and mobile platforms. Learn about iOS Core ML, Android ML Kit, and embedded systems.',
    path: '/ai-inference/edge-mobile',
    keywords: ['edge AI', 'mobile AI', 'Core ML', 'ML Kit', 'embedded systems'],
    type: 'article',
  }),
  '/ai-inference/vision-models': generatePageMetadata({
    title: 'Computer Vision Model Inference',
    description: 'Specialized techniques for deploying and optimizing computer vision models, including object detection, segmentation, and recognition systems.',
    path: '/ai-inference/vision-models',
    keywords: ['computer vision', 'object detection', 'image segmentation', 'vision models'],
    type: 'article',
  }),
  '/ai-inference/providers': generatePageMetadata({
    title: 'AI Inference Providers',
    description: 'Comprehensive comparison of AI inference providers including AWS SageMaker, Google Vertex AI, Azure ML, and specialized inference services.',
    path: '/ai-inference/providers',
    keywords: ['AI providers', 'AWS SageMaker', 'Google Vertex AI', 'Azure ML', 'inference services'],
    type: 'article',
  }),
  '/ai-inference/libraries': generatePageMetadata({
    title: 'AI Inference Libraries and Frameworks',
    description: 'Popular libraries and frameworks for AI inference including ONNX Runtime, TensorRT, OpenVINO, and TensorFlow Lite.',
    path: '/ai-inference/libraries',
    keywords: ['AI libraries', 'ONNX Runtime', 'TensorRT', 'OpenVINO', 'TensorFlow Lite'],
    type: 'article',
  }),
  '/ai-inference/critical-gaps': generatePageMetadata({
    title: 'Critical Gaps in AI Inference',
    description: 'Analysis of current limitations and challenges in AI inference including latency issues, scalability problems, and security concerns.',
    path: '/ai-inference/critical-gaps',
    keywords: ['AI limitations', 'inference challenges', 'scalability', 'AI security'],
    type: 'article',
  }),
  '/ai-inference/examples': generatePageMetadata({
    title: 'AI Inference Examples and Use Cases',
    description: 'Real-world examples and practical use cases of AI inference across different industries and applications.',
    path: '/ai-inference/examples',
    keywords: ['AI examples', 'use cases', 'practical AI', 'industry applications'],
    type: 'article',
  }),
  '/ai-inference/deployment': generatePageMetadata({
    title: 'AI Model Deployment Strategies',
    description: 'Best practices for deploying AI models to production including containerization, orchestration, and CI/CD pipelines.',
    path: '/ai-inference/deployment',
    keywords: ['AI deployment', 'containerization', 'orchestration', 'CI/CD', 'production AI'],
    type: 'article',
  }),
  '/ai-inference/monitoring': generatePageMetadata({
    title: 'AI Inference Monitoring and Observability',
    description: 'Tools and techniques for monitoring AI inference systems, including performance metrics, drift detection, and system health.',
    path: '/ai-inference/monitoring',
    keywords: ['AI monitoring', 'observability', 'performance metrics', 'drift detection'],
    type: 'article',
  }),
};

// Default metadata for the main AI inference section
export const metadata: Metadata = pageMetadata['/ai-inference'] || generatePageMetadata({
  title: 'AI Inference Hub',
  description: 'Complete guide to AI inference deployment, optimization, and best practices for production systems.',
  path: '/ai-inference',
  keywords: ['AI inference', 'model deployment', 'optimization'],
  type: 'website',
});

export default function AIInferenceContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}