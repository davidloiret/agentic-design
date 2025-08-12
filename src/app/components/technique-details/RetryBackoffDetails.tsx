'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const RetryBackoffDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Intelligent Retry with Backoff handles transient faults by retrying failed operations with increasing, jittered delays.
            Use exponential backoff with full jitter, classify errors as retryable vs permanent, respect server hints (e.g., Retry-After),
            and enforce budgets (max attempts/total time). Always set timeouts first and ensure operations are idempotent or protected by
            idempotency keys.
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
            <li>Execute with a strict timeout and cancellation support.</li>
            <li>On failure, classify the error (e.g., network timeout, 5xx, 429 with Retry-After, vs permanent 4xx).</li>
            <li>Decide retry eligibility based on error class, HTTP method/idempotency, and policy.</li>
            <li>Compute delay: exponential backoff with cap (e.g., base × 2^attempt up to max), apply full jitter; if present, obey Retry-After.</li>
            <li>Enforce budgets: max attempts and max total elapsed time; apply per-tenant/endpoint concurrency limits.</li>
            <li>Retry; on success, reset state. On exhaustion, escalate: fallback, DLQ, or user-visible error.</li>
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
            'Set timeouts before retries; no timeout → pool/thread exhaustion.',
            'Use exponential backoff with full jitter to avoid synchronized retry storms.',
            'Respect server guidance (e.g., Retry-After, rate-limit headers); propagate backoff hints end‑to‑end.',
            'Retry only idempotent operations by default (HTTP GET/HEAD/PUT/DELETE) or use idempotency keys for writes.',
            'Classify errors: retry 408/425/429/5xx and network timeouts; avoid retrying 400/401/403/404 unless policy says otherwise.',
            'Bound retries: cap attempts and total time; implement a global retry budget to prevent amplification.',
            'Combine with circuit breakers, bulkheads, and bounded concurrency; disable nested retries across layers.',
            'Emit metrics, traces, and structured logs for attempts, delays, outcomes, and headers (e.g., Retry-After).',
            'Provide fallbacks (cached/stale, alternate provider) and dead-letter queues for exhausted retries.',
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
            <li>Non-idempotent operations without idempotency protection (e.g., charges without idempotency keys).</li>
            <li>Permanent failures (e.g., 400 validation, 401/403 auth) where retrying cannot succeed without change.</li>
            <li>Hard real-time UX where additional delay budgets are unacceptable; prefer fast failure or alternate flow.</li>
            <li>Deeply layered systems already performing retries (client, gateway, SDK) → disable at one layer to avoid storms.</li>
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
            <li>No jitter → synchronized retries and thundering herd under outages.</li>
            <li>Ignoring Retry-After or provider backoff headers; treating 429 like generic 5xx.</li>
            <li>Retrying non-idempotent POSTs without idempotency keys → duplicates and side effects.</li>
            <li>Infinite or unbounded retries; no cap on attempts or total time.</li>
            <li>Layered retries (SDK + proxy + app) amplifying traffic during incidents.</li>
            <li>Retrying client-side cancellations/timeouts caused by user aborts.</li>
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
            'Configurable base delay, multiplier, cap, max attempts, and total duration.',
            'Jitter strategies (full, equal, decorrelated) to desynchronize clients.',
            'Error classification and policy per endpoint/method/tenant.',
            'Header-aware behavior (Retry-After, rate-limit headers).',
            'Idempotency support (keys, dedupe windows) for safe writes.',
            'Global retry budgets and per-dependency concurrency caps.',
            'Observability hooks: metrics, tracing spans, structured logs.',
            'Integration with circuit breakers, bulkheads, queues, and DLQs.',
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
            <li>Retry success rate and average attempts-to-success.</li>
            <li>Total time-to-success vs baseline; p95/p99 latency impact.</li>
            <li>Error-rate reduction (429/5xx) and fallback/DLQ rates.</li>
            <li>Duplicate suppression rate for idempotent writes; replay incidents avoided.</li>
            <li>Retry amplification factor under incidents; adherence to global retry budget.</li>
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
            <li>LLM/API cost: each retry replays prompt + completion tokens; cap attempts and use caching to reduce spend.</li>
            <li>CPU/memory: timers and state are O(1) per call; prefer async I/O to avoid thread blocking.</li>
            <li>Connections: bound concurrent in-flight retries; avoid retrying long bodies/uploads.</li>
            <li>Network/egress: retries add traffic; enforce backoff caps and exponential spacing under outages.</li>
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
            <li>Third‑party APIs that emit 429/5xx with Retry‑After (payments, email/SMS, LLM providers).</li>
            <li>Mobile/edge clients on unreliable networks (lossy or high‑latency links).</li>
            <li>Event processing with at‑least‑once semantics; transactional deadlocks and transient DB timeouts.</li>
            <li>Fan‑out aggregators where individual branch failures are often transient.</li>
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
              <li><a href="https://arxiv.org/abs/1402.5207" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Bender et al. (2014): How to Scale Exponential Backoff</a></li>
              <li><a href="https://sre.google/sre-book/handling-overload/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google SRE: Handling Overload (client-side throttling, backoff, jitter)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Prescriptive Guidance: Retry with Backoff</a></li>
              <li><a href="https://learn.microsoft.com/en-us/azure/architecture/patterns/retry" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Retry pattern</a></li>
              <li><a href="https://cloud.google.com/storage/docs/retry-strategy" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Cloud: Retry strategy (exponential backoff with jitter)</a></li>
              <li><a href="https://www.rfc-editor.org/rfc/rfc9110.html#name-retry-after" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RFC 9110: Retry-After header</a></li>
              <li><a href="https://grpc.io/docs/guides/retry/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">gRPC: Retry policy</a></li>
              <li><a href="https://stripe.com/docs/idempotency" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stripe: Idempotency keys</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://resilience4j.readme.io/docs/retry" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Resilience4j (Java): Retry</a></li>
              <li><a href="https://github.com/App-vNext/Polly" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Polly (.NET)</a></li>
              <li><a href="https://tenacity.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tenacity (Python)</a></li>
              <li><a href="https://github.com/litl/backoff" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">backoff (Python)</a></li>
              <li><a href="https://github.com/hashicorp/go-retryablehttp" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">go-retryablehttp (Go)</a></li>
              <li><a href="https://github.com/softonic/axios-retry" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">axios-retry (JavaScript)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Architecture Blog: Exponential Backoff and Jitter (Marc Brooker)</a></li>
              <li><a href="https://medium.com/yandex/good-retry-bad-retry-an-incident-story-648072d3cee6" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Good Retry, Bad Retry: An Incident Story (Yandex)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};