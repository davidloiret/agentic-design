import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const helmAgentEvaluationPattern: PatternScenario = {
  id: 'helm-agent-evaluation',
  title: 'HELM Agent Evaluation Framework Pattern',
  description: 'Stanford CRFM\'s Holistic Evaluation of Language Models extended for agent capabilities, measuring 7 critical metrics across 42 scenarios including multimodal tasks, tool use, and simulation environments',
  initialNodes: [
    // LLM evaluation fragmentation challenge
    {
      id: 'evaluation-fragmentation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔍 LLM Agent Evaluation Challenge\n"Fragmented, incomplete evaluation\nof agent capabilities beyond accuracy\nNo standardized multi-metric assessment"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // HELM holistic framework
    {
      id: 'helm-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ HELM Holistic Framework\n"Comprehensive agent evaluation:\n• 7 critical metrics\n• 42 diverse scenarios\n• Standardized conditions"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // 7 critical metrics system
    {
      id: 'seven-metrics-system',
      position: { x: 200, y: 350 },
      data: { label: '📊 7-Metric Evaluation System\n"Beyond accuracy assessment:\n• Multi-dimensional measurement\n• Holistic capability profiling\n• Societally beneficial systems"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core performance metrics (1-3)
    {
      id: 'performance-metrics',
      position: { x: 50, y: 500 },
      data: { label: '🎯 Performance Metrics\n"• Accuracy: Traditional measures\n• Calibration: Confidence estimation\n• Robustness: Stability across variations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Societal impact metrics (4-6)
    {
      id: 'societal-metrics',
      position: { x: 250, y: 500 },
      data: { label: '⚖️ Societal Impact Metrics\n"• Fairness: Equal treatment\n• Bias: Systematic prejudices\n• Toxicity: Harmful content"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },

    // Resource efficiency metric (7)
    {
      id: 'efficiency-metric',
      position: { x: 450, y: 500 },
      data: { label: '⚡ Efficiency Metric\n"• Resource usage optimization\n• Computational cost analysis\n• Sustainable AI deployment"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    // 42 scenario evaluation suite
    {
      id: 'scenario-evaluation-suite',
      position: { x: 600, y: 350 },
      data: { label: '📋 42-Scenario Evaluation Suite\n"Comprehensive task coverage:\n• 16 core scenarios\n• 26 targeted evaluations\n• Real-world applications"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Agent capability scenarios
    {
      id: 'agent-capability-scenarios',
      position: { x: 500, y: 500 },
      data: { label: '🤖 Agent Capability Scenarios\n"• Tool use evaluation\n• Multimodal task handling\n• External API interactions"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 190 },
    },

    // Simulation environments
    {
      id: 'simulation-environments',
      position: { x: 650, y: 500 },
      data: { label: '🌐 Simulation Environments\n"• Interactive agent behavior\n• Complex environment navigation\n• Real-world complexity modeling"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Multimodal evaluation
    {
      id: 'multimodal-evaluation',
      position: { x: 800, y: 500 },
      data: { label: '🖼️ Multimodal Evaluation\n"• Vision-language models (VHELM)\n• Text-to-image models (HEIM)\n• Cross-modal understanding"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Standardized assessment process
    {
      id: 'standardized-assessment',
      position: { x: 400, y: 650 },
      data: { label: '⚙️ Standardized Assessment Process\n"Unified evaluation conditions:\n• Same scenarios across all models\n• Controlled adaptation strategies\n• Reproducible measurements"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Comprehensive model coverage
    {
      id: 'comprehensive-coverage',
      position: { x: 200, y: 800 },
      data: { label: '📈 Comprehensive Model Coverage\n"Improved from 17.9% to 96.0%\nscenario coverage across 30 models\nDense benchmarking standardization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Transparency and community
    {
      id: 'transparency-community',
      position: { x: 600, y: 800 },
      data: { label: '🔓 Transparency & Community\n"Open source framework\nRaw prompts/completions released\nLiving benchmark for continuous updates"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core evaluation principle
    {
      id: 'holistic-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Holistic Agent Evaluation Principle\n"Agent capabilities require multi-dimensional assessment\nbeyond accuracy: societal impact, efficiency, robustness\nStandardized conditions enable meaningful comparisons"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by HELM framework
    {
      id: 'e1',
      source: 'evaluation-fragmentation-challenge',
      target: 'helm-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements metrics and scenarios
    {
      id: 'e2',
      source: 'helm-framework',
      target: 'seven-metrics-system',
      ...edgeStyle,
      label: 'implements 7 metrics'
    },
    {
      id: 'e3',
      source: 'helm-framework',
      target: 'scenario-evaluation-suite',
      ...edgeStyle,
      label: 'deploys 42 scenarios'
    },

    // Seven metrics broken into categories
    {
      id: 'e4',
      source: 'seven-metrics-system',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'includes performance'
    },
    {
      id: 'e5',
      source: 'seven-metrics-system',
      target: 'societal-metrics',
      ...edgeStyle,
      label: 'includes societal impact'
    },
    {
      id: 'e6',
      source: 'seven-metrics-system',
      target: 'efficiency-metric',
      ...edgeStyle,
      label: 'includes efficiency'
    },

    // Scenario suite includes agent capabilities
    {
      id: 'e7',
      source: 'scenario-evaluation-suite',
      target: 'agent-capability-scenarios',
      ...edgeStyle,
      label: 'includes agent tasks'
    },
    {
      id: 'e8',
      source: 'scenario-evaluation-suite',
      target: 'simulation-environments',
      ...edgeStyle,
      label: 'includes simulations'
    },
    {
      id: 'e9',
      source: 'scenario-evaluation-suite',
      target: 'multimodal-evaluation',
      ...edgeStyle,
      label: 'includes multimodal'
    },

    // All components feed into standardized assessment
    {
      id: 'e10',
      source: 'performance-metrics',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'measured by'
    },
    {
      id: 'e11',
      source: 'societal-metrics',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'assessed by'
    },
    {
      id: 'e12',
      source: 'efficiency-metric',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'evaluated by'
    },
    {
      id: 'e13',
      source: 'agent-capability-scenarios',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'processed by'
    },
    {
      id: 'e14',
      source: 'simulation-environments',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'run through'
    },
    {
      id: 'e15',
      source: 'multimodal-evaluation',
      target: 'standardized-assessment',
      ...edgeStyle,
      label: 'executed via'
    },

    // Standardized assessment produces outcomes
    {
      id: 'e16',
      source: 'standardized-assessment',
      target: 'comprehensive-coverage',
      ...edgeStyle,
      label: 'achieves coverage'
    },
    {
      id: 'e17',
      source: 'standardized-assessment',
      target: 'transparency-community',
      ...edgeStyle,
      label: 'enables transparency'
    },

    // Outcomes demonstrate core principle
    {
      id: 'e18',
      source: 'comprehensive-coverage',
      target: 'holistic-evaluation-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e19',
      source: 'transparency-community',
      target: 'holistic-evaluation-principle',
      ...edgeStyle,
      label: 'demonstrates openness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "LLM Agent Evaluation Fragmentation Challenge",
      description: "Traditional LLM evaluation suffers from fragmented, incomplete assessment focused only on accuracy, lacking standardized multi-metric evaluation of agent capabilities across diverse scenarios.",
      activeNodes: ['evaluation-fragmentation-challenge'],
      activeEdges: []
    },
    {
      title: "HELM Holistic Framework Introduction",
      description: "Stanford CRFM's comprehensive solution deploys systematic evaluation across 7 critical metrics and 42 diverse scenarios under standardized conditions for meaningful agent capability comparison.",
      activeNodes: ['helm-framework'],
      activeEdges: ['e1']
    },
    {
      title: "7-Metric Multi-Dimensional Assessment System",
      description: "Framework implements comprehensive measurement beyond accuracy: performance metrics (accuracy, calibration, robustness), societal impact (fairness, bias, toxicity), and resource efficiency.",
      activeNodes: ['seven-metrics-system', 'performance-metrics', 'societal-metrics', 'efficiency-metric'],
      activeEdges: ['e2', 'e4', 'e5', 'e6']
    },
    {
      title: "42-Scenario Comprehensive Evaluation Suite",
      description: "Extensive scenario coverage includes agent capability tasks (tool use, API interactions), simulation environments (complex navigation), and multimodal evaluation (vision-language, text-to-image).",
      activeNodes: ['scenario-evaluation-suite', 'agent-capability-scenarios', 'simulation-environments', 'multimodal-evaluation'],
      activeEdges: ['e3', 'e7', 'e8', 'e9']
    },
    {
      title: "Standardized Assessment Process",
      description: "Unified evaluation conditions process all metrics and scenarios consistently: controlled adaptation strategies, reproducible measurements, same scenarios across all models for meaningful comparisons.",
      activeNodes: ['standardized-assessment'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    },
    {
      title: "Comprehensive Coverage and Community Impact",
      description: "HELM achieved 96.0% scenario coverage (up from 17.9%) across 30 models, with open-source transparency releasing raw prompts/completions, proving holistic multi-dimensional assessment enables meaningful agent capability comparison.",
      activeNodes: ['comprehensive-coverage', 'transparency-community', 'holistic-evaluation-principle'],
      activeEdges: ['e16', 'e17', 'e18', 'e19']
    }
  ]
};