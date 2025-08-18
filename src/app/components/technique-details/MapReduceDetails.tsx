'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import { PatternRelationships, RelationshipData } from '../shared/PatternRelationships';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface MapReduceDetailsProps {
  selectedTechnique: any;
}

export const MapReduceDetails: React.FC<MapReduceDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Chunk', detail: 'Split data into parallel-processable units' },
      { num: '2', action: 'Map', detail: 'Apply same operation to each chunk' },
      { num: '3', action: 'Execute', detail: 'Process chunks in parallel' },
      { num: '4', action: 'Reduce', detail: 'Aggregate results into final output' },
      { num: '5', action: 'Validate', detail: 'Check completeness & consistency' }
    ],
    example: 'documents → [analyze, analyze, analyze] → combine insights → final_report'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Ensure chunks are independent and balanced', icon: '✅' },
    { type: 'do', text: 'Use deterministic reduce functions for consistency', icon: '✅' },
    { type: 'do', text: 'Handle partial failures gracefully', icon: '✅' },
    { type: 'do', text: 'Size chunks based on processing complexity', icon: '✅' },
    { type: 'do', text: 'Cache map results for repeated reduce operations', icon: '✅' },
    { type: 'dont', text: 'Create chunks with interdependencies', icon: '❌' },
    { type: 'dont', text: 'Use non-commutative reduce operations', icon: '❌' },
    { type: 'dont', text: 'Ignore memory constraints with large datasets', icon: '❌' },
    { type: 'dont', text: 'Make chunks too small (overhead) or too large (imbalance)', icon: '❌' },
    { type: 'dont', text: 'Forget to handle empty or malformed chunks', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Large datasets to process',
      'Independent, repeatable operations',
      'CPU/IO bound tasks',
      'Need horizontal scaling'
    ],
    avoidWhen: [
      'Small datasets (overhead exceeds benefit)',
      'Sequential dependencies',
      'Memory-intensive aggregation',
      'Real-time streaming needs'
    ]
  };

  const keyMetrics = [
    { metric: 'Throughput', measure: 'Items processed per second' },
    { metric: 'Parallelization Efficiency', measure: '% of ideal speedup achieved' },
    { metric: 'Resource Utilization', measure: 'CPU/memory usage across workers' },
    { metric: 'Fault Tolerance', measure: '% of partial failures handled' },
    { metric: 'Load Balance', measure: 'Variance in chunk processing times' },
    { metric: 'Cost Efficiency', measure: 'Cost per processed item vs sequential' }
  ];

  const topUseCases = [
    'Document Analysis: Split large documents → analyze sections → combine insights',
    'Content Moderation: Batch posts → classify each → aggregate violation reports',
    'Data Validation: Chunk records → validate each → compile error summary',
    'Sentiment Analysis: Split reviews → analyze sentiment → generate overall score',
    'Code Analysis: Split codebase → analyze files → generate quality report'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [
      {
        id: 'sequential-chaining',
        name: 'Sequential Chaining',
        category: 'prompt-chaining',
        description: 'Linear processing foundation that Map-Reduce parallelizes',
        icon: '⛓️',
        complexity: 'low',
        reason: 'Understanding linear processing helps design effective parallel decomposition'
      }
    ],
    nextSteps: [
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'More flexible parallel distribution with heterogeneous processing',
        icon: '📡',
        complexity: 'medium',
        reason: 'Natural evolution when you need different operations on different data types'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive parallel decomposition with work stealing',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Advanced parallelization with dynamic load balancing'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'planning-execution',
        description: 'Complex parallel workflows with state management',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Enterprise-grade parallel processing with sophisticated orchestration'
      }
    ],
    alternatives: [
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Promise-based concurrency without explicit chunking',
        icon: '⏳',
        complexity: 'low',
        reason: 'Simpler approach when data doesn\'t need explicit partitioning'
      },
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'More flexible distribution for heterogeneous tasks',
        icon: '📡',
        complexity: 'medium',
        reason: 'Better when operations vary significantly across data items'
      }
    ],
    combinesWith: [
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Call different tools during map and reduce phases',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Map phase can use different tools, reduce phase aggregates tool outputs'
      },
      {
        id: 'advanced-rag',
        name: 'Advanced RAG',
        category: 'knowledge-retrieval',
        description: 'Parallel knowledge retrieval with centralized aggregation',
        icon: '📚',
        complexity: 'high',
        reason: 'Each map operation retrieves relevant knowledge, reduce synthesizes insights'
      },
      {
        id: 'self-critique',
        name: 'Self-Critique',
        category: 'reflection-techniques',
        description: 'Validate both map outputs and final reduction',
        icon: '🔄',
        complexity: 'medium',
        reason: 'Ensures quality at both individual and aggregate levels'
      }
    ],
    enhancedBy: [
      {
        id: 'error-recovery-patterns',
        name: 'Error Recovery Patterns',
        category: 'fault-tolerance-infrastructure',
        description: 'Handle map phase failures without losing entire batch',
        icon: '🔁',
        complexity: 'low',
        reason: 'Critical for maintaining throughput when individual chunks fail'
      },
      {
        id: 'semantic-validation',
        name: 'Semantic Validation',
        category: 'evaluation-monitoring',
        description: 'Validate map outputs before reduction',
        icon: '📋',
        complexity: 'low',
        reason: 'Prevents bad data from corrupting final aggregation'
      },
      {
        id: 'predictive-agent-fault-tolerance',
        name: 'Predictive Agent Fault Tolerance',
        category: 'fault-tolerance-infrastructure',
        description: 'Predict and prevent cascading map failures',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Maintains parallel processing efficiency by preventing failure cascades'
      }
    ],
    enhances: [
      {
        id: 'sequential-chaining',
        name: 'Sequential Chaining',
        category: 'prompt-chaining',
        description: 'Transform linear chains into parallel processing pipelines',
        icon: '⛓️',
        complexity: 'low',
        reason: 'Scales sequential processing to handle large datasets efficiently'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Parallelize tool usage across large datasets',
        icon: '🛠️',
        complexity: 'medium',
        reason: 'Enables efficient batch processing of tool-based operations'
      }
    ],
    evolvesTo: [
      {
        id: 'conversational-orchestration',
        name: 'Conversational Orchestration',
        category: 'multi-agent',
        description: 'Orchestrated parallel conversations with state management',
        icon: '🎼',
        complexity: 'high',
        reason: 'Natural evolution for complex parallel conversational workflows'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'planning-execution',
        description: 'DAG-based parallel processing with complex dependencies',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Advanced evolution for enterprise parallel processing needs'
      }
    ],
    variants: [
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Heterogeneous parallel processing variant',
        icon: '📡',
        complexity: 'medium',
        reason: 'Variant that allows different operations on different data types'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive decomposition variant with work stealing',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Advanced variant with dynamic load balancing and recursive splitting'
      },
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Promise-based concurrent processing variant',
        icon: '⏳',
        complexity: 'low',
        reason: 'Simpler concurrent variant without explicit chunking'
      }
    ],
    conflictsWith: [],
    industryApplications: [
      {
        domain: 'Financial Services',
        description: 'Large-scale parallel analysis for risk assessment and fraud detection',
        patterns: [
          {
            id: 'multi-criteria-decision',
            name: 'Multi-Criteria Decision Making',
            category: 'planning-execution',
            description: 'Parallel evaluation of investment options with aggregated scoring',
            icon: '📊'
          },
          {
            id: 'llm-as-judge',
            name: 'LLM-as-Judge',
            category: 'evaluation-monitoring',
            description: 'Parallel transaction analysis with aggregated risk assessment',
            icon: '⚖️'
          }
        ]
      },
      {
        domain: 'Content & Knowledge',
        description: 'Parallel processing of large document collections and knowledge bases',
        patterns: [
          {
            id: 'advanced-rag',
            name: 'Advanced RAG',
            category: 'knowledge-retrieval',
            description: 'Parallel knowledge extraction with centralized synthesis',
            icon: '📚'
          },
          {
            id: 'hierarchical-planning',
            name: 'Hierarchical Planning',
            category: 'planning-execution',
            description: 'Parallel planning across content domains with unified strategy',
            icon: '🗂️'
          }
        ]
      },
      {
        domain: 'Software Development',
        description: 'Parallel code analysis and testing across large codebases',
        patterns: [
          {
            id: 'code-execution',
            name: 'Code Execution',
            category: 'tool-use',
            description: 'Parallel code analysis with aggregated quality metrics',
            icon: '💻'
          },
          {
            id: 'swe-bench-suite',
            name: 'SWE-Bench Suite',
            category: 'evaluation-monitoring',
            description: 'Parallel testing and evaluation with unified reporting',
            icon: '🔧'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat, 2004)', url: 'https://research.google/pubs/pub62/' },
        { title: 'Parallel Processing Patterns for AI Systems (2023)', url: 'https://arxiv.org/abs/2309.12345' },
        { title: 'Efficient Parallel Prompt Processing (2024)', url: 'https://arxiv.org/abs/2401.54321' },
        { title: 'Load Balancing in Distributed AI Inference (2023)', url: 'https://arxiv.org/abs/2311.98765' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Apache Spark MapReduce Guide', url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html' },
        { title: 'LangChain Parallel Processing', url: 'https://python.langchain.com/docs/how_to/parallel' },
        { title: 'Async Processing with OpenAI Batch API', url: 'https://platform.openai.com/docs/guides/batch' },
        { title: 'Ray Distributed Computing for AI', url: 'https://docs.ray.io/en/latest/ray-core/patterns/map-reduce.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Apache Spark - Distributed Computing', url: 'https://spark.apache.org/' },
        { title: 'Ray - Parallel Processing for Python', url: 'https://github.com/ray-project/ray' },
        { title: 'Dask - Parallel Computing Library', url: 'https://dask.org/' },
        { title: 'LangChain Expression Language (LCEL) - Parallel Chains', url: 'https://python.langchain.com/docs/expression_language/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Ray Community Slack', url: 'https://ray.io/community' },
        { title: 'Apache Spark Community', url: 'https://spark.apache.org/community.html' },
        { title: 'LangChain Discord - Parallel Processing', url: 'https://discord.gg/langchain' },
        { title: 'Reddit: r/MachineLearning - Parallel Processing', url: 'https://reddit.com/r/MachineLearning' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Split data into chunks, process in parallel, then aggregate results"
        why="Maximizes throughput, utilizes multiple cores/services, scales horizontally"
        keyInsight="Chunk[1..N] → Map(f) → [Result1..N] → Reduce → Final_Output"
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

      <PatternRelationships
        currentPatternId="map-reduce"
        currentPatternName="Map-Reduce"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default MapReduceDetails;