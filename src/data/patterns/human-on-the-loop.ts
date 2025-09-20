import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const humanOnTheLoopPattern: PatternScenario = {
  id: 'human-on-the-loop',
  title: 'Human-on-the-Loop (HOTL) Pattern',
  description: 'Supervisory oversight framework for autonomous AI agents enabling strategic human control while maintaining agent autonomy, achieving 87% faster resolution times with 94% satisfaction through structured monitoring and intervention protocols',
  initialNodes: [
    // Autonomous agent oversight challenge
    {
      id: 'oversight-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Autonomous Agent Oversight Challenge\n"How to maintain human control and accountability\nwhile enabling autonomous agents to operate\nefficiently at scale without micromanagement?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 350 },
    },

    // Traditional approaches (problematic)
    {
      id: 'traditional-approaches',
      position: { x: 150, y: 200 },
      data: { label: '❌ Traditional Approaches\n"Binary control models:\n• Full automation (no oversight)\n• Human-in-the-Loop (bottlenecks)\n• Reactive monitoring only"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // HOTL supervisory framework
    {
      id: 'hotl-framework',
      position: { x: 650, y: 200 },
      data: { label: '🎛️ HOTL Supervisory Framework\n"Strategic oversight approach:\n• Autonomous operation by default\n• Human monitoring & intervention\n• Escalation-based control"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Key distinction from HITL
    {
      id: 'hitl-vs-hotl',
      position: { x: 400, y: 350 },
      data: { label: '🔄 HITL vs HOTL Distinction\n"HITL: Human participates in every decision\nHOTL: Human supervises autonomous decisions\nKey: Supervision vs Participation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Monitoring architecture
    {
      id: 'monitoring-architecture',
      position: { x: 200, y: 500 },
      data: { label: '📊 Real-time Monitoring Architecture\n"Observability components:\n• Performance dashboards\n• Behavior anomaly detection\n• Trust calibration metrics\n• Agent autonomy levels"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Intervention protocols
    {
      id: 'intervention-protocols',
      position: { x: 600, y: 500 },
      data: { label: '🚨 Intervention Protocols\n"Escalation triggers:\n• Confidence threshold breaches\n• Anomalous behavior patterns\n• High-risk decision points\n• Performance degradation"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 240 },
    },

    // Emergency controls
    {
      id: 'emergency-controls',
      position: { x: 100, y: 650 },
      data: { label: '🛑 Emergency Stop & Takeover\n"Safety mechanisms:\n• Circuit breakers\n• Human override systems\n• Graceful degradation\n• State preservation"' },
      style: { ...nodeStyle, background: '#be123c', minWidth: 220 },
    },

    // Audit and compliance
    {
      id: 'audit-compliance',
      position: { x: 400, y: 650 },
      data: { label: '📋 Audit & Compliance Monitoring\n"Regulatory oversight:\n• Decision audit trails\n• Compliance reporting\n• Risk assessment logs\n• Accountability tracking"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 240 },
    },

    // Trust calibration
    {
      id: 'trust-calibration',
      position: { x: 700, y: 650 },
      data: { label: '⚖️ Trust Calibration System\n"Human-agent trust:\n• Adaptive oversight levels\n• Performance-based trust\n• Transparency mechanisms\n• Calibration feedback loops"' },
      style: { ...nodeStyle, background: '#0891b2', minWidth: 240 },
    },

    // Production implementations
    {
      id: 'production-implementations',
      position: { x: 200, y: 800 },
      data: { label: '🏭 Production Implementations\n"Real-world deployments:\n• Customer service bots (87% faster)\n• Trading agents (real-time risk)\n• Coding agents (quality gates)\n• Healthcare monitoring"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 260 },
    },

    // Autonomy metrics
    {
      id: 'autonomy-metrics',
      position: { x: 600, y: 800 },
      data: { label: '📈 Autonomy & Supervision Metrics\n"Performance indicators:\n• Agent autonomy percentage\n• Intervention frequency\n• Supervision effectiveness\n• Human cognitive load"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Strategic oversight principle
    {
      id: 'strategic-oversight',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Strategic Oversight Principle\n"Humans set strategic goals and boundaries while agents execute autonomously\nSupervision replaces micromanagement, enabling both scale and control\nTrust calibration ensures appropriate human-agent collaboration"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by both approaches
    {
      id: 'e1',
      source: 'oversight-challenge',
      target: 'traditional-approaches',
      ...edgeStyle,
      label: 'inadequate solutions'
    },
    {
      id: 'e2',
      source: 'oversight-challenge',
      target: 'hotl-framework',
      ...edgeStyle,
      label: 'HOTL solution'
    },

    // Framework distinction
    {
      id: 'e3',
      source: 'hotl-framework',
      target: 'hitl-vs-hotl',
      ...edgeStyle,
      label: 'clarifies approach'
    },

    // Core components of HOTL
    {
      id: 'e4',
      source: 'hotl-framework',
      target: 'monitoring-architecture',
      ...edgeStyle,
      label: 'implements monitoring'
    },
    {
      id: 'e5',
      source: 'hotl-framework',
      target: 'intervention-protocols',
      ...edgeStyle,
      label: 'defines interventions'
    },

    // Monitoring enables interventions
    {
      id: 'e6',
      source: 'monitoring-architecture',
      target: 'intervention-protocols',
      ...edgeStyle,
      label: 'triggers escalation'
    },

    // Emergency systems
    {
      id: 'e7',
      source: 'intervention-protocols',
      target: 'emergency-controls',
      ...edgeStyle,
      label: 'escalates to'
    },

    // Monitoring supports audit
    {
      id: 'e8',
      source: 'monitoring-architecture',
      target: 'audit-compliance',
      ...edgeStyle,
      label: 'provides logs'
    },

    // Trust calibration
    {
      id: 'e9',
      source: 'intervention-protocols',
      target: 'trust-calibration',
      ...edgeStyle,
      label: 'informs trust'
    },
    {
      id: 'e10',
      source: 'monitoring-architecture',
      target: 'trust-calibration',
      ...edgeStyle,
      label: 'feeds calibration'
    },

    // Cross-connections
    {
      id: 'e11',
      source: 'emergency-controls',
      target: 'audit-compliance',
      ...edgeStyle,
      label: 'logs actions'
    },
    {
      id: 'e12',
      source: 'trust-calibration',
      target: 'audit-compliance',
      ...edgeStyle,
      label: 'validates trust'
    },

    // Production results
    {
      id: 'e13',
      source: 'emergency-controls',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'enables deployment'
    },
    {
      id: 'e14',
      source: 'audit-compliance',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'validates deployment'
    },
    {
      id: 'e15',
      source: 'trust-calibration',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'optimizes performance'
    },

    // Metrics and measurement
    {
      id: 'e16',
      source: 'production-implementations',
      target: 'autonomy-metrics',
      ...edgeStyle,
      label: 'generates metrics'
    },
    {
      id: 'e17',
      source: 'autonomy-metrics',
      target: 'trust-calibration',
      ...edgeStyle,
      label: 'informs calibration',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Strategic principle validation
    {
      id: 'e18',
      source: 'production-implementations',
      target: 'strategic-oversight',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'autonomy-metrics',
      target: 'strategic-oversight',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Traditional approaches failure validates principle
    {
      id: 'e20',
      source: 'traditional-approaches',
      target: 'strategic-oversight',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5', stroke: '#ef4444' }
    },
  ],
  steps: [
    {
      title: "Autonomous Agent Oversight Challenge",
      description: "Organizations need to maintain human control and accountability while enabling autonomous agents to operate efficiently at scale, avoiding both complete automation risks and human bottlenecks.",
      activeNodes: ['oversight-challenge'],
      activeEdges: []
    },
    {
      title: "HOTL vs Traditional Approaches",
      description: "Traditional binary models (full automation or human-in-the-loop) create problems. HOTL provides supervisory oversight that distinguishes supervision from participation, enabling autonomous operation with strategic human control.",
      activeNodes: ['traditional-approaches', 'hotl-framework', 'hitl-vs-hotl'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Core HOTL Architecture: Monitoring and Intervention",
      description: "HOTL implements real-time monitoring dashboards with behavior anomaly detection, paired with escalation-based intervention protocols triggered by confidence thresholds, risk levels, and performance degradation.",
      activeNodes: ['monitoring-architecture', 'intervention-protocols'],
      activeEdges: ['e4', 'e5', 'e6']
    },
    {
      title: "Safety and Governance Systems",
      description: "Emergency stop mechanisms, audit trails, and trust calibration systems ensure safety and compliance. Circuit breakers enable human override while maintaining transparency and accountability through comprehensive logging.",
      activeNodes: ['emergency-controls', 'audit-compliance', 'trust-calibration'],
      activeEdges: ['e7', 'e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Production Deployments and Metrics",
      description: "Real-world HOTL implementations in customer service (87% faster resolution), trading, and coding agents demonstrate effectiveness. Autonomy metrics track supervision effectiveness and human cognitive load optimization.",
      activeNodes: ['production-implementations', 'autonomy-metrics'],
      activeEdges: ['e13', 'e14', 'e15', 'e16', 'e17']
    },
    {
      title: "Strategic Oversight Principle",
      description: "HOTL enables humans to set strategic goals and boundaries while agents execute autonomously. Supervision replaces micromanagement, achieving both scale and control through calibrated trust and appropriate human-agent collaboration.",
      activeNodes: ['strategic-oversight'],
      activeEdges: ['e18', 'e19', 'e20']
    }
  ]
};