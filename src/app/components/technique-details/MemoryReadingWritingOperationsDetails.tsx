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

interface MemoryReadingWritingOperationsDetailsProps {
  selectedTechnique: any;
}

export const MemoryReadingWritingOperationsDetails: React.FC<MemoryReadingWritingOperationsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Score Memories', detail: 'Calculate recency, relevance, importance weights' },
      { num: '2', action: 'Optimize Retrieval', detail: 'Use composite scoring for memory selection' },
      { num: '3', action: 'Coordinate Access', detail: 'Multi-agent read/write synchronization' },
      { num: '4', action: 'Cache Frequently', detail: 'Cache high-scoring memories for performance' },
      { num: '5', action: 'Update Dynamically', detail: 'Real-time scoring updates based on usage' }
    ],
    example: 'memory_scoring → retrieval_optimization → access_coordination → caching_strategy → dynamic_updates'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use composite scoring: (Recency × 0.3) + (Relevance × 0.5) + (Importance × 0.2)', icon: '✅' },
    { type: 'do', text: 'Implement read-write locks for multi-agent memory consistency', icon: '✅' },
    { type: 'do', text: 'Cache frequently accessed memories with TTL expiration', icon: '✅' },
    { type: 'do', text: 'Use approximate nearest neighbor search for large memory stores', icon: '✅' },
    { type: 'do', text: 'Implement memory access patterns analytics for optimization', icon: '✅' },
    { type: 'dont', text: 'Use fixed scoring weights - adapt to agent/domain needs', icon: '❌' },
    { type: 'dont', text: 'Ignore memory access conflicts in multi-agent environments', icon: '❌' },
    { type: 'dont', text: 'Cache without considering memory staleness and updates', icon: '❌' },
    { type: 'dont', text: 'Use linear search for large-scale memory retrieval', icon: '❌' },
    { type: 'dont', text: 'Forget to implement memory garbage collection strategies', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Large-scale memory systems (1M+ entries)',
      'Multi-agent concurrent memory access',
      'Performance-critical retrieval scenarios',
      'Complex memory ranking requirements',
      'Real-time memory optimization needed'
    ],
    avoidWhen: [
      'Small memory stores (< 1000 entries)',
      'Single-agent simple retrieval',
      'Static memory without updates',
      'Memory privacy isolation required',
      'Ultra-low latency requirements (< 1ms)'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Retrieval Precision', measure: '% relevant memories returned' },
    { metric: 'Access Latency', measure: 'P50/P95/P99 memory read times' },
    { metric: 'Cache Hit Rate', measure: '% requests served from cache' },
    { metric: 'Concurrency Efficiency', measure: 'Multi-agent access throughput' },
    { metric: 'Memory Freshness', measure: 'Average age of retrieved memories' },
    { metric: 'Storage Efficiency', measure: 'Useful memories / total storage' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Customer Service Systems: 10M+ interaction history with 50ms retrieval (recency + customer relevance scoring)',
    'Recommendation Engines: User behavior patterns with real-time preference weighting (collaborative filtering optimization)',
    'Conversational AI: Context-aware dialogue history with semantic similarity ranking (coherent long conversations)',
    'Knowledge Management: Corporate knowledge base with expertise-weighted retrieval (subject matter expert routing)',
    'Multi-Agent Gaming: Shared world state with spatial-temporal memory access (coordinated decision making)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Efficient Memory Systems for Large-Scale AI Applications (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.15672' },
        { title: 'Multi-Agent Memory Access Patterns and Optimization (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2405.08934' },
        { title: 'Composite Memory Scoring for Intelligent Retrieval (Chen & Liu, 2023)', url: 'https://arxiv.org/abs/2309.12876' },
        { title: 'Concurrent Memory Operations in Distributed AI Systems (Park et al., 2024)', url: 'https://arxiv.org/abs/2401.09453' }
      ]
    },
    {
      title: 'Memory Systems Theory',
      items: [
        { title: 'Memory Hierarchies in Computer Architecture (Hennessy & Patterson, 2019)', url: 'https://www.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1' },
        { title: 'Information Retrieval: Implementing and Evaluating Search Engines (Büttcher et al., 2016)', url: 'https://mitpress.mit.edu/9780262026512/information-retrieval/' },
        { title: 'Database System Concepts: Concurrency Control (Silberschatz et al., 2020)', url: 'https://www.db-book.com/university-lab-dir/lab-dir/lab7/alt.html' },
        { title: 'The Design and Implementation of Modern Memory Systems (Jacob et al., 2008)', url: 'https://link.springer.com/book/10.1007/978-1-4020-5751-0' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Redis: Advanced Memory Data Structure Store', url: 'https://redis.io/docs/data-types/' },
        { title: 'Elasticsearch: Distributed Search and Analytics Engine', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html' },
        { title: 'Apache Kafka: Distributed Streaming Platform', url: 'https://kafka.apache.org/documentation/#semantics' },
        { title: 'PostgreSQL: Advanced Indexing and Query Optimization', url: 'https://www.postgresql.org/docs/current/indexes.html' }
      ]
    },
    {
      title: 'Performance & Optimization',
      items: [
        { title: 'Google Bigtable: A Distributed Storage System', url: 'https://research.google/pubs/pub27898/' },
        { title: 'Amazon DynamoDB: Fast and Predictable Performance', url: 'https://aws.amazon.com/dynamodb/developer-resources/' },
        { title: 'Facebook TAO: The Power of the Graph', url: 'https://www.usenix.org/conference/atc13/technical-sessions/presentation/bronson' },
        { title: 'LinkedIn Kafka: Real-time Data Processing at Scale', url: 'https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic operations for reading, writing, and managing memory access based on intelligent scoring"
        why="Optimized retrieval performance, multi-agent coordination, intelligent memory prioritization"
        keyInsight="Composite Scoring (R×0.3 + R×0.5 + I×0.2) + Caching + Concurrency Control → Intelligent memory access"
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

export default MemoryReadingWritingOperationsDetails;