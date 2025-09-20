import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const ruleBasedRoutingPattern: PatternScenario = {
  id: 'rule-based-routing',
  title: 'Rule-Based Routing Pattern',
  description: 'Demonstrates deterministic routing using predefined rules, conditions, and pattern matching',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Incoming Request\n"URGENT: Password reset for admin@company.com"' },
      style: { ...nodeStyle, minWidth: 350 }
    },
    {
      id: 'rule-engine',
      type: 'default',
      position: { x: 375, y: 160 },
      data: { label: '⚙️ Rule Engine\nEvaluate Conditions & Patterns' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 300 }
    },
    // Rule evaluation nodes
    {
      id: 'rule1',
      type: 'default',
      position: { x: 50, y: 280 },
      data: { label: 'Rule 1: Priority Check\nIF contains("URGENT")\nTHEN priority = HIGH\n✅ Matched' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 200 }
    },
    {
      id: 'rule2',
      type: 'default',
      position: { x: 270, y: 280 },
      data: { label: 'Rule 2: Topic Detection\nIF contains("password", "reset")\nTHEN topic = SECURITY\n✅ Matched' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 200 }
    },
    {
      id: 'rule3',
      type: 'default',
      position: { x: 490, y: 280 },
      data: { label: 'Rule 3: User Type\nIF email.endsWith("@company.com")\nTHEN userType = INTERNAL\n✅ Matched' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 200 }
    },
    {
      id: 'rule4',
      type: 'default',
      position: { x: 710, y: 280 },
      data: { label: 'Rule 4: Admin Check\nIF email.startsWith("admin")\nTHEN requiresEscalation = TRUE\n✅ Matched' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 200 }
    },
    // Decision node
    {
      id: 'decision',
      type: 'default',
      position: { x: 375, y: 400 },
      data: { label: '🎯 Routing Decision\nPriority: HIGH\nTopic: SECURITY\nUser: INTERNAL\nEscalate: TRUE' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 }
    },
    // Route destinations
    {
      id: 'security-escalated',
      type: 'default',
      position: { x: 150, y: 520 },
      data: { label: '🔐 Security Team (Escalated)\nHigh-Priority Security Issues' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 220 }
    },
    {
      id: 'security-normal',
      type: 'default',
      position: { x: 400, y: 520 },
      data: { label: '🛡️ Security Team (Normal)\nStandard Security Requests' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 }
    },
    {
      id: 'general-support',
      type: 'default',
      position: { x: 650, y: 520 },
      data: { label: '💬 General Support\nNon-Critical Issues' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    // Processing and output
    {
      id: 'security-processor',
      type: 'default',
      position: { x: 150, y: 640 },
      data: { label: 'Process Escalated Request\n• Alert security manager\n• Initiate admin password reset\n• Audit trail logging' },
      style: { ...nodeStyle, minWidth: 240 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 760 },
      data: { label: 'Response\n"Security team notified. Admin password reset\ninitiated. Check email for instructions."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 }
    },
    // Rule configuration panel
    {
      id: 'rule-config',
      type: 'default',
      position: { x: 750, y: 160 },
      data: { label: '📋 Rule Configuration\n• 15 active rules\n• Order: Priority-based\n• Fallback: General Support\n• Cache: Enabled' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 200, fontSize: 11 }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-engine',
      source: 'input',
      target: 'rule-engine',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-engine-config',
      source: 'rule-engine',
      target: 'rule-config',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    // Rule evaluations
    {
      id: 'e-engine-rule1',
      source: 'rule-engine',
      target: 'rule1',
      style: edgeStyle,
      label: 'Check'
    },
    {
      id: 'e-engine-rule2',
      source: 'rule-engine',
      target: 'rule2',
      style: edgeStyle,
      label: 'Check'
    },
    {
      id: 'e-engine-rule3',
      source: 'rule-engine',
      target: 'rule3',
      style: edgeStyle,
      label: 'Check'
    },
    {
      id: 'e-engine-rule4',
      source: 'rule-engine',
      target: 'rule4',
      style: edgeStyle,
      label: 'Check'
    },
    // Rules to decision
    {
      id: 'e-rule1-decision',
      source: 'rule1',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#22c55e' }
    },
    {
      id: 'e-rule2-decision',
      source: 'rule2',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#22c55e' }
    },
    {
      id: 'e-rule3-decision',
      source: 'rule3',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#22c55e' }
    },
    {
      id: 'e-rule4-decision',
      source: 'rule4',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#22c55e' }
    },
    // Decision to routes
    {
      id: 'e-decision-escalated',
      source: 'decision',
      target: 'security-escalated',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      label: 'Selected'
    },
    {
      id: 'e-decision-normal',
      source: 'decision',
      target: 'security-normal',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' }
    },
    {
      id: 'e-decision-general',
      source: 'decision',
      target: 'general-support',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' }
    },
    {
      id: 'e-escalated-processor',
      source: 'security-escalated',
      target: 'security-processor',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true
    },
    {
      id: 'e-processor-output',
      source: 'security-processor',
      target: 'output',
      style: edgeStyle
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Request Received',
      description: 'System receives an incoming request that needs to be routed based on predefined rules.',
      input: 'Request: "URGENT: Password reset for admin@company.com"\n\nMetadata:\n• Timestamp: 2024-01-10 14:32:15\n• Source: Web Portal\n• IP: 192.168.1.100',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Rule Engine Activation',
      description: 'The rule engine loads configured rules and prepares to evaluate them against the request.',
      input: 'Loading rule configuration:\n• Total rules: 15\n• Evaluation order: Priority-based\n• Pattern matching: Regex & Keywords\n• Default route: General Support',
      activeNodes: ['input', 'rule-engine', 'rule-config'],
      activeEdges: ['e-input-engine', 'e-engine-config']
    },
    {
      id: 'step3',
      title: 'Rule 1: Priority Check',
      description: 'First rule checks for priority indicators in the message.',
      output: 'Rule 1 Evaluation:\nCondition: IF message.contains("URGENT", "CRITICAL", "EMERGENCY")\nResult: ✅ MATCHED - Found "URGENT"\nAction: Set priority = HIGH\nContinue: Yes (check all rules)',
      activeNodes: ['rule-engine', 'rule1'],
      activeEdges: ['e-engine-rule1']
    },
    {
      id: 'step4',
      title: 'Rule 2: Topic Detection',
      description: 'Second rule identifies the topic category based on keywords.',
      output: 'Rule 2 Evaluation:\nCondition: IF message.contains("password", "reset", "login", "access")\nResult: ✅ MATCHED - Found "password" and "reset"\nAction: Set topic = SECURITY\nContinue: Yes',
      activeNodes: ['rule-engine', 'rule2'],
      activeEdges: ['e-engine-rule2']
    },
    {
      id: 'step5',
      title: 'Rule 3: User Type Classification',
      description: 'Third rule determines if the user is internal or external.',
      output: 'Rule 3 Evaluation:\nCondition: IF email.endsWith("@company.com")\nResult: ✅ MATCHED - "admin@company.com"\nAction: Set userType = INTERNAL\nContinue: Yes',
      activeNodes: ['rule-engine', 'rule3'],
      activeEdges: ['e-engine-rule3']
    },
    {
      id: 'step6',
      title: 'Rule 4: Admin Escalation Check',
      description: 'Fourth rule checks if the request requires special escalation.',
      output: 'Rule 4 Evaluation:\nCondition: IF email.startsWith("admin") OR role == "administrator"\nResult: ✅ MATCHED - Email starts with "admin"\nAction: Set requiresEscalation = TRUE\nContinue: Yes',
      activeNodes: ['rule-engine', 'rule4'],
      activeEdges: ['e-engine-rule4']
    },
    {
      id: 'step7',
      title: 'Aggregate Rule Results',
      description: 'All rule results are combined to make the final routing decision.',
      output: 'Aggregated Results:\n• Priority: HIGH (Rule 1)\n• Topic: SECURITY (Rule 2)\n• UserType: INTERNAL (Rule 3)\n• RequiresEscalation: TRUE (Rule 4)\n\nRouting Logic:\nIF (topic == SECURITY && requiresEscalation == TRUE)\n  THEN route to Security Team (Escalated)',
      activeNodes: ['rule1', 'rule2', 'rule3', 'rule4', 'decision'],
      activeEdges: ['e-rule1-decision', 'e-rule2-decision', 'e-rule3-decision', 'e-rule4-decision']
    },
    {
      id: 'step8',
      title: 'Route Selection',
      description: 'Based on the aggregated rules, the appropriate route is selected.',
      output: 'Routing Decision:\n\n✓ Selected: Security Team (Escalated)\n  Reasons:\n  • High priority request\n  • Security-related topic\n  • Admin account involved\n  • Escalation required\n\nRejected Routes:\n• Security Team (Normal) - Escalation required\n• General Support - Security topic',
      activeNodes: ['decision', 'security-escalated', 'security-normal', 'general-support'],
      activeEdges: ['e-decision-escalated', 'e-decision-normal', 'e-decision-general']
    },
    {
      id: 'step9',
      title: 'Process Request',
      description: 'The escalated security team handler processes the high-priority request.',
      output: 'Security Team Processing:\n1. Alert security manager via SMS/email\n2. Verify admin identity through secondary channel\n3. Generate secure password reset token\n4. Send reset instructions to verified email\n5. Log incident in security audit trail\n6. Schedule follow-up security review',
      activeNodes: ['security-escalated', 'security-processor'],
      activeEdges: ['e-escalated-processor']
    },
    {
      id: 'step10',
      title: 'Return Response',
      description: 'The processed result is sent back to the requester.',
      output: 'Final Response:\n\n"Your urgent request has been received and escalated to our security team. As this involves an administrator account, additional verification is required.\n\nPassword reset instructions have been sent to your registered email address. Please check your inbox and follow the secure link within 30 minutes.\n\nIncident ID: SEC-2024-001234\nEstimated resolution: 15 minutes\n\nIf you don\'t receive the email, please contact the security hotline immediately."',
      activeNodes: ['security-processor', 'output'],
      activeEdges: ['e-processor-output']
    }
  ]
};