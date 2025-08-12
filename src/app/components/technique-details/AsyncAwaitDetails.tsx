'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface AsyncAwaitDetailsProps {
  selectedTechnique: any;
}

export const AsyncAwaitDetails: React.FC<AsyncAwaitDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Identify asynchronous operations that can be executed without blocking the main execution thread.',
    'Wrap async operations in promises or future objects with proper error handling and timeout mechanisms.',
    'Use async/await syntax to write sequential-looking code that executes asynchronously under the hood.',
    'Implement concurrent execution patterns where multiple async operations can run in parallel.',
    'Handle promise resolution, rejection, and timeout scenarios with appropriate error recovery strategies.',
    'Coordinate multiple async operations using Promise.all, Promise.race, or custom orchestration logic.'
  ];

  const bestPractices = [
    'Use Promise.all for concurrent execution when operations are independent and all results are needed.',
    'Apply Promise.race for timeout handling and first-response scenarios where speed is prioritized.',
    'Implement proper error boundaries and catch blocks to handle async operation failures gracefully.',
    'Set appropriate timeouts for all async operations to prevent indefinite hanging and resource leaks.',
    'Use async iterators and generators for processing streaming or large datasets without memory overflow.',
    'Implement exponential backoff and retry logic for transient failures in network and external service calls.',
    'Monitor async operation performance and implement circuit breakers for unreliable dependencies.'
  ];

  const whenNotToUse = [
    'Simple synchronous operations where the overhead of async handling provides no benefit.',
    'CPU-intensive tasks that don\'t involve I/O operations and won\'t benefit from async execution.',
    'Cases where sequential execution order is critical and cannot be altered by async timing.',
    'Environments with limited support for promises, async/await, or event loop mechanisms.',
    'Real-time systems requiring deterministic timing where async unpredictability is problematic.'
  ];

  const commonPitfalls = [
    'Forgetting to await async operations leading to race conditions and unexpected execution order.',
    'Creating async/await cascades that eliminate concurrency benefits by forcing sequential execution.',
    'Poor error handling in promise chains leading to unhandled rejections and silent failures.',
    'Memory leaks from unclosed async operations and improperly cancelled promises.',
    'Blocking the event loop with CPU-intensive operations disguised as async functions.',
    'Inadequate timeout handling causing operations to hang indefinitely and consume resources.'
  ];

  const keyFeatures = [
    'Non-blocking asynchronous execution with promise-based coordination and error handling',
    'Concurrent operation support with Promise.all, Promise.race, and custom orchestration patterns',
    'Sequential async programming syntax that maintains code readability and maintainability',
    'Comprehensive error handling with try-catch blocks and promise rejection mechanisms',
    'Timeout and cancellation support for robust handling of long-running or failed operations',
    'Performance optimization through parallel execution and efficient resource utilization'
  ];

  const kpiMetrics = [
    'Response time improvement: Latency reduction achieved through concurrent async execution vs sequential.',
    'Throughput increase: Number of operations processed per unit time with async parallelism.',
    'Error handling effectiveness: Success rate of graceful error recovery and retry mechanisms.',
    'Resource utilization: CPU and memory efficiency improvements from non-blocking operations.',
    'Promise resolution rate: Percentage of async operations completing successfully within timeout.',
    'Concurrency efficiency: Optimal balance between parallel operations and coordination overhead.'
  ];

  const tokenUsage = [
    'Token usage patterns depend on async operation types: API calls, data processing, or generation tasks.',
    'Concurrent async operations can reduce overall latency but may increase burst token consumption.',
    'Promise.all patterns consume tokens simultaneously across all operations; monitor rate limits.',
    'Failed async operations save tokens but may require retry logic increasing overall usage.',
    'Streaming async operations allow progressive token usage and memory management.',
    'Cache async results where possible to minimize redundant token consumption across retries.'
  ];

  const bestUseCases = [
    'API integration scenarios requiring concurrent calls to multiple external services.',
    'I/O intensive operations like file processing, database queries, and network requests.',
    'Real-time data processing with streaming inputs and concurrent analysis pipelines.',
    'Microservice orchestration requiring coordination of multiple independent service calls.',
    'Background task processing that shouldn\'t block user-facing application functionality.',
    'Event-driven architectures with asynchronous message processing and response handling.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Promises: Linguistic Support for Efficient Asynchronous Procedure Calls', url: 'https://web.archive.org/web/20110719001417/http://www.eecs.harvard.edu/~nr/pubs/promises-abstract.html' },
        { title: 'Async/Await: The Evolution of JavaScript Asynchronous Programming', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' },
        { title: 'Event-Driven Architecture and Asynchronous Programming Patterns', url: 'https://martinfowler.com/articles/201701-event-driven.html' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'JavaScript Promises and Async/Await Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises' },
        { title: 'Python asyncio and Asynchronous Programming', url: 'https://docs.python.org/3/library/asyncio.html' },
        { title: 'Node.js Asynchronous Programming Best Practices', url: 'https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'JavaScript Promise.all, Promise.race, and async/await', url: '#' },
        { title: 'Python asyncio, aiohttp, and async context managers', url: '#' },
        { title: 'Java CompletableFuture and reactive streams', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Stack Overflow - Async/await pattern discussions', url: 'https://stackoverflow.com/questions/tagged/async-await' },
        { title: 'r/javascript - Asynchronous programming best practices', url: 'https://www.reddit.com/r/javascript/' },
        { title: 'Node.js Community - Event-driven programming patterns', url: 'https://nodejs.org/en/community/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-indigo-500/10 to-purple-500/10"
        borderClass="border-indigo-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Async-Await enables non-blocking asynchronous execution using promises and future objects. This pattern allows 
          sequential-looking code to execute concurrently, improving throughput and responsiveness by avoiding blocking 
          operations while maintaining readable and maintainable code structure.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xs text-gray-400 mb-1">Async</div>
            <div className="text-sm font-medium text-white">Non-blocking execution</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-xs text-gray-400 mb-1">Await</div>
            <div className="text-sm font-medium text-white">Promise coordination</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-xs text-gray-400 mb-1">Concurrent</div>
            <div className="text-sm font-medium text-white">Parallel operations</div>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="text-xs text-gray-400 mb-1">Error Handling</div>
            <div className="text-sm font-medium text-white">Robust failure recovery</div>
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

export default AsyncAwaitDetails;