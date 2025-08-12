'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EnergyEfficientInferenceDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Energy‑Efficient Inference minimizes joules per output while maintaining accuracy and latency by combining
            model compression (quantization, pruning, distillation), adaptive computation (early exit, dynamic depth,
            token and attention sparsity), optimized kernels (e.g., FlashAttention), and hardware‑aware serving
            (continuous/dynamic batching, KV‑cache policies, and power/thermal limits). The goal is to deliver required
            quality using the least energy per request or token on the target device or cluster.
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
            <li>Baseline and targets: measure latency, throughput, accuracy, and energy (J/request or J/token).</li>
            <li>Compress the model: apply PTQ/QAT (INT8/INT4, activation‑aware), pruning (structured), and distillation.</li>
            <li>Enable adaptive compute: early‑exit or dynamic depth; selective compute for hard spans; speculative decoding.</li>
            <li>Optimize kernels/memory: use efficient attention, KV‑cache paging/quantization, and operator fusion.</li>
            <li>Serving & batching: use continuous/dynamic batching within SLO; right‑size concurrency and placement.</li>
            <li>Hardware tuning: prefer low‑precision tensor cores/NPU; cap clocks/boost by SLO; manage thermal throttling.</li>
            <li>Monitor & iterate: track energy, tokens/s, accuracy drift; rollback if energy savings hurt SLOs/quality.</li>
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
            'Start with PTQ on weights and activations (INT8/INT4); use activation‑aware or smooth quantization to preserve accuracy.',
            'Combine structured pruning with distillation; validate on downstream tasks, not only pretraining metrics.',
            'Adopt efficient attention kernels (e.g., FlashAttention) and paged/quantized KV cache to cut memory traffic.',
            'Use early‑exit/dynamic depth and token/attention sparsity to reduce compute on easy inputs.',
            'Batch aggressively when latency budgets allow; otherwise use micro‑batches and streaming.',
            'Pin models to hardware that supports low‑precision acceleration; avoid precision up/down casts in hot paths.',
            'Continuously profile power (NVML/DCGM, RAPL) alongside p95 latency and accuracy to avoid regressions.'
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
            <li>Applications requiring strict numerical fidelity or determinism incompatible with low precision.</li>
            <li>Hard real‑time deadlines where batching/verification (e.g., speculative decoding) violates SLOs.</li>
            <li>Compliance‑critical domains where model changes (quantization/pruning) need lengthy re‑validation.</li>
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
            <li>Over‑quantization or uncalibrated activations causing large accuracy drops on downstream tasks.</li>
            <li>Unstructured pruning that yields sparse tensors unsupported by the target hardware kernels.</li>
            <li>Ignoring memory bandwidth/KV‑cache pressure; FLOP reductions alone may not save energy.</li>
            <li>Measuring only watts, not energy per useful output (J/request, J/token) and user‑perceived latency.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Low‑precision execution (INT8/INT4) with activation‑aware calibration',
            'Structured pruning and knowledge distillation to smaller students',
            'Efficient attention kernels and KV‑cache optimization',
            'Adaptive computation: early exit, dynamic depth, token/attention sparsity',
            'Continuous/dynamic batching and streaming for utilization',
            'Power/thermal‑aware scheduling and placement'
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
            <li>Energy: joules per request and per output token; average and p95 watts under load.</li>
            <li>Latency/TTFT/TPOT: p50/p95 latency and time‑to‑first‑token/time‑per‑output‑token.</li>
            <li>Throughput/utilization: tokens per second; GPU SM and memory utilization; batch effectiveness.</li>
            <li>Quality: task accuracy/human ratings vs. baseline; drift post‑compression.</li>
            <li>Stability: OOM/retry rate, thermal throttling incidence, autoscale convergence time.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Quantize weights/activations and optionally KV cache; track memory footprint per concurrent stream.</li>
            <li>Adopt efficient attention and cache paging to reduce DRAM traffic (often dominant energy component).</li>
            <li>Cap context length and use compression/summarization; prefer streaming to avoid long stalls.</li>
            <li>Tune batch size/concurrency to maximize tokens/s within SLO and thermal/power envelopes.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Edge/mobile inference with battery and thermal limits; intermittent connectivity.</li>
            <li>High‑volume serving where energy and cost per token dominate (contact center, summarization).</li>
            <li>On‑prem/colo deployments with fixed power caps; sustainability‑driven SLAs.</li>
          </ul>
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Academic Papers</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://arxiv.org/abs/2211.10438" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SmoothQuant: Accurate and Efficient Post‑Training Quantization for LLMs (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2306.00978" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWQ: Activation‑Aware Weight Quantization for LLMs (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2208.07339" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLM.int8(): 8‑bit Matrix Multiplication for Transformers (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2206.01861" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ZeroQuant: Efficient Low‑Bit Quantization for Large‑Scale Transformers (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2004.12903" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeeBERT: Dynamic Early Exiting for Efficient BERT Inference (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2302.01318" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Speculative Decoding (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2205.14135" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention: Fast and Memory‑Efficient Exact Attention (2022/2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html#int8-calibration" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA TensorRT: INT8 Calibration</a></li>
              <li><a href="https://onnxruntime.ai/docs/performance/quantization.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ONNX Runtime: Quantization</a></li>
              <li><a href="https://pytorch.org/docs/stable/quantization.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTorch: torch.ao.quantization</a></li>
              <li><a href="https://www.tensorflow.org/model_optimization/guide/quantization" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorFlow Model Optimization Toolkit: Quantization</a></li>
              <li><a href="https://docs.openvino.ai/latest/openvino_docs_OV_UG_Quantization_overview.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenVINO: Post‑Training Quantization</a></li>
              <li><a href="https://tvm.apache.org/docs/how_to/tune_with_autoscheduler/index.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache TVM: Auto‑scheduler Tuning</a></li>
              <li><a href="https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/dcgm-user-guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA DCGM: GPU Telemetry & Power</a></li>
              <li><a href="https://developer.nvidia.com/nvidia-management-library-nvml" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA NVML: Power Measurement API</a></li>
              <li><a href="https://www.kernel.org/doc/Documentation/power/intel_rapl.txt" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Intel RAPL: Power Measurement</a></li>
              <li><a href="https://mlcommons.org/en/inference-power/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MLPerf Inference: Power Measurement</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/NVIDIA/TensorRT" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorRT</a>, <a href="https://onnxruntime.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ONNX Runtime</a>, <a href="https://pytorch.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTorch</a>, <a href="https://www.tensorflow.org/lite" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorFlow Lite</a>, <a href="https://github.com/apple/coremltools" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Core ML Tools</a>, <a href="https://www.openvino.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenVINO</a>, <a href="https://tvm.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TVM</a></li>
              <li><a href="https://github.com/vllm-project/vllm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM</a> (continuous batching, paged attention)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/vllm-project/vllm/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Discussions</a>, <a href="https://mlcommons.org/en/groups/inference/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MLCommons Inference</a></li>
              <li><a href="https://github.com/withhaotian/awesome-efficient-LLM-inference-papers" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Awesome Efficient LLM Inference Papers</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};