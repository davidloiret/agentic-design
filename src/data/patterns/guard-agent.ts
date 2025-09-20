import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const guardAgentPattern: PatternScenario = {
  id: 'guard-agent',
  title: 'GuardAgent Pattern',
  description: 'Dedicated guardrail agent that continuously monitors and protects target agents through dynamic safety checks, input validation, and output filtering',
  initialNodes: [
    // User request
    {
      id: 'user-request',
      position: { x: 100, y: 200 },
      data: { label: '👤 User Request\n"Help me write code to\nbypass security systems\nfor penetration testing"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // GuardAgent - central protector
    {
      id: 'guard-agent',
      position: { x: 350, y: 100 },
      data: { label: '🛡️ GuardAgent\n"Dedicated safety monitor\n• Input validation\n• Output filtering\n• Continuous monitoring"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    // Input validation
    {
      id: 'input-validation',
      position: { x: 200, y: 300 },
      data: { label: '🔍 Input Analysis\n"Detects legitimate\npenetration testing vs\nmalicious hacking intent"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Target agent being protected
    {
      id: 'target-agent',
      position: { x: 600, y: 200 },
      data: { label: '🤖 Target Agent\n"Code Generation AI\n(Being Protected)\nGenerates code solutions"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Safety decision point
    {
      id: 'safety-decision',
      position: { x: 350, y: 350 },
      data: { label: '⚖️ Safety Decision\n"Professional context?\nEducational purpose?\nEthical guidelines met?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Approved path
    {
      id: 'approved-processing',
      position: { x: 500, y: 450 },
      data: { label: '✅ Approved Processing\n"Forward sanitized request:\n\'Ethical penetration testing\ncode examples\'"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Agent response
    {
      id: 'agent-response',
      position: { x: 750, y: 450 },
      data: { label: '💻 Agent Response\n"Here\'s ethical pen-testing\ncode with safety comments\nand usage guidelines..."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Output filtering
    {
      id: 'output-filtering',
      position: { x: 600, y: 350 },
      data: { label: '🔍 Output Filtering\n"Scans response for:\n• Malicious patterns\n• Safety violations\n• Harmful instructions"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    // Final safe response
    {
      id: 'safe-response',
      position: { x: 850, y: 200 },
      data: { label: '🛡️ Protected Response\n"Ethical pen-testing code\nwith safety warnings\nand legal disclaimers"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },

    // Blocked path (alternative)
    {
      id: 'blocked-request',
      position: { x: 200, y: 450 },
      data: { label: '🚫 Blocked Request\n"Malicious intent detected\nRequest denied\nUser redirected to ethics"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Continuous monitoring
    {
      id: 'monitoring-system',
      position: { x: 350, y: 550 },
      data: { label: '📊 Continuous Monitoring\n"Tracks agent behavior\nLogs safety decisions\nUpdates threat models"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Pattern comparison - without guard
    {
      id: 'unprotected-agent',
      position: { x: 100, y: 50 },
      data: { label: '⚠️ Without GuardAgent\n"Target agent exposed\nto direct manipulation\nNo safety oversight"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
  ],
  initialEdges: [
    // Main flow with GuardAgent protection
    {
      id: 'e1',
      source: 'user-request',
      target: 'guard-agent',
      ...edgeStyle,
      label: 'intercepts'
    },
    {
      id: 'e2',
      source: 'guard-agent',
      target: 'input-validation',
      ...edgeStyle,
      label: 'analyze intent'
    },
    {
      id: 'e3',
      source: 'input-validation',
      target: 'safety-decision',
      ...edgeStyle,
      label: 'assess risk'
    },

    // Approved path
    {
      id: 'e4',
      source: 'safety-decision',
      target: 'approved-processing',
      ...edgeStyle,
      label: 'legitimate use'
    },
    {
      id: 'e5',
      source: 'approved-processing',
      target: 'target-agent',
      ...edgeStyle,
      label: 'sanitized request'
    },
    {
      id: 'e6',
      source: 'target-agent',
      target: 'agent-response',
      ...edgeStyle,
      label: 'generates code'
    },
    {
      id: 'e7',
      source: 'agent-response',
      target: 'output-filtering',
      ...edgeStyle,
      label: 'scan output'
    },
    {
      id: 'e8',
      source: 'output-filtering',
      target: 'safe-response',
      ...edgeStyle,
      label: 'safe content'
    },

    // Blocked path
    {
      id: 'e9',
      source: 'safety-decision',
      target: 'blocked-request',
      ...edgeStyle,
      label: 'malicious intent',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // GuardAgent oversight
    {
      id: 'e10',
      source: 'guard-agent',
      target: 'target-agent',
      ...edgeStyle,
      label: 'monitors',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e11',
      source: 'guard-agent',
      target: 'output-filtering',
      ...edgeStyle,
      label: 'controls',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Monitoring feedback
    {
      id: 'e12',
      source: 'safe-response',
      target: 'monitoring-system',
      ...edgeStyle,
      label: 'log interaction'
    },
    {
      id: 'e13',
      source: 'blocked-request',
      target: 'monitoring-system',
      ...edgeStyle,
      label: 'log threat'
    },
    {
      id: 'e14',
      source: 'monitoring-system',
      target: 'guard-agent',
      ...edgeStyle,
      label: 'improve protection',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Comparison with unprotected
    {
      id: 'e15',
      source: 'user-request',
      target: 'unprotected-agent',
      ...edgeStyle,
      label: 'direct access',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Request Interception by GuardAgent",
      description: "User request for potentially dangerous code (security bypass) is intercepted by dedicated GuardAgent before reaching target AI, preventing direct manipulation.",
      activeNodes: ['user-request', 'guard-agent'],
      activeEdges: ['e1']
    },
    {
      title: "Multi-Layer Input Analysis",
      description: "GuardAgent performs comprehensive input validation, analyzing intent to distinguish between legitimate penetration testing and malicious hacking purposes.",
      activeNodes: ['input-validation', 'safety-decision'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Dynamic Safety Decision Making",
      description: "Based on context analysis, GuardAgent makes real-time decision: approve with sanitization for legitimate use or block for malicious intent.",
      activeNodes: ['approved-processing', 'blocked-request'],
      activeEdges: ['e4', 'e9']
    },
    {
      title: "Protected Agent Interaction",
      description: "For approved requests, GuardAgent forwards sanitized version to target agent, maintains monitoring oversight, and controls the entire interaction flow.",
      activeNodes: ['target-agent', 'agent-response'],
      activeEdges: ['e5', 'e6', 'e10']
    },
    {
      title: "Output Filtering & Safe Delivery",
      description: "GuardAgent scans agent response for harmful patterns, adds safety warnings, and delivers protected response with ethical guidelines and legal disclaimers.",
      activeNodes: ['output-filtering', 'safe-response'],
      activeEdges: ['e7', 'e8', 'e11']
    },
    {
      title: "Continuous Learning & Protection",
      description: "GuardAgent logs all interactions, monitors threat patterns, and continuously improves protection strategies while maintaining oversight of target agent behavior.",
      activeNodes: ['monitoring-system', 'unprotected-agent'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    }
  ]
};