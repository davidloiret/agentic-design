'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  XCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Save,
  Undo,
  CheckCircle,
  WifiOff,
  Database,
  Lock,
  Clock,
  ChevronDown,
  ChevronRight,
  Shield,
  HelpCircle,
  Copy
} from 'lucide-react';

// Types for error handling patterns
type ErrorSeverity = 'critical' | 'warning' | 'info' | 'success';
type ErrorCategory = 'network' | 'validation' | 'permission' | 'system' | 'data';
type RecoveryStrategy = 'automatic' | 'manual' | 'guided' | 'none';
type DisplayMode = 'inline' | 'tooltip' | 'modal' | 'banner';
type ErrorPhase = 'detection' | 'classification' | 'communication' | 'recovery' | 'prevention';

interface ErrorEvent {
  id: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  title: string;
  problem: string;
  cause: string;
  solution: string;
  technicalDetails?: string;
  recoveryStrategy: RecoveryStrategy;
  displayMode: DisplayMode;
  timestamp: number;
  resolved: boolean;
  retryCount: number;
  maxRetries: number;
}

interface RecoveryOption {
  id: string;
  label: string;
  description: string;
  action: () => void;
  type: 'primary' | 'secondary' | 'danger';
}

interface ContextState {
  formData: Record<string, any>;
  workInProgress: string;
  preferences: Record<string, any>;
  sessionId: string;
}

