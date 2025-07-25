"use client"

import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  Cloud, 
  Monitor, 
  Zap, 
  Server, 
  Cpu, 
  Brain, 
  FileText, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  MemoryStick,
  ChevronRight,
  ChevronDown,
  Star,
  Target,
  Settings,
  Layers,
  Database
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export const FineTuningTab = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedItems, setExpandedItems] = useState<string[]>(['overview']);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'Overview & Quick Start',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg p-6 border border-violet-500/20">
            <h3 className="text-2xl font-bold text-violet-300 mb-4">What is Fine-Tuning?</h3>
            <p className="text-gray-300 mb-4">
              Fine-tuning is the process of adapting a pre-trained language model to your specific task or domain. 
              Instead of training from scratch, you leverage existing knowledge and customize it for your needs.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">✅ Benefits</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Improved accuracy on specific tasks</li>
                  <li>• Domain-specific knowledge</li>
                  <li>• Consistent tone and style</li>
                  <li>• Reduced hallucinations</li>
                  <li>• Cost-effective vs training from scratch</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-2">⚠️ Considerations</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Requires quality training data</li>
                  <li>• GPU memory requirements</li>
                  <li>• Risk of catastrophic forgetting</li>
                  <li>• Overfitting on small datasets</li>
                  <li>• Time and computational costs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300 mb-4">🚀 Quick Start Checklist</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">1. Preparation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Define your use case</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Collect quality training data</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Choose base model</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Select fine-tuning method</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">2. Execution</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Set up environment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Configure training parameters</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Monitor training progress</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Evaluate and deploy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cheatsheet',
      title: 'Cheatsheet & Best Practices',
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-orange-300 mb-4">📋 Fine-Tuning Cheatsheet</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">📊 Data Requirements</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Minimum:</strong> 100-1000 examples</li>
                  <li>• <strong>Optimal:</strong> 1000-10000 examples</li>
                  <li>• <strong>Quality </strong> Quantity</li>
                  <li>• Diverse, representative samples</li>
                  <li>• Consistent formatting</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">⚙️ Key Parameters</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Learning Rate:</strong> 1e-5 to 5e-4</li>
                  <li>• <strong>Batch Size:</strong> 1-16 (memory dependent)</li>
                  <li>• <strong>Epochs:</strong> 1-5 (avoid overfitting)</li>
                  <li>• <strong>LoRA Rank:</strong> 8-64</li>
                  <li>• <strong>LoRA Alpha:</strong> 16-32</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-3">💾 Memory Tips</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use gradient checkpointing</li>
                  <li>• Enable mixed precision (FP16)</li>
                  <li>• Use QLoRA for 4-bit training</li>
                  <li>• Reduce sequence length</li>
                  <li>• Use gradient accumulation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-green-300 mb-4">✅ Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Start with a strong base model</li>
                <li>• Use validation sets to monitor overfitting</li>
                <li>• Implement early stopping</li>
                <li>• Save checkpoints regularly</li>
                <li>• Monitor loss curves and metrics</li>
                <li>• Use learning rate scheduling</li>
                <li>• Preprocess data consistently</li>
                <li>• Test on held-out data</li>
              </ul>
            </div>

            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-red-300 mb-4">❌ Common Pitfalls</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Using too high learning rates</li>
                <li>• Training for too many epochs</li>
                <li>• Insufficient or biased training data</li>
                <li>• Ignoring data preprocessing</li>
                <li>• Not monitoring for overfitting</li>
                <li>• Inconsistent evaluation metrics</li>
                <li>• Forgetting to set random seeds</li>
                <li>• Not testing edge cases</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'techniques',
      title: 'Fine-Tuning Techniques',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Full Fine-Tuning</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Update all model parameters. Best performance but requires most memory.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-red-400">Very High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance:</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-red-400">Slow</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">LoRA</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Low-Rank Adaptation. Train small adapter layers, freeze main model.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-green-400">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance:</span>
                  <span className="text-green-400">Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-green-400">Fast</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <MemoryStick className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">QLoRA</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Quantized LoRA. 4-bit quantization + LoRA adapters for maximum efficiency.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-green-400">Very Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance:</span>
                  <span className="text-green-400">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-green-400">Fast</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">🔬 Advanced Techniques (2025)</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-blue-300">DoRA (Weight-Decomposed LoRA)</h4>
                  <p className="text-sm text-gray-300">
                    Decomposes weights into magnitude and direction, then applies LoRA to both.
                    Achieves better performance than standard LoRA.
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-green-300">LoRA+ & AdaLoRA</h4>
                  <p className="text-sm text-gray-300">
                    LoRA+: Different learning rates for A and B matrices (2x faster).
                    AdaLoRA: Adaptive rank allocation based on layer importance.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-purple-300">RoSA (Robust Sparse Adaptation)</h4>
                  <p className="text-sm text-gray-300">
                    Combines low-rank and sparse updates. Better accuracy than LoRA 
                    with same parameter budget.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-orange-300">MoELoRA</h4>
                  <p className="text-sm text-gray-300">
                    Mixture of Experts LoRA with contrastive learning to encourage 
                    expert specialization.
                  </p>
                </div>

                <div className="border-l-4 border-cyan-400 pl-4">
                  <h4 className="font-semibold text-cyan-300">GRPO & DPO</h4>
                  <p className="text-sm text-gray-300">
                    Generalized Reward Process Optimization and Direct Preference Optimization 
                    for alignment without RL complexity.
                  </p>
                </div>

                <div className="border-l-4 border-pink-400 pl-4">
                  <h4 className="font-semibold text-pink-300">Quantization-Aware Training</h4>
                  <p className="text-sm text-gray-300">
                    Train models optimized for quantized inference. 
                    Better performance than post-training quantization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Tools',
      icon: Code,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Axolotl</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Flexible, community-driven framework with extensive model support and YAML configuration.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Easy YAML configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Multi-GPU support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Rapid model adoption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Sequence parallelism</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Unsloth</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Speed and memory efficiency champion. 2-5x faster training with 80% less VRAM.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Custom Triton kernels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Extreme memory efficiency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Easy Colab integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-orange-400" />
                  <span>Single GPU (OSS)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Torchtune</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Official PyTorch library. Native integration, extensible recipes, multi-node support.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Pure PyTorch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Hackable recipes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Multi-node training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>QAT support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">🔧 Other Popular Tools</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-2">Hugging Face TRL</h4>
                  <p className="text-sm text-gray-300">
                    Transformer Reinforcement Learning library with SFT, DPO, PPO support.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">LLaMA-Factory</h4>
                  <p className="text-sm text-gray-300">
                    Web UI for fine-tuning. Supports multiple models and training methods.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">DeepSpeed</h4>
                  <p className="text-sm text-gray-300">
                    Microsoft's distributed training optimization library with ZeRO stages.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-300 mb-2">PEFT Library</h4>
                  <p className="text-sm text-gray-300">
                    Parameter-Efficient Fine-Tuning methods from Hugging Face.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-300 mb-2">AutoTrain Advanced</h4>
                  <p className="text-sm text-gray-300">
                    No-code fine-tuning solution with automatic hyperparameter optimization.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-300 mb-2">MLX (Apple)</h4>
                  <p className="text-sm text-gray-300">
                    Fine-tuning framework optimized for Apple Silicon (M1/M2/M3).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cloud',
      title: 'Cloud Providers',
      icon: Cloud,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">☁️ Cloud Fine-Tuning Options</h3>
            <p className="text-gray-300 mb-6">
              Compare pricing, features, and capabilities of major cloud providers for LLM fine-tuning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-red-300">Vast.ai</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Cheapest marketplace option with consumer GPUs available.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">H100 SXM:</span>
                  <span className="text-green-400">$1.93/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">A100 PCIe:</span>
                  <span className="text-green-400">$0.64/hr</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Spot instances available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Consumer GPU access</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Together AI</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Complete platform for training, fine-tuning, and serving models.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">H100 SXM:</span>
                  <span className="text-green-400">$1.75/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">A100 PCIe:</span>
                  <span className="text-green-400">$1.30/hr</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>API access to models</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>LoRA & RLHF support</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">RunPod</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                User-friendly platform optimized for data scientists.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">H100 SXM:</span>
                  <span className="text-yellow-400">$2.79/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">A100 PCIe:</span>
                  <span className="text-green-400">$1.64/hr</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Easy deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Serverless options</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Hyperstack</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Reserved pricing for long-term projects with significant savings.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">H100 SXM:</span>
                  <span className="text-green-400">$1.95/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">A100 PCIe:</span>
                  <span className="text-green-400">$1.35/hr</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>75% cheaper reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>NVIDIA Inception discounts</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-cyan-300">Cudo Compute</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Decentralized cloud platform with privacy focus.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">H100 SXM:</span>
                  <span className="text-yellow-400">$2.45/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">A100 PCIe:</span>
                  <span className="text-green-400">$1.50/hr</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Volume discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>dstack integration</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-bold text-orange-300">Managed Services</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                No-code solutions from major cloud providers.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>OpenAI Fine-Tuning API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Google Vertex AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>AWS SageMaker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Azure Machine Learning</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">💡 Cost Optimization Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-300 mb-3">Money-Saving Strategies</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Use spot instances for interruptible workloads</li>
                  <li>• Choose QLoRA over full fine-tuning</li>
                  <li>• Use gradient accumulation to reduce batch size</li>
                  <li>• Monitor training and stop early if overfitting</li>
                  <li>• Use smaller models when possible</li>
                  <li>• Take advantage of reserved pricing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-3">Platform Selection</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Vast.ai: Cheapest for single GPU</li>
                  <li>• Together AI: Best for API workflows</li>
                  <li>• RunPod: Most user-friendly</li>
                  <li>• Hyperstack: Best for long-term projects</li>
                  <li>• Major clouds: Enterprise compliance</li>
                  <li>• Compare total cost including data transfer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'local',
      title: 'Local & Edge Setup',
      icon: Monitor,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
            <h3 className="text-2xl font-bold text-green-300 mb-4">🏠 Local Fine-Tuning Setup</h3>
            <p className="text-gray-300 mb-6">
              Fine-tune models on your own hardware - from consumer GPUs to enterprise setups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Consumer GPUs</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">RTX 4090 (24GB)</div>
                  <div className="text-gray-300">• 7B models with QLoRA</div>
                  <div className="text-gray-300">• Small 13B models possible</div>
                  <div className="text-gray-300">• Excellent price/performance</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">RTX 3090 (24GB)</div>
                  <div className="text-gray-300">• Similar to 4090 but slower</div>
                  <div className="text-gray-300">• Good budget option</div>
                  <div className="text-gray-300">• Widely available used</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-orange-400">RTX 4080 (16GB)</div>
                  <div className="text-gray-300">• Small models only</div>
                  <div className="text-gray-300">• 3B-7B with careful optimization</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Professional GPUs</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">A100 (40/80GB)</div>
                  <div className="text-gray-300">• 13B-70B models</div>
                  <div className="text-gray-300">• Multi-GPU scaling</div>
                  <div className="text-gray-300">• Enterprise reliability</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-cyan-400">H100 (80GB)</div>
                  <div className="text-gray-300">• Largest models supported</div>
                  <div className="text-gray-300">• Best performance/watt</div>
                  <div className="text-gray-300">• Premium pricing</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">L40S (48GB)</div>
                  <div className="text-gray-300">• Good middle ground</div>
                  <div className="text-gray-300">• Better than A40</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Apple Silicon</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">M3 Max (128GB)</div>
                  <div className="text-gray-300">• Unified memory advantage</div>
                  <div className="text-gray-300">• 13B models possible</div>
                  <div className="text-gray-300">• Use MLX framework</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">M2 Ultra (192GB)</div>
                  <div className="text-gray-300">• Largest unified memory</div>
                  <div className="text-gray-300">• 30B+ models possible</div>
                  <div className="text-gray-300">• Mac Studio/Pro only</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-purple-400">M1/M2 (16-24GB)</div>
                  <div className="text-gray-300">• Small models (3B-7B)</div>
                  <div className="text-gray-300">• Good for experimentation</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">🛠️ Local Setup Tools & Frameworks</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-300">NVIDIA Setup</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-green-400 mb-2">Unsloth</div>
                    <p className="text-sm text-gray-300">
                      Best for single GPU efficiency. 2-5x faster training, 80% less VRAM.
                      Perfect for consumer GPUs.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-blue-400 mb-2">Axolotl</div>
                    <p className="text-sm text-gray-300">
                      Multi-GPU support with DeepSpeed/FSDP. Great for professional setups.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">AutoTrain</div>
                    <p className="text-sm text-gray-300">
                      No-code solution with automatic optimization. Good for beginners.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-300">Apple Silicon Setup</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-green-400 mb-2">MLX</div>
                    <p className="text-sm text-gray-300">
                      Apple's framework optimized for M-series chips. Efficient unified memory usage.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-blue-400 mb-2">LLaMA.cpp</div>
                    <p className="text-sm text-gray-300">
                      CPU/Metal inference with quantization. Good for deployment after training.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-orange-400 mb-2">Transformers + MPS</div>
                    <p className="text-sm text-gray-300">
                      Hugging Face with Metal Performance Shaders backend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-orange-300 mb-4">⚡ Performance Optimization</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Memory Optimization</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use QLoRA (4-bit) over LoRA</li>
                  <li>• Enable gradient checkpointing</li>
                  <li>• Reduce sequence length</li>
                  <li>• Use micro-batching</li>
                  <li>• Offload optimizer to CPU</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Speed Optimization</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use Flash Attention 2</li>
                  <li>• Enable mixed precision (FP16)</li>
                  <li>• Use torch.compile (PyTorch 2.0+)</li>
                  <li>• Optimize data loading</li>
                  <li>• Use efficient optimizers</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-3">System Setup</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Fast NVMe SSD storage</li>
                  <li>• Adequate system RAM</li>
                  <li>• Good cooling/power supply</li>
                  <li>• Monitor GPU temperatures</li>
                  <li>• Use containers for consistency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'models',
      title: 'Model Selection Guide',
      icon: Brain,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎯 Choosing the Right Base Model</h3>
            <p className="text-gray-300 mb-6">
              Select the optimal foundation model for your fine-tuning project based on size, performance, and licensing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Small Models (1-7B)</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">Phi-4 (4.5B)</div>
                  <div className="text-gray-300">• Microsoft's latest SLM</div>
                  <div className="text-gray-300">• Excellent reasoning</div>
                  <div className="text-gray-300">• MIT License</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">Gemma 3 (4B)</div>
                  <div className="text-gray-300">• Google's optimized model</div>
                  <div className="text-gray-300">• Good instruction following</div>
                  <div className="text-gray-300">• Custom license</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-purple-400">Llama 3.3 (8B)</div>
                  <div className="text-gray-300">• Meta's latest compact model</div>
                  <div className="text-gray-300">• Strong multilingual</div>
                  <div className="text-gray-300">• Llama 3 License</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Medium Models (13-30B)</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">Mistral Small 3.1 (22B)</div>
                  <div className="text-gray-300">• Apache 2.0 License</div>
                  <div className="text-gray-300">• Excellent performance</div>
                  <div className="text-gray-300">• Function calling</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">Gemma 3 (27B)</div>
                  <div className="text-gray-300">• Largest Gemma model</div>
                  <div className="text-gray-300">• Strong reasoning</div>
                  <div className="text-gray-300">• Multi-modal support</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-orange-400">Qwen 2.5 (14B/32B)</div>
                  <div className="text-gray-300">• Alibaba's model</div>
                  <div className="text-gray-300">• Strong coding abilities</div>
                  <div className="text-gray-300">• Apache 2.0</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Large Models (70B+)</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-green-400">Llama 4 Maverick (17Bx128E)</div>
                  <div className="text-gray-300">• Meta's MoE model</div>
                  <div className="text-gray-300">• High performance</div>
                  <div className="text-gray-300">• Sparse activation</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-blue-400">Llama 3.3 (70B)</div>
                  <div className="text-gray-300">• Proven performance</div>
                  <div className="text-gray-300">• Wide community support</div>
                  <div className="text-gray-300">• Multi-modal version</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="font-semibold text-purple-400">DeepSeek R1 (70B)</div>
                  <div className="text-gray-300">• Reasoning-focused</div>
                  <div className="text-gray-300">• Competitive with O1</div>
                  <div className="text-gray-300">• Open source</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">🏆 Top Recommendations by Use Case</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">💬 Chat & Conversation</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Budget:</strong> Phi-4, Gemma 3 4B</li>
                    <li>• <strong>Balanced:</strong> Mistral Small 3.1</li>
                    <li>• <strong>Premium:</strong> Llama 3.3 70B</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">💻 Code Generation</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Small:</strong> Phi-4 (strong reasoning)</li>
                    <li>• <strong>Medium:</strong> Qwen 2.5 Coder</li>
                    <li>• <strong>Large:</strong> DeepSeek R1 Distill</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">📊 Analysis & Reasoning</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Compact:</strong> Phi-4</li>
                    <li>• <strong>Powerful:</strong> DeepSeek R1</li>
                    <li>• <strong>Balanced:</strong> Llama 3.3 70B</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-2">🏢 Enterprise Use</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Open:</strong> Mistral Small (Apache 2.0)</li>
                    <li>• <strong>Proven:</strong> Llama 3.3 series</li>
                    <li>• <strong>Efficient:</strong> Qwen 2.5</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">🌍 Multilingual</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Best:</strong> Llama 3.3 series</li>
                    <li>• <strong>Alternative:</strong> Qwen 2.5</li>
                    <li>• <strong>Small:</strong> Gemma 3</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-400 mb-2">🖼️ Multi-modal</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Vision:</strong> Llama 3.2 Vision</li>
                    <li>• <strong>Latest:</strong> Gemma 3 27B Vision</li>
                    <li>• <strong>Efficient:</strong> Phi-4 Vision (coming)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300 mb-4">📋 License Considerations</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3">✅ Commercial Friendly</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Apache 2.0:</strong> Mistral, Qwen</li>
                  <li>• <strong>MIT:</strong> Phi-4</li>
                  <li>• <strong>Custom:</strong> DeepSeek (permissive)</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">⚠️ Restricted</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Llama 3:</strong> Custom license</li>
                  <li>• <strong>Gemma:</strong> Custom terms</li>
                  <li>• Check usage restrictions</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">📖 Key Points</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Read full license terms</li>
                  <li>• Consider derivative works</li>
                  <li>• Enterprise compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-violet-300 mb-6">Fine-Tuning Guide</h2>
          
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const isExpanded = expandedItems.includes(section.id);
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      toggleExpanded(section.id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      isActive 
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium flex-1">{section.title}</span>
                    {isExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {currentSection && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <currentSection.icon className="w-8 h-8 text-violet-400" />
                <h1 className="text-3xl font-bold text-white">{currentSection.title}</h1>
              </div>
              
              {currentSection.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 