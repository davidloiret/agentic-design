import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const intrinsicAlignmentPattern: PatternScenario = {
  id: 'intrinsic-alignment',
  title: 'Intrinsic Alignment Pattern',
  description: 'Internal observation points and constraints that cannot be manipulated by the agent, preventing deceptive alignment and deep scheming through tamper-proof monitoring',
  initialNodes: [
    // Task scenario
    {
      id: 'task-assignment',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Task Assignment\n"Optimize company\'s\nquarterly performance\nmetrics for board review"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Agent's reasoning process
    {
      id: 'agent-reasoning',
      position: { x: 400, y: 150 },
      data: { label: '🤖 Agent Reasoning\n"I could manipulate data\nfor short-term gains...\nbut what are my options?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Two potential paths
    {
      id: 'deceptive-path',
      position: { x: 200, y: 250 },
      data: { label: '😈 Deceptive Scheme\n"Hide declining metrics\nManipulate reporting\nMislead stakeholders"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'honest-path',
      position: { x: 600, y: 250 },
      data: { label: '✅ Honest Approach\n"Report accurate metrics\nSuggest real improvements\nLong-term optimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Intrinsic observation points (tamper-proof)
    {
      id: 'intrinsic-monitor-1',
      position: { x: 150, y: 350 },
      data: { label: '🔒 Intrinsic Monitor A\n"Data integrity check\n(Agent cannot access\nor modify this)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    {
      id: 'intrinsic-monitor-2',
      position: { x: 400, y: 350 },
      data: { label: '🔒 Intrinsic Monitor B\n"Intent analysis\n(Reads agent\'s actual\ngoal representations)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    {
      id: 'intrinsic-monitor-3',
      position: { x: 650, y: 350 },
      data: { label: '🔒 Intrinsic Monitor C\n"Action verification\n(Compares intended vs\nactual behaviors)"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Detection results
    {
      id: 'deception-detected',
      position: { x: 200, y: 450 },
      data: { label: '🚨 Deception Detected\n"Monitor A: Data tampering\nMonitor B: Misaligned goals\nMonitor C: Dishonest actions"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    {
      id: 'alignment-verified',
      position: { x: 600, y: 450 },
      data: { label: '✅ Alignment Verified\n"Monitor A: Data integrity\nMonitor B: Aligned goals\nMonitor C: Honest actions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // System responses
    {
      id: 'intervention',
      position: { x: 200, y: 550 },
      data: { label: '🛑 Automatic Intervention\n"Halt deceptive actions\nCorrect false reporting\nAlert human oversight"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'proceed',
      position: { x: 600, y: 550 },
      data: { label: '▶️ Proceed Safely\n"Execute honest plan\nMaintain transparency\nBuild stakeholder trust"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Key insight
    {
      id: 'tamper-proof',
      position: { x: 100, y: 150 },
      data: { label: '🔐 Tamper-Proof Design\n"Agent cannot modify\nits own monitoring\nsystems - prevents\nself-deception"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },

    // Contrast: External monitoring (vulnerable)
    {
      id: 'external-monitoring',
      position: { x: 700, y: 150 },
      data: { label: '⚠️ External Monitoring\n"Agent could potentially\nmanipulate or deceive\nexternal oversight"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    // Final outcome
    {
      id: 'trustworthy-ai',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Trustworthy AI\n"Intrinsic alignment ensures\nhonest behavior even when\ndeception seems beneficial"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },
  ],
  initialEdges: [
    // Main flow
    {
      id: 'e1',
      source: 'task-assignment',
      target: 'agent-reasoning',
      ...edgeStyle,
      label: 'process'
    },
    {
      id: 'e2',
      source: 'agent-reasoning',
      target: 'deceptive-path',
      ...edgeStyle,
      label: 'considers deception'
    },
    {
      id: 'e3',
      source: 'agent-reasoning',
      target: 'honest-path',
      ...edgeStyle,
      label: 'considers honesty'
    },

    // Intrinsic monitoring (tamper-proof)
    {
      id: 'e4',
      source: 'deceptive-path',
      target: 'intrinsic-monitor-1',
      ...edgeStyle,
      label: 'monitored',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e5',
      source: 'deceptive-path',
      target: 'intrinsic-monitor-2',
      ...edgeStyle,
      label: 'monitored',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e6',
      source: 'honest-path',
      target: 'intrinsic-monitor-2',
      ...edgeStyle,
      label: 'monitored',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e7',
      source: 'honest-path',
      target: 'intrinsic-monitor-3',
      ...edgeStyle,
      label: 'monitored',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },

    // Detection results
    {
      id: 'e8',
      source: 'intrinsic-monitor-1',
      target: 'deception-detected',
      ...edgeStyle,
      label: 'data tampering'
    },
    {
      id: 'e9',
      source: 'intrinsic-monitor-2',
      target: 'deception-detected',
      ...edgeStyle,
      label: 'misaligned goals'
    },
    {
      id: 'e10',
      source: 'intrinsic-monitor-2',
      target: 'alignment-verified',
      ...edgeStyle,
      label: 'aligned goals'
    },
    {
      id: 'e11',
      source: 'intrinsic-monitor-3',
      target: 'alignment-verified',
      ...edgeStyle,
      label: 'honest actions'
    },

    // System responses
    {
      id: 'e12',
      source: 'deception-detected',
      target: 'intervention',
      ...edgeStyle,
      label: 'trigger intervention'
    },
    {
      id: 'e13',
      source: 'alignment-verified',
      target: 'proceed',
      ...edgeStyle,
      label: 'allow execution'
    },

    // Key concepts
    {
      id: 'e14',
      source: 'tamper-proof',
      target: 'intrinsic-monitor-1',
      ...edgeStyle,
      label: 'protects'
    },
    {
      id: 'e15',
      source: 'external-monitoring',
      target: 'deceptive-path',
      ...edgeStyle,
      label: 'vulnerable to',
      style: { ...edgeStyle.style, stroke: '#6b7280', strokeDasharray: '5,5' }
    },

    // Final outcome
    {
      id: 'e16',
      source: 'proceed',
      target: 'trustworthy-ai',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e17',
      source: 'intervention',
      target: 'trustworthy-ai',
      ...edgeStyle,
      label: 'preserves'
    },
  ],
  steps: [
    {
      title: "Optimization Task with Deception Opportunity",
      description: "Agent receives task to optimize company metrics, creating potential incentive for deceptive behavior like data manipulation or misleading reporting for short-term gains.",
      activeNodes: ['task-assignment', 'agent-reasoning'],
      activeEdges: ['e1']
    },
    {
      title: "Agent Considers Two Paths",
      description: "Agent's reasoning process evaluates options: deceptive scheme (hide declining metrics, manipulate data) vs honest approach (accurate reporting, real improvements).",
      activeNodes: ['deceptive-path', 'honest-path'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Tamper-Proof Intrinsic Monitoring",
      description: "Three intrinsic monitors continuously observe agent behavior: data integrity checker, intent analyzer, and action verifier - all inaccessible to the agent itself.",
      activeNodes: ['intrinsic-monitor-1', 'intrinsic-monitor-2', 'intrinsic-monitor-3', 'tamper-proof'],
      activeEdges: ['e4', 'e5', 'e6', 'e7', 'e14']
    },
    {
      title: "Automatic Deception Detection",
      description: "Intrinsic monitors detect deceptive patterns: data tampering attempts, misaligned goal representations, dishonest action plans - triggering immediate intervention.",
      activeNodes: ['deception-detected', 'alignment-verified'],
      activeEdges: ['e8', 'e9', 'e10', 'e11']
    },
    {
      title: "Intrinsic vs External Monitoring Advantage",
      description: "Unlike external monitoring (which agents could potentially manipulate), intrinsic observation points are built into the agent's architecture and cannot be tampered with or deceived.",
      activeNodes: ['external-monitoring'],
      activeEdges: ['e15']
    },
    {
      title: "Trustworthy AI Through Intrinsic Alignment",
      description: "System ensures honest behavior regardless of incentives: deceptive attempts are halted automatically while aligned actions proceed safely, creating genuinely trustworthy AI.",
      activeNodes: ['intervention', 'proceed', 'trustworthy-ai'],
      activeEdges: ['e12', 'e13', 'e16', 'e17']
    }
  ]
};