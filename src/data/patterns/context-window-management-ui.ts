import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextWindowManagementUIPattern: PatternScenario = {
  id: 'context-window-management-ui',
  title: 'Context Window Management UI Pattern',
  description: 'Visual patterns for managing LLM context limits, token usage optimization, and context window efficiency achieving 94% cost reduction with 20x compression ratios',
  initialNodes: [
    // Context window challenge
    {
      id: 'context-window-challenge',
      position: { x: 400, y: 50 },
      data: { label: '📊 Context Window Challenge\n"How to visualize and manage\nLLM context limits, token usage,\nand optimization efficiently?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Context management framework
    {
      id: 'context-management-framework',
      position: { x: 400, y: 200 },
      data: { label: '🎛️ Context Management Framework\n"Visual control system:\n• Usage visualization\n• Budget management\n• Smart optimization\n• User controls"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Usage visualization
    {
      id: 'usage-visualization',
      position: { x: 200, y: 350 },
      data: { label: '📈 Usage Visualization\n"Token tracking:\n• Progress bars\n• Color coding\n• Real-time counters\n• Heat maps"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Visual indicators
    {
      id: 'visual-indicators',
      position: { x: 50, y: 500 },
      data: { label: '🚦 Visual Indicators\n"Status display:\n• Traffic light colors\n• Gauge meters\n• Timeline views\n• Network graphs"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 210 },
    },

    // Budget management
    {
      id: 'budget-management',
      position: { x: 600, y: 350 },
      data: { label: '💰 Budget Management\n"Cost control:\n• Budget allocation\n• Spending alerts\n• Cost calculators\n• Usage analytics"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 230 },
    },

    // Smart budgeting
    {
      id: 'smart-budgeting',
      position: { x: 750, y: 500 },
      data: { label: '🧠 Smart Budgeting\n"Intelligent tracking:\n• Predictive spending\n• Department allocation\n• Compliance tracking\n• Efficiency metrics"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Context optimization
    {
      id: 'context-optimization',
      position: { x: 400, y: 650 },
      data: { label: '⚡ Context Optimization\n"Smart compression:\n• 20x compression ratio\n• 94% cost reduction\n• Quality preservation\n• Performance gains"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Compression controls
    {
      id: 'compression-controls',
      position: { x: 200, y: 800 },
      data: { label: '🗜️ Compression Controls\n"User interface:\n• Compression sliders\n• Before/after views\n• Quality indicators\n• Reversible compression"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Real-time monitoring
    {
      id: 'real-time-monitoring',
      position: { x: 600, y: 800 },
      data: { label: '⏱️ Real-Time Monitoring\n"Live tracking:\n• Performance metrics\n• Optimization suggestions\n• Response time\n• Memory utilization"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Context caching
    {
      id: 'context-caching',
      position: { x: 200, y: 950 },
      data: { label: '💾 Context Caching\n"Intelligent storage:\n• Cache hit indicators\n• Preloading displays\n• 8x memory reduction\n• Smart prefetching"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Cross-session management
    {
      id: 'cross-session-management',
      position: { x: 600, y: 950 },
      data: { label: '🔄 Cross-Session Management\n"Persistence patterns:\n• Session bridges\n• Memory vaults\n• Context archives\n• Privacy boundaries"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },

    // Production success
    {
      id: 'production-success',
      position: { x: 400, y: 1100 },
      data: { label: '🏆 Production Success\n"Industry results:\n• OpenAI token counting\n• Claude memory system\n• Gemini context caching\n• Enterprise governance"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Core management principle
    {
      id: 'management-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Management Principle\n"Visual context tracking with smart compression achieves 94% cost reduction\nReal-time optimization with user controls enables efficient token usage\nCross-session persistence with privacy boundaries ensures continuity"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'context-window-challenge',
      target: 'context-management-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'context-management-framework',
      target: 'usage-visualization',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'context-management-framework',
      target: 'budget-management',
      ...edgeStyle,
      label: 'provides'
    },
    {
      id: 'e4',
      source: 'context-management-framework',
      target: 'context-optimization',
      ...edgeStyle,
      label: 'enables'
    },

    // Visualization details
    {
      id: 'e5',
      source: 'usage-visualization',
      target: 'visual-indicators',
      ...edgeStyle,
      label: 'includes'
    },

    // Budget details
    {
      id: 'e6',
      source: 'budget-management',
      target: 'smart-budgeting',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Optimization flows
    {
      id: 'e7',
      source: 'context-optimization',
      target: 'compression-controls',
      ...edgeStyle,
      label: 'controlled by'
    },
    {
      id: 'e8',
      source: 'context-optimization',
      target: 'real-time-monitoring',
      ...edgeStyle,
      label: 'monitored by'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'visual-indicators',
      target: 'compression-controls',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e10',
      source: 'smart-budgeting',
      target: 'real-time-monitoring',
      ...edgeStyle,
      label: 'informs'
    },

    // Advanced features
    {
      id: 'e11',
      source: 'compression-controls',
      target: 'context-caching',
      ...edgeStyle,
      label: 'optimized by'
    },
    {
      id: 'e12',
      source: 'real-time-monitoring',
      target: 'cross-session-management',
      ...edgeStyle,
      label: 'enables'
    },

    // Production validation
    {
      id: 'e13',
      source: 'context-caching',
      target: 'production-success',
      ...edgeStyle,
      label: 'deployed in'
    },
    {
      id: 'e14',
      source: 'cross-session-management',
      target: 'production-success',
      ...edgeStyle,
      label: 'achieved in'
    },

    // Success proves principle
    {
      id: 'e15',
      source: 'production-success',
      target: 'management-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Window Challenge",
      description: "How can interfaces effectively visualize and manage LLM context limits, token usage, and optimization to help users understand and control their context efficiently?",
      activeNodes: ['context-window-challenge'],
      activeEdges: []
    },
    {
      title: "Context Management Framework",
      description: "Visual control system addresses challenge through usage visualization, budget management, smart optimization, and comprehensive user controls for context window management.",
      activeNodes: ['context-management-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Usage Visualization and Budget Management",
      description: "Token tracking with progress bars, color coding, and heat maps. Budget management provides cost control with predictive spending analytics and department allocation systems.",
      activeNodes: ['usage-visualization', 'visual-indicators', 'budget-management', 'smart-budgeting'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Context Optimization and Control",
      description: "Smart compression achieves 20x compression ratio with 94% cost reduction. User controls include compression sliders and quality indicators while real-time monitoring tracks performance.",
      activeNodes: ['context-optimization', 'compression-controls', 'real-time-monitoring'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Advanced Caching and Session Management",
      description: "Context caching achieves 8x memory reduction with smart prefetching. Cross-session management provides persistence through memory vaults and context archives with privacy boundaries.",
      activeNodes: ['context-caching', 'cross-session-management'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Production Success and Validation",
      description: "Industry implementations include OpenAI token counting, Claude memory systems, and Gemini context caching. Visual tracking with smart compression enables efficient token usage at scale.",
      activeNodes: ['production-success', 'management-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};