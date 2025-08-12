'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ChainOfVerificationRagDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Chain-of-Verification RAG generates factual claims, then subjects them to systematic verification via
            independent retrieval and critique loops. Each claim is fact-checked against authoritative sources,
            contradictions flagged, and the final answer grounded only on verified statements with citations.
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
            <li>Generate initial answer: produce a response with specific, factual claims.</li>
            <li>Extract verifiable statements: identify atomic claims (facts, numbers, dates, entities).</li>
            <li>Independent verification: for each claim, retrieve supporting evidence via keyword/semantic search.</li>
            <li>Cross‑reference and critique: check consistency across sources, flag contradictions or missing evidence.</li>
            <li>Update and re‑rank: revise/remove unsupported claims; strengthen supported ones with citations.</li>
            <li>Final synthesis: produce verified answer with confidence scores and source attributions.</li>
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
            'Start with baseline question answering to identify claims that need verification.',
            'Use claim decomposition: break complex statements into atomic, verifiable facts.',
            'Design verification queries to be specific and keyword‑rich for precise retrieval.',
            'Implement cross‑source consistency checks and flag conflicting evidence.',
            'Apply confidence thresholds: only include verified claims above a certainty threshold.',
            'Cache verification results to avoid re‑checking identical claims.',
            'Instrument with claim‑level evaluation to measure verification accuracy and coverage.',
            'Balance thoroughness with latency: cap verification rounds and fallback to partial answers.',
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
            <li>Simple queries with mostly subjective or opinion‑based content that doesn't need fact verification.</li>
            <li>Real‑time applications with tight latency constraints where verification loops are too expensive.</li>
            <li>Domains with sparse/unreliable sources where fact‑checking is impractical.</li>
            <li>High‑trust scenarios where the base model's accuracy is already sufficient and verified.</li>
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
            <li>Over‑verification: checking obvious or low‑risk claims where verification overhead isn't justified.</li>
            <li>Claim extraction errors: missing subtle but important factual assertions.</li>
            <li>Inconsistent verification criteria leading to false positives/negatives.</li>
            <li>Citation gaps: verified claims without proper source attribution for auditability.</li>
            <li>Loop infinities: endless verification cycles without convergence criteria.</li>
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
            'Retrieval necessity prediction (gating)',
            'Critique tokens for faithfulness and sufficiency scoring',
            'Conditional re-retrieval and query refinement',
            'Citation enforcement and evidence attribution',
            'Confidence calibration and abstention fallback',
            'Hybrid retrieval with reranking and compression',
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
            <li>Faithfulness and answer relevancy (e.g., RAGAS) and citation coverage.</li>
            <li>Context precision/recall after reranking; hallucination rate.</li>
            <li>Latency p50/p95 and cost per answer; reflection cycle counts.</li>
            <li>Abstention/deferral rate when confidence is low.</li>
            <li>Correction rate: proportion of answers improved after critique.</li>
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
            <li>Extra tokens from retrieved passages, critique prompts, and potential re-generation.</li>
            <li>Mitigate with retrieval gating, aggressive reranking/compression, semantic caching.</li>
            <li>Cap reflection iterations; early-exit on high confidence.</li>
            <li>Monitor per-request token budgets and apply dynamic k for retrieval.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>High-accuracy QA and fact verification with citations.</li>
            <li>Regulated domains (medical, legal, finance) needing grounded outputs.</li>
            <li>Research assistants that cross-reference and self-check claims.</li>
            <li>Enterprise knowledge assistants over evolving corpora.</li>
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
              <li><a href="https://arxiv.org/abs/2310.11511" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (Asai et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2312.10997" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval-Augmented Generation for Large Language Models: A Survey (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2401.05856" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Seven Failure Points When Engineering a RAG System (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Cookbook: RAG and evaluation patterns</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: RAG pipelines, rerankers, evaluators</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Retrieval, reranking, evaluation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.pinecone.io/learn/series/rag/ragas/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAGAS: Faithfulness/relevancy metrics</a></li>
              <li><a href="https://cohere.com/rerank" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cohere Rerank / other cross-encoders</a></li>
              <li><a href="https://www.trychroma.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chroma / pgvector / FAISS for vector search</a></li>
              <li><a href="https://haystack.deepset.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Haystack</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://thenewstack.io/a-blueprint-for-implementing-rag-at-scale/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Blueprints for RAG at scale</a></li>
              <li><a href="https://github.com/olegovsyannikov/rag-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAG Patterns (curated)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};