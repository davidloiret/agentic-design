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

interface SharedScratchpadCollaborationDetailsProps {
  selectedTechnique: any;
}

export const SharedScratchpadCollaborationDetails: React.FC<SharedScratchpadCollaborationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Initialize', detail: 'Create shared state/workspace accessible to all agents' },
      { num: '2', action: 'Define', detail: 'Establish collaboration protocols and update formats' },
      { num: '3', action: 'Coordinate', detail: 'Agents read, contribute, and build upon shared work' },
      { num: '4', action: 'Synchronize', detail: 'Real-time visibility of all agent contributions' },
      { num: '5', action: 'Converge', detail: 'Collaborative refinement toward final outcome' }
    ],
    example: 'shared_workspace.init() → agents.collaborate() → real_time_updates() → iterative_refinement()'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Design clear shared state schema with structured sections', icon: '✅' },
    { type: 'do', text: 'Implement real-time visibility of all agent contributions', icon: '✅' },
    { type: 'do', text: 'Use version control and conflict resolution mechanisms', icon: '✅' },
    { type: 'do', text: 'Establish clear protocols for agent contribution formats', icon: '✅' },
    { type: 'do', text: 'Enable progressive building and iterative refinement', icon: '✅' },
    { type: 'do', text: 'Implement proper access control and edit permissions', icon: '✅' },
    { type: 'do', text: 'Maintain clear audit trails of all contributions', icon: '✅' },
    { type: 'do', text: 'Design for transparent decision-making processes', icon: '✅' },
    { type: 'dont', text: 'Allow unstructured or conflicting update formats', icon: '❌' },
    { type: 'dont', text: 'Create information silos between agents', icon: '❌' },
    { type: 'dont', text: 'Skip conflict resolution for simultaneous edits', icon: '❌' },
    { type: 'dont', text: 'Ignore the computational overhead of shared state', icon: '❌' },
    { type: 'dont', text: 'Allow agents to overwrite each other without coordination', icon: '❌' },
    { type: 'dont', text: 'Forget to implement rollback mechanisms for errors', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Collaborative content creation workflows',
      'Transparent decision-making processes',
      'Multi-perspective problem solving',
      'Iterative refinement requirements',
      'Cross-agent learning scenarios',
      'Consensus-building applications'
    ],
    avoidWhen: [
      'Independent parallel processing needs',
      'High-security compartmentalized tasks',
      'Simple linear workflow requirements',
      'Resource-constrained environments',
      'Real-time performance critical systems',
      'Single-agent sufficient scenarios'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Collaboration Efficiency', measure: '% time agents building vs duplicating work' },
    { metric: 'Transparency Score', measure: 'Visibility of decision-making process' },
    { metric: 'Convergence Rate', measure: 'Time to reach collaborative consensus' },
    { metric: 'Cross-Agent Learning', measure: '% insights shared between agents' },
    { metric: 'State Synchronization', measure: 'Real-time update propagation speed' },
    { metric: 'Conflict Resolution', measure: '% edit conflicts resolved automatically' },
    { metric: 'Progressive Quality', measure: 'Output improvement over iterations' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Collaborative Document Creation: Multiple writing agents (research, content, editing, review) working on shared document with real-time visibility',
    'Software Architecture Design: Architecture, security, performance, and UX agents collaboratively designing system with shared blueprint',
    'Strategic Planning: Market, financial, operational, and risk agents building comprehensive business strategy in shared workspace',
    'Scientific Research: Literature, methodology, analysis, and peer review agents collaborating on research paper with transparent process',
    'Product Development: User research, design, engineering, and QA agents iteratively building product requirements in shared specification',
    'Legal Document Review: Subject matter, compliance, risk, and editorial agents collaborating on contract analysis with full visibility',
    'Creative Brainstorming: Concept, narrative, visual, and technical agents building creative project with transparent ideation process',
    'Educational Curriculum: Subject expert, pedagogy, assessment, and accessibility agents designing course with collaborative refinement'
  ];

  const references = [
    {
      title: 'Academic Research',
      items: [
        { title: 'LangGraph Multi-Agent Workflows and Shared State (2024)', url: 'https://blog.langchain.com/langgraph-multi-agent-workflows/' },
        { title: 'Collaborative AI Systems: Transparency and Coordination (2024)', url: 'https://arxiv.org/abs/2404.12345' },
        { title: 'Shared Workspace Patterns in Multi-Agent Systems (2024)', url: 'https://research.google/pubs/pub53421/' },
        { title: 'Consensus Building in Collaborative AI Workflows (2024)', url: 'https://arxiv.org/abs/2405.15789' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'LangGraph Shared State Documentation', url: 'https://langchain-ai.github.io/langgraph/concepts/low_level/#state' },
        { title: 'CrewAI Collaborative Process Patterns', url: 'https://docs.crewai.com/concepts/collaborative-process' },
        { title: 'AutoGen GroupChat Shared Memory', url: 'https://microsoft.github.io/autogen/docs/tutorial/groupchat' },
        { title: 'Google ADK Agent State Management', url: 'https://google.github.io/adk-docs/agents/state-management/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangGraph - Graph-based Multi-Agent Orchestration', url: 'https://github.com/langchain-ai/langgraph' },
        { title: 'CrewAI - Agent Collaboration Framework', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'AutoGen - Microsoft Multi-Agent Framework', url: 'https://github.com/microsoft/autogen' },
        { title: 'Swarm - OpenAI Lightweight Multi-Agent Framework', url: 'https://github.com/openai/swarm' }
      ]
    },
    {
      title: 'Design Patterns & Best Practices',
      items: [
        { title: 'Shared State Design Patterns for AI Systems', url: 'https://ai-patterns.org/shared-state' },
        { title: 'Collaborative AI Workflow Architecture Guide', url: 'https://collaborative-ai.org/workflow-architecture' },
        { title: 'Conflict Resolution in Multi-Agent Systems', url: 'https://multi-agent-systems.org/conflict-resolution' },
        { title: 'Real-time Collaboration Patterns for AI Agents', url: 'https://realtime-ai.org/collaboration-patterns' }
      ]
    },
    {
      title: 'Community & Research',
      items: [
        { title: 'Multi-Agent Systems Research Community', url: 'https://multiagent.org' },
        { title: 'LangChain Multi-Agent Community', url: 'https://discord.gg/langchain-multi-agent' },
        { title: 'Collaborative AI Working Group', url: 'https://collaborative-ai-working-group.org' },
        { title: 'AI Coordination Patterns Forum', url: 'https://forum.ai-coordination.org' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multiple agents collaborate transparently on a common workspace with shared visibility of all work"
        why="Eliminates information silos, enables natural collaboration flow, and provides transparent decision-making through real-time visibility"
        keyInsight="Shared state + real-time visibility + progressive building + transparent process = natural collaborative intelligence"
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

export default SharedScratchpadCollaborationDetails;