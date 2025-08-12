'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const PubSubPatternsDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            Publish-Subscribe decouples producers (publishers) from consumers (subscribers) via a broker that routes
            events to topics/subjects and fans-out to subscriptions. Delivery semantics are platform-dependent
            (typically at-least-once; sometimes exactly-once). Ordering is scoped by keys/FIFO groups. Delivery models
            include pull and push with acknowledgments, redelivery, and optional dead-letter queues.
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
            <li>Design topics/subjects and access policies; create subscriptions (pull or push) and optional filters.</li>
            <li>Publishers serialize and publish events with attributes and optional ordering/deduplication keys.</li>
            <li>Broker persists/replicates (as configured), applies filters, and fans out to matching subscriptions.</li>
            <li>Subscribers receive via pull (with prefetch/flow control) or push (with ack deadlines); ack or nack to trigger retry.</li>
            <li>Failed deliveries follow retry policy; poison messages are routed to DLQs for offline handling.</li>
            <li>Operators monitor backlog, redelivery/DLQ, throughput, and latency; scale partitions/consumers accordingly.</li>
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
            'Make consumers idempotent; use message IDs or deduplication keys to avoid duplicate side-effects.',
            'Use ordering keys/FIFO topics only when required; otherwise design for out-of-order delivery.',
            'Bound message size (e.g., ~256 KB SNS/SQS, ~10 MB Google Pub/Sub, Kafka configurable); store blobs externally and pass references.',
            'Validate event schemas (Avro/Protobuf/JSON Schema) and use a schema registry with compatibility modes.',
            'Tune flow control: batching/prefetch, max in-flight, backpressure; apply exponential backoff with jitter.',
            'Configure DLQs and retry policies; surface error reasons for triage; cap redelivery attempts.',
            'Harden security: TLS, encryption at rest, IAM/RBAC scoped per topic/subscription; isolate tenants and rate-limit.',
            'Choose the right semantics: at-least-once is typical; enable transactions/exactly-once where supported.',
            'Plan partition/subject keys to spread load and avoid hot keys; monitor skew and rebalance.',
            'Set retention and replay policies intentionally (audit/regulatory needs vs cost and storage).'
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
          <p>Hard real-time request/response paths requiring synchronous, low-latency interactions → use RPC (gRPC/HTTP).</p>
          <p>Strict global ordering across very high-throughput streams where partitioning would violate requirements.</p>
          <p>Simple, tightly coupled integrations where a broker adds operational overhead without clear benefit.</p>
          <p>Distributed ACID transactions spanning multiple services; prefer Outbox/Transaction log patterns.</p>
          <p>Real-time media (voice/video) where Pub/Sub buffering breaks interactivity; use RTC transports.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Assuming exactly-once by default; most systems are at-least-once → duplicates happen without idempotency.</p>
          <p>No DLQ or redrive strategy → poison messages trigger infinite retries and backlog growth.</p>
          <p>Overlooking subscription filters → unnecessary fanout inflates egress and subscriber load.</p>
          <p>Relying on cross-partition ordering; not using ordering/FIFO keys where needed.</p>
          <p>Embedding large payloads in events; causing high latency, memory pressure, and broker strain.</p>
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
            'Topic/subject-based routing with fanout to multiple subscriptions.',
            'Subscription filtering (attributes/content) to reduce unnecessary delivery.',
            'Delivery semantics: at-least-once; platform-specific exactly-once options.',
            'Ordering controls: ordering keys / FIFO groups; per-key sequencing.',
            'Durable retention and replay (platform-dependent); ack/redelivery policies.',
            'Push and pull delivery modes; flow control and prefetch.',
            'Consumer groups/subscriptions for horizontal scale and fault isolation.',
            'Dead-letter queues and retry policies with backoff.'
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
          <div>End-to-end latency (publish → subscriber ack) p50/p95/p99.</div>
          <div>Throughput (msgs/s, MB/s) per topic and per subscription/consumer group.</div>
          <div>Backlog/lag: unacked count, oldest message age per subscription.</div>
          <div>Redelivery and DLQ rates; processing success/failure rates.</div>
          <div>Duplicate and ordering-violation rates (per key).</div>
          <div>Cost KPIs: egress, request operations, storage/retention charges.</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>CPU for serialization/compression and broker coordination; memory for buffers; disk I/O for durable logs/streams; network for replication and client traffic.</p>
          <p>Optimize with batching and compression; bound payload size (e.g., SNS/SQS ≈256 KB, Google Pub/Sub ≈10 MB, Kafka configurable); store large blobs externally.</p>
          <p>Apply quotas and rate limits per tenant/topic; monitor egress and retention costs; tune prefetch/parallelism to match downstream capacity.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Event broadcasting and notifications; multi-tenant fanout; real-time product updates and dashboards.</p>
          <p>Microservices eventing (domain events, CQRS/event sourcing) and decoupled multi-agent coordination.</p>
          <p>IoT telemetry ingestion with selective delivery to analytics, alerting, and storage pipelines.</p>
          <p>Cross-region/event bus replication and replay for audit and recovery.</p>
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
              <li><a href="https://arxiv.org/abs/1709.00333" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka versus RabbitMQ (2017)</a></li>
              <li><a href="https://www.confluent.io/blog/what-is-a-log-what-every-software-engineer-should-know/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Log: What every software engineer should know (Kreps)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kafka.apache.org/documentation/#semantics_eos" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka: Exactly-Once Semantics</a></li>
              <li><a href="https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges-topic" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ: Topic Exchanges</a>, <a href="https://www.rabbitmq.com/dlx.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Dead Letter Exchanges</a></li>
              <li><a href="https://cloud.google.com/pubsub/docs/ordering" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Pub/Sub: Ordering Keys</a>, <a href="https://cloud.google.com/pubsub/docs/exactly-once-delivery" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Exactly-Once Delivery</a></li>
              <li><a href="https://docs.aws.amazon.com/sns/latest/dg/fifo.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS SNS FIFO & Ordering</a></li>
              <li><a href="https://learn.microsoft.com/azure/architecture/patterns/publisher-subscriber" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Azure Architecture Center: Publisher-Subscriber</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Apache Kafka, RabbitMQ, Google Pub/Sub, AWS SNS/SQS, NATS JetStream, Redis Streams</li>
              <li>Client SDKs: confluent-kafka/librdkafka, Sarama (Go), Spring Cloud Stream, aio-pika, AWS SDKs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lists.apache.org/list.html?users@kafka.apache.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka Users Mailing List</a></li>
              <li><a href="https://groups.google.com/g/rabbitmq-users" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ Users</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/publish-subscribe" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">StackOverflow: publish-subscribe</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};