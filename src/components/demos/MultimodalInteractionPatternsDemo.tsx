'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Camera, CameraOff, Type, Hand, Volume2,
  Monitor, Smartphone, Headphones, Sun, Moon, Users,
  Home, Car, Building, Heart, Brain, Eye, Ear,
  MessageSquare, Image as ImageIcon, Gesture, Sparkles,
  Activity, Settings, ChevronRight, Check, X
} from 'lucide-react';

// Types
type Modality = 'voice' | 'text' | 'gesture' | 'visual' | 'touch';
type Environment = 'home' | 'office' | 'public' | 'vehicle' | 'outdoor';
type NoiseLevel = 'quiet' | 'moderate' | 'loud';
type PrivacyLevel = 'private' | 'semi-private' | 'public';

interface ModalityState {
  type: Modality;
  active: boolean;
  available: boolean;
  confidence: number;
  lastUsed?: number;
}

interface InputSignal {
  id: string;
  modality: Modality;
  content: string;
  confidence: number;
  timestamp: number;
  processed: boolean;
  metadata?: {
    gesture?: string;
    emotion?: string;
    volume?: number;
    language?: string;
  };
}

interface FusedIntent {
  id: string;
  intent: string;
  confidence: number;
  modalities: Modality[];
  signals: InputSignal[];
  response?: string;
  responseModality?: Modality;
}

interface EnvironmentContext {
  location: Environment;
  noiseLevel: NoiseLevel;
  privacyLevel: PrivacyLevel;
  lightingCondition: 'bright' | 'normal' | 'dim';
  deviceType: 'desktop' | 'mobile' | 'wearable' | 'smart-display';
  userActivity: 'stationary' | 'walking' | 'driving';
}

interface UserPreference {
  preferredModality: Modality;
  fallbackModality: Modality;
  accessibility: {
    visual: boolean;
    hearing: boolean;
    motor: boolean;
    cognitive: boolean;
  };
}

