'use client';

import { Check } from 'lucide-react';

export const CodeExecutionDetails = () => {
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
            Generate minimal, purpose-built code from the request; validate for safety; execute in a hardened sandbox (e.g., Firecracker microVMs) with strict resource, file system, and network limits; capture outputs and errors; summarize results.
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
            <li>Analyze intent and choose language/runtime (Python, Node/Deno, Rust, etc.).</li>
            <li>Generate code with clear inputs/outputs; avoid side effects and external I/O by default.</li>
            <li>Static checks: denylist imports, syscall patterns, network/file access; enforce policies.</li>
            <li>Select sandbox: pre-warmed Firecracker VM or WASI runtime; set CPU/mem/time limits.</li>
            <li>Stage inputs; execute with timeouts; stream stdout/stderr; capture exit status.</li>
            <li>Post-validate outputs (schema/size); redact secrets; summarize and return results.</li>
            <li>Reset or recycle the environment to guarantee isolation and reproducibility.</li>
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
            'Generate the smallest viable program; prefer pure functions and bounded data.',
            'Default to no-network, read-only FS; enable least-privilege capabilities per task.',
            'Use allowlists for packages/imports; pin versions; checksum artifacts.',
            'Set strict time/CPU/memory/file-size limits; kill long-running or fork bombs.',
            'Capture structured outputs (JSON) to simplify validation and downstream use.',
            'Log decisions, package versions, resource usage, and execution metadata for auditability.',
            'Cache cold-start artifacts; keep a warm VM pool to reduce latency while preserving isolation.',
            'Add unit examples/tests for generated code when feasible; prefer deterministic operations.'
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
            <li>The answer is reliably available via reasoning without computation.</li>
            <li>Hard real-time constraints where sandbox startup/exec overhead violates SLAs.</li>
            <li>Tasks requiring privileged host access or unrestricted network/filesystem.</li>
            <li>Highly sensitive data without an approved compliant execution path.</li>
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
            <li>Prompt injections leading to unsafe imports, network calls, or data exfiltration.</li>
            <li>Unbounded loops or heavy allocations causing timeouts/OOM kills.</li>
            <li>Nondeterministic libraries (randomness, time, network) breaking reproducibility.</li>
            <li>Large outputs (plots, arrays) overwhelming token/cost limits without summarization.</li>
            <li>State leakage across runs when environments aren’t fully reset.</li>
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
            'Hardened sandboxing (Firecracker microVMs, WASI/wasmtime)',
            'Resource quotas: CPU, memory, wall-clock, file size',
            'Network isolation by default; fine-grained, audited opt-ins',
            'Package allowlists and supply-chain controls',
            'Multi-language support (Python, TypeScript/Deno, Rust)',
            'Structured output capture and log collection',
            'Deterministic mode options and environment pinning',
            'Warm-pool management for low-latency starts'
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
            <li>Execution success rate; compile/runtime error rate; timeout rate.</li>
            <li>p50/p95 cold-start and warm-start latency; execution time distribution.</li>
            <li>Resource usage efficiency (CPU-seconds, memory peak) per task.</li>
            <li>Sandbox incident rate (escapes: 0), policy violation blocks, and audit coverage.</li>
            <li>Determinism/reproducibility rate across reruns; cache hit rate for warm pools.</li>
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
            <li>Prompt tokens: planning + code generation + result summarization; minimize code size.</li>
            <li>External compute: VM startup, compilation, runtime; prefer warm pools and caching.</li>
            <li>Stream logs/stdout and chunk large outputs; validate and compress if needed.</li>
            <li>Cap execution time and output size; prefer structured (JSON) results over raw dumps.</li>
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
            <li>Data analysis and visualization on user-provided datasets.</li>
            <li>Mathematical computation, simulation, and algorithm prototyping.</li>
            <li>Format conversion and code validation/linting in isolation.</li>
            <li>Education and safe experimentation with constrained libraries.</li>
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
              <li>Secure sandboxing: Firecracker (AWS, 2018) design paper</li>
              <li>ReAct/Toolformer/Gorilla: tool-augmented reasoning for code + tools</li>
              <li>WASI/WebAssembly isolation models and capability security</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Firecracker microVM setup and VM pooling strategies</li>
              <li>Package allowlists, syscall filtering, and network isolation policies</li>
              <li>Schema-first output validation and redaction pipelines</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Firecracker, gVisor, nsjail, Kata Containers</li>
              <li>WASI runtimes: wasmtime, wasmer; Pyodide for browser Python</li>
              <li>Deno/Node sandboxes; Docker with seccomp/AppArmor</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Security engineering blogs on sandbox escapes and mitigations</li>
              <li>Open-source sandboxes (e2b, Modal-style runners) design notes</li>
              <li>Conference talks on WASI, microVM isolation, and secure execution</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};