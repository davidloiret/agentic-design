import React, { useState } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Download, Copy, Check, Eye, EyeOff } from 'lucide-react';

type ViewMode = 'setup' | 'training' | 'results';

const IntegratedPromptOptimizer: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const NavigationBar: React.FC = () => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setViewMode('setup')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                viewMode === 'setup' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-sm">1</span>
              <span>Setup</span>
            </button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setViewMode('training')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                viewMode === 'training' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={viewMode === 'setup'}
            >
              <span className="text-sm">2</span>
              <span>Training</span>
            </button>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setViewMode('results')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                viewMode === 'results' 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={viewMode !== 'results'}
            >
              <span className="text-sm">3</span>
              <span>Results</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {viewMode === 'training' && (
              <>
                {isOptimizing ? (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart</span>
                </button>
              </>
            )}
            {viewMode === 'results' && (
              <>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Copy className="w-4 h-4" />
                  <span>Copy Prompt</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Export Results</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const PromptComparison: React.FC = () => {
    const [showDiff, setShowDiff] = useState(true);

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Prompt Comparison</h2>
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showDiff ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showDiff ? 'Hide' : 'Show'} Differences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Original Prompt</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <p>Given the context: {'{context}'}</p>
              <p className="mt-2">Answer the question: {'{question}'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              Optimized Prompt
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                +28.5% accuracy
              </span>
            </h3>
            <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
              <p className={showDiff ? 'bg-green-200' : ''}>
                You are a helpful assistant. Break down the task systematically.
              </p>
              <p className="mt-2">
                <span className={showDiff ? 'bg-green-200' : ''}>Examples:</span>
              </p>
              <p className={showDiff ? 'bg-green-200 ml-4' : 'ml-4'}>
                1. Context: "The sky is blue." Question: "What color is the sky?" Answer: "Blue"
              </p>
              <p className="mt-2">Given the context: {'{context}'}</p>
              <p className="mt-2">
                <span className={showDiff ? 'bg-green-200' : ''}>
                  Provide a clear, accurate answer to
                </span>{' '}
                the question: {'{question}'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Improvements</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Added task-specific instructions for clarity</li>
            <li>• Included 3 diverse few-shot examples</li>
            <li>• Optimized instruction ordering for better performance</li>
            <li>• Enhanced with context-aware prompting</li>
          </ul>
        </div>
      </div>
    );
  };

  const TrainingMetricsPanel: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Live Training Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-600 mb-1">Current Accuracy</div>
          <div className="text-3xl font-bold text-blue-900">84.3%</div>
          <div className="text-xs text-blue-600 mt-1">↑ 12.4% from baseline</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-green-600 mb-1">Best Score</div>
          <div className="text-3xl font-bold text-green-900">92.1%</div>
          <div className="text-xs text-green-600 mt-1">Achieved in round 7</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Training Progress</span>
            <span className="font-medium">67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }} />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Optimization Rounds</span>
            <span className="font-medium">8 / 10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Performance History</h3>
        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
          [Performance Chart Visualization]
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'setup' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Prompt Optimizer</h1>
              <p className="text-blue-100 max-w-2xl">
                Transform your prompts into high-performing AI interactions using advanced optimization strategies.
                Start by selecting your strategy and providing training examples.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Main setup form would go here */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Setup Your Optimization</h2>
                  {/* Form content */}
                </div>
              </div>
              <div>
                {/* Strategy selection and info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <button
                    onClick={() => {
                      setViewMode('training');
                      setIsOptimizing(true);
                    }}
                    className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Optimization</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'training' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Stepper component would go here */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Optimization Progress</h2>
                {/* Stepper content */}
              </div>
            </div>
            <div>
              <TrainingMetricsPanel />
            </div>
          </div>
        )}

        {viewMode === 'results' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <Check className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Optimization Complete!</h1>
              </div>
              <p className="text-green-100">
                Your prompt has been successfully optimized with a 28.5% improvement in accuracy.
              </p>
            </div>

            <PromptComparison />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
                  {/* Detailed metrics and analysis */}
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                      <div className="font-medium">Test with New Data</div>
                      <div className="text-sm text-gray-600">Evaluate on unseen examples</div>
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                      <div className="font-medium">Deploy to Production</div>
                      <div className="text-sm text-gray-600">Use in your application</div>
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                      <div className="font-medium">Continue Optimization</div>
                      <div className="text-sm text-gray-600">Further improve performance</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedPromptOptimizer;