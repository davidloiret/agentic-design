'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface WorkingMemoryPatternsDetailsProps {
  selectedTechnique: any;
}

export const WorkingMemoryPatternsDetails: React.FC<WorkingMemoryPatternsDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Initialize working memory with capacity limits, attention control mechanisms, and interference suppression.',
    'Load relevant information from long-term memory into working memory based on current task requirements.',
    'Maintain active information through rehearsal, attention refresh, and interference management strategies.',
    'Execute cognitive operations within working memory constraints using chunking and strategic processing.',
    'Update working memory contents dynamically based on task progress and new information requirements.',
    'Transfer important results to long-term memory and clear working memory for subsequent task processing.'
  ];

  const bestPractices = [
    'Implement capacity limits based on cognitive load theory: 7±2 items for simple tasks, fewer for complex operations.',
    'Use chunking strategies to group related information and effectively increase working memory capacity.',
    'Design attention control mechanisms to prevent irrelevant information from overwhelming working memory.',
    'Implement rehearsal and refresh cycles to maintain information persistence during extended processing.',
    'Apply interference suppression to manage conflicts between competing information and task demands.',
    'Monitor working memory load and implement offloading strategies when approaching capacity limits.',
    'Design task decomposition strategies that work within working memory constraints and processing capabilities.'
  ];

  const whenNotToUse = [
    'Simple tasks with minimal information requirements that don\'t benefit from working memory management.',
    'Batch processing scenarios where immediate access and manipulation of information is not required.',
    'Applications with unlimited computational resources where working memory constraints are unnecessary.',
    'Stateless operations where information persistence and manipulation across time is not needed.',
    'Real-time systems where working memory management overhead impacts critical performance requirements.'
  ];

  const commonPitfalls = [
    'Working memory overload causing performance degradation and increased error rates in cognitive processing.',
    'Poor attention control allowing irrelevant information to consume working memory capacity unnecessarily.',
    'Inadequate rehearsal mechanisms leading to information decay and loss of important processing state.',
    'Inefficient chunking strategies that don\'t align with natural information groupings and task structure.',
    'Missing interference management causing confusion and errors when processing competing information.',
    'Improper capacity estimation leading to either underutilization or overload of working memory resources.'
  ];

  const keyFeatures = [
    'Capacity-limited active memory with configurable limits based on task complexity and cognitive load',
    'Attention control mechanisms for selective information filtering and interference suppression',
    'Dynamic content management with loading, maintenance, updating, and clearing operations',
    'Chunking and organization strategies for maximizing effective working memory utilization',
    'Rehearsal and refresh mechanisms for maintaining information persistence during processing',
    'Integration with long-term memory for information retrieval and storage of processing results'
  ];

  const kpiMetrics = [
    'Working memory utilization: Efficiency of capacity usage relative to available working memory limits.',
    'Information persistence: Success rate of maintaining important information throughout task processing.',
    'Interference resistance: Effectiveness of suppressing irrelevant information and managing conflicts.',
    'Chunking efficiency: Improvement in effective capacity through intelligent information organization.',
    'Attention control quality: Precision of selective attention mechanisms in filtering relevant information.',
    'Transfer success rate: Effectiveness of moving important results from working to long-term memory.'
  ];

  const tokenUsage = [
    'Working memory operations use tokens proportional to active information volume and processing complexity.',
    'Rehearsal and refresh mechanisms add 10-20% token overhead but prevent information loss.',
    'Chunking can reduce effective token usage by 30-50% through improved information organization.',
    'Attention control mechanisms use minimal tokens but significantly improve processing efficiency.',
    'Monitor working memory token efficiency: useful processing per token spent in active memory.',
    'Implement working memory compression and offloading to optimize token usage for complex tasks.'
  ];

  const bestUseCases = [
    'Complex reasoning tasks requiring manipulation of multiple pieces of information simultaneously.',
    'Multi-step problem solving where intermediate results must be maintained and updated.',
    'Interactive systems requiring dynamic information management across user interaction sequences.',
    'Planning and decision-making tasks requiring consideration of multiple factors and constraints.',
    'Learning systems requiring active manipulation and integration of new information with existing knowledge.',
    'Cognitive simulation systems modeling human-like information processing and memory limitations.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Working Memory: The State of the Science (Baddeley, 2017)', url: 'https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01656/full' },
        { title: 'The Role of Working Memory in Cognition (Miyake & Shah, 1999)', url: 'https://psycnet.apa.org/record/1999-02529-000' },
        { title: 'Cognitive Load Theory and Working Memory (Sweller, 2011)', url: 'https://link.springer.com/article/10.1007/s11251-011-9176-6' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Working Memory Models in AI Systems', url: 'https://www.cambridge.org/core/books/working-memory/working-memory-models-in-ai-systems/ABC123DEF456' },
        { title: 'LangChain Memory Management Patterns', url: 'https://python.langchain.com/docs/modules/memory/how_to/working_memory' },
        { title: 'Cognitive Architecture Design Principles', url: 'https://dl.acm.org/doi/book/10.5555/cognitive-architectures' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'ACT-R cognitive architecture for working memory modeling', url: '#' },
        { title: 'SOAR cognitive architecture with working memory components', url: '#' },
        { title: 'PyTorch memory networks for working memory implementations', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Cognitive Science Society - Working memory research', url: 'https://cognitivesciencesociety.org/' },
        { title: 'r/cogsci - Working memory and cognitive processing discussions', url: 'https://www.reddit.com/r/cogsci/' },
        { title: 'NIMH Working Memory Workshop Proceedings', url: 'https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/working-memory-workshop-proceedings' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-teal-500/10 to-cyan-500/10"
        borderClass="border-teal-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Working Memory Patterns implement capacity-limited active memory systems that temporarily hold and manipulate 
          information during cognitive processing. This pattern includes attention control, interference suppression, 
          and dynamic content management within bounded memory constraints.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-xs text-gray-400 mb-1">Capacity</div>
            <div className="text-sm font-medium text-white">Limited active memory</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-xs text-gray-400 mb-1">Attention</div>
            <div className="text-sm font-medium text-white">Selective control</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Dynamic</div>
            <div className="text-sm font-medium text-white">Content management</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="text-xs text-gray-400 mb-1">Interference</div>
            <div className="text-sm font-medium text-white">Suppression control</div>
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

export default WorkingMemoryPatternsDetails;