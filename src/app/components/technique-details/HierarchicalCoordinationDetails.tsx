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

interface HierarchicalCoordinationDetailsProps {
  selectedTechnique: any;
}

export const HierarchicalCoordinationDetails: React.FC<HierarchicalCoordinationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Hierarchy', detail: 'Establish supervisor-subordinate tiers with clear authority levels' },
      { num: '2', action: 'Task Decomposition', detail: 'Break complex goals into hierarchical subtasks (HTN-style)' },
      { num: '3', action: 'Delegation Protocol', detail: 'Implement task assignment with acceptance criteria and SLAs' },
      { num: '4', action: 'Escalation Rules', detail: 'Define when and how issues bubble up hierarchy' },
      { num: '5', action: 'Monitor & Coordinate', detail: 'Track execution, aggregate results, enforce policies' }
    ],
    example: 'ExecutiveAgent → ManagerAgents → TeamLeadAgents → WorkerAgents'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Define explicit roles, permissions, and authority boundaries per tier', icon: '✅' },
    { type: 'do', text: 'Use structured task specifications with clear success criteria', icon: '✅' },
    { type: 'do', text: 'Implement bounded re-decomposition with recursion depth limits', icon: '✅' },
    { type: 'do', text: 'Summarize between levels to control context growth', icon: '✅' },
    { type: 'do', text: 'Use smaller models for routine tasks, larger for strategic decisions', icon: '✅' },
    { type: 'do', text: 'Instrument comprehensive traces and audit logs per tier', icon: '✅' },
    { type: 'dont', text: 'Create single points of failure at supervisor level', icon: '❌' },
    { type: 'dont', text: 'Allow excessive escalation that inflates latency and cost', icon: '❌' },
    { type: 'dont', text: 'Use ambiguous authority that blocks worker task completion', icon: '❌' },
    { type: 'dont', text: 'Forward full transcripts across tiers instead of summaries', icon: '❌' },
    { type: 'dont', text: 'Skip policy enforcement checks at higher tiers', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex workflows requiring approval gates and oversight',
      'Enterprise systems needing policy enforcement',
      'Large-scale operations with interdependent subtasks',
      'Scenarios requiring clear authority and accountability',
      'Multi-step processes with quality control checkpoints',
      'Operations needing resource authorization and allocation'
    ],
    avoidWhen: [
      'Simple single-step tasks without coordination needs',
      'Real-time systems where review latency breaks SLAs',
      'Creative brainstorming requiring fluid collaboration',
      'Small teams where hierarchy creates unnecessary overhead',
      'Highly dynamic environments requiring rapid adaptation'
    ]
  };

  const keyMetrics = [
    { metric: 'Task Success Rate', measure: 'End-to-end completion vs flat baseline' },
    { metric: 'Tier Latency', measure: 'P50/P95 processing time per hierarchical level' },
    { metric: 'Escalation Rate', measure: 'Percentage of tasks requiring higher-tier review' },
    { metric: 'Policy Compliance', measure: 'Violations caught and resolved at checkpoints' },
    { metric: 'Resource Utilization', measure: 'Cost and compute efficiency across tiers' },
    { metric: 'Delegation Accuracy', measure: 'Successful task assignments without rework' }
  ];

  const topUseCases = [
    'Enterprise Workflows: Multi-tier approval processes for compliance, finance, procurement with policy enforcement',
    'Incident Response: Command hierarchy with incident commander, team leads, and specialists for systematic resolution',
    'Research Projects: Principal investigator, project managers, research teams with peer review and publication oversight',
    'Manufacturing Operations: Plant managers, line supervisors, operators with quality control and safety protocols',
    'Software Development: Architects, tech leads, developers with code review, testing, and deployment approval gates'
  ];

  const references = [
    {
      title: 'Recent Academic Research (2024-2025)',
      items: [
        { title: 'AgentOrchestra: A Hierarchical Multi-Agent Framework for General-Purpose Task Solving (Zhang et al., 2025)', url: 'https://arxiv.org/abs/2506.12508' },
        { title: 'Multi-Agent Collaboration via Evolving Orchestration (Dang et al., 2025)', url: 'https://arxiv.org/html/2505.19591v1' },
        { title: 'Towards Effective GenAI Multi-Agent Collaboration: Design and Evaluation for Enterprise Applications (Shu et al., 2024)', url: 'https://arxiv.org/html/2412.05449v1' },
        { title: 'Multi-Agent Coordination across Diverse Applications: A Survey (2025)', url: 'https://arxiv.org/html/2502.14743v2' }
      ]
    },
    {
      title: 'Foundational Papers & Theory',
      items: [
        { title: 'Hierarchical Task Network Planning: Formalization and Analysis (Nau et al., 2003)', url: 'https://arxiv.org/abs/1403.7426' },
        { title: 'Options: An Introduction to Temporal Abstraction in Reinforcement Learning (Sutton et al., 1999)', url: 'https://www.jmlr.org/papers/volume2/sutton00a/sutton00a.pdf' },
        { title: 'Federated Control with Hierarchical Multi-Agent Deep Reinforcement Learning (2017)', url: 'https://arxiv.org/abs/1712.08266' },
        { title: 'HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face (Shen et al., 2023)', url: 'https://arxiv.org/abs/2303.17580' }
      ]
    },
    {
      title: 'Enterprise Implementation Frameworks',
      items: [
        { title: 'AWS Multi-Agent Orchestration with Amazon Bedrock (2024)', url: 'https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/' },
        { title: 'Microsoft Azure AI Agent Design Patterns (2024)', url: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns' },
        { title: 'IBM AI Agent Orchestration Guide (2024)', url: 'https://www.ibm.com/think/topics/ai-agent-orchestration' },
        { title: 'Anthropic Multi-Agent Research System Architecture (2024)', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'LangGraph Multi-Agent Supervisor Pattern (2024)', url: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/' },
        { title: 'Microsoft AutoGen - Manager-Worker Agent Patterns (2024)', url: 'https://microsoft.github.io/autogen/' },
        { title: 'CrewAI Hierarchical Agent Management (2024)', url: 'https://docs.crewai.com/' },
        { title: 'OpenAI Swarm - Agent Orchestration Framework (2024)', url: 'https://github.com/openai/swarm' }
      ]
    },
    {
      title: 'Industry Case Studies & Applications',
      items: [
        { title: 'Enterprise Multi-Agent System Market Analysis (2024-2025)', url: 'https://research.aimultiple.com/agentic-frameworks/' },
        { title: 'Organizational Coordination Theory - MIT Center for Collective Intelligence', url: 'https://ccs.mit.edu/21c/mgtsci/' },
        { title: 'The Open Group: Coordination & Process Management (DPBoK)', url: 'https://pubs.opengroup.org/dpbok/latest/KLP-chap-coordination.html' },
        { title: 'Venture Capital Trends in Multi-Agent Systems (2020-2024)', url: 'https://galileo.ai/blog/multi-agent-coordination-strategies' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-level agent coordination with supervisory relationships, centralized orchestration, and authority delegation"
        why="Enables scalable task decomposition, policy enforcement, quality control, and clear accountability chains"
        keyInsight="Hierarchical structure + task delegation + escalation protocols = enterprise-grade coordination"
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

export default HierarchicalCoordinationDetails;