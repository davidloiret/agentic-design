import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const localDistantAgentDataProtectionPattern: PatternScenario = {
  id: 'local-distant-agent-data-protection',
  title: 'Local-Distant Agent Data Protection Pattern',
  description: 'Distributed agentic architecture combining local processing agents with distant aggregation agents using advanced anonymization techniques for privacy-preserving AI',
  initialNodes: [
    // Healthcare AI network scenario
    {
      id: 'healthcare-ai-network',
      position: { x: 400, y: 50 },
      data: { label: '🏥 Healthcare AI Network\n"1000+ hospitals want to collaborate\non cancer treatment AI without\nsharing patient data"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Privacy vs collaboration challenge
    {
      id: 'privacy-collaboration-challenge',
      position: { x: 400, y: 200 },
      data: { label: '⚖️ Privacy vs Collaboration Dilemma\n"Need aggregated insights from\nall hospitals but cannot share\nraw patient data"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Left path: Centralized data sharing (violates privacy)
    {
      id: 'centralized-sharing',
      position: { x: 150, y: 350 },
      data: { label: '❌ Centralized Data Sharing\n"All hospitals send patient data\nto central AI training system\n(Privacy violation)"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'privacy-violations',
      position: { x: 150, y: 500 },
      data: { label: '🚨 Massive Privacy Violations\n"1M+ patient records exposed\nHIPAA compliance lost\nRegulatory investigations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'legal-consequences',
      position: { x: 150, y: 650 },
      data: { label: '⚖️ Legal Consequences\n"$500M in fines\nLawsuits from patients\nCollaboration project shut down"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Local-distant agent architecture
    {
      id: 'local-distant-architecture',
      position: { x: 650, y: 350 },
      data: { label: '🏗️ Local-Distant Architecture\n"Distributed agent system:\n• Local processing agents\n• Advanced anonymization\n• Distant aggregation agents"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 250 },
    },

    // Local processing agents
    {
      id: 'local-processing-agents',
      position: { x: 500, y: 500 },
      data: { label: '📱 Local Processing Agents\n"At each hospital:\n• Process raw patient data\n• Extract statistical patterns\n• Apply differential privacy"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Anonymization layer
    {
      id: 'anonymization-layer',
      position: { x: 650, y: 500 },
      data: { label: '🔒 Advanced Anonymization\n"Multi-technique protection:\n• K-anonymity (k=10)\n• Differential privacy (ε=0.1)\n• Homomorphic encryption"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Distant aggregation agents
    {
      id: 'distant-aggregation-agents',
      position: { x: 800, y: 500 },
      data: { label: '🌐 Distant Aggregation Agents\n"Cloud-based agents:\n• Receive anonymized patterns\n• Aggregate across hospitals\n• Generate global insights"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Privacy-preserving insights
    {
      id: 'privacy-preserving-insights',
      position: { x: 650, y: 650 },
      data: { label: '🎯 Privacy-Preserving Insights\n"Global cancer treatment patterns\nidentified without exposing\nany individual patient data"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Collaborative success
    {
      id: 'collaborative-success',
      position: { x: 650, y: 800 },
      data: { label: '🏆 Collaborative Success\n"1000 hospitals contribute safely\nAI improves treatment outcomes\nPrivacy compliance maintained"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key distributed protection principle
    {
      id: 'distributed-protection-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Distributed Protection Principle\n"Keep raw data local, share insights globally\nLocal processing + distant aggregation\nPreserves privacy while enabling collaboration"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Healthcare network faces collaboration challenge
    {
      id: 'e1',
      source: 'healthcare-ai-network',
      target: 'privacy-collaboration-challenge',
      ...edgeStyle,
      label: 'wants to collaborate safely'
    },

    // Split into centralized vs distributed approaches
    {
      id: 'e2',
      source: 'privacy-collaboration-challenge',
      target: 'centralized-sharing',
      ...edgeStyle,
      label: 'centralized approach'
    },
    {
      id: 'e3',
      source: 'privacy-collaboration-challenge',
      target: 'local-distant-architecture',
      ...edgeStyle,
      label: 'distributed approach'
    },

    // Left path: Centralized sharing failures
    {
      id: 'e4',
      source: 'centralized-sharing',
      target: 'privacy-violations',
      ...edgeStyle,
      label: 'exposes patient data',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'privacy-violations',
      target: 'legal-consequences',
      ...edgeStyle,
      label: 'triggers legal action',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Right path: Local-distant architecture flow
    {
      id: 'e6',
      source: 'local-distant-architecture',
      target: 'local-processing-agents',
      ...edgeStyle,
      label: 'deploys local agents'
    },
    {
      id: 'e7',
      source: 'local-distant-architecture',
      target: 'anonymization-layer',
      ...edgeStyle,
      label: 'implements anonymization'
    },
    {
      id: 'e8',
      source: 'local-distant-architecture',
      target: 'distant-aggregation-agents',
      ...edgeStyle,
      label: 'deploys distant agents'
    },

    // Data flow through architecture
    {
      id: 'e9',
      source: 'local-processing-agents',
      target: 'anonymization-layer',
      ...edgeStyle,
      label: 'sends patterns to'
    },
    {
      id: 'e10',
      source: 'anonymization-layer',
      target: 'distant-aggregation-agents',
      ...edgeStyle,
      label: 'protected data to'
    },
    {
      id: 'e11',
      source: 'distant-aggregation-agents',
      target: 'privacy-preserving-insights',
      ...edgeStyle,
      label: 'generates insights'
    },

    // Success outcome
    {
      id: 'e12',
      source: 'privacy-preserving-insights',
      target: 'collaborative-success',
      ...edgeStyle,
      label: 'enables collaboration'
    },

    // Converge to distributed protection principle
    {
      id: 'e13',
      source: 'legal-consequences',
      target: 'distributed-protection-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e14',
      source: 'collaborative-success',
      target: 'distributed-protection-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Healthcare AI Collaboration Challenge",
      description: "1000+ hospitals want to collaborate on cancer treatment AI to improve patient outcomes, but cannot share raw patient data due to privacy regulations and ethical concerns.",
      activeNodes: ['healthcare-ai-network', 'privacy-collaboration-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Collaboration Approaches",
      description: "Privacy vs collaboration dilemma addressed through centralized data sharing (all hospitals send patient data) vs distributed local-distant agent architecture.",
      activeNodes: ['centralized-sharing', 'local-distant-architecture'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Centralized Approach: Massive Privacy Violations",
      description: "Centralized sharing exposes 1M+ patient records, violates HIPAA compliance, triggers regulatory investigations, resulting in $500M fines and project shutdown.",
      activeNodes: ['privacy-violations', 'legal-consequences'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Distributed Architecture Deployment",
      description: "Local-distant architecture deploys three components: local processing agents at hospitals, advanced anonymization layer, and distant cloud-based aggregation agents.",
      activeNodes: ['local-processing-agents', 'anonymization-layer', 'distant-aggregation-agents'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Privacy-Preserving Data Flow",
      description: "Local agents process raw patient data and extract statistical patterns, anonymization layer applies multiple protection techniques, distant agents aggregate anonymized insights.",
      activeNodes: ['privacy-preserving-insights'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "Collaborative Success and Core Principle",
      description: "1000 hospitals contribute safely while maintaining privacy compliance, proving that local processing + distant aggregation enables global collaboration without compromising individual privacy.",
      activeNodes: ['collaborative-success', 'distributed-protection-principle'],
      activeEdges: ['e12', 'e13', 'e14']
    }
  ]
};