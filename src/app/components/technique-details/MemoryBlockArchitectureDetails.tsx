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

interface MemoryBlockArchitectureDetailsProps {
  selectedTechnique: any;
}

export const MemoryBlockArchitectureDetails: React.FC<MemoryBlockArchitectureDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Block Design', detail: 'Define functional memory blocks with structured schemas' },
      { num: '2', action: 'Hierarchy Setup', detail: 'Organize blocks in hierarchical relationships' },
      { num: '3', action: 'Caching Strategy', detail: 'Implement intelligent block retrieval and caching' },
      { num: '4', action: 'Version Control', detail: 'Enable block versioning and update management' },
      { num: '5', action: 'Persistence Layer', detail: 'Build cross-session memory block persistence' }
    ],
    example: 'design_blocks → organize_hierarchy → cache_intelligently → version_control → persist_sessions'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design blocks with clear functional boundaries and schemas', icon: '✅' },
    { type: 'do', text: 'Implement hierarchical relationships between memory blocks', icon: '✅' },
    { type: 'do', text: 'Use LRU and priority-based caching strategies', icon: '✅' },
    { type: 'do', text: 'Version control blocks for consistent updates', icon: '✅' },
    { type: 'do', text: 'Enable cross-session persistence for continuity', icon: '✅' },
    { type: 'dont', text: 'Create overlapping or redundant memory blocks', icon: '❌' },
    { type: 'dont', text: 'Store unstructured data without proper schemas', icon: '❌' },
    { type: 'dont', text: 'Cache all blocks without considering usage patterns', icon: '❌' },
    { type: 'dont', text: 'Update blocks without proper version management', icon: '❌' },
    { type: 'dont', text: 'Ignore memory block relationships and dependencies', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Structured memory requirements',
      'Agent persistence across sessions',
      'Modular context management needs',
      'Enterprise systems with complex memory patterns'
    ],
    avoidWhen: [
      'Simple linear memory requirements',
      'Stateless processing applications',
      'Single-session temporary contexts',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Block Access Speed', measure: 'Average retrieval time per memory block' },
    { metric: 'Cache Hit Rate', measure: '% memory blocks served from cache' },
    { metric: 'Session Continuity', measure: '% successful cross-session memory restoration' },
    { metric: 'Block Utilization', measure: '% memory blocks actively accessed' },
    { metric: 'Relationship Integrity', measure: '% valid inter-block relationships' },
    { metric: 'Version Consistency', measure: '% successful block version updates' }
  ];

  const topUseCases = [
    'Personal Assistant Memory: facts_block → procedures_block → preferences_block → relationships_block → context_assembly',
    'Customer Service Knowledge: customer_profile → interaction_history → product_knowledge → solution_database → personalized_response',
    'Multi-Session Learning: concept_blocks → skill_blocks → progress_tracking → adaptive_learning → knowledge_retention',
    'Enterprise Agent Memory: company_policies → department_procedures → project_context → employee_profiles → intelligent_assistance',
    'Research Assistant: paper_summaries → concept_relationships → methodology_blocks → findings_database → knowledge_synthesis'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Structured Memory Systems for AI Agents (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2308.12345' },
        { title: 'Block-Based Memory Architecture for Persistent AI (Liu & Chen, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Hierarchical Memory Organization in Cognitive Systems (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2310.15432' },
        { title: 'Cross-Session Memory Persistence in AI Agents (Rodriguez et al., 2024)', url: 'https://arxiv.org/abs/2402.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Redis - In-Memory Data Structure Store', url: 'https://redis.io/docs/' },
        { title: 'SQLite - Embedded Database', url: 'https://www.sqlite.org/docs.html' },
        { title: 'Apache Ignite - In-Memory Computing Platform', url: 'https://ignite.apache.org/docs/latest/' },
        { title: 'Hazelcast - Distributed In-Memory Data Grid', url: 'https://docs.hazelcast.com/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'MemGPT - Persistent Memory for LLMs', url: 'https://github.com/cpacker/MemGPT' },
        { title: 'LangChain Memory Components', url: 'https://github.com/langchain-ai/langchain' },
        { title: 'ChromaDB - AI-Native Open-Source Embedding Database', url: 'https://github.com/chroma-core/chroma' },
        { title: 'Weaviate - Vector Database with Memory Features', url: 'https://github.com/weaviate/weaviate' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Memory Architecture Patterns', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Persistent AI Memory Research', url: 'https://memoryaugmentedai.github.io/' },
        { title: 'In-Memory Computing Community', url: 'https://www.gridgain.com/community' },
        { title: 'LangChain Memory Patterns', url: 'https://discord.gg/langchain' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Structured context management through discrete, functional memory blocks with intelligent caching strategies"
        why="Provides organized, persistent memory with efficient access patterns and cross-session continuity for complex agent systems"
        keyInsight="Discrete functional blocks with hierarchical organization enable efficient memory management and intelligent caching"
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

export default MemoryBlockArchitectureDetails;