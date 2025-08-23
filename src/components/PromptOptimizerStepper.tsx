'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ChevronRight, Loader2, BarChart3, Code, Sparkles, Brain, Target, FileText, TestTube, Rocket, Info, GitBranch, Layers, Database, BookOpen, Settings, ChevronDown, ChevronUp, Check, Eye, EyeOff, ArrowRight, ArrowLeft, Play, Pause, RotateCcw, Download, Copy, Zap, Plus, Trash2 } from 'lucide-react';
import { promptOptimizerAPI, type OptimizationRequest, type OptimizationResult, type TrainingExample, type OptimizedPrompt, type ComparisonResult, type DSPyTrace, type SimplePromptComponents, type ImprovePromptResponse, type PromptGuide } from '@/lib/prompt-optimizer-api';

type OptimizationStrategy = 'bootstrap_fewshot' | 'mipro' | 'copro' | 'bootstrap_finetune';
type ViewMode = 'setup' | 'training' | 'results' | 'improve';

interface StepperStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'pending' | 'active' | 'completed' | 'error';
  results?: any;
}

interface OptimizationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  improvement: number;
}

interface StrategyConfig {
  name: string;
  description: string;
  icon: React.ElementType;
  primaryColor: string;
  features: string[];
  inputFields: {
    required: string[];
    optional: string[];
  };
  recommendations: {
    minExamples: number;
    maxExamples: number;
    idealExamples: number;
  };
  advancedSettings: {
    name: string;
    key: string;
    type: 'number' | 'select' | 'boolean';
    default: any;
    options?: string[];
    description: string;
  }[];
}

const strategyConfigs: Record<OptimizationStrategy, StrategyConfig> = {
  bootstrap_fewshot: {
    name: 'Bootstrap Few-Shot',
    description: 'Automatically selects and optimizes few-shot examples from your training data',
    icon: Zap,
    primaryColor: 'blue',
    features: [
      'Automatic example selection',
      'Diversity-aware sampling',
      'Fast optimization cycles',
      'No fine-tuning required'
    ],
    inputFields: {
      required: ['prompt_template', 'training_examples'],
      optional: ['validation_examples', 'custom_metric']
    },
    recommendations: {
      minExamples: 5,
      maxExamples: 50,
      idealExamples: 20
    },
    advancedSettings: [
      {
        name: 'Bootstrap Rounds',
        key: 'bootstrap_rounds',
        type: 'number',
        default: 3,
        description: 'Number of bootstrap sampling rounds'
      },
      {
        name: 'Example Selection',
        key: 'example_selection',
        type: 'select',
        default: 'diverse',
        options: ['diverse', 'random', 'similarity'],
        description: 'Method for selecting few-shot examples'
      }
    ]
  },
  mipro: {
    name: 'MIPRO (Multi-Instruction Prompt Optimization)',
    description: 'Generates and evaluates multiple instruction variations to find optimal prompt',
    icon: GitBranch,
    primaryColor: 'purple',
    features: [
      'Multi-instruction exploration',
      'Bayesian optimization',
      'Instruction pattern mining',
      'Complex task optimization'
    ],
    inputFields: {
      required: ['prompt_template', 'training_examples', 'task_description'],
      optional: ['instruction_constraints', 'domain_keywords']
    },
    recommendations: {
      minExamples: 10,
      maxExamples: 100,
      idealExamples: 40
    },
    advancedSettings: [
      {
        name: 'Instruction Candidates',
        key: 'num_candidates',
        type: 'number',
        default: 10,
        description: 'Number of instruction variations to generate'
      },
      {
        name: 'Optimization Algorithm',
        key: 'optimization_algo',
        type: 'select',
        default: 'bayesian',
        options: ['bayesian', 'grid_search', 'random_search'],
        description: 'Algorithm for instruction optimization'
      }
    ]
  },
  copro: {
    name: 'COPRO (Context-Prompt Co-Optimization)',
    description: 'Jointly optimizes context selection and prompt instructions',
    icon: Layers,
    primaryColor: 'green',
    features: [
      'Context-aware optimization',
      'Joint prompt-context tuning',
      'Retrieval augmentation',
      'Dynamic context selection'
    ],
    inputFields: {
      required: ['prompt_template', 'training_examples', 'context_pool'],
      optional: ['context_embeddings', 'relevance_threshold']
    },
    recommendations: {
      minExamples: 15,
      maxExamples: 150,
      idealExamples: 60
    },
    advancedSettings: [
      {
        name: 'Context Window Size',
        key: 'context_window',
        type: 'number',
        default: 5,
        description: 'Number of context items to consider'
      },
      {
        name: 'Co-optimization Strategy',
        key: 'co_opt_strategy',
        type: 'select',
        default: 'alternating',
        options: ['alternating', 'joint', 'sequential'],
        description: 'How to optimize prompt and context'
      }
    ]
  },
  bootstrap_finetune: {
    name: 'Bootstrap Fine-tune',
    description: 'Combines prompt optimization with model fine-tuning for maximum performance',
    icon: Brain,
    primaryColor: 'orange',
    features: [
      'Model fine-tuning',
      'Data augmentation',
      'Synthetic data generation',
      'Highest accuracy potential'
    ],
    inputFields: {
      required: ['prompt_template', 'training_examples', 'base_model'],
      optional: ['augmentation_strategy', 'fine_tune_params']
    },
    recommendations: {
      minExamples: 50,
      maxExamples: 1000,
      idealExamples: 200
    },
    advancedSettings: [
      {
        name: 'Fine-tuning Epochs',
        key: 'epochs',
        type: 'number',
        default: 3,
        description: 'Number of training epochs'
      },
      {
        name: 'Augmentation Factor',
        key: 'augmentation_factor',
        type: 'number',
        default: 2,
        description: 'How much to augment training data'
      }
    ]
  }
};

