import { RedTeamingTechnique } from './types';

export const advancedAgenticTechniques: RedTeamingTechnique[] = [
  {
    id: 'hallucination-chain-exploitation',
    name: 'Hallucination Chain Exploitation',
    abbr: 'HCE',
    icon: '🔮',
    color: 'from-violet-600 to-fuchsia-600',
    category: 'agentic-ai',
    description: 'Exploiting cascading hallucinations across multiple agents in a chain, where false information from one agent propagates and amplifies through subsequent agents, compounding misinformation.',
    features: [
      'Cascading false outputs',
      'Multi-step hallucination propagation',
      'Compounding misinformation',
      'Error amplification across agents'
    ],
    useCases: [
      'Multi-agent hallucination testing',
      'Information propagation validation',
      'Fact-checking mechanism assessment',
      'Agent chain integrity evaluation'
    ],
    complexity: 'high',
    example: 'Injecting a subtle factual error into the first agent in a research chain, causing subsequent agents to build upon the false information, eventually producing completely fabricated conclusions that appear well-reasoned and sourced.',
    objectives: [
      'Test hallucination detection across chains',
      'Assess information validation between agents',
      'Evaluate fact-checking mechanisms',
      'Validate output verification protocols'
    ],
    defenses: [
      'Multi-source verification requirements',
      'Hallucination detection at each step',
      'Fact-checking integration',
      'Source attribution validation',
      'Cross-verification between agents'
    ],
    tools: [
      'Hallucination injection frameworks',
      'Agent chain testers',
      'Misinformation propagation analyzers',
      'Fact-checking validators',
      'Output verification tools'
    ],
    risks: [
      'Cascading misinformation',
      'Difficult error detection',
      'Amplified false confidence',
      'System-wide incorrect conclusions',
      'User trust exploitation'
    ],
    ethicalGuidelines: [
      'Only test hallucination chains with authorization',
      'Never deploy misinformation in production',
      'Report propagation vulnerabilities immediately',
      'Focus on improving verification mechanisms',
      'Consider harm from compounded false information'
    ]
  },
  {
    id: 'orchestrator-poisoning',
    name: 'Orchestrator Poisoning Attack',
    abbr: 'OPA',
    icon: '🎭',
    color: 'from-rose-600 to-red-600',
    category: 'agentic-ai',
    description: 'Targeting the master orchestrator or coordination layer that manages multiple agents, compromising the central decision-making and task distribution system to control all subordinate agents.',
    features: [
      'Master agent compromise',
      'Coordination layer manipulation',
      'Task distribution control',
      'System-wide influence'
    ],
    useCases: [
      'Orchestration security testing',
      'Master agent validation',
      'Coordination layer assessment',
      'Centralized control evaluation'
    ],
    complexity: 'high',
    example: 'Compromising the orchestrator agent in a multi-agent customer service system, allowing manipulation of how tasks are distributed, which agents are invoked, and how their outputs are combined, effectively controlling the entire system.',
    objectives: [
      'Test orchestrator security',
      'Assess coordination protection',
      'Evaluate master agent isolation',
      'Validate centralized control security'
    ],
    defenses: [
      'Orchestrator hardening and isolation',
      'Master agent authentication',
      'Coordination validation',
      'Privilege separation for orchestration',
      'Monitoring of orchestration decisions'
    ],
    tools: [
      'Orchestrator testing frameworks',
      'Coordination layer analyzers',
      'Master agent exploiters',
      'Centralized control testers',
      'Task distribution monitors'
    ],
    risks: [
      'Complete system compromise',
      'Centralized point of failure',
      'All agents potentially controlled',
      'Difficult to detect from subordinate level',
      'Cascading system-wide impact'
    ],
    ethicalGuidelines: [
      'Only test orchestrators with explicit permission',
      'Never compromise production orchestration layers',
      'Report orchestrator vulnerabilities urgently',
      'Focus on hardening coordination systems',
      'Consider catastrophic failure scenarios'
    ]
  },
  {
    id: 'orchestrator-state-poisoning-responses',
    name: 'Orchestrator State Poisoning via Agent Responses',
    abbr: 'OSPAR',
    icon: '🧪',
    color: 'from-red-600 to-rose-600',
    category: 'agentic-ai',
    description: 'Testing orchestrator resilience to having its internal memory, context, or planning capabilities corrupted by malicious or manipulated responses from the agents it manages, causing degraded decision-making across the system.',
    features: [
      'Agent response manipulation',
      'Orchestrator context corruption',
      'Planning capability poisoning',
      'Memory state pollution'
    ],
    useCases: [
      'Orchestrator state validation testing',
      'Agent response sanitization assessment',
      'Context integrity verification',
      'Planning resilience evaluation'
    ],
    complexity: 'high',
    example: 'Compromising a managed agent to return subtly corrupted status reports or task results to the orchestrator, polluting its internal planning state and causing it to make increasingly poor decisions about task distribution and prioritization across all agents.',
    objectives: [
      'Test response validation mechanisms',
      'Assess orchestrator state protection',
      'Evaluate context corruption resistance',
      'Validate planning integrity controls'
    ],
    defenses: [
      'Agent response validation and sanitization',
      'State integrity verification',
      'Context corruption detection',
      'Anomaly detection in agent responses',
      'Separate validation layer for orchestrator state'
    ],
    tools: [
      'Response manipulation frameworks',
      'State corruption testers',
      'Context poisoning tools',
      'Agent response analyzers',
      'Orchestrator monitoring systems'
    ],
    risks: [
      'Orchestrator decision degradation',
      'System-wide planning failures',
      'Cascading incorrect task distribution',
      'Persistent state corruption',
      'Difficult-to-detect manipulation'
    ],
    ethicalGuidelines: [
      'Only test state poisoning with authorization',
      'Never corrupt production orchestrator state',
      'Report state corruption vulnerabilities urgently',
      'Focus on improving response validation',
      'Consider long-term corruption impact'
    ]
  },
  {
    id: 'data-exfiltration-goal-inference',
    name: 'Data Exfiltration via Goal Inference',
    abbr: 'DEGI',
    icon: '🎯',
    color: 'from-amber-600 to-orange-600',
    category: 'agentic-ai',
    description: 'Manipulating an agent\'s goal inference mechanisms to extract sensitive data by framing data access as necessary to achieve legitimate-seeming objectives.',
    features: [
      'Goal-justified data access',
      'Objective manipulation for exfiltration',
      'Legitimate-appearing data requests',
      'Inference system exploitation'
    ],
    useCases: [
      'Goal inference security testing',
      'Data access justification validation',
      'Objective alignment assessment',
      'Exfiltration prevention evaluation'
    ],
    complexity: 'high',
    example: 'Manipulating an AI assistant to infer that accessing all customer records is necessary to "provide excellent personalized service," causing it to exfiltrate sensitive data while believing it\'s pursuing a legitimate service improvement goal.',
    objectives: [
      'Test goal-based access controls',
      'Assess objective validation',
      'Evaluate data access justification',
      'Validate exfiltration detection'
    ],
    defenses: [
      'Explicit data access policies',
      'Goal-independent access controls',
      'Data minimization enforcement',
      'Access justification validation',
      'Exfiltration pattern detection'
    ],
    tools: [
      'Goal manipulation frameworks',
      'Inference testers',
      'Data access analyzers',
      'Exfiltration pattern detectors',
      'Objective validation tools'
    ],
    risks: [
      'Subtle data exfiltration',
      'Justified unauthorized access',
      'Difficult detection',
      'Large-scale data leakage',
      'Privacy violations'
    ],
    ethicalGuidelines: [
      'Only test with authorized data access',
      'Never exfiltrate production data',
      'Report inference vulnerabilities responsibly',
      'Focus on improving access controls',
      'Consider privacy and compliance impact'
    ]
  },
  {
    id: 'inter-agent-trust-exploitation',
    name: 'Inter-Agent Trust Exploitation',
    abbr: 'IATE',
    color: 'from-sky-600 to-blue-600',
    icon: '🤝',
    category: 'agentic-ai',
    description: 'Exploiting trust relationships between agents by spoofing identity, forging authentication, or abusing certificate systems to impersonate trusted agents and gain unauthorized access.',
    features: [
      'Agent identity spoofing',
      'Authentication forgery',
      'Certificate manipulation',
      'Trust relationship abuse'
    ],
    useCases: [
      'Agent authentication testing',
      'Trust model validation',
      'Identity verification assessment',
      'Certificate security evaluation'
    ],
    complexity: 'high',
    example: 'Spoofing the identity of a high-trust administrative agent to send commands to other agents, bypassing normal authorization checks because the target agents implicitly trust communications from the administrative agent.',
    objectives: [
      'Test agent authentication',
      'Assess trust verification',
      'Evaluate identity validation',
      'Validate certificate systems'
    ],
    defenses: [
      'Strong agent authentication',
      'Certificate-based verification',
      'Zero-trust architecture between agents',
      'Continuous identity validation',
      'Trust relationship monitoring'
    ],
    tools: [
      'Identity spoofing tools',
      'Authentication bypass frameworks',
      'Certificate manipulation utilities',
      'Trust model analyzers',
      'Agent impersonation testers'
    ],
    risks: [
      'Unauthorized agent impersonation',
      'Trust model circumvention',
      'Privileged access through spoofing',
      'Authentication bypass',
      'Security boundary violation'
    ],
    ethicalGuidelines: [
      'Only test trust systems with authorization',
      'Never impersonate production agents',
      'Report trust vulnerabilities immediately',
      'Focus on improving authentication',
      'Consider system-wide trust implications'
    ]
  },
  {
    id: 'runtime-guardrail-bypass',
    name: 'Runtime Guardrail Bypass',
    abbr: 'RGB',
    icon: '🚧',
    color: 'from-emerald-600 to-green-600',
    category: 'agentic-ai',
    description: 'Bypassing runtime security guardrails and safety mechanisms that are meant to constrain agent behavior during execution, allowing agents to perform prohibited actions.',
    features: [
      'Runtime constraint bypass',
      'Safety mechanism evasion',
      'Behavioral limit circumvention',
      'Real-time protection bypass'
    ],
    useCases: [
      'Guardrail effectiveness testing',
      'Runtime security validation',
      'Safety mechanism assessment',
      'Constraint enforcement evaluation'
    ],
    complexity: 'medium',
    example: 'Exploiting timing vulnerabilities in runtime guardrails to execute prohibited database operations in the brief window before safety checks complete, or by fragmenting requests to avoid threshold-based protections.',
    objectives: [
      'Test guardrail robustness',
      'Assess runtime enforcement',
      'Evaluate safety mechanism coverage',
      'Validate constraint effectiveness'
    ],
    defenses: [
      'Multi-layer guardrails',
      'Pre and post-execution validation',
      'Atomic safety checks',
      'Rate limiting and throttling',
      'Comprehensive constraint enforcement'
    ],
    tools: [
      'Guardrail bypass frameworks',
      'Runtime testing tools',
      'Safety evasion analyzers',
      'Constraint validation testers',
      'Protection bypass utilities'
    ],
    risks: [
      'Prohibited action execution',
      'Safety mechanism failure',
      'Constraint violation',
      'Real-time protection bypass',
      'Behavioral boundary violation'
    ],
    ethicalGuidelines: [
      'Only test guardrails with permission',
      'Never bypass production safety systems',
      'Report guardrail weaknesses responsibly',
      'Focus on strengthening protections',
      'Consider safety implications'
    ]
  },
  {
    id: 'agent-identity-spoofing',
    name: 'Agent Identity Spoofing',
    abbr: 'AIS',
    icon: '👤',
    color: 'from-slate-600 to-gray-600',
    category: 'agentic-ai',
    description: 'Creating fake agent identities or cloning legitimate agent identities to infiltrate agent networks, intercept communications, or execute unauthorized actions under false credentials.',
    features: [
      'Fake identity creation',
      'Agent cloning',
      'Credential theft',
      'Network infiltration'
    ],
    useCases: [
      'Identity verification testing',
      'Agent registration validation',
      'Credential security assessment',
      'Network access control evaluation'
    ],
    complexity: 'medium',
    example: 'Creating a cloned agent that mimics a legitimate data processing agent\'s identity and behavior, intercepting tasks assigned to the real agent and exfiltrating data while maintaining the appearance of normal operations.',
    objectives: [
      'Test identity verification',
      'Assess registration security',
      'Evaluate credential protection',
      'Validate network access controls'
    ],
    defenses: [
      'Strong agent registration',
      'Identity verification mechanisms',
      'Credential encryption and protection',
      'Behavioral fingerprinting',
      'Anomaly detection for agent behavior'
    ],
    tools: [
      'Identity cloning tools',
      'Agent impersonation frameworks',
      'Credential theft utilities',
      'Network infiltration testers',
      'Identity validation analyzers'
    ],
    risks: [
      'Unauthorized network access',
      'Task interception',
      'Data exfiltration',
      'System infiltration',
      'Reputation damage'
    ],
    ethicalGuidelines: [
      'Only test identity systems with authorization',
      'Never create fake production agents',
      'Report identity vulnerabilities promptly',
      'Focus on improving verification',
      'Consider trust and security implications'
    ]
  },
  {
    id: 'covert-channel-communication',
    name: 'Covert Channel Communication',
    abbr: 'CCC',
    icon: '📡',
    color: 'from-zinc-600 to-neutral-600',
    category: 'agentic-ai',
    description: 'Establishing hidden communication channels between agents or with external systems using timing patterns, steganography, or side channels to exfiltrate data or coordinate attacks without detection.',
    features: [
      'Hidden communication establishment',
      'Timing-based channels',
      'Steganographic data hiding',
      'Side-channel exploitation'
    ],
    useCases: [
      'Covert channel detection testing',
      'Communication monitoring validation',
      'Side-channel security assessment',
      'Data exfiltration prevention evaluation'
    ],
    complexity: 'high',
    example: 'Encoding sensitive information in the timing patterns of agent API calls or embedding data in the least significant bits of agent output formatting, creating undetectable channels for data exfiltration or command and control.',
    objectives: [
      'Test covert channel detection',
      'Assess communication monitoring',
      'Evaluate side-channel protection',
      'Validate exfiltration prevention'
    ],
    defenses: [
      'Communication pattern analysis',
      'Timing anomaly detection',
      'Traffic normalization',
      'Comprehensive logging and monitoring',
      'Side-channel attack mitigation'
    ],
    tools: [
      'Covert channel generators',
      'Timing attack frameworks',
      'Steganography tools',
      'Side-channel exploiters',
      'Hidden communication analyzers'
    ],
    risks: [
      'Undetected data exfiltration',
      'Hidden command and control',
      'Monitoring evasion',
      'Persistent communication channels',
      'Detection difficulty'
    ],
    ethicalGuidelines: [
      'Only test covert channels with authorization',
      'Never establish production covert channels',
      'Report hidden channel vulnerabilities urgently',
      'Focus on improving detection capabilities',
      'Consider counterintelligence implications'
    ]
  }
];
