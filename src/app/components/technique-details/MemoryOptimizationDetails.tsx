'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MemoryOptimizationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Memory Optimization for LLMs reduces peak and steady-state memory by combining quantization (weights/KV cache),
            efficient attention (paged KV cache), activation/gradient checkpointing, sharding/offloading, and context
            compression. The goal is to fit larger models and longer sequences on limited hardware while maintaining
            throughput, latency, and accuracy targets.
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
            <li>Profile memory: weights, optimizer states, activations, and KV cache growth vs. sequence length and batch size.</li>
            <li>Right-size precision: apply weight quantization (e.g., 8-bit/4-bit) and mixed precision for compute.</li>
            <li>Optimize attention memory: enable paged KV cache and sliding windows; cap max generation/context.</li>
            <li>Shard and offload: use ZeRO/FSDP, tensor/pipeline parallelism; offload weights/optimizer/KV to CPU/NVMe when needed.</li>
            <li>Reduce activation pressure: gradient checkpointing, recomputation, micro-batching.</li>
            <li>Compress context: deduplicate, rerank, summarize; prefer retrieval of spans over full documents.</li>
            <li>Validate accuracy and latency; tune batch size, draft length (if speculative), and cache policies.</li>
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
            'Use paged KV cache for near-zero waste memory and stable throughput at long sequence lengths.',
            'Prefer 4-bit/8-bit quantization for weights; test AWQ/GPTQ for inference; QLoRA for fine-tuning.',
            'Quantize KV cache where supported (TensorRT-LLM, vLLM options) when quality impact is acceptable.',
            'Enable gradient checkpointing and activation recomputation for training/fine-tuning.',
            'Adopt FSDP/ZeRO to shard weights, gradients, and optimizer state; overlap comms with compute.',
            'Bound sequence lengths; apply sliding windows and summaries for context growth control.',
            'Instrument GPU memory, fragmentation, and cache hit rates; alert on OOM and page thrash.',
            'Store large blobs outside messages; pass references; stream outputs for tight latency budgets.'
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
            <li>Ultra-high-accuracy scenarios where aggressive quantization harms quality beyond acceptable thresholds.</li>
            <li>Hard real-time systems where recomputation/offloading introduces unacceptable latency jitter.</li>
            <li>Simple/small models already fitting with ample headroom, where added complexity yields little benefit.</li>
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
            <li>Ignoring KV cache growth with long generations → OOM despite small batch sizes.</li>
            <li>Applying quantization without calibration/evaluation → silent accuracy regression.</li>
            <li>Over-aggressive offloading causing PCIe/NVMe bottlenecks and latency spikes.</li>
            <li>Fragmentation from frequent alloc/free of variable-length KV blocks without paging.</li>
            <li>Under-instrumented systems: no visibility into per-request memory budgets or cache hit/miss.</li>
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
            'Paged KV cache with block-level reuse and eviction',
            'Weight and KV quantization (8-bit / 4-bit options)',
            'Activation/gradient checkpointing and recomputation',
            'Model sharding: tensor, pipeline, and ZeRO/FSDP',
            'Context compression and sliding-window attention',
            'CPU/NVMe offload with prefetch and overlap'
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
            <li>Peak and average GPU memory usage; fragmentation and headroom.</li>
            <li>Tokens per second at target context lengths; p50/p95 TTFT and latency.</li>
            <li>OOM/restart rate; cache hit rate; paging/eviction rate.</li>
            <li>Quality delta vs. FP16/BF16 baselines after quantization/compression.</li>
            <li>Cost efficiency: tokens per dollar; energy per token.</li>
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
            <li>Budget max input and output tokens; enforce sliding windows and truncation policies.</li>
            <li>Track KV cache bytes/token; prefer paged allocations to avoid large contiguous blocks.</li>
            <li>Use continuous batching and context packing to raise utilization with bounded memory.</li>
            <li>Favor streaming responses to reduce peak memory and improve perceived latency.</li>
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
            <li>LLM serving with long contexts and high concurrency on limited-GPU fleets.</li>
            <li>On-prem/edge deployments with strict VRAM limits requiring quantization and paging.</li>
            <li>Fine-tuning/LoRA on consumer GPUs using QLoRA, checkpointing, and micro-batching.</li>
            <li>Multi-tenant platforms balancing cost, quality, and latency via memory-aware scheduling.</li>
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
              <li><a href="https://arxiv.org/abs/2309.06180" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: Efficient Memory Management for LLM Serving with PagedAttention (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2305.14314" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">QLoRA: Efficient Finetuning of Quantized LLMs (2023)</a></li>
              <li><a href="https://arxiv.org/abs/1910.02054" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ZeRO: Memory Optimizations Toward Training Trillion-Parameter Models (2019)</a></li>
              <li><a href="https://arxiv.org/abs/2307.08691" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention-2: Faster Attention with Better Memory Utilization (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Documentation: PagedAttention and KV Cache</a></li>
              <li><a href="https://pytorch.org/docs/stable/fsdp.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTorch FSDP: Fully Sharded Data Parallel</a></li>
              <li><a href="https://www.deepspeed.ai/tutorials/zero/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeepSpeed ZeRO Tutorials</a></li>
              <li><a href="https://nvidia.github.io/TensorRT-LLM/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorRT-LLM: Inference Optimization and KV Cache Quantization</a></li>
              <li><a href="https://huggingface.co/docs/text-generation-inference/index" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI: Memory and Throughput Tuning</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/vllm-project/vllm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM</a>, <a href="https://github.com/huggingface/text-generation-inference" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Text Generation Inference</a>, <a href="https://github.com/NVIDIA/TensorRT-LLM" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorRT-LLM</a></li>
              <li><a href="https://github.com/TimDettmers/bitsandbytes" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">bitsandbytes (4-bit/8-bit quantization)</a>, <a href="https://github.com/mit-han-lab/llm-awq" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWQ</a>, <a href="https://github.com/IST-DASLab/gptq" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GPTQ</a>, <a href="https://github.com/turboderp/exllamav2" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ExLlamaV2</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/vllm-project/vllm/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Discussions</a> · <a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a></li>
              <li><a href="https://discuss.pytorch.org/c/distributed/32" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTorch Distributed/FSDP Forum</a> · <a href="https://forums.developer.nvidia.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Developer Forums</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};