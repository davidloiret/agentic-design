'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const AdaptiveThinkingDetails = () => {
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
            Adaptive Thinking Systems use a meta-controller to analyze task signals (domain, difficulty,
            novelty, risk, latency/cost budgets) and dynamically select the right reasoning strategy and
            compute policy. They combine strategy routing (e.g., direct answer, short/long chain-of-thought,
            tool use, retrieval/no-retrieval, verification), adaptive compute (early-exit, cascades, dynamic
            depth/width), and feedback loops to continuously improve policies from evaluations and production
            telemetry.
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
            <li>Assess task: estimate domain, difficulty, novelty, risk, and SLO budgets (latency/cost).</li>
            <li>Route strategy: choose reasoning mode (direct, short/long CoT, ToT, program-of-thought, tool use, RAG/no‑RAG).</li>
            <li>Allocate compute: set max tokens, steps, halting thresholds, model cascade, and verification plan.</li>
            <li>Execute with monitors: uncertainty/calibration, self‑consistency, retrieval quality, tool outcomes.</li>
            <li>Reflect/verify selectively: self‑critique or verifier checks for high‑risk claims or actions.</li>
            <li>Adapt/iterate: early‑exit on confidence; otherwise expand depth, retrieve more, or escalate model.</li>
            <li>Learn policies: log routes, costs, quality; update thresholds/routers from evals and live telemetry.</li>
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
            'Use small/fast models or lightweight heuristics for routing; reserve large models for deep reasoning.',
            'Calibrate uncertainty/confidence before using it for halting/routing (temperature scaling, ensembling).',
            'Set explicit budgets: max tokens, steps, model hops, tool calls; always provide safe fallbacks.',
            'Evaluate by slice (domain, difficulty, novelty); ablate each adaptive component to prove value.',
            'Add selective verification for high‑impact actions/claims; avoid verifying everything.',
            'Instrument everything: per‑request cost/latency, escalation rate, quality deltas vs. fixed baselines.',
            'Cache retrievals, summaries, prompts, and KV; deduplicate across turns and sessions.'
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
            <li>Uniform, low‑variance tasks where a fixed prompt/model meets quality and SLOs.</li>
            <li>Hard real‑time or compliance‑critical flows that require fully deterministic pipelines.</li>
            <li>Ultra‑tight resource budgets where routing/monitoring overhead exceeds value.</li>
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
            <li>Miscalibrated routers/thresholds → excessive escalations or premature exits.</li>
            <li>Unbounded recursion (tools/retrieval/reflection) leading to cost/latency blow‑ups.</li>
            <li>Overfitting routers to benchmarks; poor generalization to real‑world traffic.</li>
            <li>Missing observability: no per‑stage tokens/costs, no attribution to final task success.</li>
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
            'Strategy selection (direct ↔ CoT/ToT, tool use, RAG/no‑RAG, verification).',
            'Adaptive compute policies (early‑exit, cascades, dynamic width/depth, patience).',
            'Uncertainty‑ and budget‑aware routing aligned to product SLOs.',
            'Meta‑reasoning and self‑reflection to detect and correct reasoning failures.',
            'Selective verification and evaluator‑guided refinement.',
            'Full observability of routing choices and per‑stage KPIs.'
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
            <li>Task success/quality uplift vs. fixed‑policy baselines; evaluator pass/win rates.</li>
            <li>Tokens and cost per successful task; tokens saved (%) vs. long‑CoT baseline.</li>
            <li>Latency p50/p95 and SLO‑breach rate; escalation and retry rates.</li>
            <li>Router regret/accuracy; verification catch rate for high‑risk errors.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
          <p>
            Control average tokens via early‑exit halting, cascaded routing, adaptive context sizing, and selective
            verification. Reuse KV/prefix/context; prefer sparse or staged compute to dense scale‑ups when latency‑ or
            cost‑bound.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Budgets: max input/output tokens, max steps/hops, max tool/verify calls.</li>
            <li>Throughput: batch/coalesce; prioritize short prompts for tail‑latency; enable speculative/assisted decoding.</li>
            <li>Caching: prompt/prefix/KV and retrieval/result caches; deduplicate across turns/sessions.</li>
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
            <li>High‑volume assistants with mixed difficulty and strict latency/cost SLOs.</li>
            <li>Research/coding agents needing selective deep dives and verifier‑guided checks.</li>
            <li>Adaptive tutoring and onboarding that personalize strategy depth and modality.</li>
            <li>Incident/ops response where uncertainty‑aware routing and escalation are critical.</li>
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
              <li><a href="https://arxiv.org/abs/1603.08983" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Adaptive Computation Time (Graves, 2016)</a></li>
              <li><a href="https://arxiv.org/abs/1910.10073" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Depth‑Adaptive Transformer (Elbayad et al., 2019)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04037" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DynaBERT: Adaptive Width and Depth (Hou et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2207.07061" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CALM: Confident Adaptive Language Modeling (Schuster et al., 2022)</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts: Deliberate Problem Solving (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2303.11366" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Reflexion: Language Agents with Verbal Reinforcement Learning (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: dynamic routing with conditional edges</a></li>
              <li><a href="https://docs.llamaindex.ai/en/stable/module_guides/deploying/query_engine/router_query_engine/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex: RouterQueryEngine</a></li>
              <li><a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy: programmatic pipelines and policy learning</a></li>
              <li><a href="https://docs.ray.io/en/latest/serve/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Serve: routing DAGs and conditional deployments</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: high‑throughput inference and speculative decoding</a></li>
              <li><a href="https://huggingface.co/docs/text-generation-inference" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face TGI: inference server</a></li>
              <li><a href="https://github.com/routeLLM/routeLLM" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RouteLLM: LLM routing framework</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Cookbook: design patterns and evaluations</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic docs: prompting and safety guidance</a></li>
              <li><a href="https://github.com/vllm-project/vllm/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM GitHub discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};