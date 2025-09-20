import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const zeroTrustAgentArchitecturePattern: PatternScenario = {
  id: 'zero-trust-agent-architecture',
  title: 'Zero-Trust Agent Architecture',
  description: 'Security architecture where no agent or component is trusted by default, requiring continuous verification and validation of all interactions and operations',
  initialNodes: [
    // Enterprise AI system scenario
    {
      id: 'enterprise-ai-system',
      position: { x: 400, y: 50 },
      data: { label: '🏢 Enterprise AI System\n"HR Agent + Finance Agent + Legal Agent\nProcessing sensitive employee data\nand confidential business operations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Agent interaction request
    {
      id: 'agent-interaction',
      position: { x: 400, y: 200 },
      data: { label: '🤝 Agent Interaction Request\n"HR Agent requests salary data\nfrom Finance Agent to process\npromotion recommendations"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Traditional trust model
    {
      id: 'traditional-trust',
      position: { x: 150, y: 350 },
      data: { label: '🤝 Traditional Trust Model\n"Agents trusted by default\nNetwork perimeter security\nAssumed internal safety"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'direct-access',
      position: { x: 150, y: 500 },
      data: { label: '🔓 Direct Data Access\n"HR Agent gets full access\nto Finance database\nNo verification required"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'breach-propagation',
      position: { x: 150, y: 650 },
      data: { label: '🚨 Compromise Propagation\n"If HR Agent compromised,\nentire Finance system exposed\nLateral movement enabled"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Zero-trust architecture
    {
      id: 'zero-trust-architecture',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Zero-Trust Architecture\n"Never trust, always verify\nContinuous authentication\nPrinciple of least privilege"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    {
      id: 'identity-verification',
      position: { x: 650, y: 500 },
      data: { label: '🔍 Identity Verification\n"HR Agent identity confirmed\nRequest purpose validated\nAccess scope determined"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'minimal-access',
      position: { x: 650, y: 650 },
      data: { label: '🔐 Minimal Access Granted\n"Only salary ranges provided\nNo raw employee data\nTime-limited access token"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    {
      id: 'continuous-monitoring',
      position: { x: 650, y: 800 },
      data: { label: '📊 Continuous Monitoring\n"All interactions logged\nAnomalous behavior detected\nReal-time security posture"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Key zero-trust principle
    {
      id: 'zero-trust-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Zero-Trust Principle\n"Trust nothing, verify everything\nAssume breach has occurred\nLimit blast radius through isolation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Enterprise system has agent interaction
    {
      id: 'e1',
      source: 'enterprise-ai-system',
      target: 'agent-interaction',
      ...edgeStyle,
      label: 'requires data sharing'
    },

    // Split into traditional vs zero-trust approaches
    {
      id: 'e2',
      source: 'agent-interaction',
      target: 'traditional-trust',
      ...edgeStyle,
      label: 'traditional approach'
    },
    {
      id: 'e3',
      source: 'agent-interaction',
      target: 'zero-trust-architecture',
      ...edgeStyle,
      label: 'zero-trust approach'
    },

    // Left path: Traditional trust vulnerabilities
    {
      id: 'e4',
      source: 'traditional-trust',
      target: 'direct-access',
      ...edgeStyle,
      label: 'grants broad permissions'
    },
    {
      id: 'e5',
      source: 'direct-access',
      target: 'breach-propagation',
      ...edgeStyle,
      label: 'enables lateral movement',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Zero-trust security flow
    {
      id: 'e6',
      source: 'zero-trust-architecture',
      target: 'identity-verification',
      ...edgeStyle,
      label: 'verify identity & intent'
    },
    {
      id: 'e7',
      source: 'identity-verification',
      target: 'minimal-access',
      ...edgeStyle,
      label: 'grant least privilege'
    },
    {
      id: 'e8',
      source: 'minimal-access',
      target: 'continuous-monitoring',
      ...edgeStyle,
      label: 'monitor all activity'
    },

    // Converge to zero-trust principle
    {
      id: 'e9',
      source: 'breach-propagation',
      target: 'zero-trust-principle',
      ...edgeStyle,
      label: 'demonstrates risk',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'continuous-monitoring',
      target: 'zero-trust-principle',
      ...edgeStyle,
      label: 'enables security',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Enterprise AI System with Sensitive Data",
      description: "Multi-agent system (HR + Finance + Legal) processing confidential employee data and business operations, requiring secure inter-agent communication.",
      activeNodes: ['enterprise-ai-system'],
      activeEdges: []
    },
    {
      title: "Agent Data Sharing Request",
      description: "HR Agent needs salary data from Finance Agent to process promotion recommendations, creating need for secure cross-agent data access.",
      activeNodes: ['agent-interaction'],
      activeEdges: ['e1']
    },
    {
      title: "Two Security Architectures: Traditional vs Zero-Trust",
      description: "Same data request processed through traditional trust model (left) with perimeter security vs zero-trust architecture (right) with continuous verification.",
      activeNodes: ['traditional-trust', 'zero-trust-architecture'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Traditional Trust: Broad Access and Vulnerability",
      description: "Traditional model grants HR Agent direct database access based on network trust, but if compromised, entire Finance system becomes exposed to lateral movement.",
      activeNodes: ['direct-access', 'breach-propagation'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Zero-Trust: Identity Verification and Minimal Access",
      description: "Zero-trust architecture verifies HR Agent identity, validates request purpose, and grants only minimal necessary access (salary ranges, not raw data).",
      activeNodes: ['identity-verification', 'minimal-access'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Continuous Monitoring and Core Principle",
      description: "All interactions logged and monitored for anomalies, demonstrating zero-trust principle: trust nothing, verify everything, assume breach, limit blast radius.",
      activeNodes: ['continuous-monitoring', 'zero-trust-principle'],
      activeEdges: ['e8', 'e9', 'e10']
    }
  ]
};