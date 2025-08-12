'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AgentOrchestrationDetails = () => {
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
            Centralized or graph-based coordination of specialized agents to accomplish complex goals. An orchestrator plans and decomposes work, selects agents based on capabilities and policy, routes context, enforces safety, manages concurrency and retries, and aggregates results. Topologies include single orchestrator, hierarchical controllers, and DAG/graph execution.
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
            <li>Intake: normalize goal, policy, and constraints; retrieve prior state.</li>
            <li>Plan: decompose into sub-tasks; choose graph/ordering and stop criteria.</li>
            <li>Select: match tasks to agents via capability registry and guardrails.</li>
            <li>Assemble context: tools, memory, retrieval, personas, and schemas.</li>
            <li>Execute: delegate; stream tokens; apply timeouts, retries, and backoff.</li>
            <li>Observe: log traces, tool I/O, costs, latencies, and safety signals.</li>
            <li>Recover: fallbacks, circuit breakers, escalation to human-in-the-loop.</li>
            <li>Aggregate: reconcile outputs; resolve conflicts; synthesize final result.</li>
            <li>Learn: update rewards/evals, improve policies and routing based on feedback.</li>
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
            'Model the orchestration as an explicit graph with typed state; make steps idempotent.',
            'Use a capability registry with schemas, auth scopes, SLAs, and examples for each agent/tool.',
            'Prefer small models for routing/guard tasks; reserve large models for heavy reasoning.',
            'Apply concurrency limits, backpressure, and cancellation to avoid fan-out cost explosions.',
            'Enforce safety: input/output filters, policy checks, data residency, and least-privilege creds.',
            'Instrument everything: structured traces, token/cost meters, handoff success, error taxonomies.',
            'Evaluate continuously with scenario suites and regression gates before promotion.',
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
            <li>Simple tasks where a single-agent prompt or tool call meets quality and SLOs.</li>
            <li>Hard real-time paths with tight latency budgets that orchestration overhead would violate.</li>
            <li>Actions with high risk or regulatory impact without human review or full auditability.</li>
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
            <li>Unbounded agent ping-pong loops and recursion causing token/cost blowups.</li>
            <li>Missing cancellation, timeouts, or idempotency; duplicate writes on retries.</li>
            <li>Context drift across agents; inconsistent shared state and stale memory.</li>
            <li>Privilege creep: agents holding excessive permissions or long-lived tokens.</li>
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
            'Graph/DAG execution with stateful nodes',
            'Capability-aware routing and scheduling',
            'Tool/agent registry with schemas and policy',
            'Observability: tracing, metrics, audit logs',
            'Safety: guardrails, filters, circuit breakers',
            'Fault tolerance: retries, fallbacks, rollbacks',
            'Memory bus and retrieval-augmented context',
            'Cost/latency budgets and backpressure',
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
            <li>End-to-end task success rate; sub-task and handoff success rates.</li>
            <li>Latency p50/p95 and tail amplification across the graph.</li>
            <li>Cost per successful task; tokens per successful task; agent utilization.</li>
            <li>Failure taxonomy rates (timeouts, tool errors) and MTTR with/without human assist.</li>
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
            <li>Bound depth/iterations; cap tokens per turn; compress context and cache summaries.</li>
            <li>Use small models for routing/classification; batch and parallelize safe tool calls.</li>
            <li>Apply backpressure and queues; set timeouts and circuit breakers per edge.</li>
            <li>Stream partials; checkpoint state; evict stale memory with TTL policies.</li>
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
            <li>Enterprise automations spanning multiple systems with audit and policy controls.</li>
            <li>Complex knowledge workflows: research, analysis, planning, and reporting.</li>
            <li>Incident response and operations runbooks with human-in-the-loop checkpoints.</li>
            <li>Data enrichment and ETL orchestration with tool use and validation.</li>
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
              <li><a href="https://arxiv.org/abs/2308.08155" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Multi-Agent Conversation Framework (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2303.05431" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAMEL: Communicative Agents for Role-Playing (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2402.14034" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentScope: Flexible Multi-Agent Platform (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Azure: AI Agent Design Patterns</a></li>
              <li><a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-orchestration-agents.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Prescriptive Guidance: Workflow Orchestration Agents</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation (graph-based orchestration)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen</a></li>
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://www.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/understanding/agents/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex Agents</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://community.ibm.com/community/user/blogs/patrick-meyer/2025/07/21/anatomy-of-an-ai-agent-watsonx-orchestrate" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">IBM Community: Anatomy of an AI Agent / watsonx Orchestrate (2025)</a></li>
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture: Agentic patterns overview</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};