import { useEffect, useState } from "react";
import { Brain, Target, X, ArrowRight, TestTube, BarChart3, Play } from 'lucide-react';
import { Technique, TechniqueCategory } from './techniques/types';

// Add proper type interfaces
interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
}

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  enabled: boolean;
}

interface EvaluationResult {
  modelId: string;
  patternId: string;
  score: number;
  metrics: { [key: string]: number };
  feedback: string;
}

interface ApiTokens {
  [provider: string]: string;
}

interface UseCase {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Evaluation Interface Component
export const EvaluationInterface = ({ 
  techniques, 
  categories, 
  selectedPatterns, 
  setSelectedPatterns,
  evaluationCriteria,
  setEvaluationCriteria,
  testScenario,
  setTestScenario,
  selectedModels,
  setSelectedModels,
  evaluationResults,
  setEvaluationResults,
  apiTokens,
  setApiTokens,
  showTokenModal,
  setShowTokenModal
}: {
  techniques: Technique[];
  categories: Category[];
  selectedPatterns: Technique[];
  setSelectedPatterns: (patterns: Technique[]) => void;
  evaluationCriteria: EvaluationCriteria[];
  setEvaluationCriteria: (criteria: EvaluationCriteria[]) => void;
  testScenario: string;
  setTestScenario: (scenario: string) => void;
  selectedModels: ModelConfig[];
  setSelectedModels: (models: ModelConfig[]) => void;
  evaluationResults: EvaluationResult[] | null;
  setEvaluationResults: (results: EvaluationResult[] | null) => void;
  apiTokens: ApiTokens;
  setApiTokens: (tokens: ApiTokens) => void;
  showTokenModal: boolean;
  setShowTokenModal: (show: boolean) => void;
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  // Load API tokens from localStorage on mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('agentic-api-tokens');
    if (savedTokens) {
      try {
        setApiTokens(JSON.parse(savedTokens));
      } catch (error) {
        console.error('Failed to load API tokens:', error);
      }
    }
  }, []);

  // Available models for testing
  const availableModels = [
    { 
      id: 'gpt-4', 
      name: 'GPT-4', 
      provider: 'OpenAI', 
      type: 'Large Language Model',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      tokenName: 'OpenAI API Key',
      tokenField: 'openai',
      model: 'gpt-4',
      pricing: '$0.03/1K tokens'
    },
    { 
      id: 'gpt-3.5-turbo', 
      name: 'GPT-3.5 Turbo', 
      provider: 'OpenAI', 
      type: 'Large Language Model',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      tokenName: 'OpenAI API Key',
      tokenField: 'openai',
      model: 'gpt-3.5-turbo',
      pricing: '$0.002/1K tokens'
    },
    { 
      id: 'claude-3-sonnet', 
      name: 'Claude 3 Sonnet', 
      provider: 'Anthropic', 
      type: 'Large Language Model',
      endpoint: 'https://api.anthropic.com/v1/messages',
      tokenName: 'Anthropic API Key',
      tokenField: 'anthropic',
      model: 'claude-3-sonnet-20240229',
      pricing: '$0.015/1K tokens'
    },
    { 
      id: 'claude-3-haiku', 
      name: 'Claude 3 Haiku', 
      provider: 'Anthropic', 
      type: 'Large Language Model',
      endpoint: 'https://api.anthropic.com/v1/messages',
      tokenName: 'Anthropic API Key',
      tokenField: 'anthropic',
      model: 'claude-3-haiku-20240307',
      pricing: '$0.0008/1K tokens'
    },
    { 
      id: 'gemini-pro', 
      name: 'Gemini Pro', 
      provider: 'Google', 
      type: 'Large Language Model',
      endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      tokenName: 'Google AI API Key',
      tokenField: 'google',
      model: 'gemini-pro',
      pricing: 'Free tier available'
    }
  ];

