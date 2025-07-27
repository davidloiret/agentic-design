export default function CheatsheetPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-orange-300 mb-4">📋 Fine-Tuning Cheatsheet</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-3">📊 Data Requirements</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Minimum:</strong> 100-1000 examples</li>
              <li>• <strong>Optimal:</strong> 1000-10000 examples</li>
              <li>• <strong>Quality</strong> &gt; Quantity</li>
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
  );
}