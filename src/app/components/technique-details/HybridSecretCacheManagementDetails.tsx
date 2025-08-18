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

interface HybridSecretCacheManagementDetailsProps {
  selectedTechnique: any;
}

export const HybridSecretCacheManagementDetails: React.FC<HybridSecretCacheManagementDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Local Vault Setup', detail: 'Deploy browser-based vault for device-level secrets' },
      { num: '2', action: 'Distant Vault Config', detail: 'Configure server vault with dynamic secrets' },
      { num: '3', action: 'KMS Integration', detail: 'Connect cloud key management for master keys' },
      { num: '4', action: 'Encrypted Caching', detail: 'Implement local and distributed encrypted cache layers' },
      { num: '5', action: 'Secret Rotation', detail: 'Automate TTL management and credential rotation' }
    ],
    example: 'local_vault_setup → distant_vault_config → kms_integration → encrypted_caching → secret_rotation'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use zero-knowledge encryption for local device vaults', icon: '✅' },
    { type: 'do', text: 'Implement dynamic secret generation with short TTLs', icon: '✅' },
    { type: 'do', text: 'Encrypt cache data both at rest and in transit', icon: '✅' },
    { type: 'do', text: 'Use hardware-backed key storage (HSM/TEE) when available', icon: '✅' },
    { type: 'do', text: 'Implement comprehensive audit trails for all secret access', icon: '✅' },
    { type: 'dont', text: 'Store long-lived secrets in local caches without encryption', icon: '❌' },
    { type: 'dont', text: 'Use the same encryption key across multiple cache regions', icon: '❌' },
    { type: 'dont', text: 'Skip secret rotation for convenience', icon: '❌' },
    { type: 'dont', text: 'Allow cache data to persist beyond TTL expiration', icon: '❌' },
    { type: 'dont', text: 'Mix secrets and cache data in the same storage tier', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Distributed agentic AI systems',
      'Edge computing deployments',
      'Multi-cloud environments',
      'Federated learning scenarios'
    ],
    avoidWhen: [
      'Simple single-device applications',
      'Stateless serverless functions only',
      'Non-sensitive data processing',
      'Ultra-low latency requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Cache Hit Ratio', measure: 'Local: 94% | Distant: 87% (target performance)' },
    { metric: 'Secret Retrieval Latency', measure: 'P95 latency <50ms for secret access' },
    { metric: 'Encryption Overhead', measure: '% performance impact (<2% target)' },
    { metric: 'Rotation Success Rate', measure: '% of secrets rotated without service disruption' },
    { metric: 'Audit Trail Completeness', measure: '% of secret operations logged with correlation' },
    { metric: 'Cross-Region Failover', measure: 'Recovery time <500ms for distant cache' }
  ];

  const topUseCases = [
    'Trading Systems: Local session tokens + distant API keys with automatic rotation and encrypted cache',
    'Healthcare AI: Device-level patient keys + server certificates with HIPAA-compliant caching',
    'Autonomous Vehicles: Edge device secrets + cloud credentials with real-time encrypted data caching',
    'IoT Networks: Local device identity + centralized key management with distributed cache layers',
    'Financial Services: Multi-region secret distribution + encrypted cache for compliance and performance'
  ];

  const references = [
    {
      title: 'Local Device Vaults',
      items: [
        { title: 'Hoddor - Browser-based Zero-Knowledge Vault (Gatewatcher)', url: 'https://github.com/Gatewatcher/hoddor' },
        { title: 'Origin Private File System (OPFS) for Web Security', url: 'https://web.dev/origin-private-file-system-api/' },
        { title: 'WebAssembly Security for Client-side Cryptography', url: 'https://webassembly.org/docs/security/' },
        { title: 'age Encryption - Modern Cryptographic Tool', url: 'https://age-encryption.org/' }
      ]
    },
    {
      title: 'Server-side Secret Management',
      items: [
        { title: 'HashiCorp Vault Enterprise 1.17 - Workload Identity Federation', url: 'https://www.hashicorp.com/products/vault' },
        { title: 'Dynamic Secrets and Automatic Rotation Best Practices', url: 'https://developer.hashicorp.com/vault/tutorials/secrets-management' },
        { title: 'Vault Agent Auto-Auth and Caching', url: 'https://developer.hashicorp.com/vault/docs/agent' },
        { title: 'Kubernetes Vault Secrets Operator (VSO)', url: 'https://github.com/hashicorp/vault-secrets-operator' }
      ]
    },
    {
      title: 'Cloud Key Management Services',
      items: [
        { title: 'AWS KMS ECDH Key Agreement (2024 Update)', url: 'https://aws.amazon.com/blogs/security/aws-kms-now-supports-ecdh-for-secure-communications/' },
        { title: 'Azure Key Vault - Bring Your Own Key (BYOK)', url: 'https://docs.microsoft.com/en-us/azure/key-vault/keys/byok-specification' },
        { title: 'Google Cloud KMS - Hardware Security Module Integration', url: 'https://cloud.google.com/kms/docs/hsm' },
        { title: 'Multi-Cloud Key Management Strategy Guide', url: 'https://www.cisa.gov/sites/default/files/publications/Key_Management_Best_Practices.pdf' }
      ]
    },
    {
      title: 'Agentic AI Security Research',
      items: [
        { title: 'Agentic AI Identity Management - Cloud Security Alliance (2025)', url: 'https://cloudsecurityalliance.org/blog/2025/03/11/agentic-ai-identity-management-approach' },
        { title: 'NIST Cybersecurity Framework 2.0 - AI System Security', url: 'https://www.nist.gov/cyberframework' },
        { title: 'Edge Computing Security for Agentic Systems (Spectro Cloud)', url: 'https://www.spectrocloud.com/blog/portable-kms-edge-computing-security-for-remote-devices' },
        { title: 'OWASP LLM and Gen AI Security - Agentic Applications', url: 'https://genai.owasp.org/2024/12/15/announcing-the-owasp-llm-and-gen-ai-security-project-initiative-for-securing-agentic-applications/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-tier architecture combining local device vaults, distant server vaults, and cloud key management for comprehensive secret and cache management"
        why="Agentic AI systems need secure storage for both secrets and cached data across edge devices and centralized infrastructure while maintaining performance and security"
        keyInsight="Local zero-knowledge + distant dynamic secrets + encrypted caching → secure agentic AI with <50ms secret access"
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

export default HybridSecretCacheManagementDetails;