'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const HealthMonitoringDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Multi-layered observability that continuously measures service, infrastructure, and model quality SLIs,
            combines Golden Signals with model-centric metrics, performs anomaly/predictive analysis, and drives
            automated remediation via runbooks and escalation policies.
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
            <li>Define SLIs and SLOs: latency, errors, saturation, traffic; plus model quality, safety, drift.</li>
            <li>Instrument code and infra: OpenTelemetry traces/metrics/logs; Prometheus exporters; K8s probes.</li>
            <li>Collect and store: metrics TSDB, logs, trace backends; control label/cardinality and retention.</li>
            <li>Baseline and detect: thresholds, statistical anomaly detection, canary analysis, dependency health.</li>
            <li>Alert and route: low-churn alert rules bound to SLOs with on-call, paging, and silencing windows.</li>
            <li>Auto-remediate: safe actions (restart, scale, route failover, cache flush) via runbooks; verify recovery.</li>
            <li>Review and improve: incident postmortems, update dashboards/runbooks, refine SLOs and automation.</li>
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
            'Start from user journeys → define SLIs, set SLOs, then derive alerting; avoid raw CPU-based alerts.',
            'Use the Golden Signals (latency, traffic, errors, saturation) and complement with RED/USE methods.',
            'Correlate traces, metrics, and logs via consistent IDs; adopt OpenTelemetry semantic conventions.',
            'Combine whitebox (internals) with blackbox/synthetic probes; monitor dependencies explicitly.',
            'Manage metrics cardinality (labels) and retention; budget for storage and query performance.',
            'Codify runbooks and safe automation; gate risky actions with safeguards and verifications.',
            'Use canary/blue-green with automated analysis before full rollouts; rollback criteria pre-defined.',
            'Track model KPIs (quality, drift, safety) alongside system KPIs; sample evaluations on a budget.',
            'Practice incident response (game days/chaos) and keep dashboards/runbooks version-controlled.',
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
            <li>Throwaway prototypes without uptime requirements or on-call ownership.</li>
            <li>Single-user/offline tools where local logs suffice and paging is inappropriate.</li>
            <li>Environments without basic instrumentation or where metrics storage cannot be supported.</li>
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
            <li>Alert fatigue: too many threshold alerts not tied to SLOs; missing silence windows and deduping.</li>
            <li>Ignoring saturation and p95/p99 latency; relying on averages and host-level CPU alone.</li>
            <li>Unbounded label cardinality causing cost/runaway time series and slow queries.</li>
            <li>Missing readiness/startup probes; only liveness → crash loops and cold start flapping.</li>
            <li>No runbooks or unsafe automation; remediation actions without verification or rollback.</li>
            <li>Tracking model metrics without drift/safety monitors; no human-in-the-loop for critical paths.</li>
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
            'Unified health score across service, infra, and model dimensions',
            'Golden Signals + RED/USE dashboards and dependency maps',
            'Anomaly detection and predictive failure analysis',
            'Synthetic probes and blackbox checks for critical journeys',
            'Trace-based health and distributed causality graphs',
            'Automated alerting with on-call routing and escalation',
            'Auto-remediation hooks with verification and rollback',
            'Canary/blue-green analysis and SLO error budget policies',
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
            <li>Time to detect (TTD) and mean time to resolve (MTTR) incidents.</li>
            <li>Incident rate and SLO compliance; error budget burn rate.</li>
            <li>Alert precision/recall; pages per week per on-call and false-positive rate.</li>
            <li>p95/p99 latency, error rate, and saturation vs baseline by service/route.</li>
            <li>Model quality uptime (e.g., accuracy/Sx metrics above threshold) and drift rate.</li>
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
            <li>Telemetry cost: control metrics label cardinality; set retention and downsampling policies.</li>
            <li>Tracing overhead: sample rates and tail-based sampling; cap spans per request.</li>
            <li>LLM evals: budget tokens for periodic canaries and spot checks; log minimal samples with redaction.</li>
            <li>Compute: anomaly detectors/canary analysis run on batch windows; isolate from hot path.</li>
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
            <li>Production model serving and agentic systems with external dependencies/tools.</li>
            <li>Multi-tenant SaaS APIs and mission-critical customer-facing services.</li>
            <li>Data/feature pipelines and retrieval layers backing RAG or personalization.</li>
            <li>Progressive delivery (canary/blue-green) and high-change-rate teams.</li>
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
              <li>Dean & Barroso – The Tail at Scale</li>
              <li>Brendan Gregg – USE method; Tom Wilkie – RED method</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Google SRE Book – SLIs/SLOs, Golden Signals</li>
              <li>Kubernetes – Liveness/Readiness/Startup Probes</li>
              <li>OpenTelemetry – Traces, Metrics, Logs and semantic conventions</li>
              <li>Prometheus – Alerting/Recording rules and label cardinality guidance</li>
              <li>Argo Rollouts – Automated canary analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Prometheus, Alertmanager, Grafana (Loki/Tempo for logs/traces)</li>
              <li>OpenTelemetry SDK/Collector; Jaeger/Tempo; OTLP exporters</li>
              <li>PagerDuty/Opsgenie for on-call and incident response</li>
              <li>Langfuse/Evidently/Arize Phoenix for LLM monitoring and evals</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>SRE community posts and production incident write-ups</li>
              <li>OpenTelemetry and Prometheus community docs/discussions</li>
              <li>Kubernetes SIGs on reliability/observability</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};