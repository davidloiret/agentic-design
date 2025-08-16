'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface SelfImprovingSystemsDetailsProps {
  selectedTechnique: any;
}

export const SelfImprovingSystemsDetails: React.FC<SelfImprovingSystemsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Baseline', detail: 'Establish initial system performance metrics' },
      { num: '2', action: 'Monitor', detail: 'Collect performance and error data continuously' },
      { num: '3', action: 'Analyze', detail: 'Identify improvement opportunities automatically' },
      { num: '4', action: 'Generate', detail: 'Create and evaluate potential improvements' },
      { num: '5', action: 'Deploy', detail: 'Implement validated improvements safely' }
    ],
    example: 'baseline_system → continuous_monitoring → improvement_generation → safe_deployment → enhanced_system'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement robust safety checks and rollback mechanisms', icon: '✅' },
    { type: 'do', text: 'Use gradual deployment and A/B testing for improvements', icon: '✅' },
    { type: 'do', text: 'Monitor for unintended side effects and emergent behaviors', icon: '✅' },
    { type: 'do', text: 'Maintain human oversight and intervention capabilities', icon: '✅' },
    { type: 'do', text: 'Log all improvement attempts and their outcomes', icon: '✅' },
    { type: 'do', text: 'Set clear boundaries and constraints on self-modification', icon: '✅' },
    { type: 'dont', text: 'Allow unconstrained self-modification without safety bounds', icon: '❌' },
    { type: 'dont', text: 'Deploy improvements without thorough testing', icon: '❌' },
    { type: 'dont', text: 'Ignore potential security vulnerabilities in self-modification', icon: '❌' },
    { type: 'dont', text: 'Remove human oversight and control mechanisms', icon: '❌' },
    { type: 'dont', text: 'Optimize for single metrics without considering trade-offs', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Long-running systems requiring continuous optimization',
      'Dynamic environments with changing requirements',
      'Systems with measurable performance metrics',
      'Sufficient safety infrastructure exists',
      'Human oversight and intervention possible'
    ],
    avoidWhen: [
      'Safety-critical systems without robust safeguards',
      'Short-term or one-off applications',
      'Systems with unclear or unmeasurable objectives',
      'Highly regulated environments requiring static behavior',
      'Insufficient monitoring and control infrastructure'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Improvement Rate', measure: 'Performance gains per iteration cycle' },
    { metric: 'Safety Violations', measure: 'Number of constraint breaches or failures' },
    { metric: 'Convergence Speed', measure: 'Time to reach optimal performance' },
    { metric: 'Stability Ratio', measure: 'Successful vs failed improvement attempts' },
    { metric: 'Resource Efficiency', measure: 'Computational cost of self-improvement' },
    { metric: 'Human Intervention', measure: 'Frequency of required manual corrections' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Code Generation: Automatically improve code quality and efficiency through iterative refinement',
    'Recommendation Systems: Continuously optimize algorithms based on user feedback and engagement',
    'Trading Algorithms: Adapt strategies based on market performance and changing conditions',
    'Content Creation: Iteratively improve writing, design, or creative outputs based on success metrics',
    'System Administration: Automatically optimize configurations and resource allocation',
    'Scientific Discovery: Improve hypothesis generation and experimental design through iterative learning'
  ];

  const references = [
    {
      title: 'Foundational Concepts',
      items: [
        { title: 'The Basic AI Drives (Omohundro, 2008)', url: 'https://www.fhi.ox.ac.uk/wp-content/uploads/Omohundro_AI_Drives.pdf' },
        { title: 'Artificial General Intelligence: Concept, State of the Art, and Future Prospects (Goertzel, 2014)', url: 'https://link.springer.com/article/10.1007/s10817-014-9287-0' },
        { title: 'Self-Improving Artificial Intelligence (Yampolskiy, 2015)', url: 'https://arxiv.org/abs/1505.06918' },
        { title: 'The Technological Singularity (Shanahan, 2015)', url: 'https://mitpress.mit.edu/books/technological-singularity' }
      ]
    },
    {
      title: 'Self-Modifying Code & Architectures',
      items: [
        { title: 'Self-Modifying Cartesian Genetic Programming (Miller, 2020)', url: 'https://arxiv.org/abs/2007.01549' },
        { title: 'Neural Architecture Search: A Survey (Elsken et al., 2019)', url: 'https://arxiv.org/abs/1808.05377' },
        { title: 'AutoML-Zero: Evolving Machine Learning Algorithms From Scratch (Real et al., 2020)', url: 'https://arxiv.org/abs/2003.03384' },
        { title: 'Self-Evolving Neural Networks (Stanley & Miikkulainen, 2002)', url: 'https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf' }
      ]
    },
    {
      title: 'Recursive Self-Improvement',
      items: [
        { title: 'Risks from Learned Optimization (Hubinger et al., 2019)', url: 'https://arxiv.org/abs/1906.01820' },
        { title: 'Self-Improving AI: An Analysis (Yudkowsky, 2007)', url: 'https://intelligence.org/files/SelfImprovingAI.pdf' },
        { title: 'The AI Control Problem (Russell, 2016)', url: 'https://arxiv.org/abs/1606.06565' },
        { title: 'Concrete Problems in AI Safety (Amodei et al., 2016)', url: 'https://arxiv.org/abs/1606.06565' }
      ]
    },
    {
      title: 'AutoML & Neural Architecture Search',
      items: [
        { title: 'Efficient Neural Architecture Search via Parameter Sharing (Pham et al., 2018)', url: 'https://arxiv.org/abs/1802.03268' },
        { title: 'DARTS: Differentiable Architecture Search (Liu et al., 2018)', url: 'https://arxiv.org/abs/1806.09055' },
        { title: 'Progressive DARTS: Bridging the Optimization Gap (Chen et al., 2019)', url: 'https://arxiv.org/abs/1912.10952' },
        { title: 'Once for All: Train One Network and Specialize it for Efficient Deployment (Cai et al., 2019)', url: 'https://arxiv.org/abs/1908.09791' }
      ]
    },
    {
      title: 'Recent Advances in LLM Self-Improvement',
      items: [
        { title: 'Self-Instruct: Aligning Language Model with Self Generated Instructions (Wang et al., 2022)', url: 'https://arxiv.org/abs/2212.10560' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Self-Taught Optimizer (STO): Recursively Self-Improving Code Generation (Zelikman et al., 2023)', url: 'https://arxiv.org/abs/2310.02304' },
        { title: 'Large Language Models Can Self-Improve (Huang et al., 2022)', url: 'https://arxiv.org/abs/2210.11610' }
      ]
    },
    {
      title: 'Safety & Alignment Research',
      items: [
        { title: 'AI Alignment: A Comprehensive Survey (Ji et al., 2023)', url: 'https://arxiv.org/abs/2310.19852' },
        { title: 'Scalable Oversight of AI Systems via LLM Judges (Bowman et al., 2022)', url: 'https://arxiv.org/abs/2211.03540' },
        { title: 'Red Teaming Language Models to Reduce Harms (Ganguli et al., 2022)', url: 'https://arxiv.org/abs/2209.07858' },
        { title: 'Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2204.05862' }
      ]
    },
    {
      title: 'Evolutionary & Genetic Programming',
      items: [
        { title: 'Genetic Programming: On the Programming of Computers by Means of Natural Selection (Koza, 1992)', url: 'https://mitpress.mit.edu/books/genetic-programming' },
        { title: 'NEAT: Evolving Neural Networks through Augmenting Topologies (Stanley & Miikkulainen, 2002)', url: 'https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf' },
        { title: 'Age-Fitness Pareto Optimization (Schmidt & Lipson, 2010)', url: 'https://www.science.org/doi/10.1126/science.1165649' },
        { title: 'Automated Algorithm Design via Evolutionary Computation (Pappa et al., 2014)', url: 'https://link.springer.com/chapter/10.1007/978-3-662-44303-3_1' }
      ]
    },
    {
      title: 'Meta-Learning for Self-Improvement',
      items: [
        { title: 'Learning to Learn by Gradient Descent by Gradient Descent (Andrychowicz et al., 2016)', url: 'https://arxiv.org/abs/1606.04474' },
        { title: 'Model-Agnostic Meta-Learning for Fast Adaptation (Finn et al., 2017)', url: 'https://arxiv.org/abs/1703.03400' },
        { title: 'Meta-Learning: A Survey (Hospedales et al., 2020)', url: 'https://arxiv.org/abs/2004.05439' },
        { title: 'Learning to Optimize Neural Nets (Li & Malik, 2016)', url: 'https://arxiv.org/abs/1703.00441' }
      ]
    },
    {
      title: 'Practical Implementation Frameworks',
      items: [
        { title: 'AutoGluon: AutoML for Image, Text, and Tabular Data', url: 'https://github.com/autogluon/autogluon' },
        { title: 'NASLib: A Modular and Flexible AutoML Framework', url: 'https://github.com/automl/NASLib' },
        { title: 'OpenAI Codex: Evaluating Large Language Models Trained on Code', url: 'https://arxiv.org/abs/2107.03374' },
        { title: 'GitHub Copilot: AI Pair Programming', url: 'https://github.com/features/copilot' }
      ]
    },
    {
      title: 'Monitoring & Safety Tools',
      items: [
        { title: 'MLflow: A Machine Learning Lifecycle Platform', url: 'https://github.com/mlflow/mlflow' },
        { title: 'Weights & Biases: Experiment Tracking for ML', url: 'https://github.com/wandb/wandb' },
        { title: 'Seldon Core: MLOps Platform for Kubernetes', url: 'https://github.com/SeldonIO/seldon-core' },
        { title: 'Kubeflow: Machine Learning Toolkit for Kubernetes', url: 'https://github.com/kubeflow/kubeflow' }
      ]
    },
    {
      title: 'Research Communities & Organizations',
      items: [
        { title: 'Future of Humanity Institute (FHI)', url: 'https://www.fhi.ox.ac.uk/' },
        { title: 'Machine Intelligence Research Institute (MIRI)', url: 'https://intelligence.org/' },
        { title: 'Center for AI Safety (CAIS)', url: 'https://www.safe.ai/' },
        { title: 'Anthropic: AI Safety Research Company', url: 'https://www.anthropic.com/' }
      ]
    },
    {
      title: 'Governance & Policy Research',
      items: [
        { title: 'Partnership on AI: Tenets and Research', url: 'https://www.partnershiponai.org/' },
        { title: 'AI Governance: A Research Agenda (Dafoe, 2018)', url: 'https://arxiv.org/abs/1802.07228' },
        { title: 'The Malicious Use of Artificial Intelligence (Brundage et al., 2018)', url: 'https://arxiv.org/abs/1802.07228' },
        { title: 'AI Index Report: Measuring AI Progress', url: 'https://aiindex.stanford.edu/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Systems that automatically analyze, modify, and improve their own capabilities and performance over time"
        why="Enables continuous optimization, reduces manual maintenance, and adapts to changing requirements automatically"
        keyInsight="Combines monitoring, analysis, and safe deployment mechanisms to achieve autonomous capability enhancement"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default SelfImprovingSystemsDetails;