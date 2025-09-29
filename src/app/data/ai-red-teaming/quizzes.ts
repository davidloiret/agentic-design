import { Quiz } from '../types';

// Red Team Fundamentals Quiz
export const redTeamFundamentalsQuiz: Quiz = {
  id: 'red-team-fundamentals',
  title: 'Red Team Fundamentals',
  description: 'Test your knowledge of AI red teaming basics and methodologies',
  difficulty: 'intermediate',
  xpReward: 50,
  questions: [
    {
      id: 'rtf-1',
      difficulty: 'intermediate',
      question: 'What is the primary goal of AI red teaming?',
      options: [
        'To improve model accuracy',
        'To identify vulnerabilities before deployment',
        'To reduce training costs',
        'To increase inference speed'
      ],
      correctAnswer: 1,
      explanation: 'AI red teaming aims to identify vulnerabilities, weaknesses, and failure modes before deployment to improve security and robustness.',
    },
    {
      id: 'rtf-2',
      difficulty: 'intermediate',
      question: 'Which framework provides adversarial tactics and techniques for AI systems?',
      options: [
        'OWASP Top 10',
        'ISO 27001',
        'MITRE ATLAS',
        'PCI DSS'
      ],
      correctAnswer: 2,
      explanation: 'MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) provides a knowledge base of adversarial TTPs for AI.',
    },
    {
      id: 'rtf-3',
      difficulty: 'intermediate',
      question: 'What is NOT typically an AI system attack surface?',
      options: [
        'Training data',
        'Model architecture',
        'CPU temperature',
        'Inference API'
      ],
      correctAnswer: 2,
      explanation: 'CPU temperature is not an attack surface. Common AI attack surfaces include training data, model architecture, inputs, and APIs.',
    },
    {
      id: 'rtf-4',
      difficulty: 'intermediate',
      question: 'What is the correct order of the AI Kill Chain?',
      options: [
        'Access → Execute → Persist → Impact',
        'Reconnaissance → Initial Access → Execution → Impact',
        'Scan → Exploit → Maintain → Exfiltrate',
        'Discover → Compromise → Control → Destroy'
      ],
      correctAnswer: 1,
      explanation: 'The AI Kill Chain follows: Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Impact.',
    },
    {
      id: 'rtf-5',
      difficulty: 'intermediate',
      question: 'What is responsible disclosure in AI security?',
      options: [
        'Immediately publishing all vulnerabilities',
        'Never reporting vulnerabilities',
        'Privately notifying owners with time to fix',
        'Only disclosing to government agencies'
      ],
      correctAnswer: 2,
      explanation: 'Responsible disclosure involves privately notifying system owners and giving them reasonable time to fix issues before public disclosure.',
    },
    {
      id: 'rtf-6',
      difficulty: 'intermediate',
      question: 'Which is a key difference between red teaming and penetration testing?',
      options: [
        'Red teaming is automated, pen testing is manual',
        'Red teaming is creative and goal-oriented, pen testing follows specific methodologies',
        'Red teaming is cheaper than pen testing',
        'Red teaming only tests software, pen testing tests hardware'
      ],
      correctAnswer: 1,
      explanation: 'Red teaming is more creative and focuses on achieving objectives by any means, while pen testing follows structured methodologies.',
    }
  ]
};

