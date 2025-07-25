'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Globe, MapPin, Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface DataCenter {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  latency: number;
  compliance: string[];
  capacity: number;
  status: 'healthy' | 'warning' | 'critical';
  coordinates: { lat: number; lng: number };
}

interface UserLocation {
  id: string;
  city: string;
  country: string;
  flag: string;
  ip: string;
  regulations: string[];
  coordinates: { lat: number; lng: number };
  preferredLanguage: string;
}

interface RoutingScenario {
  id: string;
  name: string;
  description: string;
  userLocation: UserLocation;
  complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
  primaryConcern: 'latency' | 'compliance' | 'sovereignty' | 'cost';
}

const DATA_CENTERS: DataCenter[] = [
  {
    id: 'us-east',
    name: 'US East',
    location: 'Virginia, USA',
    country: 'United States',
    flag: '🇺🇸',
    latency: 145,
    compliance: ['CCPA', 'SOX', 'HIPAA'],
    capacity: 85,
    status: 'healthy',
    coordinates: { lat: 39.0458, lng: -76.6413 }
  },
  {
    id: 'us-west',
    name: 'US West',
    location: 'Oregon, USA',
    country: 'United States',
    flag: '🇺🇸',
    latency: 165,
    compliance: ['CCPA', 'SOX', 'HIPAA'],
    capacity: 72,
    status: 'healthy',
    coordinates: { lat: 45.5152, lng: -122.6784 }
  },
  {
    id: 'eu-central',
    name: 'EU Central',
    location: 'Frankfurt, Germany',
    country: 'Germany',
    flag: '🇩🇪',
    latency: 12,
    compliance: ['GDPR', 'ISO27001', 'SOC2'],
    capacity: 93,
    status: 'healthy',
    coordinates: { lat: 50.1109, lng: 8.6821 }
  },
  {
    id: 'eu-west',
    name: 'EU West',
    location: 'Dublin, Ireland',
    country: 'Ireland',
    flag: '🇮🇪',
    latency: 28,
    compliance: ['GDPR', 'ISO27001'],
    capacity: 88,
    status: 'healthy',
    coordinates: { lat: 53.3498, lng: -6.2603 }
  },
  {
    id: 'asia-pacific',
    name: 'Asia Pacific',
    location: 'Tokyo, Japan',
    country: 'Japan',
    flag: '🇯🇵',
    latency: 235,
    compliance: ['APPI', 'ISO27001'],
    capacity: 76,
    status: 'warning',
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: 'south-america',
    name: 'South America',
    location: 'São Paulo, Brazil',
    country: 'Brazil',
    flag: '🇧🇷',
    latency: 275,
    compliance: ['LGPD', 'ISO27001'],
    capacity: 65,
    status: 'warning',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  }
];

