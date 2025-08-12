'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface GraphOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const GraphOfThoughtDetails: React.FC<GraphOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Represents reasoning as a graph where nodes are thoughts (hypotheses, sub-goals, critiques, verifications)
            and edges are dependencies between them. Unlike linear Chain‑of‑Thought or strictly hierarchical Tree‑of‑Thought,
            Graph‑of‑Thought enables non‑linear exploration, backtracking, merging of parallel lines, and iterative refinement
            with scoring/selection over candidate subgraphs. This supports complex, interdependent problem solving and
            synthesis across multiple reasoning paths.
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
            <li>Problem framing and decomposition: define goal, constraints, and initial thought templates.</li>
            <li>Graph initialization: generate multiple seed thoughts and explicit dependencies/assumptions.</li>
            <li>Expansion policy: iteratively propose successor thoughts (diverse sampling/templates) from frontier nodes.</li>
            <li>Evaluation and scoring: score thoughts/subgraphs using rubrics, verifiers, retrieval‑grounded checks.</li>
            <li>Pruning and deduplication: remove dominated/duplicate nodes; maintain visited states to avoid loops.</li>
            <li>Cross‑path synthesis: merge compatible branches; reconcile conflicts with critique/repair nodes.</li>
            <li>Distillation and verification: compress the winning subgraph into a coherent solution and verify claims.</li>
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
            'Right-size thought granularity; prefer concise, testable thoughts with explicit assumptions.',
            'Use explicit evaluators: rubric prompts, unit checks, retrieval-grounded verifiers, or external tools.',
            'Control growth: cap branching factor/steps; use beam policies and early stopping with quality thresholds.',
            'Cache intermediate thoughts/scores; aggressively deduplicate semantically equivalent nodes.',
            'Encourage diversity (temperature, templates) early; tighten evaluation later for convergence.',
            'Instrument tokens, cost, and latency per expansion step; enforce budgets and fallbacks to simpler flows.',
            'Log edges with rationales to preserve interpretability and enable post-hoc audits.'
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
            <li>Straightforward tasks where linear CoT or direct answering meets quality and latency targets.</li>
            <li>Strict real‑time SLOs or hard cost caps that cannot tolerate branching/evaluation overhead.</li>
            <li>Domains lacking reliable evaluators or ground truth to score/verify intermediate thoughts.</li>
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
            <li>Combinatorial blow‑up from too‑large branching/depth without pruning or early stopping.</li>
            <li>Cycles and circular reasoning when visited states and deduplication are missing.</li>
            <li>Low‑quality or biased evaluators mis‑ranking paths; insufficient grounding/verification.</li>
            <li>Over‑merging incompatible branches leading to incoherent synthesis.</li>
            <li>Poor observability of token/cost budgets per step; hidden spend regressions.</li>
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
            'Non‑linear reasoning with backtracking and cross‑path merging',
            'Explicit dependency tracking between thoughts and sub‑goals',
            'Evaluator‑guided expansion and pruning of candidate subgraphs',
            'Conflict detection with critique/repair nodes and reconciliation',
            'Graph distillation into concise, verifiable solutions',
            'Compatibility with retrieval/tools and multi‑agent critiques'
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
            <li>Task quality: accuracy/pass‑rate on reasoning benchmarks or human‑rated quality.</li>
            <li>Search efficiency: explored nodes vs. unique useful nodes; average branching and depth.</li>
            <li>Cost/latency: input/output tokens, evaluator calls, wall‑clock per solved instance.</li>
            <li>Verifier agreement/consistency and post‑verification error rate.</li>
            <li>Interpretability: proportion of edges with rationales; reproducibility of solutions.</li>
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
            <li>Cost roughly scales with explored thoughts × prompt/context size + evaluator overhead.</li>
            <li>Mitigate using beam limits, early stopping, caching, and semantic deduplication.</li>
            <li>Prefer retrieval‑grounded, short prompts for evaluators; summarize context between steps.</li>
            <li>Track per‑step budgets and fall back to CoT when uncertainty and difficulty are low.</li>
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
            <li>Research synthesis and literature reviews with conflicting evidence.</li>
            <li>Strategic planning and multi‑constraint decision‑making with trade‑offs.</li>
            <li>Complex analysis, root‑cause investigation, and policy/argument mapping.</li>
            <li>Creative ideation that benefits from exploring and merging alternatives.</li>
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
              <li><a href="https://arxiv.org/abs/2308.09687" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Besta et al. (2023): Graph of Thoughts — Solving Elaborate Problems with LLMs</a></li>
              <li><a href="https://arxiv.org/abs/2401.06801" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Li (2024): Graph‑of‑Thought for Complex and Dynamic Business Problems</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/spcl/graph-of-thoughts" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SPCL: graph-of-thoughts (reference code)</a></li>
              <li><a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: control‑flow graphs for LLM workflows</a></li>
              <li><a href="https://dspy.ai" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy: programmatic prompting pipelines (supports graph‑like compositions)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>LangChain/LangGraph, LlamaIndex Workflows, NetworkX for graph ops</li>
              <li>Evaluators/verifiers: unit tests, retrieval+rERankers, Guardrails for schema/policy checks</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a>, <a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Discord</a></li>
              <li><a href="https://github.com/spcl/graph-of-thoughts/issues" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SPCL graph‑of‑thoughts: Issues/Discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default GraphOfThoughtDetails;