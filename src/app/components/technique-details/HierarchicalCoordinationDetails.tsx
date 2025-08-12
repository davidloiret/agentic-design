'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const HierarchicalCoordinationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Multi-level supervisor–subordinate structure that decomposes goals and decisions across tiers. Upper levels handle
            objectives, policy, escalation, and resource authorization; lower levels execute concrete subtasks with local context.
            Information aggregates upward; directives and approvals flow downward. This mirrors Hierarchical Task Networks (HTN),
            hierarchical RL/options, and practical supervisor–worker patterns in modern agent frameworks.
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
            <li>Define tiers: supervisor(s) → managers/leads → workers; clarify authority and escalation rules.</li>
            <li>Decompose goals (HTN-style): break tasks into ordered/subtasks with preconditions and required artifacts.</li>
            <li>Plan and delegate: supervisor assigns subtasks with acceptance criteria, SLAs, and resource caps.</li>
            <li>Execute and report: workers act (tools, retrieval, code) and return structured results + traces.</li>
            <li>Aggregate and verify: intermediate managers consolidate outputs; supervisors verify against policy/rubrics.</li>
            <li>Escalate exceptions: unresolved conflicts, missing authority, or safety flags bubble up with context.</li>
            <li>Learn and adapt: log decisions, costs, and outcomes; refine task schemas, routing, and escalation policies.</li>
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
            'Make tiers explicit: roles, permissions, approval limits, and escalation criteria.',
            'Use structured task specs (inputs, preconditions, success criteria, KPIs) for delegations.',
            'Enforce policy at higher tiers; sandbox execution at lower tiers; apply least privilege.',
            'Summarize between levels to control context growth; persist artifacts instead of full transcripts.',
            'Use smaller models for routine checks at lower tiers; reserve stronger models for planning/reviews.',
            'Instrument traces: who delegated what, cost/latency per tier, and decision rationales.',
            'Add retries with backoff and bounded re-decomposition for failed subtasks; cap recursion depth.',
            'Define clear stop conditions to avoid infinite escalation or delegation loops.',
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
            <li>Simple, single-step tasks where a single agent meets quality and SLOs.</li>
            <li>Hard real-time constraints where extra review/approval hops break latency budgets.</li>
            <li>Highly creative brainstorming where rigid tiers reduce idea diversity and speed.</li>
            <li>Teams so small that hierarchy adds overhead without coordination benefits.</li>
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
            <li>Single points of failure at the supervisor; bottlenecks and queueing delays.</li>
            <li>Over-escalation: excessive approvals and rechecks inflate latency and cost.</li>
            <li>Ambiguous authority: workers lack permissions or clarity to complete tasks.</li>
            <li>Token bloat: forwarding full transcripts across tiers instead of concise summaries.</li>
            <li>Policy drift: inconsistent enforcement across managers; missing audit trails.</li>
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
            'Supervisor–manager–worker tiers with clear permissions',
            'HTN-style task decomposition and recomposition',
            'Escalation workflows and exception handling',
            'Policy enforcement and approval gates at higher tiers',
            'Artifact-centric communication and summarization between tiers',
            'Observability: per-tier metrics, traces, and audit logs',
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
            <li>Task success rate vs. flat baseline; defect/rollback rate after approval.</li>
            <li>Latency p50/p95 per tier; time-in-queue at supervisor and managers.</li>
            <li>Cost per task by tier; tokens per delegation, per escalation, and per artifact.</li>
            <li>Escalation rate and resolution time; rework rate after supervisor review.</li>
            <li>Policy violations caught at higher tiers; audit completeness.</li>
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
            <li>Summarize cross-tier messages; pass references to artifacts instead of full text where possible.</li>
            <li>Use small/fast models for routine checks at lower tiers; reserve larger models for planning and audits.</li>
            <li>Batch approvals and aggregations; parallelize independent delegations.</li>
            <li>Set explicit token and cost budgets per tier; enforce max recursion/decomposition depth.</li>
            <li>Cache shared context at the supervisor; avoid re-sending unchanged evidence.</li>
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
            <li>Enterprise workflows requiring approvals: compliance, finance, procurement, policy changes.</li>
            <li>Complex operations with interdependent subtasks: incident response, product launches, SRE runbooks.</li>
            <li>Research and report generation with section owners and editorial review.</li>
            <li>Multi-robot/drone coordination with mission control and local autonomy.</li>
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
              <li><a href="https://arxiv.org/abs/1403.7426" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">An Overview of Hierarchical Task Network Planning (2014)</a></li>
              <li><a href="https://www.jmlr.org/papers/volume2/sutton00a/sutton00a.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Options: Temporal Abstraction in Reinforcement Learning (Sutton, Precup, Singh, 1999/2000)</a></li>
              <li><a href="https://arxiv.org/abs/1712.08266" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Federated Control with Hierarchical Multi‑Agent Deep RL (2017)</a></li>
              <li><a href="https://arxiv.org/abs/2303.17580" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HuggingGPT: A System to Connect LLMs with ML Community (Planner–Expert pattern, 2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://langchain-ai.github.io/langgraph/how-tos/supervisor/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: Supervisor pattern (graph orchestration)</a></li>
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft AutoGen: Manager–Worker Agent Patterns</a></li>
              <li><a href="https://docs.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI: Manager and Worker Agents</a></li>
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture: AI Agent Design Patterns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen</a></li>
              <li><a href="https://www.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
              <li><a href="https://github.com/modelscope/agentscope" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentScope</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://pubs.opengroup.org/dpbok/latest/KLP-chap-coordination.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Open Group: Coordination & Process (DPBoK)</a></li>
              <li><a href="https://ccs.mit.edu/21c/mgtsci/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MIT CCS: Coordination theory & organizational processes</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};