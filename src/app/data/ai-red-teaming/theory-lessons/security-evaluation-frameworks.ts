import { TheoryLesson } from '../../types';

export const securityEvaluationFrameworksLesson: TheoryLesson = {
  id: 'security-evaluation-frameworks',
  title: 'Security Evaluation Frameworks: Systematic AI Risk Assessment',
  description: 'Learn structured methodologies for assessing AI system vulnerabilities and ensuring compliance',
  estimatedTime: 45,
  difficulty: 'advanced',
  xpReward: 180,
  content: {
    introduction: `Security evaluation frameworks provide structured methodologies for assessing AI system vulnerabilities, measuring security posture, and ensuring compliance with standards. This lesson covers major frameworks like MITRE ATLAS, NIST AI RMF, and custom evaluation methodologies for comprehensive security assessment.`,

    sections: [
      {
        title: 'MITRE ATLAS Framework',
        content: `MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) provides a knowledge base of adversarial tactics, techniques, and procedures (TTPs) targeting AI systems. It helps organizations understand and defend against AI-specific threats.`
      },
      {
        title: 'NIST AI Risk Management Framework',
        content: `The NIST AI RMF offers a comprehensive approach to managing AI risks through four core functions: Govern, Map, Measure, and Manage. It emphasizes trustworthy AI characteristics including validity, reliability, safety, security, and fairness.`
      },
      {
        title: 'OWASP Top 10 for LLMs',
        content: `OWASP's Top 10 for Large Language Models identifies the most critical security risks specific to LLM applications, including prompt injection, data leakage, inadequate sandboxing, and supply chain vulnerabilities.`
      },
      {
        title: 'Custom Evaluation Methodologies',
        content: `Organizations often develop custom frameworks tailored to their specific use cases, combining elements from established frameworks with domain-specific requirements and threat models.`
      },
      {
        title: 'Continuous Security Monitoring',
        content: `Implementing continuous monitoring systems to detect anomalies, track security metrics, and respond to emerging threats in real-time is essential for maintaining AI system security.`
      }
    ],

    keyTakeaways: [
      'Frameworks provide structured approaches to AI security',
      'Different frameworks address different aspects of AI risk',
      'Combining multiple frameworks offers comprehensive coverage',
      'Regular assessment and updates are crucial for effective security'
    ]
  }
};