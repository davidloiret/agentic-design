import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, Loader2, BarChart3, Code, Sparkles, Brain, Target, FileText, TestTube, Rocket } from 'lucide-react';

type OptimizationStrategy = 'bootstrap_fewshot' | 'mipro' | 'copro' | 'bootstrap_finetune';

interface StepperStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
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

const PromptOptimizerStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [strategy, setStrategy] = useState<OptimizationStrategy>('bootstrap_fewshot');
  const [isOptimizing, setIsOptimizing] = useState(false);

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

  const MetricCard: React.FC<{ label: string; value: number; improvement?: number }> = ({ label, value, improvement }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{(value * 100).toFixed(1)}%</div>
      {improvement && (
        <div className="text-sm text-green-600 mt-1">
          +{improvement.toFixed(1)}% improvement
        </div>
      )}
    </div>
  );

  const StepItem: React.FC<{ step: StepperStep; index: number }> = ({ step, index }) => {
    const Icon: React.ElementType = step.icon || CheckCircle;
    const isActive = index === currentStep;
    const isCompleted = step.status === 'completed';
    const isPending = step.status === 'pending';

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
              React.createElement(Icon, { className: `w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}` })
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
            isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-900'
          }`}>
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          
          {isActive && step.id === 'evaluation' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-2">Live Metrics</div>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label="Accuracy" value={0.823} improvement={18.5} />
                <MetricCard label="F1 Score" value={0.791} improvement={22.3} />
              </div>
            </div>
          )}
          
          {step.status === 'completed' && step.results && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-800">
                ✓ {step.results.message}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Optimization Progress</h1>
        <p className="text-gray-600">Watch as DSPy optimizes your prompt using {strategy.replace('_', ' ')} strategy</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Optimization Strategy
        </label>
        <select 
          value={strategy} 
          onChange={(e) => setStrategy(e.target.value as OptimizationStrategy)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="bootstrap_fewshot">Bootstrap Few-Shot</option>
          <option value="mipro">MIPRO (Multi-Prompt)</option>
          <option value="copro">COPRO (Context-Prompt)</option>
          <option value="bootstrap_finetune">Bootstrap Fine-tune</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Optimization Steps</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <StepItem key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
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
                <span className="text-gray-600">Elapsed Time:</span>
                <span className="font-medium">2m 34s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Remaining:</span>
                <span className="font-medium">1m 12s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Final Results</h2>
            <div className="space-y-3">
              <MetricCard label="Accuracy" value={0.923} improvement={28.5} />
              <MetricCard label="Precision" value={0.891} improvement={24.2} />
              <MetricCard label="Recall" value={0.878} improvement={31.1} />
              <MetricCard label="F1 Score" value={0.884} improvement={27.3} />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Rocket className="w-5 h-5" />
            <span>View Optimized Prompt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptOptimizerStepper;