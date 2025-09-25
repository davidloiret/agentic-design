import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Brain, Target, Zap, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';

interface Example {
  input: string;
  output: string;
  reasoning?: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  examples: Example[];
  testInput: string;
  expectedOutput: string;
  type: 'zero-shot' | 'one-shot' | 'few-shot';
}

const tasks: Task[] = [
  {
    id: 'sentiment',
    name: 'Sentiment Analysis',
    description: 'Classify text sentiment as positive, negative, or neutral',
    type: 'few-shot',
    examples: [
      { input: 'This product is amazing!', output: 'positive', reasoning: 'Enthusiastic language with "amazing"' },
      { input: 'Terrible service, very disappointed', output: 'negative', reasoning: 'Strong negative words' },
      { input: 'The weather is cloudy today', output: 'neutral', reasoning: 'Factual statement without emotion' }
    ],
    testInput: 'Best purchase I ever made!',
    expectedOutput: 'positive'
  },
  {
    id: 'translation',
    name: 'Language Pattern',
    description: 'Learn translation pattern from examples',
    type: 'few-shot',
    examples: [
      { input: 'cat → gato', output: 'Spanish translation' },
      { input: 'dog → perro', output: 'Spanish translation' },
      { input: 'house → casa', output: 'Spanish translation' }
    ],
    testInput: 'book → ?',
    expectedOutput: 'libro'
  },
  {
    id: 'classification',
    name: 'Zero-Shot Classification',
    description: 'Classify without any examples',
    type: 'zero-shot',
    examples: [],
    testInput: 'Is "The sun is a star" a fact or opinion?',
    expectedOutput: 'fact'
  },
  {
    id: 'reasoning',
    name: 'Chain-of-Thought',
    description: 'Learn step-by-step reasoning from examples',
    type: 'few-shot',
    examples: [
      {
        input: 'If all roses are flowers, and all flowers need water, do roses need water?',
        output: 'Yes',
        reasoning: 'roses → flowers → need water'
      },
      {
        input: 'If it rains, the ground gets wet. It rained. What happened to the ground?',
        output: 'The ground got wet',
        reasoning: 'rain → wet ground (modus ponens)'
      }
    ],
    testInput: 'All birds have wings. Penguins are birds. What do penguins have?',
    expectedOutput: 'wings'
  }
];

const ICLDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'context' | 'processing' | 'inference' | 'complete'>('idle');
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState(0);
  const [contextSize, setContextSize] = useState(0);
  const [showExamples, setShowExamples] = useState(true);
  const [learningProgress, setLearningProgress] = useState(0);

  // Animation states
  const [activeExampleIndex, setActiveExampleIndex] = useState(-1);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      const runDemo = async () => {
        // Phase 1: Building context
        setCurrentPhase('context');
        setLearningProgress(0);

        // Animate through examples
        for (let i = 0; i < selectedTask.examples.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setActiveExampleIndex(i);
          setContextSize((i + 1) * 50); // Simulate context tokens
          setLearningProgress((i + 1) / selectedTask.examples.length * 50);
        }

        // Phase 2: Processing
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentPhase('processing');
        setLearningProgress(60);

        const steps = [
          'Analyzing pattern structure...',
          'Extracting decision boundaries...',
          'Building internal representation...',
          'Preparing inference model...'
        ];

        for (const step of steps) {
          await new Promise(resolve => setTimeout(resolve, 600));
          setProcessingSteps(prev => [...prev, step]);
          setLearningProgress(prev => Math.min(prev + 10, 90));
        }

        // Phase 3: Inference
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentPhase('inference');
        setLearningProgress(95);

        // Simulate confidence building
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setConfidence(i * (0.85 + Math.random() * 0.1)); // 85-95% confidence
        }

        // Phase 4: Complete
        await new Promise(resolve => setTimeout(resolve, 300));
        setPrediction(selectedTask.expectedOutput);
        setCurrentPhase('complete');
        setLearningProgress(100);
        setIsRunning(false);
      };

      runDemo();
    }
  }, [isRunning, selectedTask]);

  const handleStart = () => {
    handleReset();
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setPrediction('');
    setConfidence(0);
    setContextSize(0);
    setActiveExampleIndex(-1);
    setProcessingSteps([]);
    setLearningProgress(0);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'context': return 'text-blue-400';
      case 'processing': return 'text-yellow-400';
      case 'inference': return 'text-purple-400';
      case 'complete': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-100">In-Context Learning (ICL)</h2>
          <p className="text-sm text-gray-400">Learn from examples without parameter updates</p>
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

      {/* Task Selector */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Select Learning Task</h3>
        <div className="grid grid-cols-2 gap-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => !isRunning && setSelectedTask(task)}
              disabled={isRunning}
              className={`p-3 rounded-lg border transition-all ${
                selectedTask.id === task.id
                  ? 'bg-blue-900/30 border-blue-600 text-blue-300'
                  : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
              } ${isRunning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className="font-medium text-sm">{task.name}</div>
              <div className="text-xs mt-1 opacity-70">{task.type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Learning Pipeline Visualization */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          ICL Pipeline
        </h3>
        <div className="flex items-center justify-between">
          {['Context', 'Processing', 'Inference', 'Output'].map((phase, idx) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase === phase.toLowerCase() || currentPhase === 'complete' && idx === 3
                  ? getPhaseColor(phase.toLowerCase())
                  : 'text-gray-600'
              }`}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                  currentPhase === phase.toLowerCase() || currentPhase === 'complete' && idx === 3
                    ? 'border-current bg-current/20'
                    : 'border-gray-600'
                }`}>
                  {idx === 0 && <BookOpen className="w-5 h-5" />}
                  {idx === 1 && <Brain className="w-5 h-5" />}
                  {idx === 2 && <Lightbulb className="w-5 h-5" />}
                  {idx === 3 && <Target className="w-5 h-5" />}
                </div>
                <span className="text-xs">{phase}</span>
              </div>
              {idx < 3 && (
                <ChevronRight className={`w-5 h-5 ${
                  learningProgress > (idx + 1) * 25 ? 'text-blue-400' : 'text-gray-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-3 bg-gray-700/30 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${learningProgress}%` }}
          />
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Examples/Context */}
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Context Examples ({selectedTask.type})
          </h3>

          {selectedTask.examples.length > 0 ? (
            <div className="space-y-2">
              {selectedTask.examples.map((example, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    activeExampleIndex === idx
                      ? 'bg-blue-900/30 border-blue-500 scale-105'
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                >
                  <div className="text-xs text-gray-400 mb-1">Example {idx + 1}</div>
                  <div className="text-sm text-gray-200">
                    <span className="text-blue-300">Input:</span> {example.input}
                  </div>
                  <div className="text-sm text-gray-200 mt-1">
                    <span className="text-green-300">Output:</span> {example.output}
                  </div>
                  {example.reasoning && (
                    <div className="text-xs text-gray-400 mt-1 italic">
                      {example.reasoning}
                    </div>
                  )}
                </div>
              ))}

              {selectedTask.examples.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-sm">Zero-shot learning</div>
                  <div className="text-xs mt-1">No examples needed!</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-sm">Zero-shot learning</div>
              <div className="text-xs mt-1">No examples needed!</div>
            </div>
          )}

          {/* Context Metrics */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Context Size:</span>
              <span className="text-blue-300">{contextSize} tokens</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Learning Type:</span>
              <span className="text-purple-300">{selectedTask.type}</span>
            </div>
          </div>
        </div>

        {/* Inference & Output */}
        <div className="space-y-4">
          {/* Test Input */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-400" />
              Test Input
            </h3>
            <div className="p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-200">{selectedTask.testInput}</div>
            </div>
          </div>

          {/* Processing Steps */}
          {currentPhase === 'processing' && processingSteps.length > 0 && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                Processing
              </h3>
              <div className="space-y-1">
                {processingSteps.map((step, idx) => (
                  <div key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Model Output */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              Model Output
            </h3>

            {prediction ? (
              <div className="space-y-3">
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-600">
                  <div className="text-sm text-green-300 font-medium">{prediction}</div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Confidence:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                    <span className="text-green-300">{confidence.toFixed(1)}%</span>
                  </div>
                </div>

                {prediction === selectedTask.expectedOutput && (
                  <div className="text-xs text-green-400 text-center">
                    ✓ Correct prediction!
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">Waiting for inference...</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Algorithm Overview */}
      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          ICL Algorithm Overview
        </h4>
        <div className="space-y-2 text-xs text-gray-400">
          <p>
            <strong className="text-gray-300">Pattern Recognition:</strong> Model identifies patterns from provided examples without updating weights.
          </p>
          <p>
            <strong className="text-gray-300">Context Window:</strong> All learning happens within the model's attention mechanism using the input context.
          </p>
          <p>
            <strong className="text-gray-300">Task Adaptation:</strong> Model dynamically adapts to new tasks based on example structure and format.
          </p>
          <p>
            <strong className="text-gray-300">Inference Time:</strong> No training required - immediate task performance using learned representations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ICLDemo;