'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const CognitivePipelinesDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Cognitive Processing Pipelines structure reasoning as sequential stages that mirror human cognition: perception and understanding → working-memory transformation → strategy selection and planning → action/execution → evaluation and learning. Each stage has explicit inputs/outputs, monitored with guardrails for quality, cost, and latency. The pipeline can branch, iterate, and adapt depth based on uncertainty and task difficulty.
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
            <li>Ingest and normalize inputs: task, constraints, prior context, tools/data access.</li>
            <li>Comprehend and frame: extract entities, goals, constraints; initialize working memory.</li>
            <li>Plan: select strategy (linear CoT, branching ToT/graph, tool-augmented ReAct) and target depth based on uncertainty.</li>
            <li>Execute: run step(s), call tools/APIs when grounded evidence is needed; enforce timeouts/retries.</li>
            <li>Evaluate: verify claims, cite sources, self-reflect/Reflexion or Self‑Refine if low confidence.</li>
            <li>Iterate or finalize: refine or stop by quality, budget, and latency thresholds; log provenance.</li>
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
            'Separate stages with typed interfaces; persist intermediate artifacts for auditability.',
            'Route adaptively: shallow paths for easy tasks; deeper/branching when uncertainty is high.',
            'Use retrieval and tools (ReAct) for grounding; require citations for external facts.',
            'Verification first for safety-critical outputs (chain-of-verification, consistency checks).',
            'Budget-aware control: cap steps, cap tool calls, compress context, cache expensive results.',
            'Observability: log thoughts, tool I/O, uncertainty, costs, and latency; attach run IDs and traces.'
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
            <li>Single‑shot questions answerable from model prior with acceptable quality/cost.</li>
            <li>Hard real‑time SLOs where multi‑stage orchestration adds prohibitive latency.</li>
            <li>Irreversible or high‑risk actions without human review or policy gates.</li>
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
            <li>Unbounded depth/branching → cost blow‑ups without quality gains.</li>
            <li>Context contamination or missing provenance → unverifiable claims.</li>
            <li>Hallucinated tool calls/params due to vague schemas and poor descriptions.</li>
            <li>Retrying non‑idempotent steps; lack of circuit breakers and rate‑limit handling.</li>
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
            'Stage‑typed interfaces and artifacts',
            'Adaptive routing and depth control',
            'Grounded tool/retrieval integration (ReAct)',
            'Verification and self‑reflection loops',
            'Cost/latency budgets and step caps',
            'Structured logging, traces, and provenance'
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
            <li>Task success/quality uplift vs. single‑shot baseline; factuality/faithfulness.</li>
            <li>Latency p50/p95, step count distribution, tool‑call success/validation error rates.</li>
            <li>Cost per task and token efficiency; verification catch‑rate; user satisfaction.</li>
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
            <li>Minimize thought verbosity; compress and window working memory; deduplicate context.</li>
            <li>Cache subresults; cap tool calls per turn; prefer retrieval summarization over full docs.</li>
            <li>Use smaller models for routing/verification where acceptable; batch parallel safe steps.</li>
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
            <li>Complex problem‑solving with planning and verification (e.g., analysis, coding tasks).</li>
            <li>Research and synthesis with citations and evidence tracking.</li>
            <li>Decision support requiring tool use, data grounding, and auditable traces.</li>
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
              <li><a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wei et al. (2022): Chain‑of‑Thought Prompting</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Yao et al. (2023): Tree of Thoughts</a></li>
              <li><a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Yao et al. (2023): ReAct — Reasoning + Acting</a></li>
              <li><a href="https://arxiv.org/abs/2303.11366" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Shinn et al. (2023): Reflexion</a></li>
              <li><a href="https://arxiv.org/abs/2303.17651" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Madaan et al. (2023): Self‑Refine</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://platform.openai.com/docs/guides/function-calling" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI: Function Calling / Tools</a></li>
              <li><a href="https://docs.anthropic.com/en/docs/tool-use" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic: Tool Use</a></li>
              <li><a href="https://modelcontextprotocol.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Model Context Protocol (MCP)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/stanfordnlp/dspy" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain</a></li>
              <li><a href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LlamaIndex</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-4-planning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeepLearning.AI: Agentic Design Patterns series</a></li>
              <li><a href="https://paperswithcode.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Papers with Code: Reasoning/Agents</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};