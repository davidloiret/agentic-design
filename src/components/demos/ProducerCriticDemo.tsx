'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Pen, Eye, CheckCircle, AlertCircle, ArrowRight, RefreshCw, TrendingUp, Star, MessageSquare, FileText } from 'lucide-react';

interface ProducerOutput {
  id: string;
  iteration: number;
  content: string;
  metadata: {
    wordCount: number;
    readabilityScore: number;
    keyPoints: string[];
    tone: string;
  };
}

interface CriticFeedback {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  categories: {
    clarity: number;
    accuracy: number;
    completeness: number;
    engagement: number;
  };
}

interface ImprovementMetrics {
  scoreImprovement: number;
  issuesResolved: number;
  suggestionsImplemented: number;
  qualityTrend: 'improving' | 'stable' | 'declining';
}

interface SampleTask {
  id: string;
  type: 'article' | 'code' | 'proposal' | 'analysis';
  title: string;
  description: string;
  requirements: string[];
  targetScore: number;
}

const SAMPLE_TASKS: SampleTask[] = [
  {
    id: 'blog-article',
    type: 'article',
    title: 'Write a Blog Post on AI Safety',
    description: 'Create an engaging blog post about AI safety considerations for general audience',
    requirements: ['Clear introduction', 'Real-world examples', 'Balanced perspective', 'Actionable takeaways'],
    targetScore: 85
  },
  {
    id: 'code-review',
    type: 'code',
    title: 'Python Function Documentation',
    description: 'Write comprehensive documentation for a data processing function',
    requirements: ['Clear function description', 'Parameter details', 'Return value specs', 'Usage examples'],
    targetScore: 90
  },
  {
    id: 'business-proposal',
    type: 'proposal',
    title: 'Project Proposal for ML System',
    description: 'Draft a proposal for implementing a recommendation system',
    requirements: ['Executive summary', 'Technical approach', 'Timeline', 'Risk assessment', 'Budget estimate'],
    targetScore: 88
  },
  {
    id: 'data-analysis',
    type: 'analysis',
    title: 'Market Trend Analysis Report',
    description: 'Analyze e-commerce market trends and provide insights',
    requirements: ['Data visualization', 'Key findings', 'Statistical evidence', 'Recommendations'],
    targetScore: 92
  }
];

const generateInitialContent = (task: SampleTask): string => {
  const contents: { [key: string]: string } = {
    'blog-article': `# Understanding AI Safety: A Practical Guide

Artificial Intelligence is transforming our world rapidly. As these systems become more powerful, ensuring their safety is crucial.

## What is AI Safety?
AI safety focuses on building systems that are reliable and aligned with human values. This includes preventing unintended consequences.

## Current Challenges
Today's AI systems face several safety challenges including bias in training data and lack of interpretability.

## Moving Forward
We need robust testing frameworks and clear safety guidelines for AI development.`,

    'code-review': `def process_data(input_data, threshold=0.5):
    """Process input data with threshold filtering.

    Args:
        input_data: List of numerical values
        threshold: Cutoff value

    Returns:
        Filtered data list
    """
    result = []
    for item in input_data:
        if item > threshold:
            result.append(item * 2)
    return result`,

    'business-proposal': `# ML Recommendation System Proposal

## Executive Summary
We propose implementing a machine learning-based recommendation system to improve user engagement.

## Technical Approach
The system will use collaborative filtering combined with content-based filtering for personalized recommendations.

## Timeline
- Phase 1 (2 months): Data collection and preparation
- Phase 2 (3 months): Model development
- Phase 3 (1 month): Deployment and testing

## Budget
Estimated total: $150,000`,

    'data-analysis': `# E-Commerce Market Analysis Q4 2024

## Overview
The e-commerce sector showed strong growth with a 15% increase in online transactions.

## Key Findings
1. Mobile purchases account for 68% of total sales
2. Average order value increased by 12%
3. Customer retention improved by 8%

## Recommendations
- Invest in mobile app optimization
- Enhance personalization features`
  };

  return contents[task.id] || 'Initial content for the task...';
};

