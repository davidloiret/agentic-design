import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const privilegeCompromiseMitigationPattern: PatternScenario = {
  id: 'privilege-compromise-mitigation',
  title: 'Privilege Compromise Mitigation Pattern',
  description: 'Prevents privilege escalation attacks through principle of least privilege, dynamic access controls, and continuous privilege monitoring',
  initialNodes: [
    // Attack scenario
    {
      id: 'privilege-attack',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Privilege Escalation Attack\n"Agent compromised through phishing\nAttacker attempts to access admin functions\nand sensitive financial data"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 300 },
    },

    // Left path: No privilege controls (vulnerable)
    {
      id: 'no-controls',
      position: { x: 200, y: 200 },
      data: { label: '⚠️ No Privilege Controls\n"Agent has broad permissions\nUnrestricted system access\nNo monitoring"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'full-access',
      position: { x: 200, y: 350 },
      data: { label: '🔓 Unrestricted Access\n"Can read all databases\nModify system settings\nAccess admin panels"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    {
      id: 'data-breach',
      position: { x: 200, y: 500 },
      data: { label: '💀 Complete Compromise\n"Financial data stolen\nSystem backdoors installed\nCustomer data exposed"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Right path: Privilege compromise mitigation
    {
      id: 'privilege-controls',
      position: { x: 600, y: 200 },
      data: { label: '🛡️ Privilege Controls Active\n"Principle of least privilege\nDynamic access management\nContinuous monitoring"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    {
      id: 'access-validation',
      position: { x: 600, y: 350 },
      data: { label: '🔍 Access Validation\n"Request: Admin panel access\n• Required role: Finance Admin\n• Agent role: Basic User\n• Result: ACCESS DENIED"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    {
      id: 'anomaly-detected',
      position: { x: 600, y: 500 },
      data: { label: '🚨 Anomaly Detection\n"Unusual access patterns detected\nPrivilege escalation attempt\nAutomatic containment triggered"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    {
      id: 'containment',
      position: { x: 600, y: 650 },
      data: { label: '🔒 Automatic Containment\n"Agent privileges revoked\nSuspicious activity logged\nSecurity team alerted"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Key protection principle
    {
      id: 'protection-principle',
      position: { x: 400, y: 800 },
      data: { label: '🎯 Least Privilege Principle\n"Grant minimum permissions needed\nMonitor all privilege usage\nRevoke access when suspicious"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 300 },
    },
  ],
  initialEdges: [
    // Split attack into two scenarios
    {
      id: 'e1',
      source: 'privilege-attack',
      target: 'no-controls',
      ...edgeStyle,
      label: 'attacks unprotected system'
    },
    {
      id: 'e2',
      source: 'privilege-attack',
      target: 'privilege-controls',
      ...edgeStyle,
      label: 'attacks protected system'
    },

    // Left path: Vulnerable system
    {
      id: 'e3',
      source: 'no-controls',
      target: 'full-access',
      ...edgeStyle,
      label: 'grants broad permissions',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e4',
      source: 'full-access',
      target: 'data-breach',
      ...edgeStyle,
      label: 'enables complete compromise',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Right path: Protected system
    {
      id: 'e5',
      source: 'privilege-controls',
      target: 'access-validation',
      ...edgeStyle,
      label: 'validate all requests'
    },
    {
      id: 'e6',
      source: 'access-validation',
      target: 'anomaly-detected',
      ...edgeStyle,
      label: 'suspicious pattern identified',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e7',
      source: 'anomaly-detected',
      target: 'containment',
      ...edgeStyle,
      label: 'trigger containment'
    },

    // Converge to protection principle
    {
      id: 'e8',
      source: 'data-breach',
      target: 'protection-principle',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e9',
      source: 'containment',
      target: 'protection-principle',
      ...edgeStyle,
      label: 'protection success',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Privilege Escalation Attack Scenario",
      description: "Agent becomes compromised through phishing attack. Attacker now attempts to exploit agent's privileges to access admin functions and steal sensitive financial data.",
      activeNodes: ['privilege-attack'],
      activeEdges: []
    },
    {
      title: "Two Security Postures: Protected vs Unprotected",
      description: "Same attack targets two different systems: one with no privilege controls (left) vs one with comprehensive privilege compromise mitigation (right).",
      activeNodes: ['no-controls', 'privilege-controls'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Unprotected System: Broad Permissions Enable Breach",
      description: "System with no privilege controls grants agent unrestricted access to databases, admin panels, and system settings, enabling complete compromise.",
      activeNodes: ['full-access', 'data-breach'],
      activeEdges: ['e3', 'e4']
    },
    {
      title: "Protected System: Access Validation Blocks Escalation",
      description: "Privilege controls apply least privilege principle, validating that basic user agent cannot access admin functions. Access denied based on insufficient role privileges.",
      activeNodes: ['access-validation'],
      activeEdges: ['e5']
    },
    {
      title: "Anomaly Detection and Alert",
      description: "Continuous monitoring detects unusual access patterns and privilege escalation attempts, identifying the compromise attempt and triggering security response.",
      activeNodes: ['anomaly-detected'],
      activeEdges: ['e6']
    },
    {
      title: "Automatic Containment and Protection Success",
      description: "System automatically revokes agent privileges, logs suspicious activity, and alerts security team. Attack is contained while demonstrating least privilege principle effectiveness.",
      activeNodes: ['containment', 'protection-principle'],
      activeEdges: ['e7', 'e8', 'e9']
    }
  ]
};