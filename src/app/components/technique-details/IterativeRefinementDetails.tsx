'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface IterativeRefinementDetailsProps {
  selectedTechnique: any;
}

export const IterativeRefinementDetails: React.FC<IterativeRefinementDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Generate initial output using base prompts and strategies optimized for first-pass quality.',
    'Apply systematic refinement operations: expand details, improve clarity, enhance structure.',
    'Validate refinement quality using automated checks, rubrics, or consistency measures.',
    'Iterate refinement cycles with progressive improvement and diminishing returns monitoring.',
    'Implement convergence detection to identify when additional iterations provide minimal value.',
    'Finalize output with quality metrics and iteration history for transparency and debugging.'
  ];

  const bestPractices = [
    'Define specific refinement objectives for each iteration to maintain focus and progress.',
    'Use lightweight validation between iterations to catch issues early and guide refinement direction.',
    'Implement progressive refinement strategies targeting different aspects (content, structure, style).',
    'Set clear convergence criteria and maximum iteration limits to prevent endless refinement loops.',
    'Cache intermediate results and refinement patterns to improve efficiency and consistency.',
    'Monitor token usage and quality gains per iteration to optimize cost-effectiveness.',
    'Preserve refinement history for debugging, learning, and pattern recognition across tasks.'
  ];

  const whenNotToUse = [
    'Simple tasks where initial output quality is typically sufficient for requirements.',
    'Real-time applications with strict latency constraints that cannot afford iteration cycles.',
    'Cases where refinement criteria are subjective and difficult to measure objectively.',
    'Resource-constrained scenarios where iteration costs outweigh quality improvements.',
    'Tasks where consistency across outputs is more important than individual quality optimization.'
  ];

  const commonPitfalls = [
    'Unclear refinement objectives leading to random changes without systematic improvement.',
    'Over-refinement causing diminishing returns and unnecessary computational overhead.',
    'Poor convergence detection resulting in endless iteration loops or premature stopping.',
    'Inconsistent refinement strategies across iterations causing quality degradation.',
    'Insufficient tracking of quality changes making it difficult to optimize refinement processes.',
    'Neglecting computational cost vs quality improvement trade-offs.'
  ];

  const keyFeatures = [
    'Systematic refinement operations with clear objectives and measurable improvement criteria',
    'Progressive quality enhancement through multiple focused iteration cycles',
    'Automated convergence detection preventing endless loops and optimizing stopping points',
    'Comprehensive tracking of refinement history and quality evolution',
    'Configurable refinement strategies adaptable to different content types and requirements',
    'Cost-aware iteration management balancing quality gains with resource consumption'
  ];

  const kpiMetrics = [
    'Quality improvement per iteration: Measurable enhancement in target metrics across cycles.',
    'Convergence efficiency: Average iterations required to reach acceptable quality thresholds.',
    'Refinement consistency: Variance in quality improvements across similar tasks and iterations.',
    'Cost effectiveness: Quality gain per token spent compared to single-pass alternatives.',
    'Stopping accuracy: Precision of convergence detection in identifying optimal stopping points.',
    'Pattern recognition: Success rate of applying learned refinement strategies to new tasks.'
  ];

  const tokenUsage = [
    'Total cost scales linearly with iteration count: base generation + N × refinement cost.',
    'Typical refinement iterations use 60-80% of original generation tokens for analysis and improvement.',
    'Quality gains typically follow diminishing returns: highest improvement in first 2-3 iterations.',
    'Monitor cost per quality point to identify optimal stopping criteria for different task types.',
    'Cache stable refinement patterns and intermediate results to reduce redundant processing.',
    'Consider async refinement for non-critical paths to optimize user-perceived latency.'
  ];

  const bestUseCases = [
    'Creative writing and content generation requiring multiple revision cycles for quality.',
    'Technical documentation development with iterative clarity and accuracy improvements.',
    'Code optimization and refactoring with systematic enhancement and error correction.',
    'Academic and research writing requiring progressive refinement of arguments and structure.',
    'Product descriptions and marketing content optimization for engagement and conversion.',
    'Translation and localization tasks requiring cultural and linguistic refinement.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Iterative Refinement in the Interactive Fiction Domain (Ammanabrolu et al., 2020)', url: 'https://arxiv.org/abs/2010.02142' },
        { title: 'Learning to Refine Text via Iterative Editing (Schick et al., 2022)', url: 'https://arxiv.org/abs/2205.14490' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Self-Critique and Iterative Improvement Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/self_critique' },
        { title: 'OpenAI Iterative Prompting and Refinement Strategies', url: 'https://platform.openai.com/docs/guides/prompt-engineering/iterative-prompting' },
        { title: 'Anthropic Claude Constitutional AI and Self-Refinement', url: 'https://docs.anthropic.com/claude/docs/constitutional-ai' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain self-critique and refinement chain implementations', url: '#' },
        { title: 'OpenAI function calling for structured refinement feedback', url: '#' },
        { title: 'Custom iterative improvement frameworks and quality metrics', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Iterative refinement patterns', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Self-refinement and iterative improvement', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Iterative prompting techniques', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-rose-500/10 to-pink-500/10"
        borderClass="border-rose-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Iterative refinement systematically improves outputs through multiple focused cycles of enhancement. Each 
          iteration targets specific quality dimensions (content, structure, style) with measurable objectives, using 
          validation and convergence detection to optimize stopping points and prevent over-refinement.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Process</div>
            <div className="text-sm font-medium text-white">Iterative cycles</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-xs text-gray-400 mb-1">Quality</div>
            <div className="text-sm font-medium text-white">Progressive improvement</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Focus</div>
            <div className="text-sm font-medium text-white">Targeted refinement</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🛑</div>
            <div className="text-xs text-gray-400 mb-1">Control</div>
            <div className="text-sm font-medium text-white">Convergence detection</div>
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

export default IterativeRefinementDetails;