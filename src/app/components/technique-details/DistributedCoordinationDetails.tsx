'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const DistributedCoordinationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-gray-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            Coordinate multiple processes/agents across machines using a strongly consistent coordination
            service (e.g., etcd, Consul, ZooKeeper). Use leases/sessions with heartbeats, watches for
            change notifications, and primitives such as leader election, distributed locks with fencing
            tokens, barriers, and membership. Favor quorum-based linearizable writes and carefully chosen
            read semantics. Design for partial synchrony, process crashes, and network partitions.
          </p>
          <p className="text-gray-400 text-sm">Safety first: pair lease-based locks with <span className="font-medium">fencing tokens</span> to prevent split-brain and
            stale holders from acting after expiration.</p>
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
            <li><span className="font-medium">Choose a backend</span>: etcd/Consul/ZooKeeper; document consistency guarantees and failure model.</li>
            <li><span className="font-medium">Identity & sessions</span>: establish client IDs; create sessions/leases; send heartbeats at safe intervals.</li>
            <li><span className="font-medium">Leader election</span>: campaign, observe, and resign using lease-bound keys; attach a monotonic fencing token.</li>
            <li><span className="font-medium">Locks and critical sections</span>: acquire via lease; include fencing token in all downstream writes; keep sections short.</li>
            <li><span className="font-medium">Coordination patterns</span>: implement membership, barriers, sharding/partition assignment, and queues with watches.</li>
            <li><span className="font-medium">Failure handling</span>: detect expirations; backoff with jitter; rejoin cleanly; ensure idempotency and deduplication.</li>
            <li><span className="font-medium">Observability & testing</span>: metrics, tracing, and Jepsen-style chaos tests for partitions, clock skew, GC pauses.</li>
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
            'Use quorum/linearizable writes for elections and locks; prefer linearizable reads when correctness requires it.',
            'Always pair leases with fencing tokens; reject stale tokens at the resource to prevent split-brain.',
            'Set lease TTLs well above max GC pauses and network jitter; renew at <50% of TTL.',
            'Keep critical sections tiny; avoid network calls while holding a lock; use try-lock + retries with jitter.',
            'Prefer monotonic clocks for timeouts; avoid wall-clock assumptions; handle clock skew.',
            'Design idempotent operations and deduplication to tolerate retries and duplicate leadership.',
            'Use watches with backpressure and resumable progress (revision/index); handle watch compaction.',
            'Harden authN/authZ on the store (TLS, mTLS, ACLs); audit coordination actions; snapshot and back up state.',
            'Practice failure drills (partitions, node deaths); run Jepsen/chaos tests before production changes.'
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
          <p>Single-node or single-writer systems where a database provides required durability and availability.</p>
          <p>Low-stakes or ephemeral work where occasional duplication is acceptable and simpler heuristics suffice.</p>
          <p>Adversarial/Byzantine environments requiring BFT consensus; use BFT protocols instead of CFT coordination stores.</p>
          <p>Hard real-time paths intolerant of quorum round-trips; choose local algorithms with eventual reconciliation.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Relying on wall-clock time for safety; ignoring GC pauses and clock skew causing lease expirations.</p>
          <p>Using distributed locks without fencing tokens, leading to split-brain and lost updates.</p>
          <p>Holding locks during slow I/O; thundering-herd re-elections due to synchronized retries.</p>
          <p>Assuming strong reads when using stale/read-only replicas; mixing read modes incorrectly.</p>
          <p>Unbounded watch buffers and missing compaction handling causing memory blow-ups.</p>
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
            'Strongly consistent KV with quorum commits and optional linearizable reads',
            'Sessions/leases, keep-alives, and ephemeral keys',
            'Leader election, distributed locks, and barriers',
            'Watches/notifications with revisions and compaction semantics',
            'Fine-grained ACLs, TLS/mTLS, and audit trails',
            'Snapshot/restore for disaster recovery; health checks and alarms'
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
          <div>Failure detection time and failover time (p50/p95); election stability and churn rate.</div>
          <div>Lost-update or dual-writer incidents; fencing-token violation count.</div>
          <div>Watch lag and drop/compaction rates; client reconnect success and backlog size.</div>
          <div>Store latency/throughput; quorum unavailability minutes; read/write error rates.</div>
          <div>Lease expiration frequency; GC-pause-induced expirations; clock-skew alarms.</div>
          <div>Duplicate/omitted task execution rate in orchestrated workflows.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Coordination store load: election/lock QPS, lease keep-alives, and watch streams consume network and CPU.</p>
          <p>Tune heartbeat intervals, batch writes, and watch coalescing to reduce bandwidth; prefer small values and compaction-aware reads.</p>
          <p>Client memory/CPU for watch replay and deduplication; enable TLS offload where appropriate.</p>
          <p>For LLM multi-agent systems, minimize token chatter by coordinating via IDs and concise state, not full transcripts.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Cluster leader election and failover for controllers, schedulers, or orchestrators.</p>
          <p>Distributed job scheduling, partition/lease assignment, and worker sharding.</p>
          <p>Exclusive access to scarce external resources (rate limits, hardware, third-party APIs).</p>
          <p>Dynamic configuration, feature flags with strong consistency, service discovery metadata.</p>
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
              <li><a href="https://research.google/pubs/pub27897/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Chubby lock service for loosely-coupled distributed systems — Burrows (OSDI 2006)</a></li>
              <li><a href="https://www.usenix.org/legacy/event/atc10/tech/full_papers/Hunt.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ZooKeeper: Wait-free coordination for internet-scale systems — Hunt et al. (USENIX 2010)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/248052.248106" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Impossibility of Distributed Consensus with One Faulty Process (FLP) — Fischer, Lynch, Paterson (1985)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/564585.564601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">On Unreliable Failure Detectors — Chandra & Toueg (1996)</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/564585.564601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Brewer’s CAP, formalized by Gilbert & Lynch (2002)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://etcd.io/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">etcd Documentation (leases, elections, concurrency API)</a></li>
              <li><a href="https://developer.hashicorp.com/consul/docs/dynamic-app-config/sessions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Consul Sessions and Locks</a></li>
              <li><a href="https://zookeeper.apache.org/doc/current/recipes.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ZooKeeper Recipes and Curator Framework</a></li>
              <li><a href="https://kubernetes.io/docs/reference/coordination/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes Coordination API (Lease/Leader Election)</a></li>
              <li><a href="https://jepsen.io/analyses" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Jepsen Analyses: Guidance on testing coordination systems</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/etcd-io/etcd" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">etcd</a>, <a href="https://www.consul.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HashiCorp Consul</a>, <a href="https://zookeeper.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache ZooKeeper</a></li>
              <li><a href="https://curator.apache.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Curator</a> (high-level ZooKeeper patterns)</li>
              <li><a href="https://pkg.go.dev/k8s.io/client-go/tools/leaderelection" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes client-go Leader Election</a></li>
              <li><a href="https://github.com/zalando/patroni" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Patroni</a> (Postgres HA using etcd/Consul/ZK)</li>
              <li><a href="https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Distributed locking with fencing tokens (discussion)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://groups.google.com/g/etcd-dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">etcd-dev mailing list</a> and <a href="https://github.com/etcd-io/etcd/issues" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">etcd issues</a></li>
              <li><a href="https://discuss.hashicorp.com/c/consul/20" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HashiCorp Discuss: Consul</a></li>
              <li><a href="https://mail-archives.apache.org/mod_mbox/zookeeper-user/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">ZooKeeper user mailing list</a></li>
              <li><a href="https://jepsen.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Jepsen</a> (failure testing methodologies and reports)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};