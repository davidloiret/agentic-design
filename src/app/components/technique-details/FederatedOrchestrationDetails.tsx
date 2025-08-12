'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const FederatedOrchestrationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Federated Orchestration coordinates model training and/or inference across distributed clients (devices, sites, or
            organizations) without centralizing raw data. A coordinator distributes a model or plan, clients execute locally on
            their private data, and privacy-preserving aggregation combines updates. This preserves data sovereignty, reduces
            bandwidth for sensitive data, and enables cross-device (large, unreliable populations) and cross-silo (smaller, reliable
            institutions) collaboration. Enhancements include secure aggregation, differential privacy, robust aggregation,
            compression, and hierarchical federation for scale.
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
            <li>Enrollment & trust: register clients, attest software/TEE where applicable, provision credentials.</li>
            <li>Round planning: sample available clients; pick cross-device or cross-silo strategy and quotas.</li>
            <li>Distribute task: send global model/checkpoint, hyperparameters, and training/inference plan.</li>
            <li>Local execution: clients train or run inference on local data; compute model deltas or summaries.</li>
            <li>Privacy layer: apply secure aggregation and/or differential privacy before sharing updates.</li>
            <li>Aggregation: server or hierarchy aggregates updates (FedAvg/robust aggregators); validate quality.</li>
            <li>Evaluation: assess on held-out data/slices; check cohort fairness and drift; gate rollout.</li>
            <li>Personalization: optionally adapt global model to local domains (fine-tune, adapters, FedPer).</li>
            <li>Iteration & rollout: repeat rounds; version artifacts; stage and monitor deployments.</li>
            <li>Ops: handle stragglers/dropouts, heterogeneity (FedProx/SCAFFOLD), security, and audit.</li>
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
            'Choose topology for context: cross-device (large, unreliable clients) vs cross-silo (fewer, reliable orgs).',
            'Mitigate heterogeneity: use FedProx/SCAFFOLD; adapt local epochs, learning rates, and batch sizes.',
            'Apply secure aggregation (Bonawitz et al.) so the server sees only encrypted/pooled updates.',
            'Use differential privacy with moments/accountant to track and bound privacy budget (ε, δ).',
            'Adopt robust aggregation (median/trimmed-mean/Krum) to resist outliers/Byzantine updates.',
            'Compress updates: quantization, sparsification, sketching, and periodic full sync to cut bandwidth.',
            'Sample clients fairly; balance participation to reduce cohort bias and starvation.',
            'Validate each round on held-out and cohort-sliced data; monitor fairness and drift.',
            'Version everything (model, data schema, optimizer, DP params); keep lineage and audit trails.',
            'Encrypt in transit and at rest; prefer TEEs where feasible; harden against poisoning and inversion attacks.',
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
            <li>Data can be centralized legally and cheaply, and central training meets requirements.</li>
            <li>Ultra‑low latency single‑shot tasks where round‑based coordination breaks SLOs.</li>
            <li>Very few participants with similar data—central or split learning may be simpler.</li>
            <li>Models exceed client compute/memory/energy budgets; connectivity is highly unstable.</li>
            <li>Use cases requiring raw cross‑party joins/feature engineering across silos.</li>
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
            <li>Non‑IID data causing divergence or slow convergence without heterogeneity controls.</li>
            <li>Privacy leakage via updates (gradient inversion); missing secure aggregation/DP.</li>
            <li>Poisoning/Byzantine clients degrading or backdooring the global model.</li>
            <li>Client dropouts and stragglers stalling rounds; no partial aggregation or timeouts.</li>
            <li>Bandwidth blowups from large dense updates; no compression or update sparsity.</li>
            <li>Version/config drift; inadequate auditability and reproducibility of rounds.</li>
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
            'Privacy‑preserving aggregation (secure aggregation, differential privacy)',
            'Decentralized local training/inference with data residency compliance',
            'Robust aggregation against outliers/Byzantine behavior',
            'Client heterogeneity tolerance (FedProx/SCAFFOLD)',
            'Hierarchical federation for scale (edge → regional → central)',
            'Bandwidth‑efficient updates (quantization, sparsity, sketches)',
            'Personalization and domain adaptation options',
            'End‑to‑end governance, lineage, and auditability',
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
            <li>Global model quality (accuracy/AUC) and cohort fairness deltas.</li>
            <li>Rounds to convergence; wall‑clock time per round; participation rate.</li>
            <li>Communication cost per round (MB/client, total bytes) and compression ratio.</li>
            <li>Client success rate, dropout/straggler rate, and energy usage on device.</li>
            <li>Privacy budget consumed (ε, δ) and secure aggregation coverage.</li>
            <li>Attack detection metrics (backdoor/poisoning flags) and rollback time.</li>
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
            <li>Primary drivers: model size, update size/frequency, client count, and rounds. Prefer sparse/quantized updates.</li>
            <li>Cap per‑round payloads; use sketching/top‑k gradients; schedule smaller local epochs for constrained clients.</li>
            <li>If LLM steps exist, cap prompt/output tokens; send references/IDs not transcripts; cache static context.</li>
            <li>Use hierarchical aggregation to localize traffic; compress over WAN; batch client uploads.</li>
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
            <li>Healthcare networks: cross‑hospital learning without moving patient data.</li>
            <li>Financial institutions: fraud/risk modeling across banks with data locality.</li>
            <li>Mobile/edge: next‑word prediction, personalization, and on‑device vision.</li>
            <li>Industrial IoT and smart cities: privacy‑sensitive analytics across sites.</li>
            <li>Cross‑enterprise collaboration with strict data residency/compliance.</li>
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
              <li><a href="https://arxiv.org/abs/1602.05629" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Communication‑Efficient Learning of Deep Networks from Decentralized Data (McMahan et al., 2017) – FedAvg</a></li>
              <li><a href="https://arxiv.org/abs/1912.04977" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Advances and Open Problems in Federated Learning (Kairouz et al., 2021)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/3133956.3133982" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Practical Secure Aggregation for Privacy‑Preserving ML (Bonawitz et al., CCS 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1812.06127" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Byzantine‑robust distributed learning via median and trimmed mean (Yin et al., 2018)</a></li>
              <li><a href="https://papers.nips.cc/paper/2017/hash/f4b9ec30ad9f68f89b29639786cb62ef-Abstract.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Krum: Byzantine‑tolerant aggregation (Blanchard et al., NeurIPS 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1812.06127" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FedProx: Heterogeneity mitigation in FL (Li et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/1910.06378" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SCAFFOLD: Stochastic Controlled Averaging (Karimireddy et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2003.14053" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Inverting Gradients – privacy attacks on FL (Geiping et al., 2020)</a></li>
              <li><a href="https://arxiv.org/abs/2003.00295" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Asynchronous FL (FedAsync and variants)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.tensorflow.org/federated" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">TensorFlow Federated Documentation</a></li>
              <li><a href="https://flower.dev/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Flower (FLwr) Documentation</a></li>
              <li><a href="https://docs.fedml.ai/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FedML Docs</a></li>
              <li><a href="https://nvidia.github.io/NVFlare/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA FLARE Docs</a></li>
              <li><a href="https://openfl.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Intel OpenFL Docs</a></li>
              <li><a href="https://fate.fedai.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">FATE (Federated AI Technology Enabler)</a></li>
              <li><a href="https://docs.openmined.org/projects/pysyft/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenMined PySyft</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>TensorFlow Federated, Flower, FedML, NVIDIA FLARE, OpenFL, FATE, PySyft</li>
              <li>Privacy/crypto: Opacus DP (PyTorch), TF Privacy; HE/SMPC libraries as needed</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.openmined.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenMined Community</a></li>
              <li><a href="https://github.com/adap/flower/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Flower Discussions</a></li>
              <li><a href="https://github.com/NVIDIA/NVFlare/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVFLARE Discussions</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/federated-learning" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stack Overflow: federated‑learning</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};