import { RedTeamingTechnique } from './types';

export const memoryAttackTechniques: RedTeamingTechnique[] = [
  {
    id: 'memory-poisoning',
    name: 'Agent Memory Poisoning',
    abbr: 'AMP',
    icon: '🧠',
    color: 'from-pink-600 to-purple-600',
    category: 'memory-attacks',
    description: 'Injection of malicious or manipulative information into an agent\'s long-term memory systems, corrupting its knowledge base and influencing future behaviors.',
    features: [
      'Long-term memory corruption',
      'Knowledge base manipulation',
      'Persistent behavior modification',
      'Memory retrieval exploitation'
    ],
    useCases: [
      'Memory integrity testing',
      'Knowledge base security assessment',
      'Memory validation evaluation',
      'Storage security testing'
    ],
    complexity: 'high',
    example: 'Injecting false security policies into an agent\'s memory during initial conversations, causing it to bypass authentication checks in all future interactions, believing the false policy to be legitimate.',
    objectives: [
      'Test memory validation mechanisms',
      'Assess storage integrity controls',
      'Evaluate memory isolation',
      'Validate knowledge source verification'
    ],
    defenses: [
      'Memory validation and sanitization',
      'Source verification for stored information',
      'Memory access controls',
      'Integrity checksums for stored data',
      'Periodic memory audits'
    ],
    tools: [
      'Memory injection frameworks',
      'Knowledge base analyzers',
      'Storage security testers',
      'Memory validation tools',
      'Integrity verification systems'
    ],
    risks: [
      'Persistent behavior corruption',
      'Long-term security compromise',
      'Knowledge base integrity loss',
      'Difficulty in detection and remediation',
      'Cascading incorrect behaviors'
    ],
    ethicalGuidelines: [
      'Only test memory systems with explicit authorization',
      'Never poison production agent memories',
      'Report memory vulnerabilities immediately',
      'Focus on improving memory security',
      'Consider long-term harm from corrupted memories'
    ]
  },
  {
    id: 'context-window-manipulation',
    name: 'Context Window Manipulation',
    abbr: 'CWM',
    icon: '📜',
    color: 'from-blue-600 to-cyan-600',
    category: 'memory-attacks',
    description: 'Exploitation of context window limitations to hide malicious instructions, overflow context buffers, or manipulate conversation history to bypass security controls.',
    features: [
      'Context overflow attacks',
      'History manipulation',
      'Hidden instruction injection',
      'Context prioritization exploitation'
    ],
    useCases: [
      'Context management testing',
      'Buffer handling assessment',
      'History integrity validation',
      'Context priority evaluation'
    ],
    complexity: 'medium',
    example: 'Flooding the context window with benign content to push system instructions out of scope, then injecting malicious commands that appear to be system-level instructions due to context overflow.',
    objectives: [
      'Test context window limits',
      'Assess overflow handling',
      'Evaluate history management',
      'Validate context prioritization'
    ],
    defenses: [
      'Context window management',
      'Priority-based context retention',
      'System instruction protection',
      'Context overflow detection',
      'Critical content pinning'
    ],
    tools: [
      'Context overflow generators',
      'Window size analyzers',
      'History manipulation tools',
      'Context priority testers',
      'Buffer testing frameworks'
    ],
    risks: [
      'System instruction loss',
      'Security control bypass',
      'Context confusion',
      'Instruction priority manipulation',
      'Conversation integrity compromise'
    ],
    ethicalGuidelines: [
      'Test only in authorized environments',
      'Avoid production context manipulation',
      'Report context vulnerabilities responsibly',
      'Focus on improving context management',
      'Consider user privacy in context testing'
    ]
  },
  {
    id: 'rag-poisoning',
    name: 'RAG System Poisoning',
    abbr: 'RAGP',
    icon: '📚',
    color: 'from-green-600 to-teal-600',
    category: 'memory-attacks',
    description: 'Injection of malicious documents or data into Retrieval-Augmented Generation (RAG) knowledge bases to poison retrieved context and manipulate agent responses.',
    features: [
      'Knowledge base document poisoning',
      'Retrieval result manipulation',
      'Vector embedding corruption',
      'Search result injection'
    ],
    useCases: [
      'RAG security testing',
      'Knowledge base integrity assessment',
      'Retrieval validation',
      'Document verification testing'
    ],
    complexity: 'high',
    example: 'Inserting documents with embedded malicious instructions into a RAG knowledge base, designed to rank highly for common queries and inject harmful directives when retrieved by the agent.',
    objectives: [
      'Test document validation',
      'Assess retrieval integrity',
      'Evaluate source verification',
      'Validate embedding security'
    ],
    defenses: [
      'Document validation and sanitization',
      'Source authentication',
      'Retrieval result verification',
      'Embedding integrity checks',
      'Access controls on knowledge bases'
    ],
    tools: [
      'RAG testing frameworks',
      'Document injection tools',
      'Vector embedding analyzers',
      'Retrieval testers',
      'Knowledge base scanners'
    ],
    risks: [
      'Compromised knowledge retrieval',
      'Poisoned agent responses',
      'Misinformation propagation',
      'Source attribution manipulation',
      'Knowledge base integrity loss'
    ],
    ethicalGuidelines: [
      'Only test RAG systems with authorization',
      'Never poison production knowledge bases',
      'Report RAG vulnerabilities promptly',
      'Focus on improving retrieval security',
      'Consider downstream impact of poisoned knowledge'
    ]
  },
  {
    id: 'session-hijacking',
    name: 'Agent Session Hijacking',
    abbr: 'ASH',
    icon: '🔑',
    color: 'from-red-600 to-pink-600',
    category: 'memory-attacks',
    description: 'Unauthorized takeover of an ongoing agent conversation or session, gaining access to conversation history, context, and the ability to inject malicious instructions.',
    features: [
      'Session token exploitation',
      'Context injection mid-conversation',
      'History access and manipulation',
      'State takeover'
    ],
    useCases: [
      'Session security testing',
      'Token validation assessment',
      'Context isolation evaluation',
      'State management testing'
    ],
    complexity: 'medium',
    example: 'Exploiting weak session management to take over an active customer service conversation, accessing sensitive customer information from the conversation history and injecting fraudulent instructions.',
    objectives: [
      'Test session isolation',
      'Assess token security',
      'Evaluate state protection',
      'Validate session expiration'
    ],
    defenses: [
      'Strong session management',
      'Token encryption and rotation',
      'Session validation on each request',
      'Context encryption',
      'Session timeout enforcement'
    ],
    tools: [
      'Session testing tools',
      'Token analyzers',
      'Context extractors',
      'State manipulation frameworks',
      'Session security scanners'
    ],
    risks: [
      'Conversation takeover',
      'Sensitive data access',
      'Context manipulation',
      'Identity impersonation',
      'Privacy violations'
    ],
    ethicalGuidelines: [
      'Only test session security with permission',
      'Never hijack production sessions',
      'Report session vulnerabilities immediately',
      'Focus on improving session management',
      'Protect user privacy during testing'
    ]
  },
  {
    id: 'memory-injection',
    name: 'Direct Memory Injection',
    abbr: 'DMI',
    icon: '💉',
    color: 'from-purple-600 to-blue-600',
    category: 'memory-attacks',
    description: 'Direct injection of malicious content into an agent\'s memory storage systems, bypassing normal conversation flows to insert false memories or corrupted knowledge.',
    features: [
      'Direct storage manipulation',
      'Memory API exploitation',
      'Conversation bypass',
      'Knowledge base direct access'
    ],
    useCases: [
      'Memory API security testing',
      'Storage access control assessment',
      'Direct injection vulnerability testing',
      'Memory isolation validation'
    ],
    complexity: 'high',
    example: 'Exploiting an unsecured memory API endpoint to directly inject false user preferences, security policies, or historical interactions into an agent\'s memory without going through the conversation interface.',
    objectives: [
      'Test memory API security',
      'Assess storage access controls',
      'Evaluate injection prevention',
      'Validate memory isolation'
    ],
    defenses: [
      'Strict API authentication',
      'Memory write access controls',
      'Input validation on storage operations',
      'API rate limiting',
      'Memory operation auditing'
    ],
    tools: [
      'API testing frameworks',
      'Memory access tools',
      'Injection testing suites',
      'Storage security scanners',
      'Authentication bypass tools'
    ],
    risks: [
      'Unauthorized memory modification',
      'Knowledge base corruption',
      'Security bypass through memory',
      'Data integrity compromise',
      'Persistent false information'
    ],
    ethicalGuidelines: [
      'Only test memory APIs with authorization',
      'Never inject into production memories',
      'Report API vulnerabilities responsibly',
      'Focus on improving API security',
      'Consider data integrity impact'
    ]
  },
  {
    id: 'context-contamination',
    name: 'Context Contamination Attack',
    abbr: 'CCA',
    icon: '☣️',
    color: 'from-yellow-600 to-red-600',
    category: 'memory-attacks',
    description: 'Gradual contamination of conversation context through subtle injections across multiple interactions, slowly corrupting the agent\'s understanding and behavior.',
    features: [
      'Gradual contamination',
      'Multi-turn corruption',
      'Subtle manipulation',
      'Cumulative effect exploitation'
    ],
    useCases: [
      'Context integrity testing',
      'Multi-turn security assessment',
      'Cumulative effect evaluation',
      'Contamination detection testing'
    ],
    complexity: 'medium',
    example: 'Over multiple conversations, subtly introducing false information about security policies, gradually building a contaminated context that the agent trusts, eventually leading to security bypasses.',
    objectives: [
      'Test cumulative context validation',
      'Assess contamination detection',
      'Evaluate multi-turn security',
      'Validate context cleaning mechanisms'
    ],
    defenses: [
      'Continuous context validation',
      'Contamination detection algorithms',
      'Periodic context sanitization',
      'Multi-turn consistency checks',
      'Anomaly detection in context'
    ],
    tools: [
      'Multi-turn testing frameworks',
      'Contamination injectors',
      'Context analyzers',
      'Consistency validators',
      'Gradual attack simulators'
    ],
    risks: [
      'Slow undetected corruption',
      'Cumulative security degradation',
      'Difficult remediation',
      'Cross-session contamination',
      'Persistent behavioral changes'
    ],
    ethicalGuidelines: [
      'Test only with proper authorization',
      'Avoid production context contamination',
      'Report gradual attack vulnerabilities',
      'Focus on improving contamination detection',
      'Consider long-term consequences'
    ]
  },
  {
    id: 'episodic-memory-replay-attack',
    name: 'Episodic Memory Replay Attack',
    abbr: 'EMRA',
    icon: '🔄',
    color: 'from-indigo-600 to-purple-600',
    category: 'memory-attacks',
    description: 'Manipulation of episodic memory replay mechanisms to reinforce malicious patterns, false information, or harmful behaviors through repeated memory activation.',
    features: [
      'Memory replay manipulation',
      'Pattern reinforcement exploitation',
      'Memory consolidation abuse',
      'Recall prioritization exploitation'
    ],
    useCases: [
      'Memory replay security testing',
      'Consolidation mechanism assessment',
      'Recall priority validation',
      'Reinforcement security evaluation'
    ],
    complexity: 'high',
    example: 'Triggering repeated replay of a poisoned memory episode to reinforce malicious behavior patterns, causing the agent to prioritize and apply corrupted knowledge in future interactions.',
    objectives: [
      'Test replay mechanisms',
      'Assess consolidation security',
      'Evaluate recall controls',
      'Validate reinforcement limits'
    ],
    defenses: [
      'Replay validation',
      'Consolidation security controls',
      'Recall frequency limits',
      'Memory reinforcement monitoring',
      'Pattern anomaly detection'
    ],
    tools: [
      'Memory replay testers',
      'Pattern injection tools',
      'Consolidation analyzers',
      'Recall manipulation frameworks',
      'Reinforcement monitors'
    ],
    risks: [
      'Reinforced malicious patterns',
      'Behavior entrenchment',
      'Difficult pattern removal',
      'Memory priority corruption',
      'Learning system exploitation'
    ],
    ethicalGuidelines: [
      'Only test memory systems with permission',
      'Never manipulate production memory replay',
      'Report replay vulnerabilities responsibly',
      'Focus on securing memory mechanisms',
      'Consider psychological pattern impacts'
    ]
  },
  {
    id: 'semantic-memory-corruption',
    name: 'Semantic Memory Corruption',
    abbr: 'SMC',
    icon: '🗃️',
    color: 'from-teal-600 to-green-600',
    category: 'memory-attacks',
    description: 'Corruption of an agent\'s semantic memory - general knowledge and facts - through injection of false information that becomes part of the agent\'s core understanding.',
    features: [
      'Factual knowledge corruption',
      'Concept relationship manipulation',
      'General knowledge poisoning',
      'Semantic network alteration'
    ],
    useCases: [
      'Semantic memory testing',
      'Knowledge integrity assessment',
      'Fact verification validation',
      'Concept relationship testing'
    ],
    complexity: 'high',
    example: 'Injecting false information about API authentication requirements into an agent\'s semantic memory, causing it to believe that certain security steps are optional across all future interactions.',
    objectives: [
      'Test fact validation',
      'Assess knowledge verification',
      'Evaluate semantic integrity',
      'Validate concept protection'
    ],
    defenses: [
      'Fact verification systems',
      'Knowledge source tracking',
      'Semantic consistency checks',
      'Expert knowledge validation',
      'Multiple source verification'
    ],
    tools: [
      'Knowledge injection tools',
      'Semantic memory analyzers',
      'Fact verification testers',
      'Concept corruption frameworks',
      'Knowledge integrity scanners'
    ],
    risks: [
      'Fundamental knowledge corruption',
      'Persistent false beliefs',
      'System-wide incorrect behaviors',
      'Difficult detection and correction',
      'Cascading reasoning errors'
    ],
    ethicalGuidelines: [
      'Only test semantic memory with authorization',
      'Never corrupt production knowledge bases',
      'Report semantic vulnerabilities urgently',
      'Focus on improving fact verification',
      'Consider broad impact of false knowledge'
    ]
  },
  {
    id: 'memory-persistence-exploitation',
    name: 'Memory Persistence Exploitation',
    abbr: 'MPE',
    icon: '♾️',
    color: 'from-orange-600 to-red-600',
    category: 'memory-attacks',
    description: 'Exploitation of memory persistence mechanisms to ensure malicious content remains in agent memory across resets, updates, or cleanup operations.',
    features: [
      'Cleanup bypass',
      'Reset resistance',
      'Update persistence',
      'Garbage collection evasion'
    ],
    useCases: [
      'Memory cleanup testing',
      'Reset mechanism validation',
      'Persistence control assessment',
      'Garbage collection evaluation'
    ],
    complexity: 'medium',
    example: 'Crafting malicious memory entries with protected flags or metadata that survive memory cleanup operations, ensuring persistent compromise even after administrator-initiated memory resets.',
    objectives: [
      'Test cleanup mechanisms',
      'Assess reset completeness',
      'Evaluate persistence controls',
      'Validate garbage collection'
    ],
    defenses: [
      'Comprehensive memory cleanup',
      'Complete reset procedures',
      'Persistence validation',
      'Memory lifecycle management',
      'Periodic full memory audits'
    ],
    tools: [
      'Persistence testers',
      'Cleanup bypass tools',
      'Reset validators',
      'Memory lifecycle analyzers',
      'Retention testing frameworks'
    ],
    risks: [
      'Persistent compromise',
      'Incomplete remediation',
      'Long-term security degradation',
      'Hidden malicious content',
      'Cleanup mechanism bypass'
    ],
    ethicalGuidelines: [
      'Test only with proper authorization',
      'Never create persistent production compromises',
      'Report persistence vulnerabilities immediately',
      'Focus on improving cleanup mechanisms',
      'Consider remediation difficulty'
    ]
  },
  {
    id: 'cross-session-memory-leakage',
    name: 'Cross-Session Memory Leakage',
    abbr: 'CSML',
    icon: '🔓',
    color: 'from-red-600 to-orange-600',
    category: 'memory-attacks',
    description: 'Exploitation of memory isolation vulnerabilities to access or leak information from other users\' sessions or conversations through shared memory systems.',
    features: [
      'Session boundary bypass',
      'Memory isolation exploitation',
      'Cross-user data access',
      'Shared memory abuse'
    ],
    useCases: [
      'Session isolation testing',
      'Memory boundary validation',
      'Privacy protection assessment',
      'Multi-tenant security evaluation'
    ],
    complexity: 'high',
    example: 'Exploiting weak memory isolation to access conversation context from other users\' sessions, extracting sensitive personal information or business data from parallel conversations.',
    objectives: [
      'Test memory isolation',
      'Assess session boundaries',
      'Evaluate privacy protections',
      'Validate multi-tenancy security'
    ],
    defenses: [
      'Strong memory isolation',
      'Session-specific memory spaces',
      'Access control enforcement',
      'Memory encryption per session',
      'Isolation validation testing'
    ],
    tools: [
      'Isolation testers',
      'Cross-session access tools',
      'Memory boundary analyzers',
      'Privacy leak detectors',
      'Multi-tenancy security scanners'
    ],
    risks: [
      'Privacy violations',
      'Sensitive data exposure',
      'Cross-user information leakage',
      'Compliance violations',
      'Trust destruction'
    ],
    ethicalGuidelines: [
      'Only test isolation with explicit authorization',
      'Never access other users\' production data',
      'Report privacy vulnerabilities immediately',
      'Focus on improving isolation',
      'Prioritize user privacy protection'
    ]
  },
  {
    id: 'learning-process-exploitation',
    name: 'Learning Process Exploitation',
    abbr: 'LPE',
    icon: '🎓',
    color: 'from-amber-600 to-yellow-600',
    category: 'memory-attacks',
    description: 'Attacking agent learning processes by introducing biased, incomplete, or malicious data during incremental updates, online learning, or feedback loops, causing the agent to learn harmful behaviors or incorrect patterns.',
    features: [
      'Biased training data injection',
      'Incremental learning manipulation',
      'Feedback loop exploitation',
      'Learning boundary bypass'
    ],
    useCases: [
      'Online learning security testing',
      'Feedback validation assessment',
      'Learning boundary enforcement evaluation',
      'Adaptive learning resilience testing'
    ],
    complexity: 'high',
    example: 'Providing systematically biased feedback during an agent\'s online learning phase, causing it to learn discriminatory patterns or unsafe behaviors that persist across future interactions and become part of its learned model.',
    objectives: [
      'Test learning input validation',
      'Assess bias detection mechanisms',
      'Evaluate learning boundary enforcement',
      'Validate feedback loop security'
    ],
    defenses: [
      'Learning input validation and sanitization',
      'Anomaly detection for learning updates',
      'Learning rate limits and boundaries',
      'Bias detection in training feedback',
      'Safety-aligned adaptation rules',
      'Learning process monitoring and auditing'
    ],
    tools: [
      'Learning process testers',
      'Bias injection frameworks',
      'Feedback manipulation tools',
      'Online learning analyzers',
      'Adaptive learning security scanners'
    ],
    risks: [
      'Systematic bias introduction',
      'Harmful behavior learning',
      'Model degradation over time',
      'Safety alignment compromise',
      'Persistent learned vulnerabilities'
    ],
    ethicalGuidelines: [
      'Only test learning processes with authorization',
      'Never poison production learning systems',
      'Report learning vulnerabilities immediately',
      'Focus on improving learning safeguards',
      'Consider long-term impact of learned behaviors'
    ]
  },
  {
    id: 'update-mechanism-vulnerability',
    name: 'Knowledge Update Mechanism Vulnerability',
    abbr: 'KUMV',
    icon: '🔄',
    color: 'from-cyan-600 to-blue-600',
    category: 'memory-attacks',
    description: 'Exploiting vulnerabilities in the agent\'s knowledge update mechanisms by injecting unauthorized updates, bypassing authentication and integrity checks, or manipulating version control systems to introduce malicious knowledge.',
    features: [
      'Unauthorized update injection',
      'Authentication bypass',
      'Version control manipulation',
      'Integrity check evasion'
    ],
    useCases: [
      'Knowledge update security testing',
      'Version control validation',
      'Authentication mechanism assessment',
      'Update integrity verification'
    ],
    complexity: 'high',
    example: 'Bypassing the agent\'s authentication mechanisms to inject unauthorized updates into its knowledge base, introducing false information or malicious logic that persists across agent sessions and influences future decision-making.',
    objectives: [
      'Test update authentication',
      'Assess version control security',
      'Evaluate integrity validation',
      'Validate update authorization'
    ],
    defenses: [
      'Strong update authentication',
      'Cryptographic integrity checks',
      'Version control with audit trails',
      'Update source verification',
      'Rollback capability for malicious updates',
      'Multi-factor authorization for critical updates'
    ],
    tools: [
      'Update injection frameworks',
      'Authentication bypass tools',
      'Version control analyzers',
      'Integrity validation testers',
      'Update monitoring systems'
    ],
    risks: [
      'Unauthorized knowledge modification',
      'Persistent malicious updates',
      'Knowledge base corruption',
      'Authentication system bypass',
      'Version control compromise'
    ],
    ethicalGuidelines: [
      'Only test update mechanisms with authorization',
      'Never inject malicious production updates',
      'Report update vulnerabilities immediately',
      'Focus on improving update security',
      'Consider impact of persistent corrupted knowledge'
    ]
  },
  {
    id: 'cross-agent-knowledge-poisoning',
    name: 'Cross-Agent Knowledge Poisoning',
    abbr: 'CAKP',
    icon: '🔗',
    color: 'from-indigo-600 to-purple-600',
    category: 'memory-attacks',
    description: 'Attacking shared knowledge bases used by multiple agents to create systemic poisoning, where corrupted knowledge propagates across interconnected agents, causing cascading errors and compromised decision-making throughout the agent network.',
    features: [
      'Shared knowledge base poisoning',
      'Cross-agent propagation',
      'Systemic knowledge corruption',
      'Cascading error exploitation'
    ],
    useCases: [
      'Multi-agent knowledge security testing',
      'Shared knowledge validation assessment',
      'Cross-agent propagation evaluation',
      'Knowledge isolation verification'
    ],
    complexity: 'high',
    example: 'Injecting false information into a shared knowledge base used by multiple customer service agents, causing the corrupted knowledge to propagate across the entire agent network and leading to widespread incorrect responses to customer queries.',
    objectives: [
      'Test shared knowledge validation',
      'Assess cross-agent isolation',
      'Evaluate propagation prevention',
      'Validate knowledge verification between agents'
    ],
    defenses: [
      'Shared knowledge validation',
      'Cross-referencing between agents',
      'Knowledge source verification',
      'Agent-specific knowledge isolation',
      'Propagation detection mechanisms',
      'Consensus-based knowledge acceptance'
    ],
    tools: [
      'Multi-agent testing frameworks',
      'Knowledge propagation analyzers',
      'Shared knowledge scanners',
      'Cross-agent validation tools',
      'Knowledge isolation testers'
    ],
    risks: [
      'Systemic knowledge corruption',
      'Multi-agent compromise',
      'Cascading decision errors',
      'Network-wide false information',
      'Difficult remediation across agents'
    ],
    ethicalGuidelines: [
      'Only test shared knowledge with authorization',
      'Never poison production multi-agent systems',
      'Report propagation vulnerabilities urgently',
      'Focus on improving knowledge isolation',
      'Consider widespread impact of shared poisoning'
    ]
  }
];
