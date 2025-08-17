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

interface TheAgentCompanyDetailsProps {
  selectedTechnique: any;
}

export const TheAgentCompanyDetails: React.FC<TheAgentCompanyDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Clone', detail: 'git clone https://github.com/TheAgentCompany/TheAgentCompany' },
      { num: '2', action: 'Setup', detail: 'Docker environment with GitLab, OwnCloud, Plane, RocketChat' },
      { num: '3', action: 'Configure', detail: 'Set up agent with browser, terminal, code editor access' },
      { num: '4', action: 'Select', detail: 'Choose tasks from 175 professional scenarios' },
      { num: '5', action: 'Evaluate', detail: 'Run checkpoint-based evaluation with partial credit' }
    ],
    example: 'python run_evaluation.py --agent gpt-4 --tasks software_engineering --mode full'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across multiple job roles (dev, QA, PM, admin, data science)', icon: '✅' },
    { type: 'do', text: 'Use checkpoint-based evaluation for partial credit assessment', icon: '✅' },
    { type: 'do', text: 'Enable agent communication with simulated colleagues', icon: '✅' },
    { type: 'do', text: 'Leverage the self-hosted environment for reproducible results', icon: '✅' },
    { type: 'do', text: 'Focus on long-horizon, multi-step professional tasks', icon: '✅' },
    { type: 'dont', text: 'Expect high completion rates (current SOTA ~30%)', icon: '❌' },
    { type: 'dont', text: 'Skip proper Docker environment setup and configuration', icon: '❌' },
    { type: 'dont', text: 'Ignore partial credit scoring - many tasks show partial progress', icon: '❌' },
    { type: 'dont', text: 'Test only on simple automation tasks', icon: '❌' },
    { type: 'dont', text: 'Overlook agent-to-agent communication requirements', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating enterprise-ready agent capabilities',
      'Testing work automation and digital worker scenarios',
      'Assessing real-world professional task performance',
      'Research on AI impact on labor markets',
      'Multi-step, long-horizon task evaluation'
    ],
    avoidWhen: [
      'Quick capability demos or simple task evaluation',
      'Resource-constrained environments (requires full Docker stack)',
      'Single-domain or narrow task assessment',
      'Real-time performance testing',
      'Academic-only or synthetic task evaluation'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Full Completion Rate', measure: '% of tasks completed successfully (typically ~30%)' },
    { metric: 'Partial Credit Score', measure: 'Weighted score including partial progress' },
    { metric: 'Task Category Performance', measure: 'Success rate by job role (dev, QA, PM, etc.)' },
    { metric: 'Time to Completion', measure: 'Average duration for successful task completion' },
    { metric: 'Communication Effectiveness', measure: 'Quality of agent-to-colleague interactions' },
    { metric: 'Tool Usage Proficiency', measure: 'Effective use of browser, terminal, code editor' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Enterprise Readiness Assessment: Evaluating AI agents for real workplace deployment scenarios',
    'Work Automation Research: Understanding which professional tasks can be automated with current AI',
    'Digital Worker Development: Building and testing AI systems that collaborate with human colleagues',
    'Economic Impact Analysis: Measuring AI capability progression for labor market policy research',
    'Multi-Tool Agent Testing: Assessing agent proficiency across web browsers, terminals, and code editors'
  ];

  const references = [
    {
      title: 'Official Paper & Repository',
      items: [
        { title: 'TheAgentCompany: Benchmarking LLM Agents on Consequential Real World Tasks (arXiv:2412.14161)', url: 'https://arxiv.org/abs/2412.14161' },
        { title: 'TheAgentCompany GitHub Repository', url: 'https://github.com/TheAgentCompany/TheAgentCompany' },
        { title: 'Official Website', url: 'https://the-agent-company.com/' },
        { title: 'Hugging Face Paper Page', url: 'https://huggingface.co/papers/2412.14161' }
      ]
    },
    {
      title: 'Technical Implementation',
      items: [
        { title: 'Docker Environment Setup Guide', url: 'https://github.com/TheAgentCompany/TheAgentCompany/blob/main/docs/setup.md' },
        { title: 'Task Configuration Documentation', url: 'https://github.com/TheAgentCompany/TheAgentCompany/blob/main/docs/tasks.md' },
        { title: 'Agent Integration Examples', url: 'https://github.com/TheAgentCompany/TheAgentCompany/tree/main/examples' },
        { title: 'Evaluation Metrics Specification', url: 'https://github.com/TheAgentCompany/TheAgentCompany/blob/main/docs/evaluation.md' }
      ]
    },
    {
      title: 'Related Research',
      items: [
        { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (ICLR 2024)', url: 'https://arxiv.org/abs/2310.06770' },
        { title: 'WebArena: A Realistic Web Environment for Building Autonomous Agents (2023)', url: 'https://arxiv.org/abs/2307.13854' },
        { title: 'AgentBench: Evaluating LLMs as Agents (Liu et al., ICLR 2024)', url: 'https://arxiv.org/abs/2308.03688' },
        { title: 'WorkArena: How Capable Are Web Agents at Solving Common Knowledge Work Tasks? (2024)', url: 'https://arxiv.org/abs/2403.07718' }
      ]
    },
    {
      title: 'Workplace AI & Automation',
      items: [
        { title: 'GitLab Documentation for Agent Integration', url: 'https://docs.gitlab.com/ee/api/' },
        { title: 'OwnCloud API for File Management Automation', url: 'https://doc.owncloud.com/server/next/developer_manual/webdav_api/' },
        { title: 'RocketChat API for Team Communication', url: 'https://docs.rocket.chat/reference/api' },
        { title: 'Economic Impact of AI on Labor Markets (McKinsey 2024)', url: 'https://www.mckinsey.com/featured-insights/future-of-work' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Simulated software company environment with 175 real-world professional tasks"
        why="Evaluates enterprise-ready AI agents in realistic workplace scenarios with multi-tool collaboration"
        keyInsight="Current SOTA agents achieve ~30% completion rate, highlighting gaps in real-world deployment readiness"
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

export default TheAgentCompanyDetails;