// Prompt Injection and Jailbreaking Quiz
export const promptInjectionQuiz: Quiz = {
  id: 'prompt-injection-jailbreaking',
  title: 'Prompt Injection & Jailbreaking',
  description: 'Test your understanding of prompt-based attacks and defenses',
  difficulty: 'advanced',
  xpReward: 60,
  questions: [
    {
      id: 'pij-1',
      difficulty: 'intermediate',
      question: 'What is indirect prompt injection?',
      options: [
        'Injecting prompts through voice commands',
        'Embedding malicious content in external sources the AI processes',
        'Using special characters in prompts',
        'Injecting prompts via API calls'
      ],
      correctAnswer: 1,
      explanation: 'Indirect prompt injection embeds malicious content in external sources (websites, documents) that the AI processes.',
    },
    {
      id: 'pij-2',
      difficulty: 'intermediate',
      question: 'Which defense is most effective against prompt injection?',
      options: [
        'Rate limiting',
        'Input length restrictions',
        'Prompt firewalls with semantic analysis',
        'CAPTCHA verification'
      ],
      correctAnswer: 2,
      explanation: 'Prompt firewalls that perform semantic analysis can detect and block malicious prompt patterns effectively.',
    },
    {
      id: 'pij-3',
      difficulty: 'intermediate',
      question: 'What is the DAN (Do Anything Now) technique?',
      options: [
        'A data augmentation method',
        'A jailbreaking method using alternate personas',
        'A defense mechanism',
        'A training algorithm'
      ],
      correctAnswer: 1,
      explanation: 'DAN is a jailbreaking technique that creates an alternate persona supposedly without restrictions to bypass safety measures.',
    },
    {
      id: 'pij-4',
      difficulty: 'intermediate',
      question: 'What is prompt sandboxing?',
      options: [
        'Testing prompts in development',
        'Storing prompts in isolated databases',
        'Isolating prompt execution with limited capabilities',
        'Encrypting prompts before processing'
      ],
      correctAnswer: 2,
      explanation: 'Prompt sandboxing isolates prompt execution in controlled environments with limited capabilities to prevent malicious access.',
    },
    {
      id: 'pij-5',
      difficulty: 'intermediate',
      question: 'Which is NOT a common jailbreaking technique?',
      options: [
        'Hypothetical scenarios',
        'Role-playing',
        'Gradient descent',
        'Encoding/obfuscation'
      ],
      correctAnswer: 2,
      explanation: 'Gradient descent is an optimization algorithm, not a jailbreaking technique. Common techniques include roleplay and encoding.',
    },
    {
      id: 'pij-6',
      difficulty: 'intermediate',
      question: 'What makes compositional jailbreaking effective?',
      options: [
        'It uses multiple GPUs',
        'It combines multiple benign requests into harmful ones',
        'It compresses prompts',
        'It uses quantum computing'
      ],
      correctAnswer: 1,
      explanation: 'Compositional jailbreaking combines multiple seemingly benign requests that together achieve a harmful objective.',
    }
  ]
};

// Adversarial Testing Quiz
export const adversarialTestingQuiz: Quiz = {
  id: 'adversarial-testing',
  title: 'Adversarial Testing Patterns',
  description: 'Evaluate your knowledge of adversarial attacks and testing methods',
  difficulty: 'advanced',
  xpReward: 70,
  questions: [
    {
      id: 'at-1',
      difficulty: 'intermediate',
      question: 'What makes FGSM efficient compared to other attacks?',
      options: [
        'It uses multiple iterations',
        'It requires less training data',
        'It computes perturbations in one step',
        'It works on encrypted models'
      ],
      correctAnswer: 2,
      explanation: 'FGSM (Fast Gradient Sign Method) is efficient because it creates adversarial examples in a single step using gradient signs.',
    },
    {
      id: 'at-2',
      difficulty: 'intermediate',
      question: 'What is the key difference between FGSM and PGD attacks?',
      options: [
        'FGSM is iterative, PGD is one-step',
        'PGD is iterative with projection, FGSM is one-step',
        'FGSM works on images, PGD works on text',
        'There is no difference'
      ],
      correctAnswer: 1,
      explanation: 'PGD (Projected Gradient Descent) is an iterative attack with projection back to epsilon ball, while FGSM is a one-step attack.',
    },
    {
      id: 'at-3',
      difficulty: 'intermediate',
      question: 'What is data poisoning?',
      options: [
        'Corrupting model weights',
        'Corrupting training data to compromise model behavior',
        'Adding noise to test data',
        'Deleting training data'
      ],
      correctAnswer: 1,
      explanation: 'Data poisoning attacks corrupt training data to influence model behavior when trained on the poisoned dataset.',
    },
    {
      id: 'at-4',
      difficulty: 'intermediate',
      question: 'What enables black-box adversarial attacks?',
      options: [
        'Direct model access',
        'Training data access',
        'Adversarial transferability',
        'Source code access'
      ],
      correctAnswer: 2,
      explanation: 'Adversarial transferability - examples crafted for one model often fool other models - enables black-box attacks.',
    },
    {
      id: 'at-5',
      difficulty: 'intermediate',
      question: 'What is a membership inference attack trying to determine?',
      options: [
        'Model architecture',
        'Whether specific data was in the training set',
        'Model hyperparameters',
        'Training algorithm used'
      ],
      correctAnswer: 1,
      explanation: 'Membership inference attacks determine whether specific data points were part of the models training set.',
    },
    {
      id: 'at-6',
      difficulty: 'intermediate',
      question: 'Which attack aims to recreate model functionality through queries?',
      options: [
        'Data poisoning',
        'Adversarial examples',
        'Model extraction',
        'Denial of service'
      ],
      correctAnswer: 2,
      explanation: 'Model extraction attacks recreate target model functionality by querying the API and training a substitute model.',
    },
    {
      id: 'at-7',
      difficulty: 'intermediate',
      question: 'What is the Carlini-Wagner (C&W) attack known for?',
      options: [
        'Speed of execution',
        'Strong adversarial examples with minimal distortion',
        'Working without gradients',
        'Attacking only text models'
      ],
      correctAnswer: 1,
      explanation: 'The Carlini-Wagner attack is known for generating strong adversarial examples with minimal perceptible distortion.',
    }
  ]
};

