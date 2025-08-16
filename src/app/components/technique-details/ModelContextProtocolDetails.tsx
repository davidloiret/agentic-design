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

interface ModelContextProtocolDetailsProps {
  selectedTechnique: any;
}

export const ModelContextProtocolDetails: React.FC<ModelContextProtocolDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Choose Transport', detail: 'stdio (local) or HTTP/SSE (remote)' },
      { num: '2', action: 'Initialize Session', detail: 'Capability negotiation & discovery' },
      { num: '3', action: 'Discover Tools', detail: 'List available tools, resources, prompts' },
      { num: '4', action: 'Invoke Tools', detail: 'JSON-RPC calls with typed parameters' },
      { num: '5', action: 'Handle Resources', detail: 'Use handles vs embedding content' }
    ],
    example: 'Client connects → initialize() → list_tools() → call_tool("github_search") → get_resource(handle)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use JSON Schema for all tool parameters and response validation', icon: '✅' },
    { type: 'do', text: 'Implement OAuth 2.1 with PKCE for secure authentication', icon: '✅' },
    { type: 'do', text: 'Use resource handles instead of inlining large content', icon: '✅' },
    { type: 'do', text: 'Implement streaming for large outputs with backpressure control', icon: '✅' },
    { type: 'do', text: 'Version capabilities and maintain backward compatibility', icon: '✅' },
    { type: 'do', text: 'Apply least privilege principle for server access scoping', icon: '✅' },
    { type: 'dont', text: 'Pass tokens through servers (token passthrough anti-pattern)', icon: '❌' },
    { type: 'dont', text: 'Skip server validation (vulnerable to spoofing attacks)', icon: '❌' },
    { type: 'dont', text: 'Embed large documents in prompts instead of using handles', icon: '❌' },
    { type: 'dont', text: 'Deploy without conformance tests (schema drift risk)', icon: '❌' },
    { type: 'dont', text: 'Ignore structured error codes for proper fallback handling', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Multi-tool agent systems requiring standardized integration',
      'Enterprise copilots needing unified data source access',
      'IDE/development tools requiring dynamic capability discovery',
      'Cross-platform AI applications needing interoperability'
    ],
    avoidWhen: [
      'Single, static tool integrations where function calling suffices',
      'Ultra-low-latency paths that cannot afford protocol overhead',
      'Simple applications without complex tool orchestration needs',
      'Environments where server process deployment is infeasible'
    ]
  };

  // Key Metrics (from MCP production deployments)
  const keyMetrics = [
    { metric: 'Tool-hop Latency', measure: '218ms average (Li & Xie 2025 study)' },
    { metric: 'Integration Efficiency', measure: '25-40% improvement vs custom implementations' },
    { metric: 'Protocol Failure Rate', measure: '0.7% (mainly parameter mismatches)' },
    { metric: 'Development Time Reduction', measure: '50% faster project rollout times' },
    { metric: 'Cost Optimization', measure: '30% reduction in integration costs' },
    { metric: 'Session Establishment', measure: 'Sub-second capability discovery & negotiation' },
    { metric: 'Security Incident Rate', measure: 'Token spoofing & confused deputy attacks' },
    { metric: 'Ecosystem Growth', measure: '1000+ community MCP servers (2025)' }
  ];

  // Top Use Cases (from production deployments)
  const topUseCases = [
    'Claude Desktop Integration: One-click MCP server installation via Desktop Extensions',
    'GitHub Development: CI/CD, issues, PRs with 35% code review latency reduction',
    'Enterprise Copilots: Unified access to CRM, HRIS, payroll, accounting systems',
    'IDE Assistants: Filesystem, VCS, documentation with real-time context',
    'Document Processing: 60-80% reduction in processing time with resource handles',
    'Multi-Agent Systems: Standardized tool sharing between autonomous agents',
    'RAG Systems: Document and metadata retrieval via efficient handle references',
    'IoT Device Control: Natural language automation across device ecosystems'
  ];

  const references = [
    {
      title: 'Official MCP Specification & Documentation',
      items: [
        { title: 'Model Context Protocol Official Website', url: 'https://modelcontextprotocol.io' },
        { title: 'MCP Specification 2025-06-18 (Current)', url: 'https://modelcontextprotocol.io/specification/2025-06-18' },
        { title: 'Anthropic MCP Documentation', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/mcp' },
        { title: 'Claude Desktop MCP Setup Guide', url: 'https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop' }
      ]
    },
    {
      title: 'Official Implementations & SDKs',
      items: [
        { title: 'MCP GitHub Organization (Core Repositories)', url: 'https://github.com/modelcontextprotocol' },
        { title: 'GitHub Official MCP Server (Public Preview 2025)', url: 'https://github.com/github/github-mcp-server' },
        { title: 'Microsoft MCP Implementations Catalog', url: 'https://github.com/microsoft/mcp' },
        { title: 'MCP Server Collection (Community)', url: 'https://github.com/modelcontextprotocol/servers' }
      ]
    },
    {
      title: 'Production Benchmarking & Evaluation',
      items: [
        { title: 'MCPBench - Official MCP Benchmarking Framework', url: 'https://github.com/modelscope/MCPBench' },
        { title: 'MCP Performance Study (Li & Xie 2025)', url: 'https://arxiv.org/search/?query=model+context+protocol+performance' },
        { title: 'MCP Security Analysis & Best Practices', url: 'https://modelcontextprotocol.io/security/best-practices' },
        { title: 'Enterprise MCP Deployment Patterns', url: 'https://modelcontextprotocol.io/guides/enterprise' }
      ]
    },
    {
      title: 'Community & Ecosystem',
      items: [
        { title: 'Awesome MCP Servers (Community Collection)', url: 'https://github.com/punkpeye/awesome-mcp-servers' },
        { title: 'MCP Development Roadmap', url: 'https://modelcontextprotocol.io/development/roadmap' },
        { title: 'MCP GitHub Discussions', url: 'https://github.com/modelcontextprotocol/.github/discussions' },
        { title: 'OpenAI MCP Adoption (March 2025)', url: 'https://platform.openai.com/docs/assistants/tools' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Standardize AI application context sharing and tool integration via JSON-RPC protocol"
        why="Enables seamless interoperability between AI models and external tools/data sources across platforms"
        keyInsight="Open standard solving N×M integration problem - 1000+ servers available, adopted by OpenAI/GitHub"
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

export default ModelContextProtocolDetails;