const MultimodalInteractionPatternsDemo = () => {
  const [modalities, setModalities] = useState<ModalityState[]>([
    { type: 'voice', active: false, available: true, confidence: 0.9 },
    { type: 'text', active: true, available: true, confidence: 0.95 },
    { type: 'gesture', active: false, available: true, confidence: 0.75 },
    { type: 'visual', active: false, available: true, confidence: 0.85 },
    { type: 'touch', active: false, available: true, confidence: 0.88 }
  ]);

  const [environment, setEnvironment] = useState<EnvironmentContext>({
    location: 'home',
    noiseLevel: 'quiet',
    privacyLevel: 'private',
    lightingCondition: 'normal',
    deviceType: 'desktop',
    userActivity: 'stationary'
  });

  const [userPreference, setUserPreference] = useState<UserPreference>({
    preferredModality: 'voice',
    fallbackModality: 'text',
    accessibility: {
      visual: true,
      hearing: true,
      motor: true,
      cognitive: true
    }
  });

  const [inputSignals, setInputSignals] = useState<InputSignal[]>([]);
  const [fusedIntents, setFusedIntents] = useState<FusedIntent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedModality, setSelectedModality] = useState<Modality>('text');
  const [showFusion, setShowFusion] = useState(false);
  const [simulateGesture, setSimulateGesture] = useState(false);
  const signalIdRef = useRef(0);
  const intentIdRef = useRef(0);

  // Auto-adjust modality availability based on environment
  useEffect(() => {
    const adjustModalities = () => {
      setModalities(prev => prev.map(mod => {
        let available = true;
        let confidence = mod.confidence;

        // Adjust based on noise level
        if (mod.type === 'voice') {
          if (environment.noiseLevel === 'loud') {
            confidence *= 0.5;
          } else if (environment.noiseLevel === 'moderate') {
            confidence *= 0.8;
          }
        }

        // Adjust based on privacy
        if (mod.type === 'voice' && environment.privacyLevel === 'public') {
          available = false;
        }

        // Adjust based on lighting
        if (mod.type === 'visual' || mod.type === 'gesture') {
          if (environment.lightingCondition === 'dim') {
            confidence *= 0.6;
          }
        }

        // Adjust based on activity
        if (mod.type === 'text' && environment.userActivity === 'driving') {
          available = false;
        }

        // Adjust based on accessibility
        if (mod.type === 'visual' && !userPreference.accessibility.visual) {
          available = false;
        }
        if (mod.type === 'voice' && !userPreference.accessibility.hearing) {
          available = false;
        }

        return { ...mod, available, confidence };
      }));
    };

    adjustModalities();
  }, [environment, userPreference]);

  // Simulate gesture recognition
  useEffect(() => {
    if (simulateGesture) {
      const gestures = ['swipe-right', 'swipe-left', 'pinch', 'tap', 'circle', 'thumbs-up'];
      const timer = setInterval(() => {
        const gesture = gestures[Math.floor(Math.random() * gestures.length)];
        addInputSignal('gesture', `Detected: ${gesture}`, { gesture });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [simulateGesture]);

  const toggleModality = (type: Modality) => {
    setModalities(prev => prev.map(mod =>
      mod.type === type ? { ...mod, active: !mod.active && mod.available } : mod
    ));
  };

  const addInputSignal = (modality: Modality, content: string, metadata?: any) => {
    const signal: InputSignal = {
      id: `signal-${signalIdRef.current++}`,
      modality,
      content,
      confidence: modalities.find(m => m.type === modality)?.confidence || 0.5,
      timestamp: Date.now(),
      processed: false,
      metadata
    };

    setInputSignals(prev => [signal, ...prev].slice(0, 10));

    // Update last used
    setModalities(prev => prev.map(mod =>
      mod.type === modality ? { ...mod, lastUsed: Date.now() } : mod
    ));

    // Auto-process signals
    setTimeout(() => processSignals([signal]), 500);
  };

  const processSignals = (signals: InputSignal[]) => {
    setIsProcessing(true);
    setShowFusion(true);

    setTimeout(() => {
      // Fuse signals into intent
      const intent: FusedIntent = {
        id: `intent-${intentIdRef.current++}`,
        intent: inferIntent(signals),
        confidence: signals.reduce((acc, s) => acc + s.confidence, 0) / signals.length,
        modalities: [...new Set(signals.map(s => s.modality))],
        signals,
        response: generateResponse(signals),
        responseModality: selectResponseModality(signals)
      };

      setFusedIntents(prev => [intent, ...prev].slice(0, 5));
      setInputSignals(prev => prev.map(s =>
        signals.some(sig => sig.id === s.id) ? { ...s, processed: true } : s
      ));
      setIsProcessing(false);
      setShowFusion(false);
    }, 1500);
  };

  const inferIntent = (signals: InputSignal[]): string => {
    const intents = [
      'Information Query',
      'Command Execution',
      'Navigation Request',
      'Content Creation',
      'System Control',
      'Communication'
    ];
    return intents[Math.floor(Math.random() * intents.length)];
  };

  const generateResponse = (signals: InputSignal[]): string => {
    const responses = [
      'Processing multimodal input and generating response...',
      'Understood. Combining signals for optimal result.',
      'Fusing inputs across modalities for comprehensive understanding.',
      'Adapting response based on environmental context.',
      'Executing request using most appropriate modality.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const selectResponseModality = (signals: InputSignal[]): Modality => {
    // Select based on environment and user preference
    if (environment.privacyLevel === 'public') {
      return 'visual';
    }
    if (environment.noiseLevel === 'loud') {
      return 'text';
    }
    return userPreference.preferredModality;
  };

  const sendInput = () => {
    if (currentInput.trim()) {
      addInputSignal(selectedModality, currentInput);
      setCurrentInput('');
    }
  };

  const getModalityIcon = (type: Modality) => {
    const icons = {
      voice: <Mic className="w-4 h-4" />,
      text: <Type className="w-4 h-4" />,
      gesture: <Hand className="w-4 h-4" />,
      visual: <Camera className="w-4 h-4" />,
      touch: <Smartphone className="w-4 h-4" />
    };
    return icons[type];
  };

  const getEnvironmentIcon = (location: Environment) => {
    const icons = {
      home: <Home className="w-4 h-4" />,
      office: <Building className="w-4 h-4" />,
      public: <Users className="w-4 h-4" />,
      vehicle: <Car className="w-4 h-4" />,
      outdoor: <Sun className="w-4 h-4" />
    };
    return icons[location];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Multimodal Interaction Patterns Demo</h2>
        <p className="text-gray-400">Seamlessly integrating voice, visual, gesture, and text communication</p>
      </div>

      {/* Environment Context */}
      <div className="mb-6 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Environmental Context
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Location</label>
            <select
              value={environment.location}
              onChange={(e) => setEnvironment(prev => ({ ...prev, location: e.target.value as Environment }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="public">Public</option>
              <option value="vehicle">Vehicle</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Noise Level</label>
            <select
              value={environment.noiseLevel}
              onChange={(e) => setEnvironment(prev => ({ ...prev, noiseLevel: e.target.value as NoiseLevel }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="quiet">Quiet</option>
              <option value="moderate">Moderate</option>
              <option value="loud">Loud</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Privacy</label>
            <select
              value={environment.privacyLevel}
              onChange={(e) => setEnvironment(prev => ({ ...prev, privacyLevel: e.target.value as PrivacyLevel }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="private">Private</option>
              <option value="semi-private">Semi-Private</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Lighting</label>
            <select
              value={environment.lightingCondition}
              onChange={(e) => setEnvironment(prev => ({ ...prev, lightingCondition: e.target.value as 'bright' | 'normal' | 'dim' }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="bright">Bright</option>
              <option value="normal">Normal</option>
              <option value="dim">Dim</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Device</label>
            <select
              value={environment.deviceType}
              onChange={(e) => setEnvironment(prev => ({ ...prev, deviceType: e.target.value as any }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="wearable">Wearable</option>
              <option value="smart-display">Smart Display</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Activity</label>
            <select
              value={environment.userActivity}
              onChange={(e) => setEnvironment(prev => ({ ...prev, userActivity: e.target.value as any }))}
              className="w-full bg-gray-700 text-gray-100 rounded px-2 py-1 text-sm"
            >
              <option value="stationary">Stationary</option>
              <option value="walking">Walking</option>
              <option value="driving">Driving</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modality Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Available Modalities */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Input Modalities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {modalities.map(mod => (
                <button
                  key={mod.type}
                  onClick={() => toggleModality(mod.type)}
                  disabled={!mod.available}
                  className={`relative p-4 rounded-lg transition-all
                    ${mod.active && mod.available
                      ? 'bg-blue-500/20 border-2 border-blue-400'
                      : mod.available
                      ? 'bg-gray-700 border-2 border-transparent hover:border-gray-600'
                      : 'bg-gray-800 border-2 border-gray-700 opacity-50 cursor-not-allowed'}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className={mod.active ? 'text-blue-400' : 'text-gray-400'}>
                      {getModalityIcon(mod.type)}
                    </span>
                    <span className="text-xs text-gray-300 capitalize">{mod.type}</span>
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all ${
                          mod.confidence > 0.7 ? 'bg-green-400' :
                          mod.confidence > 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${mod.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {Math.round(mod.confidence * 100)}%
                    </span>
                  </div>
                  {!mod.available && (
                    <div className="absolute top-1 right-1">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                  )}
                  {mod.lastUsed && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Modality Recommendations */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-100">Recommended Modality</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Based on context:</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-sm capitalize">
                  {environment.noiseLevel === 'loud' ? 'visual/gesture' :
                   environment.privacyLevel === 'public' ? 'text' :
                   environment.userActivity === 'driving' ? 'voice' : 'voice/text'}
                </span>
              </div>
            </div>
          </div>

          {/* Input Interface */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              Multimodal Input
            </h3>

            {/* Input Type Selector */}
            <div className="flex gap-2 mb-4">
              {['text', 'voice', 'gesture', 'visual'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedModality(type as Modality)}
                  disabled={!modalities.find(m => m.type === type)?.available}
                  className={`px-3 py-1 rounded text-sm capitalize transition-all
                    ${selectedModality === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex gap-2">
              {selectedModality === 'text' && (
                <>
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendInput()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg"
                  />
                  <button
                    onClick={sendInput}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </>
              )}

              {selectedModality === 'voice' && (
                <button
                  onClick={() => addInputSignal('voice', 'Voice command: "Show me today\'s schedule"', { volume: 0.7 })}
                  className="flex-1 py-4 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Mic className="w-6 h-6 text-red-400" />
                  <span className="text-gray-100">Click to simulate voice input</span>
                </button>
              )}

              {selectedModality === 'gesture' && (
                <div className="flex-1 text-center">
                  <button
                    onClick={() => setSimulateGesture(!simulateGesture)}
                    className={`w-full py-4 rounded-lg flex items-center justify-center gap-2
                      ${simulateGesture ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-100 hover:bg-gray-600'}`}
                  >
                    <Hand className="w-6 h-6" />
                    <span>{simulateGesture ? 'Gesture recognition active' : 'Start gesture recognition'}</span>
                  </button>
                </div>
              )}

              {selectedModality === 'visual' && (
                <button
                  onClick={() => addInputSignal('visual', 'Image input: Product photo for search', { emotion: 'neutral' })}
                  className="flex-1 py-4 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Camera className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-100">Click to simulate image input</span>
                </button>
              )}
            </div>
          </div>

          {/* Input Signals */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Input Signals
              {isProcessing && <span className="text-xs text-blue-400 animate-pulse">Processing...</span>}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {inputSignals.map(signal => (
                <div
                  key={signal.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all
                    ${signal.processed ? 'bg-gray-700/30 opacity-50' : 'bg-gray-700/50'}`}
                >
                  <span className="text-blue-400">{getModalityIcon(signal.modality)}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-100">{signal.content}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(signal.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        Confidence: {Math.round(signal.confidence * 100)}%
                      </span>
                      {signal.metadata && (
                        <span className="text-xs text-gray-500">
                          {Object.entries(signal.metadata).map(([k, v]) => `${k}: ${v}`).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  {signal.processed && <Check className="w-4 h-4 text-green-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fusion & Response */}
        <div className="space-y-6">
          {/* Input Fusion */}
          {showFusion && (
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-400 animate-pulse">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Multimodal Fusion
              </h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Brain className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Mic className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Type className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Hand className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-red-400" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">
                Fusing multimodal inputs for unified understanding...
              </p>
            </div>
          )}

          {/* Fused Intents */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Fused Intents
            </h3>
            <div className="space-y-3">
              {fusedIntents.map(intent => (
                <div key={intent.id} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-100">{intent.intent}</span>
                    <span className="text-sm text-green-400">
                      {Math.round(intent.confidence * 100)}%
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {intent.modalities.map(mod => (
                      <span key={mod} className="text-xs bg-gray-600 rounded px-2 py-1 text-gray-300">
                        {mod}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 italic">{intent.response}</p>
                  {intent.responseModality && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Response via:</span>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded capitalize">
                        {intent.responseModality}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Preferences */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              User Preferences
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Preferred Modality</label>
                <select
                  value={userPreference.preferredModality}
                  onChange={(e) => setUserPreference(prev => ({
                    ...prev,
                    preferredModality: e.target.value as Modality
                  }))}
                  className="w-full bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
                >
                  {['voice', 'text', 'gesture', 'visual', 'touch'].map(mod => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Fallback Modality</label>
                <select
                  value={userPreference.fallbackModality}
                  onChange={(e) => setUserPreference(prev => ({
                    ...prev,
                    fallbackModality: e.target.value as Modality
                  }))}
                  className="w-full bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
                >
                  {['voice', 'text', 'gesture', 'visual', 'touch'].map(mod => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2">Accessibility</label>
                <div className="space-y-2">
                  {Object.entries(userPreference.accessibility).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 capitalize">{key}</span>
                      <button
                        onClick={() => setUserPreference(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, [key]: !value }
                        }))}
                        className={`w-10 h-5 rounded-full transition-all
                          ${value ? 'bg-green-500' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all
                          ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {modalities.filter(m => m.active).length}/{modalities.length}
          </div>
          <div className="text-sm text-gray-400">Active Modalities</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {inputSignals.filter(s => s.processed).length}/{inputSignals.length}
          </div>
          <div className="text-sm text-gray-400">Processed Signals</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {fusedIntents.length}
          </div>
          <div className="text-sm text-gray-400">Fused Intents</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {Math.round(modalities.reduce((acc, m) => acc + m.confidence, 0) / modalities.length * 100)}%
          </div>
          <div className="text-sm text-gray-400">Avg Confidence</div>
        </div>
      </div>
    </div>
  );
};

export default MultimodalInteractionPatternsDemo;