'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ReinforcementLearningAdaptationDetails = () => {
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
            Optimize a policy to maximize expected cumulative reward from sequential interactions. Use exploration to
            discover improvements, learn from trajectories (online or offline), and deploy a stable policy with safety
            constraints. In LLM agents, adaptation often uses bandits/RL on top of a frozen model (e.g., RLHF/RLAIF,
            reward modeling) to refine behaviors without full retraining.
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
            <li>
              Problem framing: define state/observation, action space, reward signal, horizons, and constraints; prefer
              offline evaluation proxies when online risk exists.
            </li>
            <li>
              Algorithm selection: value-based (e.g., DQN variants) for discrete actions; policy gradient/actor–critic (PPO,
              SAC) for continuous or stochastic policies; contextual bandits for single-step feedback; offline RL for
              logged data only.
            </li>
            <li>
              Data collection: simulate where possible; otherwise gated online traffic, shadow modes, or replay buffers.
              In LLMs, collect human/model preferences to train a reward model.
            </li>
            <li>
              Training/updates: perform stable updates (clipping, target networks, entropy regularization), reward
              normalization/shaping, and early stopping on off-policy evaluation.
            </li>
            <li>
              Evaluation: use A/B tests, counterfactual/off-policy estimators, safety checks, and regression suites;
              measure regret, success rate, and business KPIs.
            </li>
            <li>
              Deployment: start with small traffic, safety constraints, rollback, and continual monitoring; schedule
              re-training and drift detection.
            </li>
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
            'Start simple: use contextual bandits before full RL when feedback is single-step.',
            'Constrain policies with guardrails, action filters, and reward penalties for unsafe behavior.',
            'Use robust baselines: PPO with clipping for stability; SAC for continuous control and entropy tuning.',
            'Curate rewards: combine outcome metrics, proxy rewards, and penalties; monitor for specification gaming.',
            'Prefer offline RL, simulation, or gated rollouts before broad online exploration in high-risk domains.',
            'Log everything: seeds, configs, datasets, environment versions, and evaluation protocols for reproducibility.',
            'Apply off-policy evaluation (IPS, doubly robust, DM) before shipping; validate reward model calibration.',
            'Use checkpoints and rollback plans; deploy gradually with guardrails and traffic caps.',
            'For LLM agents, use preference modeling (RLHF/RLAIF) and conservative updates to avoid capability regression.'
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
          <p>No reliable or timely feedback signal; purely supervised mapping suffices.</p>
          <p>High-risk domains without safe simulation, guardrails, or rollback (e.g., safety-critical operations).</p>
          <p>Severe reward sparsity and no feasible shaping or curriculum; infeasible sample budgets.</p>
          <p>Short-lived products where exploration costs outweigh potential long-term gains.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Reward misspecification and gaming; misaligned proxies yielding unintended behaviors.</p>
          <p>Instability and high variance from large learning rates, unbounded updates, or poor normalization.</p>
          <p>Distribution shift between training logs and deployment; offline RL without sufficient coverage.</p>
          <p>Inadequate evaluation: relying solely on in-sample returns; no safety checks or long-horizon metrics.</p>
          <p>For LLMs: over-optimization to the reward model leading to loss of helpfulness or diversity.</p>
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
            'Exploration–exploitation trade-off with adaptive strategies (epsilon decay, UCB, Thompson sampling).',
            'Policy evaluation and improvement loops; actor–critic methods with variance reduction.',
            'Offline, off-policy learning with replay buffers; counterfactual estimators for safety.',
            'Reward modeling and preference learning (RLHF/RLAIF) for alignment with human goals.',
            'Safety constraints and risk-sensitive objectives; conservative updates (KL/clipping).',
            'Continuous monitoring, drift detection, and automated rollback.'
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
          <div>Cumulative reward/return; regret vs. baseline; success/goal completion rate.</div>
          <div>Sample efficiency: environment steps to reach target; wall-clock training time.</div>
          <div>Safety metrics: violation rate, blocked actions, and rollback frequency.</div>
          <div>Stability: variance of returns, update ratio health, and catastrophic divergence incidents.</div>
          <div>Business outcomes: retention, conversion, cost per improvement, and revenue lift.</div>
          <div>For LLMs: preference win-rate, helpfulness/harmlessness scores, diversity/coverage.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Compute: GPU hours scale with environment complexity and batch size; prioritize sample-efficient algorithms and simulators.</p>
          <p>Memory: replay buffers and large models increase VRAM; cap buffer size and use prioritized replay judiciously.</p>
          <p>LLM agents: tokens for preference data and online rollouts; reduce with distilled feedback, smaller evaluators, and caching.</p>
          <p>Operational: monitoring/telemetry overhead; use lightweight summaries and periodic evaluations.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Personalization and recommendations (bandits → RL for long-term value).</p>
          <p>Dialog policy optimization and assistant behavior tuning with RLHF/RLAIF.</p>
          <p>Robotics/control with simulation-to-real transfer; operations and resource allocation.</p>
          <p>Marketplace and bidding strategies; dynamic pricing; sequential decision analytics.</p>
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
              <li><a href="https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Sutton & Barto — Reinforcement Learning: An Introduction (2nd ed.)</a></li>
              <li><a href="https://www.nature.com/articles/nature14236" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Mnih et al. — Human-level control through deep RL (DQN, Nature 2015)</a></li>
              <li><a href="https://arxiv.org/abs/1707.06347" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Schulman et al. — Proximal Policy Optimization (PPO, 2017)</a></li>
              <li><a href="https://arxiv.org/abs/1801.01290" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Haarnoja et al. — Soft Actor-Critic (SAC, 2018)</a></li>
              <li><a href="https://arxiv.org/abs/2005.01643" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Levine et al. — Offline Reinforcement Learning: Tutorial and Review (2020)</a></li>
              <li><a href="https://arxiv.org/abs/2203.02155" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ouyang et al. — Training language models to follow instructions with human feedback (RLHF, 2022)</a></li>
              <li><a href="https://arxiv.org/abs/2302.08582" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Bai et al. — Constitutional AI: Harmlessness from AI feedback (2022)</a></li>
              <li><a href="https://arxiv.org/abs/2106.01345" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Chen et al. — Decision Transformer: Reinforcement Learning via Sequence Modeling (2021)</a></li>
              <li><a href="https://arxiv.org/abs/1606.01540" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Amodei et al. — Concrete Problems in AI Safety (2016)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://spinningup.openai.com/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Spinning Up in Deep RL</a></li>
              <li><a href="https://docs.ray.io/en/latest/rllib/index.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray RLlib Documentation</a></li>
              <li><a href="https://stable-baselines3.readthedocs.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stable-Baselines3 Docs</a></li>
              <li><a href="https://github.com/vwxyzjn/cleanrl" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CleanRL</a></li>
              <li><a href="https://farama.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Farama Foundation (Gymnasium, PettingZoo, Minigrid)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/ray-project/ray" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray RLlib</a>, <a href="https://github.com/DLR-RM/stable-baselines3" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Stable-Baselines3</a>, <a href="https://github.com/google-deepmind/acme" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeepMind Acme</a></li>
              <li><a href="https://github.com/rail-berkeley/d4rl" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">D4RL</a> (offline RL datasets), <a href="https://github.com/Farama-Foundation/Datasets" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Farama Datasets</a></li>
              <li><a href="https://github.com/Farama-Foundation/Gymnasium" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Gymnasium</a>, <a href="https://github.com/Farama-Foundation/PettingZoo" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PettingZoo</a>, <a href="https://github.com/deepmind/dm_control" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DM Control</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.reddit.com/r/reinforcementlearning/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/reinforcementlearning</a> and <a href="https://discord.gg/farama" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Farama Discord</a></li>
              <li><a href="https://sites.google.com/view/deep-rl-bootcamp/lectures" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Deep RL Bootcamp Lectures</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};