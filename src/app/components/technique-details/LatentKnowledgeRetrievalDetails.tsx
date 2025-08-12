'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const LatentKnowledgeRetrievalDetails = () => {
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
            Retrieve and synthesize knowledge by navigating latent semantic space rather than literal keywords.
            The system abstracts the user query into concepts/patterns, generates hypothetical expansions
            (e.g., HyDE), performs dense and hybrid retrieval, re-ranks with cross-encoders, and grounds the
            final answer with citations. Tree/cluster structures (e.g., RAPTOR) improve recall and reasoning.
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
            <li>Parse intent and abstract patterns (entities, relations, mechanisms, constraints).</li>
            <li>Query expansion: generate hypothetical document(s) to guide retrieval (HyDE).</li>
            <li>Embed queries/expansions; run dense vector retrieval with hybrid filters (term/metadata).</li>
            <li>Re-rank top candidates with cross-encoder rerankers (e.g., Cohere Rerank, monoT5).</li>
            <li>Diversify with MMR/DR and multi-vector/late-interaction models (e.g., ColBERT).</li>
            <li>Assemble and compress context; cite sources; optionally structure via RAPTOR-style trees.</li>
            <li>Generate answer grounded in retrieved evidence; validate and de-duplicate claims.</li>
            <li>Log citations, scores, and traces; update caches and freshness indexes.</li>
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
            'Chunk on semantic boundaries with overlap; keep stable IDs and provenance for citations.',
            'Pick embedding models validated on MTEB for your domain; version and re-embed on upgrades.',
            'Use hybrid search (BM25 + vector + metadata filters) to improve precision on entities and codes.',
            'Always add cross-encoder re-ranking for top-k; tune k for latency vs. quality.',
            'Control redundancy with MMR/diversity; consolidate duplicates before prompting.',
            'Ground answers with inline citations; enforce citation correctness checks.',
            'Continuously evaluate: precision/recall@k, NDCG/MRR, grounded-answer rate, hallucination rate.',
            'Cache hot queries and embeddings; set TTLs and freshness policies for time-sensitive data.',
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
            <li>Very small, static corpora where curated prompts or rules outperform retrieval overhead.</li>
            <li>Ultra low-latency paths that cannot afford embedding, ANN, and re-ranker costs.</li>
            <li>Tasks without verifiable ground truth or where citations are mandatory but unavailable.</li>
            <li>Highly sensitive data without encryption, access controls, and robust governance.</li>
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
            <li>Poor chunking and missing metadata → low recall and brittle citations.</li>
            <li>Embedding drift/mismatch across services; unversioned models.</li>
            <li>Skipping re-ranking; relying solely on ANN similarity scores.</li>
            <li>Over-retrieval inflating tokens; no MMR/diversification or consolidation.</li>
            <li>Ignoring freshness; serving stale content for time-sensitive queries.</li>
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
            'Hypothetical document expansion (HyDE) and query rewriting',
            'Dense + hybrid retrieval with metadata filters',
            'Cross-encoder re-ranking and calibration',
            'Multi-vector/late-interaction retrieval (e.g., ColBERT)',
            'Tree/cluster retrieval and synthesis (e.g., RAPTOR)',
            'Citation tracking and provenance preservation',
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
            <li>Precision/Recall@k, MRR/NDCG; coverage and diversity scores.</li>
            <li>Grounded answer rate; citation correctness and uniqueness.</li>
            <li>Hallucination rate reduction vs. no-retrieval baseline.</li>
            <li>Latency p50/p95 and cost per answer; cache hit rates.</li>
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
            <li>Embedding cost per chunk/query; batch where possible; reuse cached embeddings.</li>
            <li>ANN index/query compute (HNSW/IVF parameters) and re-ranker inference cost.</li>
            <li>Context assembly and summarization tokens; enforce budgets and compression.</li>
            <li>Storage for vectors + metadata; background jobs for re-embed/re-index.</li>
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
            <li>Research assistants and literature review with grounded synthesis.</li>
            <li>Support/KB Q&A and product documentation with citations.</li>
            <li>Code/architecture search and cross-repo reasoning.</li>
            <li>Compliance, audit, and safety reviews requiring traceable evidence.</li>
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
              <li><a href="https://arxiv.org/abs/2002.08909" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">REALM: Retrieval-Augmented LM Pre-Training (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04906" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dense Passage Retrieval (DPR) — Karpukhin et al. (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAG: Retrieval-Augmented Generation — Lewis et al. (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2110.08727" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ColBERTv2: Effective and Efficient Retrieval (2021/2022)</a></li>
              <li><a href="https://arxiv.org/abs/2212.10496" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HyDE: Hypothetical Document Embeddings (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2310.11511" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-RAG: Retrieve, Generate, and Critique (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2401.18059" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAPTOR: Tree-Organized Retrieval (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAG Survey (2023/2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/use_cases/question_answering/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: RAG guides</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: RAG/retrieval docs</a></li>
              <li><a href="https://www.pinecone.io/learn/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Pinecone Learn: RAG best practices</a></li>
              <li><a href="https://docs.cohere.com/docs/rerank" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cohere Rerank docs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://faiss.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FAISS</a>, <a href="https://milvus.io/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus</a>, <a href="https://weaviate.io/developers" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate</a>, <a href="https://qdrant.tech/documentation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Qdrant</a>, <a href="https://lancedb.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LanceDB</a></li>
              <li><a href="https://www.sbert.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sentence-Transformers</a>, <a href="https://arxiv.org/abs/2308.03281" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">E5 embeddings</a>, <a href="https://huggingface.co/spaces/mteb/leaderboard" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MTEB leaderboard</a></li>
              <li>LangChain, LlamaIndex, Haystack; ColBERT implementations; Cohere Rerank.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.weaviate.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate Forum</a>, <a href="https://discuss.milvus.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Milvus Community</a>, <a href="https://github.com/qdrant/qdrant/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Qdrant Discussions</a></li>
              <li><a href="https://aclanthology.org/volumes/2024.knowledgenlp-1/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ACL Workshop: Knowledge-Augmented Methods (2024)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
