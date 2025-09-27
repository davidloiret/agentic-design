import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Brain, Zap, Target, TrendingUp, Layers, Activity, ChevronRight, BookOpen } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  domain: string;
  samples: number;
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
}

interface LearningMetrics {
  adaptationSpeed: number;
  generalization: number;
  sampleEfficiency: number;
  transferability: number;
}

interface MetaKnowledge {
  feature: string;
  importance: number;
  transferable: boolean;
}

const tasks: Task[] = [
  { id: 'classification', name: 'Image Classification', domain: 'Vision', samples: 5, difficulty: 'medium', color: 'blue' },
  { id: 'translation', name: 'Language Translation', domain: 'NLP', samples: 3, difficulty: 'hard', color: 'green' },
  { id: 'regression', name: 'Value Prediction', domain: 'Numerical', samples: 10, difficulty: 'easy', color: 'purple' },
  { id: 'generation', name: 'Text Generation', domain: 'NLP', samples: 7, difficulty: 'medium', color: 'orange' }
];

const MLSDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'meta-train' | 'adaptation' | 'testing' | 'complete'>('idle');
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [trainingTasks, setTrainingTasks] = useState<Task[]>(tasks.slice(0, 3));
  const [testTask, setTestTask] = useState<Task>(tasks[3]);

  // Learning progress
  const [metaEpoch, setMetaEpoch] = useState(0);
  const [innerSteps, setInnerSteps] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lossValue, setLossValue] = useState(1.0);

  // Meta-learning state
  const [metaParameters, setMetaParameters] = useState({
    learningRate: 0.001,
    adaptationSteps: 5,
    metaLearningRate: 0.01
  });

  const [metrics, setMetrics] = useState<LearningMetrics>({
    adaptationSpeed: 0,
    generalization: 0,
    sampleEfficiency: 0,
    transferability: 0
  });

  const [metaKnowledge, setMetaKnowledge] = useState<MetaKnowledge[]>([
    { feature: 'Feature extraction patterns', importance: 0, transferable: true },
    { feature: 'Task-specific adapters', importance: 0, transferable: false },
    { feature: 'Optimization dynamics', importance: 0, transferable: true },
    { feature: 'Domain invariants', importance: 0, transferable: true }
  ]);

  const [taskPerformance, setTaskPerformance] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      const runDemo = async () => {
        // Phase 1: Meta-training
        setCurrentPhase('meta-train');

        for (let epoch = 0; epoch < 5; epoch++) {
          setMetaEpoch(epoch + 1);

          // Train on multiple tasks
          for (const task of trainingTasks) {
            setSelectedTask(task);

            // Inner loop adaptation
            for (let step = 0; step < 5; step++) {
              await new Promise(resolve => setTimeout(resolve, 200));
              setInnerSteps(step + 1);

              // Simulate learning progress
              const progress = (step + 1) / 5;
              setAccuracy(prev => Math.min(prev + progress * 20, 95));
              setLossValue(prev => Math.max(prev * 0.8, 0.1));

              // Update meta-knowledge
              setMetaKnowledge(prev => prev.map(mk => ({
                ...mk,
                importance: Math.min(mk.importance + (mk.transferable ? 0.1 : 0.05), 1)
              })));
            }

            // Store task performance
            setTaskPerformance(prev => new Map(prev).set(task.id, 75 + Math.random() * 20));
            await new Promise(resolve => setTimeout(resolve, 300));
          }

          // Update metrics
          setMetrics({
            adaptationSpeed: Math.min((epoch + 1) * 20, 90),
            generalization: Math.min((epoch + 1) * 18, 85),
            sampleEfficiency: Math.min((epoch + 1) * 22, 92),
            transferability: Math.min((epoch + 1) * 19, 88)
          });
        }

        // Phase 2: Adaptation to new task
        setCurrentPhase('adaptation');
        setSelectedTask(testTask);
        setInnerSteps(0);
        setAccuracy(20); // Start with low accuracy on new task

        // Fast adaptation using meta-knowledge
        for (let step = 0; step < 3; step++) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setInnerSteps(step + 1);

          // Rapid improvement due to meta-learning
          setAccuracy(prev => Math.min(prev + 25, 85));
          setLossValue(prev => Math.max(prev * 0.6, 0.15));
        }

        // Phase 3: Testing
        setCurrentPhase('testing');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Final performance
        setTaskPerformance(prev => new Map(prev).set(testTask.id, 85 + Math.random() * 10));

        // Phase 4: Complete
        setCurrentPhase('complete');
        setIsRunning(false);
      };

      runDemo();
    }
  }, [isRunning, trainingTasks, testTask]);

  const handleStart = () => {
    handleReset();
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setMetaEpoch(0);
    setInnerSteps(0);
    setAccuracy(0);
    setLossValue(1.0);
    setMetrics({
      adaptationSpeed: 0,
      generalization: 0,
      sampleEfficiency: 0,
      transferability: 0
    });
    setMetaKnowledge(prev => prev.map(mk => ({ ...mk, importance: 0 })));
    setTaskPerformance(new Map());
    setSelectedTask(tasks[0]);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'meta-train': return 'text-blue-400';
      case 'adaptation': return 'text-yellow-400';
      case 'testing': return 'text-purple-400';
      case 'complete': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-100">Meta-Learning Systems (MLS)</h2>
          <p className="text-sm text-gray-400">Learning to learn across tasks and domains</p>
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

      {/* Meta-Learning Pipeline */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          MAML Pipeline (Model-Agnostic Meta-Learning)
        </h3>
        <div className="flex items-center justify-between">
          {['Meta-Train', 'Adaptation', 'Testing', 'Deployment'].map((phase, idx) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase === phase.toLowerCase().replace(' ', '-') || currentPhase === 'complete' && idx === 3
                  ? getPhaseColor(phase.toLowerCase().replace(' ', '-'))
                  : 'text-gray-600'
              }`}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                  currentPhase === phase.toLowerCase().replace(' ', '-') || currentPhase === 'complete' && idx === 3
                    ? 'border-current bg-current/20'
                    : 'border-gray-600'
                }`}>
                  {idx === 0 && <Layers className="w-5 h-5" />}
                  {idx === 1 && <Brain className="w-5 h-5" />}
                  {idx === 2 && <Activity className="w-5 h-5" />}
                  {idx === 3 && <Target className="w-5 h-5" />}
                </div>
                <span className="text-xs">{phase}</span>
              </div>
              {idx < 3 && (
                <ChevronRight className={`w-5 h-5 ${
                  metaEpoch > 0 || currentPhase !== 'idle' ? 'text-blue-400' : 'text-gray-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-2 text-center text-xs text-gray-400">
          Epoch: {metaEpoch}/5 • Inner Steps: {innerSteps}
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Task Distribution & Training */}
        <div className="space-y-4">
          {/* Training Tasks */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Task Distribution
            </h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedTask.id === task.id
                      ? 'bg-blue-900/30 border-blue-500 scale-105'
                      : trainingTasks.includes(task)
                      ? 'bg-gray-700/50 border-gray-500'
                      : task === testTask
                      ? 'bg-purple-900/20 border-purple-500'
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-200">{task.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Domain: {task.domain} • Samples: {task.samples}
                      </div>
                    </div>
                    <div className="text-xs">
                      {trainingTasks.includes(task) ? (
                        <span className="text-blue-400">Training</span>
                      ) : task === testTask ? (
                        <span className="text-purple-400">Test</span>
                      ) : null}
                    </div>
                  </div>
                  {taskPerformance.has(task.id) && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Accuracy:</span>
                        <span className="text-green-400">{taskPerformance.get(task.id)?.toFixed(1)}%</span>
                      </div>
                      <div className="mt-1 bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${taskPerformance.get(task.id)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Meta-Knowledge */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Meta-Knowledge Extraction
            </h3>
            <div className="space-y-2">
              {metaKnowledge.map((mk, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-2 h-2 rounded-full ${
                      mk.transferable ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                    <span className="text-xs text-gray-300">{mk.feature}</span>
                  </div>
                  <div className="w-24">
                    <div className="bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          mk.transferable ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${mk.importance * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance & Metrics */}
        <div className="space-y-4">
          {/* Learning Curves */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Learning Performance
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Accuracy</span>
                  <span className="text-green-400">{accuracy.toFixed(1)}%</span>
                </div>
                <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Loss</span>
                  <span className="text-red-400">{lossValue.toFixed(3)}</span>
                </div>
                <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300"
                    style={{ width: `${lossValue * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Meta-Learning Metrics */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Meta-Learning Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="bg-gray-700/30 p-2 rounded-lg">
                  <div className="text-xs text-gray-400 capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-lg font-semibold text-blue-300">{value.toFixed(0)}%</div>
                  <div className="mt-1 bg-gray-700/50 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta-Parameters */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              Meta-Parameters
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Inner Learning Rate:</span>
                <span className="text-orange-300">{metaParameters.learningRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Adaptation Steps:</span>
                <span className="text-orange-300">{metaParameters.adaptationSteps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Meta Learning Rate:</span>
                <span className="text-orange-300">{metaParameters.metaLearningRate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Overview */}
      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          Meta-Learning Algorithm Overview
        </h4>
        <div className="space-y-2 text-xs text-gray-400">
          <p>
            <strong className="text-gray-300">MAML Approach:</strong> Model-Agnostic Meta-Learning optimizes for rapid adaptation to new tasks with minimal data.
          </p>
          <p>
            <strong className="text-gray-300">Bi-Level Optimization:</strong> Outer loop learns meta-parameters, inner loop performs task-specific adaptation.
          </p>
          <p>
            <strong className="text-gray-300">Few-Shot Learning:</strong> Achieves high performance on new tasks with only a few gradient steps and examples.
          </p>
          <p>
            <strong className="text-gray-300">Transfer Learning:</strong> Extracts transferable knowledge across domains for efficient generalization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLSDemo;