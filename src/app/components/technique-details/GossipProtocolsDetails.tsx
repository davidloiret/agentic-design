'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const GossipProtocolsDetails = () => {
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
            Decentralized, epidemic-style dissemination where nodes periodically exchange compact digests and updates with
            a small, randomly sampled set of peers. Redundant, randomized fan-out plus anti-entropy yields rapid,
            probabilistic spread, eventual consistency, and robustness under churn and failures.
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
            <li>Peer sampling: maintain a partial, randomized view (e.g., SWIM/HyParView) of healthy peers.</li>
            <li>Round tick: at interval T, select k peers (fan-out) uniformly at random (with jitter/backoff).</li>
            <li>Exchange: push, pull, or push-pull digests (ids, versions, vector clocks) and request missing deltas.</li>
            <li>Apply updates: reconcile by version/vector clocks; ignore duplicates; honor tombstones/TTLs.</li>
            <li>Piggyback: attach membership/failure-detector metadata to gossip messages.</li>
            <li>Failure detection (SWIM-style): ping; on timeout, indirect ping via r relays; mark suspect → confirm.</li>
            <li>Convergence: continue until coverage and freshness targets are met; decay or TTL old rumors.</li>
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
            'Adopt proven membership + failure detection (SWIM, Lifeguard) with indirect pings and local health scoring.',
            'Maintain partial views (HyParView) and periodically shuffle peers to avoid selection bias and silos.',
            'Prefer push-pull anti-entropy with compact digests; deduplicate by message id/version/timestamp.',
            'Tune interval (T), fan-out (k), and payload caps by load tests; add jitter and backoff under congestion.',
            'Piggyback small membership deltas on app gossip; compress payloads and cap per-tick bytes.',
            'Secure channels (mTLS/keys); authenticate/sign membership; rate-limit and score peers to mitigate abuse.',
            'Instrument convergence time, coverage %, suspicion false± rates, bandwidth/node, and drop/error rates.',
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
            <li>Strong, immediate consistency or strict global ordering is required.</li>
            <li>Hard real-time latency budgets incompatible with probabilistic propagation.</li>
            <li>Highly adversarial networks without authentication, peer scoring, and rate controls.</li>
            <li>Very small clusters where deterministic RPC/broadcast is simpler and cheaper.</li>
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
            <li>Peer-selection bias → slow convergence or partitions; missing periodic shuffles.</li>
            <li>Unbounded rumor lifetimes → duplicate traffic; lack of TTLs/tombstones/versioning.</li>
            <li>Over-aggressive suspicion thresholds → false positives and flapping under load.</li>
            <li>Insufficient authentication/ACLs → poisoning and Sybil-style amplification.</li>
            <li>Fan-out/interval mis-tuned → either excessive bandwidth or slow coverage.</li>
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
            'Randomized peer sampling and partial views',
            'Push/pull anti-entropy with compact digests',
            'SWIM-style failure detection with piggybacking',
            'Eventual consistency with probabilistic guarantees',
            'Resilience to churn, partitions, and message loss',
            'Scalable fan-out with bounded per-node load',
            'Configurable mesh overlays (e.g., GossipSub)',
            'Security: auth, encryption, peer scoring',
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
            <li>Convergence time (rounds/seconds) to reach X% coverage.</li>
            <li>Bandwidth per node (p50/p95) and total message overhead.</li>
            <li>Failure-detector accuracy: false positive/negative rates; MTTR.</li>
            <li>Coverage under churn/partition; time-to-heal after merges.</li>
            <li>CPU/memory overhead and backpressure drops under load.</li>
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
            <li>Network: O(k) messages per node per tick; payload = digest + optional deltas + piggyback.</li>
            <li>CPU: digest build/merge, version checks, (optional) crypto verify/sign.</li>
            <li>Memory: partial views, message-id caches, tombstones, mesh state.</li>
            <li>Heuristics: cap fan-out, compress payloads, jitter ticks, and batch deltas.</li>
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
            <li>Cluster membership and failure detection (service discovery, schedulers).</li>
            <li>Configuration/feature-flag propagation; cache invalidation at scale.</li>
            <li>Pub/sub overlays (e.g., libp2p GossipSub) for decentralized messaging.</li>
            <li>Distributed databases for replica state exchange (e.g., Dynamo-style systems).</li>
            <li>Aggregation in sensor/edge networks (push-sum, averaging).</li>
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
              <li><a href="https://dl.acm.org/doi/10.1145/41840.41841" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Demers et al. Epidemic Algorithms for Replicated Database Maintenance (1987)</a></li>
              <li><a href="https://www.cs.cornell.edu/~asdas/research/dsn02-swim.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Das et al. SWIM: Scalable Weakly-consistent Infection-style Membership (2002)</a></li>
              <li><a href="https://arxiv.org/abs/1707.00788" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Lifeguard: Local Health and Suspicion for SWIM (2018)</a></li>
              <li><a href="https://asc.di.fct.unl.pt/~jleitao/pdf/hyparview-dsn07.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HyParView: Membership for Reliable Gossip-based Broadcast (2007)</a></li>
              <li><a href="https://ieeexplore.ieee.org/document/4273023" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Epidemic Broadcast Trees / Plumtree (2007)</a></li>
              <li><a href="https://arxiv.org/abs/2007.02739" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">GossipSub: Robust PubSub at Scale (v1.1)</a></li>
              <li><a href="https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">DeCandia et al. Dynamo: Amazon’s Highly Available Key-value Store (2007)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://cassandra.apache.org/doc/latest/architecture/gossip.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Cassandra: Gossip Architecture</a></li>
              <li><a href="https://developer.hashicorp.com/consul/docs/architecture/gossip" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HashiCorp Consul: Gossip & Failure Detection</a></li>
              <li><a href="https://www.serf.io/docs/internals/gossip.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Serf Internals: Gossip</a></li>
              <li><a href="https://doc.akka.io/docs/akka/current/typed/cluster.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka Cluster: Membership and Failure Detector</a></li>
              <li><a href="https://github.com/libp2p/specs/tree/master/pubsub/gossipsub" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">libp2p Gossipsub Specification</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/hashicorp/memberlist" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HashiCorp memberlist (Go)</a></li>
              <li><a href="https://www.serf.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Serf (cluster membership daemon)</a></li>
              <li><a href="https://peersim.sourceforge.net/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">PeerSim (gossip simulations)</a></li>
              <li><a href="https://ssbc.github.io/scuttlebutt-protocol-guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Secure Scuttlebutt protocol guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://dl.acm.org/doi/10.1145/1317379.1317382" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Birman: The Promise and Limitations of Gossip Protocols (OSR 2007)</a></li>
              <li><a href="https://research.libp2p.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">libp2p research notes on pub/sub and scoring</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};