const USER_LOCATIONS: UserLocation[] = [
  {
    id: 'germany',
    city: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    ip: '85.214.132.117',
    regulations: ['GDPR', 'BDSG'],
    coordinates: { lat: 50.1109, lng: 8.6821 },
    preferredLanguage: 'German'
  },
  {
    id: 'california',
    city: 'San Francisco',
    country: 'United States',
    flag: '🇺🇸',
    ip: '198.51.100.42',
    regulations: ['CCPA', 'CPRA'],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    preferredLanguage: 'English'
  },
  {
    id: 'brazil',
    city: 'São Paulo',
    country: 'Brazil',
    flag: '🇧🇷',
    ip: '200.144.189.73',
    regulations: ['LGPD'],
    coordinates: { lat: -23.5505, lng: -46.6333 },
    preferredLanguage: 'Portuguese'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    ip: '103.15.127.95',
    regulations: ['PDPA'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    preferredLanguage: 'English'
  },
  {
    id: 'canada',
    city: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    ip: '142.150.108.33',
    regulations: ['PIPEDA'],
    coordinates: { lat: 43.6532, lng: -79.3832 },
    preferredLanguage: 'English'
  }
];

const ROUTING_SCENARIOS: RoutingScenario[] = [
  {
    id: 'gdpr-compliance',
    name: 'GDPR Compliance',
    description: 'EU user requiring strict GDPR compliance and data residency',
    userLocation: USER_LOCATIONS[0], // Germany
    complexity: 'High',
    primaryConcern: 'compliance'
  },
  {
    id: 'latency-optimization',
    name: 'Latency Optimization',
    description: 'US user prioritizing fastest response times',
    userLocation: USER_LOCATIONS[1], // California
    complexity: 'Medium',
    primaryConcern: 'latency'
  },
  {
    id: 'data-sovereignty',
    name: 'Data Sovereignty',
    description: 'Brazil user with strict local data processing requirements',
    userLocation: USER_LOCATIONS[2], // Brazil
    complexity: 'High',
    primaryConcern: 'sovereignty'
  },
  {
    id: 'multi-region',
    name: 'Multi-Region Access',
    description: 'Singapore user needing global service access',
    userLocation: USER_LOCATIONS[3], // Singapore
    complexity: 'Extreme',
    primaryConcern: 'latency'
  }
];

export const GeographicRoutingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(ROUTING_SCENARIOS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDataCenter, setSelectedDataCenter] = useState<DataCenter | null>(null);
  const [routingAnalysis, setRoutingAnalysis] = useState<any>(null);
  const [complianceCheck, setComplianceCheck] = useState<any>(null);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setSelectedDataCenter(null);
    setRoutingAnalysis(null);
    setComplianceCheck(null);
    setPerformanceMetrics(null);
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  const calculateLatency = (userLoc: UserLocation, dataCenter: DataCenter): number => {
    // Simplified latency calculation based on geographic distance
    const baseLatency = dataCenter.latency;
    const distance = Math.sqrt(
      Math.pow(userLoc.coordinates.lat - dataCenter.coordinates.lat, 2) +
      Math.pow(userLoc.coordinates.lng - dataCenter.coordinates.lng, 2)
    );
    return Math.floor(baseLatency + (distance * 2));
  };

  const checkCompliance = (userRegs: string[], dcCompliance: string[]): number => {
    const matches = userRegs.filter(reg => dcCompliance.includes(reg));
    return Math.floor((matches.length / userRegs.length) * 100);
  };

  const selectOptimalDataCenter = (scenario: RoutingScenario): DataCenter => {
    const scores = DATA_CENTERS.map(dc => {
      const latency = calculateLatency(scenario.userLocation, dc);
      const compliance = checkCompliance(scenario.userLocation.regulations, dc.compliance);
      
      let score = 0;
      switch (scenario.primaryConcern) {
        case 'latency':
          score = (300 - latency) * 0.6 + compliance * 0.3 + dc.capacity * 0.1;
          break;
        case 'compliance':
          score = compliance * 0.7 + (300 - latency) * 0.2 + dc.capacity * 0.1;
          break;
        case 'sovereignty':
          const isLocal = dc.country === scenario.userLocation.country;
          score = (isLocal ? 100 : 0) * 0.8 + compliance * 0.15 + (300 - latency) * 0.05;
          break;
        default:
          score = (300 - latency) * 0.4 + compliance * 0.4 + dc.capacity * 0.2;
      }
      
      return { dataCenter: dc, score, latency, compliance };
    });

    const best = scores.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );

    return best.dataCenter;
  };

  const runGeographicRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🌍 Starting geographic routing analysis...']);

    // Phase 1: Location Detection
    setCurrentPhase('detection');
    setExecutionLog(prev => [...prev, '📍 Detecting user location and analyzing requirements...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));
    
    setExecutionLog(prev => [...prev, `✅ User Location: ${selectedScenario.userLocation.city}, ${selectedScenario.userLocation.country} ${selectedScenario.userLocation.flag}`]);
    setExecutionLog(prev => [...prev, `✅ IP Address: ${selectedScenario.userLocation.ip}`]);
    setExecutionLog(prev => [...prev, `✅ Regulations: ${selectedScenario.userLocation.regulations.join(', ')}`]);

    // Phase 2: Compliance Analysis
    setCurrentPhase('compliance');
    setExecutionLog(prev => [...prev, '🛡️ Analyzing regulatory compliance requirements...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const complianceResults = DATA_CENTERS.map(dc => ({
      dataCenter: dc,
      score: checkCompliance(selectedScenario.userLocation.regulations, dc.compliance),
      requiredRegs: selectedScenario.userLocation.regulations,
      supportedRegs: dc.compliance
    }));

    setComplianceCheck(complianceResults);
    setExecutionLog(prev => [...prev, '✅ Compliance analysis completed for all regions']);

    // Phase 3: Latency Analysis
    setCurrentPhase('latency');
    setExecutionLog(prev => [...prev, '⚡ Calculating network latency to all data centers...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    const latencyResults = DATA_CENTERS.map(dc => ({
      dataCenter: dc,
      calculatedLatency: calculateLatency(selectedScenario.userLocation, dc)
    }));

    setExecutionLog(prev => [...prev, '✅ Latency calculations completed']);

    // Phase 4: Routing Decision
    setCurrentPhase('routing');
    setExecutionLog(prev => [...prev, '🎯 Making optimal routing decision...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const optimalDC = selectOptimalDataCenter(selectedScenario);
    setSelectedDataCenter(optimalDC);

    const analysis = {
      selectedDC: optimalDC,
      latency: calculateLatency(selectedScenario.userLocation, optimalDC),
      compliance: checkCompliance(selectedScenario.userLocation.regulations, optimalDC.compliance),
      reasoning: []
    };

    // Generate reasoning based on primary concern
    switch (selectedScenario.primaryConcern) {
      case 'compliance':
        analysis.reasoning.push('Compliance score prioritized for regulatory adherence');
        analysis.reasoning.push(`${analysis.compliance}% compliance match achieved`);
        break;
      case 'latency':
        analysis.reasoning.push('Network latency optimized for best performance');
        analysis.reasoning.push(`${analysis.latency}ms response time achieved`);
        break;
      case 'sovereignty':
        analysis.reasoning.push('Data sovereignty requirements evaluated');
        analysis.reasoning.push('Local data processing prioritized');
        break;
    }

    setRoutingAnalysis(analysis);
    setExecutionLog(prev => [...prev, `✅ Selected: ${optimalDC.name} (${optimalDC.location})`]);

    // Phase 5: Deployment
    setCurrentPhase('deployment');
    setExecutionLog(prev => [...prev, `🚀 Deploying to ${optimalDC.name}...`]);
    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    // Calculate final performance metrics
    const metrics = {
      totalResponseTime: analysis.latency + 45, // Processing overhead
      complianceScore: analysis.compliance,
      securityLevel: optimalDC.compliance.length * 20,
      costEfficiency: 100 - (analysis.latency / 3),
      dataResidency: selectedScenario.userLocation.regulations.some(reg => 
        optimalDC.compliance.includes(reg)) ? 'Compliant' : 'Cross-border'
    };

    setPerformanceMetrics(metrics);
    setExecutionLog(prev => [...prev, `✅ Deployment successful with ${metrics.totalResponseTime}ms total response time`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Geographic routing completed successfully!']);
  }, [selectedScenario, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (complianceCheck && ['detection', 'compliance'].includes(phase)) {
      return 'border-green-500 bg-green-900/20';
    }
    if (routingAnalysis && ['latency', 'routing'].includes(phase)) {
      return 'border-green-500 bg-green-900/20';
    }
    if (performanceMetrics && phase === 'deployment') {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyColor = (latency: number) => {
    if (latency <= 50) return 'text-green-400';
    if (latency <= 150) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🌍</span>
          Geographic Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how intelligent geographic routing analyzes user location, compliance requirements, and performance metrics to select optimal data centers.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Routing Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = ROUTING_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ROUTING_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Demo Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runGeographicRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Routing...' : 'Start Routing'}
              </button>
              
              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Scenario Details */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Scenario: {selectedScenario.name}</h4>
          <p className="text-gray-300 text-sm mb-3">{selectedScenario.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Location</div>
              <div className="text-white font-medium">{selectedScenario.userLocation.city}, {selectedScenario.userLocation.country} {selectedScenario.userLocation.flag}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Regulations</div>
              <div className="text-white font-medium">{selectedScenario.userLocation.regulations.join(', ')}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Priority</div>
              <div className="text-white font-medium capitalize">{selectedScenario.primaryConcern}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Complexity</div>
              <div className="text-white font-medium">{selectedScenario.complexity}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Geographic Routing Pipeline</h3>
          
          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Location Detection */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('detection')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location Detection
                </h4>
                {currentPhase === 'detection' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {complianceCheck && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {currentPhase !== '' && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">IP:</span> <span className="text-blue-400">{selectedScenario.userLocation.ip}</span></div>
                  <div><span className="text-gray-400">Location:</span> <span className="text-green-400">{selectedScenario.userLocation.city}, {selectedScenario.userLocation.country}</span></div>
                </div>
              )}
            </div>

            {/* Compliance Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('compliance')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Compliance Analysis
                </h4>
                {currentPhase === 'compliance' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {complianceCheck && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {complianceCheck && (
                <div className="text-sm text-gray-300 space-y-1">
                  {complianceCheck.slice(0, 3).map((result: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{result.dataCenter.name}:</span>
                      <span className={getComplianceColor(result.score)}>{result.score}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Latency Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('latency')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Latency Analysis
                </h4>
                {currentPhase === 'latency' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {routingAnalysis && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingAnalysis && (
                <div className="text-sm text-gray-300 space-y-1">
                  {DATA_CENTERS.slice(0, 3).map((dc, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{dc.name}:</span>
                      <span className={getLatencyColor(calculateLatency(selectedScenario.userLocation, dc))}>
                        {calculateLatency(selectedScenario.userLocation, dc)}ms
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Routing Decision */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('routing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Routing Decision
                </h4>
                {currentPhase === 'routing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {selectedDataCenter && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingAnalysis && (
                <div className="text-sm text-gray-300">
                  <div className="font-medium text-blue-400 mb-1">
                    Selected: {routingAnalysis.selectedDC.name} {routingAnalysis.selectedDC.flag}
                  </div>
                  {routingAnalysis.reasoning.map((reason: string, index: number) => (
                    <div key={index} className="text-xs text-gray-400">• {reason}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Data Centers Grid */}
          <div>
            <h4 className="font-medium text-white mb-3">Available Data Centers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DATA_CENTERS.map((dc) => {
                const isSelected = selectedDataCenter?.id === dc.id;
                const calculatedLatency = calculateLatency(selectedScenario.userLocation, dc);
                const complianceScore = checkCompliance(selectedScenario.userLocation.regulations, dc.compliance);
                
                return (
                  <div
                    key={dc.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-gray-600 bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{dc.flag}</span>
                        <div className="font-medium text-white text-sm">{dc.name}</div>
                      </div>
                      {isSelected && (
                        <div className="text-xs bg-blue-600 px-2 py-1 rounded">SELECTED</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="text-white">{dc.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latency:</span>
                        <span className={getLatencyColor(calculatedLatency)}>{calculatedLatency}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance:</span>
                        <span className={getComplianceColor(complianceScore)}>{complianceScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="text-blue-400">{dc.capacity}%</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Standards: {dc.compliance.join(', ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process Log & Results */}
        <div className="space-y-6">
          {/* Process Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          {performanceMetrics && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Routing Results</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium text-white">Deployed to {selectedDataCenter?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">OPTIMIZED</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Response Time</span>
                    <span className="text-blue-400 font-medium">{performanceMetrics.totalResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Compliance Score</span>
                    <span className={`font-medium ${getComplianceColor(performanceMetrics.complianceScore)}`}>
                      {performanceMetrics.complianceScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security Level</span>
                    <span className="text-green-400 font-medium">{performanceMetrics.securityLevel}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cost Efficiency</span>
                    <span className="text-purple-400 font-medium">{Math.floor(performanceMetrics.costEfficiency)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Residency</span>
                    <span className={`font-medium ${
                      performanceMetrics.dataResidency === 'Compliant' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {performanceMetrics.dataResidency}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Selected Region:</div>
                    <div className="text-xs text-gray-300">
                      <div>{selectedDataCenter?.location} {selectedDataCenter?.flag}</div>
                      <div>Regulations: {selectedDataCenter?.compliance.join(', ')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeographicRoutingDemo;