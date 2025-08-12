'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const GracefulDegradationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Maintain core user journeys when the system faces failures or overload by proactively reducing service
            quality, disabling non-critical features, and reallocating resources to essentials. Prefer partial,
            predictable functionality over total outage; combine with load shedding, throttling, circuit breaking,
            caching, and feature flags.
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
            <li>Classify features: critical, important, nice-to-have; map to business SLAs/SLOs.</li>
            <li>Define degradation levels (L1/L2/L3) with triggers (SLO errors, p95/p99 latency, queue depth, saturation).</li>
            <li>Implement controls: feature flags, QoS tiers, graceful timeouts, fallbacks, cached defaults, alternate providers.</li>
            <li>Detect stress/failure via observability; activate level-specific actions automatically at ingress and service tiers.</li>
            <li>Communicate status to users and ops; provide alternative flows and clear messaging.</li>
            <li>Recover gradually; verify metrics at each step; rollback on regressions; complete post-incident review.</li>
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
            'Kill-switches and feature flags per capability; exercise them in game days.',
            'Serve stale/cached results over errors; precompute fallbacks for hot paths and critical pages.',
            'Ingress load shedding and prioritization by tenant/QoS; enforce rate limits and request budgets.',
            'Isolate with bulkheads and bounded pools; apply backpressure to prevent cascading failures.',
            'Make degradation observable: events, metrics, traces, SLO-aware alerts, and runbooks.',
            'Design a clean degraded UX: subtle messaging, alternative flows, and user-initiated retries.',
            'Layer with circuit breakers, retries, autoscaling, and CDN strategies for resilience.',
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
            <li>Safety-critical flows where any reduction is unacceptable; design for fault tolerance instead.</li>
            <li>Regulated behaviors that must remain fully available or consistent under all conditions.</li>
            <li>Low-impact internal tools where added complexity outweighs resilience benefits.</li>
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
            <li>Untested kill-switches that fail during incidents; lack of recovery criteria leading to flapping.</li>
            <li>Global toggles without tenant/priority specificity; equal impact on critical customers.</li>
            <li>Hidden coupling across services causing cascading degradations and unexpected side effects.</li>
            <li>Confusing UX under degradation (cryptic errors, no alternatives, silent failures).</li>
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
            'Feature flags and scoped kill-switches',
            'Ingress load shedding, priority queues, and rate limiting',
            'Fallbacks: stale cache, static content, alternate providers',
            'Quality knobs: reduce model/context size, sampling, or fidelity',
            'Isolation: bulkheads, bounded pools, and backpressure',
            'Observability: degradation events, dashboards, and SLO alerts',
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
            <li>Core journey availability during incidents (auth, add-to-cart, checkout success rates).</li>
            <li>p95/p99 latency and error rate in degraded vs normal modes by route/service.</li>
            <li>Load shed percentage; protected capacity for priority traffic; rate-limit hit rate.</li>
            <li>Time in degraded states; flapping frequency; mean time to recovery to normal.</li>
            <li>User satisfaction/CSAT and revenue preserved during incidents.</li>
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
            <li>LLM paths: shorten context, reduce tool calls, prefer cached retrieval; cap iterations and depth.</li>
            <li>Compute: cap concurrency; shrink pool sizes per dependency; enforce request budgets.</li>
            <li>Network/storage: serve from CDN/caches; pre-render critical pages; defer non-essential writes.</li>
            <li>Cost: track cost-per-success during incidents; disable expensive enhancements first.</li>
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
            <li>High-traffic events (launches, sales) where optional features can be scaled down.</li>
            <li>Third-party dependency outages where alternates or cached data sustain core flows.</li>
            <li>Agentic systems with external tools—preserve essential actions; pause enhancements.</li>
            <li>Multi-tenant SaaS with tiered QoS and customer-specific prioritization.</li>
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
              <li><a href="https://dl.acm.org/doi/10.1145/1993744.1993752" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dean & Barroso – The Tail at Scale</a></li>
              <li><a href="https://arxiv.org/abs/2103.03956" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Quartermaster: Modeling and Simulating System Degradation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://sre.google/sre-book/handling-overload/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google SRE Book: Handling Overload</a></li>
              <li><a href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_design_principles.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS Well-Architected: Reliability Design Principles</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/patterns/throttling" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Throttling Pattern</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/patterns/bulkhead" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Bulkhead Pattern</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/patterns/circuit-breaker" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Circuit Breaker Pattern</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Resilience libraries: <a href="https://resilience4j.readme.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Resilience4j</a>, <a href="https://github.com/App-vNext/Polly" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Polly</a></li>
              <li>Traffic control: <a href="https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Envoy</a> outlier detection, <a href="https://istio.io/latest/docs/tasks/traffic-management/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Istio</a> traffic policies, NGINX rate limiting</li>
              <li>Feature flags: <a href="https://www.getunleash.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Unleash</a>, LaunchDarkly</li>
              <li>Caching/CDN: Cloudflare, Fastly, CDN-backed static fallbacks</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://blog.cloudflare.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cloudflare Engineering Blog: Load Shedding and Overload</a></li>
              <li>Netflix Engineering posts on resilience and fallback strategies; incident write-ups</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};