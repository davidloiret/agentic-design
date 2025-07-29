import React, { useState, useEffect } from 'react';
import { Play, Plus, X, Copy, TrendingUp, DollarSign, Zap, RotateCcw, Save, Download, Upload, BarChart3, RefreshCw, Grid3X3, Layers, GitCompare, FileText, ChevronDown, ChevronUp, Settings, Info } from 'lucide-react';
import { patternExamples } from '../pattern-examples';
import { DiffViewer, SideBySideDiffViewer } from './DiffViewer';
import { patternConfigurations, getPatternConfig, getAllPatternIds, getPatternPrompt } from './PatternConfigurations';

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  costPer1kTokens: number;
  speedRating: number;
  qualityRating: number;
}

interface PatternModelCombo {
  patternId: string;
  modelId: string;
}

interface EvaluationRun {
  id: string;
  patternId: string;
  modelId: string;
  input: string;
  output: string;
  timestamp: number;
  tokensUsed: number;
  responseTime: number;
  cost: number;
  runNumber: number;
  iterationId: string;
  usedCustomPrompt: boolean;
  originalInput?: string; // Store the original input for reference
}

interface Comparison {
  id: string;
  name: string;
  runs: string[];
  combos: PatternModelCombo[];
}

const availableModels: ModelConfig[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', costPer1kTokens: 0.03, speedRating: 3, qualityRating: 5 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', costPer1kTokens: 0.002, speedRating: 5, qualityRating: 3 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', costPer1kTokens: 0.015, speedRating: 3, qualityRating: 5 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', costPer1kTokens: 0.003, speedRating: 4, qualityRating: 4 },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', costPer1kTokens: 0.00025, speedRating: 5, qualityRating: 3 },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', costPer1kTokens: 0.00125, speedRating: 4, qualityRating: 4 },
];

type ViewMode = 'single' | 'matrix' | 'comparison' | 'diff';

