'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone, Tablet, Monitor, Cloud, RefreshCw, Wifi,
  MessageSquare, Mic, Camera, Settings, User, Bell,
  Home, Search, Menu, X, ArrowRight, ArrowLeft,
  Check, AlertCircle, Zap, Activity, Globe, Share2
} from 'lucide-react';

// Types
type DeviceType = 'mobile' | 'tablet' | 'desktop';
type SyncStatus = 'synced' | 'syncing' | 'offline';
type Platform = 'ios' | 'android' | 'windows' | 'macos' | 'web';

interface DeviceContext {
  deviceId: string;
  type: DeviceType;
  platform: Platform;
  orientation: 'portrait' | 'landscape';
  screenSize: { width: number; height: number };
  capabilities: string[];
  connectionStatus: 'online' | 'offline';
  batteryLevel?: number;
  lastSync: number;
}

interface AgentState {
  conversation: Message[];
  preferences: UserPreferences;
  activeTask: string | null;
  contextData: Record<string, any>;
  syncVersion: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: number;
  deviceId: string;
  platform: Platform;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  voiceEnabled: boolean;
  language: string;
}

interface SyncEvent {
  id: string;
  type: 'state' | 'message' | 'preference' | 'context';
  fromDevice: string;
  toDevice: string;
  timestamp: number;
  data: any;
}

