import React from 'react';
import { Info, Zap, Brain, Database, Layers, GitBranch, Settings, Book, Lightbulb } from 'lucide-react';

type OptimizationStrategy = 'bootstrap_fewshot' | 'mipro' | 'copro' | 'bootstrap_finetune';

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
      },
      {
        name: 'Instruction Length',
        key: 'instruction_length',
        type: 'select',
        default: 'medium',
        options: ['short', 'medium', 'long'],
        description: 'Target length for generated instructions'
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
      },
      {
        name: 'Use Embeddings',
        key: 'use_embeddings',
        type: 'boolean',
        default: true,
        description: 'Use semantic embeddings for context selection'
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
      },
      {
        name: 'Learning Rate',
        key: 'learning_rate',
        type: 'select',
        default: 'auto',
        options: ['auto', '1e-5', '5e-5', '1e-4'],
        description: 'Fine-tuning learning rate'
      }
    ]
  }
};

const StrategyAdaptiveUI: React.FC<{ strategy: OptimizationStrategy }> = ({ strategy }) => {
  const config = strategyConfigs[strategy];
  const Icon = config.icon;

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200'
  };

  const FeatureCard: React.FC<{ feature: string }> = ({ feature }) => (
    <div className="flex items-start space-x-2">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${colorClasses[config.primaryColor]} mt-0.5`}>
        <span className="text-xs">✓</span>
      </div>
      <span className="text-sm text-gray-700">{feature}</span>
    </div>
  );

  const InfoAlert: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`p-4 rounded-lg border ${colorClasses[config.primaryColor]} flex items-start space-x-3`}>
      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="text-sm">{children}</div>
    </div>
  );

  const AdvancedSetting: React.FC<{ setting: typeof config.advancedSettings[0] }> = ({ setting }) => (
    <div className="space-y-2">
      <label className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{setting.name}</span>
        <span className="text-xs text-gray-500">{setting.description}</span>
      </label>
      {setting.type === 'number' && (
        <input
          type="number"
          defaultValue={setting.default}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      )}
      {setting.type === 'select' && (
        <select
          defaultValue={setting.default}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {setting.options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
      {setting.type === 'boolean' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={setting.default}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Enable</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[config.primaryColor]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{config.name}</h2>
            <p className="text-gray-600 mt-1">{config.description}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      <InfoAlert>
        <div>
          <strong>Recommended Training Examples:</strong> {config.recommendations.idealExamples}
          <br />
          <span className="text-xs">
            (Min: {config.recommendations.minExamples}, Max: {config.recommendations.maxExamples})
          </span>
        </div>
      </InfoAlert>

      {strategy === 'mipro' && (
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-5 h-5 text-purple-700" />
            <span className="font-medium text-purple-900">MIPRO Tip</span>
          </div>
          <p className="text-sm text-purple-800">
            Include a clear task description to help MIPRO generate more relevant instruction variations.
            The more specific your task description, the better the optimization results.
          </p>
        </div>
      )}

      {strategy === 'copro' && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-green-700" />
            <span className="font-medium text-green-900">Context Pool Required</span>
          </div>
          <p className="text-sm text-green-800">
            COPRO requires a context pool - a collection of relevant documents or examples that can be
            dynamically selected during optimization. Upload your context documents below.
          </p>
        </div>
      )}

      {strategy === 'bootstrap_finetune' && (
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-orange-700" />
            <span className="font-medium text-orange-900">Fine-tuning Notice</span>
          </div>
          <p className="text-sm text-orange-800">
            This strategy will fine-tune a model, which may incur additional costs and take longer to complete.
            Ensure you have sufficient training examples (recommended: 200+) for best results.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <Settings className="w-4 h-4" />
            <span>Reset to defaults</span>
          </button>
        </div>
        <div className="space-y-4">
          {config.advancedSettings.map((setting, index) => (
            <AdvancedSetting key={index} setting={setting} />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Book className="w-5 h-5 text-gray-700" />
          <span className="font-medium text-gray-900">Learn More</span>
        </div>
        <p className="text-sm text-gray-700">
          Want to understand how {config.name} works? Check out our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 underline">
            documentation
          </a>{' '}
          for detailed explanations and best practices.
        </p>
      </div>
    </div>
  );
};

export default StrategyAdaptiveUI;