// Defense Mechanisms Quiz
export const defenseMechanismsQuiz: Quiz = {
  id: 'defense-mechanisms',
  title: 'AI Defense Mechanisms',
  description: 'Test your knowledge of defensive strategies and techniques',
  difficulty: 'advanced',
  xpReward: 65,
  questions: [
    {
      id: 'dm-1',
      difficulty: 'intermediate',
      question: 'What is the main principle of adversarial training?',
      options: [
        'Training faster models',
        'Training on clean and adversarial examples',
        'Training with more data',
        'Training with regularization'
      ],
      correctAnswer: 1,
      explanation: 'Adversarial training improves robustness by training models on both clean and adversarial examples.',
    },
    {
      id: 'dm-2',
      difficulty: 'intermediate',
      question: 'What does randomized smoothing provide?',
      options: [
        'Faster inference',
        'Better accuracy on clean data',
        'Certified robustness guarantees',
        'Smaller model size'
      ],
      correctAnswer: 2,
      explanation: 'Randomized smoothing provides certified robustness guarantees through statistical analysis of noisy predictions.',
    },
    {
      id: 'dm-3',
      difficulty: 'intermediate',
      question: 'What is TRADES optimizing for?',
      options: [
        'Training speed',
        'Model size',
        'Balance between natural and adversarial accuracy',
        'Memory usage'
      ],
      correctAnswer: 2,
      explanation: 'TRADES balances natural accuracy and adversarial robustness using KL divergence between clean and adversarial predictions.',
    },
    {
      id: 'dm-4',
      difficulty: 'intermediate',
      question: 'Why is gradient masking considered a flawed defense?',
      options: [
        'It slows down inference',
        'It reduces clean accuracy',
        'Attacks can succeed using gradient-free methods',
        'It requires too much memory'
      ],
      correctAnswer: 2,
      explanation: 'Gradient masking provides false security as attacks can still succeed using gradient-free or transfer attacks.',
    },
    {
      id: 'dm-5',
      difficulty: 'intermediate',
      question: 'What is differential privacy protecting against?',
      options: [
        'Adversarial examples',
        'Information leakage about training data',
        'Model extraction',
        'Denial of service'
      ],
      correctAnswer: 1,
      explanation: 'Differential privacy protects against information leakage about individual training data points.',
    },
    {
      id: 'dm-6',
      difficulty: 'intermediate',
      question: 'What is the advantage of ensemble defenses?',
      options: [
        'Lower computational cost',
        'Diversity makes attacks harder and enables disagreement detection',
        'Simpler implementation',
        'Smaller model size'
      ],
      correctAnswer: 1,
      explanation: 'Ensemble defenses leverage diversity to make attacks harder and can detect attacks through model disagreement.',
    }
  ]
};

// Security Frameworks Quiz
export const securityFrameworksQuiz: Quiz = {
  id: 'security-frameworks',
  title: 'Security Evaluation Frameworks',
  description: 'Assess your understanding of AI security frameworks and standards',
  difficulty: 'intermediate',
  xpReward: 55,
  questions: [
    {
      id: 'sf-1',
      difficulty: 'intermediate',
      question: 'What are the four core functions of NIST AI RMF?',
      options: [
        'Plan, Do, Check, Act',
        'Identify, Protect, Detect, Respond',
        'Govern, Map, Measure, Manage',
        'Design, Build, Test, Deploy'
      ],
      correctAnswer: 2,
      explanation: 'The NIST AI RMF core functions are Govern, Map, Measure, and Manage.',
    },
    {
      id: 'sf-2',
      difficulty: 'intermediate',
      question: 'What does MITRE ATLAS provide?',
      options: [
        'Model training tools',
        'Knowledge base of adversarial tactics and techniques',
        'Cloud deployment services',
        'Data labeling platform'
      ],
      correctAnswer: 1,
      explanation: 'MITRE ATLAS provides a knowledge base of adversarial tactics, techniques, and procedures for AI systems.',
    },
    {
      id: 'sf-3',
      difficulty: 'intermediate',
      question: 'Which is NOT a trustworthiness characteristic in NIST AI RMF?',
      options: [
        'Valid and Reliable',
        'Cost-Effective',
        'Privacy-Enhanced',
        'Accountable and Transparent'
      ],
      correctAnswer: 1,
      explanation: 'Cost-effectiveness is not a trustworthiness characteristic. The characteristics focus on validity, safety, security, accountability, explainability, privacy, and fairness.',
    },
    {
      id: 'sf-4',
      difficulty: 'intermediate',
      question: 'What risk level in EU AI Act prohibits systems?',
      options: [
        'High Risk',
        'Critical Risk',
        'Unacceptable Risk',
        'Extreme Risk'
      ],
      correctAnswer: 2,
      explanation: 'The EU AI Act Unacceptable Risk category prohibits AI systems like social scoring and real-time biometric identification.',
    },
    {
      id: 'sf-5',
      difficulty: 'intermediate',
      question: 'What is the purpose of continuous security monitoring?',
      options: [
        'Reduce costs',
        'Detect and respond to threats in real-time',
        'Improve accuracy',
        'Compress models'
      ],
      correctAnswer: 1,
      explanation: 'Continuous security monitoring detects and responds to security threats and anomalies in real-time.',
    },
    {
      id: 'sf-6',
      difficulty: 'intermediate',
      question: 'What does STRIDE stand for in threat modeling?',
      options: [
        'Security, Trust, Reliability, Integrity, Defense, Encryption',
        'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege',
        'System, Threat, Risk, Impact, Defense, Evaluation',
        'None of the above'
      ],
      correctAnswer: 1,
      explanation: 'STRIDE stands for Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.',
    }
  ]
};

