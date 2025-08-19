'use client';

import { useState } from 'react';
import { promptOptimizerAPI, type OptimizationRequest, type OptimizationResult, type TrainingExample, type OptimizedPrompt, type ComparisonResult, type DSPyTrace } from '@/lib/prompt-optimizer-api';
import { Wand2, Plus, Trash2, Copy, Info, Sparkles, Target, Brain, Lightbulb, ChevronDown, ChevronRight, Code2, FileText } from 'lucide-react';

export default function PromptOptimizer() {
  const [promptTemplate, setPromptTemplate] = useState('');
  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>([]);
  const [newExample, setNewExample] = useState({ inputs: '', expected_output: '' });
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [testResults, setTestResults] = useState<ComparisonResult | null>(null);
  const [testingLoading, setTestingLoading] = useState(false);
  const [customTestData, setCustomTestData] = useState<TrainingExample[]>([]);
  const [newTestExample, setNewTestExample] = useState({ inputs: '', expected_output: '' });
  const [useCustomTestData, setUseCustomTestData] = useState(false);
  const [expandedTraces, setExpandedTraces] = useState<Set<number>>(new Set());

  // Example templates
  const exampleTemplates = [
    {
      name: "Question Answering",
      template: "Answer the following question based on the context provided.\n\nContext: {context}\nQuestion: {question}\nAnswer:",
      example: { inputs: '{"context": "The sky is blue due to Rayleigh scattering.", "question": "Why is the sky blue?"}', expected_output: "The sky is blue due to Rayleigh scattering of light." }
    },
    {
      name: "Text Classification",
      template: "Classify the sentiment of the following text as positive, negative, or neutral.\n\nText: {text}\nSentiment:",
      example: { inputs: '{"text": "I love this product!"}', expected_output: "positive" }
    },
    {
      name: "Code Generation",
      template: "Generate Python code for the following task:\n\nTask: {task}\nCode:",
      example: { inputs: '{"task": "Create a function that adds two numbers"}', expected_output: "def add_numbers(a, b):\n    return a + b" }
    }
  ];

  const useExampleTemplate = (template: typeof exampleTemplates[0]) => {
    setPromptTemplate(template.template);
    setNewExample(template.example);
    setShowExamples(false);
  };

  const addTrainingExample = () => {
    if (newExample.inputs && newExample.expected_output) {
      try {
        const inputs = JSON.parse(newExample.inputs);
        setTrainingExamples([...trainingExamples, { inputs, expected_output: newExample.expected_output }]);
        setNewExample({ inputs: '', expected_output: '' });
      } catch (e) {
        setError('Invalid JSON in inputs field');
      }
    }
  };

  const removeTrainingExample = (index: number) => {
    setTrainingExamples(trainingExamples.filter((_, i) => i !== index));
  };

  const addCustomTestExample = () => {
    if (newTestExample.inputs && newTestExample.expected_output) {
      try {
        const inputs = JSON.parse(newTestExample.inputs);
        setCustomTestData([...customTestData, { inputs, expected_output: newTestExample.expected_output }]);
        setNewTestExample({ inputs: '', expected_output: '' });
      } catch (e) {
        setError('Invalid JSON in test inputs field');
      }
    }
  };

  const removeCustomTestExample = (index: number) => {
    setCustomTestData(customTestData.filter((_, i) => i !== index));
  };

  const toggleTraceExpansion = (exampleIndex: number) => {
    const newExpanded = new Set(expandedTraces);
    if (newExpanded.has(exampleIndex)) {
      newExpanded.delete(exampleIndex);
    } else {
      newExpanded.add(exampleIndex);
    }
    setExpandedTraces(newExpanded);
  };

  // Helper to clean ANSI escape codes from DSPy output
  const cleanAnsiCodes = (text: string) => {
    if (!text) return text;
    // Remove ANSI escape sequences
    return text.replace(/\x1b\[[0-9;]*m/g, '');
  };

  const optimizePrompt = async () => {
    if (!promptTemplate || trainingExamples.length === 0) {
      setError('Please provide a prompt template and at least one training example');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request: OptimizationRequest = {
        prompt_template: { 
          template: promptTemplate,
          parameters: {}
        },
        training_data: trainingExamples,
        metric: 'accuracy',
        strategy: 'bootstrap_fewshot',
        max_iterations: 10
      };

      const response = await promptOptimizerAPI.createOptimization(request);
      
      // Poll for result
      setTimeout(async () => {
        try {
          const result = await promptOptimizerAPI.getOptimizationResult(response.request_id);
          setOptimizationResults([result, ...optimizationResults]);
        } catch (e) {
          setError('Failed to fetch optimization result');
        }
      }, 2000);

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Optimization failed');
    } finally {
      setLoading(false);
    }
  };

  const loadRecentResults = async () => {
    try {
      const results = await promptOptimizerAPI.listOptimizationResults();
      setOptimizationResults(results);
    } catch (e) {
      setError('Failed to load recent results');
    }
  };

  const testOptimizedPrompt = async (result: OptimizationResult) => {
    const testData = useCustomTestData ? customTestData : trainingExamples;
    if (!result.optimized_prompt || testData.length === 0) {
      setError(`Please provide ${useCustomTestData ? 'custom test data' : 'training examples'} to run tests`);
      return;
    }
    
    setTestingLoading(true);
    setError(null);
    
    try {
      const comparison = await promptOptimizerAPI.comparePrompts(
        result.optimized_prompt.original_template,
        result.optimized_prompt.optimized_template,
        testData
      );
      
      setTestResults(comparison);
    } catch (e) {
      setError(`Testing failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setTestingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mr-4">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Prompt Optimizer
          </h1>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Transform your prompts into high-performing AI interactions using DSPy's advanced optimization techniques
        </p>
        
        {/* Quick stats/info */}
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-400">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            <span>Accuracy Focused</span>
          </div>
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            <span>DSPy Powered</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Auto-optimized</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Prompt Template Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Prompt Template</h2>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-sm text-pink-600 hover:text-pink-700 flex items-center"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Use Examples
              </button>
            </div>
            
            {showExamples && (
              <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-300 mb-3">Choose a template to get started:</p>
                <div className="space-y-2">
                  {exampleTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => useExampleTemplate(template)}
                      className="w-full text-left p-3 bg-gray-600 rounded border border-gray-500 hover:border-pink-400 hover:bg-gray-500 transition-colors"
                    >
                      <div className="font-medium text-white">{template.name}</div>
                      <div className="text-xs text-gray-300 truncate">{template.template.slice(0, 100)}...</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <textarea
              className="w-full h-36 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
              placeholder="Enter your prompt template here... Use {variable_name} for dynamic parts."
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
            />
            <div className="mt-2 flex items-center text-xs text-gray-400">
              <Info className="w-3 h-3 mr-1" />
              Use placeholders like {'{context}'}, {'{question}'} that match your training data inputs
            </div>
          </div>

          {/* Training Examples Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Training Examples</h2>
              <div className="text-sm text-gray-400">
                {trainingExamples.length} example{trainingExamples.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Inputs (JSON Format)
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                  placeholder='{"context": "example context", "question": "example question"}'
                  value={newExample.inputs}
                  onChange={(e) => setNewExample({ ...newExample, inputs: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Output
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                  placeholder="Expected response from the AI"
                  value={newExample.expected_output}
                  onChange={(e) => setNewExample({ ...newExample, expected_output: e.target.value })}
                />
              </div>
              <button
                onClick={addTrainingExample}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Training Example
              </button>
            </div>

            {/* Training Examples List */}
            {trainingExamples.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {trainingExamples.map((example, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-lg border-l-4 border-pink-400">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">INPUTS</div>
                          <div className="text-sm text-gray-200 font-mono bg-gray-800 p-2 rounded border border-gray-600">
                            {JSON.stringify(example.inputs)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">EXPECTED OUTPUT</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-2 rounded border border-gray-600">
                            {example.expected_output}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTrainingExample(index)}
                        className="ml-3 text-red-400 hover:text-red-300 p-1 hover:bg-red-900/20 rounded transition-colors"
                        title="Remove example"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>No training examples yet</p>
                <p className="text-sm">Add examples to train your prompt optimizer</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={optimizePrompt}
                  disabled={loading || !promptTemplate || trainingExamples.length === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Optimize Prompt
                    </>
                  )}
                </button>
                <button
                  onClick={loadRecentResults}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Load Recent Results
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg flex items-center">
                <div className="w-5 h-5 text-red-400 mr-2">⚠️</div>
                <div>
                  <div className="font-medium">Error</div>
                  <div className="text-sm">{error}</div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          {/* Custom Test Data Section */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Test Data</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={useCustomTestData}
                    onChange={(e) => setUseCustomTestData(e.target.checked)}
                    className="mr-2 rounded border-gray-600 bg-gray-700 text-pink-600 focus:ring-pink-400"
                  />
                  Use custom test data
                </label>
                <div className="text-sm text-gray-400">
                  {useCustomTestData ? customTestData.length : trainingExamples.length} test example{(useCustomTestData ? customTestData.length : trainingExamples.length) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            
            {useCustomTestData ? (
              <div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Test Inputs (JSON Format)
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                      placeholder='{"context": "test context", "question": "test question"}'
                      value={newTestExample.inputs}
                      onChange={(e) => setNewTestExample({ ...newTestExample, inputs: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expected Output
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-colors text-white placeholder-gray-400"
                      placeholder="Expected response from the AI"
                      value={newTestExample.expected_output}
                      onChange={(e) => setNewTestExample({ ...newTestExample, expected_output: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={addCustomTestExample}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Test Example
                  </button>
                </div>

                {/* Custom Test Examples List */}
                {customTestData.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {customTestData.map((example, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-700 to-purple-600 p-4 rounded-lg border-l-4 border-blue-400">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 space-y-2">
                            <div>
                              <div className="text-xs font-medium text-gray-300 mb-1">TEST INPUTS</div>
                              <div className="text-sm text-gray-100 font-mono bg-gray-800 p-2 rounded border border-gray-600">
                                {JSON.stringify(example.inputs)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-300 mb-1">EXPECTED OUTPUT</div>
                              <div className="text-sm text-gray-100 bg-gray-800 p-2 rounded border border-gray-600">
                                {example.expected_output}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCustomTestExample(index)}
                            className="ml-3 text-red-300 hover:text-red-200 p-1 hover:bg-red-900/20 rounded transition-colors"
                            title="Remove test example"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Target className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                    <p>No custom test examples yet</p>
                    <p className="text-sm">Add test examples to evaluate your optimized prompts</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>Using training examples for testing</p>
                <p className="text-sm">Enable custom test data to add separate evaluation examples</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Optimization Results</h2>
              {optimizationResults.length > 0 && (
                <div className="text-sm text-gray-400">
                  {optimizationResults.length} result{optimizationResults.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            
            {optimizationResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Ready to optimize!</h3>
                <p className="text-gray-400 mb-4">Add a prompt template and training examples to get started.</p>
                <div className="text-sm text-gray-500">
                  Results will appear here once optimization is complete
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {optimizationResults.map((result, index) => (
                  <div key={result.request_id} className="bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-300">
                          ID: {result.request_id.slice(0, 8)}...
                        </span>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        result.status === 'completed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : result.status === 'failed'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                    
                    {result.optimized_prompt && (
                      <div className="mb-4 space-y-3">
                        <div className="flex items-center mb-2">
                          <Sparkles className="w-4 h-4 text-pink-400 mr-1" />
                          <span className="text-sm font-medium text-gray-300">Optimized Prompt</span>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">ORIGINAL TEMPLATE</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                            {result.optimized_prompt.original_template}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium text-gray-400 mb-1">OPTIMIZED TEMPLATE (Human-Readable)</div>
                          <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                            {result.optimized_prompt.optimized_template}
                          </div>
                        </div>
                        
                        {result.optimized_prompt.dspy_signature && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">DSPY SIGNATURE (Internal Format)</div>
                            <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono">
                              {result.optimized_prompt.dspy_signature}
                            </div>
                          </div>
                        )}
                        
                        {result.optimized_prompt.dspy_history && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">DSPY HISTORY (inspect_history)</div>
                            <div className="text-sm text-gray-200 bg-gray-800 p-3 rounded-lg border border-gray-600 font-mono max-h-48 overflow-y-auto whitespace-pre-wrap">
                              {cleanAnsiCodes(result.optimized_prompt.dspy_history)}
                            </div>
                          </div>
                        )}
                        
                        {result.optimized_prompt.optimization_history && result.optimized_prompt.optimization_history.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-gray-400 mb-1">OPTIMIZATION HISTORY</div>
                            <div className="space-y-2">
                              {result.optimized_prompt.optimization_history.map((step, idx) => (
                                <div key={idx} className="text-xs text-gray-300 bg-gray-800 p-2 rounded border border-gray-600">
                                  <strong>Step {step.step}:</strong> {step.action} ({step.metric_improvement} improvement)
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(result.performance_score || result.optimized_prompt?.performance_score) && (
                      <div className="mb-3 flex items-center">
                        <Target className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm text-gray-300">
                          <strong>Performance:</strong> 
                          <span className="ml-1 text-green-400 font-medium">
                            {((result.performance_score || result.optimized_prompt?.performance_score || 0) * 100).toFixed(1)}%
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Test Results Button */}
                    {result.status === 'completed' && result.optimized_prompt && ((useCustomTestData && customTestData.length > 0) || (!useCustomTestData && trainingExamples.length > 0)) && (
                      <div className="mb-3">
                        <button
                          onClick={() => testOptimizedPrompt(result)}
                          disabled={testingLoading}
                          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {testingLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Testing...
                            </>
                          ) : (
                            <>
                              <Target className="w-4 h-4 mr-2" />
                              Test Performance
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                      Created {new Date(result.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Test Results Section */}
          {testResults && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Test Results
                </h2>
                <button
                  onClick={() => setTestResults(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Comparison Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Original Prompt</h3>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-lg font-bold text-blue-300">
                        {(testResults.original_metrics.accuracy * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Optimized Prompt</h3>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-lg font-bold text-green-300">
                        {(testResults.optimized_metrics.accuracy * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Metrics */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Detailed Metrics</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="font-medium text-gray-300 mb-2">Original</div>
                      <div className="space-y-1 text-gray-400">
                        <div>Precision: {(testResults.original_metrics.precision * 100).toFixed(1)}%</div>
                        <div>Recall: {(testResults.original_metrics.recall * 100).toFixed(1)}%</div>
                        <div>F1 Score: {(testResults.original_metrics.f1_score * 100).toFixed(1)}%</div>
                        <div>Correct: {testResults.original_metrics.correct_predictions}/{testResults.original_metrics.total_examples}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 mb-2">Optimized</div>
                      <div className="space-y-1 text-gray-400">
                        <div>Precision: {(testResults.optimized_metrics.precision * 100).toFixed(1)}%</div>
                        <div>Recall: {(testResults.optimized_metrics.recall * 100).toFixed(1)}%</div>
                        <div>F1 Score: {(testResults.optimized_metrics.f1_score * 100).toFixed(1)}%</div>
                        <div>Correct: {testResults.optimized_metrics.correct_predictions}/{testResults.optimized_metrics.total_examples}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Predictions vs Targets for User Evaluation */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Predictions vs Expected (Manual Evaluation)</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {testResults.original_metrics.targets.map((target, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-2">Example {index + 1}</div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <div className="text-blue-400 font-medium mb-1">Original Prediction</div>
                            <div className="bg-gray-800 p-2 rounded border border-gray-600 min-h-[2rem]">
                              <span className={testResults.original_metrics.matches[index] ? "text-green-300" : "text-red-300"}>
                                {testResults.original_metrics.predictions[index] || "(no response)"}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-green-400 font-medium mb-1">Optimized Prediction</div>
                            <div className="bg-gray-800 p-2 rounded border border-gray-600 min-h-[2rem]">
                              <span className={testResults.optimized_metrics.matches[index] ? "text-green-300" : "text-red-300"}>
                                {testResults.optimized_metrics.predictions[index] || "(no response)"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="text-gray-400 font-medium mb-1 text-xs">Expected Output</div>
                          <div className="bg-gray-900 p-2 rounded border border-gray-500 text-xs text-gray-200">
                            {target}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <div className="flex space-x-4">
                            <span className={`flex items-center ${testResults.original_metrics.matches[index] ? 'text-green-400' : 'text-red-400'}`}>
                              {testResults.original_metrics.matches[index] ? '✓' : '✗'} Original Match
                            </span>
                            <span className={`flex items-center ${testResults.optimized_metrics.matches[index] ? 'text-green-400' : 'text-red-400'}`}>
                              {testResults.optimized_metrics.matches[index] ? '✓' : '✗'} Optimized Match
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* DSPy Detailed Traces */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">DSPy Execution Traces (Adapter Style)</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {testResults.original_metrics.detailed_traces.map((trace, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg">
                        <button
                          onClick={() => toggleTraceExpansion(index)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-600 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-300">
                              Example {trace.example} - {trace.error ? 'Error' : 'Success'}
                            </span>
                            {trace.dspy_history_output && (
                              <div className="flex items-center space-x-1">
                                <Code2 className="w-3 h-3 text-blue-400" />
                                <span className="text-xs text-blue-400">DSPy Trace</span>
                              </div>
                            )}
                          </div>
                          {expandedTraces.has(index) ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        
                        {expandedTraces.has(index) && (
                          <div className="px-3 pb-3 border-t border-gray-600">
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              {/* Original Trace */}
                              <div>
                                <div className="text-xs font-medium text-blue-400 mb-2">Original Prompt Trace</div>
                                <div className="space-y-2 text-xs">
                                  {trace.inputs && (
                                    <div>
                                      <div className="text-gray-400 font-medium">Inputs:</div>
                                      <div className="bg-gray-800 p-2 rounded font-mono text-gray-200">
                                        {JSON.stringify(trace.inputs, null, 2)}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.reasoning_steps && trace.reasoning_steps.length > 0 && (
                                    <div>
                                      <div className="text-gray-400 font-medium">Reasoning Steps:</div>
                                      <div className="bg-gray-800 p-2 rounded">
                                        {trace.reasoning_steps.map((step, stepIndex) => (
                                          <div key={stepIndex} className="text-gray-200 mb-1">
                                            {stepIndex + 1}. {step}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.prediction && Object.keys(trace.prediction).length > 0 && (
                                    <div>
                                      <div className="text-gray-400 font-medium">Prediction Fields:</div>
                                      <div className="bg-gray-800 p-2 rounded font-mono">
                                        {Object.entries(trace.prediction).map(([key, value]) => (
                                          <div key={key} className="text-gray-200">
                                            <span className="text-green-400">{key}:</span> {value}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.dspy_history_output && (
                                    <div>
                                      <div className="text-gray-400 font-medium">DSPy Adapter Output (Full Trace):</div>
                                      <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                                        {cleanAnsiCodes(trace.dspy_history_output)}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.actual_prompt_sent && (
                                    <div>
                                      <div className="text-gray-400 font-medium">Parsed Prompt Sent to LLM:</div>
                                      <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap">
                                        {trace.actual_prompt_sent}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.actual_response_received && (
                                    <div>
                                      <div className="text-gray-400 font-medium">LLM Response:</div>
                                      <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap">
                                        {trace.actual_response_received}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.llm_messages && (
                                    <div>
                                      <div className="text-gray-400 font-medium">LLM Messages:</div>
                                      <div className="bg-gray-800 p-2 rounded space-y-1">
                                        {trace.llm_messages.map((msg, msgIndex) => (
                                          <div key={msgIndex} className="text-gray-200">
                                            <span className="text-blue-400 font-medium">{msg.role}:</span>
                                            <div className="ml-2 text-xs">{msg.content}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {trace.error && (
                                    <div>
                                      <div className="text-red-400 font-medium">Error:</div>
                                      <div className="bg-red-900/20 p-2 rounded text-red-300 text-xs">
                                        {trace.error}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Optimized Trace */}
                              <div>
                                <div className="text-xs font-medium text-green-400 mb-2">Optimized Prompt Trace</div>
                                <div className="space-y-2 text-xs">
                                  {testResults.optimized_metrics.detailed_traces[index] && (
                                    <>
                                      {testResults.optimized_metrics.detailed_traces[index].reasoning_steps && 
                                       testResults.optimized_metrics.detailed_traces[index].reasoning_steps.length > 0 && (
                                        <div>
                                          <div className="text-gray-400 font-medium">Reasoning Steps:</div>
                                          <div className="bg-gray-800 p-2 rounded">
                                            {testResults.optimized_metrics.detailed_traces[index].reasoning_steps.map((step, stepIndex) => (
                                              <div key={stepIndex} className="text-gray-200 mb-1">
                                                {stepIndex + 1}. {step}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {testResults.optimized_metrics.detailed_traces[index].dspy_history_output && (
                                        <div>
                                          <div className="text-gray-400 font-medium">DSPy Adapter Output (Full Trace):</div>
                                          <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                                            {cleanAnsiCodes(testResults.optimized_metrics.detailed_traces[index].dspy_history_output)}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {testResults.optimized_metrics.detailed_traces[index].prediction && 
                                       Object.keys(testResults.optimized_metrics.detailed_traces[index].prediction).length > 0 && (
                                        <div>
                                          <div className="text-gray-400 font-medium">Prediction Fields:</div>
                                          <div className="bg-gray-800 p-2 rounded font-mono">
                                            {Object.entries(testResults.optimized_metrics.detailed_traces[index].prediction).map(([key, value]) => (
                                              <div key={key} className="text-gray-200">
                                                <span className="text-green-400">{key}:</span> {value}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {testResults.optimized_metrics.detailed_traces[index].actual_prompt_sent && (
                                        <div>
                                          <div className="text-gray-400 font-medium">Parsed Prompt Sent to LLM:</div>
                                          <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap">
                                            {testResults.optimized_metrics.detailed_traces[index].actual_prompt_sent}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {testResults.optimized_metrics.detailed_traces[index].actual_response_received && (
                                        <div>
                                          <div className="text-gray-400 font-medium">LLM Response:</div>
                                          <div className="bg-gray-800 p-2 rounded font-mono text-xs text-gray-200 whitespace-pre-wrap">
                                            {testResults.optimized_metrics.detailed_traces[index].actual_response_received}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {testResults.optimized_metrics.detailed_traces[index].error && (
                                        <div>
                                          <div className="text-red-400 font-medium">Error:</div>
                                          <div className="bg-red-900/20 p-2 rounded text-red-300 text-xs">
                                            {testResults.optimized_metrics.detailed_traces[index].error}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Improvements */}
                {Object.keys(testResults.improvements).length > 0 && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Performance Improvements</h3>
                    <div className="space-y-2">
                      {Object.entries(testResults.improvements).map(([metric, improvement]) => (
                        <div key={metric} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400 capitalize">
                            {metric.replace('_improvement_percent', '').replace('_', ' ')}
                          </span>
                          <span className={`text-sm font-medium ${
                            (improvement as number) > 0 ? 'text-green-400' : 
                            (improvement as number) < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {(improvement as number) > 0 ? '+' : ''}{(improvement as number).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                  Tested on {testResults.test_examples_count} examples
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}