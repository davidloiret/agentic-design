'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ConversationalRagDetails = () => {
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
            Conversational RAG fuses multi-turn dialogue understanding with retrieval. The system reformulates the
            current user turn using conversation history, retrieves evidence from internal/external sources (hybrid
            lexical+dense), optionally reranks and compresses, then generates a grounded response with citations—while
            updating conversation state and memory for subsequent turns.
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
            <li>Ingestion & indexing: parse, chunk (semantic), embed; build hybrid indexes with metadata/ACLs.</li>
            <li>Turn understanding: resolve coreference, summarize history, and classify intent/domain/freshness needs.</li>
            <li>Query rewrite: generate focused query variants (decontextualization, expansion) with guardrails.</li>
            <li>Retrieval: hybrid search + filters (source/time/permission); rerank with cross-encoder or LLM reranker.</li>
            <li>Context assembly: deduplicate, compress (extractive spans/summaries), attach provenance.</li>
            <li>Generation: instruct model to answer strictly from context; include citations and calibrated uncertainty.</li>
            <li>Memory update: persist salient facts/preferences; decay or pin as needed for future turns.</li>
            <li>Observation: log traces, costs, metrics; cache hot queries and packed contexts.</li>
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
            'Use hybrid retrieval (BM25/keyword + embeddings) and a strong reranker; cap candidates before rerank.',
            'Apply conversational query rewriting (CQR) with history; decontextualize to reduce ambiguity.',
            'Require citations for factual claims; prefer extractive quotes and page anchors over long summaries.',
            'Bound context size with compression (salient spans, answer-focused summaries) and deduplication.',
            'Handle uncertainty explicitly: abstain or ask clarifying questions when evidence is insufficient.',
            'Implement temporal/source filters for freshness and authority; avoid user-provided links without verification.',
            'Cache embeddings, retrieval results, and packed contexts; leverage per-user/session caches.',
            'Continuously evaluate by slice (domain, turn depth) and regressions; maintain ablations for each component.'
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
            <li>Simple FAQs where model-only or static retrieval meets quality/latency/cost requirements.</li>
            <li>Strict real-time constraints that cannot accommodate retrieval/reranking latency.</li>
            <li>Domains with minimal or unreliable external knowledge; or prohibitive data governance constraints.</li>
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
            <li>Ignoring history in retrieval → answers miss prior constraints or preferences.</li>
            <li>Unbounded top_k and no reranking → noisy context, lower faithfulness, token blowups.</li>
            <li>Weak provenance: missing citations or unverifiable sources reduce trust.</li>
            <li>Over-rewriting queries causing topic drift; lack of guardrails for reformulation.</li>
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
            'Multi-turn context tracking and coreference resolution',
            'Conversational query rewriting and expansion',
            'Hybrid retrieval with reranking and deduplication',
            'Answer-focused compression with citations and anchors',
            'Session memory (salient facts, preferences) with decay',
            'Configurable freshness/authority filters and safety policies'
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
            <li>Answer faithfulness and citation correctness; groundedness scores (e.g., RAGAS, human evals).</li>
            <li>Retrieval recall@k and reranker MRR/NDCG; context precision and duplication rate.</li>
            <li>Conversation quality: resolution rate, clarification rate, turn count to resolution, CSAT.</li>
            <li>Efficiency: p50/p95 latency, tokens per answer, cost per session, cache hit rate.</li>
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
            <li>Cap retrieval depth and rerank to small k (e.g., 50 → rerank → 5–10); prefer late fusion over large k.</li>
            <li>Compress with extractive spans and map-reduce summaries; pack within strict budgets per turn.</li>
            <li>Cache embeddings, retrieval results, reranks, and packed contexts; reuse across turns in session.</li>
            <li>Separate budgets for rewrite, retrieval, and answer; monitor per-stage token and cost telemetry.</li>
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
            <li>Customer support copilots that must track history, policies, and account context.</li>
            <li>Research/tutoring assistants that progressively refine topics across turns with citations.</li>
            <li>Enterprise knowledge assistants requiring provenance, permissions, and freshness.</li>
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
              <li><a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval-Augmented Generation for LLMs: A Survey (2023/2024)</a></li>
              <li><a href="https://arxiv.org/abs/2104.07567" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval Augmentation Reduces Hallucination in Conversation (2021)</a></li>
              <li><a href="https://arxiv.org/abs/2310.11511" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-RAG: Retrieve, Generate, Critique via Self-Reflection (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2401.05856" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Seven Failure Points When Engineering a RAG System (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://learn.microsoft.com/azure/developer/ai/advanced-retrieval-augmented-generation" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Learn: Advanced RAG systems</a></li>
              <li><a href="https://haystack.deepset.ai/cookbook/conversational_rag_using_memory" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Haystack Cookbook: Conversational RAG using memory</a></li>
              <li><a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Cookbook: RAG and evaluation patterns</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Docs: Conversational RAG, rerankers, evaluators</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Docs: Conversational retrieval chains</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cohere.com/rerank" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cohere Rerank (cross-encoder)</a></li>
              <li><a href="https://www.pinecone.io/learn/series/rag/ragas/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAGAS: RAG evaluation metrics</a></li>
              <li><a href="https://weaviate.io/developers" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate: Hybrid search & rerank</a></li>
              <li><a href="https://www.elastic.co/blog/beyond-rag-basics" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Elastic: Beyond RAG basics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a></li>
              <li><a href="https://www.pinecone.io/learn/advanced-rag-techniques/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Pinecone: Advanced RAG techniques</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};