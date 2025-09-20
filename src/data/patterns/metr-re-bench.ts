import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const metrReBenchPattern: PatternScenario = {
  id: 'metr-re-bench',
  title: 'METR RE-Bench: AI R&D Capability Evaluation Pattern',
  description: 'METR\'s Research Engineering Benchmark evaluating frontier AI R&D capabilities across 7 ML environments with 71 human expert attempts, revealing AI advantages in speed vs human advantages in complex reasoning',
  initialNodes: [
    // AI R&D automation risk assessment challenge
    {
      id: 'ai-rd-automation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔬 AI R&D Automation Challenge\n"How to evaluate dangerous levels of\nautonomous AI R&D capabilities that\ncould pose catastrophic risks to society?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // METR RE-Bench framework
    {
      id: 'metr-rebench-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ METR RE-Bench Framework\n"Research Engineering Benchmark:\n• 7 ML research environments\n• Human vs AI capability comparison\n• Novel, challenging task design"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // 7 research engineering environments
    {
      id: 'seven-environments',
      position: { x: 200, y: 350 },
      data: { label: '🧪 7 Research Engineering Environments\n"Challenging ML R&D tasks:\n• GPU kernel optimization\n• Scaling law experiments\n• Model architecture design"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core research tasks (1-3)
    {
      id: 'core-research-tasks',
      position: { x: 50, y: 500 },
      data: { label: '⚡ Core Research Tasks (1-3)\n"• Optimize Runtime (LLM finetuning)\n• Optimize Kernel (GPU prefix sum)\n• Fix Embedding (model recovery)"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Experimental design tasks (4-5)
    {
      id: 'experimental-design-tasks',
      position: { x: 250, y: 500 },
      data: { label: '📊 Experimental Tasks (4-5)\n"• Scaling Law Experiment design\n• Restricted Architecture MLM\n• Novel constraint optimization"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Advanced implementation tasks (6-7)
    {
      id: 'advanced-implementation-tasks',
      position: { x: 450, y: 500 },
      data: { label: '🤖 Advanced Tasks (6-7)\n"• Finetune GPT-2 with RL\n• Rust code contest scaffolding\n• Complex system integration"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Human expert methodology
    {
      id: 'human-expert-methodology',
      position: { x: 600, y: 350 },
      data: { label: '👨‍🔬 Human Expert Methodology\n"Rigorous comparison study:\n• 61 distinct human experts\n• 71 total 8-hour attempts\n• Domain expertise required"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Three time budget evaluation
    {
      id: 'time-budget-evaluation',
      position: { x: 600, y: 500 },
      data: { label: '⏱️ Multi-Budget Evaluation\n"Performance across time scales:\n• 2-hour rapid assessment\n• 8-hour standard evaluation\n• 32-hour extended analysis"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // AI speed advantage findings
    {
      id: 'ai-speed-advantage',
      position: { x: 200, y: 650 },
      data: { label: '🚀 AI Speed Advantage Findings\n"Short-term AI dominance:\n• 4x higher scores (2-hour budget)\n• 10x faster solution generation\n• Superior GPU kernel optimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Human reasoning advantage
    {
      id: 'human-reasoning-advantage',
      position: { x: 600, y: 650 },
      data: { label: '🧠 Human Reasoning Advantage\n"Long-term human superiority:\n• Exceed AI at 8-hour budget\n• 2x AI performance (32-hour budget)\n• Superior complex problem solving"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Performance benchmark results
    {
      id: 'benchmark-results',
      position: { x: 400, y: 800 },
      data: { label: '📈 Benchmark Performance Results\n"Human experts: 82% non-zero scores, 24% exceed reference\nAI agents: Speed advantage but struggle with novel constraints\nCritical insights for AI R&D automation risks"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 320 },
    },

    // Core AI R&D evaluation principle
    {
      id: 'ai-rd-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 AI R&D Capability Evaluation Principle\n"AI R&D automation poses emerging risks but has current limitations\nSpeed advantages vs reasoning depth create complementary capabilities\nEmpirical evaluation essential for AI safety assessment"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'ai-rd-automation-challenge',
      target: 'metr-rebench-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements environments and methodology
    {
      id: 'e2',
      source: 'metr-rebench-framework',
      target: 'seven-environments',
      ...edgeStyle,
      label: 'implements 7 environments'
    },
    {
      id: 'e3',
      source: 'metr-rebench-framework',
      target: 'human-expert-methodology',
      ...edgeStyle,
      label: 'uses human experts'
    },

    // Seven environments include different task categories
    {
      id: 'e4',
      source: 'seven-environments',
      target: 'core-research-tasks',
      ...edgeStyle,
      label: 'includes optimization'
    },
    {
      id: 'e5',
      source: 'seven-environments',
      target: 'experimental-design-tasks',
      ...edgeStyle,
      label: 'includes experiments'
    },
    {
      id: 'e6',
      source: 'seven-environments',
      target: 'advanced-implementation-tasks',
      ...edgeStyle,
      label: 'includes implementation'
    },

    // Human methodology uses time budget evaluation
    {
      id: 'e7',
      source: 'human-expert-methodology',
      target: 'time-budget-evaluation',
      ...edgeStyle,
      label: 'evaluated across budgets'
    },

    // Task categories and evaluation produce different findings
    {
      id: 'e8',
      source: 'core-research-tasks',
      target: 'ai-speed-advantage',
      ...edgeStyle,
      label: 'reveals AI speed'
    },
    {
      id: 'e9',
      source: 'experimental-design-tasks',
      target: 'human-reasoning-advantage',
      ...edgeStyle,
      label: 'shows human depth'
    },
    {
      id: 'e10',
      source: 'advanced-implementation-tasks',
      target: 'human-reasoning-advantage',
      ...edgeStyle,
      label: 'favors human complexity'
    },
    {
      id: 'e11',
      source: 'time-budget-evaluation',
      target: 'ai-speed-advantage',
      ...edgeStyle,
      label: 'shows short-term AI lead'
    },
    {
      id: 'e12',
      source: 'time-budget-evaluation',
      target: 'human-reasoning-advantage',
      ...edgeStyle,
      label: 'reveals long-term human edge'
    },

    // Both findings contribute to benchmark results
    {
      id: 'e13',
      source: 'ai-speed-advantage',
      target: 'benchmark-results',
      ...edgeStyle,
      label: 'informs results'
    },
    {
      id: 'e14',
      source: 'human-reasoning-advantage',
      target: 'benchmark-results',
      ...edgeStyle,
      label: 'shapes findings'
    },

    // Benchmark results demonstrate core principle
    {
      id: 'e15',
      source: 'benchmark-results',
      target: 'ai-rd-evaluation-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI R&D Automation Risk Assessment Challenge",
      description: "How can we evaluate potentially dangerous levels of autonomous AI R&D capabilities that could pose catastrophic risks to society through advanced research automation?",
      activeNodes: ['ai-rd-automation-challenge'],
      activeEdges: []
    },
    {
      title: "METR RE-Bench Framework Introduction",
      description: "Research Engineering Benchmark addresses challenge through systematic evaluation: 7 ML research environments with novel, challenging task design comparing human expert performance against frontier AI models.",
      activeNodes: ['metr-rebench-framework'],
      activeEdges: ['e1']
    },
    {
      title: "7 Research Environments and Human Expert Methodology",
      description: "Framework implements comprehensive evaluation: 7 challenging environments (optimization, experimental design, implementation) tested by 61 distinct human experts across 71 8-hour attempts with domain expertise requirements.",
      activeNodes: ['seven-environments', 'core-research-tasks', 'experimental-design-tasks', 'advanced-implementation-tasks', 'human-expert-methodology'],
      activeEdges: ['e2', 'e3', 'e4', 'e5', 'e6']
    },
    {
      title: "Multi-Budget Time Scale Evaluation",
      description: "Human expert methodology evaluates performance across three time budgets: 2-hour rapid assessment, 8-hour standard evaluation, 32-hour extended analysis to capture different capability dimensions.",
      activeNodes: ['time-budget-evaluation'],
      activeEdges: ['e7']
    },
    {
      title: "Divergent AI vs Human Capability Findings",
      description: "Evaluation reveals complementary strengths: AI dominance in speed (4x scores at 2-hour, 10x faster generation) vs human superiority in complex reasoning (exceed AI at 8+ hour budgets, 2x performance at 32 hours).",
      activeNodes: ['ai-speed-advantage', 'human-reasoning-advantage'],
      activeEdges: ['e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "AI R&D Capability Assessment and Safety Implications",
      description: "Benchmark results show 82% human expert success with 24% exceeding reference solutions, while AI agents demonstrate speed advantages but struggle with novel constraints, proving empirical evaluation essential for AI safety assessment.",
      activeNodes: ['benchmark-results', 'ai-rd-evaluation-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};