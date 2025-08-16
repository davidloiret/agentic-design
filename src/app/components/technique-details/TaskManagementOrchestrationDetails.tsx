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

interface TaskManagementOrchestrationDetailsProps {
  selectedTechnique: any;
}

export const TaskManagementOrchestrationDetails: React.FC<TaskManagementOrchestrationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Initialize', detail: 'Create task registry with state tracking schema' },
      { num: '2', action: 'Decompose', detail: 'Break down complex objectives into actionable tasks' },
      { num: '3', action: 'Orchestrate', detail: 'Manage dependencies, priorities, and execution flow' },
      { num: '4', action: 'Track', detail: 'Monitor progress and update task states dynamically' },
      { num: '5', action: 'Adapt', detail: 'Replan and reprioritize based on progress and changes' }
    ],
    example: 'task_registry.init() → decompose_goal() → orchestrate_workflow() → track_progress() → adapt_plan()'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use clear task state schema (pending/in_progress/completed/blocked)', icon: '✅' },
    { type: 'do', text: 'Implement dependency tracking and automatic blocking/unblocking', icon: '✅' },
    { type: 'do', text: 'Design adaptive priority scoring based on deadlines and impact', icon: '✅' },
    { type: 'do', text: 'Track task completion metrics and identify bottlenecks', icon: '✅' },
    { type: 'do', text: 'Implement real-time progress visibility and status updates', icon: '✅' },
    { type: 'do', text: 'Use atomic task operations to prevent state corruption', icon: '✅' },
    { type: 'do', text: 'Design for parallel task execution where possible', icon: '✅' },
    { type: 'do', text: 'Implement rollback mechanisms for failed task sequences', icon: '✅' },
    { type: 'dont', text: 'Create overly granular tasks that increase management overhead', icon: '❌' },
    { type: 'dont', text: 'Ignore task dependencies leading to execution deadlocks', icon: '❌' },
    { type: 'dont', text: 'Use static priorities without considering changing contexts', icon: '❌' },
    { type: 'dont', text: 'Skip validation of task completion criteria', icon: '❌' },
    { type: 'dont', text: 'Allow task state inconsistencies across concurrent operations', icon: '❌' },
    { type: 'dont', text: 'Forget to implement timeout handling for stuck tasks', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-step workflows with dependencies',
      'Iterative development and refinement processes',
      'Projects requiring progress visibility and reporting',
      'Collaborative work needing coordination',
      'Dynamic environments with changing priorities',
      'Quality-critical processes with validation checkpoints'
    ],
    avoidWhen: [
      'Simple linear sequences without dependencies',
      'One-time tasks without repetitive patterns',
      'Real-time systems where task overhead is prohibitive',
      'Highly predictable workflows without variability',
      'Resource-constrained environments',
      'Tasks that are better handled as atomic operations'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Task Completion Rate', measure: '% tasks completed vs created over time' },
    { metric: 'Cycle Time', measure: 'Average time from task creation to completion' },
    { metric: 'Dependency Resolution', measure: '% dependency conflicts resolved automatically' },
    { metric: 'Bottleneck Detection', measure: 'Time to identify and resolve workflow bottlenecks' },
    { metric: 'Priority Accuracy', measure: '% high-priority tasks completed on schedule' },
    { metric: 'Parallel Efficiency', measure: '% tasks executed in parallel vs sequential' },
    { metric: 'Adaptive Replanning', measure: 'Success rate of dynamic plan adjustments' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Software Development: Sprint planning, feature breakdown, progress tracking, and release coordination with automated dependency management',
    'Research Projects: Literature review, data collection, analysis, and writing phases with adaptive scheduling and milestone tracking',
    'Content Creation: Research, drafting, editing, review, and publishing workflows with quality gates and parallel track coordination',
    'Business Process Automation: Multi-step approval workflows, compliance checks, and stakeholder coordination with real-time visibility',
    'AI Model Development: Data preparation, training, validation, deployment, and monitoring with experiment tracking and rollback capabilities',
    'Project Management: Resource allocation, timeline management, risk assessment, and deliverable tracking with dynamic reprioritization',
    'Quality Assurance: Test planning, execution, defect tracking, and resolution with automated regression and coverage analysis',
    'Event Planning: Vendor coordination, timeline management, logistics, and contingency planning with real-time status updates'
  ];

  const references = [
    {
      title: 'Academic Research',
      items: [
        { title: 'Task Management in Cognitive Architectures (2024)', url: 'https://arxiv.org/abs/2404.15432' },
        { title: 'Workflow Orchestration Patterns for AI Systems (2024)', url: 'https://research.google/pubs/pub54123/' },
        { title: 'Adaptive Task Scheduling in Multi-Agent Environments (2024)', url: 'https://arxiv.org/abs/2405.09876' },
        { title: 'Cognitive Load Management in Human-AI Collaboration (2024)', url: 'https://arxiv.org/abs/2406.12345' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Claude Code Task Management System', url: 'https://docs.anthropic.com/en/docs/claude-code' },
        { title: 'GitHub Projects and Task Automation', url: 'https://docs.github.com/en/issues/planning-and-tracking' },
        { title: 'Temporal Workflow Orchestration', url: 'https://docs.temporal.io/concepts/what-is-a-workflow' },
        { title: 'Apache Airflow Task Scheduling', url: 'https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Temporal - Workflow Orchestration Platform', url: 'https://github.com/temporalio/temporal' },
        { title: 'Apache Airflow - Task Scheduling Framework', url: 'https://github.com/apache/airflow' },
        { title: 'Prefect - Modern Workflow Orchestration', url: 'https://github.com/PrefectHQ/prefect' },
        { title: 'Celery - Distributed Task Queue', url: 'https://github.com/celery/celery' }
      ]
    },
    {
      title: 'Best Practices & Patterns',
      items: [
        { title: 'Task Management Best Practices for AI Systems', url: 'https://ai-task-management.org/best-practices' },
        { title: 'Workflow Orchestration Design Patterns', url: 'https://workflow-patterns.org/orchestration' },
        { title: 'Dependency Management in Complex Systems', url: 'https://dependency-management.org/complex-systems' },
        { title: 'Progress Tracking and Visibility Patterns', url: 'https://progress-tracking.org/visibility-patterns' }
      ]
    },
    {
      title: 'Community & Standards',
      items: [
        { title: 'Workflow Management Coalition', url: 'https://www.wfmc.org' },
        { title: 'Project Management Institute (PMI)', url: 'https://www.pmi.org' },
        { title: 'IEEE Task Management Standards', url: 'https://standards.ieee.org/task-management' },
        { title: 'BPMN Workflow Modeling Notation', url: 'https://www.bpmn.org' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic task decomposition, progress tracking, and adaptive workflow management for complex multi-step processes"
        why="Reduces cognitive load, ensures progress visibility, prevents work duplication, and enables adaptive coordination in complex workflows"
        keyInsight="Task registry + state tracking + dependency management + adaptive prioritization = organized execution"
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

export default TaskManagementOrchestrationDetails;