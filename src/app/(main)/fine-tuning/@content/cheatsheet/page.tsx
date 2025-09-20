import { BookOpen, Settings, Database, Zap, Shield, TrendingUp, AlertCircle, CheckCircle, GraduationCap } from 'lucide-react';

export default function CheatsheetPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
        <h1 className="text-3xl font-bold text-blue-300 mb-4">Fine-Tuning Cheatsheet</h1>
        <p className="text-gray-300">
          Comprehensive quick reference for fine-tuning LLMs with state-of-the-art techniques,
          parameters, and best practices for 2025.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enhanced Data Requirements */}
        <div className="bg-blue-900/10 rounded-lg p-6 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-blue-300">Data Requirements</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Dataset Size Guidelines</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Minimum:</strong> 100-1000 examples</li>
                <li>• <strong>Optimal:</strong> 1000-10000 examples</li>
                <li>• <strong>Quality &gt; Quantity:</strong> 50 high-quality examples can outperform 1000s</li>
                <li>• <strong>NLFT breakthrough:</strong> 219% improvement with 50 examples</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Data Quality Checklist</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Diverse, representative samples</li>
                <li>• Consistent formatting</li>
                <li>• Proper deduplication</li>
                <li>• Domain-specific relevance</li>
                <li>• Error-free labeling</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Data Preprocessing</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Tokenization normalization</li>
                <li>• Quality filtering pipeline</li>
                <li>• Prompt structure consistency</li>
                <li>• Train/validation split (80/20)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Key Parameters */}
        <div className="bg-green-900/10 rounded-lg p-6 border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold text-green-300">Key Parameters</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-200 mb-2">Core Training Parameters</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Learning Rate:</strong> 1e-5 to 5e-4</li>
                <li>• <strong>Batch Size:</strong> 1-16 (memory dependent)</li>
                <li>• <strong>Epochs:</strong> 1-5 (avoid overfitting)</li>
                <li>• <strong>Warmup Steps:</strong> 10% of total steps</li>
                <li>• <strong>Weight Decay:</strong> 0.01-0.1</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-200 mb-2">LoRA Parameters</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>LoRA Rank (r):</strong> 8-64</li>
                <li>• <strong>LoRA Alpha:</strong> 16-32</li>
                <li>• <strong>LoRA Dropout:</strong> 0.1</li>
                <li>• <strong>Target Modules:</strong> q_proj, v_proj, k_proj, o_proj</li>
                <li>• <strong>Use RSLoRA:</strong> True (better stability)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-200 mb-2">QLoRA Quantization</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>4-bit NormalFloat (NF4):</strong> Optimal for normal weights</li>
                <li>• <strong>Double Quantization:</strong> True</li>
                <li>• <strong>Compute Type:</strong> bfloat16</li>
                <li>• <strong>Paged Optimizers:</strong> AdamW 8-bit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Memory Optimization */}
        <div className="bg-purple-900/10 rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-purple-300">Memory Optimization</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-200 mb-2">Memory Efficiency Techniques</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>Gradient Checkpointing:</strong> Enable</li>
                <li>• <strong>Mixed Precision (FP16):</strong> Enable</li>
                <li>• <strong>QLoRA 4-bit:</strong> Up to 75% memory reduction</li>
                <li>• <strong>Gradient Accumulation:</strong> 4-8 steps</li>
                <li>• <strong>DeepSpeed ZeRO:</strong> Stage 2 or 3</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-purple-200 mb-2">Hardware Requirements</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>7B Model (QLoRA):</strong> 12-16GB VRAM</li>
                <li>• <strong>13B Model (QLoRA):</strong> 24GB VRAM</li>
                <li>• <strong>70B Model (QLoRA):</strong> 48GB VRAM</li>
                <li>• <strong>Full Fine-tuning 7B:</strong> 60-80GB VRAM</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-purple-200 mb-2">Cost Optimization</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• LoRA: ~13$ vs $322 full fine-tuning</li>
                <li>• Train only 0.19-1.16% of parameters</li>
                <li>• Use model merging for combining capabilities</li>
                <li>• Spot instances for non-critical training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Best Practices */}
      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-green-300">Best Practices</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-3">Training Strategy</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Start with a strong base model (Llama 2/3, Mistral)</li>
              <li>• Use validation sets to monitor overfitting</li>
              <li>• Implement early stopping (patience: 2-3)</li>
              <li>• Save checkpoints regularly</li>
              <li>• Monitor loss curves and metrics continuously</li>
              <li>• Use learning rate scheduling (cosine annealing)</li>
              <li>• Preprocess data consistently</li>
              <li>• Test on held-out data</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Production Ready</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Version control datasets and models</li>
              <li>• Document hyperparameters and results</li>
              <li>• Use experiment tracking (MLflow, W&B)</li>
              <li>• Implement proper evaluation metrics</li>
              <li>• Test edge cases and failure modes</li>
              <li>• Set up monitoring for model drift</li>
              <li>• Plan rollback strategies</li>
              <li>• Secure sensitive training data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Common Pitfalls */}
      <div className="bg-red-900/10 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-bold text-red-300">Common Pitfalls</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-200 mb-3">Training Issues</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Using too high learning rates (causes instability)</li>
              <li>• Training for too many epochs (overfitting)</li>
              <li>• Insufficient or biased training data</li>
              <li>• Ignoring data preprocessing quality</li>
              <li>• Not monitoring for overfitting</li>
              <li>• Inconsistent evaluation metrics</li>
              <li>• Forgetting to set random seeds</li>
              <li>• Not testing edge cases</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-200 mb-3">Production Failures</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Catastrophic forgetting (losing base capabilities)</li>
              <li>• Model drift without monitoring</li>
              <li>• Security vulnerabilities (data poisoning)</li>
              <li>• Inadequate failure recovery plans</li>
              <li>• Poor documentation of changes</li>
              <li>• Missing evaluation on diverse test sets</li>
              <li>• Ignoring bias amplification</li>
              <li>• No performance degradation tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Framework Specific Commands */}
      <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-blue-300">Framework Quick Commands</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-200 mb-3">Hugging Face PEFT + LoRA</h3>
            <div className="bg-gray-800/50 rounded p-3">
              <pre className="text-xs text-gray-300 overflow-x-auto">
{`from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(base_model, lora_config)`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-green-200 mb-3">QLoRA with BitsAndBytes</h3>
            <div className="bg-gray-800/50 rounded p-3">
              <pre className="text-xs text-gray-300 overflow-x-auto">
{`from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16
)

model = AutoModelForCausalLM.from_pretrained(
    model_id, quantization_config=bnb_config
)`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-200 mb-3">Axolotl Configuration</h3>
            <div className="bg-gray-800/50 rounded p-3">
              <pre className="text-xs text-gray-300 overflow-x-auto">
{`# axolotl.yml
base_model: meta-llama/Llama-2-7b-hf
model_type: LlamaForCausalLM

adapter: lora
lora_r: 16
lora_alpha: 32
lora_dropout: 0.1

load_in_4bit: true
strict: false

datasets:
  - path: your_dataset.json
    type: alpaca`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-200 mb-3">Unsloth (2-5x Faster)</h3>
            <div className="bg-gray-800/50 rounded p-3">
              <pre className="text-xs text-gray-300 overflow-x-auto">
{`from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/llama-2-7b-bnb-4bit",
    max_seq_length=2048,
    dtype=None,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model, r=16, alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj"]
)`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Decision Tree */}
      <div className="bg-yellow-900/10 rounded-lg p-6 border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold text-yellow-300">Quick Decision Tree</h2>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/30">
              <h3 className="font-semibold text-green-400 mb-2">When to Fine-Tune</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Domain-specific knowledge needed</li>
                <li>• Consistent tone/style required</li>
                <li>• High-quality labeled data available</li>
                <li>• Complex reasoning improvements needed</li>
                <li>• Cost-effective vs API calls</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/30">
              <h3 className="font-semibold text-blue-400 mb-2">Consider Alternatives</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• RAG for knowledge integration</li>
                <li>• Prompt engineering for behavior</li>
                <li>• Few-shot learning for examples</li>
                <li>• Tool use for external capabilities</li>
                <li>• Ensemble methods for robustness</li>
              </ul>
            </div>

            <div className="bg-red-900/20 rounded-lg p-4 border border-red-600/30">
              <h3 className="font-semibold text-red-400 mb-2">Avoid Fine-Tuning If</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Data quality is poor</li>
                <li>• Dataset is too small (&lt;100 examples)</li>
                <li>• Base model already performs well</li>
                <li>• Requirements change frequently</li>
                <li>• Limited computational resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring & Evaluation */}
      <div className="bg-indigo-900/10 rounded-lg p-6 border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-indigo-300">Monitoring & Evaluation</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-indigo-200 mb-3">Key Metrics to Track</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Training Loss:</strong> Should decrease consistently</li>
              <li>• <strong>Validation Loss:</strong> Watch for overfitting gap</li>
              <li>• <strong>Perplexity:</strong> Lower is better for language tasks</li>
              <li>• <strong>BLEU/ROUGE:</strong> For generation quality</li>
              <li>• <strong>Accuracy:</strong> For classification tasks</li>
              <li>• <strong>F1 Score:</strong> For balanced evaluation</li>
              <li>• <strong>Inference Speed:</strong> Latency requirements</li>
              <li>• <strong>Memory Usage:</strong> Resource constraints</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-200 mb-3">Production Monitoring</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Model Drift:</strong> Performance degradation over time</li>
              <li>• <strong>Data Drift:</strong> Input distribution changes</li>
              <li>• <strong>Bias Detection:</strong> Fairness across groups</li>
              <li>• <strong>Error Analysis:</strong> Failure pattern tracking</li>
              <li>• <strong>Resource Usage:</strong> GPU/CPU/memory utilization</li>
              <li>• <strong>Response Quality:</strong> Human evaluation scores</li>
              <li>• <strong>User Feedback:</strong> Satisfaction metrics</li>
              <li>• <strong>Security Alerts:</strong> Adversarial inputs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Research Sources */}
      <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-600">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-300">Key Research Sources</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <p>• <strong>ArXiv 2408.13296:</strong> "The Ultimate Guide to Fine-Tuning LLMs"</p>
            <p>• <strong>ArXiv 2305.14314:</strong> "QLoRA: Efficient Finetuning of Quantized LLMs"</p>
            <p>• <strong>Hugging Face PEFT Documentation:</strong> Parameter-efficient methods</p>
            <p>• <strong>LoRA Paper:</strong> Low-Rank Adaptation of Large Language Models</p>
          </div>
          <div>
            <p>• <strong>DeepSpeed Documentation:</strong> Memory optimization techniques</p>
            <p>• <strong>MLflow Tutorials:</strong> Experiment tracking and model management</p>
            <p>• <strong>Axolotl Framework:</strong> Production fine-tuning workflows</p>
            <p>• <strong>Unsloth Research:</strong> 2-5x faster training optimizations</p>
          </div>
        </div>
      </div>
    </div>
  );
}