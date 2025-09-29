'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Eye, Ear, Hand, Brain, Keyboard, Mic, Volume2, Type,
  Contrast, ZoomIn, Monitor, Smartphone, Headphones,
  AlertCircle, Check, Settings, User, MessageSquare,
  ChevronDown, Play, Pause, SkipForward, Menu, X
} from 'lucide-react';

// Types
type AccessibilityNeed = 'vision' | 'hearing' | 'motor' | 'cognitive' | 'speech';
type InputModality = 'keyboard' | 'mouse' | 'voice' | 'touch' | 'switch' | 'eye-tracking';
type OutputModality = 'visual' | 'audio' | 'haptic' | 'braille';
type ContrastLevel = 'normal' | 'high' | 'ultra-high';
type TextSize = 'small' | 'medium' | 'large' | 'extra-large';
type ComplexityLevel = 'simple' | 'standard' | 'detailed';

interface AccessibilityProfile {
  needs: AccessibilityNeed[];
  preferredInput: InputModality[];
  preferredOutput: OutputModality[];
  contrastLevel: ContrastLevel;
  textSize: TextSize;
  reduceMotion: boolean;
  useSimpleLanguage: boolean;
  showCaptions: boolean;
  enableVoice: boolean;
  keyboardOnly: boolean;
  screenReaderMode: boolean;
}

interface WCAGCriterion {
  id: string;
  level: 'A' | 'AA' | 'AAA';
  name: string;
  category: string;
  status: 'pass' | 'fail' | 'partial';
  description: string;
}

interface AssistiveTechnology {
  id: string;
  name: string;
  type: 'screen-reader' | 'voice-control' | 'switch' | 'eye-tracker' | 'magnifier';
  icon: React.ReactNode;
  active: boolean;
  compatibility: number;
}

interface AccessibilityIssue {
  id: string;
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  element: string;
  issue: string;
  wcagCriteria: string;
  suggestion: string;
  fixed: boolean;
}

