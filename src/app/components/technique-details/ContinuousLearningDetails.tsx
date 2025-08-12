'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ContinuousLearningDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-rose-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Continual/continuous learning maintains a balance between stability (retaining prior knowledge)
            and plasticity (integrating new information) while models learn over streams of non-stationary
            data. Systems mitigate catastrophic forgetting via regularization (e.g., EWC, LwF), rehearsal
            and experience replay, parameter-efficient updates (LoRA/adapters), or dynamic architectures
            (e.g., Progressive Networks), with periodic evaluation on old and new tasks.
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
            <li>Define learning regime: class/task incremental, domain incremental, or streaming online; choose metrics (retention, BWT/FWT).</li>
            <li>Data ingestion: buffer streaming data; deduplicate; label or generate weak labels; detect drift/shifts.</li>
            <li>Stability–plasticity controls: pick strategy (replay, regularization, parameter-efficient finetuning, dynamic expansion).</li>
            <li>Update loop: schedule micro-batches; interleave replay exemplars; checkpoint and gate releases.</li>
            <li>Evaluation: track performance on historical tasks/slices and new data; run regression and safety suites.</li>
            <li>Deployment & rollback: progressive rollout; guardrails; monitor drift/forgetting and auto-retrain triggers.</li>
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
            'Prefer replay + regularization baselines (ER, DER++, EWC/LwF) before complex methods.',
            'Bound replay memory; use class-balanced reservoir sampling; store embeddings when raw data retention is constrained.',
            'Use parameter-efficient finetuning (LoRA/adapters) for frequent small updates; periodically consolidate via full finetune or distillation.',
            'Evaluate retention with task-specific held-out sets; report backward/forward transfer and forgetting metrics.',
            'Detect and label distribution shifts; split by time, domain, and task to avoid leakage.',
            'Isolate safety-critical capabilities; add guardrails and post-training safety checks for updated behaviors.',
            'Automate drift detection, update cadence, and rollback; keep immutable baselines for A/B comparisons.'
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
          <p>Static domains with infrequent change where periodic batch retraining is simpler and safer.</p>
          <p>Severely resource-constrained deployments where storage for replay or frequent updates is infeasible.</p>
          <p>High-stakes settings without safe evaluation sandboxes, guardrails, or instant rollback paths.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Catastrophic forgetting from unbalanced online updates without rehearsal or regularization.</p>
          <p>Data leakage across time/task splits; evaluation that ignores long‑term retention.</p>
          <p>Unbounded model growth with dynamic expansion; latency and cost regressions.</p>
          <p>Overfitting to the latest slice; loss of diversity and coverage in LLM behaviors.</p>
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
            'Rehearsal/replay buffers and generative replay for retention.',
            'Regularization: Elastic Weight Consolidation, Synaptic Intelligence, Learning without Forgetting.',
            'Dynamic architectures: Progressive Networks, expandable adapters/experts.',
            'Parameter‑efficient finetuning: LoRA/QLoRA, adapters, prefix-tuning.',
            'Drift detection and evaluation harness for long‑term retention.',
            'Privacy‑aware replay via embeddings or distillation when raw data cannot be stored.'
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
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>Retention/forgetting: backward transfer (BWT), average accuracy on past tasks over time.</div>
          <div>Forward transfer (FWT) and sample efficiency on new tasks/slices.</div>
          <div>Latency and cost: time and $ per successful update; tokens/steps per adaptation for LLMs.</div>
          <div>Resource footprint: replay memory size, VRAM/CPU usage, model parameter growth.</div>
          <div>Business outcomes: regression rate, incident count, user satisfaction, revenue/engagement deltas.</div>
          <div>Safety metrics: violation rate, blocked actions, rollback frequency post‑update.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>LLM updates: prefer PEFT (LoRA/QLoRA) to cap tokens, VRAM, and wall‑clock; cache exemplars and use small evaluators.</p>
          <p>Replay: cap memory with reservoir sampling; compress or store embeddings when raw retention is restricted.</p>
          <p>Dynamic growth: budget parameter expansion; periodically distill to a compact backbone to avoid unbounded costs.</p>
          <p>Ops: schedule updates during off‑peak; incremental evaluations over full re-runs; aggressive result caching.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Personalization and recommendations with drifting preferences.</p>
          <p>Fraud/anomaly detection under adversarial drift and emerging patterns.</p>
          <p>Conversational assistants learning products/policies with retention guarantees.</p>
          <p>Robotics/operations in evolving environments and non‑stationary dynamics.</p>
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
              <li><a href="https://www.pnas.org/doi/10.1073/pnas.1611835114" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kirkpatrick et al. — Elastic Weight Consolidation (PNAS 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1606.09282" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Rusu et al. — Progressive Neural Networks (2016)</a></li>
              <li><a href="https://arxiv.org/abs/1612.00796" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Li & Hoiem — Learning without Forgetting (2016)</a></li>
              <li><a href="https://arxiv.org/abs/1706.08840" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Rebuffi et al. — iCaRL (CVPR 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1706.08840" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lopez-Paz & Ranzato — Gradient Episodic Memory (2017)</a></li>
              <li><a href="https://arxiv.org/abs/1909.07888" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chaudhry et al. — A-GEM: Efficient Continual Learning (2019)</a></li>
              <li><a href="https://arxiv.org/abs/2302.00487" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wang et al. — A Comprehensive Survey of Continual Learning (2023)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://avalanche.continualai.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Avalanche: Continual Learning Library Docs</a></li>
              <li><a href="https://huggingface.co/docs/peft/index" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face PEFT (LoRA/adapters)</a></li>
              <li><a href="https://github.com/online-ml/river" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">River: Online machine learning</a></li>
              <li><a href="https://scikit-multiflow.github.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">scikit-multiflow: Data stream learning</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/ContinualAI/avalanche" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ContinualAI/Avalanche</a>, <a href="https://github.com/Continvvm/continuum" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Continvvm/continuum</a>, <a href="https://github.com/lebrice/Sequoia" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sequoia</a></li>
              <li><a href="https://github.com/huggingface/peft" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">huggingface/peft</a>, <a href="https://github.com/huggingface/trl" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">huggingface/trl</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.continualai.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ContinualAI community</a></li>
              <li><a href="https://github.com/ContinualAI/awesome-continual-learning" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Awesome Continual Learning (curated list)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};