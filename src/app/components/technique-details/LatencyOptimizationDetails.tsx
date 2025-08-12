'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const LatencyOptimizationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Latency Optimization reduces perceived and absolute response time across the end-to-end path: network, admission/queue,
            batching, model execution, and post-processing. Core levers include connection reuse and streaming, deadline-aware dynamic
            batching, speculative/draft decoding with verification, KV/prefix cache reuse, prompt/context minimization, geo/edge
            placement, and hot-start strategies to keep time-to-first-token and tail latencies within SLOs.
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
            <li>Set SLOs: TTFT, TTUA, p95/p99 end-to-end latency, and error/timeout budgets per tier.</li>
            <li>Instrument breakdown: DNS/TLS/connect, server time (queue, batch, infer, post-process), and client render.</li>
            <li>Optimize transport: keep-alive HTTP/2 or gRPC, connection pooling, request coalescing, and streaming.</li>
            <li>Apply server tactics: deadline-aware batching, speculative decoding, caching (KV/prefix/response), and warm pools.</li>
            <li>Reduce tokens: prompt trimming, compression/summarization, retrieval caps, structured tool I/O.</li>
            <li>Place smartly: geo/edge routing, CDN for static, regional failover; avoid cross-region hops on hot paths.</li>
            <li>Validate and iterate: A/B measure deltas; tune batch size, speculative thresholds, and cache policies.</li>
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
            'Stream tokens/results to cut perceived latency; render incrementally on the client.',
            'Use deadline-aware batching with max queue time; separate low-latency from best-effort traffic.',
            'Warm critical models and maintain small warm pools to avoid cold starts; lazy-load rarely used paths.',
            'Reuse KV/prefix caches for conversational turns; cache verified responses and frequent tool outputs.',
            'Adopt speculative/draft decoding with verification to accelerate decoding while preserving quality.',
            'Prefer HTTP/2 or gRPC with connection pooling; avoid per-request TLS/DNS costs on hot paths.',
            'Minimize prompt/context: deduplicate, compress, or summarize; favor IDs/refs over raw blobs.',
            'Use edge/region affinity for interactive UX; avoid cross-region calls inside tight loops.',
            'Bound max tokens and apply early-exit policies; fail fast with retries and circuit breakers.',
            'Continuously profile p95/p99 and TTFT; alert on SLO breaches with stage-level attribution.'
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
            <li>Offline/batch analytics where throughput or unit cost dominates over interactivity.</li>
            <li>Compliance-critical pipelines that require fixed, deterministic processing (no speculative paths).</li>
            <li>Extremely simple/low-traffic services where added complexity outweighs gains.</li>
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
            <li>Over-batching or large max tokens causing p95/p99 regressions and timeouts.</li>
            <li>Cold starts from scale-to-zero or heavy model loads on the critical path.</li>
            <li>Ignoring TTFT and queue time breakdowns; tuning only total latency.</li>
            <li>Unbounded prompts/context growth; KV cache OOMs and thrashing.</li>
            <li>Cross-region calls in interactive loops; high DNS/TLS/handshake overheads.</li>
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
            'Token streaming and incremental rendering.',
            'Deadline-aware dynamic batching with per-tier budgets.',
            'Speculative/draft decoding with verification/acceptance.',
            'KV/prefix cache reuse and response/result caching.',
            'Geo/edge-aware routing and warm capacity pools.',
            'Connection pooling (HTTP/2/gRPC) and efficient serialization.'
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
            <li>TTFT (time-to-first-token) and TTUA (time-to-usable-answer).</li>
            <li>p50/p95/p99 end-to-end latency and stage breakdown (queue, batch, infer).</li>
            <li>Speculative acceptance ratio; cache hit rates (KV/prefix/response).</li>
            <li>Throughput (RPS, tokens/sec) under latency SLO; timeout/error rate.</li>
            <li>SLO attainment rate and cost per successful request.</li>
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
          <p>
            Bound prompt and generation budgets per tier. Prefer continuous/dynamic batching (e.g., vLLM/TGI) and memory-savvy attention
            (PagedAttention/FlashAttention). Track KV cache memory growth with sequence length and batch size to avoid OOMs. Quantization
            (INT8/INT4/FP8) and early-exit policies can reduce compute while preserving acceptable quality.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Controls: max input/output tokens, summarization/compression, retrieval caps, early-exit thresholds.</li>
            <li>Efficiency: reuse KV/prefix; speculative decoding to cut decoder steps; coalesce small requests.</li>
            <li>Placement: co-locate data and models; avoid cross-region hot paths; use warm pools for burst.</li>
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
            <li>Interactive chat/assistants and copilots where responsiveness drives UX.</li>
            <li>Voice agents and real-time multimodal interfaces with strict TTFT targets.</li>
            <li>Real-time RAG/search with streaming answers and progressive refinement.</li>
            <li>Mobile/edge experiences with limited bandwidth, battery, and compute.</li>
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
              <li><a href="https://arxiv.org/abs/2311.10461" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">On Speculative Decoding for Accelerating LLM Inference (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2309.06131" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PagedAttention: Efficient Memory Management for LLM Serving (vLLM, 2023/2024)</a></li>
              <li><a href="https://arxiv.org/abs/2307.08691" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention-2: Faster Attention with Better Parallelism (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2305.11206" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWQ: Activation-aware Weight Quantization for LLMs (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: Continuous Batching and Serving Guide</a></li>
              <li><a href="https://huggingface.co/docs/text-generation-inference/index" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI: High-throughput/low-latency serving</a></li>
              <li><a href="https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Triton: Scheduling & Dynamic Batching</a></li>
              <li><a href="https://kserve.github.io/website/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KServe: Model Serving on Kubernetes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>vLLM, Text Generation Inference (TGI), NVIDIA Triton, TensorRT-LLM/FasterTransformer</li>
              <li>FlashAttention, bitsandbytes, llama.cpp (ggml/gguf)</li>
              <li>Ray Serve, KServe, Kubernetes HPA/KEDA for scaling and warm pools</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/vllm-project/vllm/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Discussions</a></li>
              <li><a href="https://github.com/huggingface/text-generation-inference/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI Discussions</a></li>
              <li><a href="https://forums.developer.nvidia.com/c/ai-data-science/deep-learning-inference/125" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Inference Forums</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};