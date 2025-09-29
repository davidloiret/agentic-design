'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  User,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Zap,
  Brain,
  Eye,
  Target,
  Sparkles,
  Settings,
  Activity,
  TrendingUp,
  Smartphone,
  Monitor,
  ChevronDown,
  Lock,
  Unlock
} from 'lucide-react';

// Types for adaptive patterns
type UserContext = {
  expertiseLevel: 'novice' | 'intermediate' | 'expert';
  cognitiveLoad: 'low' | 'medium' | 'high';
  accessibilityNeeds: {
    visualImpairment: boolean;
    motorImpairment: boolean;
    cognitiveSupport: boolean;
  };
  intent: 'quick-action' | 'detailed-work' | 'learning' | 'browsing';
  device: 'mobile' | 'tablet' | 'desktop';
};

type EnvironmentalContext = {
  lighting: 'bright' | 'normal' | 'dim';
  noiseLevel: 'quiet' | 'moderate' | 'noisy';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  networkSpeed: 'slow' | 'medium' | 'fast';
};

type AdaptationMode = 'automatic' | 'suggested' | 'manual';
type AdaptationPhase = 'detecting' | 'analyzing' | 'adapting' | 'learning' | 'stabilized';

interface Adaptation {
  id: string;
  type: 'layout' | 'content' | 'interaction' | 'visual' | 'assistance';
  description: string;
  reason: string;
  applied: boolean;
  userAccepted?: boolean;
}

interface InterfaceConfig {
  complexity: 'minimal' | 'standard' | 'advanced';
  density: 'comfortable' | 'cozy' | 'compact';
  colorScheme: 'light' | 'dark' | 'auto' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  animationSpeed: 'none' | 'reduced' | 'normal' | 'enhanced';
  assistanceLevel: 'none' | 'hints' | 'guided' | 'full';
}

