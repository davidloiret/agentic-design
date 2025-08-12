'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AdaptiveContextDepthDetails = () => {
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
            Dynamically scales context depth and memory allocation based on task complexity and runtime signals.
            Shallow depth prioritizes concise, high-salience summaries; deeper levels include richer evidence,
            cross-agent context, and longer retrieval spans. Practical enablers include adaptive attention spans,
            depth-adaptive/early-exit execution, and retrieval→rerank→summarize pipelines that keep only the
            most relevant tokens.
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
            <li>Intake: classify task type, difficulty, novelty, and required modalities.</li>
            <li>Estimate complexity: use signals (length, entropy, dependency graph, prior failures/evals).</li>
            <li>Select depth policy: choose level (e.g., L1 facts → L5 system design) and per-agent budgets.</li>
            <li>Assemble context: retrieve, rerank, deduplicate, and summarize; build shared context pools.</li>
            <li>Execute: cap tokens/layers/calls; prefer early-exit when confidence is high.</li>
            <li>Monitor: track cost, latency, attention concentration, retrieval quality, evaluator signals.</li>
            <li>Adapt: expand/contract depth; update thresholds and caches for future similar tasks.</li>
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
            'Retrieve → rerank (cross-encoder) → summarize; avoid naïvely stuffing long documents.',
            'Set explicit token, layer, and tool-call budgets by depth; provide safe fallbacks.',
            'Progressive disclosure: start shallow; expand on uncertainty or evaluator/test failure.',
            'Cache summaries and retrieval results; deduplicate across agents with shared pools.',
            'Tune chunk sizes/overlap by tokenizer; measure long-context effectiveness, not just size.',
            'Use small models for routing/complexity scoring; reserve larger models for deep reasoning.',
            'Guardrails: cap recursion/iterations; monitor cost/latency per successful task.'
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
            <li>Uniform, simple tasks where a fixed shallow prompt meets quality and SLOs.</li>
            <li>Hard real-time paths where retrieval/summarization overhead breaks latency budgets.</li>
            <li>Strict auditability/compliance flows requiring deterministic, fixed-context inputs.</li>
            <li>Extremely long contexts without reranking, where models under-utilize middle tokens.</li>
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
            <li>Stuffing long context without reranking → wasted tokens and marginal quality gains.</li>
            <li>Cross-agent duplication and context drift; missing shared context pool.</li>
            <li>No cost/latency guardrails; unbounded depth expansion and tool recursion.</li>
            <li>Ignoring tokenizer effects; mis-tuned chunk sizes and overlap.</li>
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
            'Dynamic depth scaling with per-task/per-agent token budgets',
            'Retrieval-aware context assembly with reranking and compression',
            'Early-exit / depth-adaptive execution for efficiency',
            'Cross-agent context deduplication and shared pools',
            'Performance-aware adaptation from live metrics',
            'Policy-driven expansion on uncertainty or evaluator fail',
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
            <li>Task success/quality vs fixed-depth baseline; evaluator pass rate.</li>
            <li>Tokens and cost per successful task; depth expansion rate.</li>
            <li>Latency p50/p95 with and without expansion; throughput under load.</li>
            <li>Retrieval hit rate and reranker MRR/NDCG; duplication and cache hit rates.</li>
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
            <li>Budget by depth: shallow (summaries, top-k evidence) → deep (full passages, cross-agent pools).</li>
            <li>Heuristics: rerank to top-k, summarize to target ratio, compress shared context, stream results.</li>
            <li>Runtime: prefer paged/flash attention and efficient serving; cache summaries and retrieval results.</li>
            <li>Accounting: attribute tokens/cost to the final successful task, not individual subcalls.</li>
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
            <li>Multi-agent research and planning with highly variable difficulty and evidence needs.</li>
            <li>Customer support triage/escalation with retrieval, reranking, and selective depth.</li>
            <li>Long-document QA and compliance reviews with progressive disclosure.</li>
            <li>Code assistance across large repos; expand depth on uncertainty or failing tests.</li>
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
              <li><a href="https://arxiv.org/abs/1910.10073" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Depth-Adaptive Transformer (Elbayad et al., 2019)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04037" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DynaBERT: Adaptive Width and Depth (Hou et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2004.12993" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeeBERT: Dynamic Early Exit for BERT (Xin et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lost in the Middle: How LMs Use Long Context (Liu et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2402.04347" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LongRoPE: Extending LLMs to Millions of Tokens (Sun et al., 2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Cookbook: long context & tokenization practices</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic docs: prompt and context best practices</a></li>
              <li><a href="https://python.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: text splitters and chunking</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: context management and reranking</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/openai/tiktoken" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">tiktoken (token counting)</a></li>
              <li><a href="https://vllm.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM (PagedAttention) for efficient long-context serving</a></li>
              <li><a href="https://github.com/Dao-AILab/flash-attention" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain</a> / <a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex</a> (retrieval, rerankers, compressors)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI developer community discussions</a></li>
              <li><a href="https://www.anthropic.com/news" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic updates and guidance</a></li>
              <li><a href="https://github.com/vllm-project/vllm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM GitHub issues/discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};