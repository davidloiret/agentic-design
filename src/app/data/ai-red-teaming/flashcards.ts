import { Flashcard } from '../types';

// Red Team Fundamentals Flashcards
export const redTeamFundamentalsFlashcards: Flashcard[] = [
  {
    id: 'rt-fundamentals-1',
    front: 'What is AI Red Teaming?',
    back: 'Systematic adversarial testing of AI systems to identify vulnerabilities, weaknesses, and failure modes before deployment. It involves simulating real-world attacks to improve system security and robustness.',
    difficulty: 'beginner',
    category: 'Red Team Fundamentals',
    xpReward: 5
  },
  {
    id: 'rt-fundamentals-2',
    front: 'What is the difference between red teaming and penetration testing for AI?',
    back: 'Red teaming is broader and more creative, focusing on achieving objectives by any means. Penetration testing is more structured, focusing on specific vulnerabilities. Red teaming simulates real adversaries while pen testing follows defined methodologies.',
    difficulty: 'intermediate',
    category: 'Red Team Fundamentals',
    xpReward: 8
  },
  {
    id: 'rt-fundamentals-3',
    front: 'What is MITRE ATLAS?',
    back: 'Adversarial Threat Landscape for Artificial-Intelligence Systems - a knowledge base of adversarial tactics, techniques, and procedures (TTPs) specifically for AI systems, modeled after MITRE ATT&CK.',
    difficulty: 'intermediate',
    category: 'Red Team Fundamentals',
    xpReward: 8
  },
  {
    id: 'rt-fundamentals-4',
    front: 'What are the main attack surfaces in AI systems?',
    back: '1) Training data (poisoning), 2) Model architecture (backdoors), 3) Input processing (adversarial examples), 4) Model weights (extraction), 5) Inference API (manipulation), 6) Output interpretation (misleading results).',
    difficulty: 'intermediate',
    category: 'Red Team Fundamentals',
    xpReward: 10
  },
  {
    id: 'rt-fundamentals-5',
    front: 'What is responsible disclosure in AI security?',
    back: 'The practice of privately notifying system owners about vulnerabilities, giving them time to fix issues before public disclosure. Includes clear communication, reasonable timelines, and coordination to minimize harm.',
    difficulty: 'beginner',
    category: 'Red Team Fundamentals',
    xpReward: 5
  },
  {
    id: 'rt-fundamentals-6',
    front: 'What is the AI Kill Chain?',
    back: 'A framework describing stages of an AI attack: 1) Reconnaissance, 2) Resource Development, 3) Initial Access, 4) Model Access, 5) Execution, 6) Persistence, 7) Defense Evasion, 8) Discovery, 9) Collection, 10) Exfiltration, 11) Impact.',
    difficulty: 'advanced',
    category: 'Red Team Fundamentals',
    xpReward: 12
  }
];

