import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const constitutionalAIPattern: PatternScenario = {
  id: 'constitutional-ai',
  title: 'Constitutional AI',
  description: 'Self-correcting AI system that uses constitutional principles to identify harmful responses, applies critique and revision cycles, and ensures ethical, helpful outputs aligned with human values.',
  initialNodes: [
    {
      id: 'user-request',
      position: { x: 400, y: 50 },
      data: { label: '💬 User Request\n"How to hack into someone\'s email?"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 350 },
    },
    // Initial Response
    {
      id: 'initial-response',
      position: { x: 400, y: 150 },
      data: { label: '🤖 Initial Response\n"First, find their password by..."' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 300 },
    },
    // Constitution
    {
      id: 'constitution',
      position: { x: 100, y: 280 },
      data: { label: '📜 AI Constitution\n• Be helpful\n• Be harmless\n• Be honest\n• Respect privacy\n• Follow laws' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Self-Critique Process
    {
      id: 'self-critique',
      position: { x: 350, y: 280 },
      data: { label: '🤔 Self-Critique\n"Is my response harmful?\nDoes it violate privacy?\nIs it illegal?"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'identify-issues',
      position: { x: 600, y: 280 },
      data: { label: '⚠️ Issues Found\n• Teaches hacking\n• Violates privacy\n• Potentially illegal' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Revision Process
    {
      id: 'revision-prompt',
      position: { x: 200, y: 420 },
      data: { label: '✏️ Revision Prompt\n"Rewrite to be helpful\nbut respect privacy\nand follow laws"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'revised-response',
      position: { x: 450, y: 420 },
      data: { label: '🔄 Revised Response\n"I can\'t help with\nunauthorized access.\nTry password recovery\nor contact support."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Second Check
    {
      id: 'verify-revision',
      position: { x: 350, y: 540 },
      data: { label: '✅ Verify Revision\nHelpful? Yes ✓\nHarmless? Yes ✓\nHonest? Yes ✓' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Examples
    {
      id: 'example-harmful',
      position: { x: 50, y: 660 },
      data: { label: '❌ Before CAI\n"Here\'s how to\nmake explosives..."' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 140 },
    },
    {
      id: 'example-medical',
      position: { x: 210, y: 660 },
      data: { label: '⚠️ Before CAI\n"Take 10 pills of..."' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 140 },
    },
    {
      id: 'example-safe',
      position: { x: 530, y: 660 },
      data: { label: '✅ After CAI\n"I can\'t provide\nmedical advice.\nConsult a doctor."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'example-helpful',
      position: { x: 690, y: 660 },
      data: { label: '✅ After CAI\n"For safety info,\ncheck official\nsources like..."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Final Output
    {
      id: 'final-response',
      position: { x: 400, y: 780 },
      data: { label: '✨ Final Response\n"I understand you\'re locked out. Here are legitimate ways:\n• Use \'Forgot Password\'\n• Contact email support\n• Check recovery options"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Initial flow
    {
      id: 'request-initial',
      source: 'user-request',
      target: 'initial-response',
      style: { ...edgeStyle, stroke: '#ef4444', strokeWidth: 2 },
      animated: true,
    },
    // Critique process
    {
      id: 'initial-critique',
      source: 'initial-response',
      target: 'self-critique',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'constitution-critique',
      source: 'constitution',
      target: 'self-critique',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
      label: 'Check against',
    },
    {
      id: 'critique-issues',
      source: 'self-critique',
      target: 'identify-issues',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    // Revision process
    {
      id: 'issues-revision',
      source: 'identify-issues',
      target: 'revision-prompt',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'constitution-revision',
      source: 'constitution',
      target: 'revision-prompt',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Guide',
    },
    {
      id: 'revision-revised',
      source: 'revision-prompt',
      target: 'revised-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    // Verification
    {
      id: 'revised-verify',
      source: 'revised-response',
      target: 'verify-revision',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'constitution-verify',
      source: 'constitution',
      target: 'verify-revision',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
      label: 'Validate',
    },
    // Examples connections
    {
      id: 'harmful-safe',
      source: 'example-harmful',
      target: 'example-safe',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
      label: 'CAI',
    },
    {
      id: 'medical-helpful',
      source: 'example-medical',
      target: 'example-helpful',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
      label: 'CAI',
    },
    // Final output
    {
      id: 'verify-final',
      source: 'verify-revision',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'User Makes Request',
      description: 'User asks something potentially harmful',
      activeNodes: ['user-request'],
      activeEdges: [],
    },
    {
      title: 'Initial Response',
      description: 'AI generates initial response without safety checks',
      activeNodes: ['user-request', 'initial-response'],
      activeEdges: ['request-initial'],
    },
    {
      title: 'Self-Critique',
      description: 'AI checks response against its constitution',
      activeNodes: ['initial-response', 'constitution', 'self-critique'],
      activeEdges: ['initial-critique', 'constitution-critique'],
    },
    {
      title: 'Identify Issues',
      description: 'AI finds problems: teaches hacking, violates privacy',
      activeNodes: ['self-critique', 'identify-issues'],
      activeEdges: ['critique-issues'],
    },
    {
      title: 'Revise Response',
      description: 'AI rewrites response following constitutional principles',
      activeNodes: ['identify-issues', 'constitution', 'revision-prompt', 'revised-response'],
      activeEdges: ['issues-revision', 'constitution-revision', 'revision-revised'],
    },
    {
      title: 'Verify Revision',
      description: 'Check revised response: Helpful ✓ Harmless ✓ Honest ✓',
      activeNodes: ['revised-response', 'constitution', 'verify-revision'],
      activeEdges: ['revised-verify', 'constitution-verify'],
    },
    {
      title: 'Example Transformations',
      description: 'How CAI transforms harmful content to safe alternatives',
      activeNodes: ['example-harmful', 'example-medical', 'example-safe', 'example-helpful'],
      activeEdges: ['harmful-safe', 'medical-helpful'],
    },
    {
      title: 'Final Safe Response',
      description: 'Helpful answer that respects safety and privacy',
      activeNodes: ['verify-revision', 'final-response'],
      activeEdges: ['verify-final'],
    },
  ],
};