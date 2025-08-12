'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ProgressiveEnhancementDetails = () => {
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
            Progressive Enhancement in AI delivers an immediate baseline result and continuously improves it as more
            compute, time, or context becomes available. It implements the anytime-algorithms principle: return the
            best-available output at any point, then refine. In practice, this pairs fast, low-cost pathways (streaming,
            speculative decoding, early exits) with background refinement loops (self-refine, re-ranking, high-accuracy
            passes) while preserving responsiveness and user control.
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
            <li>Fast Path: stream a baseline answer quickly (token streaming; lightweight model or early-exit policy).</li>
            <li>Speculate: use draft decoding or shortcuts to accelerate target model generation; verify and commit tokens.</li>
            <li>Refine Iteratively: run self-feedback or re-ranking passes to improve coherence, correctness, and style.</li>
            <li>Escalate on Demand: invoke higher-precision models/tools for hard segments or low-confidence spans.</li>
            <li>Converge or Stop Early: allow user to accept current best, or continue improving asynchronously.</li>
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
            'Design for anytime returns: every partial state should be valid to show or store.',
            'Pair a latency-optimized baseline with quality-optimized refinements; surface progress visibly.',
            'Use confidence signals (logprobs, validators, ensembles) to decide when to refine or escalate.',
            'Keep edits minimal between iterations; preserve user caret and scroll context in UIs.',
            'Bound refinement loops with budgets and diminishing-returns checks to avoid quality thrash.',
            'Make improvements cancelable; persist checkpoints and deltas for auditability.',
            'Collect per-stage metrics (latency, tokens, acceptance rate) to tune the quality–speed curve.'
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
            <li>Hard real-time tasks with fixed deadlines where refinement phases risk deadline misses.</li>
            <li>Strictly deterministic compliance outputs where intermediate states could mislead users.</li>
            <li>Ultra-low-cost batch jobs where a single high-quality pass is cheaper than multi-pass refinement.</li>
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
            <li>Unbounded refinement loops increasing cost with negligible quality gains.</li>
            <li>UI jank from reflowing text without preserving cursor/scroll position.</li>
            <li>Speculative decoding without verification, leading to silent correctness errors.</li>
            <li>Mismatched expectations: users interpret early drafts as final answers.</li>
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
            'Anytime outputs with monotonic quality improvements',
            'Token streaming with user-controllable refinement',
            'Speculative decoding and verification to accelerate generation',
            'Early-exit/dynamic-depth to meet latency budgets',
            'Self-refine/self-critique loops for targeted corrections',
            'Selective escalation to stronger models or tools'
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
            <li>Time-to-first-token (TTFT) and time-to-usable-answer (TTUA).</li>
            <li>Final quality metrics (task accuracy, human rating) vs. cost and latency budgets.</li>
            <li>Refinement acceptance rate and cancel/stop-early rate.</li>
            <li>Speculative acceptance ratio and verified-token throughput.</li>
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
            <li>Cap tokens per refinement pass; summarize context between passes to bound growth.</li>
            <li>Use speculative decoding to shift work to a cheaper draft model and verify on the target model.</li>
            <li>Apply early-exit/dynamic-depth for latency SLAs; log per-layer exit stats.</li>
            <li>Track per-stage tokens, cost, and wall-clock to tune the speed–quality frontier.</li>
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
            <li>Interactive assistants where responsiveness is critical but quality benefits from refinement.</li>
            <li>Content generation/editing with iterative polishing (summaries, drafts, code fixes).</li>
            <li>Search and RAG with re-ranking and re-writing under tight latency budgets.</li>
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
              <li><a href="https://dl.acm.org/doi/10.1145/225540.225542" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Zilberstein (1996): The principles of anytime algorithms</a></li>
              <li><a href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Xin et al. (2020): DeeBERT: Dynamic Early Exiting for Efficient BERT Inference</a></li>
              <li><a href="https://arxiv.org/abs/2302.01318" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Leviathan et al. (2023): Fast Inference from Transformers via Speculative Decoding</a></li>
              <li><a href="https://arxiv.org/abs/2303.17651" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Shinn et al. (2023): Self-Refine: Iterative Refinement with Self-Feedback</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://platform.openai.com/docs/guides/realtime/streaming" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI: Streaming responses</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs/streaming" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic: Streaming with Messages API</a></li>
              <li><a href="https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Next.js: Streaming and loading UI</a></li>
              <li><a href="https://docs.vllm.ai/en/latest/serving/spec_decode.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: Speculative decoding</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://sdk.vercel.ai/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Vercel AI SDK (React streaming UI)</a></li>
              <li>Serving stacks with speculative decoding (vLLM), early-exit policies, and rerankers</li>
              <li>Evaluation tools for human ratings and latency/cost logging</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://openai.com/research/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI research and engineering blogs</a></li>
              <li><a href="https://www.anthropic.com/news" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic updates and best practices</a></li>
              <li>Conference talks on low-latency LLM inference and anytime methods</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};