// Prompt Injection and Jailbreaking Flashcards
export const promptInjectionFlashcards: Flashcard[] = [
  {
    id: 'prompt-injection-1',
    front: 'What is prompt injection?',
    back: 'A technique where attackers embed malicious instructions within user inputs to manipulate AI behavior, override system prompts, or extract sensitive information from language models.',
    difficulty: 'beginner',
    category: 'Prompt Injection',
    xpReward: 5
  },
  {
    id: 'prompt-injection-2',
    front: 'What is the difference between direct and indirect prompt injection?',
    back: 'Direct injection: Attacker directly inputs malicious prompts. Indirect injection: Malicious content is embedded in external sources (websites, documents) that the AI processes, attacking through third-party content.',
    difficulty: 'intermediate',
    category: 'Prompt Injection',
    xpReward: 8
  },
  {
    id: 'prompt-injection-3',
    front: 'What is jailbreaking in AI context?',
    back: 'Techniques to bypass safety guardrails and restrictions in AI models, making them generate prohibited content or perform restricted actions by exploiting logical inconsistencies or edge cases.',
    difficulty: 'beginner',
    category: 'Prompt Injection',
    xpReward: 5
  },
  {
    id: 'prompt-injection-4',
    front: 'What is the DAN (Do Anything Now) technique?',
    back: 'A jailbreaking method that creates an alternate persona for the AI that supposedly has no restrictions, attempting to bypass safety measures through roleplay and hypothetical scenarios.',
    difficulty: 'intermediate',
    category: 'Prompt Injection',
    xpReward: 8
  },
  {
    id: 'prompt-injection-5',
    front: 'How do prompt firewalls work?',
    back: 'Security layers that analyze prompts before processing, detecting malicious patterns, injection attempts, and policy violations. They use pattern matching, semantic analysis, and ML-based detection.',
    difficulty: 'intermediate',
    category: 'Prompt Injection',
    xpReward: 10
  },
  {
    id: 'prompt-injection-6',
    front: 'What is prompt sandboxing?',
    back: 'Isolating prompt execution in controlled environments with limited capabilities, preventing malicious prompts from accessing sensitive functions or data while maintaining functionality.',
    difficulty: 'advanced',
    category: 'Prompt Injection',
    xpReward: 12
  }
];

// Adversarial Testing Flashcards
export const adversarialTestingFlashcards: Flashcard[] = [
  {
    id: 'adversarial-1',
    front: 'What is an adversarial example?',
    back: 'Input data intentionally modified with small, often imperceptible perturbations that cause AI models to make incorrect predictions while appearing unchanged to humans.',
    difficulty: 'beginner',
    category: 'Adversarial Testing',
    xpReward: 5
  },
  {
    id: 'adversarial-2',
    front: 'What is FGSM (Fast Gradient Sign Method)?',
    back: 'An efficient one-step adversarial attack that uses the sign of the gradient with respect to the input to create perturbations, multiplied by a small epsilon value.',
    difficulty: 'intermediate',
    category: 'Adversarial Testing',
    xpReward: 8
  },
  {
    id: 'adversarial-3',
    front: 'What is PGD (Projected Gradient Descent)?',
    back: 'An iterative adversarial attack that repeatedly applies gradient-based perturbations and projects back to an epsilon ball, considered one of the strongest first-order attacks.',
    difficulty: 'intermediate',
    category: 'Adversarial Testing',
    xpReward: 10
  },
  {
    id: 'adversarial-4',
    front: 'What is data poisoning?',
    back: 'Attacks that corrupt training data to compromise model behavior, including label flipping, backdoor insertion, and gradient matching to influence the learned model.',
    difficulty: 'intermediate',
    category: 'Adversarial Testing',
    xpReward: 8
  },
  {
    id: 'adversarial-5',
    front: 'What is model extraction/stealing?',
    back: 'Attacks that recreate a target model functionality through API queries, using the responses to train a substitute model that mimics the original behavior.',
    difficulty: 'intermediate',
    category: 'Adversarial Testing',
    xpReward: 10
  },
  {
    id: 'adversarial-6',
    front: 'What is a membership inference attack?',
    back: 'Privacy attacks that determine whether specific data points were part of a models training set by analyzing prediction confidence and behavior patterns.',
    difficulty: 'advanced',
    category: 'Adversarial Testing',
    xpReward: 12
  },
  {
    id: 'adversarial-7',
    front: 'What is transferability in adversarial attacks?',
    back: 'The phenomenon where adversarial examples crafted for one model often fool other models, even with different architectures, enabling black-box attacks.',
    difficulty: 'advanced',
    category: 'Adversarial Testing',
    xpReward: 12
  }
];

