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

interface TwelveFactorAgentDetailsProps {
  selectedTechnique: any;
}

export const TwelveFactorAgentDetails: React.FC<TwelveFactorAgentDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design', detail: 'Start with JSON extraction as foundation' },
      { num: '2', action: 'Structure', detail: 'Own prompts, context windows, and control flow' },
      { num: '3', action: 'Architect', detail: 'Build stateless, focused agents with explicit error handling' },
      { num: '4', action: 'Integrate', detail: 'Add human-in-the-loop and multi-channel support' },
      { num: '5', action: 'Deploy', detail: 'Monitor observability and iterate at the bleeding edge' }
    ],
    example: 'agent = Agent(prompt=owned, context=managed, flow=explicit, state=stateless, humans=first_class)'
  };

  // The 12 Factors in Detail
  const twelveFactors = [
    { num: '1', name: 'JSON Extraction as Foundation', description: 'Core LLM superpower: converting natural language to structured data. The ability to take a string and turn it into JSON.' },
    { num: '2', name: 'Own Your Prompts', description: 'Production quality requires hand-crafted prompts, not abstractions. Own your prompts to tweak token order and system/user roles as models change.' },
    { num: '3', name: 'Manage Context Windows Explicitly', description: 'Don\'t blindly append; actively manage what the LLM sees. Own the context window, squeezing traces and error summaries for self-healing.' },
    { num: '4', name: 'Tools Are Just JSON and Code', description: 'Demystify "tool use" as simple routing. Treat tools as structured JSON outputs validated through switch statements.' },
    { num: '5', name: 'Own Your Control Flow', description: 'Agents = prompt + switch + context + loop. Keep control-flow in code with explicit OODA loops and convergence heuristics.' },
    { num: '6', name: 'Stateless Agent Design', description: 'Enable pause/resume and horizontal scaling. Persist execution state for idempotent restarts.' },
    { num: '7', name: 'Separate Business from Execution State', description: 'Different lifecycles, different needs. Expose launch/pause/resume endpoints for safe replay runs.' },
    { num: '8', name: 'Contact Humans as First-Class Operations', description: 'Not an edge case, but core functionality. Route high-stakes steps to humans as first-class tool calls.' },
    { num: '9', name: 'Meet Users Where They Are', description: 'Email, Slack, Discord — multi-channel by design. Trigger agents from wherever users already work.' },
    { num: '10', name: 'Small, Focused Agents Beat Monoliths', description: '3-10 steps max for reliability. Build small, single-purpose agents instead of chatty monoliths.' },
    { num: '11', name: 'Explicit Error Handling', description: 'Process errors intelligently, not blindly. Compact errors into the next prompt to close the feedback loop.' },
    { num: '12', name: 'Find the Bleeding Edge', description: 'Engineer reliability where models almost succeed. Find what\'s at the boundary of model capability and make it reliable.' }
  ];

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Hand-craft prompts for production quality, avoid prompt abstractions', icon: '✅' },
    { type: 'do', text: 'Actively manage context windows with traces and error summaries', icon: '✅' },
    { type: 'do', text: 'Build stateless agents that enable pause/resume functionality', icon: '✅' },
    { type: 'do', text: 'Route high-stakes operations to humans as first-class tool calls', icon: '✅' },
    { type: 'do', text: 'Keep agents small and focused (3-10 steps max)', icon: '✅' },
    { type: 'dont', text: 'Blindly append to context windows without management', icon: '❌' },
    { type: 'dont', text: 'Build chatty monolithic agents instead of focused ones', icon: '❌' },
    { type: 'dont', text: 'Nest prompts - use explicit control flow in code instead', icon: '❌' },
    { type: 'dont', text: 'Ignore error handling - compact errors into next prompt', icon: '❌' },
    { type: 'dont', text: 'Treat human interaction as edge case rather than core feature', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Building production-ready AI agents for enterprise',
      'Scaling beyond 70-80% prototype functionality',
      'Need reliable, maintainable agent systems',
      'Require human-in-the-loop workflows',
      'Building multi-channel agent experiences'
    ],
    avoidWhen: [
      'Simple demos or proof-of-concept projects',
      'Single-use or throwaway agent tasks',
      'Research experiments without production requirements',
      'Cases where 70-80% reliability is sufficient',
      'Purely automated workflows without human oversight needs'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Production Reliability', measure: '>90% success rate in production environments' },
    { metric: 'Agent Response Time', measure: 'P95 latency for agent task completion' },
    { metric: 'Human Escalation Rate', measure: '% of tasks requiring human intervention' },
    { metric: 'Context Window Utilization', measure: 'Efficiency of context management' },
    { metric: 'Error Recovery Success', measure: '% of errors resolved through self-healing' },
    { metric: 'Multi-Channel Adoption', measure: 'Usage across different user interfaces' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Enterprise Customer Support: Human-escalated agent handling complex support tickets across multiple channels',
    'Financial Operations: Stateless agents processing transactions with explicit error handling and audit trails',
    'Content Management: Small, focused agents for content creation, review, and publication workflows',
    'DevOps Automation: Agents managing deployment pipelines with human approval gates for production releases',
    'Sales Enablement: Multi-channel agents supporting sales teams through CRM, Slack, and email integrations'
  ];

  const references = [
    {
      title: 'Official 12-Factor Agents Resources',
      items: [
        { title: '12-Factor Agents GitHub Repository (Dexter Horthy)', url: 'https://github.com/humanlayer/12-factor-agents' },
        { title: 'HumanLayer 12-Factor Agents Documentation', url: 'https://www.humanlayer.dev/12-factor-agents' },
        { title: 'MLOps Community: Agents in Production 2025 (Dexter Horthy)', url: 'https://home.mlops.community/public/videos/12-factor-agents-patterns-of-reliable-llm-applications-dexter-horthy-agents-in-production-2025-2025-08-06' },
        { title: 'LlamaIndex 12-Factor Implementation', url: 'https://12factors.llamaindex.ai/' }
      ]
    },
    {
      title: 'Implementation Guides & Tutorials',
      items: [
        { title: 'The 12-Factor Agent: Practical Framework (DEV Community)', url: 'https://dev.to/bredmond1019/the-12-factor-agent-a-practical-framework-for-building-production-ai-systems-3oo8' },
        { title: 'Building Reliable LLM Applications Without Magic (Brandon AI)', url: 'https://www.learn-agentic-ai.com/en/blog/12-factor-agents-building-reliable-llm-applications' },
        { title: '12-Factor Agents: Blueprint for Reliable LLM Applications', url: 'https://www.ikangai.com/12-factor-agents-a-blueprint-for-reliable-llm-applications/' },
        { title: 'DZone: The Twelve-Factor Agents for Production-Ready LLM Apps', url: 'https://dzone.com/articles/understanding-twelve-factor-agents' }
      ]
    },
    {
      title: 'Academic & Research Analysis',
      items: [
        { title: 'Adnan Masood: Framework for Reliable LLM Agents (Medium)', url: 'https://medium.com/@adnanmasood/12-factor-agents-framework-for-reliable-llm-agents-empirical-guidelines-for-scalable-auditable-4b758e0e7979' },
        { title: 'Mehul Gupta: How to Build Production Grade AI-Agents (Medium)', url: 'https://medium.com/data-science-in-your-pocket/12-factors-agent-9c099022b3ff' },
        { title: 'ODSC: Blueprint for Scalable AI Agents Insights', url: 'https://odsc.medium.com/the-blueprint-for-scalable-ai-agents-insights-from-agentic-ai-summit-week-1-4f6c68205a9a' },
        { title: 'Hacker News Discussion: 12-factor Agents', url: 'https://news.ycombinator.com/item?id=43699271' }
      ]
    },
    {
      title: 'Production & Enterprise Resources',
      items: [
        { title: 'The Original 12-Factor App Methodology (Heroku)', url: 'https://12factor.net/' },
        { title: 'DevThink: Building Reliable AI Agents Framework', url: 'https://devthink.ai/p/building-reliable-ai-agents-12-factor-framework' },
        { title: 'FlowHunt: 12-Factor AI Agent Building Guide', url: 'https://www.flowhunt.io/blog/the-12-factor-ai-agent-building-effective-ai-systems-that-scale/' },
        { title: 'Enterprise AI Governance Best Practices', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Production-ready methodology adapting 12-factor app principles for scalable, maintainable agent systems"
        why="Moves agents beyond 70-80% prototype reliability to production-grade systems with human-in-the-loop workflows"
        keyInsight="Most successful agents aren't the most 'agentic' — they're well-engineered software systems leveraging LLMs for controlled transformations"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      {/* The 12 Factors Detail Section */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          The 12 Factors in Detail
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {twelveFactors.map((factor) => (
            <div key={factor.num} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {factor.num}
                </div>
                <h3 className="font-semibold text-white text-sm leading-tight">{factor.name}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed ml-11">{factor.description}</p>
            </div>
          ))}
        </div>
      </section>

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

export default TwelveFactorAgentDetails;