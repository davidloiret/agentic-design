import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const confidentialComputingPattern: PatternScenario = {
  id: 'confidential-computing',
  title: 'Confidential Computing Patterns',
  description: 'Hardware-based trusted execution environments (TEEs) protecting AI agents and data processing in untrusted cloud environments through secure enclaves',
  initialNodes: [
    // Multi-tenant cloud AI scenario
    {
      id: 'cloud-ai-processing',
      position: { x: 400, y: 50 },
      data: { label: '☁️ Multi-Tenant Cloud AI\n"Financial AI agent processing\nsensitive trading algorithms and\ncustomer data in shared cloud"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Trust challenge
    {
      id: 'trust-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🤔 Cloud Trust Challenge\n"Cannot trust cloud provider\nwith proprietary algorithms\nand sensitive customer data"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Traditional cloud deployment (risky)
    {
      id: 'traditional-cloud',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Traditional Cloud Deployment\n"Code and data visible to:\n• Cloud administrators\n• Other tenants\n• Malicious insiders"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'data-exposure',
      position: { x: 150, y: 500 },
      data: { label: '👀 Complete Data Exposure\n"Trading algorithms visible\nCustomer data accessible\nIntellectual property stolen"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'competitive-loss',
      position: { x: 150, y: 650 },
      data: { label: '📉 Competitive Disadvantage\n"Proprietary strategies copied\nRegulatory violations\nCustomer trust lost"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Confidential computing with TEE
    {
      id: 'confidential-computing',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Confidential Computing\n"Hardware-based TEE:\n• Intel SGX enclave\n• AMD SEV encryption\n• ARM TrustZone protection"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'secure-enclave',
      position: { x: 650, y: 500 },
      data: { label: '🔒 Secure Enclave Execution\n"AI agent code encrypted\nMemory protected by hardware\nEven hypervisor cannot access"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'attestation-verification',
      position: { x: 650, y: 650 },
      data: { label: '✅ Remote Attestation\n"Cryptographic proof that:\n• Code integrity verified\n• Secure environment confirmed\n• No tampering detected"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'protected-processing',
      position: { x: 650, y: 800 },
      data: { label: '🔐 Protected Processing\n"Algorithms remain confidential\nData encrypted in memory\nResults verifiably secure"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key confidential computing principle
    {
      id: 'confidential-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Confidential Computing Principle\n"Protect data in use, not just at rest\nHardware roots of trust\nCompute without compromise"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Cloud AI processing faces trust challenge
    {
      id: 'e1',
      source: 'cloud-ai-processing',
      target: 'trust-challenge',
      ...edgeStyle,
      label: 'cannot trust cloud environment'
    },

    // Split into traditional vs confidential computing
    {
      id: 'e2',
      source: 'trust-challenge',
      target: 'traditional-cloud',
      ...edgeStyle,
      label: 'traditional deployment'
    },
    {
      id: 'e3',
      source: 'trust-challenge',
      target: 'confidential-computing',
      ...edgeStyle,
      label: 'confidential computing'
    },

    // Left path: Traditional cloud risks
    {
      id: 'e4',
      source: 'traditional-cloud',
      target: 'data-exposure',
      ...edgeStyle,
      label: 'exposes sensitive data',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'data-exposure',
      target: 'competitive-loss',
      ...edgeStyle,
      label: 'leads to business damage',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Confidential computing protection flow
    {
      id: 'e6',
      source: 'confidential-computing',
      target: 'secure-enclave',
      ...edgeStyle,
      label: 'creates secure environment'
    },
    {
      id: 'e7',
      source: 'secure-enclave',
      target: 'attestation-verification',
      ...edgeStyle,
      label: 'provides attestation'
    },
    {
      id: 'e8',
      source: 'attestation-verification',
      target: 'protected-processing',
      ...edgeStyle,
      label: 'enables secure computation'
    },

    // Converge to confidential computing principle
    {
      id: 'e9',
      source: 'competitive-loss',
      target: 'confidential-principle',
      ...edgeStyle,
      label: 'demonstrates necessity',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'protected-processing',
      target: 'confidential-principle',
      ...edgeStyle,
      label: 'achieves protection goal',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multi-Tenant Cloud AI Deployment Challenge",
      description: "Financial AI agent must process sensitive trading algorithms and customer data in shared cloud environment, creating fundamental trust challenges.",
      activeNodes: ['cloud-ai-processing'],
      activeEdges: []
    },
    {
      title: "Cloud Trust Dilemma",
      description: "Cannot trust cloud provider with proprietary algorithms and sensitive customer data due to potential access by administrators, other tenants, and malicious insiders.",
      activeNodes: ['trust-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Deployment Approaches: Traditional vs Confidential",
      description: "Same AI processing handled through traditional cloud deployment (left) with full visibility vs confidential computing (right) with hardware-based protection.",
      activeNodes: ['traditional-cloud', 'confidential-computing'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Traditional Cloud: Complete Exposure Risk",
      description: "Standard deployment exposes trading algorithms, customer data, and intellectual property to cloud administrators, other tenants, and potential attackers.",
      activeNodes: ['data-exposure', 'competitive-loss'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Confidential Computing: Hardware-Protected Execution",
      description: "TEE creates secure enclave where AI agent code is encrypted, memory is hardware-protected, and even the hypervisor cannot access sensitive data.",
      activeNodes: ['secure-enclave'],
      activeEdges: ['e6']
    },
    {
      title: "Attestation and Protected Processing Success",
      description: "Remote attestation provides cryptographic proof of secure execution, enabling protected processing where algorithms remain confidential and data stays encrypted in memory.",
      activeNodes: ['attestation-verification', 'protected-processing', 'confidential-principle'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    }
  ]
};