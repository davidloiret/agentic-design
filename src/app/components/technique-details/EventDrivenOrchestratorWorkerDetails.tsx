'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const EventDrivenOrchestratorWorkerDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Central orchestrator coordinates work by publishing events/commands to topics or queues. Stateless workers in a
            consumer group pull events, process tasks idempotently, and emit completion or result events. The orchestrator advances
            the workflow based on observed events, enabling decoupled, asynchronous scaling and recovery via replay and DLQs.
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
            <li>Receive trigger (API/webhook/schedule) and persist correlation/workflow state.</li>
            <li>Publish task events to a work topic/queue with keys for partition affinity and ordering where needed.</li>
            <li>Workers consume in a consumer group, perform task with retries and timeouts, and write idempotent side effects.</li>
            <li>On completion/failure, workers emit result/compensation events; errors can be routed to DLQ with metadata.</li>
            <li>Orchestrator listens for result events, updates state, branches next steps, and aggregates final outcome.</li>
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
            'Design idempotent handlers; use request/operation keys and deduplication to achieve exactly-once effects.',
            'Adopt the transactional outbox/inbox pattern for cross-system reliability and to avoid dual-write anomalies.',
            'Version event schemas; enforce compatibility via schema registry and contract tests.',
            'Use consumer groups and partitions/shards for horizontal scalability; avoid hot keys.',
            'Apply backpressure: prefetch/flow control, max in-flight per consumer, and adaptive concurrency.',
            'Implement DLQs with triage metadata; set bounded retries with exponential backoff and jitter.',
            'Correlate events with workflow/run IDs; emit structured logs/metrics/traces for end-to-end observability.',
            'Secure topics/queues with authZ/authN; redact PII and secrets in payloads and logs.',
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
            <li>Ultra-low latency, strictly synchronous request/response paths.</li>
            <li>Simple, short-lived flows where orchestration overhead adds needless complexity.</li>
            <li>Workloads requiring strict cross-service ACID transactions without compensation.</li>
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
            <li>Dual writes without atomicity → lost or duplicated work; missing outbox/inbox.</li>
            <li>Assuming exactly-once delivery; most brokers are at-least-once—achieve idempotent processing instead.</li>
            <li>Unbounded retries causing storms; no backoff, rate limits, or circuit breakers.</li>
            <li>Hot partitions/keys leading to skew and latency spikes.</li>
            <li>Opaque workflows with missing correlation IDs and trace propagation.</li>
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
            'Decoupled orchestration via topics/queues',
            'Consumer group-based load balancing',
            'Automatic scaling and rebalancing',
            'Event replay and DLQs for recovery',
            'Ordering by key/partition where required',
            'Stateless workers; durable workflow state in store',
            'Policy-driven retries and compensation',
            'End-to-end observability (metrics/logs/traces)'
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
            <li>Throughput (msgs/s, MB/s) per topic and per consumer group; consumer lag.</li>
            <li>Latency p50/p95 end-to-end and per stage; retry/failure rate; DLQ rate and time-to-recover.</li>
            <li>Workflow SLOs: time-to-completion, success rate, and cost per completed workflow.</li>
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
            <li>Bound message size (e.g., ~256 KB SNS/SQS, ~10 MB Google Pub/Sub, Kafka configurable); store blobs externally and pass references.</li>
            <li>Tune partitions, prefetch, and max in-flight to balance throughput vs. memory/CPU; compress payloads.</li>
            <li>If LLMs participate, cap tokens per step; summarize events; log per-step token and cost budgets.</li>
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
            <li>Document/media processing pipelines; batch and stream ETL.</li>
            <li>Microservices orchestration with compensations (order → payment → fulfillment).</li>
            <li>Real-time workflows with partitioned ordering needs and elastic scaling.</li>
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
              <li><a href="https://www.usenix.org/legacy/events/hotos01/full_papers/welsh/welsh.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SEDA: Staged Event-Driven Architecture (Welsh et al., 2001)</a></li>
              <li><a href="https://assets.confluent.io/m/6e78838ea02980f6/original/20240311-white-paper-kafka-design.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka: Distributed Messaging for Log Processing (LinkedIn/Confluent)</a></li>
              <li><a href="https://arxiv.org/abs/2006.08654" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Triggerflow: Trigger-based Orchestration of Serverless Workflows</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kafka.apache.org/documentation/#semantics_eos" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka: Exactly-Once Semantics</a></li>
              <li><a href="https://www.rabbitmq.com/dlx.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ: Dead Letter Exchanges</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS SQS: Dead-Letter Queues</a></li>
              <li><a href="https://cloud.google.com/pubsub/docs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Pub/Sub: Concepts and Limits</a></li>
              <li><a href="https://docs.nats.io/nats-concepts/jetstream" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NATS JetStream: Streams and Consumers</a></li>
              <li><a href="https://microservices.io/patterns/data/transactional-outbox.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microservices.io: Transactional Outbox Pattern</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Apache Kafka, RabbitMQ, Google Pub/Sub, AWS SNS/SQS, NATS JetStream, Redis Streams</li>
              <li>Orchestrators: Temporal, Camunda, AWS Step Functions</li>
              <li>Clients: librdkafka/Confluent, Sarama (Go), Spring Kafka/AMQP, aio-pika</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lists.apache.org/list.html?users@kafka.apache.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka Users Mailing List</a></li>
              <li>Conference talks and engineering blogs on event-driven architectures</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};