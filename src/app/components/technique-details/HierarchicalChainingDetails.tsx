'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface HierarchicalChainingDetailsProps {
  selectedTechnique: any;
}

export const HierarchicalChainingDetails: React.FC<HierarchicalChainingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Define hierarchical task decomposition with clear parent-child relationships and abstraction levels.',
    'Design prompts for each level: high-level orchestration, mid-level coordination, low-level execution.',
    'Implement top-down flow: high-level planning → task breakdown → detailed execution coordination.',
    'Execute leaf-level tasks and aggregate results upward through the hierarchy.',
    'Implement bottom-up validation and error propagation from execution to planning levels.',
    'Coordinate cross-level communication with structured interfaces and progress tracking.'
  ];

  const bestPractices = [
    'Keep hierarchy shallow (3-4 levels max) to prevent coordination overhead and latency accumulation.',
    'Use structured interfaces between levels with clear protocols for task delegation and result aggregation.',
    'Implement graceful degradation where higher levels can adapt when lower levels fail or underperform.',
    'Design level-appropriate prompts: abstract planning at top, concrete execution at bottom.',
    'Monitor coordination overhead and optimize level boundaries based on actual performance data.',
    'Cache stable hierarchical decisions and reuse delegation patterns for similar task structures.',
    'Implement clear escalation paths for handling exceptions and edge cases at appropriate levels.'
  ];

  const whenNotToUse = [
    'Simple tasks that don\'t benefit from hierarchical decomposition and coordination overhead.',
    'Flat organizational structures where hierarchical coordination doesn\'t match workflow patterns.',
    'Real-time scenarios where multi-level coordination latency is unacceptable.',
    'Cases where task interdependencies are too complex for clean hierarchical organization.',
    'Resource-constrained environments where coordination overhead exceeds execution benefits.'
  ];

  const commonPitfalls = [
    'Over-engineering hierarchy depth leading to excessive coordination overhead.',
    'Poor level abstractions causing information loss or inappropriate task delegation.',
    'Rigid hierarchy that can\'t adapt to dynamic task requirements or changing priorities.',
    'Bottlenecks at coordination levels causing system-wide performance degradation.',
    'Insufficient error handling across levels leading to cascading failures.',
    'Complex inter-level dependencies making the system harder to debug and maintain.'
  ];

  const keyFeatures = [
    'Multi-level task decomposition with clear abstraction boundaries and responsibilities',
    'Top-down planning and coordination with bottom-up execution and result aggregation',
    'Level-appropriate prompt strategies optimized for different abstraction requirements',
    'Cross-level communication protocols with structured delegation and escalation paths',
    'Hierarchical error handling and graceful degradation across organizational levels',
    'Performance monitoring and optimization of coordination overhead vs execution efficiency'
  ];

  const kpiMetrics = [
    'Coordination efficiency: Ratio of useful work to coordination overhead across levels.',
    'Delegation accuracy: Success rate of task breakdown and assignment to appropriate levels.',
    'Hierarchy depth utilization: Average and distribution of levels used per task completion.',
    'Cross-level latency: Time overhead for information flow up and down the hierarchy.',
    'Error escalation rate: Frequency and appropriateness of exception handling across levels.',
    'Resource utilization: Distribution of computational resources across hierarchical levels.'
  ];

  const tokenUsage = [
    'Token usage scales with hierarchy depth and coordination complexity.',
    'Top-level planning typically uses 20-40% of total tokens for strategy and decomposition.',
    'Mid-level coordination consumes 30-50% for task delegation and result synthesis.',
    'Bottom-level execution uses remaining 30-40% for concrete task completion.',
    'Coordination overhead can increase total usage by 50-100% vs flat approaches.',
    'Optimize level boundaries and caching to minimize redundant coordination communication.'
  ];

  const bestUseCases = [
    'Complex project management requiring multi-level planning and execution coordination.',
    'Large-scale content creation with strategic, tactical, and operational planning levels.',
    'Enterprise process automation with organizational hierarchy and approval workflows.',
    'Multi-domain problem solving requiring specialized coordination at different abstraction levels.',
    'Quality assurance processes with hierarchical review and validation requirements.',
    'Research and development projects with strategic planning and detailed implementation phases.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Hierarchical Planning in the Now (Kaelbling & Lozano-Pérez, 2011)', url: 'https://arxiv.org/abs/1011.3692' },
        { title: 'Learning Hierarchical Task Networks for Complex Control Tasks', url: 'https://arxiv.org/abs/1909.07838' },
        { title: 'Hierarchical Reinforcement Learning: A Survey (Barto & Mahadevan, 2003)', url: 'https://www.jair.org/index.php/jair/article/view/10266' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Hierarchical Agent Architectures', url: 'https://python.langchain.com/docs/modules/agents/agent_types/hierarchical_agent' },
        { title: 'OpenAI Multi-Agent Hierarchical Systems', url: 'https://platform.openai.com/docs/guides/hierarchical-agents' },
        { title: 'Microsoft AutoGen Hierarchical Multi-Agent Framework', url: 'https://microsoft.github.io/autogen/docs/tutorial/hierarchical-agents' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain hierarchical agent and multi-agent frameworks', url: '#' },
        { title: 'Microsoft AutoGen for hierarchical agent coordination', url: '#' },
        { title: 'CrewAI for hierarchical team-based task execution', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Hierarchical agent patterns', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Multi-agent hierarchical systems', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Microsoft AutoGen Community - Hierarchical coordination', url: 'https://github.com/microsoft/autogen/discussions' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-violet-500/10 to-purple-500/10"
        borderClass="border-violet-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Hierarchical chaining organizes task processing across multiple abstraction levels with clear parent-child 
          relationships. High-level prompts handle strategic planning and coordination, while lower levels focus on 
          tactical execution, creating scalable systems that mirror organizational structures and decision-making hierarchies.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🏗️</div>
            <div className="text-xs text-gray-400 mb-1">Structure</div>
            <div className="text-sm font-medium text-white">Multi-level hierarchy</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-xs text-gray-400 mb-1">Coordination</div>
            <div className="text-sm font-medium text-white">Top-down planning</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Execution</div>
            <div className="text-sm font-medium text-white">Bottom-up results</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Communication</div>
            <div className="text-sm font-medium text-white">Cross-level flow</div>
          </div>
        </div>
      </TechniqueSection>

      {/* Workflow / Steps */}
      <ListSection
        title="Workflow / Steps"
        items={workflowSteps}
        colorClass="bg-purple-500"
        ordered={true}
      />

      {/* Best Practices */}
      <BestPracticesSection practices={bestPractices} />

      {/* When NOT to Use */}
      <ListSection
        title="When NOT to Use"
        items={whenNotToUse}
        colorClass="bg-red-500"
      />

      {/* Common Pitfalls */}
      <ListSection
        title="Common Pitfalls"
        items={commonPitfalls}
        colorClass="bg-amber-500"
      />

      {/* Key Features */}
      <KeyFeaturesSection features={keyFeatures} />

      {/* KPIs / Success Metrics */}
      <ListSection
        title="KPIs / Success Metrics"
        items={kpiMetrics}
        colorClass="bg-emerald-500"
      />

      {/* Token / Resource Usage */}
      <ListSection
        title="Token / Resource Usage"
        items={tokenUsage}
        colorClass="bg-indigo-500"
      />

      {/* Best Use Cases */}
      <ListSection
        title="Best Use Cases"
        items={bestUseCases}
        colorClass="bg-fuchsia-500"
      />

      {/* References & Further Reading */}
      <ReferencesSection categories={references} />
    </>
  );
};

export default HierarchicalChainingDetails;