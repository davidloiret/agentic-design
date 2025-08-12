'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ContextCompressionAdvancedDetails = () => {
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
            Advanced Context Compression (ACC) reduces tokens while preserving task-critical semantics via query-aware selection, hybrid extractive+abstractive summarization, and adaptive policies. It prioritizes globally relevant concepts and locally critical spans (numbers, identifiers, citations), enabling longer-context reasoning, lower latency, and lower cost without materially degrading answer quality.
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
            <li>Query and context analysis: detect task intent; tag atomic spans to preserve (figures, code, ids).</li>
            <li>Retrieval and ranking (RAG): fetch candidates; score with embedding/rerankers and query-aware signals.</li>
            <li>Compression policy selection: choose extractive, abstractive, or hybrid based on input length, redundancy, and risk.</li>
            <li>Apply compression: prune redundant chunks, deduplicate, summarize hierarchically; keep critical spans verbatim.</li>
            <li>Assemble prompt: interleave compressed evidence with citations/anchors; include short provenance.</li>
            <li>Quality gating: run lightweight checks (answerability probes, coverage heuristics) and re-compress if needed.</li>
            <li>Evaluate and log: track token savings, latency, and answer quality for continuous policy tuning.</li>
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
            'Use query-aware compression; condition summaries on the actual question rather than generic distillation.',
            'Preserve atomic data verbatim (numbers, code, API parameters, citations) to avoid semantic drift.',
            'Prefer two-stage pipelines: extract relevant spans first, then generate concise summaries over them.',
            'Tune adaptive compression ratios with quality gates (fallback to less compression if coverage drops).',
            'Compress after retrieval in RAG, not before; never compress the query itself in ways that change intent.',
            'Instrument offline and online evals; keep a no-compression control to detect regressions.',
            'Maintain provenance (doc ids/anchors) so answers can be validated and audited.',
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
            <li>Inputs already fit comfortably within the model window.</li>
            <li>Tasks requiring verbatim fidelity (legal contracts, code diffs, compliance text).</li>
            <li>Ultra-low-latency paths where compression overhead outweighs token savings.</li>
            <li>Poor retrieval quality (garbage in, garbage out) where compression hides retrieval issues.</li>
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
            <li>Ignoring query intent, leading to irrelevant but concise context.</li>
            <li>Lack of provenance, making answers unverifiable.</li>
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
            'Hybrid extractive + abstractive compression',
            'Query-aware relevance and retention scoring',
            'Adaptive, quality-gated compression ratios',
            'Hierarchical summarization (doc → section → span)',
            'Deduplication and cross-document overlap removal',
            'Preservation of atomic spans (figures, code, ids)',
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
            <li>Token reduction ratio and cost per query savings.</li>
            <li>Answer quality delta vs. no-compression baseline (accuracy/F1/ROUGE where applicable).</li>
            <li>Latency p50/p95 improvement and throughput uplift.</li>
            <li>Coverage/recall of critical facts and reference integrity.</li>
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
            <li>Aim for 40–80% token reduction with negligible quality loss; auto-relax when quality gates fail.</li>
            <li>Account for compression compute cost; batch and cache compression for hot content.</li>
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