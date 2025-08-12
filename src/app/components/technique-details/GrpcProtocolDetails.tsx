'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const GrpcProtocolDetails = () => {
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
            gRPC is a high-performance, open-source RPC framework that uses Protocol Buffers (Protobuf) as its IDL and binary serialization format and runs primarily over HTTP/2 for transport. It supports unary and streaming RPCs (server, client, and bidirectional), deadlines and cancellation, metadata, compression, and pluggable authentication including TLS/mTLS. Many languages also support modern features such as retries, interceptors, health checking, reflection, and client-side load balancing via service configuration and xDS.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧾</div>
              <div className="text-xs text-gray-400 mb-1">IDL & Serialization</div>
              <div className="text-sm font-medium text-white">Protobuf (binary, schema-first)</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🌐</div>
              <div className="text-xs text-gray-400 mb-1">Transport</div>
              <div className="text-sm font-medium text-white">HTTP/2 multiplexing, flow control</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🔁</div>
              <div className="text-xs text-gray-400 mb-1">RPC Types</div>
              <div className="text-sm font-medium text-white">Unary, server/client/bidi streaming</div>
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
            <li>Define services and messages in <code>.proto</code> files (schema-first).</li>
            <li>Generate server/client stubs with <code>protoc</code> and language plugins.</li>
            <li>Implement the server handlers; enable TLS/mTLS, health checks, and reflection.</li>
            <li>Configure timeouts/deadlines, retries, compression, and message size limits.</li>
            <li>Choose name resolution and load balancing (DNS, service config, xDS/Envoy/Istio).</li>
            <li>Build the client using generated stubs; attach auth metadata and interceptors.</li>
            <li>Deploy behind gRPC-aware L4/L7 infra; monitor with metrics, logs, and tracing.</li>
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
            'Set deadlines on every RPC; treat unbounded calls as defects.',
            'Use idempotent methods where possible; enable safe retries with backoff.',
            'Prefer streaming for long-lived or large data transfers; apply backpressure.',
            'Keep Protobufs backward-compatible; never reuse or change existing field numbers; reserve removed fields.',
            'Bound message sizes and use compression judiciously (balance CPU vs bandwidth).',
            'Pool channels; reuse connections; tune HTTP/2 keepalive to survive proxies/LBs.',
            'Enforce TLS/mTLS; pass auth and tenant context via metadata; validate on server.',
            'Standardize error handling with gRPC status codes and rich error details.',
            'Adopt observability (OpenTelemetry), health checking, and server reflection (dev only).',
            'Use service config/xDS for LB, retries, timeouts; test under failure modes.',
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
          <p>Browser-only clients without a proxy; prefer gRPC-Web or REST for direct browser access.</p>
          <p>Public, third-party APIs needing human-readable JSON, broad compatibility, and CDN caching.</p>
          <p>Very large payloads over the public internet; consider chunking, storage links, or REST.</p>
          <p>Environments with HTTP/2-incompatible proxies/LBs or where adding gRPC-aware infra is infeasible.</p>
          <p>Workloads requiring transparent HTTP caching, URL addressability, or extensive query semantics.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Missing deadlines and cancellation → leaking resources and stuck clients.</p>
          <p>Chatty designs (many tiny RPCs) instead of batching/streaming → overhead and tail latency.</p>
          <p>Unbounded message sizes/streams → memory pressure and OOM under load.</p>
          <p>Improper keepalive settings → idle timeouts or broken connections behind proxies/LBs.</p>
          <p>Using non-gRPC-aware L7 proxies → HTTP/2 downgrades, header limits, or connection churn.</p>
          <p>Breaking Protobuf compatibility by reusing field numbers or changing types.</p>
          <p>Not propagating auth/trace metadata across hops; losing context for security/observability.</p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Unary and streaming RPCs; deadlines, cancellation, and flow control.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Binary Protobuf serialization; schema-first contracts and codegen.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">TLS/mTLS, per-RPC metadata, interceptors, and auth integration.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Retries, hedging (language-dependent), and client-side load balancing.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Health checking and server reflection (dev tooling and discovery).</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Service config, xDS/Envoy/Istio integration, and observability hooks.</div>
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>RPC latency p50/p95/p99, streaming start time, and tail behavior under load.</div>
          <div>Throughput (RPS/streams) per CPU core; connection reuse and pool hit ratio.</div>
          <div>Error rates by gRPC status code; retry/hedge rates and effectiveness.</div>
          <div>Server memory per active stream; peak message sizes; backpressure events.</div>
          <div>Handshake and TLS metrics; keepalive ping success; connection churn.</div>
          <div>Load balancer distribution (pick_first vs round_robin/xDS) and endpoint health.</div>
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
            <li>Pass auth tokens via metadata (e.g., OAuth2/JWT); avoid embedding in payloads; rotate and scope.</li>
            <li>Set max send/receive message sizes; use compression for large messages where CPU allows.</li>
            <li>Leverage HTTP/2 multiplexing; tune flow-control windows and concurrent streams per channel.</li>
            <li>Right-size keepalive and idle timeouts to reduce unnecessary reconnects and CPU wakeups.</li>
            <li>Prefer references (URIs) or chunked transfers for blobs; avoid multi‑MB messages when possible.</li>
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
          <p>High-throughput, low-latency internal microservice APIs with strict contracts.</p>
          <p>Real-time streaming (telemetry, chat, collaborative apps) with bidi streams.</p>
          <p>Mobile and IoT backends where bandwidth and latency efficiency matter.</p>
          <p>Polyglot systems needing consistent cross-language code generation and tooling.</p>
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
              <li><a href="https://arxiv.org/abs/1804.01138" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Designing a Micro-Benchmark Suite to Evaluate gRPC for TensorFlow (2018)</a></li>
              <li><a href="https://arxiv.org/abs/2404.05598" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hook-in Privacy Techniques for gRPC-based Microservice Communication (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://grpc.io/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC Official Documentation</a> (guides on deadlines, errors, auth, LB, retries)</li>
              <li><a href="https://grpc.io/docs/guides/grpc-web/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC-Web</a> and <a href="https://github.com/grpc-ecosystem/grpc-gateway" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC-Gateway</a> for HTTP/JSON interop</li>
              <li><a href="https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/grpc" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Envoy and xDS for gRPC</a></li>
              <li><a href="https://opentelemetry.io/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenTelemetry</a> for metrics, logs, and traces</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/fullstorydev/grpcurl" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">grpcurl</a>, <a href="https://github.com/fullstorydev/grpcui" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">grpcui</a>, <a href="https://github.com/ktr0731/evans" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Evans</a></li>
              <li><a href="https://buf.build/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Buf</a> (lint, breaking-change detection, remote registry)</li>
              <li><a href="https://www.envoyproxy.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Envoy</a>, <a href="https://istio.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Istio</a>, <a href="https://github.com/grpc-ecosystem/grpc-gateway" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">grpc-gateway</a></li>
              <li><a href="https://github.com/grpc-ecosystem/awesome-grpc" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">awesome-grpc</a> (curated ecosystem)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/grpc/grpc" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC GitHub</a> (issues, discussions)</li>
              <li><a href="https://groups.google.com/g/grpc-io" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC Google Group</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/grpc" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">StackOverflow: grpc</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};