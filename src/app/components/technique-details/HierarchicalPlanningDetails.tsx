'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const HierarchicalPlanningDetails = () => {
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
            Hierarchical Planning structures a goal into a hierarchy of tasks and sub-tasks using domain-specific
            decomposition methods. In Hierarchical Task Network (HTN) planning, abstract tasks are recursively
            refined into primitive actions via methods, producing an executable plan that respects orderings,
            causal preconditions, and resource constraints. In agent systems, this enables multi-level strategy →
            tactics → actions, and can be augmented with LLMs for hypothesis generation while a symbolic planner
            validates feasibility and constraints.
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
            <li>Define initial state, goal(s), and domain model: operators/actions, methods, resources, constraints.</li>
            <li>Top-down decomposition: select an abstract task; choose a method; introduce ordered/partial sub-tasks.</li>
            <li>Constraint propagation: maintain preconditions, effects, causal links, and temporal/resource bounds.</li>
            <li>Refine until leaves are primitive actions; insert ordering edges and resolve dependencies.</li>
            <li>Scheduling and resource assignment: allocate agents/resources; detect conflicts; adjust ordering.</li>
            <li>Execute leaves; monitor outcomes and state; log provenance and metrics.</li>
            <li>Replan/repair on failure or exogenous changes (method re-selection, plan repair, or partial rollback).</li>
            <li>Iterate with feedback: update domain knowledge/methods; tighten constraints and heuristics.</li>
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
            'Model domain knowledge explicitly: operators with precise preconditions/effects; methods with guard conditions.',
            'Keep methods small, composable, and alternatives-rich; use heuristics to guide method choice.',
            'Use partial-order planning when possible to enable safe parallelism and flexible scheduling.',
            'Instrument constraint checking early; propagate resources/time windows to detect conflicts sooner.',
            'Adopt plan repair policies (retry, method swap, skip, or rollback) and log failure traces.',
            'Separate LLM creativity (hypothesis/method suggestion) from symbolic validation and execution.',
            'Version domain models; run regression tests on canonical tasks; track plan optimality and stability.',
            'Bound search depth/branching; cache subplans; reuse templates for recurring subtrees.',
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
            <li>Trivial/single-step tasks where planning overhead adds latency with no quality gain.</li>
            <li>Highly stochastic, adversarial, or poorly modeled domains where methods cannot encode reliable priors.</li>
            <li>Hard real-time control loops with microsecond budgets; prefer reactive policies/behaviors.</li>
            <li>Noisy LLM-only plans without downstream validation for safety/feasibility.</li>
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
            <li>Overly deep hierarchies with exploding branching factor and token/cost blowups.</li>
            <li>Inconsistent state updates or missing preconditions/effects causing plan invalidation downstream.</li>
            <li>Rigid total-order plans where partial orders would allow parallelism and robustness.</li>
            <li>Letting LLM outputs bypass constraint checks, leading to unsafe or impossible actions.</li>
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
            'Hierarchical Task Networks (HTN) with abstract → primitive refinement',
            'Method libraries with guards and alternatives',
            'Partial-order planning and safe parallel execution',
            'Constraint, resource, and temporal reasoning',
            'Plan repair and replanning under uncertainty',
            'LLM-augmented method suggestion with symbolic validation',
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
            <li>Plan success rate; replan/repair rate; failure recovery time.</li>
            <li>Plan cost/optimality (time, distance, energy) and makespan; resource utilization.</li>
            <li>Branching factor and average decomposition depth; search time.</li>
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
            <li>Token budget scales with depth × breadth of decomposition; cache reusable subplans/templates.</li>
            <li>Prefer structured prompts and short method names; avoid inlining large state—pass references.</li>
            <li>Use symbolic planner for validation to avoid repeated LLM calls; cap turns per node and prune early.</li>
            <li>Batch-check constraints; log traces compactly; stream execution results to reduce memory.</li>
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
            <li>Complex project/program management with interdependent workstreams.</li>
            <li>Robotics and embodied agents requiring long-horizon task decomposition (e.g., household or warehouse tasks).</li>
            <li>Workflow orchestration and multi-agent coordination with resource/temporal constraints.</li>
            <li>Product design, research roadmaps, and enterprise process automation.</li>
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
              <li><a href="https://arxiv.org/abs/1403.7426" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Georgievski & Aiello (2014): An Overview of Hierarchical Task Network Planning</a></li>
              <li><a href="https://arxiv.org/abs/1911.05499" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Höller et al. (2020): HDDL — A Language to Describe Hierarchical Planning Problems</a></li>
              <li><a href="https://jair.org/index.php/jair/article/view/10309" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Nau et al. (2003): SHOP2: An HTN Planning System (JAIR)</a></li>
              <li><a href="https://arxiv.org/abs/2204.01691" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SayCan (2022): Grounding language in robotic affordances</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts (2023): Deliberate problem solving with search</a></li>
              <li><a href="https://arxiv.org/abs/2307.03893" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">A Survey on Planning with Large Language Models (2023/2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://panda-hddl.github.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PANDA HTN Planner: Documentation</a></li>
              <li><a href="https://github.com/pyhop/pyhop" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyHOP (Python HTN): Tutorial & Examples</a></li>
              <li><a href="https://www.cs.umd.edu/projects/shop/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SHOP/SHOP2 Resources</a></li>
              <li><a href="https://arxiv.org/abs/1911.05499" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HDDL specification (problem/domain modeling)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>PANDA (HTN Planner), SHOP2/JSHOP2, PyHOP</li>
              <li>HDDL tooling and parsers; domain/model validators</li>
              <li>Agent orchestration: <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a> for planner–executor loops</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://icaps-conference.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ICAPS: International Conference on Automated Planning and Scheduling</a></li>
              <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AAAI planning tracks and workshops</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a> and <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/MachineLearning</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};