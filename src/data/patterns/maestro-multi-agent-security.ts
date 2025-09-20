import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const maestroMultiAgentSecurityPattern: PatternScenario = {
  id: 'maestro-multi-agent-security',
  title: 'MAESTRO Multi-Agent Security Pattern',
  description: 'Comprehensive threat modeling for multi-agent environments with security orchestration, trust verification, and coordinated defense mechanisms',
  initialNodes: [
    // Multi-agent system scenario
    {
      id: 'multi-agent-system',
      position: { x: 400, y: 50 },
      data: { label: '🏢 Multi-Agent Financial System\n"Trading Agent + Risk Agent + Audit Agent\nProcessing $1M+ transactions daily\nShared data and coordinated decisions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Threat emerges
    {
      id: 'coordinated-threat',
      position: { x: 400, y: 200 },
      data: { label: '🎯 Coordinated Attack\n"Compromised Trading Agent\nattempts to manipulate\nRisk and Audit Agents"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Left path: No security orchestration
    {
      id: 'isolated-agents',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Isolated Agent Security\n"Each agent has independent\nsafety checks but no\ncoordinated threat response"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'security-blind-spots',
      position: { x: 150, y: 500 },
      data: { label: '🕳️ Security Blind Spots\n"Cross-agent attacks succeed\nNo shared threat intelligence\nInconsistent security policies"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    {
      id: 'system-compromise',
      position: { x: 150, y: 650 },
      data: { label: '💀 System-Wide Compromise\n"Compromised trading cascades\nRisk calculations manipulated\nAudit trails corrupted"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Right path: MAESTRO security orchestration
    {
      id: 'maestro-orchestration',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ MAESTRO Security Orchestration\n"Centralized threat modeling\nReal-time trust verification\nCoordinated defense responses"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 250 },
    },

    {
      id: 'trust-verification',
      position: { x: 650, y: 500 },
      data: { label: '🔍 Multi-Agent Trust Verification\n"Trading Agent behavior anomaly\nCross-validate with Risk Agent\nAudit Agent confirms compromise"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    {
      id: 'coordinated-response',
      position: { x: 650, y: 650 },
      data: { label: '⚡ Coordinated Security Response\n"Isolate compromised Trading Agent\nElevate Risk Agent vigilance\nAudit Agent forensics mode"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },

    {
      id: 'threat-containment',
      position: { x: 650, y: 800 },
      data: { label: '🔒 Threat Containment Success\n"Attack isolated to single agent\nSystem integrity maintained\nContinuous monitoring active"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Key principle
    {
      id: 'orchestration-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Security Orchestration Principle\n"Multi-agent threats require coordinated defense\nShared intelligence + Trust verification\n+ Unified response = System resilience"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // System encounters threat
    {
      id: 'e1',
      source: 'multi-agent-system',
      target: 'coordinated-threat',
      ...edgeStyle,
      label: 'targeted by attack'
    },

    // Split into isolated vs orchestrated response
    {
      id: 'e2',
      source: 'coordinated-threat',
      target: 'isolated-agents',
      ...edgeStyle,
      label: 'attacks uncoordinated system'
    },
    {
      id: 'e3',
      source: 'coordinated-threat',
      target: 'maestro-orchestration',
      ...edgeStyle,
      label: 'attacks orchestrated system'
    },

    // Left path: Isolated security failure
    {
      id: 'e4',
      source: 'isolated-agents',
      target: 'security-blind-spots',
      ...edgeStyle,
      label: 'creates vulnerabilities',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'security-blind-spots',
      target: 'system-compromise',
      ...edgeStyle,
      label: 'enables cascade failure',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Right path: MAESTRO coordinated defense
    {
      id: 'e6',
      source: 'maestro-orchestration',
      target: 'trust-verification',
      ...edgeStyle,
      label: 'triggers verification'
    },
    {
      id: 'e7',
      source: 'trust-verification',
      target: 'coordinated-response',
      ...edgeStyle,
      label: 'confirms threat'
    },
    {
      id: 'e8',
      source: 'coordinated-response',
      target: 'threat-containment',
      ...edgeStyle,
      label: 'executes defense'
    },

    // Converge to principle
    {
      id: 'e9',
      source: 'system-compromise',
      target: 'orchestration-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'threat-containment',
      target: 'orchestration-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multi-Agent Financial System Deployment",
      description: "Complex system with Trading Agent, Risk Agent, and Audit Agent processing millions in daily transactions through shared data and coordinated decision-making.",
      activeNodes: ['multi-agent-system'],
      activeEdges: []
    },
    {
      title: "Coordinated Multi-Agent Attack",
      description: "Sophisticated threat: compromised Trading Agent attempts to manipulate both Risk and Audit Agents, demonstrating attack vectors unique to multi-agent environments.",
      activeNodes: ['coordinated-threat'],
      activeEdges: ['e1']
    },
    {
      title: "Two Security Approaches: Isolated vs Orchestrated",
      description: "Same attack targets two different architectures: isolated agent security (left) with independent safety checks vs MAESTRO orchestrated security (right) with coordinated defense.",
      activeNodes: ['isolated-agents', 'maestro-orchestration'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Isolated Security Creates Blind Spots",
      description: "Independent agent security fails against cross-agent attacks, creating vulnerabilities through lack of shared threat intelligence and inconsistent security policies.",
      activeNodes: ['security-blind-spots', 'system-compromise'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "MAESTRO Multi-Agent Trust Verification",
      description: "Orchestrated system detects Trading Agent anomaly, cross-validates with Risk Agent, and confirms compromise through Audit Agent - demonstrating coordinated threat detection.",
      activeNodes: ['trust-verification'],
      activeEdges: ['e6']
    },
    {
      title: "Coordinated Defense and Containment Success",
      description: "MAESTRO executes unified response: isolates compromised agent, elevates others' vigilance, activates forensics mode, successfully containing threat while maintaining system integrity.",
      activeNodes: ['coordinated-response', 'threat-containment', 'orchestration-principle'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    }
  ]
};