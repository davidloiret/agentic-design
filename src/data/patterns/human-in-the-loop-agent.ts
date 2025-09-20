import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const humanInTheLoopAgentPattern: PatternScenario = {
  id: 'human-in-the-loop-agent',
  title: 'HULA: Human-in-the-Loop Agent Pattern',
  description: 'Atlassian\'s collaborative AI framework integrating human oversight with LLM-based software development agents, achieving 900+ merged pull requests through strategic human-AI collaboration',
  initialNodes: [
    // Software development automation challenge
    {
      id: 'automation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤖 Software Development Automation Challenge\n"How to automate coding tasks while\nmaintaining human control and quality\nassurance in complex development workflows?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 350 },
    },

    // Pure automation approach (problematic)
    {
      id: 'pure-automation-approach',
      position: { x: 150, y: 200 },
      data: { label: '❌ Pure Automation Approach\n"Fully autonomous coding agents:\n• No human oversight\n• Quality control issues\n• Trust and accountability gaps"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // HULA collaborative framework
    {
      id: 'hula-framework',
      position: { x: 650, y: 200 },
      data: { label: '🤝 HULA Collaborative Framework\n"Human-in-the-Loop LLM agents:\n• Strategic human guidance\n• Quality assurance checkpoints\n• Engineer remains in driver\'s seat"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Three-agent architecture
    {
      id: 'three-agent-architecture',
      position: { x: 650, y: 350 },
      data: { label: '🏗️ Three-Agent Architecture\n"Collaborative agent system:\n• AI Planner Agent\n• AI Coding Agent\n• Human Agent (Engineer)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // AI Planner Agent
    {
      id: 'ai-planner-agent',
      position: { x: 450, y: 500 },
      data: { label: '📋 AI Planner Agent\n"Strategic planning:\n• Analyzes Jira work items\n• Identifies relevant files\n• Creates coding plans"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Human Agent (Engineer)
    {
      id: 'human-agent-engineer',
      position: { x: 650, y: 500 },
      data: { label: '👨‍💻 Human Agent (Engineer)\n"Quality control & guidance:\n• Reviews and refines plans\n• Provides strategic feedback\n• Maintains oversight control"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // AI Coding Agent
    {
      id: 'ai-coding-agent',
      position: { x: 850, y: 500 },
      data: { label: '💻 AI Coding Agent\n"Code implementation:\n• Generates source code\n• Incorporates feedback\n• Creates pull requests"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },

    // Four-stage workflow
    {
      id: 'four-stage-workflow',
      position: { x: 400, y: 650 },
      data: { label: '⚙️ Four-Stage Collaborative Workflow\n"1. Set Context (Engineer selects task)\n2. Generate Plan (AI + Human review)\n3. Generate Code (AI + Feedback)\n4. Raise PR (Human approval)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Production deployment results
    {
      id: 'production-results',
      position: { x: 200, y: 800 },
      data: { label: '📊 Production Deployment Results\n"900+ merged pull requests\n79% plan generation success\n82% plan approval rate\n59% PR merge rate"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Quality and performance metrics
    {
      id: 'quality-metrics',
      position: { x: 600, y: 800 },
      data: { label: '🎯 Quality & Performance Metrics\n"31% SWE-bench test pass rate\n45% highly-similar to human code\n61% code understandability rating\nReduced development time"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core collaborative principle
    {
      id: 'collaborative-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Human-AI Collaborative Principle\n"Optimal AI assistance balances automation with human oversight\nStrategic checkpoints ensure quality while reducing routine effort\nHuman remains in control, AI amplifies capabilities"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge splits into approaches
    {
      id: 'e1',
      source: 'automation-challenge',
      target: 'pure-automation-approach',
      ...edgeStyle,
      label: 'full automation approach'
    },
    {
      id: 'e2',
      source: 'automation-challenge',
      target: 'hula-framework',
      ...edgeStyle,
      label: 'collaborative approach'
    },

    // HULA framework implements three-agent architecture
    {
      id: 'e3',
      source: 'hula-framework',
      target: 'three-agent-architecture',
      ...edgeStyle,
      label: 'implements architecture'
    },

    // Three-agent architecture includes specific agents
    {
      id: 'e4',
      source: 'three-agent-architecture',
      target: 'ai-planner-agent',
      ...edgeStyle,
      label: 'includes planner'
    },
    {
      id: 'e5',
      source: 'three-agent-architecture',
      target: 'human-agent-engineer',
      ...edgeStyle,
      label: 'includes human'
    },
    {
      id: 'e6',
      source: 'three-agent-architecture',
      target: 'ai-coding-agent',
      ...edgeStyle,
      label: 'includes coder'
    },

    // Agents collaborate through workflow
    {
      id: 'e7',
      source: 'ai-planner-agent',
      target: 'four-stage-workflow',
      ...edgeStyle,
      label: 'plans in workflow'
    },
    {
      id: 'e8',
      source: 'human-agent-engineer',
      target: 'four-stage-workflow',
      ...edgeStyle,
      label: 'guides workflow'
    },
    {
      id: 'e9',
      source: 'ai-coding-agent',
      target: 'four-stage-workflow',
      ...edgeStyle,
      label: 'codes in workflow'
    },

    // Workflow produces measurable results
    {
      id: 'e10',
      source: 'four-stage-workflow',
      target: 'production-results',
      ...edgeStyle,
      label: 'produces results'
    },
    {
      id: 'e11',
      source: 'four-stage-workflow',
      target: 'quality-metrics',
      ...edgeStyle,
      label: 'achieves quality'
    },

    // Results demonstrate collaborative principle
    {
      id: 'e12',
      source: 'production-results',
      target: 'collaborative-principle',
      ...edgeStyle,
      label: 'proves effectiveness',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e13',
      source: 'quality-metrics',
      target: 'collaborative-principle',
      ...edgeStyle,
      label: 'validates approach',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Pure automation failure also validates principle
    {
      id: 'e14',
      source: 'pure-automation-approach',
      target: 'collaborative-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5', stroke: '#ef4444' }
    },
  ],
  steps: [
    {
      title: "Software Development Automation Challenge",
      description: "How can we automate repetitive coding tasks while maintaining human control, quality assurance, and accountability in complex software development workflows?",
      activeNodes: ['automation-challenge'],
      activeEdges: []
    },
    {
      title: "Two Automation Approaches: Pure vs Collaborative",
      description: "Pure automation lacks human oversight and creates quality/trust issues, while HULA's collaborative framework keeps engineers in the driver's seat with strategic AI assistance.",
      activeNodes: ['pure-automation-approach', 'hula-framework'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Three-Agent Collaborative Architecture",
      description: "HULA implements collaborative system: AI Planner Agent (analyzes tasks, creates plans), Human Agent/Engineer (reviews, guides, controls), AI Coding Agent (implements code, creates PRs).",
      activeNodes: ['three-agent-architecture', 'ai-planner-agent', 'human-agent-engineer', 'ai-coding-agent'],
      activeEdges: ['e3', 'e4', 'e5', 'e6']
    },
    {
      title: "Four-Stage Collaborative Workflow",
      description: "Agents collaborate through structured workflow: 1) Set Context (engineer selects task), 2) Generate Plan (AI + human review), 3) Generate Code (AI + feedback), 4) Raise PR (human approval).",
      activeNodes: ['four-stage-workflow'],
      activeEdges: ['e7', 'e8', 'e9']
    },
    {
      title: "Production Results and Quality Metrics",
      description: "HULA achieved 900+ merged PRs with 79% plan generation success, 82% approval rate, 59% merge rate, 31% SWE-bench pass rate, and 45% highly-similar code quality.",
      activeNodes: ['production-results', 'quality-metrics'],
      activeEdges: ['e10', 'e11']
    },
    {
      title: "Human-AI Collaborative Principle",
      description: "Optimal AI assistance balances automation with strategic human oversight checkpoints, reducing routine effort while maintaining quality control, proving humans remain in control while AI amplifies capabilities.",
      activeNodes: ['collaborative-principle'],
      activeEdges: ['e12', 'e13', 'e14']
    }
  ]
};