  // Evaluation criteria options
  const availableCriteria = [
    { id: 'accuracy', name: 'Accuracy', description: 'How correct are the outputs?', weight: 1 },
    { id: 'speed', name: 'Response Speed', description: 'How fast does it generate responses?', weight: 1 },
    { id: 'consistency', name: 'Consistency', description: 'How consistent are repeated runs?', weight: 1 },
    { id: 'complexity', name: 'Complexity Handling', description: 'Can it handle complex scenarios?', weight: 1 },
    { id: 'cost', name: 'Cost Efficiency', description: 'What are the computational costs?', weight: 1 },
    { id: 'scalability', name: 'Scalability', description: 'How well does it scale with volume?', weight: 1 },
    { id: 'interpretability', name: 'Interpretability', description: 'How explainable are the results?', weight: 1 },
    { id: 'safety', name: 'Safety', description: 'How safe and reliable is it?', weight: 1 }
  ];

  // Sample test scenarios
  const sampleScenarios = [
    {
      title: "Customer Support Automation",
      description: "Handle customer inquiries with escalation to human agents when needed",
      input: "Customer complaint about delayed order and requesting refund",
      expected: "Empathetic response with order tracking and refund process explanation"
    },
    {
      title: "Code Generation Task",
      description: "Generate Python function to process user data",
      input: "Create a function that validates email addresses and returns boolean",
      expected: "Valid Python function with proper email regex validation"
    },
    {
      title: "Mathematical Problem Solving",
      description: "Solve complex mathematical word problems step by step",
      input: "If a train travels 120 miles in 2 hours, then 180 miles in 3 hours, what's the average speed for the entire journey?",
      expected: "Step-by-step calculation showing 60 mph average speed"
    },
    {
      title: "Creative Content Generation",
      description: "Generate creative marketing copy for a product",
      input: "Write engaging product description for eco-friendly water bottle",
      expected: "Compelling, benefit-focused copy highlighting sustainability"
    }
  ];

  const togglePatternSelection = (pattern: Technique) => {
    setSelectedPatterns(prev => {
      const isSelected = prev.find(p => p.id === pattern.id);
      if (isSelected) {
        return prev.filter(p => p.id !== pattern.id);
      } else {
        return [...prev, pattern];
      }
    });
  };

  const toggleCriteriaSelection = (criteria: EvaluationCriteria) => {
    setEvaluationCriteria(prev => {
      const isSelected = prev.find(c => c.id === criteria.id);
      if (isSelected) {
        return prev.filter(c => c.id !== criteria.id);
      } else {
        return [...prev, { ...criteria, weight: 1 }];
      }
    });
  };

  const updateCriteriaWeight = (criteriaId: string, weight: string) => {
    setEvaluationCriteria(prev =>
      prev.map(c => c.id === criteriaId ? { ...c, weight: parseFloat(weight) } : c)
    );
  };

  const toggleModelSelection = (model) => {
    setSelectedModels(prev => {
      const isSelected = prev.find(m => m.id === model.id);
      if (isSelected) {
        return prev.filter(m => m.id !== model.id);
      } else {
        return [...prev, model];
      }
    });
  };

