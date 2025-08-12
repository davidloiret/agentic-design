'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface LrtDetailsProps {
  selectedTechnique: any;
}

export const LrtDetails: React.FC<LrtDetailsProps> = ({ selectedTechnique }) => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Performs iterative reasoning inside the model’s continuous latent space using a depth-recurrent
            computation block. At inference, the model can unroll this latent recurrence for a variable number
            of cycles to refine hidden states before decoding a final answer. This scales test-time compute
            without emitting intermediate tokens, improving efficiency on reasoning tasks while keeping external
            token usage low.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Encode input into a high-dimensional latent representation.</li>
            <li>Iterate latent recurrence K times (adaptive at inference) to refine hidden states.</li>
            <li>Assess halting criteria (confidence/score/compute budget) to stop latent iteration.</li>
            <li>Decode refined latent state into the final output.</li>
            <li>Optionally log metrics vs. K to calibrate future depth schedules.</li>
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
            'Use adaptive depth: grow K with uncertainty/difficulty; cap by latency/cost SLOs.',
            'Define robust halting: confidence thresholds, verifier scores, or plateau detection.',
            'Stability tuning: normalization, careful learning rates, and gradient clipping for recurrent blocks.',
            'Calibrate with curves: measure accuracy/latency vs. K to find sweet spots per task/domain.',
            'Pair with lightweight verification or self-consistency checks at the end output stage.',
            'Monitor drift: periodically re-evaluate depth schedules as data and tasks change.'
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
            <li>Strict real-time paths where any added recurrence violates latency budgets.</li>
            <li>Tasks that require transparent, step-by-step intermediate outputs for auditability.</li>
            <li>Simple queries where direct decoding or short CoT already meets quality/cost targets.</li>
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
            <li>Overthinking: excessive K with diminishing returns; lack of proper stopping criteria.</li>
            <li>Instability from poorly tuned recurrent blocks (vanishing/exploding gradients).</li>
            <li>Ignoring interpretability: no tooling to inspect or validate latent trajectories.</li>
            <li>One-size-fits-all depth schedules that waste compute on easy tasks.</li>
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
            'Token-free intermediate reasoning within latent space',
            'Scalable test-time compute via depth recurrence (adjustable K)',
            'Improved device utilization by shifting cost from tokens to FLOPs',
            'Composable with verification and routing strategies',
            'Works without specialized CoT training data'
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
            <li>Accuracy/Pass@k on reasoning benchmarks as a function of K.</li>
            <li>Latency and cost per solved instance at target quality.</li>
            <li>Stability metrics across depths (no divergence/oscillation).</li>
            <li>Calibration of confidence vs. correctness after latent refinement.</li>
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
            <li>Low intermediate token usage; primary cost shifts to latent FLOPs.</li>
            <li>Higher device utilization and reduced interconnect pressure at scale.</li>
            <li>Cost scales with chosen depth K; tune per use case and SLO.</li>
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
            <li>Mathematical and logical reasoning, program analysis, and theorem-style tasks.</li>
            <li>Planning/optimization where iterative refinement improves solution quality.</li>
            <li>Large-scale serving where token bandwidth is costly but FLOPs are available.</li>
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
              <li>
                <a href="https://arxiv.org/abs/2502.05171" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Geiping et al. (2025): Scaling up Test-Time Compute with Latent Reasoning (Recurrent Depth)</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lilianweng.github.io/posts/2025-05-01-thinking/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lilian Weng (2025): Thinking at Inference Time</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/seal-rg/recurrent-pretraining" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Recurrent Pretraining (reference code)</a></li>
              <li><a href="https://huggingface.co/tomg-group-umd/huginn-0125" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Huginn (Hugging Face) model with recurrent depth</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums: Reasoning and test-time compute</a></li>
              <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default LrtDetails;


