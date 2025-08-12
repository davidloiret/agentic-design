'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MetaReasoningOrchestrationDetails = () => {
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
            Meta-level control that monitors, evaluates, and adapts object-level reasoning. The controller selects among
            strategies (e.g., Chain-of-Thought, Tree-of-Thoughts, tool use, retrieval, self-consistency, backtracking),
            allocates budget, and switches when progress stalls. Practical implementations use contextual bandits or
            reinforcement learning for strategy selection, uncertainty-aware gating, and bounded compute.
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
            <li>Characterize task: domain, difficulty, constraints, risk, and target quality/latency/cost.</li>
            <li>Initialize policy and budgets: token/time caps, iteration limits, stopping criteria.</li>
            <li>Plan candidate strategies: CoT/ToT depth, self-consistency samples, retrieval/tool plan.</li>
            <li>Execute a step: run chosen strategy; capture trace, uncertainty, cost, and intermediate results.</li>
            <li>Meta-evaluate: check progress vs rubric; detect stall, drift, or contradiction.</li>
            <li>Adapt: switch strategy, adjust depth, request clarification, or invoke tools/retrieval.</li>
            <li>Terminate: meet success criteria or safe-abort when budgets or guardrails trigger.</li>
            <li>Learn: update selection policy with outcomes, regret, and calibration data.</li>
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
            'Separate meta-control from object-level reasoning; pass typed state and metrics between layers.',
            'Use uncertainty and confidence thresholds to gate deeper search or tool escalation.',
            'Prefer small, fast models for routing, critique, and selection; reserve large models for hard steps.',
            'Bound loops with iteration/time/token caps; add watchdogs and abort conditions.',
            'Instrument traces: strategy chosen, switches, tokens, latency, failure taxonomy, and outcomes.',
            'Offline-evaluate policies with scenario suites and counterfactual replays before production.',
            'Add human-in-the-loop for high‑risk actions; require provenance and audit trails.'
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
            <li>Simple, single-step tasks where a direct prompt or tool call meets quality and SLOs.</li>
            <li>Strict real-time paths with tight latency budgets that meta-control would exceed.</li>
            <li>Compliance-critical flows requiring fixed, auditable procedures without adaptive search.</li>
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
            <li>Unbounded search loops and over-sampling leading to token/cost blowups.</li>
            <li>Miscalibrated confidence scores causing premature stop or excessive depth.</li>
            <li>Reward hacking or proxy-metric overfitting; policies don’t generalize to production.</li>
            <li>Missing cancellation/idempotency when switching strategies or retrying tools.</li>
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
            'Strategy selection via bandits/RL and rule-based guards',
            'Confidence- and risk-aware depth control',
            'Cost/latency budgets with backpressure',
            'Self-consistency, backtracking, and debate/judge patterns',
            'Traceability: reasoning graphs, decisions, and provenance',
            'Learning from outcomes to improve future selection'
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
            <li>End-to-end task success vs strong single-strategy baselines.</li>
            <li>Cost and tokens per successful task; time-to-quality (p50/p95).</li>
            <li>Policy regret and switch efficacy (improvement after a switch).</li>
            <li>Calibration metrics: ECE/Brier for confidence and abort rates within budget.</li>
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
            <li>Run meta-control with smaller models; cap samples and tree width; early-exit on high confidence.</li>
            <li>Cache intermediate summaries; reuse KV cache; avoid duplicating context across branches.</li>
            <li>Parallelize independent probes sparingly with strict concurrency and token budgets.</li>
            <li>Amortize policy learning across batches; replay traces offline to refine selection.</li>
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
            <li>Complex multi-step problem solving: math, planning, code generation with tests/tools.</li>
            <li>Open-domain QA and research with retrieval, verification, and synthesis.</li>
            <li>Autonomous operations runbooks with adaptive depth and human escalation.</li>
            <li>Multi-agent teams requiring a supervisor to allocate tasks and adapt strategies.</li>
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
              <li><a href="https://arxiv.org/abs/2406.11698" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Meta Reasoning for Large Language Models (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2502.19918" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Meta-Reasoner: Dynamic Guidance for Optimized Inference-time Reasoning (2025)</a></li>
              <li><a href="https://aclanthology.org/2025.findings-naacl.440/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Meta-Reasoning Improves Tool Use in LLMs (Findings NAACL 2025)</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts: Deliberate Problem Solving with LLMs (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2210.03350" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-Consistency Improves Chain of Thought (2022)</a></li>
              <li><a href="https://link.springer.com/book/10.1007/978-3-642-24288-5" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Metareasoning: Thinking about Thinking in AI (Cox & Raja, 2011)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Azure: AI Agent Design Patterns</a></li>
              <li><a href="https://docs.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation: Supervisor/Graph Orchestration</a></li>
              <li><a href="https://gpt-index.readthedocs.io/en/stable/getting_started/agents.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: Agents and Supervisors</a></li>
              <li><a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy: Programmatic Optimization of LLM Pipelines</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen</a></li>
              <li><a href="https://www.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
              <li><a href="https://github.com/geekan/MetaGPT" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MetaGPT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.computer.org/publications/tech-news/trends/meta-reasoning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">IEEE Computer Society: Meta‑reasoning in Agents (2024–2025 coverage)</a></li>
              <li><a href="https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Blog: Multi‑Agent Orchestration with Reasoning (2024/2025)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};