// Security Frameworks Flashcards
export const securityFrameworksFlashcards: Flashcard[] = [
  {
    id: 'frameworks-1',
    front: 'What are the four core functions of NIST AI RMF?',
    back: 'GOVERN (cultivate risk culture), MAP (understand context and risks), MEASURE (analyze and track risks), and MANAGE (act on risks through prioritization and response).',
    difficulty: 'intermediate',
    category: 'Security Frameworks',
    xpReward: 10
  },
  {
    id: 'frameworks-2',
    front: 'What is STRIDE-AI?',
    back: 'An AI-adapted threat modeling framework: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege - applied to AI system components.',
    difficulty: 'intermediate',
    category: 'Security Frameworks',
    xpReward: 8
  },
  {
    id: 'frameworks-3',
    front: 'What are the key metrics for AI security evaluation?',
    back: 'Robustness (adversarial accuracy, certified radius), Privacy (membership inference AUC, DP epsilon), Fairness (demographic parity, equalized odds), and Security (attack success rate, detection rate).',
    difficulty: 'advanced',
    category: 'Security Frameworks',
    xpReward: 12
  },
  {
    id: 'frameworks-4',
    front: 'What is the EU AI Act risk categorization?',
    back: 'Four levels: Minimal Risk (most AI), Limited Risk (chatbots), High Risk (critical infrastructure, employment), and Unacceptable Risk (social scoring, real-time biometric identification).',
    difficulty: 'intermediate',
    category: 'Security Frameworks',
    xpReward: 10
  },
  {
    id: 'frameworks-5',
    front: 'What is continuous security monitoring for AI?',
    back: 'Real-time monitoring of input distributions, output patterns, performance metrics, adversarial indicators, privacy violations, and fairness drift to detect and respond to threats.',
    difficulty: 'advanced',
    category: 'Security Frameworks',
    xpReward: 12
  }
];

// Defense Mechanisms Flashcards
export const defenseMechanismsFlashcards: Flashcard[] = [
  {
    id: 'defense-1',
    front: 'What is adversarial training?',
    back: 'A defense technique that trains models on both clean and adversarial examples to improve robustness against attacks, typically using methods like PGD or FGSM during training.',
    difficulty: 'intermediate',
    category: 'Defense Mechanisms',
    xpReward: 8
  },
  {
    id: 'defense-2',
    front: 'What is randomized smoothing?',
    back: 'A certified defense that provides provable robustness guarantees by analyzing model predictions on multiple noisy versions of inputs and using statistical bounds.',
    difficulty: 'advanced',
    category: 'Defense Mechanisms',
    xpReward: 12
  },
  {
    id: 'defense-3',
    front: 'What is differential privacy in AI?',
    back: 'A mathematical framework that limits information leakage about individual training data points by adding calibrated noise during training (DP-SGD) or inference.',
    difficulty: 'advanced',
    category: 'Defense Mechanisms',
    xpReward: 12
  },
  {
    id: 'defense-4',
    front: 'What is input sanitization for AI?',
    back: 'Pre-processing techniques that validate, normalize, and clean inputs before model inference, including format checking, range enforcement, and anomaly detection.',
    difficulty: 'beginner',
    category: 'Defense Mechanisms',
    xpReward: 5
  },
  {
    id: 'defense-5',
    front: 'What is ensemble defense?',
    back: 'Using multiple diverse models for predictions, leveraging disagreement detection and voting mechanisms to improve robustness and detect potential attacks.',
    difficulty: 'intermediate',
    category: 'Defense Mechanisms',
    xpReward: 10
  },
  {
    id: 'defense-6',
    front: 'What is TRADES in adversarial defense?',
    back: 'TRadeoff-inspired Adversarial Defense via Surrogate-loss minimization - balances natural accuracy and adversarial robustness using KL divergence between clean and adversarial predictions.',
    difficulty: 'advanced',
    category: 'Defense Mechanisms',
    xpReward: 15
  },
  {
    id: 'defense-7',
    front: 'What is gradient masking (and why is it problematic)?',
    back: 'A flawed defense that hides gradients to prevent gradient-based attacks. Problematic because it provides false security - attacks can still succeed using gradient-free methods or transfer attacks.',
    difficulty: 'advanced',
    category: 'Defense Mechanisms',
    xpReward: 12
  }
];

