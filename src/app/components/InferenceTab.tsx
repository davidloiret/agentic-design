"use client"

import React, { useState } from 'react';
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Eye, 
  Cloud, 
  Code, 
  ExternalLink, 
  Monitor,
  Zap,
  Shield,
  DollarSign,
  Gauge,
  Users,
  Layers,
  Terminal,
  BookOpen,
  Github,
  Play
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export const InferenceTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('overview');

  const categories = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'agentic-inference', label: 'Agentic Patterns', icon: Layers },
    { id: 'optimization', label: 'Advanced Optimization', icon: Zap },
    { id: 'web-inference', label: 'Web Inference', icon: Globe },
    { id: 'edge-device', label: 'Edge & Mobile', icon: Smartphone },
    { id: 'vlm-inference', label: 'Vision Models', icon: Eye },
    { id: 'providers', label: 'Providers', icon: Cloud },
    { id: 'libraries', label: 'Libraries', icon: Code },
    { id: 'missing-gaps', label: 'Critical Gaps', icon: Shield },
    { id: 'examples', label: 'Examples', icon: Terminal }
  ];

  const webInferenceTools = [
    {
      name: "WebLLM",
      description: "High-performance in-browser LLM inference using WebGPU and WebAssembly",
      features: ["WebGPU acceleration", "OpenAI-compatible API", "80% native performance", "Privacy-preserving"],
      link: "https://github.com/mlc-ai/web-llm",
      package: "@mlc-ai/web-llm"
    },
    {
      name: "BrowserAI",
      description: "Run production-ready LLMs directly in your browser with TypeScript support",
      features: ["100% Private", "WebGPU Accelerated", "Zero Server Costs", "Offline Capable"],
      link: "https://github.com/Cloud-Code-AI/BrowserAI",
      package: "@browserai/browserai"
    },
    {
      name: "picoLLM",
      description: "Cross-browser local LLM inference using WebAssembly with SIMD acceleration",
      features: ["Cross-browser compatible", "WebAssembly SIMD", "WebWorker support", "11.5 tokens/sec"],
      link: "https://picovoice.ai/",
      package: "Contact provider"
    },
    {
      name: "Transformers.js",
      description: "Run Hugging Face models directly in browsers using ONNX.js",
      features: ["ONNX.js backend", "Hugging Face ecosystem", "Web Workers", "Multiple model types"],
      link: "https://github.com/xenova/transformers.js",
      package: "@xenova/transformers"
    }
  ];

  const edgeDeviceTools = [
    {
      name: "MobileVLM",
      description: "Fast, strong vision language assistant optimized for mobile devices",
      features: ["1.4B-2.7B parameters", "21.5 tokens/sec on mobile", "Snapdragon optimized", "CLIP-based vision"],
      link: "https://github.com/Meituan-AutoML/MobileVLM",
      platform: "iOS/Android"
    },
    {
      name: "OpenInfer",
      description: "Hybrid, local-first AI runtime for edge devices and constrained environments",
      features: ["Local-first", "Progressive enhancement", "Cross-platform", "Enterprise-grade"],
      link: "https://openinfer.io/",
      platform: "Edge devices"
    },
    {
      name: "TensorFlow Lite",
      description: "Lightweight solution for mobile and embedded device inference",
      features: ["Model quantization", "Hardware acceleration", "Cross-platform", "Optimized kernels"],
      link: "https://www.tensorflow.org/lite",
      platform: "Mobile/Embedded"
    },
    {
      name: "ONNX Runtime",
      description: "Cross-platform inference for ONNX models on various hardware",
      features: ["Hardware acceleration", "Quantization", "Multiple backends", "Production-ready"],
      link: "https://onnxruntime.ai/",
      platform: "Cross-platform"
    }
  ];

  const vlmInferenceTools = [
    {
      name: "LiteVLM",
      description: "Low-latency vision-language model pipeline for resource-constrained environments",
      features: ["2.5x latency reduction", "Patch selection", "Token optimization", "FP8 quantization"],
      link: "https://arxiv.org/abs/2506.07416",
      use_case: "Autonomous driving"
    },
    {
      name: "EdgeVLA",
      description: "Efficient vision-language-action models for edge deployment",
      features: ["7x speedup", "Small language models", "Real-time performance", "Memory efficient"],
      link: "https://arxiv.org/abs/2507.14049",
      use_case: "Robotics"
    },
    {
      name: "MobileVLM V2",
      description: "Faster and stronger baseline for vision language models on mobile",
      features: ["LDPv2 projector", "Multi-task training", "1.7B-7B models", "Cross-browser support"],
      link: "https://github.com/Meituan-AutoML/MobileVLM",
      use_case: "Mobile apps"
    }
  ];

  const onDeviceProviders = [
    {
      name: "Ollama",
      description: "Easy-to-use local model serving with Docker-like simplicity",
      features: ["Local deployment", "Simple CLI", "Model library", "REST API"],
      pricing: "Free (your hardware)",
      link: "https://ollama.ai/"
    },
    {
      name: "LM Studio",
      description: "Desktop app for running LLMs locally with user-friendly interface",
      features: ["GUI interface", "Model management", "Chat interface", "API server"],
      pricing: "Free",
      link: "https://lmstudio.ai/"
    },
    {
      name: "Jan",
      description: "Open-source alternative to ChatGPT that runs 100% offline",
      features: ["100% offline", "Cross-platform", "OpenAI compatible", "Privacy-first"],
      pricing: "Free (open-source)",
      link: "https://jan.ai/"
    },
    {
      name: "GPT4All",
      description: "Free-to-use, locally running, privacy-aware chatbot",
      features: ["No GPU required", "Privacy-aware", "Easy setup", "Multiple models"],
      pricing: "Free",
      link: "https://gpt4all.io/"
    },
    {
      name: "llamafile",
      description: "Distribute and run LLMs with a single file executable",
      features: ["Single executable", "Cross-platform", "No dependencies", "Mozilla project"],
      pricing: "Free (open-source)",
      link: "https://github.com/Mozilla-Ocho/llamafile"
    }
  ];

  const cloudProviders = [
    {
      name: "OpenAI",
      description: "Industry-leading AI models including GPT-4, GPT-3.5, and DALL-E",
      features: ["GPT-4 Turbo", "Function calling", "Vision capabilities", "Assistants API"],
      pricing: "$0.01-0.06/1K tokens",
      link: "https://platform.openai.com/"
    },
    {
      name: "Anthropic",
      description: "Claude models focused on helpful, harmless, and honest AI",
      features: ["Claude 3.5 Sonnet", "200K context", "Safety-focused", "Constitutional AI"],
      pricing: "$3-15/1M tokens",
      link: "https://www.anthropic.com/"
    },
    {
      name: "Google AI Studio",
      description: "Gemini models with multimodal capabilities and long context",
      features: ["Gemini Pro", "1M token context", "Multimodal", "Code generation"],
      pricing: "Free tier + usage",
      link: "https://ai.google.dev/"
    },
    {
      name: "Together AI",
      description: "High-performance inference with sub-100ms latency and strong privacy controls",
      features: ["200+ models", "Sub-100ms latency", "11x more affordable", "Privacy-focused"],
      pricing: "Pay-per-token",
      link: "https://together.ai/"
    },
    {
      name: "OpenRouter",
      description: "Inference marketplace routing traffic across 300+ models from top providers",
      features: ["300+ models", "Automatic failovers", "Unified API", "Competitive pricing"],
      pricing: "Varies by model",
      link: "https://openrouter.ai/"
    },
    {
      name: "Fireworks AI",
      description: "Ultra-fast inference using proprietary optimization with multi-modal support",
      features: ["4x lower latency", "Multi-modal", "HIPAA/SOC2", "FireAttention engine"],
      pricing: "Usage-based",
      link: "https://fireworks.ai/"
    },
    {
      name: "Groq",
      description: "Ultra-fast AI inference with custom Language Processing Units (LPUs) - industry-leading speed",
      features: ["18x faster than GPUs", "275 tokens/sec", "0.14s TTFT", "Sub-second responses", "Hardware optimization"],
      pricing: "Token-based",
      link: "https://groq.com/"
    },
    {
      name: "Replicate",
      description: "Cloud platform for running open-source models with simple API",
      features: ["1000+ models", "Quick experiments", "Pay-per-inference", "Open-source focus"],
      pricing: "Per-inference",
      link: "https://replicate.com/"
    },
    {
      name: "Novita AI",
      description: "Globally distributed inference with intelligent auto-scaling and cost efficiency",
      features: ["50% cost savings", "Global edge deployment", "Auto-scaling", "Multi-region"],
      pricing: "Per-second billing",
      link: "https://novita.ai/"
    },
    {
      name: "Perplexity AI",
      description: "AI-powered search and reasoning with real-time information",
      features: ["Real-time search", "Reasoning models", "Citation support", "Fast inference"],
      pricing: "$5/month Pro",
      link: "https://www.perplexity.ai/"
    },
    {
      name: "Cohere",
      description: "Enterprise-focused language AI with customization capabilities",
      features: ["Command R+", "RAG optimization", "Enterprise security", "Fine-tuning"],
      pricing: "Usage-based",
      link: "https://cohere.ai/"
    },
    {
      name: "Mistral AI",
      description: "European AI company offering efficient and powerful language models",
      features: ["Mistral Large", "Code generation", "Function calling", "Multilingual"],
      pricing: "€0.25-2/1M tokens",
      link: "https://mistral.ai/"
    },
    {
      name: "xAI Grok",
      description: "Elon Musk's AI model with real-time information access and open-source availability",
      features: ["Real-time X integration", "Grok-1 open-sourced", "314B parameters", "Mixture of Experts"],
      pricing: "Subscription-based",
      link: "https://grok.x.ai/"
    }
  ];

  const libraries = [
    {
      name: "llama.cpp",
      description: "C++ implementation of LLaMA inference with quantization support",
      features: ["CPU optimized", "Multiple quantization", "Cross-platform", "Memory efficient"],
      language: "C++",
      link: "https://github.com/ggerganov/llama.cpp"
    },
    {
      name: "Ollama",
      description: "Easy-to-use local model serving built on llama.cpp",
      features: ["Simple API", "Model library", "Docker support", "REST API"],
      language: "Go",
      link: "https://ollama.ai/"
    },
    {
      name: "vLLM",
      description: "Fast and easy-to-use library for LLM inference and serving",
      features: ["PagedAttention", "Continuous batching", "GPU acceleration", "OpenAI compatible"],
      language: "Python",
      link: "https://github.com/vllm-project/vllm"
    },
    {
      name: "Text Generation Inference",
      description: "Hugging Face's toolkit for deploying and serving LLMs",
      features: ["Production-ready", "Optimized kernels", "Streaming", "Multi-GPU"],
      language: "Python/Rust",
      link: "https://github.com/huggingface/text-generation-inference"
    }
  ];

  const getCurrentSection = () => {
    return sections.find(section => section.id === activeCategory);
  };

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'AI Inference Overview',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">What is AI Inference?</h4>
            <p className="text-gray-300 mb-4">
              AI inference is the process of using a trained machine learning model to make predictions or generate outputs from new input data. 
              Unlike training, which requires massive computational resources, inference can be optimized for speed, efficiency, and deployment 
              in various environments.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Edge & Device Inference</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <h5 className="font-semibold text-white">Privacy</h5>
                </div>
                <p className="text-gray-300 text-sm">Data never leaves the device, ensuring complete privacy and compliance</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h5 className="font-semibold text-white">Cost Savings</h5>
                </div>
                <p className="text-gray-300 text-sm">No server costs - inference runs on user's hardware</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h5 className="font-semibold text-white">Low Latency</h5>
                </div>
                <p className="text-gray-300 text-sm">Eliminate network round trips for faster response times</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  <h5 className="font-semibold text-white">Offline Capable</h5>
                </div>
                <p className="text-gray-300 text-sm">Works without internet connection after initial model download</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Key Technologies</h4>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <h5 className="font-semibold text-white mb-1">WebGPU</h5>
                <p className="text-gray-300 text-sm">High-performance GPU acceleration directly in web browsers</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <h5 className="font-semibold text-white mb-1">WebAssembly (WASM)</h5>
                <p className="text-gray-300 text-sm">Near-native performance for CPU computation in browsers</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <h5 className="font-semibold text-white mb-1">Model Quantization</h5>
                <p className="text-gray-300 text-sm">Reduce model size and memory usage while maintaining accuracy</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <h5 className="font-semibold text-white mb-1">ONNX Runtime</h5>
                <p className="text-gray-300 text-sm">Cross-platform inference with hardware-specific optimizations</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'agentic-inference',
      title: 'Agentic AI Inference Patterns',
      icon: Layers,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">The Agentic Inference Challenge</h4>
            <p className="text-gray-300 mb-4">
              Agentic AI systems exhibit fundamentally different inference patterns compared to traditional AI applications. 
              They require multi-stage reasoning, tool orchestration, and dynamic resource allocation that can increase costs by 5-25x over simple query-response systems.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Unique Inference Patterns</h4>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <h5 className="font-semibold text-white">Multi-Stage Reasoning Cycles</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Plan → Reflect → Act loops that require multiple inference calls</p>
                <div className="bg-gray-900 p-3 rounded text-sm text-gray-400">
                  Traditional: 1 query = 1 inference call<br/>
                  Agentic: 1 query = 5-15 inference calls
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-semibold text-white">Tool Invocation Cascades</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Each tool call triggers new inference cycles for result interpretation</p>
                <div className="bg-gray-900 p-3 rounded text-sm text-gray-400">
                  Average agent workflow: 3-7 tool calls per session
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-yellow-400" />
                  <h5 className="font-semibold text-white">Context Accumulation</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Growing memory requirements across interaction chains</p>
                <div className="bg-gray-900 p-3 rounded text-sm text-gray-400">
                  Memory grows: 2K → 50K+ tokens in complex reasoning sessions
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h5 className="font-semibold text-white">Decision Tree Exploration</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Multiple reasoning paths evaluated in parallel</p>
                <div className="bg-gray-900 p-3 rounded text-sm text-gray-400">
                  Advanced agents: 2-5 parallel reasoning branches
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Cost Impact Analysis</h4>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Traditional Systems
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Simple RAG Query:</span>
                      <span className="text-green-400">$0.01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Basic Chatbot:</span>
                      <span className="text-green-400">$0.005</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-red-400" />
                    Agentic Systems
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Simple Agent Task:</span>
                      <span className="text-red-400">$0.05</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Complex Reasoning:</span>
                      <span className="text-red-400">$0.25</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-300">Cost Multiplier:</span>
                      <span className="text-red-400">5-25x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Optimization Strategies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Dynamic Resource Allocation</h5>
                <p className="text-gray-300 text-sm">Route simple tasks to edge, complex reasoning to cloud</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Context Compression</h5>
                <p className="text-gray-300 text-sm">Intelligent memory management to reduce token overhead</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Speculative Execution</h5>
                <p className="text-gray-300 text-sm">Pre-compute likely next steps while current ones execute</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Budget-Aware Reasoning</h5>
                <p className="text-gray-300 text-sm">Dynamic quality-cost trade-offs based on inference budgets</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'optimization',
      title: 'Advanced Inference Optimization',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Cutting-Edge Optimization Techniques</h4>
            <p className="text-gray-300 mb-6">
              The latest advances in inference optimization are delivering dramatic performance improvements, 
              with some techniques achieving 2.5x speedup while reducing memory usage by 30% or more.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="text-xl font-semibold text-white mb-2">Speculative Decoding Evolution</h5>
                  <p className="text-gray-300 mb-3">Advanced techniques for predicting and pre-computing likely token sequences</p>
                </div>
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Dynamic Speculation Lookahead (DISCO)</h6>
                  <p className="text-gray-300 text-sm mb-2">Dynamically adjusts speculation length based on context complexity</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-green-400">
                    Performance: 10% speedup over static approaches
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">QuantSpec Self-Speculative Decoding</h6>
                  <p className="text-gray-300 text-sm mb-2">Uses hierarchical quantized KV cache for efficient speculation</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-green-400">
                    Performance: 2.5x speedup + 1.3x memory reduction
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Test-Time Compute Scaling</h6>
                  <p className="text-gray-300 text-sm mb-2">Allocates more compute during inference for better reasoning</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-green-400">
                    Quality: 89th percentile on coding competitions
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="text-xl font-semibold text-white mb-2">Memory Architecture Advances</h5>
                  <p className="text-gray-300 mb-3">Next-generation memory systems for large-scale inference</p>
                </div>
                <Monitor className="w-6 h-6 text-blue-400" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Big Memory Architectures</h6>
                  <p className="text-gray-300 text-sm mb-2">Essential for context-aware AI agents with long interaction histories</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-blue-400">
                    Example: Ironwood TPU with 192GB HBM (6x increase)
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Hierarchical KV Caching</h6>
                  <p className="text-gray-300 text-sm mb-2">Multi-tier caching strategies for different attention patterns</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-blue-400">
                    Benefit: 30% memory reduction with maintained performance
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Memory-Optimized Architectures</h6>
                  <p className="text-gray-300 text-sm mb-2">Purpose-built designs for inference workloads</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-blue-400">
                    Impact: Enables complex planning and execution for agents
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="text-xl font-semibold text-white mb-2">Mixture of Experts (MoE) Advances</h5>
                  <p className="text-gray-300 mb-3">Smart routing and expert selection for specialized inference</p>
                </div>
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Symbolic MoE</h6>
                  <p className="text-gray-300 text-sm mb-2">Skill-based routing for heterogeneous reasoning tasks</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-purple-400">
                    Approach: 16 expert models on 1 GPU with grouped batching
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Patched MoA</h6>
                  <p className="text-gray-300 text-sm mb-2">Optimized mixture of agents for software development tasks</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-purple-400">
                    Result: GPT-4o-mini outperforms GPT-4-turbo at 1/5th cost
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h6 className="font-semibold text-white mb-2">Adaptive Expert Selection</h6>
                  <p className="text-gray-300 text-sm mb-2">Dynamic instance-level mixing of pre-trained experts</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-purple-400">
                    Performance: 8.15% improvement over multi-agent baselines
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Implementation Priority Matrix</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-green-400 mb-3">Quick Wins (Easy Implementation)</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• KV caching optimization</li>
                  <li>• Basic speculative decoding</li>
                  <li>• Memory-efficient batching</li>
                  <li>• Context compression</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400 mb-3">Advanced Techniques (Complex Implementation)</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Dynamic speculation lookahead</li>
                  <li>• Hierarchical quantized systems</li>
                  <li>• Multi-expert routing</li>
                  <li>• Test-time compute scaling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'missing-gaps',
      title: 'Critical Missing Elements',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">The Innovation Opportunity</h4>
            <p className="text-gray-300 mb-6">
              Despite rapid advances in AI inference, critical gaps remain that represent major opportunities for 
              builders of agentic AI systems. Addressing these gaps could unlock 10-25x cost reductions and enable 
              entirely new categories of AI applications.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-6 border border-red-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-400" />
                <h5 className="text-xl font-semibold text-white">1. Adaptive Inference Orchestration</h5>
              </div>
              <p className="text-gray-300 mb-4">
                No standardized systems exist that can dynamically route queries based on complexity, 
                predict costs before execution, and optimize latency vs accuracy trade-offs in real-time.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h6 className="font-semibold text-white mb-2">Missing Capabilities:</h6>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Intelligent edge-cloud routing for agentic workloads</li>
                  <li>• Cost prediction before inference execution</li>
                  <li>• Dynamic quality-cost optimization</li>
                  <li>• Context-aware resource allocation</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-orange-400">
                💡 Opportunity: Build the "traffic control system" for AI inference
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-lg p-6 border border-blue-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-blue-400" />
                <h5 className="text-xl font-semibold text-white">2. Inference-Native Agentic Architectures</h5>
              </div>
              <p className="text-gray-300 mb-4">
                Current agentic frameworks are built on training-optimized models, creating fundamental inefficiencies 
                in multi-stage reasoning, tool orchestration, and context management.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h6 className="font-semibold text-white mb-2">Architectural Gaps:</h6>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Purpose-built inference pipelines for Plan → Reflect → Act cycles</li>
                  <li>• Optimized memory architectures for agent lifecycles</li>
                  <li>• Native tool orchestration without inference overhead</li>
                  <li>• Context-aware caching for multi-turn interactions</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-blue-400">
                💡 Opportunity: Design chips and frameworks optimized for agentic reasoning
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg p-6 border border-green-800/30">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-400" />
                <h5 className="text-xl font-semibold text-white">3. Cost-Aware Resource Management</h5>
              </div>
              <p className="text-gray-300 mb-4">
                With agentic systems costing 5-25x more than traditional AI, there's no standardized approach 
                for budget management, multi-tenant fairness, or dynamic quality-cost optimization.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h6 className="font-semibold text-white mb-2">Missing Systems:</h6>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Inference budget management for agentic sessions</li>
                  <li>• Multi-tenant resource allocation with fairness guarantees</li>
                  <li>• Real-time cost optimization algorithms</li>
                  <li>• Quality degradation strategies under budget constraints</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-green-400">
                💡 Opportunity: Create the "financial management system" for AI inference
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-purple-400" />
                <h5 className="text-xl font-semibold text-white">4. Privacy-Preserving Agentic Inference</h5>
              </div>
              <p className="text-gray-300 mb-4">
                Current solutions lack the capability for selective data processing, federated agentic reasoning, 
                and secure multi-party computation for agent interactions.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h6 className="font-semibold text-white mb-2">Privacy Gaps:</h6>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Selective processing (sensitive data stays local)</li>
                  <li>• Federated reasoning across distributed agents</li>
                  <li>• Homomorphic computation for private agent coordination</li>
                  <li>• Zero-knowledge proofs for agent verification</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-purple-400">
                💡 Opportunity: Enable private AI agents for regulated industries
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 rounded-lg p-6 border border-yellow-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="w-6 h-6 text-yellow-400" />
                <h5 className="text-xl font-semibold text-white">5. Real-Time Streaming Inference</h5>
              </div>
              <p className="text-gray-300 mb-4">
                Most agentic systems use batch processing, missing opportunities for continuous reasoning over 
                data streams with incremental results and context preservation.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h6 className="font-semibold text-white mb-2">Streaming Needs:</h6>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Continuous data stream processing for agents</li>
                  <li>• Context maintenance across streaming windows</li>
                  <li>• Incremental reasoning and result generation</li>
                  <li>• Dynamic adaptation to stream characteristics</li>
                </ul>
              </div>
              <div className="mt-4 text-sm text-yellow-400">
                💡 Opportunity: Build "live reasoning" systems for real-time applications
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Additional Critical Gaps</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  Inference Observability
                </h5>
                <p className="text-gray-300 text-sm">Limited visibility into agent decision-making, performance bottlenecks, and cost attribution across reasoning chains.</p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  Cross-Modal Efficiency
                </h5>
                <p className="text-gray-300 text-sm">No optimized architectures for seamless switching between text, vision, and audio with context preservation.</p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  Fault Tolerance
                </h5>
                <p className="text-gray-300 text-sm">Systems lack graceful degradation, reasoning continuity across interruptions, and quality guarantees.</p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gray-400" />
                  Hardware-Software Co-design
                </h5>
                <p className="text-gray-300 text-sm">Missing specialized hardware architectures optimized for agentic reasoning patterns and multi-agent coordination.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'web-inference',
      title: 'Web Browser Inference',
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Browser-Based AI Inference</h4>
            <p className="text-gray-300 mb-6">
              Run powerful AI models directly in web browsers using WebGPU and WebAssembly. This approach enables 
              privacy-preserving, cost-effective AI applications that work offline after initial model loading.
            </p>
          </div>

          <div className="grid gap-6">
            {webInferenceTools.map((tool, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">{tool.name}</h5>
                    <p className="text-gray-300 mb-3">{tool.description}</p>
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-3">
                  <code className="text-sm text-green-400">npm install {tool.package}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Browser Support</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-white mb-2">WebGPU Support</h5>
                <ul className="space-y-1 text-sm">
                  <li className="text-green-400">✓ Chrome 113+</li>
                  <li className="text-green-400">✓ Edge 113+</li>
                  <li className="text-yellow-400">⚠ Firefox (experimental)</li>
                  <li className="text-yellow-400">⚠ Safari (experimental)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">WebAssembly Support</h5>
                <ul className="space-y-1 text-sm">
                  <li className="text-green-400">✓ All modern browsers</li>
                  <li className="text-green-400">✓ SIMD support in latest versions</li>
                  <li className="text-green-400">✓ Multi-threading with Workers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'edge-device',
      title: 'Edge & Mobile Inference',
      icon: Smartphone,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Edge & Mobile Deployment</h4>
            <p className="text-gray-300 mb-6">
              Deploy AI models on mobile devices, IoT systems, and edge computing platforms. These solutions are optimized 
              for resource-constrained environments while maintaining good performance.
            </p>
          </div>

          <div className="grid gap-6">
            {edgeDeviceTools.map((tool, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">{tool.name}</h5>
                    <p className="text-gray-300 mb-3">{tool.description}</p>
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-3">
                  <span className="text-sm text-yellow-400">Platform: {tool.platform}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Performance Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-semibold text-white mb-2">Memory Usage</h5>
                <p className="text-gray-300 text-sm">Quantized models can reduce memory usage by 50-75% with minimal accuracy loss</p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Battery Life</h5>
                <p className="text-gray-300 text-sm">Edge inference reduces network usage, extending battery life significantly</p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Hardware Acceleration</h5>
                <p className="text-gray-300 text-sm">Utilize NPUs, GPUs, and specialized chips for optimal performance</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vlm-inference',
      title: 'Vision Language Models',
      icon: Eye,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">VLM Edge Inference</h4>
            <p className="text-gray-300 mb-6">
              Specialized solutions for running Vision Language Models on edge devices, optimized for real-time 
              applications like autonomous driving, robotics, and mobile vision tasks.
            </p>
          </div>

          <div className="grid gap-6">
            {vlmInferenceTools.map((tool, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">{tool.name}</h5>
                    <p className="text-gray-300 mb-3">{tool.description}</p>
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-3">
                  <span className="text-sm text-purple-400">Use Case: {tool.use_case}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">VLM Optimization Techniques</h4>
            <div className="space-y-3">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Patch Selection</h5>
                <p className="text-gray-300 text-sm">Filter irrelevant camera views to reduce computational overhead</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Token Selection</h5>
                <p className="text-gray-300 text-sm">Reduce input sequence length for the language model component</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Speculative Decoding</h5>
                <p className="text-gray-300 text-sm">Accelerate token generation with predictive techniques</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">FP8 Quantization</h5>
                <p className="text-gray-300 text-sm">Further reduce model size and increase inference speed</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'providers',
      title: 'Inference Providers',
      icon: Cloud,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">AI Inference Service Providers</h4>
            <p className="text-gray-300 mb-6">
              Compare leading AI inference providers for cost, performance, and features. Choose the right provider 
              based on your specific needs for latency, cost, and model availability.
            </p>
          </div>

          {/* On Device Providers */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="w-6 h-6 text-green-400" />
              <h4 className="text-2xl font-semibold text-white">Local / On-Device Providers</h4>
            </div>
            <p className="text-gray-300 mb-6">
              Run AI models locally on your hardware for maximum privacy, zero ongoing costs, and complete data control. 
              Perfect for sensitive applications and offline environments.
            </p>
            <div className="grid gap-6">
              {onDeviceProviders.map((provider, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="text-xl font-semibold text-white mb-2">{provider.name}</h5>
                      <p className="text-gray-300 mb-3">{provider.description}</p>
                    </div>
                    <a
                      href={provider.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {provider.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded p-3">
                    <span className="text-sm text-green-400">Pricing: {provider.pricing}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Providers */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Cloud className="w-6 h-6 text-blue-400" />
              <h4 className="text-2xl font-semibold text-white">Cloud Inference Providers</h4>
            </div>
            <p className="text-gray-300 mb-6">
              Managed AI inference services with scalable infrastructure, enterprise features, and API access. 
              Pay-per-use pricing with global availability and automatic scaling.
            </p>
            <div className="grid gap-6">
              {cloudProviders.map((provider, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="text-xl font-semibold text-white mb-2">{provider.name}</h5>
                      <p className="text-gray-300 mb-3">{provider.description}</p>
                    </div>
                    <a
                      href={provider.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {provider.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded p-3">
                    <span className="text-sm text-blue-400">Pricing: {provider.pricing}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Deployment Comparison</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* On Device Comparison */}
              <div>
                <h5 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  On Device Benefits
                </h5>
                <div className="space-y-3">
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-white">Privacy</span>
                    </div>
                    <p className="text-sm text-gray-300">100% private - data never leaves your device</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-white">Cost</span>
                    </div>
                    <p className="text-sm text-gray-300">Free after initial setup (your hardware)</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Monitor className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-white">Offline</span>
                    </div>
                    <p className="text-sm text-gray-300">Works without internet connection</p>
                  </div>
                </div>
              </div>

              {/* Cloud Comparison */}
              <div>
                <h5 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Cloud Benefits
                </h5>
                <div className="space-y-3">
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-white">Performance</span>
                    </div>
                    <p className="text-sm text-gray-300">Latest models with optimized inference</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-white">Scalability</span>
                    </div>
                    <p className="text-sm text-gray-300">Handle any load without hardware limits</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-white">Maintenance</span>
                    </div>
                    <p className="text-sm text-gray-300">No setup, updates, or hardware management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Provider Performance Table */}
            <div className="mt-6">
              <h5 className="font-semibold text-white mb-3">Cloud Provider Performance (DeepSeek R1)</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-white">Provider</th>
                      <th className="text-left py-2 text-white">Best For</th>
                      <th className="text-left py-2 text-white">TTFT</th>
                      <th className="text-left py-2 text-white">Tokens/sec</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Groq</td>
                      <td className="py-2">Ultra-low latency</td>
                      <td className="py-2">0.14s</td>
                      <td className="py-2">275/s</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Together AI</td>
                      <td className="py-2">Large-scale deployment</td>
                      <td className="py-2">0.47s</td>
                      <td className="py-2">134/s</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Fireworks</td>
                      <td className="py-2">Multi-modal tasks</td>
                      <td className="py-2">0.82s</td>
                      <td className="py-2">109/s</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">OpenAI GPT-4</td>
                      <td className="py-2">Best quality</td>
                      <td className="py-2">~1.5s</td>
                      <td className="py-2">~50/s</td>
                    </tr>
                    <tr>
                      <td className="py-2">Novita AI</td>
                      <td className="py-2">Cost efficiency</td>
                      <td className="py-2">0.76s</td>
                      <td className="py-2">34/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'libraries',
      title: 'Libraries & Frameworks',
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Inference Libraries & Frameworks</h4>
            <p className="text-gray-300 mb-6">
              Essential tools and libraries for implementing AI inference in your applications. From low-level 
              optimization libraries to high-level serving frameworks.
            </p>
          </div>

          <div className="grid gap-6">
            {libraries.map((library, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">{library.name}</h5>
                    <p className="text-gray-300 mb-3">{library.description}</p>
                  </div>
                  <a
                    href={library.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h6>
                  <div className="grid grid-cols-2 gap-2">
                    {library.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-3">
                  <span className="text-sm text-blue-400">Language: {library.language}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Choosing the Right Library</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-semibold text-green-400 mb-2">For Local Development</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Ollama - Easiest setup and use</li>
                  <li>• llama.cpp - Maximum control and optimization</li>
                  <li>• LM Studio - GUI for beginners</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400 mb-2">For Production Serving</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• vLLM - High throughput, GPU optimization</li>
                  <li>• TGI - Enterprise features, scalability</li>
                  <li>• Provider APIs - Managed solutions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-indigo-400 mb-2">For Web Applications</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• WebLLM - Browser-based inference</li>
                  <li>• BrowserAI - TypeScript support</li>
                  <li>• Transformers.js - Hugging Face models</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'examples',
      title: 'Code Examples',
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Getting Started Examples</h4>
            <p className="text-gray-300 mb-6">
              Practical code examples to help you get started with different inference approaches. Copy and modify 
              these examples for your own projects.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                WebLLM Browser Example
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`import { CreateMLCEngine } from "@mlc-ai/web-llm";

// Initialize the engine
const engine = await CreateMLCEngine(
  "Llama-3.2-1B-Instruct-q4f32_1-MLC",
  { 
    initProgressCallback: (progress) => {
      console.log('Loading:', progress.progress + '%');
    }
  }
);

// Generate text
const response = await engine.chat.completions.create({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello! How are you?" }
  ],
  temperature: 0.8,
  max_tokens: 100
});

console.log(response.choices[0].message.content);`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                BrowserAI Example
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`import { BrowserAI } from '@browserai/browserai';

const browserAI = new BrowserAI();

// Load model with progress tracking
await browserAI.loadModel('llama-3.2-1b-instruct', {
  quantization: 'q4f16_1',
  onProgress: (progress) => console.log('Loading:', progress.progress + '%')
});

// Generate text
const response = await browserAI.generateText('Hello, how are you?');
console.log(response.choices[0].message.content);

// Streaming example
const chunks = await browserAI.generateText('Write a story', {
  stream: true,
  temperature: 0.8
});

for await (const chunk of chunks) {
  console.log(chunk.choices[0]?.delta.content || '');
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-400" />
                Ollama Local Server
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`# Install and run Ollama
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve

# Pull and run a model
ollama pull llama3.2:1b
ollama run llama3.2:1b "Hello, world!"

# Use the REST API
fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2:1b',
    prompt: 'Hello!',
    stream: false
  })
}).then(r => r.json()).then(console.log);`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-green-400" />
                LM Studio Desktop App
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`// LM Studio provides a local server compatible with OpenAI API
const response = await fetch('http://localhost:1234/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer lm-studio'
  },
  body: JSON.stringify({
    model: 'llama-3.2-1b-instruct',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello!' }
    ],
    temperature: 0.7,
    max_tokens: 100
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-purple-400" />
                Provider API Example (Together AI)
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const response = await together.chat.completions.create({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain quantum computing in simple terms." }
  ],
  model: "meta-llama/Llama-3.2-3B-Instruct-Turbo",
  max_tokens: 500,
  temperature: 0.7,
  stream: true,
});

// Handle streaming response
for await (const chunk of response) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-400" />
                Vision Model Example
              </h5>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-gray-300">
{`import { CreateMLCEngine } from "@mlc-ai/web-llm";

// Load a vision-language model
const engine = await CreateMLCEngine("Llava-1.5-7B-q4f16_1-MLC");

// Process image and text
const response = await engine.chat.completions.create({
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What do you see in this image?" },
        {
          type: "image_url",
          image_url: { url: "data:image/jpeg;base64,..." }
        }
      ]
    }
  ]
});

console.log(response.choices[0].message.content);`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Best Practices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-white mb-2">Performance Optimization</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Use quantized models for faster inference</li>
                  <li>• Implement proper caching strategies</li>
                  <li>• Optimize batch sizes for throughput</li>
                  <li>• Monitor memory usage and cleanup</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">User Experience</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Show loading progress for model downloads</li>
                  <li>• Implement streaming for long responses</li>
                  <li>• Provide fallback options</li>
                  <li>• Handle errors gracefully</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-400" />
            AI Inference
          </h2>
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            {getCurrentSection() && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {React.createElement(getCurrentSection()!.icon, { className: "w-6 h-6 text-indigo-400" })}
                  <h2 className="text-2xl font-bold text-white">{getCurrentSection()!.title}</h2>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  {getCurrentSection()!.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 