'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EventDrivenHierarchicalDetails = () => {
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
            Event-Driven Hierarchical Agents (EDHA) organize agents into supervisor→worker levels coordinated by
            events. Higher levels publish directives to level-specific topics; lower levels consume, decompose, and act,
            emitting status and results upward. Each level isolates concerns, uses consumer groups for scale, and applies
            policies (retries, backoff, dead-letter queues) with clear topic taxonomy and correlation/causation IDs for
            traceability. This blends hierarchical planning with event-driven architecture for resilient orchestration.
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
            <li>Define hierarchy: levels (e.g., executive → manager → team) and role capabilities per level.</li>
            <li>Design topic taxonomy and naming: level-prefixed topics (e.g., exec.directives, mgr.assignments, team.tasks).</li>
            <li>Provision transport: Kafka/RabbitMQ/NATS/Cloud Pub/Sub with partitions/FIFO groups and retention.</li>
            <li>Specify contracts: message schemas (JSON/Avro/Protobuf), headers (correlationId, causationId, tenant, ttl).</li>
            <li>Implement supervisors: publish directives, evaluate status events, handle escalation/approval gates.</li>
            <li>Implement workers: consume assignments, decompose tasks, invoke tools/LLMs, publish progress/results.</li>
            <li>Apply reliability: retries with jittered backoff, idempotency keys, DLQs, circuit breakers, timeouts.</li>
            <li>Observe and govern: tracing, metrics per level, quotas, cost/latency budgets, policy and safety checks.</li>
            <li>Reconfigure dynamically: scale consumer groups, change routing, or insert review agents without downtime.</li>
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
            'Use stable hierarchical topic naming; segregate control vs data planes; keep messages small, reference large artifacts.',
            'Include correlation/causation IDs and versioned schemas; validate with schema registry; ensure backward compatibility.',
            'Design idempotent consumers; de-duplicate via message IDs and idempotency keys; avoid non-atomic side effects.',
            'Bound fan-out and depth; enforce per-level SLAs, budgets, and termination criteria to prevent runaway cascades.',
            'Apply backpressure and concurrency caps; tune prefetch/flow control; avoid hot partitions via well-chosen keys.',
            'Implement DLQs with triage workflows; add human-in-the-loop for irrecoverable or policy-sensitive escalations.',
            'Gate cross-level transactions with sagas/compensation; avoid global locks; prefer eventual consistency patterns.',
            'Instrument with tracing (OpenTelemetry) and per-level KPIs; maintain audit logs and reproducible event replays.',
            'Secure by level and tenant: authN/Z, encryption, PII redaction; isolate noisy tenants with quotas.',
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
          <p>Single-team, short-lived tasks with simple synchronous call graphs and no need for hierarchical oversight.</p>
          <p>Strict globally ordered workflows or ACID transactions spanning many agents without broker support.</p>
          <p>Ultra low-latency paths where queuing/LLM round-trips break SLOs; prefer direct RPC or in-process coordination.</p>
          <p>Domains where centralized optimization beats decomposed local decisions (noisy consensus, tight coupling).</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Feedback loops between levels causing churn; missing acyclic flow design and escalation rules.</p>
          <p>Unbounded fan-out and hidden dependencies; no caps on depth, retries, or parallelism.</p>
          <p>Consumer group misconfiguration leading to duplicate work or idle workers; hot keys causing skew.</p>
          <p>No DLQ triage; mixing control and data payloads; large blobs in the bus inflating cost/latency.</p>
          <p>Missing idempotency and exactly-once semantics where needed; lack of schema evolution strategy.</p>
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
            'Supervisor→worker hierarchy with cascading task decomposition and approvals.',
            'Level-scoped topics and consumer groups; isolation domains per level/tenant.',
            'Upward status aggregation, downward directives; event replay for audit and recovery.',
            'Policy gates per level (SLAs, budgets, safety checks, review workflows).',
            'Dynamic reconfiguration: hot-add agents/levels, reroute topics, scale consumer groups.',
            'Interoperation with planning (HTN/options) and actor-style supervision trees.',
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
          <div>Directive→completion latency per level (p50/p95/p99) and end-to-end time to resolution.</div>
          <div>Throughput and backlog per level (consumer lag, oldest event age, SLA breach rate).</div>
          <div>Escalation and rework rates; approval turnaround; successful decomposition rate.</div>
          <div>Duplicate/ordering-violation rates; retry/DLQ rates; idempotency failure incidence.</div>
          <div>Cost per completed task by level; token per task; cache hit rate; utilization of consumers.</div>
          <div>Change safety: incident count after reconfiguration; policy violation/override counts.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>LLM tokens scale with hierarchy depth and event verbosity. Prefer status summaries and references over full logs.</p>
          <p>Broker costs: storage/retention, egress, partitions/FIFO groups. Tune message size, compression, and batching.</p>
          <p>Compute/memory: consumer concurrency, serialization, and tool execution; cap parallelism per level.</p>
          <p>Adopt caching/materialized views for rollups; log per-level token/cost budgets with early-exit heuristics.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Enterprise program/portfolio management with cross-team decomposition and approvals.</p>
          <p>Tiered customer support and incident management with escalation and review gates.</p>
          <p>Supply chain and operations orchestration across regions/business units with local autonomy.</p>
          <p>Regulatory and safety workflows requiring hierarchical review and auditable event trails.</p>
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
              <li><a href="https://arxiv.org/abs/1403.7426" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Georgievski & Aiello (2014): An Overview of Hierarchical Task Network Planning</a></li>
              <li><a href="https://www.jmlr.org/papers/volume4/sutton03a/sutton03a.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sutton, Precup, Singh (1999): Between MDPs and Semi-MDPs: A Framework for Temporal Abstraction</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/7929.7925" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Agha (1986): Actors: A Model of Concurrent Computation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kafka.apache.org/documentation/#semantics_eos" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka: Exactly-Once Semantics</a></li>
              <li><a href="https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges-topic" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ: Topic Exchanges</a> · <a href="https://www.rabbitmq.com/dlx.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dead Letter Exchanges</a></li>
              <li><a href="https://cloud.google.com/pubsub/docs/ordering" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Pub/Sub: Ordering Keys</a> · <a href="https://cloud.google.com/pubsub/docs/exactly-once-delivery" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Exactly-Once Delivery</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/patterns/publisher-subscriber" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Publisher–Subscriber</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Apache Kafka, RabbitMQ, Google Pub/Sub, AWS SNS/SQS FIFO, NATS JetStream</li>
              <li>LangGraph, AutoGen, OpenAI Swarm, CrewAI (multi-agent orchestration)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lists.apache.org/list.html?users@kafka.apache.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka Users Mailing List</a></li>
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph GitHub</a> · <a href="https://github.com/microsoft/autogen" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen GitHub</a></li>
              <li><a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Developer Community</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};