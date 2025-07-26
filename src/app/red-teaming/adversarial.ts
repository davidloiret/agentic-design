import { RedTeamingTechnique } from './types';

export const adversarialTechniques: RedTeamingTechnique[] = [
  {
    id: 'adversarial-examples',
    name: 'Adversarial Examples',
    abbr: 'AE',
    icon: '⚡',
    color: 'from-yellow-500 to-red-500',
    category: 'adversarial',
    description: 'Crafted inputs designed to fool AI models into making incorrect predictions or classifications.',
    features: [
      'Perturbation-based attacks',
      'Gradient-based optimization',
      'Targeted misclassification',
      'Transferability testing'
    ],
    useCases: [
      'Model robustness testing',
      'Defense mechanism evaluation',
      'Security assessment',
      'Failure mode analysis'
    ],
    complexity: 'high',
    example: 'Adding imperceptible noise to an image that causes a 99% confident "cat" classification to become 99% confident "dog".',
    objectives: [
      'Test model robustness',
      'Evaluate attack surfaces',
      'Assess defense mechanisms',
      'Understand failure modes'
    ],
    defenses: [
      'Adversarial training',
      'Input preprocessing and filtering',
      'Ensemble defense methods',
      'Certified robustness approaches',
      'Detection mechanisms'
    ],
    tools: [
      'FGSM (Fast Gradient Sign Method)',
      'PGD (Projected Gradient Descent)',
      'C&W attacks',
      'AutoAttack framework'
    ],
    risks: [
      'Model reliability compromise',
      'Security system bypass',
      'Critical system failures',
      'Malicious exploitation'
    ],
    ethicalGuidelines: [
      'Test only on owned or authorized systems',
      'Consider real-world impact of vulnerabilities',
      'Share findings with security community',
      'Avoid weaponizing techniques'
    ]
  },
  {
    id: 'evasion-attacks',
    name: 'Evasion Attacks',
    abbr: 'EA',
    icon: '👻',
    color: 'from-indigo-500 to-red-500',
    category: 'adversarial',
    description: 'Techniques to evade detection systems and security mechanisms through input manipulation.',
    features: [
      'Detection system bypass',
      'Pattern obfuscation',
      'Steganographic techniques',
      'Behavioral mimicry'
    ],
    useCases: [
      'Security system testing',
      'Detection accuracy evaluation',
      'False negative assessment',
      'Robustness validation'
    ],
    complexity: 'medium',
    example: 'Modifying malicious code patterns to evade AI-based security scanners while maintaining functionality.',
    objectives: [
      'Test detection capabilities',
      'Evaluate false negative rates',
      'Assess evasion resistance',
      'Identify blind spots'
    ],
    defenses: [
      'Multi-modal detection systems',
      'Ensemble-based approaches',
      'Continuous learning mechanisms',
      'Behavioral analysis',
      'Anomaly detection systems'
    ],
    tools: [
      'Evasion testing frameworks',
      'Pattern obfuscation tools',
      'Steganography libraries'
    ],
    risks: [
      'Security system compromise',
      'Undetected threats',
      'False sense of security',
      'Systematic vulnerabilities'
    ],
    ethicalGuidelines: [
      'Focus on improving detection systems',
      'Responsible vulnerability disclosure',
      'Consider defensive applications',
      'Avoid enabling malicious actors'
    ]
  }
];