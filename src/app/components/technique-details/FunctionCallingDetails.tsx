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

interface FunctionCallingDetailsProps {
  selectedTechnique: any;
}

export const FunctionCallingDetails: React.FC<FunctionCallingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Schema', detail: 'JSON schema with parameters & types' },
      { num: '2', action: 'Register Tools', detail: 'Add to function registry with auth' },
      { num: '3', action: 'Validate Params', detail: 'Sanitize & validate all inputs' },
      { num: '4', action: 'Execute', detail: 'Call API with timeouts & retries' },
      { num: '5', action: 'Process Results', detail: 'Normalize & integrate responses' }
    ],
    example: 'get_weather(location="NYC", units="celsius") → {"temp": 18, "condition": "cloudy"}'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Write detailed function descriptions (3-4+ sentences minimum)', icon: '✅' },
    { type: 'do', text: 'Use strict JSON schemas with required/optional field validation', icon: '✅' },
    { type: 'do', text: 'Implement parameter sanitization and injection attack prevention', icon: '✅' },
    { type: 'do', text: 'Add timeouts, retries with exponential backoff, and circuit breakers', icon: '✅' },
    { type: 'do', text: 'Use parallel execution for independent function calls', icon: '✅' },
    { type: 'do', text: 'Cache deterministic function results for cost optimization', icon: '✅' },
    { type: 'dont', text: 'Use vague function descriptions that lead to hallucinated parameters', icon: '❌' },
    { type: 'dont', text: 'Allow unbounded parallel calls without rate limiting', icon: '❌' },
    { type: 'dont', text: 'Retry non-idempotent operations after timeouts', icon: '❌' },
    { type: 'dont', text: 'Expose raw API credentials or secrets in function calls', icon: '❌' },
    { type: 'dont', text: 'Skip input validation and security scanning', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Need real-time data beyond model training cutoff',
      'Require external API integrations or database queries', 
      'Must perform precise calculations or code execution',
      'Triggering actions in external systems (email, scheduling)'
    ],
    avoidWhen: [
      'Information available in model knowledge with acceptable quality',
      'Hard real-time requirements where tool overhead breaks SLOs',
      'High-risk irreversible actions without human approval',
      'Simple tasks solvable with basic text generation'
    ]
  };

  // Key Metrics (from BFCL and industry benchmarks)
  const keyMetrics = [
    { metric: 'Function Selection Accuracy', measure: '% correct tool chosen from registry' },
    { metric: 'Parameter Extraction Rate', measure: '% required params correctly identified' },
    { metric: 'Schema Validation Success', measure: '% calls passing validation checks' },
    { metric: 'API Success Rate', measure: '% successful external function calls' },
    { metric: 'Parallel Execution Efficiency', measure: 'Latency reduction vs sequential' },
    { metric: 'Token Usage Optimization', measure: 'Context tokens per function call' },
    { metric: 'Security Incident Rate', measure: 'Injection/XSS attempts blocked' },
    { metric: 'Cost per Task', measure: 'Total cost: model + API + infrastructure' }
  ];

  // Top Use Cases (based on industry patterns and research)
  const topUseCases = [
    'Weather & Real-time Data: get_weather("NYC") → current conditions for decision making',
    'Calendar Integration: schedule_meeting(time, attendees) → automated scheduling workflows',
    'Database Operations: query_db(table, filters) → dynamic data retrieval and updates',
    'Code Execution: run_python(code) → computational tasks and data analysis',
    'Email & Communications: send_email(to, subject, body) → automated notifications',
    'Web Search: search_web(query) → real-time information retrieval',
    'File Operations: read_file(path), write_file(path, content) → document processing',
    'API Integrations: call_api(endpoint, params) → external service interactions'
  ];

  const references = [
    {
      title: 'Foundational Academic Papers',
      items: [
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023)', url: 'https://arxiv.org/abs/2210.03629' },
        { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools (2023)', url: 'https://arxiv.org/abs/2302.04761' },
        { title: 'Gorilla: Large Language Model Connected with Massive APIs (UC Berkeley 2023)', url: 'https://arxiv.org/abs/2305.15334' },
        { title: 'Berkeley Function Calling Leaderboard (BFCL) - Current Benchmark', url: 'https://gorilla.cs.berkeley.edu/leaderboard.html' }
      ]
    },
    {
      title: 'Industry Implementation Guides',
      items: [
        { title: 'Anthropic Claude Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/tool-use' },
        { title: 'Google Gemini Function Calling Guide', url: 'https://ai.google.dev/gemini-api/docs/function-calling' },
        { title: 'OpenAI Function Calling Best Practices', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'LangChain Tools Integration Framework', url: 'https://python.langchain.com/docs/integrations/tools/' }
      ]
    },
    {
      title: 'Enterprise Frameworks & Security',
      items: [
        { title: 'Model Context Protocol (MCP) - Anthropic Standard', url: 'https://modelcontextprotocol.io/' },
        { title: 'Google Agent Developer Kit (ADK) - Enterprise Tools', url: 'https://google.github.io/adk-docs/tools/' },
        { title: 'CrewAI Multi-Agent Tool Coordination', url: 'https://docs.crewai.com/concepts/tools' },
        { title: 'Azure OpenAI Function Calling Security Guidelines', url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/function-calling' }
      ]
    },
    {
      title: 'Research & Performance Evaluation',
      items: [
        { title: 'Function Calling in Large Language Models: A Survey (2024)', url: 'https://arxiv.org/search/?query=function+calling+large+language+models&searchtype=all' },
        { title: 'Tool Use Pattern Analysis - Agentic Design Patterns', url: '/references/agentic_design_patterns/Chapter 5_ Tool Use.md' },
        { title: 'API-Bank: Tool-Augmented LLM Benchmark', url: 'https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/api-bank' },
        { title: 'ToolBench: Tool Learning Evaluation Framework', url: 'https://github.com/OpenBMB/ToolBench' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Enable AI to invoke external functions and APIs through structured schemas"
        why="Breaks LLM knowledge limitations, enables real-time data access, external actions, and precise calculations"
        keyInsight="Schema-driven function calling with parameter validation, parallel execution, and security controls"
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

export default FunctionCallingDetails;