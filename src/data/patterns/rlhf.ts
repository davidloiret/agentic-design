import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const rlhfPattern: PatternScenario = {
  id: 'rlhf',
  title: 'Reinforcement Learning from Human Feedback',
  initialNodes: [
    {
      id: 'user-prompt',
      position: { x: 400, y: 50 },
      data: { label: '💬 User Prompt\n"Generate helpful and harmless response"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Core Components
    {
      id: 'base-model',
      position: { x: 375, y: 150 },
      data: { label: '🤖 Base Model\nPre-trained LLM' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Response Generation
    {
      id: 'response-generator',
      position: { x: 100, y: 250 },
      data: { label: '📝 Response Generator\nMultiple completions\nDiverse outputs' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'response-sampler',
      position: { x: 300, y: 250 },
      data: { label: '🎲 Response Sampler\nTemperature sampling\nTop-k/Top-p' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'candidate-pool',
      position: { x: 500, y: 250 },
      data: { label: '📚 Candidate Pool\nResponse variants\nQuality spectrum' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'safety-filter',
      position: { x: 700, y: 250 },
      data: { label: '🛡️ Safety Filter\nHarmful content check\nCompliance validation' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Human Feedback Collection
    {
      id: 'human-annotator',
      position: { x: 50, y: 380 },
      data: { label: '👤 Human Annotator\nRating & ranking\nPreference labeling' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'feedback-interface',
      position: { x: 220, y: 380 },
      data: { label: '🖱️ Feedback Interface\nComparison UI\nRating tools' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'preference-data',
      position: { x: 390, y: 380 },
      data: { label: '📊 Preference Data\nPairwise comparisons\nQuality scores' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'feedback-aggregator',
      position: { x: 560, y: 380 },
      data: { label: '🔄 Feedback Aggregator\nConsensus building\nNoise reduction' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'dataset-builder',
      position: { x: 730, y: 380 },
      data: { label: '💾 Dataset Builder\nTraining corpus\nValidation split' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Reward Model Training
    {
      id: 'reward-model',
      position: { x: 100, y: 520 },
      data: { label: '🎯 Reward Model\nPreference predictor\nScoring function' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'loss-function',
      position: { x: 280, y: 520 },
      data: { label: '📉 Loss Function\nBradley-Terry\nCross-entropy' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'model-trainer',
      position: { x: 460, y: 520 },
      data: { label: '🏋️ Model Trainer\nGradient descent\nBatch optimization' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'validation-metrics',
      position: { x: 640, y: 520 },
      data: { label: '📈 Validation Metrics\nAccuracy tracking\nCalibration check' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Policy Optimization
    {
      id: 'policy-network',
      position: { x: 50, y: 640 },
      data: { label: '🧠 Policy Network\nFine-tuned model\nAction selection' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'ppo-optimizer',
      position: { x: 250, y: 640 },
      data: { label: '⚡ PPO Optimizer\nProximal policy\nClipped objective' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'kl-divergence',
      position: { x: 450, y: 640 },
      data: { label: '📏 KL Divergence\nRegularization\nPrevent drift' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'advantage-estimator',
      position: { x: 650, y: 640 },
      data: { label: '💡 Advantage Estimator\nValue function\nReward prediction' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Iterative Improvement
    {
      id: 'online-learning',
      position: { x: 100, y: 760 },
      data: { label: '🔄 Online Learning\nContinuous updates\nAdaptive training' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'exploration-strategy',
      position: { x: 280, y: 760 },
      data: { label: '🔍 Exploration\nDiversity bonus\nCuriosity driven' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'rollout-buffer',
      position: { x: 460, y: 760 },
      data: { label: '📦 Rollout Buffer\nExperience replay\nBatch collection' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'performance-monitor',
      position: { x: 640, y: 760 },
      data: { label: '📊 Performance Monitor\nQuality metrics\nAlignment tracking' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Quality Assurance
    {
      id: 'helpfulness-scorer',
      position: { x: 150, y: 880 },
      data: { label: '✅ Helpfulness\nUtility assessment\nTask completion' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'harmlessness-checker',
      position: { x: 350, y: 880 },
      data: { label: '🛡️ Harmlessness\nSafety validation\nBias detection' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'honesty-evaluator',
      position: { x: 550, y: 880 },
      data: { label: '🎯 Honesty\nFactual accuracy\nUncertainty expression' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'aligned-response',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Aligned Response\nHelpful, harmless, and honest output' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Prompt to model
    {
      id: 'prompt-model',
      source: 'user-prompt',
      target: 'base-model',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Model to generation
    {
      id: 'model-generator',
      source: 'base-model',
      target: 'response-generator',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Generate',
    },
    {
      id: 'generator-sampler',
      source: 'response-generator',
      target: 'response-sampler',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'sampler-pool',
      source: 'response-sampler',
      target: 'candidate-pool',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'pool-safety',
      source: 'candidate-pool',
      target: 'safety-filter',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    // Feedback collection
    {
      id: 'safety-annotator',
      source: 'safety-filter',
      target: 'human-annotator',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'annotator-interface',
      source: 'human-annotator',
      target: 'feedback-interface',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'interface-preference',
      source: 'feedback-interface',
      target: 'preference-data',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'preference-aggregator',
      source: 'preference-data',
      target: 'feedback-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'aggregator-dataset',
      source: 'feedback-aggregator',
      target: 'dataset-builder',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Reward model training
    {
      id: 'dataset-reward',
      source: 'dataset-builder',
      target: 'reward-model',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'reward-loss',
      source: 'reward-model',
      target: 'loss-function',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'loss-trainer',
      source: 'loss-function',
      target: 'model-trainer',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'trainer-validation',
      source: 'model-trainer',
      target: 'validation-metrics',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Reward model feedback
    {
      id: 'validation-reward',
      source: 'validation-metrics',
      target: 'reward-model',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
      label: 'Update',
    },
    // Policy optimization
    {
      id: 'reward-policy',
      source: 'reward-model',
      target: 'policy-network',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'policy-ppo',
      source: 'policy-network',
      target: 'ppo-optimizer',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'ppo-kl',
      source: 'ppo-optimizer',
      target: 'kl-divergence',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'kl-advantage',
      source: 'kl-divergence',
      target: 'advantage-estimator',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Policy to base model
    {
      id: 'policy-model',
      source: 'policy-network',
      target: 'base-model',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
      label: 'Fine-tune',
    },
    // Iterative improvement
    {
      id: 'advantage-online',
      source: 'advantage-estimator',
      target: 'online-learning',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'online-exploration',
      source: 'online-learning',
      target: 'exploration-strategy',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'exploration-rollout',
      source: 'exploration-strategy',
      target: 'rollout-buffer',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'rollout-performance',
      source: 'rollout-buffer',
      target: 'performance-monitor',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Performance feedback
    {
      id: 'performance-policy',
      source: 'performance-monitor',
      target: 'policy-network',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
      label: 'Feedback',
    },
    // Quality assurance
    {
      id: 'online-helpfulness',
      source: 'online-learning',
      target: 'helpfulness-scorer',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'exploration-harmlessness',
      source: 'exploration-strategy',
      target: 'harmlessness-checker',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'rollout-honesty',
      source: 'rollout-buffer',
      target: 'honesty-evaluator',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Quality to output
    {
      id: 'helpfulness-output',
      source: 'helpfulness-scorer',
      target: 'aligned-response',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'harmlessness-output',
      source: 'harmlessness-checker',
      target: 'aligned-response',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'honesty-output',
      source: 'honesty-evaluator',
      target: 'aligned-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'User Prompt',
      description: 'User provides input requiring helpful response',
      activeNodes: ['user-prompt', 'base-model'],
      activeEdges: ['prompt-model'],
    },
    {
      title: 'Response Generation',
      description: 'Generating multiple response candidates',
      activeNodes: ['base-model', 'response-generator', 'response-sampler', 'candidate-pool', 'safety-filter'],
      activeEdges: ['model-generator', 'generator-sampler', 'sampler-pool', 'pool-safety'],
    },
    {
      title: 'Human Feedback Collection',
      description: 'Collecting preferences and ratings from human annotators',
      activeNodes: ['human-annotator', 'feedback-interface', 'preference-data', 'feedback-aggregator', 'dataset-builder'],
      activeEdges: ['safety-annotator', 'annotator-interface', 'interface-preference', 'preference-aggregator', 'aggregator-dataset'],
    },
    {
      title: 'Reward Model Training',
      description: 'Training reward model on human preferences',
      activeNodes: ['dataset-builder', 'reward-model', 'loss-function', 'model-trainer', 'validation-metrics'],
      activeEdges: ['dataset-reward', 'reward-loss', 'loss-trainer', 'trainer-validation'],
    },
    {
      title: 'Reward Model Update',
      description: 'Updating reward model based on validation',
      activeNodes: ['validation-metrics', 'reward-model'],
      activeEdges: ['validation-reward'],
    },
    {
      title: 'Policy Optimization',
      description: 'Optimizing policy using PPO and reward signal',
      activeNodes: ['reward-model', 'policy-network', 'ppo-optimizer', 'kl-divergence', 'advantage-estimator'],
      activeEdges: ['reward-policy', 'policy-ppo', 'ppo-kl', 'kl-advantage'],
    },
    {
      title: 'Model Fine-tuning',
      description: 'Fine-tuning base model with optimized policy',
      activeNodes: ['policy-network', 'base-model'],
      activeEdges: ['policy-model'],
    },
    {
      title: 'Online Learning',
      description: 'Continuous improvement through online learning',
      activeNodes: ['online-learning', 'exploration-strategy', 'rollout-buffer', 'performance-monitor'],
      activeEdges: ['advantage-online', 'online-exploration', 'exploration-rollout', 'rollout-performance'],
    },
    {
      title: 'Performance Feedback',
      description: 'Feeding performance metrics back to policy',
      activeNodes: ['performance-monitor', 'policy-network'],
      activeEdges: ['performance-policy'],
    },
    {
      title: 'Quality Assurance',
      description: 'Evaluating helpfulness, harmlessness, and honesty',
      activeNodes: ['helpfulness-scorer', 'harmlessness-checker', 'honesty-evaluator'],
      activeEdges: ['online-helpfulness', 'exploration-harmlessness', 'rollout-honesty'],
    },
    {
      title: 'Aligned Response',
      description: 'Producing aligned, helpful, harmless, and honest output',
      activeNodes: ['helpfulness-scorer', 'harmlessness-checker', 'honesty-evaluator', 'aligned-response'],
      activeEdges: ['helpfulness-output', 'harmlessness-output', 'honesty-output'],
    },
  ],
};