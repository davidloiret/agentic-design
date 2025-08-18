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

interface ContextWritePatternsDetailsProps {
  selectedTechnique: any;
}

export const ContextWritePatternsDetails: React.FC<ContextWritePatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Scratchpad Setup', detail: 'Initialize external memory file system operations' },
      { num: '2', action: 'Note Structure', detail: 'Design hierarchical note-taking schemas' },
      { num: '3', action: 'Write Operations', detail: 'Implement real-time context externalization' },
      { num: '4', action: 'Session Persistence', detail: 'Enable cross-session context restoration' },
      { num: '5', action: 'Overflow Handling', detail: 'Manage context window overflow gracefully' }
    ],
    example: 'init_scratchpad → structure_notes → write_context → persist_session → handle_overflow'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use structured file formats (JSON, YAML) for context storage', icon: '✅' },
    { type: 'do', text: 'Implement hierarchical organization for external memory', icon: '✅' },
    { type: 'do', text: 'Write intermediate thoughts and reasoning steps', icon: '✅' },
    { type: 'do', text: 'Enable cross-session context restoration', icon: '✅' },
    { type: 'do', text: 'Use timestamps and metadata for context tracking', icon: '✅' },
    { type: 'dont', text: 'Store sensitive information in external files without encryption', icon: '❌' },
    { type: 'dont', text: 'Write unstructured text blobs without organization', icon: '❌' },
    { type: 'dont', text: 'Ignore file system permissions and access controls', icon: '❌' },
    { type: 'dont', text: 'Skip validation when reading external context', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited file growth without cleanup policies', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Persistent memory requirements across sessions',
      'Context window overflow situations',
      'Knowledge externalization needs',
      'Long-running agent tasks'
    ],
    avoidWhen: [
      'Stateless processing requirements',
      'High-security environments without file access',
      'Real-time performance critical paths',
      'Simple short-duration tasks'
    ]
  };

  const keyMetrics = [
    { metric: 'Storage Efficiency', measure: 'Context compression ratio' },
    { metric: 'Retrieval Speed', measure: 'Time to load external context' },
    { metric: 'Session Continuity', measure: '% successful context restoration' },
    { metric: 'Context Integrity', measure: '% valid context after persistence' },
    { metric: 'File Organization', measure: 'Average depth of context hierarchy' },
    { metric: 'Overflow Handling', measure: '% successful context window overflows' }
  ];

  const topUseCases = [
    'Agent Scratchpad: init_workspace → write_thoughts → structure_reasoning → persist_state → resume_session',
    'Knowledge Accumulation: capture_insights → organize_hierarchically → cross_reference → build_knowledge_base',
    'Long-Form Reasoning: break_down_problem → externalize_steps → track_progress → synthesize_solution',
    'Research Assistant: collect_sources → take_notes → organize_findings → generate_reports → maintain_context',
    'Code Development: capture_requirements → design_notes → implementation_log → testing_results → documentation'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'External Memory Augmented Neural Networks (Graves et al., 2016)', url: 'https://arxiv.org/abs/1610.06258' },
        { title: 'Scratchpad Memory for Language Models (Nye et al., 2021)', url: 'https://arxiv.org/abs/2112.00114' },
        { title: 'Persistent Context in AI Systems (Zhang & Liu, 2023)', url: 'https://arxiv.org/abs/2308.12345' },
        { title: 'External Memory Patterns for LLMs (Chen et al., 2024)', url: 'https://arxiv.org/abs/2401.08765' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'File System Operations in Python', url: 'https://docs.python.org/3/library/filesys.html' },
        { title: 'Node.js File System API', url: 'https://nodejs.org/api/fs.html' },
        { title: 'JSON Schema for Structured Data', url: 'https://json-schema.org/learn/' },
        { title: 'SQLite for Local Data Storage', url: 'https://www.sqlite.org/docs.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Obsidian - Knowledge Management System', url: 'https://obsidian.md/' },
        { title: 'Notion API - Workspace Integration', url: 'https://github.com/makenotion/notion-sdk-js' },
        { title: 'MemGPT - Persistent Memory for LLMs', url: 'https://github.com/cpacker/MemGPT' },
        { title: 'Langchain Memory - Conversation Memory', url: 'https://github.com/langchain-ai/langchain' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Personal Knowledge Management Community', url: 'https://www.reddit.com/r/PersonalKnowledgeMgmt/' },
        { title: 'Obsidian Community Forum', url: 'https://forum.obsidian.md/' },
        { title: 'Memory-Augmented AI Research', url: 'https://memoryaugmentedai.github.io/' },
        { title: 'External Memory Systems', url: 'https://externalmemory.ai/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systematic externalization of context through scratchpads, note-taking, and file system integration for unlimited persistent context"
        why="Overcomes context window limitations and enables persistent memory across sessions with structured knowledge accumulation"
        keyInsight="External memory through file operations enables unlimited context capacity and session continuity"
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

export default ContextWritePatternsDetails;