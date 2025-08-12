'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface LoadBalancingDetailsProps {
  selectedTechnique: any;
}

export const LoadBalancingDetails: React.FC<LoadBalancingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Monitor service health, capacity, and current load across all available service instances.',
    'Apply load balancing algorithm: round-robin, weighted round-robin, least connections, or adaptive strategies.',
    'Route incoming requests to selected service instances based on balancing algorithm and health status.',
    'Track service response times, success rates, and resource utilization for dynamic weight adjustment.',
    'Implement circuit breaking and failover mechanisms for handling service outages and degradation.',
    'Continuously optimize load distribution based on performance metrics and service capacity changes.'
  ];

  const bestPractices = [
    'Use health checks and service discovery to maintain accurate service availability information.',
    'Implement sticky sessions where required while maintaining load distribution effectiveness.',
    'Apply appropriate algorithms: round-robin for equal capacity, weighted for heterogeneous services.',
    'Monitor service capacity and auto-scale instances based on load patterns and performance metrics.',
    'Implement graceful degradation with circuit breakers to prevent cascading failures.',
    'Use connection pooling and keep-alive connections to optimize resource utilization.',
    'Design load balancing strategies that account for both current load and predictive capacity planning.'
  ];

  const whenNotToUse = [
    'Single-instance applications where load distribution is not applicable or beneficial.',
    'Development environments where the overhead of load balancing exceeds the benefits.',
    'Stateful applications with strong session affinity requirements that conflict with load distribution.',
    'Simple internal services with predictable, low-volume traffic patterns.',
    'Legacy systems that cannot be easily modified to support load balancing architectures.'
  ];

  const commonPitfalls = [
    'Poor health check implementation causing routing to unhealthy or overloaded instances.',
    'Inappropriate load balancing algorithms that don\'t match service characteristics and capacity.',
    'Missing session affinity management leading to inconsistent user experiences.',
    'Inadequate monitoring of load distribution effectiveness and service performance impact.',
    'Load balancer becoming a single point of failure without proper redundancy and failover.',
    'Ignoring service warm-up time causing poor performance for newly started instances.'
  ];

  const keyFeatures = [
    'Multiple load balancing algorithms optimized for different service characteristics and requirements',
    'Real-time health monitoring and service discovery with automatic instance management',
    'Dynamic weight adjustment based on service performance and capacity metrics',
    'Session affinity and sticky session support for stateful application requirements',
    'Circuit breaking and failover mechanisms for robust handling of service failures',
    'Performance monitoring and optimization with load distribution analytics and reporting'
  ];

  const kpiMetrics = [
    'Request distribution balance: Variance in request volume across service instances.',
    'Response time improvement: Latency reduction achieved through optimal load distribution.',
    'Service availability: Uptime and reliability improvements from failover and redundancy.',
    'Resource utilization efficiency: Optimal use of compute resources across service instances.',
    'Throughput increase: Requests per second improvement from effective load balancing.',
    'Failover success rate: Effectiveness of automatic failover and recovery mechanisms.'
  ];

  const tokenUsage = [
    'Load balancing itself uses minimal tokens; primary usage comes from the balanced services.',
    'Health check implementations may use tokens for service capability assessment.',
    'Intelligent load balancing with LLM-based routing decisions adds analysis token overhead.',
    'Monitor token distribution across balanced services to identify usage patterns and optimization opportunities.',
    'Implement token-aware load balancing to optimize costs across different service pricing models.',
    'Cache load balancing decisions to reduce computational overhead and improve response times.'
  ];

  const bestUseCases = [
    'High-traffic web applications requiring horizontal scaling and fault tolerance.',
    'API gateways distributing requests across multiple backend service instances.',
    'Microservice architectures needing intelligent traffic distribution and service mesh management.',
    'Database connection pooling and query distribution across replica instances.',
    'Content delivery networks optimizing traffic routing to edge servers and origins.',
    'AI service orchestration balancing workloads across different model instances and capabilities.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Load Balancing in Distributed Systems: A Survey (Alakeel, 2010)', url: 'https://www.ijcsns.org/07_book/201005/20100503.pdf' },
        { title: 'Adaptive Load Balancing Algorithms for Cloud Computing (Randles et al., 2010)', url: 'https://ieeexplore.ieee.org/document/5634086' },
        { title: 'Modern Load Balancing and Service Discovery (Brewer & Wilkes, 2017)', url: 'https://dl.acm.org/doi/10.1145/3055518.3055528' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'NGINX Load Balancing Documentation', url: 'https://nginx.org/en/docs/http/load_balancing.html' },
        { title: 'HAProxy Configuration and Load Balancing', url: 'https://www.haproxy.com/documentation/hapee/latest/load-balancing/' },
        { title: 'AWS Application Load Balancer User Guide', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'NGINX for HTTP load balancing and reverse proxy', url: '#' },
        { title: 'HAProxy for high-availability load balancing', url: '#' },
        { title: 'Envoy proxy for service mesh load balancing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'NGINX Community - Load balancing best practices', url: 'https://www.nginx.com/community/' },
        { title: 'HAProxy Community - High availability discussions', url: 'https://www.haproxy.com/community/' },
        { title: 'r/devops - Load balancing architecture patterns', url: 'https://www.reddit.com/r/devops/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-emerald-500/10 to-teal-500/10"
        borderClass="border-emerald-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Load Balancing distributes incoming requests across multiple service instances to optimize resource utilization, 
          maximize throughput, minimize response times, and ensure high availability through redundancy and failover mechanisms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xs text-gray-400 mb-1">Monitor</div>
            <div className="text-sm font-medium text-white">Service health</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="text-xs text-gray-400 mb-1">Balance</div>
            <div className="text-sm font-medium text-white">Request distribution</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔀</div>
            <div className="text-xs text-gray-400 mb-1">Route</div>
            <div className="text-sm font-medium text-white">Optimal instance</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Optimize</div>
            <div className="text-sm font-medium text-white">Performance metrics</div>
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

export default LoadBalancingDetails;