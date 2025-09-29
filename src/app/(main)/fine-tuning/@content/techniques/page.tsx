import { Metadata } from 'next';
import { generateFineTuningMetadata } from '@/app/lib/metadata';
import { getFineTuningPageById } from '@/app/fine-tuning-pages';
import { Layers, Target, MemoryStick } from 'lucide-react';

const pageData = getFineTuningPageById('techniques')!;

export const metadata: Metadata = generateFineTuningMetadata(pageData);

export default function TechniquesPage() {
  return (
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
  );
}