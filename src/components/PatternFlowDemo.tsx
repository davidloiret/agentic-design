'use client';

import React, { useState } from 'react';
import { InteractivePatternFlow } from './InteractivePatternFlow';
import { patternScenarios } from '../data/patterns';

const PatternFlowDemo: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState('cot');

  const availablePatterns = [
    { id: 'cot', name: 'Chain of Thought' },
    { id: 'tot', name: 'Tree of Thoughts' },
    { id: 'react', name: 'ReAct Pattern' },
    { id: 'sequential-chaining', name: 'Sequential Chaining' },
    { id: 'parallel-chaining', name: 'Parallel Chaining' },
    { id: 'conditional-chaining', name: 'Conditional Chaining' },
    { id: 'capability-routing', name: 'Capability Routing' },
    { id: 'load-balancing', name: 'Load Balancing' },
    { id: 'geographic-routing', name: 'Geographic Routing' },
    { id: 'map-reduce', name: 'Map-Reduce' },
    { id: 'scatter-gather', name: 'Scatter-Gather' },
    { id: 'fork-join', name: 'Fork-Join' },
    { id: 'async-await', name: 'Async-Await' },
    { id: 'self-critique', name: 'Self-Critique' },
    { id: 'function-calling', name: 'Function Calling' },
    { id: 'code-execution', name: 'Code Execution' },
    { id: 'hierarchical-planning', name: 'Hierarchical Planning' },
    { id: 'goal-decomposition', name: 'Goal Decomposition' },
    { id: 'constraint-satisfaction', name: 'Constraint Satisfaction' },
    { id: 'scenario-planning', name: 'Scenario Planning' }
  ];

  const currentScenario = patternScenarios[selectedPattern];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Interactive Pattern Demonstrations
        </h1>
        <p className="text-slate-300 mb-6">
          Explore AI reasoning patterns through interactive step-by-step scenarios. 
          Watch how different patterns approach problem-solving.
        </p>
        
        {/* Pattern Selection */}
        <div className="flex gap-4 mb-6">
          {availablePatterns.map(pattern => (
            <button
              key={pattern.id}
              onClick={() => setSelectedPattern(pattern.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedPattern === pattern.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              {pattern.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Flow */}
      {currentScenario && (
        <InteractivePatternFlow 
          scenario={currentScenario} 
          height={600}
        />
      )}

      {/* Pattern Information */}
      <div className="mt-8 bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-3">
          About {availablePatterns.find(p => p.id === selectedPattern)?.name}
        </h3>
        <div className="text-slate-300 space-y-2">
          {selectedPattern === 'cot' && (
            <div>
              <p><strong>Chain of Thought (CoT)</strong> breaks complex problems into sequential steps, making AI reasoning transparent and more reliable.</p>
              <p><strong>Key Benefits:</strong> Improved accuracy on complex tasks, explainable reasoning, better error detection.</p>
              <p><strong>Best For:</strong> Mathematical problems, logical reasoning, multi-step analysis.</p>
            </div>
          )}
          {selectedPattern === 'tot' && (
            <div>
              <p><strong>Tree of Thoughts (ToT)</strong> explores multiple solution paths simultaneously, evaluating and selecting the best approach.</p>
              <p><strong>Key Benefits:</strong> Finds optimal solutions, handles uncertainty, explores creative alternatives.</p>
              <p><strong>Best For:</strong> Optimization problems, creative tasks, situations with multiple valid approaches.</p>
            </div>
          )}
          {selectedPattern === 'react' && (
            <div>
              <p><strong>ReAct (Reasoning + Acting)</strong> combines thinking with action-taking, iterating until the goal is achieved.</p>
              <p><strong>Key Benefits:</strong> Handles dynamic environments, uses external tools, adapts to new information.</p>
              <p><strong>Best For:</strong> Information gathering, API interactions, tasks requiring external data.</p>
            </div>
          )}
          {selectedPattern === 'sequential-chaining' && (
            <div>
              <p><strong>Sequential Chaining</strong> links prompts in linear sequence where each output feeds the next input for complex workflows.</p>
              <p><strong>Key Benefits:</strong> Context preservation, error handling, modular design, step-by-step processing.</p>
              <p><strong>Best For:</strong> Content creation, data processing, multi-step analysis, workflow automation.</p>
            </div>
          )}
          {selectedPattern === 'parallel-chaining' && (
            <div>
              <p><strong>Parallel Chaining</strong> executes multiple prompts simultaneously and combines results for comprehensive analysis.</p>
              <p><strong>Key Benefits:</strong> Faster processing, diverse perspectives, load balancing, conflict resolution.</p>
              <p><strong>Best For:</strong> Research synthesis, data analysis, consensus building, rapid ideation.</p>
            </div>
          )}
          {selectedPattern === 'conditional-chaining' && (
            <div>
              <p><strong>Conditional Chaining</strong> routes execution through different prompt paths based on dynamic conditions and context evaluation.</p>
              <p><strong>Key Benefits:</strong> Dynamic routing, specialized handling, context-aware decisions, efficient resource allocation.</p>
              <p><strong>Best For:</strong> Personalization, adaptive workflows, decision trees, user interfaces.</p>
            </div>
          )}
          {selectedPattern === 'capability-routing' && (
            <div>
              <p><strong>Capability Routing</strong> analyzes workload requirements and routes tasks to optimal compute nodes based on resource capabilities and availability.</p>
              <p><strong>Key Benefits:</strong> Resource optimization, performance maximization, adaptive load balancing, cost efficiency.</p>
              <p><strong>Best For:</strong> Distributed computing, ML training, data processing, high-performance computing workloads.</p>
            </div>
          )}
          {selectedPattern === 'load-balancing' && (
            <div>
              <p><strong>Load Balancing</strong> distributes incoming requests across multiple servers to optimize resource utilization and ensure system reliability.</p>
              <p><strong>Key Benefits:</strong> High availability, optimal resource distribution, performance optimization, fault tolerance.</p>
              <p><strong>Best For:</strong> High-traffic applications, distributed systems, microservices, web services at scale.</p>
            </div>
          )}
          {selectedPattern === 'geographic-routing' && (
            <div>
              <p><strong>Geographic Routing</strong> routes requests based on user location, regulatory compliance, and regional optimization to ensure optimal performance and legal adherence.</p>
              <p><strong>Key Benefits:</strong> Regulatory compliance, latency optimization, data sovereignty, regional customization.</p>
              <p><strong>Best For:</strong> Global applications, regulated industries, CDN optimization, multi-region deployments.</p>
            </div>
          )}
          {selectedPattern === 'map-reduce' && (
            <div>
              <p><strong>Map-Reduce</strong> distributes computation across multiple nodes using map and reduce operations for processing large datasets efficiently.</p>
              <p><strong>Key Benefits:</strong> Parallel processing, fault tolerance, scalable architecture, automatic result aggregation.</p>
              <p><strong>Best For:</strong> Big data processing, distributed analytics, batch processing, large-scale computations.</p>
            </div>
          )}
          {selectedPattern === 'scatter-gather' && (
            <div>
              <p><strong>Scatter-Gather</strong> distributes requests to multiple services simultaneously and collects responses for comprehensive data aggregation.</p>
              <p><strong>Key Benefits:</strong> Parallel service orchestration, response aggregation, timeout management, partial result handling.</p>
              <p><strong>Best For:</strong> Microservices integration, API orchestration, data federation, real-time search across multiple sources.</p>
            </div>
          )}
          {selectedPattern === 'fork-join' && (
            <div>
              <p><strong>Fork-Join</strong> recursively decomposes tasks into parallel subtasks and synchronizes results through hierarchical joining.</p>
              <p><strong>Key Benefits:</strong> Automatic parallelization, work stealing, recursive divide-and-conquer, optimal thread utilization.</p>
              <p><strong>Best For:</strong> Recursive algorithms, parallel sorting, mathematical computations, divide-and-conquer problems.</p>
            </div>
          )}
          {selectedPattern === 'async-await' && (
            <div>
              <p><strong>Async-Await</strong> provides clean, readable asynchronous programming with promise-based coordination and non-blocking execution.</p>
              <p><strong>Key Benefits:</strong> Non-blocking I/O, promise coordination, clean syntax, error handling, resource efficiency.</p>
              <p><strong>Best For:</strong> Web services, API calls, I/O operations, concurrent requests, responsive user interfaces.</p>
            </div>
          )}
          {selectedPattern === 'self-critique' && (
            <div>
              <p><strong>Self-Critique</strong> enables systematic evaluation and iterative improvement through multi-dimensional quality assessment and reflection.</p>
              <p><strong>Key Benefits:</strong> Quality assurance, error detection, objective assessment, continuous improvement, confidence calibration.</p>
              <p><strong>Best For:</strong> Content review, quality control, iterative refinement, error correction, performance optimization.</p>
            </div>
          )}
          {selectedPattern === 'function-calling' && (
            <div>
              <p><strong>Function Calling</strong> provides structured interface for AI to invoke external tools and APIs with parameter validation and result processing.</p>
              <p><strong>Key Benefits:</strong> Schema-based validation, concurrent execution, error handling, security screening, response synthesis.</p>
              <p><strong>Best For:</strong> API integration, tool orchestration, external service calls, multi-function workflows, system automation.</p>
            </div>
          )}
          {selectedPattern === 'code-execution' && (
            <div>
              <p><strong>Code Execution</strong> enables secure generation, validation, and execution of code in sandboxed environments with multi-language support.</p>
              <p><strong>Key Benefits:</strong> Sandboxed execution, resource limiting, security validation, multi-language support, output capture.</p>
              <p><strong>Best For:</strong> Data analysis, calculations, algorithm implementation, automation tasks, code validation.</p>
            </div>
          )}
          {selectedPattern === 'hierarchical-planning' && (
            <div>
              <p><strong>Hierarchical Planning</strong> decomposes complex goals into hierarchical sub-tasks with dependency management and resource allocation.</p>
              <p><strong>Key Benefits:</strong> Goal decomposition, multi-level abstraction, dependency management, resource allocation, progress tracking.</p>
              <p><strong>Best For:</strong> Project management, complex workflows, strategic planning, system design, large-scale coordination.</p>
            </div>
          )}
          {selectedPattern === 'goal-decomposition' && (
            <div>
              <p><strong>Goal Decomposition</strong> systematically breaks down complex goals into manageable sub-goals with SMART criteria evaluation and progress tracking.</p>
              <p><strong>Key Benefits:</strong> SMART goal creation, dependency analysis, priority assignment, progress monitoring, achievement validation.</p>
              <p><strong>Best For:</strong> Task management, goal setting, project planning, personal productivity, performance optimization.</p>
            </div>
          )}
          {selectedPattern === 'constraint-satisfaction' && (
            <div>
              <p><strong>Constraint Satisfaction</strong> systematically finds optimal solutions within specified constraints and limitations using advanced CSP algorithms.</p>
              <p><strong>Key Benefits:</strong> Constraint modeling, solution space exploration, trade-off analysis, multi-objective optimization, guaranteed satisfaction.</p>
              <p><strong>Best For:</strong> Resource allocation, scheduling optimization, configuration management, deployment planning, multi-agent coordination.</p>
            </div>
          )}
          {selectedPattern === 'scenario-planning' && (
            <div>
              <p><strong>Scenario Planning</strong> develops strategic plans for multiple possible future scenarios with probability assessment and adaptive responses.</p>
              <p><strong>Key Benefits:</strong> Strategic foresight, risk mitigation, adaptive planning, stakeholder alignment, uncertainty management, decision robustness.</p>
              <p><strong>Best For:</strong> Strategic planning, risk management, technology roadmaps, regulatory compliance, market uncertainty, long-term investment decisions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h4 className="text-lg font-medium text-white mb-2">How to Use</h4>
        <ul className="text-slate-300 space-y-1 text-sm">
          <li>• <strong>Play Button:</strong> Start automatic step-by-step progression</li>
          <li>• <strong>Step Controls:</strong> Manually navigate forward/backward through steps</li>
          <li>• <strong>Reset:</strong> Return to the beginning of the demonstration</li>
          <li>• <strong>Details Panel:</strong> View input/output and explanations for each step</li>
          <li>• <strong>Zoom Controls:</strong> Navigate and zoom the diagram for better viewing</li>
        </ul>
      </div>
    </div>
  );
};

export default PatternFlowDemo;