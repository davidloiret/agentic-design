'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ContextRoutingDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Intelligent Context Routing decomposes incoming context (content, metadata, constraints) and matches each
            portion to the most appropriate processing component based on capability fit, policy constraints, and
            real-time signals. A router evaluates relevance, sensitivity, and utility, then routes minimal sufficient
            context to specialist components, preserving provenance and enabling safe aggregation of results.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-xs text-gray-400 mb-1">Decompose</div>
              <div className="text-sm font-medium text-white">Split context by modality/topic/sensitivity</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-xs text-gray-400 mb-1">Match</div>
              <div className="text-sm font-medium text-white">Capability + policy aware routing</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-xs text-gray-400 mb-1">Protect</div>
              <div className="text-sm font-medium text-white">Minimize/redact; comply by design</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔗</div>
              <div className="text-xs text-gray-400 mb-1">Aggregate</div>
              <div className="text-sm font-medium text-white">Provenance-aware merge of outputs</div>
            </div>
          </div>
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
            <li>Ingest request + context; extract metadata (modality, sensitivity/PII, domain, language, SLA, budget).</li>
            <li>Decompose context into units (segments/chunks/signals) with labels and provenance.</li>
            <li>Consult capability registry (skills, models, tools, regions, compliance tags, cost/latency profiles).</li>
            <li>Score matches per unit: relevance × capability fit × policy/compliance × cost/latency.</li>
            <li>Route minimal necessary context to selected components; apply redaction and minimization.</li>
            <li>Execute components; enforce ordering/dependencies; cache reusable intermediates.</li>
            <li>Aggregate results with provenance; validate schema/quality; reconcile conflicts.</li>
            <li>Log features, decisions, and outcomes for audit, evaluation, and drift monitoring.</li>
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
            'Use a typed context schema with sensitivity/PII flags, modality, provenance, and TTL.',
            'Maintain an up-to-date capability registry with SLAs, cost, compliance regions, and evaluations.',
            'Prefer routing via features/IDs over raw payloads; minimize and redact before dispatch.',
            'Standardize I/O contracts for components to enable safe substitution and merging.',
            'Budget-first routing: set token/time/cost caps per unit and choose cheapest viable path.',
            'Calibrate router confidence and always define a safe default/fallback route.',
            'Enable shadow routing in staging; compare decisions vs. oracle/evaluator before rollout.',
            'Record rationale and evidence for each decision to support audit and improvement.'
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
            <li>Simple, single-component tasks where decomposition adds overhead without benefit.</li>
            <li>Very small systems lacking capability diversity or metadata to inform routing.</li>
            <li>Hard real-time micro-latency constraints that cannot afford routing/decomposition.</li>
            <li>Contexts with strict data residency constraints but no compliant target components.</li>
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
            <li>Passing full payloads through the router causing privacy risk and cost bloat.</li>
            <li>Inconsistent schemas across components leading to fragile integrations.</li>
            <li>Over-decomposition causing excessive fan-out and token/latency spikes.</li>
            <li>Missing default/fallback path or escalation for low-confidence decisions.</li>
            <li>Stale capability registry or policy maps causing misroutes/non-compliance.</li>
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
            'Context decomposition with labels, sensitivity, and provenance',
            'Capability- and policy-aware matching with confidence scoring',
            'Redaction/minimization and least-privilege context delivery',
            'Budget/SLA aware routing and backpressure',
            'Provenance-preserving aggregation and validation',
            'Decision logging, explainability, and audit trails',
            'Drift and coverage monitoring with evaluators',
            'Pluggable router policy: rules, classifiers, or lightweight LLM gate'
          ].map((f) => (
            <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">{f}</div>
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
            <li>Routing accuracy vs. oracle/evaluator; misroute rate; coverage of required components.</li>
            <li>Latency overhead of routing/decomposition (P50/P95) and end-to-end impact.</li>
            <li>Token efficiency (quality per 1K tokens) and cost per task vs. monolithic baseline.</li>
            <li>Fallback/default frequency; override/escalation rate and time-to-recovery.</li>
            <li>Compliance incidents prevented; PII leakage rate; residency adherence.</li>
            <li>Cache hit ratios for reused context/intermediates; utilization balance of specialists.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Total ≈ router features/tokens + per-component context + aggregation. Keep the router light.</li>
            <li>Route features/IDs instead of raw text where possible; pass only minimal necessary context.</li>
            <li>Use small models or rule engines for routing; reserve strong models for specialist processing.</li>
            <li>Cache decomposed units and intermediate results; deduplicate across components.</li>
            <li>Apply compression/summarization for sensitive or large segments before dispatch.</li>
            <li>Cap fan-out and parallelism; enforce per-run token/time/cost budgets.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Multi-modal pipelines routing text/images/audio/video to specialized analyzers.</li>
            <li>Enterprise assistants combining product docs, tickets, logs, and policy with provenance.</li>
            <li>Multi-agent systems delegating context slices to domain specialists and evaluators.</li>
            <li>Compliance-sensitive workflows requiring data minimization and residency guarantees.</li>
            <li>Localization/translation flows where language/domain portions route to different components.</li>
          </ul>
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Academic Papers</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Enterprise Integration Patterns: Content-Based Router (Hohpe & Woolf, 2003)</li>
              <li>Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer (Shazeer et al., 2017)</li>
              <li>Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity (Fedus et al., 2021)</li>
              <li>Routing Transformer (Roy et al., 2021)</li>
              <li>FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (2023)</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangGraph decision routers and conditional edges</li>
              <li>LangChain RouterChain / MultiPromptRouter</li>
              <li>LlamaIndex RouterQueryEngine and selector components</li>
              <li>Kafka/NATS/RabbitMQ content-based routing patterns</li>
              <li>JSONLogic / JMESPath for rule evaluation; DSPy gating policies</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangGraph, LangChain, LlamaIndex routing components</li>
              <li>Kafka, RabbitMQ, NATS for message routing</li>
              <li>Feature stores/evaluators (MLflow, Evidently) for calibration</li>
              <li>Vector DBs and embedding services for similarity matching</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Enterprise Integration Patterns community resources</li>
              <li>LangChain/LangGraph and LlamaIndex community forums</li>
              <li>MLOps communities on evaluation, routing, and drift</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};