'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Eye, EyeOff, Settings, UserCheck, FileText,
  Database, Download, Trash2, AlertTriangle, Check, X,
  Info, ChevronRight, Key, Globe, Clock, Activity,
  UserX, Mail, Phone, MapPin, CreditCard, Heart
} from 'lucide-react';

// Types
type DataCategory = 'personal' | 'behavioral' | 'preferences' | 'location' | 'financial' | 'health';
type Purpose = 'service' | 'analytics' | 'marketing' | 'research' | 'sharing' | 'ai-training';
type ConsentLevel = 'essential' | 'functional' | 'analytical' | 'marketing';
type PrivacyLevel = 'minimal' | 'balanced' | 'strict';

interface DataType {
  id: string;
  name: string;
  category: DataCategory;
  icon: React.ReactNode;
  description: string;
  purposes: Purpose[];
  consented: boolean;
  essential: boolean;
  lastAccessed?: number;
  retention: string;
}

interface DataPurpose {
  id: Purpose;
  name: string;
  description: string;
  enabled: boolean;
  dataTypes: string[];
  recipients: string[];
  justification: string;
}

interface PrivacyEvent {
  id: string;
  timestamp: number;
  type: 'access' | 'consent' | 'deletion' | 'correction' | 'export' | 'breach';
  description: string;
  actor: string;
  status: 'success' | 'pending' | 'failed';
}

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
  recommended: boolean;
  impact: 'low' | 'medium' | 'high';
}

