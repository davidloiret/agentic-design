'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EventDrivenMarketBasedDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Event‑Driven Market‑Based orchestration allocates tasks via a marketplace on an event bus. Clients publish
            task requests; autonomous agents evaluate and submit bids containing capability fit, price, latency, and
            confidence. A market maker matches bids to asks using auction rules and policy constraints, optionally
            escrows payment, dispatches work to the winner, and settles on completion while updating reputation.
            Price signals and reputation provide decentralized coordination, load balancing, and quality incentives.
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
            <li>Publish task: normalized schema with requirements, SLA, budget, constraints, privacy flags.</li>
            <li>Announce: fan‑out on marketplace topics; optional prefiltering by tags/capabilities.</li>
            <li>Evaluate: agents score fit locally (capability vectors, reputation, historical win‑rate).</li>
            <li>Bid: submit sealed or continuous bids with price, latency window, confidence, validity TTL.</li>
            <li>Match: market maker scores bids with reputation and constraints; run auction/clearing rule.</li>
            <li>Commit: notify winner(s); optional escrow/hold; emit work contract and acceptance tests.</li>
            <li>Execute: agent performs work; streams progress and partial results as events.</li>
            <li>Deliver: submit result; auto‑run acceptance checks; handle disputes via policy.</li>
            <li>Settle: release payment; update reputations (bonus/penalty, slashing on SLA breach/fraud).</li>
            <li>Audit/learn: append to immutable event log; update metrics and adaptive pricing policies.</li>
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
            'Standardize event schemas (task, bid, match, contract, delivery, settlement); include ids, TTLs, and causal links.',
            'Make all handlers idempotent; use exactly‑once or transactional outbox/inbox for bid/match/settlement.',
            'Choose auction rules to fit goals: sealed‑bid second‑price (truthful), first‑price with shading, or double auction.',
            'Incorporate reputation and SLA history into scoring; decay over time; guard against sybil/whitewashing.',
            'Enforce anti‑collusion policies: sealed bids, randomized close, caps on market share, anomaly detection.',
            'Apply QoS: per‑tenant rate limits, fair queueing, backpressure; partition marketplaces by domain.',
            'Use acceptance tests and escrow to align incentives; define dispute windows and automated remediation.',
            'Prefer privacy‑preserving announcements (capability tags) and sealed bids for sensitive tasks.',
            'Instrument full tracing across events; monitor match time, clearance rate, bid latency, cancellations.',
            'Provide fallback paths: default provider, re‑auction on timeout, or decompose tasks for partial fills.'
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
            <li>Small, stable teams with fixed roles where a simple router/orchestrator is sufficient.</li>
            <li>Hard real‑time or safety‑critical paths requiring deterministic latency without auction overhead.</li>
            <li>Strict compliance regimes that forbid broad task broadcast or cross‑tenant bidding.</li>
            <li>Environments with too few agents to create competition or with highly interdependent subtasks.</li>
            <li>Tasks with near‑zero variance in difficulty/cost where pricing and bidding add no value.</li>
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
            <li>Bid sniping or collusion; lack of sealed bids or randomized close encourages manipulation.</li>
            <li>Sybil attacks and reputation whitewashing without identity, staking, or decay mechanisms.</li>
            <li>Unbounded bidding storms under high fan‑out; missing rate limits/backpressure.</li>
            <li>Scoring solely on price; ignoring capability fit, latency risk, or historical quality.</li>
            <li>Weak acceptance tests; subjective acceptance leads to disputes and perverse incentives.</li>
            <li>No idempotency/transactionality; duplicate matches or lost settlements on failures.</li>
            <li>Market concentration: a few winners dominate; monitor and cap market share if needed.</li>
            <li>Leaky announcements exposing sensitive details; lack of privacy‑preserving task tags.</li>
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
            'Sealed‑bid and continuous auction modes (first‑price, Vickrey/second‑price, or double auction)',
            'Reputation‑weighted scoring with decay and domain‑specific reputations',
            'Escrow/hold and automated settlement based on acceptance tests',
            'Partial fulfillment and re‑auction for residual demand',
            'Policy constraints: budget caps, latency SLOs, compliance tags, locality',
            'Replayable event log and deterministic reprocessing for audits',
            'Privacy‑preserving announcements and sealed bids',
            'Timeouts, cancellations, and dispute resolution windows'
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
            <li>Bid latency p50/p95 and time‑to‑match; clearance rate per market.</li>
            <li>Market depth (bids per task), effective competition, and win‑rate concentration (Gini/HHI).</li>
            <li>Task success and acceptance rate; SLA breach rate; dispute/cancel rate.</li>
            <li>Cost per task and price efficiency vs. baseline; utilization/load balance across agents.</li>
            <li>Reputation drift and stability; fraud/anomaly flags; re‑auction frequency.</li>
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
            <li>Overhead scales with number of bidding agents: evaluation + bid‑composition prompts per task.</li>
            <li>Use compact bid schemas and capability vectors; cap bids/agent/time; sample or prefilter candidates.</li>
            <li>Compress announcements; prefer embeddings/capability tags over full task text where possible.</li>
            <li>Cache evaluation results for repeated tasks; reuse acceptance tests and contract templates.</li>
            <li>Track cost per matched task inclusive of failed bids and re‑auctions.</li>
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
            <li>Large, heterogeneous agent pools where specialization varies and demand is bursty.</li>
            <li>Federated marketplaces across teams or organizations with different cost/latency/quality trade‑offs.</li>
            <li>Resource allocation and load balancing with dynamic pricing (e.g., API providers, tool invocations).</li>
            <li>Competitive bidding for complex tasks (analysis, data labeling, code fixes) with acceptance tests.</li>
            <li>Multi‑robot/fleet coordination where tasks can be auctioned to the best‑fit executor.</li>
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
              <li><a href="https://www.ri.cmu.edu/pub_files/pub4/dias_michael_2006_3/dias_michael_2006_3.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dias et al. (2006): Market‑Based Multirobot Coordination</a></li>
              <li><a href="https://web.mit.edu/dimitrib/www/auction.txt" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Bertsekas (1988): The Auction Algorithm</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/159544.159617" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Wellman (1993): Market‑Oriented Programming</a></li>
              <li><a href="https://ilpubs.stanford.edu:8090/562/1/2002-56.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">EigenTrust (2004): Reputation Management in P2P Networks</a></li>
              <li><a href="https://ieeexplore.ieee.org/document/4308385" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Smith (1980): The Contract Net Protocol</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://martinfowler.com/articles/201701-event-driven.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Martin Fowler: Event‑Driven Architecture</a></li>
              <li><a href="https://kafka.apache.org/documentation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka Documentation</a></li>
              <li><a href="https://docs.nats.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NATS & JetStream Docs</a></li>
              <li><a href="https://www.confluent.io/learn/event-driven-architecture/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Confluent: Event‑Driven Architecture Patterns</a></li>
              <li><a href="https://temporal.io/blog/saga-pattern" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal: Saga Pattern and Compensation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kafka.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka / Kafka Streams</a></li>
              <li><a href="https://redpanda.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Redpanda</a></li>
              <li><a href="https://nats.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NATS</a></li>
              <li><a href="https://www.rabbitmq.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ</a></li>
              <li><a href="https://temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph (agent workflows)</a></li>
              <li><a href="https://www.ray.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.aamas-conference.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AAMAS: International Conference on Autonomous Agents and Multiagent Systems</a></li>
              <li><a href="https://community.temporal.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Temporal Community</a></li>
              <li><a href="https://slack.kafka.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka Community Slack</a></li>
              <li><a href="https://discuss.nats.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NATS Discuss</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};