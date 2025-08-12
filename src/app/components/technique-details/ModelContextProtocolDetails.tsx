'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ModelContextProtocolDetails = () => {
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
            Model Context Protocol (MCP) standardizes how AI clients discover and use external capabilities via a client–server model. Servers expose capabilities such as tools, resources (files/data), and prompts over transport-agnostic JSON-RPC (stdio or WebSocket). Clients initialize a session, discover capabilities, then invoke tools or fetch resources with structured requests and streaming responses, enabling context to live out-of-band from the prompt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔌</div>
              <div className="text-xs text-gray-400 mb-1">Protocol</div>
              <div className="text-sm font-medium text-white">JSON-RPC over stdio/WebSocket</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-xs text-gray-400 mb-1">Discovery</div>
              <div className="text-sm font-medium text-white">Initialize → capabilities</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-xs text-gray-400 mb-1">Artifacts</div>
              <div className="text-sm font-medium text-white">Tools, resources, prompts</div>
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
            <li>Choose transport (stdio for local processes, WebSocket for networked servers).</li>
            <li>Start server → client sends initialize; negotiate capabilities and session.</li>
            <li>Discover capabilities: list tools, resources, prompts and their schemas.</li>
            <li>Invoke tools with typed params; stream partial results where supported.</li>
            <li>Fetch resources or prompts by handle; use server-side filtering to trim payloads.</li>
            <li>Handle errors with typed codes; apply retries/backoff as policy dictates.</li>
            <li>Update/close session; persist handles instead of raw blobs in model context.</li>
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
            'Schema-first: define tool parameters and results with JSON Schema; validate on both sides.',
            'Version capabilities; maintain backward-compatible changes with clear deprecation windows.',
            'Principle of least privilege: scope credentials, network, and resource access per server.',
            'Prefer resource handles over inlining large content; enable range/filtered reads.',
            'Use streaming for large outputs; apply backpressure and chunk limits.',
            'Emit structured error codes; map to actionable client fallbacks and retries.',
            'Audit logs for calls, arguments shape, and data lineage; redact sensitive fields.',
            'Timeouts, circuit breakers, and idempotency keys for safe retries.',
            'Conformance tests in CI to prevent schema drift across server/client releases.'
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
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Single, static integrations where native function-calling is sufficient and simpler.</p>
          <p>Ultra-low-latency paths that cannot afford transport and discovery overhead.</p>
          <p>Workloads with highly sensitive data but without strong isolation and auditing.</p>
          <p>Environments where introducing an always-on server process is operationally infeasible.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Ambiguous or underspecified schemas leading to brittle tool calls.</p>
          <p>Inlining large documents into prompts instead of using resource handles.</p>
          <p>Missing auth boundaries; servers overexpose filesystem, network, or secrets.</p>
          <p>No streaming/backpressure, causing memory spikes on large results.</p>
          <p>Skipping compatibility tests; silent schema drift between client and server.</p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Capability discovery via initialize and list operations.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Tools, resources (files/data), and prompts as first-class concepts.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Transport-agnostic JSON-RPC (stdio, WebSocket) and streaming.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Session state management and handle-based context references.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Typed errors and capability versioning.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Interoperability across tools, IDEs, and agent frameworks.</div>
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Task success rate when MCP-enabled vs. baseline.</div>
          <div>Time-to-integrate new server (hours/days) and regression stability.</div>
          <div>Tool-call latency p50/p95 and streaming start time.</div>
          <div>Cost per task; cache hit ratio for resources/prompts.</div>
          <div>Error rates by code (validation, transport, auth) and MTTR.</div>
          <div>Security incidents and permission violation blocks.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300">
          <ul className="list-disc list-inside space-y-2">
            <li>MCP reduces prompt tokens by referencing resources via handles instead of embedding.</li>
            <li>Each tool call adds protocol tokens; keep descriptors concise and reuse sessions.</li>
            <li>Prefer server-side filtering, pagination, and range reads for large artifacts.</li>
            <li>Stream results to avoid large in-memory buffers; cap parallelism.</li>
            <li>Cache resolved resources and prompt templates to amortize costs.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>IDE assistants and dev tools that need filesystem, VCS, issues, and CI context.</p>
          <p>Enterprise copilots unifying diverse data sources and action tools behind one protocol.</p>
          <p>Agent platforms orchestrating heterogeneous tools with consistent schemas.</p>
          <p>RAG systems fetching documents, embeddings, and metadata via resource handles.</p>
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
              <li><a href="https://arxiv.org/abs/2504.03767" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MCP Safety Audit (2025)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://modelcontextprotocol.io/introduction" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Model Context Protocol: Introduction</a></li>
              <li><a href="https://modelcontextprotocol.io/spec" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MCP Specification</a></li>
              <li><a href="https://modelcontextprotocol.io/transport/overview" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Transports (stdio/WebSocket)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/modelcontextprotocol" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">MCP GitHub Organization</a> (servers, clients, SDKs)</li>
              <li><a href="https://github.com/modelcontextprotocol/typescript-sdk" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TypeScript SDK</a> and <a href="https://github.com/modelcontextprotocol/python-sdk" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Python SDK</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/modelcontextprotocol/.github/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GitHub Discussions</a></li>
              <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Official site updates</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};