'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const PluginArchitectureDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A host application exposes a stable plugin interface for third-party capabilities. A plugin manager handles discovery, installation, versioning, sandboxing, and routing. Plugins advertise capabilities via schemas and lifecycle hooks; the host enforces permissions, isolation, and observability while brokering calls between the model/agent and plugins.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-xs text-gray-400 mb-1">Extensibility</div>
              <div className="text-sm font-medium text-white">Capabilities via plugins</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-xs text-gray-400 mb-1">Safety</div>
              <div className="text-sm font-medium text-white">Sandbox + permissions</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔁</div>
              <div className="text-xs text-gray-400 mb-1">Lifecycle</div>
              <div className="text-sm font-medium text-white">Install, upgrade, revoke</div>
            </div>
          </div>
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
            <li>Publish manifest and capability schemas (name, version, permissions, endpoints).</li>
            <li>Install and grant permissions with human-in-the-loop approval and policy checks.</li>
            <li>Validate version and compatibility; pin or negotiate semver ranges.</li>
            <li>Initialize sandbox/runtime (e.g., WASI, container, microVM) with resource limits.</li>
            <li>Discover capabilities and register routes in the host registry.</li>
            <li>Invoke capabilities with structured inputs; stream or batch results.</li>
            <li>Handle errors, retries, and fallbacks; emit typed errors.</li>
            <li>Collect telemetry, logs, and billing/quotas per plugin.</li>
            <li>Upgrade or revoke; migrate data and roll back safely if needed.</li>
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
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Stable, versioned contracts (semantic versioning) with clear deprecation policy.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Schema-first design (JSON Schema/Protobuf) and strict validation at boundaries.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Principle of least privilege: granular permissions, consent screens, scoped tokens.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Deterministic, idempotent handlers; timeouts, circuit breakers, exponential backoff.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Isolation by default (sandboxing), per-plugin quotas, and rate limits.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Observability: structured logs, metrics, traces, and auditable activity trails.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Supply-chain hygiene: SBOM, code signing, provenance (SLSA), and review process.</div>
        </div>
      </section>

      {/* When NOT to Use */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full"></div>
          When NOT to Use
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Small, fixed toolsets that rarely change—prefer built-in functions.</p>
          <p>Ultra-low-latency critical paths where sandbox/dispatch overhead is unacceptable.</p>
          <p>Tightly coupled core features that benefit from first-party control and QA.</p>
          <p>Regulated data flows without sufficient isolation and audit controls.</p>
          <p>Early-stage products where ecosystem and governance overhead is premature.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>API churn breaking ecosystems; missing deprecation windows.</p>
          <p>Over-broad permissions and inadequate consent flows.</p>
          <p>State leakage between sessions or tenants; weak scoping.</p>
          <p>Unbounded resource consumption; lack of quotas and rate limits.</p>
          <p>Insecure update channels; lack of signature verification.</p>
          <p>Missing version pinning and compatibility checks.</p>
          <p>Poor error typing causing brittle host fallbacks.</p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Dynamic loading/unloading and hot-reload.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Capability discovery and routing registry.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Sandboxing and policy enforcement (permissions, ACLs, OPA).</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Versioning, compatibility gates, and gradual rollouts.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Dependency and permission management UI.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Marketplace distribution and trust signals (reviews, signing).</div>
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Plugin adoption: installs, active plugins/session, retention.</div>
          <div>Capability coverage and utilization by scenario.</div>
          <div>Success/error rates per capability; MTTR for failures.</div>
          <div>Latency: median and p95 plugin invocation time.</div>
          <div>Crash/isolation events and blast radius containment.</div>
          <div>Security: blocked permission violations, signed-updates coverage.</div>
          <div>Upgrade adoption time; rollback frequency.</div>
          <div>Marketplace KPIs (GMV/revenue share) if applicable.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Registration and discovery prompts should be small; avoid embedding large manifests into every turn.</p>
          <p>Invocation overhead: tool-call messages add tokens—prefer concise schemas and streaming outputs.</p>
          <p>Keep capability descriptions out of main context; store in a registry and retrieve on demand.</p>
          <p>Enforce per-plugin budgets: CPU, memory, network egress, and API rate limits.</p>
          <p>Warm sandboxes and caching to reduce cold-start and repeated token use.</p>
          <p>Use structured error codes to prevent verbose failure payloads.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Integrations marketplace for third-party capabilities.</p>
          <p>Enterprise onboarding of internal/custom tools across teams.</p>
          <p>Domain-specialized toolchains (finance, healthcare, geospatial).</p>
          <p>Multi-tenant agent platforms requiring isolation and governance.</p>
          <p>Offline or partner-managed tools where first-party hosting is not feasible.</p>
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
              <li>Microkernel and plugin-based architectures; component-based software engineering.</li>
              <li>Tool-augmented LLMs: ReAct (2022), Toolformer (2023), Gorilla (2023).</li>
              <li>Capability security and isolation models (WASI, microVMs).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Model Context Protocol (MCP) capability and transport design.</li>
              <li>Function calling/tool schemas and adapter patterns.</li>
              <li>Semantic versioning and backward-compatibility strategies.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>MCP servers/clients; LangChain tool adapters; OpenAPI/JSON Schema.</li>
              <li>Policy engines (OPA/Rego); signing (cosign); SBOM (Syft/Grype).</li>
              <li>Isolation runtimes: Wasmtime/Wasmer, Firecracker/gVisor, Docker.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Open-source plugin ecosystems and governance discussions.</li>
              <li>Security incident write-ups on sandbox escapes and mitigations.</li>
              <li>Architecture forums on extensibility and capability routing.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};