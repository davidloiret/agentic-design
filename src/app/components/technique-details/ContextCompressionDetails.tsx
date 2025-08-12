'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ContextCompressionDetails = () => {
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
            Context Compression reduces input tokens by distilling and encoding salient information while preserving
            task-critical semantics. Practical systems combine extractive pruning and abstractive summarization with
            query-aware selection to fit within model context windows, lowering latency and cost without materially
            degrading answer quality. Supports lossy, lossless, and hybrid strategies.
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
            <li>Analyze query and input to identify task intent and preservation constraints.</li>
            <li>Retrieve candidates (if using RAG) and score with embedding/reranking and query-aware signals.</li>
            <li>Select compression policy (lossy/lossless/hybrid) and target ratio based on risk and length.</li>
            <li>Apply compression: deduplicate, prune redundancy, and summarize hierarchically; keep atomic spans verbatim.</li>
            <li>Assemble prompt with compressed evidence, citations/anchors, and brief provenance.</li>
            <li>Run quality gates (coverage/answerability checks); relax compression if quality drops.</li>
            <li>Log metrics (tokens saved, latency, quality) for continuous tuning.</li>
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
            'Use query-aware compression; condition summaries on the actual question.',
            'Preserve atomic data verbatim (numbers, code, API parameters, citations).',
            'Prefer two-stage pipelines: extract relevant spans first, then summarize over them.',
            'Tune adaptive compression ratios with quality gates and safe fallbacks.',
            'Compress after retrieval in RAG; avoid mutating the user query intent.',
            'Instrument offline/online evals with a no-compression control.',
            'Maintain provenance (doc ids/anchors) for auditability and verification.',
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
            <li>Inputs already fit comfortably within the model context window.</li>
            <li>Tasks requiring verbatim fidelity (legal contracts, code diffs, compliance text).</li>
            <li>Ultra-low-latency paths where compression overhead outweighs savings.</li>
            <li>Low-quality retrieval where compression could hide upstream errors.</li>
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
            <li>Over-compression that drops key evidence or numeric details.</li>
            <li>Summarization drift that changes meaning or introduces hallucinations.</li>
            <li>Ignoring query intent, producing concise but irrelevant context.</li>
            <li>Missing provenance, making answers hard to verify.</li>
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
            'Lossy, lossless, and hybrid strategies',
            'Query-aware relevance and retention scoring',
            'Hierarchical summarization (doc → section → span)',
            'Deduplication and overlap removal',
            'Preservation of atomic spans (figures, code, identifiers)',
            'Provenance retention for auditability',
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
            <li>Token reduction ratio and cost-per-query savings.</li>
            <li>Answer quality delta vs. no-compression baseline (accuracy/F1/ROUGE where applicable).</li>
            <li>Latency p50/p95 improvement and throughput uplift.</li>
            <li>Coverage/recall of critical facts and citation integrity.</li>
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
            <li>Aim for 40–80% token reduction with negligible quality loss; auto-relax on gate failures.</li>
            <li>Account for compression compute; batch/cache for hot content and reuse summaries.</li>
            <li>Prefer lightweight extractive pruning before heavier abstractive summarization.</li>
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
            <li>Retrieval-Augmented Generation over large corpora.</li>
            <li>Long-document QA and synthesis (reports, papers, logs).</li>
            <li>Tool-using LLMs requiring concise API/manual snippets.</li>
            <li>Multi-agent systems sharing a constrained context budget.</li>
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
              <li><a href="https://arxiv.org/abs/2305.14788" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Adapting Language Models to Compress Contexts (Chevalier et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2307.06945" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">In-context Autoencoder for Context Compression (Ge et al., 2023)</a></li>
              <li><a href="https://aclanthology.org/2024.findings-acl.974/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Concise and Precise Context Compression for Tool-Using LMs (Findings of ACL 2024)</a></li>
              <li><a href="https://arxiv.org/abs/2409.01579" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AdaComp: Extractive Context Compression with Adaptive Predictor (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/modules/data_connection/retrievers/contextual_compression/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Contextual Compression Retriever</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/contextual_compression/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Contextual Compression</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/microsoft/LLMLingua" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLMLingua (prompt/context compression)</a></li>
              <li><a href="https://python.langchain.com/docs/modules/data_connection/retrievers/contextual_compression/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: ContextualCompressionRetriever</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex retrievers (context compression)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/MachineLearning discussions on context compression</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Discord</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};