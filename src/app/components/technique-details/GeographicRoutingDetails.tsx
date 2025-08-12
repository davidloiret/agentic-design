'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface GeographicRoutingDetailsProps {
  selectedTechnique: any;
}

export const GeographicRoutingDetails: React.FC<GeographicRoutingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Identify client geographical location using IP geolocation, GPS data, or declared location preferences.',
    'Evaluate available service instances and their geographic distribution, latency characteristics, and compliance zones.',
    'Apply geographic routing policies considering latency optimization, data residency requirements, and regulatory constraints.',
    'Route requests to geographically optimal service instances while respecting compliance and legal boundaries.',
    'Monitor cross-region performance and adjust routing policies based on network conditions and service availability.',
    'Implement failover mechanisms for geographic disasters and regional service outages.'
  ];

  const bestPractices = [
    'Combine multiple geolocation sources for accuracy: IP databases, CDN edge location data, and user preferences.',
    'Design routing policies that balance latency optimization with compliance and data sovereignty requirements.',
    'Implement intelligent failover across regions while maintaining regulatory compliance and data protection.',
    'Use edge computing and CDN integration to minimize geographic distance and network latency.',
    'Monitor network performance and topology changes to optimize routing decisions dynamically.',
    'Cache geographic routing decisions to reduce lookup overhead while maintaining accuracy.',
    'Design for regulatory compliance with GDPR, data residency laws, and cross-border data transfer restrictions.'
  ];

  const whenNotToUse = [
    'Applications serving primarily local or single-region user bases where geographic distribution is unnecessary.',
    'Simple internal systems without regulatory compliance requirements or latency optimization needs.',
    'Development environments where geographic complexity exceeds testing and maintenance capabilities.',
    'Cost-sensitive scenarios where multi-region deployment and geographic routing exceed budget constraints.',
    'Applications with strict data locality requirements that conflict with dynamic geographic routing.'
  ];

  const commonPitfalls = [
    'Inaccurate geolocation leading to suboptimal routing and poor user experience.',
    'Ignoring regulatory compliance requirements causing data sovereignty and privacy violations.',
    'Poor failover policies that route traffic to non-compliant regions during outages.',
    'Inadequate monitoring of cross-region network performance and routing effectiveness.',
    'Over-complex geographic policies that become difficult to maintain and troubleshoot.',
    'Missing consideration of network topology and CDN integration affecting actual performance.'
  ];

  const keyFeatures = [
    'Multi-source geolocation with IP databases, CDN data, and user preference integration',
    'Compliance-aware routing respecting data residency laws and regulatory boundaries',
    'Latency-optimized service selection with real-time network performance monitoring',
    'Regional failover mechanisms with disaster recovery and business continuity support',
    'Edge computing integration for optimal geographic distribution and performance',
    'Dynamic routing adjustment based on network conditions and service availability changes'
  ];

  const kpiMetrics = [
    'Latency reduction: Response time improvement achieved through geographic optimization.',
    'Geolocation accuracy: Precision of client location identification and service region selection.',
    'Compliance adherence: Success rate of maintaining data residency and regulatory requirements.',
    'Failover effectiveness: Recovery time and success rate during regional outages or disasters.',
    'Regional load distribution: Balance of traffic across geographic regions and service instances.',
    'Network performance correlation: Relationship between routing decisions and actual user experience.'
  ];

  const tokenUsage = [
    'Token usage primarily from routed services; geographic routing adds minimal overhead.',
    'Geolocation and routing decision logic typically uses minimal tokens for analysis.',
    'Compliance checking and regulatory assessment may require moderate token usage for complex policies.',
    'Monitor token costs across regions to optimize routing for both performance and cost effectiveness.',
    'Cache geographic routing decisions to minimize repeated geolocation and policy evaluation overhead.',
    'Consider regional pricing differences when optimizing token usage across geographic service instances.'
  ];

  const bestUseCases = [
    'Global web applications requiring latency optimization and regulatory compliance across regions.',
    'Content delivery networks optimizing traffic routing to edge servers and regional origins.',
    'Financial services managing data residency requirements and cross-border transaction compliance.',
    'E-commerce platforms optimizing checkout and payment processing for local regulations.',
    'Healthcare applications managing patient data privacy and regional compliance requirements.',
    'Gaming platforms optimizing server selection for latency and regional player matching.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Geographic Load Balancing for Scalable Distributed Web Systems (Wendell & Freedman, 2011)', url: 'https://www.cs.princeton.edu/~mfreed/docs/geo-nsdi11.pdf' },
        { title: 'Latency-Based Routing in Software Defined Networks (Wang et al., 2016)', url: 'https://ieeexplore.ieee.org/document/7524398' },
        { title: 'Geographic Routing Protocols for Wireless Sensor Networks (Karp & Kung, 2000)', url: 'https://dl.acm.org/doi/10.1145/345910.345953' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'AWS Route 53 Geolocation Routing Policy', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-geo' },
        { title: 'Cloudflare Geographic Load Balancing', url: 'https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/' },
        { title: 'Google Cloud Load Balancing Geographic Distribution', url: 'https://cloud.google.com/load-balancing/docs/backend-service' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'MaxMind GeoIP databases for accurate geolocation', url: '#' },
        { title: 'Cloudflare Workers for edge-based geographic routing', url: '#' },
        { title: 'AWS Route 53 for DNS-based geographic routing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Cloudflare Community - Geographic routing and edge computing', url: 'https://community.cloudflare.com/' },
        { title: 'AWS Community - Global application architecture patterns', url: 'https://aws.amazon.com/developer/community/' },
        { title: 'r/networking - Geographic routing and CDN optimization', url: 'https://www.reddit.com/r/networking/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-green-500/10 to-emerald-500/10"
        borderClass="border-green-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Geographic Routing directs requests to service instances based on client location and geographic policies. 
          This pattern optimizes latency, ensures regulatory compliance, and provides disaster resilience through 
          intelligent regional service selection and failover mechanisms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-xs text-gray-400 mb-1">Locate</div>
            <div className="text-sm font-medium text-white">Client geography</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-xs text-gray-400 mb-1">Map</div>
            <div className="text-sm font-medium text-white">Service regions</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="text-xs text-gray-400 mb-1">Optimize</div>
            <div className="text-sm font-medium text-white">Latency & compliance</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔀</div>
            <div className="text-xs text-gray-400 mb-1">Route</div>
            <div className="text-sm font-medium text-white">Regional service</div>
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

export default GeographicRoutingDetails;