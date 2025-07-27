export default function LocalPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-2xl font-bold text-green-300 mb-4">🏠 Local Fine-Tuning Setup</h3>
        <p className="text-gray-300 mb-6">
          Fine-tune models on your own hardware - from consumer GPUs to enterprise setups.
        </p>
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
  );
}