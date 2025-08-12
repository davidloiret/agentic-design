'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ActorModelCoordinationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            The Actor Model coordinates independent actors that communicate exclusively via asynchronous
            message passing. Each actor encapsulates its own state and behavior, processes one message
            at a time, can create new actors, and can send messages to known addresses. Supervision
            hierarchies handle failures through isolation and restarts, and location transparency enables
            distributed placement without changing messaging semantics.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Define actor roles, responsibilities, and message protocols (types, headers, routing keys).</li>
            <li>Design supervision tree: parent actors supervise children with restart strategies and backoff.</li>
            <li>Choose dispatching and mailboxes (bounded where possible) and configure routing/sharding.</li>
            <li>Implement actor handlers as pure, non-blocking message processors; externalize I/O via async APIs.</li>
            <li>Persist critical actor state (event sourcing/snapshots) if durability or replay is required.</li>
            <li>Deploy with location transparency; scale via partitioning/sharding and consumer groups per shard.</li>
            <li>Observe with tracing/metrics; enforce SLAs with backpressure, circuit breakers, and timeouts.</li>
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
            'Keep actors small and single‑purpose; treat them like lightweight processes with clear protocols.',
            'Use bounded mailboxes and apply backpressure; avoid unbounded queues and hot partitions.',
            'Make handlers non‑blocking; offload I/O to async tasks; avoid shared mutable state between actors.',
            'Model failures explicitly with supervision strategies (restart, resume, stop, escalate).',
            'Use sharding/partitioning keys that balance load; avoid hotspots; enable rebalancing.',
            'Persist state with event sourcing/snapshots where durability matters; ensure idempotency on replay.',
            'Prefer location transparency; do not encode physical addresses in protocol designs.',
            'Instrument with per‑actor metrics (mailbox depth, processing latency, restarts) and distributed tracing.'
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
          <p>Workloads requiring strict shared‑memory transactions or global locks across many entities.</p>
          <p>Ultra low‑latency single‑threaded paths where mailbox scheduling and messaging overhead dominate.</p>
          <p>Simple CRUD services where synchronous RPC with a database is sufficient and easier to operate.</p>
          <p>Teams without experience in concurrent/distributed debugging and supervision can accrue complexity fast.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Unbounded actor creation and mailbox growth → memory pressure and GC pauses.</p>
          <p>Blocking calls inside actors → deadlocks, throughput collapse, and missed SLAs.</p>
          <p>Assuming in‑order delivery across the system; failing to handle retries and duplicates.</p>
          <p>Hot sharding keys causing skew; missing rebalancing; poor addressability design.</p>
          <p>Restart storms from improper supervision or non‑idempotent side effects on replay.</p>
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
            'Asynchronous message passing with mailboxes and backpressure controls',
            'State encapsulation and single‑threaded execution per actor',
            'Supervision hierarchies and fault isolation with restart policies',
            'Location transparency and dynamic actor creation',
            'Cluster sharding/partitioning for scale‑out',
            'Persistence via event sourcing and snapshots (optional)'
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">{feat}</div>
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
          <div>Mailbox depth distribution and time‑in‑queue; p50/p95/p99 processing latency per actor.</div>
          <div>Throughput (msgs/s) per shard; CPU/memory utilization per node.</div>
          <div>Restart rate, failure domains impacted, and successful recovery time.</div>
          <div>Message loss/duplicate rate (with/without persistence); dead letter queue incidence.</div>
          <div>Shard rebalancing time; hotspot detection; load skew metrics.</div>
          <div>Cost and efficiency: messages per dollar, tokens per task (for LLM‑backed actors).</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>LLM tokens scale with per‑message context and number of actor hops. Use compact schemas, summaries, and
            references to external state instead of full transcripts to control prompt size.</p>
          <p>Bound retries and apply early‑exit heuristics on high confidence; cache frequent tool/LLM results.</p>
          <p>System resources: cap mailboxes, limit parallelism per shard, and monitor persistence I/O for event‑sourced actors.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Real‑time coordination with fault isolation (e.g., chat/agent assistants per session, IoT/device control).</p>
          <p>Distributed stream processing and pipelines requiring stateful, independent workers.</p>
          <p>Online gaming, trading, or telemetry where entities map naturally to actors.</p>
          <p>Large multi‑agent systems where supervision trees and actor sharding provide resilience and scale.</p>
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
              <li><a href="https://dl.acm.org/doi/10.5555/7929.7925" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Agha (1986): Actors: A Model of Concurrent Computation</a></li>
              <li><a href="https://dl.acm.org/doi/10.1145/360248.360251" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hewitt, Bishop, Steiger (1973): A Universal Modular ACTOR Formalism for AI</a></li>
              <li><a href="https://www.microsoft.com/en-us/research/publication/orleans-distributed-virtual-actors-for-programmability-and-scalability/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans: Distributed Virtual Actors (Microsoft Research)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.erlang.org/doc/system/architecture.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Erlang/OTP: System Architecture & Supervision Trees</a></li>
              <li><a href="https://doc.akka.io/docs/akka/current/typed/index.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka Typed Documentation</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/reference-architectures/actors/virtual-actor" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture: Virtual Actor (Orleans)</a></li>
              <li><a href="https://docs.dapr.io/developing-applications/building-blocks/actors/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dapr Actors</a></li>
              <li><a href="https://docs.ray.io/en/latest/ray-core/actors.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Actors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Erlang/OTP, Elixir GenServer/OTP, Akka Typed, Akka.NET, Microsoft Orleans, Dapr Actors</li>
              <li>Ray Actors, Cloudflare Durable Objects (actor‑like), CAF (C++ Actor Framework), Proto.Actor, Actix</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://erlangforums.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Erlang Forums</a></li>
              <li><a href="https://discuss.lightbend.com/c/akka/41" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka Discussions</a></li>
              <li><a href="https://discord.gg/dapr" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dapr Discord</a> · <a href="https://discuss.ray.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Discuss</a></li>
              <li><a href="https://github.com/dotnet/orleans/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans Discussions</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};