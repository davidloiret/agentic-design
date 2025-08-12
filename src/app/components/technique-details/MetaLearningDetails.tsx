'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MetaLearningDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 text-gray-200 text-base leading-relaxed space-y-2">
          <p>Meta-learning trains a system across many tasks so it learns priors and update rules that enable rapid adaptation to a new task with few examples.</p>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li><span className="font-medium">Optimization-based</span>: learn an initialization or update rule (e.g., MAML, First-Order MAML, Reptile).</li>
            <li><span className="font-medium">Metric-based</span>: learn embeddings and a distance metric for fast nearest-prototype decisions (e.g., Matching Nets, Prototypical Networks, Relation Nets).</li>
            <li><span className="font-medium">Model-based</span>: use fast-updating controllers/memory (e.g., RNN meta-learners, memory-augmented networks).</li>
          </ul>
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
            <li>Define a <span className="font-medium">task distribution</span> and episodic datasets; split each task into support (adapt) and query (evaluate).</li>
            <li><span className="font-medium">Inner loop</span>: adapt model on a task's support set for K steps (or via a learned optimizer).</li>
            <li><span className="font-medium">Outer loop</span>: update meta-parameters to improve post-adaptation performance on query sets.</li>
            <li><span className="font-medium">Meta-validation</span>: tune hyperparameters (inner steps, lrs, regularization) on held-out tasks.</li>
            <li><span className="font-medium">Meta-testing</span>: measure few-shot performance and adaptation speed on unseen tasks.</li>
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
            'Ensure broad task diversity; match meta-train to expected meta-test domains to avoid distribution shift.',
            'Use strict episodic splits (no leakage between support/query or between tasks).',
            'Prefer first-order variants (FOMAML/Reptile) if second-order gradients are unstable or memory-heavy.',
            'Tune adaptation steps and inner/outer learning rates; consider cosine decay or per-parameter lrs.',
            'Normalize embeddings for metric-based methods; use temperature-scaled softmax for prototypes.',
            'Benchmark on standardized suites (e.g., MiniImageNet, Meta-Dataset, Meta-World, Omniglot) with consistent protocols.',
            'Log seeds/configs and report confidence intervals over many sampled tasks for reproducibility.'
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
          <p>Each task has abundant labeled data and conventional training is simpler and cheaper.</p>
          <p>Tasks are extremely heterogeneous with little shared structure, leading to negative transfer.</p>
          <p>Severe compute/memory constraints make episodic meta-training impractical.</p>
          <p>Strict latency/SLOs preclude multi-step adaptation at inference time.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Meta-overfitting: excellent on meta-train tasks but weak on novel tasks; address with task diversity and regularization.</p>
          <p>Leakage between support/query or between tasks inflates reported accuracy.</p>
          <p>Unstable higher-order gradients in MAML; mitigate with gradient clipping, lower inner steps, or first-order variants.</p>
          <p>Inadequate evaluation: too few meta-test tasks or missing confidence intervals.</p>
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
            'Rapid few-shot adaptation with minimal labeled data.',
            'Task-conditioned initialization and/or learned optimizers.',
            'Representation reuse and metric learning for robust generalization.',
            'Compatible with vision, NLP, RL; model-agnostic in optimization-based methods.',
            'Warm-starts for HPO/NAS via meta-features and prior runs.'
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
          <div>N-way K-shot accuracy (mean ± 95% CI) on unseen tasks.</div>
          <div>Adaptation speed: steps or wall-clock to reach target accuracy.</div>
          <div>Sample efficiency: performance vs. number of support examples.</div>
          <div>Generalization gap: meta-train vs. meta-test performance.</div>
          <div>Negative transfer rate: performance drop on out-of-domain tasks.</div>
          <div>Stability: variance across task samples and seeds.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Compute: episodic meta-training scales with tasks × inner steps × outer steps; second-order gradients increase memory/compute.</p>
          <p>Efficiency levers: first-order methods (FOMAML/Reptile), gradient checkpointing, smaller inner steps, and mixed precision.</p>
          <p>LLM agents: in-context meta-adaptation consumes tokens for demonstrations; cap K, cache exemplars, and compress context.</p>
          <p>Storage: maintain per-task splits and metadata; consider sharded datasets and lazy loading.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Few-shot classification and detection across domains (vision, NLP).</p>
          <p>Personalization with scarce per-user data; rapid domain adaptation.</p>
          <p>Warm-start hyperparameter optimization and neural architecture search.</p>
          <p>Robotics skill adaptation and sim-to-real transfer (e.g., Meta-World tasks).</p>
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
              <li><a href="https://arxiv.org/abs/1703.03400" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Finn et al. — Model-Agnostic Meta-Learning (MAML, 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1803.02999" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Nichol et al. — Reptile: A Scalable Meta-Learning Algorithm (2018)</a></li>
              <li><a href="https://arxiv.org/abs/1606.04080" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Vinyals et al. — Matching Networks for One Shot Learning (2016)</a></li>
              <li><a href="https://arxiv.org/abs/1703.05175" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Snell et al. — Prototypical Networks (2017)</a></li>
              <li><a href="https://arxiv.org/abs/2004.05439" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hospedales et al. — Meta-Learning in Neural Networks: A Survey (TPAMI 2021)</a></li>
              <li><a href="https://arxiv.org/abs/1909.02790" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Raghu et al. — Rapid Learning or Feature Reuse? (2019)</a></li>
              <li><a href="https://arxiv.org/abs/1903.03096" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Triantafillou et al. — Meta-Dataset: A Dataset of Datasets (2019)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://arxiv.org/abs/2008.12284" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">learn2learn: A Library for Meta-Learning Research (2020)</a></li>
              <li><a href="https://arxiv.org/abs/1909.06576" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Torchmeta: A Meta-Learning library for PyTorch (2019)</a></li>
              <li><a href="https://github.com/facebookresearch/higher" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PyTorch higher: differentiable optimizers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/learnables/learn2learn" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">learn2learn</a>, <a href="https://github.com/tristandeleu/torchmeta" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Torchmeta</a>, <a href="https://github.com/facebookresearch/higher" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">higher</a></li>
              <li><a href="https://github.com/google-research/meta-dataset" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Meta-Dataset</a>, <a href="https://github.com/rlworkgroup/metaworld" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Meta-World</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://paperswithcode.com/task/few-shot-image-classification" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Papers with Code — Few-shot benchmarks</a></li>
              <li><a href="https://meta-learning.ml/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NeurIPS Meta-Learning Workshop</a></li>
              <li><a href="https://github.com/sudharsan13296/Awesome-Meta-Learning" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Awesome Meta-Learning (curated resources)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};