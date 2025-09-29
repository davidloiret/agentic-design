'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Brain,
  CheckCircle,
  ChevronRight,
  PlayCircle,
  HelpCircle,
  Sparkles,
  Shield,
  AlertCircle,
  Target,
  Zap,
  Book,
  Users,
  TrendingUp,
  Award,
  Info
} from 'lucide-react';

// Types for onboarding patterns
type OnboardingStage = 'welcome' | 'capabilities' | 'limitations' | 'practice' | 'trust' | 'advanced' | 'complete';
type LearningPath = 'beginner' | 'intermediate' | 'advanced';
type InteractionMode = 'guided' | 'practice' | 'independent';
type TrustLevel = 'low' | 'medium' | 'high';

interface Capability {
  id: string;
  name: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  unlocked: boolean;
  practiced: boolean;
  icon: React.ReactNode;
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'demo' | 'practice' | 'assessment';
  completed: boolean;
  duration: number;
}

interface TrustScenario {
  id: string;
  scenario: string;
  agentResponse: string;
  outcome: 'success' | 'limitation' | 'failure';
  lesson: string;
}

interface ProgressMetrics {
  stepsCompleted: number;
  totalSteps: number;
  featuresUnlocked: number;
  trustScore: number;
  practiceTime: number;
  competencyLevel: number;
}

