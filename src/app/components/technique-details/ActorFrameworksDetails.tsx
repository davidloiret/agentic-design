'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ActorFrameworksDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Actor frameworks implement the actor model: independent, state-encapsulated actors that process one
            message at a time, communicate via asynchronous message passing, can create other actors, and are
            supervised for fault isolation and recovery. Location transparency and routing/sharding enable
            horizontal scaling across processes and nodes. In agentic systems, an LLM-powered agent can be modeled
            as an actor with a mailbox, tools, and persistence, benefiting from supervision trees, backpressure,
            and robust failure handling.
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
            <li>Define actor roles and protocols: message types, schemas, and expected behaviors.</li>
            <li>Design supervision and lifecycle: restart strategies, escalation paths, and actor persistence.</li>
            <li>Plan routing and sharding: consistent hashing/routers; mailbox policies and backpressure.</li>
            <li>Implement actors: pure message handlers; avoid blocking; externalize I/O with timeouts.</li>
            <li>Deploy runtime: cluster discovery, placement, and location transparency across nodes.</li>
            <li>Instrument: tracing, structured logs, mailbox metrics, dead letters, and restarts.</li>
            <li>Scale safely: tune concurrency, shard rebalancing, and flow control; add load-shedding.</li>
            <li>Evolve: version message schemas and behaviors; run rolling upgrades with compatibility.</li>
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
            'Use immutable messages and explicit schemas; validate at boundaries.',
            'Keep handlers small and idempotent; separate compute from I/O; avoid blocking calls.',
            'Apply supervision strategies (restart, backoff, circuit break) per failure mode.',
            'Bound mailboxes; enable backpressure; define dead-letter handling and retries with jitter.',
            'Adopt location transparency; use routers/sharding for scale and even load.',
            'Persist critical state via event sourcing or durable state; prefer at-least-once semantics with idempotency.',
            'Version messages and behaviors; maintain backward compatibility during rolling upgrades.',
            'Test with property/chaos tests: partitions, crashes, slow actors, and message reordering.',
            'Least-privilege for tool/IO access; audit actor actions; redact and minimize payloads.',
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
            <li>Simple, single-threaded tasks where actor overhead adds complexity without benefit.</li>
            <li>Ultra low-latency, hard real-time paths where async messaging violates deadlines.</li>
            <li>Tight shared-memory algorithms requiring fine-grained in-process coordination.</li>
            <li>Strong cross-entity transactional invariants without a coordinator/transaction layer.</li>
            <li>Teams without experience operating async, distributed systems and tracing.</li>
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
            <li>Unbounded mailboxes and fan-out causing memory bloat and tail latencies.</li>
            <li>Blocking calls inside handlers; head-of-line blocking; missing timeouts/cancellations.</li>
            <li>Assuming global ordering or exactly-once delivery without idempotent handlers.</li>
            <li>Too many fine-grained actors; excessive message chatter and serialization overhead.</li>
            <li>Missing schema/versioning strategy → runtime incompatibilities during deploys.</li>
            <li>Leaky supervision: restarts without cause analysis; restart storms after failures.</li>
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
            'Actor isolation and single-threaded message processing',
            'Asynchronous message passing with mailboxes and dead letters',
            'Supervision hierarchies and restart strategies',
            'Location transparency, routing, and cluster sharding',
            'Routers (round-robin, consistent-hash) and load balancing',
            'Persistence patterns: event sourcing, durable timers, reminders',
            'Backpressure, bounded mailboxes, and flow control',
            'Observability: tracing, metrics, mailbox and restart telemetry',
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
            <li>Throughput (messages/sec) and service latency p50/p95/p99 per actor and per route.</li>
            <li>Mailbox depth, enqueue/dequeue rates, dead letters, and drop rates.</li>
            <li>Restart rate, mean time to recovery (MTTR), and failure taxonomy.</li>
            <li>Shard/placement balance, rebalancing churn, and hotspot detection.</li>
            <li>Resource utilization (CPU, memory, network) per node and per shard.</li>
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
            <li>For LLM-as-actor patterns: bound message sizes; summarize context; cache and reuse artifacts.</li>
            <li>Use small models for routing/guards; reserve large models for heavy reasoning steps.</li>
            <li>Tune concurrency and batch tool calls; set timeouts and circuit breakers per integration.</li>
            <li>Bound mailbox memory; backpressure producers; compress payloads where safe.</li>
            <li>Persist checkpoints to avoid recompute; employ TTL policies for state and logs.</li>
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
            <li>Stateful conversational agents and assistants with supervision and retries.</li>
            <li>IoT/device fleets and telemetry processing with partitioned, local state.</li>
            <li>Real-time pipelines: trading, risk checks, game servers, chat, and collaboration.</li>
            <li>Workflow/back-end services needing isolation, elasticity, and graceful recovery.</li>
            <li>Distributed LLM multi-agent systems requiring routing, sharding, and resilience.</li>
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
              <li><a href="https://en.wikipedia.org/wiki/Actor_model" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Actor model (overview)</a></li>
              <li><a href="https://arxiv.org/abs/1505.07368" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Revisiting Actor Programming in C++ — Charousset et al. (2015)</a></li>
              <li><a href="https://www.microsoft.com/en-us/research/publication/orleans-distributed-virtual-actors-for-scalability-and-simplicity/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans: Distributed Virtual Actors (2014)</a></li>
              <li><a href="https://www.usenix.org/system/files/conference/osdi16/osdi16-adya.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">C# Actors at Scale: Orleans Experience (OSDI’16)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://doc.akka.io/docs/akka/current/typed/guide/actors-intro.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka Typed Actors (docs)</a></li>
              <li><a href="https://www.erlang.org/doc/design_principles/des_princ.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Erlang/OTP Design Principles</a></li>
              <li><a href="https://dotnet.github.io/orleans/docs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans Documentation</a></li>
              <li><a href="https://docs.ray.io/en/latest/ray-core/actors.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Actors</a></li>
              <li><a href="https://docs.dapr.io/developing-applications/building-blocks/actors/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dapr Actors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://akka.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka (Scala/Java)</a></li>
              <li><a href="https://www.erlang.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Erlang/OTP</a> and <a href="https://elixir-lang.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Elixir/OTP</a></li>
              <li><a href="https://dotnet.github.io/orleans/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans (.NET)</a></li>
              <li><a href="https://actor-framework.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAF (C++ Actor Framework)</a></li>
              <li><a href="https://www.ray.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray</a></li>
              <li><a href="https://actix.rs/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Actix (Rust)</a></li>
              <li><a href="https://developers.cloudflare.com/durable-objects/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cloudflare Durable Objects (actor-like)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://discuss.akka.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Akka Discuss</a></li>
              <li><a href="https://erlangforums.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Erlang Forums</a></li>
              <li><a href="https://github.com/dotnet/orleans/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Orleans Discussions</a></li>
              <li><a href="https://discuss.ray.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Community Forum</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};