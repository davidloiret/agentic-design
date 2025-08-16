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

interface AgenticRagSystemsDetailsProps {
  selectedTechnique: any;
}

export const AgenticRagSystemsDetails: React.FC<AgenticRagSystemsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Agent Planning', detail: 'Decompose complex queries into multi-step retrieval plans with reasoning' },
      { num: '2', action: 'Tool Orchestration', detail: 'Execute retrieval actions using specialized tools (search, DB, APIs)' },
      { num: '3', action: 'Dynamic Adaptation', detail: 'Adapt strategy based on intermediate results and feedback' },
      { num: '4', action: 'Evidence Synthesis', detail: 'Integrate multi-source evidence with reasoning chains' },
      { num: '5', action: 'Response Generation', detail: 'Generate final answer with full citation and reasoning trace' }
    ],
    example: 'complex_query → plan_decomposition → [retrieve_1, retrieve_2, ...] → adapt_strategy → synthesize → response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement explicit planning with ReAct or function calling for retrieval strategies', icon: '✅' },
    { type: 'do', text: 'Use tool-augmented retrieval with specialized APIs, search engines, and databases', icon: '✅' },
    { type: 'do', text: 'Enable adaptive query refinement based on intermediate retrieval results', icon: '✅' },
    { type: 'do', text: 'Maintain detailed reasoning traces and citation provenance throughout execution', icon: '✅' },
    { type: 'do', text: 'Implement error recovery and alternative retrieval strategies for failed attempts', icon: '✅' },
    { type: 'dont', text: 'Allow uncontrolled agent loops without termination conditions or cost limits', icon: '❌' },
    { type: 'dont', text: 'Skip validation of retrieved information quality and source credibility', icon: '❌' },
    { type: 'dont', text: 'Ignore user intent drift during multi-step retrieval processes', icon: '❌' },
    { type: 'dont', text: 'Rely solely on single retrieval modality without exploring alternatives', icon: '❌' },
    { type: 'dont', text: 'Neglect privacy and security considerations for sensitive information retrieval', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex multi-step research requiring strategic information gathering',
      'Cross-domain queries needing diverse knowledge sources and reasoning',
      'Dynamic knowledge environments where retrieval strategies must adapt',
      'High-stakes applications requiring explainable reasoning and provenance',
      'Research and analysis tasks benefiting from human-like information seeking'
    ],
    avoidWhen: [
      'Simple factual queries adequately served by standard RAG approaches',
      'Real-time applications with strict latency and cost constraints',
      'Domains with limited tool availability or API access restrictions',
      'Applications where deterministic retrieval behavior is required',
      'Resource-constrained environments unable to support complex agent reasoning'
    ]
  };

  const keyMetrics = [
    { metric: 'Plan Execution Success', measure: 'Percentage of agent plans successfully completed without errors' },
    { metric: 'Retrieval Strategy Effectiveness', measure: 'Quality improvement from adaptive vs fixed retrieval strategies' },
    { metric: 'Evidence Synthesis Quality', measure: 'Coherence and completeness of multi-source information integration' },
    { metric: 'Reasoning Trace Fidelity', measure: 'Accuracy and explainability of step-by-step reasoning chains' },
    { metric: 'Tool Utilization Efficiency', measure: 'Optimal use of available retrieval tools and APIs' },
    { metric: 'Cost-Quality Tradeoff', measure: 'Answer quality per unit computational cost and API calls' }
  ];

  const topUseCases = [
    'Research Intelligence: Scientific literature review with adaptive search strategies and cross-reference validation',
    'Business Analysis: Market research combining financial data, news, and industry reports with strategic reasoning',
    'Legal Discovery: Case law research with multi-jurisdictional search and precedent analysis workflows',
    'Technical Investigation: Software debugging and troubleshooting with dynamic tool selection and reasoning',
    'Medical Diagnosis Support: Clinical decision support with evidence gathering from multiple medical databases'
  ];

  const references = [
    {
      title: 'Foundational Papers & Agentic RAG Research',
      items: [
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)', url: 'https://arxiv.org/abs/2210.03629' },
        { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al., 2023)', url: 'https://arxiv.org/abs/2302.04761' },
        { title: 'HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face (Shen et al., 2023)', url: 'https://arxiv.org/abs/2303.17580' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' }
      ]
    },
    {
      title: 'Agent Frameworks & Planning Methods',
      items: [
        { title: 'AutoGPT: An Autonomous GPT-4 Experiment', url: 'https://github.com/Significant-Gravitas/AutoGPT' },
        { title: 'LangGraph: Building Stateful, Multi-Actor Applications with LLMs', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'CrewAI: Framework for Orchestrating Role-Playing, Autonomous AI Agents', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'Microsoft AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation', url: 'https://arxiv.org/abs/2308.08155' }
      ]
    },
    {
      title: 'Tool Integration & Function Calling',
      items: [
        { title: 'OpenAI Function Calling: Connecting GPTs to External Tools', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'Anthropic Tool Use and Function Calling Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' },
        { title: 'Google Gemini Function Calling and Tool Integration', url: 'https://ai.google.dev/gemini-api/docs/function-calling' },
        { title: 'LangChain Tools and Agents: Comprehensive Implementation Guide', url: 'https://python.langchain.com/docs/how_to/agent_executor/' }
      ]
    },
    {
      title: 'Multi-Step Reasoning & Planning',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Program-aided Language Models (Gao et al., 2023)', url: 'https://arxiv.org/abs/2211.10435' }
      ]
    },
    {
      title: 'Implementation Frameworks & Production Systems',
      items: [
        { title: 'LlamaIndex Agent Framework: Tool-Augmented RAG Systems', url: 'https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/' },
        { title: 'Haystack Agent Pipeline: Multi-Step Information Retrieval', url: 'https://docs.haystack.deepset.ai/docs/agent' },
        { title: 'Semantic Kernel: AI Orchestration Framework by Microsoft', url: 'https://learn.microsoft.com/en-us/semantic-kernel/' },
        { title: 'LangSmith: Production Monitoring for Agent-Based RAG Systems', url: 'https://docs.smith.langchain.com/' }
      ]
    },
    {
      title: 'Evaluation & Quality Assessment',
      items: [
        { title: 'AgentBench: Evaluating LLMs as Agents (Liu et al., 2023)', url: 'https://arxiv.org/abs/2308.03688' },
        { title: 'WebShop: Towards Scalable Real-World Web Interaction with Grounded Language Agents (Yao et al., 2022)', url: 'https://arxiv.org/abs/2207.01206' },
        { title: 'ToolQA: A Dataset for LLM Question Answering with External Tools (Zhuang et al., 2023)', url: 'https://arxiv.org/abs/2306.13304' },
        { title: 'RAGAS: Automated Evaluation Framework for RAG Applications', url: 'https://github.com/explodinggradients/ragas' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Autonomous agent systems that dynamically plan, execute, and adapt multi-step retrieval strategies using tools and reasoning"
        why="Enables complex information gathering workflows that require strategic thinking, adaptation, and multi-source synthesis"
        keyInsight="ReAct-style planning with tool orchestration allows agents to reason about retrieval strategies and adapt based on results"
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

export default AgenticRagSystemsDetails;