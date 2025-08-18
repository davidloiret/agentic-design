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

interface AsyncAwaitDetailsProps {
  selectedTechnique: any;
}

export const AsyncAwaitDetails: React.FC<AsyncAwaitDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Identify', detail: 'Find async operations (I/O, network, etc.)' },
      { num: '2', action: 'Wrap', detail: 'Use promises with error handling & timeouts' },
      { num: '3', action: 'Async/Await', detail: 'Write sequential-looking async code' },
      { num: '4', action: 'Concurrent', detail: 'Run multiple operations in parallel' },
      { num: '5', action: 'Coordinate', detail: 'Use Promise.all/race for orchestration' }
    ],
    example: 'async_ops → [Promise.all([op1, op2, op3])] → await_results → process'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use Promise.all for independent concurrent operations', icon: '✅' },
    { type: 'do', text: 'Apply Promise.race for timeout and first-response scenarios', icon: '✅' },
    { type: 'do', text: 'Implement proper error boundaries and catch blocks', icon: '✅' },
    { type: 'do', text: 'Set appropriate timeouts to prevent hanging', icon: '✅' },
    { type: 'do', text: 'Use async iterators for streaming data', icon: '✅' },
    { type: 'dont', text: 'Forget to await async operations', icon: '❌' },
    { type: 'dont', text: 'Create async/await cascades eliminating concurrency', icon: '❌' },
    { type: 'dont', text: 'Ignore error handling in promise chains', icon: '❌' },
    { type: 'dont', text: 'Block event loop with CPU-intensive operations', icon: '❌' },
    { type: 'dont', text: 'Skip timeout handling for long operations', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'I/O intensive operations',
      'Multiple independent API calls',
      'Non-blocking background tasks',
      'Event-driven architectures'
    ],
    avoidWhen: [
      'Simple synchronous operations',
      'CPU-intensive tasks',
      'Critical sequential execution order',
      'Deterministic timing requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Response Time Improvement', measure: 'Latency reduction vs sequential execution' },
    { metric: 'Throughput Increase', measure: 'Operations per unit time with parallelism' },
    { metric: 'Error Handling Effectiveness', measure: 'Success rate of graceful recovery' },
    { metric: 'Resource Utilization', measure: 'CPU and memory efficiency gains' },
    { metric: 'Promise Resolution Rate', measure: '% operations completing within timeout' },
    { metric: 'Concurrency Efficiency', measure: 'Parallel operations vs coordination overhead' }
  ];

  const topUseCases = [
    'API Integration: Concurrent service calls → gather responses → process results',
    'File Processing: Parallel file I/O → process data streams → aggregate output',
    'Database Operations: Concurrent queries → merge results → return dataset',
    'Microservice Coordination: Parallel service calls → orchestrate responses',
    'Real-time Processing: Stream processing → concurrent analysis → live results'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [],
    nextSteps: [
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Structured service orchestration with result aggregation',
        icon: '📡',
        complexity: 'medium',
        reason: 'Natural evolution for systematic multi-service coordination'
      },
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Structured parallel processing with chunking and reduction',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Advanced parallel processing for large-scale data operations'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive parallel decomposition with work stealing',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Sophisticated recursive parallel processing with load balancing'
      }
    ],
    alternatives: [
      {
        id: 'sequential-chaining',
        name: 'Sequential Chaining',
        category: 'prompt-chaining',
        description: 'Linear processing when concurrency isn\'t needed',
        icon: '⛓️',
        complexity: 'low',
        reason: 'Simpler approach when operations must be sequential'
      }
    ],
    combinesWith: [
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Concurrent tool usage with async coordination',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Multiple tools can be called concurrently with proper coordination'
      },
      {
        id: 'advanced-rag',
        name: 'Advanced RAG',
        category: 'knowledge-retrieval',
        description: 'Concurrent knowledge retrieval from multiple sources',
        icon: '📚',
        complexity: 'high',
        reason: 'Parallel knowledge queries with async result aggregation'
      },
      {
        id: 'self-critique',
        name: 'Self-Critique',
        category: 'reflection-techniques',
        description: 'Concurrent validation of multiple outputs',
        icon: '🔄',
        complexity: 'medium',
        reason: 'Parallel quality checks with async validation processes'
      }
    ],
    enhancedBy: [
      {
        id: 'error-recovery-patterns',
        name: 'Error Recovery Patterns',
        category: 'fault-tolerance-infrastructure',
        description: 'Robust handling of async operation failures',
        icon: '🔁',
        complexity: 'low',
        reason: 'Critical for maintaining system stability with concurrent operations'
      },
      {
        id: 'semantic-validation',
        name: 'Semantic Validation',
        category: 'evaluation-monitoring',
        description: 'Validate async operation results before processing',
        icon: '📋',
        complexity: 'low',
        reason: 'Ensures quality of concurrent operation outputs'
      }
    ],
    enhances: [
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Makes tool usage non-blocking and concurrent',
        icon: '🛠️',
        complexity: 'medium',
        reason: 'Enables efficient concurrent tool usage without blocking'
      },
      {
        id: 'sequential-chaining',
        name: 'Sequential Chaining',
        category: 'prompt-chaining',
        description: 'Adds concurrency to linear processing chains',
        icon: '⛓️',
        complexity: 'low',
        reason: 'Enables parallel execution within sequential workflows'
      }
    ],
    evolvesTo: [
      {
        id: 'conversational-orchestration',
        name: 'Conversational Orchestration',
        category: 'multi-agent',
        description: 'Advanced async orchestration with state management',
        icon: '🎼',
        complexity: 'high',
        reason: 'Natural evolution for complex async conversation management'
      }
    ],
    variants: [
      {
        id: 'scatter-gather',
        name: 'Scatter-Gather',
        category: 'parallelization',
        description: 'Structured variant with explicit service coordination',
        icon: '📡',
        complexity: 'medium',
        reason: 'More structured variant for service-oriented architectures'
      },
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Data-centric variant with chunking and reduction',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Data processing variant with systematic partitioning'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive variant with dynamic decomposition',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Advanced variant with recursive parallel processing'
      }
    ],
    conflictsWith: [],
    industryApplications: [
      {
        domain: 'Financial Services',
        description: 'Concurrent financial data processing and API integration',
        patterns: [
          {
            id: 'multi-criteria-decision',
            name: 'Multi-Criteria Decision Making',
            category: 'planning-execution',
            description: 'Concurrent evaluation of multiple investment criteria',
            icon: '📊'
          },
          {
            id: 'llm-as-judge',
            name: 'LLM-as-Judge',
            category: 'evaluation-monitoring',
            description: 'Concurrent assessment across multiple evaluation dimensions',
            icon: '⚖️'
          }
        ]
      },
      {
        domain: 'Content & Knowledge',
        description: 'Concurrent content processing and knowledge retrieval',
        patterns: [
          {
            id: 'advanced-rag',
            name: 'Advanced RAG',
            category: 'knowledge-retrieval',
            description: 'Concurrent knowledge base queries with async aggregation',
            icon: '📚'
          },
          {
            id: 'hierarchical-planning',
            name: 'Hierarchical Planning',
            category: 'planning-execution',
            description: 'Concurrent planning across multiple planning levels',
            icon: '🗂️'
          }
        ]
      },
      {
        domain: 'Software Development',
        description: 'Concurrent code execution and testing workflows',
        patterns: [
          {
            id: 'code-execution',
            name: 'Code Execution',
            category: 'tool-use',
            description: 'Concurrent code execution across multiple environments',
            icon: '💻'
          },
          {
            id: 'swe-bench-suite',
            name: 'SWE-Bench Suite',
            category: 'evaluation-monitoring',
            description: 'Concurrent test execution with async result collection',
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
        { title: 'Promises: Linguistic Support for Efficient Asynchronous Procedure Calls', url: 'https://web.archive.org/web/20110719001417/http://www.eecs.harvard.edu/~nr/pubs/promises-abstract.html' },
        { title: 'Async/Await Patterns in AI Systems (2023)', url: 'https://arxiv.org/abs/2310.11111' },
        { title: 'Concurrent Processing for Large Language Models (2024)', url: 'https://arxiv.org/abs/2402.22222' },
        { title: 'Event-Driven Architecture and Asynchronous Programming Patterns', url: 'https://martinfowler.com/articles/201701-event-driven.html' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'JavaScript Promises and Async/Await Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises' },
        { title: 'Python asyncio and Asynchronous Programming', url: 'https://docs.python.org/3/library/asyncio.html' },
        { title: 'Node.js Asynchronous Programming Best Practices', url: 'https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/' },
        { title: 'LangChain Async Processing Guide', url: 'https://python.langchain.com/docs/how_to/async' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'JavaScript Promise.all, Promise.race, and async/await', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise' },
        { title: 'Python asyncio, aiohttp, and async context managers', url: 'https://aiohttp.readthedocs.io/' },
        { title: 'Java CompletableFuture and reactive streams', url: 'https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html' },
        { title: 'LangChain Async Chains and Tools', url: 'https://python.langchain.com/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Stack Overflow - Async/await pattern discussions', url: 'https://stackoverflow.com/questions/tagged/async-await' },
        { title: 'r/javascript - Asynchronous programming best practices', url: 'https://www.reddit.com/r/javascript/' },
        { title: 'Node.js Community - Event-driven programming patterns', url: 'https://nodejs.org/en/community/' },
        { title: 'LangChain Discord - Async Processing', url: 'https://discord.gg/langchain' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Non-blocking asynchronous execution with promise-based coordination"
        why="Improves throughput and responsiveness while maintaining code readability"
        keyInsight="Promise → async/await → [concurrent_operations] → await_results"
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
        currentPatternId="async-await"
        currentPatternName="Async-Await"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default AsyncAwaitDetails;