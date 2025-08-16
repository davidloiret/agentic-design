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

interface HierarchicalMemoryDetailsProps {
  selectedTechnique?: any;
}

export const HierarchicalMemoryDetails: React.FC<HierarchicalMemoryDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Tiers', detail: 'Create working, short-term, long-term, archival levels' },
      { num: '2', action: 'Set Policies', detail: 'Define promotion/demotion rules by access patterns' },
      { num: '3', action: 'Index Layers', detail: 'Optimize retrieval mechanisms per tier' },
      { num: '4', action: 'Background Ops', detail: 'Consolidation, compression, tier optimization' },
      { num: '5', action: 'Monitor & Adapt', detail: 'Dynamic tier sizing based on usage patterns' }
    ],
    example: 'tier_design → policy_rules → indexing_optimization → background_consolidation → adaptive_monitoring'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Design tier boundaries based on access patterns (hot/warm/cold data)', icon: '✅' },
    { type: 'do', text: 'Use intelligent promotion policies combining recency, frequency, importance', icon: '✅' },
    { type: 'do', text: 'Implement efficient indexing optimized for each memory tier', icon: '✅' },
    { type: 'do', text: 'Deploy background consolidation without blocking memory access', icon: '✅' },
    { type: 'do', text: 'Monitor tier performance and adapt sizes dynamically', icon: '✅' },
    { type: 'dont', text: 'Create overly complex hierarchies that slow down simple retrieval', icon: '❌' },
    { type: 'dont', text: 'Use fixed tier boundaries - adapt to workload characteristics', icon: '❌' },
    { type: 'dont', text: 'Ignore memory leaks in tier management causing unbounded growth', icon: '❌' },
    { type: 'dont', text: 'Let promotion policies become stale without access pattern updates', icon: '❌' },
    { type: 'dont', text: 'Implement hierarchy management harder to debug than flat memory', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Large memory stores with varied access patterns',
      'Long-running systems requiring persistence',
      'Applications with clear hot/warm/cold data',
      'Cost optimization for storage needed',
      'Performance optimization across tiers required'
    ],
    avoidWhen: [
      'Small memory requirements (< 1GB)',
      'Uniform access patterns across all data',
      'Real-time systems with strict latency requirements',
      'Stateless operations without persistence needs',
      'Resource-constrained environments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Tier Hit Rate', measure: '% requests satisfied at each tier' },
    { metric: 'Promotion Accuracy', measure: '% correct tier assignments' },
    { metric: 'Memory Utilization', measure: 'Effective storage use across tiers' },
    { metric: 'Retrieval Latency', measure: 'P50/P95 access times per tier' },
    { metric: 'Consolidation Efficiency', measure: 'Background optimization impact' },
    { metric: 'Storage Cost Reduction', measure: '% savings vs flat memory' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Conversational AI: Recent context in working memory, user preferences in long-term (40-60% token reduction)',
    'Knowledge Management: Frequently accessed facts in hot tier, archives in cold storage (enterprise systems)',
    'Personalization Systems: Active user profiles in memory, historical patterns in archives (recommendation engines)',
    'Research Platforms: Current projects in working tier, literature database in archival (academic systems)',
    'Content Platforms: Trending content in hot tier, older content in cost-efficient cold storage (media systems)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Hierarchical Memory Systems for AI Applications (Chen et al., 2024)', url: 'https://arxiv.org/abs/2404.13891' },
        { title: 'Memory Hierarchies in Computer Architecture (Hennessy & Patterson, 2019)', url: 'https://dl.acm.org/doi/book/10.5555/3207983' },
        { title: 'Adaptive Memory Hierarchies for Long-Context Language Models (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2309.14567' },
        { title: 'Multi-Tier Memory Management in Distributed AI Systems (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2405.09876' }
      ]
    },
    {
      title: 'Memory Systems Theory',
      items: [
        { title: 'Computer Architecture: A Quantitative Approach (Memory Hierarchy)', url: 'https://www.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1' },
        { title: 'Modern Operating Systems: Memory Management (Tanenbaum, 2014)', url: 'https://www.pearson.com/us/higher-education/program/Tanenbaum-Modern-Operating-Systems-4th-Edition/PGM80736.html' },
        { title: 'Database System Concepts: Storage and File Structure', url: 'https://www.db-book.com/university-lab-dir/' },
        { title: 'Distributed Systems: Concepts and Design (Memory Consistency)', url: 'https://www.pearsonhighered.com/assets/preface/0/1/3/2/0132143011.pdf' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Redis: Multi-Tier Caching and Memory Optimization', url: 'https://redis.io/docs/manual/memory-optimization/' },
        { title: 'LangChain: Memory Systems with Hierarchical Storage', url: 'https://python.langchain.com/docs/modules/memory/' },
        { title: 'Apache Ignite: In-Memory Computing Platform', url: 'https://ignite.apache.org/docs/latest/memory-configuration/memory-architecture' },
        { title: 'Hazelcast: Distributed In-Memory Data Grid', url: 'https://docs.hazelcast.com/imdg/4.2/storage/memory-management' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Google Bigtable: Wide-Column Distributed Storage', url: 'https://research.google/pubs/pub27898/' },
        { title: 'Amazon ElastiCache: In-Memory Caching Service', url: 'https://aws.amazon.com/elasticache/redis/' },
        { title: 'Microsoft Azure Cache for Redis: Hierarchical Caching', url: 'https://docs.microsoft.com/en-us/azure/azure-cache-for-redis/' },
        { title: 'Facebook TAO: Distributed Data Store with Memory Hierarchy', url: 'https://www.usenix.org/conference/atc13/technical-sessions/presentation/bronson' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-level memory structure with different retention policies and intelligent tier management"
        why="Optimized storage costs, improved retrieval performance, adaptive resource allocation"
        keyInsight="Hot/Warm/Cold Data Tiers + Promotion Policies + Background Consolidation → Cost-efficient performance"
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

export default HierarchicalMemoryDetails;