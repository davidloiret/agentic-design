import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const gaiaBenchmarkPattern: PatternScenario = {
  id: 'gaia-benchmark',
  title: 'GAIA: General AI Assistants Benchmark Pattern',
  description: 'Real-world AI assistant evaluation with 466 questions across 3 complexity levels, revealing massive performance gaps (92% human vs 15% GPT-4) and testing fundamental AGI capabilities',
  initialNodes: [
    // AI assistant evaluation gap challenge
    {
      id: 'ai-assistant-evaluation-gap',
      position: { x: 400, y: 50 },
      data: { label: '🤖 AI Assistant Evaluation Gap\n"Current AI excels at specialized tasks\nbut fails at simple real-world problems\nthat average humans solve easily"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // GAIA real-world benchmark
    {
      id: 'gaia-benchmark-framework',
      position: { x: 400, y: 200 },
      data: { label: '🌍 GAIA Real-World Benchmark\n"General AI Assistants evaluation:\n• 466 real-world questions\n• 3 complexity levels\n• Fundamental capability testing"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Four core capabilities tested
    {
      id: 'four-core-capabilities',
      position: { x: 200, y: 350 },
      data: { label: '🧠 Four Core Capabilities\n"Fundamental AI abilities:\n• Multi-step reasoning\n• Multimodal understanding\n• Web browsing\n• Tool-use proficiency"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Reasoning capability
    {
      id: 'reasoning-capability',
      position: { x: 50, y: 500 },
      data: { label: '🔍 Multi-Step Reasoning\n"Complex logical chains:\n• Problem decomposition\n• Sequential inference\n• Contextual understanding"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Multimodal capability
    {
      id: 'multimodal-capability',
      position: { x: 230, y: 500 },
      data: { label: '🖼️ Multimodal Handling\n"Cross-modal integration:\n• Text + image processing\n• Visual reasoning\n• Content synthesis"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    // Web browsing capability
    {
      id: 'web-browsing-capability',
      position: { x: 410, y: 500 },
      data: { label: '🌐 Web Browsing\n"Real-world information access:\n• Dynamic content retrieval\n• Navigation skills\n• Information synthesis"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },

    // Tool-use capability
    {
      id: 'tool-use-capability',
      position: { x: 590, y: 500 },
      data: { label: '🔧 Tool-Use Proficiency\n"Integrated tool coordination:\n• Plugin orchestration\n• API interactions\n• Workflow management"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },

    // Three complexity levels
    {
      id: 'three-complexity-levels',
      position: { x: 600, y: 350 },
      data: { label: '📊 Three Complexity Levels\n"Graduated difficulty assessment:\n• Level 1: <5 steps, minimal tools\n• Level 2: 5-10 steps, coordination\n• Level 3: Long-term planning"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // 466 real-world questions
    {
      id: 'real-world-questions',
      position: { x: 400, y: 650 },
      data: { label: '❓ 466 Real-World Questions\n"Authentic problem scenarios:\n• Conceptually simple for humans\n• Challenging for advanced AI\n• Non-gameable design"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Exact-match evaluation
    {
      id: 'exact-match-evaluation',
      position: { x: 200, y: 800 },
      data: { label: '✅ Exact-Match Evaluation\n"Unambiguous scoring:\n• Factual answers only\n• String/number/list format\n• No subjective judgment"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Massive performance gap
    {
      id: 'performance-gap',
      position: { x: 600, y: 800 },
      data: { label: '📉 Massive Performance Gap\n"Revealing AI limitations:\n• Humans: 92% accuracy\n• GPT-4 + plugins: 15%\n• H2O.ai (best): 75%"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Core AGI evaluation principle
    {
      id: 'agi-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 AGI Evaluation Principle\n"Real-world robustness over academic complexity\nFundamental capabilities trump specialized skills\nHuman-like problem solving as AGI milestone"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Gap addressed by GAIA framework
    {
      id: 'e1',
      source: 'ai-assistant-evaluation-gap',
      target: 'gaia-benchmark-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework tests core capabilities and complexity levels
    {
      id: 'e2',
      source: 'gaia-benchmark-framework',
      target: 'four-core-capabilities',
      ...edgeStyle,
      label: 'tests capabilities'
    },
    {
      id: 'e3',
      source: 'gaia-benchmark-framework',
      target: 'three-complexity-levels',
      ...edgeStyle,
      label: 'organized by levels'
    },

    // Four core capabilities broken down
    {
      id: 'e4',
      source: 'four-core-capabilities',
      target: 'reasoning-capability',
      ...edgeStyle,
      label: 'includes reasoning'
    },
    {
      id: 'e5',
      source: 'four-core-capabilities',
      target: 'multimodal-capability',
      ...edgeStyle,
      label: 'includes multimodal'
    },
    {
      id: 'e6',
      source: 'four-core-capabilities',
      target: 'web-browsing-capability',
      ...edgeStyle,
      label: 'includes browsing'
    },
    {
      id: 'e7',
      source: 'four-core-capabilities',
      target: 'tool-use-capability',
      ...edgeStyle,
      label: 'includes tools'
    },

    // Capabilities and levels create real-world questions
    {
      id: 'e8',
      source: 'reasoning-capability',
      target: 'real-world-questions',
      ...edgeStyle,
      label: 'creates questions'
    },
    {
      id: 'e9',
      source: 'multimodal-capability',
      target: 'real-world-questions',
      ...edgeStyle,
      label: 'generates scenarios'
    },
    {
      id: 'e10',
      source: 'web-browsing-capability',
      target: 'real-world-questions',
      ...edgeStyle,
      label: 'designs tasks'
    },
    {
      id: 'e11',
      source: 'tool-use-capability',
      target: 'real-world-questions',
      ...edgeStyle,
      label: 'forms challenges'
    },
    {
      id: 'e12',
      source: 'three-complexity-levels',
      target: 'real-world-questions',
      ...edgeStyle,
      label: 'structures difficulty'
    },

    // Questions evaluated with exact-match, revealing performance gap
    {
      id: 'e13',
      source: 'real-world-questions',
      target: 'exact-match-evaluation',
      ...edgeStyle,
      label: 'scored by'
    },
    {
      id: 'e14',
      source: 'real-world-questions',
      target: 'performance-gap',
      ...edgeStyle,
      label: 'reveals gap'
    },

    // Both evaluation outcomes demonstrate AGI principle
    {
      id: 'e15',
      source: 'exact-match-evaluation',
      target: 'agi-evaluation-principle',
      ...edgeStyle,
      label: 'enables measurement',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e16',
      source: 'performance-gap',
      target: 'agi-evaluation-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Assistant Evaluation Gap Challenge",
      description: "Current AI systems excel at specialized academic tasks but fail at simple real-world problems that average humans solve easily, revealing a fundamental evaluation gap in AI assessment.",
      activeNodes: ['ai-assistant-evaluation-gap'],
      activeEdges: []
    },
    {
      title: "GAIA Real-World Benchmark Framework",
      description: "General AI Assistants benchmark addresses the gap through 466 real-world questions organized across 3 complexity levels, testing fundamental capabilities rather than narrow specializations.",
      activeNodes: ['gaia-benchmark-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Four Core Capabilities and Complexity Structure",
      description: "Framework systematically tests four fundamental AI abilities: multi-step reasoning, multimodal understanding, web browsing, and tool-use proficiency across graduated difficulty levels (<5 steps, 5-10 steps, long-term planning).",
      activeNodes: ['four-core-capabilities', 'reasoning-capability', 'multimodal-capability', 'web-browsing-capability', 'tool-use-capability', 'three-complexity-levels'],
      activeEdges: ['e2', 'e3', 'e4', 'e5', 'e6', 'e7']
    },
    {
      title: "466 Real-World Question Generation",
      description: "Core capabilities and complexity levels combine to create 466 authentic problem scenarios: conceptually simple for humans, challenging for advanced AI, with non-gameable design preventing brute-force solutions.",
      activeNodes: ['real-world-questions'],
      activeEdges: ['e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Exact-Match Evaluation and Performance Gap Revelation",
      description: "Questions evaluated through unambiguous exact-match scoring (factual answers only) reveal massive AI limitations: humans achieve 92% accuracy vs GPT-4's 15% (best current: H2O.ai at 75%).",
      activeNodes: ['exact-match-evaluation', 'performance-gap'],
      activeEdges: ['e13', 'e14']
    },
    {
      title: "AGI Evaluation Principle and Real-World Robustness",
      description: "GAIA demonstrates that real-world robustness trumps academic complexity, fundamental capabilities matter more than specialized skills, and human-like problem solving represents a meaningful AGI milestone.",
      activeNodes: ['agi-evaluation-principle'],
      activeEdges: ['e15', 'e16']
    }
  ]
};