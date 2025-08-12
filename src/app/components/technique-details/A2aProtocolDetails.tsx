'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const A2aProtocolDetails = () => {
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
            Agent-to-Agent (A2A) is an open protocol for AI agent interoperability. It enables agents from different
            vendors or frameworks to discover each other, negotiate capabilities, exchange messages and artifacts,
            and coordinate long-running tasks without exposing their internal logic. Core concepts include an
            Agent Card for discovery, standard HTTP endpoints for tasks and messaging, typed message parts (text,
            files, structured data), artifacts produced during execution, and optional streaming via Server-Sent
            Events (SSE) for real-time progress.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🪪</div>
              <div className="text-xs text-gray-400 mb-1">Discovery</div>
              <div className="text-sm font-medium text-white">Agent Card (/.well-known/agent.json)</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧵</div>
              <div className="text-xs text-gray-400 mb-1">Tasks</div>
              <div className="text-sm font-medium text-white">Submit, stream, and complete with state</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-xs text-gray-400 mb-1">Content</div>
              <div className="text-sm font-medium text-white">Parts (text/file/data) and artifacts</div>
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
            <li>
              Discovery: fetch the Agent Card from <code className="text-gray-300">/.well-known/agent.json</code>
              to learn capabilities, auth schemes, and endpoints.
            </li>
            <li>
              Initiate: send an initial message via <code className="text-gray-300">tasks/send</code> or
              <code className="text-gray-300"> tasks/sendSubscribe</code> (for SSE streaming) with inputs as Parts.
            </li>
            <li>
              Processing: the server advances the Task state (e.g., submitted → working → input-required →
              completed/failed/canceled). With streaming, progress/events arrive via SSE.
            </li>
            <li>
              Interaction: if the Task requires more input (<code className="text-gray-300">input-required</code>),
              continue the thread by sending follow-up messages referencing the same Task.
            </li>
            <li>
              Completion: retrieve final artifacts, transcripts, and the terminal Task state; persist any receipts/ids
              needed for auditing.
            </li>
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
            'Schema-first contracts for messages and artifacts; validate payloads on both sides.',
            'Use idempotency keys for writes; deduplicate by request/task identifiers.',
            'Strong TLS, short-lived tokens, least-privilege scopes, and per-tenant authorization.',
            'Rate limit and bound concurrency; enforce request/response and artifact size limits.',
            'Emit structured logs, metrics, and traces; capture task state transitions and SSE lifecycle.',
            'Version Agent Cards and endpoints; keep backward-compatible changes and deprecation windows.',
            'Prevent circular agent loops with hop-count/time-to-live and clear termination criteria.',
            'Prefer streaming for long-running work; heartbeat/keepalive for SSE; retry with backoff + jitter.',
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
          <p>Simple, single-vendor integrations where a direct API or SDK is sufficient.</p>
          <p>Ultra-low-latency paths that cannot afford discovery, task management, or SSE overhead.</p>
          <p>Workloads requiring shared internal memory/state between agents (A2A treats agents as opaque).</p>
          <p>Highly constrained devices or links where HTTP/SSE and schema validation are too heavy.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Agent Card drift vs. live server behavior causing client misconfiguration.</p>
          <p>Long-lived or overly broad tokens; missing per-scope authorization checks.</p>
          <p>No idempotency on writes; duplicate effects after retries/timeouts.</p>
          <p>Unbounded artifacts or message parts leading to memory/egress spikes.</p>
          <p>Missing loop prevention; agents re-invoke each other indefinitely.</p>
          <p>Weak TLS or missing certificate rotation; insufficient observability on SSE streams.</p>
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
            'Cross-vendor interoperability and capability discovery',
            'Long-running task coordination with optional streaming (SSE)',
            'Rich, typed content via Parts (text/file/data) and artifacts',
            'Opaque, secure execution boundaries with standard auth',
            'HTTP-native design that fits enterprise networking and observability',
            'Auditable task lifecycle and message transcripts',
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
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Task completion/success rate and failure reasons by category.</div>
          <div>Time-to-first-event (stream start) and p95 completion latency.</div>
          <div>Error rates (validation, auth, transport) and MTTR.</div>
          <div>Average interaction rounds per task (input-required cycles).</div>
          <div>Throughput (tasks/sec) under target SLOs and backpressure.</div>
          <div>Cost per task (tokens, egress, compute) and cache hit ratios.</div>
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
            <li>Auth tokens: use short-lived, scope-limited credentials; rotate and store in secure vaults.</li>
            <li>Minimize payloads: prefer references/URIs over inlining large files; paginate and chunk streams.</li>
            <li>Streaming: use SSE for incremental results to reduce tail latency and memory pressure.</li>
            <li>Limits: cap message/artifact sizes and part counts; enforce timeouts and concurrency.</li>
            <li>Networking: reuse connections; heartbeat SSE; exponential backoff on retries.</li>
            <li>Caching: cache Agent Cards and capability metadata; validate with ETags/max-age.</li>
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
          <p>Cross-platform agent collaboration and delegation across vendors.</p>
          <p>Enterprise copilots integrating diverse backends under a common protocol.</p>
          <p>Long-running research, analysis, or data processing with progressive results.</p>
          <p>Federated workflows where teams expose capabilities without sharing internals.</p>
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
              <li>
                <a href="https://arxiv.org/abs/2505.12490" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                  Safeguarding Sensitive Data in Multi-Agent Systems (A2A-focused, 2025)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>
                <a href="https://a2a.how/protocol" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">A2A Protocol Guide</a>
              </li>
              <li>
                <a href="https://google-a2a.github.io/A2A/specification/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">A2A Specification (GitHub Pages)</a>
              </li>
              <li>
                <a href="https://a2a-protocol.org/dev/specification/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">A2A Protocol (Developer Spec)</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>
                <a href="https://github.com/BenjaminScottAwk/awesome-a2a" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Awesome A2A</a> (curated servers, clients, SDKs)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>A2A protocol discussions and issues across public GitHub repositories</li>
              <li>Enterprise architecture forums on agent interoperability and SSE at scale</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};