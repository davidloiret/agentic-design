import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const complianceAutomationPattern: PatternScenario = {
  id: 'compliance-automation',
  title: 'Compliance Automation Pattern',
  description: 'Automated enforcement of regulatory compliance requirements including GDPR, HIPAA, SOX through real-time policy checking, audit trails, and violation prevention',
  initialNodes: [
    // AI healthcare system scenario
    {
      id: 'healthcare-ai-system',
      position: { x: 400, y: 50 },
      data: { label: '🏥 Healthcare AI System\n"Patient diagnosis assistant processing\nsensitive medical records under\nHIPAA, GDPR, and FDA regulations"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Compliance challenge
    {
      id: 'compliance-challenge',
      position: { x: 400, y: 200 },
      data: { label: '📋 Multi-Regulation Compliance\n"Must simultaneously comply with:\n• HIPAA (US health privacy)\n• GDPR (EU data protection)\n• FDA (medical device rules)"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Manual compliance (error-prone)
    {
      id: 'manual-compliance',
      position: { x: 150, y: 350 },
      data: { label: '📝 Manual Compliance Process\n"Human reviewers check\neach AI decision against\nregulatory requirements"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 220 },
    },

    {
      id: 'human-errors',
      position: { x: 150, y: 500 },
      data: { label: '❌ Human Compliance Errors\n"Missed privacy violations\nInconsistent policy application\nSlow response to violations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'regulatory-violations',
      position: { x: 150, y: 650 },
      data: { label: '🚨 Regulatory Violations\n"HIPAA breach: $1.5M fine\nGDPR violation: €4M penalty\nFDA warning letter issued"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Automated compliance
    {
      id: 'automated-compliance',
      position: { x: 650, y: 350 },
      data: { label: '🤖 Automated Compliance System\n"Real-time policy enforcement:\n• HIPAA privacy checks\n• GDPR consent validation\n• FDA audit requirements"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'policy-enforcement',
      position: { x: 650, y: 500 },
      data: { label: '🛡️ Real-Time Policy Enforcement\n"AI diagnosis request:\n✓ HIPAA: Minimum necessary\n✓ GDPR: Valid consent exists\n✓ FDA: Audit trail generated"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'automated-remediation',
      position: { x: 650, y: 650 },
      data: { label: '⚡ Automated Remediation\n"Violation detected:\n• Block non-compliant action\n• Generate incident report\n• Notify compliance team"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'continuous-monitoring',
      position: { x: 650, y: 800 },
      data: { label: '📊 Continuous Compliance Monitoring\n"24/7 regulatory oversight\nAutomated audit reporting\nProactive compliance assurance"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key automation principle
    {
      id: 'automation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Compliance Automation Principle\n"Regulations are code, not guidelines\nAutomation ensures consistency\nReal-time enforcement prevents violations"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Healthcare system faces compliance challenge
    {
      id: 'e1',
      source: 'healthcare-ai-system',
      target: 'compliance-challenge',
      ...edgeStyle,
      label: 'must comply with multiple regulations'
    },

    // Split into manual vs automated compliance
    {
      id: 'e2',
      source: 'compliance-challenge',
      target: 'manual-compliance',
      ...edgeStyle,
      label: 'manual approach'
    },
    {
      id: 'e3',
      source: 'compliance-challenge',
      target: 'automated-compliance',
      ...edgeStyle,
      label: 'automated approach'
    },

    // Left path: Manual compliance failures
    {
      id: 'e4',
      source: 'manual-compliance',
      target: 'human-errors',
      ...edgeStyle,
      label: 'prone to mistakes',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'human-errors',
      target: 'regulatory-violations',
      ...edgeStyle,
      label: 'leads to violations',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Automated compliance flow
    {
      id: 'e6',
      source: 'automated-compliance',
      target: 'policy-enforcement',
      ...edgeStyle,
      label: 'enforces policies'
    },
    {
      id: 'e7',
      source: 'policy-enforcement',
      target: 'automated-remediation',
      ...edgeStyle,
      label: 'detects violations'
    },
    {
      id: 'e8',
      source: 'automated-remediation',
      target: 'continuous-monitoring',
      ...edgeStyle,
      label: 'enables monitoring'
    },

    // Converge to automation principle
    {
      id: 'e9',
      source: 'regulatory-violations',
      target: 'automation-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'continuous-monitoring',
      target: 'automation-principle',
      ...edgeStyle,
      label: 'enables compliance',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multi-Regulation Healthcare AI System",
      description: "Healthcare AI assistant processing sensitive medical records must simultaneously comply with HIPAA (US health privacy), GDPR (EU data protection), and FDA (medical device) regulations.",
      activeNodes: ['healthcare-ai-system'],
      activeEdges: []
    },
    {
      title: "Complex Compliance Challenge",
      description: "System faces overlapping and sometimes conflicting regulatory requirements that must be enforced consistently across all AI operations and data processing activities.",
      activeNodes: ['compliance-challenge'],
      activeEdges: ['e1']
    },
    {
      title: "Two Compliance Approaches: Manual vs Automated",
      description: "Regulatory compliance handled through manual human review process (left) vs automated compliance system (right) with real-time policy enforcement.",
      activeNodes: ['manual-compliance', 'automated-compliance'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Manual Process: Human Errors and Violations",
      description: "Human reviewers miss privacy violations, apply policies inconsistently, respond slowly to breaches, leading to significant regulatory fines and penalties.",
      activeNodes: ['human-errors', 'regulatory-violations'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Automated Enforcement: Real-Time Policy Checking",
      description: "Automated system checks every AI diagnosis request against HIPAA minimum necessary, GDPR consent validity, and FDA audit requirements in real-time.",
      activeNodes: ['policy-enforcement'],
      activeEdges: ['e6']
    },
    {
      title: "Continuous Compliance and Core Principle",
      description: "System provides automated remediation, continuous monitoring, and proactive compliance assurance, demonstrating that regulations should be treated as executable code, not guidelines.",
      activeNodes: ['automated-remediation', 'continuous-monitoring', 'automation-principle'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    }
  ]
};