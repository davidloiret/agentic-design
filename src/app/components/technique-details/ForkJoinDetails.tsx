'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface ForkJoinDetailsProps {
  selectedTechnique: any;
}

export const ForkJoinDetails: React.FC<ForkJoinDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Decompose complex task into smaller, independent subtasks that can be processed recursively.',
    'Fork: Create parallel threads or processes for each subtask with appropriate resource allocation.',
    'Execute subtasks concurrently, applying the same decomposition pattern recursively as needed.',
    'Join: Wait for all subtasks to complete and collect results from parallel execution branches.',
    'Combine results from all subtasks using problem-specific aggregation or synthesis logic.',
    'Return final result or continue recursive decomposition until base case conditions are met.'
  ];

  const bestPractices = [
    'Set appropriate base case thresholds to prevent excessive recursion and minimize overhead.',
    'Balance subtask granularity to optimize parallelism without creating too much coordination overhead.',
    'Implement work-stealing algorithms to handle load imbalances across parallel workers efficiently.',
    'Use thread pools and resource pooling to avoid expensive thread creation and destruction costs.',
    'Apply divide-and-conquer strategies appropriate to the problem domain and data structure.',
    'Monitor recursive depth and implement safeguards against stack overflow and infinite recursion.',
    'Cache intermediate results where possible to avoid redundant computation across subtasks.'
  ];

  const whenNotToUse = [
    'Sequential problems where subtasks have strong dependencies and cannot be parallelized effectively.',
    'Small problem sizes where the overhead of forking and joining exceeds the benefits of parallelism.',
    'Memory-constrained environments where recursive decomposition and parallel execution exhaust resources.',
    'Real-time systems with strict deterministic timing requirements incompatible with parallel execution.',
    'Problems with irregular or unpredictable decomposition patterns that don\'t fit the fork-join model.'
  ];

  const commonPitfalls = [
    'Excessive decomposition creating more overhead than benefit due to fine-grained parallelism.',
    'Poor load balancing leading to some workers finishing early while others create bottlenecks.',
    'Resource contention and deadlocks when subtasks compete for shared resources or locks.',
    'Inadequate base case definition causing infinite recursion or stack overflow conditions.',
    'Missing error handling in parallel branches allowing failures to propagate or hang the system.',
    'Inappropriate problem decomposition that doesn\'t align with natural data or computation boundaries.'
  ];

  const keyFeatures = [
    'Recursive task decomposition with parallel execution of independent subtasks',
    'Work-stealing load balancing for optimal resource utilization across workers',
    'Synchronization barriers with join operations ensuring all subtasks complete before aggregation',
    'Scalable parallelism that automatically adapts to available hardware resources',
    'Fault tolerance with error propagation and recovery mechanisms across parallel branches',
    'Performance optimization through thread pooling, caching, and adaptive granularity control'
  ];

  const kpiMetrics = [
    'Parallel efficiency: Speedup achieved vs theoretical maximum based on available cores.',
    'Load balance quality: Variance in execution time across parallel workers and subtasks.',
    'Resource utilization: CPU, memory, and thread usage efficiency throughout execution.',
    'Task granularity ratio: Optimal balance between parallelism and coordination overhead.',
    'Recursive depth distribution: Analysis of decomposition patterns and termination conditions.',
    'Fault recovery rate: Success rate of handling and recovering from subtask failures.'
  ];

  const tokenUsage = [
    'Token usage scales with problem size and decomposition depth in recursive processing.',
    'Each fork level multiplies token usage by branching factor; monitor depth carefully.',
    'Join operations add aggregation overhead proportional to the number of parallel results.',
    'Base case processing typically uses minimal tokens; optimization focuses on intermediate levels.',
    'Caching and memoization can significantly reduce redundant token usage across similar subtasks.',
    'Monitor token distribution across recursive levels to identify optimization opportunities.'
  ];

  const bestUseCases = [
    'Recursive problem solving such as tree traversal, sorting, and search algorithms.',
    'Parallel processing of hierarchical data structures with independent subtree operations.',
    'Divide-and-conquer algorithms requiring coordinated parallel execution and result combination.',
    'Computational tasks with natural decomposition patterns like matrix operations and simulations.',
    'Large-scale data processing where recursive partitioning improves performance and scalability.',
    'Complex optimization problems requiring parallel exploration of solution spaces.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'A Java Fork/Join Framework (Lea, 2000)', url: 'https://gee.cs.oswego.edu/dl/papers/fj.pdf' },
        { title: 'Work-Stealing Queues (Chase & Lev, 2005)', url: 'https://www.dre.vanderbilt.edu/~schmidt/PDF/work-stealing-dequeue.pdf' },
        { title: 'The Fork-Join Framework in Java 7 (Oracle, 2011)', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Java Fork/Join Framework Tutorial', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html' },
        { title: 'Python concurrent.futures and multiprocessing', url: 'https://docs.python.org/3/library/concurrent.futures.html' },
        { title: 'JavaScript Web Workers and parallel processing', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Java ForkJoinPool for recursive parallel processing', url: '#' },
        { title: 'Python multiprocessing.Pool with recursive task support', url: '#' },
        { title: 'Scala parallel collections and Akka actors', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Stack Overflow - Fork-Join pattern implementations', url: 'https://stackoverflow.com/questions/tagged/fork-join' },
        { title: 'r/concurrent - Parallel processing discussions', url: 'https://www.reddit.com/r/concurrent/' },
        { title: 'Java Community - Parallel programming best practices', url: 'https://dev.java/community/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-emerald-500/10 to-teal-500/10"
        borderClass="border-emerald-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Fork-Join recursively decomposes complex tasks into smaller subtasks, executes them in parallel, and combines 
          results. This pattern leverages divide-and-conquer strategies with work-stealing load balancing to achieve 
          optimal parallelism and resource utilization for recursive algorithms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🍴</div>
            <div className="text-xs text-gray-400 mb-1">Fork</div>
            <div className="text-sm font-medium text-white">Split tasks</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Parallel</div>
            <div className="text-sm font-medium text-white">Concurrent execution</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Recursive</div>
            <div className="text-sm font-medium text-white">Nested decomposition</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-xs text-gray-400 mb-1">Join</div>
            <div className="text-sm font-medium text-white">Combine results</div>
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

export default ForkJoinDetails;