export default function AdaptiveInterfacePatternsDemo() {
  const [phase, setPhase] = useState<AdaptationPhase>('detecting');
  const [adaptationMode, setAdaptationMode] = useState<AdaptationMode>('automatic');
  const [userOverride, setUserOverride] = useState(false);

  const [userContext, setUserContext] = useState<UserContext>({
    expertiseLevel: 'novice',
    cognitiveLoad: 'medium',
    accessibilityNeeds: {
      visualImpairment: false,
      motorImpairment: false,
      cognitiveSupport: false
    },
    intent: 'browsing',
    device: 'desktop'
  });

  const [environmentalContext, setEnvironmentalContext] = useState<EnvironmentalContext>({
    lighting: 'normal',
    noiseLevel: 'moderate',
    timeOfDay: 'afternoon',
    networkSpeed: 'fast'
  });

  const [interfaceConfig, setInterfaceConfig] = useState<InterfaceConfig>({
    complexity: 'standard',
    density: 'cozy',
    colorScheme: 'auto',
    fontSize: 'medium',
    animationSpeed: 'normal',
    assistanceLevel: 'hints'
  });

  const [adaptations, setAdaptations] = useState<Adaptation[]>([]);
  const [metrics, setMetrics] = useState({
    adaptationAccuracy: 88,
    userSatisfaction: 92,
    taskCompletion: 94,
    errorReduction: 76,
    engagementRate: 85,
    overrideRate: 12
  });

  // Simulate context detection and adaptation
  useEffect(() => {
    if (phase === 'detecting') {
      const timer = setTimeout(() => {
        setPhase('analyzing');

        // Detect context and propose adaptations
        const newAdaptations: Adaptation[] = [];

        // Based on expertise level
        if (userContext.expertiseLevel === 'novice') {
          newAdaptations.push({
            id: 'simplify-interface',
            type: 'layout',
            description: 'Simplified interface with fewer options',
            reason: 'Novice user detected - reducing complexity',
            applied: adaptationMode === 'automatic'
          });
        } else if (userContext.expertiseLevel === 'expert') {
          newAdaptations.push({
            id: 'advanced-features',
            type: 'content',
            description: 'Show advanced features and shortcuts',
            reason: 'Expert user - exposing power features',
            applied: adaptationMode === 'automatic'
          });
        }

        // Based on cognitive load
        if (userContext.cognitiveLoad === 'high') {
          newAdaptations.push({
            id: 'reduce-distractions',
            type: 'visual',
            description: 'Hide non-essential elements',
            reason: 'High cognitive load - minimizing distractions',
            applied: adaptationMode === 'automatic'
          });
        }

        // Based on accessibility needs
        if (userContext.accessibilityNeeds.visualImpairment) {
          newAdaptations.push({
            id: 'increase-contrast',
            type: 'visual',
            description: 'High contrast mode with larger text',
            reason: 'Visual accessibility needs detected',
            applied: adaptationMode === 'automatic'
          });
        }

        // Based on environmental context
        if (environmentalContext.lighting === 'dim') {
          newAdaptations.push({
            id: 'dark-mode',
            type: 'visual',
            description: 'Switch to dark theme',
            reason: 'Low ambient light detected',
            applied: adaptationMode === 'automatic'
          });
        }

        // Based on device
        if (userContext.device === 'mobile') {
          newAdaptations.push({
            id: 'mobile-optimize',
            type: 'layout',
            description: 'Touch-optimized controls and layout',
            reason: 'Mobile device - adapting for touch',
            applied: adaptationMode === 'automatic'
          });
        }

        setAdaptations(newAdaptations);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'analyzing') {
      const timer = setTimeout(() => {
        setPhase('adapting');

        // Apply adaptations
        if (!userOverride) {
          const newConfig: InterfaceConfig = { ...interfaceConfig };

          if (userContext.expertiseLevel === 'novice') {
            newConfig.complexity = 'minimal';
            newConfig.assistanceLevel = 'guided';
          } else if (userContext.expertiseLevel === 'expert') {
            newConfig.complexity = 'advanced';
            newConfig.assistanceLevel = 'none';
          }

          if (userContext.cognitiveLoad === 'high') {
            newConfig.animationSpeed = 'reduced';
            newConfig.density = 'comfortable';
          }

          if (userContext.accessibilityNeeds.visualImpairment) {
            newConfig.fontSize = 'large';
            newConfig.colorScheme = 'high-contrast';
          }

          if (environmentalContext.lighting === 'dim') {
            newConfig.colorScheme = 'dark';
          }

          if (userContext.device === 'mobile') {
            newConfig.density = 'comfortable';
            newConfig.fontSize = 'large';
          }

          setInterfaceConfig(newConfig);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'adapting') {
      const timer = setTimeout(() => {
        setPhase('learning');

        // Update metrics based on adaptations
        setMetrics(prev => ({
          adaptationAccuracy: Math.min(95, prev.adaptationAccuracy + 2),
          userSatisfaction: Math.min(96, prev.userSatisfaction + 1),
          taskCompletion: Math.min(98, prev.taskCompletion + 1),
          errorReduction: Math.min(85, prev.errorReduction + 3),
          engagementRate: Math.min(92, prev.engagementRate + 2),
          overrideRate: Math.max(8, prev.overrideRate - 1)
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'learning') {
      const timer = setTimeout(() => {
        setPhase('stabilized');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, userContext, environmentalContext, interfaceConfig, adaptationMode, userOverride]);

  const toggleAdaptation = (adaptationId: string) => {
    setAdaptations(prev => prev.map(a =>
      a.id === adaptationId ? { ...a, applied: !a.applied, userAccepted: !a.applied } : a
    ));
  };

  const getDeviceIcon = () => {
    switch (userContext.device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Smartphone className="w-4 h-4 rotate-90" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getLightingIcon = () => {
    switch (environmentalContext.lighting) {
      case 'bright': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'dim': return <Moon className="w-4 h-4 text-blue-400" />;
      default: return <Sun className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-cyan-400" />
          Adaptive Interface Patterns Demo
        </h3>
        <p className="text-gray-400">
          Dynamic UI/UX adaptation based on user context and preferences
        </p>
      </div>

      {/* Adaptation Mode Control */}
      <div className="mb-6 flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Adaptation Mode:</span>
          <div className="flex gap-2">
            {(['automatic', 'suggested', 'manual'] as AdaptationMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setAdaptationMode(mode)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  adaptationMode === mode
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setUserOverride(!userOverride)}
          className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
            userOverride
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          {userOverride ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          {userOverride ? 'Overridden' : 'Auto'}
        </button>
      </div>

      {/* Context Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* User Context */}
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            User Context
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Expertise</span>
              <span className="text-gray-300 capitalize">{userContext.expertiseLevel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Cognitive Load</span>
              <span className={`text-gray-300 ${
                userContext.cognitiveLoad === 'high' ? 'text-orange-400' :
                userContext.cognitiveLoad === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {userContext.cognitiveLoad}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Intent</span>
              <span className="text-gray-300">{userContext.intent.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Device</span>
              <span className="flex items-center gap-1">
                {getDeviceIcon()}
                <span className="text-gray-300 capitalize">{userContext.device}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Context */}
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            Environment
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Lighting</span>
              <span className="flex items-center gap-1">
                {getLightingIcon()}
                <span className="text-gray-300 capitalize">{environmentalContext.lighting}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Noise Level</span>
              <span className="flex items-center gap-1">
                {environmentalContext.noiseLevel === 'quiet' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-gray-300 capitalize">{environmentalContext.noiseLevel}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Time</span>
              <span className="text-gray-300 capitalize">{environmentalContext.timeOfDay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Network</span>
              <span className="text-gray-300 capitalize">{environmentalContext.networkSpeed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Adaptations */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Active Adaptations
        </h4>
        <div className="space-y-2">
          {adaptations.map(adaptation => (
            <div key={adaptation.id} className="flex items-start justify-between p-2 bg-gray-700/50 rounded">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    adaptation.applied ? 'bg-green-400' : 'bg-gray-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-300">
                    {adaptation.description}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-4">{adaptation.reason}</p>
              </div>
              {adaptationMode === 'suggested' && (
                <button
                  onClick={() => toggleAdaptation(adaptation.id)}
                  className={`px-2 py-1 rounded text-xs ${
                    adaptation.applied
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {adaptation.applied ? 'Applied' : 'Apply'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Interface Configuration */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-cyan-400" />
          Interface Configuration
        </h4>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-gray-400 block mb-1">Complexity</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.complexity === 'minimal' ? 'bg-green-500/20 text-green-400' :
              interfaceConfig.complexity === 'standard' ? 'bg-blue-500/20 text-blue-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {interfaceConfig.complexity}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Density</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.density === 'comfortable' ? 'bg-green-500/20 text-green-400' :
              interfaceConfig.density === 'cozy' ? 'bg-blue-500/20 text-blue-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {interfaceConfig.density}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Theme</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.colorScheme === 'light' ? 'bg-yellow-500/20 text-yellow-400' :
              interfaceConfig.colorScheme === 'dark' ? 'bg-gray-600 text-gray-300' :
              interfaceConfig.colorScheme === 'high-contrast' ? 'bg-purple-500/20 text-purple-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {interfaceConfig.colorScheme}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Font Size</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.fontSize === 'small' ? 'bg-gray-600 text-gray-300' :
              interfaceConfig.fontSize === 'medium' ? 'bg-blue-500/20 text-blue-400' :
              interfaceConfig.fontSize === 'large' ? 'bg-green-500/20 text-green-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {interfaceConfig.fontSize}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Animations</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.animationSpeed === 'none' ? 'bg-gray-600 text-gray-300' :
              interfaceConfig.animationSpeed === 'reduced' ? 'bg-yellow-500/20 text-yellow-400' :
              interfaceConfig.animationSpeed === 'normal' ? 'bg-blue-500/20 text-blue-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {interfaceConfig.animationSpeed}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Assistance</span>
            <span className={`px-2 py-1 rounded text-xs inline-block ${
              interfaceConfig.assistanceLevel === 'none' ? 'bg-gray-600 text-gray-300' :
              interfaceConfig.assistanceLevel === 'hints' ? 'bg-blue-500/20 text-blue-400' :
              interfaceConfig.assistanceLevel === 'guided' ? 'bg-green-500/20 text-green-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {interfaceConfig.assistanceLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Adaptation Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Accuracy</span>
            <Target className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">{metrics.adaptationAccuracy}%</div>
          <div className="text-xs text-gray-500">Correct adaptations</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Satisfaction</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">{metrics.userSatisfaction}%</div>
          <div className="text-xs text-gray-500">User preference</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Override</span>
            <Settings className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-orange-400">{metrics.overrideRate}%</div>
          <div className="text-xs text-gray-500">Manual changes</div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {['detecting', 'analyzing', 'adapting', 'learning', 'stabilized'].map((p, i) => (
            <div key={p} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                phase === p ? 'bg-cyan-500 text-white' :
                i < ['detecting', 'analyzing', 'adapting', 'learning', 'stabilized'].indexOf(phase)
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-gray-700 text-gray-500'
              }`}>
                {i + 1}
              </div>
              {i < 4 && (
                <div className={`w-8 h-0.5 ${
                  i < ['detecting', 'analyzing', 'adapting', 'learning', 'stabilized'].indexOf(phase)
                    ? 'bg-cyan-500/40'
                    : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}