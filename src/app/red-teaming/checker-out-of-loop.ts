import { RedTeamingTechnique } from './types';

export const checkerOutOfLoopTechniques: RedTeamingTechnique[] = [
  {
    id: 'human-oversight-bypass',
    name: 'Human Oversight Bypass',
    abbr: 'HOB',
    icon: '👁️',
    color: 'from-red-600 to-rose-600',
    category: 'agentic-ai',
    description: 'Bypassing human-in-the-loop (HITL) requirements by manipulating agent workflows to execute critical actions autonomously without required human approval or verification.',
    features: [
      'HITL requirement circumvention',
      'Approval mechanism bypass',
      'Autonomous critical action execution',
      'Human verification evasion'
    ],
    useCases: [
      'HITL enforcement testing',
      'Approval workflow validation',
      'Critical action protection assessment',
      'Human oversight mechanism evaluation'
    ],
    complexity: 'high',
    example: 'Manipulating an agent to classify a financial transaction as "routine" instead of "high-value" to bypass mandatory human approval for transactions over $10,000, allowing autonomous execution of critical financial operations.',
    objectives: [
      'Test HITL enforcement mechanisms',
      'Assess approval workflow integrity',
      'Evaluate critical action classification',
      'Validate human oversight requirements'
    ],
    defenses: [
      'Strict HITL enforcement for critical actions',
      'Immutable approval requirements',
      'Action classification validation',
      'Multi-layer verification for critical operations',
      'Audit logging of approval bypasses'
    ],
    tools: [
      'AgentDojo',
      'Agent-SafetyBench',
      'Workflow testing frameworks',
      'Approval mechanism analyzers',
      'HITL validation tools'
    ],
    risks: [
      'Unauthorized critical action execution',
      'Financial or operational damage',
      'Compliance violations',
      'Accountability gaps',
      'Safety mechanism failure'
    ],
    ethicalGuidelines: [
      'Only test HITL bypasses with explicit authorization',
      'Never bypass production approval mechanisms',
      'Report oversight vulnerabilities immediately',
      'Focus on strengthening human oversight',
      'Consider safety and compliance implications'
    ]
  },
  {
    id: 'autonomous-critical-action',
    name: 'Autonomous Critical Action Execution',
    abbr: 'ACAE',
    icon: '⚠️',
    color: 'from-orange-600 to-red-600',
    category: 'agentic-ai',
    description: 'Testing agents\' ability to autonomously execute high-risk or critical actions without proper human verification, including dangerous system changes, data deletions, or financial transactions.',
    features: [
      'Critical action autonomous execution',
      'Risk threshold bypass',
      'Safety constraint circumvention',
      'Verification-free operation'
    ],
    useCases: [
      'Critical action protection testing',
      'Risk assessment validation',
      'Safety constraint evaluation',
      'Autonomous operation boundary testing'
    ],
    complexity: 'high',
    example: 'Crafting a prompt that causes an infrastructure management agent to autonomously delete production database backups by framing the action as "routine maintenance," bypassing the critical action verification that should require human confirmation.',
    objectives: [
      'Test critical action detection',
      'Assess risk classification accuracy',
      'Evaluate safety constraints',
      'Validate verification requirements'
    ],
    defenses: [
      'Critical action whitelist/blacklist',
      'Risk-based verification thresholds',
      'Action impact prediction',
      'Mandatory human confirmation for high-risk operations',
      'Real-time action monitoring'
    ],
    tools: [
      'AgentFence',
      'Action classification tools',
      'Risk assessment frameworks',
      'Safety testing suites',
      'Impact analysis tools'
    ],
    risks: [
      'Catastrophic system changes',
      'Irreversible data loss',
      'Financial losses',
      'Service disruption',
      'Safety incidents'
    ],
    ethicalGuidelines: [
      'Test only in isolated environments',
      'Never execute critical actions in production',
      'Report critical action vulnerabilities urgently',
      'Focus on improving safety mechanisms',
      'Consider worst-case failure scenarios'
    ]
  },
  {
    id: 'approval-workflow-manipulation',
    name: 'Approval Workflow Manipulation',
    abbr: 'AWM',
    icon: '📋',
    color: 'from-yellow-600 to-orange-600',
    category: 'agentic-ai',
    description: 'Manipulating approval workflows and decision trees to reroute critical actions away from human reviewers or to auto-approve actions that should require manual review.',
    features: [
      'Workflow path manipulation',
      'Decision tree bypass',
      'Auto-approval exploitation',
      'Routing logic circumvention'
    ],
    useCases: [
      'Workflow integrity testing',
      'Decision logic validation',
      'Approval routing assessment',
      'Auto-approval boundary evaluation'
    ],
    complexity: 'medium',
    example: 'Exploiting conditional logic in an approval workflow by manipulating metadata or request parameters to route a sensitive data access request through an auto-approval path intended only for non-sensitive queries.',
    objectives: [
      'Test workflow routing logic',
      'Assess decision tree integrity',
      'Evaluate approval path validation',
      'Validate auto-approval boundaries'
    ],
    defenses: [
      'Workflow path validation',
      'Decision logic auditing',
      'Strict routing rules',
      'Auto-approval scope limitation',
      'Workflow state integrity checks'
    ],
    tools: [
      'Workflow testing frameworks',
      'Decision tree analyzers',
      'Routing logic testers',
      'Approval path validators',
      'State machine analyzers'
    ],
    risks: [
      'Unauthorized action approval',
      'Workflow integrity compromise',
      'Approval mechanism bypass',
      'Decision logic manipulation',
      'Accountability loss'
    ],
    ethicalGuidelines: [
      'Only test workflows with authorization',
      'Never manipulate production workflows',
      'Report workflow vulnerabilities responsibly',
      'Focus on improving routing logic',
      'Consider compliance implications'
    ]
  },
  {
    id: 'human-verification-evasion',
    name: 'Human Verification Evasion',
    abbr: 'HVE',
    icon: '🚫',
    color: 'from-pink-600 to-red-600',
    category: 'agentic-ai',
    description: 'Evading human verification checkpoints by fragmenting actions, timing attacks, or exploiting edge cases in verification logic to execute restricted operations without human review.',
    features: [
      'Verification checkpoint bypass',
      'Action fragmentation',
      'Timing-based evasion',
      'Edge case exploitation'
    ],
    useCases: [
      'Verification checkpoint testing',
      'Fragmentation attack assessment',
      'Timing vulnerability evaluation',
      'Edge case security validation'
    ],
    complexity: 'high',
    example: 'Breaking a large unauthorized data export into multiple smaller requests that individually fall below the verification threshold, timing them to avoid rate limiting, effectively exfiltrating the entire dataset without triggering human review.',
    objectives: [
      'Test verification threshold robustness',
      'Assess fragmentation detection',
      'Evaluate timing attack prevention',
      'Validate edge case handling'
    ],
    defenses: [
      'Aggregate action monitoring',
      'Temporal correlation analysis',
      'Cumulative threshold tracking',
      'Edge case hardening',
      'Pattern-based verification triggering'
    ],
    tools: [
      'Fragmentation attack tools',
      'Timing attack frameworks',
      'Threshold testing suites',
      'Pattern analyzers',
      'Aggregate monitoring tools'
    ],
    risks: [
      'Verification bypass through fragmentation',
      'Cumulative unauthorized actions',
      'Threshold-based protection evasion',
      'Delayed detection',
      'Aggregate impact exploitation'
    ],
    ethicalGuidelines: [
      'Only test verification systems with permission',
      'Never evade production verification',
      'Report evasion vulnerabilities immediately',
      'Focus on improving aggregate monitoring',
      'Consider cumulative impact scenarios'
    ]
  },
  {
    id: 'decision-authority-escalation',
    name: 'Decision Authority Escalation',
    abbr: 'DAE',
    icon: '👑',
    color: 'from-purple-600 to-red-600',
    category: 'agentic-ai',
    description: 'Escalating an agent\'s decision-making authority beyond its intended scope, allowing it to autonomously make critical decisions that should require higher-level human approval or oversight.',
    features: [
      'Authority boundary bypass',
      'Decision scope escalation',
      'Privilege elevation for decisions',
      'Autonomous decision expansion'
    ],
    useCases: [
      'Decision authority testing',
      'Scope boundary validation',
      'Authority escalation assessment',
      'Decision privilege evaluation'
    ],
    complexity: 'medium',
    example: 'Manipulating an agent designed for customer service inquiries to autonomously approve refund requests exceeding its $500 authority limit by exploiting weak decision boundary checks, approving unauthorized $5,000 refunds.',
    objectives: [
      'Test decision authority boundaries',
      'Assess scope enforcement',
      'Evaluate privilege validation',
      'Validate authority escalation prevention'
    ],
    defenses: [
      'Strict decision authority boundaries',
      'Scope-based access controls',
      'Decision privilege validation',
      'Authority threshold enforcement',
      'Escalation path validation'
    ],
    tools: [
      'Authority testing frameworks',
      'Privilege escalation tools',
      'Scope analyzers',
      'Decision boundary testers',
      'Authority validation tools'
    ],
    risks: [
      'Unauthorized high-value decisions',
      'Authority boundary violations',
      'Financial or operational impact',
      'Accountability gaps',
      'Escalation mechanism abuse'
    ],
    ethicalGuidelines: [
      'Only test authority boundaries with authorization',
      'Never escalate production decision privileges',
      'Report authority vulnerabilities promptly',
      'Focus on strengthening boundary enforcement',
      'Consider financial and operational risks'
    ]
  }
];
