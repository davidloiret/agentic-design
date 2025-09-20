import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agentStatusActivityUIPattern: PatternScenario = {
  id: 'agent-status-activity-ui',
  title: 'Agent Status & Activity UI Pattern',
  description: 'Real-time interface elements showing agent operational states, thinking processes, and system activities with <100ms update latency for transparent user awareness',
  initialNodes: [
    // Agent transparency challenge
    {
      id: 'agent-transparency-challenge',
      position: { x: 400, y: 50 },
      data: { label: '👁️ Agent Transparency Challenge\n"How to provide real-time visibility\ninto agent activities, thinking states,\nand operational status?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Status activity framework
    {
      id: 'status-activity-framework',
      position: { x: 400, y: 200 },
      data: { label: '📊 Status & Activity Framework\n"Real-time monitoring:\n• Operational indicators\n• Activity visualization\n• Progress tracking\n• Health monitoring"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Status indicators
    {
      id: 'status-indicators',
      position: { x: 200, y: 350 },
      data: { label: '🚦 Status Indicators\n"State visualization:\n• Color coding systems\n• Shape differentiation\n• Animation patterns\n• <100ms updates"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 230 },
    },

    // Real-time updates
    {
      id: 'real-time-updates',
      position: { x: 50, y: 500 },
      data: { label: '⚡ Real-Time Updates\n"Live synchronization:\n• WebSocket connections\n• Event-driven updates\n• Optimistic UI\n• Fallback polling"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Activity visualization
    {
      id: 'activity-visualization',
      position: { x: 600, y: 350 },
      data: { label: '🎬 Activity Visualization\n"Process display:\n• Thinking processes\n• Decision trees\n• Timeline views\n• Progressive disclosure"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Thinking process UI
    {
      id: 'thinking-process-ui',
      position: { x: 750, y: 500 },
      data: { label: '🧠 Thinking Process UI\n"Cognitive visualization:\n• Reasoning steps\n• Confidence intervals\n• Evidence aggregation\n• LangGraph streaming"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Multi-agent coordination
    {
      id: 'multi-agent-coordination',
      position: { x: 400, y: 650 },
      data: { label: '🤖 Multi-Agent Coordination\n"System overview:\n• Agent hierarchies\n• Communication flows\n• Resource allocation\n• Task distribution"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Progress indicators
    {
      id: 'progress-indicators',
      position: { x: 200, y: 800 },
      data: { label: '📈 Progress Indicators\n"Task tracking:\n• Contextual progress bars\n• Time estimation\n• Multi-stage indicators\n• Completion forecasts"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Error recovery displays
    {
      id: 'error-recovery-displays',
      position: { x: 600, y: 800 },
      data: { label: '🔧 Error Recovery Displays\n"Failure handling:\n• Error state hierarchy\n• Recovery indicators\n• Retry mechanisms\n• Rollback status"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Performance monitoring
    {
      id: 'performance-monitoring',
      position: { x: 200, y: 950 },
      data: { label: '📊 Performance Monitoring\n"System health:\n• Resource utilization\n• API rate limits\n• Queue depth\n• Health metrics"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Notification systems
    {
      id: 'notification-systems',
      position: { x: 600, y: 950 },
      data: { label: '🔔 Notification Systems\n"Alert hierarchy:\n• Critical alerts\n• Smart filtering\n• Adaptive timing\n• Fatigue prevention"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Mobile responsive design
    {
      id: 'mobile-responsive-design',
      position: { x: 400, y: 1100 },
      data: { label: '📱 Mobile Responsive Design\n"Cross-platform:\n• Touch optimization\n• Adaptive layouts\n• Gesture navigation\n• Offline caching"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core monitoring principle
    {
      id: 'monitoring-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Agent Status Monitoring Principle\n"Real-time status indicators with <100ms updates provide transparent visibility\nThinking process visualization builds trust through reasoning transparency\nMulti-modal notifications ensure appropriate user awareness without fatigue"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'agent-transparency-challenge',
      target: 'status-activity-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'status-activity-framework',
      target: 'status-indicators',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'status-activity-framework',
      target: 'activity-visualization',
      ...edgeStyle,
      label: 'displays'
    },
    {
      id: 'e4',
      source: 'status-activity-framework',
      target: 'multi-agent-coordination',
      ...edgeStyle,
      label: 'coordinates'
    },

    // Status details
    {
      id: 'e5',
      source: 'status-indicators',
      target: 'real-time-updates',
      ...edgeStyle,
      label: 'powered by'
    },

    // Activity details
    {
      id: 'e6',
      source: 'activity-visualization',
      target: 'thinking-process-ui',
      ...edgeStyle,
      label: 'includes'
    },

    // Coordination flows
    {
      id: 'e7',
      source: 'multi-agent-coordination',
      target: 'progress-indicators',
      ...edgeStyle,
      label: 'tracks via'
    },
    {
      id: 'e8',
      source: 'multi-agent-coordination',
      target: 'error-recovery-displays',
      ...edgeStyle,
      label: 'handles via'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'real-time-updates',
      target: 'progress-indicators',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e10',
      source: 'thinking-process-ui',
      target: 'error-recovery-displays',
      ...edgeStyle,
      label: 'supports'
    },

    // Monitoring flows
    {
      id: 'e11',
      source: 'progress-indicators',
      target: 'performance-monitoring',
      ...edgeStyle,
      label: 'feeds'
    },
    {
      id: 'e12',
      source: 'error-recovery-displays',
      target: 'notification-systems',
      ...edgeStyle,
      label: 'triggers'
    },

    // Implementation considerations
    {
      id: 'e13',
      source: 'performance-monitoring',
      target: 'mobile-responsive-design',
      ...edgeStyle,
      label: 'optimized for'
    },
    {
      id: 'e14',
      source: 'notification-systems',
      target: 'mobile-responsive-design',
      ...edgeStyle,
      label: 'adapted for'
    },

    // Design validates principle
    {
      id: 'e15',
      source: 'mobile-responsive-design',
      target: 'monitoring-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Agent Transparency Challenge",
      description: "How can interfaces provide real-time visibility into agent activities, thinking states, and operational status to build user trust and awareness?",
      activeNodes: ['agent-transparency-challenge'],
      activeEdges: []
    },
    {
      title: "Status & Activity Framework",
      description: "Real-time monitoring framework addresses challenge through operational indicators, activity visualization, progress tracking, and comprehensive health monitoring systems.",
      activeNodes: ['status-activity-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Status Indicators and Activity Visualization",
      description: "Color-coded systems with shape differentiation achieve <100ms updates via WebSocket connections. Activity displays include thinking processes, decision trees, and LangGraph streaming.",
      activeNodes: ['status-indicators', 'real-time-updates', 'activity-visualization', 'thinking-process-ui'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Multi-Agent Coordination and Progress",
      description: "System overview shows agent hierarchies and communication flows. Progress indicators provide contextual tracking while error recovery displays handle failure states with retry mechanisms.",
      activeNodes: ['multi-agent-coordination', 'progress-indicators', 'error-recovery-displays'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Performance and Notification Systems",
      description: "Health monitoring tracks resource utilization and API limits. Smart notification hierarchy prevents fatigue through adaptive timing and contextual filtering.",
      activeNodes: ['performance-monitoring', 'notification-systems'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Mobile Responsive Implementation",
      description: "Cross-platform design with touch optimization and adaptive layouts. Real-time transparency with thinking process visualization creates trust through comprehensive user awareness.",
      activeNodes: ['mobile-responsive-design', 'monitoring-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};