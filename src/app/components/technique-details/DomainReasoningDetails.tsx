'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface DomainReasoningDetailsProps {
  selectedTechnique: any;
}

export const DomainReasoningDetails: React.FC<DomainReasoningDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism (short conceptual overview) */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism (short conceptual overview)
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Combine explicit domain knowledge (ontologies/knowledge graphs), retrieval-grounded context, and
            rule/constraint engines with LLM reasoning. Ground prompts in authoritative sources, enforce
            deterministic constraints for safety and compliance, and produce explainable outputs with
            evidence and provenance.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Scope the domain and critical use-cases with subject-matter experts (SMEs).</li>
            <li>Model knowledge: curate ontology/knowledge graph; define schemas, vocabularies, and canonical sources.</li>
            <li>Grounding: implement retrieval over curated corpora and graphs; attach citations and provenance.</li>
            <li>Reasoning: orchestrate LLM with rules/constraints (neuro-symbolic, tool-use, programmatic checks).</li>
            <li>Safety & validation: apply schema validation, policy checks, red-teaming, and human-in-the-loop (HITL).</li>
            <li>Monitoring: track accuracy, drift, data freshness; schedule knowledge updates and audits.</li>
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
            'Use an explicit domain model (ontology/KG) as the system of record; keep it versioned with provenance.',
            'Ground answers in retrieved evidence; include citations and confidence/uncertainty indicators.',
            'Enforce constraints with schemas, allowlists, and programmatic validators before output is released.',
            'Design for explainability: show applied rules, sources used, and reasoning summaries for each decision.',
            'Continuously evaluate with domain-specific test sets and SME review; automate regression checks.',
            'Implement data freshness SLAs and staleness alerts for knowledge bases and indices.',
            'Apply least-privilege access, PII/PHI redaction, and audit logging across the pipeline.',
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
            <li>Low-stakes, generic tasks where general models perform sufficiently without domain grounding.</li>
            <li>Rapidly changing domains without governance to maintain knowledge freshness and safety.</li>
            <li>Scenarios lacking SME access or evaluators to define requirements and verify outputs.</li>
            <li>Hard real-time paths with strict latency budgets that cannot accommodate retrieval/validation.</li>
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
            <li>Stale or inconsistent knowledge bases leading to outdated or contradictory outputs.</li>
            <li>Unvalidated generation (no schema/constraint checks) in safety-critical contexts.</li>
            <li>Opaque answers without sources or rationale, reducing trust and auditability.</li>
            <li>Over-fitting prompts to idiosyncratic jargon; brittle behavior across subdomains.</li>
            <li>Rule explosion and maintenance burden without modularization and testing.</li>
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
            'Ontology/Knowledge Graph grounding with controlled vocabularies',
            'Evidence-cited retrieval and provenance tracking',
            'Rule/constraint engines for policy and safety enforcement',
            'Schema-based validation (structured outputs)',
            'Explainable reasoning summaries and audit trails',
            'Human-in-the-loop review and escalation pathways',
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
            <li>Task-specific accuracy against gold standards and SME scoring.</li>
            <li>Evidence coverage: proportion of outputs with verifiable citations.</li>
            <li>Policy/constraint violation rate and post-validation rejection rate.</li>
            <li>Human review override rate and turnaround time for decisions.</li>
            <li>Knowledge freshness: update latency, drift alarms, and resolved inconsistencies.</li>
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
            <li>Higher context costs from structured grounding (retrieval, KG context, schemas).</li>
            <li>Mitigate via caching, context compression, query planning, and limited reasoning depth.</li>
            <li>Prefer function/tool calling with structured I/O to reduce token overhead and errors.</li>
            <li>Profile p50/p95 latency, retrieval fan-out, and validator costs; cap retries and backtracking.</li>
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
            <li>Clinical decision support and guideline-aware triage with explicit citations.</li>
            <li>Legal research and policy analysis grounded in statutes, caselaw, and precedents.</li>
            <li>Financial risk/compliance analysis with rule checks and auditability.</li>
            <li>Engineering design reviews against standards/specifications with traceability.</li>
            <li>Regulatory and safety documentation QA over controlled corpora.</li>
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
              <li><a href="https://arxiv.org/abs/2402.06196" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Knowledge Graphs + LLMs: A Survey (2024)</a></li>
              <li><a href="https://arxiv.org/abs/2312.01703" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Neuro-Symbolic AI: Current Trends (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2108.12370" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DomiKnowS: Integrating Symbolic Domain Knowledge (2021)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/microsoft/graphrag" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft GraphRAG (Knowledge-Graph RAG)</a></li>
              <li><a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: Agent workflows with control flow</a></li>
              <li><a href="https://dspy.ai" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DSPy: Programmatic prompting and optimization</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Neo4j, RDF/OWL, <a href="https://protege.stanford.edu/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Protégé</a>, OWL reasoners (HermiT, Pellet)</li>
              <li>LangChain, LlamaIndex, Guardrails, Pydantic/JSON Schema validators</li>
              <li>FAISS/Annoy for retrieval; rerankers (e.g., Cohere Rerank)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://community.neo4j.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Neo4j Community: Graph + RAG patterns</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Retrieval & reasoning</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default DomainReasoningDetails;


