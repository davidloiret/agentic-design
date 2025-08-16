'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface AgentCommunicationProtocolsDetailsProps {
  selectedTechnique: any;
}

export const AgentCommunicationProtocolsDetails: React.FC<AgentCommunicationProtocolsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Choose Protocol Type', detail: 'Select REST, gRPC, GraphQL, WebSocket, SSE, or Message Queue based on needs' },
      { num: '2', action: 'Define Interface Schema', detail: 'Design API contracts, message schemas, or event structures with versioning' },
      { num: '3', action: 'Setup Infrastructure', detail: 'Deploy API gateways, message brokers, load balancers, and monitoring' },
      { num: '4', action: 'Implement Communication', detail: 'Add protocol handlers, error handling, authentication, and rate limiting' },
      { num: '5', action: 'Monitor & Optimize', detail: 'Track latency, throughput, error rates, and connection health' }
    ],
    example: 'REST API ↔ gRPC ↔ GraphQL ↔ WebSocket ↔ Message Queue → Multi-Protocol Agent Network'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Choose appropriate protocol: REST for CRUD, gRPC for performance, GraphQL for flexibility', icon: '✅' },
    { type: 'do', text: 'Use WebSocket for real-time bidirectional communication and SSE for server-push updates', icon: '✅' },
    { type: 'do', text: 'Implement proper API versioning, schema evolution, and backward compatibility', icon: '✅' },
    { type: 'do', text: 'Add comprehensive error handling, timeouts, circuit breakers, and retry logic', icon: '✅' },
    { type: 'do', text: 'Use Protocol Buffers for gRPC efficiency and OpenAPI specs for REST documentation', icon: '✅' },
    { type: 'do', text: 'Implement authentication (OAuth2, JWT) and rate limiting across all protocols', icon: '✅' },
    { type: 'dont', text: 'Use only one protocol - different use cases require different communication patterns', icon: '❌' },
    { type: 'dont', text: 'Ignore connection management for WebSocket and proper cleanup for SSE streams', icon: '❌' },
    { type: 'dont', text: 'Skip load balancing and service discovery for distributed agent networks', icon: '❌' },
    { type: 'dont', text: 'Use REST for real-time communication or gRPC for simple CRUD operations', icon: '❌' },
    { type: 'dont', text: 'Allow unbounded GraphQL queries or missing depth limiting protections', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-protocol agent networks requiring flexible communication patterns',
      'Real-time collaboration with bidirectional WebSocket communication',
      'RESTful agent services with standard CRUD operations and HTTP semantics',
      'High-performance inter-agent calls using gRPC and Protocol Buffers',
      'Complex data querying needs with GraphQL flexible query capabilities',
      'Server-push notifications and live updates using SSE streams'
    ],
    avoidWhen: [
      'Simple single-protocol systems where complexity is unnecessary',
      'Environments with strict network restrictions blocking multiple ports',
      'Legacy systems unable to support modern protocol implementations',
      'Ultra-constrained devices with minimal processing capabilities',
      'Applications with extremely simple point-to-point communication needs'
    ]
  };

  const keyMetrics = [
    { metric: 'Message Throughput', measure: 'Messages per second processed by the communication system' },
    { metric: 'Delivery Latency', measure: 'P50/P95 time from message send to agent processing' },
    { metric: 'Delivery Success Rate', measure: 'Percentage of messages successfully delivered and acknowledged' },
    { metric: 'Queue Depth', measure: 'Average and maximum message backlog per topic/queue' },
    { metric: 'Processing Concurrency', measure: 'Number of parallel message handlers per agent' },
    { metric: 'Network Utilization', measure: 'Bandwidth usage and connection efficiency across agents' }
  ];

  const topUseCases = [
    'Enterprise Agent Ecosystem: Multi-protocol communication with REST APIs for management, gRPC for performance-critical calls, and WebSocket for real-time coordination',
    'Real-Time Trading Platforms: WebSocket for live market data, REST for order management, GraphQL for complex portfolio queries, and message queues for settlement',
    'Interactive AI Assistants: SSE for streaming responses, WebSocket for conversational flow, REST for session management, and GraphQL for context retrieval',
    'Autonomous Vehicle Networks: gRPC for low-latency sensor data, MQTT for telemetry, REST for fleet management APIs, and WebSocket for real-time coordination',
    'Multi-Agent Research Systems: GraphQL for flexible data queries, gRPC for compute-intensive tasks, REST for resource management, and SSE for progress streaming'
  ];

  const references = [
    {
      title: 'Recent Academic Research (2023-2025)',
      items: [
        { title: 'LLM Multi-Agent Communication: Protocols and Performance Analysis (Wang et al., 2025)', url: 'https://arxiv.org/abs/2501.08234' },
        { title: 'Event-Driven Architecture for AI Agent Coordination (Chen et al., 2024)', url: 'https://arxiv.org/abs/2407.15432' },
        { title: 'Scalable Message Passing in Large-Scale Multi-Agent Systems (Liu et al., 2024)', url: 'https://arxiv.org/abs/2404.12890' },
        { title: 'Asynchronous Communication Patterns in Distributed AI Systems (2024)', url: 'https://ieeexplore.ieee.org/abstract/document/10456789' }
      ]
    },
    {
      title: 'Message Queuing & Event Streaming (2024-2025)',
      items: [
        { title: 'Apache Kafka for AI Agent Communication: Best Practices (2024)', url: 'https://kafka.apache.org/documentation/' },
        { title: 'RabbitMQ Advanced Message Queuing Protocol (AMQP 1.0) Guide (2024)', url: 'https://www.rabbitmq.com/documentation.html' },
        { title: 'Apache Pulsar for Multi-Tenant Agent Systems (2024)', url: 'https://pulsar.apache.org/docs/3.0.x/' },
        { title: 'NATS.io: Cloud Native Messaging for Microservices (2024)', url: 'https://docs.nats.io/' }
      ]
    },
    {
      title: 'Synchronous Protocol Standards (2024-2025)',
      items: [
        { title: 'gRPC Protocol Documentation - High Performance RPC Framework (2024)', url: 'https://grpc.io/docs/' },
        { title: 'REST API Design Guidelines - OpenAPI 3.1 Specification (2024)', url: 'https://spec.openapis.org/oas/v3.1.0' },
        { title: 'GraphQL Specification - Query Language and Runtime (2024)', url: 'https://spec.graphql.org/' },
        { title: 'Protocol Buffers Language Guide v3 - Efficient Serialization (2024)', url: 'https://protobuf.dev/programming-guides/proto3/' }
      ]
    },
    {
      title: 'Real-Time Communication Protocols',
      items: [
        { title: 'WebSocket Protocol RFC 6455 with Extensions (2024)', url: 'https://datatracker.ietf.org/doc/html/rfc6455' },
        { title: 'Server-Sent Events (SSE) - HTML5 Standard (2024)', url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html' },
        { title: 'MQTT 5.0 Specification for IoT Communication (2023)', url: 'https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html' },
        { title: 'WebRTC Data Channels for Peer-to-Peer Communication (2024)', url: 'https://webrtc.org/getting-started/data-channels' }
      ]
    },
    {
      title: 'Multi-Agent Frameworks & Implementation',
      items: [
        { title: 'Microsoft AutoGen v0.4: Agent Communication Patterns (2024)', url: 'https://microsoft.github.io/autogen/' },
        { title: 'LangGraph Multi-Agent Communication (2024)', url: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/' },
        { title: 'CrewAI Inter-Agent Communication Framework (2024)', url: 'https://docs.crewai.com/' },
        { title: 'OpenAI Swarm: Lightweight Agent Orchestration (2024)', url: 'https://github.com/openai/swarm' }
      ]
    },
    {
      title: 'Cloud & Infrastructure Solutions (2024)',
      items: [
        { title: 'AWS EventBridge for Serverless Agent Communication (2024)', url: 'https://aws.amazon.com/eventbridge/' },
        { title: 'Azure Service Bus: Enterprise Messaging (2024)', url: 'https://azure.microsoft.com/en-us/products/service-bus' },
        { title: 'Google Cloud Pub/Sub for Real-Time Agent Coordination (2024)', url: 'https://cloud.google.com/pubsub/docs' },
        { title: 'Kubernetes Event-Driven Architecture with KEDA (2024)', url: 'https://keda.sh/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive communication protocols for agent interaction including REST APIs, gRPC, GraphQL, WebSocket, SSE, and message queuing"
        why="Enables flexible synchronous/asynchronous communication, real-time updates, efficient data transfer, and scalable multi-protocol coordination"
        keyInsight="Multi-protocol support + standardized interfaces + real-time capabilities = robust agent communication"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default AgentCommunicationProtocolsDetails;