'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ParallelSynthesisDetails = () => {
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
            Parallel synthesis orchestrates multiple heterogeneous analysis streams in parallel and combines their outputs through
            weighted aggregation, conflict resolution, deduplication, and consensus building. Each stream is scored for reliability
            and relevance; a synthesis stage reconciles contradictions and produces a single, coherent output with traceable provenance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-xs text-gray-400 mb-1">Flow</div>
              <div className="text-sm font-medium text-white">Fan-out streams, fan-in synthesis</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧮</div>
              <div className="text-xs text-gray-400 mb-1">Aggregation</div>
              <div className="text-sm font-medium text-white">Weighted merge + consensus</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-xs text-gray-400 mb-1">Quality</div>
              <div className="text-sm font-medium text-white">Per-stream scoring & validation</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-xs text-gray-400 mb-1">Conflicts</div>
              <div className="text-sm font-medium text-white">Resolution & provenance</div>
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
            <li>Define streams: identify complementary perspectives (e.g., quantitative data, competitive intel, expert interviews).</li>
            <li>Specify schemas and scoring: structure outputs and define confidence/reliability scoring per stream.</li>
            <li>Execute in parallel: dispatch all streams with timeouts, budgets, and capped concurrency.</li>
            <li>Validate results: schema-check, deduplicate, and compute quality scores for each output.</li>
            <li>Resolve conflicts: apply weighted reconciliation, tie-breakers, and escalation rules.</li>
            <li>Synthesize: merge normalized outputs into a unified artifact with citations/provenance.</li>
            <li>Report metrics: capture agreement, coverage, latency, and cost; persist artifacts for audit.</li>
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
            'Design streams to be maximally independent; minimize hidden shared state',
            'Use strict output schemas and include per-claim confidence + source attribution',
            'Calibrate stream weights using validation data; prefer reliability over verbosity',
            'Cap fan-out and add backpressure; fail fast on low-signal streams',
            'Normalize terminology and units before merging to reduce false conflicts',
            'Apply contradiction checks and run a final consistency pass',
            'Use smaller models for breadth collection; reserve strongest model for final synthesis',
            'Cache stable sub-results and reuse to control cost',
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
            <li>Tasks with strong sequential dependencies or evolving shared state.</li>
            <li>Problems where a single ground-truth source dominates and parallel diversity adds noise.</li>
            <li>Ultra-low-latency contexts where fan-out overhead violates SLAs.</li>
            <li>Severe rate-limit/budget constraints that preclude burst concurrency.</li>
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
            <li>Unbounded fan-out causing token/cost spikes and rate-limit errors.</li>
            <li>Naive majority voting that amplifies duplicated hallucinations.</li>
            <li>Inconsistent schemas leading to merge failures and silent field loss.</li>
            <li>Missing provenance, making audits and conflict investigation impossible.</li>
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
            'Multi-stream execution (heterogeneous modalities supported)',
            'Quality-weighted aggregation and consensus strategies',
            'Conflict detection and resolution with tie-break rules',
            'Deduplication, normalization, and terminology alignment',
            'Provenance and citation tracking',
            'Pluggable scoring functions and evaluators',
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
            <li>Agreement rate between streams (e.g., pairwise or Fleiss’ kappa).</li>
            <li>Coverage/recall of key facts vs. gold reference set.</li>
            <li>Synthesis quality score (human rubric or model-as-judge).</li>
            <li>Time-to-synthesis (wall-clock) vs. single-stream baseline.</li>
            <li>Token per correct fact / cost per accepted unit.</li>
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
            <li>Front-loaded burst tokens proportional to number of streams.</li>
            <li>Lower wall-clock latency vs. sequential, higher instantaneous concurrency.</li>
            <li>Amortize cost by caching stable streams and reusing across runs.</li>
            <li>Consider memory and queue limits; apply rate-limit-aware backoff.</li>
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
            <li>Research synthesis across heterogeneous sources.</li>
            <li>Due diligence and market/competitive analysis.</li>
            <li>Incident postmortems combining logs, metrics, and interviews.</li>
            <li>Comprehensive reports requiring multiple perspectives.</li>
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
              <li>Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2023)</li>
              <li>Tree of Thoughts: Deliberate Problem Solving with LLMs (Yao et al., 2023)</li>
              <li>Graph of Thoughts: Solving Problems with Large Language Models (Besta et al., 2023)</li>
              <li>Multi-Agent Debate / Deliberate Decoding (various, 2023–2024)</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Map-reduce and ensemble patterns for RAG pipelines</li>
              <li>Weighted voting and rubric-based evaluators</li>
              <li>Conflict resolution playbooks and provenance logging</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangChain (map_reduce, refine, ensemble retrievers)</li>
              <li>LlamaIndex (composers, aggregators)</li>
              <li>DSPy (self-consistency, evaluators)</li>
              <li>Ray/Celery/Temporal for parallel orchestration</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Open-source forums on multi-agent and ensemble methods</li>
              <li>LLM ops communities on evaluation and benchmarking</li>
              <li>Papers with Code collections for reasoning ensembles</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};