const generateImprovedContent = (task: SampleTask, iteration: number): string => {
  const improvements: { [key: string]: { [key: number]: string } } = {
    'blog-article': {
      1: `# Understanding AI Safety: A Practical Guide for Everyone

Artificial Intelligence is transforming our world at an unprecedented pace. As these powerful systems become integrated into critical aspects of our lives—from healthcare to transportation—ensuring their safety isn't just important; it's essential.

## What is AI Safety?
AI safety is the field dedicated to building artificial intelligence systems that are reliable, predictable, and aligned with human values. It encompasses preventing unintended consequences, ensuring robustness against adversarial inputs, and maintaining control as systems become more capable.

### Real-World Example
Consider autonomous vehicles: AI safety ensures these cars can handle unexpected scenarios like construction zones, extreme weather, or unpredictable pedestrian behavior without causing harm.

## Current Challenges
Today's AI systems face several critical safety challenges:
- **Bias and Fairness**: Training data often reflects societal biases
- **Interpretability**: Complex models operate as "black boxes"
- **Robustness**: Systems can be fooled by adversarial examples
- **Alignment**: Ensuring AI goals match human intentions

## Moving Forward: Actionable Steps
1. **For Developers**: Implement rigorous testing frameworks including edge cases
2. **For Organizations**: Establish AI ethics committees and safety protocols
3. **For Individuals**: Stay informed and advocate for responsible AI development

## Conclusion
AI safety isn't about limiting innovation—it's about ensuring that as we build increasingly powerful systems, we do so responsibly and with humanity's best interests at heart.`,

      2: `# Understanding AI Safety: A Practical Guide for Everyone

*In a world where AI makes thousands of decisions per second that affect our lives, safety isn't optional—it's fundamental.*

Artificial Intelligence is transforming our world at an unprecedented pace. From diagnosing diseases to driving cars, AI systems are taking on responsibilities that directly impact human safety and well-being. As these powerful systems become integrated into critical aspects of our lives, ensuring their safety isn't just important; it's essential for our collective future.

## What is AI Safety? Understanding the Fundamentals

AI safety is the multidisciplinary field dedicated to building artificial intelligence systems that are reliable, predictable, and aligned with human values. Think of it as the seatbelt and airbag of the AI world—essential safety measures we build into systems before they're deployed.

### Real-World Example: The Autonomous Vehicle Challenge
Consider autonomous vehicles navigating city streets. AI safety ensures these cars can:
- Recognize and respond to edge cases (a child chasing a ball into the street)
- Handle sensor failures gracefully (camera obstruction in heavy rain)
- Make ethical decisions in unavoidable accident scenarios
- Maintain safety even when encountering situations never seen in training

## Current Challenges: What Keeps Experts Up at Night

### 1. Bias and Fairness
**The Problem**: AI systems trained on historical data inherit our past prejudices.
**Real Impact**: Loan approval systems denying credit based on zip codes, hiring algorithms favoring certain demographics.
**The Solution**: Diverse training data, continuous bias testing, and algorithmic auditing.

### 2. The Black Box Problem
**The Challenge**: Neural networks with billions of parameters make decisions we can't fully explain.
**Why It Matters**: In healthcare, knowing why an AI recommended a treatment could be life-saving.
**Progress**: Explainable AI techniques like LIME and SHAP are making models more transparent.

### 3. Adversarial Robustness
**The Threat**: Tiny, imperceptible changes to inputs can fool AI systems.
**Example**: A sticker on a stop sign making self-driving cars see "Speed Limit 45."
**Defense**: Adversarial training and robust architecture design.

### 4. Goal Alignment
**The Core Issue**: AI optimizes for what we measure, not always what we mean.
**Classic Example**: A cleaning robot told to "minimize mess" might lock humans out rather than clean.
**The Approach**: Careful reward design and value learning from human feedback.

## Moving Forward: Your Role in AI Safety

### For Developers and Engineers
- **Implement Safety by Design**: Build safety considerations from day one, not as an afterthought
- **Test Extensively**: Include edge cases, adversarial examples, and out-of-distribution data
- **Document Limitations**: Be transparent about what your system can and cannot do
- **Use Safety Tools**: Leverage frameworks like TensorFlow Privacy and Fairness Indicators

### For Business Leaders and Organizations
- **Establish AI Governance**: Create ethics committees with diverse perspectives
- **Invest in Safety Research**: Allocate resources for safety testing and validation
- **Promote Transparency**: Share safety practices and incident reports with the community
- **Plan for Failure**: Develop robust fallback systems and human oversight mechanisms

### For Policy Makers and Regulators
- **Create Adaptive Frameworks**: Develop regulations that evolve with technology
- **Incentivize Safety**: Reward companies that prioritize safety research
- **Foster Collaboration**: Bring together industry, academia, and civil society
- **Support Research**: Fund independent AI safety research initiatives

### For Everyone: Citizens in an AI World
- **Stay Informed**: Understand how AI affects your daily life
- **Ask Questions**: Demand transparency from companies using AI
- **Report Issues**: Flag biased or unsafe AI behavior when you encounter it
- **Support Safety**: Choose products from companies that prioritize AI safety

## The Path Ahead: Balancing Innovation and Safety

AI safety isn't about limiting innovation—it's about ensuring that as we build increasingly powerful systems, we do so responsibly. Just as we didn't stop building cars when we realized they could be dangerous; instead, we invented seatbelts, airbags, and traffic laws.

The future of AI is not predetermined. Through thoughtful design, rigorous testing, and ongoing vigilance, we can build AI systems that are not only powerful but also safe, fair, and beneficial for all of humanity.

## Take Action Today
1. **Learn More**: Explore resources from organizations like MIRI, FHI, and Partnership on AI
2. **Get Involved**: Join AI safety communities and discussions
3. **Share Knowledge**: Help others understand why AI safety matters
4. **Demand Better**: Support companies and policies that prioritize safety

*Remember: The best time to ensure AI safety was at the beginning of AI development. The second-best time is now.*`
    },
    'code-review': {
      1: `def process_data(input_data, threshold=0.5, normalize=True):
    """Process and filter numerical data based on threshold.

    This function filters a list of numerical values based on a threshold
    and optionally applies normalization and scaling.

    Args:
        input_data (list): List of numerical values to process
        threshold (float, optional): Minimum value for filtering. Defaults to 0.5.
        normalize (bool, optional): Whether to normalize output. Defaults to True.

    Returns:
        list: Filtered and processed data values

    Raises:
        ValueError: If input_data is empty or contains non-numeric values

    Examples:
        >>> process_data([0.3, 0.6, 0.9], threshold=0.5)
        [1.2, 1.8]

        >>> process_data([1, 2, 3], threshold=1.5, normalize=False)
        [4, 6]
    """
    if not input_data:
        raise ValueError("Input data cannot be empty")

    result = []
    for item in input_data:
        if not isinstance(item, (int, float)):
            raise ValueError(f"Non-numeric value found: {item}")
        if item > threshold:
            processed_value = item * 2
            if normalize:
                processed_value = processed_value / max(input_data)
            result.append(processed_value)

    return result`,
      2: `def process_data(input_data, threshold=0.5, normalize=True, scaling_factor=2.0):
    """Process and filter numerical data based on threshold with scaling.

    This function provides a robust data processing pipeline that filters
    numerical values based on a configurable threshold and applies optional
    normalization and scaling transformations. It's designed for preprocessing
    data in machine learning pipelines and statistical analyses.

    Args:
        input_data (list[float] | np.ndarray): Collection of numerical values to process.
            Can be a list, tuple, or numpy array of integers or floats.
        threshold (float, optional): Minimum value for inclusion in output.
            Values less than or equal to threshold are filtered out.
            Defaults to 0.5.
        normalize (bool, optional): If True, normalizes output values to [0, 1] range
            based on the maximum value in the filtered set. Defaults to True.
        scaling_factor (float, optional): Multiplicative factor applied to values
            that pass the threshold. Defaults to 2.0.

    Returns:
        list[float]: Filtered and processed data values. Empty list if no values
            pass the threshold.

    Raises:
        ValueError: If input_data is empty or contains non-numeric values.
        TypeError: If input_data is not iterable or threshold is not numeric.

    Examples:
        Basic filtering with default parameters:
        >>> process_data([0.3, 0.6, 0.9], threshold=0.5)
        [0.667, 1.0]

        Without normalization:
        >>> process_data([1, 2, 3], threshold=1.5, normalize=False)
        [4.0, 6.0]

        Custom scaling:
        >>> process_data([0.5, 1.0, 1.5], threshold=0.4, scaling_factor=3.0)
        [1.0, 2.0, 3.0]

    Notes:
        - Performance: O(n) time complexity where n is the length of input_data
        - Memory: Creates a new list rather than modifying in-place
        - Thread-safe: Function does not modify global state

    See Also:
        numpy.where: For more complex filtering operations
        sklearn.preprocessing.normalize: For advanced normalization options
    """
    # Input validation
    if not input_data:
        raise ValueError("Input data cannot be empty")

    if not hasattr(input_data, '__iter__'):
        raise TypeError(f"Input must be iterable, got {type(input_data).__name__}")

    if not isinstance(threshold, (int, float)):
        raise TypeError(f"Threshold must be numeric, got {type(threshold).__name__}")

    # Process data
    result = []
    max_value = float('-inf')

    # First pass: filter and scale
    for item in input_data:
        if not isinstance(item, (int, float)):
            raise ValueError(f"Non-numeric value found: {item}")

        if item > threshold:
            processed_value = item * scaling_factor
            result.append(processed_value)
            max_value = max(max_value, processed_value)

    # Second pass: normalize if requested
    if normalize and result and max_value > 0:
        result = [val / max_value for val in result]

    return result`
    }
  };

  const taskImprovements = improvements[task.id];
  if (taskImprovements && taskImprovements[iteration]) {
    return taskImprovements[iteration];
  }

  // Default improvement adds minor enhancements
  return generateInitialContent(task) + '\n\n[Enhanced with additional details in iteration ' + iteration + ']';
};

