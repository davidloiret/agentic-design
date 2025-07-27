import { BookOpen, CheckCircle } from 'lucide-react';

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
    </div>
  );
}