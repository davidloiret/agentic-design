import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const confidenceVisualizationUIPattern: PatternScenario = {
  id: 'confidence-visualization-ui',
  title: 'Confidence Visualization UI Pattern',
  description: 'Visual representation of AI uncertainty and confidence levels using progress bars, color coding, and interactive displays achieving 82% improvement in appropriate AI reliance',
  initialNodes: [
    // AI trust challenge
    {
      id: 'ai-trust-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤔 AI Trust Challenge\n"How to help users understand\nAI confidence levels and\nmake appropriate trust decisions?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Confidence visualization framework
    {
      id: 'confidence-visualization-framework',
      position: { x: 400, y: 200 },
      data: { label: '📊 Confidence Visualization Framework\n"Trust calibration:\n• Uncertainty display\n• Visual confidence meters\n• Interactive exploration\n• Transparency communication"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 290 },
    },

    // Uncertainty types
    {
      id: 'uncertainty-types',
      position: { x: 200, y: 350 },
      data: { label: '🎯 Uncertainty Types\n"Spectrum approach:\n• Parameter uncertainty\n• Structural uncertainty\n• Data uncertainty\n• Computational uncertainty"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Modern uncertainty theory
    {
      id: 'modern-uncertainty-theory',
      position: { x: 50, y: 500 },
      data: { label: '🔬 Modern Uncertainty Theory\n"2025 perspective:\n• Beyond aleatoric/epistemic\n• Spectrum of uncertainties\n• Context-dependent\n• Dynamic assessment"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Visual representations
    {
      id: 'visual-representations',
      position: { x: 600, y: 350 },
      data: { label: '🎨 Visual Representations\n"Display methods:\n• Progress bars\n• Gauge charts\n• Distribution plots\n• Badge systems"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Color coding systems
    {
      id: 'color-coding-systems',
      position: { x: 750, y: 500 },
      data: { label: '🌈 Color Coding Systems\n"Trust communication:\n• Green-yellow-red gradients\n• Blue reliability scales\n• WCAG 2.2 compliance\n• Cultural sensitivity"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Trust calibration
    {
      id: 'trust-calibration',
      position: { x: 400, y: 650 },
      data: { label: '🤝 Trust Calibration\n"Appropriate reliance:\n• 82% improvement rates\n• Well-calibrated trust\n• Overconfidence mitigation\n• Capability understanding"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Interactive exploration
    {
      id: 'interactive-exploration',
      position: { x: 200, y: 800 },
      data: { label: '🔍 Interactive Exploration\n"User control:\n• Confidence drill-down\n• Reasoning visualization\n• Historical confidence\n• Comparative analysis"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Real-time updates
    {
      id: 'real-time-updates',
      position: { x: 600, y: 800 },
      data: { label: '⚡ Real-Time Updates\n"Dynamic display:\n• Streaming confidence\n• Evolution tracking\n• Adaptive frequency\n• Context awareness"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Multi-modal design
    {
      id: 'multi-modal-design',
      position: { x: 200, y: 950 },
      data: { label: '🎭 Multi-Modal Design\n"Accessibility focus:\n• Visual-audio-tactile\n• Screen reader support\n• Voice interface\n• Haptic feedback"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Production implementations
    {
      id: 'production-implementations',
      position: { x: 600, y: 950 },
      data: { label: '🏢 Production Cases\n"Real-world success:\n• Medical AI (78% threshold)\n• Financial services\n• Content generation\n• 58% trust improvement"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Design principles
    {
      id: 'design-principles',
      position: { x: 400, y: 1100 },
      data: { label: '📐 Design Principles\n"Implementation guide:\n• Transparency-first\n• Progressive disclosure\n• Contextual adaptation\n• Continuous testing"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core visualization principle
    {
      id: 'visualization-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Confidence Visualization Principle\n"Visual uncertainty display achieves 82% improvement in appropriate AI reliance\nTrust calibration through transparency reduces overconfidence by 58%\nMulti-modal accessibility ensures inclusive confidence communication"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'ai-trust-challenge',
      target: 'confidence-visualization-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'confidence-visualization-framework',
      target: 'uncertainty-types',
      ...edgeStyle,
      label: 'identifies'
    },
    {
      id: 'e3',
      source: 'confidence-visualization-framework',
      target: 'visual-representations',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e4',
      source: 'confidence-visualization-framework',
      target: 'trust-calibration',
      ...edgeStyle,
      label: 'enables'
    },

    // Uncertainty foundations
    {
      id: 'e5',
      source: 'uncertainty-types',
      target: 'modern-uncertainty-theory',
      ...edgeStyle,
      label: 'based on'
    },

    // Visual design
    {
      id: 'e6',
      source: 'visual-representations',
      target: 'color-coding-systems',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Trust mechanisms
    {
      id: 'e7',
      source: 'trust-calibration',
      target: 'interactive-exploration',
      ...edgeStyle,
      label: 'supports'
    },
    {
      id: 'e8',
      source: 'trust-calibration',
      target: 'real-time-updates',
      ...edgeStyle,
      label: 'requires'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'modern-uncertainty-theory',
      target: 'interactive-exploration',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e10',
      source: 'color-coding-systems',
      target: 'real-time-updates',
      ...edgeStyle,
      label: 'applied in'
    },

    // Implementation flows
    {
      id: 'e11',
      source: 'interactive-exploration',
      target: 'multi-modal-design',
      ...edgeStyle,
      label: 'accessible via'
    },
    {
      id: 'e12',
      source: 'real-time-updates',
      target: 'production-implementations',
      ...edgeStyle,
      label: 'deployed in'
    },

    // Design and validation
    {
      id: 'e13',
      source: 'multi-modal-design',
      target: 'design-principles',
      ...edgeStyle,
      label: 'guided by'
    },
    {
      id: 'e14',
      source: 'production-implementations',
      target: 'design-principles',
      ...edgeStyle,
      label: 'validates'
    },

    // Principles prove effectiveness
    {
      id: 'e15',
      source: 'design-principles',
      target: 'visualization-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Trust Challenge",
      description: "How can users understand AI confidence levels and make appropriate trust decisions when AI systems provide varying degrees of certainty in their outputs?",
      activeNodes: ['ai-trust-challenge'],
      activeEdges: []
    },
    {
      title: "Confidence Visualization Framework",
      description: "Trust calibration framework addresses challenge through uncertainty display, visual confidence meters, interactive exploration tools, and transparent communication mechanisms.",
      activeNodes: ['confidence-visualization-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Uncertainty Types and Visual Design",
      description: "Modern 2025 approach recognizes spectrum of uncertainties beyond traditional categories. Visual representations include progress bars, gauge charts, distribution plots with WCAG-compliant color coding.",
      activeNodes: ['uncertainty-types', 'modern-uncertainty-theory', 'visual-representations', 'color-coding-systems'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Trust Calibration and Interaction",
      description: "Achieves 82% improvement in appropriate AI reliance through well-calibrated trust. Interactive exploration enables confidence drill-down while real-time updates show dynamic confidence evolution.",
      activeNodes: ['trust-calibration', 'interactive-exploration', 'real-time-updates'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Accessibility and Production Success",
      description: "Multi-modal design ensures visual-audio-tactile accessibility. Production implementations in medical AI, financial services achieve 58% trust improvement with 78% confidence thresholds.",
      activeNodes: ['multi-modal-design', 'production-implementations'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Design Principles and Validation",
      description: "Transparency-first design with progressive disclosure and contextual adaptation. Visual uncertainty display with trust calibration creates inclusive confidence communication for appropriate AI reliance.",
      activeNodes: ['design-principles', 'visualization-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};