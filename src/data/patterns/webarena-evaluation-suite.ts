import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const webArenaEvaluationSuitePattern: PatternScenario = {
  id: 'webarena-evaluation-suite',
  title: 'WebArena: Realistic Web Agent Evaluation Pattern',
  description: 'Comprehensive web environment with 812 long-horizon tasks across 4 domains, revealing massive AI agent limitations (14.41% GPT-4 vs 78.24% human performance) in autonomous web navigation',
  initialNodes: [
    // Web agent evaluation challenge
    {
      id: 'web-agent-evaluation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🌐 Web Agent Evaluation Challenge\n"How to evaluate autonomous agents\non realistic, complex web tasks\nthat humans routinely perform?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // WebArena realistic environment
    {
      id: 'webarena-environment',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ WebArena Realistic Environment\n"Standalone web environment:\n• 4 functional web domains\n• 812 long-horizon tasks\n• Human-like task complexity"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Four web domains
    {
      id: 'four-web-domains',
      position: { x: 200, y: 350 },
      data: { label: '🌍 Four Functional Web Domains\n"Real-world website coverage:\n• E-commerce (OneStopMarket)\n• Social Forum (Reddit-like)\n• Software Development (GitLab)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Content Management System
    {
      id: 'cms-domain',
      position: { x: 200, y: 500 },
      data: { label: '📝 Content Management System\n"Website administration:\n• Content creation/editing\n• User management\n• System configuration"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // 812 long-horizon tasks
    {
      id: 'long-horizon-tasks',
      position: { x: 600, y: 350 },
      data: { label: '📋 812 Long-Horizon Tasks\n"Complex multi-step scenarios:\n• 241 task templates\n• 3.3 variations per template\n• Human-like task patterns"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Task examples
    {
      id: 'task-examples',
      position: { x: 600, y: 500 },
      data: { label: '✅ Realistic Task Examples\n"Authentic web interactions:\n• Subscribe to newsletter\n• Cancel orders, update profiles\n• Repository interactions\n• Route finding with maps"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Multi-modal observation system
    {
      id: 'observation-system',
      position: { x: 400, y: 650 },
      data: { label: '👁️ Multi-Modal Observation System\n"Comprehensive web perception:\n• Accessibility trees (primary)\n• DOM structures\n• Browser screenshots\n• 1280x720 viewport"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Functional correctness evaluation
    {
      id: 'functional-evaluation',
      position: { x: 200, y: 800 },
      data: { label: '🔍 Functional Correctness Evaluation\n"Outcome-based validation:\n• Programmatic success detection\n• Environment state verification\n• End-to-end task completion"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Massive performance gap
    {
      id: 'performance-gap',
      position: { x: 600, y: 800 },
      data: { label: '📉 Massive Agent Performance Gap\n"AI limitations exposed:\n• GPT-4 best: 14.41% success\n• Human performance: 78.24%\n• Recent best: CUA at 58.1%"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 230 },
    },

    // Extensions and evolution
    {
      id: 'benchmark-extensions',
      position: { x: 400, y: 950 },
      data: { label: '🚀 Benchmark Extensions & Evolution\n"Expanding evaluation scope:\n• VisualWebArena (multimodal)\n• ST-WebAgentBench (safety/trust)\n• Continuous performance tracking"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Core web agent evaluation principle
    {
      id: 'web-agent-evaluation-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Web Agent Evaluation Principle\n"Realistic web environments reveal true agent capabilities\nLong-horizon tasks expose planning and execution gaps\nFunctional correctness measures meaningful progress"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Challenge addressed by WebArena environment
    {
      id: 'e1',
      source: 'web-agent-evaluation-challenge',
      target: 'webarena-environment',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Environment includes domains and tasks
    {
      id: 'e2',
      source: 'webarena-environment',
      target: 'four-web-domains',
      ...edgeStyle,
      label: 'implements 4 domains'
    },
    {
      id: 'e3',
      source: 'webarena-environment',
      target: 'long-horizon-tasks',
      ...edgeStyle,
      label: 'creates 812 tasks'
    },

    // Four domains include CMS
    {
      id: 'e4',
      source: 'four-web-domains',
      target: 'cms-domain',
      ...edgeStyle,
      label: 'includes CMS'
    },

    // Long-horizon tasks include examples
    {
      id: 'e5',
      source: 'long-horizon-tasks',
      target: 'task-examples',
      ...edgeStyle,
      label: 'exemplified by'
    },

    // Environment uses observation system
    {
      id: 'e6',
      source: 'webarena-environment',
      target: 'observation-system',
      ...edgeStyle,
      label: 'uses observation'
    },

    // Domains, tasks, and observation enable evaluation
    {
      id: 'e7',
      source: 'cms-domain',
      target: 'functional-evaluation',
      ...edgeStyle,
      label: 'evaluated by'
    },
    {
      id: 'e8',
      source: 'task-examples',
      target: 'functional-evaluation',
      ...edgeStyle,
      label: 'tested via'
    },
    {
      id: 'e9',
      source: 'observation-system',
      target: 'functional-evaluation',
      ...edgeStyle,
      label: 'enables evaluation'
    },

    // Evaluation reveals performance gap
    {
      id: 'e10',
      source: 'functional-evaluation',
      target: 'performance-gap',
      ...edgeStyle,
      label: 'reveals limitations'
    },

    // Performance gap and evaluation drive extensions
    {
      id: 'e11',
      source: 'performance-gap',
      target: 'benchmark-extensions',
      ...edgeStyle,
      label: 'motivates extensions'
    },
    {
      id: 'e12',
      source: 'functional-evaluation',
      target: 'benchmark-extensions',
      ...edgeStyle,
      label: 'enables evolution'
    },

    // Extensions demonstrate core principle
    {
      id: 'e13',
      source: 'benchmark-extensions',
      target: 'web-agent-evaluation-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Web Agent Evaluation Challenge",
      description: "How can we evaluate autonomous agents on realistic, complex web tasks that humans routinely perform, going beyond simple isolated interactions to test true web navigation capabilities?",
      activeNodes: ['web-agent-evaluation-challenge'],
      activeEdges: []
    },
    {
      title: "WebArena Realistic Environment Introduction",
      description: "Comprehensive standalone web environment addresses challenge with 4 functional web domains and 812 long-horizon tasks designed to match human-like task complexity and real-world scenarios.",
      activeNodes: ['webarena-environment'],
      activeEdges: ['e1']
    },
    {
      title: "Four Web Domains and Task Template System",
      description: "Environment implements realistic coverage: E-commerce (OneStopMarket), Social Forum, Software Development (GitLab), Content Management System, generating 812 tasks from 241 templates with 3.3 variations each.",
      activeNodes: ['four-web-domains', 'cms-domain', 'long-horizon-tasks', 'task-examples'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Multi-Modal Observation System",
      description: "WebArena uses comprehensive web perception through accessibility trees (primary), DOM structures, and browser screenshots in 1280x720 viewport, enabling sophisticated agent-environment interaction.",
      activeNodes: ['observation-system'],
      activeEdges: ['e6']
    },
    {
      title: "Functional Correctness Evaluation and Performance Gap",
      description: "Outcome-based validation with programmatic success detection reveals massive limitations: GPT-4 achieves only 14.41% success vs 78.24% human performance, with recent best (CUA) reaching 58.1%.",
      activeNodes: ['functional-evaluation', 'performance-gap'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Benchmark Extensions and Core Evaluation Principle",
      description: "WebArena's impact drives evolution: VisualWebArena (multimodal), ST-WebAgentBench (safety/trust), proving realistic web environments reveal true capabilities while long-horizon tasks expose planning gaps.",
      activeNodes: ['benchmark-extensions', 'web-agent-evaluation-principle'],
      activeEdges: ['e11', 'e12', 'e13']
    }
  ]
};