'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const LongCotDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Long Chain of Thought extends standard step-by-step reasoning with deeper, dynamically allocated thinking time at inference.
            Practically, it generates longer reasoning traces, samples multiple chains (self-consistency), verifies intermediate steps,
            and selectively allocates more compute to hard instances. This improves reliability on complex tasks at the cost of more
            tokens and latency.
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
            <li>Prompt scaffolding: define clear goals, constraints, and step format; prepare verifier or rubric if applicable.</li>
            <li>Adaptive thinking budget: set max steps, temperature, and optional multi-sample count (self-consistency).</li>
            <li>Reasoning generation: produce chain(s) with explicit intermediate calculations, assumptions, and checks.</li>
            <li>Verification and selection: validate intermediate results, discard inconsistent chains, select majority/score-best.</li>
            <li>Distill and finalize: compress to a concise, verifiable answer; log telemetry (tokens, latency, success).</li>
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
            'Use structured step templates (Given → Plan → Steps → Check → Answer) to prevent meandering.',
            'Prefer multiple short chains + selection over a single ultra-long chain for robustness.',
            'Introduce lightweight verifiers (unit checks, dimensional analysis, constraint checks).',
            'Route by difficulty: allocate more samples/steps only when uncertainty is high.',
            'Cap depth and summarize periodically to control token growth and maintain coherence.',
            'Cache intermediate computations and reuse context across retries to reduce cost.',
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
            <li>Simple lookups or routine tasks where direct answers meet accuracy and latency goals.</li>
            <li>Strict real-time systems with tight SLOs where extra steps or sampling breaks latency budgets.</li>
            <li>Domains lacking verifiable intermediate checks, making long chains hard to validate.</li>
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
            <li>Overlong, drifting chains without checkpoints or periodic summaries.</li>
            <li>Error propagation from early mistakes; lack of verification leads to confident wrong answers.</li>
            <li>Unbounded token spend from high sampling counts without early stopping or routing.</li>
            <li>Selection bias if majority voting is used without diversity or quality scoring.</li>
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
            'Extended step-by-step reasoning depth with dynamic budgets',
            'Multi-sample self-consistency and chain selection',
            'Intermediate verification and constraint checking',
            'Difficulty-aware routing and adaptive compute allocation',
            'Periodic summarization to maintain context quality',
            'Telemetry for cost/latency/accuracy at the chain level',
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
            <li>Task accuracy/pass-rate on reasoning benchmarks and internal evals.</li>
            <li>Compute efficiency: tokens, wall-clock, and cost per solved instance.</li>
            <li>Chain quality: verifier pass-rate, consistency across samples, error rate after verification.</li>
            <li>Budget adherence: proportion of runs within target token/latency caps.</li>
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
            <li>Cost scales with reasoning length (L) × number of samples (S) + verification overhead.</li>
            <li>Use routing to long chains only for hard cases; cap S and apply early stopping.</li>
            <li>Summarize periodically; cache reusable context; compress traces when feasible.</li>
            <li>Track per-step tokens/latency to prevent regressions; prefer short, diverse chains over one very long chain.</li>
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
            <li>Complex math/logic problems, scientific reasoning, and program analysis.</li>
            <li>Strategic planning and multi-constraint decision-making requiring lookahead.</li>
            <li>High-stakes domains where transparency and verifiable steps are required.</li>
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
              <li><a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wei et al. (2022): Chain-of-Thought Prompting Elicits Reasoning</a></li>
              <li><a href="https://arxiv.org/abs/2203.11171" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wang et al. (2022): Self-Consistency Improves Chain of Thought</a></li>
              <li><a href="https://arxiv.org/abs/2205.11916" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kojima et al. (2022): Large Language Models are Zero-Shot Reasoners</a></li>
              <li><a href="https://arxiv.org/abs/2502.05171" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Geiping et al. (2025): Scaling up Test-Time Compute with Latent Reasoning (Recurrent Depth)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lilianweng.github.io/posts/2025-05-01-thinking/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lilian Weng (2025): Thinking at Inference Time</a></li>
              <li><a href="https://www.promptingguide.ai/techniques/chain-of-thought" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Prompt Engineering Guide: Chain-of-Thought</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/expression_language/how_to/self_consistency" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: Self-Consistency and reasoning utilities</a></li>
              <li><a href="https://github.com/microsoft/guidance" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Guidance: Structured generation</a></li>
              <li><a href="https://github.com/stanfordnlp/dspy" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy (Stanford): Programmatic prompting and tracing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Reasoning and prompting</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};