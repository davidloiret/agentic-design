'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const GoalDecompositionDetails = () => {
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
            Goal Decomposition turns an ambitious objective into SMART sub-goals and executable tasks, maps
            dependencies as a DAG, prioritizes via impact/urgency, and executes iteratively with feedback.
            In agent systems, LLMs propose sub-goals while symbolic schedulers/validators ensure feasibility,
            safety, and resource alignment.
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
            <li>Define goal, scope, constraints, and success criteria (SMART, guardrails, deadlines).</li>
            <li>Generate candidate sub-goals; cluster and deduplicate; validate coverage vs. goal.</li>
            <li>Break sub-goals into tasks with owners, estimates, acceptance criteria, and risks.</li>
            <li>Construct a dependency graph (DAG); identify critical path and parallelizable work.</li>
            <li>Prioritize (impact × urgency × risk); stage into milestones with buffers.</li>
            <li>Allocate resources; set SLOs; define stop conditions and rollback/repair policies.</li>
            <li>Execute–measure–learn loop: monitor metrics; replan on deviations; retire or merge tasks.</li>
            <li>Finalize and retrospect: compare outcomes to goals; capture templates for reuse.</li>
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
            'Write goals as SMART with explicit out-of-scope items; keep decomposition tree shallow but complete.',
            'Model dependencies explicitly; prefer partial orders to unlock safe parallelism.',
            'Define acceptance criteria per task; add quality gates and automated checks where possible.',
            'Bound recursion depth and branching factor; cap iterations and enforce stop criteria.',
            'Use evidence-driven reprioritization (metrics, risks, blockers) at a fixed cadence.',
            'Separate LLM ideation from symbolic validation/scheduling; log provenance and decisions.',
            'Version goal trees; reuse proven subtrees/templates; cache recurring prompts/results.',
            'Track risks/assumptions; maintain mitigation tasks on the same board as delivery tasks.',
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
            <li>Trivial or one-step tasks where planning overhead adds latency without benefit.</li>
            <li>Ill-posed or shifting goals without stakeholder alignment and measurable outcomes.</li>
            <li>Hard real-time paths with microsecond budgets; use reactive policies instead.</li>
            <li>Safety-critical actions without human review or formal verification.</li>
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
            <li>Over-decomposition causing cost/latency blowups with little quality gain.</li>
            <li>Missing prerequisites or hidden coupling leading to plan invalidation downstream.</li>
            <li>Unbounded iteration or lack of stop criteria; goal drift and scope creep.</li>
            <li>Metrics misalignment (activity vs. outcome) obscuring true progress.</li>
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
            'SMART sub-goals with owners and acceptance criteria',
            'Dependency graph (DAG) with critical-path analysis',
            'Parallelizable task groups and milestone staging',
            'Risk register, buffers, and plan-repair policies',
            'Progress tracking with status roll-ups and audits',
            'LLM-assisted ideation + symbolic validation/scheduling',
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
            <li>Goal attainment rate; variance to target (time, cost, quality).</li>
            <li>Critical-path length and on-time milestone rate; replan/repair frequency.</li>
            <li>Sub-goal coverage and decomposition quality (rubric/peer review).</li>
            <li>Throughput and lead time; blocked-time percentage.</li>
            <li>For LLM-augmented planning: tokens per plan, cost per successful execution, latency p50/p95.</li>
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
            <li>Token budget grows with depth × breadth; prune and cache reusable subtrees/templates.</li>
            <li>Prefer concise structured prompts; pass state by reference; cap turns per node.</li>
            <li>Batch validations; stream progress updates; use retrieval instead of re-sending large context.</li>
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
            <li>Product launches, research roadmaps, and multi-workstream programs.</li>
            <li>Incident response and reliability engineering with parallel tasking.</li>
            <li>Operational excellence: process improvements with measurable targets.</li>
            <li>Education/personal productivity: study plans, career plans, habit systems.</li>
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
              <li><a href="https://arxiv.org/abs/1403.7426" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HTN Planning Overview (2014)</a></li>
              <li><a href="https://arxiv.org/abs/1911.05499" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HDDL: Language for Hierarchical Planning (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2212.14052" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chain-of-Thought &amp; Self-Consistency (2023)</a></li>
              <li><a href="https://jair.org/index.php/jair/article/view/10309" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SHOP2 HTN Planner (2003)</a></li>
              <li><a href="https://www.jair.org/index.php/jair/article/view/1037" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Options Framework for HRL (1999)</a></li>
              <li><a href="https://arxiv.org/abs/2307.03893" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Survey: Planning with LLMs (2023/2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: Planner–Executor Patterns</a></li>
              <li><a href="https://docs.prefect.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Prefect: DAG-based Orchestration</a></li>
              <li><a href="https://airflow.apache.org/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Airflow: DAG Scheduling</a></li>
              <li><a href="https://panda-hddl.github.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PANDA HTN Planner</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools &amp; Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangChain, LlamaIndex, <a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy</a></li>
              <li><a href="https://networkx.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NetworkX</a> for dependency DAGs; graph UIs (Mermaid, React Flow)</li>
              <li>Planning toolkits: PANDA, SHOP2/JSHOP2, PyHOP</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community &amp; Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://icaps-conference.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ICAPS</a> and <a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AAAI</a> planning tracks</li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a> and <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/MachineLearning</a></li>
              <li>Engineering blogs on program management, DAG orchestration, and LLM planning</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};