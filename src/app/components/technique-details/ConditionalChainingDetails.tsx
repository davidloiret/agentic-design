'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './shared/BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './shared/KeyFeaturesSection';
import ReferencesSection from './shared/ReferencesSection';

interface ConditionalChainingDetailsProps {
  selectedTechnique: any;
}

export const ConditionalChainingDetails: React.FC<ConditionalChainingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Define clear branching criteria with measurable conditions and decision thresholds.',
    'Design decision logic using rules, classifiers, or LLM-based routing with confidence scores.',
    'Create specialized prompt variants for each branch with optimized strategies per path.',
    'Implement routing mechanism with fallback policies and error handling for edge cases.',
    'Execute selected branch and track routing decisions for performance monitoring.',
    'Aggregate results with routing metadata and performance metrics for transparency.'
  ];

  const bestPractices = [
    'Keep decision criteria simple and fast; avoid complex routing that adds latency without value.',
    'Use lightweight classifiers or rule-based routing; reserve LLM routing for complex decisions only.',
    'Design symmetric branches with consistent output schemas to simplify downstream processing.',
    'Implement comprehensive fallback strategies for ambiguous or out-of-distribution inputs.',
    'Log routing decisions and branch performance metrics for continuous optimization.',
    'Cache routing decisions for similar inputs to improve efficiency and consistency.',
    'Monitor routing distribution to identify imbalanced branches or decision drift.'
  ];

  const whenNotToUse = [
    'Simple tasks where all inputs can be handled by a single, unified approach.',
    'Real-time applications where routing overhead significantly impacts latency requirements.',
    'Cases where decision criteria are unclear or constantly changing.',
    'Scenarios where branch outcomes need to be identical rather than specialized.',
    'Resource-constrained environments where multiple branch maintenance is prohibitive.'
  ];

  const commonPitfalls = [
    'Overly complex routing logic that becomes harder to maintain than the original problem.',
    'Poor decision boundaries causing frequent misrouting and degraded user experience.',
    'Branch specialization drift where similar branches diverge unnecessarily over time.',
    'Inadequate fallback handling leaving gaps for edge cases and unusual inputs.',
    'Insufficient monitoring of routing decisions leading to blind spots in performance.',
    'Over-optimization for rare cases at the expense of common path performance.'
  ];

  const keyFeatures = [
    'Dynamic path selection based on input characteristics and decision criteria',
    'Specialized processing branches optimized for different input types or scenarios',
    'Intelligent routing mechanisms with confidence scoring and fallback policies',
    'Comprehensive monitoring of routing decisions and branch performance metrics',
    'Flexible decision logic supporting rules, ML classifiers, and LLM-based routing',
    'Transparent routing history and decision rationale for debugging and optimization'
  ];

  const kpiMetrics = [
    'Routing accuracy: Correct branch selection rate vs human judgment or ground truth.',
    'Branch utilization: Distribution of traffic across branches to identify imbalances.',
    'Decision confidence: Average confidence scores for routing decisions.',
    'Fallback frequency: Rate of fallback activation indicating decision boundary issues.',
    'Branch performance: Quality metrics per branch compared to unified baseline.',
    'Routing latency: Time overhead for decision-making vs direct processing.'
  ];

  const tokenUsage = [
    'Variable cost depending on routing complexity and branch execution requirements.',
    'Lightweight routing (rules/classifiers) adds minimal overhead compared to unified processing.',
    'LLM-based routing increases cost by 10-30% but may improve downstream efficiency.',
    'Specialized branches can reduce per-branch token usage through targeted optimization.',
    'Monitor routing vs execution cost ratio to optimize decision complexity.',
    'Cache routing decisions and branch results to amortize costs across similar inputs.'
  ];

  const bestUseCases = [
    'Content processing requiring different strategies for various document types or formats.',
    'Customer service scenarios with distinct handling paths for different inquiry types.',
    'Code generation tasks requiring different approaches for various programming languages.',
    'Multi-modal inputs requiring specialized processing pipelines per modality.',
    'Quality control processes with different validation strategies per content category.',
    'Personalization systems adapting processing based on user profiles or preferences.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Mixture of Experts: A Simple and Effective Method for Conditional Computation', url: 'https://arxiv.org/abs/1701.06538' },
        { title: 'Switch Transformer: Scaling to Trillion Parameter Models (Fedus et al., 2021)', url: 'https://arxiv.org/abs/2101.03961' },
        { title: 'Routing Transformer for Complex Reasoning Tasks (Roy et al., 2021)', url: 'https://arxiv.org/abs/2110.07732' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Router Chains Documentation', url: 'https://python.langchain.com/docs/modules/chains/foundational/router' },
        { title: 'OpenAI Function Calling for Conditional Logic', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'Anthropic Claude Router Implementation Patterns', url: 'https://docs.anthropic.com/claude/docs/routing-patterns' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain RouterChain and MultiPromptChain implementations', url: '#' },
        { title: 'scikit-learn for classification-based routing', url: '#' },
        { title: 'FastAPI with conditional endpoint routing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Router chain patterns and best practices', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Conditional processing strategies', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Dynamic prompt routing techniques', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-cyan-500/10 to-blue-500/10"
        borderClass="border-cyan-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Conditional chaining routes inputs to specialized processing branches based on decision criteria. A routing 
          mechanism (rules, classifier, or LLM) analyzes input characteristics and selects the most appropriate branch, 
          enabling optimized processing paths for different scenarios while maintaining consistent output formats.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔀</div>
            <div className="text-xs text-gray-400 mb-1">Flow</div>
            <div className="text-sm font-medium text-white">Dynamic routing</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Specialization</div>
            <div className="text-sm font-medium text-white">Branch optimization</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-xs text-gray-400 mb-1">Decision</div>
            <div className="text-sm font-medium text-white">Intelligent routing</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xs text-gray-400 mb-1">Monitoring</div>
            <div className="text-sm font-medium text-white">Performance tracking</div>
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

export default ConditionalChainingDetails;