export default function ErrorHandlingRecoveryPatternsDemo() {
  const [phase, setPhase] = useState<ErrorPhase>('detection');
  const [currentError, setCurrentError] = useState<ErrorEvent | null>(null);
  const [errorHistory, setErrorHistory] = useState<ErrorEvent[]>([]);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [preventionEnabled, setPreventionEnabled] = useState(true);

  const [contextState, setContextState] = useState<ContextState>({
    formData: {
      username: 'john.doe',
      email: 'john@example.com',
      message: 'This is my important work that should not be lost...'
    },
    workInProgress: 'Draft content saved at 10:45 AM',
    preferences: {
      autoSave: true,
      darkMode: false,
      notifications: true
    },
    sessionId: 'sess_abc123'
  });

  const [metrics, setMetrics] = useState({
    recoveryRate: 87,
    resolutionTime: 4.2,
    contextPreserved: 94,
    comprehension: 91,
    preventionEffectiveness: 82,
    supportReduction: 67
  });

  // Simulate error scenarios
  useEffect(() => {
    if (phase === 'detection') {
      const timer = setTimeout(() => {
        // Simulate network error
        const error: ErrorEvent = {
          id: 'err-1',
          severity: 'warning',
          category: 'network',
          title: 'Connection Issue',
          problem: 'Unable to save your changes',
          cause: 'The network connection was lost temporarily',
          solution: 'We\'ll automatically retry when connection is restored. Your work has been preserved locally.',
          technicalDetails: 'Error: NetworkError at XMLHttpRequest (timeout after 30000ms)\nEndpoint: /api/v1/save\nStatus: ERR_NETWORK_FAILURE',
          recoveryStrategy: 'automatic',
          displayMode: 'banner',
          timestamp: Date.now(),
          resolved: false,
          retryCount: 0,
          maxRetries: 3
        };
        setCurrentError(error);
        setPhase('classification');
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'classification') {
      const timer = setTimeout(() => {
        setPhase('communication');
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'communication') {
      const timer = setTimeout(() => {
        setPhase('recovery');
        // Start automatic recovery
        if (currentError?.recoveryStrategy === 'automatic') {
          startAutoRecovery();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'recovery') {
      const timer = setTimeout(() => {
        setPhase('prevention');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const startAutoRecovery = () => {
    setIsRecovering(true);
    let retries = 0;
    const retryInterval = setInterval(() => {
      retries++;
      setCurrentError(prev => prev ? {
        ...prev,
        retryCount: retries
      } : null);

      if (retries >= 3) {
        clearInterval(retryInterval);
        setIsRecovering(false);
        setCurrentError(prev => prev ? {
          ...prev,
          resolved: true
        } : null);
        setErrorHistory(prev => currentError ? [...prev, { ...currentError, resolved: true }] : prev);

        // Update metrics
        setMetrics(prev => ({
          ...prev,
          recoveryRate: Math.min(95, prev.recoveryRate + 2),
          resolutionTime: Math.max(2.5, prev.resolutionTime - 0.3)
        }));
      }
    }, 1500);
  };

  const triggerError = (category: ErrorCategory) => {
    const errors: Record<ErrorCategory, ErrorEvent> = {
      network: {
        id: `err-${Date.now()}`,
        severity: 'warning',
        category: 'network',
        title: 'Connection Lost',
        problem: 'Cannot reach the server',
        cause: 'Network connectivity issue or server is down',
        solution: 'Check your internet connection and try again',
        recoveryStrategy: 'automatic',
        displayMode: 'banner',
        timestamp: Date.now(),
        resolved: false,
        retryCount: 0,
        maxRetries: 3
      },
      validation: {
        id: `err-${Date.now()}`,
        severity: 'info',
        category: 'validation',
        title: 'Invalid Input',
        problem: 'Email address format is incorrect',
        cause: 'Missing @ symbol in email field',
        solution: 'Please enter a valid email address (e.g., name@example.com)',
        recoveryStrategy: 'manual',
        displayMode: 'inline',
        timestamp: Date.now(),
        resolved: false,
        retryCount: 0,
        maxRetries: 0
      },
      permission: {
        id: `err-${Date.now()}`,
        severity: 'critical',
        category: 'permission',
        title: 'Access Denied',
        problem: 'You don\'t have permission to perform this action',
        cause: 'Your account role doesn\'t include this capability',
        solution: 'Contact your administrator to request access',
        recoveryStrategy: 'guided',
        displayMode: 'modal',
        timestamp: Date.now(),
        resolved: false,
        retryCount: 0,
        maxRetries: 0
      },
      system: {
        id: `err-${Date.now()}`,
        severity: 'critical',
        category: 'system',
        title: 'System Error',
        problem: 'An unexpected error occurred',
        cause: 'Internal system failure',
        solution: 'We\'ve been notified and are working on a fix. Please try again later.',
        technicalDetails: 'Stack trace: ReferenceError: undefined variable\nat processData() line 42\nat main() line 15',
        recoveryStrategy: 'manual',
        displayMode: 'modal',
        timestamp: Date.now(),
        resolved: false,
        retryCount: 0,
        maxRetries: 0
      },
      data: {
        id: `err-${Date.now()}`,
        severity: 'warning',
        category: 'data',
        title: 'Data Sync Issue',
        problem: 'Some changes may not be synchronized',
        cause: 'Conflicting updates from multiple sources',
        solution: 'Review and merge changes manually',
        recoveryStrategy: 'guided',
        displayMode: 'banner',
        timestamp: Date.now(),
        resolved: false,
        retryCount: 0,
        maxRetries: 1
      }
    };

    const error = errors[category];
    setCurrentError(error);
    setPhase('communication');
  };

  const getRecoveryOptions = (error: ErrorEvent): RecoveryOption[] => {
    switch (error.recoveryStrategy) {
      case 'automatic':
        return [
          {
            id: 'retry',
            label: 'Retry Now',
            description: 'Attempt to reconnect immediately',
            action: () => startAutoRecovery(),
            type: 'primary'
          },
          {
            id: 'save-local',
            label: 'Save Locally',
            description: 'Keep a local copy until connection restored',
            action: () => console.log('Saving locally...'),
            type: 'secondary'
          }
        ];
      case 'manual':
        return [
          {
            id: 'fix',
            label: 'Fix Issue',
            description: 'Correct the problem and try again',
            action: () => setCurrentError(null),
            type: 'primary'
          },
          {
            id: 'help',
            label: 'Get Help',
            description: 'View documentation or contact support',
            action: () => console.log('Opening help...'),
            type: 'secondary'
          }
        ];
      case 'guided':
        return [
          {
            id: 'walkthrough',
            label: 'Start Walkthrough',
            description: 'Step-by-step guide to resolve this issue',
            action: () => console.log('Starting walkthrough...'),
            type: 'primary'
          },
          {
            id: 'contact',
            label: 'Contact Admin',
            description: 'Request assistance from administrator',
            action: () => console.log('Contacting admin...'),
            type: 'secondary'
          }
        ];
      default:
        return [];
    }
  };

  const getSeverityIcon = (severity: ErrorSeverity) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
  };

  const getSeverityColor = (severity: ErrorSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning': return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'success': return 'bg-green-500/10 border-green-500/30 text-green-400';
    }
  };

  const getCategoryIcon = (category: ErrorCategory) => {
    switch (category) {
      case 'network': return <WifiOff className="w-4 h-4" />;
      case 'validation': return <AlertCircle className="w-4 h-4" />;
      case 'permission': return <Lock className="w-4 h-4" />;
      case 'system': return <Database className="w-4 h-4" />;
      case 'data': return <RefreshCw className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-400" />
          Error Handling and Recovery Patterns Demo
        </h3>
        <p className="text-gray-400">
          Comprehensive error communication and graceful recovery interfaces
        </p>
      </div>

      {/* Current Error Display */}
      {currentError && (
        <div className={`mb-6 p-4 rounded-lg border ${getSeverityColor(currentError.severity)}`}>
          <div className="flex items-start gap-3">
            {getSeverityIcon(currentError.severity)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{currentError.title}</h4>
                {getCategoryIcon(currentError.category)}
                <span className="text-xs px-2 py-0.5 bg-gray-700 rounded">
                  {currentError.category}
                </span>
              </div>

              {/* Problem + Cause + Solution Structure */}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Problem:</span> {currentError.problem}
                </div>
                <div>
                  <span className="text-gray-400">Cause:</span> {currentError.cause}
                </div>
                <div>
                  <span className="text-gray-400">Solution:</span> {currentError.solution}
                </div>
              </div>

              {/* Progressive Disclosure for Technical Details */}
              {currentError.technicalDetails && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300"
                  >
                    {showTechnicalDetails ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    Technical Details
                  </button>
                  {showTechnicalDetails && (
                    <div className="mt-2 p-2 bg-gray-800 rounded text-xs font-mono text-gray-400">
                      {currentError.technicalDetails}
                      <button
                        className="mt-2 flex items-center gap-1 text-blue-400 hover:text-blue-300"
                      >
                        <Copy className="w-3 h-3" />
                        Copy Error Details
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Recovery Progress */}
              {isRecovering && currentError.recoveryStrategy === 'automatic' && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Attempting recovery... (Retry {currentError.retryCount}/{currentError.maxRetries})
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div
                      className="bg-blue-400 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${(currentError.retryCount / currentError.maxRetries) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Recovery Options */}
              {!currentError.resolved && !isRecovering && (
                <div className="flex gap-2 mt-4">
                  {getRecoveryOptions(currentError).map(option => (
                    <button
                      key={option.id}
                      onClick={option.action}
                      className={`px-3 py-1 rounded text-sm ${
                        option.type === 'primary'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : option.type === 'danger'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      }`}
                      title={option.description}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Success State */}
              {currentError.resolved && (
                <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/30">
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Issue resolved successfully
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Context Preservation Display */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Save className="w-4 h-4 text-blue-400" />
          Context Preserved
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Form Data</p>
            <div className="space-y-1">
              <div className="text-xs">
                <span className="text-gray-500">Username:</span> {contextState.formData.username}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Email:</span> {contextState.formData.email}
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Work in Progress</p>
            <p className="text-xs text-gray-300">{contextState.workInProgress}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          Last saved: 2 minutes ago
        </div>
      </div>

      {/* Error Prevention Controls */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            Error Prevention
          </h4>
          <button
            onClick={() => setPreventionEnabled(!preventionEnabled)}
            className={`px-3 py-1 rounded text-sm ${
              preventionEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {preventionEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        {preventionEnabled && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Input validation active
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Confirmation dialogs for destructive actions
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Undo capability available (Ctrl+Z)
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Auto-save every 30 seconds
            </div>
          </div>
        )}
      </div>

      {/* Trigger Error Scenarios */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Test Error Scenarios</h4>
        <div className="flex flex-wrap gap-2">
          {(['network', 'validation', 'permission', 'system', 'data'] as ErrorCategory[]).map(category => (
            <button
              key={category}
              onClick={() => triggerError(category)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm capitalize"
            >
              {category} Error
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Recovery Rate</span>
            <RefreshCw className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">{metrics.recoveryRate}%</div>
          <div className="text-xs text-gray-500">Auto-resolved</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Context Saved</span>
            <Save className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">{metrics.contextPreserved}%</div>
          <div className="text-xs text-gray-500">Work preserved</div>
        </div>

        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Resolution Time</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-400">{metrics.resolutionTime}s</div>
          <div className="text-xs text-gray-500">Average time</div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {['detection', 'classification', 'communication', 'recovery', 'prevention'].map((p, i) => (
            <div key={p} className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${
                phase === p ? 'bg-red-400' :
                i < ['detection', 'classification', 'communication', 'recovery', 'prevention'].indexOf(phase)
                  ? 'bg-red-400/40'
                  : 'bg-gray-700'
              }`} />
              {i < 4 && (
                <div className={`w-6 h-0.5 ${
                  i < ['detection', 'classification', 'communication', 'recovery', 'prevention'].indexOf(phase)
                    ? 'bg-red-400/40'
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