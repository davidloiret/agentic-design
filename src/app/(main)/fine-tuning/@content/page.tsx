import { CheckCircle } from 'lucide-react';

export default function FineTuningPage() {
  return (
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

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-2xl font-bold text-red-300 mb-4">⚠️ Critical Gaps & Missing Elements</h3>
        <p className="text-gray-300 mb-4">
          Despite significant advances, current fine-tuning approaches suffer from fundamental limitations that remain largely unaddressed.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-700/30">
            <h4 className="font-semibold text-red-400 mb-2">🧠 Core Unsolved Problems</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Catastrophic Forgetting</strong> - LoRA fails to prevent</li>
              <li>• <strong>Black Box Transformation</strong> - No understanding of what happens</li>
              <li>• <strong>Evaluation Gaps</strong> - Missing comprehensive metrics</li>
              <li>• <strong>Cross-Task Blindness</strong> - Can't measure interference</li>
            </ul>
          </div>

          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700/30">
            <h4 className="font-semibold text-orange-400 mb-2">🏗️ Missing Architecture</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>True Continual Learning</strong> - Current approaches destructive</li>
              <li>• <strong>Modular Memory Systems</strong> - No compartmentalization</li>
              <li>• <strong>Dynamic Architecture</strong> - Static weight updates only</li>
              <li>• <strong>Context Window Crisis</strong> - Infinite context illusion</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
            <h4 className="font-semibold text-yellow-400 mb-2">🔧 Production Gaps</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Data Efficiency Paradox</strong> - 50 vs 1000s examples</li>
              <li>• <strong>Security Vulnerabilities</strong> - Adversarial fine-tuning</li>
              <li>• <strong>Model Drift Monitoring</strong> - No real-time tracking</li>
              <li>• <strong>Rollback Strategies</strong> - Missing failure recovery</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-white mb-2">🚨 The Fundamental Issue</h4>
          <p className="text-gray-300 text-sm">
            <strong>"Fine-tuning remains more ART than SCIENCE"</strong> - We lack theoretical foundations,
            practical frameworks, and measurement tools needed to make it predictable and reliable at scale.
          </p>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
            <h4 className="font-semibold text-green-400 mb-2">🧮 Urgently Needed</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Mathematical frameworks for capability preservation</li>
              <li>• Declarative fine-tuning interfaces</li>
              <li>• Real-time capability monitoring</li>
              <li>• Interpretability tools for parameter changes</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
            <h4 className="font-semibold text-blue-400 mb-2">🔬 Research Priorities</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Modular memory architectures</li>
              <li>• Cross-modal transfer understanding</li>
              <li>• Meta-learning integration</li>
              <li>• Compositional fine-tuning systems</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
            <h4 className="font-semibold text-purple-400 mb-2">⚖️ Ethical Considerations</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Democratic decision-making frameworks</li>
              <li>• Cultural bias amplification prevention</li>
              <li>• Resource inequality mitigation</li>
              <li>• Alignment degradation safeguards</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-900/30 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-gray-300 mb-2">📚 Key Research Sources</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• <strong>ArXiv 2408.13296:</strong> "The Ultimate Guide to Fine-Tuning LLMs" - Comprehensive review of technologies and challenges</p>
            <p>• <strong>Stanford 2025:</strong> Test-Time Scaling research showing smaller models can outperform large-scale models</p>
            <p>• <strong>ArXiv 2501.13669:</strong> "How to Alleviate Catastrophic Forgetting in LLMs Finetuning"</p>
            <p>• <strong>Multiple 2024-2025 studies:</strong> LoRA limitations, NLFT breakthrough results, production deployment challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
}