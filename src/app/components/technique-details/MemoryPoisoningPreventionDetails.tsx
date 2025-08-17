'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface MemoryPoisoningPreventionDetailsProps {
  selectedTechnique: any;
}

export const MemoryPoisoningPreventionDetails: React.FC<MemoryPoisoningPreventionDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Validate Input', detail: 'Check for injection & manipulation attempts' },
      { num: '2', action: 'Sign Updates', detail: 'Cryptographic signatures on memory writes' },
      { num: '3', action: 'Verify Integrity', detail: 'Merkle trees & checksums for chunks' },
      { num: '4', action: 'Detect Anomalies', detail: 'Score patterns for unusual changes' },
      { num: '5', action: 'Sanitize & Backup', detail: 'Regular consolidation & recovery points' }
    ],
    example: 'input_validation → signature_verification → integrity_check → anomaly_detection → sanitization'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement cryptographic signing for all memory updates', icon: '✅' },
    { type: 'do', text: 'Use Merkle trees for efficient integrity verification', icon: '✅' },
    { type: 'do', text: 'Maintain immutable audit logs of memory operations', icon: '✅' },
    { type: 'do', text: 'Perform regular memory consolidation and pruning', icon: '✅' },
    { type: 'do', text: 'Create differential backups for rollback capability', icon: '✅' },
    { type: 'dont', text: 'Allow direct memory writes without validation', icon: '❌' },
    { type: 'dont', text: 'Trust memory content without verification', icon: '❌' },
    { type: 'dont', text: 'Skip anomaly detection for "trusted" sources', icon: '❌' },
    { type: 'dont', text: 'Store sensitive data without encryption', icon: '❌' },
    { type: 'dont', text: 'Ignore contradictory or conflicting entries', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Long-running conversational agents',
      'Persistent AI systems',
      'Multi-user environments',
      'Memory-dependent applications'
    ],
    avoidWhen: [
      'Stateless operations only',
      'Single-session interactions',
      'Read-only memory systems',
      'Ephemeral deployments'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Injection Blocked', measure: 'Malicious attempts prevented/month' },
    { metric: 'Memory Integrity', measure: '% of verified memory chunks' },
    { metric: 'False Memory Rate', measure: 'Incorrect entries detected' },
    { metric: 'Recovery Time', measure: 'Minutes to restore from corruption' },
    { metric: 'Validation Latency', measure: 'ms per memory operation' },
    { metric: 'Storage Efficiency', measure: 'Compression ratio after sanitization' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Customer Service: Prevent preference manipulation & false history injection',
    'Personal Assistants: Protect user data from adversarial memory corruption',
    'Enterprise AI: Ensure business knowledge base integrity across sessions',
    'Educational Bots: Maintain accurate learning progress without tampering',
    'Healthcare AI: Protect patient interaction history from malicious updates'
  ];

  const references = [
    {
      title: 'Primary Research & Threat Analysis',
      items: [
        { title: 'OWASP Agentic Security Initiative - Memory Poisoning Threats (2025)', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/' },
        { title: 'Poisoning Language Models During Instruction Tuning (2023)', url: 'https://arxiv.org/abs/2305.00944' },
        { title: 'BadNets: Identifying Vulnerabilities in the Machine Learning Model Supply Chain (2019)', url: 'https://arxiv.org/abs/1708.06733' },
        { title: 'Data Poisoning Attacks Against Federated Learning Systems (2022)', url: 'https://arxiv.org/abs/2011.01767' }
      ]
    },
    {
      title: 'Memory Security Techniques',
      items: [
        { title: 'Merkle Trees for Blockchain and Beyond (ACM Computing Surveys, 2021)', url: 'https://dl.acm.org/doi/10.1145/3446373' },
        { title: 'Cryptographic Hash Functions: Recent Design Trends (2023)', url: 'https://link.springer.com/article/10.1007/s00145-023-09452-0' },
        { title: 'Secure Multi-party Computation for Privacy-Preserving Data Mining (2021)', url: 'https://ieeexplore.ieee.org/document/9340259' },
        { title: 'Byzantine Fault Tolerance in Distributed Systems (2022)', url: 'https://dl.acm.org/doi/10.1145/3538643' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'LangChain Memory Security Modules', url: 'https://python.langchain.com/docs/modules/memory/security' },
        { title: 'Pinecone - Vector Database Security Best Practices', url: 'https://docs.pinecone.io/docs/security' },
        { title: 'Weaviate - Data Security and Privacy Features', url: 'https://weaviate.io/developers/weaviate/concepts/data-security' },
        { title: 'ChromaDB - Embedding Security Guidelines', url: 'https://docs.trychroma.com/security' }
      ]
    },
    {
      title: 'Standards & Best Practices',
      items: [
        { title: 'NIST SP 800-53 - Security Controls for Information Systems', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
        { title: 'ISO/IEC 27001:2022 - Information Security Management', url: 'https://www.iso.org/standard/82875.html' },
        { title: 'CIS Controls v8 - Memory Protection Guidelines', url: 'https://www.cisecurity.org/controls/v8' },
        { title: 'OWASP Top 10 for LLM Applications - Memory Security', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Protects agent memory from malicious manipulation through validation, signing, and integrity checks"
        why="Poisoned memories lead to gradual behavior corruption; prevention ensures long-term reliability"
        keyInsight="Cryptographic signing + anomaly detection + regular sanitization = tamper-resistant memory"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default MemoryPoisoningPreventionDetails;