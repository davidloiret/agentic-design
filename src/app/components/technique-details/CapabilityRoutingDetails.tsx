'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface CapabilityRoutingDetailsProps {
  selectedTechnique: any;
}

export const CapabilityRoutingDetails: React.FC<CapabilityRoutingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Analyze request requirements to identify needed capabilities: reasoning, knowledge domains, computational resources.',
    'Evaluate available services and their declared capabilities, performance characteristics, and current availability.',
    'Apply capability matching algorithms considering both functional requirements and quality constraints.',
    'Route requests to services with the best capability-requirement fit based on scoring and ranking systems.',
    'Monitor service performance and capability delivery to update routing decisions and service profiles.',
    'Implement dynamic capability discovery and service registration for evolving system architectures.'
  ];

  const bestPractices = [
    'Maintain detailed service capability registries with regular updates and health checks.',
    'Use multi-dimensional capability scoring considering accuracy, speed, cost, and reliability factors.',
    'Implement capability-aware load balancing to optimize both utilization and service quality.',
    'Design graceful degradation strategies when ideal capability matches are unavailable.',
    'Cache capability assessments and routing decisions for frequently requested capability profiles.',
    'Monitor capability drift where service performance changes over time affecting routing decisions.',
    'Use service mesh patterns for dynamic capability discovery and routing rule management.'
  ];

  const whenNotToUse = [
    'Homogeneous service environments where all services have equivalent capabilities.',
    'Simple systems with clear functional boundaries that don\'t require capability analysis.',
    'High-frequency, low-latency scenarios where capability evaluation overhead is prohibitive.',
    'Static architectures where service capabilities don\'t change and can be hardcoded.',
    'Resource-constrained environments where capability management complexity exceeds benefits.'
  ];

  const commonPitfalls = [
    'Stale capability information leading to routing to services that no longer support required functions.',
    'Over-complex capability modeling that becomes difficult to maintain and reason about.',
    'Poor capability matching algorithms that don\'t account for real-world service performance variations.',
    'Missing fallback mechanisms when no service adequately matches the required capability profile.',
    'Inadequate monitoring of capability-based routing effectiveness and service satisfaction.',
    'Capability registry bottlenecks when the registry becomes a single point of failure.'
  ];

  const keyFeatures = [
    'Dynamic service capability discovery and registry management with real-time updates',
    'Multi-dimensional capability matching considering functional and non-functional requirements',
    'Performance-aware routing that adapts to service capability delivery and quality metrics',
    'Graceful degradation with fallback routing when ideal capability matches are unavailable',
    'Service health monitoring and capability drift detection for maintaining routing accuracy',
    'Flexible capability modeling supporting complex service characteristics and constraints'
  ];

  const kpiMetrics = [
    'Capability match accuracy: Percentage of requests routed to services meeting all capability requirements.',
    'Service utilization efficiency: Optimal distribution of requests across services based on capabilities.',
    'Response quality correlation: Relationship between capability matching and actual service performance.',
    'Capability registry freshness: Time lag between capability changes and registry updates.',
    'Fallback activation rate: Frequency of degraded routing due to capability unavailability.',
    'Routing decision latency: Time required for capability analysis and service selection.'
  ];

  const tokenUsage = [
    'Token usage depends on capability analysis complexity: simple rule-based matching uses minimal tokens.',
    'LLM-based capability assessment adds 100-300 tokens for complex requirement analysis.',
    'Service capability profiling requires periodic token investment for maintaining accurate registries.',
    'Caching capability assessments and routing patterns significantly reduces redundant token usage.',
    'Monitor capability analysis token costs vs improved service selection effectiveness.',
    'Use hierarchical capability models to optimize analysis depth based on request complexity.'
  ];

  const bestUseCases = [
    'AI service orchestration requiring different model capabilities for various reasoning tasks.',
    'Cloud resource management routing workloads to instances with appropriate computational capabilities.',
    'Expert system routing queries to specialists based on knowledge domain and expertise levels.',
    'Microservice architectures with heterogeneous services requiring intelligent request distribution.',
    'Multi-tenant systems routing requests to services with appropriate security and compliance capabilities.',
    'Edge computing scenarios routing tasks to nodes with required processing and storage capabilities.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Capability-Based Service Selection in Service-Oriented Architectures (Liu et al., 2019)', url: 'https://ieeexplore.ieee.org/document/8671234' },
        { title: 'Dynamic Service Capability Management in Cloud Environments (Wang & Chen, 2020)', url: 'https://dl.acm.org/doi/10.1145/3375633.3375648' },
        { title: 'AI Service Orchestration Through Capability-Aware Routing (Rodriguez et al., 2022)', url: 'https://arxiv.org/abs/2205.14892' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Kubernetes Service Discovery and Capability-Based Routing', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
        { title: 'Istio Service Mesh Capability-Aware Traffic Management', url: 'https://istio.io/latest/docs/concepts/traffic-management/' },
        { title: 'NGINX Plus Dynamic Service Discovery and Routing', url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/dynamic-configuration-api/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Istio service mesh for capability-aware routing', url: '#' },
        { title: 'Consul for service discovery and capability registry', url: '#' },
        { title: 'Envoy proxy for advanced routing and load balancing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Kubernetes Community - Service routing and discovery patterns', url: 'https://kubernetes.io/community/' },
        { title: 'Istio Community - Traffic management and capability routing', url: 'https://istio.io/latest/about/community/' },
        { title: 'r/microservices - Capability-based service selection', url: 'https://www.reddit.com/r/microservices/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-purple-500/10 to-indigo-500/10"
        borderClass="border-purple-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Capability-Based Routing analyzes service capabilities and matches them against request requirements to 
          optimize service selection. This pattern enables intelligent workload distribution based on functional 
          capabilities, performance characteristics, and resource constraints.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Analyze</div>
            <div className="text-sm font-medium text-white">Request requirements</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xs text-gray-400 mb-1">Evaluate</div>
            <div className="text-sm font-medium text-white">Service capabilities</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="text-xs text-gray-400 mb-1">Match</div>
            <div className="text-sm font-medium text-white">Best fit scoring</div>
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

export default CapabilityRoutingDetails;