const AccessibilityAgentDesignDemo = () => {
  const [phase, setPhase] = useState<'detection' | 'adaptation' | 'multimodal' | 'assistive' | 'validation' | 'complete'>('detection');
  const [profile, setProfile] = useState<AccessibilityProfile>({
    needs: [],
    preferredInput: ['keyboard', 'mouse'],
    preferredOutput: ['visual'],
    contrastLevel: 'normal',
    textSize: 'medium',
    reduceMotion: false,
    useSimpleLanguage: false,
    showCaptions: false,
    enableVoice: false,
    keyboardOnly: false,
    screenReaderMode: false
  });

  const [wcagCompliance, setWcagCompliance] = useState<WCAGCriterion[]>([
    { id: '1.1.1', level: 'A', name: 'Non-text Content', category: 'Perceivable', status: 'pass', description: 'All images have alt text' },
    { id: '1.4.3', level: 'AA', name: 'Contrast (Minimum)', category: 'Perceivable', status: 'partial', description: 'Text contrast ratio 4.5:1' },
    { id: '2.1.1', level: 'A', name: 'Keyboard', category: 'Operable', status: 'pass', description: 'All functionality keyboard accessible' },
    { id: '2.4.7', level: 'AA', name: 'Focus Visible', category: 'Operable', status: 'pass', description: 'Keyboard focus indicator visible' },
    { id: '3.1.2', level: 'AA', name: 'Language of Parts', category: 'Understandable', status: 'pass', description: 'Language changes identified' },
    { id: '4.1.2', level: 'A', name: 'Name, Role, Value', category: 'Robust', status: 'partial', description: 'ARIA attributes properly set' }
  ]);

  const [assistiveTech, setAssistiveTech] = useState<AssistiveTechnology[]>([
    { id: 'jaws', name: 'JAWS', type: 'screen-reader', icon: <Volume2 className="w-4 h-4" />, active: false, compatibility: 95 },
    { id: 'nvda', name: 'NVDA', type: 'screen-reader', icon: <Volume2 className="w-4 h-4" />, active: false, compatibility: 98 },
    { id: 'dragon', name: 'Dragon', type: 'voice-control', icon: <Mic className="w-4 h-4" />, active: false, compatibility: 90 },
    { id: 'switch', name: 'Switch Control', type: 'switch', icon: <Hand className="w-4 h-4" />, active: false, compatibility: 85 },
    { id: 'tobii', name: 'Tobii Eye Tracker', type: 'eye-tracker', icon: <Eye className="w-4 h-4" />, active: false, compatibility: 80 }
  ]);

  const [issues, setIssues] = useState<AccessibilityIssue[]>([
    { id: '1', severity: 'critical', element: 'Submit button', issue: 'Missing accessible name', wcagCriteria: '4.1.2', suggestion: 'Add aria-label or visible text', fixed: false },
    { id: '2', severity: 'serious', element: 'Error message', issue: 'Color only indication', wcagCriteria: '1.4.1', suggestion: 'Add icon or text indicator', fixed: false },
    { id: '3', severity: 'moderate', element: 'Modal dialog', issue: 'Focus not trapped', wcagCriteria: '2.1.2', suggestion: 'Implement focus trap', fixed: false },
    { id: '4', severity: 'minor', element: 'Progress bar', issue: 'Missing live region', wcagCriteria: '4.1.3', suggestion: 'Add aria-live attribute', fixed: false }
  ]);

  const [currentFocus, setCurrentFocus] = useState(0);
  const [announcement, setAnnouncement] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [simulateScreenReader, setSimulateScreenReader] = useState(false);
  const screenReaderRef = useRef<HTMLDivElement>(null);

  // Phase progression
  useEffect(() => {
    const timer = setTimeout(() => {
      const phases: typeof phase[] = ['detection', 'adaptation', 'multimodal', 'assistive', 'validation', 'complete'];
      const currentIndex = phases.indexOf(phase);
      if (currentIndex < phases.length - 1) {
        setPhase(phases[currentIndex + 1]);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [phase]);

  // Simulate screen reader announcements
  useEffect(() => {
    if (!simulateScreenReader) return;

    const announcements = [
      'Navigation landmark, main menu',
      'Button, Submit, clickable',
      'Heading level 1, Welcome to AI Assistant',
      'Text input, Enter your query, required',
      'Region, Chat conversation'
    ];

    const timer = setInterval(() => {
      setAnnouncement(announcements[Math.floor(Math.random() * announcements.length)]);
    }, 3000);

    return () => clearInterval(timer);
  }, [simulateScreenReader]);

  // Keyboard navigation simulation
  useEffect(() => {
    if (!profile.keyboardOnly) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setCurrentFocus(prev => (prev + 1) % 10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [profile.keyboardOnly]);

  const toggleNeed = (need: AccessibilityNeed) => {
    setProfile(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));

    // Auto-adjust settings based on needs
    if (!profile.needs.includes(need)) {
      if (need === 'vision') {
        setProfile(prev => ({ ...prev, contrastLevel: 'high', textSize: 'large', screenReaderMode: true }));
      } else if (need === 'motor') {
        setProfile(prev => ({ ...prev, keyboardOnly: true, preferredInput: ['keyboard', 'voice'] }));
      } else if (need === 'cognitive') {
        setProfile(prev => ({ ...prev, useSimpleLanguage: true, reduceMotion: true }));
      } else if (need === 'hearing') {
        setProfile(prev => ({ ...prev, showCaptions: true, preferredOutput: ['visual', 'haptic'] }));
      }
    }
  };

  const toggleAssistiveTech = (techId: string) => {
    setAssistiveTech(prev => prev.map(at =>
      at.id === techId ? { ...at, active: !at.active } : at
    ));
  };

  const fixIssue = (issueId: string) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId ? { ...issue, fixed: true } : issue
    ));

    // Update WCAG compliance
    const fixedIssue = issues.find(i => i.id === issueId);
    if (fixedIssue) {
      setWcagCompliance(prev => prev.map(criterion =>
        criterion.id === fixedIssue.wcagCriteria.split(' ')[0]
          ? { ...criterion, status: 'pass' }
          : criterion
      ));
    }
  };

  const getContrastClass = () => {
    switch (profile.contrastLevel) {
      case 'high': return 'contrast-125';
      case 'ultra-high': return 'contrast-150';
      default: return '';
    }
  };

  const getTextSizeClass = () => {
    switch (profile.textSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-sm';
    }
  };

  const getSeverityColor = (severity: AccessibilityIssue['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'serious': return 'text-orange-500';
      case 'moderate': return 'text-yellow-500';
      case 'minor': return 'text-blue-500';
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg ${getContrastClass()}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className={`text-2xl font-bold text-gray-100 mb-2 ${getTextSizeClass()}`}>
          Accessibility in Agent Design Demo
        </h2>
        <p className={`text-gray-400 ${getTextSizeClass()}`}>
          Universal design patterns for accessible AI interfaces
        </p>
      </div>

      {/* Phase Indicator */}
      <div className="flex justify-between mb-6 bg-gray-800 rounded-lg p-4" role="navigation" aria-label="Demo phases">
        {(['detection', 'adaptation', 'multimodal', 'assistive', 'validation', 'complete'] as const).map((p) => (
          <div
            key={p}
            className={`flex items-center ${phase === p ? 'text-blue-400' : 'text-gray-500'}`}
            aria-current={phase === p ? 'step' : undefined}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
              ${phase === p ? 'border-blue-400 bg-blue-400/20' : 'border-gray-600'}`}>
              {phase === p ? '●' : '○'}
            </div>
            <span className={`ml-2 text-xs ${getTextSizeClass()}`}>{p}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accessibility Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Needs Detection */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <User className="w-5 h-5 mr-2 text-blue-400" />
              Accessibility Needs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'vision' as AccessibilityNeed, icon: <Eye className="w-5 h-5" />, label: 'Vision' },
                { id: 'hearing' as AccessibilityNeed, icon: <Ear className="w-5 h-5" />, label: 'Hearing' },
                { id: 'motor' as AccessibilityNeed, icon: <Hand className="w-5 h-5" />, label: 'Motor' },
                { id: 'cognitive' as AccessibilityNeed, icon: <Brain className="w-5 h-5" />, label: 'Cognitive' },
                { id: 'speech' as AccessibilityNeed, icon: <Mic className="w-5 h-5" />, label: 'Speech' }
              ].map((need) => (
                <button
                  key={need.id}
                  onClick={() => toggleNeed(need.id)}
                  className={`flex items-center justify-center p-4 rounded-lg transition-all
                    ${profile.needs.includes(need.id)
                      ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-400'
                      : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'}`}
                  aria-pressed={profile.needs.includes(need.id)}
                  aria-label={`Toggle ${need.label} accessibility support`}
                >
                  {need.icon}
                  <span className={`ml-2 ${getTextSizeClass()}`}>{need.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interface Adaptations */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <Settings className="w-5 h-5 mr-2 text-green-400" />
              Interface Adaptations
            </h3>
            <div className="space-y-4">
              {/* Visual Adaptations */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className={`font-medium text-gray-100 mb-3 ${getTextSizeClass()}`}>Visual</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-gray-400 block mb-1 ${getTextSizeClass()}`}>Contrast</label>
                    <select
                      value={profile.contrastLevel}
                      onChange={(e) => setProfile(prev => ({ ...prev, contrastLevel: e.target.value as ContrastLevel }))}
                      className={`w-full bg-gray-600 text-gray-100 rounded px-3 py-2 ${getTextSizeClass()}`}
                      aria-label="Select contrast level"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="ultra-high">Ultra High</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-gray-400 block mb-1 ${getTextSizeClass()}`}>Text Size</label>
                    <select
                      value={profile.textSize}
                      onChange={(e) => setProfile(prev => ({ ...prev, textSize: e.target.value as TextSize }))}
                      className={`w-full bg-gray-600 text-gray-100 rounded px-3 py-2 ${getTextSizeClass()}`}
                      aria-label="Select text size"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Input Modalities */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className={`font-medium text-gray-100 mb-3 ${getTextSizeClass()}`}>Input Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'keyboard', icon: <Keyboard className="w-4 h-4" />, label: 'Keyboard' },
                    { id: 'voice', icon: <Mic className="w-4 h-4" />, label: 'Voice' },
                    { id: 'touch', icon: <Smartphone className="w-4 h-4" />, label: 'Touch' },
                    { id: 'eye-tracking', icon: <Eye className="w-4 h-4" />, label: 'Eye Tracking' }
                  ].map((input) => (
                    <button
                      key={input.id}
                      onClick={() => {
                        const newInput = input.id as InputModality;
                        setProfile(prev => ({
                          ...prev,
                          preferredInput: prev.preferredInput.includes(newInput)
                            ? prev.preferredInput.filter(i => i !== newInput)
                            : [...prev.preferredInput, newInput]
                        }));
                      }}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all
                        ${profile.preferredInput.includes(input.id as InputModality)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-600 text-gray-400'}`}
                      aria-pressed={profile.preferredInput.includes(input.id as InputModality)}
                    >
                      {input.icon}
                      <span className={`ml-1 ${getTextSizeClass()}`}>{input.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cognitive Support */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className={`font-medium text-gray-100 mb-3 ${getTextSizeClass()}`}>Cognitive Support</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.useSimpleLanguage}
                      onChange={(e) => setProfile(prev => ({ ...prev, useSimpleLanguage: e.target.checked }))}
                      className="mr-2"
                      aria-label="Use simple language"
                    />
                    <span className={`text-gray-300 ${getTextSizeClass()}`}>Use simple language</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.reduceMotion}
                      onChange={(e) => setProfile(prev => ({ ...prev, reduceMotion: e.target.checked }))}
                      className="mr-2"
                      aria-label="Reduce motion"
                    />
                    <span className={`text-gray-300 ${getTextSizeClass()}`}>Reduce motion</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.showCaptions}
                      onChange={(e) => setProfile(prev => ({ ...prev, showCaptions: e.target.checked }))}
                      className="mr-2"
                      aria-label="Show captions"
                    />
                    <span className={`text-gray-300 ${getTextSizeClass()}`}>Show captions</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Assistive Technology Integration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <Headphones className="w-5 h-5 mr-2 text-purple-400" />
              Assistive Technology
            </h3>
            <div className="space-y-3">
              {assistiveTech.map((tech) => (
                <div key={tech.id} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">{tech.icon}</span>
                    <div>
                      <h4 className={`font-medium text-gray-100 ${getTextSizeClass()}`}>{tech.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs text-gray-400 ${getTextSizeClass()}`}>Compatibility:</span>
                        <div className="w-20 bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${tech.compatibility}%` }}
                            role="progressbar"
                            aria-valuenow={tech.compatibility}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <span className={`text-xs text-gray-400 ${getTextSizeClass()}`}>{tech.compatibility}%</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAssistiveTech(tech.id)}
                    className={`px-3 py-1 rounded transition-all ${getTextSizeClass()}
                      ${tech.active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600 text-gray-400'}`}
                    aria-pressed={tech.active}
                  >
                    {tech.active ? 'Active' : 'Test'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Validation & Compliance */}
        <div className="space-y-6">
          {/* WCAG Compliance */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <Check className="w-5 h-5 mr-2 text-green-400" />
              WCAG Compliance
            </h3>
            <div className="space-y-2">
              {wcagCompliance.map((criterion) => (
                <div key={criterion.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2
                      ${criterion.status === 'pass' ? 'bg-green-400' :
                        criterion.status === 'partial' ? 'bg-yellow-400' : 'bg-red-400'}`}
                    />
                    <span className={`text-gray-300 ${getTextSizeClass()}`}>
                      {criterion.id} {criterion.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${getTextSizeClass()}
                    ${criterion.level === 'A' ? 'bg-blue-500/20 text-blue-400' :
                      criterion.level === 'AA' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'}`}>
                    {criterion.level}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((wcagCompliance.filter(c => c.status === 'pass').length / wcagCompliance.length) * 100)}%
                </div>
                <div className={`text-gray-400 ${getTextSizeClass()}`}>Compliant</div>
              </div>
            </div>
          </div>

          {/* Issues Found */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              Accessibility Issues
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {issues.filter(i => !i.fixed).map((issue) => (
                <div key={issue.id} className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`${getSeverityColor(issue.severity)} font-medium ${getTextSizeClass()}`}>
                        {issue.severity}
                      </span>
                      <p className={`text-gray-300 mt-1 ${getTextSizeClass()}`}>{issue.issue}</p>
                      <p className={`text-gray-500 text-xs mt-1 ${getTextSizeClass()}`}>
                        Element: {issue.element}
                      </p>
                    </div>
                    <button
                      onClick={() => fixIssue(issue.id)}
                      className={`ml-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-all ${getTextSizeClass()}`}
                      aria-label={`Fix ${issue.issue}`}
                    >
                      Fix
                    </button>
                  </div>
                  <p className={`text-gray-400 text-xs ${getTextSizeClass()}`}>
                    💡 {issue.suggestion}
                  </p>
                </div>
              ))}
              {issues.filter(i => !i.fixed).length === 0 && (
                <div className="text-center text-green-400 py-4">
                  ✓ All issues resolved!
                </div>
              )}
            </div>
          </div>

          {/* Screen Reader Simulation */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className={`text-lg font-semibold text-gray-100 mb-4 flex items-center ${getTextSizeClass()}`}>
              <Volume2 className="w-5 h-5 mr-2 text-blue-400" />
              Screen Reader
            </h3>
            <button
              onClick={() => setSimulateScreenReader(!simulateScreenReader)}
              className={`w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all mb-3 ${getTextSizeClass()}`}
              aria-pressed={simulateScreenReader}
            >
              {simulateScreenReader ? <Pause className="w-4 h-4 inline mr-2" /> : <Play className="w-4 h-4 inline mr-2" />}
              {simulateScreenReader ? 'Stop' : 'Start'} Simulation
            </button>
            {simulateScreenReader && (
              <div
                className="bg-gray-700/50 rounded-lg p-3 min-h-[60px]"
                role="log"
                aria-live="polite"
                aria-label="Screen reader output"
                ref={screenReaderRef}
              >
                <p className={`text-green-400 font-mono ${getTextSizeClass()}`}>{announcement || 'Waiting for content...'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Focus Indicator */}
      {profile.keyboardOnly && (
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className={`text-sm font-semibold text-gray-400 mb-2 ${getTextSizeClass()}`}>Keyboard Navigation Active</h3>
          <div className="flex gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded flex items-center justify-center transition-all
                  ${currentFocus === i
                    ? 'ring-2 ring-blue-400 bg-blue-500/20 text-blue-400'
                    : 'bg-gray-700 text-gray-500'}`}
                tabIndex={currentFocus === i ? 0 : -1}
                aria-label={`Focus item ${i + 1}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className={`text-gray-500 text-xs mt-2 ${getTextSizeClass()}`}>Press Tab to navigate</p>
        </div>
      )}

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {wcagCompliance.filter(c => c.status === 'pass').length}/{wcagCompliance.length}
          </div>
          <div className={`text-gray-400 ${getTextSizeClass()}`}>WCAG Criteria Met</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {assistiveTech.filter(at => at.active).length}
          </div>
          <div className={`text-gray-400 ${getTextSizeClass()}`}>AT Active</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {profile.preferredInput.length}
          </div>
          <div className={`text-gray-400 ${getTextSizeClass()}`}>Input Modes</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {issues.filter(i => i.fixed).length}/{issues.length}
          </div>
          <div className={`text-gray-400 ${getTextSizeClass()}`}>Issues Fixed</div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityAgentDesignDemo;