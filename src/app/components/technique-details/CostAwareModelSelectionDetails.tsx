'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const CostAwareModelSelectionDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Cost-Aware Model Selection dynamically routes requests across multiple models (and providers) to optimize
            the cost–quality–latency trade-off per task. It typically combines lightweight heuristics or learned
            routers with cascades: attempt a low-cost model first, escalate to higher-capability models only when
            confidence is low, quality thresholds are not met, or SLAs require it. Budgets, quality gates,
            and per-tenant policies govern real-time decisions with continuous feedback from evaluation data.
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
            <li>Define objectives: target quality (e.g., pass rate on a golden set), latency SLOs, and budget caps.</li>
            <li>Inventory models: capabilities, pricing per 1K tokens (input/output), context limits, regions, reliability.</li>
            <li>Build an evaluation set: representative prompts with ground truth or human-rated quality rubrics.</li>
            <li>Design routing policy: rules or ML router using features (task type, length, uncertainty/confidence, user tier).</li>
            <li>Implement cascades: start with cheaper/faster models; escalate on low confidence, safety triggers, or quality shortfall.</li>
            <li>Add governance: per-tenant budgets, regional/compliance routing, allow/deny lists, kill switches.</li>
            <li>Monitor and learn: log tokens, cost, latency, quality; periodically retrain routers and refresh pricing tables.</li>
            <li>Release safely: canary new routes/models, run A/B against baseline, roll back on KPI regression.</li>
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
            'Segment traffic by priority/tier; reserve premium models for high-value or strict-SLA requests.',
            'Maintain up-to-date pricing and tokenization differences per provider; verify input vs. output token costs.',
            'Use measurable quality thresholds (rubrics, automated checks) and confidence/uncertainty gating.',
            'Cache frequent results and partial reasoning; reuse embeddings/summaries to reduce repeated tokens.',
            'Design for graceful degradation and explicit fallbacks across providers/regions.',
            'Continuously evaluate with a golden set; monitor drift and re-tune router thresholds regularly.',
            'Log granular telemetry: tokens, cost, latency percentiles, route decisions and reasons.',
            'Isolate tenants with per-tenant budgets/quotas; protect critical paths with strict SLAs.'
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
            <li>Single-model deployments that already meet cost, quality, and latency targets with low variance.</li>
            <li>Regulatory/contractual constraints forbidding cross-region/provider routing or quality variance.</li>
            <li>Very low traffic where router complexity and observability overhead outweigh cost savings.</li>
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
            <li>Stale pricing/capabilities tables leading to suboptimal or non-compliant routing.</li>
            <li>Missing fallbacks and budget guards; outages or spikes cause failures and runaway spend.</li>
            <li>Quality regressions from uncalibrated confidence thresholds or evaluation drift.</li>
            <li>Ignoring tokenization differences (providers count tokens differently) and output token multipliers.</li>
            <li>Mixing sensitive data with cheaper models that lack regional/compliance guarantees.</li>
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
            'Multi-model pool with provider failover and regional routing',
            'Quality gates with confidence/uncertainty thresholds and automated checks',
            'Budget caps per tenant/route with real-time enforcement and alerts',
            'Dynamic cascades and progressive escalation',
            'Offline evaluation sets and continuous learning routers',
            'Canary releases, policy-based overrides, and kill switches'
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
            <li>Cost efficiency: $/request, tokens per dollar, budget adherence rate.</li>
            <li>Quality: pass rate vs. golden set, human rating uplift, escalation rate.</li>
            <li>Routing accuracy: agreement with oracle/baseline router; avoidable escalations avoided.</li>
            <li>Latency: p50/p95 end-to-end and per-route; escalation overhead.</li>
            <li>Reliability: timeout/error rate, failover success, on-call incidents avoided.</li>
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
            <li>Track input/output tokens separately; many providers price them differently.</li>
            <li>Measure cascade overhead (multiple calls on one request); gate by confidence to avoid unnecessary escalations.</li>
            <li>Constrain context length; apply compression/summarization and retrieval planning to control tokens.</li>
            <li>Use caching for frequent prompts/intermediates; persist embeddings/summaries for reuse.</li>
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
            <li>High-volume support automation with strict budgets and variable difficulty.</li>
            <li>Summarization, extraction, and Q&A where many requests are easy but some need escalation.</li>
            <li>Multi-tenant platforms offering cost/quality tiers and enterprise SLAs.</li>
            <li>Global deployments requiring regional routing and compliance-aware fallback.</li>
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
              <li><a href="https://arxiv.org/abs/2305.16515" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2207.07061" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Confident Adaptive Language Modeling (CALM) for Early-Exit Cascades</a></li>
              <li><a href="https://arxiv.org/abs/2302.01318" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Speculative Decoding for Faster/Lower-Cost Inference</a></li>
              <li><a href="https://arxiv.org/abs/1603.08983" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">BranchyNet: Early Exits for Deep Networks (general early-exit concept)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.litellm.ai/docs/routing" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LiteLLM Router: Cost/Quality-aware Routing</a></li>
              <li><a href="https://python.langchain.com/docs/use_cases/model_selectors/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain RouterChain: Model Selection</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/module_guides/querying/router/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Router: Query Routing</a></li>
              <li><a href="https://openrouter.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenRouter: Unified Access to Multiple Providers</a></li>
              <li><a href="https://platform.openai.com/docs/pricing" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI: Pricing</a>, <a href="https://www.anthropic.com/pricing#api" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic: Pricing</a>, <a href="https://ai.google.dev/pricing" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google AI: Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LiteLLM Router, OpenRouter, LangChain RouterChain, LlamaIndex Router</li>
              <li>Ray Serve, vLLM, NVIDIA Triton for serving and observability</li>
              <li>Langfuse, Phoenix (Arize) for evaluation and telemetry</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discord.gg/litellm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LiteLLM Discord</a>, <a href="https://discord.gg/openrouter" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenRouter Discord</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forum</a>, <a href="https://mlops.community/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MLOps Community</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};