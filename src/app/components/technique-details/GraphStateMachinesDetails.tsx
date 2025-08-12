'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const GraphStateMachinesDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            Graph State Machines represent control flow as states (nodes) and event-driven transitions (edges) with
            guard conditions and actions. Statecharts augment this with hierarchical states, orthogonal regions
            (parallelism), and history to capture complex real-world behavior. This gives deterministic, auditable
            flow control for agent/tool invocations, approvals, retries, and human-in-the-loop checkpoints.
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
            <li>Enumerate states (initial, intermediate, terminal) and define state/context schema.</li>
            <li>List events; define transitions with guards and actions (include error/timeouts as events).</li>
            <li>Design the graph: priorities/defaults per state; add hierarchy/parallel regions if using statecharts.</li>
            <li>Implement pure transition logic; run side effects in effect handlers with retries and idempotency.</li>
            <li>Persist state + minimal context; version the machine; enable visualization from source.</li>
            <li>Test transitions (table-driven), fuzz guards, and validate invariants; add observability.</li>
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
            'Minimize state explosion: encode data checks in guards, not separate states.',
            'Use statecharts for hierarchy/parallelism; leverage history for resumption.',
            'Keep transition functions pure; isolate I/O and side effects with idempotency keys.',
            'Model failures/timeouts explicitly; add compensations and rollback paths.',
            'Source-of-truth diagrams from machine definition; review diffs in PRs.',
            'Persist only necessary context; externalize large artifacts via URIs; protect sensitive data.',
            'Comprehensive tests for guards/transitions; property tests for safety invariants.'
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
          <p>Simple linear flows where a straight-line function or DAG is clearer and cheaper.</p>
          <p>Heavy dataflow/ETL where stream/DAG engines fit better than event-guard machines.</p>
          <p>Ultra low-latency paths sensitive to event loop/guard evaluation overhead.</p>
          <p>Strict ACID cross-service transactions; prefer workflow engines with sagas/transactions.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>State explosion from encoding fine-grained data conditions as states rather than guards.</p>
          <p>Ambiguous or overlapping guards; missing default transitions → nondeterminism.</p>
          <p>Embedding side effects inside transitions → non-determinism and retry hazards.</p>
          <p>Missing persistence/idempotency → unrecoverable or duplicated effects on retry.</p>
          <p>Parallel regions without proper isolation → races and deadlocks.</p>
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
            'Deterministic event→transition semantics with guards and actions',
            'Hierarchical and parallel states (statecharts); history/restoration',
            'Explicit error/timeout and compensation transitions',
            'Visual models and formal reasoning about reachability/invariants',
            'Composable submachines; reuse via regions and invoked machines'
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
          <div>Transition coverage and unreachable-state detection in tests.</div>
          <div>Mean steps-to-completion; time-in-state distributions; p50/p95 per transition.</div>
          <div>Failure/compensation transition rates; replay/resume success rates.</div>
          <div>For LLM steps: tokens per state and per run; cost per run; cache hit rate.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Drivers: per-state LLM/tool calls, validation/self-check prompts, and context growth in state data.</p>
          <p>Controls: per-state token budgets; summarize/trim context; cache deterministic steps; bound concurrency.</p>
          <p>Storage/CPU: persist minimal state + references; avoid logging sensitive context; instrument per-transition cost.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Order/approval/fulfillment flows with retries, compensations, and human approvals.</p>
          <p>Agent/dialog controllers gating tool calls and safety checks per step.</p>
          <p>Compliance workflows requiring deterministic replay and audit trails.</p>
          <p>Device/process controllers with hierarchical/parallel modes.</p>
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
              <li><a href="https://dl.acm.org/doi/10.1145/40204.40205" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Harel (1987): Statecharts—A Visual Formalism for Complex Systems</a></li>
              <li><a href="https://ieeexplore.ieee.org/document/34753" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Murata (1989): Petri Nets—Properties, Analysis and Applications</a></li>
              <li><a href="https://www.workflowpatterns.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Workflow Patterns (van der Aalst et al.)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://stately.ai/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">XState/Stately Docs (Statecharts)</a></li>
              <li><a href="https://docs.aws.amazon.com/step-functions/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Step Functions</a></li>
              <li><a href="https://docs.temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal Docs</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph (StateGraph, Threads, Checkpoints)</a></li>
              <li><a href="https://docs.llamaindex.ai/en/latest/module_guides/workflows/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Workflows</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>XState/Statecharts, AWS Step Functions, Temporal, Camunda BPMN 2.0</li>
              <li>LangGraph, LlamaIndex Workflows</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discord.gg/xstate" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">XState/Stately Community</a></li>
              <li><a href="https://community.temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal Community</a></li>
              <li><a href="https://forum.camunda.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Camunda Forum</a></li>
              <li><a href="https://github.com/langchain-ai/langgraph/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};