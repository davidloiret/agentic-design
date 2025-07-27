export default function CloudPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">☁️ Cloud Fine-Tuning Options</h3>
        <p className="text-gray-300 mb-6">
          Compare pricing, features, and capabilities of major cloud providers for LLM fine-tuning.
        </p>
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
  );
}