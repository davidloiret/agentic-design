'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Brain, Users, Network, Database, Search, GitBranch, Activity, Zap, Share2, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  expertise: string[];
  color: string;
  knowledgeItems: KnowledgeItem[];
  trustScore: number;
  queryCount: number;
  responseTime: number;
  active: boolean;
}

interface KnowledgeItem {
  id: string;
  topic: string;
  detail: string;
  confidence: number;
  lastAccessed: number;
  accessCount: number;
}

interface Query {
  id: string;
  question: string;
  requester: string;
  topic: string;
  expertId: string | null;
  status: 'searching' | 'found' | 'processing' | 'complete' | 'failed';
  response?: string;
  confidence?: number;
  timestamp: number;
  path: string[];
}

interface Directory {
  [topic: string]: {
    expertId: string;
    confidence: number;
    lastUpdated: number;
  };
}

export default function TransactiveMemorySystemsDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [directory, setDirectory] = useState<Directory>({});
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [systemLoad, setSystemLoad] = useState(0);
  const [knowledgeCoverage, setKnowledgeCoverage] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState(0);
  const [successRate, setSuccessRate] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize experts with specialized knowledge
  const initializeSystem = () => {
    const initialExperts: Expert[] = [
      {
        id: 'expert-1',
        name: 'Data Scientist',
        expertise: ['machine learning', 'statistics', 'data analysis', 'python'],
        color: '#3B82F6',
        knowledgeItems: [
          { id: 'k1', topic: 'machine learning', detail: 'Neural network architectures', confidence: 0.95, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k2', topic: 'statistics', detail: 'Bayesian inference methods', confidence: 0.9, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k3', topic: 'data analysis', detail: 'Time series forecasting', confidence: 0.85, lastAccessed: Date.now(), accessCount: 0 },
        ],
        trustScore: 0.9,
        queryCount: 0,
        responseTime: 150,
        active: false
      },
      {
        id: 'expert-2',
        name: 'Backend Engineer',
        expertise: ['databases', 'api design', 'scalability', 'security'],
        color: '#10B981',
        knowledgeItems: [
          { id: 'k4', topic: 'databases', detail: 'NoSQL optimization strategies', confidence: 0.92, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k5', topic: 'api design', detail: 'RESTful best practices', confidence: 0.88, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k6', topic: 'scalability', detail: 'Microservices patterns', confidence: 0.86, lastAccessed: Date.now(), accessCount: 0 },
        ],
        trustScore: 0.88,
        queryCount: 0,
        responseTime: 180,
        active: false
      },
      {
        id: 'expert-3',
        name: 'Frontend Developer',
        expertise: ['react', 'ui/ux', 'performance', 'accessibility'],
        color: '#8B5CF6',
        knowledgeItems: [
          { id: 'k7', topic: 'react', detail: 'Advanced hooks patterns', confidence: 0.93, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k8', topic: 'ui/ux', detail: 'Design system principles', confidence: 0.87, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k9', topic: 'performance', detail: 'Bundle optimization techniques', confidence: 0.84, lastAccessed: Date.now(), accessCount: 0 },
        ],
        trustScore: 0.85,
        queryCount: 0,
        responseTime: 120,
        active: false
      },
      {
        id: 'expert-4',
        name: 'DevOps Specialist',
        expertise: ['kubernetes', 'ci/cd', 'monitoring', 'infrastructure'],
        color: '#F59E0B',
        knowledgeItems: [
          { id: 'k10', topic: 'kubernetes', detail: 'Container orchestration patterns', confidence: 0.91, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k11', topic: 'ci/cd', detail: 'Pipeline automation strategies', confidence: 0.89, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k12', topic: 'monitoring', detail: 'Observability best practices', confidence: 0.86, lastAccessed: Date.now(), accessCount: 0 },
        ],
        trustScore: 0.87,
        queryCount: 0,
        responseTime: 200,
        active: false
      },
      {
        id: 'expert-5',
        name: 'Security Analyst',
        expertise: ['cryptography', 'penetration testing', 'compliance', 'threat modeling'],
        color: '#EF4444',
        knowledgeItems: [
          { id: 'k13', topic: 'cryptography', detail: 'Zero-knowledge proof systems', confidence: 0.94, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k14', topic: 'penetration testing', detail: 'OWASP methodology', confidence: 0.9, lastAccessed: Date.now(), accessCount: 0 },
          { id: 'k15', topic: 'compliance', detail: 'GDPR implementation', confidence: 0.85, lastAccessed: Date.now(), accessCount: 0 },
        ],
        trustScore: 0.92,
        queryCount: 0,
        responseTime: 160,
        active: false
      }
    ];

    setExperts(initialExperts);

    // Build initial directory
    const initialDirectory: Directory = {};
    initialExperts.forEach(expert => {
      expert.expertise.forEach(topic => {
        initialDirectory[topic] = {
          expertId: expert.id,
          confidence: expert.trustScore,
          lastUpdated: Date.now()
        };
      });
      expert.knowledgeItems.forEach(item => {
        if (!initialDirectory[item.topic]) {
          initialDirectory[item.topic] = {
            expertId: expert.id,
            confidence: item.confidence,
            lastUpdated: Date.now()
          };
        }
      });
    });
    setDirectory(initialDirectory);

    // Calculate initial coverage
    const totalTopics = Object.keys(initialDirectory).length;
    setKnowledgeCoverage(Math.round((totalTopics / 20) * 100)); // Assuming 20 possible topics
  };

  useEffect(() => {
    initializeSystem();
  }, []);

  // Query scenarios
  const queryScenarios = [
    { question: "How to implement neural networks?", topic: "machine learning", requester: "Frontend Developer" },
    { question: "Best practices for API versioning?", topic: "api design", requester: "Data Scientist" },
    { question: "Optimize React render performance?", topic: "performance", requester: "Backend Engineer" },
    { question: "Setting up K8s autoscaling?", topic: "kubernetes", requester: "Security Analyst" },
    { question: "Implement JWT authentication?", topic: "security", requester: "Frontend Developer" },
    { question: "Database sharding strategies?", topic: "databases", requester: "DevOps Specialist" },
    { question: "A/B testing statistical methods?", topic: "statistics", requester: "Frontend Developer" },
    { question: "Accessibility WCAG compliance?", topic: "accessibility", requester: "Backend Engineer" },
    { question: "Container security scanning?", topic: "security", requester: "DevOps Specialist" },
    { question: "Real-time data streaming?", topic: "scalability", requester: "Data Scientist" },
  ];

  // Process a query through the transactive memory system
  const processQuery = () => {
    const scenario = queryScenarios[Math.floor(Math.random() * queryScenarios.length)];
    const queryId = `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Find the expert who knows about this topic
    const expertEntry = directory[scenario.topic];
    const expert = expertEntry ? experts.find(e => e.id === expertEntry.expertId) : null;

    const newQuery: Query = {
      id: queryId,
      question: scenario.question,
      requester: scenario.requester,
      topic: scenario.topic,
      expertId: expert?.id || null,
      status: 'searching',
      timestamp: Date.now(),
      path: [scenario.requester]
    };

    setQueries(prev => [...prev, newQuery].slice(-10));

    // Simulate query routing through the system
    setTimeout(() => {
      if (expert) {
        // Expert found - update path
        newQuery.path.push(expert.name);
        newQuery.status = 'found';
        setQueries(prev => prev.map(q => q.id === queryId ? { ...newQuery } : q));

        // Activate connection
        const connectionId = `${scenario.requester}-${expert.id}`;
        setActiveConnections(prev => new Set([...prev, connectionId]));

        // Process the query
        setTimeout(() => {
          newQuery.status = 'processing';
          setQueries(prev => prev.map(q => q.id === queryId ? { ...newQuery } : q));

          // Update expert state
          setExperts(prev => prev.map(e => {
            if (e.id === expert.id) {
              const updatedKnowledge = e.knowledgeItems.map(k => {
                if (k.topic === scenario.topic) {
                  return {
                    ...k,
                    accessCount: k.accessCount + 1,
                    lastAccessed: Date.now()
                  };
                }
                return k;
              });

              return {
                ...e,
                active: true,
                queryCount: e.queryCount + 1,
                knowledgeItems: updatedKnowledge
              };
            }
            return e;
          }));

          // Complete the query
          setTimeout(() => {
            const confidence = expert.trustScore * (0.8 + Math.random() * 0.2);
            newQuery.status = 'complete';
            newQuery.response = `Expert knowledge from ${expert.name}`;
            newQuery.confidence = confidence;
            setQueries(prev => prev.map(q => q.id === queryId ? { ...newQuery } : q));

            // Update metrics
            setSystemLoad(prev => Math.max(0, prev - 10));
            setAvgResponseTime(prev => (prev * 0.9 + expert.responseTime * 0.1));

            // Deactivate connection
            setTimeout(() => {
              setActiveConnections(prev => {
                const updated = new Set(prev);
                updated.delete(connectionId);
                return updated;
              });
              setExperts(prev => prev.map(e =>
                e.id === expert.id ? { ...e, active: false } : e
              ));
            }, 500 / speed);
          }, (expert.responseTime * 2) / speed);
        }, 500 / speed);
      } else {
        // No expert found
        newQuery.status = 'failed';
        setQueries(prev => prev.map(q => q.id === queryId ? { ...newQuery } : q));
        setSuccessRate(prev => Math.max(0, prev - 2));
      }
    }, 300 / speed);

    // Update system load
    setSystemLoad(prev => Math.min(100, prev + 15));
  };

  // Visualize the transactive memory network
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get device pixel ratio for high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual canvas size accounting for device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the drawing context to match device pixel ratio
    ctx.scale(dpr, dpr);

    // Set canvas CSS size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    // Draw connections between experts
    experts.forEach((expert, i) => {
      const angle = (i / experts.length) * Math.PI * 2;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;

      experts.forEach((otherExpert, j) => {
        if (i < j) {
          const angle2 = (j / experts.length) * Math.PI * 2;
          const x2 = centerX + Math.cos(angle2) * radius;
          const y2 = centerY + Math.sin(angle2) * radius;

          // Check if there's an active connection
          const connectionId1 = `${expert.name}-${otherExpert.id}`;
          const connectionId2 = `${otherExpert.name}-${expert.id}`;
          const isActive = activeConnections.has(connectionId1) || activeConnections.has(connectionId2);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = isActive ? 'rgba(59, 130, 246, 0.6)' : 'rgba(100, 100, 100, 0.1)';
          ctx.lineWidth = isActive ? 2 : 1;
          ctx.stroke();
        }
      });
    });

    // Draw expert nodes
    experts.forEach((expert, i) => {
      const angle = (i / experts.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const nodeRadius = 25 + (expert.queryCount * 2);

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = expert.active ? expert.color : `${expert.color}66`;
      ctx.fill();

      // Draw trust score indicator
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius + 5, -Math.PI/2, -Math.PI/2 + (Math.PI * 2 * expert.trustScore));
      ctx.strokeStyle = expert.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add background for text
      const textMetrics = ctx.measureText(expert.name);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(
        x - textMetrics.width/2 - 4,
        y + nodeRadius + 8,
        textMetrics.width + 8,
        16
      );

      ctx.fillStyle = '#ffffff';
      ctx.fillText(expert.name, x, y + nodeRadius + 16);

      // Draw expertise count
      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${expert.expertise.length}`, x, y);
    });

    // Draw central directory node
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = systemLoad > 70 ? '#EF4444' : systemLoad > 40 ? '#F59E0B' : '#10B981';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TMS', centerX, centerY);

  }, [experts, activeConnections, systemLoad]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        processQuery();
      }, 2000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, experts, directory]);

  const handleReset = () => {
    setIsRunning(false);
    initializeSystem();
    setQueries([]);
    setActiveConnections(new Set());
    setSystemLoad(0);
    setAvgResponseTime(0);
    setSuccessRate(100);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <div className="bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm border border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-400" />
              Transactive Memory System
            </h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isRunning
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-sm font-medium text-gray-300 w-8">{speed}x</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="col-span-2 space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" />
              Expert Network & Knowledge Distribution
            </h4>
            <canvas
              ref={canvasRef}
              className="w-full h-[400px] bg-gray-900/50 rounded-lg"
            />
          </div>

          {/* Expert Details */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              Domain Experts
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {experts.map(expert => (
                <div
                  key={expert.id}
                  className={`bg-gray-900/50 rounded-lg p-3 border transition-all ${
                    expert.active ? 'border-blue-500/50 bg-blue-900/20' : 'border-gray-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-200">{expert.name}</div>
                      <div className="text-xs text-gray-500">
                        {expert.expertise.slice(0, 2).join(', ')}
                        {expert.expertise.length > 2 && ` +${expert.expertise.length - 2}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-300">
                        {expert.queryCount}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Trust Score</span>
                      <span className="text-gray-300">{(expert.trustScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full transition-all"
                        style={{ width: `${expert.trustScore * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">Response</span>
                      <span className="text-gray-300">{expert.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              System Performance
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">System Load</span>
                  <span className="text-gray-300">{systemLoad}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      systemLoad > 70 ? 'bg-red-500' : systemLoad > 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${systemLoad}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Knowledge Coverage</span>
                  <span className="text-gray-300">{knowledgeCoverage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${knowledgeCoverage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-gray-300">{successRate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Avg Response Time</span>
                  <span className="text-gray-300">{avgResponseTime.toFixed(0)}ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Directory */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-yellow-400" />
              Knowledge Directory
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Object.entries(directory).slice(0, 8).map(([topic, info]) => {
                const expert = experts.find(e => e.id === info.expertId);
                return (
                  <div key={topic} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 truncate flex-1">{topic}</span>
                    <span
                      className="text-gray-300 px-2 py-1 rounded"
                      style={{ backgroundColor: `${expert?.color}22` }}
                    >
                      {expert?.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Queries */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              Query Log
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queries.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No queries yet</p>
              ) : (
                queries.slice(-5).reverse().map(query => (
                  <div
                    key={query.id}
                    className="bg-gray-900/50 rounded-lg p-2 border border-gray-700/50"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        {query.status === 'complete' ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : query.status === 'failed' ? (
                          <AlertCircle className="w-3 h-3 text-red-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-yellow-400 animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-300 truncate">
                          {query.question}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {query.requester} → {query.path.slice(1).join(' → ')}
                        </div>
                        {query.confidence && (
                          <div className="text-xs text-gray-400 mt-1">
                            Confidence: {(query.confidence * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}