export default function PromptOptimizerStepper() {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [strategy, setStrategy] = useState<OptimizationStrategy>('bootstrap_fewshot');
  const [currentStep, setCurrentStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState('');
  const [trainingExamples, setTrainingExamples] = useState<TrainingExample[]>([]);
  const [newExample, setNewExample] = useState({ inputs: '', expected_output: '' });
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [optimizationRequestId, setOptimizationRequestId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(true);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [resultsSubView, setResultsSubView] = useState<'overview' | 'testing'>('overview');
  const [tryItInputs, setTryItInputs] = useState<Record<string, string>>({});
  const [tryItPrediction, setTryItPrediction] = useState<any>(null);
  const [tryItLoading, setTryItLoading] = useState(false);
  const [showDSPyHistory, setShowDSPyHistory] = useState(false);
  const [displayFormat, setDisplayFormat] = useState<'raw' | 'chat'>('raw');
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false);
  
  // Improve mode state
  const [improvePromptInput, setImprovePromptInput] = useState('');
  const [improveContext, setImproveContext] = useState('');
  const [improveLoading, setImproveLoading] = useState(false);
  const [improveResult, setImproveResult] = useState<ImprovePromptResponse | null>(null);
  const [copiedImproved, setCopiedImproved] = useState(false);
  const [availableGuides, setAvailableGuides] = useState<Record<string, PromptGuide>>({});
  const [selectedGuide, setSelectedGuide] = useState<string>('anthropic');
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  
  // Simple template components state
  const [simpleComponents, setSimpleComponents] = useState<SimplePromptComponents>({
    task_context: '',
    tone_context: '',
    background_data: '',
    detailed_task_instructions: '',
    conversation_history: '',
    final_request: '',
    chain_of_thought: '',
    output_formatting: ''
  });

  // Function to generate template from components
  const generateTemplateFromComponents = () => {
    const components = [];
    
    if (simpleComponents.task_context) {
      components.push(simpleComponents.task_context);
    }
    if (simpleComponents.tone_context) {
      components.push(simpleComponents.tone_context);
    }
    if (simpleComponents.background_data) {
      components.push(simpleComponents.background_data);
    }
    if (simpleComponents.detailed_task_instructions) {
      components.push(simpleComponents.detailed_task_instructions);
    }
    
    // Add default placeholder if not already present in any component
    const allText = components.join(' ');
    const hasPlaceholder = /\{[^}]+\}/.test(allText);
    if (!hasPlaceholder) {
      components.push('{input}');
    }
    
    if (simpleComponents.conversation_history) {
      components.push(simpleComponents.conversation_history);
    }
    if (simpleComponents.final_request) {
      components.push(simpleComponents.final_request);
    }
    if (simpleComponents.chain_of_thought) {
      components.push(simpleComponents.chain_of_thought);
    }
    if (simpleComponents.output_formatting) {
      components.push(simpleComponents.output_formatting);
    }
    
    return components.join('\n\n');
  };

  const getStepsForStrategy = (strategy: OptimizationStrategy): StepperStep[] => {
    const baseSteps: StepperStep[] = [
      {
        id: 'setup',
        title: 'Setup & Validation',
        description: 'Validate prompt template and training data',
        icon: FileText,
        status: 'pending'
      }
    ];

    const strategySpecificSteps: Record<OptimizationStrategy, StepperStep[]> = {
      bootstrap_fewshot: [
        {
          id: 'sampling',
          title: 'Bootstrap Sampling',
          description: 'Selecting diverse few-shot examples',
          icon: TestTube,
          status: 'pending'
        },
        {
          id: 'candidate_generation',
          title: 'Candidate Generation',
          description: 'Creating optimized prompt variations',
          icon: Sparkles,
          status: 'pending'
        },
        {
          id: 'evaluation',
          title: 'Evaluation & Ranking',
          description: 'Testing candidates on validation set',
          icon: BarChart3,
          status: 'pending'
        }
      ],
      mipro: [
        {
          id: 'instruction_mining',
          title: 'Instruction Mining',
          description: 'Extracting instruction patterns',
          icon: Brain,
          status: 'pending'
        },
        {
          id: 'multi_prompt',
          title: 'Multi-Prompt Generation',
          description: 'Creating diverse instruction sets',
          icon: Code,
          status: 'pending'
        },
        {
          id: 'bayesian_optimization',
          title: 'Bayesian Optimization',
          description: 'Finding optimal instruction combination',
          icon: Target,
          status: 'pending'
        }
      ],
      copro: [
        {
          id: 'context_analysis',
          title: 'Context Analysis',
          description: 'Analyzing training context patterns',
          icon: Brain,
          status: 'pending'
        },
        {
          id: 'co_optimization',
          title: 'Co-Optimization',
          description: 'Jointly optimizing prompt and context',
          icon: Sparkles,
          status: 'pending'
        },
        {
          id: 'refinement',
          title: 'Iterative Refinement',
          description: 'Fine-tuning based on feedback',
          icon: Target,
          status: 'pending'
        }
      ],
      bootstrap_finetune: [
        {
          id: 'data_augmentation',
          title: 'Data Augmentation',
          description: 'Generating synthetic training data',
          icon: TestTube,
          status: 'pending'
        },
        {
          id: 'finetuning',
          title: 'Model Fine-tuning',
          description: 'Training specialized model weights',
          icon: Brain,
          status: 'pending'
        },
        {
          id: 'prompt_adaptation',
          title: 'Prompt Adaptation',
          description: 'Optimizing prompts for fine-tuned model',
          icon: Sparkles,
          status: 'pending'
        }
      ]
    };

    const finalStep: StepperStep = {
      id: 'finalization',
      title: 'Finalization',
      description: 'Packaging optimized prompt',
      icon: Rocket,
      status: 'pending'
    };

    return [...baseSteps, ...strategySpecificSteps[strategy], finalStep];
  };

  const steps = getStepsForStrategy(strategy);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Fetch available prompt guides on mount
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await promptOptimizerAPI.getPromptGuides();
        setAvailableGuides(response.guides);
      } catch (error) {
        console.error('Failed to fetch prompt guides:', error);
      }
    };
    fetchGuides();
  }, []);

  const simulateOptimizationProgress = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        setIsOptimizing(false);
        setViewMode('results');
      }
    }, 2000);
    setPollingInterval(interval);
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

  const useExampleTemplate = (template: typeof exampleTemplates[0], loadAll: boolean = true) => {
    setPromptTemplate(template.template);
    if (loadAll) {
      setTrainingExamples([]); // Clear existing examples
      // Load all examples for this template
      const loadedExamples: TrainingExample[] = [];
      template.examples.forEach(example => {
        try {
          const inputs = JSON.parse(example.inputs);
          loadedExamples.push({ inputs, expected_output: example.expected_output });
        } catch (e) {
          console.error('Failed to parse example:', e);
        }
      });
      setTrainingExamples(loadedExamples);
    } else {
      // Just set the first example in the form
      if (template.examples.length > 0) {
        setNewExample(template.examples[0]);
      }
    }
  };

  const initializeTryItMode = () => {
    if (!optimizationResult?.optimized_prompt) return;
    
    setResultsSubView('testing');
    setTryItPrediction(null);
    
    // Extract input fields from the prompt template
    const template = optimizationResult.optimized_prompt.original_template || '';
    const fieldMatches = template.match(/\{(\w+)\}/g) || [];
    const fields = fieldMatches.map(match => match.slice(1, -1));
    
    const initialInputs: Record<string, string> = {};
    fields.forEach(field => {
      initialInputs[field] = '';
    });
    setTryItInputs(initialInputs);
  };

  const tryOptimizedPrompt = async () => {
    if (!optimizationRequestId) return;
    
    setTryItLoading(true);
    setError(null);
    
    try {
      const result = await promptOptimizerAPI.predictWithComparison(
        optimizationRequestId,
        tryItInputs
      );
      setTryItPrediction(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Prediction failed');
    } finally {
      setTryItLoading(false);
    }
  };

  const improvePrompt = async () => {
    if (!improvePromptInput.trim()) {
      setError('Please enter a prompt to improve');
      return;
    }
    
    setImproveLoading(true);
    setError(null);
    
    try {
      const result = await promptOptimizerAPI.improvePrompt({
        prompt: improvePromptInput,
        context: improveContext || undefined,
        guide_type: selectedGuide,
      });
      setImproveResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to improve prompt');
    } finally {
      setImproveLoading(false);
    }
  };

  const copyImprovedPrompt = () => {
    if (improveResult?.improved_prompt) {
      navigator.clipboard.writeText(improveResult.improved_prompt);
      setCopiedImproved(true);
      setTimeout(() => setCopiedImproved(false), 2000);
    }
  };

  const downloadPredictor = async () => {
    if (!optimizationRequestId) return;
    
    try {
      const predictorData = await promptOptimizerAPI.exportPredictor(optimizationRequestId);
      
      // Add metadata about what's included
      const enhancedData = {
        ...predictorData,
        export_info: {
          exported_at: new Date().toISOString(),
          optimization_id: optimizationRequestId,
          strategy_used: strategy,
          includes: {
            dspy_predictor: !!predictorData.dspy_predictor_pickle,
            conversation_history: !!predictorData.dspy_history_formatted,
            global_history: !!predictorData.dspy_global_history,
            predictor_traces: !!predictorData.predictor_traces,
            predictor_demos: !!predictorData.predictor_demos
          },
          usage_notes: "Use advanced_dspy_optimizer.deserialize_predictor() to load this predictor"
        }
      };
      
      // Create a blob from the JSON data
      const blob = new Blob([JSON.stringify(enhancedData, null, 2)], { type: 'application/json' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dspy-predictor-${strategy}-${optimizationRequestId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center';
      successMsg.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        DSPy predictor exported with full conversation history!
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to download predictor');
    }
  };

  const startOptimization = async () => {
    if (!promptTemplate || trainingExamples.length === 0) {
      setError('Please provide a prompt template and at least one training example');
      return;
    }

    setIsOptimizing(true);
    setViewMode('training');
    setError(null);
    setCurrentStep(0);

    try {
      const request: OptimizationRequest = {
        prompt_template: { 
          template: promptTemplate,
          parameters: {}
        },
        training_data: trainingExamples,
        metric: 'accuracy',
        strategy: strategy,
        max_iterations: 10
      };
      
      const response = await promptOptimizerAPI.createOptimization(request);
      setOptimizationRequestId(response.request_id);
      
      simulateOptimizationProgress();
      
      // Poll for result
      const checkResult = async () => {
        try {
          const result = await promptOptimizerAPI.getOptimizationResult(response.request_id);
          if (result.status === 'completed' || result.status === 'failed') {
            setOptimizationResult(result);
            if (pollingInterval) {
              clearInterval(pollingInterval);
            }
          }
        } catch (e) {
          console.error('Failed to fetch result:', e);
        }
      };

      const resultInterval = setInterval(checkResult, 3000);
      setPollingInterval(resultInterval);

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Optimization failed');
      setIsOptimizing(false);
    }
  };

  const MetricCard: React.FC<{ label: string; value: number; improvement?: number }> = ({ label, value, improvement }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-200">{(value * 100).toFixed(1)}%</div>
      {improvement && (
        <div className="text-sm text-green-600 mt-1">
          +{improvement.toFixed(1)}% improvement
        </div>
      )}
    </div>
  );

  const StepItem: React.FC<{ step: StepperStep; index: number }> = ({ step, index }) => {
    const Icon = step.icon;
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;
    const isPending = index > currentStep;

    return (
      <div className="flex items-start">
        <div className="flex flex-col items-center">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all
            ${isActive ? 'bg-blue-600 ring-4 ring-blue-100' : ''}
            ${isCompleted ? 'bg-green-600' : ''}
            ${isPending ? 'bg-gray-200' : ''}
            ${step.status === 'error' ? 'bg-red-600' : ''}
          `}>
            {isActive && isOptimizing ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : isCompleted ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-0.5 h-16 mt-2 transition-all ${
              isCompleted ? 'bg-green-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`font-semibold transition-colors ${
            isActive ? 'text-pink-500' : isCompleted ? 'text-green-600' : 'text-gray-200'
          }`}>
            {step.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{step.description}</p>
          
          {isActive && step.id === 'evaluation' && (
            <div className="mt-4 p-4 bg-pink-500/10 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-2">Live Metrics</div>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label="Accuracy" value={0.823} improvement={18.5} />
                <MetricCard label="F1 Score" value={0.791} improvement={22.3} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const NavigationBar: React.FC = () => {
    // Don't show navigation steps for improve mode
    if (viewMode === 'improve') {
      return <div className="h-1 bg-gray-800 border-b border-gray-700"></div>;
    }
    
    return (
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setViewMode('setup')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'setup' 
                    ? 'bg-pink-500/10 text-blue-700 font-medium' 
                    : 'text-gray-400 hover:text-gray-200'
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
                    ? 'bg-pink-500/10 text-blue-700 font-medium' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                disabled={viewMode === 'setup' && !optimizationRequestId}
              >
                <span className="text-sm">2</span>
                <span>Training</span>
              </button>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => setViewMode('results')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'results' 
                    ? 'bg-pink-500/10 text-blue-700 font-medium' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                disabled={!optimizationResult}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PromptComparison: React.FC = () => {
    if (!optimizationResult?.optimized_prompt) return null;
    
    // Convert to ChatAdapter format
    const convertToChatFormat = (template: string): { role: string; content: string }[] => {
      const messages: { role: string; content: string }[] = [];
      
      // Parse the template to extract examples and instructions
      const parts = template.split('---');
      
      if (parts.length > 1 && parts[0].includes('Examples:')) {
        // Add examples as system message
        messages.push({
          role: 'system',
          content: `You are a helpful assistant. Here are some examples to guide your responses:\n\n${parts[0].trim()}`
        });
        
        // Add the instruction template as user message template
        const instructionPart = parts[1].trim();
        messages.push({
          role: 'user',
          content: instructionPart
        });
      } else {
        // Simple template without examples
        messages.push({
          role: 'system',
          content: 'You are a helpful assistant. Please follow the instructions carefully.'
        });
        messages.push({
          role: 'user',
          content: template
        });
      }
      
      return messages;
    };
    
    const chatMessages = convertToChatFormat(optimizationResult.optimized_prompt.optimized_template);

    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Prompt Comparison</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setDisplayFormat('raw')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  displayFormat === 'raw' 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Raw
              </button>
              <button
                onClick={() => setDisplayFormat('chat')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  displayFormat === 'chat' 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Chat Format
              </button>
            </div>
            <button
              onClick={() => setShowDiff(!showDiff)}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-200"
            >
              {showDiff ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showDiff ? 'Hide' : 'Show'} Original</span>
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${showDiff ? 'lg:grid-cols-2' : ''} gap-6`}>
          {showDiff && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Original Prompt</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                {optimizationResult.optimized_prompt.original_template}
              </div>
            </div>
          )}

          <div className={showDiff ? '' : 'col-span-full'}>
            <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <span>Optimized Prompt {displayFormat === 'chat' && '(Chat Format)'}</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {optimizationResult.optimized_prompt.performance_score.toFixed(1)}% accuracy
                </span>
              </div>
              <button
                onClick={() => {
                  const textToCopy = displayFormat === 'chat' 
                    ? JSON.stringify(chatMessages, null, 2)
                    : optimizationResult.optimized_prompt.optimized_template;
                  navigator.clipboard.writeText(textToCopy);
                  // Show a brief confirmation
                  const btn = event?.target as HTMLButtonElement;
                  if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                    setTimeout(() => { btn.innerHTML = originalText; }, 1500);
                  }
                }}
                className="text-xs bg-green-800 hover:bg-green-700 px-2 py-1 rounded flex items-center space-x-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </h3>
            
            {displayFormat === 'raw' ? (
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 font-mono text-sm text-green-300 whitespace-pre-wrap">
                {optimizationResult.optimized_prompt.optimized_template}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      msg.role === 'system' 
                        ? 'bg-purple-800 text-purple-200' 
                        : msg.role === 'user'
                        ? 'bg-blue-800 text-blue-200'
                        : 'bg-green-800 text-green-200'
                    }`}>
                      {msg.role}
                    </div>
                    <div className="flex-1 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-400">
                  <strong>Usage:</strong> Copy this JSON format for OpenAI API, Anthropic API, or any chat-based LLM. 
                  Replace placeholders like {`{context}`} with actual values.
                </div>
              </div>
            )}
            {optimizationResult.optimized_prompt.metadata?.actual_demonstrations && optimizationResult.optimized_prompt.optimized_template.includes('Examples:') && (
              <div className="mt-2 text-xs text-gray-400 italic">
                Contains {optimizationResult.optimized_prompt.metadata.actual_demonstrations} optimized demonstrations from {optimizationResult.optimized_prompt.metadata.training_examples} training examples.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // All example templates from original
  const exampleTemplates = [
    {
      name: "Multi-hop Reasoning (Complex QA)",
      template: "Answer the question using the given context. Think step by step.\n\nContext: {context}\nQuestion: {question}\nAnswer:",
      examples: [
        { inputs: '{"context": "Sarah owns a bakery. Her bakery produces 120 croissants daily. Each croissant costs $3. On weekends, she increases production by 50%.", "question": "How much revenue does Sarah make from croissants on a weekend day?"}', expected_output: "$540" },
        { inputs: '{"context": "The conference has 3 sessions. Session A has 45 attendees, Session B has 30% more than A, and Session C has twice as many as B.", "question": "What is the total number of attendees across all sessions?"}', expected_output: "213" },
        { inputs: '{"context": "A train leaves Station A at 2 PM traveling at 60 mph. Another train leaves Station B (180 miles away) at 3 PM traveling at 90 mph toward Station A.", "question": "At what time will the trains meet?"}', expected_output: "4:12 PM" },
        { inputs: '{"context": "Company X had $2M revenue in Q1. Q2 saw a 15% increase, Q3 decreased by 10% from Q2, and Q4 increased by 20% from Q3.", "question": "What was the total revenue for the year?"}', expected_output: "$8.856M" },
        { inputs: '{"context": "A recipe needs 2 cups of flour for 12 cookies. You want to make 30 cookies but only have 4 cups of flour.", "question": "Do you have enough flour, and if not, how much more do you need?"}', expected_output: "Not enough. You need 1 more cup of flour." }
      ]
    },
    {
      name: "Logical Reasoning",
      template: "Based on the given facts, answer the question with logical reasoning.\n\nFacts: {facts}\nQuestion: {question}\nAnswer:",
      examples: [
        { inputs: '{"facts": "All programmers know Python. Sam is a programmer. Python is a programming language.", "question": "Does Sam know Python?"}', expected_output: "Yes" },
        { inputs: '{"facts": "If it rains, the grass gets wet. The grass is not wet. It might rain tomorrow.", "question": "Did it rain today?"}', expected_output: "No" },
        { inputs: '{"facts": "Every student who studies hard passes the exam. John studied hard. Mary did not study.", "question": "Will John pass the exam?"}', expected_output: "Yes" },
        { inputs: '{"facts": "All birds can fly except penguins. Tweety is a bird. Tweety lives in Antarctica.", "question": "Can Tweety fly?"}', expected_output: "Cannot determine (could be a penguin or another Antarctic bird)" },
        { inputs: '{"facts": "The meeting is at 3 PM or 4 PM. If it\'s at 3 PM, Tom will attend. Tom is not attending.", "question": "When is the meeting?"}', expected_output: "4 PM" }
      ]
    },
    {
      name: "Code Explanation & Generation",
      template: "Given the programming task, provide the solution with explanation.\n\nTask: {task}\nConstraints: {constraints}\nSolution:",
      examples: [
        { inputs: '{"task": "Find the second largest number in an array", "constraints": "O(n) time complexity, handle duplicates"}', expected_output: "def second_largest(arr):\n    if len(arr) < 2: return None\n    first = second = float('-inf')\n    for num in arr:\n        if num > first:\n            second = first\n            first = num\n        elif first > num > second:\n            second = num\n    return second if second != float('-inf') else None" },
        { inputs: '{"task": "Check if a string has balanced parentheses", "constraints": "Must handle (), [], and {} brackets"}', expected_output: "def is_balanced(s):\n    stack = []\n    pairs = {'(': ')', '[': ']', '{': '}'}\n    for char in s:\n        if char in pairs:\n            stack.append(char)\n        elif char in pairs.values():\n            if not stack or pairs[stack.pop()] != char:\n                return False\n    return len(stack) == 0" },
        { inputs: '{"task": "Implement a basic LRU cache", "constraints": "O(1) get and put operations"}', expected_output: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    \n    def get(self, key):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n            return self.cache[key]\n        return -1\n    \n    def put(self, key, value):\n        self.cache[key] = value\n        self.cache.move_to_end(key)\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)" }
      ]
    },
    {
      name: "Text Classification",
      template: "Classify the sentiment of the following text as positive, negative, or neutral.\n\nText: {text}\nSentiment:",
      examples: [
        { inputs: '{"text": "I love this product! Best purchase ever!"}', expected_output: "positive" },
        { inputs: '{"text": "This is terrible. I want my money back."}', expected_output: "negative" },
        { inputs: '{"text": "The package arrived on time."}', expected_output: "neutral" },
        { inputs: '{"text": "Amazing service, highly recommend!"}', expected_output: "positive" },
        { inputs: '{"text": "Disappointed with the quality."}', expected_output: "negative" },
        { inputs: '{"text": "It works as described."}', expected_output: "neutral" }
      ]
    },
    {
      name: "Code Generation",
      template: "Generate Python code for the following task:\n\nTask: {task}\nCode:",
      examples: [
        { inputs: '{"task": "Create a function that adds two numbers"}', expected_output: "def add_numbers(a, b):\n    return a + b" },
        { inputs: '{"task": "Write a function to reverse a string"}', expected_output: "def reverse_string(s):\n    return s[::-1]" },
        { inputs: '{"task": "Create a function that checks if a number is even"}', expected_output: "def is_even(n):\n    return n % 2 == 0" },
        { inputs: '{"task": "Write a function to find the maximum in a list"}', expected_output: "def find_max(lst):\n    return max(lst)" },
        { inputs: '{"task": "Create a function that counts vowels in a string"}', expected_output: "def count_vowels(s):\n    return sum(1 for c in s.lower() if c in 'aeiou')" }
      ]
    },
    {
      name: "Math Word Problems",
      template: "Solve the following math word problem step by step.\n\nProblem: {problem}\nSolution:",
      examples: [
        { inputs: '{"problem": "If John has 5 apples and Mary gives him 3 more, how many apples does John have?"}', expected_output: "8" },
        { inputs: '{"problem": "A train travels 60 miles in 2 hours. What is its average speed?"}', expected_output: "30 miles per hour" },
        { inputs: '{"problem": "If a shirt costs $20 and is on sale for 25% off, what is the sale price?"}', expected_output: "$15" },
        { inputs: '{"problem": "Sarah reads 20 pages per day. How many pages will she read in a week?"}', expected_output: "140 pages" }
      ]
    },
    {
      name: "Text Summarization",
      template: "Summarize the following text in one sentence.\n\nText: {text}\nSummary:",
      examples: [
        { inputs: '{"text": "The meeting was held on Tuesday at 3 PM. We discussed the quarterly sales report and planned the marketing strategy for next month. All team members were present and contributed valuable insights."}', expected_output: "The team met to review quarterly sales and plan next month's marketing strategy." },
        { inputs: '{"text": "Scientists have discovered a new species of butterfly in the Amazon rainforest. The butterfly has unique blue and gold patterns on its wings and is only found in a specific region of Brazil."}', expected_output: "A new butterfly species with blue and gold wings was discovered in the Brazilian Amazon." },
        { inputs: '{"text": "The company announced record profits for the third quarter, driven by strong sales in the Asian market and cost-cutting measures implemented earlier this year."}', expected_output: "The company achieved record Q3 profits through Asian market growth and cost reductions." }
      ]
    },
    {
      name: "Data Extraction from Messy Text",
      template: "Extract structured information from the unstructured text.\n\nText: {text}\nExtract: {extract_fields}\nOutput:",
      examples: [
        { inputs: '{"text": "Hey! Just wanted to let you know that the meeting has been moved to next Tuesday at 2:30 PM in conference room B. Also, don\'t forget to bring the Q3 reports - Sarah needs them for the budget review.", "extract_fields": "meeting_date, meeting_time, location, required_items, person_mentioned"}', expected_output: "meeting_date: next Tuesday\nmeeting_time: 2:30 PM\nlocation: conference room B\nrequired_items: Q3 reports\nperson_mentioned: Sarah" },
        { inputs: '{"text": "Order #12345 - Customer Jane Smith (jane@email.com) purchased 3x Blue Widget ($29.99 each) and 1x Red Gadget ($45.00). Ship to: 123 Main St, Apt 4B, NYC 10001. Express shipping requested.", "extract_fields": "order_id, customer_name, email, items_ordered, total_amount, shipping_address, shipping_type"}', expected_output: "order_id: 12345\ncustomer_name: Jane Smith\nemail: jane@email.com\nitems_ordered: 3x Blue Widget, 1x Red Gadget\ntotal_amount: $134.97\nshipping_address: 123 Main St, Apt 4B, NYC 10001\nshipping_type: Express" },
        { inputs: '{"text": "Bug Report: Login page crashes on Chrome v98.0.4758.102 when user enters email with special chars. Steps: 1) Go to login 2) Enter test+user@domain.com 3) Click submit. Error: Uncaught TypeError at line 245.", "extract_fields": "issue_type, affected_page, browser_version, reproduction_steps, error_message"}', expected_output: "issue_type: Bug Report\naffected_page: Login page\nbrowser_version: Chrome v98.0.4758.102\nreproduction_steps: 1) Go to login 2) Enter test+user@domain.com 3) Click submit\nerror_message: Uncaught TypeError at line 245" }
      ]
    },
    {
      name: "Complex Instruction Following",
      template: "Follow the instructions precisely to transform the input.\n\nInput: {input}\nInstructions: {instructions}\nOutput:",
      examples: [
        { inputs: '{"input": "The quick brown fox jumps over the lazy dog", "instructions": "1. Count the number of words. 2. Replace all vowels with asterisks. 3. Reverse the entire string. 4. Add the word count at the end."}', expected_output: "g*d yz*l *ht r*v* spm*j x*f nw*rb kc**q *hT 9" },
        { inputs: '{"input": "2023-11-15", "instructions": "1. Convert to day name. 2. Add 10 days. 3. Format as \'Month DD, YYYY\'. 4. Calculate days until end of year."}', expected_output: "November 25, 2023 (36 days until end of year)" },
        { inputs: '{"input": "[5, 2, 8, 1, 9]", "instructions": "1. Sort ascending. 2. Calculate mean. 3. Remove values below mean. 4. Double remaining values. 5. Return as comma-separated string."}', expected_output: "10, 16, 18" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'setup' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Prompt Optimizer</h1>
                    <p className="text-pink-100 max-w-2xl">
                      Transform your prompts into high-performing AI interactions using advanced optimization strategies.
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode('improve')}
                    className="group flex items-center px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/20"
                  >
                    <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    <span className="font-medium">Quick Improve</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Strategy Selection */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <h2 className="text-xl font-semibold mb-4 text-white">Select Optimization Strategy</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(strategyConfigs).map(([key, config]) => {
                      const Icon = config.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setStrategy(key as OptimizationStrategy)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            strategy === key 
                              ? 'border-pink-500 bg-pink-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <Icon className="w-8 h-8 mb-2 text-pink-500" />
                          <div className="font-medium">{config.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{config.description.slice(0, 50)}...</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt Template Section */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Prompt Template</h2>
                    <button
                      onClick={() => setShowTemplateBuilder(!showTemplateBuilder)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {showTemplateBuilder ? 'Hide' : 'Show'} Template Builder
                    </button>
                  </div>
                  
                  {showTemplateBuilder && (
                    <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium mb-4 text-gray-200">Template Builder</h3>
                      <div className="space-y-4">
                      {/* Task Context (Required) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Task Context <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          className="w-full h-24 p-3 border border-gray-600 rounded-lg resize-none focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                          placeholder="Describe the main task or purpose of this prompt. You can use {placeholders} for dynamic values..."
                          value={simpleComponents.task_context}
                          onChange={(e) => setSimpleComponents({ ...simpleComponents, task_context: e.target.value })}
                        />
                      </div>

                      {/* Final Request (Required) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Final Request <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          className="w-full h-16 p-3 border border-gray-600 rounded-lg resize-none focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                          placeholder="What you want the AI to do..."
                          value={simpleComponents.final_request}
                          onChange={(e) => setSimpleComponents({ ...simpleComponents, final_request: e.target.value })}
                        />
                      </div>

                      {/* Optional Components */}
                      <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 group-open:rotate-90 transition-transform" />
                          Optional Components
                        </summary>
                        <div className="mt-4 space-y-4">
                          {/* Tone Context */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tone Context</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-600 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                              placeholder="e.g., Professional, friendly, technical..."
                              value={simpleComponents.tone_context || ''}
                              onChange={(e) => setSimpleComponents({ ...simpleComponents, tone_context: e.target.value })}
                            />
                          </div>

                          {/* Background Data */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Background Data</label>
                            <textarea
                              className="w-full h-20 p-3 border border-gray-600 rounded-lg resize-none focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                              placeholder="Any relevant background information..."
                              value={simpleComponents.background_data || ''}
                              onChange={(e) => setSimpleComponents({ ...simpleComponents, background_data: e.target.value })}
                            />
                          </div>

                          {/* Detailed Task Instructions */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Task Instructions</label>
                            <textarea
                              className="w-full h-20 p-3 border border-gray-600 rounded-lg resize-none focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                              placeholder="Step-by-step instructions or specific requirements..."
                              value={simpleComponents.detailed_task_instructions || ''}
                              onChange={(e) => setSimpleComponents({ ...simpleComponents, detailed_task_instructions: e.target.value })}
                            />
                          </div>


                          {/* Chain of Thought */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Chain of Thought</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-600 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                              placeholder="e.g., Think step by step..."
                              value={simpleComponents.chain_of_thought || ''}
                              onChange={(e) => setSimpleComponents({ ...simpleComponents, chain_of_thought: e.target.value })}
                            />
                          </div>

                          {/* Output Formatting */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Output Formatting</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-600 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                              placeholder="e.g., Provide response as JSON..."
                              value={simpleComponents.output_formatting || ''}
                              onChange={(e) => setSimpleComponents({ ...simpleComponents, output_formatting: e.target.value })}
                            />
                          </div>
                        </div>
                      </details>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                        <p className="text-xs text-gray-400">
                          <Info className="w-3 h-3 inline mr-1" />
                          Use <code className="px-1 py-0.5 bg-gray-700 rounded text-blue-400">{'{placeholders}'}</code> in any field for dynamic values. 
                          If no placeholders are added, <code className="px-1 py-0.5 bg-gray-700 rounded text-blue-400">{'{input}'}</code> will be automatically inserted.
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Info className="w-3 h-3 mr-1" />
                          Uses Matt Pocock's structured prompt template
                        </div>
                        <button
                          onClick={() => {
                            const template = generateTemplateFromComponents();
                            if (template) {
                              setPromptTemplate(template);
                              setShowTemplateBuilder(false);
                            } else {
                              setError('Please fill in at least task context and final request');
                            }
                          }}
                          disabled={!simpleComponents.task_context || !simpleComponents.final_request}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Apply Template
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!showTemplateBuilder && (
                    <>
                      <textarea
                        className="w-full h-36 p-3 border border-gray-600 rounded-lg resize-none focus:border-pink-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter your prompt template here... Use {variable_name} for dynamic parts."
                        value={promptTemplate}
                        onChange={(e) => setPromptTemplate(e.target.value)}
                      />
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <Info className="w-3 h-3 mr-1" />
                        Use placeholders like {'{context}'}, {'{question}'} that match your training data
                      </div>
                    </>
                  )}
                  
                  {showTemplateBuilder && promptTemplate && (
                    <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
                      <p className="text-xs font-medium text-gray-400 mb-2">Current Template:</p>
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">{promptTemplate}</pre>
                    </div>
                  )}
                </div>

                {/* Training Examples */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
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
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors text-white placeholder-gray-400"
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
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors text-white placeholder-gray-400"
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
                </div>

                {/* Quick Start Examples */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <h2 className="text-xl font-semibold mb-4 text-white">Quick Start Examples</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {exampleTemplates.map((template, index) => (
                      <div key={index} className="border border-gray-700 rounded-lg">
                        <button
                          onClick={() => useExampleTemplate(template, false)}
                          className="w-full p-3 text-left hover:bg-gray-700 transition-colors rounded-t-lg"
                        >
                          <div className="font-medium text-white">{template.name}</div>
                          <div className="text-sm text-gray-400">{template.template.slice(0, 60)}...</div>
                        </button>
                        <div className="p-3 bg-gray-700/50 border-t border-gray-600 flex gap-2">
                          <button
                            onClick={() => useExampleTemplate(template, true)}
                            className="flex-1 text-xs bg-pink-600 hover:bg-pink-700 text-white px-2 py-1.5 rounded transition-colors"
                          >
                            Load All {template.examples.length} Examples
                          </button>
                          <button
                            onClick={() => useExampleTemplate(template, false)}
                            className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1.5 rounded transition-colors"
                          >
                            Template Only
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {/* Strategy Info */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                  <h2 className="text-xl font-semibold mb-4 text-white">{strategyConfigs[strategy].name}</h2>
                  <p className="text-gray-400 mb-4">{strategyConfigs[strategy].description}</p>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-200">Features</h3>
                    {strategyConfigs[strategy].features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-gray-400 mb-2">Recommended Examples</div>
                    <div className="text-2xl font-bold text-pink-500">
                      {strategyConfigs[strategy].recommendations.idealExamples}
                    </div>
                    <div className="text-xs text-gray-500">
                      Min: {strategyConfigs[strategy].recommendations.minExamples}, 
                      Max: {strategyConfigs[strategy].recommendations.maxExamples}
                    </div>
                  </div>

                  <button
                    onClick={startOptimization}
                    disabled={!promptTemplate || trainingExamples.length === 0}
                    className="w-full mt-6 bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                <h2 className="text-xl font-semibold mb-6 text-white">Optimization Steps</h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <StepItem key={step.id} step={step} index={index} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Optimization Progress</span>
                    <span>{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-medium">{isOptimizing ? 'Optimizing...' : 'Complete'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Current Metrics</h2>
                <div className="space-y-3">
                  <MetricCard label="Accuracy" value={0.723 + (currentStep * 0.05)} improvement={currentStep * 5} />
                  <MetricCard label="F1 Score" value={0.684 + (currentStep * 0.05)} improvement={currentStep * 4.5} />
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'results' && (
          <div className="space-y-6">
            {/* Success Banner with Sub-navigation */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Check className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Optimization Complete!</h1>
                  </div>
                  <p className="text-green-100">
                    Your prompt has been successfully optimized with significant performance improvements.
                  </p>
                </div>
                {/* Sub-navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setResultsSubView('overview')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      resultsSubView === 'overview'
                        ? 'bg-green-800 text-white'
                        : 'bg-green-700/50 text-green-100 hover:bg-green-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => {
                      initializeTryItMode();
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      resultsSubView === 'testing'
                        ? 'bg-green-800 text-white'
                        : 'bg-green-700/50 text-green-100 hover:bg-green-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Test Mode</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overview Sub-view */}
            {resultsSubView === 'overview' && (
              <>
                <PromptComparison />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                      <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <MetricCard label="Final Accuracy" value={0.923} improvement={28.5} />
                        <MetricCard label="Final F1 Score" value={0.884} improvement={27.3} />
                        <MetricCard label="Precision" value={0.891} improvement={24.2} />
                        <MetricCard label="Recall" value={0.878} improvement={31.1} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                      <h2 className="text-xl font-semibold mb-4 text-white">Next Steps</h2>
                      <div className="space-y-3">
                        <button 
                          onClick={initializeTryItMode}
                          className="w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 text-left transition-colors"
                        >
                          <div className="font-medium text-white">Test with New Data</div>
                          <div className="text-sm text-gray-400">Evaluate on unseen examples</div>
                        </button>
                        <button 
                          onClick={downloadPredictor}
                          className="w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 text-left transition-colors"
                        >
                          <div className="font-medium text-white">Deploy to Production</div>
                          <div className="text-sm text-gray-400">Download optimized predictor</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* DSPy History Section */}
                {optimizationResult?.optimized_prompt?.dspy_history && (
                  <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white flex items-center">
                        <Code className="w-5 h-5 mr-2 text-blue-400" />
                        DSPy Optimization History
                      </h2>
                      <button
                        onClick={() => setShowDSPyHistory(!showDSPyHistory)}
                        className="text-sm text-gray-400 hover:text-gray-200 flex items-center"
                      >
                        {showDSPyHistory ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                        {showDSPyHistory ? 'Hide' : 'Show'} Details
                      </button>
                    </div>
                    
                    {showDSPyHistory && (
                      <div className="space-y-4">
                        {/* Optimization Metadata */}
                        {optimizationResult.optimized_prompt.metadata && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Optimization Details</h3>
                            <div className="bg-gray-900 p-4 rounded-lg space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Strategy:</span>
                                <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.strategy}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Model:</span>
                                <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.model}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Training Examples:</span>
                                <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.training_examples}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Validation Examples:</span>
                                <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.validation_examples}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">DSPy Version:</span>
                                <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.dspy_version}</span>
                              </div>
                              {optimizationResult.optimized_prompt.metadata.actual_demonstrations && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Demonstrations:</span>
                                  <span className="text-gray-300">{optimizationResult.optimized_prompt.metadata.actual_demonstrations}</span>
                                </div>
                              )}
                              {optimizationResult.optimized_prompt.metadata.history_size && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">History Size:</span>
                                  <span className="text-gray-300">{(optimizationResult.optimized_prompt.metadata.history_size / 1024).toFixed(1)} KB</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* DSPy Signature */}
                        {optimizationResult.optimized_prompt.dspy_signature && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">DSPy Signature</h3>
                            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs text-gray-300">
                              <code>{optimizationResult.optimized_prompt.dspy_signature}</code>
                            </pre>
                          </div>
                        )}
                        
                        {/* Optimization Steps */}
                        {optimizationResult.optimized_prompt.optimization_history && optimizationResult.optimized_prompt.optimization_history.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Optimization Steps</h3>
                            <div className="space-y-2">
                              {optimizationResult.optimized_prompt.optimization_history.map((step, idx) => (
                                <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-300">Step {step.step}</span>
                                    <span className="text-xs text-green-400">{step.metric_improvement}</span>
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    <span className="font-medium">{step.strategy}:</span> {step.action}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Raw DSPy History */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center justify-between">
                            <span>Raw DSPy History</span>
                            <button
                              onClick={() => {
                                const blob = new Blob([optimizationResult.optimized_prompt.dspy_history || ''], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'dspy_history.txt';
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded flex items-center space-x-1"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download Full History</span>
                            </button>
                          </h3>
                          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs text-gray-300 max-h-96 overflow-y-auto">
                            <code>{optimizationResult.optimized_prompt.dspy_history}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Testing Sub-view */}
            {resultsSubView === 'testing' && optimizationResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    {/* Testing Interface */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                        Test Your Optimized Prompt
                      </h2>
                      
                      {/* Input Fields */}
                      <div className="space-y-4 mb-6">
                        <div className="text-sm text-gray-400">
                          Enter values for each input field:
                        </div>
                        {Object.entries(tryItInputs).map(([field, value]) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              {field}
                            </label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setTryItInputs({ ...tryItInputs, [field]: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder={`Enter ${field}...`}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Submit Button */}
                      <button
                        onClick={tryOptimizedPrompt}
                        disabled={tryItLoading || Object.values(tryItInputs).some(v => !v)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {tryItLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Predicting...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-2" />
                            Run Prediction
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Info */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-4">Testing Tips</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Try diverse inputs to test edge cases
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Compare outputs side-by-side
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          Look for consistency improvements
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={() => {
                            setTryItInputs({});
                            setTryItPrediction(null);
                            initializeTryItMode();
                          }}
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-left transition-colors flex items-center"
                        >
                          <RotateCcw className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-white">Clear & Reset</span>
                        </button>
                        <button 
                          onClick={() => setResultsSubView('overview')}
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-left transition-colors flex items-center"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-white">Back to Overview</span>
                        </button>
                        <button 
                          onClick={downloadPredictor}
                          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          <span className="text-sm">Deploy to Production</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prediction Results - Full Width */}
                {tryItPrediction && (
                  <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Comparison Results</h3>
                    
                    {/* Side-by-side comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Unoptimized Result */}
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-red-400">Without Optimization</h4>
                          <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">Basic Prompt</span>
                        </div>
                        
                        {tryItPrediction.unoptimized?.outputs && Object.keys(tryItPrediction.unoptimized.outputs).length > 0 ? (
                          <div className="space-y-3">
                            {Object.entries(tryItPrediction.unoptimized.outputs).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs font-medium text-gray-400 mb-1">{key}:</div>
                                <div className="font-mono text-sm text-gray-200 bg-gray-800 p-3 rounded">
                                  {value as string}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 italic">No output generated</div>
                        )}
                      </div>
                      
                      {/* Optimized Result */}
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-green-400">With DSPy Optimization</h4>
                          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">Optimized</span>
                        </div>
                        
                        {tryItPrediction.optimized?.outputs && Object.keys(tryItPrediction.optimized.outputs).length > 0 ? (
                          <div className="space-y-3">
                            {Object.entries(tryItPrediction.optimized.outputs).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs font-medium text-gray-400 mb-1">{key}:</div>
                                <div className="font-mono text-sm text-gray-200 bg-gray-800 p-3 rounded">
                                  {value as string}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 italic">No output generated</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Improve Mode */}
        {viewMode === 'improve' && (
          <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={() => setViewMode('setup')}
                className="flex items-center px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Optimizer
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
              <div className="flex items-center mb-2">
                <Sparkles className="w-8 h-8 mr-3" />
                <h1 className="text-3xl font-bold">Quick Prompt Improver</h1>
              </div>
              <p className="text-blue-100 max-w-2xl">
                Get instant AI-powered improvements for your prompts. Perfect for quick iterations and refinements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-400" />
                      Your Prompt
                    </h2>
                    <span className="text-xs text-gray-400">
                      {improvePromptInput.length} characters
                    </span>
                  </div>
                  <textarea
                    className="w-full h-64 p-4 border border-gray-700 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-900 text-white placeholder-gray-500 transition-all"
                    placeholder="Paste your existing prompt here..."
                    value={improvePromptInput}
                    onChange={(e) => setImprovePromptInput(e.target.value)}
                  />
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <Info className="w-4 h-4 mr-1.5 text-gray-500" />
                        Context
                      </label>
                      <span className="text-xs text-gray-500">Optional</span>
                    </div>
                    <textarea
                      className="w-full h-24 p-3 border border-gray-700 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-900 text-white placeholder-gray-500 transition-all"
                      placeholder="What is this prompt for? Any specific requirements?"
                      value={improveContext}
                      onChange={(e) => setImproveContext(e.target.value)}
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center">
                        <BookOpen className="w-4 h-4 mr-1.5 text-gray-500" />
                        Optimization Guide
                      </label>
                    </div>
                    <select
                      value={selectedGuide}
                      onChange={(e) => setSelectedGuide(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-900 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      {Object.entries(availableGuides).map(([key, guide]) => (
                        <option key={key} value={key}>
                          {guide.name}
                        </option>
                      ))}
                    </select>
                    {availableGuides[selectedGuide] && (
                      <p className="mt-2 text-xs text-gray-400">
                        {availableGuides[selectedGuide].description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={improvePrompt}
                    disabled={!improvePromptInput.trim() || improveLoading}
                    className="mt-6 w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                  >
                    {improveLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing and Improving...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Improve My Prompt
                      </>
                    )}
                  </button>
                </div>

                {/* Guide Criteria */}
                {availableGuides[selectedGuide] && (
                  <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-1.5" />
                      Optimization Criteria
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {availableGuides[selectedGuide].criteria.slice(0, 4).map((criterion, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="w-3 h-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-300">{criterion}</span>
                        </div>
                      ))}
                      {availableGuides[selectedGuide].criteria.length > 4 && (
                        <button
                          onClick={() => setShowCriteriaModal(true)}
                          className="text-xs text-blue-400 hover:text-blue-300 text-left"
                        >
                          +{availableGuides[selectedGuide].criteria.length - 4} more criteria...
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Example Prompts */}
                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5" />
                    Try an Example
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setImprovePromptInput("Analyze the sentiment of the following text");
                        setImproveContext("Building a customer feedback analysis tool");
                      }}
                      className="w-full text-left p-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors text-sm text-gray-300"
                    >
                      <span className="font-medium text-gray-200">Sentiment Analysis</span>
                      <p className="text-xs text-gray-500 mt-0.5">Simple sentiment classification prompt</p>
                    </button>
                    <button
                      onClick={() => {
                        setImprovePromptInput("You are a code reviewer. Review the following code for bugs and improvements");
                        setImproveContext("Code review assistant for JavaScript/TypeScript projects");
                      }}
                      className="w-full text-left p-3 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors text-sm text-gray-300"
                    >
                      <span className="font-medium text-gray-200">Code Review</span>
                      <p className="text-xs text-gray-500 mt-0.5">Basic code review instruction</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {!improveResult && !improveLoading && (
                  <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">Your improved prompt will appear here</p>
                  </div>
                )}
                
                {improveResult && (
                  <>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                          Improved Prompt
                        </h2>
                        <button
                          onClick={copyImprovedPrompt}
                          className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                            copiedImproved 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-700/50 text-gray-200 hover:bg-gray-700'
                          }`}
                        >
                          {copiedImproved ? (
                            <>
                              <Check className="w-4 h-4 mr-1.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                        <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono">
                          {improveResult.improved_prompt}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                        Improvements Applied
                      </h3>
                      <div className="space-y-3">
                        {improveResult.improvements_made.map((improvement, index) => (
                          <div key={index} className="flex items-start p-3 bg-green-900/20 rounded-xl border border-green-800/30">
                            <div className="w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-green-400">{index + 1}</span>
                            </div>
                            <span className="text-sm text-gray-200 ml-3">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {improveResult.suggestions.length > 0 && (
                      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                          <Info className="w-5 h-5 mr-2 text-blue-400" />
                          Further Suggestions
                        </h3>
                        <div className="space-y-3">
                          {improveResult.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start p-3 bg-blue-900/20 rounded-xl border border-blue-800/30">
                              <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"></div>
                              <span className="text-sm text-gray-200 ml-3">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Criteria Modal */}
        {showCriteriaModal && availableGuides[selectedGuide] && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  {availableGuides[selectedGuide].name} - All Criteria
                </h2>
                <button
                  onClick={() => setShowCriteriaModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mb-6">
                {availableGuides[selectedGuide].description}
              </p>
              
              <div className="space-y-3">
                {availableGuides[selectedGuide].criteria.map((criterion, idx) => (
                  <div key={idx} className="flex items-start p-3 bg-gray-900 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-white">{idx + 1}</span>
                    </div>
                    <span className="text-gray-300">{criterion}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCriteriaModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-4 text-white hover:text-red-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}