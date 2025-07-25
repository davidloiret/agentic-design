import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Target, Clock, CheckCircle, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';

interface GoalDecompositionScenario {
  id: string;
  name: string;
  description: string;
  mainGoal: string;
  timeline: string;
  subGoals: Array<{
    id: string;
    title: string;
    target: string;
    deadline: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Not Started' | 'In Progress' | 'Completed';
    progress: number;
    tasks: Array<{
      id: string;
      name: string;
      duration: string;
      priority: 'High' | 'Medium' | 'Low';
      status: 'Not Started' | 'In Progress' | 'Completed';
      dependencies?: string[];
    }>;
    metrics: {
      current: number;
      target: number;
      unit: string;
    };
  }>;
  totalProgress: number;
  estimatedCompletion: string;
}

const GoalDecompositionDemo: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [metrics, setMetrics] = useState<{ [key: string]: number }>({});

  const scenarios: GoalDecompositionScenario[] = [
    {
      id: 'website-performance',
      name: 'Website Performance Optimization',
      description: 'Comprehensive performance improvement project',
      mainGoal: 'Improve website performance by 50% within 6 weeks',
      timeline: '6 weeks',
      subGoals: [
        {
          id: 'image-optimization',
          title: 'Image Optimization',
          target: 'Reduce image sizes by 50%',
          deadline: '2 weeks',
          priority: 'High',
          status: 'In Progress',
          progress: 65,
          tasks: [
            { id: 'audit-images', name: 'Audit current images', duration: '1 day', priority: 'High', status: 'Completed' },
            { id: 'compress-images', name: 'Compress existing images', duration: '3 days', priority: 'High', status: 'In Progress' },
            { id: 'implement-webp', name: 'Implement WebP format', duration: '2 days', priority: 'Medium', status: 'Not Started' },
            { id: 'lazy-loading', name: 'Add lazy loading', duration: '1 day', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 32.5, target: 50, unit: '% reduction' }
        },
        {
          id: 'code-optimization',
          title: 'Code Optimization',
          target: 'Minimize JS/CSS by 30%',
          deadline: '3 weeks',
          priority: 'High',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'analyze-bundle', name: 'Analyze bundle size', duration: '1 day', priority: 'High', status: 'Not Started' },
            { id: 'remove-unused', name: 'Remove unused code', duration: '4 days', priority: 'High', status: 'Not Started' },
            { id: 'tree-shaking', name: 'Implement tree shaking', duration: '2 days', priority: 'Medium', status: 'Not Started' },
            { id: 'minification', name: 'Enhance minification', duration: '1 day', priority: 'Low', status: 'Not Started' }
          ],
          metrics: { current: 0, target: 30, unit: '% reduction' }
        },
        {
          id: 'caching',
          title: 'Caching Implementation',
          target: 'Achieve 90% cache hit rate',
          deadline: '2 weeks',
          priority: 'Medium',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'cache-strategy', name: 'Design cache strategy', duration: '1 day', priority: 'High', status: 'Not Started' },
            { id: 'implement-redis', name: 'Implement Redis caching', duration: '3 days', priority: 'High', status: 'Not Started' },
            { id: 'browser-cache', name: 'Optimize browser caching', duration: '2 days', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 45, target: 90, unit: '% hit rate' }
        },
        {
          id: 'server-upgrade',
          title: 'Server Optimization',
          target: 'Reduce response time by 40%',
          deadline: '4 weeks',
          priority: 'Medium',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'server-audit', name: 'Audit server performance', duration: '2 days', priority: 'High', status: 'Not Started' },
            { id: 'database-optimize', name: 'Optimize database queries', duration: '5 days', priority: 'High', status: 'Not Started', dependencies: ['server-audit'] },
            { id: 'cdn-setup', name: 'Setup CDN', duration: '2 days', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 850, target: 510, unit: 'ms avg response' }
        }
      ],
      totalProgress: 16,
      estimatedCompletion: '5.2 weeks'
    },
    {
      id: 'mobile-app-launch',
      name: 'Mobile App Launch',
      description: 'End-to-end mobile application development and launch',
      mainGoal: 'Launch mobile app with 10K downloads in first month',
      timeline: '12 weeks',
      subGoals: [
        {
          id: 'mvp-development',
          title: 'MVP Development',
          target: 'Complete core features',
          deadline: '8 weeks',
          priority: 'High',
          status: 'In Progress',
          progress: 45,
          tasks: [
            { id: 'user-auth', name: 'User authentication', duration: '1 week', priority: 'High', status: 'Completed' },
            { id: 'core-features', name: 'Core features', duration: '4 weeks', priority: 'High', status: 'In Progress' },
            { id: 'ui-polish', name: 'UI/UX polish', duration: '2 weeks', priority: 'Medium', status: 'Not Started' },
            { id: 'testing', name: 'Testing & QA', duration: '1 week', priority: 'High', status: 'Not Started' }
          ],
          metrics: { current: 45, target: 100, unit: '% complete' }
        },
        {
          id: 'marketing-strategy',
          title: 'Marketing Strategy',
          target: 'Build pre-launch audience of 5K',
          deadline: '6 weeks',
          priority: 'High',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'brand-identity', name: 'Brand identity', duration: '1 week', priority: 'High', status: 'Not Started' },
            { id: 'content-strategy', name: 'Content strategy', duration: '2 weeks', priority: 'Medium', status: 'Not Started' },
            { id: 'social-media', name: 'Social media presence', duration: '3 weeks', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 0, target: 5000, unit: 'followers' }
        }
      ],
      totalProgress: 22,
      estimatedCompletion: '11.5 weeks'
    },
    {
      id: 'team-productivity',
      name: 'Team Productivity Enhancement',
      description: 'Systematic approach to improving team efficiency',
      mainGoal: 'Increase team productivity by 35% within 8 weeks',
      timeline: '8 weeks',
      subGoals: [
        {
          id: 'process-optimization',
          title: 'Process Optimization',
          target: 'Reduce meeting time by 40%',
          deadline: '4 weeks',
          priority: 'High',
          status: 'In Progress',
          progress: 30,
          tasks: [
            { id: 'meeting-audit', name: 'Audit current meetings', duration: '1 week', priority: 'High', status: 'Completed' },
            { id: 'eliminate-redundant', name: 'Eliminate redundant meetings', duration: '1 week', priority: 'High', status: 'In Progress' },
            { id: 'async-communication', name: 'Implement async communication', duration: '2 weeks', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 12, target: 40, unit: '% reduction' }
        },
        {
          id: 'automation',
          title: 'Workflow Automation',
          target: 'Automate 60% of repetitive tasks',
          deadline: '6 weeks',
          priority: 'Medium',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'identify-tasks', name: 'Identify repetitive tasks', duration: '1 week', priority: 'High', status: 'Not Started' },
            { id: 'automation-tools', name: 'Select automation tools', duration: '1 week', priority: 'High', status: 'Not Started' },
            { id: 'implement-automation', name: 'Implement automation', duration: '4 weeks', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 0, target: 60, unit: '% automated' }
        }
      ],
      totalProgress: 15,
      estimatedCompletion: '7.8 weeks'
    },
    {
      id: 'customer-satisfaction',
      name: 'Customer Satisfaction Improvement',
      description: 'Multi-faceted approach to enhance customer experience',
      mainGoal: 'Achieve 90% customer satisfaction score within 10 weeks',
      timeline: '10 weeks',
      subGoals: [
        {
          id: 'support-enhancement',
          title: 'Support Enhancement',
          target: 'Reduce response time to under 2 hours',
          deadline: '4 weeks',
          priority: 'High',
          status: 'In Progress',
          progress: 40,
          tasks: [
            { id: 'support-audit', name: 'Audit current support process', duration: '1 week', priority: 'High', status: 'Completed' },
            { id: 'chatbot-implementation', name: 'Implement AI chatbot', duration: '2 weeks', priority: 'High', status: 'In Progress' },
            { id: 'knowledge-base', name: 'Expand knowledge base', duration: '1 week', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 4.5, target: 2.0, unit: 'hours avg response' }
        },
        {
          id: 'product-improvements',
          title: 'Product Improvements',
          target: 'Implement top 10 feature requests',
          deadline: '8 weeks',
          priority: 'High',
          status: 'Not Started',
          progress: 0,
          tasks: [
            { id: 'analyze-feedback', name: 'Analyze customer feedback', duration: '1 week', priority: 'High', status: 'Not Started' },
            { id: 'prioritize-features', name: 'Prioritize feature requests', duration: '1 week', priority: 'High', status: 'Not Started' },
            { id: 'develop-features', name: 'Develop priority features', duration: '6 weeks', priority: 'Medium', status: 'Not Started' }
          ],
          metrics: { current: 0, target: 10, unit: 'features implemented' }
        }
      ],
      totalProgress: 20,
      estimatedCompletion: '9.5 weeks'
    }
  ];

  const steps = [
    'Goal Analysis & SMART Evaluation',
    'Complexity Assessment',
    'Sub-goal Decomposition',
    'Task Breakdown',
    'Dependency Analysis',
    'Progress Monitoring',
    'Achievement Validation'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length;
          if (next === 0) {
            setIsRunning(false);
          }
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning, steps.length]);

  const currentScenario = scenarios[currentScenarioIndex];

  const handlePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCompletedTasks(new Set());
    setMetrics({});
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handleStepBackward = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusColor = (status: 'Not Started' | 'In Progress' | 'Completed') => {
    switch (status) {
      case 'Not Started': return 'bg-gray-500/20 text-gray-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Completed': return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleStepBackward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleStepForward}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            →
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              onClick={() => setCurrentScenarioIndex(index)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                index === currentScenarioIndex
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-400">
            {((currentStep + 1) / steps.length * 100).toFixed(0)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <h3 className="text-lg font-semibold text-white">{steps[currentStep]}</h3>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Scenario Overview */}
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-white">Main Goal</h4>
            </div>
            <p className="text-gray-300 mb-2">{currentScenario.mainGoal}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Timeline: {currentScenario.timeline}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Progress: {currentScenario.totalProgress}%
              </div>
            </div>
          </div>

          {/* Sub-goals Overview */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Sub-goals Breakdown</h4>
            <div className="space-y-3">
              {currentScenario.subGoals.map((subGoal) => (
                <div key={subGoal.id} className="border border-gray-600/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-white">{subGoal.title}</h5>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(subGoal.priority)}`}>
                        {subGoal.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(subGoal.status)}`}>
                        {subGoal.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{subGoal.target}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Deadline: {subGoal.deadline}</span>
                    <span>Progress: {subGoal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${subGoal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Detailed Task View */}
        <div className="space-y-4">
          {/* Current Step Details */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Current Step: {steps[currentStep]}</h4>
            <div className="text-sm text-gray-300 space-y-2">
              {currentStep === 0 && (
                <div>
                  <p><strong>SMART Analysis:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Specific:</strong> ✓ Clear performance target (50% improvement)</li>
                    <li><strong>Measurable:</strong> ✓ Quantifiable metrics available</li>
                    <li><strong>Achievable:</strong> ✓ Realistic with proper resources</li>
                    <li><strong>Relevant:</strong> ✓ Aligned with business objectives</li>
                    <li><strong>Time-bound:</strong> ✓ 6-week deadline set</li>
                  </ul>
                </div>
              )}
              {currentStep === 1 && (
                <div>
                  <p><strong>Complexity Assessment:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Multiple technical domains involved</li>
                    <li>Cross-functional team coordination required</li>
                    <li>Dependencies between optimization tasks</li>
                    <li>Risk: High complexity - requires decomposition</li>
                  </ul>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <p><strong>Sub-goal Creation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Image Optimization (50% size reduction)</li>
                    <li>Code Optimization (30% JS/CSS reduction)</li>
                    <li>Caching Implementation (90% hit rate)</li>
                    <li>Server Optimization (40% response time reduction)</li>
                  </ul>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <p><strong>Task Breakdown:</strong></p>
                  <p>Each sub-goal decomposed into executable tasks with clear deliverables, time estimates, and resource requirements.</p>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <p><strong>Dependency Mapping:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Database optimization depends on server audit</li>
                    <li>WebP implementation follows image compression</li>
                    <li>Cache strategy informs implementation tasks</li>
                  </ul>
                </div>
              )}
              {currentStep === 5 && (
                <div>
                  <p><strong>Progress Tracking:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Real-time progress updates</li>
                    <li>Metric-based validation</li>
                    <li>Risk and blocker identification</li>
                    <li>Timeline adjustment recommendations</li>
                  </ul>
                </div>
              )}
              {currentStep === 6 && (
                <div>
                  <p><strong>Achievement Validation:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Performance metrics verified</li>
                    <li>Overall goal achievement: {currentScenario.totalProgress}%</li>
                    <li>Estimated completion: {currentScenario.estimatedCompletion}</li>
                    <li>Success criteria evaluation in progress</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Progress Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {currentScenario.subGoals.map((subGoal) => (
                <div key={subGoal.id} className="bg-gray-700/30 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-white mb-1">{subGoal.title}</h5>
                  <div className="text-xs text-gray-300">
                    Current: {subGoal.metrics.current} {subGoal.metrics.unit}
                  </div>
                  <div className="text-xs text-gray-400">
                    Target: {subGoal.metrics.target} {subGoal.metrics.unit}
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                    <div 
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${Math.min(100, (subGoal.metrics.current / subGoal.metrics.target) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <h4 className="font-semibold text-white mb-3">Task Details</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {currentScenario.subGoals[0].tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-4 h-4 rounded border ${
                        completedTasks.has(task.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-400'
                      }`}
                    >
                      {completedTasks.has(task.id) && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`text-sm ${
                      completedTasks.has(task.id) ? 'text-gray-400 line-through' : 'text-white'
                    }`}>
                      {task.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-400">{task.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Goal Decomposition Status</span>
          </div>
          <div className="text-sm text-gray-300">
            Overall Progress: {currentScenario.totalProgress}% • ETC: {currentScenario.estimatedCompletion}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-300">
          <strong>Key Insights:</strong> 
          {currentScenario.totalProgress < 25 && " Goal is in early stages. Focus on high-priority sub-goals and task dependencies."}
          {currentScenario.totalProgress >= 25 && currentScenario.totalProgress < 75 && " Good progress made. Monitor critical path and adjust resources as needed."}
          {currentScenario.totalProgress >= 75 && " Excellent progress! Focus on quality validation and final deliverables."}
        </div>
      </div>
    </div>
  );
};

export default GoalDecompositionDemo;