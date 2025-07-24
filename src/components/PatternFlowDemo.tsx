'use client';

import React, { useState } from 'react';
import { InteractivePatternFlow } from './InteractivePatternFlow';
import { patternScenarios } from '../data/pattern-scenarios';

const PatternFlowDemo: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState('cot');

  const availablePatterns = [
    { id: 'cot', name: 'Chain of Thought' },
    { id: 'tot', name: 'Tree of Thoughts' },
    { id: 'react', name: 'ReAct Pattern' },
    { id: 'sequential-chaining', name: 'Sequential Chaining' },
    { id: 'parallel-chaining', name: 'Parallel Chaining' }
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