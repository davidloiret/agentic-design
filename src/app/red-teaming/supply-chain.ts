import { RedTeamingTechnique } from './types';

export const supplyChainTechniques: RedTeamingTechnique[] = [
  {
    id: 'ai-model-poisoning',
    name: 'AI Model Poisoning',
    abbr: 'AMP',
    icon: '☠️',
    color: 'from-green-600 to-red-600',
    category: 'supply-chain',
    description: 'Injection of malicious data into AI training datasets to corrupt model behavior, causing models to learn incorrect patterns or exhibit harmful behaviors.',
    features: [
      'Training data manipulation',
      'Gradual behavior modification',
      'Trigger-based activation',
      'Stealthy persistence'
    ],
    useCases: [
      'Training data integrity testing',
      'Data validation pipeline assessment',
      'Supply chain security evaluation',
      'Model robustness verification'
    ],
    complexity: 'high',
    example: 'NullBulge ransomware group targets Hugging Face and GitHub repositories, poisoning datasets to compromise AI models during training phase, affecting thousands of downstream applications.',
    objectives: [
      'Test data validation mechanisms',
      'Assess training pipeline security',
      'Evaluate data source integrity',
      'Validate model behavior consistency'
    ],
    defenses: [
      'Data validation and sanitization',
      'Source verification and digital signatures',
      'Statistical anomaly detection',
      'Multi-source data verification',
      'Secure data storage and access controls'
    ],
    tools: [
      'Dataset analysis frameworks',
      'Statistical testing tools',
      'Data provenance tracking',
      'Anomaly detection systems',
      'Model behavior monitoring'
    ],
    risks: [
      'Compromised model behavior',
      'Propagation to downstream systems',
      'Reputational damage',
      'Financial losses',
      'Safety and security incidents'
    ],
    ethicalGuidelines: [
      'Only test on datasets you own or have permission to modify',
      'Never poison production training data',
      'Report vulnerabilities in data pipelines responsibly',
      'Focus on defensive testing, not offensive poisoning',
      'Consider impact on AI safety and reliability'
    ]
  },
  {
    id: 'malicious-model-distribution',
    name: 'Malicious Model Distribution',
    abbr: 'MMD',
    icon: '📦',
    color: 'from-yellow-600 to-red-600',
    category: 'supply-chain',
    description: 'Distribution of compromised AI models through legitimate channels like model repositories, containing hidden malicious functionality or backdoors.',
    features: [
      'Repository infiltration',
      'Typosquatting attacks',
      'Version poisoning',
      'Credential harvesting'
    ],
    useCases: [
      'Model repository security testing',
      'Supply chain validation',
      'Download verification testing',
      'Model integrity assessment'
    ],
    complexity: 'medium',
    example: 'Researchers discovered 100 poisoned models on Hugging Face platform, each containing code injection capabilities that execute when models are loaded, compromising user systems.',
    objectives: [
      'Test model verification systems',
      'Assess repository security controls',
      'Evaluate download validation',
      'Test malware detection capabilities'
    ],
    defenses: [
      'Model signature verification',
      'Automated security scanning',
      'Reputation-based filtering',
      'Sandboxed model execution',
      'Community reporting mechanisms'
    ],
    tools: [
      'Model security scanners',
      'Digital signature tools',
      'Repository monitoring systems',
      'Malware detection engines',
      'Integrity verification tools'
    ],
    risks: [
      'System compromise during model loading',
      'Credential theft',
      'Lateral movement in networks',
      'Data exfiltration',
      'Backdoor installation'
    ],
    ethicalGuidelines: [
      'Only upload test models to private or test repositories',
      'Never distribute malicious models publicly',
      'Report malicious models found in public repositories',
      'Focus on improving detection mechanisms',
      'Protect users from malicious downloads'
    ]
  },
  {
    id: 'dependency-confusion',
    name: 'AI Dependency Confusion',
    abbr: 'ADC',
    icon: '🔗',
    color: 'from-blue-600 to-red-600',
    category: 'supply-chain',
    description: 'Exploitation of package management systems to inject malicious AI libraries or dependencies into AI development workflows.',
    features: [
      'Package name similarity',
      'Version number manipulation',
      'Automated installation triggers',
      'Credential harvesting capabilities'
    ],
    useCases: [
      'Package management security testing',
      'Dependency validation assessment',
      'Build pipeline security evaluation',
      'Developer environment testing'
    ],
    complexity: 'medium',
    example: 'Attacker uploads malicious package "torch-vision" (similar to "torchvision") to PyPI with higher version number, causing automated installs during AI project builds.',
    objectives: [
      'Test package resolution mechanisms',
      'Assess dependency validation',
      'Evaluate build security controls',
      'Test package verification systems'
    ],
    defenses: [
      'Package pinning and lock files',
      'Private package repositories',
      'Dependency scanning tools',
      'Package signature verification',
      'Build environment isolation'
    ],
    tools: [
      'Package analysis tools',
      'Dependency scanners',
      'Build system monitoring',
      'Package integrity checkers',
      'Supply chain security tools'
    ],
    risks: [
      'Malicious code execution during builds',
      'Credential theft from development environments',
      'Backdoor injection into AI applications',
      'Intellectual property theft',
      'Production system compromise'
    ],
    ethicalGuidelines: [
      'Only test in isolated development environments',
      'Never publish malicious packages to public repositories',
      'Report suspicious packages to repository maintainers',
      'Focus on improving package security controls',
      'Protect the developer ecosystem from supply chain attacks'
    ]
  },
  {
    id: 'ai-library-vulnerabilities',
    name: 'AI Library Vulnerability Exploitation',
    abbr: 'ALVE',
    icon: '📚',
    color: 'from-purple-600 to-red-600',
    category: 'supply-chain',
    description: 'Exploitation of security vulnerabilities in popular AI/ML libraries and frameworks that are widely used in the AI development ecosystem.',
    features: [
      'Known CVE exploitation',
      'Zero-day vulnerability discovery',
      'Framework-specific attacks',
      'Transitive dependency exploitation'
    ],
    useCases: [
      'AI framework security assessment',
      'Vulnerability impact analysis',
      'Patch management validation',
      'Security testing of AI stacks'
    ],
    complexity: 'high',
    example: 'Exploitation of CVE-2024-0129 in NVIDIA NeMo framework allowing path traversal attacks, or CVE-2024-5982 in ChuanhuChatGPT enabling arbitrary code execution.',
    objectives: [
      'Test vulnerability patch status',
      'Assess framework security controls',
      'Evaluate update mechanisms',
      'Validate security monitoring'
    ],
    defenses: [
      'Regular security updates',
      'Vulnerability scanning automation',
      'Runtime protection mechanisms',
      'Network segmentation',
      'Least privilege access controls'
    ],
    tools: [
      'Exploit frameworks',
      'Vulnerability scanners',
      'Penetration testing tools',
      'Code analysis platforms',
      'Security assessment frameworks'
    ],
    risks: [
      'Remote code execution',
      'Data breach through framework vulnerabilities',
      'Service disruption',
      'Privilege escalation',
      'Lateral movement in AI infrastructure'
    ],
    ethicalGuidelines: [
      'Only test on systems you own or have permission to test',
      'Coordinate with vendors for responsible disclosure',
      'Avoid exploiting vulnerabilities in production systems',
      'Focus on improving framework security',
      'Consider impact on the broader AI community'
    ]
  }
];