export default function OnboardingEducationPatternsDemo() {
  const [stage, setStage] = useState<OnboardingStage>('welcome');
  const [learningPath, setLearningPath] = useState<LearningPath>('beginner');
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('guided');
  const [trustLevel, setTrustLevel] = useState<TrustLevel>('low');
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [capabilities, setCapabilities] = useState<Capability[]>([
    {
      id: 'basic-qa',
      name: 'Question Answering',
      description: 'Ask questions and get informative responses',
      complexity: 'basic',
      unlocked: true,
      practiced: false,
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      id: 'task-completion',
      name: 'Task Completion',
      description: 'Complete specific tasks with guidance',
      complexity: 'basic',
      unlocked: true,
      practiced: false,
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Create documents, emails, and other content',
      complexity: 'intermediate',
      unlocked: false,
      practiced: false,
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Analyze and interpret complex data',
      complexity: 'intermediate',
      unlocked: false,
      practiced: false,
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 'multi-step',
      name: 'Multi-Step Workflows',
      description: 'Handle complex multi-step processes',
      complexity: 'advanced',
      unlocked: false,
      practiced: false,
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'autonomous',
      name: 'Autonomous Operations',
      description: 'Work independently with minimal supervision',
      complexity: 'advanced',
      unlocked: false,
      practiced: false,
      icon: <Brain className="w-4 h-4" />
    }
  ]);

  const [learningSteps] = useState<LearningStep[]>([
    {
      id: 'intro',
      title: 'Meet Your AI Assistant',
      description: 'Introduction to capabilities and interaction patterns',
      type: 'concept',
      completed: false,
      duration: 2
    },
    {
      id: 'boundaries',
      title: 'Understanding Boundaries',
      description: 'Learn what I can and cannot do',
      type: 'concept',
      completed: false,
      duration: 3
    },
    {
      id: 'first-interaction',
      title: 'Your First Interaction',
      description: 'Practice basic question-answer patterns',
      type: 'practice',
      completed: false,
      duration: 5
    },
    {
      id: 'trust-demo',
      title: 'Building Trust',
      description: 'See success and failure scenarios',
      type: 'demo',
      completed: false,
      duration: 4
    },
    {
      id: 'advanced-features',
      title: 'Advanced Capabilities',
      description: 'Explore more complex features',
      type: 'practice',
      completed: false,
      duration: 6
    },
    {
      id: 'assessment',
      title: 'Knowledge Check',
      description: 'Verify understanding and readiness',
      type: 'assessment',
      completed: false,
      duration: 3
    }
  ]);

  const [trustScenarios] = useState<TrustScenario[]>([
    {
      id: 'success-1',
      scenario: 'Summarize a document',
      agentResponse: 'Successfully created concise summary with key points',
      outcome: 'success',
      lesson: 'I excel at text analysis and summarization tasks'
    },
    {
      id: 'limitation-1',
      scenario: 'Access real-time stock prices',
      agentResponse: 'I cannot access real-time data, but I can explain market concepts',
      outcome: 'limitation',
      lesson: 'I have knowledge cutoffs and no real-time data access'
    },
    {
      id: 'failure-1',
      scenario: 'Solve complex mathematical proof',
      agentResponse: 'This proof requires verification by domain experts',
      outcome: 'failure',
      lesson: 'I may make mistakes with complex specialized tasks'
    },
    {
      id: 'success-2',
      scenario: 'Generate creative content',
      agentResponse: 'Created engaging story with requested elements',
      outcome: 'success',
      lesson: 'I can help with creative writing and ideation'
    }
  ]);

  const [progressMetrics, setProgressMetrics] = useState<ProgressMetrics>({
    stepsCompleted: 0,
    totalSteps: 6,
    featuresUnlocked: 2,
    trustScore: 25,
    practiceTime: 0,
    competencyLevel: 0
  });

  // Simulate onboarding progression
  useEffect(() => {
    if (stage === 'welcome') {
      const timer = setTimeout(() => {
        setStage('capabilities');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'capabilities') {
      const timer = setTimeout(() => {
        // Unlock intermediate features
        setCapabilities(prev => prev.map(cap =>
          cap.complexity === 'intermediate' ? { ...cap, unlocked: true } : cap
        ));
        setProgressMetrics(prev => ({
          ...prev,
          featuresUnlocked: 4,
          stepsCompleted: 2
        }));
        setStage('limitations');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'limitations') {
      const timer = setTimeout(() => {
        setStage('practice');
        setInteractionMode('practice');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'practice') {
      const timer = setTimeout(() => {
        // Mark some capabilities as practiced
        setCapabilities(prev => prev.map(cap =>
          cap.complexity === 'basic' ? { ...cap, practiced: true } : cap
        ));
        setProgressMetrics(prev => ({
          ...prev,
          practiceTime: 12,
          competencyLevel: 45,
          stepsCompleted: 4
        }));
        setStage('trust');
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (stage === 'trust') {
      const timer = setTimeout(() => {
        setTrustLevel('medium');
        setProgressMetrics(prev => ({
          ...prev,
          trustScore: 68,
          stepsCompleted: 5
        }));
        setStage('advanced');
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (stage === 'advanced') {
      const timer = setTimeout(() => {
        // Unlock all features
        setCapabilities(prev => prev.map(cap => ({ ...cap, unlocked: true })));
        setTrustLevel('high');
        setInteractionMode('independent');
        setProgressMetrics(prev => ({
          ...prev,
          featuresUnlocked: 6,
          trustScore: 85,
          competencyLevel: 78,
          stepsCompleted: 6
        }));
        setStage('complete');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const getStageContent = () => {
    switch (stage) {
      case 'welcome':
        return {
          title: 'Welcome to Your AI Assistant',
          description: 'I\'m here to help you work more efficiently. Let\'s explore what we can do together.',
          icon: <Sparkles className="w-8 h-8 text-blue-400" />
        };
      case 'capabilities':
        return {
          title: 'What I Can Do',
          description: 'I can answer questions, generate content, analyze information, and help with various tasks.',
          icon: <Brain className="w-8 h-8 text-purple-400" />
        };
      case 'limitations':
        return {
          title: 'Understanding My Limitations',
          description: 'I can\'t access real-time data, make purchases, or perform actions outside our conversation.',
          icon: <AlertCircle className="w-8 h-8 text-orange-400" />
        };
      case 'practice':
        return {
          title: 'Let\'s Practice Together',
          description: 'Try asking questions or requesting help with a task. I\'ll guide you through the process.',
          icon: <Target className="w-8 h-8 text-green-400" />
        };
      case 'trust':
        return {
          title: 'Building Trust Through Transparency',
          description: 'Let\'s explore scenarios where I excel and where I have limitations.',
          icon: <Shield className="w-8 h-8 text-cyan-400" />
        };
      case 'advanced':
        return {
          title: 'Advanced Features',
          description: 'You\'re ready to explore more complex capabilities and workflows.',
          icon: <Zap className="w-8 h-8 text-yellow-400" />
        };
      case 'complete':
        return {
          title: 'You\'re Ready!',
          description: 'You\'ve completed onboarding. Continue exploring at your own pace.',
          icon: <Award className="w-8 h-8 text-gold-400" />
        };
    }
  };

  const getTrustColor = () => {
    switch (trustLevel) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
    }
  };

  const getComplexityColor = (complexity: Capability['complexity']) => {
    switch (complexity) {
      case 'basic': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-blue-500/20 text-blue-400';
      case 'advanced': return 'bg-purple-500/20 text-purple-400';
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-400" />
          Onboarding and Education Patterns Demo
        </h3>
        <p className="text-gray-400">
          Progressive learning experience for building mental models and trust
        </p>
      </div>

      {/* Learning Path Selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Learning Path:</span>
          <div className="flex gap-2">
            {(['beginner', 'intermediate', 'advanced'] as LearningPath[]).map(path => (
              <button
                key={path}
                onClick={() => setLearningPath(path)}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  learningPath === path
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                {path}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Mode:</span>
          <span className={`px-2 py-1 rounded capitalize ${
            interactionMode === 'guided' ? 'bg-green-500/20 text-green-400' :
            interactionMode === 'practice' ? 'bg-blue-500/20 text-blue-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {interactionMode}
          </span>
        </div>
      </div>

      {/* Current Stage Display */}
      <div className="mb-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="text-center">
          {getStageContent().icon}
          <h4 className="text-xl font-semibold mt-3 mb-2">{getStageContent().title}</h4>
          <p className="text-gray-400">{getStageContent().description}</p>
        </div>

        {/* Stage-specific content */}
        {stage === 'practice' && (
          <div className="mt-4 p-4 bg-gray-700/50 rounded">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <PlayCircle className="w-4 h-4 text-blue-400" />
              Try this:
            </div>
            <p className="text-sm italic text-gray-400">
              "Help me write an email to my team about our project deadline"
            </p>
          </div>
        )}

        {stage === 'trust' && (
          <div className="mt-4 space-y-2">
            {trustScenarios.slice(0, 3).map(scenario => (
              <div key={scenario.id} className="p-3 bg-gray-700/50 rounded">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium">{scenario.scenario}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scenario.outcome === 'success' ? 'bg-green-500/20 text-green-400' :
                    scenario.outcome === 'limitation' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {scenario.outcome}
                  </span>
                </div>
                <p className="text-xs text-gray-400 italic mt-1">{scenario.lesson}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Capabilities Grid */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          Agent Capabilities
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {capabilities.map(cap => (
            <div
              key={cap.id}
              className={`p-3 bg-gray-800 rounded border ${
                cap.unlocked ? 'border-gray-600' : 'border-gray-700 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={cap.unlocked ? 'text-gray-300' : 'text-gray-600'}>
                    {cap.icon}
                  </span>
                  <span className="text-sm font-medium">{cap.name}</span>
                </div>
                {cap.unlocked ? (
                  cap.practiced ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-600" />
                  )
                ) : (
                  <div className="w-4 h-4 text-gray-600">🔒</div>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-2">{cap.description}</p>
              <span className={`text-xs px-2 py-0.5 rounded inline-block ${getComplexityColor(cap.complexity)}`}>
                {cap.complexity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Steps Progress */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Book className="w-4 h-4 text-cyan-400" />
          Learning Journey
        </h4>
        <div className="space-y-2">
          {learningSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index < progressMetrics.stepsCompleted
                  ? 'bg-green-500/20 text-green-400'
                  : index === progressMetrics.stepsCompleted
                  ? 'bg-blue-500/20 text-blue-400 animate-pulse'
                  : 'bg-gray-700 text-gray-500'
              }`}>
                {index < progressMetrics.stepsCompleted ? '✓' : index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{step.title}</span>
                  <span className="text-xs text-gray-500">{step.duration} min</span>
                </div>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust and Competency Indicators */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Trust Level</span>
            <Shield className={`w-4 h-4 ${getTrustColor()}`} />
          </div>
          <div className="text-2xl font-bold mb-2">
            <span className={getTrustColor()}>{progressMetrics.trustScore}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                trustLevel === 'high' ? 'bg-green-400' :
                trustLevel === 'medium' ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${progressMetrics.trustScore}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Competency</span>
            <GraduationCap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {progressMetrics.competencyLevel}%
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressMetrics.competencyLevel}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contextual Help */}
      {showTooltip && (
        <div className="mb-6 p-3 bg-blue-500/10 rounded border border-blue-500/30">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm text-blue-400 font-medium">Pro Tip</p>
              <p className="text-xs text-gray-300">
                You can always ask "What can you help me with?" to explore available capabilities
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-800 rounded border border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-400">
            {progressMetrics.stepsCompleted}/{progressMetrics.totalSteps}
          </div>
          <div className="text-xs text-gray-400">Steps Complete</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {progressMetrics.featuresUnlocked}
          </div>
          <div className="text-xs text-gray-400">Features Unlocked</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700 text-center">
          <div className="text-2xl font-bold text-cyan-400">
            {progressMetrics.practiceTime}m
          </div>
          <div className="text-xs text-gray-400">Practice Time</div>
        </div>
      </div>

      {/* Help Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="mt-4 w-full p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center gap-2 text-sm text-gray-300"
      >
        <HelpCircle className="w-4 h-4" />
        Need Help?
      </button>
    </div>
  );
}