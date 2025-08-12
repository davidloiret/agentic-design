'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ApiIntegrationDetails = () => {
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
            Securely authenticate, construct requests, respect rate limits, handle pagination and errors with retries/circuit breakers, validate and normalize responses, and emit structured results with full observability.
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
            <li>Discover API contract and scopes (OpenAPI/GraphQL schema) and define typed models.</li>
            <li>Configure secrets and auth: API Key, OAuth2 (client credentials, auth code + refresh), HMAC/signing as needed.</li>
            <li>Build request: method, path/query/body, headers; include correlation/request IDs.</li>
            <li>Send with timeouts, retries (exponential backoff + jitter), and circuit breakers; honor rate limits.</li>
            <li>Handle pagination/streaming; aggregate pages or process incrementally.</li>
            <li>Validate and normalize response schemas; redact PII/secrets; map provider errors to typed errors.</li>
            <li>Cache idempotent reads; deduplicate in-flight requests; enforce idempotency keys for writes.</li>
            <li>Emit metrics, structured logs, and traces; surface actionable error messages.</li>
            <li>Write contract tests and sandbox/integration tests; pin versions; monitor drifts.</li>
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
            'Use typed clients and schema validators (OpenAPI/GraphQL → types + runtime validation).',
            'Separate auth from transport; rotate/refresh tokens automatically with safe storage.',
            'Honor Retry-After and provider-specific rate-limit headers; centralize throttling.',
            'Design idempotent writes and provide idempotency keys; avoid duplicate side effects.',
            'Implement robust error taxonomy (retryable, fatal, user-correctable).',
            'Prefer incremental pagination and backpressure for large result sets.',
            'Cache-safe GETs with short TTLs; invalidate on writes or use ETags/If-None-Match.',
            'Encrypt secrets in transit and at rest; never log credentials or sensitive payloads.',
            'Add SLOs per endpoint and per operation; alert on error/latency/cost anomalies.',
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
            <li>Answer is reliably in-model and timeliness/accuracy needs are met without external calls.</li>
            <li>Hard real-time paths where network latency jeopardizes SLAs.</li>
            <li>Unstable or non-compliant third parties where reliability/compliance risks outweigh benefits.</li>
            <li>Highly sensitive data without a compliant processing path or DPA in place.</li>
            <li>Unbounded cost exposure from per-call pricing without budget controls.</li>
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
            <li>Ignoring provider rate limits or Retry-After headers leading to throttling or bans.</li>
            <li>Retrying non-idempotent writes and causing duplicated side effects.</li>
            <li>Poor pagination handling (missing pages, duplicates, memory blowups).</li>
            <li>Schema drift and silent parse failures due to weak validation.</li>
            <li>Leaking secrets/PII in prompts, URLs, logs, or error messages.</li>
            <li>Naive timezones/locale/number parsing causing subtle data bugs.</li>
            <li>Unbounded concurrency → rate-limit storms and cost spikes.</li>
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
            'Typed client with OpenAPI/GraphQL codegen',
            'Auth: API key, OAuth2 (+ PKCE/refresh), HMAC/signatures',
            'Automatic retries, backoff + jitter, circuit breakers',
            'Rate-limiters with per-key/tenant quotas',
            'Pagination/streaming helpers and result aggregation',
            'Response validation and normalization layer',
            'Idempotency keys and request de-duplication',
            'Caching with ETags/conditional requests',
            'Structured logging, tracing, metrics, and alerting',
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
            <li>Request success rate; 4xx/5xx rates per endpoint; retry/fallback rates.</li>
            <li>Latency p50/p95; end-to-end time including pagination.</li>
            <li>Cost per successful operation; cache hit ratio; duplicate suppression rate.</li>
            <li>Rate-limit violation rate; token refresh success rate; auth error rate.</li>
            <li>Data freshness (staleness minutes) and schema drift incidents.</li>
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
            <li>Prompt tokens: request planning + minimal response schemas; response tokens: summarization/normalization only.</li>
            <li>External costs dominate for large responses; prefer selective fields and server-side filtering.</li>
            <li>Cap parallel calls; batch where supported; use streaming to avoid large in-memory buffers.</li>
            <li>Cache common reads to reduce both token and API spend.</li>
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
            <li>Live data retrieval: finance, weather, inventory, logistics.</li>
            <li>Transactional operations: CRM/ERP updates with audit and idempotency.</li>
            <li>Data enrichment and aggregation across multiple providers.</li>
            <li>Search/fetch with post-processing and summarization.
            </li>
            <li>Long-running workflows with checkpoints and retries.</li>
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
              <li>Gorilla / APIBench (2023–2024)</li>
              <li>Self-RAG / Corrective RAG for tool/retrieval decisions (2023–2024)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>OpenAPI/Swagger design and codegen workflows</li>
              <li>OAuth 2.0 + OIDC basics, PKCE, token refresh best practices</li>
              <li>HTTP Semantics and conditional requests (RFC 9110/9111)</li>
              <li>Retry with exponential backoff and jitter; circuit breaker patterns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>OpenAPI generators (openapi-generator, Swagger Codegen)</li>
              <li>HTTP clients: Axios/Fetch, Requests/HTTPX, Got</li>
              <li>Validation: Zod, Ajv, Pydantic</li>
              <li>Auth: oauthlib, simple-oauth2, passport, next-auth</li>
              <li>LangChain/LlamaIndex tool adapters</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Engineering blogs on resilient API clients and rate limiting</li>
              <li>Provider status pages and best practice docs</li>
              <li>Conference talks on reliability patterns and observability</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};