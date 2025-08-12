'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const CorrectiveRagDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Corrective RAG (CRAG) augments standard RAG with an explicit retrieval quality evaluator and corrective actions. Given a query, CRAG retrieves candidate documents, scores their relevance/quality, and takes one of three actions: use-and-refine high-confidence context, discard-and-retrieve-again (often via broader/web search) for low confidence, or blend refined context with supplemental search for medium confidence. This reduces hallucinations by ensuring generation is grounded in vetted, up-to-date evidence.
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
            <li>Initial retrieval: fetch top-N candidates (dense/sparse/hybrid) and optionally rerank.</li>
            <li>Evaluate retrieval: score relevance, timeliness, source reliability; assign confidence band (high/medium/low).</li>
            <li>Corrective action:
              <ul className="list-disc list-inside ml-5 space-y-1">
                <li>High: refine with deduplication and knowledge refinement (decompose-then-recompose) and proceed.</li>
                <li>Medium: refine and supplement via targeted web search or alternative index.</li>
                <li>Low: discard and re-retrieve with query rewrite, filters, or broader source set.</li>
              </ul>
            </li>
            <li>Grounded generation: produce answer with citations and calibrated confidence.</li>
            <li>Optional verification: lightweight faithfulness/groundedness check; loop if thresholds unmet.</li>
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
            'Use retrieval-evaluator gating with explicit thresholds; log confidence and chosen action.',
            'Apply strong rerankers and aggressive deduplication; restrict to evidence spans to cut noise.',
            'Constrain query rewrites with guardrails to avoid topic drift during re-retrieval.',
            'Time-filter sources and encode freshness requirements for dynamic domains.',
            'Require citation support for factual claims; surface provenance to users.',
            'Cache retrieval and evaluator outputs; share across similar queries to reduce cost/latency.',
            'Add abstention/deferral when confidence remains low after corrections.',
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
            <li>Hard real-time paths with strict SLOs; evaluator and re-retrieval loops add latency.</li>
            <li>Closed-book tasks where the base model reliably answers without external context.</li>
            <li>Homogeneous, high-quality corpora with consistently high recall/precision already.</li>
            <li>Environments prohibiting external/web access (compliance) without approved mirrors.</li>
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
            <li>Evaluator drift or miscalibration causing over/under-correction.</li>
            <li>Query drift during rewrites; answers become off-topic.</li>
            <li>Unbounded cost from repeated web searches and long contexts.</li>
            <li>Combining outdated with fresh sources without temporal reconciliation.</li>
            <li>Weak provenance—users can’t verify claims; trust erodes.</li>
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
            'Retrieval quality evaluation with confidence bands',
            'Corrective re-retrieval and targeted web supplementation',
            'Knowledge refinement: decompose-then-recompose evidence',
            'Reranking, deduplication, and noise filtering',
            'Grounded generation with citations and confidence',
            'Optional post-generation verification/abstention',
          ].map((f) => (
            <div key={f} className="p-3 bg-gray-800/40 rounded-lg border border-gray-700/40">
              <span className="text-gray-300 text-sm">{f}</span>
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
            <li>Answer faithfulness/groundedness and hallucination rate (e.g., via LLM/Judge + spot-audit).</li>
            <li>Retrieval precision/recall@k and citation support rate.</li>
            <li>Evaluator calibration (ROC-AUC, ECE) and action distribution (use/blend/reretrieve).</li>
            <li>Latency budget by stage (retrieve, evaluate, correct, generate).</li>
            <li>Cost per query and token budget adherence.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Drivers: retrieval tokens (search + rerank), evaluator tokens, web search API calls, and larger context windows from refinement/blending.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Control with retrieval-necessity gating, reranker-first pruning, and evidence-span clipping.</li>
            <li>Cache retrieval/evaluator outputs; memoize query rewrites.</li>
            <li>Use compression (summaries, embeddings) before generation.</li>
            <li>Enforce max loops and strict timeouts for corrective steps.</li>
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
            <li>Regulated Q&A (legal, medical, finance) where provenance and accuracy are critical.</li>
            <li>Rapidly changing domains (policies, pricing, product docs, security advisories).</li>
            <li>Noisy or heterogeneous knowledge bases; long-tail or ambiguous queries.</li>
            <li>Research assistants requiring source blending and freshness controls.</li>
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
              <li><a href="https://arxiv.org/abs/2401.15884" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Corrective Retrieval‑Augmented Generation (Yan et al., 2024)</a></li>
              <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Retrieval‑Augmented Generation (RAG) (Lewis et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2310.11511" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self‑RAG (Shinn et al., 2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.llamaindex.ai/en/stable/examples/workflow/corrective_rag_pack/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Corrective RAG workflow</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex (RAG components, evaluators, web search)</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain (retrievers, rerankers, evaluators)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: RAG and evaluation threads</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};