export const PatternEvaluationTab = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(['cot']);
  const [selectedModels, setSelectedModels] = useState<string[]>(['gpt-4', 'claude-3-sonnet']);
  const [testInput, setTestInput] = useState('');
  const [evaluationRuns, setEvaluationRuns] = useState<EvaluationRun[]>([]);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [activeComparison, setActiveComparison] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [iterations, setIterations] = useState(1);
  const [showMetrics, setShowMetrics] = useState(false);
  const [diffSelection, setDiffSelection] = useState<{ left: string | null, right: string | null }>({ left: null, right: null });
  const [showConfig, setShowConfig] = useState(true);
  const [currentRunNumber, setCurrentRunNumber] = useState(1);
  const [showPatternInfo, setShowPatternInfo] = useState<string | null>(null);
  const [customPatternPrompts, setCustomPatternPrompts] = useState<Record<string, string>>({});
  const [showPatternConfig, setShowPatternConfig] = useState(true);
  const [showPromptPreview, setShowPromptPreview] = useState(false);

  const patterns = getAllPatternIds();

  const generatePatternOutput = (patternConfig: any, model: ModelConfig, input: string): string => {
    if (!patternConfig) {
      return `Error: Pattern configuration not found`;
    }

    // Use custom prompt if available, otherwise use default
    const effectiveInput = customPatternPrompts[patternConfig.id] || input;
    
    // Use the actual pattern configuration to generate more realistic outputs
    const systemPrompt = patternConfig.systemPrompt;
    const userPrompt = patternConfig.userPromptTemplate.replace('{input}', effectiveInput);
    
    // Generate pattern-specific response based on the actual configuration
    let response = '';
    
    switch (patternConfig.id) {
      case 'cot':
        response = generateChainOfThoughtResponse(effectiveInput, model);
        break;
      case 'tot':
        response = generateTreeOfThoughtResponse(effectiveInput, model);
        break;
      case 'react':
        response = generateReActResponse(effectiveInput, model);
        break;
      case 'self-critique':
        response = generateSelfCritiqueResponse(effectiveInput, model);
        break;
      case 'analogical':
        response = generateAnalogicalResponse(effectiveInput, model);
        break;
      case 'meta-cognitive':
        response = generateMetaCognitiveResponse(effectiveInput, model);
        break;
      default:
        response = `Using ${patternConfig.name} approach:\n\n${patternConfig.expectedBehavior}\n\nFor the input: "${effectiveInput}"\n\nThis pattern follows the structure:\n${patternConfig.outputStructure.join('\n')}\n\n[Simulated ${patternConfig.name} response]`;
    }
    
    // Add model-specific variations
    if (model.qualityRating >= 5) {
      response += '\n\n[Enhanced depth and nuance from high-capability model]';
    } else if (model.speedRating >= 5) {
      response = response.replace(/\n\n/g, '\n') + '\n\n[Optimized for speed while maintaining core reasoning]';
    }
    
    return response;
  };

  const generateChainOfThoughtResponse = (input: string, model: ModelConfig): string => {
    const isCalculation = input.toLowerCase().includes('calculate') || input.toLowerCase().includes('compute') || /\d/.test(input);
    const isProblemSolving = input.toLowerCase().includes('how') || input.toLowerCase().includes('solve') || input.toLowerCase().includes('find');
    
    if (isCalculation) {
      return `Step 1: Understanding the calculation requirements
I need to analyze: ${input}

Step 2: Identifying the given values and what needs to be calculated
Let me extract the key numbers and operations needed.

Step 3: Applying the appropriate mathematical approach
Based on the problem structure, I'll use the relevant formulas and methods.

Step 4: Performing the calculations step by step
Working through each calculation methodically to avoid errors.

Step 5: Verification and final answer
Double-checking my work and presenting the final result.

The calculated answer is [specific result based on the problem type].`;
    } else if (isProblemSolving) {
      return `Step 1: Problem analysis
Breaking down "${input}" into its core components.

Step 2: Identifying constraints and requirements
Understanding what limitations and goals need to be considered.

Step 3: Exploring potential approaches
Considering different methods that could address this problem.

Step 4: Selecting and implementing the best approach
Choosing the most effective solution path and working through it.

Step 5: Evaluating the solution
Ensuring the approach fully addresses the original problem.

Therefore, the recommended solution is [context-appropriate answer].`;
    } else {
      return `Step 1: Understanding the query
Analyzing what is being asked: ${input}

Step 2: Gathering relevant information
Identifying the key concepts and context needed to respond.

Step 3: Structuring the response
Organizing my thoughts in a logical sequence.

Step 4: Providing comprehensive analysis
Working through each aspect systematically.

Step 5: Drawing conclusions
Synthesizing the analysis into actionable insights or clear answers.

Based on this step-by-step analysis, [contextual conclusion].`;
    }
  };

  const generateTreeOfThoughtResponse = (input: string, model: ModelConfig): string => {
    return `Exploring multiple solution paths for: ${input}

Branch A: Direct/Traditional Approach
- Apply standard methodologies
- Leverage established best practices
- Follow conventional wisdom
Evaluation: Reliable and well-tested, but may miss innovative opportunities

Branch B: Creative/Alternative Approach  
- Think outside conventional boundaries
- Explore novel solutions
- Challenge assumptions
Evaluation: High potential for breakthrough insights, but higher risk of failure

Branch C: Hybrid/Balanced Approach
- Combine proven methods with innovative elements
- Balance risk and reliability
- Iterative refinement
Evaluation: Moderate risk with good potential for optimal results

Branch D: Systematic/Analytical Approach
- Break down into smaller components
- Use data-driven decision making
- Methodical evaluation
Evaluation: Thorough and comprehensive, but potentially time-intensive

Selected Optimal Path: Branch C (Hybrid Approach)
Reasoning: This approach offers the best balance of reliability and innovation, allowing us to build on proven foundations while incorporating fresh perspectives.

Implementation Strategy:
1. Start with established baseline methods
2. Identify areas for innovative enhancement  
3. Test and validate improvements incrementally
4. Scale successful innovations

Final Recommendation: [Context-specific hybrid solution that combines the best elements from multiple approaches]`;
  };

  const generateReActResponse = (input: string, model: ModelConfig): string => {
    return `Thought: I need to approach "${input}" systematically using the ReAct framework.

Action: First, let me analyze what information I have and what additional context might be needed.

Observation: The query appears to be asking for [context-specific analysis]. I can see several key elements that need to be addressed.

Thought: Based on my initial analysis, I should break this down into manageable components and consider multiple perspectives.

Action: Let me evaluate different approaches and their potential effectiveness for this specific situation.

Observation: After considering various options, I can see that some approaches are more suitable than others given the constraints and requirements.

Thought: I should now synthesize the most promising elements into a coherent solution.

Action: Developing a comprehensive response that addresses all key aspects while remaining practical and actionable.

Observation: This integrated approach appears to cover the essential elements and provides a solid foundation for moving forward.

Thought: Let me do a final check to ensure completeness and accuracy.

Action: Reviewing the solution for any gaps or potential improvements.

Observation: The solution appears comprehensive and well-reasoned.

Final Answer: Based on this systematic reasoning and action cycle, the recommended approach is [detailed, context-appropriate solution that reflects the iterative thinking process].`;
  };

  const generateSelfCritiqueResponse = (input: string, model: ModelConfig): string => {
    return `Initial Response:
For "${input}", my first approach would be to [initial solution attempt based on the input type].

Critique:
Let me critically evaluate this initial response:

Strengths identified:
✓ Addresses the core question directly
✓ Provides a logical starting point
✓ Uses reasonable assumptions

Potential weaknesses:
⚠ May be too simplistic for the complexity involved
⚠ Could benefit from considering edge cases
⚠ Might not account for all stakeholder perspectives
⚠ Could be more specific in certain areas

Areas for improvement:
1. More thorough consideration of alternative approaches
2. Better integration of potential constraints and limitations
3. Enhanced specificity in recommendations
4. Stronger evidence or reasoning support

Refined Response:
Taking these critiques into account, here's my improved analysis:
[Enhanced response that addresses the identified weaknesses while building on the strengths]

Quality Assessment:
This refined approach is more comprehensive and better addresses the nuances of the question. I'm confident it provides greater value while acknowledging areas of uncertainty.

Confidence Level: 8.5/10 - High confidence in the overall approach, with some uncertainty in specific implementation details that would benefit from additional context.`;
  };

  const generateAnalogicalResponse = (input: string, model: ModelConfig): string => {
    return `Analogical Analysis for: ${input}

Like: This situation is similar to [relevant real-world analogy] - let me explore this comparison.

Analogy Mapping:
- Core problem → [analogous situation]
- Key constraints → [analogous limitations]
- Desired outcome → [analogous success criteria]
- Available resources → [analogous tools/capabilities]

Insights from the analogy:
Just as in [the analogous situation], we can see that:
1. The fundamental challenge involves [pattern recognition]
2. Success typically requires [key success factors from analogy]
3. Common pitfalls include [typical failure modes]
4. The most effective strategies tend to be [proven approaches from analogy]

Applied Solution:
Drawing from this analogical framework:
- First, we should [action based on analogy]
- Then, we need to [next step guided by analogical insight]
- We should be careful to [avoid pitfalls identified through analogy]
- Finally, we can measure success by [success metrics from analogical domain]

Verification:
Like the analogy suggests, this approach should work because it follows the same underlying principles that make [the analogous situation] successful. The key is adapting the specific tactics while maintaining the strategic framework.

Therefore, the analogically-informed recommendation is: [specific solution that leverages insights from the analogy while being adapted to the current context].`;
  };

  const generateMetaCognitiveResponse = (input: string, model: ModelConfig): string => {
    return `Meta-cognitive Analysis for: ${input}

Strategy Planning:
Before diving into the solution, let me plan my approach:
- I'll need to understand the problem deeply first
- Then identify multiple solution pathways
- Evaluate each pathway systematically  
- Monitor my reasoning quality throughout
- Adjust my approach if I encounter difficulties

Initial Problem Analysis:
[Context-specific analysis of the input]

Progress Check:
Am I on the right track? Let me evaluate:
✓ Problem understanding seems solid
✓ I've identified key factors
⚠ I should consider more alternative perspectives
✓ My reasoning approach is systematic

Adjustment:
Based on this self-monitoring, I should expand my consideration of [specific area that needs more attention].

Solution Development:
[Detailed solution that shows iterative thinking]

Progress Check:
How is my solution quality?
✓ Addresses the main question
✓ Shows clear reasoning
✓ Considers multiple factors
⚠ Could be more specific in implementation details

Adjustment:
Let me add more specific, actionable elements to my recommendation.

Meta-reflection:
Thinking about my thinking process:
- I started with systematic planning, which helped structure my approach
- The progress checks helped me identify areas needing more attention
- The adjustment steps improved the quality of my analysis
- This meta-cognitive approach led to a more thorough and well-reasoned solution

Final Answer:
Leveraging this self-aware reasoning process, my recommendation is: [comprehensive solution that demonstrates the iterative improvement through meta-cognitive monitoring].

Process Quality: This meta-cognitive approach helped me produce a more thoughtful and complete response by continuously monitoring and improving my reasoning quality.`;
  };

  const runEvaluation = async (modelId: string, patternId: string, runNumber: number, iterationId: string) => {
    const model = availableModels.find(m => m.id === modelId);
    const patternConfig = getPatternConfig(patternId);
    if (!model || !patternConfig) return;

    // Check if using custom prompt
    const customPrompt = customPatternPrompts[patternId];
    const usedCustomPrompt = !!(customPrompt && customPrompt.trim() !== '');
    const effectiveInput = usedCustomPrompt ? customPrompt : testInput;

    // Simulate API call with realistic response times
    const baseResponseTime = 5000 / model.speedRating;
    const responseTime = baseResponseTime + Math.random() * 1000;
    
    // Generate output based on pattern configuration and model characteristics
    const output = generatePatternOutput(patternConfig, model, effectiveInput);
    
    const tokensUsed = Math.floor(100 + Math.random() * 200);
    const cost = (tokensUsed / 1000) * model.costPer1kTokens;

    const newRun: EvaluationRun = {
      id: Date.now().toString() + Math.random(),
      patternId,
      modelId,
      input: effectiveInput,
      output,
      timestamp: Date.now(),
      tokensUsed,
      responseTime,
      cost,
      runNumber,
      iterationId,
      usedCustomPrompt,
      originalInput: usedCustomPrompt ? testInput : undefined,
    };

    return newRun;
  };

  const handleRunEvaluation = async () => {
    if (!testInput.trim() || selectedModels.length === 0 || selectedPatterns.length === 0) return;
    
    setIsRunning(true);
    
    // Run multiple iterations
    for (let i = 0; i < iterations; i++) {
      const iterationId = `${Date.now()}-${i}`;
      
      // Create all pattern-model combinations
      const promises: Promise<EvaluationRun | undefined>[] = [];
      
      if (viewMode === 'single') {
        // Single pattern mode - test one pattern with multiple models
        selectedModels.forEach(modelId => {
          promises.push(runEvaluation(modelId, selectedPatterns[0], currentRunNumber, iterationId));
        });
      } else {
        // Matrix/Comparison mode - test all combinations
        selectedPatterns.forEach(patternId => {
          selectedModels.forEach(modelId => {
            promises.push(runEvaluation(modelId, patternId, currentRunNumber, iterationId));
          });
        });
      }
      
      const results = await Promise.all(promises);
      setEvaluationRuns(prev => [...prev, ...results.filter(Boolean) as EvaluationRun[]]);
      
      // Add small delay between iterations
      if (i < iterations - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setCurrentRunNumber(prev => prev + 1);
    setIsRunning(false);
    setShowMetrics(true);
  };

  const createComparison = () => {
    const recentRuns = evaluationRuns.slice(-(selectedPatterns.length * selectedModels.length));
    if (recentRuns.length < 2) return;

    const combos: PatternModelCombo[] = [];
    selectedPatterns.forEach(patternId => {
      selectedModels.forEach(modelId => {
        combos.push({ patternId, modelId });
      });
    });

    const newComparison: Comparison = {
      id: Date.now().toString(),
      name: `Comparison ${comparisons.length + 1}`,
      runs: recentRuns.map(r => r.id),
      combos,
    };

    setComparisons(prev => [...prev, newComparison]);
    setActiveComparison(newComparison.id);
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getRunsByComparison = (comparisonId: string) => {
    const comparison = comparisons.find(c => c.id === comparisonId);
    if (!comparison) return [];
    return evaluationRuns.filter(run => comparison.runs.includes(run.id));
  };

  const calculateMetrics = (runs: EvaluationRun[]) => {
    const metrics: Record<string, Record<string, {
      avgResponseTime: number;
      avgCost: number;
      avgTokens: number;
      runs: number;
      consistency: number;
    }>> = {};

    runs.forEach(run => {
      const key = `${run.patternId}_${run.modelId}`;
      if (!metrics[run.patternId]) {
        metrics[run.patternId] = {};
      }
      if (!metrics[run.patternId][run.modelId]) {
        metrics[run.patternId][run.modelId] = {
          avgResponseTime: 0,
          avgCost: 0,
          avgTokens: 0,
          runs: 0,
          consistency: 0,
        };
      }
      const metric = metrics[run.patternId][run.modelId];
      metric.avgResponseTime += run.responseTime;
      metric.avgCost += run.cost;
      metric.avgTokens += run.tokensUsed;
      metric.runs++;
    });

    // Calculate averages and consistency
    Object.values(metrics).forEach(patternMetrics => {
      Object.values(patternMetrics).forEach(metric => {
        metric.avgResponseTime /= metric.runs;
        metric.avgCost /= metric.runs;
        metric.avgTokens /= metric.runs;
        metric.consistency = 0.85 + Math.random() * 0.15; // Simulated consistency
      });
    });

    return metrics;
  };

  const getPatternName = (patternId: string) => {
    return patternId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getIterationLabel = (run: EvaluationRun) => {
    const sameIterationRuns = evaluationRuns.filter(r => r.iterationId === run.iterationId);
    if (sameIterationRuns.length > 1) {
      const iterationNumber = sameIterationRuns.findIndex(r => r.id === run.id) + 1;
      return `Run ${run.runNumber}.${iterationNumber}`;
    }
    return `Run ${run.runNumber}`;
  };

  const getPatternColor = (patternId: string) => {
    const colors = {
      'cot': 'bg-blue-500/20 text-blue-300 border-blue-400',
      'tot': 'bg-green-500/20 text-green-300 border-green-400', 
      'react': 'bg-yellow-500/20 text-yellow-300 border-yellow-400',
      'self-critique': 'bg-red-500/20 text-red-300 border-red-400',
      'analogical': 'bg-purple-500/20 text-purple-300 border-purple-400',
      'meta-cognitive': 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
    };
    return colors[patternId] || 'bg-gray-500/20 text-gray-300 border-gray-400';
  };

  const getModelColor = (modelId: string) => {
    const colors = {
      'gpt-4': 'bg-emerald-500/20 text-emerald-300 border-emerald-400',
      'gpt-3.5-turbo': 'bg-teal-500/20 text-teal-300 border-teal-400',
      'claude-3-opus': 'bg-orange-500/20 text-orange-300 border-orange-400',
      'claude-3-sonnet': 'bg-amber-500/20 text-amber-300 border-amber-400',
      'claude-3-haiku': 'bg-lime-500/20 text-lime-300 border-lime-400',
      'gemini-pro': 'bg-pink-500/20 text-pink-300 border-pink-400'
    };
    return colors[modelId] || 'bg-gray-500/20 text-gray-300 border-gray-400';
  };

  const generatePatternSpecificPrompt = (basePrompt: string, patternId: string): string => {
    const config = getPatternConfig(patternId);
    if (!config || !basePrompt.trim()) return basePrompt;

    // Analyze the base prompt to understand the task type
    const isCalculation = basePrompt.toLowerCase().includes('calculate') || basePrompt.toLowerCase().includes('compute') || /\d/.test(basePrompt);
    const isProblemSolving = basePrompt.toLowerCase().includes('how') || basePrompt.toLowerCase().includes('solve') || basePrompt.toLowerCase().includes('find');
    const isAnalysis = basePrompt.toLowerCase().includes('analyze') || basePrompt.toLowerCase().includes('evaluate') || basePrompt.toLowerCase().includes('assess');
    const isCreative = basePrompt.toLowerCase().includes('create') || basePrompt.toLowerCase().includes('design') || basePrompt.toLowerCase().includes('brainstorm');

    switch (patternId) {
      case 'cot':
        if (isCalculation) {
          return `${basePrompt}\n\nPlease solve this step by step, showing your mathematical reasoning at each stage. Break down the calculation into clear, logical steps and verify your work.`;
        } else if (isProblemSolving) {
          return `${basePrompt}\n\nApproach this systematically by breaking it down into logical steps. Show your reasoning process clearly as you work through each stage of the solution.`;
        } else {
          return `${basePrompt}\n\nPlease think through this step by step, showing your reasoning process clearly. Break down your analysis into logical stages and build upon each step.`;
        }

      case 'tot':
        if (isCreative) {
          return `${basePrompt}\n\nExplore multiple creative approaches to this challenge. Generate several different solution paths, evaluate each one, and then select or combine the best elements for an optimal solution.`;
        } else if (isProblemSolving) {
          return `${basePrompt}\n\nConsider multiple solution strategies for this problem. Explore different approaches, evaluate their pros and cons, then select the most promising path forward.`;
        } else {
          return `${basePrompt}\n\nApproach this by exploring multiple perspectives and solution paths. Generate several different approaches, evaluate each one, and determine the optimal strategy.`;
        }

      case 'react':
        return `${basePrompt}\n\nUse a systematic thinking and action approach. For each step, explain your reasoning (Thought), describe what you would do (Action), note what you observe or learn (Observation), then continue this cycle until reaching a conclusion.`;

      case 'self-critique':
        if (isAnalysis) {
          return `${basePrompt}\n\nProvide your initial analysis, then critically evaluate your own response. Identify potential weaknesses, gaps, or alternative perspectives. Refine your analysis based on this self-critique.`;
        } else {
          return `${basePrompt}\n\nFirst provide your initial response, then step back and critically evaluate it. What might you have missed? How could it be improved? Provide a refined answer based on your self-assessment.`;
        }

      case 'analogical':
        if (isProblemSolving) {
          return `${basePrompt}\n\nFind a relevant analogy or similar situation that can help solve this problem. Map the key elements between your analogy and the current challenge, then apply insights from the analogical domain to develop a solution.`;
        } else {
          return `${basePrompt}\n\nUse analogical reasoning to approach this question. Find a relevant comparison or similar situation, map the key relationships, and apply insights from that domain to provide your answer.`;
        }

      case 'meta-cognitive':
        return `${basePrompt}\n\nBefore solving this, plan your thinking strategy. Monitor your reasoning process as you work through it, adjust your approach if needed, and reflect on the quality of your thinking throughout. Be explicit about how you're thinking about thinking.`;

      default:
        return basePrompt;
    }
  };

  const getRunDisplayInfo = (run: EvaluationRun) => {
    const model = availableModels.find(m => m.id === run.modelId);
    const config = getPatternConfig(run.patternId);
    const hasCustomPrompt = customPatternPrompts[run.patternId] && customPatternPrompts[run.patternId].trim() !== '';
    
    return {
      patternName: config?.name || getPatternName(run.patternId),
      modelName: model?.name || run.modelId,
      patternColor: getPatternColor(run.patternId),
      modelColor: getModelColor(run.modelId),
      hasCustomPrompt
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Pattern Evaluation Lab</h2>
        <p className="text-gray-400">Test different pattern-model combinations to find the optimal setup for your use case</p>
        
        {/* Color Legend */}
        {evaluationRuns.length > 0 && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Color Legend</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-2">Patterns:</div>
                <div className="flex flex-wrap gap-2">
                  {patterns.slice(0, 6).map(patternId => {
                    const config = getPatternConfig(patternId);
                    return (
                      <span key={patternId} className={`text-xs px-2 py-1 rounded border ${getPatternColor(patternId)}`}>
                        {config?.name || getPatternName(patternId)}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2">Models:</div>
                <div className="flex flex-wrap gap-2">
                  {availableModels.slice(0, 6).map(model => (
                    <span key={model.id} className={`text-xs px-2 py-1 rounded border ${getModelColor(model.id)}`}>
                      {model.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Mode Selector */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => {
              setViewMode('single');
              setSelectedPatterns([selectedPatterns[0] || 'cot']);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'single' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            Single Pattern
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'matrix' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            Pattern Matrix
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'comparison' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('diff')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'diff' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            Diff View
          </button>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Configuration Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => setShowConfig(!showConfig)}
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Configuration</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{selectedPatterns.length} pattern{selectedPatterns.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''}</span>
              {Object.keys(customPatternPrompts).length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-green-400">{Object.keys(customPatternPrompts).length} custom prompt{Object.keys(customPatternPrompts).length !== 1 ? 's' : ''}</span>
                </>
              )}
              {testInput.trim() && (
                <>
                  <span>•</span>
                  <span>Ready to evaluate</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick Action Button */}
            {!showConfig && testInput.trim() && selectedModels.length > 0 && selectedPatterns.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRunEvaluation();
                }}
                disabled={isRunning}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-3 h-3 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Evaluate
                  </>
                )}
              </button>
            )}
            {showConfig ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Configuration Content */}
        {showConfig && (
          <div className="p-6 pt-0 space-y-4 border-t border-gray-700">
            {/* Pattern Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Pattern{viewMode !== 'single' ? 's' : ''}
              </label>
              {viewMode === 'single' ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <select
                      value={selectedPatterns[0]}
                      onChange={(e) => setSelectedPatterns([e.target.value])}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none"
                    >
                      {patterns.map(pattern => {
                        const config = getPatternConfig(pattern);
                        return (
                          <option key={pattern} value={pattern}>
                            {config?.name || getPatternName(pattern)}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      onClick={() => {
                        const currentPattern = selectedPatterns[0];
                        setShowPatternInfo(showPatternInfo === currentPattern ? null : currentPattern);
                      }}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                      title="Show pattern details"
                    >
                      <Info className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Pattern Info for Single Mode */}
                  {showPatternInfo === selectedPatterns[0] && (() => {
                    const config = getPatternConfig(selectedPatterns[0]);
                    if (!config) return null;
                    
                    return (
                      <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-white mb-1">{config.name}</h4>
                            <p className="text-sm text-gray-300">{config.description}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-1">Expected Behavior:</h5>
                            <p className="text-xs text-gray-400">{config.expectedBehavior}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-1">Output Structure:</h5>
                            <ul className="text-xs text-gray-400 space-y-0.5">
                              {config.outputStructure.map((item, idx) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {config.examples.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-1">Example Input:</h5>
                              <div className="text-xs text-gray-400 bg-gray-800 rounded p-2">
                                {config.examples[0].input}
                              </div>
                            </div>
                          )}
                          
                          <button
                            onClick={() => setShowPatternInfo(null)}
                            className="text-xs text-purple-400 hover:text-purple-300"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {patterns.map(pattern => {
                    const config = getPatternConfig(pattern);
                    return (
                      <div key={pattern} className="relative">
                        <label
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedPatterns.includes(pattern)
                              ? 'bg-purple-500/20 border-purple-400'
                              : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedPatterns.includes(pattern)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPatterns(prev => [...prev, pattern]);
                              } else {
                                setSelectedPatterns(prev => prev.filter(p => p !== pattern));
                              }
                            }}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium">{config?.name || getPatternName(pattern)}</span>
                            {config && (
                              <div className="text-xs text-gray-400 mt-1">{config.description}</div>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPatternInfo(showPatternInfo === pattern ? null : pattern);
                            }}
                            className="ml-2 p-1 hover:bg-gray-600 rounded transition-colors"
                            title="Show pattern details"
                          >
                            <Info className="w-3 h-3 text-gray-400" />
                          </button>
                        </label>
                        
                        {/* Pattern Info Popup */}
                        {showPatternInfo === pattern && config && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-lg z-10">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold text-white mb-1">{config.name}</h4>
                                <p className="text-sm text-gray-300">{config.description}</p>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-300 mb-1">Expected Behavior:</h5>
                                <p className="text-xs text-gray-400">{config.expectedBehavior}</p>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-300 mb-1">Output Structure:</h5>
                                <ul className="text-xs text-gray-400 space-y-0.5">
                                  {config.outputStructure.map((item, idx) => (
                                    <li key={idx}>• {item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              {config.examples.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-300 mb-1">Example Input:</h5>
                                  <div className="text-xs text-gray-400 bg-gray-800 rounded p-2">
                                    {config.examples[0].input}
                                  </div>
                                </div>
                              )}
                              
                              <button
                                onClick={() => setShowPatternInfo(null)}
                                className="text-xs text-purple-400 hover:text-purple-300"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Models to Compare</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableModels.map(model => (
                  <label
                    key={model.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedModels.includes(model.id)
                        ? 'bg-blue-500/20 border-blue-400'
                        : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedModels(prev => [...prev, model.id]);
                        } else {
                          setSelectedModels(prev => prev.filter(id => id !== model.id));
                        }
                      }}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{model.name}</div>
                      <div className="text-xs text-gray-400">{model.provider}</div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs" title="Quality">
                          <span className="text-yellow-400">{getRatingStars(model.qualityRating)}</span>
                        </span>
                        <span className="text-xs text-gray-500">${model.costPer1kTokens}/1K</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Test Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Test Input
                <span className="text-xs text-gray-500 ml-2">(used when no pattern-specific prompt is set)</span>
              </label>
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Enter your test prompt or problem..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                rows={4}
              />
            </div>

            {/* Pattern-Specific Prompts */}
            {(viewMode === 'matrix' || viewMode === 'comparison' || viewMode === 'diff') && selectedPatterns.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">
                    Pattern-Specific Prompts
                    <span className="text-xs text-gray-500 ml-2">(customize input for each pattern)</span>
                  </label>
                  <button
                    onClick={() => setShowPatternConfig(!showPatternConfig)}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    {showPatternConfig ? 'Hide' : 'Configure'}
                  </button>
                </div>

                {showPatternConfig && (
                  <div className="space-y-4 bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-3">
                      Customize the input prompt for each pattern. Leave empty to use the default test input above.
                    </div>
                    
                    {selectedPatterns.map(patternId => {
                      const config = getPatternConfig(patternId);
                      const displayInfo = getRunDisplayInfo({patternId} as EvaluationRun);
                      
                      return (
                        <div key={patternId} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded border ${displayInfo.patternColor}`}>
                              {config?.name || getPatternName(patternId)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {config?.description}
                            </span>
                          </div>
                          
                          <textarea
                            value={customPatternPrompts[patternId] || ''}
                            onChange={(e) => {
                              setCustomPatternPrompts(prev => ({
                                ...prev,
                                [patternId]: e.target.value
                              }));
                            }}
                            placeholder={`Custom prompt for ${config?.name || getPatternName(patternId)}... (leave empty to use default)`}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none resize-none text-sm"
                            rows={3}
                          />
                          
                          {customPatternPrompts[patternId] && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-green-400">
                                ✓ Custom prompt configured
                              </span>
                              <button
                                onClick={() => {
                                  setCustomPatternPrompts(prev => {
                                    const updated = {...prev};
                                    delete updated[patternId];
                                    return updated;
                                  });
                                }}
                                className="text-xs text-red-400 hover:text-red-300"
                              >
                                Reset to default
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            // Auto-generate pattern-specific prompts
                            const newPrompts: Record<string, string> = {};
                            selectedPatterns.forEach(patternId => {
                              newPrompts[patternId] = generatePatternSpecificPrompt(testInput, patternId);
                            });
                            setCustomPatternPrompts(prev => ({...prev, ...newPrompts}));
                          }}
                          disabled={!testInput.trim()}
                          className="text-xs px-3 py-1.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white rounded transition-colors font-medium"
                        >
                          ✨ Auto-generate Pattern Prompts
                        </button>
                        <button
                          onClick={() => setShowPromptPreview(!showPromptPreview)}
                          disabled={!testInput.trim()}
                          className="text-xs px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white rounded transition-colors"
                        >
                          👁️ Preview Auto-generated
                        </button>
                        <button
                          onClick={() => {
                            // Copy default input to all patterns
                            const newPrompts: Record<string, string> = {};
                            selectedPatterns.forEach(patternId => {
                              newPrompts[patternId] = testInput;
                            });
                            setCustomPatternPrompts(prev => ({...prev, ...newPrompts}));
                          }}
                          disabled={!testInput.trim()}
                          className="text-xs px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded transition-colors"
                        >
                          Copy default to all
                        </button>
                        <button
                          onClick={() => {
                            setCustomPatternPrompts({});
                          }}
                          className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                        >
                          Clear all custom prompts
                        </button>
                      </div>
                      
                      {/* Auto-generation info */}
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          ✨ <strong>Auto-generate</strong> creates pattern-specific prompts that leverage each reasoning approach's strengths
                        </span>
                      </div>

                      {/* Preview of auto-generated prompts */}
                      {showPromptPreview && testInput.trim() && (
                        <div className="mt-4 space-y-3 bg-gray-800 border border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white">Preview: Auto-generated Prompts</h4>
                            <button
                              onClick={() => {
                                // Apply all previewed prompts
                                const newPrompts: Record<string, string> = {};
                                selectedPatterns.forEach(patternId => {
                                  newPrompts[patternId] = generatePatternSpecificPrompt(testInput, patternId);
                                });
                                setCustomPatternPrompts(prev => ({...prev, ...newPrompts}));
                                setShowPromptPreview(false);
                              }}
                              className="text-xs px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
                            >
                              Apply All
                            </button>
                          </div>
                          
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {selectedPatterns.map(patternId => {
                              const config = getPatternConfig(patternId);
                              const displayInfo = getRunDisplayInfo({patternId} as EvaluationRun);
                              const generatedPrompt = generatePatternSpecificPrompt(testInput, patternId);
                              
                              return (
                                <div key={patternId} className="bg-gray-900 rounded p-3 border border-gray-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs px-2 py-1 rounded border ${displayInfo.patternColor}`}>
                                      {config?.name || getPatternName(patternId)}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setCustomPatternPrompts(prev => ({
                                          ...prev,
                                          [patternId]: generatedPrompt
                                        }));
                                      }}
                                      className="text-xs px-1.5 py-0.5 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                                    >
                                      Apply This
                                    </button>
                                  </div>
                                  <div className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                                    {generatedPrompt}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Iterations Control */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Iterations (for consistency testing)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white font-medium w-8">{iterations}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Run multiple times to test output consistency
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRunEvaluation}
                disabled={!testInput.trim() || selectedModels.length === 0 || selectedPatterns.length === 0 || isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Evaluation
                  </>
                )}
              </button>
              
              <button
                onClick={createComparison}
                disabled={evaluationRuns.length < 2}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Comparison
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pattern-Model Matrix View */}
      {viewMode === 'matrix' && showMetrics && evaluationRuns.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Pattern-Model Performance Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3 text-gray-300">Pattern / Model</th>
                  {selectedModels.map(modelId => {
                    const model = availableModels.find(m => m.id === modelId);
                    return (
                      <th key={modelId} className="text-center p-3 text-gray-300">
                        {model?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {selectedPatterns.map(patternId => {
                  const metrics = calculateMetrics(evaluationRuns.filter(r => 
                    r.patternId === patternId && selectedModels.includes(r.modelId)
                  ));
                  
                  return (
                    <tr key={patternId} className="border-t border-gray-700">
                      <td className="p-3 font-medium text-purple-400">
                        {getPatternName(patternId)}
                      </td>
                      {selectedModels.map(modelId => {
                        const metric = metrics[patternId]?.[modelId];
                        if (!metric) return <td key={modelId} className="p-3 text-center">-</td>;
                        
                        return (
                          <td key={modelId} className="p-3">
                            <div className="bg-gray-700 rounded p-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Time:</span>
                                <span className="text-yellow-400">{(metric.avgResponseTime / 1000).toFixed(1)}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Cost:</span>
                                <span className="text-green-400">${metric.avgCost.toFixed(4)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Score:</span>
                                <span className="text-purple-400">
                                  {((1 / metric.avgCost) * metric.consistency * 10).toFixed(0)}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison View */}
      {viewMode === 'comparison' && evaluationRuns.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pattern Comparison Results</h3>
            <div className="text-sm text-gray-400">
              Compare how different patterns approach the same problem
            </div>
          </div>
          
          {selectedPatterns.map(patternId => {
            const displayInfo = getRunDisplayInfo({patternId} as EvaluationRun);
            return (
              <div key={patternId} className={`bg-gray-800 rounded-lg p-4 border-l-4`} style={{borderLeftColor: displayInfo.patternColor.includes('blue') ? '#3b82f6' : displayInfo.patternColor.includes('green') ? '#10b981' : displayInfo.patternColor.includes('yellow') ? '#f59e0b' : displayInfo.patternColor.includes('red') ? '#ef4444' : displayInfo.patternColor.includes('purple') ? '#8b5cf6' : '#6366f1'}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold px-3 py-1 rounded border ${displayInfo.patternColor}`}>
                      {displayInfo.patternName}
                    </h4>
                    {customPatternPrompts[patternId] && customPatternPrompts[patternId].trim() !== '' && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-400" title="Using custom prompt">
                        Custom
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {getPatternConfig(patternId)?.description}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {evaluationRuns
                    .filter(run => run.patternId === patternId && selectedModels.includes(run.modelId))
                    .slice(-selectedModels.length)
                    .map(run => {
                      const runDisplayInfo = getRunDisplayInfo(run);
                      return (
                        <div key={run.id} className="bg-gray-700 rounded p-3 border border-gray-600 hover:border-gray-500 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-sm text-white">{runDisplayInfo.modelName}</h5>
                                <span className={`text-xs px-1.5 py-0.5 rounded border ${runDisplayInfo.modelColor}`}>
                                  {getIterationLabel(run)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatTimestamp(run.timestamp)}
                              </div>
                            </div>
                            <button
                              onClick={() => navigator.clipboard.writeText(run.output)}
                              className="p-1 hover:bg-gray-600 rounded transition-colors"
                              title="Copy output"
                            >
                              <Copy className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-300 whitespace-pre-wrap mb-2 bg-gray-800 rounded p-2">
                            {run.output.substring(0, 200)}...
                          </div>
                          <div className="flex gap-3 text-xs">
                            <span className="text-yellow-300">{(run.responseTime / 1000).toFixed(1)}s</span>
                            <span className="text-green-300">${run.cost.toFixed(4)}</span>
                            <span className="text-blue-300">{run.tokensUsed} tokens</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Single Pattern Results */}
      {viewMode === 'single' && evaluationRuns.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Evaluations</h3>
            <div className="text-sm text-gray-400">
              Showing results for different models using the same pattern
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {evaluationRuns.slice(-6).reverse().map(run => {
              const displayInfo = getRunDisplayInfo(run);
              return (
                <div key={run.id} className="bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white">{displayInfo.modelName}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded border ${displayInfo.patternColor}`}>
                            {displayInfo.patternName}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded border ${displayInfo.modelColor}`}>
                            {getIterationLabel(run)}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTimestamp(run.timestamp)}
                      </div>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(run.output)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Copy output"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex gap-4 text-sm bg-gray-900 rounded p-2">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300">{(run.responseTime / 1000).toFixed(1)}s</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-green-300">${run.cost.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300">{run.tokensUsed} tokens</span>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded p-3 border-l-4" style={{borderLeftColor: displayInfo.modelColor.includes('emerald') ? '#10b981' : displayInfo.modelColor.includes('teal') ? '#14b8a6' : displayInfo.modelColor.includes('orange') ? '#f97316' : displayInfo.modelColor.includes('amber') ? '#f59e0b' : displayInfo.modelColor.includes('lime') ? '#84cc16' : '#ec4899'}}>
                    <div className="text-sm text-gray-300 whitespace-pre-wrap">{run.output}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Diff View */}
      {viewMode === 'diff' && evaluationRuns.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Output Diff Comparison</h3>
          
          {/* Selection Controls */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Compare (Left)</label>
                <select
                  value={diffSelection.left || ''}
                  onChange={(e) => setDiffSelection(prev => ({ ...prev, left: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="">Select output...</option>
                  {evaluationRuns.slice(-20).reverse().map((run) => {
                    const displayInfo = getRunDisplayInfo(run);
                    return (
                      <option key={run.id} value={run.id}>
                        {displayInfo.patternName} - {displayInfo.modelName} ({getIterationLabel(run)})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Right Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">With (Right)</label>
                <select
                  value={diffSelection.right || ''}
                  onChange={(e) => setDiffSelection(prev => ({ ...prev, right: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="">Select output...</option>
                  {evaluationRuns.slice(-20).reverse().map((run) => {
                    const displayInfo = getRunDisplayInfo(run);
                    return (
                      <option key={run.id} value={run.id}>
                        {displayInfo.patternName} - {displayInfo.modelName} ({getIterationLabel(run)})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Diff Display */}
          {diffSelection.left && diffSelection.right && (
            <div className="space-y-4">
              {(() => {
                const leftRun = evaluationRuns.find(r => r.id === diffSelection.left);
                const rightRun = evaluationRuns.find(r => r.id === diffSelection.right);
                
                if (!leftRun || !rightRun) return null;

                const leftModel = availableModels.find(m => m.id === leftRun.modelId);
                const rightModel = availableModels.find(m => m.id === rightRun.modelId);

                return (
                  <>
                    {/* Metadata Comparison */}
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400 mb-2">Left Output</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded border ${getRunDisplayInfo(leftRun).patternColor}`}>
                              {getRunDisplayInfo(leftRun).patternName}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded border ${getRunDisplayInfo(leftRun).modelColor}`}>
                              {getRunDisplayInfo(leftRun).modelName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              {getIterationLabel(leftRun)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(leftRun.timestamp)}
                            </span>
                          </div>
                          <div className="text-gray-500 text-xs">
                            {leftRun.tokensUsed} tokens • ${leftRun.cost.toFixed(4)} • {(leftRun.responseTime / 1000).toFixed(1)}s
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-2">Right Output</div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded border ${getRunDisplayInfo(rightRun).patternColor}`}>
                              {getRunDisplayInfo(rightRun).patternName}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded border ${getRunDisplayInfo(rightRun).modelColor}`}>
                              {getRunDisplayInfo(rightRun).modelName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              {getIterationLabel(rightRun)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(rightRun.timestamp)}
                            </span>
                          </div>
                          <div className="text-gray-500 text-xs">
                            {rightRun.tokensUsed} tokens • ${rightRun.cost.toFixed(4)} • {(rightRun.responseTime / 1000).toFixed(1)}s
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inline Diff */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Inline Diff</h4>
                      <DiffViewer
                        leftContent={leftRun.output}
                        rightContent={rightRun.output}
                        leftLabel={`${getRunDisplayInfo(leftRun).patternName} - ${getRunDisplayInfo(leftRun).modelName}`}
                        rightLabel={`${getRunDisplayInfo(rightRun).patternName} - ${getRunDisplayInfo(rightRun).modelName}`}
                        mode="words"
                      />
                    </div>

                    {/* Side-by-Side Diff */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Side-by-Side Diff</h4>
                      <SideBySideDiffViewer
                        leftContent={leftRun.output}
                        rightContent={rightRun.output}
                        leftLabel={`${getRunDisplayInfo(leftRun).patternName} - ${getRunDisplayInfo(leftRun).modelName}`}
                        rightLabel={`${getRunDisplayInfo(rightRun).patternName} - ${getRunDisplayInfo(rightRun).modelName}`}
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Empty State */}
          {(!diffSelection.left || !diffSelection.right) && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <GitCompare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Select two outputs above to compare their differences</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};