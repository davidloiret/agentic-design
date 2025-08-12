'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const LatentMemoryNetworks = () => {
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
            Shared latent memory for agents: knowledge and reasoning patterns are encoded as dense vectors in a
            common semantic space. Agents write summaries, facts, and patterns with metadata; retrieval uses
            similarity search and hybrid filters to assemble relevant context for downstream reasoning. Memory
            consolidates over time via deduplication, clustering, and schema-preserving summaries to reduce
            redundancy and drift.
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
            <li>Ingest: chunk artifacts (text/code/events) with stable IDs; attach provenance and timestamps.</li>
            <li>Embed: generate embeddings with a consistent model/version; normalize and store vectors + metadata.</li>
            <li>Index: build ANN index (e.g., HNSW/IVF/ScaNN) with filters over namespaces/agents/types.</li>
            <li>Retrieve: query by semantic vector + keyword/struct filters; re-rank and diversify top-k.</li>
            <li>Assemble: compress/summarize retrieved items into LLM-ready context with citations.</li>
            <li>Write-back: persist new insights as atomic memory entries; avoid duplicating near-identical content.</li>
            <li>Consolidate: schedule dedup, clustering, drift checks, and long-term summaries with TTL/pinning.</li>
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
            'Use a single, versioned embedding model across agents; re-embed on model upgrades with canaries.',
            'Chunk with semantic boundaries and overlap; store canonical IDs to deduplicate.',
            'Hybrid retrieval (vector + keyword + metadata) and MMR/DR to improve relevance and diversity.',
            'Add strict schemas: type, agent, task, source URI, timestamp, version, and PII flags.',
            'Tune ANN parameters (HNSW M/ef, IVF nlist/nprobe) for p95 latency vs. recall; cache hot queries.',
            'Periodic consolidation: near-duplicate removal, cluster summaries, and topic schemas.',
            'Safety and privacy: redact PII, scope namespaces per tenant/agent, and enforce access policies.',
            'Evaluate retrieval with labeled queries; track precision/recall@k and citation correctness.',
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
            <li>Tasks solvable from model prior with acceptable quality and strict latency/cost constraints.</li>
            <li>Domains requiring fully symbolic, auditable reasoning with minimal latent representation.</li>
            <li>Highly regulated or sensitive data without strong governance, redaction, and isolation.</li>
            <li>Very small, static knowledge where a curated prompt/template outperforms retrieval overhead.</li>
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
            <li>Embedding mismatch/drift across agents leading to poor cross-agent retrieval.</li>
            <li>Index bloat from duplicate or overly granular chunks; no TTL or consolidation policy.</li>
            <li>Over-retrieval causing token blowups; missing summarization/quotas and MMR.</li>
            <li>Unlabeled data lacking provenance/citations; weak evals hide regressions.</li>
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
            'Shared latent space across agents with namespace and capability scoping',
            'Semantic similarity search with hybrid filters and re-ranking',
            'Dynamic consolidation (deduplication, clustering, long-term summaries)',
            'Provenance, citations, and schema-enforced metadata',
            'Online updates and background re-embedding/version migrations',
            'Optional hybrid dense+keyword retrieval for precision on entities/codes',
            'Support for cross-domain transfer via cluster-aware sampling',
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
            <li>Retrieval precision/recall@k, MRR/NDCG; citation correctness rate.</li>
            <li>Task success uplift vs. no-memory baseline; judge/win rate on eval sets.</li>
            <li>Latency p50/p95 for embed/store/retrieve; memory hit rate and dedup ratio.</li>
            <li>Storage growth vs. unique concepts; re-embedding backlog and drift metrics.</li>
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
            <li>Embedding cost per chunk (batch where possible); cache embeddings for unchanged artifacts.</li>
            <li>ANN query compute scales with ef/nprobe; tune k and apply filters to reduce candidates.</li>
            <li>Summarization tokens for write-backs and consolidation; enforce context budgets.</li>
            <li>Background jobs (dedup/re-embed) consume CPU/GPU; schedule off peak with quotas.</li>
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
            <li>Multi-agent research/analysis assistants with cross-agent knowledge sharing.</li>
            <li>Code intelligence and architectural memory across services and teams.</li>
            <li>Customer support/product QA with evolving knowledge and citations.</li>
            <li>Long-running projects that benefit from cumulative, consolidated reasoning patterns.</li>
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
              <li><a href="https://arxiv.org/abs/1410.3916" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Memory Networks — Weston et al. (2014/2015)</a></li>
              <li><a href="https://arxiv.org/abs/1410.5401" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Neural Turing Machines — Graves et al. (2014)</a></li>
              <li><a href="https://www.nature.com/articles/nature20101" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Differentiable Neural Computers — Graves et al. (2016)</a></li>
              <li><a href="https://arxiv.org/abs/2004.06007" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">kNN-LM: Generalization Through Memorization (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04906" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dense Passage Retrieval (DPR) — Karpukhin et al. (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAG: Retrieval-Augmented Generation — Lewis et al. (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2310.08560" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MemGPT: Towards LLMs with Long-Term Memory (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://faiss.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FAISS documentation</a></li>
              <li><a href="https://milvus.io/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus docs</a></li>
              <li><a href="https://weaviate.io/developers" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate developer docs</a></li>
              <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Qdrant documentation</a></li>
              <li><a href="https://python.langchain.com/docs/use_cases/question_answering/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain RAG/memory guides</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex memory/RAG guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>FAISS, ScaNN, Annoy, Milvus, Weaviate, Qdrant, LanceDB</li>
              <li>Sentence-Transformers, OpenAI/Cohere embeddings</li>
              <li>LangChain, LlamaIndex, Haystack</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.weaviate.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate Forum</a></li>
              <li><a href="https://discuss.milvus.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus Community</a></li>
              <li><a href="https://github.com/qdrant/qdrant/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Qdrant Discussions</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};