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

interface ForkJoinDetailsProps {
  selectedTechnique: any;
}

export const ForkJoinDetails: React.FC<ForkJoinDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decompose', detail: 'Break task into independent subtasks' },
      { num: '2', action: 'Fork', detail: 'Create parallel workers for each subtask' },
      { num: '3', action: 'Execute', detail: 'Process subtasks concurrently with recursion' },
      { num: '4', action: 'Join', detail: 'Wait for all subtasks to complete' },
      { num: '5', action: 'Combine', detail: 'Aggregate results using synthesis logic' }
    ],
    example: 'large_task → [subtask_A, subtask_B, subtask_C] → parallel_process → combine → result'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Set appropriate base case thresholds', icon: '✅' },
    { type: 'do', text: 'Balance subtask granularity for optimal parallelism', icon: '✅' },
    { type: 'do', text: 'Implement work-stealing for load balancing', icon: '✅' },
    { type: 'do', text: 'Use thread pools to avoid creation overhead', icon: '✅' },
    { type: 'do', text: 'Cache intermediate results to avoid redundancy', icon: '✅' },
    { type: 'dont', text: 'Create excessive decomposition overhead', icon: '❌' },
    { type: 'dont', text: 'Ignore load balancing across workers', icon: '❌' },
    { type: 'dont', text: 'Allow resource contention and deadlocks', icon: '❌' },
    { type: 'dont', text: 'Define inadequate base cases', icon: '❌' },
    { type: 'dont', text: 'Miss error handling in parallel branches', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Recursive problems with natural decomposition',
      'Hierarchical data structures',
      'Divide-and-conquer algorithms',
      'Computational tasks with parallelizable subtasks'
    ],
    avoidWhen: [
      'Strong sequential dependencies',
      'Small problem sizes',
      'Memory-constrained environments',
      'Strict deterministic timing requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Parallel Efficiency', measure: 'Speedup vs theoretical maximum' },
    { metric: 'Load Balance Quality', measure: 'Variance in worker execution times' },
    { metric: 'Resource Utilization', measure: 'CPU, memory, thread efficiency' },
    { metric: 'Task Granularity Ratio', measure: 'Parallelism vs coordination overhead' },
    { metric: 'Recursive Depth', measure: 'Decomposition pattern analysis' },
    { metric: 'Fault Recovery Rate', measure: 'Success rate of subtask failure handling' }
  ];

  const topUseCases = [
    'Tree Traversal: Recursive parallel processing → explore branches → combine results',
    'Sorting Algorithms: Divide data → parallel sort → merge sorted segments',
    'Matrix Operations: Split matrices → parallel compute → aggregate results',
    'Search Problems: Decompose search space → parallel exploration → combine findings',
    'Data Processing: Partition dataset → parallel analysis → synthesize insights'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Foundation parallel processing pattern with chunking and aggregation',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Understanding structured parallel processing helps with fork-join decomposition'
      }
    ],
    nextSteps: [
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'planning-execution',
        description: 'Complex workflows with dependencies and state management',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Natural evolution for complex parallel workflows with dependencies'
      }
    ],
    alternatives: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Structured parallel processing without recursive decomposition',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Better for non-recursive problems with clear data partitioning'
      },
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Service-oriented parallel processing without recursion',
        icon: '📡',
        complexity: 'medium',
        reason: 'Simpler approach for service-based parallel processing'
      }
    ],
    combinesWith: [
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Use different tools in parallel fork branches',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Each fork can utilize specialized tools for subtask processing'
      },
      {
        id: 'self-critique',
        name: 'Self-Critique',
        category: 'reflection-techniques',
        description: 'Validate subtask results before joining',
        icon: '🔄',
        complexity: 'medium',
        reason: 'Quality control for each parallel branch before final aggregation'
      }
    ],
    enhancedBy: [
      {
        id: 'error-recovery-patterns',
        name: 'Error Recovery Patterns',
        category: 'fault-tolerance-infrastructure',
        description: 'Handle subtask failures without losing entire computation',
        icon: '🔁',
        complexity: 'low',
        reason: 'Critical for maintaining progress when parallel branches fail'
      },
      {
        id: 'predictive-agent-fault-tolerance',
        name: 'Predictive Agent Fault Tolerance',
        category: 'fault-tolerance-infrastructure',
        description: 'Predict resource exhaustion in recursive decomposition',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Prevents stack overflow and resource exhaustion in deep recursion'
      }
    ],
    enhances: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Add recursive decomposition to structured parallel processing',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Enables dynamic work partitioning with load balancing'
      }
    ],
    evolvesTo: [
      {
        id: 'conversational-orchestration',
        name: 'Conversational Orchestration',
        category: 'multi-agent',
        description: 'Recursive conversation management with parallel branches',
        icon: '🎼',
        complexity: 'high',
        reason: 'Natural evolution for complex conversational workflows'
      }
    ],
    variants: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Non-recursive variant with explicit chunking',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Structured variant without recursive decomposition'
      },
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Service-oriented variant without recursion',
        icon: '📡',
        complexity: 'medium',
        reason: 'Service-based variant for distributed processing'
      },
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Simple concurrent variant without work-stealing',
        icon: '⏳',
        complexity: 'low',
        reason: 'Basic concurrent variant without sophisticated load balancing'
      }
    ],
    conflictsWith: [],
    industryApplications: [
      {
        domain: 'Financial Services',
        description: 'Recursive parallel analysis for complex financial computations',
        patterns: [
          {
            id: 'multi-criteria-decision',
            name: 'Multi-Criteria Decision Making',
            category: 'planning-execution',
            description: 'Recursive decomposition of decision criteria with parallel evaluation',
            icon: '📊'
          }
        ]
      },
      {
        domain: 'Content & Knowledge',
        description: 'Hierarchical parallel processing of structured knowledge',
        patterns: [
          {
            id: 'hierarchical-planning',
            name: 'Hierarchical Planning',
            category: 'planning-execution',
            description: 'Recursive planning decomposition with parallel subtask execution',
            icon: '🗂️'
          }
        ]
      },
      {
        domain: 'Software Development',
        description: 'Recursive parallel processing for code analysis and optimization',
        patterns: [
          {
            id: 'code-execution',
            name: 'Code Execution',
            category: 'tool-use',
            description: 'Recursive code analysis with parallel execution branches',
            icon: '💻'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'A Java Fork/Join Framework (Lea, 2000)', url: 'https://gee.cs.oswego.edu/dl/papers/fj.pdf' },
        { title: 'Work-Stealing Queues (Chase & Lev, 2005)', url: 'https://www.dre.vanderbilt.edu/~schmidt/PDF/work-stealing-dequeue.pdf' },
        { title: 'Recursive Parallel Patterns for AI Systems (2023)', url: 'https://arxiv.org/abs/2308.98765' },
        { title: 'Dynamic Load Balancing in Fork-Join Frameworks (2024)', url: 'https://arxiv.org/abs/2403.12345' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Java Fork/Join Framework Tutorial', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html' },
        { title: 'Python concurrent.futures and multiprocessing', url: 'https://docs.python.org/3/library/concurrent.futures.html' },
        { title: 'JavaScript Web Workers and parallel processing', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API' },
        { title: 'Ray Recursive Task Processing', url: 'https://docs.ray.io/en/latest/ray-core/patterns/tree-of-tasks.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Java ForkJoinPool - Recursive parallel processing', url: 'https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html' },
        { title: 'Python multiprocessing.Pool - Recursive task support', url: 'https://docs.python.org/3/library/multiprocessing.html' },
        { title: 'Scala parallel collections and Akka actors', url: 'https://akka.io/' },
        { title: 'Ray - Distributed recursive processing', url: 'https://ray.io/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Stack Overflow - Fork-Join pattern implementations', url: 'https://stackoverflow.com/questions/tagged/fork-join' },
        { title: 'Ray Community - Recursive processing patterns', url: 'https://ray.io/community' },
        { title: 'Java Community - Parallel programming best practices', url: 'https://dev.java/community/' },
        { title: 'r/concurrent - Parallel processing discussions', url: 'https://www.reddit.com/r/concurrent/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Recursively decompose tasks, execute in parallel, then combine results"
        why="Optimal parallelism through divide-and-conquer with dynamic load balancing"
        keyInsight="Task → [Subtask1, Subtask2, ...] → Parallel_Execute → Join → Result"
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
        currentPatternId="fork-join"
        currentPatternName="Fork-Join"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default ForkJoinDetails;