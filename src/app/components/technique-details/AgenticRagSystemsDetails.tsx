'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AgenticRagSystemsDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-pink-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Agentic RAG systems augment classic retrieval-augmented generation with autonomous planning and control. An agent analyzes the task, plans multi-hop retrieval, reformulates queries, selects tools (e.g., web search, APIs, calculators), validates and synthesizes evidence, and iterates with self-checks to deliver grounded answers with citations.
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
            <li>Intent analysis and plan: estimate difficulty, freshness needs, safety constraints, and decompose into sub-questions.</li>
            <li>Query reformulation: generate targeted queries; choose retrieval strategy (keyword, dense, hybrid, graph, API).</li>
            <li>Retrieve and rerank: fetch candidates, apply filters and rerankers; deduplicate, diversify, and enforce domain constraints.</li>
            <li>Evidence synthesis: ground generation on retrieved spans; cite sources inline with provenance.</li>
            <li>Self-check and refinement: validate claims, detect contradictions, add missing evidence, or re-retrieve if uncertain.</li>
            <li>Guardrails and security: sanitize tool I/O, enforce allowlists, and defend against prompt-injection in retrieved content.</li>
            <li>Finalize: produce answer + citations and confidence; log artifacts for evaluation and audit.</li>
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
            'Decompose complex queries; route easy ones to no-retrieval or single-pass to save cost/latency.',
            'Prefer hybrid retrieval (sparse + dense) with high-quality chunking, metadata filters, and domain allowlists.',
            'Use rerankers for precision-at-k; cap k and context size to reduce noise and token waste.',
            'Constrain generation to quoted spans (grounding) and require inline citations for factual claims.',
            'Add verification loops (ReAct-style tool use, self-critique, or chain-of-verification) for high-stakes answers.',
            'Cache retrieval results; implement doc freshness policies and TTL for web/API results.',
            'Instrument with evaluation harnesses (faithfulness, answer correctness, citation coverage) and monitor drift.',
            'Apply robust guardrails: input/output validation, prompt-injection defenses, and tool allow/deny lists.'
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
            <li>Simple, closed-book queries where the base model already meets quality targets.</li>
            <li>Strict real-time paths with tight p95 SLOs where multi-hop retrieval would breach latency.</li>
            <li>Severely constrained budgets; agent loops and tool calls can increase cost variance.</li>
            <li>Tasks requiring deterministic, legally binding outputs without human review.</li>
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
            <li>Over-retrieval (too many low-quality chunks) or under-retrieval (missing key evidence).</li>
            <li>Hallucinated citations or unsupported claims when grounding and citations are optional.</li>
            <li>Unbounded agent loops or tool-call retries without budgets and early-exit criteria.</li>
            <li>Prompt-injection via retrieved content or insecure tool I/O handling.</li>
            <li>Stale indices; lack of doc freshness policies and source de-duplication.</li>
            <li>Missing observability: no per-step traces, metrics, or replayable artifacts.</li>
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
            'Autonomous planning and query reformulation',
            'Multi-hop, tool-augmented retrieval with reranking',
            'Grounded generation with inline citations and provenance',
            'Uncertainty estimation and verification loops',
            'Adaptive strategies (no-retrieval ↔ multi-hop) based on difficulty',
            'Memory of prior steps and results to avoid repetition',
            'Security guardrails and policy-aware tool use',
            'Full observability: traces, metrics, and artifacts'
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
            <li>Answer correctness (human or model-judge) and faithfulness/groundedness scores.</li>
            <li>Citation quality and coverage; retrieval precision@k and recall.</li>
            <li>Latency p50/p95, tool-call success rate, loop abort rate.</li>
            <li>Cost per answer and variance; cache hit rate.</li>
            <li>User satisfaction (CSAT), deflection rate, and task completion.</li>
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
            <li>Token drivers: planning/analysis turns, retrieval chunk tokens, synthesis, and self-check iterations.</li>
            <li>Resource drivers: vector/keyword search calls, web/API requests, rerankers, and reruns on uncertainty.</li>
            <li>Controls: cap top-k, apply rerank filters, compress context, bound iterations, and early-exit on confidence.</li>
            <li>Engineering tips: aggressive caching, per-source budgets, concurrency limits, and backoff with jitter.</li>
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
            <li>Investigative Q&A and due diligence across large, evolving corpora.</li>
            <li>Research assistants (technical, scientific, legal) with citation-backed claims.</li>
            <li>Enterprise knowledge assistants: support, incident/runbook guidance, compliance summaries.</li>
            <li>Monitoring briefings: synthesize fresh signals from APIs, news, and internal data.</li>
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
              <li><a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ReAct: Synergizing Reasoning and Acting (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2303.11366" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Reflexion: Language Agents with Verbal Reinforcement Learning (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2310.11511" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-RAG: Learning to Retrieve, Generate, and Critique (2023)</a></li>
              <li><a href="https://github.com/microsoft/graphrag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GraphRAG by Microsoft (2024, repository and docs)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain documentation: Agentic RAG patterns</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex docs: Agentic RAG templates</a></li>
              <li><a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Weaviate blog: What is Agentic RAG?</a></li>
              <li><a href="https://www.moveworks.com/us/en/resources/blog/what-is-agentic-rag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Moveworks: A guide to Agentic RAG</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangChain, LlamaIndex, Microsoft GraphRAG</li>
              <li>Rerankers (e.g., cross-encoders), hybrid search in vector DBs</li>
              <li><a href="https://github.com/explodinggradients/ragas" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RAGAS</a>, <a href="https://github.com/truera/trulens" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TruLens</a>, <a href="https://github.com/Arize-ai/phoenix" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Arize Phoenix</a> for evaluation/observability</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangChain and LlamaIndex community forums and examples</li>
              <li>Weaviate and Pinecone engineering blogs on RAG/Agentic RAG</li>
              <li>Conference talks and tutorials on grounded generation and retrieval</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};