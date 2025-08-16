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

interface HierarchicalTaskNetworkPlanningDetailsProps {
  selectedTechnique: any;
}

export const HierarchicalTaskNetworkPlanningDetails: React.FC<HierarchicalTaskNetworkPlanningDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Domain', detail: 'Tasks (compound/primitive), methods, conditions' },
      { num: '2', action: 'Create Methods', detail: 'Decomposition rules: when & how to break tasks' },
      { num: '3', action: 'Build Network', detail: 'Hierarchical task structure with constraints' },
      { num: '4', action: 'Plan & Execute', detail: 'Decompose top-level goal → primitive actions' },
      { num: '5', action: 'Monitor & Adapt', detail: 'Replan if conditions change or methods fail' }
    ],
    example: 'analyze_market → [gather_data, process_info, generate_report] → primitive_actions'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Encode domain expertise in methods and conditions', icon: '✅' },
    { type: 'do', text: 'Use clear task hierarchies with proper abstraction levels', icon: '✅' },
    { type: 'do', text: 'Define preconditions and effects for each method', icon: '✅' },
    { type: 'do', text: 'Implement backtracking when decomposition fails', icon: '✅' },
    { type: 'do', text: 'Cache successful decomposition patterns', icon: '✅' },
    { type: 'do', text: 'Design reusable method libraries for domains', icon: '✅' },
    { type: 'dont', text: 'Create overly deep hierarchies (>5-6 levels)', icon: '❌' },
    { type: 'dont', text: 'Ignore method ordering constraints and dependencies', icon: '❌' },
    { type: 'dont', text: 'Use HTN for simple linear task sequences', icon: '❌' },
    { type: 'dont', text: 'Hard-code solutions without conditional methods', icon: '❌' },
    { type: 'dont', text: 'Skip validation of method preconditions', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-step workflows',
      'Domain expertise can be encoded',
      'Hierarchical task structure exists',
      'Multiple solution approaches possible',
      'Need human-interpretable plans',
      'Reusable planning components'
    ],
    avoidWhen: [
      'Simple linear task sequences',
      'Unknown or rapidly changing domains',
      'Real-time reactive behaviors',
      'No clear task hierarchy',
      'Purely data-driven approaches needed',
      'Single-shot optimization problems'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Plan Success Rate', measure: '% plans that execute successfully' },
    { metric: 'Decomposition Depth', measure: 'Average levels in task hierarchy' },
    { metric: 'Planning Time', measure: 'Time to generate executable plan' },
    { metric: 'Method Reuse Rate', measure: '% methods reused across plans' },
    { metric: 'Backtrack Frequency', measure: '% plans requiring backtracking' },
    { metric: 'Domain Coverage', measure: '% domain tasks plannable' },
    { metric: 'Plan Optimality', measure: 'Quality vs optimal solution' },
    { metric: 'Execution Efficiency', measure: 'Primitive actions per goal achieved' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Autonomous Research Agents: Literature review → data extraction → analysis → synthesis',
    'Software Development: Requirements → design → implementation → testing → deployment',
    'Manufacturing: Product planning → resource allocation → production → quality control',
    'Game AI: Strategic goals → tactical objectives → unit actions → movement primitives',
    'Robotics: Navigate → path planning → motion control → actuator commands',
    'Business Process: Strategic planning → resource allocation → task execution → monitoring',
    'Military Planning: Mission objectives → tactical plans → unit assignments → actions',
    'Educational Systems: Learning goals → curriculum design → lesson planning → activities'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'An Overview of Hierarchical Task Network Planning (ArXiv 2014)', url: 'https://arxiv.org/abs/1403.7426' },
        { title: 'HTN planning: Overview, comparison, and beyond (ScienceDirect 2015)', url: 'https://www.sciencedirect.com/science/article/pii/S0004370215000247' },
        { title: 'Hierarchical Task Network Planning for Facilitating Cooperative Multi-Agent Reinforcement Learning (ArXiv 2023)', url: 'https://arxiv.org/abs/2306.08359' },
        { title: 'A Structural Complexity Analysis of Hierarchical Task Network Planning (ArXiv 2024)', url: 'https://arxiv.org/abs/2401.14174' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Hierarchical Task Network (HTN) Planning in AI - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/hierarchical-task-network-htn-planning-in-ai/' },
        { title: 'An Introduction to Hierarchical Task Network Planning (University of Ulm)', url: 'https://www.uni-ulm.de/fileadmin/website_uni_ulm/iui.inst.090/Publikationen/2018/HTN-Tutorial-Part-I.pdf' },
        { title: 'Exploring HTN Planners through Example (Game AI Pro)', url: 'https://www.gameaipro.com/GameAIPro/GameAIPro_Chapter12_Exploring_HTN_Planners_through_Example.pdf' },
        { title: 'HTN Planning Tutorial (Michigan Tech)', url: 'https://pages.mtu.edu/~nilufer/classes/cs5811/2012-fall/lecture-slides/cs5811-ch11b-htn.pdf' }
      ]
    },
    {
      title: 'Tools & Implementations',
      items: [
        { title: 'GPT-HTN-Planner - LLM-based HTN Planning', url: 'https://github.com/DaemonIB/GPT-HTN-Planner' },
        { title: 'SHOP2 - HTN Planner (University of Maryland)', url: 'https://www.cs.umd.edu/projects/shop/' },
        { title: 'PYHOP - Python HTN Planning Library', url: 'https://github.com/dananau/pyhop' },
        { title: 'Fluid HTN - Unity Game Engine Implementation', url: 'https://github.com/ptrefall/fluid-hierarchical-task-network' }
      ]
    },
    {
      title: 'Research Centers & Communities',
      items: [
        { title: 'International Conference on Automated Planning and Scheduling (ICAPS)', url: 'https://icaps-conference.org/' },
        { title: 'University of Maryland AI Planning Research', url: 'https://www.cs.umd.edu/projects/planning/' },
        { title: 'AIPS Planning Competition', url: 'http://www.icaps-conference.org/index.php/main/competitions' },
        { title: 'Stack Overflow - HTN Planning Discussions', url: 'https://stackoverflow.com/questions/tagged/htn-planning' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Hierarchical decomposition of complex tasks into manageable sub-tasks using domain knowledge"
        why="Enables efficient planning through abstraction, reusable expertise, and human-interpretable solutions"
        keyInsight="Tasks (compound→primitive) + Methods (how to decompose) + Conditions (when to apply) = Hierarchical Plans"
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

export default HierarchicalTaskNetworkPlanningDetails;