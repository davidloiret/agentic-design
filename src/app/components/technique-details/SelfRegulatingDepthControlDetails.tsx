'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const SelfRegulatingDepthControlDetails = () => {
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
            Dynamically regulates reasoning depth based on uncertainty, verifier feedback, and compute budgets.
            The agent starts shallow, estimates confidence and difficulty, and only expands depth (more steps,
            samples, tool calls, or layers) when expected quality gains justify the extra cost. Foundations
            include adaptive computation time and early-exit transformers, as well as verifier-guided halting
            in agent loops (e.g., ReAct/ToT with budgeted search).
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
            <li>Initialize budgets/thresholds: max tokens, max depth/iterations, p95 latency, target quality.</li>
            <li>Shallow pass: quick solve using small model or few-shot; compute uncertainty/score.</li>
            <li>Assess: verifier/critic, logprobs, self-consistency variance, or tests determine sufficiency.</li>
            <li>Expand if needed: increase steps/samples, enable tools/RAG, or unlock deeper model/layers.</li>
            <li>Early-exit: halt when calibrated confidence ≥ threshold or marginal gain per token is low.</li>
            <li>Guardrails: cap recursion/tool loops; enforce per-call/token ceilings; record traces.</li>
            <li>Learn: log depth vs. outcome; auto-tune thresholds and routing for future tasks.</li>
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
            'Use calibrated confidence: verifier or cross-encoder scoring; track Expected Calibration Error (ECE).',
            'Separate generator and verifier models; small router/verifier, larger generator only on demand.',
            'Start with k small samples + self-consistency; expand k or depth only if disagreement remains.',
            'Integrate retrieval/tools progressively; avoid immediate deep chains when simple lookups suffice.',
            'Set hard ceilings: max depth/iterations/tool calls; timeouts with graceful fallback answers.',
            'Attribute cost to successful tasks; measure marginal quality gain per extra token/second.',
            'A/B thresholds per task family; auto-tune based on success, latency, and cost targets.'
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
            <li>Hard real-time SLAs where any iterative deepening would break latency guarantees.</li>
            <li>Strictly deterministic/audited flows requiring fixed prompts and fixed execution paths.</li>
            <li>Simple single-hop queries already solved by a small model or cached retrieval.</li>
            <li>Safety-critical domains where autonomous recursion is disallowed without human-in-the-loop.</li>
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
            <li>Uncalibrated stopping: using raw logprob as confidence without calibration/evaluators.</li>
            <li>Runaway recursion/tool loops due to missing ceilings or missing convergence checks.</li>
            <li>Over-expansion: large k or deep chains where marginal quality gain is negligible.</li>
            <li>Ignoring task heterogeneity: one-size thresholds for coding, QA, planning, and RAG.</li>
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
            'Confidence- and verifier‑based early exit',
            'Budget‑aware depth planning (tokens, time, tools)',
            'Adaptive sampling (k) and step expansion with self‑consistency',
            'Depth/layer early‑exit on transformers where supported',
            'Traceability of depth decisions and halting reasons',
            'Auto‑tuning thresholds per task family'
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
            <li>Task success/quality vs fixed-depth baseline; evaluator pass rate.</li>
            <li>Tokens and cost per successful task; marginal quality gain per 1k tokens.</li>
            <li>Latency p50/p95 with/without deepening; throughput under load.</li>
            <li>Verifier calibration (ECE), over‑/under‑depth rate, recursion abort rate.</li>
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
            <li>Depth budgets: cap tokens/steps/samples; escalate only on uncertainty or verifier fail.</li>
            <li>Use small routers/verifiers; reserve large models for deep passes.</li>
            <li>Prefer early‑exit/mixture‑of‑depths and efficient serving (Paged/Flash Attention) where available.</li>
            <li>Track and attribute compute to final successful output; cache intermediate artifacts.</li>
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
            <li>Code assistants and evaluators that deepen on test failures or low confidence.</li>
            <li>Multi‑hop QA, planning, and research that benefit from verifier‑guided deepening.</li>
            <li>Tool‑use workflows (ReAct) with budgeted search and halting on sufficient evidence.</li>
            <li>Customer support and triage systems with variable difficulty and SLAs.</li>
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
              <li><a href="https://arxiv.org/abs/1807.03819" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Universal Transformers with ACT (Dehghani et al., 2018)</a></li>
              <li><a href="https://arxiv.org/abs/1910.10073" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Depth‑Adaptive Transformer (Elbayad et al., 2019)</a></li>
              <li><a href="https://arxiv.org/abs/2004.12993" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeeBERT: Dynamic Early Exit (Xin et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2004.04037" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DynaBERT: Adaptive Width and Depth (Hou et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2211.09066" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CALM: Confident Adaptive Language Modeling (Schuster et al., 2022)</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts (Yao et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ReAct: Reason + Act (Yao et al., 2022)</a></li>
              <li><a href="https://arxiv.org/abs/2203.11171" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self‑Consistency Improves CoT (Wang et al., 2023)</a></li>
              <li><a href="https://arxiv.org/abs/2211.17192" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Speculative Decoding (Chen et al., 2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Cookbook: evaluation, token accounting, cost controls</a></li>
              <li><a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic docs: prompt, context, and safety best practices</a></li>
              <li><a href="https://python.langchain.com/docs/guides/evaluation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain: evaluators and guardrails for halting/quality</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://vllm.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM</a> and <a href="https://github.com/Dao-AILab/flash-attention" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FlashAttention</a> for efficient serving</li>
              <li><a href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Transformers</a> (community implementations of early‑exit/branchy models)</li>
              <li><a href="https://www.llamaindex.ai/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex</a> / <a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain</a> for verifier‑guided loops</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI developer forum</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face forums</a></li>
              <li><a href="https://paperswithcode.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Papers with Code</a> pages for ACT, early‑exit, and CALM</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};