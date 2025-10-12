import { RedTeamingTechnique } from './types';

export const impactChainTechniques: RedTeamingTechnique[] = [
  {
    id: 'cascading-failure-exploitation',
    name: 'Cascading Failure Exploitation',
    abbr: 'CFE',
    icon: '🌊',
    color: 'from-red-600 to-orange-600',
    category: 'agentic-ai',
    description: 'Triggering a failure in one agent that cascades through interconnected agent systems, causing widespread system degradation or complete service failure across multiple components.',
    features: [
      'Chain reaction triggering',
      'Multi-agent failure propagation',
      'Dependency exploitation',
      'Systemic failure creation'
    ],
    useCases: [
      'Failure isolation testing',
      'Dependency mapping validation',
      'Resilience assessment',
      'Cascade prevention evaluation'
    ],
    complexity: 'high',
    example: 'Causing a data validation agent to fail in a way that sends malformed data to downstream processing agents, which in turn trigger errors in analysis agents, eventually cascading to a complete system-wide failure affecting all dependent services.',
    objectives: [
      'Test failure isolation',
      'Assess dependency resilience',
      'Evaluate cascade prevention',
      'Validate fault tolerance'
    ],
    defenses: [
      'Circuit breaker patterns',
      'Failure isolation mechanisms',
      'Graceful degradation',
      'Independent failure domains',
      'Health check and fallback systems'
    ],
    tools: [
      'Chaos engineering tools',
      'Failure injection frameworks',
      'Dependency analyzers',
      'Resilience testers',
      'System monitoring tools'
    ],
    risks: [
      'System-wide failures',
      'Service unavailability',
      'Data processing disruption',
      'Multi-component impact',
      'Extended recovery time'
    ],
    ethicalGuidelines: [
      'Only test cascading failures in isolated environments',
      'Never cause production cascading failures',
      'Report cascade vulnerabilities urgently',
      'Focus on improving isolation',
      'Consider business continuity impact'
    ]
  },
  {
    id: 'blast-radius-amplification',
    name: 'Blast Radius Amplification Attack',
    abbr: 'BRAA',
    icon: '💥',
    color: 'from-orange-600 to-red-600',
    category: 'agentic-ai',
    description: 'Exploiting high-privilege or highly-connected agents to maximize the blast radius of a compromise, affecting the largest possible number of systems, users, or data through a single point of entry.',
    features: [
      'High-privilege agent targeting',
      'Hub agent exploitation',
      'Maximum impact seeking',
      'Lateral spread maximization'
    ],
    useCases: [
      'Blast radius analysis',
      'Privilege segmentation testing',
      'Impact scope validation',
      'Lateral movement assessment'
    ],
    complexity: 'high',
    example: 'Compromising a central authentication agent that serves dozens of other agents, using it to issue fraudulent credentials or authorization tokens that grant access across the entire agent network and connected systems.',
    objectives: [
      'Test impact containment',
      'Assess privilege segmentation',
      'Evaluate blast radius limits',
      'Validate lateral movement prevention'
    ],
    defenses: [
      'Principle of least privilege',
      'Agent privilege segmentation',
      'Blast radius containment',
      'Network segmentation',
      'Impact scope limitations'
    ],
    tools: [
      'Attack graph analyzers',
      'Privilege mapping tools',
      'Network topology analyzers',
      'Impact assessment frameworks',
      'Lateral movement testers'
    ],
    risks: [
      'Maximum system compromise',
      'Multi-tenant impact',
      'Widespread data exposure',
      'Extensive remediation required',
      'Catastrophic business impact'
    ],
    ethicalGuidelines: [
      'Only assess blast radius with authorization',
      'Never maximize production impact',
      'Report high-impact vulnerabilities urgently',
      'Focus on improving segmentation',
      'Consider worst-case scenarios'
    ]
  },
  {
    id: 'cross-system-impact-propagation',
    name: 'Cross-System Impact Propagation',
    abbr: 'CSIP',
    icon: '🔗',
    color: 'from-yellow-600 to-red-600',
    category: 'agentic-ai',
    description: 'Exploiting agent integrations and cross-system connections to propagate security impacts from one system to another, spreading compromises across organizational or security boundaries.',
    features: [
      'Cross-boundary exploitation',
      'Integration abuse',
      'Multi-system propagation',
      'Security perimeter bypass'
    ],
    useCases: [
      'Integration security testing',
      'Boundary enforcement validation',
      'Cross-system isolation assessment',
      'Propagation prevention evaluation'
    ],
    complexity: 'high',
    example: 'Compromising an agent in a low-security development environment and using its API integrations to propagate the attack into production systems, customer databases, or third-party services through trusted connections.',
    objectives: [
      'Test integration security',
      'Assess boundary enforcement',
      'Evaluate cross-system isolation',
      'Validate propagation controls'
    ],
    defenses: [
      'Security boundary enforcement',
      'Integration authentication',
      'Cross-system isolation',
      'API gateway security',
      'Trust boundary validation'
    ],
    tools: [
      'Integration testing frameworks',
      'Boundary analyzers',
      'Cross-system testers',
      'API security scanners',
      'Propagation trackers'
    ],
    risks: [
      'Security boundary bypass',
      'Multi-environment compromise',
      'Third-party system impact',
      'Compliance violations',
      'Extended attack surface'
    ],
    ethicalGuidelines: [
      'Only test cross-system propagation with authorization',
      'Never compromise production boundaries',
      'Report boundary vulnerabilities immediately',
      'Focus on improving isolation',
      'Consider multi-system impact'
    ]
  },
  {
    id: 'multi-tenant-impact-exploitation',
    name: 'Multi-Tenant Impact Exploitation',
    abbr: 'MTIE',
    icon: '🏢',
    color: 'from-blue-600 to-red-600',
    category: 'agentic-ai',
    description: 'Exploiting weak tenant isolation in multi-tenant agent systems to propagate impacts from one tenant to others, causing cross-tenant data exposure or service disruption.',
    features: [
      'Tenant isolation bypass',
      'Cross-tenant impact',
      'Shared resource exploitation',
      'Multi-customer effect'
    ],
    useCases: [
      'Tenant isolation testing',
      'Multi-tenancy security assessment',
      'Resource isolation validation',
      'Cross-tenant protection evaluation'
    ],
    complexity: 'high',
    example: 'Exploiting a shared agent orchestrator in a SaaS platform to trigger resource exhaustion or inject malicious context that affects all tenants sharing the infrastructure, causing widespread service degradation or data leakage.',
    objectives: [
      'Test tenant isolation',
      'Assess resource separation',
      'Evaluate cross-tenant protection',
      'Validate multi-tenancy security'
    ],
    defenses: [
      'Strong tenant isolation',
      'Resource quotas per tenant',
      'Separate execution contexts',
      'Tenant-specific encryption',
      'Cross-tenant access prevention'
    ],
    tools: [
      'Multi-tenancy testers',
      'Isolation analyzers',
      'Resource boundary validators',
      'Cross-tenant security scanners',
      'Tenant separation tools'
    ],
    risks: [
      'Cross-tenant data exposure',
      'Multi-customer service impact',
      'Compliance violations',
      'Reputation damage',
      'Mass customer impact'
    ],
    ethicalGuidelines: [
      'Only test multi-tenancy with explicit authorization',
      'Never impact other customers/tenants',
      'Report isolation vulnerabilities urgently',
      'Focus on improving tenant separation',
      'Prioritize customer data protection'
    ]
  },
  {
    id: 'dependency-chain-exploitation',
    name: 'Agent Dependency Chain Exploitation',
    abbr: 'ADCE',
    icon: '⛓️',
    color: 'from-purple-600 to-red-600',
    category: 'agentic-ai',
    description: 'Mapping and exploiting agent dependency chains to identify critical path agents whose compromise would cause maximum downstream impact, targeting architectural weak points.',
    features: [
      'Dependency mapping',
      'Critical path identification',
      'Upstream agent targeting',
      'Downstream impact maximization'
    ],
    useCases: [
      'Dependency analysis testing',
      'Critical path validation',
      'Architectural resilience assessment',
      'Single point of failure identification'
    ],
    complexity: 'medium',
    example: 'Identifying that all reporting agents depend on a single data aggregation agent, then compromising that aggregation agent to inject false data that corrupts all downstream reports, dashboards, and business intelligence across the organization.',
    objectives: [
      'Test dependency resilience',
      'Assess critical path protection',
      'Evaluate architectural robustness',
      'Validate redundancy mechanisms'
    ],
    defenses: [
      'Dependency redundancy',
      'Multiple data sources',
      'Critical path protection',
      'Architectural diversity',
      'Dependency health monitoring'
    ],
    tools: [
      'Dependency mapping tools',
      'Architecture analyzers',
      'Critical path identifiers',
      'Impact modeling frameworks',
      'Resilience assessment tools'
    ],
    risks: [
      'Single point of failure exploitation',
      'Widespread downstream corruption',
      'Business process disruption',
      'Data integrity compromise',
      'Systemic architectural weakness'
    ],
    ethicalGuidelines: [
      'Only map dependencies with authorization',
      'Never exploit production critical paths',
      'Report architectural vulnerabilities responsibly',
      'Focus on improving redundancy',
      'Consider business continuity impact'
    ]
  }
];
