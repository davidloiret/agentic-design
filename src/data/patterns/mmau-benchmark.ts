import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mmauBenchmarkPattern: PatternScenario = {
  id: 'mmau-benchmark',
  title: 'MMAU: Massive Multitask Agent Understanding Pattern',
  description: 'Apple\'s comprehensive AI agent evaluation framework with 20 tasks across 5 domains and 5 capabilities, featuring 3000+ prompts and two-stage task design revealing significant GPT-4 vs open-source performance gaps',
  initialNodes: [
    // AI agent evaluation limitation challenge
    {
      id: 'agent-evaluation-limitation',
      position: { x: 400, y: 50 },
      data: { label: '🔍 AI Agent Evaluation Limitation\n"Existing benchmarks focus on task completion\nbut fail to dissect underlying skills\nmaking failure analysis unclear"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // MMAU comprehensive framework
    {
      id: 'mmau-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ MMAU Comprehensive Framework\n"Massive Multitask Agent Understanding:\n• 5 domains × 5 capabilities\n• 20 tasks with 3000+ prompts\n• Offline evaluation design"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 300 },
    },

    // 5 diverse domains
    {
      id: 'five-domains',
      position: { x: 200, y: 350 },
      data: { label: '🌐 5 Diverse Domains\n"Comprehensive coverage:\n• Tool-use\n• DAG QA\n• Data Science/ML coding"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Additional domains
    {
      id: 'additional-domains',
      position: { x: 200, y: 500 },
      data: { label: '💻 Programming & Math Domains\n"Technical expertise:\n• Contest-level programming\n• Mathematics problem solving\n• Complex reasoning tasks"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // 5 core capabilities
    {
      id: 'five-capabilities',
      position: { x: 600, y: 350 },
      data: { label: '🧠 5 Core Capabilities\n"Fundamental agent skills:\n• Understanding\n• Reasoning\n• Planning"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Additional capabilities
    {
      id: 'additional-capabilities',
      position: { x: 600, y: 500 },
      data: { label: '🎯 Problem-Solving & Self-Correction\n"Advanced agent abilities:\n• Problem-solving execution\n• Self-correction capabilities\n• Error reflection skills"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Two-stage task design
    {
      id: 'two-stage-design',
      position: { x: 400, y: 650 },
      data: { label: '⚙️ Two-Stage Task Design Innovation\n"Capability decomposition:\n• Planner-shift: High-level strategy\n• Solver-shift: Plan execution\n• Separates reasoning from solving"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Heterogeneous dataset construction
    {
      id: 'dataset-construction',
      position: { x: 100, y: 800 },
      data: { label: '📊 Heterogeneous Dataset Construction\n"Multi-source integration:\n• In-house tool-use data\n• Kaggle DS/ML datasets\n• CodeContest programming\n• DeepMind-Math problems"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // 18 model evaluation results
    {
      id: 'model-evaluation-results',
      position: { x: 700, y: 800 },
      data: { label: '📈 18 Model Evaluation Results\n"Comprehensive assessment:\n• GPT-4 family leads performance\n• Significant open-source gaps\n• Self-correction reveals limitations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Capability-centric insights
    {
      id: 'capability-insights',
      position: { x: 400, y: 950 },
      data: { label: '💡 Capability-Centric Insights\n"Granular performance analysis:\n• Understanding where failures occur\n• Distinguishing error types\n• Enhanced interpretability"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Core holistic evaluation principle
    {
      id: 'holistic-evaluation-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Holistic Agent Evaluation Principle\n"Dissect underlying skills beyond task completion\nCapability-centric assessment reveals failure origins\nOffline design ensures stable, reproducible evaluation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Limitation addressed by MMAU framework
    {
      id: 'e1',
      source: 'agent-evaluation-limitation',
      target: 'mmau-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements domains and capabilities
    {
      id: 'e2',
      source: 'mmau-framework',
      target: 'five-domains',
      ...edgeStyle,
      label: 'implements 5 domains'
    },
    {
      id: 'e3',
      source: 'mmau-framework',
      target: 'five-capabilities',
      ...edgeStyle,
      label: 'evaluates 5 capabilities'
    },

    // Domains include additional coverage
    {
      id: 'e4',
      source: 'five-domains',
      target: 'additional-domains',
      ...edgeStyle,
      label: 'extends to programming'
    },

    // Capabilities include advanced abilities
    {
      id: 'e5',
      source: 'five-capabilities',
      target: 'additional-capabilities',
      ...edgeStyle,
      label: 'includes advanced skills'
    },

    // Framework uses two-stage design
    {
      id: 'e6',
      source: 'mmau-framework',
      target: 'two-stage-design',
      ...edgeStyle,
      label: 'uses innovative design'
    },

    // Domains and capabilities create dataset construction
    {
      id: 'e7',
      source: 'additional-domains',
      target: 'dataset-construction',
      ...edgeStyle,
      label: 'sources data from'
    },
    {
      id: 'e8',
      source: 'two-stage-design',
      target: 'dataset-construction',
      ...edgeStyle,
      label: 'structures dataset'
    },

    // Capabilities evaluated produce model results
    {
      id: 'e9',
      source: 'additional-capabilities',
      target: 'model-evaluation-results',
      ...edgeStyle,
      label: 'assessed in'
    },
    {
      id: 'e10',
      source: 'two-stage-design',
      target: 'model-evaluation-results',
      ...edgeStyle,
      label: 'enables evaluation'
    },

    // Dataset and results generate capability insights
    {
      id: 'e11',
      source: 'dataset-construction',
      target: 'capability-insights',
      ...edgeStyle,
      label: 'enables analysis'
    },
    {
      id: 'e12',
      source: 'model-evaluation-results',
      target: 'capability-insights',
      ...edgeStyle,
      label: 'reveals insights'
    },

    // Insights demonstrate holistic principle
    {
      id: 'e13',
      source: 'capability-insights',
      target: 'holistic-evaluation-principle',
      ...edgeStyle,
      label: 'demonstrates principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Agent Evaluation Limitation Challenge",
      description: "Existing benchmarks focus on task completion but fail to dissect underlying skills that drive performance, making it difficult to understand where failures originate and hindering agent development.",
      activeNodes: ['agent-evaluation-limitation'],
      activeEdges: []
    },
    {
      title: "MMAU Comprehensive Framework Introduction",
      description: "Apple's Massive Multitask Agent Understanding addresses limitations through comprehensive evaluation: 5 domains × 5 capabilities matrix with 20 tasks, 3000+ prompts, and offline design for stable assessment.",
      activeNodes: ['mmau-framework'],
      activeEdges: ['e1']
    },
    {
      title: "5 Domains and 5 Capabilities Matrix",
      description: "Framework systematically evaluates across diverse domains (Tool-use, DAG QA, Data Science/ML, Programming, Mathematics) and core capabilities (Understanding, Reasoning, Planning, Problem-solving, Self-correction).",
      activeNodes: ['five-domains', 'additional-domains', 'five-capabilities', 'additional-capabilities'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Two-Stage Task Design Innovation",
      description: "Revolutionary capability decomposition separates reasoning/planning from problem-solving: Planner-shift generates high-level strategy, Solver-shift executes plan, enabling granular skill assessment.",
      activeNodes: ['two-stage-design'],
      activeEdges: ['e6']
    },
    {
      title: "Heterogeneous Dataset Construction and Model Evaluation",
      description: "Multi-source integration (in-house tool data, Kaggle datasets, CodeContest, DeepMind-Math) enables comprehensive assessment of 18 models, revealing GPT-4 superiority and significant open-source gaps in self-correction.",
      activeNodes: ['dataset-construction', 'model-evaluation-results'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Capability-Centric Insights and Holistic Evaluation",
      description: "Granular performance analysis reveals where failures occur, distinguishes error types, and enhances interpretability, proving that dissecting underlying skills beyond task completion provides deeper agent understanding.",
      activeNodes: ['capability-insights', 'holistic-evaluation-principle'],
      activeEdges: ['e11', 'e12', 'e13']
    }
  ]
};