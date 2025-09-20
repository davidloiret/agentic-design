import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hybridSecretCacheManagementPattern: PatternScenario = {
  id: 'hybrid-secret-cache-management',
  title: 'Hybrid Secret & Cache Management Pattern',
  description: 'Multi-tier secure storage architecture combining local device vaults, distant server vaults, and encrypted caching for optimal security and performance in agentic AI systems',
  initialNodes: [
    // Mobile AI assistant scenario
    {
      id: 'mobile-ai-assistant',
      position: { x: 400, y: 50 },
      data: { label: '📱 Mobile AI Assistant\n"Personal AI handling sensitive data:\n• Banking credentials\n• Medical records\n• Business documents"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Storage challenge
    {
      id: 'storage-challenge',
      position: { x: 400, y: 200 },
      data: { label: '🤔 Storage Challenge\n"Need fast access for performance\nbut secure storage for sensitive data\nwith offline capability"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Single-tier storage (inadequate)
    {
      id: 'single-tier-storage',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Single-Tier Storage\n"All data in one location:\n• Local only: Device loss risk\n• Cloud only: Network dependency"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'security-performance-tradeoff',
      position: { x: 150, y: 500 },
      data: { label: '⚖️ Security vs Performance\n"Cannot optimize both:\nEither slow but secure\nor fast but vulnerable"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'system-failure',
      position: { x: 150, y: 650 },
      data: { label: '💥 System Failure\n"Device stolen: All secrets lost\nNetwork down: System unusable\nPoor user experience"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Hybrid multi-tier architecture
    {
      id: 'hybrid-architecture',
      position: { x: 650, y: 350 },
      data: { label: '🏗️ Hybrid Multi-Tier Architecture\n"3-tier secure storage:\n• Local device vault (Tier 1)\n• Edge cache layer (Tier 2)\n• Remote server vault (Tier 3)"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 260 },
    },

    // Tier 1: Local device vault
    {
      id: 'local-device-vault',
      position: { x: 500, y: 500 },
      data: { label: '📱 Tier 1: Local Device Vault\n"Hardware-encrypted storage\nBiometric access control\nImmediate availability"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Tier 2: Edge cache layer
    {
      id: 'edge-cache-layer',
      position: { x: 650, y: 500 },
      data: { label: '⚡ Tier 2: Edge Cache Layer\n"Encrypted temporary storage\nFrequently accessed data\nLow-latency retrieval"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Tier 3: Remote server vault
    {
      id: 'remote-server-vault',
      position: { x: 800, y: 500 },
      data: { label: '🏛️ Tier 3: Remote Server Vault\n"Highly secure long-term storage\nRedundant backup systems\nDisaster recovery capable"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Intelligent data orchestration
    {
      id: 'data-orchestration',
      position: { x: 650, y: 650 },
      data: { label: '🧠 Intelligent Data Orchestration\n"AI-driven tier management:\n• Sensitivity-based placement\n• Usage pattern optimization\n• Automatic synchronization"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Optimal performance & security
    {
      id: 'optimal-solution',
      position: { x: 650, y: 800 },
      data: { label: '🎯 Optimal Performance & Security\n"Fast access to frequent data\nSecure storage of sensitive data\nResilience against failures"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Key hybrid principle
    {
      id: 'hybrid-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Hybrid Storage Principle\n"Match storage tier to data characteristics\nSecurity, performance, and availability\ncan be optimized simultaneously"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Mobile AI faces storage challenge
    {
      id: 'e1',
      source: 'mobile-ai-assistant',
      target: 'storage-challenge',
      ...edgeStyle,
      label: 'needs secure + fast storage'
    },

    // Split into single-tier vs hybrid approaches
    {
      id: 'e2',
      source: 'storage-challenge',
      target: 'single-tier-storage',
      ...edgeStyle,
      label: 'single-tier approach'
    },
    {
      id: 'e3',
      source: 'storage-challenge',
      target: 'hybrid-architecture',
      ...edgeStyle,
      label: 'hybrid approach'
    },

    // Left path: Single-tier limitations
    {
      id: 'e4',
      source: 'single-tier-storage',
      target: 'security-performance-tradeoff',
      ...edgeStyle,
      label: 'creates impossible choice',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'security-performance-tradeoff',
      target: 'system-failure',
      ...edgeStyle,
      label: 'leads to system failure',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Hybrid architecture deployment
    {
      id: 'e6',
      source: 'hybrid-architecture',
      target: 'local-device-vault',
      ...edgeStyle,
      label: 'deploys Tier 1'
    },
    {
      id: 'e7',
      source: 'hybrid-architecture',
      target: 'edge-cache-layer',
      ...edgeStyle,
      label: 'deploys Tier 2'
    },
    {
      id: 'e8',
      source: 'hybrid-architecture',
      target: 'remote-server-vault',
      ...edgeStyle,
      label: 'deploys Tier 3'
    },

    // Tiers work together through orchestration
    {
      id: 'e9',
      source: 'local-device-vault',
      target: 'data-orchestration',
      ...edgeStyle,
      label: 'coordinated by'
    },
    {
      id: 'e10',
      source: 'edge-cache-layer',
      target: 'data-orchestration',
      ...edgeStyle,
      label: 'managed by'
    },
    {
      id: 'e11',
      source: 'remote-server-vault',
      target: 'data-orchestration',
      ...edgeStyle,
      label: 'orchestrated by'
    },

    // Orchestration achieves optimal solution
    {
      id: 'e12',
      source: 'data-orchestration',
      target: 'optimal-solution',
      ...edgeStyle,
      label: 'achieves optimization'
    },

    // Converge to hybrid principle
    {
      id: 'e13',
      source: 'system-failure',
      target: 'hybrid-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e14',
      source: 'optimal-solution',
      target: 'hybrid-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Mobile AI Assistant Storage Requirements",
      description: "Personal AI handling sensitive banking credentials, medical records, and business documents faces complex storage requirements for security, performance, and availability.",
      activeNodes: ['mobile-ai-assistant'],
      activeEdges: []
    },
    {
      title: "Storage Optimization Challenge",
      description: "System needs fast access for good performance but secure storage for sensitive data, plus offline capability when network is unavailable - creating competing requirements.",
      activeNodes: ['storage-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Storage Strategies: Single-Tier vs Hybrid",
      description: "Storage challenge addressed through single-tier approach (all data in one location) vs hybrid multi-tier architecture with specialized storage layers.",
      activeNodes: ['single-tier-storage', 'hybrid-architecture'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Single-Tier Limitations and Failures",
      description: "Single-tier storage creates impossible security vs performance tradeoff, leading to system failures: device theft loses all secrets, network outages make system unusable.",
      activeNodes: ['security-performance-tradeoff', 'system-failure'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Multi-Tier Hybrid Architecture Deployment",
      description: "Hybrid approach deploys three specialized tiers: local device vault (immediate access), edge cache layer (low latency), remote server vault (high security + backup).",
      activeNodes: ['local-device-vault', 'edge-cache-layer', 'remote-server-vault'],
      activeEdges: ['e6', 'e7', 'e8']
    },
    {
      title: "Intelligent Orchestration and Optimal Solution",
      description: "AI-driven data orchestration manages tier placement based on sensitivity and usage patterns, achieving optimal performance and security simultaneously through hybrid principle.",
      activeNodes: ['data-orchestration', 'optimal-solution', 'hybrid-principle'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13', 'e14']
    }
  ]
};