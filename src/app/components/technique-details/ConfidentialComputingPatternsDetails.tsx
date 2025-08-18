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

interface ConfidentialComputingPatternsDetailsProps {
  selectedTechnique: any;
}

export const ConfidentialComputingPatternsDetails: React.FC<ConfidentialComputingPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'TEE Selection', detail: 'Choose Intel SGX, AMD SEV-SNP, or Intel TDX' },
      { num: '2', action: 'Framework Setup', detail: 'Deploy Enarx, Gramine, or Occlum runtime' },
      { num: '3', action: 'Agent Enclave', detail: 'Package AI agents in trusted execution environment' },
      { num: '4', action: 'Remote Attestation', detail: 'Verify enclave integrity and authenticity' },
      { num: '5', action: 'Secure Communication', detail: 'Encrypted channels between enclaves' }
    ],
    example: 'tee_selection → framework_setup → agent_enclave → remote_attestation → secure_communication'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use hardware-based TEEs for maximum security guarantees', icon: '✅' },
    { type: 'do', text: 'Implement remote attestation for enclave verification', icon: '✅' },
    { type: 'do', text: 'Choose appropriate framework based on performance requirements', icon: '✅' },
    { type: 'do', text: 'Encrypt all data in transit between enclaves', icon: '✅' },
    { type: 'do', text: 'Monitor enclave resource usage and side-channel attacks', icon: '✅' },
    { type: 'dont', text: 'Trust enclaves without proper attestation verification', icon: '❌' },
    { type: 'dont', text: 'Store secrets in non-encrypted enclave memory', icon: '❌' },
    { type: 'dont', text: 'Ignore performance overhead of confidential computing', icon: '❌' },
    { type: 'dont', text: 'Use deprecated Intel SGX for new deployments', icon: '❌' },
    { type: 'dont', text: 'Skip security updates for TEE frameworks', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-party agentic AI collaboration',
      'Sensitive data processing requirements',
      'Untrusted cloud environments',
      'Regulatory compliance mandates'
    ],
    avoidWhen: [
      'Public data processing only',
      'Latency-critical real-time applications',
      'Resource-constrained edge devices',
      'Single-tenant trusted environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Enclave Integrity', measure: 'Successful attestation verification rate' },
    { metric: 'Performance Overhead', measure: 'Computation slowdown factor (1.5-30x)' },
    { metric: 'Memory Protection', measure: '% data protected in TEE memory' },
    { metric: 'Side-Channel Resistance', measure: 'Attack mitigation effectiveness' },
    { metric: 'Scalability Factor', measure: 'Max concurrent enclaves supported' },
    { metric: 'Framework Compatibility', measure: '% applications running without modification' }
  ];

  const topUseCases = [
    'Federated AI: Multi-hospital ML training with patient privacy in TEE enclaves',
    'Financial Trading: High-frequency algorithms protected from market manipulation',
    'Multi-Agent Collaboration: Competitive intelligence sharing without data exposure',
    'Edge AI: Autonomous vehicle decision-making with proprietary algorithm protection',
    'Government AI: Classified data processing with hardware-verified security boundaries'
  ];

  const references = [
    {
      title: 'Hardware Technologies',
      items: [
        { title: 'Intel Software Guard Extensions (SGX) Documentation', url: 'https://software.intel.com/content/www/us/en/develop/topics/software-guard-extensions.html' },
        { title: 'AMD Secure Encrypted Virtualization (SEV) Guide', url: 'https://developer.amd.com/sev/' },
        { title: 'Intel Trust Domain Extensions (TDX) Architecture', url: 'https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html' },
        { title: 'ARM Confidential Compute Architecture (CCA)', url: 'https://www.arm.com/architecture/security-features/arm-confidential-compute-architecture' }
      ]
    },
    {
      title: 'Frameworks & Runtimes',
      items: [
        { title: 'Enarx - WebAssembly-based Confidential Computing', url: 'https://enarx.dev/' },
        { title: 'Gramine - LibOS for Intel SGX', url: 'https://github.com/gramineproject/gramine' },
        { title: 'Occlum - Memory-Safe SGX LibOS', url: 'https://github.com/occlum/occlum' },
        { title: 'Google Asylo - Cross-Platform TEE Framework', url: 'https://github.com/google/asylo' }
      ]
    },
    {
      title: 'Academic Research',
      items: [
        { title: 'Machine Learning with Confidential Computing Survey (ACM 2024)', url: 'https://dl.acm.org/doi/10.1145/3670007' },
        { title: 'PPFL: Privacy-preserving Federated Learning with TEE (arXiv)', url: 'https://arxiv.org/abs/2104.14380' },
        { title: 'TEE Technology Evolution Benchmarking (arXiv 2024)', url: 'https://arxiv.org/abs/2408.00443' },
        { title: 'Confidential Computing Survey (IET Communications 2024)', url: 'https://ietresearch.onlinelibrary.wiley.com/doi/full/10.1049/cmu2.12759' }
      ]
    },
    {
      title: 'Cloud Platforms & Tools',
      items: [
        { title: 'Microsoft Azure Confidential Computing', url: 'https://azure.microsoft.com/en-us/solutions/confidential-compute/' },
        { title: 'Google Cloud Confidential Computing', url: 'https://cloud.google.com/confidential-computing' },
        { title: 'NVIDIA Confidential Computing for AI', url: 'https://www.nvidia.com/en-us/data-center/solutions/confidential-computing/' },
        { title: 'Confidential Computing Consortium', url: 'https://confidentialcomputing.io/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Hardware-based trusted execution environments (TEEs) protecting AI agents and data processing in untrusted environments"
        why="Provides hardware-verified security, enables multi-party collaboration, protects proprietary algorithms, and ensures regulatory compliance"
        keyInsight="Hardware TEE + remote attestation + encrypted communication → verifiable confidential AI processing"
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

export default ConfidentialComputingPatternsDetails;