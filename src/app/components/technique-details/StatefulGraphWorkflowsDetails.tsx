'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const StatefulGraphWorkflowsDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            Stateful Graph Workflows model a process as a directed graph of nodes (steps) and edges (control flow),
            with a persistent state carried across steps. Execution proceeds per session/thread, with checkpoints that
            allow pause/resume, replay, branching, and time-travel for debugging. Conditional edges and loops enable
            dynamic routing; parallel branches allow concurrent work. This pattern underpins modern agentic systems
            (e.g., LangGraph, LlamaIndex Workflows) and general workflow engines (e.g., Temporal) where reliability
            and auditability matter.
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
            <li>Define a typed state schema (inputs, working memory, outputs, metadata, provenance).</li>
            <li>Implement nodes as deterministic steps (tool/LLM calls, functions) that read/write state.</li>
            <li>Connect nodes with edges; add conditional routing and loop guards; enable parallel branches where safe.</li>
            <li>Configure persistence (checkpoint store) and thread/session keys for resumability and replay.</li>
            <li>Run per thread: advance node → write checkpoint → decide next edge; support human-in-the-loop stops.</li>
            <li>Observe and govern: logs/traces, metrics, cost/latency budgets, policy and safety checks.</li>
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
            'Keep state compact and structured; persist artifacts by reference (URIs) with provenance.',
            'Make nodes idempotent and side‑effect safe; store dedupe keys and retry metadata in state.',
            'Version graphs and state schemas; support migrations and backward‑compatible checkpoints.',
            'Add explicit termination criteria and loop guards; cap max steps/iterations per thread.',
            'Separate orchestration from business logic; keep prompts/tools modular and testable.',
            'Instrument per‑node KPIs (latency, cost/tokens, success/fallbacks) and enforce budgets.',
            'Use checkpointing for resume/replay; redact or encrypt sensitive fields at rest.',
            'Prefer parallel branches only for independent, side‑effect‑free steps; bound concurrency.',
            'Write table‑driven tests for routing; fuzz edge conditions; record/replay tricky sessions.'
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
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Simple, linear request→response flows without branching or long‑lived context.</p>
          <p>Ultra low‑latency paths where orchestration/LLM round‑trips would violate SLOs.</p>
          <p>One‑off scripts or stateless batch jobs where checkpointing adds no value.</p>
          <p>Strict cross‑service ACID transactions; use transactional workflow engines or sagas.</p>
          <p>Domains better served by rules engines or SQL pipelines with minimal control flow.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Unbounded loops or recursive retries without caps or convergence checks.</p>
          <p>Global mutable state shared across threads; race conditions in parallel branches.</p>
          <p>Missing idempotency → duplicate side effects when resuming/retrying.</p>
          <p>Checkpointing large blobs instead of references → storage bloat and slow resumes.</p>
          <p>Token blowups from over‑stuffed prompts and missing summarization of state/history.</p>
          <p>Mixing orchestration and business logic tightly; hard‑to‑test, brittle graphs.</p>
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
            'Persistent state per thread/session with typed schema.',
            'Checkpointing, resume, replay, and time‑travel debugging.',
            'Conditional routing, loops with guards, and parallel branches.',
            'Human‑in‑the‑loop steps and approvals; pause/resume points.',
            'Pluggable storage/backends for checkpoints and artifacts.',
            'Deterministic step execution with side‑effect controls.',
            'Rich observability: traces, metrics, and audit logs.',
            'Policy gates and budgets (latency, cost/tokens) per node.'
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">{feat}</div>
          ))}
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Time‑to‑completion per thread; p50/p95/p99 per node; throughput.</div>
          <div>Success rate vs. fallback/human‑assist; rollback/resume counts.</div>
          <div>Tokens per run and per node; cost per run; cache hit rate.</div>
          <div>Retry/DLQ rates; loop/iteration counts; parallelism utilization.</div>
          <div>Policy/SLA adherence: budget breaches (latency, cost, tokens).</div>
          <div>Quality metrics (task‑specific accuracy, evaluation pass rate).</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Drivers: planning/analysis prompts, retrieval/context packing, per‑node LLM calls, self‑checks, and state growth.</p>
          <p>Controls: per‑node token caps, summarize history/state, early‑exit on high confidence, batch parallelizable nodes, cache aggressively.</p>
          <p>Storage/CPU: compact checkpoints (diffs), externalize large artifacts, dedupe state; bound concurrency to match budgets.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Multi‑step AI task automation (plan→act→verify→report) with resumability and audit.</p>
          <p>RAG pipelines with routing/verification (e.g., CoVe/CRAG) and fallback paths.</p>
          <p>Agent teams invoking tools/skills with human approvals and safe rollbacks.</p>
          <p>Compliance/regulated workflows requiring deterministic replay and traceability.</p>
          <p>Long‑running operations with external dependencies and intermittent failures.</p>
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
              <li><a href="https://arxiv.org/abs/2312.06893" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Styx: Transactional Stateful Functions on Streaming Dataflows (2023)</a></li>
              <li><a href="https://arxiv.org/abs/1912.12740" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Streaming Processing of Dynamic Graphs: Concepts, Models, and Systems (2019)</a></li>
              <li><a href="https://arxiv.org/abs/1902.10345" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stateful Dataflow Multigraphs for Performance Portability (2019)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation (StateGraph, Threads, Checkpoints)</a></li>
              <li><a href="https://docs.llamaindex.ai/en/latest/module_guides/workflows/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Workflows</a></li>
              <li><a href="https://docs.temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal Documentation</a></li>
              <li><a href="https://beam.apache.org/documentation/programming-guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Beam Programming Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangGraph, LlamaIndex Workflows</li>
              <li><a href="https://flink.apache.org/stateful-functions/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Flink Stateful Functions</a></li>
              <li><a href="https://beam.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Beam</a>, <a href="https://www.elastic.co/guide/en/kibana/current/workflows.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Workflow tooling</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Discussions</a></li>
              <li><a href="https://community.temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal Community</a></li>
              <li><a href="https://flink.apache.org/community.html#mailing-lists" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Flink User Mailing Lists</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};