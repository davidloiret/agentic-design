'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const CircuitBreakerDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Circuit Breaker protects callers from repeatedly invoking an unhealthy dependency by short‑circuiting calls when
            failure rates or timeouts exceed thresholds. It runs as a lightweight state machine with Closed → Open → Half‑Open
            transitions based on rolling error/timeout windows and probe results, returning fast failures or fallbacks until
            recovery is verified.
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
            <li>Observe outcomes in a rolling window (timeouts, connection errors, HTTP 5xx, retriable errors).</li>
            <li>Evaluate trip conditions (e.g., error rate ≥ threshold with minimum calls, or consecutive failures count).</li>
            <li>Transition to Open and short‑circuit further calls; immediately return error or fallback.</li>
            <li>After a cool‑down, enter Half‑Open and allow limited concurrent probes with timeouts.</li>
            <li>If probes meet success criteria, Close and reset counters; on failure, return to Open.</li>
            <li>Emit metrics and events on every transition for monitoring and alerting.</li>
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
            'Always set timeouts before adding retries or breakers; no timeout → thread/connection pool exhaustion.',
            'Use sliding windows with minimum number of calls to avoid tripping on low traffic.',
            'Tune thresholds from SLOs and baselines (separate read vs write, per endpoint/tenant).',
            'Cap Half‑Open probes and use jittered backoff to prevent stampedes.',
            'Provide meaningful fallbacks (cached/stale data, alternate provider, graceful degradation).',
            'Combine with Bulkhead isolation and bounded concurrency per dependency.',
            'Differentiate error classes (timeouts vs 5xx vs 4xx) and exclude caller cancellations.',
            'Make breaker state observable: metrics, logs, traces, and alert on flapping or prolonged Open.',
            'Prefer library/mesh support (Resilience4j/Polly/Envoy/Istio) for consistency and operability.',
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
            <li>Local, in‑process operations where latency is microseconds and failures are not remote‑dependency related.</li>
            <li>Idempotent, low‑cost operations where a simple retry with backoff suffices.</li>
            <li>Hard real‑time paths where added checks would violate strict latency budgets.</li>
            <li>Critical actions that must always attempt (no safe fallback) and where Open would be worse than trying once.</li>
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
            <li>No timeout or shared unbounded pools → resource exhaustion despite breaker.</li>
            <li>Treating all errors equally; tripping on caller cancellations or expected 4xx.</li>
            <li>Low traffic without a minimum‑calls guard → noisy trips and flapping.</li>
            <li>Half‑Open allowing full traffic instead of limited probes.</li>
            <li>Breaker state not exposed to ops → silent failures, no alerts.</li>
            <li>Global/shared state across instances without coordination, causing inconsistent behavior.</li>
            <li>Retry storms combined with Open state due to upstream retries not disabled on short‑circuits.</li>
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
            'Rolling metrics window with minimum call count',
            'Open/Closed/Half‑Open state machine',
            'Short‑circuiting with fast failure or fallback',
            'Probe policy in Half‑Open with capped concurrency',
            'Per‑endpoint configuration and tagging',
            'Metrics, logs, and tracing hooks for observability',
            'Integration with retries, timeouts, bulkheads, and backpressure',
            'Support via libraries and service meshes/API gateways',
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
            <li>Trip rate (Open events) and time spent Open; flapping frequency.</li>
            <li>Short‑circuited requests vs prevented downstream calls; fallback hit rate.</li>
            <li>Probe success ratio and time to recovery (Open → Closed).</li>
            <li>Downstream p95/p99 latency and error rate vs baseline.</li>
            <li>Caller pool utilization, queue depth, and shed/drop rate under stress.</li>
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
            <li>Token usage: Not applicable (no LLM calls). Keep prompts separate from breaker logic if used by callers.</li>
            <li>CPU/memory: O(1) per call; small rolling window buffers/counters. Prefer ring buffers to limit memory.</li>
            <li>Latency overhead: Microseconds to low milliseconds for checks; ensure non‑blocking metrics I/O.</li>
            <li>Cardinality: Keep label dimensions (per endpoint/tenant) bounded to avoid metrics blowup.</li>
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
            <li>Microservices calling unreliable downstreams (DB replicas, search, payment, email/SMS, third‑party APIs).</li>
            <li>Edge/API gateways protecting upstreams from dependency outages.</li>
            <li>Aggregator services with fan‑out where a single failing branch would otherwise block the whole request.</li>
            <li>Service mesh/gateway level protection with outlier detection and ejection.</li>
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
              <li>Release It! (2nd ed.) – Michael Nygard</li>
              <li>Tail at Scale – Dean and Barroso</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Azure Architecture Center – Circuit Breaker</li>
              <li>AWS Prescriptive Guidance – Circuit Breaker</li>
              <li>Microsoft Cloud Design Patterns – Circuit Breaker</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Resilience4j (Java)</li>
              <li>Polly ( .NET )</li>
              <li>Envoy/Istio outlier detection (service mesh)</li>
              <li>Opossum (Node.js), gobreaker (Go), pybreaker (Python)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Martin Fowler – Circuit Breaker bliki</li>
              <li>Netflix Hystrix (archived) and deprecation notes; Resilience4j migration guides</li>
              <li>Conference talks and SRE blogs on resilience patterns</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};