import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const humanInTheLoopPattern: PatternScenario = {
  id: 'human-in-the-loop',
  title: 'Human-in-the-Loop Pattern',
  description: 'Collaborative human-AI workflows integrating human oversight, feedback, and control achieving 25-40% accuracy improvements with strategic intervention points',
  initialNodes: [
    // Human-AI collaboration challenge
    {
      id: 'collaboration-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤔 Human-AI Collaboration Challenge\n"How to optimally integrate\nhuman expertise with AI capabilities\nfor superior outcomes?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // HITL framework
    {
      id: 'hitl-framework',
      position: { x: 400, y: 200 },
      data: { label: '🤝 HITL Framework\n"Collaborative system:\n• Intervention points\n• Feedback loops\n• Oversight controls\n• Trust calibration"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 260 },
    },

    // Intervention types
    {
      id: 'intervention-types',
      position: { x: 200, y: 350 },
      data: { label: '🚦 Intervention Points\n"Human control:\n• Pre-execution approval\n• Real-time correction\n• Post-execution review\n• Exception escalation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Decision delegation
    {
      id: 'decision-delegation',
      position: { x: 50, y: 500 },
      data: { label: '⚖️ Decision Delegation\n"Smart handoff:\n• Confidence thresholds\n• Uncertainty detection\n• Complexity assessment\n• Risk evaluation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Feedback integration
    {
      id: 'feedback-integration',
      position: { x: 600, y: 350 },
      data: { label: '🔄 Feedback Integration\n"Learning mechanisms:\n• RLHF training\n• Active learning\n• Preference learning\n• Online adaptation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // RLHF implementation
    {
      id: 'rlhf-implementation',
      position: { x: 750, y: 500 },
      data: { label: '🎯 RLHF Process\n"Human alignment:\n• Response ranking\n• Reward modeling\n• PPO optimization\n• 25-40% improvement"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Collaborative workflows
    {
      id: 'collaborative-workflows',
      position: { x: 400, y: 650 },
      data: { label: '👥 Collaborative Workflows\n"Working patterns:\n• Centaur model\n• Cyborg integration\n• Handoff protocols\n• State preservation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Quality assurance
    {
      id: 'quality-assurance',
      position: { x: 200, y: 800 },
      data: { label: '✅ Quality Assurance\n"Human validation:\n• Multi-reviewer systems\n• Expert validation\n• Bias detection\n• Fairness assessment"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Trust mechanisms
    {
      id: 'trust-mechanisms',
      position: { x: 600, y: 800 },
      data: { label: '🔐 Trust Mechanisms\n"Transparency:\n• Explainable decisions\n• Confidence display\n• Audit trails\n• Performance metrics"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 230 },
    },

    // Interface design
    {
      id: 'interface-design',
      position: { x: 200, y: 950 },
      data: { label: '🖥️ Interface Design\n"Collaboration tools:\n• Progressive disclosure\n• Context preservation\n• Multimodal interaction\n• Shared workspaces"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Production results
    {
      id: 'production-results',
      position: { x: 600, y: 950 },
      data: { label: '📊 Production Results\n"Proven outcomes:\n• 105 min/day saved\n• 30% error reduction\n• $129.4M annual ROI\n• 78% adoption rate"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Implementation patterns
    {
      id: 'implementation-patterns',
      position: { x: 400, y: 1100 },
      data: { label: '🚀 Implementation Patterns\n"Deployment strategies:\n• Gradual rollout\n• A/B testing\n• Pilot programs\n• Continuous monitoring"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Core HITL principle
    {
      id: 'hitl-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Human-in-the-Loop Principle\n"Strategic human intervention achieves 25-40% accuracy improvements\nCollaborative workflows save 105 minutes/day with 30% error reduction\nTrust calibration and transparency enable 78% organizational adoption"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'collaboration-challenge',
      target: 'hitl-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework components
    {
      id: 'e2',
      source: 'hitl-framework',
      target: 'intervention-types',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'hitl-framework',
      target: 'feedback-integration',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e4',
      source: 'hitl-framework',
      target: 'collaborative-workflows',
      ...edgeStyle,
      label: 'enables'
    },

    // Intervention details
    {
      id: 'e5',
      source: 'intervention-types',
      target: 'decision-delegation',
      ...edgeStyle,
      label: 'guided by'
    },

    // Feedback details
    {
      id: 'e6',
      source: 'feedback-integration',
      target: 'rlhf-implementation',
      ...edgeStyle,
      label: 'includes'
    },

    // Workflow connections
    {
      id: 'e7',
      source: 'collaborative-workflows',
      target: 'quality-assurance',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e8',
      source: 'collaborative-workflows',
      target: 'trust-mechanisms',
      ...edgeStyle,
      label: 'builds'
    },

    // Cross-connections
    {
      id: 'e9',
      source: 'decision-delegation',
      target: 'quality-assurance',
      ...edgeStyle,
      label: 'validates via'
    },
    {
      id: 'e10',
      source: 'rlhf-implementation',
      target: 'trust-mechanisms',
      ...edgeStyle,
      label: 'improves'
    },

    // Implementation flows
    {
      id: 'e11',
      source: 'quality-assurance',
      target: 'interface-design',
      ...edgeStyle,
      label: 'supported by'
    },
    {
      id: 'e12',
      source: 'trust-mechanisms',
      target: 'production-results',
      ...edgeStyle,
      label: 'achieves'
    },

    // Results and patterns
    {
      id: 'e13',
      source: 'interface-design',
      target: 'implementation-patterns',
      ...edgeStyle,
      label: 'deployed via'
    },
    {
      id: 'e14',
      source: 'production-results',
      target: 'implementation-patterns',
      ...edgeStyle,
      label: 'guides'
    },

    // Implementation proves principle
    {
      id: 'e15',
      source: 'implementation-patterns',
      target: 'hitl-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Human-AI Collaboration Challenge",
      description: "How can we optimally integrate human expertise with AI capabilities to achieve superior outcomes while maintaining control, quality, and trust?",
      activeNodes: ['collaboration-challenge'],
      activeEdges: []
    },
    {
      title: "HITL Framework Introduction",
      description: "Collaborative system addresses challenge through strategic intervention points, feedback loops, oversight controls, and trust calibration mechanisms for optimal human-AI partnership.",
      activeNodes: ['hitl-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Intervention and Feedback Systems",
      description: "Human control through pre-execution approval, real-time correction, and post-execution review. RLHF and active learning integrate feedback achieving 25-40% accuracy improvements.",
      activeNodes: ['intervention-types', 'decision-delegation', 'feedback-integration', 'rlhf-implementation'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Collaborative Workflows and Quality",
      description: "Working patterns include centaur and cyborg models with handoff protocols. Multi-reviewer systems and expert validation ensure quality while building trust through transparency.",
      activeNodes: ['collaborative-workflows', 'quality-assurance', 'trust-mechanisms'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Interface and Production Results",
      description: "Progressive disclosure and multimodal interaction enable collaboration. Production deployments save 105 minutes/day, reduce errors by 30%, and achieve $129.4M annual ROI.",
      activeNodes: ['interface-design', 'production-results'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Implementation and Validation",
      description: "Gradual rollout with A/B testing and continuous monitoring ensures success. Strategic human intervention with collaborative workflows and trust calibration enables 78% organizational adoption.",
      activeNodes: ['implementation-patterns', 'hitl-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};