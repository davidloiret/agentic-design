'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const DynamicRoutingDetails = () => {
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
            Dynamic Routing analyzes the input, user/context, and system state to select the best processing path at runtime.
            A router (rules, feature scorer/classifier, or a lightweight LLM gate) produces a route decision with confidence,
            optional alternatives, and a safe default. Policies can adapt to budgets, SLAs, and drift.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔀</div>
              <div className="text-xs text-gray-400 mb-1">Flow</div>
              <div className="text-sm font-medium text-white">Route to optimal path</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧮</div>
              <div className="text-xs text-gray-400 mb-1">Policy</div>
              <div className="text-sm font-medium text-white">Rules/ML/LLM gate</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">📉</div>
              <div className="text-xs text-gray-400 mb-1">Confidence</div>
              <div className="text-sm font-medium text-white">Thresholds & fallback</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-xs text-gray-400 mb-1">Adaptation</div>
              <div className="text-sm font-medium text-white">Budgets & drift-aware</div>
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
            <li>Define routing objectives, candidate paths, and consistent I/O contracts per path.</li>
            <li>Extract routing features (content type, complexity, user profile, channel, recency, budget/SLA, risk).</li>
            <li>Score paths with a policy (rules, classifier, small LLM gate); compute confidence.</li>
            <li>Select path; if low confidence, use safe default or fallback. Optionally shadow top-2 for evaluation.</li>
            <li>Execute selected branch; validate outputs against schema; optionally merge if multiple were explored.</li>
            <li>Log features, decision, confidence, and per-branch metrics for monitoring/audit.</li>
            <li>Periodically evaluate, recalibrate thresholds, and update policy using labeled or feedback data.</li>
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
            'Decouple router policy from branch implementations; version and A/B test independently',
            'Standardize schemas across branches; keep inputs/outputs compatible for optional merging',
            'Calibrate confidence; set thresholds and always provide a safe default route',
            'Prefer lightweight policies (rules/small model) to minimize router latency and cost',
            'Apply budgets and backpressure; cap exploration and avoid thrashing between paths',
            'Enable shadow mode before full rollout; log features/decisions for audit and drift detection',
            'Cache invariant artifacts (retrievals, profiles) and reuse across runs',
            'Introduce human-in-the-loop for high-stakes or low-confidence cases'
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
            <li>Homogeneous tasks where a single well-tuned path suffices.</li>
            <li>Very small workloads where router overhead outweighs benefits.</li>
            <li>Hard real-time ultra-low latency contexts that cannot afford routing/gating.</li>
            <li>Insufficient data to calibrate/evaluate routing reliability.</li>
            <li>Safety-critical scenarios without rigorous evaluation and fallback procedures.</li>
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
            <li>Overfitted router prompts/policies that don’t generalize; unstable decisions.</li>
            <li>Inconsistent schemas between branches leading to brittle integrations.</li>
            <li>Missing default/fallback path causing drops or poor UX on low confidence.</li>
            <li>Exploring multiple branches in production without caps → cost spikes.</li>
            <li>Thrashing between paths due to jittery thresholds or poorly chosen features.</li>
            <li>Insufficient logging and no drift detection; hard to audit or improve.</li>
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
            'Context-aware, multi-criteria decision logic',
            'Confidence scoring, thresholds, and safe default fallback',
            'Top-k/shadow routing and staged rollouts',
            'Budget/SLA-aware path selection',
            'Pluggable policies: rules, ML classifiers, or LLM gate',
            'Decision logging, explainability, and audit trails',
            'Drift detection and online calibration',
            'Optional merge/rejoin after specialized branches'
          ].map((f) => (
            <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
            <li>Routing accuracy vs. oracle/evaluator; misroute rate.</li>
            <li>Calibration quality (ECE/Brier score); threshold precision/recall.</li>
            <li>Fallback/default rate and low-confidence frequency.</li>
            <li>Per-branch success/quality and user satisfaction.</li>
            <li>Cost per task and savings vs. single-path baseline.</li>
            <li>Routing latency overhead (P50/P95) and tail behavior.</li>
            <li>Drift indicators (feature/decision distribution shifts); re-route/override rate.</li>
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
            <li>Total ≈ router tokens + selected-branch tokens (+ optional shadow/merge).</li>
            <li>Prefer rules or a small model for routing; reserve strongest models for branches.</li>
            <li>Cache precomputed features and invariant artifacts; pass distilled context, not full transcripts.</li>
            <li>Avoid top-k exploration in production; use sampling/shadow for evaluation only.</li>
            <li>Apply backpressure and per-run budgets; cap retries and exploration.</li>
            <li>Batch where possible and deduplicate prompts; share context by ID/reference.</li>
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
            <li>Customer support triage across intents/severity to specialized agents.</li>
            <li>Personalization by audience/channel/tone with targeted prompt paths.</li>
            <li>Knowledge workflows choosing retrieval-heavy vs. expert synthesis paths.</li>
            <li>Quality gating: route to evaluator/refiner only when needed.</li>
            <li>Tool/agent selection and delegation based on task capability fit.</li>
            <li>Cost-aware model selection (small vs. large model gating).</li>
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
              <li>Switch Transformers / Mixture-of-Experts routing</li>
              <li>Routing Transformers and attention routing variants</li>
              <li>LLM Router/Gating for MoE and Mixture-of-Agents (2023–2024)</li>
              <li>Calibration and confidence estimation for decision systems</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangGraph decision routers and conditional edges</li>
              <li>LangChain router chains and LLMRouter patterns</li>
              <li>LlamaIndex decision routers and selectors</li>
              <li>DSPy gating and evaluator-driven policies</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangGraph, LangChain, LlamaIndex routing components</li>
              <li>Feature stores and evaluators (MLflow, Evidently) for calibration</li>
              <li>Rule engines (JSONLogic, Semgrep-like policies) for lightweight routing</li>
              <li>Workflow orchestrators (Temporal, Ray) with gating hooks</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Papers with Code collections on MoE and routing</li>
              <li>Open-source forums on LLM systems and LangGraph communities</li>
              <li>LLM ops communities on evaluation, calibration, and drift</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};