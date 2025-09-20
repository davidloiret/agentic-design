import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const constitutionalAiEvaluationPattern: PatternScenario = {
  id: 'constitutional-ai-evaluation',
  title: 'Constitutional AI Evaluation Framework Pattern',
  description: 'Anthropic\'s self-improving AI alignment through constitutional principles, replacing human feedback with AI self-critique achieving Pareto improvements in helpfulness and harmlessness',
  initialNodes: [
    // AI alignment challenge
    {
      id: 'ai-alignment-challenge',
      position: { x: 400, y: 50 },
      data: { label: '⚖️ AI Alignment Challenge\n"How to train harmless AI assistants\nwithout expensive human labels\nwhile maintaining helpfulness?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Constitutional AI framework
    {
      id: 'constitutional-ai-framework',
      position: { x: 400, y: 200 },
      data: { label: '📜 Constitutional AI Framework\n"Principle-based self-improvement:\n• AI self-critique system\n• Constitutional principles\n• RLAIF over RLHF"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Two-phase training process
    {
      id: 'two-phase-training',
      position: { x: 200, y: 350 },
      data: { label: '🔄 Two-Phase Training Process\n"Sequential improvement:\n• Phase 1: Supervised learning\n• Phase 2: Reinforcement learning\n• Self-improvement cycle"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Phase 1: Supervised learning
    {
      id: 'supervised-learning-phase',
      position: { x: 50, y: 500 },
      data: { label: '📚 Phase 1: Supervised Learning\n"Self-critique process:\n• Sample initial responses\n• Generate self-critiques\n• Revise using principles\n• Finetune on revisions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Phase 2: RLAIF
    {
      id: 'rlaif-phase',
      position: { x: 350, y: 500 },
      data: { label: '🤖 Phase 2: RLAIF\n"AI feedback learning:\n• AI evaluates samples\n• Preference model training\n• No human labels needed\n• Cost: <$0.01 vs $1-10"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Constitutional principles
    {
      id: 'constitutional-principles',
      position: { x: 600, y: 350 },
      data: { label: '📋 Constitutional Principles\n"Normative guidelines:\n• UN Human Rights inspired\n• Helpful, honest, harmless\n• Avoid toxic/discriminatory\n• Ethical decision-making"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Principle sources
    {
      id: 'principle-sources',
      position: { x: 600, y: 500 },
      data: { label: '📖 Principle Sources\n"Diverse foundations:\n• UN Declaration\n• Platform guidelines\n• Anthropic curation\n• Future: Democratic input"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Chain-of-thought reasoning
    {
      id: 'chain-of-thought',
      position: { x: 400, y: 650 },
      data: { label: '💭 Chain-of-Thought Reasoning\n"Enhanced evaluation:\n• Step-by-step analysis\n• Explicit reasoning traces\n• Improved harm detection\n• Transparent decisions"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Pareto improvement results
    {
      id: 'pareto-improvement',
      position: { x: 200, y: 800 },
      data: { label: '📈 Pareto Improvement Results\n"Superior performance:\n• More helpful responses\n• More harmless output\n• Non-evasive answers\n• Adversarial resistance"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Scalable oversight benefits
    {
      id: 'scalable-oversight',
      position: { x: 600, y: 800 },
      data: { label: '🚀 Scalable Oversight Benefits\n"Practical advantages:\n• 100-1000x cost reduction\n• No human annotators\n• Faster iteration cycles\n• Democratic potential"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Helpfulness-harmlessness balance
    {
      id: 'balance-challenge',
      position: { x: 400, y: 950 },
      data: { label: '⚖️ Helpfulness-Harmlessness Balance\n"Critical tension:\n• Harmless → less helpful\n• Helpful → potential harm\n• CAI achieves both\n• Transparent trade-offs"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Core constitutional principle
    {
      id: 'constitutional-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Constitutional AI Principle\n"Self-improving AI through principled feedback achieves\nsuperior alignment without human supervision costs\nDemocratic constitution design enables value alignment"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'ai-alignment-challenge',
      target: 'constitutional-ai-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements training and principles
    {
      id: 'e2',
      source: 'constitutional-ai-framework',
      target: 'two-phase-training',
      ...edgeStyle,
      label: 'implements training'
    },
    {
      id: 'e3',
      source: 'constitutional-ai-framework',
      target: 'constitutional-principles',
      ...edgeStyle,
      label: 'guided by principles'
    },

    // Two-phase training breakdown
    {
      id: 'e4',
      source: 'two-phase-training',
      target: 'supervised-learning-phase',
      ...edgeStyle,
      label: 'Phase 1'
    },
    {
      id: 'e5',
      source: 'two-phase-training',
      target: 'rlaif-phase',
      ...edgeStyle,
      label: 'Phase 2'
    },

    // Principles guide phases
    {
      id: 'e6',
      source: 'constitutional-principles',
      target: 'supervised-learning-phase',
      ...edgeStyle,
      label: 'guides critique'
    },
    {
      id: 'e7',
      source: 'constitutional-principles',
      target: 'principle-sources',
      ...edgeStyle,
      label: 'derived from'
    },

    // Training uses chain-of-thought
    {
      id: 'e8',
      source: 'rlaif-phase',
      target: 'chain-of-thought',
      ...edgeStyle,
      label: 'enhanced by'
    },
    {
      id: 'e9',
      source: 'supervised-learning-phase',
      target: 'chain-of-thought',
      ...edgeStyle,
      label: 'uses reasoning'
    },

    // Results from training
    {
      id: 'e10',
      source: 'chain-of-thought',
      target: 'pareto-improvement',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e11',
      source: 'rlaif-phase',
      target: 'scalable-oversight',
      ...edgeStyle,
      label: 'enables'
    },

    // Results feed into balance challenge
    {
      id: 'e12',
      source: 'pareto-improvement',
      target: 'balance-challenge',
      ...edgeStyle,
      label: 'resolves tension'
    },
    {
      id: 'e13',
      source: 'scalable-oversight',
      target: 'balance-challenge',
      ...edgeStyle,
      label: 'makes viable'
    },

    // Balance demonstrates principle
    {
      id: 'e14',
      source: 'balance-challenge',
      target: 'constitutional-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Alignment Scalability Challenge",
      description: "How can we train harmless AI assistants without expensive human labels for identifying harmful outputs while maintaining helpfulness and avoiding evasive responses?",
      activeNodes: ['ai-alignment-challenge'],
      activeEdges: []
    },
    {
      title: "Constitutional AI Framework Introduction",
      description: "Anthropic's principle-based self-improvement system addresses challenge through AI self-critique using constitutional principles, replacing RLHF with RLAIF (Reinforcement Learning from AI Feedback).",
      activeNodes: ['constitutional-ai-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Two-Phase Training Process and Constitutional Principles",
      description: "Framework implements sequential training: Phase 1 supervised learning with self-critique, Phase 2 RLAIF, all guided by principles inspired by UN Human Rights and platform guidelines.",
      activeNodes: ['two-phase-training', 'supervised-learning-phase', 'rlaif-phase', 'constitutional-principles', 'principle-sources'],
      activeEdges: ['e2', 'e3', 'e4', 'e5', 'e6', 'e7']
    },
    {
      title: "Chain-of-Thought Enhanced Reasoning",
      description: "Both training phases leverage chain-of-thought reasoning for step-by-step analysis, explicit reasoning traces, improved harm detection, and transparent decision-making processes.",
      activeNodes: ['chain-of-thought'],
      activeEdges: ['e8', 'e9']
    },
    {
      title: "Pareto Improvement and Scalable Oversight",
      description: "Constitutional AI achieves Pareto improvements (more helpful AND more harmless), with 100-1000x cost reduction (<$0.01 vs $1-10 per label), enabling scalable AI alignment without human supervision.",
      activeNodes: ['pareto-improvement', 'scalable-oversight'],
      activeEdges: ['e10', 'e11']
    },
    {
      title: "Resolving Helpfulness-Harmlessness Balance",
      description: "CAI successfully navigates the critical tension between helpfulness and harmlessness, achieving both through principled self-improvement, proving self-improving AI through constitutional feedback achieves superior alignment.",
      activeNodes: ['balance-challenge', 'constitutional-principle'],
      activeEdges: ['e12', 'e13', 'e14']
    }
  ]
};