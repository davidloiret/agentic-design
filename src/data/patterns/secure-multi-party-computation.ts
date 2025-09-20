import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const secureMultiPartyComputationPattern: PatternScenario = {
  id: 'secure-multi-party-computation',
  title: 'Secure Multi-Party Computation Pattern',
  description: 'Enables multiple parties to jointly compute functions over their private inputs without revealing the inputs to each other through cryptographic protocols',
  initialNodes: [
    // Multi-bank fraud detection scenario
    {
      id: 'fraud-detection-need',
      position: { x: 400, y: 50 },
      data: { label: '🏦 Multi-Bank Fraud Detection\n"3 competing banks want to detect\ncross-bank fraud patterns without\nsharing sensitive customer data"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Privacy challenge
    {
      id: 'privacy-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🔒 Privacy Challenge\n"Banks cannot share raw data:\n• Customer privacy laws\n• Competitive advantage\n• Regulatory compliance"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Traditional data sharing (impossible)
    {
      id: 'traditional-sharing',
      position: { x: 150, y: 350 },
      data: { label: '❌ Traditional Data Sharing\n"Banks share all transaction data\nto central fraud detection system\n(Violates privacy)"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'privacy-violations',
      position: { x: 150, y: 500 },
      data: { label: '🚨 Privacy Violations\n"Customer data exposed\nCompetitive intelligence leaked\nRegulatory violations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'legal-consequences',
      position: { x: 150, y: 650 },
      data: { label: '⚖️ Legal Consequences\n"GDPR fines\nCustomer lawsuits\nLost competitive position"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Secure Multi-Party Computation
    {
      id: 'smpc-protocol',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Secure Multi-Party Computation\n"Cryptographic protocol:\n• Secret sharing\n• Homomorphic encryption\n• Zero-knowledge proofs"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'encrypted-computation',
      position: { x: 650, y: 500 },
      data: { label: '🔐 Encrypted Joint Computation\n"Banks compute fraud patterns\non encrypted data shares\nwithout seeing raw inputs"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'fraud-insights',
      position: { x: 650, y: 650 },
      data: { label: '🎯 Fraud Insights Revealed\n"Cross-bank fraud patterns detected:\n• Account takeover rings\n• Money laundering networks\n• Synthetic identity fraud"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    {
      id: 'privacy-preserved',
      position: { x: 650, y: 800 },
      data: { label: '✅ Privacy Preserved\n"Individual customer data\nremains completely private\nCompliance maintained"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key SMPC principle
    {
      id: 'smpc-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 SMPC Principle\n"Compute on secrets without revealing secrets\nCollaboration without compromise\nPrivacy-preserving joint intelligence"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Fraud detection need creates privacy challenge
    {
      id: 'e1',
      source: 'fraud-detection-need',
      target: 'privacy-challenge',
      ...edgeStyle,
      label: 'conflicts with privacy'
    },

    // Split into traditional vs SMPC approaches
    {
      id: 'e2',
      source: 'privacy-challenge',
      target: 'traditional-sharing',
      ...edgeStyle,
      label: 'traditional approach'
    },
    {
      id: 'e3',
      source: 'privacy-challenge',
      target: 'smpc-protocol',
      ...edgeStyle,
      label: 'SMPC approach'
    },

    // Left path: Traditional sharing problems
    {
      id: 'e4',
      source: 'traditional-sharing',
      target: 'privacy-violations',
      ...edgeStyle,
      label: 'causes violations',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'privacy-violations',
      target: 'legal-consequences',
      ...edgeStyle,
      label: 'leads to penalties',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: SMPC secure computation flow
    {
      id: 'e6',
      source: 'smpc-protocol',
      target: 'encrypted-computation',
      ...edgeStyle,
      label: 'enables secure computation'
    },
    {
      id: 'e7',
      source: 'encrypted-computation',
      target: 'fraud-insights',
      ...edgeStyle,
      label: 'produces joint results'
    },
    {
      id: 'e8',
      source: 'fraud-insights',
      target: 'privacy-preserved',
      ...edgeStyle,
      label: 'maintains privacy'
    },

    // Converge to SMPC principle
    {
      id: 'e9',
      source: 'legal-consequences',
      target: 'smpc-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'privacy-preserved',
      target: 'smpc-principle',
      ...edgeStyle,
      label: 'proves capability',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multi-Bank Fraud Detection Challenge",
      description: "Three competing banks need to detect cross-bank fraud patterns but cannot share sensitive customer data due to privacy laws and competitive concerns.",
      activeNodes: ['fraud-detection-need'],
      activeEdges: []
    },
    {
      title: "Privacy vs Collaboration Conflict",
      description: "Essential fraud detection requires data sharing, but customer privacy laws, competitive advantage, and regulatory compliance prevent traditional data sharing approaches.",
      activeNodes: ['privacy-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Approaches: Traditional Sharing vs SMPC",
      description: "Problem addressed through traditional data centralization (left) which violates privacy vs Secure Multi-Party Computation (right) using cryptographic protocols.",
      activeNodes: ['traditional-sharing', 'smpc-protocol'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Traditional Approach: Privacy Violations and Legal Risk",
      description: "Centralized data sharing exposes customer information, leaks competitive intelligence, violates regulations, leading to GDPR fines and lawsuits.",
      activeNodes: ['privacy-violations', 'legal-consequences'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "SMPC: Encrypted Joint Computation",
      description: "Cryptographic protocols (secret sharing, homomorphic encryption, zero-knowledge proofs) enable banks to compute fraud patterns on encrypted data shares.",
      activeNodes: ['encrypted-computation'],
      activeEdges: ['e6']
    },
    {
      title: "Privacy-Preserving Intelligence and Core Principle",
      description: "SMPC reveals cross-bank fraud patterns (account takeover rings, money laundering) while preserving individual customer privacy, demonstrating 'compute on secrets without revealing secrets'.",
      activeNodes: ['fraud-insights', 'privacy-preserved', 'smpc-principle'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    }
  ]
};