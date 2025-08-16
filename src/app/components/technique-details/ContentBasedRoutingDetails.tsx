'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './shared/BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './shared/KeyFeaturesSection';
import ReferencesSection from './shared/ReferencesSection';

interface ContentBasedRoutingDetailsProps {
  selectedTechnique: any;
}

export const ContentBasedRoutingDetails: React.FC<ContentBasedRoutingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Analyze incoming content to extract key features: topic, complexity, language, format, and domain.',
    'Apply content classification using rule-based systems, ML models, or LLM-based categorization.',
    'Match content characteristics against available service capabilities and specializations.',
    'Route requests to the most appropriate service based on content analysis and routing policies.',
    'Monitor routing decisions and service performance to optimize matching algorithms.',
    'Implement fallback routing for edge cases and content types not covered by primary routing rules.'
  ];

  const bestPractices = [
    'Use multi-level routing: fast rule-based filtering followed by more sophisticated ML-based classification.',
    'Implement content preprocessing to normalize inputs and extract consistent features for routing.',
    'Design routing policies with clear priorities and fallback mechanisms for ambiguous content.',
    'Cache routing decisions for similar content to improve performance and consistency.',
    'Monitor content distribution across services to identify imbalances and routing inefficiencies.',
    'Implement A/B testing for routing strategies to optimize performance and user satisfaction.',
    'Use feature extraction techniques that are robust to content variations and edge cases.'
  ];

  const whenNotToUse = [
    'Homogeneous services where routing provides no benefit and adds unnecessary complexity.',
    'Simple applications with clear functional boundaries that don\'t require content analysis.',
    'Real-time systems where content analysis overhead significantly impacts response times.',
    'Cases where content characteristics don\'t align with meaningful service differentiation.',
    'Resource-constrained environments where routing complexity exceeds available computational budget.'
  ];

  const commonPitfalls = [
    'Over-complex routing logic that becomes harder to maintain and debug than the services themselves.',
    'Inconsistent content classification leading to unpredictable routing and user experience degradation.',
    'Poor fallback handling for content that doesn\'t match any routing rules clearly.',
    'Routing bottlenecks when content analysis becomes a performance constraint for the entire system.',
    'Insufficient monitoring of routing quality and service performance after routing decisions.',
    'Content feature extraction that is too brittle and fails on real-world content variations.'
  ];

  const keyFeatures = [
    'Intelligent content analysis with feature extraction and classification capabilities',
    'Dynamic service matching based on content characteristics and service specializations',
    'Multi-tier routing with rule-based filters and ML-powered classification systems',
    'Performance monitoring and optimization with routing decision tracking and analysis',
    'Robust fallback mechanisms for handling edge cases and unclassifiable content',
    'Adaptive routing strategies with A/B testing and continuous improvement capabilities'
  ];

  const kpiMetrics = [
    'Routing accuracy: Percentage of requests routed to optimal services based on content analysis.',
    'Content classification confidence: Average confidence scores for content categorization decisions.',
    'Service utilization balance: Distribution of requests across services relative to their capabilities.',
    'Routing latency overhead: Time added by content analysis and routing decision processes.',
    'Fallback activation rate: Frequency of fallback routing due to classification failures or edge cases.',
    'User satisfaction correlation: Relationship between routing decisions and user experience metrics.'
  ];

  const tokenUsage = [
    'Token usage varies by content analysis depth: simple rule-based routing uses minimal tokens.',
    'LLM-based content classification adds 50-200 tokens per routing decision for analysis.',
    'Batch content analysis can reduce per-item token costs through efficient prompt engineering.',
    'Caching content features and routing decisions significantly reduces redundant token usage.',
    'Monitor routing token costs vs service efficiency gains to optimize analysis depth.',
    'Use lightweight models for initial filtering and reserve advanced analysis for complex cases.'
  ];

  const bestUseCases = [
    'Multi-domain applications requiring specialized services for different content types.',
    'Content management systems routing documents to appropriate processing pipelines.',
    'Customer service platforms directing inquiries to specialized agents or automated systems.',
    'API gateways routing requests to backend services based on payload content and context.',
    'Educational platforms routing learning materials to appropriate difficulty and topic-specific services.',
    'Media processing workflows directing content to specialized analysis and transformation services.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Content-Based Routing in Information-Centric Networks (Zhang et al., 2018)', url: 'https://ieeexplore.ieee.org/document/8425348' },
        { title: 'Machine Learning Approaches to Content-Based Routing (Johnson & Smith, 2020)', url: 'https://arxiv.org/abs/2003.12456' },
        { title: 'Adaptive Content Classification for Dynamic Service Routing (Chen et al., 2021)', url: 'https://dl.acm.org/doi/10.1145/3447548.3467234' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Apache Camel Content-Based Router Pattern', url: 'https://camel.apache.org/components/latest/eips/content-based-router-eip.html' },
        { title: 'Spring Integration Content-Based Routing', url: 'https://docs.spring.io/spring-integration/reference/html/router.html' },
        { title: 'Kong API Gateway Content-Based Routing', url: 'https://docs.konghq.com/gateway/latest/reference/expressions-language/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Apache Camel for enterprise integration patterns', url: '#' },
        { title: 'NGINX for content-based load balancing', url: '#' },
        { title: 'scikit-learn for content classification models', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Apache Camel Community - Routing pattern discussions', url: 'https://camel.apache.org/community/' },
        { title: 'Stack Overflow - Content-based routing implementations', url: 'https://stackoverflow.com/questions/tagged/content-based-routing' },
        { title: 'r/MachineLearning - Content classification for routing', url: 'https://www.reddit.com/r/MachineLearning/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-cyan-500/10 to-blue-500/10"
        borderClass="border-cyan-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Content-Based Routing analyzes incoming content characteristics (topic, complexity, format) and dynamically 
          routes requests to the most appropriate specialized service. This pattern optimizes resource utilization and 
          service quality by matching content needs with service capabilities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-xs text-gray-400 mb-1">Analyze</div>
            <div className="text-sm font-medium text-white">Content features</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🏷️</div>
            <div className="text-xs text-gray-400 mb-1">Classify</div>
            <div className="text-sm font-medium text-white">Content categories</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Match</div>
            <div className="text-sm font-medium text-white">Service capabilities</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔀</div>
            <div className="text-xs text-gray-400 mb-1">Route</div>
            <div className="text-sm font-medium text-white">Optimal service</div>
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

export default ContentBasedRoutingDetails;