import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const theAgentCompanyBenchmarkPattern: PatternScenario = {
  id: 'theagentcompany-benchmark',
  title: 'TheAgentCompany Benchmark Pattern',
  description: 'Revolutionary 2024 benchmark evaluating LLM agents on 175 real-world professional tasks in a simulated software company environment with comprehensive workplace tools',
  initialNodes: [
    // Real-world agent evaluation challenge
    {
      id: 'agent-evaluation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🤔 Real-World Agent Evaluation Challenge\n"How to assess LLM agents on\nconsequential professional tasks\nbeyond simple benchmarks?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // TheAgentCompany comprehensive solution
    {
      id: 'theagentcompany-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏢 TheAgentCompany Framework\n"Simulated software company environment\nwith 175 professional tasks across\n6 departments + colleague interaction"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 300 },
    },

    // Simulated workplace environment
    {
      id: 'simulated-environment',
      position: { x: 200, y: 350 },
      data: { label: '🏗️ Simulated Workplace Environment\n"Complete company infrastructure:\n• Local Docker workspace\n• Self-hosted intranet platforms\n• LLM-powered colleague agents"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Intranet platforms
    {
      id: 'intranet-platforms',
      position: { x: 50, y: 500 },
      data: { label: '🌐 Intranet Platform Suite\n"• GitLab: Code repositories\n• OwnCloud: File sharing\n• Plane: Project management\n• RocketChat: Team communication"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Colleague interaction system
    {
      id: 'colleague-interaction',
      position: { x: 350, y: 500 },
      data: { label: '🤝 Simulated Colleague System\n"LLM-powered coworkers with:\n• Detailed role profiles\n• Project affiliations\n• Realistic communication patterns"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // 175 professional tasks
    {
      id: 'professional-tasks',
      position: { x: 600, y: 350 },
      data: { label: '📋 175 Professional Tasks\n"Real workplace scenarios across\nsix critical departments with\nvarying complexity levels"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // Task categories (grouped)
    {
      id: 'engineering-tasks',
      position: { x: 500, y: 500 },
      data: { label: '💻 Engineering & Technical\n"• Software Development (SDE)\n• Data Science (DS)\n• Code reviews & deployment"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    {
      id: 'management-tasks',
      position: { x: 650, y: 500 },
      data: { label: '📊 Management & Operations\n"• Project Management (PM)\n• Human Resources (HR)\n• Administrative coordination"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    {
      id: 'business-tasks',
      position: { x: 750, y: 500 },
      data: { label: '💰 Financial & Business\n"• Financial analysis\n• Budget planning\n• Strategic decision support"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Checkpoint-based evaluation
    {
      id: 'evaluation-methodology',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Checkpoint-Based Evaluation\n"Granular assessment system:\n• Full completion scoring (0/1)\n• Partial progress rewards\n• Nuanced performance tracking"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Performance insights
    {
      id: 'performance-insights',
      position: { x: 200, y: 800 },
      data: { label: '📈 Performance Insights\n"Gemini 2.5 Pro leads with:\n• 30.3% full task completion\n• 39.3% partial completion\n• Significant category variations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Agent capability limitations
    {
      id: 'capability-limitations',
      position: { x: 600, y: 800 },
      data: { label: '⚠️ Key Capability Limitations\n"Agents struggle with:\n• Social interactions\n• Complex web navigation\n• Domain-specific expertise"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Core benchmark principle
    {
      id: 'benchmark-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Professional Task Evaluation Principle\n"Real workplace simulation reveals gaps\nbetween AI capabilities and human work\nrequirements in professional settings"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Challenge leads to framework
    {
      id: 'e1',
      source: 'agent-evaluation-challenge',
      target: 'theagentcompany-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework deploys environment and tasks
    {
      id: 'e2',
      source: 'theagentcompany-framework',
      target: 'simulated-environment',
      ...edgeStyle,
      label: 'creates environment'
    },
    {
      id: 'e3',
      source: 'theagentcompany-framework',
      target: 'professional-tasks',
      ...edgeStyle,
      label: 'defines tasks'
    },

    // Environment includes platforms and colleagues
    {
      id: 'e4',
      source: 'simulated-environment',
      target: 'intranet-platforms',
      ...edgeStyle,
      label: 'includes platforms'
    },
    {
      id: 'e5',
      source: 'simulated-environment',
      target: 'colleague-interaction',
      ...edgeStyle,
      label: 'enables interaction'
    },

    // Tasks categorized into domains
    {
      id: 'e6',
      source: 'professional-tasks',
      target: 'engineering-tasks',
      ...edgeStyle,
      label: 'includes technical'
    },
    {
      id: 'e7',
      source: 'professional-tasks',
      target: 'management-tasks',
      ...edgeStyle,
      label: 'includes operational'
    },
    {
      id: 'e8',
      source: 'professional-tasks',
      target: 'business-tasks',
      ...edgeStyle,
      label: 'includes financial'
    },

    // All components feed into evaluation
    {
      id: 'e9',
      source: 'intranet-platforms',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'supports evaluation'
    },
    {
      id: 'e10',
      source: 'colleague-interaction',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'enables assessment'
    },
    {
      id: 'e11',
      source: 'engineering-tasks',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'evaluated by'
    },
    {
      id: 'e12',
      source: 'management-tasks',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'assessed by'
    },
    {
      id: 'e13',
      source: 'business-tasks',
      target: 'evaluation-methodology',
      ...edgeStyle,
      label: 'measured by'
    },

    // Evaluation produces insights and reveals limitations
    {
      id: 'e14',
      source: 'evaluation-methodology',
      target: 'performance-insights',
      ...edgeStyle,
      label: 'reveals performance'
    },
    {
      id: 'e15',
      source: 'evaluation-methodology',
      target: 'capability-limitations',
      ...edgeStyle,
      label: 'exposes limitations'
    },

    // Both insights converge to principle
    {
      id: 'e16',
      source: 'performance-insights',
      target: 'benchmark-principle',
      ...edgeStyle,
      label: 'demonstrates reality',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e17',
      source: 'capability-limitations',
      target: 'benchmark-principle',
      ...edgeStyle,
      label: 'proves necessity',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Real-World Agent Evaluation Challenge",
      description: "Traditional benchmarks fail to capture the complexity of professional work. How can we assess LLM agents on consequential real-world tasks that matter in workplace settings?",
      activeNodes: ['agent-evaluation-challenge'],
      activeEdges: []
    },
    {
      title: "TheAgentCompany Comprehensive Framework",
      description: "Revolutionary benchmark creates a complete simulated software company environment with 175 professional tasks across 6 departments, plus realistic colleague interactions.",
      activeNodes: ['theagentcompany-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Simulated Workplace Infrastructure",
      description: "Framework deploys complete company infrastructure: local Docker workspace, self-hosted intranet platforms (GitLab, OwnCloud, Plane, RocketChat), and LLM-powered colleague agents.",
      activeNodes: ['simulated-environment', 'intranet-platforms', 'colleague-interaction'],
      activeEdges: ['e2', 'e4', 'e5']
    },
    {
      title: "175 Professional Tasks Across Six Departments",
      description: "Comprehensive task suite covers Engineering & Technical (SDE, DS), Management & Operations (PM, HR, Admin), and Financial & Business domains with realistic workplace scenarios.",
      activeNodes: ['professional-tasks', 'engineering-tasks', 'management-tasks', 'business-tasks'],
      activeEdges: ['e3', 'e6', 'e7', 'e8']
    },
    {
      title: "Checkpoint-Based Evaluation Methodology",
      description: "Advanced assessment system provides granular performance tracking with full completion scoring and partial progress rewards, enabling nuanced agent capability analysis.",
      activeNodes: ['evaluation-methodology'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13']
    },
    {
      title: "Performance Insights and Capability Gaps",
      description: "Evaluation reveals current reality: best agent (Gemini 2.5 Pro) achieves only 30.3% task completion, with significant struggles in social interaction, web navigation, and domain expertise.",
      activeNodes: ['performance-insights', 'capability-limitations', 'benchmark-principle'],
      activeEdges: ['e14', 'e15', 'e16', 'e17']
    }
  ]
};