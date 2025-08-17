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

interface HulaFrameworkDetailsProps {
  selectedTechnique: any;
}

export const HulaFrameworkDetails: React.FC<HulaFrameworkDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Deploy AI Planner, AI Coding, and Human Agent components' },
      { num: '2', action: 'Plan', detail: 'AI Planner creates coding plan from JIRA issue' },
      { num: '3', action: 'Review', detail: 'Human agent reviews, refines, and approves plan' },
      { num: '4', action: 'Code', detail: 'AI Coding agent generates code based on approved plan' },
      { num: '5', action: 'Validate', detail: 'Human reviews code, provides feedback, approves PR' }
    ],
    example: 'hula_session = HULA(issue=jira_ticket, agents=[planner, coder, human], stages=[plan, code, review])'
  };


  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Keep human engineer in driver\'s seat throughout the development process', icon: '✅' },
    { type: 'do', text: 'Use three-stage evaluation: offline, online, and practitioner perception', icon: '✅' },
    { type: 'do', text: 'Incorporate feedback from compilers, linters, and validation tools', icon: '✅' },
    { type: 'do', text: 'Review and refine plans before moving to coding stage', icon: '✅' },
    { type: 'do', text: 'Deploy in real JIRA environment for authentic evaluation', icon: '✅' },
    { type: 'dont', text: 'Allow fully autonomous operation without human oversight', icon: '❌' },
    { type: 'dont', text: 'Skip plan approval stage - human validation is critical', icon: '❌' },
    { type: 'dont', text: 'Ignore compiler/linter feedback in code generation loop', icon: '❌' },
    { type: 'dont', text: 'Expect 100% automation - human collaboration is the goal', icon: '❌' },
    { type: 'dont', text: 'Deploy without proper three-stage evaluation framework', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Software development teams needing AI assistance',
      'JIRA-based development workflows and issue tracking',
      'Organizations wanting human-controlled AI coding',
      'Teams requiring code quality assurance and oversight',
      'Enterprise environments with established review processes'
    ],
    avoidWhen: [
      'Fully autonomous coding requirements',
      'Simple scripting or one-off coding tasks',
      'Teams without structured issue tracking systems',
      'Projects requiring immediate code deployment',
      'Environments without human review capacity'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Plan Generation Success', measure: '79% of work items receive successful coding plans' },
    { metric: 'Plan Approval Rate', measure: '82% of generated plans approved by engineers' },
    { metric: 'Code Generation Success', measure: '87% of approved plans result in generated code' },
    { metric: 'Pull Request Rate', measure: '25% of generated code reaches pull request stage' },
    { metric: 'Merge Success Rate', measure: '59% of HULA PRs merged into repositories' },
    { metric: 'SWE-bench Performance', measure: '37.2% resolution rate on SWE-bench Verified' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Enterprise Software Development: Atlassian deployment with 45 engineers, ~900 merged PRs',
    'JIRA Issue Resolution: Automated plan generation and code development for work item tracking',
    'Collaborative AI Coding: Human-guided development maintaining engineer control and oversight',
    'Quality Assurance Workflows: Integrated compiler/linter feedback with human review processes',
    'Research and Development: Academic-industry collaboration for human-AI software engineering'
  ];

  const references = [
    {
      title: 'Official HULA Research & Papers',
      items: [
        { title: 'Human-In-the-Loop Software Development Agents (arXiv:2411.12924)', url: 'https://arxiv.org/abs/2411.12924' },
        { title: 'HULA Research Paper HTML Version', url: 'https://arxiv.org/html/2411.12924' },
        { title: 'HULA Research Paper (ResearchGate)', url: 'https://www.researchgate.net/publication/385980290_Human-In-the-Loop_Software_Development_Agents' },
        { title: 'Human-In-The-Loop Agents: Challenges and Future Directions (arXiv:2506.11009)', url: 'https://arxiv.org/abs/2506.11009' }
      ]
    },
    {
      title: 'Atlassian Implementation & Blog',
      items: [
        { title: 'Atlassian Engineering Blog: HULA Framework', url: 'https://www.atlassian.com/blog/atlassian-engineering/hula-blog-autodev-paper-human-in-the-loop-software-development-agents' },
        { title: 'Atlassian Code Readability Study (arXiv:2501.11264)', url: 'https://arxiv.org/abs/2501.11264' },
        { title: 'Atlassian DevAI Engineering Team Research', url: 'https://www.atlassian.com/engineering' },
        { title: 'ICSE 2025 Conference Acceptance', url: 'https://conf.researchr.org/home/icse-2025' }
      ]
    },
    {
      title: 'Human-in-the-Loop AI Frameworks',
      items: [
        { title: 'HumanLayer: Human-in-the-Loop AI Agents (GitHub)', url: 'https://github.com/humanlayer/humanlayer' },
        { title: 'CAMEL-AI: Human-in-the-Loop Integration', url: 'https://www.camel-ai.org/blogs/human-in-the-loop-ai-camel-integration' },
        { title: 'Human-in-the-Loop Best Practices (Permit.io)', url: 'https://www.permit.io/blog/human-in-the-loop-for-ai-agents-best-practices-frameworks-use-cases-and-demo' },
        { title: 'DEV Community: Human-in-the-Loop Agents Guide', url: 'https://dev.to/camelai/agents-with-human-in-the-loop-everything-you-need-to-know-3fo5' }
      ]
    },
    {
      title: 'Software Engineering & AI Research',
      items: [
        { title: 'SWE-bench: Software Engineering Benchmark', url: 'https://www.swebench.com/' },
        { title: 'Monash University Software Engineering Research', url: 'https://www.monash.edu/it/research' },
        { title: 'University of Melbourne AI Research', url: 'https://www.unimelb.edu.au/research' },
        { title: 'IEEE/ACM ICSE Conference Series', url: 'https://www.icse-conferences.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Three-agent collaboration framework with AI Planner, AI Coder, and Human Agent for software development"
        why="Maintains human control while leveraging AI assistance for JIRA issue resolution and code generation"
        keyInsight="79% plan success, 59% PR merge rate - keeping engineers in driver's seat enables reliable AI collaboration"
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

export default HulaFrameworkDetails;