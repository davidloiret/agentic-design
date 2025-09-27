'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Search, Calculator, Book, Eye, CheckCircle, Lightbulb, ArrowRight, Zap, Database, Globe } from 'lucide-react';

interface Step {
  id: string;
  type: 'thought' | 'action' | 'observation';
  content: string;
  tool?: string;
  result?: string;
  timestamp: string;
}

interface Example {
  id: string;
  title: string;
  question: string;
  tools: string[];
  finalAnswer: string;
}

export default function ReActDemo() {
  const [selectedExample, setSelectedExample] = useState<string>('qa');
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [showComparison, setShowComparison] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const examples: Example[] = [
    {
      id: 'qa',
      title: 'Question Answering',
      question: 'What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?',
      tools: ['Search', 'Lookup'],
      finalAnswer: '1,800 to 7,000 ft'
    },
    {
      id: 'math',
      title: 'Multi-hop Math',
      question: "Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?",
      tools: ['Search', 'Calculator'],
      finalAnswer: 'Camila Morrone, ~3.66'
    },
    {
      id: 'research',
      title: 'Research Task',
      question: 'Compare the GDP per capita of the country where the Eiffel Tower is located with the country where the Statue of Liberty was made.',
      tools: ['Search', 'Database'],
      finalAnswer: 'France: ~$40,000, USA: ~$70,000'
    }
  ];

  const qaSteps: Step[] = [
    {
      id: '1',
      type: 'thought',
      content: 'I need to search for Colorado orogeny and find what area the eastern sector extends into.',
      timestamp: '0.1s'
    },
    {
      id: '2',
      type: 'action',
      content: 'Search[Colorado orogeny]',
      tool: 'Search',
      timestamp: '0.3s'
    },
    {
      id: '3',
      type: 'observation',
      content: 'The Colorado orogeny was an episode of mountain building in Colorado and surrounding areas...',
      result: 'Found general info about Colorado orogeny',
      timestamp: '0.5s'
    },
    {
      id: '4',
      type: 'thought',
      content: 'The page doesn\'t mention the eastern sector specifically. Let me look up "eastern sector".',
      timestamp: '0.7s'
    },
    {
      id: '5',
      type: 'action',
      content: 'Lookup[eastern sector]',
      tool: 'Lookup',
      timestamp: '0.9s'
    },
    {
      id: '6',
      type: 'observation',
      content: '...the eastern sector extends into the High Plains...',
      result: 'Eastern sector → High Plains',
      timestamp: '1.1s'
    },
    {
      id: '7',
      type: 'thought',
      content: 'Now I need to find the elevation range of the High Plains.',
      timestamp: '1.3s'
    },
    {
      id: '8',
      type: 'action',
      content: 'Search[High Plains United States]',
      tool: 'Search',
      timestamp: '1.5s'
    },
    {
      id: '9',
      type: 'observation',
      content: 'The High Plains rise in elevation from around 1,800 to 7,000 ft...',
      result: 'Elevation: 1,800-7,000 ft',
      timestamp: '1.7s'
    },
    {
      id: '10',
      type: 'thought',
      content: 'Perfect! The High Plains rise from 1,800 to 7,000 ft. That\'s our answer.',
      timestamp: '1.9s'
    },
    {
      id: '11',
      type: 'action',
      content: 'Finish[1,800 to 7,000 ft]',
      tool: 'Finish',
      timestamp: '2.1s'
    }
  ];

  const mathSteps: Step[] = [
    {
      id: '1',
      type: 'thought',
      content: 'I need to find out who Leo DiCaprio\'s girlfriend is.',
      timestamp: '0.1s'
    },
    {
      id: '2',
      type: 'action',
      content: 'Search[Leo DiCaprio girlfriend]',
      tool: 'Search',
      timestamp: '0.3s'
    },
    {
      id: '3',
      type: 'observation',
      content: 'Leo DiCaprio is currently dating Camila Morrone...',
      result: 'Girlfriend: Camila Morrone',
      timestamp: '0.5s'
    },
    {
      id: '4',
      type: 'thought',
      content: 'Now I need to find Camila Morrone\'s age.',
      timestamp: '0.7s'
    },
    {
      id: '5',
      type: 'action',
      content: 'Search[Camila Morrone age]',
      tool: 'Search',
      timestamp: '0.9s'
    },
    {
      id: '6',
      type: 'observation',
      content: 'Camila Morrone is 26 years old...',
      result: 'Age: 26',
      timestamp: '1.1s'
    },
    {
      id: '7',
      type: 'thought',
      content: 'Now I need to calculate 26^0.43.',
      timestamp: '1.3s'
    },
    {
      id: '8',
      type: 'action',
      content: 'Calculator[26^0.43]',
      tool: 'Calculator',
      timestamp: '1.5s'
    },
    {
      id: '9',
      type: 'observation',
      content: '3.6636...',
      result: '≈ 3.66',
      timestamp: '1.7s'
    },
    {
      id: '10',
      type: 'action',
      content: 'Finish[Camila Morrone, 3.66]',
      tool: 'Finish',
      timestamp: '1.9s'
    }
  ];

  const getStepsForExample = (id: string) => {
    switch (id) {
      case 'qa':
        return qaSteps;
      case 'math':
        return mathSteps;
      default:
        return qaSteps;
    }
  };

  const runReActLoop = async () => {
    setIsRunning(true);
    setSteps([]);
    setCurrentStepIndex(-1);
    setShowComparison(false);

    const exampleSteps = getStepsForExample(selectedExample);

    for (let i = 0; i < exampleSteps.length; i++) {
      setCurrentStepIndex(i);
      setSteps(prev => [...prev, exampleSteps[i]]);

      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsRunning(false);
    setShowComparison(true);
  };

  const resetDemo = () => {
    setSteps([]);
    setCurrentStepIndex(-1);
    setShowComparison(false);
  };

  const getIconForType = (type: string, tool?: string) => {
    if (type === 'thought') return <Lightbulb className="w-4 h-4 text-yellow-400" />;
    if (type === 'action') {
      switch (tool) {
        case 'Search':
          return <Search className="w-4 h-4 text-blue-400" />;
        case 'Calculator':
          return <Calculator className="w-4 h-4 text-green-400" />;
        case 'Lookup':
          return <Book className="w-4 h-4 text-purple-400" />;
        case 'Database':
          return <Database className="w-4 h-4 text-cyan-400" />;
        default:
          return <Zap className="w-4 h-4 text-orange-400" />;
      }
    }
    if (type === 'observation') return <Eye className="w-4 h-4 text-gray-400" />;
    return null;
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'thought':
        return 'bg-yellow-900/20 border-yellow-800/30 text-yellow-200';
      case 'action':
        return 'bg-blue-900/20 border-blue-800/30 text-blue-200';
      case 'observation':
        return 'bg-gray-900/20 border-gray-800/30 text-gray-200';
      default:
        return 'bg-slate-900/20 border-slate-800/30 text-slate-200';
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">ReAct (Reasoning + Acting)</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Combines reasoning with acting through external tool use. Interleaves thoughts with actions
          to gather information and solve complex tasks step by step.
        </p>
      </div>

      {/* Key Pattern */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Brain className="w-5 h-5 text-purple-400" />
          The ReAct Pattern
        </h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-800/30 rounded-lg px-4 py-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-200 font-medium">Thought</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-2 bg-blue-900/20 border border-blue-800/30 rounded-lg px-4 py-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 font-medium">Action</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-2 bg-gray-900/20 border border-gray-800/30 rounded-lg px-4 py-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-gray-200 font-medium">Observation</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400" />
          <span className="text-slate-300">Repeat...</span>
        </div>
      </div>

      {/* Example Selector */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Select Example</h3>
        <div className="space-y-3">
          {examples.map(ex => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExample(ex.id);
                resetDemo();
              }}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                selectedExample === ex.id
                  ? 'bg-blue-900/30 border border-blue-700'
                  : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {selectedExample === ex.id ? (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{ex.title}</h4>
                  <p className="text-sm text-slate-400 mb-2">{ex.question}</p>
                  <div className="flex gap-2">
                    {ex.tools.map(tool => (
                      <span key={tool} className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ReAct Terminal */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <Globe className="w-5 h-5 text-green-400" />
          ReAct Execution Trace
        </h3>
        <div
          ref={terminalRef}
          className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm"
        >
          {steps.length === 0 ? (
            <div className="text-slate-500 text-center py-8">
              Click "Run ReAct Loop" to see the reasoning and acting process
            </div>
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`border rounded-lg p-3 transition-all ${getColorForType(step.type)} ${
                    index === currentStepIndex ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getIconForType(step.type, step.tool)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold capitalize">{step.type}</span>
                        {step.tool && (
                          <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
                            {step.tool}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 ml-auto">{step.timestamp}</span>
                      </div>
                      <div className="text-sm">{step.content}</div>
                      {step.result && (
                        <div className="mt-2 text-xs text-slate-400 bg-slate-800/50 rounded px-2 py-1">
                          → {step.result}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={runReActLoop}
          disabled={isRunning}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {isRunning ? (
              <>
                <Brain className="w-5 h-5 animate-pulse" />
                Running ReAct Loop...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Run ReAct Loop
              </>
            )}
          </span>
        </button>

        <button
          onClick={resetDemo}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/* Comparison with Pure Reasoning */}
      {showComparison && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5 text-green-400" />
            ReAct vs Pure Chain-of-Thought
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-2">Pure CoT (No Tools)</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Relies only on internal knowledge</li>
                <li>• Can hallucinate facts</li>
                <li>• Cannot verify information</li>
                <li>• Limited to training data cutoff</li>
                <li>• Error propagation issues</li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">ReAct (Reasoning + Acting)</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Access to external tools</li>
                <li>• Verifies information dynamically</li>
                <li>• Self-corrects based on observations</li>
                <li>• Up-to-date information access</li>
                <li>• More interpretable traces</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">How ReAct Works</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <strong className="text-white">Thought:</strong> Reason about the current situation and plan next steps
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <strong className="text-white">Action:</strong> Execute tools (Search, Calculate, etc.) to gather information
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <strong className="text-white">Observation:</strong> Process tool results and incorporate new information
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <div>
              <strong className="text-white">Iterate:</strong> Repeat until task is complete or answer is found
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-300">
          <Zap className="w-5 h-5" />
          Ideal Use Cases
        </h3>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>• <strong>Multi-hop QA:</strong> Questions requiring multiple searches</li>
          <li>• <strong>Task automation:</strong> Interacting with APIs and databases</li>
          <li>• <strong>Research tasks:</strong> Gathering and synthesizing information</li>
          <li>• <strong>Math problems:</strong> Combining reasoning with calculation</li>
          <li>• <strong>Fact verification:</strong> Checking claims against sources</li>
        </ul>
      </div>
    </div>
  );
}