import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const geographicRoutingPattern: PatternScenario = {
  id: 'geographic-routing',
  title: 'Geographic Routing Pattern',
  description: 'Demonstrates intelligent request routing based on geographic location, regulatory compliance, and regional optimization requirements',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'User Request\n"Global service access"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Geographic detector
    {
      id: 'geo-detector',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Geographic Detector\nLocation identification' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Analysis components
    {
      id: 'ip-geolocation',
      type: 'default',
      position: { x: 200, y: 180 },
      data: { label: 'IP Geolocation\nLocation mapping' },
      style: { ...nodeStyle, minWidth: 180, background: '#0369a1' }
    },

    {
      id: 'compliance-analyzer',
      type: 'default',
      position: { x: 800, y: 180 },
      data: { label: 'Compliance Analyzer\nRegulatory requirements' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    // Regional analyzers
    {
      id: 'latency-analyzer',
      type: 'default',
      position: { x: 350, y: 320 },
      data: { label: 'Latency Analyzer\nPerformance optimization' },
      style: { ...nodeStyle, minWidth: 180, background: '#db2777' }
    },

    {
      id: 'data-sovereignty',
      type: 'default',
      position: { x: 650, y: 320 },
      data: { label: 'Data Sovereignty\nLegal compliance' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc7b16' }
    },

    // Routing decision engine
    {
      id: 'routing-engine',
      type: 'default',
      position: { x: 500, y: 460 },
      data: { label: 'Routing Decision Engine\nOptimal region selection' },
      style: { ...nodeStyle, minWidth: 220, background: '#059669' }
    },

    // Regional data centers
    {
      id: 'us-east',
      type: 'default',
      position: { x: 100, y: 600 },
      data: { label: 'US East (Virginia)\nLatency: 45ms\nCompliance: US/CCPA' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'us-west',
      type: 'default',
      position: { x: 280, y: 600 },
      data: { label: 'US West (Oregon)\nLatency: 38ms\nCompliance: US/CCPA' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'eu-central',
      type: 'default',
      position: { x: 460, y: 600 },
      data: { label: 'EU Central (Frankfurt)\nLatency: 12ms\nCompliance: GDPR' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'asia-pacific',
      type: 'default',
      position: { x: 640, y: 600 },
      data: { label: 'Asia Pacific (Tokyo)\nLatency: 125ms\nCompliance: Local' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b' }
    },
    {
      id: 'south-america',
      type: 'default',
      position: { x: 820, y: 600 },
      data: { label: 'South America (São Paulo)\nLatency: 180ms\nCompliance: LGPD' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Processing services
    {
      id: 'eu-service',
      type: 'default',
      position: { x: 460, y: 750 },
      data: { label: 'EU Processing Service\nGDPR-compliant pipeline' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'us-service',
      type: 'default',
      position: { x: 190, y: 750 },
      data: { label: 'US Processing Service\nCCPA-compliant pipeline' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '12px' }
    },

    // Supporting systems
    {
      id: 'location-context',
      type: 'default',
      position: { x: 50, y: 320 },
      data: { label: 'Location Context\n• IP: 85.214.132.117\n• Country: Germany\n• City: Frankfurt\n• ISP: Deutsche Telekom\n• Language: DE' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    {
      id: 'regulatory-rules',
      type: 'default',
      position: { x: 950, y: 320 },
      data: { label: 'Regulatory Rules\n• GDPR: EU data residency\n• CCPA: California privacy\n• LGPD: Brazil data protection\n• SOX: US financial compliance\n• PIPEDA: Canada privacy' },
      style: { ...nodeStyle, minWidth: 160, background: '#7c3aed', fontSize: '11px' }
    },

    // Performance metrics
    {
      id: 'cdn-optimizer',
      type: 'default',
      position: { x: 200, y: 460 },
      data: { label: 'CDN Optimizer\nContent delivery routing' },
      style: { ...nodeStyle, minWidth: 160, background: '#db2777' }
    },

    {
      id: 'edge-nodes',
      type: 'default',
      position: { x: 800, y: 460 },
      data: { label: 'Edge Node Selector\nProximity optimization' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    // Result handler
    {
      id: 'result-handler',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Result Handler\nRegion-compliant response' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Monitoring and feedback
    {
      id: 'geo-monitor',
      type: 'default',
      position: { x: 100, y: 180 },
      data: { label: 'Geographic Monitor\nGlobal performance tracking' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Load balancing per region
    {
      id: 'regional-balancer',
      type: 'default',
      position: { x: 300, y: 460 },
      data: { label: 'Regional Load Balancer\nWithin-region distribution' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669' }
    }
  ],

  initialEdges: [
    // Input to detector
    {
      id: 'e-input-detector',
      source: 'input',
      target: 'geo-detector',
      style: edgeStyle
    },

    // Detection components
    {
      id: 'e-detector-ip',
      source: 'geo-detector',
      target: 'ip-geolocation',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },
    {
      id: 'e-detector-compliance',
      source: 'geo-detector',
      target: 'compliance-analyzer',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Analysis to decision components
    {
      id: 'e-detector-latency',
      source: 'geo-detector',
      target: 'latency-analyzer',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-detector-sovereignty',
      source: 'geo-detector',
      target: 'data-sovereignty',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },

    // Context and rules
    {
      id: 'e-context-ip',
      source: 'location-context',
      target: 'ip-geolocation',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-rules-compliance',
      source: 'regulatory-rules',
      target: 'compliance-analyzer',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '3,3' }
    },

    // Analyzers to routing engine
    {
      id: 'e-latency-engine',
      source: 'latency-analyzer',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-sovereignty-engine',
      source: 'data-sovereignty',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },
    {
      id: 'e-compliance-engine',
      source: 'compliance-analyzer',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-ip-engine',
      source: 'ip-geolocation',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },

    // Optimizers to engine
    {
      id: 'e-cdn-engine',
      source: 'cdn-optimizer',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '5,5' }
    },
    {
      id: 'e-edge-engine',
      source: 'edge-nodes',
      target: 'routing-engine',
      style: { ...edgeStyle, stroke: '#dc7b16', strokeDasharray: '5,5' }
    },

    // Regional balancer
    {
      id: 'e-engine-balancer',
      source: 'routing-engine',
      target: 'regional-balancer',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Routing to data centers
    {
      id: 'e-engine-eu',
      source: 'routing-engine',
      target: 'eu-central',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'GDPR Route'
    },
    {
      id: 'e-engine-us-east',
      source: 'routing-engine',
      target: 'us-east',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'US East'
    },
    {
      id: 'e-engine-us-west',
      source: 'routing-engine',
      target: 'us-west',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'US West'
    },

    // Data centers to services
    {
      id: 'e-eu-service',
      source: 'eu-central',
      target: 'eu-service',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-us-service',
      source: 'us-east',
      target: 'us-service',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Services to result
    {
      id: 'e-eu-result',
      source: 'eu-service',
      target: 'result-handler',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-us-result',
      source: 'us-service',
      target: 'result-handler',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Monitoring
    {
      id: 'e-monitor-detector',
      source: 'geo-monitor',
      target: 'geo-detector',
      style: { ...edgeStyle, stroke: '#dc2626', strokeDasharray: '8,8' },
      animated: true
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Global Request Reception',
      description: 'User request arrives at the geographic routing system from an international location.',
      input: 'Incoming request from user in Frankfurt, Germany accessing global service platform.',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Geographic Detection Activation',
      description: 'Initiate geographic analysis to determine optimal routing strategy.',
      input: 'Geographic detection: IP analysis, location mapping, compliance assessment',
      activeNodes: ['input', 'geo-detector'],
      activeEdges: ['e-input-detector']
    },
    {
      id: 'step3',
      title: 'IP Geolocation Analysis',
      description: 'Analyze IP address to determine precise geographic location and network characteristics.',
      input: 'IP geolocation: map IP address to physical location and network provider',
      activeNodes: ['ip-geolocation', 'location-context'],
      activeEdges: ['e-detector-ip', 'e-context-ip'],
      output: 'IP Geolocation Results:\n• IP Address: 85.214.132.117\n• Country: Germany 🇩🇪\n• Region: Hesse\n• City: Frankfurt am Main\n• Coordinates: 50.1109°N, 8.6821°E\n• ISP: Deutsche Telekom AG\n• ASN: AS3320\n• Connection Type: Broadband\n• Time Zone: CET (UTC+1)\n• Language Preference: German (DE)'
    },
    {
      id: 'step4',
      title: 'Regulatory Compliance Assessment',
      description: 'Evaluate regulatory requirements and compliance obligations for the user\'s location.',
      input: 'Compliance analysis: regional data protection laws, privacy requirements, data residency',
      activeNodes: ['compliance-analyzer', 'regulatory-rules'],
      activeEdges: ['e-detector-compliance', 'e-rules-compliance'],
      output: 'Compliance Requirements:\n• **Primary Regulation**: GDPR (General Data Protection Regulation)\n• **Data Residency**: EU/EEA required\n• **Privacy Rights**: Right to erasure, data portability, consent\n• **Processing Basis**: Legitimate interest + explicit consent\n• **Data Transfer**: Adequate protection mechanisms required\n• **Retention**: Maximum 24 months for analytics\n• **Breach Notification**: 72 hours to authorities\n• **Additional**: German BDSG national supplements'
    },
    {
      id: 'step5',
      title: 'Latency Optimization Analysis',
      description: 'Calculate network latency and performance metrics to available regions.',
      input: 'Latency analysis: network path optimization, CDN performance, response times',
      activeNodes: ['latency-analyzer'],
      activeEdges: ['e-detector-latency'],
      output: 'Latency Analysis:\n• **EU Central (Frankfurt)**: 12ms - Optimal\n• **EU West (Dublin)**: 28ms - Good\n• **US East (Virginia)**: 145ms - Acceptable\n• **US West (Oregon)**: 165ms - High\n• **Asia Pacific (Tokyo)**: 235ms - Very High\n• **South America (São Paulo)**: 275ms - Excessive\n\n**Recommendation**: EU Central for optimal performance\n**CDN Edge**: Frankfurt available (8ms additional routing)'
    },
    {
      id: 'step6',
      title: 'Data Sovereignty Evaluation',
      description: 'Assess data sovereignty requirements and cross-border data transfer restrictions.',
      input: 'Data sovereignty: legal jurisdiction, cross-border transfer rules, local storage requirements',
      activeNodes: ['data-sovereignty'],
      activeEdges: ['e-detector-sovereignty'],
      output: 'Data Sovereignty Analysis:\n• **Legal Jurisdiction**: German/EU law applies\n• **Data Localization**: Processing must remain in EU/EEA\n• **Cross-Border Transfers**: \n  - US: Requires Privacy Shield successor or SCCs\n  - Asia: Adequacy decision needed\n  - Other regions: Individual assessment required\n• **Government Access**: EU data protection against foreign surveillance\n• **Enforcement**: German DPA (BfDI) primary authority\n• **Recommendation**: EU-only processing to ensure compliance'
    },
    {
      id: 'step7',
      title: 'CDN and Edge Optimization',
      description: 'Optimize content delivery and edge node selection for performance.',
      input: 'CDN optimization: edge node selection, content caching, delivery path optimization',
      activeNodes: ['cdn-optimizer', 'edge-nodes'],
      activeEdges: ['e-cdn-engine', 'e-edge-engine'],
      output: 'CDN Optimization Results:\n• **Primary Edge**: Frankfurt (DE-FRA) - 8ms\n• **Secondary Edge**: Amsterdam (NL-AMS) - 18ms\n• **Content Cache**: 94% hit ratio available\n• **Bandwidth**: 1Gbps available capacity\n• **SSL Termination**: Local edge SSL offloading\n• **Compression**: Brotli/GZIP enabled\n• **HTTP/3**: Available with QUIC protocol\n• **Image Optimization**: WebP/AVIF format serving'
    },
    {
      id: 'step8',
      title: 'Routing Decision Synthesis',
      description: 'Synthesize all analysis results to make optimal routing decision.',
      input: 'Decision synthesis: combine compliance, latency, sovereignty, and performance factors',
      activeNodes: ['routing-engine'],
      activeEdges: ['e-latency-engine', 'e-sovereignty-engine', 'e-compliance-engine', 'e-ip-engine'],
      output: 'Routing Decision Matrix:\n\n**EU Central (Frankfurt)**: SELECTED ✓\n• Compliance Score: 100% (GDPR native)\n• Latency Score: 100% (12ms optimal)\n• Sovereignty Score: 100% (EU jurisdiction)\n• Capacity Score: 95% (high availability)\n• **Total Score: 98.75%**\n\n**Decision Factors:**\n• Regulatory compliance: Mandatory EU processing\n• Performance: Best latency (12ms vs >140ms others)\n• Data sovereignty: No cross-border transfer issues\n• Edge availability: Frankfurt CDN edge optimal\n• Load capacity: 95% available resources'
    },
    {
      id: 'step9',
      title: 'Regional Load Balancing',
      description: 'Apply regional load balancing within the selected geographic region.',
      input: 'Regional balancing: distribute load across EU data centers and availability zones',
      activeNodes: ['regional-balancer'],
      activeEdges: ['e-engine-balancer'],
      output: 'Regional Load Balancing:\n• **Primary**: EU-Central-1a (Frankfurt) - 70% load\n• **Secondary**: EU-Central-1b (Frankfurt) - 20% load\n• **Failover**: EU-West-1a (Dublin) - 10% standby\n• **Health Status**: All zones healthy\n• **Auto-scaling**: Enabled with 2-minute scale-out\n• **Cross-AZ Latency**: <1ms between zones\n• **Data Replication**: Synchronous across primary zones'
    },
    {
      id: 'step10',
      title: 'EU Data Center Deployment',
      description: 'Route request to EU Central data center for GDPR-compliant processing.',
      input: 'EU deployment: GDPR-compliant processing pipeline in Frankfurt data center',
      activeNodes: ['eu-central'],
      activeEdges: ['e-engine-eu'],
      output: 'EU Data Center Activation:\n• **Location**: Frankfurt am Main, Germany\n• **Facility**: Tier III+ certified data center\n• **Compliance**: GDPR, ISO 27001, SOC 2 Type II\n• **Network**: 100Gbps redundant connectivity\n• **Power**: 99.995% uptime SLA\n• **Security**: Biometric access, 24/7 monitoring\n• **Data Residency**: Certified EU-only processing\n• **Encryption**: AES-256 at rest, TLS 1.3 in transit'
    },
    {
      id: 'step11',
      title: 'GDPR-Compliant Processing',
      description: 'Execute request processing using GDPR-compliant service pipeline.',
      input: 'GDPR processing: privacy-by-design service execution with data protection controls',
      activeNodes: ['eu-service'],
      activeEdges: ['e-eu-service'],
      output: 'GDPR Processing Pipeline:\n• **Data Minimization**: Only required fields processed\n• **Purpose Limitation**: Processing aligned with stated purpose\n• **Consent Management**: Valid consent verified and recorded\n• **Data Subject Rights**: Rights management system active\n• **Audit Logging**: All processing activities logged\n• **Anonymization**: PII anonymized where possible\n• **Retention Controls**: Automatic deletion after retention period\n• **Breach Detection**: Real-time monitoring for data breaches\n• **DPO Oversight**: Data Protection Officer approval obtained'
    },
    {
      id: 'step12',
      title: 'Compliant Response Delivery',
      description: 'Return processed results through compliant response handling system.',
      activeNodes: ['result-handler', 'geo-monitor'],
      activeEdges: ['e-eu-result', 'e-monitor-detector'],
      output: 'Geographic Routing Complete:\n\n**Routing Summary:**\n• **Selected Region**: EU Central (Frankfurt, Germany)\n• **Compliance**: GDPR fully compliant ✓\n• **Performance**: 12ms latency (target: <50ms) ✓\n• **Data Sovereignty**: EU jurisdiction maintained ✓\n• **Security**: End-to-end encrypted processing ✓\n\n**Processing Metrics:**\n• **Total Response Time**: 89ms\n  - Geographic detection: 15ms\n  - Compliance analysis: 23ms\n  - Routing decision: 8ms\n  - EU processing: 31ms\n  - Response delivery: 12ms\n\n**Compliance Verification:**\n• ✓ GDPR Article 6 (lawful basis established)\n• ✓ GDPR Article 13 (transparency provided)\n• ✓ GDPR Article 25 (privacy by design implemented)\n• ✓ GDPR Article 32 (security measures applied)\n• ✓ Data residency maintained within EU\n• ✓ No unauthorized cross-border transfers\n\n**Performance Optimization:**\n• CDN edge utilization: 94% cache hit rate\n• Regional load balancing: 98% efficiency\n• Network path optimization: 87% improvement vs direct routing\n• Cost efficiency: €0.12 per request (15% below target)\n\n*Geographic routing achieved optimal compliance and performance for EU user*'
    }
  ]
};