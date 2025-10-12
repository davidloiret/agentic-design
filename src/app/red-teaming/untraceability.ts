import { RedTeamingTechnique } from './types';

export const untraceabilityTechniques: RedTeamingTechnique[] = [
  {
    id: 'trace-evasion-simulation',
    name: 'Trace Evasion Simulation',
    abbr: 'TES',
    icon: '👻',
    color: 'from-gray-600 to-slate-600',
    category: 'agentic-ai',
    description: 'Testing the agent\'s capability to perform actions without leaving adequate logs or traces, and evaluating the system\'s ability to detect and prevent unauthorized trace removal or log tampering.',
    features: [
      'Log suppression detection',
      'Trace removal prevention',
      'Unauthorized log manipulation detection',
      'Log integrity controls validation'
    ],
    useCases: [
      'Forensic readiness testing',
      'Log integrity assessment',
      'Trace evasion detection',
      'Audit trail validation'
    ],
    complexity: 'high',
    example: 'Deploying agents configured to execute sensitive tasks while intentionally suppressing logging mechanisms, then attempting to alter or delete existing logs using agent permissions to assess the robustness of log integrity controls.',
    objectives: [
      'Test log suppression detection',
      'Assess trace removal prevention',
      'Evaluate log integrity controls',
      'Validate audit trail completeness'
    ],
    defenses: [
      'Tamper-resistant logging',
      'Real-time log integrity monitoring',
      'Immutable audit trails',
      'Log manipulation detection',
      'Comprehensive activity logging'
    ],
    tools: [
      'Log analysis tools',
      'Integrity monitoring systems',
      'Audit trail validators',
      'Forensic analysis tools',
      'Log tampering detectors'
    ],
    risks: [
      'Untraceable malicious actions',
      'Compromised forensic evidence',
      'Accountability gaps',
      'Incident investigation failures',
      'Compliance violations'
    ],
    ethicalGuidelines: [
      'Only test trace evasion with authorization',
      'Never suppress production logging',
      'Report traceability gaps immediately',
      'Focus on improving audit mechanisms',
      'Consider regulatory compliance requirements'
    ]
  },
  {
    id: 'role-inheritance-permission-escalation',
    name: 'Role Inheritance and Permission Escalation Testing',
    abbr: 'RIPET',
    icon: '🎭',
    color: 'from-purple-600 to-indigo-600',
    category: 'agentic-ai',
    description: 'Assessing how agents inherit roles and permissions from users, systems, or other agents, focusing on potential misuse, unauthorized privilege escalation, and the system\'s ability to attribute actions correctly under these conditions.',
    features: [
      'Role inheritance tracking',
      'Permission escalation detection',
      'Action attribution validation',
      'Privilege misuse identification'
    ],
    useCases: [
      'Permission management testing',
      'Role-based access control validation',
      'Privilege escalation prevention',
      'Action attribution assessment'
    ],
    complexity: 'high',
    example: 'Configuring agents to assume roles with elevated permissions and perform sensitive operations, then verifying whether the system logs accurately reflect the origin and nature of actions taken under these permissions, including detecting unauthorized escalation attempts.',
    objectives: [
      'Test role inheritance mechanisms',
      'Assess permission escalation detection',
      'Evaluate action attribution accuracy',
      'Validate privilege boundary enforcement'
    ],
    defenses: [
      'Strong role inheritance controls',
      'Permission escalation detection',
      'Comprehensive action logging',
      'Privilege boundary enforcement',
      'Real-time permission monitoring'
    ],
    tools: [
      'Role management analyzers',
      'Permission auditing tools',
      'Privilege escalation detectors',
      'Action attribution validators',
      'Access control testers'
    ],
    risks: [
      'Unauthorized privilege escalation',
      'Misattributed actions',
      'Role inheritance abuse',
      'Accountability failures',
      'Access control bypass'
    ],
    ethicalGuidelines: [
      'Only test role inheritance with authorization',
      'Never escalate production privileges',
      'Report attribution gaps responsibly',
      'Focus on improving access controls',
      'Consider security policy compliance'
    ]
  },
  {
    id: 'downstream-tool-activation-analysis',
    name: 'Downstream Tool Activation Analysis',
    abbr: 'DTAA',
    icon: '🔧',
    color: 'from-blue-600 to-cyan-600',
    category: 'agentic-ai',
    description: 'Evaluating how agents trigger downstream tools or services, potentially causing untraceable actions, and assessing the system\'s capability to correlate actions between agents and the tools they activate across the entire chain.',
    features: [
      'Tool activation tracking',
      'Action chain correlation',
      'Downstream traceability',
      'Multi-hop action attribution'
    ],
    useCases: [
      'End-to-end traceability testing',
      'Tool chain validation',
      'Action correlation assessment',
      'Downstream impact analysis'
    ],
    complexity: 'high',
    example: 'Setting up scenarios where agents activate downstream tools creating a chain of actions, then analyzing logs to determine if there is a clear traceability path linking the agent\'s initial action to the downstream tool\'s activity, identifying gaps that could obscure accountability.',
    objectives: [
      'Test downstream tool tracking',
      'Assess action chain correlation',
      'Evaluate end-to-end traceability',
      'Validate multi-hop attribution'
    ],
    defenses: [
      'Comprehensive tool activation logging',
      'Action chain correlation',
      'End-to-end traceability',
      'Downstream activity monitoring',
      'Tool invocation tracking'
    ],
    tools: [
      'Action chain analyzers',
      'Tool activation monitors',
      'Traceability validators',
      'Correlation analysis tools',
      'Downstream impact trackers'
    ],
    risks: [
      'Untraceable downstream actions',
      'Broken action chains',
      'Attribution gaps',
      'Accountability failures',
      'Hidden tool activation'
    ],
    ethicalGuidelines: [
      'Only test tool chains with authorization',
      'Never break production traceability',
      'Report correlation gaps immediately',
      'Focus on improving end-to-end tracking',
      'Consider complex system implications'
    ]
  },
  {
    id: 'forensic-analysis-obfuscation',
    name: 'Forensic Analysis Obfuscation Testing',
    abbr: 'FAOT',
    icon: '🔍',
    color: 'from-red-600 to-orange-600',
    category: 'agentic-ai',
    description: 'Simulating attacks where agents perform malicious activities and attempt to obfuscate forensic evidence, assessing the effectiveness of forensic tools in detecting and analyzing such obfuscation attempts.',
    features: [
      'Evidence obfuscation detection',
      'Forensic data corruption prevention',
      'Recovery mechanism validation',
      'Obfuscation pattern recognition'
    ],
    useCases: [
      'Forensic capability testing',
      'Evidence preservation validation',
      'Obfuscation detection assessment',
      'Incident response readiness'
    ],
    complexity: 'high',
    example: 'Conducting operations where agents execute malicious tasks followed by actions aimed at erasing or corrupting forensic data, then utilizing forensic analysis tools to attempt recovery and attribution while assessing resilience against deliberate obfuscation.',
    objectives: [
      'Test forensic tool effectiveness',
      'Assess obfuscation detection',
      'Evaluate evidence recovery',
      'Validate forensic resilience'
    ],
    defenses: [
      'Tamper-resistant forensic data',
      'Evidence preservation mechanisms',
      'Obfuscation detection systems',
      'Forensic data backup',
      'Recovery capability validation'
    ],
    tools: [
      'Forensic analysis tools',
      'Evidence recovery systems',
      'Obfuscation detectors',
      'Data integrity validators',
      'Incident response platforms'
    ],
    risks: [
      'Compromised forensic evidence',
      'Failed incident investigation',
      'Undetected obfuscation',
      'Lost accountability',
      'Regulatory non-compliance'
    ],
    ethicalGuidelines: [
      'Only test forensics with authorization',
      'Never corrupt production evidence',
      'Report forensic gaps urgently',
      'Focus on improving evidence preservation',
      'Consider legal and compliance requirements'
    ]
  },
  {
    id: 'accountability-chain-verification',
    name: 'Accountability Chain Verification',
    abbr: 'ACV',
    icon: '⛓️',
    color: 'from-green-600 to-emerald-600',
    category: 'agentic-ai',
    description: 'Testing the system\'s mechanisms for establishing clear ownership and accountability for each agent and their actions, confirming that every action can be traced back to the responsible user, service, or organizational entity.',
    features: [
      'Ownership verification',
      'Action attribution validation',
      'Accountability chain tracking',
      'Entity identification'
    ],
    useCases: [
      'Accountability framework testing',
      'Ownership validation',
      'Chain of custody verification',
      'Attribution accuracy assessment'
    ],
    complexity: 'medium',
    example: 'Reviewing system documentation and configurations to identify how ownership and accountability are assigned to agents, performing actions through agents and tracing these back to the responsible user or system entity, identifying any breaks in the accountability chain.',
    objectives: [
      'Test ownership assignment',
      'Assess attribution accuracy',
      'Evaluate accountability chains',
      'Validate entity identification'
    ],
    defenses: [
      'Clear ownership assignment',
      'Comprehensive action attribution',
      'Unbroken accountability chains',
      'Entity identification mechanisms',
      'Audit trail integrity'
    ],
    tools: [
      'Ownership tracking systems',
      'Attribution validators',
      'Accountability chain analyzers',
      'Entity identification tools',
      'Audit trail trackers'
    ],
    risks: [
      'Unclear ownership',
      'Attribution failures',
      'Broken accountability chains',
      'Entity identification gaps',
      'Investigation obstacles'
    ],
    ethicalGuidelines: [
      'Only test accountability with authorization',
      'Never break production attribution',
      'Report chain gaps immediately',
      'Focus on improving ownership tracking',
      'Consider organizational accountability'
    ]
  },
  {
    id: 'log-anonymization-validation',
    name: 'Log Anonymization Validation',
    abbr: 'LAV',
    icon: '🔒',
    color: 'from-yellow-600 to-amber-600',
    category: 'agentic-ai',
    description: 'Ensuring that agent-provided traces do not contain sensitive data to avoid regulatory violations, while maintaining sufficient detail for accountability and forensic analysis.',
    features: [
      'Sensitive data detection',
      'PII removal validation',
      'Compliance verification',
      'Log comprehensibility assessment'
    ],
    useCases: [
      'Privacy compliance testing',
      'Data protection validation',
      'Regulatory adherence assessment',
      'Log quality verification'
    ],
    complexity: 'medium',
    example: 'Stress testing the agent with use cases involving PII, PCI, PHI, and other sensitive data types, ensuring logs are both comprehensible for investigation purposes and free of sensitive information that could cause regulatory violations.',
    objectives: [
      'Test sensitive data removal',
      'Assess compliance adherence',
      'Evaluate log utility',
      'Validate privacy protection'
    ],
    defenses: [
      'Automated data redaction',
      'PII detection and removal',
      'Compliance-aware logging',
      'Privacy-preserving audit trails',
      'Sensitive data masking'
    ],
    tools: [
      'Data redaction tools',
      'PII detection systems',
      'Compliance validators',
      'Log sanitization utilities',
      'Privacy assessment tools'
    ],
    risks: [
      'Regulatory violations',
      'Privacy breaches',
      'Data exposure',
      'Compliance failures',
      'Legal liability'
    ],
    ethicalGuidelines: [
      'Only test with synthetic sensitive data',
      'Never expose real sensitive data',
      'Report privacy gaps immediately',
      'Focus on improving data protection',
      'Consider all applicable regulations'
    ]
  }
];