const CrossPlatformAgentUxDemo = () => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [agentState, setAgentState] = useState<AgentState>({
    conversation: [
      { id: '1', content: 'Hello! I\'m your cross-platform AI assistant.', sender: 'agent', timestamp: Date.now(), deviceId: 'desktop-1', platform: 'web' }
    ],
    preferences: {
      theme: 'dark',
      fontSize: 'medium',
      notifications: true,
      voiceEnabled: true,
      language: 'en'
    },
    activeTask: null,
    contextData: {},
    syncVersion: 1
  });

  const [devices, setDevices] = useState<DeviceContext[]>([
    {
      deviceId: 'mobile-1',
      type: 'mobile',
      platform: 'ios',
      orientation: 'portrait',
      screenSize: { width: 375, height: 812 },
      capabilities: ['touch', 'voice', 'camera', 'gps', 'biometric'],
      connectionStatus: 'online',
      batteryLevel: 75,
      lastSync: Date.now()
    },
    {
      deviceId: 'tablet-1',
      type: 'tablet',
      platform: 'android',
      orientation: 'landscape',
      screenSize: { width: 1024, height: 768 },
      capabilities: ['touch', 'voice', 'camera', 'stylus'],
      connectionStatus: 'online',
      batteryLevel: 90,
      lastSync: Date.now()
    },
    {
      deviceId: 'desktop-1',
      type: 'desktop',
      platform: 'macos',
      orientation: 'landscape',
      screenSize: { width: 1920, height: 1080 },
      capabilities: ['keyboard', 'mouse', 'voice', 'camera'],
      connectionStatus: 'online',
      lastSync: Date.now()
    }
  ]);

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffTarget, setHandoffTarget] = useState<DeviceType | null>(null);

  // Simulate sync events
  useEffect(() => {
    const timer = setInterval(() => {
      if (syncStatus === 'syncing') {
        setSyncStatus('synced');
        setSyncEvents(prev => [...prev, {
          id: `sync-${Date.now()}`,
          type: 'state' as const,
          fromDevice: devices.find(d => d.type === activeDevice)?.deviceId || '',
          toDevice: 'cloud',
          timestamp: Date.now(),
          data: agentState
        }].slice(-10));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [syncStatus, activeDevice, agentState, devices]);

  // Auto-sync on state changes
  useEffect(() => {
    setSyncStatus('syncing');
    setDevices(prev => prev.map(d => ({ ...d, lastSync: Date.now() })));
  }, [agentState]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const currentDevice = devices.find(d => d.type === activeDevice);
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: Date.now(),
      deviceId: currentDevice?.deviceId || '',
      platform: currentDevice?.platform || 'web'
    };

    setAgentState(prev => ({
      ...prev,
      conversation: [...prev.conversation, newMessage],
      syncVersion: prev.syncVersion + 1
    }));

    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const response: Message = {
        id: `msg-${Date.now() + 1}`,
        content: getContextualResponse(inputValue, activeDevice),
        sender: 'agent',
        timestamp: Date.now(),
        deviceId: 'cloud',
        platform: 'web'
      };
      setAgentState(prev => ({
        ...prev,
        conversation: [...prev.conversation, response],
        syncVersion: prev.syncVersion + 1
      }));
    }, 1000);
  };

  const getContextualResponse = (input: string, device: DeviceType): string => {
    const responses = {
      mobile: [
        'I\'ve adapted the response for your mobile screen. Swipe for more options.',
        'Using voice input? I can process that more efficiently on mobile.',
        'Location-based suggestion: There\'s relevant information nearby.'
      ],
      tablet: [
        'Here\'s a visual layout optimized for your tablet display.',
        'You can use split-screen mode for multitasking with this content.',
        'Touch gestures are enabled for interactive exploration.'
      ],
      desktop: [
        'I\'ve prepared a detailed analysis with full keyboard shortcuts.',
        'Multiple windows are available for comprehensive viewing.',
        'Advanced features are accessible through the desktop interface.'
      ]
    };

    return responses[device][Math.floor(Math.random() * responses[device].length)];
  };

  const handleDeviceSwitch = (newDevice: DeviceType) => {
    setShowHandoff(true);
    setHandoffTarget(newDevice);

    setTimeout(() => {
      setActiveDevice(newDevice);
      setShowHandoff(false);
      setHandoffTarget(null);

      // Add context transfer event
      setSyncEvents(prev => [...prev, {
        id: `handoff-${Date.now()}`,
        type: 'context' as const,
        fromDevice: devices.find(d => d.type === activeDevice)?.deviceId || '',
        toDevice: devices.find(d => d.type === newDevice)?.deviceId || '',
        timestamp: Date.now(),
        data: { activeTask: agentState.activeTask, contextData: agentState.contextData }
      }].slice(-10));
    }, 1500);
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setAgentState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
      syncVersion: prev.syncVersion + 1
    }));
  };

  const renderDeviceFrame = (device: DeviceType) => {
    const isActive = activeDevice === device;
    const deviceInfo = devices.find(d => d.type === device);

    const frameStyles = {
      mobile: 'w-48 h-96',
      tablet: 'w-80 h-60',
      desktop: 'w-96 h-64'
    };

    const icons = {
      mobile: <Smartphone className="w-5 h-5" />,
      tablet: <Tablet className="w-5 h-5" />,
      desktop: <Monitor className="w-5 h-5" />
    };

    return (
      <div
        className={`relative ${frameStyles[device]} bg-gray-800 rounded-lg border-4 transition-all cursor-pointer
          ${isActive ? 'border-blue-400 shadow-xl scale-105' : 'border-gray-700 hover:border-gray-600'}`}
        onClick={() => handleDeviceSwitch(device)}
      >
        {/* Device Header */}
        <div className="bg-gray-700 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icons[device]}
            <span className="text-xs text-gray-300">{deviceInfo?.platform}</span>
          </div>
          <div className="flex items-center gap-2">
            {deviceInfo?.connectionStatus === 'online' ? (
              <Wifi className="w-3 h-3 text-green-400" />
            ) : (
              <X className="w-3 h-3 text-red-400" />
            )}
            {deviceInfo?.batteryLevel && (
              <span className="text-xs text-gray-400">{deviceInfo.batteryLevel}%</span>
            )}
            {isActive && syncStatus === 'syncing' && (
              <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />
            )}
          </div>
        </div>

        {/* Device Content */}
        <div className="p-3 h-full overflow-hidden">
          {device === 'mobile' && (
            <div className="text-xs space-y-2">
              {/* Mobile Navigation */}
              <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                <Menu className="w-4 h-4 text-gray-400" />
                <span className="text-gray-100 font-medium">AI Assistant</span>
                <User className="w-4 h-4 text-gray-400" />
              </div>

              {/* Mobile Chat */}
              <div className="bg-gray-700/50 rounded p-2 h-48 overflow-y-auto">
                {agentState.conversation.slice(-3).map(msg => (
                  <div key={msg.id} className={`mb-1 ${msg.sender === 'agent' ? 'text-blue-400' : 'text-gray-100'}`}>
                    <span className="text-[10px]">{msg.content.substring(0, 50)}...</span>
                  </div>
                ))}
              </div>

              {/* Mobile Input */}
              <div className="flex gap-1">
                <button className="p-1 bg-gray-700 rounded">
                  <Mic className="w-3 h-3 text-gray-400" />
                </button>
                <input className="flex-1 bg-gray-700 rounded px-2 py-1 text-[10px] text-gray-100" placeholder="Type or speak..." />
                <button className="p-1 bg-blue-500 rounded">
                  <ArrowRight className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Mobile Bottom Nav */}
              <div className="flex justify-around bg-gray-700 rounded p-1">
                <Home className="w-3 h-3 text-gray-400" />
                <Search className="w-3 h-3 text-gray-400" />
                <MessageSquare className="w-3 h-3 text-blue-400" />
                <Bell className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          )}

          {device === 'tablet' && (
            <div className="text-sm space-y-2">
              {/* Tablet Split View */}
              <div className="flex gap-2 h-40">
                {/* Sidebar */}
                <div className="w-1/3 bg-gray-700/50 rounded p-2">
                  <div className="text-xs font-medium text-gray-100 mb-2">Threads</div>
                  <div className="space-y-1">
                    <div className="bg-gray-600 rounded px-2 py-1 text-xs text-gray-300">Main Chat</div>
                    <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-400">Documents</div>
                    <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-400">Settings</div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-700/50 rounded p-2">
                  <div className="text-xs text-gray-100 space-y-1">
                    {agentState.conversation.slice(-2).map(msg => (
                      <div key={msg.id} className={msg.sender === 'agent' ? 'text-blue-400' : ''}>
                        {msg.content.substring(0, 80)}...
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet Controls */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-700 rounded py-1 text-xs text-gray-300">Voice</button>
                <button className="flex-1 bg-gray-700 rounded py-1 text-xs text-gray-300">Draw</button>
                <button className="flex-1 bg-blue-500 rounded py-1 text-xs text-white">Send</button>
              </div>
            </div>
          )}

          {device === 'desktop' && (
            <div className="text-sm space-y-2">
              {/* Desktop Header */}
              <div className="flex items-center justify-between bg-gray-700/50 rounded p-2">
                <div className="flex gap-2">
                  <button className="text-xs bg-gray-600 rounded px-2 py-1 text-gray-300">File</button>
                  <button className="text-xs bg-gray-600 rounded px-2 py-1 text-gray-300">Edit</button>
                  <button className="text-xs bg-gray-600 rounded px-2 py-1 text-gray-300">View</button>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-3 h-3 text-gray-400" />
                  <User className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Desktop Content Area */}
              <div className="bg-gray-700/50 rounded p-2 h-32">
                <div className="text-xs text-gray-100 space-y-1">
                  {agentState.conversation.slice(-2).map(msg => (
                    <div key={msg.id} className="flex items-start gap-2">
                      <span className={`${msg.sender === 'agent' ? 'text-blue-400' : 'text-green-400'}`}>
                        {msg.sender === 'agent' ? 'AI' : 'You'}:
                      </span>
                      <span>{msg.content.substring(0, 100)}...</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Input Area */}
              <div className="flex gap-2">
                <input className="flex-1 bg-gray-700 rounded px-2 py-1 text-xs text-gray-100" placeholder="Type your message..." />
                <button className="bg-gray-600 rounded px-3 py-1 text-xs text-gray-300">Attach</button>
                <button className="bg-blue-500 rounded px-3 py-1 text-xs text-white">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Cross-Platform Agent UX Demo</h2>
        <p className="text-gray-400">Consistent experience across devices with seamless synchronization</p>
      </div>

      {/* Device Showcase */}
      <div className="flex justify-center items-center gap-8 mb-8 p-8 bg-gray-800 rounded-lg">
        {renderDeviceFrame('mobile')}
        {renderDeviceFrame('tablet')}
        {renderDeviceFrame('desktop')}
      </div>

      {/* Handoff Animation */}
      {showHandoff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-blue-400">{activeDevice}</div>
              <ArrowRight className="w-6 h-6 text-gray-400 animate-pulse" />
              <div className="text-green-400">{handoffTarget}</div>
            </div>
            <Cloud className="w-12 h-12 text-blue-400 mx-auto mb-2 animate-bounce" />
            <p className="text-gray-100">Transferring context...</p>
            <p className="text-sm text-gray-400">Your conversation and preferences are syncing</p>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sync Status */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-blue-400" />
            Sync Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <div className="flex items-center gap-2">
                {syncStatus === 'syncing' ? (
                  <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 text-green-400" />
                )}
                <span className="text-sm text-gray-100">{syncStatus}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Version</span>
              <span className="text-sm text-gray-100">v{agentState.syncVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Messages</span>
              <span className="text-sm text-gray-100">{agentState.conversation.length}</span>
            </div>

            {/* Recent Sync Events */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-sm font-medium text-gray-300 mb-2">Recent Syncs</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {syncEvents.slice(-3).reverse().map(event => (
                  <div key={event.id} className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleTimeString()} - {event.type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-400" />
            Unified Preferences
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Theme</label>
              <select
                value={agentState.preferences.theme}
                onChange={(e) => updatePreference('theme', e.target.value)}
                className="w-full bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Font Size</label>
              <select
                value={agentState.preferences.fontSize}
                onChange={(e) => updatePreference('fontSize', e.target.value)}
                className="w-full bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Notifications</span>
              <button
                onClick={() => updatePreference('notifications', !agentState.preferences.notifications)}
                className={`w-12 h-6 rounded-full transition-all ${
                  agentState.preferences.notifications ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                  agentState.preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Voice Enabled</span>
              <button
                onClick={() => updatePreference('voiceEnabled', !agentState.preferences.voiceEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${
                  agentState.preferences.voiceEnabled ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                  agentState.preferences.voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Platform Features
          </h3>
          <div className="space-y-2">
            {devices.find(d => d.type === activeDevice)?.capabilities.map(cap => (
              <div key={cap} className="flex items-center justify-between bg-gray-700/50 rounded p-2">
                <span className="text-sm text-gray-300 capitalize">{cap}</span>
                <Check className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Chat */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Test Cross-Platform Messaging</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Send from ${activeDevice}...`}
            className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Messages sent from {activeDevice} will sync across all devices
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{devices.length}</div>
          <div className="text-sm text-gray-400">Active Devices</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {devices.filter(d => d.connectionStatus === 'online').length}/{devices.length}
          </div>
          <div className="text-sm text-gray-400">Online Status</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{agentState.syncVersion}</div>
          <div className="text-sm text-gray-400">Sync Version</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{syncEvents.length}</div>
          <div className="text-sm text-gray-400">Sync Events</div>
        </div>
      </div>
    </div>
  );
};

export default CrossPlatformAgentUxDemo;