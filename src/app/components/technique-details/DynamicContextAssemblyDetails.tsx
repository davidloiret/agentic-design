'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const DynamicContextAssemblyDetails = () => {
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
            Dynamic Context Assembly composes the optimal context window at runtime by analyzing the query,
            scoring candidate sources (relevance, quality, freshness, diversity, risk), allocating a token budget
            across sources, and assembling a deduplicated, compressed, and ordered context for generation.
            The assembly adapts during generation using utilization signals and feedback.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-xs text-gray-400 mb-1">Analysis</div>
              <div className="text-sm font-medium text-white">Intent & domain detection</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-xs text-gray-400 mb-1">Scoring</div>
              <div className="text-sm font-medium text-white">Relevance × quality × freshness</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧱</div>
              <div className="text-xs text-gray-400 mb-1">Budgeting</div>
              <div className="text-sm font-medium text-white">Token allocation per source</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧹</div>
              <div className="text-xs text-gray-400 mb-1">Normalization</div>
              <div className="text-sm font-medium text-white">Dedup + compression + ordering</div>
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
            <li>Parse query for domains, intent, complexity, time-sensitivity, and constraints.</li>
            <li>Enumerate candidate sources (KB, vector DB, docs, APIs, logs) with metadata and costs.</li>
            <li>Score candidates on relevance, quality, freshness, coverage, risk; calibrate scores.</li>
            <li>Allocate token budget across sources; set per-source caps and ordering policy.</li>
            <li>Retrieve top chunks; deduplicate semantically; compress while preserving salience.</li>
            <li>Assemble context with clear sectioning and provenance; include task-specific hints.</li>
            <li>Generate; monitor utilization and citations; adapt weights or re-pull on gaps.</li>
            <li>Log features, decisions, budgets, and outcomes; feed back to improve scoring.</li>
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
            'Maintain a typed source registry with SLAs, costs, freshness, and compliance tags.',
            'Use calibrated scorers (BM25/embedding + rerankers) and combine with quality/freshness weights.',
            'Budget first: decide token allocation and per-source caps before retrieval.',
            'Normalize: deduplicate semantically, remove boilerplate, and compress with salience-aware summaries.',
            'Keep provenance (source, chunk id, timestamp) and surface citations in outputs.',
            'Cache frequent queries and intermediate retrievals; invalidate with freshness rules.',
            'Introduce diversity constraints to avoid near-duplicate evidence; prefer complementary sources.',
            'Guardrails: PII/compliance filters pre- and post-assembly; enforce allow/deny by region/role.',
            'Online evaluation loop using labeled queries and rubric-based graders; close the feedback cycle.',
            'Shadow new assembly policies before rollout; compare cost/quality vs. current baseline.'
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
            <li>Simple, single-source tasks where retrieval + direct prompting suffices.</li>
            <li>Strict real-time constraints that cannot afford retrieval and reranking overhead.</li>
            <li>Scenarios with tight compliance boundaries prohibiting cross-source mixing.</li>
            <li>When high determinism is required and dynamic inputs may reduce reproducibility.</li>
            <li>Very small contexts where assembly overhead outweighs benefit.</li>
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
            <li>Overfilling the window with redundant or low-salience chunks (“context stuffing”).</li>
            <li>Ignoring deduplication and normalization → diluted signals and higher cost.</li>
            <li>Using stale content due to missing freshness policies or cache invalidation.</li>
            <li>Uncalibrated scores; heavy reliance on a single similarity metric.</li>
            <li>No provenance or citations; harder to audit, recover, or debug hallucinations.</li>
            <li>Unbounded token growth without strict per-source caps and global budgets.</li>
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
            'Multi-source fusion with calibrated relevance/quality/freshness weighting',
            'Budgeted token allocation and ordering policy',
            'Semantic deduplication, normalization, and compression',
            'Adaptive assembly with utilization feedback during generation',
            'Caching, prewarming, and freshness-aware invalidation',
            'Provenance, citations, and explainable assembly rationale',
            'Compliance and safety filtering pre/post assembly'
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
            <li>Relevance coverage and answer quality vs. evaluator/oracle.</li>
            <li>Source utilization efficiency and marginal benefit per token.</li>
            <li>Novelty/diversity score; reduction in redundancy.</li>
            <li>Token efficiency (quality per 1K tokens) and total cost per answer.</li>
            <li>Latency overhead of assembly (P50/P95) and generation completion rate.</li>
            <li>Hallucination rate and citation accuracy/consistency.</li>
            <li>Freshness adherence and SLA compliance for time-sensitive queries.</li>
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
            <li>Total ≈ query analysis + scoring + retrieval + assembled context + generation.</li>
            <li>Use small, fast models for scoring/reranking; reserve large models for generation.</li>
            <li>Set strict per-source caps and global budgets; prefer compression over dropping sources.</li>
            <li>Exploit caching and prefetch for hot queries; stream retrieval to overlap with scoring.</li>
            <li>Prefer rerankers to reduce k before assembly; adjust chunk size for salience density.</li>
            <li>Throttle concurrency and apply backpressure; avoid explosive fan-out across sources.</li>
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
            <li>Multi-domain question answering and enterprise knowledge synthesis.</li>
            <li>Research assistants comparing papers, standards, and reports across sources.</li>
            <li>Analyst copilots needing balanced evidence and citations.</li>
            <li>Customer support with product docs, tickets, and policy KBs.</li>
            <li>Compliance/policy answering requiring provenance and freshness.</li>
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
              <li>Retrieval-Augmented Generation (Lewis et al., 2020)</li>
              <li>Self-RAG and feedback-aware retrieval (Asai et al., 2023)</li>
              <li>HyDE: Hypothetical Document Embeddings (Gao et al., 2022)</li>
              <li>Fusion-in-Decoder and reranking techniques for open-domain QA</li>
              <li>Mixture-of-Experts routing and gating for conditional computation</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Multi-source RAG orchestration and context assembly patterns</li>
              <li>LangGraph/LangChain routing + RAG pipelines with rerankers</li>
              <li>LlamaIndex QueryEngine + Node PostProcessors for compression</li>
              <li>DSPy pipelines with retrieval, rerank, and adaptive prompting</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>LangGraph, LangChain, LlamaIndex, DSPy, Haystack</li>
              <li>Vector DBs: FAISS, Pinecone, Weaviate, Milvus, Vectara</li>
              <li>Rerankers: Cohere Rerank, ColBERT, cross-encoders</li>
              <li>Compression: token/semantic compressors and TL;DR summarizers</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
            <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>RAG surveys and best practices (2023–2025)</li>
              <li>LlamaIndex and LangChain community forums</li>
              <li>LLM ops groups on evaluation, routing, and context optimization</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};