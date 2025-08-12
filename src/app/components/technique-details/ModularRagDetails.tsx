'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ModularRagDetails = () => {
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
            Modular RAG decomposes retrieval‑augmented generation into interchangeable components—query understanding,
            retrieval, fusion/reranking, filtering/policy, context assembly, generation, and verification—wired by an
            orchestration layer. Each module exposes stable interfaces so teams can swap strategies (e.g., dense/sparse/hybrid
            retrievers, different rerankers, compression strategies, or verifiers) and route dynamically based on query
            characteristics, policies, and live telemetry.
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
            <li>Ingestion & indexing: chunking, metadata/ACLs, embeddings; build BM25/vector/hybrid indexes.</li>
            <li>Query analysis: detect intent/domain; optionally reformulate/expand; choose route and budget.</li>
            <li>Retrieval: run chosen retriever(s) (dense, sparse, hybrid, graph, API tools) to gather candidates.</li>
            <li>Fusion & reranking: merge candidates (e.g., RRF) and rerank with cross‑encoder or LLM reranker.</li>
            <li>Filtering & policy: deduplicate, enforce recency/authority/permissions and safety constraints.</li>
            <li>Context assembly: compress/summarize; structure with citations; pack within token budget.</li>
            <li>Generation: prompt the LLM with query + curated context; format outputs (Q&A, steps, JSON).</li>
            <li>Verification: critique/self‑check/CoVe; citation checks; optional retrieval‑to‑generation loop.</li>
            <li>Feedback & logging: capture traces, costs, metrics; learn routing/ranking policies over time.</li>
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
            'Define clear, typed interfaces for modules (request/response schemas, metadata, provenance).',
            'Make routing/config data‑driven (feature flags, YAML/JSON configs) and version every change.',
            'Evaluate modules independently and end‑to‑end (retriever recall, reranker MRR/NDCG, answer faithfulness).',
            'Adopt reranking and late‑fusion to balance recall and precision; cap k at each stage.',
            'Compress context (map‑reduce, selective quotes, extractive spans) and always include citations.',
            'Introduce guardrails: permissions, PII redaction, safety/brand filters, and policy‑based routing.',
            'Budget control: per‑stage token/latency/cost guards with early‑exit and fallbacks.',
            'Observability: structured traces per module with IDs, latency, cost, and cache hits.',
            'Continuous evaluation with regression suites and canary A/Bs before broad rollouts.',
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
            <li>Simple FAQ or narrow domains where a single, fixed RAG flow already meets quality/latency/cost.</li>
            <li>Severe latency or cost constraints that cannot accommodate routing, reranking, and verification.</li>
            <li>Teams without bandwidth to operate/evaluate multiple components and configurations.</li>
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
            <li>Interface drift and hidden coupling between modules, breaking swapability.</li>
            <li>Unbounded k and cascading modules leading to token/latency/cost blowups.</li>
            <li>Weak provenance or missing citations → low trust and unverifiable outputs.</li>
            <li>Over‑engineering for simple tasks; lack of baselines and ablations.</li>
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
            'Interchangeable retrievers (dense, sparse, hybrid, graph, tool‑augmented)',
            'Learned or rules‑based routers and query reformulators',
            'Cross‑encoder/LLM rerankers and fusion (e.g., RRF) for precision',
            'Compression and packing (extractive spans, summarization, citation‑aware)',
            'Policy and safety filters with ACLs and provenance',
            'Config‑driven orchestration with tracing and A/B harness',
            'Feedback‑driven adaptation and continuous evaluation',
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
            <li>Answer accuracy/faithfulness with citation correctness; human win‑rate vs. baseline RAG.</li>
            <li>Retriever recall@k and reranker MRR/NDCG; context precision and duplication rate.</li>
            <li>Latency p50/p95 and cost per query; cache hit rate; fallback rate and guardrail violations.</li>
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
            <li>Set per‑module budgets (retrieval k, rerank depth, max packed tokens) and enforce early‑exit.</li>
            <li>Prefer late‑fusion + reranking over massive k; cache hot queries, embeddings, and packed contexts.</li>
            <li>Use compression (extractive quotes, map‑reduce summaries) and structured context with citations.</li>
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
            <li>Enterprise knowledge assistants spanning many sources, formats, and permission models.</li>
            <li>Platforms doing rapid A/B of retrievers/rerankers/routers and continuous improvement.</li>
            <li>Regulated domains needing provenance, policy enforcement, and configurable guardrails.</li>
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
              <li><a href="https://arxiv.org/abs/2407.21059" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Modular RAG: LEGO‑like Reconfigurable RAG Frameworks (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval‑Augmented Generation for LLMs: A Survey (2023/2024)</a></li>
              <li><a href="https://arxiv.org/abs/2405.13576" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashRAG: Modular Toolkit for Efficient RAG Research (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2408.11381" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAGLAB: Modular Unified Framework for RAG (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.haystack.deepset.ai/docs/pipelines" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Haystack 2: Pipelines and modular RAG</a></li>
              <li><a href="https://python.langchain.com/docs/expression_language/how_to/rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Composable RAG pipelines</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/understanding/rg/rag/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: RAG architecture and modules</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/Lightning-AI/FlashRAG" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashRAG</a></li>
              <li><a href="https://github.com/RUC-NLPIR/RAGLAB" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAGLAB</a></li>
              <li><a href="https://github.com/deepset-ai/haystack" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">deepset Haystack</a></li>
              <li><a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain</a></li>
              <li><a href="https://github.com/run-llama/llama_index" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://aws.amazon.com/blogs/publicsector/use-modular-architecture-for-flexible-and-extensible-rag-based-generative-ai-solutions/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS: Modular architecture for RAG solutions</a></li>
              <li><a href="https://alawiii.github.io/Rag-book/chapter5/modular-rag.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAG Book: Modular RAG overview</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};