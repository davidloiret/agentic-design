import { Technique } from './types';

export const interpretabilityTechniques: Technique[] = [
  {
    id: 'latent-space-visualization',
    name: 'Latent Space Visualization',
    abbr: 'LSV',
    icon: '🔬',
    color: 'from-violet-500 to-purple-600',
    category: 'interpretability',
    description: 'Visualize and interpret AI reasoning processes in continuous latent spaces',
    features: [
      'High-dimensional space mapping',
      'Reasoning trajectory visualization',
      'Thought evolution tracking',
      'Semantic clustering display',
      'Interactive exploration tools',
      'Multi-modal latent analysis'
    ],
    useCases: ['research-analysis', 'ai-debugging', 'model-understanding', 'reasoning-audit'],
    complexity: 'high',
    example: 'Latent Reasoning Visualization:\n\nProblem: "Plan a sustainable city"\n\nVisualization Output:\n• 3D latent space map showing reasoning clusters\n• Energy systems cluster (green)\n• Transportation cluster (blue)\n• Housing cluster (orange)\n• Connection strength indicators\n• Reasoning path: Energy → Transport → Integration\n\nInsights Revealed:\n• Model prioritizes energy before transport\n• Strong coupling between housing and energy\n• Weak consideration of economic factors\n• Bias toward technical over social solutions\n\nUser Benefits:\n• Understand AI reasoning patterns\n• Identify potential biases\n• Debug unexpected outputs\n• Validate reasoning quality'
  },
  {
    id: 'contrastive-explanations',
    name: 'Contrastive Explanations',
    abbr: 'CE',
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-600',
    category: 'interpretability',
    description: 'Explain AI decisions by showing what would change the outcome',
    features: [
      'Counterfactual analysis',
      'Decision boundary exploration',
      'Alternative pathway generation',
      'Minimal change identification',
      'Feature importance ranking',
      'Causal relationship mapping'
    ],
    useCases: ['decision-support', 'bias-detection', 'model-validation', 'user-trust'],
    complexity: 'medium',
    example: 'Loan Approval Decision:\n\nOriginal Decision: "Loan Denied"\nReason: Credit score too low (580)\n\nContrastive Explanation:\n"Your loan was denied, but it would be approved if:\n• Credit score increased to 620 (+40 points)\n• OR annual income increased to $75K (+$15K)\n• OR down payment increased to 25% (+10%)\n\nSmallest Change Needed:\n• Increase credit score by 40 points\n• This would change decision from DENY to APPROVE\n\nOther factors that didn\'t matter:\n• Employment history (sufficient)\n• Debt-to-income ratio (acceptable)\n\nActionable Steps:\n1. Pay down credit card balances\n2. Check credit report for errors\n3. Consider authorized user status"'
  },
  {
    id: 'causal-reasoning-transparency',
    name: 'Causal Reasoning Transparency',
    abbr: 'CRT',
    icon: '🔗',
    color: 'from-emerald-500 to-green-600',
    category: 'interpretability',
    description: 'Make causal reasoning chains explicit and understandable',
    features: [
      'Causal chain visualization',
      'Cause-effect relationship mapping',
      'Confounding factor identification',
      'Intervention effect prediction',
      'Causal strength quantification',
      'Assumption transparency'
    ],
    useCases: ['scientific-reasoning', 'policy-analysis', 'medical-diagnosis', 'business-strategy'],
    complexity: 'high',
    example: 'Medical Diagnosis Reasoning:\n\nSymptom: "Patient has chest pain and shortness of breath"\n\nCausal Reasoning Chain:\n1. Chest Pain + Shortness of Breath\n   ↓ [Causal Link: 0.85 strength]\n2. Possible Cardiac Event\n   ↓ [Mediating Factors: Age (60), Male, Smoker]\n3. Risk Assessment: HIGH\n   ↓ [Intervention Effect: -70% risk if treated within 1 hour]\n4. Recommendation: Immediate Emergency Care\n\nCausal Assumptions Made:\n• Age increases cardiac risk (literature-based)\n• Gender affects risk profile (demographic data)\n• Time-to-treatment affects outcomes (clinical studies)\n\nConfounding Factors Considered:\n• Exercise-induced symptoms (ruled out: at rest)\n• Anxiety symptoms (possible, but cardiac priority)\n• Medication side effects (none reported)\n\nTransparency: All causal links have evidence sources'
  },
  {
    id: 'attention-flow-analysis',
    name: 'Attention Flow Analysis',
    abbr: 'AFA',
    icon: '👁️',
    color: 'from-orange-500 to-red-600',
    category: 'interpretability',
    description: 'Track and visualize where AI systems focus their attention during reasoning',
    features: [
      'Attention pattern visualization',
      'Focus intensity mapping',
      'Temporal attention tracking',
      'Multi-head attention analysis',
      'Cross-modal attention flows',
      'Attention anomaly detection'
    ],
    useCases: ['model-debugging', 'bias-detection', 'reasoning-validation', 'performance-optimization'],
    complexity: 'medium',
    example: 'Document Analysis Attention:\n\nTask: "Summarize this research paper"\n\nAttention Flow Visualization:\n• Title: ████████ (90% attention)\n• Abstract: ██████ (75% attention)\n• Introduction: ████ (45% attention)\n• Methods: ██ (25% attention)\n• Results: ██████ (70% attention)\n• Conclusion: ████████ (85% attention)\n• References: █ (10% attention)\n\nAttention Patterns Revealed:\n• Strong focus on high-level content\n• Skips detailed methodology\n• Prioritizes conclusions over data\n• May miss important nuances in methods\n\nInsights for Users:\n"The AI focused heavily on conclusions but gave limited attention to methodology. For technical accuracy, consider asking specifically about methods."\n\nModel Improvement:\n• Rebalance attention weights for technical documents\n• Add methodology-specific attention heads'
  },
  {
    id: 'uncertainty-quantification',
    name: 'Uncertainty Quantification',
    abbr: 'UQ',
    icon: '📊',
    color: 'from-purple-500 to-pink-600',
    category: 'interpretability',
    description: 'Quantify and communicate AI confidence and uncertainty in predictions',
    features: [
      'Confidence interval estimation',
      'Epistemic vs aleatoric uncertainty',
      'Prediction interval visualization',
      'Calibrated probability outputs',
      'Uncertainty propagation tracking',
      'Risk-adjusted recommendations'
    ],
    useCases: ['high-stakes-decisions', 'risk-management', 'scientific-modeling', 'financial-predictions'],
    complexity: 'high',
    example: 'Stock Price Prediction:\n\nPrediction: "AAPL will be $185 next week"\n\nUncertainty Breakdown:\n• Point Prediction: $185.00\n• Confidence Interval: $175.50 - $194.50 (90%)\n• Prediction Interval: $170.00 - $200.00 (95%)\n\nUncertainty Sources:\n• Market Volatility: ±$8.50 (aleatoric)\n• Model Uncertainty: ±$6.25 (epistemic)\n• Data Quality: ±$3.75 (epistemic)\n• External Events: ±$15.00 (aleatoric)\n\nRisk Assessment:\n• High Confidence Scenarios (60%): Range $180-$190\n• Medium Confidence Scenarios (30%): Range $175-$195\n• Low Confidence Scenarios (10%): Range $170-$200\n\nRecommendation:\n"Moderate confidence in upward trend, but significant uncertainty due to earnings announcement. Consider position sizing accordingly."\n\nUser Benefits:\n• Understand prediction reliability\n• Make risk-appropriate decisions\n• Identify when to seek additional data'
  }
]; 