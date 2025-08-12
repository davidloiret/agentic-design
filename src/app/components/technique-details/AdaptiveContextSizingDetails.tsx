'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AdaptiveContextSizingDetails = () => {
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
            Adjusts how much context the model consumes per task by selecting, compressing, and budgeting
            only the most relevant information. Combines retrieval→rerank→compress pipelines, adaptive-k
            selection, and token-level mechanisms (e.g., learned or dynamic attention spans, KV-cache
            selection) to balance quality with latency, token cost, and memory.
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
            <li>Assess task: estimate difficulty, novelty, and information needs from the query.</li>
            <li>Candidate context: retrieve passages/snippets; consider prior turns and cached artifacts.</li>
            <li>Adaptive selection: apply reranking and adaptive-k to choose how much to include.</li>
            <li>Compression: summarize/deduplicate; keep citations and salient spans within token budget.</li>
            <li>Assemble prompt: structure sections and provenance; respect hard token/latency budgets.</li>
            <li>Generate + monitor: track utilization (lost-in-the-middle, citations, attention concentration).</li>
            <li>Adapt/iterate: expand or contract context on uncertainty, evaluator failures, or gaps.</li>
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
            'Use rerankers (cross-encoders) before packing; avoid naive long-context stuffing.',
            'Apply adaptive-k: choose passages by score distribution rather than fixed k.',
            'Compress with salience-aware summaries; preserve key entities, numbers, and citations.',
            'Structure prompts with sections and provenance; mitigate "lost in the middle" by ordering.',
            'Tune chunk sizes/overlap by tokenizer; measure long-context effectiveness, not just window size.',
            'Log token budgets per stage; enforce hard caps and early-exit to protect p95 latency.',
            'Cache retrievals, summaries, and KV; deduplicate across turns/sessions.'
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
            <li>Uniform, simple queries where a fixed, short prompt meets quality and SLOs.</li>
            <li>Hard real-time paths where retrieval/rerank/compression overhead breaks latency budgets.</li>
            <li>Strictly deterministic/audited flows requiring fixed inputs and reproducibility.</li>
            <li>Very long contexts without reranking where models under-utilize middle tokens.</li>
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
            <li>Context stuffing without reranking → token blowups with marginal quality gains.</li>
            <li>Dropping provenance during compression → harder auditing and lower trust.</li>
            <li>Uncapped k/overlap; no early-exit → cost and latency spikes.</li>
            <li>Ignoring tokenizer/position effects → lost-in-the-middle and degraded utility.</li>
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
            'Adaptive-k passage selection and calibrated reranking',
            'Contextual compression with salience and citation preservation',
            'Token and latency budgeting with early-exit and fallbacks',
            'Attention/KV optimization (learned spans, token-level KV selection)',
            'Provenance-aware packing and ordering to reduce middle-token decay',
            'Observability: per-stage tokens, costs, and utilization metrics'
          ].map((f) => (
            <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">{f}</div>
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
            <li>Answer quality/evaluator pass vs. fixed-k baseline.</li>
            <li>Tokens and cost per successful answer; compression ratio vs. retention.</li>
            <li>Latency P50/P95; throughput under load; cache hit rates.</li>
            <li>Reranker MRR/NDCG; retrieval hit rate; citation accuracy.</li>
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
            <li>Total ≈ retrieval + rerank + compression + packed context + generation.</li>
            <li>Budget using hard caps (input/output tokens, max k, max overlap) and early-exit policies.</li>
            <li>Leverage KV/prefix caches; prefer paged/flash attention for long contexts.</li>
            <li>Use small models for scoring/reranking; reserve large models for final generation.</li>
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
            <li>Long-document QA and synthesis with strong provenance requirements.</li>
            <li>Conversational assistants balancing history vs. fresh retrieval.</li>
            <li>Cost/latency-sensitive production RAG with variable difficulty distribution.</li>
            <li>On-device or memory-constrained deployments requiring aggressive compression.</li>
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
              <li><a href="https://arxiv.org/abs/1905.07799" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Adaptive Attention Span in Transformers (Sukhbaatar et al., 2019)</a></li>
              <li><a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lost in the Middle: How LMs Use Long Context (Liu et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2411.02886" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TokenSelect: Dynamic Token-Level KV Cache Selection (Wu et al., 2024)</a></li>
              <li><a href="https://arxiv.org/abs/2506.08479" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Efficient Context Selection for Long-Context QA: Adaptive-k (Taguchi et al., 2025)</a></li>
              <li><a href="https://arxiv.org/abs/2402.04347" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LongRoPE: Extending LLMs to Millions of Tokens (Sun et al., 2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/modules/data_connection/retrievers/contextual_compression/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: ContextualCompressionRetriever</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/module_guides/retrievers/contextual_compression/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Contextual Compression Retriever</a></li>
              <li><a href="https://docs.cohere.com/docs/rerank-overview" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cohere Rerank (cross-encoder reranking)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/openai/tiktoken" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">tiktoken (token counting)</a></li>
              <li><a href="https://vllm.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM (PagedAttention) for long-context serving</a></li>
              <li><a href="https://github.com/Dao-AILab/flash-attention" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI developer community</a></li>
              <li><a href="https://github.com/vllm-project/vllm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM GitHub discussions</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic guidance on prompts/context</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};