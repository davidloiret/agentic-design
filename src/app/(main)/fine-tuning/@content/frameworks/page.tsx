import { Metadata } from 'next';
import { generateFineTuningMetadata } from '@/app/lib/metadata';
import { getFineTuningPageById } from '@/app/fine-tuning-pages';
import { Star, Zap, Brain, CheckCircle, AlertTriangle } from 'lucide-react';

const pageData = getFineTuningPageById('frameworks')!;

export const metadata: Metadata = generateFineTuningMetadata(pageData);

export default function FrameworksPage() {
  return (
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
                Microsoft&apos;s distributed training optimization library with ZeRO stages.
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
  );
}