'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AdaptiveComputeScalingDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Adaptive Compute Scaling automatically adjusts compute capacity (pods/replicas, nodes/VMs, GPU workers)
            in response to real-time demand and SLOs. It combines metric-driven policies (e.g., p95 latency, queue
            length, utilization) with stabilization windows, cooldowns, and predictive/scheduled scaling to maintain
            performance while minimizing cost. Typical stacks layer service autoscaling (HPA/KEDA/Ray Serve) with
            cluster/VM autoscaling (Cluster Autoscaler, AWS ASG, Azure VMSS, GCP MIG) and workload-aware batching.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Ingest signals: p95 latency, queue depth/wait time, CPU/memory/GPU utilization, error rate, RPS/TPS.</li>
            <li>Define targets: SLOs (latency, availability), budgets (cost/energy), and min/max replica bounds.</li>
            <li>Choose policies: target tracking vs. step scaling; separate scale-up and scale-down behaviors.</li>
            <li>Execute scaling: adjust replicas (HPA/KEDA/Ray Serve), then provision capacity (ASG/VMSS/MIG, Cluster Autoscaler).</li>
            <li>Stabilize: apply stabilizationWindow/cooldowns and rate limits to avoid thrashing.</li>
            <li>Pre-warm: keep warm pools or scheduled/predictive scale for diurnal/burst patterns.</li>
            <li>Observe and tune: monitor KPIs, attribution by stage, and refine signals/thresholds regularly.</li>
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
            'Use workload-appropriate signals: for GPU LLM serving, prefer p95 latency and queue depth over CPU%.',
            'Set distinct scale-up (fast, aggressive) vs. scale-down (slow, conservative) policies with stabilization windows.',
            'Pre-warm workers for cold-start-heavy models; use warm pools or schedule-based and predictive scaling.',
            'Layer autoscalers: service (HPA/KEDA/Ray Serve) + cluster/VM (Cluster Autoscaler/ASG/VMSS/MIG).',
            'Constrain with min/max replicas and max surge/drain; use Pod Disruption Budgets and graceful drains.',
            'Batch intelligently (vLLM/TGI/Triton dynamic batching) and bound per-request tokens to keep tail latency stable.',
            'Right-size nodes; bin-pack GPUs; use MIG/MPS where appropriate; avoid resource fragmentation.',
            'Use SLO-driven targets (e.g., keep p95 < target) and monitor per-tenant fairness in multi-tenant clusters.',
            'Instrument decision logs and runbooks; simulate bursts and failure modes before production.',
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
            <li>Ultra low-latency hard real-time paths where any cold-start or rebalancing is unacceptable.</li>
            <li>Stateful, heavily session-affine workloads without sharding or sticky routing strategies.</li>
            <li>Licensing or quota-limited services where additional replicas cannot serve more throughput.</li>
            <li>Air-gapped or fixed-capacity environments with no elastic backing resources.</li>
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
            <li>Using CPU% for GPU-bound inference; choose queue latency/depth and GPU utilization instead.</li>
            <li>Thrashing from missing stabilization windows/cooldowns and symmetric scale policies.</li>
            <li>Ignoring warm-up times, image pulls, or large model load times → prolonged SLO breaches.</li>
            <li>No min capacity or headroom; Cluster Autoscaler lag starves pod autoscalers.</li>
            <li>Scaling to zero without request buffering/warmers → severe cold-start penalties.</li>
            <li>Over-reliance on averages; target p95/p99 and protect against bursty arrivals.</li>
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
            'Metric-driven autoscaling (latency, queue depth, utilization, error rate).',
            'Event-based scaling via external systems (KEDA: Kafka, SQS, Redis, Prometheus).',
            'Predictive and scheduled scaling for diurnal patterns and known events.',
            'Multi-layer scaling: service, node/VM, and cluster capacity coordination.',
            'SLO-aware policies with distinct up/down behaviors and stabilization.',
            'Cost/energy-aware constraints and budgets with per-tenant quotas.',
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
            <li>Latency p50/p95/p99 vs. SLO; queue wait time; error/timeouts under burst.</li>
            <li>Throughput (RPS/TPS, tokens/sec) and scaling latency (time-to-capacity).</li>
            <li>Cost per successful request; instance/GPU-hours; over/under-provisioned time%.</li>
            <li>Autoscaling event rate and stability (no flapping); saturation headroom.</li>
            <li>Per-tenant fairness and quota adherence in multi-tenant clusters.</li>
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
            For LLM inference, track tokens/sec, concurrent requests, and KV cache memory. Use batching and
            context/token caps to bound tail latency; prefer queue depth + p95 latency as primary signals. For GPU
            nodes, monitor VRAM/SM utilization, model load times, and ensure autoscalers have capacity headroom.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Signals: queue depth, p95 latency, GPU util, request concurrency, token budgets.</li>
            <li>Controls: dynamic batching, max new tokens, prompt length limits, warm pools.</li>
            <li>Efficiency: cache KV/prefix; shard large models; bin-pack GPUs; avoid tiny underutilized pods.</li>
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
            <li>Bursty, diurnal, or campaign-driven traffic (e-commerce, launches, live events).</li>
            <li>GPU LLM serving with dynamic batching and strict latency/cost SLOs.</li>
            <li>Event-driven processing (queues/streams) where backlog length is a clear signal.</li>
            <li>Multi-tenant platforms needing cost control, fairness, and predictable SLOs.</li>
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
              <li><a href="https://dl.acm.org/doi/10.1145/3291045.3300913" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Scryer: Netflix Predictive Autoscaling (ACM, 2018)</a></li>
              <li><a href="https://arxiv.org/abs/2309.02206" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">A Survey on Cloud Autoscaling (2023+)</a></li>
              <li><a href="https://arxiv.org/abs/2309.06180" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: PagedAttention and Throughput for LLM Serving (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes Horizontal Pod Autoscaler (v2)</a></li>
              <li><a href="https://keda.sh/docs/2.14/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KEDA: Event-Driven Autoscaling</a></li>
              <li><a href="https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes Cluster Autoscaler</a></li>
              <li><a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-target-tracking.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS EC2 Auto Scaling: Target Tracking</a></li>
              <li><a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Predictive Scaling</a></li>
              <li><a href="https://learn.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-autoscale-overview" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure VM Scale Sets Autoscale</a></li>
              <li><a href="https://cloud.google.com/compute/docs/autoscaler" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GCP Managed Instance Group Autoscaler</a></li>
              <li><a href="https://docs.ray.io/en/latest/serve/scaling-and-resource-allocation.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Serve: Autoscaling</a></li>
              <li><a href="https://docs.vllm.ai/en/latest/serving/production_guide.html#scaling" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM Production Scaling Guide</a></li>
              <li><a href="https://huggingface.co/docs/text-generation-inference/basic_tutorials/benchmark#scaling" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI: Scaling</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Kubernetes HPA/KEDA/Cluster Autoscaler; AWS ASG; Azure VMSS; GCP MIG.</li>
              <li>vLLM, Text Generation Inference (TGI), NVIDIA Triton Inference Server.</li>
              <li>Prometheus + Grafana; CloudWatch; Azure Monitor; GCP Cloud Monitoring.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/kedacore/keda/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">KEDA Community Discussions</a></li>
              <li><a href="https://github.com/kubernetes/autoscaler/issues" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes SIG Autoscaling (issues)</a></li>
              <li><a href="https://www.youtube.com/@AWSCompute" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Compute Talks/Blogs</a></li>
              <li><a href="https://discuss.ray.io/c/ray-serve/6" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Serve Forum</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};