import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const errorHandlingRecoveryPatternsPattern: PatternScenario = {
  id: 'error-handling-recovery-patterns',
  title: 'Error Handling and Recovery Patterns',
  description: 'Comprehensive error communication and recovery interface patterns for graceful failure handling achieving 95% automatic error resolution with 99.8% threat detection',
  initialNodes: [
    // System failure challenge
    {
      id: 'system-failure-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💥 System Failure Challenge\n"How to handle errors gracefully\nwith clear communication and\neffective recovery mechanisms?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Error handling framework
    {
      id: 'error-handling-framework',
      position: { x: 400, y: 200 },
      data: { label: '🛡️ Error Handling Framework\n"Graceful failure management:\n• Error communication\n• Recovery mechanisms\n• Context preservation\n• User guidance"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Error communication
    {
      id: 'error-communication',
      position: { x: 200, y: 350 },
      data: { label: '💬 Error Communication\n"Three-element structure:\n• Problem statement\n• Cause explanation\n• Solution suggestion\n• User-friendly language"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Message patterns
    {
      id: 'message-patterns',
      position: { x: 50, y: 500 },
      data: { label: '📝 Message Patterns\n"Display modalities:\n• Inline validation\n• Contextual tooltips\n• Critical modals\n• Persistent banners"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Graceful degradation
    {
      id: 'graceful-degradation',
      position: { x: 600, y: 350 },
      data: { label: '🔄 Graceful Degradation\n"Fallback strategies:\n• Layered architecture\n• Performance switching\n• Load redistribution\n• Context preservation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Fallback mechanisms
    {
      id: 'fallback-mechanisms',
      position: { x: 750, y: 500 },
      data: { label: '⚡ Fallback Mechanisms\n"Automatic switching:\n• Timeout-based routing\n• Quality monitoring\n• Resource balancing\n• Self-healing systems"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Recovery systems
    {
      id: 'recovery-systems',
      position: { x: 400, y: 650 },
      data: { label: '🔧 Recovery Systems\n"Intelligent restoration:\n• 95% automatic resolution\n• Exponential backoff\n• Circuit breakers\n• Context restoration"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Error categorization
    {
      id: 'error-categorization',
      position: { x: 200, y: 800 },
      data: { label: '🏷️ Error Categorization\n"Severity systems:\n• Input/System/Network\n• Color-coded hierarchy\n• Priority badges\n• Accessibility indicators"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Progressive disclosure
    {
      id: 'progressive-disclosure',
      position: { x: 600, y: 800 },
      data: { label: '📊 Progressive Disclosure\n"Troubleshooting guides:\n• Expandable reasoning\n• Step-by-step disclosure\n• Interactive tutorials\n• Self-service recovery"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Developer debugging
    {
      id: 'developer-debugging',
      position: { x: 200, y: 950 },
      data: { label: '🔍 Developer Debugging\n"Technical interfaces:\n• Mission-control dashboards\n• Anomaly detection\n• Audit trails\n• Performance metrics"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Cross-system handling
    {
      id: 'cross-system-handling',
      position: { x: 600, y: 950 },
      data: { label: '🌐 Cross-System Handling\n"Multi-agent coordination:\n• 99.94% delivery rate\n• 2.3s recovery time\n• Message guarantees\n• Network tolerance"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Production success
    {
      id: 'production-success',
      position: { x: 400, y: 1100 },
      data: { label: '🏆 Production Success\n"Reliability metrics:\n• 99.8% threat detection\n• 67% ticket reduction\n• 340% average ROI\n• 98.2% user continuity"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Core recovery principle
    {
      id: 'recovery-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Error Recovery Principle\n"Three-element communication with graceful degradation achieves 95% automatic resolution\nContext preservation with progressive disclosure maintains user trust\nCross-system coordination ensures 99.8% threat detection with enterprise reliability"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'system-failure-challenge',
      target: 'error-handling-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'error-handling-framework',
      target: 'error-communication',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'error-handling-framework',
      target: 'graceful-degradation',
      ...edgeStyle,
      label: 'provides'
    },
    {
      id: 'e4',
      source: 'error-handling-framework',
      target: 'recovery-systems',
      ...edgeStyle,
      label: 'enables'
    },

    // Communication details
    {
      id: 'e5',
      source: 'error-communication',
      target: 'message-patterns',
      ...edgeStyle,
      label: 'uses'
    },

    // Degradation details
    {
      id: 'e6',
      source: 'graceful-degradation',
      target: 'fallback-mechanisms',
      ...edgeStyle,
      label: 'powered by'
    },

    // Recovery flows
    {
      id: 'e7',
      source: 'recovery-systems',
      target: 'error-categorization',
      ...edgeStyle,
      label: 'organized by'
    },
    {
      id: 'e8',
      source: 'recovery-systems',
      target: 'progressive-disclosure',
      ...edgeStyle,
      label: 'guided by'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'message-patterns',
      target: 'error-categorization',
      ...edgeStyle,
      label: 'adapts to'
    },
    {
      id: 'e10',
      source: 'fallback-mechanisms',
      target: 'progressive-disclosure',
      ...edgeStyle,
      label: 'explains via'
    },

    // Advanced features
    {
      id: 'e11',
      source: 'error-categorization',
      target: 'developer-debugging',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e12',
      source: 'progressive-disclosure',
      target: 'cross-system-handling',
      ...edgeStyle,
      label: 'coordinates'
    },

    // Production validation
    {
      id: 'e13',
      source: 'developer-debugging',
      target: 'production-success',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e14',
      source: 'cross-system-handling',
      target: 'production-success',
      ...edgeStyle,
      label: 'achieves'
    },

    // Success proves principle
    {
      id: 'e15',
      source: 'production-success',
      target: 'recovery-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "System Failure Challenge",
      description: "How can agent systems handle errors gracefully with clear communication, effective recovery mechanisms, and minimal user disruption during failures?",
      activeNodes: ['system-failure-challenge'],
      activeEdges: []
    },
    {
      title: "Error Handling Framework",
      description: "Graceful failure management framework addresses challenge through comprehensive error communication, recovery mechanisms, context preservation, and user guidance systems.",
      activeNodes: ['error-handling-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Communication and Degradation Strategies",
      description: "Three-element error structure (problem/cause/solution) with user-friendly language. Graceful degradation uses layered architecture with automatic fallback mechanisms and performance switching.",
      activeNodes: ['error-communication', 'message-patterns', 'graceful-degradation', 'fallback-mechanisms'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Recovery Systems and Categorization",
      description: "Intelligent restoration achieves 95% automatic resolution through exponential backoff and circuit breakers. Error categorization provides severity hierarchy with accessibility-compliant indicators.",
      activeNodes: ['recovery-systems', 'error-categorization', 'progressive-disclosure'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Developer Tools and Cross-System Coordination",
      description: "Mission-control dashboards with anomaly detection support technical debugging. Cross-system handling achieves 99.94% delivery rate with 2.3s recovery time through multi-agent coordination.",
      activeNodes: ['developer-debugging', 'cross-system-handling'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Success and Validation",
      description: "99.8% threat detection with 67% ticket reduction validates comprehensive error handling. Three-element communication with context preservation ensures enterprise reliability and user trust.",
      activeNodes: ['production-success', 'recovery-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};