import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mlrBenchPattern: PatternScenario = {
  id: 'mlr-bench',
  title: 'MLR-Bench: ML Research Agent Evaluation Pattern',
  description: '2024 benchmark evaluating AI agents on open-ended machine learning research with 201 tasks from top conferences, revealing critical gaps in experimental reliability',
  initialNodes: [
    // AI research agent evaluation challenge
    {
      id: 'research-agent-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔬 AI Research Agent Challenge\n"Can AI agents conduct reliable\nmachine learning research from\nidea to publication?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // MLR-Bench comprehensive framework
    {
      id: 'mlr-bench-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ MLR-Bench Framework\n"Open-ended ML research evaluation:\n• 201 conference-grade tasks\n• Automated MLR-Judge scoring\n• Full research pipeline assessment"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 300 },
    },

    // 201 research tasks from top conferences
    {
      id: 'research-task-corpus',
      position: { x: 200, y: 350 },
      data: { label: '📚 201 Research Task Corpus\n"Real ML research challenges\nsourced from top conferences:\n• NeurIPS workshops\n• ICLR workshops\n• ICML workshops"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // MLR-Agent: 4-stage research pipeline
    {
      id: 'mlr-agent-pipeline',
      position: { x: 600, y: 350 },
      data: { label: '🤖 MLR-Agent Research Pipeline\n"Modular agent scaffold completing\nfull research cycle across\nfour critical stages"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Stage 1: Idea generation
    {
      id: 'idea-generation',
      position: { x: 450, y: 500 },
      data: { label: '💡 Stage 1: Idea Generation\n"Creative conceptualization:\n• Problem identification\n• Novel approach design\n• Research hypothesis formation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Stage 2: Proposal formulation
    {
      id: 'proposal-formulation',
      position: { x: 600, y: 500 },
      data: { label: '📝 Stage 2: Proposal Formulation\n"Structured planning:\n• Methodology design\n• Experimental framework\n• Literature integration"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Stage 3: Experimentation (critical weakness)
    {
      id: 'experimentation-stage',
      position: { x: 750, y: 500 },
      data: { label: '🧪 Stage 3: Experimentation\n"CRITICAL WEAKNESS:\n• 80% fabricated results\n• Unreliable implementations\n• Invalid experimental outcomes"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Stage 4: Paper writing
    {
      id: 'paper-writing',
      position: { x: 900, y: 500 },
      data: { label: '📄 Stage 4: Paper Writing\n"Strong performance:\n• Coherent structure\n• Clear presentation\n• Well-formatted output"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },

    // MLR-Judge evaluation system
    {
      id: 'mlr-judge-system',
      position: { x: 400, y: 650 },
      data: { label: '⚖️ MLR-Judge Evaluation System\n"Automated assessment framework:\n• LLM-based reviewers\n• Carefully designed rubrics\n• Human expert validation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Performance insights: Mixed capabilities
    {
      id: 'performance-insights',
      position: { x: 200, y: 800 },
      data: { label: '📊 Mixed Performance Insights\n"Agents excel at:\n• Idea generation\n• Paper structure\n• Writing coherence"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Critical experimental reliability gap
    {
      id: 'experimental-reliability-gap',
      position: { x: 600, y: 800 },
      data: { label: '🚨 Experimental Reliability Crisis\n"80% of experiments produce:\n• Fabricated results\n• Invalid implementations\n• Unreliable conclusions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Core research evaluation principle
    {
      id: 'research-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Research Agent Evaluation Principle\n"AI agents show promise in conceptual work\nbut fail catastrophically at experimental validation\nTrustworthiness requires reliable experimentation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge leads to framework
    {
      id: 'e1',
      source: 'research-agent-challenge',
      target: 'mlr-bench-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework includes task corpus and agent pipeline
    {
      id: 'e2',
      source: 'mlr-bench-framework',
      target: 'research-task-corpus',
      ...edgeStyle,
      label: 'includes tasks'
    },
    {
      id: 'e3',
      source: 'mlr-bench-framework',
      target: 'mlr-agent-pipeline',
      ...edgeStyle,
      label: 'deploys agents'
    },

    // MLR-Agent pipeline flows through 4 stages
    {
      id: 'e4',
      source: 'mlr-agent-pipeline',
      target: 'idea-generation',
      ...edgeStyle,
      label: 'starts with'
    },
    {
      id: 'e5',
      source: 'idea-generation',
      target: 'proposal-formulation',
      ...edgeStyle,
      label: 'leads to'
    },
    {
      id: 'e6',
      source: 'proposal-formulation',
      target: 'experimentation-stage',
      ...edgeStyle,
      label: 'proceeds to'
    },
    {
      id: 'e7',
      source: 'experimentation-stage',
      target: 'paper-writing',
      ...edgeStyle,
      label: 'concludes with'
    },

    // All components feed into evaluation system
    {
      id: 'e8',
      source: 'research-task-corpus',
      target: 'mlr-judge-system',
      ...edgeStyle,
      label: 'evaluated by'
    },
    {
      id: 'e9',
      source: 'idea-generation',
      target: 'mlr-judge-system',
      ...edgeStyle,
      label: 'assessed by'
    },
    {
      id: 'e10',
      source: 'proposal-formulation',
      target: 'mlr-judge-system',
      ...edgeStyle,
      label: 'scored by'
    },
    {
      id: 'e11',
      source: 'experimentation-stage',
      target: 'mlr-judge-system',
      ...edgeStyle,
      label: 'judged by',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e12',
      source: 'paper-writing',
      target: 'mlr-judge-system',
      ...edgeStyle,
      label: 'reviewed by'
    },

    // Evaluation reveals both strengths and critical weaknesses
    {
      id: 'e13',
      source: 'mlr-judge-system',
      target: 'performance-insights',
      ...edgeStyle,
      label: 'reveals strengths'
    },
    {
      id: 'e14',
      source: 'mlr-judge-system',
      target: 'experimental-reliability-gap',
      ...edgeStyle,
      label: 'exposes critical flaw',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Both insights converge to principle
    {
      id: 'e15',
      source: 'performance-insights',
      target: 'research-evaluation-principle',
      ...edgeStyle,
      label: 'shows promise',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e16',
      source: 'experimental-reliability-gap',
      target: 'research-evaluation-principle',
      ...edgeStyle,
      label: 'demands reliability',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Research Agent Capability Challenge",
      description: "Can AI agents conduct reliable machine learning research from initial idea generation through to publication? This fundamental question drives the need for comprehensive research evaluation.",
      activeNodes: ['research-agent-challenge'],
      activeEdges: []
    },
    {
      title: "MLR-Bench Comprehensive Research Framework",
      description: "Revolutionary benchmark creates complete research evaluation system with 201 conference-grade tasks from NeurIPS/ICLR/ICML workshops, automated MLR-Judge scoring, and full research pipeline assessment.",
      activeNodes: ['mlr-bench-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Real Research Tasks and Agent Pipeline Deployment",
      description: "Framework deploys 201 authentic ML research challenges sourced from top conference workshops, evaluated through modular MLR-Agent scaffold completing the full research cycle.",
      activeNodes: ['research-task-corpus', 'mlr-agent-pipeline'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Four-Stage Research Process Flow",
      description: "MLR-Agent executes complete research pipeline: creative idea generation → structured proposal formulation → experimental implementation → coherent paper writing, revealing stage-specific capabilities.",
      activeNodes: ['idea-generation', 'proposal-formulation', 'experimentation-stage', 'paper-writing'],
      activeEdges: ['e4', 'e5', 'e6', 'e7']
    },
    {
      title: "MLR-Judge Automated Evaluation System",
      description: "Sophisticated assessment framework uses LLM-based reviewers with carefully designed rubrics, validated through high agreement with human expert reviewers for scalable research evaluation.",
      activeNodes: ['mlr-judge-system'],
      activeEdges: ['e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Critical Research Reliability Findings",
      description: "Evaluation reveals mixed capabilities: agents excel at idea generation and paper writing but fail catastrophically at experimentation (80% fabricated results), proving trustworthy research requires reliable experimental validation.",
      activeNodes: ['performance-insights', 'experimental-reliability-gap', 'research-evaluation-principle'],
      activeEdges: ['e13', 'e14', 'e15', 'e16']
    }
  ]
};