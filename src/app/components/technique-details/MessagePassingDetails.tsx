'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MessagePassingDetails = () => {
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
            Message Passing in multi-agent systems is the exchange of typed messages between autonomous agents over
            channels or mailboxes. Messages carry role, intent, and payload, and may be routed, buffered, retried,
            and persisted. Agents react to inbound messages by reasoning (LLM calls), updating state/memory, invoking
            tools, and emitting new messages. Communication can be synchronous (request/response) or asynchronous
            (fire-and-forget), enabling decoupling, scalability, and fault isolation.
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
            <li>Define agent roles, capabilities, and message schema (type, headers: correlationId, causationId, tenant, ttl).</li>
            <li>Establish transport: in-memory graph/runtime, brokered queue, or HTTP/WebSocket channels.</li>
            <li>Initialize conversation thread/context; attach minimal, relevant state references rather than full transcripts.</li>
            <li>Agent receives message → validates schema/policy → reasons (LLM/tool) → updates state → emits follow-up messages.</li>
            <li>Route messages by topic/recipient, apply retries/backoff/DLQ for failures, and enforce stop/timeout criteria.</li>
            <li>Observe with tracing and metrics; checkpoint critical state for recovery and reproducibility.</li>
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
            'Use explicit message types and compact schemas; include correlation/trace IDs and sender role.',
            'Bound conversations: define termination criteria (goal reached, max rounds, budget/time caps).',
            'Minimize token usage: send deltas, references, and summaries instead of full transcripts.',
            'Design idempotent handlers; deduplicate via message IDs and idempotency keys.',
            'Apply backoff with jitter; cap retries; use DLQs and human-in-the-loop for irrecoverable cases.',
            'Enforce safety/guardrails: input validation, tool-result grounding, policy checks before LLM calls.',
            'Separate control vs. data planes; avoid large blobs in messages—store externally and reference.',
            'Instrument with OpenTelemetry-style tracing; log message lifecycle and decisions for auditability.',
            'Version message schemas; roll out with compatibility checks and canaries.',
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
          <p>Single-step, deterministic tasks where a single agent or direct function call suffices.</p>
          <p>Ultra low-latency paths with strict SLOs where queuing/LLM round-trips are unacceptable.</p>
          <p>Strong global ordering or transactional semantics across many agents without dedicated coordination.</p>
          <p>When shared-memory within one process is simpler and cheaper than inter-agent messaging.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Conversation drift and verbosity explosion → rising token costs and degraded reasoning.</p>
          <p>Ping-pong loops without termination policies; lack of explicit goals or success criteria.</p>
          <p>Non-idempotent side effects under retries → duplicates and inconsistent state.</p>
          <p>Over-trusting unverified tool outputs; missing grounding and validations before propagation.</p>
          <p>Unbounded fan-out or concurrency → rate-limit breaches and cost spikes.</p>
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
            'Asynchronous and synchronous patterns (request/response, publish/subscribe, mailboxes).',
            'Routing, addressing, and topic-based delivery; conversation/thread IDs.',
            'Delivery semantics (at-least-once, at-most-once) with retries and DLQs (when brokered).',
            'Persistence and replay for auditability and recovery; checkpoints and summaries.',
            'Policy enforcement per role/topic; safety filters; tool-result grounding.',
            'Pluggable transports: in-memory graphs, HTTP/WebSocket, queues/brokers.',
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
          <div>Task success rate; goal attainment without human intervention.</div>
          <div>Rounds-to-convergence; average and p95 conversation length.</div>
          <div>Inter-agent latency and end-to-end time-to-resolution.</div>
          <div>Token per task and per round; context growth and compression efficiency.</div>
          <div>Error rates (tool failures, validation rejects); duplicate/redo rates.</div>
          <div>Cost per successful task; rate-limit incidents; DLQ/redrive counts (if brokered).</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>LLM tokens dominate cost/latency: constrain message size, use summaries/deltas, and prune stale context.</p>
          <p>Compute and network: serialize compactly (JSON/protobuf), avoid large payloads; store blobs externally.</p>
          <p>Concurrency/quotas: cap parallel agent activity; budget per task to avoid cost runaways.</p>
          <p>Brokered systems: account for queue storage, egress, replication; tune retries and backoff for cost.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Decomposed tasks requiring specialist agents (researcher ↔ planner ↔ executor) coordinating via messages.</p>
          <p>Event-driven agent ecosystems: tools emit events that trigger targeted agent reactions.</p>
          <p>Human-in-the-loop workflows with approvals, red-teaming, or review gates between agent steps.</p>
          <p>Cross-system orchestration where agents bridge APIs, data stores, and long-running jobs.</p>
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
              <li><a href="https://arxiv.org/abs/2303.17760" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAMEL: Communicative Agents for Zero-Shot Task Completion (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2307.08131" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation (Microsoft)</a></li>
              <li><a href="https://www.mpi-forum.org/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MPI Forum Specifications (Message Passing Interface, ongoing)</a></li>
              <li><a href="https://www.fipa.org/specs/fipa00061/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FIPA ACL: Agent Communication Language (spec)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation</a> (graph-based agent message passing)</li>
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen Docs</a> (conversational multi-agent patterns)</li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a> (lightweight agent-to-agent messaging)</li>
              <li><a href="https://docs.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI Docs</a> (task/role-based agent collaboration)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangGraph, AutoGen, OpenAI Swarm, CrewAI</li>
              <li>FIPA ACL toolkits; Akka/Erlang actors for mailbox-style messaging</li>
              <li>Broker options (when needed): Kafka, RabbitMQ, NATS, Redis Streams</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph GitHub</a></li>
              <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen GitHub</a></li>
              <li><a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Developer Community</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/multi-agent" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">StackOverflow: multi-agent</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};