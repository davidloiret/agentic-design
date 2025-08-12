'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const RestApisDetails = () => {
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
            REST exposes resources via URIs and uses standard HTTP methods. Requests are stateless and leverage
            HTTP semantics for caching, validation, content negotiation, and conditional requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-xs text-gray-400 mb-1">Methods</div>
              <div className="text-sm font-medium text-white">GET, POST, PUT, DELETE, PATCH (RFC 5789)</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-xs text-gray-400 mb-1">Representations</div>
              <div className="text-sm font-medium text-white">application/json; content negotiation</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-xs text-gray-400 mb-1">Semantics</div>
              <div className="text-sm font-medium text-white">HTTP Semantics (RFC 9110), Caching (RFC 9111)</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            Transport note: HTTP/2 multiplexing and HTTP/3 (RFC 9114) improve performance.
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
            <li>Model resources and relationships; define URIs and representations.</li>
            <li>Author an OpenAPI 3.1 contract (auth, schemas, status codes, errors).</li>
            <li>Implement methods, validation, caching, and conditional requests (ETag/If-Match, If-None-Match).</li>
            <li>Secure with OAuth 2.0/OIDC; enforce scopes and least privilege; TLS everywhere.</li>
            <li>Observability: structured logs, metrics, and tracing; standardize errors with Problem Details.</li>
            <li>Govern change: versioning, deprecations (Sunset header), rollout and compatibility testing.</li>
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
            'Use correct HTTP methods and status codes; prefer RFC 9457 Problem Details for errors.',
            'Implement caching and validators (ETag/Last-Modified) and support conditional requests (RFC 9110/9111).',
            'Provide pagination, filtering, sorting; advertise links with Web Linking (RFC 8288).',
            'Rate limits and quotas; return 429 with clear retry guidance and headers.',
            'Contract-first with OpenAPI 3.1; validate requests/responses in CI; include examples.',
            'Security: TLS, strict input validation, OAuth 2.0/OIDC, short-lived tokens, audience/issuer checks.',
            'Backward-compatible changes; explicit versioning and deprecation policy (Sunset, RFC 8594).',
            'Observability: p50/p95/p99 latency per endpoint, error budgets, distributed tracing (OpenTelemetry).'
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
          <p>Real-time bidirectional streaming or sub-100ms tail latency requirements → consider WebSockets or gRPC streaming.</p>
          <p>Strongly-typed, low-latency inter-service RPC → consider gRPC/Protobuf.</p>
          <p>Complex graph queries with over/under-fetching pain → consider GraphQL.</p>
          <p>Legacy/enterprise WS-* compliance → consider SOAP where mandated.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Using 200 for errors; non-standard error bodies; omitting Problem Details.</p>
          <p>Ignoring caching/validators; missing ETag leading to unnecessary load.</p>
          <p>Breaking changes without versioning or deprecation windows.</p>
          <p>Weak authZ: missing scopes/ABAC; long-lived tokens; no audience checks.</p>
          <p>Missing timeouts/retries/backoff; no idempotency strategy for retried writes.</p>
          <p>Inconsistent resource naming and representations; missing pagination.</p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Stateless requests; cache-aware design; layered architecture.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Standard HTTP semantics (RFC 9110) and transport evolvability (HTTP/2, HTTP/3).</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Interoperability via common media types and OpenAPI contracts.</div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 text-sm text-gray-300">Uniform interface with content negotiation and hypermedia links.</div>
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Latency p50/p95/p99 by endpoint and tenant; cold vs warm performance.</div>
          <div>Availability SLO and error budget burn; 2xx/4xx/5xx distribution.</div>
          <div>Throughput (RPS) and saturation (CPU/memory); queue depth.</div>
          <div>Cache hit ratio; conditional request effectiveness.</div>
          <div>Spec/SDK drift defects; backward-compatibility violations.</div>
          <div>Security: authN/authZ failures, token misuse incidents.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Authentication/Authorization: OAuth 2.0 + OIDC; PKCE for public clients; short-lived access tokens; rotate refresh tokens; enforce scopes, audience, issuer, and clock skew tolerance.</p>
          <p>Idempotency: provide an Idempotency-Key pattern for safely retrying POST-like writes; use ETag/If-Match for optimistic concurrency on updates.</p>
          <p>Resource controls: rate limits and quotas with 429 responses and retry guidance; pagination and field selection; gzip/br compression; strict payload limits and timeouts.</p>
          <p>Caching: validators (ETag/Last-Modified) and conditional GET to reduce bandwidth; explicit Cache-Control.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Public/partner APIs and third-party integrations.</p>
          <p>Mobile/web backends and BFFs requiring broad compatibility and caching.</p>
          <p>Cross-language, cross-platform interoperability with stable contracts.</p>
          <p>Microservices boundaries where human/web clients consume JSON over HTTP.</p>
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
              <li><a href="https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Fielding, R. T. Architectural Styles and the Design of Network-based Software Architectures</a></li>
              <li><a href="https://owasp.org/API-Security/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OWASP API Security Top 10 (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.rfc-editor.org/rfc/rfc9110" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HTTP Semantics (RFC 9110)</a>, <a href="https://www.rfc-editor.org/rfc/rfc9111" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Caching (RFC 9111)</a>, <a href="https://www.rfc-editor.org/rfc/rfc9114" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HTTP/3 (RFC 9114)</a></li>
              <li><a href="https://www.rfc-editor.org/rfc/rfc9457" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Problem Details for HTTP APIs (RFC 9457)</a></li>
              <li><a href="https://www.rfc-editor.org/rfc/rfc5789" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PATCH Method (RFC 5789)</a>, <a href="https://www.rfc-editor.org/rfc/rfc8288" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Web Linking (RFC 8288)</a>, <a href="https://www.rfc-editor.org/rfc/rfc8594" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sunset Header (RFC 8594)</a></li>
              <li><a href="https://spec.openapis.org/oas/latest.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAPI Specification 3.1.x</a></li>
              <li><a href="https://jsonapi.org/format/1.1/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">JSON:API 1.1</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>OpenAPI toolchain: Swagger UI/Editor/Codegen, Redocly, Prism, Dredd</li>
              <li>Frameworks: Spring Boot, FastAPI, Express/Koa, ASP.NET Core</li>
              <li>Testing/observability: Postman/Insomnia, k6, OpenTelemetry</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://httpwg.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">IETF HTTP Working Group</a></li>
              <li><a href="https://www.openapis.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAPI Initiative</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/rest" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stack Overflow: REST</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};