'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import { PatternRelationships, RelationshipData } from '../shared/PatternRelationships';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface AgentCollaborationUxDetailsProps {
  selectedTechnique: any;
}

export const AgentCollaborationUxDetails: React.FC<AgentCollaborationUxDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Agent Network', detail: 'Define specialized agent roles, capabilities, and coordination hierarchy' },
      { num: '2', action: 'Implement Handoff Logic', detail: 'Build context-preserving handoff mechanisms with complexity thresholds' },
      { num: '3', action: 'Create Coordination Dashboard', detail: 'Develop real-time status visualization and orchestration controls' },
      { num: '4', action: 'Build Transparency Layer', detail: 'Add visual indicators for agent activities, handoffs, and decision points' },
      { num: '5', action: 'Test & Optimize', detail: 'Validate coordination flows and optimize handoff timing with user feedback' }
    ],
    example: 'agent_mapping → handoff_implementation → dashboard_creation → transparency_design → flow_optimization'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement complexity-based handoff triggers to avoid rigid rule-based systems', icon: '✅' },
    { type: 'do', text: 'Preserve full conversation context during agent handoffs', icon: '✅' },
    { type: 'do', text: 'Use visual consistency across coordination dashboards and status indicators', icon: '✅' },
    { type: 'do', text: 'Provide real-time transparency of agent activities and decision-making', icon: '✅' },
    { type: 'do', text: 'Design for both centralized and decentralized coordination patterns', icon: '✅' },
    { type: 'do', text: 'Include human-in-the-loop intervention points for high-stakes decisions', icon: '✅' },
    { type: 'do', text: 'Implement agent specialization indicators showing expertise areas', icon: '✅' },
    { type: 'dont', text: 'Force customers to repeat information during agent handoffs', icon: '❌' },
    { type: 'dont', text: 'Hide agent coordination complexity without providing transparency options', icon: '❌' },
    { type: 'dont', text: 'Use single-agent solutions for inherently multi-step collaborative workflows', icon: '❌' },
    { type: 'dont', text: 'Implement handoffs without clear reasoning or user feedback', icon: '❌' },
    { type: 'dont', text: 'Ignore state management across distributed multi-agent architectures', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex workflows requiring specialized agent expertise',
      'Enterprise automation spanning multiple systems and teams',
      'Tasks needing distributed processing and coordination',
      'High-stakes scenarios requiring human oversight integration',
      'Scalable systems with varying complexity levels',
      'Cross-functional processes requiring domain-specific knowledge'
    ],
    avoidWhen: [
      'Simple single-step tasks manageable by one agent',
      'Real-time applications requiring immediate responses',
      'Limited resources unable to support multi-agent infrastructure',
      'Use cases where coordination overhead exceeds benefits',
      'Highly regulated environments with strict single-point accountability'
    ]
  };

  const keyMetrics = [
    { metric: 'Handoff Success Rate', measure: '% of successful context-preserving agent transitions' },
    { metric: 'Task Completion Efficiency', measure: 'Time to complete multi-agent workflows vs single-agent baseline' },
    { metric: 'Coordination Transparency Score', measure: 'User understanding of agent activities and decision-making' },
    { metric: 'Agent Utilization Balance', measure: 'Workload distribution across specialized agents' },
    { metric: 'Error Recovery Time', measure: 'Time to resolve coordination failures and restore workflow' },
    { metric: 'User Intervention Frequency', measure: '% of workflows requiring human oversight or correction' },
    { metric: 'Scalability Index', measure: 'Performance degradation as agent network size increases' }
  ];

  const topUseCases = [
    'Customer Support: Triage agent → specialized technical/billing/escalation agents → human handoff',
    'Enterprise Automation: Task orchestrator → specialized workflow agents → quality assurance agents',
    'Content Creation: Research agent → writing agent → editing agent → review agent → publication',
    'Healthcare Coordination: Intake agent → diagnostic agent → treatment planning → specialist consultation',
    'Financial Services: Risk assessment → compliance checking → approval workflow → execution agents',
    'Software Development: Requirements agent → design agent → implementation → testing → deployment',
    'Supply Chain: Demand forecasting → procurement → inventory → logistics → customer service agents'
  ];

  const relationshipData: RelationshipData = {
    prerequisites: [
      {
        id: 'human-in-the-loop',
        name: 'Human-in-the-Loop',
        category: 'ui-ux-patterns',
        description: 'Foundation for human oversight integration in agent coordination',
        icon: '👤',
        complexity: 'medium',
        reason: 'Essential for high-stakes decision points in multi-agent workflows'
      },
      {
        id: 'agent-status-activity-patterns',
        name: 'Agent Status & Activity Patterns',
        category: 'ui-ux-patterns',
        description: 'Basic agent monitoring and status visualization',
        icon: '⚡',
        complexity: 'medium',
        reason: 'Required for individual agent monitoring before coordination'
      }
    ],
    nextSteps: [
      {
        id: 'monitoring-control-patterns',
        name: 'Monitoring and Control Patterns',
        category: 'ui-ux-patterns',
        description: 'Advanced monitoring and intervention capabilities',
        icon: '🎛️',
        complexity: 'high',
        reason: 'Enhanced operational oversight for production multi-agent systems'
      },
      {
        id: 'adaptive-interface-patterns',
        name: 'Adaptive Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Dynamic UI adaptation based on coordination patterns',
        icon: '🎯',
        complexity: 'high',
        reason: 'Personalize coordination interfaces based on user role and preferences'
      }
    ],
    alternatives: [
      {
        id: 'conversational-interface-patterns',
        name: 'Conversational Interface Patterns',
        category: 'ui-ux-patterns',
        description: 'Single-interface conversation-based coordination',
        icon: '💬',
        complexity: 'high',
        reason: 'Better for simpler workflows where conversation suffices for coordination'
      },
      {
        id: 'human-on-the-loop',
        name: 'Human On the Loop',
        category: 'ui-ux-patterns',
        description: 'Human supervisory oversight without agent-to-agent handoffs',
        icon: '👁️',
        complexity: 'high',
        reason: 'Simpler architecture when human supervision is primary coordination mechanism'
      }
    ],
    combinesWith: [
      {
        id: 'trust-transparency-patterns',
        name: 'Trust and Transparency Patterns',
        category: 'ui-ux-patterns',
        description: 'Explainable decision-making across agent network',
        icon: '🔍',
        complexity: 'high',
        reason: 'Critical for building trust in complex multi-agent coordination'
      },
      {
        id: 'error-recovery-patterns',
        name: 'Error Handling and Recovery Patterns',
        category: 'ui-ux-patterns',
        description: 'Graceful failure handling in coordination workflows',
        icon: '🔧',
        complexity: 'medium',
        reason: 'Essential for robust multi-agent system operation'
      },
      {
        id: 'context-window-management-patterns',
        name: 'Context Window Management UI',
        category: 'ui-ux-patterns',
        description: 'Efficient context sharing between agents',
        icon: '🪟',
        complexity: 'medium',
        reason: 'Optimize context preservation and transfer during handoffs'
      }
    ],
    enhancedBy: [
      {
        id: 'visual-reasoning-patterns',
        name: 'Visual Reasoning Patterns',
        category: 'ui-ux-patterns',
        description: 'Visualize agent reasoning and coordination decisions',
        icon: '👁️',
        complexity: 'high',
        reason: 'Make complex coordination logic visible and understandable'
      },
      {
        id: 'confidence-visualization-patterns',
        name: 'Confidence Visualization Patterns',
        category: 'ui-ux-patterns',
        description: 'Show confidence levels in coordination decisions',
        icon: '📊',
        complexity: 'high',
        reason: 'Help users understand certainty levels in multi-agent decisions'
      }
    ],
    enhances: [
      {
        id: 'message-passing',
        name: 'Message Passing',
        category: 'inter-agent-communication',
        description: 'Transform technical message passing into user-friendly coordination',
        icon: '📬',
        complexity: 'medium',
        reason: 'Make underlying communication patterns visible and manageable'
      },
      {
        id: 'agent-orchestration',
        name: 'Agent Orchestration',
        category: 'coordination-patterns',
        description: 'Add user-centric interface to technical orchestration',
        icon: '🎭',
        complexity: 'high',
        reason: 'Bridge technical orchestration with human oversight and control'
      }
    ],
    evolvesTo: [
      {
        id: 'ambient-agent-patterns',
        name: 'Ambient Agent Patterns',
        category: 'ui-ux-patterns',
        description: 'Seamless background coordination without explicit interfaces',
        icon: '🌊',
        complexity: 'high',
        reason: 'Evolution toward invisible, context-aware coordination'
      }
    ],
    variants: [
      {
        id: 'centralized-coordination-ux',
        name: 'Centralized Coordination UX',
        category: 'ui-ux-patterns',
        description: 'Single orchestrator-based coordination interface',
        icon: '🎯',
        complexity: 'medium',
        reason: 'Simpler variant for hierarchical coordination structures'
      },
      {
        id: 'peer-to-peer-coordination-ux',
        name: 'Peer-to-Peer Coordination UX',
        category: 'ui-ux-patterns',
        description: 'Distributed coordination without central orchestrator',
        icon: '🔗',
        complexity: 'high',
        reason: 'Variant for decentralized agent networks and mesh architectures'
      }
    ],
    conflictsWith: [
      {
        id: 'single-agent-patterns',
        name: 'Single Agent Patterns',
        category: 'ui-ux-patterns',
        description: 'Fundamentally different approach using one generalized agent',
        icon: '🤖',
        complexity: 'low',
        reason: 'Opposing architectural philosophy - generalization vs specialization'
      }
    ],
    industryApplications: [
      {
        domain: 'Enterprise Software',
        description: 'Multi-agent coordination for complex business processes and workflow automation',
        patterns: [
          {
            id: 'monitoring-control-patterns',
            name: 'Monitoring and Control Patterns',
            category: 'ui-ux-patterns',
            description: 'Mission-control style interfaces for enterprise agent fleets',
            icon: '🎛️'
          },
          {
            id: 'trust-transparency-patterns',
            name: 'Trust and Transparency Patterns',
            category: 'ui-ux-patterns',
            description: 'Auditable decision trails across multi-agent workflows',
            icon: '🔍'
          }
        ]
      },
      {
        domain: 'Customer Service',
        description: 'Specialized agent coordination for multi-tier support and escalation workflows',
        patterns: [
          {
            id: 'conversational-interface-patterns',
            name: 'Conversational Interface Patterns',
            category: 'ui-ux-patterns',
            description: 'Natural language coordination between customer-facing agents',
            icon: '💬'
          },
          {
            id: 'human-in-the-loop',
            name: 'Human-in-the-Loop',
            category: 'ui-ux-patterns',
            description: 'Seamless escalation to human agents when needed',
            icon: '👤'
          }
        ]
      },
      {
        domain: 'Healthcare',
        description: 'Coordinated care teams with specialized medical AI agents and human oversight',
        patterns: [
          {
            id: 'privacy-security-ux',
            name: 'Privacy and Security UX',
            category: 'ui-ux-patterns',
            description: 'HIPAA-compliant coordination interfaces with secure handoffs',
            icon: '🔒'
          },
          {
            id: 'human-in-the-loop',
            name: 'Human-in-the-Loop',
            category: 'ui-ux-patterns',
            description: 'Required physician oversight for clinical decision coordination',
            icon: '👤'
          }
        ]
      }
    ]
  };

  const references = [
    {
      title: 'Academic Research',
      items: [
        { title: 'ContextCam: Bridging Context Awareness with Creative Human-AI Image Co-Creation (CHI 2024)', url: 'https://dl.acm.org/doi/10.1145/3613904.3642129' },
        { title: 'CloChat: Understanding How People Customize, Interact, and Experience Personas in LLMs (CHI 2024)', url: 'https://dl.acm.org/doi/10.1145/3613904.3642472' },
        { title: 'User Experience Design Professionals\' Perceptions of Generative AI (CHI 2024)', url: 'https://dl.acm.org/doi/10.1145/3613904.3642114' },
        { title: 'Dashboard Design Patterns (ArXiv 2024)', url: 'https://arxiv.org/abs/2205.00757' }
      ]
    },
    {
      title: 'Industry Frameworks & Platforms',
      items: [
        { title: 'Microsoft Semantic Kernel Agent Orchestration', url: 'https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-orchestration/' },
        { title: 'Microsoft AutoGen Handoff Patterns', url: 'https://microsoft.github.io/autogen/stable//user-guide/core-user-guide/design-patterns/handoffs.html' },
        { title: 'OpenAI Swarm Multi-Agent Framework (GitHub)', url: 'https://github.com/openai/swarm' },
        { title: 'Salesforce Agentforce Agent Handoff Design', url: 'https://www.salesforce.com/blog/agent-to-human-handoff/?bc=OTH' },
        { title: 'Azure AI Agent Design Patterns', url: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns' }
      ]
    },
    {
      title: 'Enterprise Implementations',
      items: [
        { title: 'AWS Multi-Agent Orchestration with Amazon Bedrock', url: 'https://aws.amazon.com/blogs/machine-learning/design-multi-agent-orchestration-with-reasoning-using-amazon-bedrock-and-open-source-frameworks/' },
        { title: 'IBM AI Agent Orchestration Guide', url: 'https://www.ibm.com/think/topics/ai-agent-orchestration' },
        { title: 'Microsoft Azure AI Foundry Agent Service', url: 'https://techcommunity.microsoft.com/blog/azure-ai-services-blog/building-a-digital-workforce-with-multi-agents-in-azure-ai-foundry-agent-service/4414671' },
        { title: 'Microsoft Copilot Studio Multi-Agent Orchestration', url: 'https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/multi-agent-orchestration-maker-controls-and-more-microsoft-copilot-studio-announcements-at-microsoft-build-2025/' }
      ]
    },
    {
      title: 'Research & Technical Guides',
      items: [
        { title: 'A Technical Guide to Multi-Agent Orchestration (Medium 2024)', url: 'https://dominguezdaniel.medium.com/a-technical-guide-to-multi-agent-orchestration-5f979c831c0d' },
        { title: '4 UX Design Principles for Autonomous Multi-Agent AI Systems', url: 'https://newsletter.victordibia.com/p/4-ux-design-principles-for-multi' },
        { title: 'Secrets of Agentic UX: Emerging Design Patterns for Human Interaction with AI Agents', url: 'https://uxmag.medium.com/secrets-of-agentic-ux-emerging-design-patterns-for-human-interaction-with-ai-agents-f7682bff44af' },
        { title: 'Inside the World of Multi-Agent Orchestration (IBM)', url: 'https://www.ibm.com/think/insights/boost-productivity-efficiency-multi-agent-orchestration' }
      ]
    },
    {
      title: 'UX Design & Dashboard Patterns',
      items: [
        { title: 'Effective Dashboard Design Principles for 2025', url: 'https://www.uxpin.com/studio/blog/dashboard-design-principles/' },
        { title: 'Dashboard Design UX Patterns Best Practices', url: 'https://www.pencilandpaper.io/articles/ux-pattern-analysis-data-dashboards' },
        { title: 'Top 4 Agentic AI Design Patterns for Architecting AI Systems', url: 'https://www.analyticsvidhya.com/blog/2024/10/agentic-design-patterns/' },
        { title: 'Dashboard Design: Best Practices With Examples (Toptal)', url: 'https://www.toptal.com/designers/data-visualization/dashboard-design-best-practices' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-agent coordination interfaces with seamless handoffs, transparent orchestration, and specialized agent collaboration"
        why="Enables complex enterprise workflows, reduces coordination overhead, and provides scalable automation with human oversight integration"
        keyInsight="Complexity-based handoff triggers with context preservation - coordination becomes transparent and manageable at enterprise scale"
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

      <PatternRelationships
        currentPatternId="agent-collaboration-ux"
        currentPatternName="Agent Collaboration UX"
        relationships={relationshipData}
        className="mt-8"
      />

      <ReferencesSection categories={references} />
    </>
  );
};

export default AgentCollaborationUxDetails;