'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ConstraintSatisfactionDetails = () => {
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
            Formalize the problem as variables with finite domains and constraints over them. Apply constraint
            propagation (e.g., arc/path consistency) to prune domains, then search with heuristics such as
            minimum-remaining-values and least-constraining-value with backtracking/forward checking. For
            optimization, use CP-SAT/MILP/SMT encodings to optimize an objective under hard constraints while
            scoring soft preferences.
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
            <li>Model: define variables, finite domains, hard vs soft constraints, objective (if any).</li>
            <li>Preprocess: normalize units; add implied and symmetry-breaking constraints.</li>
            <li>Propagate: enforce consistency (e.g., AC-3/MAC); reduce domains before search.</li>
            <li>Search: backtracking with forward checking; MRV/degree for variable order; LCV for values.</li>
            <li>Optimize: branch-and-bound or CP-SAT; warm starts; time/optimality-gap limits.</li>
            <li>Validate/Explain: verify feasibility; inspect conflicts; export solutions.</li>
            <li>Iterate: adjust weights, add constraints; incremental re-solve on changes.</li>
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
            'Separate hard vs soft constraints with explicit weights/priorities.',
            'Use strong global constraints (all-different, cumulative) and symmetry breaking.',
            'Enable MAC/forward checking; MRV/degree and LCV ordering to reduce branching.',
            'Prefer CP-SAT for large discrete problems; MILP for linear numeric; SMT for logical/bitvector.',
            'Use time limits and optimality gaps; persist best-feasible solutions and solver logs.',
            'Warm-start from historical solutions; use incremental solving when inputs change slightly.',
            'Attach IDs/explanations to constraints for debuggability and user-facing justifications.',
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
            <li>Purely creative generation where feasibility cannot be verified.</li>
            <li>Rapidly changing/undefined constraints relative to solver turnaround.</li>
            <li>Hard real-time microsecond control loops.</li>
            <li>Strongly non-linear continuous dynamics without tractable encodings.</li>
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
            <li>Over-constraining (infeasible) without relaxations or soft penalties.</li>
            <li>Missing key limits (capacity, temporal windows) yielding invalid solutions.</li>
            <li>No heuristics/propagation → exponential search and timeouts.</li>
            <li>Omitting symmetry breaking; bloated equivalent search spaces.</li>
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
            'Finite-domain variables; global constraints (all-different, cumulative, table).',
            'Propagation: arc/path consistency, MAC, forward checking.',
            'Heuristics: MRV/degree and LCV; restarts, nogoods, backjumping.',
            'Optimization: weighted soft constraints; branch-and-bound; CP-SAT.',
            'Explanations/conflict sets for diagnoses and user guidance.',
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
            <li>Feasibility rate; hard-violation count (target 0); soft-violation score.</li>
            <li>Objective value or optimality gap vs baseline; time-to-first-feasible; total solve time.</li>
            <li>Nodes/backtracks; propagation efficiency; SLA adherence; resource utilization.</li>
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
            <li>Tokens: modeling/explanations if using LLM; solving cost is CPU/RAM-heavy.</li>
            <li>Set time limits/gaps; cache models; reuse warm starts and incremental states.</li>
            <li>Track peak memory, conflicts, and propagation stats from solver logs.</li>
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
            <li>Scheduling/rostering; resource and fleet routing; deployment planning.</li>
            <li>Product/cloud/network configuration with compatibility/capacity rules.</li>
            <li>Multi-agent coordination under compliance, locality, or safety constraints.</li>
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
              <li>Dechter, R. Constraint Processing. Morgan Kaufmann. <a href="https://www.elsevier.com/books/constraint-processing/dechter/978-1-55860-890-0" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Publisher</a></li>
              <li>Rossi, van Beek, Walsh. Handbook of Constraint Programming. <a href="https://www.elsevier.com/books/handbook-of-constraint-programming/rossi/978-0-444-52726-4" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Publisher</a></li>
              <li>Mackworth, A.K. Arc consistency foundations. <a href="https://en.wikipedia.org/wiki/Arc_consistency" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Overview</a></li>
              <li>Minton, S. et al. Min-Conflicts heuristic for CSPs.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://developers.google.com/optimization" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google OR-Tools CP-SAT guides</a></li>
              <li><a href="https://www.minizinc.org/doc-latest/en/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MiniZinc Tutorial</a> and <a href="https://sofdem.github.io/gccat/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Global Constraint Catalogue</a></li>
              <li><a href="https://choco-solver.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Choco-solver docs</a>, <a href="https://www.gecode.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Gecode</a></li>
              <li><a href="https://github.com/Z3Prover/z3" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Z3 SMT solver</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>OR-Tools (CP-SAT), MiniZinc, Choco, Gecode, OptaPlanner, python-constraint.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cp-conference.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Principles and Practice of Constraint Programming (CP)</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/constraint-programming" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stack Overflow: constraint-programming</a> and <a href="https://groups.google.com/g/or-tools-discuss" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OR-Tools Discuss</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};