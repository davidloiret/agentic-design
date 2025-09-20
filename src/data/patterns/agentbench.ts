import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agentBenchPattern: PatternScenario = {
  id: 'agentbench',
  title: 'AgentBench Evaluation Pattern',
  description: 'The first comprehensive benchmark to evaluate LLMs as agents across 8 diverse environments, assessing reasoning and decision-making in multi-turn open-ended settings',
  initialNodes: [
    // AgentBench evaluation framework
    {
      id: 'agentbench-framework',
      position: { x: 400, y: 50 },
      data: { label: '🏗️ AgentBench Framework\n"First comprehensive LLM agent\nbenchmark with 8 diverse environments\nfor multi-turn evaluation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // 8 diverse environments (organized by category)
    {
      id: 'technical-environments',
      position: { x: 200, y: 200 },
      data: { label: '💻 Technical Environments\n"• Operating System\n• Database\n• Knowledge Graph"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    {
      id: 'interactive-environments',
      position: { x: 400, y: 200 },
      data: { label: '🎮 Interactive Environments\n"• Digital Card Game\n• Lateral Thinking Puzzles\n• House-Holding Tasks"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    {
      id: 'web-environments',
      position: { x: 600, y: 200 },
      data: { label: '🌐 Web Environments\n"• Web Shopping\n• Web Browsing\n• Real-world scenarios"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },

    // Multi-turn evaluation process
    {
      id: 'multiturn-evaluation',
      position: { x: 400, y: 350 },
      data: { label: '🔄 Multi-Turn Evaluation Process\n"4K-13K interaction cycles per environment\nExtended reasoning chains required\nComplex decision-making assessment"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Agent capability dimensions
    {
      id: 'reasoning-capabilities',
      position: { x: 200, y: 500 },
      data: { label: '🧠 Long-Term Reasoning\n"Multi-step problem solving\nSequential decision making\nGoal-oriented planning"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'adaptation-capabilities',
      position: { x: 400, y: 500 },
      data: { label: '🎯 Environmental Adaptation\n"Context-aware responses\nTask-specific strategies\nDynamic behavior adjustment"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    {
      id: 'interaction-capabilities',
      position: { x: 600, y: 500 },
      data: { label: '🤝 Interactive Capabilities\n"Tool usage proficiency\nEnvironmental manipulation\nFeedback incorporation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Comprehensive LLM evaluation
    {
      id: 'llm-evaluation',
      position: { x: 400, y: 650 },
      data: { label: '📊 Comprehensive LLM Evaluation\n"27+ models tested including:\n• GPT-4, Claude, PaLM-2\n• Open-source alternatives\n• Performance gap analysis"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Key performance insights
    {
      id: 'performance-insights',
      position: { x: 400, y: 800 },
      data: { label: '💡 Key Performance Insights\n"GPT-4 leads with 78% household success\nSignificant commercial vs OSS gaps\nLong-term reasoning challenges identified"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Agent deployment readiness
    {
      id: 'deployment-readiness',
      position: { x: 400, y: 950 },
      data: { label: '🚀 Agent Deployment Readiness\n"Benchmark reveals which LLMs\nare ready for real-world\nautonomous agent deployment"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },
  ],
  initialEdges: [
    // Framework deploys 8 environments
    {
      id: 'e1',
      source: 'agentbench-framework',
      target: 'technical-environments',
      ...edgeStyle,
      label: 'deploys technical tests'
    },
    {
      id: 'e2',
      source: 'agentbench-framework',
      target: 'interactive-environments',
      ...edgeStyle,
      label: 'creates interactive challenges'
    },
    {
      id: 'e3',
      source: 'agentbench-framework',
      target: 'web-environments',
      ...edgeStyle,
      label: 'implements web scenarios'
    },

    // All environments feed into multi-turn evaluation
    {
      id: 'e4',
      source: 'technical-environments',
      target: 'multiturn-evaluation',
      ...edgeStyle,
      label: 'requires multi-turn'
    },
    {
      id: 'e5',
      source: 'interactive-environments',
      target: 'multiturn-evaluation',
      ...edgeStyle,
      label: 'enables interaction cycles'
    },
    {
      id: 'e6',
      source: 'web-environments',
      target: 'multiturn-evaluation',
      ...edgeStyle,
      label: 'supports extended sessions'
    },

    // Multi-turn evaluation assesses capabilities
    {
      id: 'e7',
      source: 'multiturn-evaluation',
      target: 'reasoning-capabilities',
      ...edgeStyle,
      label: 'evaluates reasoning'
    },
    {
      id: 'e8',
      source: 'multiturn-evaluation',
      target: 'adaptation-capabilities',
      ...edgeStyle,
      label: 'measures adaptation'
    },
    {
      id: 'e9',
      source: 'multiturn-evaluation',
      target: 'interaction-capabilities',
      ...edgeStyle,
      label: 'tests interaction skills'
    },

    // Capabilities assessment feeds into LLM evaluation
    {
      id: 'e10',
      source: 'reasoning-capabilities',
      target: 'llm-evaluation',
      ...edgeStyle,
      label: 'informs evaluation'
    },
    {
      id: 'e11',
      source: 'adaptation-capabilities',
      target: 'llm-evaluation',
      ...edgeStyle,
      label: 'guides assessment'
    },
    {
      id: 'e12',
      source: 'interaction-capabilities',
      target: 'llm-evaluation',
      ...edgeStyle,
      label: 'shapes scoring'
    },

    // LLM evaluation produces insights
    {
      id: 'e13',
      source: 'llm-evaluation',
      target: 'performance-insights',
      ...edgeStyle,
      label: 'reveals insights'
    },

    // Insights determine deployment readiness
    {
      id: 'e14',
      source: 'performance-insights',
      target: 'deployment-readiness',
      ...edgeStyle,
      label: 'determines readiness'
    },
  ],
  steps: [
    {
      title: "AgentBench Framework Introduction",
      description: "First comprehensive benchmark designed specifically for evaluating LLMs as autonomous agents across 8 diverse environments with multi-turn interaction requirements.",
      activeNodes: ['agentbench-framework'],
      activeEdges: []
    },
    {
      title: "8 Diverse Environment Categories",
      description: "Framework deploys three categories of environments: Technical (OS, Database, Knowledge Graph), Interactive (Card Game, Puzzles, House-Holding), and Web-based (Shopping, Browsing).",
      activeNodes: ['technical-environments', 'interactive-environments', 'web-environments'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Multi-Turn Evaluation Process",
      description: "Each environment requires 4K-13K interaction cycles, enabling comprehensive assessment of extended reasoning chains and complex decision-making capabilities.",
      activeNodes: ['multiturn-evaluation'],
      activeEdges: ['e4', 'e5', 'e6']
    },
    {
      title: "Three Core Agent Capability Dimensions",
      description: "Multi-turn evaluation assesses long-term reasoning (multi-step problem solving), environmental adaptation (context-aware strategies), and interactive capabilities (tool usage proficiency).",
      activeNodes: ['reasoning-capabilities', 'adaptation-capabilities', 'interaction-capabilities'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "Comprehensive LLM Evaluation",
      description: "Framework evaluates 27+ models including GPT-4, Claude, PaLM-2, and open-source alternatives, providing detailed performance gap analysis across all capability dimensions.",
      activeNodes: ['llm-evaluation'],
      activeEdges: ['e10', 'e11', 'e12']
    },
    {
      title: "Performance Insights and Deployment Readiness",
      description: "Evaluation reveals key insights: GPT-4 leads with 78% household success rate, significant gaps between commercial and OSS models, enabling informed agent deployment decisions.",
      activeNodes: ['performance-insights', 'deployment-readiness'],
      activeEdges: ['e13', 'e14']
    }
  ]
};