// Privacy and Compliance Flashcards
export const privacyComplianceFlashcards: Flashcard[] = [
  {
    id: 'privacy-1',
    front: 'What is model inversion attack?',
    back: 'Privacy attacks that reconstruct training data or sensitive attributes from model outputs, potentially revealing private information used during training.',
    difficulty: 'advanced',
    category: 'Privacy & Compliance',
    xpReward: 12
  },
  {
    id: 'privacy-2',
    front: 'What is federated learning security?',
    back: 'Security considerations for distributed training including gradient leakage, Byzantine attacks, model poisoning, and privacy preservation across multiple participants.',
    difficulty: 'advanced',
    category: 'Privacy & Compliance',
    xpReward: 15
  },
  {
    id: 'privacy-3',
    front: 'What are GDPR requirements for AI systems?',
    back: 'Right to explanation, data minimization, purpose limitation, privacy by design, data protection impact assessments (DPIA), and right to erasure considerations for AI.',
    difficulty: 'intermediate',
    category: 'Privacy & Compliance',
    xpReward: 10
  },
  {
    id: 'privacy-4',
    front: 'What is homomorphic encryption in AI?',
    back: 'Encryption that allows computation on encrypted data without decrypting it, enabling privacy-preserving machine learning on sensitive data.',
    difficulty: 'advanced',
    category: 'Privacy & Compliance',
    xpReward: 15
  },
  {
    id: 'privacy-5',
    front: 'What is secure multi-party computation (MPC) for AI?',
    back: 'Cryptographic protocols that enable multiple parties to jointly compute ML models on their combined data without revealing individual datasets.',
    difficulty: 'advanced',
    category: 'Privacy & Compliance',
    xpReward: 15
  }
];

// Red Team Operations Flashcards
export const redTeamOperationsFlashcards: Flashcard[] = [
  {
    id: 'operations-1',
    front: 'What is purple teaming in AI security?',
    back: 'Collaborative approach where red team (attackers) and blue team (defenders) work together to improve AI security, sharing knowledge and techniques in real-time.',
    difficulty: 'intermediate',
    category: 'Red Team Operations',
    xpReward: 8
  },
  {
    id: 'operations-2',
    front: 'What is a threat model for AI systems?',
    back: 'Structured representation of potential threats including adversary capabilities, goals, knowledge, access levels, and resources, used to guide security testing.',
    difficulty: 'intermediate',
    category: 'Red Team Operations',
    xpReward: 10
  },
  {
    id: 'operations-3',
    front: 'What is automated red teaming?',
    back: 'Using AI and automation tools to continuously generate and execute adversarial tests, including fuzzing, evolutionary algorithms, and reinforcement learning for attack generation.',
    difficulty: 'advanced',
    category: 'Red Team Operations',
    xpReward: 12
  },
  {
    id: 'operations-4',
    front: 'What are red team metrics and KPIs?',
    back: 'Attack success rate, time to compromise, detection rate, mean time to detection (MTTD), attack surface coverage, vulnerability severity distribution, and remediation effectiveness.',
    difficulty: 'intermediate',
    category: 'Red Team Operations',
    xpReward: 10
  },
  {
    id: 'operations-5',
    front: 'What is a red team engagement lifecycle?',
    back: 'Planning → Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives → Reporting → Remediation Verification.',
    difficulty: 'intermediate',
    category: 'Red Team Operations',
    xpReward: 10
  }
];

// Export all flashcard collections
export const allRedTeamingFlashcards: Flashcard[] = [
  ...redTeamFundamentalsFlashcards,
  ...promptInjectionFlashcards,
  ...adversarialTestingFlashcards,
  ...securityFrameworksFlashcards,
  ...defenseMechanismsFlashcards,
  ...privacyComplianceFlashcards,
  ...redTeamOperationsFlashcards
];