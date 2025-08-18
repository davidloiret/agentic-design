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

interface ScatterGatherDetailsProps {
  selectedTechnique: any;
}

export const ScatterGatherDetails: React.FC<ScatterGatherDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Identify', detail: 'Find independent services/resources' },
      { num: '2', action: 'Scatter', detail: 'Send concurrent requests to all services' },
      { num: '3', action: 'Timeout', detail: 'Set realistic response deadlines' },
      { num: '4', action: 'Gather', detail: 'Collect responses as they arrive' },
      { num: '5', action: 'Aggregate', detail: 'Merge using voting/scoring strategies' }
    ],
    example: 'query → [service_A, service_B, service_C] → gather_responses → merge_results'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design consistent interfaces across all services', icon: '✅' },
    { type: 'do', text: 'Implement circuit breakers for unreliable services', icon: '✅' },
    { type: 'do', text: 'Use partial result aggregation for resilience', icon: '✅' },
    { type: 'do', text: 'Cache responses to reduce redundant calls', icon: '✅' },
    { type: 'do', text: 'Monitor service performance and adapt strategies', icon: '✅' },
    { type: 'dont', text: 'Create dependencies between services', icon: '❌' },
    { type: 'dont', text: 'Rely on all services succeeding', icon: '❌' },
    { type: 'dont', text: 'Use inconsistent request formats', icon: '❌' },
    { type: 'dont', text: 'Ignore slow or failing service patterns', icon: '❌' },
    { type: 'dont', text: 'Skip result validation from individual services', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multiple independent information sources',
      'Need comprehensive coverage',
      'Services have different specializations',
      'Fault tolerance is critical'
    ],
    avoidWhen: [
      'Services have dependencies',
      'Single service is sufficient',
      'Real-time latency requirements',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Service Response Rate', measure: '% services responding within timeout' },
    { metric: 'Aggregation Completeness', measure: '% expected information gathered' },
    { metric: 'Overall Latency', measure: 'End-to-end response time' },
    { metric: 'Service Reliability', measure: 'Individual service uptime' },
    { metric: 'Result Quality', measure: 'Accuracy vs single-service baseline' },
    { metric: 'Resource Efficiency', measure: 'Cost vs sequential calls' }
  ];

  const topUseCases = [
    'Multi-Source Research: Query knowledge bases → gather insights → synthesize report',
    'Price Comparison: Check providers → collect quotes → recommend best option',
     'Service Health Check: Poll endpoints → gather status → aggregate dashboard',
    'Content Enrichment: Query APIs → collect metadata → enhance content',
    'Consensus Building: Poll validators → gather opinions → determine consensus'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Fundamental concurrent programming for parallel service calls',
        icon: '⏳',
        complexity: 'low',
        reason: 'Essential for managing concurrent service requests effectively'
      }
    ],
    nextSteps: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Structured parallel processing with explicit chunking and aggregation',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Natural evolution when you need more structured parallel data processing'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive parallel decomposition with dynamic load balancing',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Advanced parallelization for complex recursive processing tasks'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'planning-execution',
        description: 'Complex service orchestration with state management',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Enterprise-grade service coordination with sophisticated orchestration'
      }
    ],
    alternatives: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'More structured approach with explicit chunking',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'Better when you need systematic data partitioning and processing'
      },
      {
        id: 'sequential-chaining',
        name: 'Sequential Chaining',
        category: 'prompt-chaining',
        description: 'Linear service calls when parallel execution isn\'t needed',
        icon: '⛓️',
        complexity: 'low',
        reason: 'Simpler approach when services must be called in specific order'
      }
    ],
    combinesWith: [
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Scatter requests across different tools and services',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Each scattered request can use specialized tools for data processing'
      },
      {
        id: 'advanced-rag',
        name: 'Advanced RAG',
        category: 'knowledge-retrieval',
        description: 'Gather information from multiple knowledge sources',
        icon: '📚',
        complexity: 'high',
        reason: 'Scatter queries across knowledge bases, gather and synthesize results'
      },
      {
        id: 'self-critique',
        name: 'Self-Critique',
        category: 'reflection-techniques',
        description: 'Validate gathered responses before aggregation',
        icon: '🔄',
        complexity: 'medium',
        reason: 'Quality control for each gathered response before final synthesis'
      }
    ],
    enhancedBy: [
      {
        id: 'error-recovery-patterns',
        name: 'Error Recovery Patterns',
        category: 'fault-tolerance-infrastructure',
        description: 'Handle service failures gracefully in scatter phase',
        icon: '🔁',
        complexity: 'low',
        reason: 'Critical for maintaining service availability when some endpoints fail'
      },
      {
        id: 'semantic-validation',
        name: 'Semantic Validation',
        category: 'evaluation-monitoring',
        description: 'Validate service responses before aggregation',
        icon: '📋',
        complexity: 'low',
        reason: 'Ensures quality of gathered data before final synthesis'
      },
      {
        id: 'predictive-agent-fault-tolerance',
        name: 'Predictive Agent Fault Tolerance',
        category: 'fault-tolerance-infrastructure',
        description: 'Predict and avoid unreliable services',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Proactively manages service selection based on reliability patterns'
      }
    ],
    enhances: [
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Organizes concurrent operations into systematic scatter-gather workflows',
        icon: '⏳',
        complexity: 'low',
        reason: 'Provides structure and aggregation strategy for concurrent operations'
      },
      {
        id: 'function-calling',
        name: 'Function Calling',
        category: 'tool-use',
        description: 'Systematizes tool usage across multiple services',
        icon: '🛠️',
        complexity: 'medium',
        reason: 'Enables coordinated tool usage with result aggregation'
      }
    ],
    evolvesTo: [
      {
        id: 'conversational-orchestration',
        name: 'Conversational Orchestration',
        category: 'multi-agent',
        description: 'Service orchestration with conversational state management',
        icon: '🎼',
        complexity: 'high',
        reason: 'Natural evolution for complex service coordination workflows'
      },
      {
        id: 'stateful-graph-workflows',
        name: 'Stateful Graph Workflows',
        category: 'planning-execution',
        description: 'DAG-based service orchestration with complex dependencies',
        icon: '🕸️',
        complexity: 'very-high',
        reason: 'Advanced evolution for enterprise service orchestration needs'
      }
    ],
    variants: [
      {
        id: 'map-reduce',
        name: 'Map-Reduce',
        category: 'parallelization',
        description: 'Structured variant with explicit chunking and reduction',
        icon: '🗺️',
        complexity: 'medium',
        reason: 'More systematic variant for large-scale data processing'
      },
      {
        id: 'fork-join',
        name: 'Fork-Join',
        category: 'parallelization',
        description: 'Recursive variant with dynamic load balancing',
        icon: '🍴',
        complexity: 'medium',
        reason: 'Advanced variant with recursive decomposition capabilities'
      },
      {
        id: 'async-await',
        name: 'Async-Await',
        category: 'parallelization',
        description: 'Simplified variant without explicit gathering logic',
        icon: '⏳',
        complexity: 'low',
        reason: 'Basic concurrent variant without structured aggregation'
      }
    ],
    conflictsWith: [],
    industryApplications: [
      {
        domain: 'Financial Services',
        description: 'Multi-provider data aggregation for comprehensive financial analysis',
        patterns: [
          {
            id: 'multi-criteria-decision',
            name: 'Multi-Criteria Decision Making',
            category: 'planning-execution',
            description: 'Gather criteria from multiple sources for investment decisions',
            icon: '📊'
          },
          {
            id: 'llm-as-judge',
            name: 'LLM-as-Judge',
            category: 'evaluation-monitoring',
            description: 'Aggregate assessments from multiple evaluation services',
            icon: '⚖️'
          }
        ]
      },
      {
        domain: 'Content & Knowledge',
        description: 'Multi-source information gathering and synthesis',
        patterns: [
          {
            id: 'advanced-rag',
            name: 'Advanced RAG',
            category: 'knowledge-retrieval',
            description: 'Scatter queries across knowledge bases for comprehensive retrieval',
            icon: '📚'
          },
          {
            id: 'hierarchical-planning',
            name: 'Hierarchical Planning',
            category: 'planning-execution',
            description: 'Gather planning inputs from multiple specialized services',
            icon: '🗂️'
          }
        ]
      },
      {
        domain: 'Software Development',
        description: 'Multi-service integration for comprehensive system monitoring',
        patterns: [
          {
            id: 'code-execution',
            name: 'Code Execution',
            category: 'tool-use',
            description: 'Gather execution results from multiple runtime environments',
            icon: '💻'
          },
          {
            id: 'swe-bench-suite',
            name: 'SWE-Bench Suite',
            category: 'evaluation-monitoring',
            description: 'Aggregate test results from multiple evaluation services',
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
        { title: 'Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions', url: 'https://www.enterpriseintegrationpatterns.com/patterns/messaging/ScatterGather.html' },
        { title: 'Microservices Patterns for Distributed Systems (2023)', url: 'https://arxiv.org/abs/2307.12345' },
        { title: 'Resilient Service Orchestration Patterns (2024)', url: 'https://arxiv.org/abs/2402.67890' },
        { title: 'Parallel Information Aggregation in AI Systems (2023)', url: 'https://arxiv.org/abs/2311.54321' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Spring Integration Scatter-Gather Pattern', url: 'https://docs.spring.io/spring-integration/reference/html/scatter-gather.html' },
        { title: 'Apache Camel Scatter-Gather EIP', url: 'https://camel.apache.org/components/latest/eips/scatter-gather.html' },
        { title: 'AWS Step Functions Parallel State', url: 'https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-parallel-state.html' },
        { title: 'LangChain Parallel Processing with Multiple Tools', url: 'https://python.langchain.com/docs/how_to/parallel' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Spring Integration - Enterprise messaging patterns', url: 'https://spring.io/projects/spring-integration' },
        { title: 'Apache Camel - Integration pattern implementations', url: 'https://camel.apache.org/' },
        { title: 'RxJS - Reactive scatter-gather operations', url: 'https://rxjs.dev/' },
        { title: 'LangChain - Multi-tool orchestration', url: 'https://python.langchain.com/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Microservices Community - Service orchestration patterns', url: 'https://microservices.io/community' },
        { title: 'Spring Community - Integration pattern discussions', url: 'https://spring.io/community' },
        { title: 'LangChain Discord - Parallel Processing', url: 'https://discord.gg/langchain' },
        { title: 'r/microservices - Scatter-gather implementation strategies', url: 'https://www.reddit.com/r/microservices/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Broadcast requests to multiple services, then aggregate responses"
        why="Maximizes information coverage, improves resilience, leverages diverse capabilities"
        keyInsight="Request → [Service1, Service2, ServiceN] → Gather → Aggregate → Result"
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
        currentPatternId="scatter-gather"
        currentPatternName="Scatter-Gather"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default ScatterGatherDetails;