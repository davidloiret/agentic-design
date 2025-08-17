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

interface SystemPromptProtectionDetailsProps {
  selectedTechnique: any;
}

export const SystemPromptProtectionDetails: React.FC<SystemPromptProtectionDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Encode Prompts', detail: 'Hash/encrypt system instructions' },
      { num: '2', action: 'Filter Outputs', detail: 'Detect & block prompt leakage attempts' },
      { num: '3', action: 'Separate Contexts', detail: 'Isolate system vs user prompts' },
      { num: '4', action: 'Monitor Patterns', detail: 'Track extraction attempt signatures' },
      { num: '5', action: 'Dynamic Defense', detail: 'Rotate protections & obfuscation' }
    ],
    example: 'prompt_encoding → output_filtering → context_separation → pattern_monitoring → adaptive_defense'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use cryptographic hashing for prompt fingerprinting', icon: '✅' },
    { type: 'do', text: 'Implement output filtering for known extraction patterns', icon: '✅' },
    { type: 'do', text: 'Separate system and user contexts architecturally', icon: '✅' },
    { type: 'do', text: 'Monitor for unusual query patterns indicating attacks', icon: '✅' },
    { type: 'do', text: 'Use instruction hierarchies with override protection', icon: '✅' },
    { type: 'dont', text: 'Store system prompts in plain text accessible memory', icon: '❌' },
    { type: 'dont', text: 'Allow direct prompt echoing or reflection', icon: '❌' },
    { type: 'dont', text: 'Trust user inputs to respect prompt boundaries', icon: '❌' },
    { type: 'dont', text: 'Use static defense patterns without adaptation', icon: '❌' },
    { type: 'dont', text: 'Ignore coordinated extraction attempts across sessions', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Proprietary system behaviors',
      'Competitive advantage prompts',
      'Security-critical instructions',
      'IP-protected methodologies'
    ],
    avoidWhen: [
      'Open-source transparent systems',
      'Educational/research contexts',
      'Simple Q&A applications',
      'Non-proprietary workflows'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Extraction Attempts', measure: 'Blocked prompt theft tries/day' },
    { metric: 'Leakage Rate', measure: '% responses containing prompt traces' },
    { metric: 'Detection Accuracy', measure: 'True vs false positive ratio' },
    { metric: 'Prompt Integrity', measure: 'Unchanged behavior over time' },
    { metric: 'Performance Impact', measure: 'ms latency from protection' },
    { metric: 'Attack Evolution', measure: 'New extraction techniques/month' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Enterprise AI: Protect proprietary reasoning chains & business logic',
    'Medical Diagnosis: Shield clinical decision protocols from extraction',
    'Financial Models: Guard trading strategies & risk assessment prompts',
    'Legal AI: Protect case analysis methodologies & compliance rules',
    'Creative AI: Secure unique style instructions & generation techniques'
  ];

  const references = [
    {
      title: 'Prompt Security Research',
      items: [
        { title: 'OWASP Top 10 for LLMs - Prompt Injection (2025)', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { title: 'Prompt Injection Attacks and Defenses: A Systematic Survey (2024)', url: 'https://arxiv.org/abs/2309.13543' },
        { title: 'Extracting Training Data from Large Language Models (2021)', url: 'https://arxiv.org/abs/2012.07805' },
        { title: 'Universal and Transferable Adversarial Attacks on Aligned Language Models (2023)', url: 'https://arxiv.org/abs/2307.15043' }
      ]
    },
    {
      title: 'Defense Techniques',
      items: [
        { title: 'StruQ: Defending Against Prompt Injection with Structured Queries (2024)', url: 'https://arxiv.org/abs/2402.06363' },
        { title: 'Defending ChatGPT against Jailbreak Attack via Self-Reminder (2023)', url: 'https://arxiv.org/abs/2304.13835' },
        { title: 'Prompt Guard: Provable Defense against Prompt Injection (2024)', url: 'https://arxiv.org/abs/2405.01253' },
        { title: 'Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions (2024)', url: 'https://arxiv.org/abs/2404.13208' }
      ]
    },
    {
      title: 'Implementation Standards',
      items: [
        { title: 'NIST AI 600-1 - Prompt Security Guidelines', url: 'https://csrc.nist.gov/publications/detail/ai/600-1/draft' },
        { title: 'ISO/IEC 23053:2022 - Framework for AI Systems Using ML', url: 'https://www.iso.org/standard/74438.html' },
        { title: 'IEEE P2976 - Standard for XAI Security', url: 'https://standards.ieee.org/project/2976.html' },
        { title: 'OpenAI Usage Policies - Prompt Security', url: 'https://openai.com/policies/usage-policies' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'Guardrails AI - Input/Output Protection', url: 'https://docs.guardrailsai.com/concepts/guards/' },
        { title: 'NeMo Guardrails - Canonical Forms', url: 'https://github.com/NVIDIA/NeMo-Guardrails' },
        { title: 'Rebuff - Prompt Injection Detection', url: 'https://github.com/protectai/rebuff' },
        { title: 'LangKit - Security Monitoring for LLMs', url: 'https://github.com/whylabs/langkit' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Protects system prompts from extraction through encoding, filtering, and monitoring"
        why="System prompts contain IP and security logic; extraction enables bypasses and theft"
        keyInsight="Encoding + output filtering + behavioral monitoring = protected instructions"
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

export default SystemPromptProtectionDetails;