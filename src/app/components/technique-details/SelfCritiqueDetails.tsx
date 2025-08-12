'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface SelfCritiqueDetailsProps {
  selectedTechnique: any;
}

export const SelfCritiqueDetails: React.FC<SelfCritiqueDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Generate initial response using standard prompting strategies optimized for the specific task domain.',
    'Apply systematic critique process examining accuracy, completeness, logic, and alignment with requirements.',
    'Identify specific weaknesses, gaps, errors, and areas for improvement through structured analysis.',
    'Revise response based on critique findings, addressing identified issues while preserving strengths.',
    'Validate revised response quality and repeat critique cycle if further improvements are needed.',
    'Finalize output with confidence assessment and rationale for key decisions and trade-offs.'
  ];

  const bestPractices = [
    'Design critique criteria specific to the task domain: factual accuracy, logical consistency, completeness.',
    'Use structured critique templates to ensure systematic evaluation across all important quality dimensions.',
    'Implement multiple critique perspectives: accuracy, helpfulness, safety, and alignment with user intent.',
    'Balance critique severity to identify real issues without over-criticizing acceptable responses.',
    'Document critique reasoning and revision rationale for transparency and debugging purposes.',
    'Set maximum iteration limits to prevent endless revision cycles and control computational costs.',
    'Validate self-critique accuracy against ground truth or human evaluation when possible.'
  ];

  const whenNotToUse = [
    'Simple tasks where initial response quality is consistently high and critique adds unnecessary overhead.',
    'Real-time applications where iteration latency conflicts with strict response time requirements.',
    'Resource-constrained environments where critique and revision costs exceed quality improvement benefits.',
    'Domains where critique criteria are subjective or difficult to define objectively and systematically.',
    'Cases where external validation is required and self-assessment cannot provide adequate quality assurance.'
  ];

  const commonPitfalls = [
    'Over-critical analysis that leads to unnecessary revisions and degraded response quality.',
    'Vague critique criteria resulting in inconsistent evaluation and ineffective improvement guidance.',
    'Infinite revision loops when stopping criteria are poorly defined or overly stringent.',
    'Self-critique bias where the same model limitations affect both generation and evaluation phases.',
    'Inadequate validation of critique quality leading to systematic errors in evaluation and revision.',
    'Ignoring computational costs of iteration cycles relative to actual quality improvements achieved.'
  ];

  const keyFeatures = [
    'Systematic critique process with structured evaluation across multiple quality dimensions',
    'Iterative improvement cycles with targeted revisions based on specific critique findings',
    'Configurable critique criteria adaptable to different task domains and quality requirements',
    'Transparent reasoning with documented critique rationale and revision decision justification',
    'Quality convergence detection with stopping criteria to prevent over-iteration and resource waste',
    'Performance monitoring with critique accuracy validation and improvement measurement'
  ];

  const kpiMetrics = [
    'Quality improvement: Measurable enhancement in response quality metrics after critique and revision.',
    'Critique accuracy: Precision of identifying actual quality issues vs false positive critique findings.',
    'Convergence efficiency: Number of iterations required to reach acceptable quality thresholds.',
    'Cost-benefit ratio: Quality improvement per additional token spent on critique and revision cycles.',
    'Stopping decision accuracy: Precision of determining when responses have reached optimal quality.',
    'Consistency: Variance in critique quality and revision outcomes across similar tasks and inputs.'
  ];

  const tokenUsage = [
    'Total token cost includes initial generation + critique analysis + revision generation per iteration.',
    'Critique typically uses 30-50% of original generation tokens for systematic quality evaluation.',
    'Revision costs vary by extent of changes: minor edits 20-40%, major rewrites 80-100% of original.',
    'Multiple iterations can increase total cost by 2-4x but often provide 20-40% quality improvement.',
    'Monitor quality-per-token efficiency to optimize critique criteria and stopping thresholds.',
    'Cache critique patterns and common revision strategies to reduce redundant analysis overhead.'
  ];

  const bestUseCases = [
    'High-stakes content generation where accuracy and quality are critical for decision making.',
    'Complex reasoning tasks requiring systematic validation of logic and conclusion soundness.',
    'Creative writing and content creation benefiting from iterative refinement and improvement.',
    'Technical documentation requiring accuracy, completeness, and clarity optimization.',
    'Educational content creation where factual accuracy and pedagogical effectiveness are essential.',
    'Research and analysis tasks requiring systematic validation of methodology and conclusions.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Self-Critique and Constitutional AI Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/self_critique' },
        { title: 'OpenAI Self-Evaluation and Improvement Strategies', url: 'https://platform.openai.com/docs/guides/prompt-engineering/strategy-ask-the-model-to-evaluate-its-own-outputs' },
        { title: 'Anthropic Constitutional AI Implementation Guide', url: 'https://docs.anthropic.com/claude/docs/constitutional-ai' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain constitutional chain and self-critique implementations', url: '#' },
        { title: 'OpenAI function calling for structured self-evaluation', url: '#' },
        { title: 'Custom evaluation frameworks and quality scoring systems', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Self-improvement and critique patterns', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Self-evaluation and constitutional AI', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Model self-assessment strategies', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-red-500/10 to-orange-500/10"
        borderClass="border-red-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Self-Critique enables models to evaluate and improve their own outputs through systematic analysis of quality 
          dimensions. This iterative process identifies weaknesses, generates targeted revisions, and converges toward 
          higher-quality responses through structured self-evaluation and improvement cycles.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-xs text-gray-400 mb-1">Analyze</div>
            <div className="text-sm font-medium text-white">Systematic critique</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Identify</div>
            <div className="text-sm font-medium text-white">Quality issues</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">✏️</div>
            <div className="text-xs text-gray-400 mb-1">Revise</div>
            <div className="text-sm font-medium text-white">Targeted improvements</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-xs text-gray-400 mb-1">Improve</div>
            <div className="text-sm font-medium text-white">Quality convergence</div>
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

export default SelfCritiqueDetails;