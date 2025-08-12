'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ConversationalOrchestrationDetails = () => {
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
            Multi-agent coordination through structured, stateful conversation. A supervisor/router selects which
            agent speaks or acts next based on intent, context, and policy; agents exchange messages, call tools,
            and update shared conversation state. The orchestrator maintains memory, enforces guardrails, and
            terminates when success criteria are met, yielding a summarized, traceable outcome.
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
            <li>Intake: normalize goal, constraints, user profile, and initial context/memory.</li>
            <li>Initialize roles: register agents/tools; define capabilities and policies.</li>
            <li>Turn loop: route → agent speaks/acts → tools/retrieval → observe → update shared state.</li>
            <li>Safety: apply input/output filters, validations, and auth scopes each turn.</li>
            <li>Stopping: detect completion/impasse via heuristics or explicit success predicates.</li>
            <li>Summarize: distill final answer, provenance, and next-step recommendations.</li>
            <li>Learn: log traces, evals, costs; refine routing and prompts based on outcomes.</li>
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
            'Use an explicit router/supervisor with typed state; keep steps idempotent.',
            'Prefer small, fast models for routing/critique; reserve large models for hard reasoning.',
            'Bound loops: max turns, per-turn token caps, wall-clock timeouts, and cancellation.',
            'Maintain conversation memory with summarization and schema-based context packing.',
            'Instrument traces, costs, latencies, tool I/O, and safety events; add regression evals.',
            'Apply least-privilege credentials; validate tool outputs; implement circuit breakers.',
            'Design clear role prompts and message schemas to avoid ambiguity and ping-pong loops.',
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
            <li>Simple, single-step tasks where a single agent/tool suffices within SLOs.</li>
            <li>Strict real-time paths with tight p95 latency budgets sensitive to turn-taking overhead.</li>
            <li>High-risk actions without human review, auditing, or robust policy enforcement.</li>
            <li>Teams lacking observability, evals, and operations maturity to monitor multi-agent flows.</li>
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
            <li>Agent ping-pong and recursion causing cost/token blowups.</li>
            <li>Context drift and stale/shared state inconsistencies across turns.</li>
            <li>Unvalidated tool effects, missing idempotency, or duplicate writes on retries.</li>
            <li>Privilege creep: broad API scopes or long-lived secrets for many agents.</li>
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
            'Supervisor/router with policy- and capability-aware routing',
            'Role registry and message schema for structured conversations',
            'Stateful memory with summarization and retrieval integration',
            'Tool/function calling with validation and guardrails',
            'Parallel subthreads with arbitration/consensus when safe',
            'Graph-based control (e.g., state graphs) for complex flows',
            'Human-in-the-loop handoff and escalation paths',
            'Full observability: traces, metrics, audits',
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
            <li>Task resolution rate; handoff success; judge/arbiter agreement when used.</li>
            <li>Turns to resolution; p50/p95 end-to-end latency; stuck/aborted session rate.</li>
            <li>Cost/tokens per successful resolution; router accuracy vs ground truth.</li>
            <li>Escalation-to-human rate; safety intervention frequency; MTTR by failure type.</li>
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
            <li>Cap turns and per-turn tokens; compress context; cache conversation summaries.</li>
            <li>Use small models for routing/classification; batch safe tool calls; parallelize where possible.</li>
            <li>Apply backpressure/queues; per-edge timeouts and circuit breakers; stream partial outputs.</li>
            <li>TTL for memory entries; checkpoint state for recovery; avoid unbounded fan-out.</li>
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
            <li>Customer support triage with tool use, retrieval, and structured escalation.</li>
            <li>Research, analysis, and drafting using expert debate/judge patterns.</li>
            <li>Incident response and operations runbooks with multi-role collaboration.</li>
            <li>Sales discovery and solutioning with role-based assistants and guardrails.</li>
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
              <li><a href="https://arxiv.org/abs/2308.08155" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Multi-Agent Conversation Framework (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ReAct: Synergizing Reasoning and Acting (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2303.05431" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAMEL: Communicative Agents for Role-Playing (2023)</a></li>
              <li><a href="https://arxiv.org/abs/1812.10757" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Alexa Prize: Open Domain Dialog Systems (2018)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation (stateful multi-agent graphs)</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Azure: AI Agent Design Patterns</a></li>
              <li><a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-orchestration-agents.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Prescriptive Guidance: Workflow Orchestration Agents</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
              <li><a href="https://www.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/understanding/agents/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Agents</a></li>
              <li><a href="https://rasa.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Rasa (dialogue management)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Discussions</a></li>
              <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen GitHub</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm GitHub</a></li>
              <li><a href="https://forum.rasa.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Rasa Community Forum</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};