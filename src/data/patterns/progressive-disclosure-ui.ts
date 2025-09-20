import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const progressiveDisclosureUIPattern: PatternScenario = {
  id: 'progressive-disclosure-ui',
  title: 'Progressive Disclosure UI Pattern',
  description: 'Information hierarchy and layered interfaces that reduce cognitive load by revealing complexity gradually, improving task completion rates and user satisfaction in AI agent interactions',
  initialNodes: [
    // Cognitive overload challenge
    {
      id: 'cognitive-overload-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🧠 Cognitive Overload Challenge\n"How to present complex AI agent\ninformation without overwhelming\nusers and reducing effectiveness?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 320 },
    },

    // Progressive disclosure framework
    {
      id: 'progressive-disclosure-framework',
      position: { x: 400, y: 200 },
      data: { label: '📋 Progressive Disclosure Framework\n"Layered information:\n• Primary content first\n• Secondary on demand\n• Context-sensitive reveal\n• Cognitive load management"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Information hierarchy
    {
      id: 'information-hierarchy',
      position: { x: 200, y: 350 },
      data: { label: '🏗️ Information Hierarchy\n"Layered structure:\n• Primary layer (essential)\n• Secondary layer (supporting)\n• Tertiary layer (advanced)\n• Visual prioritization"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Cognitive load theory
    {
      id: 'cognitive-load-theory',
      position: { x: 50, y: 500 },
      data: { label: '🧩 Cognitive Load Theory\n"Three types:\n• Intrinsic (core task)\n• Extraneous (irrelevant)\n• Germane (learning)\n• Miller\'s 7±2 rule"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Disclosure patterns
    {
      id: 'disclosure-patterns',
      position: { x: 600, y: 350 },
      data: { label: '🎨 Disclosure Patterns\n"UI components:\n• Accordions & tabs\n• Modals & overlays\n• Drill-down navigation\n• Tooltips & popovers"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Interaction mechanisms
    {
      id: 'interaction-mechanisms',
      position: { x: 750, y: 500 },
      data: { label: '👆 Interaction Mechanisms\n"Reveal triggers:\n• Click/tap expansion\n• Hover/focus states\n• Swipe gestures\n• Voice commands"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Context-sensitive display
    {
      id: 'context-sensitive-display',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Context-Sensitive Display\n"Adaptive content:\n• Task-based filtering\n• User expertise levels\n• Situational awareness\n• Smart defaults"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Agent workflow visualization
    {
      id: 'agent-workflow-visualization',
      position: { x: 200, y: 800 },
      data: { label: '🔄 Agent Workflow Visualization\n"Process revelation:\n• Step-by-step disclosure\n• Progress indicators\n• Decision tree display\n• Execution transparency"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 260 },
    },

    // Multi-agent complexity
    {
      id: 'multi-agent-complexity',
      position: { x: 600, y: 800 },
      data: { label: '🤖 Multi-Agent Complexity\n"System management:\n• Hierarchical coordination\n• Interaction mapping\n• Coordination dashboards\n• Progressive complexity"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Accessibility considerations
    {
      id: 'accessibility-considerations',
      position: { x: 200, y: 950 },
      data: { label: '♿ Accessibility Design\n"Inclusive interfaces:\n• Screen reader support\n• Keyboard navigation\n• ARIA live regions\n• WCAG compliance"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Mobile optimization
    {
      id: 'mobile-optimization',
      position: { x: 600, y: 950 },
      data: { label: '📱 Mobile Optimization\n"Small screen design:\n• Touch-friendly targets\n• Swipe interactions\n• Space prioritization\n• Performance optimization"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Performance Metrics\n"Effectiveness measures:\n• Task completion rates\n• Time to completion\n• Cognitive load reduction\n• User satisfaction scores"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Core disclosure principle
    {
      id: 'disclosure-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Progressive Disclosure Principle\n"Gradual information reveal reduces cognitive load by 40-60%\nHierarchical content structure improves task completion rates\nContext-sensitive display enhances user satisfaction and efficiency"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'cognitive-overload-challenge',
      target: 'progressive-disclosure-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'progressive-disclosure-framework',
      target: 'information-hierarchy',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'progressive-disclosure-framework',
      target: 'disclosure-patterns',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e4',
      source: 'progressive-disclosure-framework',
      target: 'context-sensitive-display',
      ...edgeStyle,
      label: 'enables'
    },

    // Hierarchy foundation
    {
      id: 'e5',
      source: 'information-hierarchy',
      target: 'cognitive-load-theory',
      ...edgeStyle,
      label: 'based on'
    },

    // Pattern interactions
    {
      id: 'e6',
      source: 'disclosure-patterns',
      target: 'interaction-mechanisms',
      ...edgeStyle,
      label: 'triggered by'
    },

    // Context applications
    {
      id: 'e7',
      source: 'context-sensitive-display',
      target: 'agent-workflow-visualization',
      ...edgeStyle,
      label: 'applies to'
    },
    {
      id: 'e8',
      source: 'context-sensitive-display',
      target: 'multi-agent-complexity',
      ...edgeStyle,
      label: 'manages'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'cognitive-load-theory',
      target: 'agent-workflow-visualization',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e10',
      source: 'interaction-mechanisms',
      target: 'multi-agent-complexity',
      ...edgeStyle,
      label: 'supports'
    },

    // Implementation considerations
    {
      id: 'e11',
      source: 'agent-workflow-visualization',
      target: 'accessibility-considerations',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e12',
      source: 'multi-agent-complexity',
      target: 'mobile-optimization',
      ...edgeStyle,
      label: 'optimized for'
    },

    // Measurement and validation
    {
      id: 'e13',
      source: 'accessibility-considerations',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'measured by'
    },
    {
      id: 'e14',
      source: 'mobile-optimization',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'evaluated via'
    },

    // Metrics prove principle
    {
      id: 'e15',
      source: 'performance-metrics',
      target: 'disclosure-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Cognitive Overload Challenge",
      description: "How can complex AI agent information be presented without overwhelming users, managing the cognitive burden while maintaining functionality and effectiveness?",
      activeNodes: ['cognitive-overload-challenge'],
      activeEdges: []
    },
    {
      title: "Progressive Disclosure Framework",
      description: "Layered information approach addresses challenge through primary content prioritization, secondary information on demand, and context-sensitive reveal patterns.",
      activeNodes: ['progressive-disclosure-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Information Architecture and Patterns",
      description: "Three-layer hierarchy (primary/secondary/tertiary) based on cognitive load theory managing Miller's 7±2 rule. UI patterns include accordions, tabs, modals, and drill-down navigation.",
      activeNodes: ['information-hierarchy', 'cognitive-load-theory', 'disclosure-patterns', 'interaction-mechanisms'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Context-Sensitive Applications",
      description: "Adaptive content filtering based on user tasks and expertise. Agent workflow visualization provides step-by-step disclosure while multi-agent systems use hierarchical coordination views.",
      activeNodes: ['context-sensitive-display', 'agent-workflow-visualization', 'multi-agent-complexity'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Implementation Optimization",
      description: "Accessibility design ensures screen reader support and WCAG compliance. Mobile optimization prioritizes touch-friendly interfaces and space-efficient layouts for small screens.",
      activeNodes: ['accessibility-considerations', 'mobile-optimization'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Performance Validation",
      description: "Effectiveness measured through task completion rates, time reduction, and user satisfaction. Gradual information reveal reduces cognitive load 40-60% while improving task completion.",
      activeNodes: ['performance-metrics', 'disclosure-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};