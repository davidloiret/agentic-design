'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const RoleBasedTeamworkDetails = () => {
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
            Structured multi-agent collaboration where each agent is assigned a clear role (e.g., supervisor, planner,
            researcher, implementer, reviewer, verifier/judge, tool specialist) with defined responsibilities,
            capabilities, and permissions. Roles coordinate via typed messages and artifact handoffs, enabling division
            of labor, accountability, and repeatable workflows. Common implementations use supervisor–worker or
            scheduler patterns with least‑privilege credentials and auditable handoffs.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Define role catalog: supervisor, planner, researcher, implementer, reviewer, verifier/judge, tool ops.</li>
            <li>Instantiate team: bind prompts, tools, credentials, SLAs, and budgets to each role.</li>
            <li>Intake and triage: normalize goal, constraints, risk, and evaluation rubric.</li>
            <li>Plan and assign: planner decomposes tasks; supervisor assigns to roles with acceptance criteria.</li>
            <li>Execute loops: roles act with tools/retrieval; produce structured artifacts and traces.</li>
            <li>Handoffs: reviewer/verifier validate outputs; resolve conflicts or request revisions.</li>
            <li>Escalation: supervisor routes exceptions; optional human‑in‑the‑loop for high‑risk steps.</li>
            <li>Synthesize and deliver: compile final output with provenance and metrics.</li>
            <li>Learn and update: refine role prompts, policies, and routing from outcomes.</li>
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
            'Create explicit role cards (purpose, inputs/outputs, tools, guardrails, success criteria).',
            'Use capability/permission scopes and short‑lived credentials per role (least privilege).',
            'Standardize handoff schemas (task, artifact refs, confidence, costs, next actions).',
            'Bound loops and depth; cap per‑role tokens, time, and retries to avoid ping‑pong.',
            'Summarize across handoffs; store large artifacts externally and pass references.',
            'Prefer small models for routing/checks; reserve larger models for hard reasoning roles.',
            'Instrument per‑role metrics: utilization, handoff acceptance, rework, cost, and latency.',
            'Add human review gates for safety‑critical or high‑impact decisions.',
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
            <li>Simple, single‑step tasks where a single agent meets quality and SLOs.</li>
            <li>Strict real‑time paths where additional handoffs break latency budgets.</li>
            <li>Poorly specified goals where role boundaries and acceptance criteria cannot be defined.</li>
            <li>Highly coupled tasks requiring continuous shared context best handled by one agent.</li>
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
            <li>Unbounded role ping‑pong and re‑review cycles causing token/cost blowups.</li>
            <li>Ambiguous ownership; unclear acceptance criteria for role outputs.</li>
            <li>Permission sprawl or long‑lived tokens beyond role scope.</li>
            <li>Context drift and stale memory across roles without summarization.</li>
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
            'Explicit role definitions with scopes and policies',
            'Supervisor/scheduler for assignment and escalation',
            'Typed messages and artifact‑centric handoffs',
            'Per‑role budgets, SLAs, and utilization tracking',
            'Guardrails and approvals on sensitive actions',
            'Observability: traces, costs, provenance, and audits',
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
            <li>End‑to‑end task success; per‑role handoff acceptance and first‑pass yield.</li>
            <li>Rework rate; escalation rate; MTTR with/without human assist.</li>
            <li>Tokens/time/cost per successful task and per role; utilization by role.</li>
            <li>Verifier/judge agreement and policy compliance rates.</li>
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
            <li>Set per‑role token/time budgets and stop criteria; summarize on each handoff.</li>
            <li>Use small models for routing/checks; cache retrievals and artifacts for reuse.</li>
            <li>Cap concurrency and retries per role; stream partials and early‑exit on confidence.</li>
            <li>Store large artifacts externally; pass compact references and provenance.</li>
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
            <li>Software development lifecycle: planner → coder → reviewer → tester → deploy.</li>
            <li>Research and content production: researcher → writer → editor → fact‑checker.</li>
            <li>Customer support and triage: classifier → specialist → quality verifier.</li>
            <li>Due diligence and audits: evidence gathering → analysis → verification → report.</li>
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
              <li><a href="https://arxiv.org/abs/2308.08155" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Multi‑Agent Conversation Framework (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2303.05431" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAMEL: Communicative Agents for Role‑Playing (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2402.14034" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentScope: Flexible Multi‑Agent Platform (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Azure: AI Agent Design Patterns (2024/2025)</a></li>
              <li><a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-orchestration-agents.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Prescriptive Guidance: Workflow Orchestration Agents (2024/2025)</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation: Supervisors and Graph Teams</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/understanding/agents/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Agents and Supervisors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft AutoGen</a></li>
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://docs.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
              <li><a href="https://github.com/geekan/MetaGPT" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MetaGPT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Blog: Designing Multi‑Agent Orchestration with Reasoning (2024/2025)</a></li>
              <li><a href="https://community.ibm.com/community/user/blogs/patrick-meyer/2025/07/21/anatomy-of-an-ai-agent-watsonx-orchestrate" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">IBM Community: Anatomy of an AI Agent / watsonx Orchestrate (2025)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};