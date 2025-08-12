'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface ScatterGatherDetailsProps {
  selectedTechnique: any;
}

export const ScatterGatherDetails: React.FC<ScatterGatherDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Identify multiple independent services or resources that can contribute to the solution.',
    'Scatter requests concurrently to all relevant services with appropriate parameters and context.',
    'Set realistic timeouts and implement graceful handling of partial responses from slow services.',
    'Gather responses as they arrive, validating format and extracting relevant information.',
    'Aggregate collected responses using voting, scoring, or intelligent merging strategies.',
    'Return consolidated result with service attribution and confidence indicators.'
  ];

  const bestPractices = [
    'Design requests with consistent interfaces and timeout policies across all services.',
    'Implement circuit breakers and fallback mechanisms for unreliable or slow services.',
    'Use partial result aggregation to provide value even when some services fail or timeout.',
    'Cache service responses where appropriate to improve performance and reduce redundant calls.',
    'Monitor service performance and adapt request strategies based on historical reliability.',
    'Include service attribution in results for debugging and quality assessment.',
    'Implement exponential backoff and jitter for retry logic to prevent cascading failures.'
  ];

  const whenNotToUse = [
    'Cases where service dependencies exist and responses cannot be processed independently.',
    'Simple scenarios where a single service can provide adequate results more efficiently.',
    'Real-time applications where the overhead of multiple service calls is prohibitive.',
    'Resource-constrained environments where concurrent service calls exceed capacity limits.',
    'Situations where result consistency is more important than comprehensive coverage.'
  ];

  const commonPitfalls = [
    'Poor timeout management leading to slow overall response times due to laggard services.',
    'Inadequate error handling causing complete failures when individual services are unavailable.',
    'Over-reliance on all services succeeding instead of designing for graceful partial failures.',
    'Inconsistent request formats across services making aggregation difficult or error-prone.',
    'Missing service monitoring leading to continued requests to consistently failing endpoints.',
    'Insufficient result validation allowing low-quality responses to pollute aggregated output.'
  ];

  const keyFeatures = [
    'Concurrent service invocation with independent request handling and timeout management',
    'Graceful partial result handling with adaptive aggregation strategies',
    'Service reliability monitoring with circuit breaker patterns and fallback mechanisms',
    'Flexible aggregation logic supporting voting, scoring, and intelligent merging approaches',
    'Comprehensive error handling and retry logic with exponential backoff and jitter',
    'Performance optimization through caching, load balancing, and adaptive request routing'
  ];

  const kpiMetrics = [
    'Service response rate: Percentage of services responding successfully within timeout windows.',
    'Aggregation completeness: Proportion of expected information successfully gathered and merged.',
    'Overall latency: End-to-end response time including slowest service and aggregation overhead.',
    'Service reliability: Individual service uptime and consistent response quality metrics.',
    'Result quality: Accuracy and completeness of aggregated responses vs single-service baselines.',
    'Resource efficiency: Cost and resource utilization compared to sequential service calls.'
  ];

  const tokenUsage = [
    'Token usage scales with service count and individual service complexity.',
    'Request tokens typically consistent across services; response tokens vary by service capability.',
    'Aggregation phase adds 20-40% overhead for result processing and conflict resolution.',
    'Failed services save tokens but may reduce overall result quality and completeness.',
    'Cache hit rates can significantly reduce token usage for repeated or similar queries.',
    'Monitor per-service token efficiency to optimize service selection and request strategies.'
  ];

  const bestUseCases = [
    'Information aggregation from multiple specialized knowledge sources or databases.',
    'Multi-provider comparison and synthesis for comprehensive decision making.',
    'Distributed service orchestration requiring input from independent microservices.',
    'Research and analysis tasks benefiting from diverse perspectives and data sources.',
    'Content enrichment workflows gathering information from various external APIs.',
    'Quality assurance processes using multiple validators or assessment services.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions', url: 'https://www.enterpriseintegrationpatterns.com/patterns/messaging/ScatterGather.html' },
        { title: 'Microservices Patterns: With examples in Java (Richardson, 2018)', url: 'https://microservices.io/patterns/data/scatter-gather.html' },
        { title: 'Building Microservices: Designing Fine-Grained Systems (Newman, 2021)', url: 'https://samnewman.io/books/building_microservices_2nd_edition/' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Spring Integration Scatter-Gather Pattern', url: 'https://docs.spring.io/spring-integration/reference/html/scatter-gather.html' },
        { title: 'Apache Camel Scatter-Gather EIP', url: 'https://camel.apache.org/components/latest/eips/scatter-gather.html' },
        { title: 'AWS Step Functions Parallel State', url: 'https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-parallel-state.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Spring Integration for enterprise messaging patterns', url: '#' },
        { title: 'Apache Camel for integration pattern implementations', url: '#' },
        { title: 'RxJS for reactive scatter-gather operations', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Microservices Community - Service orchestration patterns', url: 'https://microservices.io/community' },
        { title: 'Spring Community - Integration pattern discussions', url: 'https://spring.io/community' },
        { title: 'r/microservices - Scatter-gather implementation strategies', url: 'https://www.reddit.com/r/microservices/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-teal-500/10 to-cyan-500/10"
        borderClass="border-teal-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Scatter-Gather broadcasts requests to multiple independent services concurrently, then aggregates responses 
          into a unified result. This pattern maximizes information coverage and system resilience by leveraging 
          diverse service capabilities while handling partial failures gracefully.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📡</div>
            <div className="text-xs text-gray-400 mb-1">Scatter</div>
            <div className="text-sm font-medium text-white">Broadcast requests</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Concurrency</div>
            <div className="text-sm font-medium text-white">Parallel execution</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📥</div>
            <div className="text-xs text-gray-400 mb-1">Gather</div>
            <div className="text-sm font-medium text-white">Collect responses</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Aggregate</div>
            <div className="text-sm font-medium text-white">Unified result</div>
          </div>
        </div>
      </TechniqueSection>

      {/* Workflow / Steps */}
      <ListSection
        title="Workflow / Steps"
        items={workflowSteps}
        colorClass="bg-purple-500"
        ordered={true}
      />

      {/* Best Practices */}
      <BestPracticesSection practices={bestPractices} />

      {/* When NOT to Use */}
      <ListSection
        title="When NOT to Use"
        items={whenNotToUse}
        colorClass="bg-red-500"
      />

      {/* Common Pitfalls */}
      <ListSection
        title="Common Pitfalls"
        items={commonPitfalls}
        colorClass="bg-amber-500"
      />

      {/* Key Features */}
      <KeyFeaturesSection features={keyFeatures} />

      {/* KPIs / Success Metrics */}
      <ListSection
        title="KPIs / Success Metrics"
        items={kpiMetrics}
        colorClass="bg-emerald-500"
      />

      {/* Token / Resource Usage */}
      <ListSection
        title="Token / Resource Usage"
        items={tokenUsage}
        colorClass="bg-indigo-500"
      />

      {/* Best Use Cases */}
      <ListSection
        title="Best Use Cases"
        items={bestUseCases}
        colorClass="bg-fuchsia-500"
      />

      {/* References & Further Reading */}
      <ReferencesSection categories={references} />
    </>
  );
};

export default ScatterGatherDetails;