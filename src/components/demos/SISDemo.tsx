import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Code, Brain, TrendingUp, GitBranch, Zap, Settings, ChevronRight, FileCode, MessageSquare, Cpu } from 'lucide-react';

interface ImprovementMetric {
  name: string;
  value: number;
  improvement: number;
  unit: string;
}

interface SystemVersion {
  version: string;
  timestamp: number;
  improvements: string[];
  metrics: ImprovementMetric[];
  type: 'code' | 'prompt' | 'reasoning';
}

interface SelfImprovementCycle {
  phase: 'analyze' | 'identify' | 'generate' | 'test' | 'deploy';
  description: string;
  progress: number;
}

const SISDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<SelfImprovementCycle>({
    phase: 'analyze',
    description: 'Analyzing current performance...',
    progress: 0
  });

  // System versions history
  const [versions, setVersions] = useState<SystemVersion[]>([
    {
      version: 'v1.0.0',
      timestamp: Date.now(),
      improvements: ['Initial system'],
      metrics: [
        { name: 'Accuracy', value: 72, improvement: 0, unit: '%' },
        { name: 'Latency', value: 250, improvement: 0, unit: 'ms' },
        { name: 'Token Efficiency', value: 65, improvement: 0, unit: '%' },
        { name: 'Error Rate', value: 8.5, improvement: 0, unit: '%' }
      ],
      type: 'code'
    }
  ]);

  // Current improvements being worked on
  const [currentImprovements, setCurrentImprovements] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ passed: number; total: number }>({ passed: 0, total: 0 });

  // Code examples
  const [codeExample, setCodeExample] = useState({
    before: `# Original prompt template
def generate_prompt(query):
    return f"Answer: {query}"

# Simple error handling
def process(data):
    try:
        return model.run(data)
    except:
        return None`,
    after: ''
  });

  // Reasoning improvements
  const [reasoningChain, setReasoningChain] = useState<string[]>([]);
  const [confidenceScore, setConfidenceScore] = useState(0.72);

  useEffect(() => {
    if (!isRunning) return;

    const runImprovementCycle = async () => {
      const phases: SelfImprovementCycle[] = [
        { phase: 'analyze', description: 'Analyzing current performance...', progress: 0 },
        { phase: 'identify', description: 'Identifying improvement opportunities...', progress: 0 },
        { phase: 'generate', description: 'Generating optimizations...', progress: 0 },
        { phase: 'test', description: 'Testing improvements...', progress: 0 },
        { phase: 'deploy', description: 'Deploying successful changes...', progress: 0 }
      ];

      for (let cycle = 0; cycle < 3; cycle++) {
        setCurrentCycle(cycle + 1);

        for (const phase of phases) {
          setCurrentPhase(phase);

          // Animate progress for each phase
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setCurrentPhase(prev => ({ ...prev, progress }));
          }

          // Phase-specific actions
          switch (phase.phase) {
            case 'analyze':
              // Analyze performance metrics
              setReasoningChain([
                'Analyzing error patterns...',
                'Identifying bottlenecks...',
                'Reviewing user feedback...'
              ]);
              break;

            case 'identify':
              // Identify improvements
              const improvements = [
                cycle === 0 ? 'Optimize prompt templates with CoT' :
                cycle === 1 ? 'Add self-correction mechanism' :
                'Implement adaptive learning rate',

                cycle === 0 ? 'Add comprehensive error handling' :
                cycle === 1 ? 'Implement retry logic with backoff' :
                'Add performance caching layer',

                cycle === 0 ? 'Improve context window management' :
                cycle === 1 ? 'Add dynamic token optimization' :
                'Implement parallel processing'
              ];
              setCurrentImprovements(improvements);
              await new Promise(resolve => setTimeout(resolve, 500));
              break;

            case 'generate':
              // Generate improved code
              const improvedCode = cycle === 0 ? `# Enhanced with Chain of Thought
def generate_prompt(query, context=None):
    cot_prompt = """
    Let's think step by step:
    1. Understand the query
    2. Gather relevant context
    3. Formulate response
    """
    return f"{cot_prompt}\\nQuery: {query}"

# Robust error handling
def process(data):
    try:
        result = model.run(data)
        validate_output(result)
        return result
    except ModelError as e:
        return handle_model_error(e)
    except ValidationError as e:
        return self_correct(data, e)` :
              cycle === 1 ? `# Self-correcting system
def generate_prompt(query, context=None):
    base = generate_base_prompt(query)
    critique = self_critique(base)
    return improve_prompt(base, critique)

# Retry with exponential backoff
@retry(max_attempts=3, backoff=2)
def process(data):
    result = model.run(data)
    if not validate_output(result):
        result = self_correct(result)
    return optimize_tokens(result)` :
              `# Adaptive learning system
class AdaptivePrompt:
    def __init__(self):
        self.history = []
        self.learning_rate = 0.01

    def generate(self, query):
        prompt = self.base_prompt(query)
        prompt = self.adapt_from_history(prompt)
        return self.optimize(prompt)

# Parallel processing pipeline
async def process_batch(data_batch):
    tasks = [process_async(d) for d in data_batch]
    results = await asyncio.gather(*tasks)
    return aggregate_results(results)`;

              setCodeExample(prev => ({ ...prev, after: improvedCode }));
              await new Promise(resolve => setTimeout(resolve, 500));
              break;

            case 'test':
              // Run tests on improvements
              const totalTests = 10;
              for (let i = 0; i <= totalTests; i++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                setTestResults({
                  passed: Math.floor(i * (0.85 + cycle * 0.05)),
                  total: i
                });
              }
              break;

            case 'deploy':
              // Deploy successful improvements
              if (testResults.passed / testResults.total > 0.8) {
                const latestVersion = versions[versions.length - 1];
                const improvementFactor = 1 + (cycle + 1) * 0.15;

                const newVersion: SystemVersion = {
                  version: `v1.${cycle + 1}.0`,
                  timestamp: Date.now(),
                  improvements: currentImprovements,
                  metrics: [
                    {
                      name: 'Accuracy',
                      value: Math.min(95, latestVersion.metrics[0].value * improvementFactor),
                      improvement: (improvementFactor - 1) * 100,
                      unit: '%'
                    },
                    {
                      name: 'Latency',
                      value: Math.max(50, latestVersion.metrics[1].value / improvementFactor),
                      improvement: -(1 - 1/improvementFactor) * 100,
                      unit: 'ms'
                    },
                    {
                      name: 'Token Efficiency',
                      value: Math.min(95, latestVersion.metrics[2].value * improvementFactor),
                      improvement: (improvementFactor - 1) * 100,
                      unit: '%'
                    },
                    {
                      name: 'Error Rate',
                      value: Math.max(0.5, latestVersion.metrics[3].value / improvementFactor),
                      improvement: -(1 - 1/improvementFactor) * 100,
                      unit: '%'
                    }
                  ],
                  type: cycle === 0 ? 'prompt' : cycle === 1 ? 'reasoning' : 'code'
                };

                setVersions(prev => [...prev, newVersion]);
                setConfidenceScore(prev => Math.min(0.95, prev * improvementFactor));
              }
              break;
          }
        }

        // Reset for next cycle
        setCurrentImprovements([]);
        setTestResults({ passed: 0, total: 0 });
      }

      setIsRunning(false);
    };

    runImprovementCycle();
  }, [isRunning]);

  const handleStart = () => {
    handleReset();
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentCycle(0);
    setCurrentPhase({
      phase: 'analyze',
      description: 'Analyzing current performance...',
      progress: 0
    });
    setVersions([versions[0]]);
    setCurrentImprovements([]);
    setTestResults({ passed: 0, total: 0 });
    setCodeExample(prev => ({ ...prev, after: '' }));
    setReasoningChain([]);
    setConfidenceScore(0.72);
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'analyze': return <Brain className="w-5 h-5" />;
      case 'identify': return <Settings className="w-5 h-5" />;
      case 'generate': return <Code className="w-5 h-5" />;
      case 'test': return <Zap className="w-5 h-5" />;
      case 'deploy': return <GitBranch className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'analyze': return 'text-blue-400';
      case 'identify': return 'text-yellow-400';
      case 'generate': return 'text-purple-400';
      case 'test': return 'text-orange-400';
      case 'deploy': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-100">Self-Improving Systems (SIS)</h2>
          <p className="text-sm text-gray-400">Autonomous code and reasoning optimization</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Self-Improvement Pipeline */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Self-Improvement Pipeline - Cycle {currentCycle}/3
        </h3>
        <div className="flex items-center justify-between mb-3">
          {['Analyze', 'Identify', 'Generate', 'Test', 'Deploy'].map((phase) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase.phase === phase.toLowerCase()
                  ? getPhaseColor(phase.toLowerCase())
                  : 'text-gray-600'
              }`}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                  currentPhase.phase === phase.toLowerCase()
                    ? 'border-current bg-current/20'
                    : 'border-gray-600'
                }`}>
                  {getPhaseIcon(phase.toLowerCase())}
                </div>
                <span className="text-xs">{phase}</span>
              </div>
              {phase !== 'Deploy' && (
                <ChevronRight className={`w-5 h-5 ${
                  ['analyze', 'identify', 'generate', 'test'].indexOf(currentPhase.phase) >=
                  ['analyze', 'identify', 'generate', 'test'].indexOf(phase.toLowerCase())
                    ? 'text-blue-400' : 'text-gray-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-gray-700/30 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${currentPhase.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">{currentPhase.description}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Code Evolution */}
        <div className="space-y-4">
          {/* Code Improvements */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              Code Evolution
            </h3>

            {codeExample.before && (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Original Implementation</div>
                  <pre className="text-xs bg-gray-900/50 p-2 rounded border border-gray-700 overflow-x-auto">
                    <code className="text-gray-300">{codeExample.before}</code>
                  </pre>
                </div>

                {codeExample.after && (
                  <div>
                    <div className="text-xs text-green-400 mb-1">Improved Implementation</div>
                    <pre className="text-xs bg-green-900/20 p-2 rounded border border-green-700 overflow-x-auto">
                      <code className="text-gray-300">{codeExample.after}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Current Improvements */}
          {currentImprovements.length > 0 && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-yellow-400" />
                Active Improvements
              </h3>
              <div className="space-y-2">
                {currentImprovements.map((improvement, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-gray-300">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Metrics & Testing */}
        <div className="space-y-4">
          {/* Performance Metrics */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Performance Metrics
            </h3>
            {versions.length > 0 && (
              <div className="space-y-2">
                {versions[versions.length - 1].metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{metric.name}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-200">
                        {metric.value.toFixed(1)}{metric.unit}
                      </span>
                      {metric.improvement !== 0 && (
                        <span className={`text-xs ${
                          metric.improvement > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Confidence Score */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">System Confidence:</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                      style={{ width: `${confidenceScore * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-green-300">{(confidenceScore * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {testResults.total > 0 && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                Test Results
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tests Passed:</span>
                  <span className={testResults.passed === testResults.total ? 'text-green-400' : 'text-yellow-400'}>
                    {testResults.passed}/{testResults.total}
                  </span>
                </div>
                <div className="bg-gray-700/30 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      testResults.passed === testResults.total ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(testResults.passed / testResults.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Version History */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              Version History
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {versions.slice().reverse().map((version, idx) => (
                <div key={idx} className={`p-2 rounded border ${
                  idx === 0 ? 'bg-purple-900/20 border-purple-600' : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-200">{version.version}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {version.improvements.length > 0 && (
                          <div>{version.improvements.length} improvements</div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      version.type === 'code' ? 'bg-blue-900/50 text-blue-300' :
                      version.type === 'prompt' ? 'bg-green-900/50 text-green-300' :
                      'bg-purple-900/50 text-purple-300'
                    }`}>
                      {version.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning Chain */}
      {reasoningChain.length > 0 && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Reasoning Chain
          </h3>
          <div className="space-y-1">
            {reasoningChain.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                <ChevronRight className="w-3 h-3" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Algorithm Overview */}
      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          Self-Improvement Algorithm Overview
        </h4>
        <div className="space-y-2 text-xs text-gray-400">
          <p>
            <strong className="text-gray-300">Autonomous Optimization:</strong> System continuously analyzes its performance and identifies areas for improvement without human intervention.
          </p>
          <p>
            <strong className="text-gray-300">Multi-Domain Learning:</strong> Improves across code implementation, prompt engineering, and reasoning strategies.
          </p>
          <p>
            <strong className="text-gray-300">Test-Driven Evolution:</strong> All improvements are validated through comprehensive testing before deployment.
          </p>
          <p>
            <strong className="text-gray-300">Version Control:</strong> Maintains history of all changes with rollback capability for safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SISDemo;