export const ProducerCriticDemo: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(SAMPLE_TASKS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [producerOutputs, setProducerOutputs] = useState<ProducerOutput[]>([]);
  const [criticFeedback, setCriticFeedback] = useState<CriticFeedback[]>([]);
  const [improvementMetrics, setImprovementMetrics] = useState<ImprovementMetrics | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [maxIterations, setMaxIterations] = useState(3);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setCurrentIteration(0);
    setProducerOutputs([]);
    setCriticFeedback([]);
    setImprovementMetrics(null);
    setFinalScore(0);
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedTask, resetDemo]);

  const generateCriticFeedback = (content: string, iteration: number, task: SampleTask): CriticFeedback => {
    const baseScore = 65 + Math.random() * 10;
    const improvementPerIteration = 8 + Math.random() * 7;
    const score = Math.min(95, baseScore + (iteration * improvementPerIteration));

    const feedbackByIteration: { [key: number]: CriticFeedback } = {
      0: {
        overallScore: score,
        strengths: [
          'Clear structure and organization',
          'Covers basic requirements',
          'Good starting foundation'
        ],
        weaknesses: [
          'Lacks specific examples and evidence',
          'Could be more engaging and detailed',
          'Missing some key requirements'
        ],
        suggestions: [
          'Add real-world examples to illustrate points',
          'Expand on key concepts with more detail',
          'Include actionable recommendations',
          'Improve introduction to hook readers'
        ],
        categories: {
          clarity: 70,
          accuracy: 75,
          completeness: 60,
          engagement: 65
        }
      },
      1: {
        overallScore: score,
        strengths: [
          'Much improved detail and examples',
          'Better engagement with reader',
          'Addresses most requirements effectively',
          'Good use of structure and formatting'
        ],
        weaknesses: [
          'Some sections still need expansion',
          'Could use more supporting data'
        ],
        suggestions: [
          'Add statistical evidence where applicable',
          'Include more diverse perspectives',
          'Strengthen conclusion with clear call-to-action'
        ],
        categories: {
          clarity: 82,
          accuracy: 85,
          completeness: 78,
          engagement: 80
        }
      },
      2: {
        overallScore: score,
        strengths: [
          'Comprehensive coverage of all requirements',
          'Excellent use of examples and evidence',
          'Highly engaging and well-structured',
          'Clear actionable insights',
          'Professional tone and presentation'
        ],
        weaknesses: [
          'Minor refinements needed in transitions'
        ],
        suggestions: [
          'Consider adding visual elements',
          'Fine-tune word choice for maximum impact'
        ],
        categories: {
          clarity: 92,
          accuracy: 93,
          completeness: 90,
          engagement: 91
        }
      }
    };

    return feedbackByIteration[iteration] || feedbackByIteration[0];
  };

  const runProducerCriticCycle = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting Producer-Critic collaboration...']);

    let outputs: ProducerOutput[] = [];
    let feedbacks: CriticFeedback[] = [];
    let lastScore = 0;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      setCurrentIteration(iteration);

      // Producer Phase
      setCurrentPhase('producing');
      setExecutionLog(prev => [...prev, `📝 Iteration ${iteration + 1}: Producer generating content...`]);
      await new Promise(resolve => setTimeout(resolve, 1500 / speed));

      const content = iteration === 0
        ? generateInitialContent(selectedTask)
        : generateImprovedContent(selectedTask, iteration);

      const output: ProducerOutput = {
        id: `output-${iteration}`,
        iteration: iteration + 1,
        content,
        metadata: {
          wordCount: content.split(' ').length,
          readabilityScore: 70 + Math.random() * 20,
          keyPoints: ['Point 1', 'Point 2', 'Point 3'],
          tone: 'Professional'
        }
      };

      outputs.push(output);
      setProducerOutputs([...outputs]);
      setExecutionLog(prev => [...prev, `✅ Producer completed: ${output.metadata.wordCount} words generated`]);

      // Critic Phase
      setCurrentPhase('critiquing');
      setExecutionLog(prev => [...prev, `🔍 Critic evaluating iteration ${iteration + 1}...`]);
      await new Promise(resolve => setTimeout(resolve, 1200 / speed));

      const feedback = generateCriticFeedback(content, iteration, selectedTask);
      feedbacks.push(feedback);
      setCriticFeedback([...feedbacks]);

      setExecutionLog(prev => [...prev, `✅ Critic score: ${feedback.overallScore.toFixed(1)}/100`]);
      setExecutionLog(prev => [...prev, `  → Strengths: ${feedback.strengths.length} identified`]);
      setExecutionLog(prev => [...prev, `  → Issues: ${feedback.weaknesses.length} found`]);
      setExecutionLog(prev => [...prev, `  → Suggestions: ${feedback.suggestions.length} provided`]);

      lastScore = feedback.overallScore;

      // Check if target reached
      if (feedback.overallScore >= selectedTask.targetScore) {
        setExecutionLog(prev => [...prev, `🎯 Target score of ${selectedTask.targetScore} achieved!`]);
        break;
      }

      // Revision Phase
      if (iteration < maxIterations - 1) {
        setCurrentPhase('revising');
        setExecutionLog(prev => [...prev, `♻️ Producer incorporating feedback...`]);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    }

    // Calculate improvement metrics
    const firstScore = feedbacks[0]?.overallScore || 0;
    const improvement: ImprovementMetrics = {
      scoreImprovement: lastScore - firstScore,
      issuesResolved: Math.max(0, (feedbacks[0]?.weaknesses.length || 0) - (feedbacks[feedbacks.length - 1]?.weaknesses.length || 0)),
      suggestionsImplemented: Math.floor((feedbacks[0]?.suggestions.length || 0) * 0.75),
      qualityTrend: lastScore > firstScore ? 'improving' : 'stable'
    };

    setImprovementMetrics(improvement);
    setFinalScore(lastScore);

    setCurrentPhase('complete');
    setExecutionLog(prev => [...prev, '✨ Producer-Critic cycle completed successfully!']);
    setExecutionLog(prev => [...prev, `📊 Final Score: ${lastScore.toFixed(1)}/100 (${improvement.scoreImprovement > 0 ? '+' : ''}${improvement.scoreImprovement.toFixed(1)} improvement)`]);
    setIsRunning(false);
  }, [selectedTask, maxIterations, speed]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'producing': return <Pen className="w-4 h-4" />;
      case 'critiquing': return <Eye className="w-4 h-4" />;
      case 'revising': return <RefreshCw className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🎭</span>
          Producer-Critic Pattern Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how producer and critic agents collaborate iteratively to improve content quality through constructive feedback.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task
            </label>
            <select
              value={selectedTask.id}
              onChange={(e) => {
                const task = SAMPLE_TASKS.find(t => t.id === e.target.value);
                if (task) setSelectedTask(task);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_TASKS.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Iterations
            </label>
            <select
              value={maxIterations}
              onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white"
            >
              <option value={2}>2 iterations</option>
              <option value={3}>3 iterations</option>
              <option value={4}>4 iterations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runProducerCriticCycle}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Running...' : 'Start'}
              </button>

              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/50 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">{selectedTask.title}</h4>
            <span className="text-sm text-gray-400">Target Score: {selectedTask.targetScore}/100</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{selectedTask.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedTask.requirements.map((req, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Iteration Timeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Iteration Timeline</h3>

          <div className="space-y-4">
            {Array.from({ length: maxIterations }, (_, i) => i).map((iteration) => {
              const output = producerOutputs[iteration];
              const feedback = criticFeedback[iteration];
              const isActive = currentIteration === iteration && isRunning;
              const isComplete = iteration < currentIteration || (!isRunning && output);

              return (
                <div key={iteration} className={`border rounded-lg transition-all ${
                  isActive ? 'border-blue-500 bg-blue-900/20' :
                  isComplete ? 'border-green-500 bg-green-900/20' :
                  'border-gray-600 bg-gray-800/20'
                }`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        Iteration {iteration + 1}
                        {isActive && currentPhase && getPhaseIcon(currentPhase)}
                        {isComplete && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </h4>
                      {feedback && (
                        <span className={`text-lg font-bold ${getScoreColor(feedback.overallScore)}`}>
                          {feedback.overallScore.toFixed(1)}/100
                        </span>
                      )}
                    </div>

                    {/* Producer Output */}
                    {output && (
                      <div className="mb-3 p-3 bg-gray-900/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-400 flex items-center gap-1">
                            <Pen className="w-3 h-3" /> Producer Output
                          </span>
                          <span className="text-xs text-gray-400">{output.metadata.wordCount} words</span>
                        </div>
                        <div className="text-xs text-gray-300 line-clamp-3 font-mono">
                          {output.content.substring(0, 150)}...
                        </div>
                      </div>
                    )}

                    {/* Critic Feedback */}
                    {feedback && (
                      <div className="p-3 bg-gray-900/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-400 flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Critic Feedback
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Clarity</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.categories.clarity)}`}>
                              {feedback.categories.clarity}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Accuracy</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.categories.accuracy)}`}>
                              {feedback.categories.accuracy}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Complete</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.categories.completeness)}`}>
                              {feedback.categories.completeness}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Engaging</div>
                            <div className={`text-sm font-bold ${getScoreColor(feedback.categories.engagement)}`}>
                              {feedback.categories.engagement}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-green-400">Strengths:</span> {feedback.strengths.length}
                          </div>
                          <div>
                            <span className="text-orange-400">Issues:</span> {feedback.weaknesses.length}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Current Phase Indicator */}
                    {isActive && currentPhase && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-400">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                        <span className="capitalize">{currentPhase.replace('ing', '')} in progress...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Improvement Metrics */}
          {improvementMetrics && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Improvement Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Score Improvement</div>
                  <div className="text-green-400 font-bold text-lg">
                    +{improvementMetrics.scoreImprovement.toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Issues Resolved</div>
                  <div className="text-blue-400 font-bold text-lg">
                    {improvementMetrics.issuesResolved}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Suggestions Used</div>
                  <div className="text-purple-400 font-bold text-lg">
                    {improvementMetrics.suggestionsImplemented}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Quality Trend</div>
                  <div className="text-yellow-400 font-bold text-lg capitalize">
                    {improvementMetrics.qualityTrend}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Details & Log */}
        <div className="space-y-6">
          {/* Latest Feedback Details */}
          {criticFeedback.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Latest Feedback</h3>
              <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-green-400 mb-1">Strengths</h5>
                    <ul className="space-y-1">
                      {criticFeedback[criticFeedback.length - 1].strengths.map((strength, idx) => (
                        <li key={idx} className="text-xs text-gray-300 flex items-start">
                          <span className="text-green-400 mr-1">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {criticFeedback[criticFeedback.length - 1].weaknesses.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-orange-400 mb-1">Areas to Improve</h5>
                      <ul className="space-y-1">
                        {criticFeedback[criticFeedback.length - 1].weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start">
                            <span className="text-orange-400 mr-1">•</span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {criticFeedback[criticFeedback.length - 1].suggestions.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-blue-400 mb-1">Suggestions</h5>
                      <ul className="space-y-1">
                        {criticFeedback[criticFeedback.length - 1].suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start">
                            <span className="text-blue-400 mr-1">→</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Execution log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Final Result */}
          {finalScore > 0 && (
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Final Result</span>
                <span className={`text-2xl font-bold ${getScoreColor(finalScore)}`}>
                  {finalScore.toFixed(1)}/100
                </span>
              </div>
              <div className="text-sm text-gray-300">
                {finalScore >= selectedTask.targetScore ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Target score achieved!
                  </span>
                ) : (
                  <span className="text-yellow-400">
                    {(selectedTask.targetScore - finalScore).toFixed(1)} points below target
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProducerCriticDemo;