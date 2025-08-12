'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface PalmDetailsProps {
  selectedTechnique: any;
}

export const PalmDetails: React.FC<PalmDetailsProps> = ({ selectedTechnique }) => {
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
            Program-Aided LMs (PAL) delegate precise computation to an external interpreter. The model
            reads a natural-language problem, writes minimal executable code (e.g., Python), executes it
            in a sandbox, and returns the computed result. This separates natural-language understanding
            from exact calculation, reducing arithmetic and logical errors and producing an auditable trace
            of how the answer was derived.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Choose execution toolchain and sandbox (e.g., Python runner with strict time/memory limits).</li>
            <li>Prompt the model to produce concise, self-contained code with a clear I/O contract and printed result.</li>
            <li>Execute in an isolated environment; capture stdout/stderr, exit code, and timing; enforce timeouts.</li>
            <li>Parse outputs with stable delimiters; validate against expected schema/types and constraints.</li>
            <li>Optionally re-run with corrections or tests if validation fails; limit retries with budgets.</li>
            <li>Return the final result with a computation trace (code, inputs, outputs) for auditability.</li>
            <li>Fallback gracefully (e.g., direct answer or alternative tool) when execution is unavailable or unsafe.</li>
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
            'Sandbox aggressively: disable network and filesystem writes; set CPU/memory/time budgets; whitelist packages.',
            'Constrain prompts: require a small function or script that prints only the final answer with an explicit marker.',
            'Make parsing robust: use fixed tokens (e.g., "ANSWER:"), JSON, or schema-validated outputs to avoid brittle regex.',
            'Pin environments: lock interpreter and library versions; prefer deterministic ops and seeded randomness.',
            'Add verification: unit tests, duplicate calculations, range checks, or alternative solvers for critical paths.',
            'Handle failures: timeouts, non-zero exits, or empty outputs should trigger bounded retries or safe fallbacks.',
            'Log traces securely: retain code, runtime stats, and outputs for debugging and offline evaluation.',
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
            <li>Purely linguistic tasks (style, opinion, narrative) where code adds no benefit.</li>
            <li>Strict real-time constraints where interpreter startup/execution exceeds latency budgets.</li>
            <li>Environments that cannot guarantee safe sandboxing of model-written code.</li>
            <li>Highly restricted platforms without interpreter access or with prohibitive governance rules.</li>
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
            <li>Code or prompt injection via user input; mitigate with strict input sanitization and isolated execution.</li>
            <li>Non-deterministic or environment-dependent behavior (e.g., time, randomness, locale); enforce determinism.</li>
            <li>Brittle output parsing when the model prints extra text; require structured or delimited outputs.</li>
            <li>Infinite loops or heavy computation; set timeouts and instruction limits, and kill long-running jobs.</li>
            <li>Library/version drift between development and production; pin and verify environments.</li>
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
            'Exact computation via external interpreters (e.g., Python, SQL, calculators)',
            'Auditable reasoning trace (code + outputs) and reproducibility',
            'Lower hallucination rates on math/logic tasks vs. free-form reasoning',
            'Composable with tool-calling, retrieval, and verification frameworks',
            'Graceful failure handling with retries and fallbacks',
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
            <li>Task accuracy on math/algorithmic benchmarks (e.g., GSM8K, MATH) vs. non-PAL baselines.</li>
            <li>Execution success rate (no timeouts, no runtime errors) and retry counts.</li>
            <li>Sandbox violation rate and security incident rate (must be near-zero).</li>
            <li>Latency p50/p95 including interpreter time; cost per task; token usage for code vs. CoT.</li>
            <li>Audit coverage: share of responses with valid traces and verifiable outputs.</li>
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
            <li>Often fewer reasoning tokens than verbose CoT; adds interpreter CPU/memory and startup overhead.</li>
            <li>Amortize with warm pools or serverless sandboxes; cache successful code for similar queries.</li>
            <li>Prefer concise, single-pass scripts over multi-round dialogues to cap token and runtime costs.</li>
            <li>Profile cold vs. warm execution; enforce strict time/memory limits and cap retries.</li>
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
            <li>Quantitative reasoning: arithmetic, algebra, date/time math, unit conversion.</li>
            <li>Data wrangling and analysis: CSV/JSON transforms, simple statistics, small-scale ETL.</li>
            <li>Algorithmic puzzles and coding exercises where correctness is testable.</li>
            <li>Finance, science, and engineering tasks needing exact numeric outputs.</li>
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
              <li><a href="https://arxiv.org/abs/2211.10435" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Gao et al., 2022 — PAL: Program-Aided Language Models</a></li>
              <li><a href="https://arxiv.org/abs/2211.12588" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chen et al., 2022 — Program of Thoughts Prompting: Disentangle Reasoning from Inference</a></li>
              <li><a href="https://arxiv.org/abs/2305.09656" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ye et al., 2023 — SatLM: Satisfiability-Aided Language Models</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/reasoning-machines/pal" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Official PAL repository (reasoning-machines/pal)</a></li>
              <li><a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain docs: PAL-style chains and tool calling</a></li>
              <li><a href="https://platform.openai.com/docs/assistants/tools/code-interpreter" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Code Interpreter (Assistants) — secure code execution</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Execution/Sandbox: Docker, Firecracker microVMs, <a href="https://e2b.dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">E2B</a>, Pyodide (browser)</li>
              <li>Orchestration: LangChain/LangGraph, LlamaIndex; Validation: Guardrails, Pydantic/JSON Schema</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Tool use and reasoning</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PalmDetails;


