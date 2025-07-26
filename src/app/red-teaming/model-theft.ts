import { RedTeamingTechnique } from './types';

export const modelTheftTechniques: RedTeamingTechnique[] = [
  {
    id: 'query-based-extraction',
    name: 'Query-Based Model Extraction',
    abbr: 'QBE',
    icon: '🎣',
    color: 'from-cyan-600 to-red-600',
    category: 'model-theft',
    description: 'Systematic querying of AI models to reverse-engineer their parameters, architecture, and decision-making logic through response analysis.',
    features: [
      'Strategic query generation',
      'Response pattern analysis',
      'Parameter estimation',
      'Architecture inference'
    ],
    useCases: [
      'Model IP protection testing',
      'API rate limiting validation',
      'Query monitoring assessment',
      'Intellectual property security evaluation'
    ],
    complexity: 'high',
    example: 'Attacker sends thousands of carefully crafted queries to a proprietary language model API, analyzing responses to reconstruct training data patterns and model behavior.',
    objectives: [
      'Test model extraction protections',
      'Assess query monitoring capabilities',
      'Evaluate rate limiting effectiveness',
      'Validate IP protection mechanisms'
    ],
    defenses: [
      'Query rate limiting and throttling',
      'Response randomization and noise injection',
      'Query pattern detection',
      'Differential privacy mechanisms',
      'Access logging and monitoring'
    ],
    tools: [
      'Automated query generation frameworks',
      'Statistical analysis tools',
      'API testing platforms',
      'Response pattern analyzers',
      'Model reconstruction toolkits'
    ],
    risks: [
      'Loss of competitive advantage',
      'Intellectual property theft',
      'Revenue loss from model piracy',
      'Exposure of training data patterns',
      'Reputational damage'
    ],
    ethicalGuidelines: [
      'Only test on models you own or have permission to test',
      'Respect API terms of service and rate limits',
      'Do not redistribute extracted model information',
      'Report vulnerabilities in model protection systems',
      'Focus on improving model security, not theft'
    ]
  },
  {
    id: 'side-channel-extraction',
    name: 'Electromagnetic Side-Channel Model Extraction',
    abbr: 'EM-SCE',
    icon: '📡',
    color: 'from-pink-600 to-red-600',
    category: 'model-theft',
    description: 'Novel attack technique using electromagnetic emissions to extract AI model hyperparameters and architecture from edge devices and TPUs.',
    features: [
      'Electromagnetic signal monitoring',
      'Hardware-level data extraction',
      'Non-intrusive surveillance',
      'TPU-specific vulnerabilities'
    ],
    useCases: [
      'Edge device security testing',
      'Hardware security assessment',
      'Physical security evaluation',
      'Electromagnetic shielding validation'
    ],
    complexity: 'high',
    example: 'Researchers extracted hyperparameters from Google Edge TPU by monitoring electromagnetic emissions, demonstrating ability to steal model information without network access.',
    objectives: [
      'Test physical security measures',
      'Assess electromagnetic shielding',
      'Evaluate edge device vulnerabilities',
      'Validate hardware security controls'
    ],
    defenses: [
      'Electromagnetic shielding (Faraday cages)',
      'Physical access controls',
      'Hardware security modules',
      'Signal noise injection',
      'Secure processing environments'
    ],
    tools: [
      'Software-defined radio (SDR)',
      'Electromagnetic monitoring equipment',
      'Signal analysis software',
      'Spectrum analyzers',
      'Custom antenna systems'
    ],
    risks: [
      'Physical theft of model IP',
      'Bypass of network security controls',
      'Exposure of edge-deployed models',
      'Industrial espionage',
      'Compromise of proprietary algorithms'
    ],
    ethicalGuidelines: [
      'Only test on hardware you own or have permission to test',
      'Respect physical security boundaries',
      'Report hardware vulnerabilities to manufacturers',
      'Avoid testing in restricted or secure facilities',
      'Consider privacy implications of electromagnetic monitoring'
    ]
  },
  {
    id: 'membership-inference',
    name: 'Membership Inference Attacks',
    abbr: 'MIA',
    icon: '🔍',
    color: 'from-green-600 to-red-600',
    category: 'model-theft',
    description: 'Determining whether specific data points were used in training an AI model, potentially exposing sensitive training data and privacy violations.',
    features: [
      'Training data identification',
      'Statistical confidence testing',
      'Privacy boundary testing',
      'Data leakage detection'
    ],
    useCases: [
      'Privacy protection testing',
      'Data anonymization validation',
      'Compliance verification (GDPR, HIPAA)',
      'Training data security assessment'
    ],
    complexity: 'medium',
    example: 'Attacker determines that specific medical records were used to train a healthcare AI model by analyzing model confidence scores on known vs. unknown data points.',
    objectives: [
      'Test privacy protection mechanisms',
      'Assess data anonymization effectiveness',
      'Evaluate differential privacy implementations',
      'Validate training data security'
    ],
    defenses: [
      'Differential privacy mechanisms',
      'Data anonymization techniques',
      'Training data access controls',
      'Model output noise injection',
      'Privacy-preserving training methods'
    ],
    tools: [
      'Membership inference frameworks',
      'Statistical testing tools',
      'Privacy analysis platforms',
      'Confidence score analyzers',
      'Data leakage detectors'
    ],
    risks: [
      'Privacy violations and data exposure',
      'Regulatory compliance failures',
      'Legal liability for data misuse',
      'Reputational damage',
      'Competitive intelligence theft'
    ],
    ethicalGuidelines: [
      'Only test on datasets you own or have permission to analyze',
      'Respect privacy laws and regulations',
      'Do not attempt to identify real individuals',
      'Report privacy vulnerabilities responsibly',
      'Focus on improving privacy protections'
    ]
  },
  {
    id: 'model-inversion-advanced',
    name: 'Advanced Model Inversion Attacks',
    abbr: 'AMIA',
    icon: '🔄',
    color: 'from-orange-600 to-red-600',
    category: 'model-theft',
    description: 'Sophisticated techniques to reconstruct private training data from model outputs, revealing sensitive information used during training.',
    features: [
      'Training data reconstruction',
      'Gradient-based inversion',
      'Feature space exploration',
      'Adversarial optimization'
    ],
    useCases: [
      'Data privacy testing',
      'Model security assessment',
      'Training data protection validation',
      'Privacy impact analysis'
    ],
    complexity: 'high',
    example: 'Using gradient information and model outputs to reconstruct facial images from a face recognition model, revealing private biometric data used during training.',
    objectives: [
      'Test data reconstruction vulnerabilities',
      'Assess model privacy leakage',
      'Evaluate gradient protection mechanisms',
      'Validate training data security'
    ],
    defenses: [
      'Gradient noise injection',
      'Secure aggregation protocols',
      'Output perturbation mechanisms',
      'Access control for model internals',
      'Privacy-preserving training techniques'
    ],
    tools: [
      'Gradient-based inversion frameworks',
      'Optimization libraries',
      'Adversarial attack tools',
      'Feature reconstruction algorithms',
      'Privacy attack frameworks'
    ],
    risks: [
      'Exposure of sensitive training data',
      'Privacy violations and identity theft',
      'Regulatory compliance failures',
      'Loss of data confidentiality',
      'Legal and financial liability'
    ],
    ethicalGuidelines: [
      'Only test on models trained with data you own',
      'Never attempt to reconstruct real personal data',
      'Report data reconstruction vulnerabilities responsibly',
      'Respect privacy laws and ethical guidelines',
      'Focus on defensive applications and privacy improvement'
    ]
  },
  {
    id: 'api-key-extraction',
    name: 'API Key and Credential Extraction',
    abbr: 'AKCE',
    icon: '🔑',
    color: 'from-red-600 to-pink-600',
    category: 'model-theft',
    description: 'Extraction of API keys, credentials, and authentication tokens from AI applications and model serving infrastructure.',
    features: [
      'Credential harvesting',
      'Authentication token theft',
      'API key enumeration',
      'Service impersonation'
    ],
    useCases: [
      'Credential security testing',
      'API authentication assessment',
      'Service security validation',
      'Access control testing'
    ],
    complexity: 'medium',
    example: 'Exploiting misconfigured environment variables or logs to extract OpenAI API keys, allowing unauthorized access to premium model services.',
    objectives: [
      'Test credential storage security',
      'Assess API key protection mechanisms',
      'Evaluate authentication systems',
      'Validate access control implementations'
    ],
    defenses: [
      'Secure credential storage (vaults, HSMs)',
      'Environment variable protection',
      'Log sanitization and filtering',
      'API key rotation policies',
      'Least privilege access controls'
    ],
    tools: [
      'Credential scanning tools',
      'Environment variable analyzers',
      'Log analysis platforms',
      'API testing frameworks',
      'Secret detection systems'
    ],
    risks: [
      'Unauthorized API access and usage costs',
      'Service abuse and quota exhaustion',
      'Data access through stolen credentials',
      'Reputational damage',
      'Financial losses from API abuse'
    ],
    ethicalGuidelines: [
      'Only test on systems you own or have permission to test',
      'Never use stolen credentials for unauthorized access',
      'Report credential exposure vulnerabilities immediately',
      'Respect API terms of service',
      'Focus on improving credential security practices'
    ]
  }
];