// Advanced Red Teaming Quiz
export const advancedRedTeamingQuiz: Quiz = {
  id: 'advanced-red-teaming',
  title: 'Advanced Red Team Operations',
  description: 'Challenge yourself with advanced red teaming concepts',
  difficulty: 'expert',
  xpReward: 80,
  questions: [
    {
      id: 'art-1',
      difficulty: 'intermediate',
      question: 'What is Byzantine fault tolerance in federated learning?',
      options: [
        'Tolerance for network delays',
        'Resistance to malicious participants sending arbitrary updates',
        'Ability to handle missing data',
        'Support for different model architectures'
      ],
      correctAnswer: 1,
      explanation: 'Byzantine fault tolerance ensures federated learning systems can handle malicious participants sending arbitrary or harmful updates.',
    },
    {
      id: 'art-2',
      difficulty: 'intermediate',
      question: 'What is homomorphic encryption advantage for AI?',
      options: [
        'Faster training',
        'Computation on encrypted data without decryption',
        'Smaller model size',
        'Better accuracy'
      ],
      correctAnswer: 1,
      explanation: 'Homomorphic encryption allows computation on encrypted data without decrypting it, enabling privacy-preserving ML.',
    },
    {
      id: 'art-3',
      difficulty: 'intermediate',
      question: 'What is purple teaming?',
      options: [
        'Automated testing',
        'Collaborative approach between red and blue teams',
        'Testing purple-colored interfaces',
        'Using purple noise in testing'
      ],
      correctAnswer: 1,
      explanation: 'Purple teaming is a collaborative approach where red team (attackers) and blue team (defenders) work together.',
    },
    {
      id: 'art-4',
      difficulty: 'intermediate',
      question: 'What enables automated red teaming?',
      options: [
        'Manual test scripts',
        'AI, fuzzing, evolutionary algorithms, and RL',
        'Static code analysis',
        'Penetration testing tools'
      ],
      correctAnswer: 1,
      explanation: 'Automated red teaming uses AI, fuzzing, evolutionary algorithms, and reinforcement learning for continuous attack generation.',
    },
    {
      id: 'art-5',
      difficulty: 'intermediate',
      question: 'What is the main challenge in defending against adaptive attackers?',
      options: [
        'They are faster',
        'They learn and adapt to defenses',
        'They use more resources',
        'They have insider knowledge'
      ],
      correctAnswer: 1,
      explanation: 'Adaptive attackers learn from defensive responses and modify their strategies to bypass updated defenses.',
    },
    {
      id: 'art-6',
      difficulty: 'intermediate',
      question: 'What is a supply chain attack in ML context?',
      options: [
        'Attacking data warehouses',
        'Compromising pre-trained models, datasets, or ML libraries',
        'Disrupting GPU shipments',
        'Blocking API access'
      ],
      correctAnswer: 1,
      explanation: 'ML supply chain attacks compromise pre-trained models, public datasets, or ML libraries that others depend on.',
    }
  ]
};

// Export all quizzes
export const allRedTeamingQuizzes: Quiz[] = [
  redTeamFundamentalsQuiz,
  promptInjectionQuiz,
  adversarialTestingQuiz,
  defenseMechanismsQuiz,
  securityFrameworksQuiz,
  advancedRedTeamingQuiz
];