const PrivacySecurityUxDemo = () => {
  const [phase, setPhase] = useState<'overview' | 'consent' | 'controls' | 'transparency' | 'security' | 'complete'>('overview');
  const [dataTypes, setDataTypes] = useState<DataType[]>([
    {
      id: 'name',
      name: 'Name & Contact',
      category: 'personal',
      icon: <UserCheck className="w-4 h-4" />,
      description: 'Your name, email, and phone number',
      purposes: ['service', 'analytics'],
      consented: true,
      essential: true,
      retention: '3 years'
    },
    {
      id: 'location',
      name: 'Location Data',
      category: 'location',
      icon: <MapPin className="w-4 h-4" />,
      description: 'Approximate location for localized content',
      purposes: ['service', 'analytics', 'marketing'],
      consented: false,
      essential: false,
      retention: '1 year'
    },
    {
      id: 'behavior',
      name: 'Usage Patterns',
      category: 'behavioral',
      icon: <Activity className="w-4 h-4" />,
      description: 'How you interact with the AI assistant',
      purposes: ['analytics', 'ai-training', 'research'],
      consented: true,
      essential: false,
      retention: '2 years'
    },
    {
      id: 'preferences',
      name: 'Preferences',
      category: 'preferences',
      icon: <Settings className="w-4 h-4" />,
      description: 'Your settings and customizations',
      purposes: ['service'],
      consented: true,
      essential: true,
      retention: 'Until deletion'
    },
    {
      id: 'payment',
      name: 'Payment Info',
      category: 'financial',
      icon: <CreditCard className="w-4 h-4" />,
      description: 'Billing and payment details',
      purposes: ['service'],
      consented: false,
      essential: false,
      retention: '7 years'
    },
    {
      id: 'health',
      name: 'Health Data',
      category: 'health',
      icon: <Heart className="w-4 h-4" />,
      description: 'Health-related queries and information',
      purposes: ['service', 'research'],
      consented: false,
      essential: false,
      retention: '10 years'
    }
  ]);

  const [purposes, setPurposes] = useState<DataPurpose[]>([
    {
      id: 'service',
      name: 'Core Service',
      description: 'Provide and improve the AI assistant',
      enabled: true,
      dataTypes: ['name', 'preferences'],
      recipients: ['Our company'],
      justification: 'Essential for service operation'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Understand usage patterns and improve performance',
      enabled: true,
      dataTypes: ['name', 'location', 'behavior'],
      recipients: ['Our company', 'Analytics partners'],
      justification: 'Helps improve user experience'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Send promotional content and offers',
      enabled: false,
      dataTypes: ['name', 'location'],
      recipients: ['Our company', 'Marketing partners'],
      justification: 'Keep you informed about features'
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Academic and product research',
      enabled: false,
      dataTypes: ['behavior', 'health'],
      recipients: ['Research institutions'],
      justification: 'Advance AI capabilities'
    },
    {
      id: 'sharing',
      name: 'Third-party Sharing',
      description: 'Share with trusted partners',
      enabled: false,
      dataTypes: [],
      recipients: ['Business partners'],
      justification: 'Enhanced services'
    },
    {
      id: 'ai-training',
      name: 'AI Training',
      description: 'Train and improve AI models',
      enabled: true,
      dataTypes: ['behavior'],
      recipients: ['Our company'],
      justification: 'Improve AI accuracy'
    }
  ]);

  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>([
    {
      id: 'mfa',
      name: 'Two-Factor Authentication',
      description: 'Extra security layer for your account',
      enabled: false,
      icon: <Key className="w-4 h-4" />,
      recommended: true,
      impact: 'high'
    },
    {
      id: 'encryption',
      name: 'End-to-End Encryption',
      description: 'Encrypt all communications',
      enabled: true,
      icon: <Lock className="w-4 h-4" />,
      recommended: true,
      impact: 'high'
    },
    {
      id: 'audit',
      name: 'Access Audit Logs',
      description: 'Track all data access events',
      enabled: true,
      icon: <FileText className="w-4 h-4" />,
      recommended: false,
      impact: 'medium'
    },
    {
      id: 'anonymous',
      name: 'Anonymous Mode',
      description: 'Use services without identification',
      enabled: false,
      icon: <UserX className="w-4 h-4" />,
      recommended: false,
      impact: 'high'
    }
  ]);

  const [events, setEvents] = useState<PrivacyEvent[]>([]);
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('balanced');
  const [showDataDetails, setShowDataDetails] = useState<string | null>(null);
  const [justInTimeConsent, setJustInTimeConsent] = useState<{
    show: boolean;
    dataType: string;
    purpose: string;
  } | null>(null);

  // Simulate events
  useEffect(() => {
    if (phase === 'complete') return;

    const timer = setInterval(() => {
      const eventTypes: PrivacyEvent['type'][] = ['access', 'consent'];
      const newEvent: PrivacyEvent = {
        id: `event-${Date.now()}`,
        timestamp: Date.now(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        description: phase === 'consent' ? 'User updated consent preferences' : 'System accessed data for service',
        actor: phase === 'consent' ? 'User' : 'System',
        status: 'success'
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
    }, 5000);

    return () => clearInterval(timer);
  }, [phase]);

  // Phase progression
  useEffect(() => {
    const timer = setTimeout(() => {
      const phases: typeof phase[] = ['overview', 'consent', 'controls', 'transparency', 'security', 'complete'];
      const currentIndex = phases.indexOf(phase);
      if (currentIndex < phases.length - 1) {
        setPhase(phases[currentIndex + 1]);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [phase]);

  const toggleDataConsent = (dataId: string) => {
    setDataTypes(prev => prev.map(dt =>
      dt.id === dataId ? { ...dt, consented: !dt.consented } : dt
    ));
    setEvents(prev => [{
      id: `event-${Date.now()}`,
      timestamp: Date.now(),
      type: 'consent' as const,
      description: `Updated consent for ${dataTypes.find(dt => dt.id === dataId)?.name}`,
      actor: 'User',
      status: 'success' as const
    }, ...prev].slice(0, 10));
  };

  const togglePurpose = (purposeId: Purpose) => {
    setPurposes(prev => prev.map(p =>
      p.id === purposeId ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const toggleSecurity = (featureId: string) => {
    setSecurityFeatures(prev => prev.map(sf =>
      sf.id === featureId ? { ...sf, enabled: !sf.enabled } : sf
    ));
  };

  const handleJustInTimeResponse = (accepted: boolean) => {
    if (justInTimeConsent && accepted) {
      toggleDataConsent(justInTimeConsent.dataType);
    }
    setJustInTimeConsent(null);
  };

  const applyPrivacyLevel = (level: PrivacyLevel) => {
    setPrivacyLevel(level);

    // Apply preset configurations
    if (level === 'minimal') {
      setDataTypes(prev => prev.map(dt => ({ ...dt, consented: dt.essential })));
      setPurposes(prev => prev.map(p => ({ ...p, enabled: p.id === 'service' })));
      setSecurityFeatures(prev => prev.map(sf => ({ ...sf, enabled: sf.recommended })));
    } else if (level === 'balanced') {
      setDataTypes(prev => prev.map(dt => ({
        ...dt,
        consented: dt.essential || dt.category === 'behavioral'
      })));
      setPurposes(prev => prev.map(p => ({
        ...p,
        enabled: ['service', 'analytics', 'ai-training'].includes(p.id)
      })));
    } else {
      setDataTypes(prev => prev.map(dt => ({ ...dt, consented: true })));
      setPurposes(prev => prev.map(p => ({ ...p, enabled: true })));
      setSecurityFeatures(prev => prev.map(sf => ({ ...sf, enabled: true })));
    }
  };

  const getCategoryColor = (category: DataCategory) => {
    const colors = {
      personal: 'text-blue-400',
      behavioral: 'text-purple-400',
      preferences: 'text-green-400',
      location: 'text-orange-400',
      financial: 'text-red-400',
      health: 'text-pink-400'
    };
    return colors[category];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Privacy & Security UX Demo</h2>
        <p className="text-gray-400">Privacy-first design with transparent data handling and user empowerment</p>
      </div>

      {/* Phase Indicator */}
      <div className="flex justify-between mb-6 bg-gray-800 rounded-lg p-4">
        {(['overview', 'consent', 'controls', 'transparency', 'security', 'complete'] as const).map((p) => (
          <div
            key={p}
            className={`flex items-center ${phase === p ? 'text-blue-400' : 'text-gray-500'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
              ${phase === p ? 'border-blue-400 bg-blue-400/20' : 'border-gray-600'}`}>
              {phase === p ? '●' : '○'}
            </div>
            <span className="ml-2 text-xs">{p}</span>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Privacy Controls Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Privacy Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Privacy Level
              </h3>
              <div className="flex gap-2">
                {(['minimal', 'balanced', 'strict'] as PrivacyLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => applyPrivacyLevel(level)}
                    className={`px-3 py-1 rounded text-sm transition-all
                      ${privacyLevel === level
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {privacyLevel === 'minimal' && 'Essential data only for core functionality'}
              {privacyLevel === 'balanced' && 'Balanced approach for functionality and privacy'}
              {privacyLevel === 'strict' && 'Maximum features with transparency'}
            </p>
          </div>

          {/* Data Categories */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-400" />
              Data Categories
            </h3>
            <div className="space-y-3">
              {dataTypes.map((dataType) => (
                <div key={dataType.id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={getCategoryColor(dataType.category)}>
                          {dataType.icon}
                        </span>
                        <h4 className="ml-2 font-medium text-gray-100">{dataType.name}</h4>
                        {dataType.essential && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                            Essential
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{dataType.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Retained: {dataType.retention}
                        </span>
                        <button
                          onClick={() => setShowDataDetails(dataType.id)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Details <ChevronRight className="w-3 h-3 inline" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => !dataType.essential && toggleDataConsent(dataType.id)}
                      disabled={dataType.essential}
                      className={`ml-4 p-2 rounded transition-all
                        ${dataType.consented
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-600 text-gray-400'}
                        ${dataType.essential ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                    >
                      {dataType.consented ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purpose Controls */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-purple-400" />
              Data Usage Purposes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {purposes.map((purpose) => (
                <div key={purpose.id} className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-100">{purpose.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{purpose.description}</p>
                    </div>
                    <button
                      onClick={() => togglePurpose(purpose.id)}
                      disabled={purpose.id === 'service'}
                      className={`ml-2 p-1.5 rounded transition-all
                        ${purpose.enabled
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-600 text-gray-400'}
                        ${purpose.id === 'service' ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                    >
                      {purpose.enabled ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>Recipients: {purpose.recipients.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-red-400" />
              Security Features
            </h3>
            <div className="space-y-3">
              {securityFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">{feature.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-100">{feature.name}</h4>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                    {feature.recommended && (
                      <span className="ml-3 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSecurity(feature.id)}
                    className={`ml-4 p-2 rounded transition-all
                      ${feature.enabled
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600 text-gray-400 hover:bg-gray-500'}`}
                  >
                    {feature.enabled ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transparency & Activity Panel */}
        <div className="space-y-6">
          {/* User Rights */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-green-400" />
              Your Rights
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all">
                <span className="flex items-center text-gray-100">
                  <Eye className="w-4 h-4 mr-2 text-blue-400" />
                  Access My Data
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all">
                <span className="flex items-center text-gray-100">
                  <Download className="w-4 h-4 mr-2 text-green-400" />
                  Export Data
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all">
                <span className="flex items-center text-gray-100">
                  <Trash2 className="w-4 h-4 mr-2 text-red-400" />
                  Delete Account
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" />
              Privacy Activity
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-700/30 rounded p-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`
                      ${event.type === 'access' ? 'text-blue-400' : ''}
                      ${event.type === 'consent' ? 'text-green-400' : ''}
                      ${event.type === 'deletion' ? 'text-red-400' : ''}
                    `}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    <span className="text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-400">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-yellow-400" />
              Compliance
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">GDPR</span>
                <span className="text-green-400 text-sm">✓ Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">CCPA</span>
                <span className="text-green-400 text-sm">✓ Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">HIPAA</span>
                <span className="text-yellow-400 text-sm">⚠ Partial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Just-in-Time Consent Modal */}
      {justInTimeConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Permission Request</h3>
            <p className="text-gray-300 mb-4">
              The AI assistant needs access to your {justInTimeConsent.dataType} for {justInTimeConsent.purpose}.
            </p>
            <div className="bg-gray-700/50 rounded p-3 mb-4">
              <p className="text-sm text-gray-400">
                <Info className="w-4 h-4 inline mr-1" />
                This data will be used only for the specified purpose and you can revoke access anytime.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleJustInTimeResponse(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-all"
              >
                Deny
              </button>
              <button
                onClick={() => handleJustInTimeResponse(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {Math.round((dataTypes.filter(d => d.consented).length / dataTypes.length) * 100)}%
          </div>
          <div className="text-sm text-gray-400">Data Consented</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {purposes.filter(p => p.enabled).length}/{purposes.length}
          </div>
          <div className="text-sm text-gray-400">Active Purposes</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {securityFeatures.filter(sf => sf.enabled).length}/{securityFeatures.length}
          </div>
          <div className="text-sm text-gray-400">Security Features</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {events.filter(e => e.status === 'success').length}
          </div>
          <div className="text-sm text-gray-400">Privacy Actions</div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurityUxDemo;