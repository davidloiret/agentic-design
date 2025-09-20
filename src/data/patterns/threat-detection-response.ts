import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const threatDetectionResponsePattern: PatternScenario = {
  id: 'threat-detection-response',
  title: 'Threat Detection & Response Pattern',
  description: 'Real-time security monitoring and automated threat response system that detects, analyzes, and neutralizes security threats with minimal human intervention',
  initialNodes: [
    // AI trading system scenario
    {
      id: 'ai-trading-system',
      position: { x: 400, y: 50 },
      data: { label: '📈 AI Trading System\n"High-frequency trading platform\nprocessing $100M+ daily trades\nwith algorithmic decision making"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Advanced persistent threat
    {
      id: 'apt-attack',
      position: { x: 400, y: 200 },
      data: { label: '🎯 Advanced Persistent Threat\n"Sophisticated attackers infiltrate\nsystem to manipulate trading\nalgorithms for market abuse"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 280 },
    },

    // Left path: Manual security monitoring
    {
      id: 'manual-monitoring',
      position: { x: 150, y: 350 },
      data: { label: '👥 Manual Security Monitoring\n"Security analysts review logs\nand alerts during business hours\nWeekend/night coverage limited"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'detection-delay',
      position: { x: 150, y: 500 },
      data: { label: '⏰ Detection Delay\n"Threat active for 48 hours\nbefore detection due to\nweekend monitoring gap"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'manual-response',
      position: { x: 150, y: 650 },
      data: { label: '📞 Manual Response Process\n"Call emergency team\nManual system shutdown\nForensics team assembles"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'financial-damage',
      position: { x: 150, y: 800 },
      data: { label: '💸 Severe Financial Impact\n"$50M in manipulated trades\nRegulatory investigation\nMarket confidence damaged"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Automated threat detection & response
    {
      id: 'automated-detection',
      position: { x: 650, y: 350 },
      data: { label: '🤖 Automated Threat Detection\n"ML-powered behavioral analysis\n24/7 real-time monitoring\nAnomaly detection algorithms"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'threat-analysis',
      position: { x: 650, y: 500 },
      data: { label: '🔍 Rapid Threat Analysis\n"AI correlates attack patterns\nThreat intelligence integration\nRisk assessment in seconds"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'automated-response',
      position: { x: 650, y: 650 },
      data: { label: '⚡ Automated Response\n"Isolate compromised systems\nBlock malicious transactions\nPreserve forensic evidence"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'threat-neutralized',
      position: { x: 650, y: 800 },
      data: { label: '🛡️ Threat Neutralized\n"Attack contained in 3 minutes\nZero financial impact\nSystem integrity maintained"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key response principle
    {
      id: 'response-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Threat Response Principle\n"Speed of detection + response determines impact\nAutomation enables real-time defense\nHuman oversight, machine execution"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Trading system faces APT attack
    {
      id: 'e1',
      source: 'ai-trading-system',
      target: 'apt-attack',
      ...edgeStyle,
      label: 'targeted by sophisticated threat'
    },

    // Split into manual vs automated security approaches
    {
      id: 'e2',
      source: 'apt-attack',
      target: 'manual-monitoring',
      ...edgeStyle,
      label: 'manual security approach'
    },
    {
      id: 'e3',
      source: 'apt-attack',
      target: 'automated-detection',
      ...edgeStyle,
      label: 'automated security approach'
    },

    // Left path: Manual monitoring failures
    {
      id: 'e4',
      source: 'manual-monitoring',
      target: 'detection-delay',
      ...edgeStyle,
      label: 'coverage gaps',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'detection-delay',
      target: 'manual-response',
      ...edgeStyle,
      label: 'slow response process',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e6',
      source: 'manual-response',
      target: 'financial-damage',
      ...edgeStyle,
      label: 'too late to prevent damage',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Right path: Automated detection and response flow
    {
      id: 'e7',
      source: 'automated-detection',
      target: 'threat-analysis',
      ...edgeStyle,
      label: 'immediate analysis'
    },
    {
      id: 'e8',
      source: 'threat-analysis',
      target: 'automated-response',
      ...edgeStyle,
      label: 'triggers response'
    },
    {
      id: 'e9',
      source: 'automated-response',
      target: 'threat-neutralized',
      ...edgeStyle,
      label: 'neutralizes threat'
    },

    // Converge to response principle
    {
      id: 'e10',
      source: 'financial-damage',
      target: 'response-principle',
      ...edgeStyle,
      label: 'demonstrates cost of delay',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e11',
      source: 'threat-neutralized',
      target: 'response-principle',
      ...edgeStyle,
      label: 'proves automation value',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "High-Value AI Trading System Target",
      description: "High-frequency trading platform processing $100M+ daily trades becomes target for sophisticated attackers seeking to manipulate trading algorithms for market abuse.",
      activeNodes: ['ai-trading-system'],
      activeEdges: []
    },
    {
      title: "Advanced Persistent Threat Attack",
      description: "Sophisticated attackers launch coordinated infiltration attempt to compromise trading system and manipulate algorithmic decision-making for financial gain.",
      activeNodes: ['apt-attack'],
      activeEdges: ['e1']
    },
    {
      title: "Two Security Approaches: Manual vs Automated",
      description: "Same advanced threat faces manual security monitoring (left) with limited coverage vs automated threat detection and response system (right) with 24/7 protection.",
      activeNodes: ['manual-monitoring', 'automated-detection'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Manual Monitoring: Detection Delays and Slow Response",
      description: "Limited business-hours coverage creates 48-hour detection delay over weekend, followed by slow manual response process involving emergency team assembly.",
      activeNodes: ['detection-delay', 'manual-response'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Automated System: Rapid Detection and Analysis",
      description: "ML-powered behavioral analysis provides 24/7 monitoring with immediate threat detection, AI correlation of attack patterns, and seconds-level risk assessment.",
      activeNodes: ['threat-analysis'],
      activeEdges: ['e7']
    },
    {
      title: "Response Speed Determines Impact",
      description: "Manual approach results in $50M damage and regulatory investigation, while automated response neutralizes threat in 3 minutes with zero financial impact, proving speed is critical.",
      activeNodes: ['financial-damage', 'automated-response', 'threat-neutralized', 'response-principle'],
      activeEdges: ['e6', 'e8', 'e9', 'e10', 'e11']
    }
  ]
};