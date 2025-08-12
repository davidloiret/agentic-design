'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ResourceAwareSchedulingDetails = () => {
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
            Resource-Aware Scheduling dynamically matches AI tasks with compute resources (CPU/GPU/TPU, memory, bandwidth)
            using live telemetry and SLO/cost constraints. It combines techniques like dynamic batching, queueing, priority and
            preemption, model placement, and autoscaling to meet latency/throughput targets while maximizing utilization and
            respecting power/thermal and budget limits.
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
            <li>Profile tasks and models: latency SLOs, batchability, memory footprints (KV cache/weights), throughput targets.</li>
            <li>Instrument resources: collect CPU/GPU utilization, memory, queue depth, temperature, power, and cost signals.</li>
            <li>Admission control & routing: classify request priority/tier; route to suitable model/instance/region.</li>
            <li>Scheduling & batching: form dynamic batches within SLO; apply priority, preemption, or isolation where needed.</li>
            <li>Autoscaling & placement: scale replicas by queue/latency; place models to satisfy memory/affinity constraints.</li>
            <li>Feedback control: monitor SLO attainment; adapt batch size/concurrency, and adjust priorities/budgets.</li>
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
            'Use dynamic batching with per-tier latency budgets; separate low-latency from best-effort queues.',
            'Right-size model placement by memory (weights + KV cache) and compute; avoid page thrash and OOM.',
            'Implement priority and preemption for urgent requests; protect background jobs with quotas.',
            'Tune concurrency per instance based on utilization and headroom; avoid head-of-line blocking.',
            'Autoscale on queue depth and p95 latency; use warm pools for burstiness; prefer bin-packing for cost.',
            'Instrument end-to-end: request, queue, batch, inference, and postprocessing stages with traces/metrics.',
            'Apply regional/zone routing and model replicas for resilience; drain gracefully during rollouts.',
            'Cap token/context budgets; compress/stream to meet SLOs and control spend.'
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
            <li>Ultra-simplified/homogeneous workloads where static round-robin meets SLOs cheaply.</li>
            <li>Hard real-time control loops where any batching/queuing overhead risks deadline misses.</li>
            <li>Single-tenant, overprovisioned environments with negligible contention and stable load.</li>
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
            <li>Over-batching causing p95/p99 latency regressions; ignoring per-tier SLO budgets.</li>
            <li>Insufficient GPU memory accounting for KV cache/token growth → OOMs and restarts.</li>
            <li>Hotspot queues and head-of-line blocking; lack of isolation between tiers/tenants.</li>
            <li>Reactive-only autoscaling with cold start penalties; no warm capacity for bursts.</li>
            <li>Poor observability: missing queue time vs. inference time breakdown; blind tuning.</li>
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
            'Real-time resource telemetry and SLO-aware routing',
            'Dynamic batching and token-aware scheduling',
            'Priority queues, preemption, and isolation per tier/tenant',
            'Placement aware of memory/affinity and NUMA/GPU topology',
            'Autoscaling with warm pools and bin-packing for cost',
            'End-to-end traces, metrics, and policy-driven budgets'
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
            <li>Latency: p50/p95 end-to-end and queue time share; SLO attainment rate per tier.</li>
            <li>Throughput: requests/s and tokens/s per instance and fleet; batch effectiveness.</li>
            <li>Utilization: GPU SM/memory utilization, CPU utilization, saturation indicators.</li>
            <li>Cost and efficiency: cost/request, tokens per dollar, energy per token.</li>
            <li>Stability: error rate, OOM/restart rate, autoscale convergence time.</li>
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
            <li>Budget input/output tokens per tier; enforce max context and apply compression/summarization.</li>
            <li>Track KV cache growth vs. batch size and sequence length; reserve headroom to prevent OOM.</li>
            <li>Use continuous/dynamic batching to improve tokens/s while honoring per-request deadlines.</li>
            <li>Prefer streaming for tight SLOs; cut off long generations or down-tier models on budget pressure.</li>
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
            <li>Multi-tenant LLM APIs with tiered latency/cost SLOs and bursty demand.</li>
            <li>Real-time assistants and chat where TTFT and p95 latency are critical.</li>
            <li>Batch/stream inference services in cloud and Kubernetes with autoscaling.</li>
            <li>Edge/mobile deployments balancing battery, thermal limits, and offline modes.</li>
            <li>Autonomous systems requiring deadline-aware perception/planning pipelines.</li>
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
              <li><a href="https://www.usenix.org/system/files/nsdi20-paper-yu.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Clockwork: Predictable Low-Latency Inference (NSDI 2020)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/3341301.3359636" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Nexus: Multi-tenant Inference Serving (SOSP 2019)</a></li>
              <li><a href="https://www.usenix.org/system/files/nsdi21-paper-romero.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">INFaaS: Managed Inference Serving (NSDI 2021)</a></li>
              <li><a href="https://www.usenix.org/system/files/osdi19-yu.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Salus: Fine-Grained GPU Sharing (OSDI 2019)</a></li>
              <li><a href="https://www.usenix.org/system/files/osdi18-xiao.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Gandiva: Introspective GPU Scheduler (OSDI 2018)</a></li>
              <li><a href="https://www.usenix.org/system/files/nsdi19-gujarati.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tiresias: A GPU Cluster Manager (NSDI 2019)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/scheduling_and_batching.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Triton: Scheduling & Dynamic Batching</a></li>
              <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: Continuous Batching and PagedAttention</a></li>
              <li><a href="https://kserve.github.io/website/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KServe: Model Serving on Kubernetes</a></li>
              <li><a href="https://kubernetes.io/docs/concepts/scheduling-eviction/priority-preemption/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes: Priority and Preemption</a></li>
              <li><a href="https://keda.sh/docs/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KEDA: Event-driven Autoscaling</a></li>
              <li><a href="https://mlcommons.org/en/inference-datacenter/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MLPerf Inference: Benchmark Metrics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/triton-inference-server/server" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Triton Inference Server</a>, <a href="https://github.com/vllm-project/vllm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM</a>, <a href="https://docs.ray.io/en/latest/serve/index.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Serve</a>, <a href="https://pytorch.org/serve/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TorchServe</a></li>
              <li><a href="https://prometheus.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Prometheus</a> / <a href="https://grafana.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Grafana</a>, <a href="https://developer.nvidia.com/dcgm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA DCGM</a> for telemetry</li>
              <li><a href="https://kubernetes.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes</a>, <a href="https://istio.io/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Istio</a> for traffic shaping</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/vllm-project/vllm/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Discussions</a>, <a href="https://ray.io/slack" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Slack</a></li>
              <li><a href="https://github.com/kserve/kserve/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KServe Discussions</a>, <a href="https://discuss.kubernetes.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes Forum</a></li>
              <li><a href="https://forums.developer.nvidia.com/c/accelerated-computing/triton-inference-server/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Triton Forums</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};