  // API calling functions
  const callOpenAI = async (model, prompt, apiKey) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  };

  const callAnthropic = async (model, prompt, apiKey) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model.model,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
  };

  const callGoogle = async (model, prompt, apiKey) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const callModel = async (model, prompt) => {
    const apiKey = apiTokens[model.tokenField];
    if (!apiKey) {
      throw new Error(`No API key provided for ${model.provider}`);
    }

    switch (model.provider) {
      case 'OpenAI':
        return await callOpenAI(model, prompt, apiKey);
      case 'Anthropic':
        return await callAnthropic(model, prompt, apiKey);
      case 'Google':
        return await callGoogle(model, prompt, apiKey);
      default:
        throw new Error(`Unsupported provider: ${model.provider}`);
    }
  };

  const generatePatternPrompt = (pattern, testScenario) => {
    let prompt = `Using the ${pattern.name} pattern, please respond to the following scenario:\n\n${testScenario}\n\n`;
    
    switch (pattern.id) {
      case 'cot':
        prompt += "Please think step by step and show your reasoning process.";
        break;
      case 'tot':
        prompt += "Consider multiple approaches and evaluate different solution paths.";
        break;
      case 'self-correction':
        prompt += "First provide an initial response, then review and improve it.";
        break;
      case 'react':
        prompt += "Use a Thought → Action → Observation approach if applicable.";
        break;
      case 'constitutional-ai':
        prompt += "Ensure your response follows ethical guidelines and safety principles.";
        break;
      case 'sequential-chaining':
        prompt += "Break this down into sequential steps if needed.";
        break;
      case 'parallel-chaining':
        prompt += "Consider multiple aspects simultaneously if applicable.";
        break;
      default:
        prompt += `Apply the principles of ${pattern.name} in your response.`;
    }
    
    return prompt;
  };

  const evaluateResponse = (response, criteria, executionTime) => {
    const scores = {};
    
    criteria.forEach(criterion => {
      switch (criterion.id) {
        case 'accuracy':
          // Simple heuristic: longer, more detailed responses score higher
          scores[criterion.id] = Math.min(5, response.length / 200 + Math.random() * 2);
          break;
        case 'speed':
          // Faster responses score higher (inverse relationship with execution time)
          scores[criterion.id] = Math.max(1, 5 - (executionTime / 1000));
          break;
        case 'consistency':
          // Random for demo, in real implementation would need multiple runs
          scores[criterion.id] = 3 + Math.random() * 2;
          break;
        case 'complexity':
          // Responses with structured thinking score higher
          const hasStructure = /\d+\.|\-|\*/.test(response);
          scores[criterion.id] = hasStructure ? 4 + Math.random() : 2 + Math.random() * 2;
          break;
        case 'interpretability':
          // Responses with clear explanations score higher
          const hasExplanation = response.toLowerCase().includes('because') || 
                                 response.toLowerCase().includes('therefore') ||
                                 response.toLowerCase().includes('step');
          scores[criterion.id] = hasExplanation ? 4 + Math.random() : 2 + Math.random() * 2;
          break;
        case 'safety':
          // Check for harmful content (basic implementation)
          const isSafe = !response.toLowerCase().includes('illegal') && 
                        !response.toLowerCase().includes('harmful');
          scores[criterion.id] = isSafe ? 4.5 + Math.random() * 0.5 : 1 + Math.random();
          break;
        default:
          scores[criterion.id] = 2.5 + Math.random() * 2.5;
      }
    });
    
    return scores;
  };

  const runEvaluation = async () => {
    if (selectedPatterns.length === 0 || selectedModels.length === 0 || !testScenario) {
      alert('Please select patterns, models, and provide a test scenario');
      return;
    }

    // Check if required API tokens are provided
    const requiredTokens = [...new Set(selectedModels.map(m => m.tokenField))];
    const missingTokens = requiredTokens.filter(field => !apiTokens[field]);
    
    if (missingTokens.length > 0) {
      alert(`Please provide API tokens for: ${missingTokens.map(field => 
        availableModels.find(m => m.tokenField === field)?.provider
      ).join(', ')}`);
      setShowTokenModal(true);
      return;
    }

    setIsRunning(true);
    
    try {
      const results: EvaluationResult[] = [];

      for (const pattern of selectedPatterns) {
        const patternResult: EvaluationResult = {
          modelId: '', // Placeholder, will be filled later
          patternId: pattern.id,
          score: 0,
          metrics: {},
          feedback: ''
        };

        for (const model of selectedModels) {
          const startTime = Date.now();
                     const modelResult: EvaluationResult = {
            modelId: model.id,
            patternId: pattern.id,
            score: 0,
            metrics: {},
            feedback: ''
          };

          try {
            const prompt = generatePatternPrompt(pattern, testScenario);
            const response = await callModel(model, prompt);
            const executionTime = Date.now() - startTime;
            
            modelResult.feedback = response;
            modelResult.metrics = evaluateResponse(response, evaluationCriteria, executionTime);
            
            // Calculate weighted overall score
            const totalWeight = evaluationCriteria.reduce((sum, c) => sum + c.weight, 0);
            modelResult.score = evaluationCriteria.reduce((sum, c) => 
              sum + (modelResult.metrics[c.id] * c.weight), 0) / totalWeight;
            
          } catch (error) {
            modelResult.feedback = `Error: ${error.message}`;
            modelResult.metrics = {}; // No scores on error
            modelResult.score = 0;
          }

          results.push(modelResult);
        }

        // Find the best model for this pattern based on overall score
        const bestModelForPattern = results.reduce((best, current) => {
          if (current.score > best.score) {
            return current;
          }
          return best;
        }, results[0]);

        patternResult.modelId = bestModelForPattern.modelId;
        patternResult.score = bestModelForPattern.score;
        patternResult.metrics = bestModelForPattern.metrics;
        patternResult.feedback = bestModelForPattern.feedback;
        results.push(patternResult);
      }
      
      setEvaluationResults(results);
      setActiveStep(4); // Move to results step
    } catch (error) {
      alert(`Evaluation failed: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getPatternsByCategory = (categoryId) => {
    return techniques.filter(t => t.category === categoryId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Token Management Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">API Token Management</h2>
              <button
                onClick={() => setShowTokenModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Security Notice */}
              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <h3 className="font-semibold text-blue-100 mb-2">🔒 Security Notice</h3>
                <p className="text-blue-200 text-sm">
                  Your API keys are stored locally in your browser and are never sent to our servers. 
                  They are only used to make direct API calls to the respective providers from your browser.
                </p>
              </div>

              {/* Token Input Forms */}
              <div className="space-y-4">
                {/* OpenAI */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      O
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">OpenAI API Key</h3>
                      <p className="text-xs text-gray-400">For GPT-4 and GPT-3.5 Turbo models</p>
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={apiTokens.openai || ''}
                    onChange={(e) => setApiTokens(prev => ({ ...prev, openai: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:border-blue-500 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Platform</a>
                  </p>
                </div>

                {/* Anthropic */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Anthropic API Key</h3>
                      <p className="text-xs text-gray-400">For Claude 3 models</p>
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="sk-ant-..."
                    value={apiTokens.anthropic || ''}
                    onChange={(e) => setApiTokens(prev => ({ ...prev, anthropic: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:border-blue-500 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Anthropic Console</a>
                  </p>
                </div>

                {/* Google */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      G
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Google AI API Key</h3>
                      <p className="text-xs text-gray-400">For Gemini Pro model</p>
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="AIza..."
                    value={apiTokens.google || ''}
                    onChange={(e) => setApiTokens(prev => ({ ...prev, google: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:border-blue-500 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google AI Studio</a>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setApiTokens({});
                    localStorage.removeItem('agentic-api-tokens');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Clear All Tokens
                </button>
                <button
                  onClick={() => {
                    // Save to localStorage
                    localStorage.setItem('agentic-api-tokens', JSON.stringify(apiTokens));
                    setShowTokenModal(false);
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    <div className="h-full flex flex-col">
      {/* Progress Steps */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 border">
        <div className="max-w-10xl mx-auto">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Select Patterns', icon: Target },
              { step: 2, title: 'Configure Test', icon: TestTube },
              { step: 3, title: 'Choose Models', icon: Brain },
              { step: 4, title: 'View Results', icon: BarChart3 }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeStep === step
                      ? 'bg-orange-500 text-white'
                      : activeStep > step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{title}</span>
                </button>
                {step < 4 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    activeStep > step ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-10xl mx-auto p-6">
          {activeStep === 1 && (
            /* Step 1: Pattern Selection */
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Select Patterns to Compare</h2>
              <p className="text-gray-400 mb-6">Choose 2-5 patterns you want to evaluate and compare for your use case.</p>
              
              {/* Selected Patterns Summary */}
              {selectedPatterns.length > 0 && (
                <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-white mb-3">Selected Patterns ({selectedPatterns.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatterns.map(pattern => (
                      <div key={pattern.id} className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        <span>{pattern.icon}</span>
                        <span>{pattern.name}</span>
                        <button 
                          onClick={() => togglePatternSelection(pattern)}
                          className="ml-1 hover:bg-orange-600 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pattern Categories */}
              <div className="space-y-6">
                {categories.slice(1).map(category => (
                  <div key={category.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getPatternsByCategory(category.id).map(pattern => {
                        const isSelected = selectedPatterns.find(p => p.id === pattern.id);
                        return (
                          <button
                            key={pattern.id}
                            onClick={() => togglePatternSelection(pattern)}
                            className={`p-4 rounded-lg border transition-all text-left ${
                              isSelected
                                ? 'bg-orange-500 border-orange-400 text-white'
                                : 'bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg">{pattern.icon}</span>
                              <h4 className="font-medium">{pattern.name}</h4>
                            </div>
                            <p className="text-sm opacity-80">{pattern.description}</p>
                            <div className="mt-2">
                              <span className="text-xs px-2 py-1 bg-black/20 rounded">
                                {pattern.complexity} complexity
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveStep(2)}
                  disabled={selectedPatterns.length === 0}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Next: Configure Test
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            /* Step 2: Test Configuration */
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Configure Evaluation Test</h2>
              <p className="text-gray-400 mb-6">Set up your test scenario and evaluation criteria.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Test Scenario */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Test Scenario</h3>
                  
                  {/* Sample Scenarios */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Choose Sample Scenario</label>
                    <div className="space-y-2">
                      {sampleScenarios.map((scenario, idx) => (
                        <button
                          key={idx}
                          onClick={() => setTestScenario(scenario.input)}
                          className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors"
                        >
                          <div className="font-medium text-white">{scenario.title}</div>
                          <div className="text-sm text-gray-400">{scenario.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Scenario */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Or Write Custom Scenario</label>
                    <textarea
                      value={testScenario}
                      onChange={(e) => setTestScenario(e.target.value)}
                      placeholder="Describe your test scenario or input prompt..."
                      className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-orange-500 text-white resize-none"
                    />
                  </div>
                </div>

                {/* Evaluation Criteria */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Evaluation Criteria</h3>
                  <p className="text-sm text-gray-400 mb-4">Select criteria and set their importance weights (1-5 scale)</p>
                  
                  <div className="space-y-3">
                    {availableCriteria.map(criteria => {
                      const isSelected = evaluationCriteria.find(c => c.id === criteria.id);
                      return (
                        <div key={criteria.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded border border-gray-600">
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => toggleCriteriaSelection(criteria)}
                            className="w-4 h-4 text-orange-600 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{criteria.name}</div>
                            <div className="text-xs text-gray-400">{criteria.description}</div>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-2">
                              <label className="text-xs text-gray-400">Weight:</label>
                              <select
                                value={isSelected.weight}
                                onChange={(e) => updateCriteriaWeight(criteria.id, e.target.value)}
                                className="w-16 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                              >
                                {[1, 2, 3, 4, 5].map(w => (
                                  <option key={w} value={w}>{w}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Back: Select Patterns
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  disabled={!testScenario || evaluationCriteria.length === 0}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Next: Choose Models
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            /* Step 3: Model Selection */
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Choose Models to Test</h2>
              <p className="text-gray-400 mb-6">Select which AI models you want to test the patterns with. You'll need to provide your own API keys.</p>

              {/* Token Management */}
              <div className="mb-6 p-4 bg-amber-900/20 border border-amber-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-amber-100">API Token Management</h3>
                  <button
                    onClick={() => setShowTokenModal(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Manage API Keys
                  </button>
                </div>
                <p className="text-amber-200 text-sm">
                  To test models with real API calls, you need to provide your own API keys. 
                  Keys are stored locally in your browser and never sent to our servers.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['openai', 'anthropic', 'google'].map(provider => (
                    <div key={provider} className={`px-3 py-1 rounded-full text-xs ${
                      apiTokens[provider] 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}: {
                        apiTokens[provider] ? '✓ Configured' : '✗ Missing'
                      }
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Models Summary */}
              {selectedModels.length > 0 && (
                <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-white mb-3">Selected Models ({selectedModels.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModels.map(model => (
                      <div key={model.id} className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        <span>{model.name}</span>
                        <button 
                          onClick={() => toggleModelSelection(model)}
                          className="ml-1 hover:bg-orange-600 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Models */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableModels.map(model => {
                  const isSelected = selectedModels.find(m => m.id === model.id);
                  const hasToken = apiTokens[model.tokenField];
                  return (
                    <button
                      key={model.id}
                      onClick={() => toggleModelSelection(model)}
                      disabled={!hasToken}
                      className={`p-6 rounded-lg border transition-all text-left relative ${
                        isSelected
                          ? 'bg-orange-500 border-orange-400 text-white'
                          : hasToken
                          ? 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-300'
                          : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {!hasToken && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg">{model.name}</h3>
                        <p className="text-sm opacity-80">{model.provider}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-black/20 rounded">{model.type}</span>
                          <span className={`text-xs ${hasToken ? 'text-green-400' : 'text-red-400'}`}>
                            {hasToken ? '✓ Ready' : '✗ API Key Required'}
                          </span>
                        </div>
                        <div className="text-xs opacity-75">
                          Pricing: {model.pricing}
                        </div>
                        {!hasToken && (
                          <div className="text-xs text-red-400">
                            Configure {model.tokenName} to enable
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Run Evaluation */}
              <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Ready to Run Evaluation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Patterns:</span>
                    <span className="text-white ml-2">{selectedPatterns.length} selected</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Models:</span>
                    <span className="text-white ml-2">{selectedModels.length} selected</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Criteria:</span>
                    <span className="text-white ml-2">{evaluationCriteria.length} selected</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Back: Configure Test
                </button>
                <button
                  onClick={runEvaluation}
                  disabled={selectedModels.length === 0 || isRunning}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Running Evaluation...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Evaluation
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeStep === 4 && evaluationResults && (
            /* Step 4: Results */
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Evaluation Results</h2>
              <p className="text-gray-400 mb-6">Compare pattern performance across different models and criteria.</p>

              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">{selectedPatterns.length}</div>
                  <div className="text-gray-400">Patterns Tested</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">{selectedModels.length}</div>
                  <div className="text-gray-400">Models Used</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">{evaluationCriteria.length}</div>
                  <div className="text-gray-400">Criteria Evaluated</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">
                    {(evaluationResults.reduce((sum, r) => 
                      sum + r.metrics.speed, 0) / 
                      (selectedPatterns.length * selectedModels.length) / 1000).toFixed(1)}s
                  </div>
                  <div className="text-gray-400">Avg Response Time</div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="space-y-6">
                {evaluationResults.map((result, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                      <span className="text-2xl">{result.patternId.charAt(0).toUpperCase() + result.patternId.slice(1)}</span>
                      {result.patternId.charAt(0).toUpperCase() + result.patternId.slice(1)}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3">Best Model: {result.modelId.charAt(0).toUpperCase() + result.modelId.slice(1)}</h4>
                        <div className="text-sm text-gray-400">Overall Score: {result.score.toFixed(1)}/5</div>
                        <div className="text-sm text-gray-400">Execution Time: {result.metrics.speed.toFixed(0)}ms</div>
                            </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3">Criteria Scores</h4>
                          <div className="space-y-2">
                            {evaluationCriteria.map(criteria => (
                              <div key={criteria.id} className="flex justify-between items-center">
                                <span className="text-sm text-gray-300">{criteria.name}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-600 rounded-full h-2">
                                    <div 
                                      className="bg-orange-500 h-2 rounded-full" 
                                    style={{ width: `${(result.metrics[criteria.id] / 5) * 100}%` }}
                                    />
                                  </div>
                                <span className="text-sm text-white w-8">{result.metrics[criteria.id].toFixed(1)}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                          </div>

                    {result.feedback && (
                            <div className="mt-4">
                              <details className="bg-gray-800 rounded p-3">
                                <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                                  View Response Output
                                </summary>
                                <div className="mt-3 p-3 bg-gray-900 rounded text-xs text-gray-300 max-h-40 overflow-y-auto">
                            <pre className="whitespace-pre-wrap">{result.feedback}</pre>
                                </div>
                              </details>
                            </div>
                          )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Back: Choose Models
                </button>
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Start New Evaluation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
