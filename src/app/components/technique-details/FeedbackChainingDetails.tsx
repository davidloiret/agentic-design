'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './shared/BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './shared/KeyFeaturesSection';
import ReferencesSection from './shared/ReferencesSection';

interface FeedbackChainingDetailsProps {
  selectedTechnique: any;
}

export const FeedbackChainingDetails: React.FC<FeedbackChainingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Define quality criteria and evaluation rubrics with specific, measurable thresholds.',
    'Generate initial output using appropriate prompting and generation strategies.',
    'Evaluate output against criteria using rules, rubrics, or model-as-judge approach.',
    'Collect specific, actionable feedback focusing on areas needing improvement.',
    'Revise output based on feedback, targeting identified weaknesses and gaps.',
    'Repeat evaluation-revision loop until quality threshold met or max iterations reached.',
    'Finalize output with quality score and iteration history for transparency.'
  ];

  const bestPractices = [
    'Use a lightweight evaluator where possible; reserve strongest model for final acceptance.',
    'Truncate history aggressively: pass distilled state (facts, constraints, last diff) instead of full transcripts.',
    'Set max iterations and early-stop on small deltas to prevent infinite loops and control costs.',
    'Design structured feedback formats to guide focused revisions rather than general critiques.',
    'Implement confidence thresholds to determine when additional iterations provide diminishing returns.',
    'Cache evaluation results and reuse across similar tasks to improve efficiency.',
    'Monitor convergence patterns to optimize evaluation criteria and stopping conditions.'
  ];

  const whenNotToUse = [
    'Simple tasks where the first attempt typically meets quality requirements.',
    'Real-time applications with strict latency constraints that cannot afford iteration cycles.',
    'Tasks lacking clear evaluation criteria or measurable quality thresholds.',
    'Resource-constrained environments where multiple generation rounds are prohibitive.',
    'Cases where human evaluation is required and automated feedback is insufficient.'
  ];

  const commonPitfalls = [
    'Vague or inconsistent evaluation criteria leading to poor feedback quality.',
    'Infinite loops when stop conditions are poorly calibrated or missing.',
    'Excessive iteration costs without proportional quality improvements.',
    'Feedback that is too generic to guide effective revisions.',
    'Over-reliance on automated evaluation without human validation of final outputs.',
    'Poor state management causing loss of important context between iterations.'
  ];

  const keyFeatures = [
    'Iterative generate-evaluate-improve loop with quality convergence tracking',
    'Flexible evaluation strategies: rules, rubrics, or model-as-judge approaches',
    'Structured feedback collection with actionable improvement guidance',
    'Configurable stopping conditions with max iterations and convergence thresholds',
    'History management with context preservation and truncation strategies',
    'Quality scoring and transparency with iteration tracking and rationale logging'
  ];

  const kpiMetrics = [
    'Quality gain per iteration: Δ score per iteration until convergence.',
    'Convergence iterations: Average iterations to reach target or stop.',
    'Judge consistency: Inter-rater or self-consistency of evaluator.',
    'Target attainment rate: Share of runs achieving target threshold.',
    'Cost per improvement point: Tokens per +1 score or per acceptance.',
    'Early stop rate: Runs halted due to small deltas or max-iter cap.'
  ];

  const tokenUsage = [
    'Total cost ≈ Σ over iterations of (generator tokens + evaluator tokens + revision tokens). Expect diminishing returns; optimize for early convergence.',
    'Use a lightweight evaluator where possible; reserve strongest model for final acceptance.',
    'Truncate history aggressively: pass distilled state (facts, constraints, last diff) instead of full transcripts.',
    'Set max iterations and early-stop on small deltas to prevent cost explosion.',
    'Cache evaluation results and feedback patterns to reduce redundant processing.',
    'Monitor cost-per-quality-point to optimize iteration strategies and stopping thresholds.'
  ];

  const bestUseCases = [
    'Content creation requiring iterative refinement for quality and style.',
    'Code generation with compilation, testing, and improvement cycles.',
    'Academic writing with peer review simulation and revision processes.',
    'Creative tasks where multiple perspectives and refinements add value.',
    'Quality assurance scenarios requiring systematic improvement until standards are met.',
    'Complex problem-solving where initial attempts need debugging and enhancement.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)', url: 'https://arxiv.org/abs/2303.17651' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Training Language Models to Follow Instructions with Human Feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Self-Critique and Refinement Chains', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/self_critique' },
        { title: 'OpenAI Iterative Prompting Best Practices', url: 'https://platform.openai.com/docs/guides/prompt-engineering/iterative-prompting' },
        { title: 'Anthropic Constitutional AI Implementation', url: 'https://docs.anthropic.com/claude/docs/constitutional-ai' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain feedback and critique chain implementations', url: '#' },
        { title: 'OpenAI function calling for structured evaluation', url: '#' },
        { title: 'Custom evaluation frameworks and rubric systems', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Feedback loop patterns', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Self-refinement discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Iterative improvement strategies', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-blue-500/10 to-purple-500/10"
        borderClass="border-blue-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Feedback chaining runs an iterative loop: generate → evaluate → improve, repeating until a target quality 
          threshold or stop condition is met. An evaluator (rules, rubric, or model-as-judge) produces specific feedback 
          that drives focused revisions, enabling convergence to higher quality outputs.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Flow</div>
            <div className="text-sm font-medium text-white">Looped iterations</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🧪</div>
            <div className="text-xs text-gray-400 mb-1">Evaluation</div>
            <div className="text-sm font-medium text-white">Rubrics & scoring</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-gray-400 mb-1">Convergence</div>
            <div className="text-sm font-medium text-white">Stop when target met</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🧭</div>
            <div className="text-xs text-gray-400 mb-1">Control</div>
            <div className="text-sm font-medium text-white">Quality gates</div>
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

export default FeedbackChainingDetails;