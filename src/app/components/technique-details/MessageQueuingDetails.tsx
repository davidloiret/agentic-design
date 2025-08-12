'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const MessageQueuingDetails = () => {
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
            Message Queuing enables asynchronous, decoupled communication between producers and consumers via durable queues.
            Brokers provide delivery guarantees (at-least-once, at-most-once, sometimes exactly-once), ordering options
            (per-partition/group), acknowledgments, retries, and dead-lettering. Common implementations include Apache Kafka
            (log-based partitions, consumer groups), RabbitMQ/AMQP (queues, exchanges, bindings), cloud queues like AWS SQS
            and Google Pub/Sub, NATS JetStream, and Redis Streams.
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
            <li>Producer publishes message (optionally keyed for ordering/partitioning).</li>
            <li>Broker persists/enqueues and replicates (as configured), exposing consumer lag/offsets or queue depth.</li>
            <li>Consumer pulls/receives with prefetch/flow control; processes with a timeout/budget.</li>
            <li>Acknowledge success; on failure, retry with backoff or route to a Dead-Letter Queue (DLQ).</li>
            <li>Operators monitor metrics and adjust partitions/consumers/quotas for throughput and SLOs.</li>
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
            'Design idempotent consumers and use idempotency keys to handle duplicates safely.',
            'Bound processing with timeouts; implement exponential backoff + jitter; cap retries and use DLQs.',
            'Choose delivery semantics explicitly; document ordering guarantees per topic/queue.',
            'Use consumer groups and partitions/shards for horizontal scalability; avoid hot keys.',
            'Apply backpressure: tune prefetch/flow control; batch where appropriate; limit inflight.',
            'Validate message schemas (e.g., Avro/Protobuf/JSON Schema); use schema registry and compatibility rules.',
            'Isolate side effects; use the Outbox pattern for DB→queue atomicity; ensure exactly-once where supported.',
            'Encrypt in transit and at rest; enforce authZ (RBAC, IAM) and per-tenant quotas.',
            'Keep messages small; store large blobs externally and pass references; compress carefully.',
            'Observe: emit lag, queue depth, redrive counts, failure causes; add tracing with message IDs.'
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
          <p>Ultra low-latency, synchronous request/response paths where queueing overhead breaks SLOs → prefer direct RPC (gRPC/REST).</p>
          <p>Strict global ordering across high-throughput streams when the broker cannot guarantee it without severe throughput loss.</p>
          <p>Simple, tightly coupled integrations where a queue adds operational complexity without clear benefit.</p>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Relying on implicit ordering across partitions/queues; not keying messages consistently.</p>
          <p>Non-idempotent side effects with retries → duplicates and data corruption.</p>
          <p>Unbounded queue growth and consumer lag due to missing backpressure or insufficient scaling.</p>
          <p>Retry storms and thundering herds; missing circuit breakers and jittered backoff.</p>
          <p>Large payloads in the broker; lack of schema evolution strategy leading to consumer breakage.</p>
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
            'Delivery semantics: at-least-once / at-most-once / exactly-once (platform-dependent).',
            'Ordering controls: partition keys, FIFO groups, ordering keys.',
            'Durability and replication; acknowledgment and redelivery policies.',
            'DLQs, TTLs, and scheduled/ delayed delivery.',
            'Consumer groups, prefetch/flow control, and backpressure.',
            'Schema registry and compatibility modes; message versioning.'
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
          <div>End-to-end latency p50/p95/p99; publish and consume latency.</div>
          <div>Throughput (msgs/s, MB/s) per topic/queue and per consumer group.</div>
          <div>Consumer lag/queue depth; oldest message age; redrive/DLQ rate.</div>
          <div>Retry/duplicate rates; processing success/failure rates; MTTR.</div>
          <div>Broker health: ISR/replication, partition leader balance, storage utilization.</div>
          <div>Cost KPIs: egress, storage, request charges (for managed services).</div>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Resource profile: CPU for serialization/compression and broker coordination; memory for buffers; disk I/O for durable logs; network for replication and client traffic.</p>
          <p>Optimize with batching and compression; right-size partitions/consumer concurrency; bound message size (e.g., SQS 256 KB, Pub/Sub 10 MB, Kafka configurable).</p>
          <p>Avoid embedding large blobs; store externally and send references; apply per-tenant quotas and rate limits.</p>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 text-sm text-gray-300 space-y-2">
          <p>Decoupling microservices; asynchronous workflows; background job processing.</p>
          <p>Event-driven architectures and fan-out processing; audit/event logs.</p>
          <p>Load leveling and burst smoothing; backpressure control in downstreams.</p>
          <p>Cross-region buffering and intermittent-connectivity resilience.</p>
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
              <li><a href="https://pages.cs.wisc.edu/~remzi/Classes/739/Fall2001/Papers/seda.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SEDA: An Architecture for Well-Conditioned, Scalable Internet Services (2001)</a></li>
              <li><a href="https://assets.confluent.io/m/6e78838ea02980f6/original/20240311-white-paper-kafka-design.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka: a Distributed Messaging System for Log Processing (LinkedIn/Confluent)</a></li>
              <li><a href="https://arxiv.org/abs/1709.00333" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka versus RabbitMQ (2017)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://kafka.apache.org/documentation/#semantics_eos" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Apache Kafka: Exactly-Once Semantics</a></li>
              <li><a href="https://www.rabbitmq.com/dlx.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ: Dead Letter Exchanges</a>, <a href="https://www.rabbitmq.com/consumers.html#channel-qos-prefetch" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Prefetch/flow control</a></li>
              <li><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AWS SQS Developer Guide</a> (FIFO/Standard, visibility timeout, DLQs)</li>
              <li><a href="https://cloud.google.com/pubsub/docs/ordering" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Google Pub/Sub: Ordering Keys</a>, <a href="https://cloud.google.com/pubsub/docs/exactly-once-delivery" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Exactly-Once Delivery</a></li>
              <li><a href="https://docs.nats.io/nats-concepts/jetstream" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NATS JetStream Concepts</a></li>
              <li><a href="https://redis.io/docs/latest/develop/data-types/streams/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Redis Streams & Consumer Groups</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Apache Kafka, RabbitMQ, AWS SQS, Google Pub/Sub, NATS JetStream, Redis Streams</li>
              <li>Client SDKs: librdkafka/Confluent clients, Sarama (Go), Spring Kafka/AMQP, aio-pika, AWS SDKs</li>
              <li>Job queues: Celery, Sidekiq, Resque, BullMQ, RQ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lists.apache.org/list.html?users@kafka.apache.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kafka Users Mailing List</a></li>
              <li><a href="https://groups.google.com/g/rabbitmq-users" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">RabbitMQ Users Google Group</a></li>
              <li><a href="https://stackoverflow.com/questions/tagged/message-queue" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">StackOverflow: message-queue</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};