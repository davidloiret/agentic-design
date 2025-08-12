'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EnterpriseOrchestrationDetails = () => {
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
            Enterprise orchestration coordinates human, AI, and system workflows under policy, identity, and observability controls. A workflow engine (BPMN/state machine) drives execution; a policy layer enforces guardrails; IAM scopes access; lineage, tracing, and audit provide accountability; approvals and SLAs ensure governance in regulated environments.
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
            <li>Process model: define BPMN/state graph; version and review.</li>
            <li>Policy modeling: encode rules as code (RBAC/ABAC, data residency, PII handling) in a central policy engine.</li>
            <li>Identity and access: map services and agents to roles/groups; scope secrets; establish audit principals.</li>
            <li>Data controls: classify data; set retention and lineage capture; configure DLP/redaction at boundaries.</li>
            <li>Execution layer: orchestrate tasks with idempotency, retries, compensations, and timeouts.</li>
            <li>Human-in-the-loop: implement approval gates and exception queues with SLAs.</li>
            <li>Observability: emit structured logs, metrics, traces; correlate runs and decisions.</li>
            <li>Audit & compliance: persist immutable audit trails; enable queries and attestations.</li>
            <li>Ops & change: canary new versions; track KPI deltas; run post-incident reviews.</li>
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
            'Separate control-plane (orchestration, policy, identity) from data-plane (task execution).',
            'Least-privilege IAM; short-lived tokens; scoped secrets; explicit approval principals.',
            'Policies as code with tests; versioned workflows; peer review and change controls.',
            'Strong idempotency keys and compensating transactions for external side-effects.',
            'SLA/SLOs with per-step budgets; timeouts, backoff, circuit breakers; backpressure on queues.',
            'Schema registries and typed contracts between steps; validate at boundaries.',
            'End-to-end lineage and PII redaction; data residency and transfer controls.',
            'Defense-in-depth for LLM steps: input sanitization, output validation, tool whitelist.',
            'Progressive delivery: canary, shadow runs, rollback plans; maintain runbooks.',
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
            <li>Simple one-off automations without governance, audit, or cross-system coordination.</li>
            <li>Exploratory prototypes where process and policies change daily.</li>
            <li>Ultra-low-latency paths where orchestration overhead breaks SLOs.</li>
            <li>Teams without operational capacity for policy, IAM, and incident management.</li>
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
            <li>Shadow automations bypassing policy checks and audit.</li>
            <li>Missing idempotency/compensation causing duplicate side-effects.</li>
            <li>Policy drift across environments; untested policy changes.</li>
            <li>Data residency/compliance violations due to ad-hoc integrations.</li>
            <li>No immutable audit retention or lineage, blocking investigations.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid gap-3">
          {[
            'BPMN/state-machine workflow execution with versioning',
            'Policies-as-code (RBAC/ABAC, data use, residency, approvals)',
            'IAM integration (OIDC/SAML, SCIM) and per-step credentials',
            'Immutable audit trails and tamper-evident logs',
            'Data lineage and catalog integration',
            'SLA/SLO tracking and escalation',
            'Human-in-the-loop approvals and exception handling',
            'Observability: metrics, logs, traces, run correlation',
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
            <li>Regulatory adherence rate and audit finding closure time.</li>
            <li>Approval cycle time and on-time SLA attainment.</li>
            <li>Incident rate (policy violations, failed approvals) and MTTR.</li>
            <li>Change failure rate and time-to-rollback for workflows/policies.</li>
            <li>Cost per orchestrated run; infrastructure and LLM token spend per step.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
          <p>Budget tokens and compute per step; use model tiering and caching to control spend; enforce concurrency limits and per-run quotas.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>LLM steps: small models for gating; strongest model for final synthesis; truncate context and use structured IO.</li>
            <li>Queue/backpressure: cap fan-out; use rate-limiters; prefer batch where safe.</li>
            <li>Storage: plan for audit/log retention and lineage metadata growth.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            'KYC/AML onboarding and case management',
            'Claims processing with human approvals',
            'Loan underwriting and document workflows',
            'Clinical/health data workflows with audit and consent',
            'Change management with approvals and separation of duties',
            'Data pipelines with lineage and compliance checks',
          ].map((uc) => (
            <div key={uc} className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg text-sm">
              <span className="text-base">✅</span>
              <span className="text-gray-300 font-medium">{uc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Academic Papers */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-orange-400">📚</span>
                Academic Papers
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://arxiv.org/abs/2204.07210" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• A Case for Microservices Orchestration Using Workflow Engines (2022)</a>
                <a href="https://arxiv.org/abs/2002.01699" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Component-aware Orchestration of Cloud-based Enterprise Applications (2020)</a>
              </div>
            </div>

            {/* Implementation Guides */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-green-400">🛠️</span>
                Implementation Guides
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• NIST AI Risk Management Framework 1.0</a>
                <a href="https://www.iso.org/standard/81230.html" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• ISO/IEC 42001:2023 AI Management System</a>
                <a href="https://docs.temporal.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Temporal: Workflow engine docs</a>
                <a href="https://docs.camunda.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Camunda 8: BPMN orchestration</a>
              </div>
            </div>

            {/* Tools & Libraries */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-purple-400">⚙️</span>
                Tools & Libraries
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.openpolicyagent.org/docs/latest/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Open Policy Agent (OPA)</a>
                <a href="https://openlineage.io/docs/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• OpenLineage (data lineage)</a>
                <a href="https://opentelemetry.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• OpenTelemetry (observability)</a>
                <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangGraph (agent workflows)</a>
                <a href="https://docs.prefect.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Prefect</a>
                <a href="https://docs.dagster.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Dagster</a>
                <a href="https://github.com/microsoft/presidio" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Microsoft Presidio (PII)</a>
                <a href="https://docs.nvidia.com/nemo/guardrails/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• NVIDIA NeMo Guardrails</a>
              </div>
            </div>

            {/* Community & Discussions */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">👥</span>
                Community & Discussions
              </h4>
              <div className="space-y-2 text-sm">
                <a href="https://stackoverflow.com/questions/tagged/workflow" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Stack Overflow: workflow orchestration</a>
                <a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangChain / LangGraph Discord</a>
                <a href="https://www.reddit.com/r/devops/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• r/devops: orchestration threads</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};