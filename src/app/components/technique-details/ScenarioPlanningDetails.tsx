'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ScenarioPlanningDetails = () => {
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
            Scenario Planning develops robust strategies for agentic AI systems by exploring multiple plausible futures under uncertainty.
            Teams identify key drivers and critical uncertainties, construct a small set of contrasting yet plausible scenarios,
            stress-test plans against each scenario, and define early-warning indicators and decision triggers for timely adaptation.
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
            <li>Frame the decision: clarify scope, planning horizon, stakeholders, constraints, and success criteria.</li>
            <li>Environmental scanning: collect signals and trends; identify key drivers and critical uncertainties.</li>
            <li>Scenario construction: craft 3–4 plausible, internally consistent scenarios covering the uncertainty space.</li>
            <li>Implications analysis: derive risks, opportunities, and operational constraints for each scenario.</li>
            <li>Strategy design: specify core strategies that work across scenarios and options specific to each.</li>
            <li>Decision triggers: define leading indicators, thresholds, and playbooks for scenario shifts.</li>
            <li>Pilot and portfolio: stage investments, build optionality, and run controlled experiments.</li>
            <li>Monitoring and refresh: track indicators, review quarterly/biannually, and update scenarios/strategies.</li>
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
            'Limit to 3–4 contrasting, plausible scenarios; avoid probability debates early; ensure internal consistency.',
            'Represent heterogeneous perspectives (product, safety, legal, ops, finance, user research) to reduce bias.',
            'Make scenarios decision-useful: quantify ranges, surface constraints, and tie to concrete actions.',
            'Define a robust core strategy plus option-specific hedges; pre-approve playbooks for fast pivots.',
            'Instrument early-warning indicators and automate ingestion where possible (dashboards, alerts).',
            'Rehearse transitions with tabletop exercises; maintain a living scenario log and postmortems.',
            'Integrate with AI risk frameworks (NIST AI RMF, ISO/IEC 23894) and regulatory watch (e.g., EU AI Act).',
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
            <li>Immediate, tactical decisions with tight real-time SLOs where foresight workshops add latency.</li>
            <li>Domains with low uncertainty and stable, well-understood dynamics where standard forecasting suffices.</li>
            <li>Situations lacking the organizational will to act on outcomes (no appetite for portfolio options).</li>
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
            <li>Over-indexing on a “most likely” scenario and underinvesting in hedges and leading indicators.</li>
            <li>Producing narrative-only scenarios without quantitative bounds, triggers, or executable playbooks.</li>
            <li>Too many scenarios causing analysis paralysis; or scenarios that are not mutually distinct.</li>
            <li>Failure to refresh scenarios as the environment and model capabilities change.</li>
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
            'Plausible, internally consistent futures (3–4)',
            'Explicit critical uncertainties and key drivers',
            'Core strategy + scenario-specific options',
            'Leading indicators and decision triggers',
            'Playbooks for fast transitions',
            'Portfolio and staged investments',
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
            <li>Decision readiness: coverage of critical uncertainties; playbook completeness and time-to-pivot.</li>
            <li>Adaptation speed: detection-to-action latency when indicators cross thresholds.</li>
            <li>Outcome resilience: performance variance across scenarios (cost, safety, compliance, quality).</li>
            <li>Review cadence adherence and scenario refresh rate.</li>
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
            <li>LLM budgeting: 3–4 scenarios × (drivers + uncertainties + narrative + implications + strategy) tokens.</li>
            <li>Prefer structured prompts and tables; summarize background (10–20%) and reference sources by link/id.</li>
            <li>Automate indicator monitoring to reduce manual analysis; cache canonical scenario templates.</li>
            <li>Estimate cost per review cycle; cap depth of exploration per session and batch long reports.</li>
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
            <li>AI product roadmaps under regulatory and capability uncertainty (e.g., EU AI Act timelines, model advances).</li>
            <li>Risk management for safety-critical deployments (healthcare, finance, autonomous systems).</li>
            <li>Go-to-market and pricing under macro uncertainty; data residency/compliance strategies.</li>
            <li>Org capability building and investment portfolio planning for agentic platforms.</li>
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
              <li><a href="https://sloanreview.mit.edu/article/scenario-planning-a-tool-for-strategic-thinking/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Schoemaker (1995): Scenario Planning — A Tool for Strategic Thinking</a></li>
              <li><a href="https://hbr.org/1985/09/scenarios-uncharted-waters-ahead" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wack (1985): Scenarios — Uncharted Waters Ahead</a></li>
              <li><a href="https://link.springer.com/article/10.1007/s00146-020-00982-1" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Bradfield et al.: Evolution of scenario planning (review)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.shell.com/energy-and-innovation/the-energy-future/scenarios.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Shell Scenarios: Practitioner materials</a></li>
              <li><a href="https://www.sbs.ox.ac.uk/research/oxford-scenario-planning-approach" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Oxford Scenario Planning Approach</a></li>
              <li><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NIST AI Risk Management Framework</a></li>
              <li><a href="https://www.iso.org/standard/77304.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ISO/IEC 23894:2023 — AI Risk Management</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://emaworkbench.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">EMA Workbench (Exploratory Modeling & Analysis)</a></li>
              <li><a href="https://salib.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SALib (Sensitivity Analysis)</a> / <a href="https://mesa.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Mesa (Agent‑Based Modeling)</a></li>
              <li><a href="https://vensim.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Vensim / System Dynamics</a> and <a href="https://www.anylogic.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AnyLogic</a> for simulation</li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a> and orchestration frameworks for planner–executor loops</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.apf.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Association of Professional Futurists (APF)</a> and <a href="https://www.oecd.ai/en" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OECD.AI</a></li>
              <li><a href="https://www.weforum.org/centre-for-the-fourth-industrial-revolution/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">WEF C4IR</a> policy/foresight resources</li>
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums</a> (AI governance and deployment threads)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};