'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EdgeAiOptimizationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Optimize models and inference pipelines to run within edge device constraints (CPU/GPU/NPU, memory, battery, thermals) using
            compression (quantization, pruning, distillation), hardware-specific compilation, and system techniques (operator fusion,
            memory planning, scheduling). Targets include Android NNAPI, Apple Core ML/Metal, NVIDIA TensorRT (Jetson), Intel OpenVINO,
            ONNX Runtime Mobile, TensorFlow Lite, TVM, and specialized NPUs (Google Edge TPU, Arm Ethos‑U).
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Define device targets and budgets (p95 latency, energy per inference, RAM peak, binary size, accuracy floor).</li>
            <li>Choose an edge-suitable baseline (MobileNet/EfficientNet-Lite, MobileViT, tiny transformer/CRNN; quant-friendly layers).</li>
            <li>Compress the model:
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>Post-training quantization (INT8/FP16) with proper calibration; use QAT when PTQ drop is high.</li>
                <li>Structured pruning/sparsity to reduce MACs; leverage hardware sparsity where available.</li>
                <li>Knowledge distillation to transfer from a large teacher to a compact student.</li>
              </ul>
            </li>
            <li>Convert/compile for target: export to ONNX/TFLite/Core ML; compile with TensorRT/OpenVINO/TVM or NNAPI/Core ML backends.</li>
            <li>Integrate runtime: ExecuTorch/TFLite/ONNX Runtime Mobile/Core ML; enable accelerators/delegates and preferred precisions.</li>
            <li>Tune pipeline: fuse ops, minimize copies, pin buffers, batch where safe, and align pre/post-processing with training.</li>
            <li>On-device evaluation: measure p50/p95 latency, energy, RAM peak, accuracy deltas under thermal load.</li>
            <li>Deploy with OTA, feature flags, telemetry, and safe fallbacks (degrade quality or offload when needed).</li>
          </ol>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded-full"></div>
          Best Practices
        </h2>
        <div className="grid gap-3">
          {[
            'Start with PTQ INT8/FP16; adopt QAT selectively to recover accuracy for sensitive tasks.',
            'Validate operator/kernel support to avoid CPU fallbacks; align opset with accelerator capabilities.',
            'Benchmark on real devices; capture tail latency and thermal throttling over sustained runs.',
            'Minimize memory traffic: fused ops, in-place tensors, arena allocators, zero-copy pre/post-processing.',
            'Use execution providers/delegates (NNAPI, Core ML, TensorRT, OpenVINO) and enable FP16/INT8 kernels.',
            'Thermal-aware scheduling: cap concurrency, dynamically adjust resolution/frame-rate.',
            'Keep data transforms identical between training and inference; validate numerics across toolchains.',
            'Version compiled artifacts per device/OS; include rollback and A/B canaries for OTA updates.',
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
              <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* When NOT to Use */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full"></div>
          When NOT to Use
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Accuracy floors cannot be achieved post-compression within latency/power budgets.</li>
            <li>Frequent large model updates exceed feasible OTA bandwidth or device storage.</li>
            <li>Deterministic/precision-critical workloads unsupported by mobile accelerators.</li>
            <li>Hard real-time constraints beyond device capability without unacceptable thermal impact.</li>
          </ul>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Non-representative INT8 calibration → large accuracy loss in production.</li>
            <li>Silent CPU fallbacks due to unsupported ops → severe latency regressions.</li>
            <li>Layout/precision mismatches between stages → extra copies and fragmentation.</li>
            <li>Ignoring big.LITTLE scheduling and thread affinity → jitter under load.</li>
            <li>Short synthetic benchmarks masking thermal throttling and GC pauses.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid gap-3">
          {[
            'On-device, low-latency inference with offline capability',
            'INT8/FP16 quantization, pruning/sparsity, and knowledge distillation',
            'Accelerated execution via NNAPI/Core ML/Metal, TensorRT, OpenVINO, TVM',
            'Memory- and power-aware scheduling and buffer planning',
            'Adaptive quality: early-exit, conditional compute, resolution/frame-rate scaling',
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Latency p50/p95 and throughput (FPS/inferences/s).</li>
            <li>Energy per inference (mJ) and average power (mW); thermal headroom.</li>
            <li>Peak RAM and model binary size; storage footprint.</li>
            <li>Accuracy delta vs. FP32 baseline on representative datasets.</li>
            <li>Rate of accelerator coverage vs. CPU fallback; offline success rate.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
          <p>Prioritize compute, memory, and energy budgets. For non-LLM models, focus on MACs and bandwidth; for on-device LLMs,
            track context length, KV-cache footprint, precision (fp16/int8), and batch effects.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enable INT8/FP16 kernels and fused ops to reduce memory traffic.</li>
            <li>Use lightweight gating to avoid invoking heavy models unnecessarily.</li>
            <li>Adapt concurrency/frame-rate to maintain thermal and battery limits.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            'Smart cameras and video analytics (detection, tracking, analytics)',
            'On-device speech/keyword spotting and offline ASR/TTS',
            'Mobile AR and real-time segmentation/classification',
            'Industrial predictive maintenance and anomaly detection',
            'Wearables health monitoring with privacy preservation',
            'Retail edge analytics in bandwidth-constrained sites',
          ].map((uc) => (
            <div key={uc} className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg text-sm">
              <span className="text-base">✅</span>
              <span className="text-gray-300 font-medium">{uc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-orange-400">📚</span>
                Academic Papers
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://arxiv.org/abs/1511.06434" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Distillation (Hinton et al.)</a>
                <a href="https://arxiv.org/abs/1905.11946" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• MobileNetV3</a>
                <a href="https://arxiv.org/abs/1905.11932" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• EfficientNet</a>
                <a href="https://arxiv.org/abs/1905.00546" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• MnasNet</a>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-green-400">🛠️</span>
                Implementation Guides
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.tensorflow.org/lite/performance/post_training_quantization" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• TensorFlow Lite: Post-training quantization</a>
                <a href="https://www.tensorflow.org/model_optimization/guide/quantization/training" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• TensorFlow Model Optimization: QAT</a>
                <a href="https://pytorch.org/executorch/stable/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• PyTorch ExecuTorch</a>
                <a href="https://onnxruntime.ai/docs/tutorials/mobile/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• ONNX Runtime Mobile</a>
                <a href="https://onnxruntime.ai/docs/performance/quantization.html" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• ONNX Runtime Quantization</a>
                <a href="https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• NVIDIA TensorRT Guide</a>
                <a href="https://docs.openvino.ai/latest/index.html" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Intel OpenVINO Docs</a>
                <a href="https://coremltools.readme.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Core ML Tools</a>
                <a href="https://developer.android.com/ndk/guides/neuralnetworks" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Android NNAPI</a>
                <a href="https://developer.apple.com/documentation/metalperformanceshadersgraph" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Apple MPSGraph</a>
                <a href="https://tvm.apache.org/docs/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Apache TVM Docs</a>
                <a href="https://coral.ai/docs/edgetpu/models-intro/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Google Coral Edge TPU</a>
                <a href="https://developer.arm.com/Processors/ethos-u" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Arm Ethos‑U</a>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-purple-400">⚙️</span>
                Tools & Libraries
              </h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">TensorFlow Lite, PyTorch ExecuTorch, ONNX Runtime Mobile, Core ML, OpenVINO, TensorRT, TVM</div>
                <div className="text-gray-300">Android NNAPI, Apple Neural Engine/Core ML, NVIDIA Jetson, Google Edge TPU, Arm Ethos‑U, CMSIS‑NN</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">👥</span>
                Community & Discussions
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://discuss.tvm.apache.org/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• TVM Discuss</a>
                <a href="https://github.com/microsoft/onnxruntime/discussions" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• ONNX Runtime Discussions</a>
                <a href="https://forums.developer.nvidia.com/c/ai-data-science/tensorrt/136/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• NVIDIA TensorRT Forum</a>
                <a href="https://discuss.tensorflow.org/c/tflite/20" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• TensorFlow Lite Forum</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};