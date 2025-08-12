'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const FunctionCallingDetails = () => {
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
            Model selects a tool by name and emits JSON args per schema; orchestrator validates, executes external calls, and returns structured results for synthesis.
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
            <li>Define JSON schemas and register tools with descriptions.</li>
            <li>Plan call(s) → model outputs function name + args.</li>
            <li>Validate/sanitize args; enrich defaults; prompt for missing requireds.</li>
            <li>Execute with timeouts, retries, idempotency; parallelize when safe.</li>
            <li>Normalize results; redact secrets; log audit trail.</li>
            <li>Return results to model; optionally chain further calls.</li>
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
            'Tight schemas (enums/ranges/formats); hard-fail on validation errors.',
            'Small, composable tools; clear names and examples.',
            'Auth scoping and ACL per tool; never expose raw secrets.',
            'Timeouts, retries with jitter, and circuit breakers.',
            'Parallelize independent calls; cap concurrency and handle rate limits.',
            'Idempotency for writes; dedupe by request key.',
            'Structured logging and PII redaction.',
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
            <li>Question is answerable from model knowledge with acceptable quality.</li>
            <li>Hard real-time paths where tool overhead breaks SLOs.</li>
            <li>High-risk, irreversible actions without human review.</li>
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
            <li>Hallucinated tool names/params due to vague descriptions.</li>
            <li>Non-idempotent writes retried after timeouts.</li>
            <li>Unbounded parallelism → rate limits/cost spikes.</li>
            <li>Secrets/PII leakage in prompts, outputs, or logs.</li>
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
            'Schema-based tool registry',
            'Automatic parameter validation',
            'Parallel execution controls',
            'Timeouts/retries/circuit breakers',
            'Idempotency & deduplication',
            'Role/tenant-scoped permissions',
            'Structured logging & auditability',
            'Result normalization',
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
            <li>Tool-call success rate; validation error rate; retry/fallback rate.</li>
            <li>Task completion rate and quality uplift vs. no-tools baseline.</li>
            <li>Latency p50/p95 and parallel efficiency; cost per task.</li>
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
            <li>Prompt: registry context + planning; Output: args JSON + synthesis.</li>
            <li>External: API costs/egress/compute; cache common reads.</li>
            <li>Heuristics: reason-first, call-if-needed; cap tool calls per turn.</li>
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
            <li>Real-time retrieval and CRUD over business systems.</li>
            <li>Research + calculation + scheduling + messaging assistants.</li>
            <li>Enterprise automations with audit and least-privilege access.</li>
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
              <li>ReAct (2022)</li>
              <li>Toolformer (2023)</li>
              <li>Gorilla (2023)</li>
              <li>API-Bank / ToolBench (2023)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>OpenAI function calling/tool calls</li>
              <li>Anthropic tool use (function_calls XML)</li>
              <li>Google/Vertex function calling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Model Context Protocol (MCP)</li>
              <li>LangChain tools</li>
              <li>Semantic Kernel functions</li>
              <li>LlamaIndex tools</li>
              <li>Pydantic / JSON Schema validators</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Engineering blogs on safe tool use & orchestration</li>
              <li>Open-source agent repos with function calling</li>
              <li>Conference talks and workshops</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};