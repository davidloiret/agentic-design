import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hierarchicalCoordinationPattern: PatternScenario = {
  id: 'hierarchical-coordination',
  title: 'Hierarchical Coordination',
  initialNodes: [
    {
      id: 'strategic-goal',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Strategic Goal\n"Launch global product with regional customization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Level 1: CEO Agent
    {
      id: 'ceo-agent',
      position: { x: 400, y: 150 },
      data: { label: '👔 CEO Agent\nStrategic decisions\nAuthority: Full\nApproval limit: Unlimited' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 220 },
    },
    // Level 2: Department Heads
    {
      id: 'cto-agent',
      position: { x: 150, y: 280 },
      data: { label: '💻 CTO Agent\nTechnology strategy\nAuthority: Technical\nApproval limit: $5M' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'cmo-agent',
      position: { x: 400, y: 280 },
      data: { label: '📢 CMO Agent\nMarketing strategy\nAuthority: Marketing\nApproval limit: $3M' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'coo-agent',
      position: { x: 650, y: 280 },
      data: { label: '⚙️ COO Agent\nOperations strategy\nAuthority: Operations\nApproval limit: $4M' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Level 3: Team Leads
    {
      id: 'dev-lead',
      position: { x: 50, y: 420 },
      data: { label: '👨‍💻 Dev Lead\nSoftware development\nAuthority: Dev team\nApproval: $500K' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'infra-lead',
      position: { x: 200, y: 420 },
      data: { label: '🔧 Infra Lead\nInfrastructure\nAuthority: DevOps\nApproval: $300K' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'product-lead',
      position: { x: 350, y: 420 },
      data: { label: '📦 Product Lead\nProduct management\nAuthority: Features\nApproval: $200K' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'regional-lead',
      position: { x: 500, y: 420 },
      data: { label: '🌍 Regional Lead\nLocal markets\nAuthority: Region\nApproval: $400K' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'supply-lead',
      position: { x: 650, y: 420 },
      data: { label: '📦 Supply Lead\nSupply chain\nAuthority: Logistics\nApproval: $250K' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    // Level 4: Worker Agents
    {
      id: 'frontend-dev',
      position: { x: 20, y: 560 },
      data: { label: '🎨 Frontend Dev\nUI implementation' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'backend-dev',
      position: { x: 140, y: 560 },
      data: { label: '⚡ Backend Dev\nAPI development' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'qa-engineer',
      position: { x: 260, y: 560 },
      data: { label: '🧪 QA Engineer\nTesting' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'market-analyst',
      position: { x: 380, y: 560 },
      data: { label: '📊 Market Analyst\nData analysis' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'logistics-coord',
      position: { x: 500, y: 560 },
      data: { label: '🚚 Logistics Coord\nShipping' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'vendor-manager',
      position: { x: 620, y: 560 },
      data: { label: '🤝 Vendor Manager\nSuppliers' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    // Authority Flow
    {
      id: 'delegation-engine',
      position: { x: 100, y: 700 },
      data: { label: '📋 Delegation Engine\nTask assignment by level' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    {
      id: 'approval-chain',
      position: { x: 320, y: 700 },
      data: { label: '✅ Approval Chain\nEscalation thresholds' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    {
      id: 'reporting-system',
      position: { x: 540, y: 700 },
      data: { label: '📊 Reporting System\nUpward communication' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    // Control Mechanisms
    {
      id: 'policy-enforcer',
      position: { x: 100, y: 820 },
      data: { label: '📜 Policy Enforcer\nOrganizational rules' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'performance-tracker',
      position: { x: 280, y: 820 },
      data: { label: '📈 Performance Tracker\nKPIs by level' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'resource-allocator',
      position: { x: 460, y: 820 },
      data: { label: '💰 Resource Allocator\nBudget distribution' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'escalation-handler',
      position: { x: 640, y: 820 },
      data: { label: '⬆️ Escalation Handler\nIssue elevation' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Coordination Features
    {
      id: 'cross-functional',
      position: { x: 150, y: 940 },
      data: { label: '🤝 Cross-Functional\nLateral coordination' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'status-aggregator',
      position: { x: 350, y: 940 },
      data: { label: '📊 Status Aggregator\nConsolidated reporting' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'decision-cascade',
      position: { x: 550, y: 940 },
      data: { label: '🌊 Decision Cascade\nTop-down execution' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'final-execution',
      position: { x: 400, y: 1060 },
      data: { label: '✨ Coordinated Execution\nGlobal launch with regional customization achieved' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Strategic to CEO
    {
      id: 'goal-ceo',
      source: 'strategic-goal',
      target: 'ceo-agent',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // CEO to Department Heads
    {
      id: 'ceo-cto',
      source: 'ceo-agent',
      target: 'cto-agent',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 3 },
      label: 'Delegate',
    },
    {
      id: 'ceo-cmo',
      source: 'ceo-agent',
      target: 'cmo-agent',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 3 },
      label: 'Delegate',
    },
    {
      id: 'ceo-coo',
      source: 'ceo-agent',
      target: 'coo-agent',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 3 },
      label: 'Delegate',
    },
    // CTO to Team Leads
    {
      id: 'cto-dev',
      source: 'cto-agent',
      target: 'dev-lead',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assign',
    },
    {
      id: 'cto-infra',
      source: 'cto-agent',
      target: 'infra-lead',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assign',
    },
    // CMO to Team Leads
    {
      id: 'cmo-product',
      source: 'cmo-agent',
      target: 'product-lead',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assign',
    },
    {
      id: 'cmo-regional',
      source: 'cmo-agent',
      target: 'regional-lead',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assign',
    },
    // COO to Team Lead
    {
      id: 'coo-supply',
      source: 'coo-agent',
      target: 'supply-lead',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assign',
    },
    // Team Leads to Workers
    {
      id: 'dev-frontend',
      source: 'dev-lead',
      target: 'frontend-dev',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    {
      id: 'dev-backend',
      source: 'dev-lead',
      target: 'backend-dev',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    {
      id: 'infra-qa',
      source: 'infra-lead',
      target: 'qa-engineer',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    {
      id: 'product-analyst',
      source: 'product-lead',
      target: 'market-analyst',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    {
      id: 'supply-logistics',
      source: 'supply-lead',
      target: 'logistics-coord',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    {
      id: 'supply-vendor',
      source: 'supply-lead',
      target: 'vendor-manager',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Task',
    },
    // Reporting upward (dashed)
    {
      id: 'frontend-dev-report',
      source: 'frontend-dev',
      target: 'dev-lead',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '5 5' },
      label: 'Report',
    },
    {
      id: 'dev-cto-report',
      source: 'dev-lead',
      target: 'cto-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '5 5' },
      label: 'Report',
    },
    {
      id: 'cto-ceo-report',
      source: 'cto-agent',
      target: 'ceo-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '5 5' },
      label: 'Report',
    },
    {
      id: 'cmo-ceo-report',
      source: 'cmo-agent',
      target: 'ceo-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '5 5' },
      label: 'Report',
    },
    {
      id: 'coo-ceo-report',
      source: 'coo-agent',
      target: 'ceo-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '5 5' },
      label: 'Report',
    },
    // Authority flow
    {
      id: 'ceo-delegation',
      source: 'ceo-agent',
      target: 'delegation-engine',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'delegation-approval',
      source: 'delegation-engine',
      target: 'approval-chain',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'approval-reporting',
      source: 'approval-chain',
      target: 'reporting-system',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    // Control mechanisms
    {
      id: 'delegation-policy',
      source: 'delegation-engine',
      target: 'policy-enforcer',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'reporting-performance',
      source: 'reporting-system',
      target: 'performance-tracker',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'approval-resource',
      source: 'approval-chain',
      target: 'resource-allocator',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'reporting-escalation',
      source: 'reporting-system',
      target: 'escalation-handler',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Escalation paths
    {
      id: 'escalation-cto',
      source: 'escalation-handler',
      target: 'cto-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Escalate',
    },
    {
      id: 'escalation-ceo',
      source: 'escalation-handler',
      target: 'ceo-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Critical',
    },
    // Cross-functional coordination
    {
      id: 'cto-cmo-coord',
      source: 'cto-agent',
      target: 'cmo-agent',
      style: { ...edgeStyle, stroke: '#94a3b8', strokeDasharray: '3 3' },
      label: 'Coord',
    },
    {
      id: 'cmo-coo-coord',
      source: 'cmo-agent',
      target: 'coo-agent',
      style: { ...edgeStyle, stroke: '#94a3b8', strokeDasharray: '3 3' },
      label: 'Coord',
    },
    {
      id: 'dev-product-coord',
      source: 'dev-lead',
      target: 'product-lead',
      style: { ...edgeStyle, stroke: '#94a3b8', strokeDasharray: '3 3' },
      label: 'Sync',
    },
    // Coordination features
    {
      id: 'policy-cross',
      source: 'policy-enforcer',
      target: 'cross-functional',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'performance-status',
      source: 'performance-tracker',
      target: 'status-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'resource-cascade',
      source: 'resource-allocator',
      target: 'decision-cascade',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Final execution
    {
      id: 'cross-execution',
      source: 'cross-functional',
      target: 'final-execution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'status-execution',
      source: 'status-aggregator',
      target: 'final-execution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'cascade-execution',
      source: 'decision-cascade',
      target: 'final-execution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'Strategic Goal Input',
      description: 'CEO receives strategic objective',
      activeNodes: ['strategic-goal', 'ceo-agent'],
      activeEdges: ['goal-ceo'],
    },
    {
      title: 'Level 1→2 Delegation',
      description: 'CEO delegates to department heads with authority limits',
      activeNodes: ['ceo-agent', 'cto-agent', 'cmo-agent', 'coo-agent'],
      activeEdges: ['ceo-cto', 'ceo-cmo', 'ceo-coo'],
    },
    {
      title: 'Level 2→3 Assignment',
      description: 'Department heads assign to team leads',
      activeNodes: ['cto-agent', 'cmo-agent', 'coo-agent', 'dev-lead', 'infra-lead', 'product-lead', 'regional-lead', 'supply-lead'],
      activeEdges: ['cto-dev', 'cto-infra', 'cmo-product', 'cmo-regional', 'coo-supply'],
    },
    {
      title: 'Level 3→4 Task Distribution',
      description: 'Team leads distribute tasks to workers',
      activeNodes: ['dev-lead', 'infra-lead', 'supply-lead', 'frontend-dev', 'backend-dev', 'qa-engineer', 'logistics-coord', 'vendor-manager'],
      activeEdges: ['dev-frontend', 'dev-backend', 'infra-qa', 'supply-logistics', 'supply-vendor'],
    },
    {
      title: 'Upward Reporting',
      description: 'Progress reports flow up the hierarchy',
      activeNodes: ['frontend-dev', 'dev-lead', 'cto-agent', 'ceo-agent'],
      activeEdges: ['frontend-dev-report', 'dev-cto-report', 'cto-ceo-report', 'cmo-ceo-report', 'coo-ceo-report'],
    },
    {
      title: 'Authority Flow',
      description: 'Delegation engine manages approval chains',
      activeNodes: ['delegation-engine', 'approval-chain', 'reporting-system'],
      activeEdges: ['ceo-delegation', 'delegation-approval', 'approval-reporting'],
    },
    {
      title: 'Control Mechanisms',
      description: 'Enforce policies and track performance',
      activeNodes: ['policy-enforcer', 'performance-tracker', 'resource-allocator', 'escalation-handler'],
      activeEdges: ['delegation-policy', 'reporting-performance', 'approval-resource', 'reporting-escalation'],
    },
    {
      title: 'Cross-Functional Coordination',
      description: 'Lateral coordination between departments',
      activeNodes: ['cto-agent', 'cmo-agent', 'coo-agent', 'dev-lead', 'product-lead'],
      activeEdges: ['cto-cmo-coord', 'cmo-coo-coord', 'dev-product-coord'],
    },
    {
      title: 'Issue Escalation',
      description: 'Critical issues escalate up hierarchy',
      activeNodes: ['escalation-handler', 'cto-agent', 'ceo-agent'],
      activeEdges: ['escalation-cto', 'escalation-ceo'],
    },
    {
      title: 'Decision Cascade',
      description: 'Strategic decisions cascade down levels',
      activeNodes: ['cross-functional', 'status-aggregator', 'decision-cascade'],
      activeEdges: ['policy-cross', 'performance-status', 'resource-cascade'],
    },
    {
      title: 'Coordinated Execution',
      description: 'Hierarchical structure delivers strategic goal',
      activeNodes: ['final-execution', 'cross-functional', 'status-aggregator', 'decision-cascade'],
      activeEdges: ['cross-execution', 'status-execution', 'cascade-execution'],
    },
  ],
};