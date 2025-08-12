'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AdaptiveComplexityScalingDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Dynamically adjusts inference complexity in real time based on task difficulty, uncertainty, and resource budgets.
            Uses early-exit halting, cascaded routing (small→large models), dynamic width/depth, sparse Mixture-of-Experts gating,
            and speculative decoding to trade off quality, latency, and cost under explicit SLOs.
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
            <li>Estimate difficulty/uncertainty and read time/cost budgets (SLOs).</li>
            <li>Select path: fast path (cheap model/early-exit) vs. deep path (bigger model/extra steps).</li>
            <li>Allocate compute: max tokens, max thinking steps, halting thresholds, MoE expert budget.</li>
            <li>Generate with online monitors (toxicity, uncertainty, self-consistency signals).</li>
            <li>Early‑exit if confidence ≥ threshold; otherwise escalate (speculative decode, larger model, more steps).</li>
            <li>Apply guardrails and verification when actions/claims are high‑risk; retry or fallback if needed.</li>
            <li>Cache and reuse KV/prefix/context; record routing, costs, and outcomes.</li>
            <li>Continuously learn thresholds/policies from evals and production telemetry.</li>
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
            'Calibrate uncertainty/confidence (e.g., temperature scaling) before using it for halting/routing.',
            'Define hard budgets: max tokens, max steps, max escalations; always have a safe fallback.',
            'Use cascades: small model for triage; escalate only when needed; verify selectively.',
            'Exploit sparsity: MoE (top‑k experts) and structured pruning/quantization to keep latency predictable.',
            'Instrument everything: per‑request cost/latency, escalation rate, quality deltas vs. baseline.',
            'Cache aggressively (prompt/prefix/KV) and share across requests when safe.',
            'A/B evaluate new thresholds/policies offline on curated suites before production rollout.',
            'Align policies to product SLOs (p95 latency, cost caps) rather than global averages.'
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
            <li>Uniform, low‑variance tasks where a fixed small model meets quality and SLOs.</li>
            <li>Hard real‑time or safety‑critical actions that cannot tolerate variable compute or routing risk.</li>
            <li>Compliance‑critical flows requiring deterministic, fully auditable fixed pipelines.</li>
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
            <li>Miscalibrated thresholds → too many escalations or premature exits hurting quality.</li>
            <li>Cost blow‑ups from recursive retries or unbounded test‑time compute.</li>
            <li>QoS regressions under load when routing policies ignore backpressure/SLOs.</li>
            <li>Speculative decoding mismatches causing frequent fallbacks and lost speedup.</li>
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
            'Early‑exit halting (layer‑wise exits, patience‑based exiting).',
            'Cascaded routing across models (small → medium → large) with verification.',
            'Dynamic width/depth (e.g., DynaBERT) and adaptive thinking time.',
            'Sparse Mixture‑of‑Experts with learned/top‑k gating (Switch/SG‑MoE).',
            'Speculative/assisted decoding for faster generation.',
            'Budget‑aware policies: token, latency, energy, and cost caps.'
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
            <li>Quality vs. fixed‑compute baseline (accuracy/win‑rate/human preference).</li>
            <li>Latency p50/p95 and SLO‑breach rate; escalation rate and retry rate.</li>
            <li>Cost per successful task; tokens saved (%) and compute utilization.</li>
            <li>Stability of policies over time (drift of thresholds, variance under load).</li>
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
            Control average tokens via early‑exit halting and cascades; reuse KV cache and prefix/context where possible.
            Set per‑turn token budgets and cap speculative lookahead. Prefer sparse MoE to dense scale‑ups when latency‑bound.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Budgets: max input tokens, max generated tokens, max model hops, max verify calls.</li>
            <li>Throughput: coalesce small requests; batch where safe; prioritize short prompts for tail‑latency.</li>
            <li>Caching: prompt/prefix/KV caches; retrieval/result caches to avoid recomputation.</li>
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
            <li>High‑volume assistants with strict latency/cost SLOs (support, chat, search).</li>
            <li>On‑device/edge scenarios with tight memory/energy budgets.</li>
            <li>Coding/analysis agents using fast triage + selective deep verification.</li>
            <li>Routing gateways serving heterogeneous prompts and difficulty distributions.</li>
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
              <li><a href="https://arxiv.org/abs/1603.08983" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Adaptive Computation Time (Graves, 2016)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04037" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DynaBERT: Dynamic Width/Depth (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2207.07061" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Confident Adaptive Language Modeling (CALM, 2022)</a></li>
              <li><a href="https://arxiv.org/abs/1701.06538" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sparsely‑Gated Mixture‑of‑Experts (Shazeer et al., 2017)</a></li>
              <li><a href="https://arxiv.org/abs/2101.03961" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Switch Transformer (Fedus et al., 2021)</a></li>
              <li>Early‑exit for Transformers (e.g., DeeBERT, PABEE); cascaded LLMs (e.g., FrugalGPT).</li>
              <li>Speculative decoding and Medusa‑style assisted decoding for faster generation.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: Inference & speculative decoding</a></li>
              <li><a href="https://huggingface.co/docs/text-generation-inference" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI: Inference features</a></li>
              <li><a href="https://www.deepspeed.ai/tutorials/mixture-of-experts/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeepSpeed‑MoE tutorial</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>vLLM, TGI, TensorRT‑LLM for high‑throughput serving.</li>
              <li>DeepSpeed‑MoE/Switch‑style MoE, Megatron‑LM MoE.</li>
              <li>Routing frameworks (e.g., RouteLLM) and feature stores for policy signals.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Engineering blogs on test‑time compute, routing, MoE serving, and latency SLOs.</li>
              <li>Conference talks/tutorials on speculative decoding and early‑exit.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};