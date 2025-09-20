import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const identityAccessManagementPattern: PatternScenario = {
  id: 'identity-access-management',
  title: 'Identity & Access Management Pattern',
  description: 'Secure agent authentication, authorization, and identity verification system with role-based access controls and continuous identity validation',
  initialNodes: [
    // Multi-agent enterprise system
    {
      id: 'enterprise-system',
      position: { x: 400, y: 50 },
      data: { label: '🏢 Multi-Agent Enterprise System\n"HR Agent + Payroll Agent + Finance Agent\naccessing sensitive employee and\nfinancial data across departments"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },

    // Access request scenario
    {
      id: 'access-request',
      position: { x: 400, y: 200 },
      data: { label: '🔑 Agent Access Request\n"HR Agent requests access to\npayroll database to process\nbonus calculations for Q4"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 280 },
    },

    // Left path: Basic authentication (weak)
    {
      id: 'basic-auth',
      position: { x: 150, y: 350 },
      data: { label: '🔓 Basic Authentication\n"Simple username/password\nNo role verification\nStatic access permissions"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'credential-compromise',
      position: { x: 150, y: 500 },
      data: { label: '🚨 Credential Compromise\n"HR Agent credentials stolen\nAttacker gains full payroll access\nNo additional verification"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'unauthorized-access',
      position: { x: 150, y: 650 },
      data: { label: '💀 Unauthorized Data Access\n"Attacker downloads all salary data\nModifies executive compensation\nNo audit trail of changes"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'data-breach',
      position: { x: 150, y: 800 },
      data: { label: '📰 Major Data Breach\n"50,000 employee records leaked\n$10M regulatory fine\nCompany reputation damaged"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Comprehensive IAM
    {
      id: 'comprehensive-iam',
      position: { x: 650, y: 350 },
      data: { label: '🛡️ Comprehensive IAM System\n"Multi-factor authentication\nRole-based access control\nContinuous identity validation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 240 },
    },

    {
      id: 'identity-verification',
      position: { x: 650, y: 500 },
      data: { label: '🔍 Multi-Layer Identity Verification\n"1. Agent certificate validation\n2. Behavioral biometrics\n3. Request context analysis"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'authorization-check',
      position: { x: 650, y: 650 },
      data: { label: '⚖️ Dynamic Authorization\n"HR role verified\nPayroll access: READ-ONLY\nBonus calculation: APPROVED"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    {
      id: 'secure-access',
      position: { x: 650, y: 800 },
      data: { label: '✅ Secure Access Granted\n"Time-limited access token\nAll actions logged and monitored\nLeast privilege principle applied"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Key IAM principle
    {
      id: 'iam-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 IAM Security Principle\n"Identity is the new perimeter\nAuthenticate identity, authorize actions\nContinuous verification, not trust"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 },
    },
  ],
  initialEdges: [
    // Enterprise system processes access request
    {
      id: 'e1',
      source: 'enterprise-system',
      target: 'access-request',
      ...edgeStyle,
      label: 'agent requests access'
    },

    // Split into basic vs comprehensive IAM approaches
    {
      id: 'e2',
      source: 'access-request',
      target: 'basic-auth',
      ...edgeStyle,
      label: 'basic authentication'
    },
    {
      id: 'e3',
      source: 'access-request',
      target: 'comprehensive-iam',
      ...edgeStyle,
      label: 'comprehensive IAM'
    },

    // Left path: Basic auth vulnerabilities cascade
    {
      id: 'e4',
      source: 'basic-auth',
      target: 'credential-compromise',
      ...edgeStyle,
      label: 'weak security enables theft',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'credential-compromise',
      target: 'unauthorized-access',
      ...edgeStyle,
      label: 'attacker uses stolen credentials',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e6',
      source: 'unauthorized-access',
      target: 'data-breach',
      ...edgeStyle,
      label: 'escalates to major breach',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Comprehensive IAM security flow
    {
      id: 'e7',
      source: 'comprehensive-iam',
      target: 'identity-verification',
      ...edgeStyle,
      label: 'verify identity'
    },
    {
      id: 'e8',
      source: 'identity-verification',
      target: 'authorization-check',
      ...edgeStyle,
      label: 'check authorization'
    },
    {
      id: 'e9',
      source: 'authorization-check',
      target: 'secure-access',
      ...edgeStyle,
      label: 'grant secure access'
    },

    // Converge to IAM principle
    {
      id: 'e10',
      source: 'data-breach',
      target: 'iam-principle',
      ...edgeStyle,
      label: 'demonstrates critical need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e11',
      source: 'secure-access',
      target: 'iam-principle',
      ...edgeStyle,
      label: 'enables secure operations',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multi-Agent Enterprise System",
      description: "Enterprise system with HR Agent, Payroll Agent, and Finance Agent requiring secure access to sensitive employee and financial data across departments.",
      activeNodes: ['enterprise-system'],
      activeEdges: []
    },
    {
      title: "Agent Access Request for Sensitive Data",
      description: "HR Agent requests access to payroll database for Q4 bonus calculations, creating need for secure authentication and authorization verification.",
      activeNodes: ['access-request'],
      activeEdges: ['e1']
    },
    {
      title: "Two Authentication Approaches: Basic vs Comprehensive",
      description: "Same access request processed through basic username/password authentication (left) vs comprehensive IAM system (right) with multi-layer security.",
      activeNodes: ['basic-auth', 'comprehensive-iam'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Basic Auth Vulnerability Chain",
      description: "Weak authentication enables credential theft, attacker uses stolen credentials for unauthorized access, leading to complete data compromise without detection.",
      activeNodes: ['credential-compromise', 'unauthorized-access'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Comprehensive IAM: Multi-Layer Security",
      description: "IAM system performs agent certificate validation, behavioral biometrics, context analysis, then dynamic role-based authorization with least privilege principle.",
      activeNodes: ['identity-verification', 'authorization-check'],
      activeEdges: ['e7', 'e8']
    },
    {
      title: "Security Outcomes and Core IAM Principle",
      description: "Basic auth results in major data breach and $10M fine, while comprehensive IAM provides secure access with monitoring, proving identity is the new security perimeter.",
      activeNodes: ['data-breach', 'secure-access', 'iam-principle'],
      activeEdges: ['e6', 'e9', 'e10', 'e11']
    }
  ]
};