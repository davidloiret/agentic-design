import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const advancedPrivacyTechnologiesUXPattern: PatternScenario = {
  id: 'advanced-privacy-technologies-ux',
  title: 'Advanced Privacy Technologies UX Design',
  description: 'User experience design for cutting-edge privacy-preserving technologies including differential privacy, federated learning, homomorphic encryption, and zero-knowledge proofs, making complex cryptographic protections accessible and understandable to end users',
  initialNodes: [
    // Collaborative AI scenario
    {
      id: 'collaborative-ai-scenario',
      position: { x: 400, y: 50 },
      data: { label: '🏥 Collaborative Medical AI Research\n"Multi-hospital AI training for disease prediction\nwithout sharing sensitive patient records\nacross competing institutions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Privacy technology challenge
    {
      id: 'privacy-technology-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🔬 Advanced Privacy Requirements\n"Need sophisticated cryptographic protection\nwhile maintaining AI model accuracy\nand providing user-friendly interfaces"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Left path: Traditional encryption limitations
    {
      id: 'traditional-encryption',
      position: { x: 150, y: 350 },
      data: { label: '🔒 Traditional Encryption Limitations\n"Data encrypted at rest and transit\nbut must decrypt for processing\nNo computation on encrypted data"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'security-vulnerabilities',
      position: { x: 150, y: 500 },
      data: { label: '🚨 Processing Vulnerabilities\n"Plain text exposure during computation\nCentralized key management risks\nNo cryptographic privacy guarantees"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'user-trust-issues',
      position: { x: 150, y: 650 },
      data: { label: '🤔 User Trust Concerns\n"Patients unsure about data protection\nHospitals reluctant to participate\nRegulatory compliance uncertainties"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Advanced privacy technologies
    {
      id: 'advanced-privacy-tech',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Advanced Privacy Technologies\n"Cryptographic computation preservation\nMathematical privacy guarantees\nZero-knowledge verification systems"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    // Four key privacy technologies
    {
      id: 'differential-privacy-ux',
      position: { x: 400, y: 500 },
      data: { label: '📊 Differential Privacy UX\n"Privacy Budget Meter: 85% remaining\nNoise Level Slider: Minimal → Maximum\nAccuracy Impact: 97.3% model performance"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'federated-learning-ux',
      position: { x: 650, y: 500 },
      data: { label: '🔄 Federated Learning UX\n"Local Training Progress: Round 23/50\nModel Sync Status: Encrypted gradients only\nParticipation Control: Pause/Resume training"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'homomorphic-encryption-ux',
      position: { x: 900, y: 500 },
      data: { label: '🔢 Homomorphic Encryption UX\n"Computation Status: Operating on encrypted data\nProcessing Time: 2.3x slower, 100% private\nResult Verification: Cryptographic proof available"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    {
      id: 'zero-knowledge-ux',
      position: { x: 525, y: 650 },
      data: { label: '✅ Zero-Knowledge Proof UX\n"Verification Status: Proven without revealing data\nTrust Level: Mathematically guaranteed\nCompliance Check: HIPAA/GDPR verified"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // User-friendly abstractions
    {
      id: 'privacy-level-selector',
      position: { x: 300, y: 800 },
      data: { label: '🎚️ Privacy Level Selector\n"🔒 Maximum Privacy (slower processing)\n⚖️ Balanced (recommended)\n⚡ Performance (minimal privacy)"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    {
      id: 'cryptographic-dashboard',
      position: { x: 600, y: 800 },
      data: { label: '📈 Cryptographic Protection Dashboard\n"Active Protections: 4/4 enabled\nData Leakage Risk: 0.001%\nComputational Overhead: +47ms"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    {
      id: 'trust-visualization',
      position: { x: 900, y: 800 },
      data: { label: '🛡️ Trust & Verification Center\n"Mathematical Proof: ✓ Verified\nAudit Trail: 127 validation points\nThird-party Attestation: Available"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Outcomes
    {
      id: 'accessible-privacy',
      position: { x: 500, y: 950 },
      data: { label: '🎯 Accessible Advanced Privacy\n"Complex cryptography made understandable\nUsers confident in mathematical protection\nWide adoption of privacy technologies"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 260 },
    },

    {
      id: 'innovation-enablement',
      position: { x: 800, y: 950 },
      data: { label: '🚀 Privacy-Preserving Innovation\n"Secure multi-party collaboration\nCompliance without data sacrifice\nTrust through transparency"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Core principle
    {
      id: 'technology-ux-principle',
      position: { x: 600, y: 1100 },
      data: { label: '🎯 Advanced Privacy Technology UX Principle\n"Sophisticated cryptographic protections must be accessible\nthrough intuitive interfaces that build user confidence\nin mathematical privacy guarantees."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 500 },
    },
  ],
  initialEdges: [
    // Collaborative scenario requires advanced privacy
    {
      id: 'e1',
      source: 'collaborative-ai-scenario',
      target: 'privacy-technology-challenge',
      ...edgeStyle,
      label: 'requires sophisticated protection'
    },

    // Two approaches to privacy protection
    {
      id: 'e2',
      source: 'privacy-technology-challenge',
      target: 'traditional-encryption',
      ...edgeStyle,
      label: 'conventional approach'
    },
    {
      id: 'e3',
      source: 'privacy-technology-challenge',
      target: 'advanced-privacy-tech',
      ...edgeStyle,
      label: 'cryptographic innovation'
    },

    // Traditional encryption problems
    {
      id: 'e4',
      source: 'traditional-encryption',
      target: 'security-vulnerabilities',
      ...edgeStyle,
      label: 'exposes processing risks'
    },
    {
      id: 'e5',
      source: 'security-vulnerabilities',
      target: 'user-trust-issues',
      ...edgeStyle,
      label: 'creates hesitation',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Advanced privacy technologies implementation
    {
      id: 'e6',
      source: 'advanced-privacy-tech',
      target: 'differential-privacy-ux',
      ...edgeStyle,
      label: 'privacy budget interface'
    },
    {
      id: 'e7',
      source: 'advanced-privacy-tech',
      target: 'federated-learning-ux',
      ...edgeStyle,
      label: 'distributed training UI'
    },
    {
      id: 'e8',
      source: 'advanced-privacy-tech',
      target: 'homomorphic-encryption-ux',
      ...edgeStyle,
      label: 'encrypted computation UI'
    },
    {
      id: 'e9',
      source: 'advanced-privacy-tech',
      target: 'zero-knowledge-ux',
      ...edgeStyle,
      label: 'verification proof UI'
    },

    // Technology UX connections
    {
      id: 'e10',
      source: 'differential-privacy-ux',
      target: 'privacy-level-selector',
      ...edgeStyle,
      label: 'simplifies configuration'
    },
    {
      id: 'e11',
      source: 'federated-learning-ux',
      target: 'cryptographic-dashboard',
      ...edgeStyle,
      label: 'monitors protection status'
    },
    {
      id: 'e12',
      source: 'homomorphic-encryption-ux',
      target: 'cryptographic-dashboard',
      ...edgeStyle,
      label: 'tracks computational overhead'
    },
    {
      id: 'e13',
      source: 'zero-knowledge-ux',
      target: 'trust-visualization',
      ...edgeStyle,
      label: 'displays verification proofs'
    },

    // User-friendly abstractions integration
    {
      id: 'e14',
      source: 'privacy-level-selector',
      target: 'cryptographic-dashboard',
      ...edgeStyle,
      label: 'adjusts protection levels'
    },
    {
      id: 'e15',
      source: 'cryptographic-dashboard',
      target: 'trust-visualization',
      ...edgeStyle,
      label: 'feeds trust metrics'
    },

    // Positive outcomes
    {
      id: 'e16',
      source: 'privacy-level-selector',
      target: 'accessible-privacy',
      ...edgeStyle,
      label: 'makes technology usable'
    },
    {
      id: 'e17',
      source: 'trust-visualization',
      target: 'accessible-privacy',
      ...edgeStyle,
      label: 'builds user confidence'
    },
    {
      id: 'e18',
      source: 'accessible-privacy',
      target: 'innovation-enablement',
      ...edgeStyle,
      label: 'enables collaboration'
    },

    // Converge to principle
    {
      id: 'e19',
      source: 'user-trust-issues',
      target: 'technology-ux-principle',
      ...edgeStyle,
      label: 'highlights UX importance',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e20',
      source: 'accessible-privacy',
      target: 'technology-ux-principle',
      ...edgeStyle,
      label: 'demonstrates success',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e21',
      source: 'innovation-enablement',
      target: 'technology-ux-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Collaborative Medical AI with Advanced Privacy Requirements",
      description: "Multi-hospital AI training for disease prediction requires sophisticated cryptographic protection to enable collaboration without sharing sensitive patient records across competing institutions.",
      activeNodes: ['collaborative-ai-scenario', 'privacy-technology-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Privacy Protection Paradigms",
      description: "Advanced privacy requirements addressed through traditional encryption with processing limitations (left) versus cutting-edge cryptographic privacy technologies (right).",
      activeNodes: ['traditional-encryption', 'advanced-privacy-tech'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Traditional Encryption: Vulnerabilities and Trust Issues",
      description: "Conventional encryption requires decryption for processing, creating security vulnerabilities that lead to user trust concerns and reluctance to participate in collaborative systems.",
      activeNodes: ['security-vulnerabilities', 'user-trust-issues'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Four Advanced Privacy Technology Interfaces",
      description: "Sophisticated UX designs for differential privacy (budget meters), federated learning (local training progress), homomorphic encryption (encrypted computation status), and zero-knowledge proofs (verification displays).",
      activeNodes: ['differential-privacy-ux', 'federated-learning-ux', 'homomorphic-encryption-ux', 'zero-knowledge-ux'],
      activeEdges: ['e6', 'e7', 'e8', 'e9']
    },
    {
      title: "User-Friendly Privacy Technology Abstractions",
      description: "Complex cryptographic systems made accessible through privacy level selectors, cryptographic protection dashboards showing real-time status, and trust visualization centers with mathematical proof displays.",
      activeNodes: ['privacy-level-selector', 'cryptographic-dashboard', 'trust-visualization'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    },
    {
      title: "Accessible Privacy and Innovation Enablement",
      description: "Intuitive interfaces make complex cryptography understandable, building user confidence in mathematical protection and enabling wide adoption of privacy-preserving collaborative technologies.",
      activeNodes: ['accessible-privacy', 'innovation-enablement'],
      activeEdges: ['e16', 'e17', 'e18']
    },
    {
      title: "Advanced Privacy Technology UX Principle",
      description: "Sophisticated cryptographic protections must be accessible through intuitive interfaces that build user confidence in mathematical privacy guarantees, transforming complex technology into trusted tools.",
      activeNodes: ['technology-ux-principle'],
      activeEdges: ['e19', 'e20', 'e21']
    }
  ]
};