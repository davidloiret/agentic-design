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

interface GoalDecompositionDetailsProps {
  selectedTechnique: any;
}

export const GoalDecompositionDetails: React.FC<GoalDecompositionDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define', detail: 'Set SMART goal with scope, constraints, and success criteria' },
      { num: '2', action: 'Decompose', detail: 'Break into sub-goals and validate coverage' },
      { num: '3', action: 'Map', detail: 'Create dependency graph (DAG) and identify critical path' },
      { num: '4', action: 'Prioritize', detail: 'Rank by impact × urgency × feasibility' },
      { num: '5', action: 'Execute', detail: 'Monitor progress and adapt based on feedback' }
    ],
    example: 'improve_model_performance → [data_quality, architecture, training, validation] → executable_tasks'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Write SMART goals with explicit scope and success criteria', icon: '✅' },
    { type: 'do', text: 'Create dependency graph (DAG) to identify critical path', icon: '✅' },
    { type: 'do', text: 'Define acceptance criteria and quality gates for each sub-goal', icon: '✅' },
    { type: 'do', text: 'Use evidence-driven prioritization (impact × urgency × feasibility)', icon: '✅' },
    { type: 'do', text: 'Implement progress tracking with milestone checkpoints', icon: '✅' },
    { type: 'do', text: 'Separate LLM ideation from symbolic validation/scheduling', icon: '✅' },
    { type: 'do', text: 'Version goal trees and reuse proven templates', icon: '✅' },
    { type: 'do', text: 'Track risks and maintain mitigation tasks alongside delivery', icon: '✅' },
    { type: 'dont', text: 'Over-decompose simple goals (planning overhead vs benefit)', icon: '❌' },
    { type: 'dont', text: 'Ignore dependencies leading to plan invalidation downstream', icon: '❌' },
    { type: 'dont', text: 'Create unbounded iterations without stop criteria', icon: '❌' },
    { type: 'dont', text: 'Focus on activity metrics instead of outcome measurements', icon: '❌' },
    { type: 'dont', text: 'Skip stakeholder alignment on goal definitions', icon: '❌' },
    { type: 'dont', text: 'Use for safety-critical actions without human review', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-workstream programs',
      'Product launches with many dependencies',
      'Research roadmaps requiring coordination',
      'Strategic planning with measurable outcomes',
      'Personal development with structured progress',
      'Operational excellence initiatives'
    ],
    avoidWhen: [
      'Trivial single-step tasks',
      'Ill-defined goals without stakeholder alignment',
      'Hard real-time systems with microsecond budgets',
      'Safety-critical actions requiring formal verification',
      'Rapidly changing requirements without stability',
      'Simple linear processes without dependencies'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Goal Attainment Rate', measure: '% of sub-goals completed successfully' },
    { metric: 'Timeline Variance', measure: 'Actual vs planned completion time' },
    { metric: 'Critical Path Efficiency', measure: 'On-time milestone delivery rate' },
    { metric: 'Decomposition Quality', measure: 'Coverage validation and peer review scores' },
    { metric: 'Resource Utilization', measure: 'Actual vs estimated effort and cost' },
    { metric: 'Replanning Frequency', measure: 'Number of plan adjustments per goal' },
    { metric: 'Parallel Work Ratio', measure: '% tasks executed concurrently vs sequentially' }
  ];

  // Top Use Cases
  const topUseCases = [
    'AI Model Development: "Improve accuracy 87%→95%" → Data quality + Architecture optimization + Training enhancement + Validation with measurable checkpoints',
    'Product Launch: "Launch e-commerce platform in 6 months" → Frontend + Backend + Payments + Testing with dependency tracking and parallel workstreams',
    'Research Project: "Complete market analysis study" → Literature review + Data collection + Statistical analysis + Report generation with milestone gates',
    'Personal Development: "Become machine learning expert" → Foundation courses + Practical projects + Portfolio building + Job preparation with progress tracking',
    'Business Strategy: "Enter new market segment" → Market research + Product adaptation + Partnership development + Launch execution with risk mitigation',
    'Software Architecture: "Migrate to microservices" → Service identification + Database splitting + API design + Deployment automation with rollback plans',
    'Educational Curriculum: "Design AI safety course" → Learning objectives + Content development + Assessment design + Delivery optimization with feedback loops',
    'Operational Excellence: "Reduce customer support response time 50%" → Process analysis + Tool optimization + Training programs + Quality monitoring'
  ];

  const references = [
    {
      title: 'Academic Research',
      items: [
        { title: 'SMART Goals and Systematic Planning (Doran, 1981)', url: 'https://en.wikipedia.org/wiki/SMART_criteria' },
        { title: 'Tree of Thoughts: Deliberate Problem Solving (2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Planning with Large Language Models (2023)', url: 'https://arxiv.org/abs/2307.03893' },
        { title: 'Hierarchical Task Network Planning Overview (2014)', url: 'https://arxiv.org/abs/1403.7426' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'LangGraph: Planner-Executor Patterns', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'Prefect: DAG-based Workflow Orchestration', url: 'https://docs.prefect.io/' },
        { title: 'Apache Airflow: Task Dependency Management', url: 'https://airflow.apache.org/docs/' },
        { title: 'GitHub Projects: Goal and Milestone Tracking', url: 'https://docs.github.com/en/issues/planning-and-tracking' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'NetworkX - Python Dependency Graph Library', url: 'https://networkx.org/' },
        { title: 'Mermaid - Goal Tree Visualization', url: 'https://mermaid.js.org/' },
        { title: 'LangChain - LLM-assisted Planning', url: 'https://python.langchain.com/' },
        { title: 'DSPy - Structured Goal Programming', url: 'https://dspy.ai/' }
      ]
    },
    {
      title: 'Best Practices & Methodologies',
      items: [
        { title: 'OKRs (Objectives and Key Results) Framework', url: 'https://en.wikipedia.org/wiki/OKR' },
        { title: 'Agile Goal Setting and Sprint Planning', url: 'https://www.scrum.org/resources/what-is-sprint-planning' },
        { title: 'Critical Path Method (CPM) for Dependencies', url: 'https://en.wikipedia.org/wiki/Critical_path_method' },
        { title: 'Getting Things Done (GTD) Methodology', url: 'https://gettingthingsdone.com/' }
      ]
    },
    {
      title: 'Community & Research',
      items: [
        { title: 'ICAPS - International Conference on Planning', url: 'https://icaps-conference.org/' },
        { title: 'Project Management Institute (PMI)', url: 'https://www.pmi.org/' },
        { title: 'Product Management Community', url: 'https://www.productmanagement.org/' },
        { title: 'Goal Setting Research Community', url: 'https://www.goalsresearch.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic breakdown of complex objectives into achievable, measurable sub-goals with clear success criteria"
        why="Transforms vague ambitions into executable plans, enables progress tracking, and reduces overwhelming complexity through structured decomposition"
        keyInsight="SMART goals + dependency mapping + impact prioritization + progress monitoring = systematic achievement"
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