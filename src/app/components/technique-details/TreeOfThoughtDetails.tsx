'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface TreeOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const TreeOfThoughtDetails: React.FC<TreeOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism (short conceptual overview) */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism (short conceptual overview)
        </h2>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Structures reasoning as a branching tree of coherent thoughts. From each state, the model generates multiple
            candidate thoughts, evaluates them, prunes weak paths, and continues expanding promising ones with
            lookahead and backtracking as needed. Generalizes linear Chain-of-Thought by enabling exploration of
            alternatives under a search policy (e.g., breadth-first, depth-first, beam).
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Define thought granularity and goal state; set width/depth, budget, and stopping criteria.</li>
            <li>Generate K candidate thoughts at each state (diverse sampling or guided templates).</li>
            <li>Score/evaluate states using rubrics, verifiers, or value prompts; retain top candidates.</li>
            <li>Expand according to a search policy (BFS/DFS/beam); deduplicate and avoid loops.</li>
            <li>Backtrack if progress stalls; continue until solution, max depth, or budget reached.</li>
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
            'Right-size thought steps; avoid too coarse (miss lookahead) or too fine (token blow-up).',
            'Use explicit evaluation rubrics or verifier prompts; separate generation vs. evaluation roles.',
            'Limit branching factor and depth; prefer beam search with small K and early stopping.',
            'Encourage diversity with temperature, nucleus sampling, or paraphrased thought prompts.',
            'Cache evaluated states; deduplicate equivalent states to prevent cycles.',
            'Set budget-aware halting (token/time caps) and fail-safe fallbacks to linear CoT.',
            'For factual tasks, ground evaluation with retrieval or external verifiers when possible.',
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
            <li>Simple queries where linear CoT or direct answering meets quality and latency goals.</li>
            <li>Strict real-time or tight SLO paths where branching overhead violates latency/cost budgets.</li>
            <li>Tasks lacking reliable evaluation criteria or verifiable intermediate states.</li>
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
            <li>Combinatorial explosion from large K/depth without pruning or halting policies.</li>
            <li>Mode collapse: insufficient diversity causing repeated or redundant branches.</li>
            <li>Over-pruning early: discarding viable paths due to weak or biased evaluators.</li>
            <li>Looping states and circular reasoning without deduplication or cycle checks.</li>
            <li>Unverified claims when evaluation lacks grounding or external checks.</li>
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
            'Branching exploration of alternative reasoning paths',
            'Backtracking and lookahead for global decision quality',
            'Evaluator-guided pruning and selection',
            'Search-policy control (BFS/DFS/beam) and budgets',
            'Separation of generation and evaluation prompts',
            'Compatibility with self-consistency and verification',
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
            <li>Task success/accuracy on reasoning benchmarks (e.g., puzzles, math, planning).</li>
            <li>Compute efficiency: tokens, steps, and wall-clock per solved instance.</li>
            <li>Diversity/coverage of explored paths vs. redundancy rate.</li>
            <li>Verifier agreement/consistency across branches (if using judges/verifiers).</li>
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
            <li>Cost scales with branching factor (K), depth (D), and evaluation overhead.</li>
            <li>Use beam search, early stopping, and evaluator filters to cap expansion.</li>
            <li>Cache intermediate thoughts and scores; dedupe states to reduce waste.</li>
            <li>Adopt budget-aware routing: fall back to CoT when uncertainty/budget is low.</li>
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
            <li>Combinatorial puzzles and math word problems with pivotal early choices.</li>
            <li>Strategic planning and multi-step decision-making with lookahead.</li>
            <li>Creative ideation where exploring alternatives improves quality.</li>
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
              <li>
                <a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Yao et al. (2023): Tree of Thoughts — Deliberate Problem Solving with LLMs</a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wei et al. (2022): Chain-of-Thought Prompting Elicits Reasoning</a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/2410.17820" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chen et al. (2024): When ToT Succeeds — Larger Models Excel in Generation</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://huggingface.co/blog/sadhaklal/tree-of-thoughts" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Blog: Understanding and Implementing ToT</a></li>
              <li><a href="https://deepgram.com/learn/tree-of-thoughts-prompting" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Deepgram: Tree-of-Thoughts Prompting</a></li>
              <li><a href="https://www.geeksforgeeks.org/artificial-intelligence/tree-of-thought-tot-prompting/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GeeksforGeeks: Tree-of-Thought Prompting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/princeton-nlp/tree-of-thought-llm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Princeton NLP: tree-of-thought-llm (reference implementation)</a></li>
              <li><a href="https://python.langchain.com/docs/expression_language/how_to/graph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain/LangGraph: Graph workflows for branching reasoning</a></li>
              <li><a href="https://github.com/microsoft/guidance" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Guidance: Structured generation to orchestrate search</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Reasoning & prompting</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
              <li><a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/MachineLearning - ToT discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default TreeOfThoughtDetails;