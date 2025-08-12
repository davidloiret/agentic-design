'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const HybridReasoningDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Hybrid Reasoning Systems integrate symbolic logic (rules, constraints, knowledge graphs) with statistical/connectionist
            methods (neural networks, probabilistic models). The symbolic layer enforces structure, consistency, and explainability,
            while the statistical layer provides perception, pattern recognition, and uncertainty modeling. Integration patterns
            include pipeline (neural → symbolic), neuro-symbolic learning (differentiable logic), shared latent spaces, and
            arbitration/ensembling across paradigms.
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
            <li>Problem decomposition: map sub-tasks to symbolic vs. statistical strengths.</li>
            <li>Knowledge modeling: define ontologies/rules/constraints; curate training data and features.</li>
            <li>Integration design: choose pattern (pipeline, joint/differentiable, co-training, arbitration).</li>
            <li>Implementation: wire solvers (e.g., SAT/SMT/ILP), probabilistic logic, and neural models with clean interfaces.</li>
            <li>Inference and fusion: run components; reconcile via constraints, weights, or meta-reasoners.</li>
            <li>Evaluation: measure correctness, faithfulness to rules, calibration, latency, and cost.</li>
            <li>Monitoring & iteration: analyze failures (rule gaps vs. model errors) and update both sides.</li>
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
            'Keep symbolic knowledge modular (facts, rules, constraints) with explicit provenance and versioning.',
            'Use hybrid retrieval: combine lexical + embedding search; maintain grounding with citations.',
            'Validate neural outputs with constraints; prefer repair/explanation over silent overrides.',
            'Adopt differentiable logic or neuro-symbolic layers when gradients are needed end-to-end.',
            'Calibrate model confidence; route hard cases to stricter symbolic checks or human review.',
            'Benchmark by slice (easy/medium/hard; seen/unseen schemas) and ablate each component.',
            'Design for observability: log rule firings, constraint violations, and arbitration decisions.',
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
            <li>Tasks solvable by a single paradigm with adequate quality and lower complexity/cost.</li>
            <li>Hard real-time systems where multi-component latency violates SLOs.</li>
            <li>Lack of maintainable knowledge assets or domain expertise to sustain rules/ontologies.</li>
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
            <li>Inconsistent schemas between neural outputs and symbolic inputs causing brittle pipelines.</li>
            <li>Unbounded reasoning depth or constraint explosion leading to timeouts.</li>
            <li>Silent rule conflicts; lack of arbitration policy or explainability for overrides.</li>
            <li>Data leakage between training and rule design inflating apparent performance.</li>
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
            'Symbolic constraints and rule enforcement',
            'Probabilistic/uncertainty-aware reasoning',
            'Neural perception and representation learning',
            'Knowledge grounding with ontologies/graphs',
            'Explainable decision traces and rule firings',
            'Arbitration and confidence-weighted fusion',
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
            <li>Task accuracy and constraint satisfaction rate; violation density per 1K tasks.</li>
            <li>Calibration (Brier/ACE), uncertainty coverage, and escalation/override rates.</li>
            <li>Latency p50/p95 and solver timeouts; cost per task and component utilization.</li>
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
            <li>Prompt/context budgets for LLM components; favor retrieve-then-reason and compress citations.</li>
            <li>External compute: solver calls (SMT/ILP/ASP), probabilistic logic, vector search, rerankers.</li>
            <li>Heuristics: early-exit on high-confidence; cap iterations/hops; cache intermediate artifacts.</li>
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
            <li>Compliance and decision support: apply formal rules with learned extraction and ranking.</li>
            <li>Scientific/technical reasoning: constraint-aware planning, theorem-style checks, unit consistency.</li>
            <li>Complex QA over knowledge graphs: grounded retrieval with symbolic consistency validation.</li>
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
              <li><a href="https://arxiv.org/abs/2102.11965" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Modular Design Patterns for Hybrid Learning and Reasoning Systems (2021)</a></li>
              <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7250607/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hybrid Reasoning Over Large Knowledge Bases (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2409.17433" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HDFlow: Hybrid Thinking & Dynamic Workflows (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2505.14631" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Think Only When You Need with Large Hybrid-Reasoning Models (2025)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://link.springer.com/chapter/10.1007/978-3-642-04581-3_1" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hybrid Reasoning with Rules and Ontologies</a></li>
              <li><a href="https://link.springer.com/article/10.1007/s10115-024-02228-x" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hybrid rules/cases/processes in medical decision support (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://dtai.cs.kuleuven.be/problog/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ProbLog / DeepProbLog</a>, <a href="https://arxiv.org/abs/2007.08176" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NeurASP</a>, <a href="https://arxiv.org/abs/2005.00330" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Logical Neural Networks (LNN)</a></li>
              <li><a href="https://github.com/Z3Prover/z3" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Z3 SMT</a>, <a href="https://www.gurobi.com/documentation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Gurobi/ILP</a>, <a href="https://docs.getmods.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Graph/ontology reasoners (e.g., RDFox/Pellet)</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain</a> / <a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex</a> for orchestration with constraints and tool/solver calls</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.journals.elsevier.com/artificial-intelligence" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Artificial Intelligence journal & hybrid intelligence workshops</a></li>
              <li><a href="https://www.semantic-web-journal.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Semantic Web community (reasoners, ontologies, KGs)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};