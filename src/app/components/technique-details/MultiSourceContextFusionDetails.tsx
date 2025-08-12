'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MultiSourceContextFusionDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Fuses context from multiple heterogeneous sources (indexes, APIs, databases, agents) into a unified, high-quality
            evidence set using source-quality scoring, alignment/entity resolution, conflict resolution, and provenance‑aware
            packing—so generation is grounded in the most relevant, timely, and authoritative information.
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
            <li>Register sources and capabilities: indexes, APIs, tools, agent endpoints; define schemas and access policies.</li>
            <li>Retrieve/ingest per source with hybrid search or tool calls; capture metadata (recency, authority, permissions).</li>
            <li>Normalize + canonicalize: deduplicate near‑duplicates; unify schemas; perform entity resolution and ID mapping.</li>
            <li>Score candidates: relevance, recency, authority, consistency, and coverage; calibrate per‑source weights.</li>
            <li>Align + reconcile: map entities/claims across sources; detect contradictions and temporal ordering.</li>
            <li>Fuse results: use late/ensemble fusion (e.g., Reciprocal Rank Fusion) or learned aggregators with confidence weights.</li>
            <li>Resolve conflicts: apply policies (temporal precedence, source authority, majority/consensus, abstain/defer).</li>
            <li>Assemble context: compress and pack with citations, timestamps, and source attributions within token budgets.</li>
            <li>Generate + verify: produce answer; check faithfulness/groundedness; iterate if confidence or coverage is low.</li>
            <li>Log + evaluate: record per‑source contribution, costs, latency; run ablations to quantify fusion gains.</li>
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
            'Use hybrid retrieval (lexical + dense) per source; apply strong reranking and late fusion (e.g., RRF).',
            'Calibrate source weights with offline labels; incorporate dynamic signals (recency, authority, coverage).',
            'Perform aggressive deduplication and entity resolution to avoid double‑counting repeated facts.',
            'Enforce provenance: include citations, timestamps, and versioning; prefer authoritative, up‑to‑date sources.',
            'Reconcile temporally: prefer fresher data unless authoritative sources dictate otherwise; encode validity windows.',
            'Budget control: per‑source quotas (top_k), total token/cost caps, and early‑exit on high confidence.',
            'Guardrails: drop low‑quality or policy‑violating sources; honor ACLs/tenancy and data minimization.',
            'Evaluate by ablation: measure uplift vs best single source and vs no‑fusion baseline before production rollout.',
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
            <li>A single authoritative, fresh source already satisfies quality and SLOs.</li>
            <li>Hard real‑time paths with tight p95 latency where fusion overhead breaks budgets.</li>
            <li>Strict compliance regimes that prohibit cross‑source mixing or external augmentation.</li>
            <li>Sparse or highly conflicting sources without a viable resolution policy or human review.</li>
            <li>Severe cost constraints where additional sources do not measurably improve outcomes.</li>
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
            <li>Near‑duplicate inflation causing biased scores and repeated context.</li>
            <li>Over‑weighting popularity/recency signals → drift or stale claims overriding authoritative corrections.</li>
            <li>Ignoring permissions/tenancy; leaking restricted data into fused context or logs.</li>
            <li>No temporal reconciliation: mixing outdated and current facts without validity windows.</li>
            <li>Unbounded context packing leading to truncation and lost citations.</li>
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
            'Source quality weighting and dynamic scoring',
            'Cross‑source deduplication and entity resolution',
            'Conflict resolution policies (temporal, authority, consensus)',
            'Temporal reasoning and freshness controls',
            'Unified schema and provenance‑aware context packing',
            'Per‑source contribution telemetry and confidence',
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
            <li>Answer faithfulness/groundedness and citation coverage; contradiction rate.</li>
            <li>Fusion gain vs best single source and vs no‑fusion baseline (quality uplift).</li>
            <li>Redundancy/duplication rate after dedup; entity resolution precision/recall.</li>
            <li>Recency hit rate and freshness adherence; authority agreement rate.</li>
            <li>Latency p50/p95 and cost per answer; tokens packed per answer.</li>
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
            <li>Late/ensemble fusion to limit packing; prefer RRF/weighted votes over concatenating large contexts.</li>
            <li>Per‑source top_k and dynamic budgets; compress extractively with citations; sample by marginal gain.</li>
            <li>Cache per‑source retrieval/reranks; reuse across hops and related queries.</li>
            <li>Use lightweight models for scoring/evaluation; reserve strongest model for final synthesis.</li>
            <li>Stream results and early‑exit when confidence and coverage meet thresholds.</li>
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
            <li>Enterprise 360° customer view: CRM + support + analytics + communications.</li>
            <li>Compliance, finance, or risk where multiple authoritative sources must agree.</li>
            <li>Research synthesis combining papers, structured databases, and web sources with citations.</li>
            <li>Multi‑agent systems aggregating specialist outputs into a coherent, validated summary.</li>
            <li>Incident response and observability: logs + metrics + traces + tickets for rapid triage.</li>
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
              <li><a href="https://arxiv.org/abs/2007.01282" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Fusion‑in‑Decoder (FiD): Leveraging Passage Retrieval for Open‑Domain QA (2020/2021)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/1571941.1572114" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Reciprocal Rank Fusion outperforms Condorcet and individual rank learning (SIGIR 2009)</a></li>
              <li><a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval‑Augmented Generation for LLMs: A Survey (2023/2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/modules/data_connection/retrievers/ensemble_retriever/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Ensemble (fusion) retriever</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/module_guides/querying/retrievers/query_fusion/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Query/Fusion retrievers</a></li>
              <li><a href="https://docs.haystack.deepset.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Haystack 2: Pipelines and data fusion</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rrf-query.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Elasticsearch: Reciprocal Rank Fusion query</a></li>
              <li><a href="https://docs.vespa.ai/en/reference/rank-reciprocal-rank-fusion.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Vespa: RRF support</a></li>
              <li><a href="https://pyterrier.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTerrier: IR experimentation and fusion</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Retrieval and RAG fusion threads</a></li>
              <li><a href="https://www.pinecone.io/learn/advanced-rag-techniques/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Pinecone Learn: Advanced RAG/fusion techniques</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};