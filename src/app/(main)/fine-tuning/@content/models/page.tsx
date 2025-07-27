export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">🎯 Choosing the Right Base Model</h3>
        <p className="text-gray-300 mb-6">
          Select the optimal foundation model for your fine-tuning project based on size, performance, and licensing.
        </p>
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
    </div>
  );
}