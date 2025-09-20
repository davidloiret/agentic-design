import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const monitoringControlPatternsPattern: PatternScenario = {
  id: 'monitoring-control-patterns',
  title: 'Monitoring and Control Patterns',
  description: 'Mission-control style interfaces for real-time agent oversight, intervention capabilities, and system monitoring with <100ms update latency and enterprise-scale orchestration',
  initialNodes: [
    // Agent oversight challenge
    {
      id: 'agent-oversight-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Agent Oversight Challenge\n"How to monitor and control\ncomplex agent systems in\nreal-time at enterprise scale?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Mission control framework
    {
      id: 'mission-control-framework',
      position: { x: 400, y: 200 },
      data: { label: '🚀 Mission Control Framework\n"Command center design:\n• Dashboard architecture\n• Real-time monitoring\n• Intervention controls\n• System orchestration"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 290 },
    },

    // Dashboard architecture
    {
      id: 'dashboard-architecture',
      position: { x: 200, y: 350 },
      data: { label: '📊 Dashboard Architecture\n"Information hierarchy:\n• Single screen monitoring\n• Multi-level detail views\n• Centralized interface\n• Visual density balance"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Layout principles
    {
      id: 'layout-principles',
      position: { x: 50, y: 500 },
      data: { label: '📐 Layout Principles\n"Design foundation:\n• Hierarchical information\n• Big-picture overview\n• Historical trends\n• Objective achievement"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Real-time monitoring
    {
      id: 'real-time-monitoring',
      position: { x: 600, y: 350 },
      data: { label: '⚡ Real-Time Monitoring\n"Live oversight:\n• <100ms updates\n• WebSocket connections\n• Golden signals\n• Multi-layered observability"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Health monitoring
    {
      id: 'health-monitoring',
      position: { x: 750, y: 500 },
      data: { label: '💓 Health Monitoring\n"System vitals:\n• Latency & traffic\n• Error rates\n• Resource saturation\n• Model quality metrics"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Intervention controls
    {
      id: 'intervention-controls',
      position: { x: 400, y: 650 },
      data: { label: '🛑 Intervention Controls\n"Emergency systems:\n• Immediate stops\n• Selective shutdown\n• Rollback mechanisms\n• Confirmation gates"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Multi-agent orchestration
    {
      id: 'multi-agent-orchestration',
      position: { x: 200, y: 800 },
      data: { label: '🎼 Multi-Agent Orchestration\n"Coordination patterns:\n• Sequential pipelines\n• Concurrent execution\n• Handoff management\n• Resource allocation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Alert systems
    {
      id: 'alert-systems',
      position: { x: 600, y: 800 },
      data: { label: '🚨 Alert Systems\n"Intelligent notifications:\n• Severity hierarchy\n• Smart filtering\n• Fatigue prevention\n• Multi-channel routing"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      position: { x: 200, y: 950 },
      data: { label: '📈 Performance Metrics\n"Comprehensive tracking:\n• Operational metrics\n• Quality assessment\n• Business KPIs\n• Predictive analytics"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Enterprise integration
    {
      id: 'enterprise-integration',
      position: { x: 600, y: 950 },
      data: { label: '🏢 Enterprise Integration\n"System connectivity:\n• OpenTelemetry\n• Prometheus/Grafana\n• SIEM integration\n• Role-based access"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Production deployments
    {
      id: 'production-deployments',
      position: { x: 400, y: 1100 },
      data: { label: '🌐 Production Deployments\n"Enterprise scale:\n• Azure AI Foundry\n• Thousands of agents\n• Multi-environment\n• 24/7 operations"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Core control principle
    {
      id: 'control-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Mission Control Principle\n"Centralized oversight with <100ms updates enables real-time agent management\nHierarchical intervention controls ensure system safety and reliability\nEnterprise integration provides comprehensive monitoring at scale"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'agent-oversight-challenge',
      target: 'mission-control-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'mission-control-framework',
      target: 'dashboard-architecture',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'mission-control-framework',
      target: 'real-time-monitoring',
      ...edgeStyle,
      label: 'provides'
    },
    {
      id: 'e4',
      source: 'mission-control-framework',
      target: 'intervention-controls',
      ...edgeStyle,
      label: 'enables'
    },

    // Dashboard details
    {
      id: 'e5',
      source: 'dashboard-architecture',
      target: 'layout-principles',
      ...edgeStyle,
      label: 'based on'
    },

    // Monitoring details
    {
      id: 'e6',
      source: 'real-time-monitoring',
      target: 'health-monitoring',
      ...edgeStyle,
      label: 'includes'
    },

    // Control flows
    {
      id: 'e7',
      source: 'intervention-controls',
      target: 'multi-agent-orchestration',
      ...edgeStyle,
      label: 'coordinates'
    },
    {
      id: 'e8',
      source: 'intervention-controls',
      target: 'alert-systems',
      ...edgeStyle,
      label: 'triggers'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'layout-principles',
      target: 'multi-agent-orchestration',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e10',
      source: 'health-monitoring',
      target: 'alert-systems',
      ...edgeStyle,
      label: 'feeds'
    },

    // Metrics and integration
    {
      id: 'e11',
      source: 'multi-agent-orchestration',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'measured by'
    },
    {
      id: 'e12',
      source: 'alert-systems',
      target: 'enterprise-integration',
      ...edgeStyle,
      label: 'routed via'
    },

    // Production validation
    {
      id: 'e13',
      source: 'performance-metrics',
      target: 'production-deployments',
      ...edgeStyle,
      label: 'deployed in'
    },
    {
      id: 'e14',
      source: 'enterprise-integration',
      target: 'production-deployments',
      ...edgeStyle,
      label: 'enables'
    },

    // Deployment proves principle
    {
      id: 'e15',
      source: 'production-deployments',
      target: 'control-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Agent Oversight Challenge",
      description: "How can complex agent systems be monitored and controlled in real-time at enterprise scale while ensuring safety, reliability, and operational efficiency?",
      activeNodes: ['agent-oversight-challenge'],
      activeEdges: []
    },
    {
      title: "Mission Control Framework",
      description: "Command center design addresses challenge through dashboard architecture, real-time monitoring capabilities, intervention controls, and comprehensive system orchestration mechanisms.",
      activeNodes: ['mission-control-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Dashboard Architecture and Real-Time Monitoring",
      description: "Information hierarchy enables single screen monitoring with multi-level detail views. Real-time monitoring provides <100ms updates via WebSocket connections with Golden Signals tracking.",
      activeNodes: ['dashboard-architecture', 'layout-principles', 'real-time-monitoring', 'health-monitoring'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Intervention Controls and Orchestration",
      description: "Emergency systems provide immediate stops and rollback mechanisms with confirmation gates. Multi-agent orchestration coordinates sequential pipelines and concurrent execution patterns.",
      activeNodes: ['intervention-controls', 'multi-agent-orchestration', 'alert-systems'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Performance Metrics and Enterprise Integration",
      description: "Comprehensive tracking includes operational metrics, quality assessment, and business KPIs. Enterprise integration supports OpenTelemetry, SIEM systems, and role-based access control.",
      activeNodes: ['performance-metrics', 'enterprise-integration'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Scale Validation",
      description: "Azure AI Foundry and similar platforms manage thousands of agents across multi-environment deployments. Centralized oversight with hierarchical controls ensures reliable 24/7 operations at scale.",
      activeNodes: ['production-deployments', 'control-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};