'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Search, Brain, Lightbulb, Zap, Users, BarChart3, CheckCircle, ArrowRight, Target } from 'lucide-react';

interface RoutingPath {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  criteria: string[];
  processingTime: number;
  specialization: string;
}

interface RequestAnalysis {
  complexity: 'low' | 'medium' | 'high';
  domain: string;
  type: 'factual' | 'analytical' | 'creative' | 'technical';
  confidence: number;
}

interface UserContext {
  expertise: 'beginner' | 'intermediate' | 'expert';
  previousTopics: string[];
  preferredStyle: 'concise' | 'detailed' | 'conversational';
  urgency: 'low' | 'normal' | 'high';
}

interface RoutingDecision {
  selectedPath: string;
  confidence: number;
  reasoning: string[];
  alternativePaths: { path: string; score: number }[];
}

const ROUTING_PATHS: RoutingPath[] = [
  {
    id: 'simple',
    name: 'Simple Path',
    description: 'Direct knowledge retrieval for factual queries',
    icon: <Search className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    criteria: ['Factual questions', 'Low complexity', 'Quick lookup needed'],
    processingTime: 2,
    specialization: 'Knowledge base search and fact retrieval'
  },
  {
    id: 'analytical',
    name: 'Analytical Path',
    description: 'Multi-step reasoning for complex problems',
    icon: <Brain className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    criteria: ['Complex problems', 'Logical reasoning', 'Multi-step analysis'],
    processingTime: 8,
    specialization: 'Structured reasoning and problem decomposition'
  },
  {
    id: 'creative',
    name: 'Creative Path',
    description: 'Ideation and brainstorming for open-ended tasks',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    criteria: ['Open-ended questions', 'Brainstorming', 'Innovation needed'],
    processingTime: 6,
    specialization: 'Creative ideation and divergent thinking'
  },
  {
    id: 'expert',
    name: 'Expert Path',
    description: 'Specialized domain knowledge for technical topics',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-red-400',
    backgroundColor: 'bg-red-900/20 border-red-500/30',
    criteria: ['Technical domains', 'Specialized knowledge', 'Expert-level detail'],
    processingTime: 12,
    specialization: 'Domain-specific expertise and deep technical knowledge'
  }
];

const SAMPLE_REQUESTS = [
  {
    id: 'quantum-crypto',
    text: 'How will quantum computing affect cryptocurrency security?',
    analysis: { complexity: 'high', domain: 'Technology/Finance', type: 'technical', confidence: 92 } as RequestAnalysis,
    context: { expertise: 'intermediate', previousTopics: ['blockchain', 'investing'], preferredStyle: 'detailed', urgency: 'normal' } as UserContext,
    expectedPath: 'expert'
  },
  {
    id: 'paris-capital',
    text: 'What is the capital of France?',
    analysis: { complexity: 'low', domain: 'Geography', type: 'factual', confidence: 98 } as RequestAnalysis,
    context: { expertise: 'beginner', previousTopics: ['geography'], preferredStyle: 'concise', urgency: 'normal' } as UserContext,
    expectedPath: 'simple'
  },
  {
    id: 'startup-name',
    text: 'Help me brainstorm creative names for my AI startup',
    analysis: { complexity: 'medium', domain: 'Business/Creative', type: 'creative', confidence: 87 } as RequestAnalysis,
    context: { expertise: 'intermediate', previousTopics: ['entrepreneurship'], preferredStyle: 'conversational', urgency: 'normal' } as UserContext,
    expectedPath: 'creative'
  },
  {
    id: 'market-analysis',
    text: 'Analyze the competitive landscape for cloud storage providers',
    analysis: { complexity: 'high', domain: 'Business', type: 'analytical', confidence: 89 } as RequestAnalysis,
    context: { expertise: 'expert', previousTopics: ['market research', 'tech industry'], preferredStyle: 'detailed', urgency: 'high' } as UserContext,
    expectedPath: 'analytical'
  },
  {
    id: 'machine-learning',
    text: 'Explain gradient descent optimization in neural networks',
    analysis: { complexity: 'high', domain: 'Machine Learning', type: 'technical', confidence: 94 } as RequestAnalysis,
    context: { expertise: 'expert', previousTopics: ['AI', 'algorithms'], preferredStyle: 'detailed', urgency: 'normal' } as UserContext,
    expectedPath: 'expert'
  }
];

export const DynamicRoutingDemo: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState(SAMPLE_REQUESTS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [analysis, setAnalysis] = useState<RequestAnalysis | null>(null);
  const [context, setContext] = useState<UserContext | null>(null);
  const [routingDecision, setRoutingDecision] = useState<RoutingDecision | null>(null);
  const [selectedPath, setSelectedPath] = useState<RoutingPath | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResponse, setFinalResponse] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setAnalysis(null);
    setContext(null);
    setRoutingDecision(null);
    setSelectedPath(null);
    setIsProcessing(false);
    setFinalResponse('');
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedRequest, resetDemo]);

  const calculatePathScores = (analysis: RequestAnalysis, context: UserContext): { path: string; score: number }[] => {
    const scores = ROUTING_PATHS.map(path => {
      let score = 0;
      
      // Base scoring by type
      if (path.id === 'simple' && analysis.type === 'factual') score += 40;
      if (path.id === 'analytical' && analysis.type === 'analytical') score += 40;
      if (path.id === 'creative' && analysis.type === 'creative') score += 40;
      if (path.id === 'expert' && analysis.type === 'technical') score += 40;
      
      // Complexity adjustments
      if (analysis.complexity === 'low' && path.id === 'simple') score += 20;
      if (analysis.complexity === 'medium' && (path.id === 'analytical' || path.id === 'creative')) score += 15;
      if (analysis.complexity === 'high' && (path.id === 'expert' || path.id === 'analytical')) score += 20;
      
      // Context adjustments
      if (context.expertise === 'expert' && path.id === 'expert') score += 10;
      if (context.expertise === 'beginner' && path.id === 'simple') score += 10;
      if (context.urgency === 'high' && path.id === 'simple') score += 5;
      if (context.preferredStyle === 'detailed' && (path.id === 'analytical' || path.id === 'expert')) score += 5;
      
      return { path: path.id, score: Math.max(0, Math.min(100, score)) };
    });
    
    return scores.sort((a, b) => b.score - a.score);
  };

  const generateResponse = (path: RoutingPath, request: string): string => {
    const responses: { [key: string]: { [key: string]: string } } = {
      'simple': {
        'paris-capital': 'Paris is the capital city of France.',
        'default': 'Based on our knowledge base, here is the factual answer to your question.'
      },
      'analytical': {
        'market-analysis': 'Competitive Analysis:\n\n1. Market Leaders: AWS (33%), Microsoft Azure (22%), Google Cloud (10%)\n2. Key Differentiators: Pricing, integration, security features\n3. Emerging Trends: Edge computing, AI integration, sustainability\n4. Opportunities: SMB market, specialized industry solutions\n\nRecommendation: Focus on underserved verticals with specialized compliance needs.',
        'default': 'Through systematic analysis, I\'ve broken down your problem into key components and provided a structured solution.'
      },
      'creative': {
        'startup-name': 'Creative AI Startup Names:\n\n🚀 Tech-Forward:\n• NeuralNova\n• CogniCraft\n• MindMesh\n• ThinkFlow\n\n💡 Abstract/Modern:\n• Axion Labs\n• Zenith AI\n• Prism Intelligence\n• Flux Dynamics\n\n🎯 Descriptive:\n• IntelliCore\n• BrainBridge\n• LogicLeap\n• WisdomWorks',
        'default': 'Here are several creative ideas and approaches to consider for your request.'
      },
      'expert': {
        'quantum-crypto': 'Quantum Computing Impact on Cryptocurrency Security:\n\n**Current Threat Level: Low-Medium (10-15 year timeline)**\n\n• **Shor\'s Algorithm**: Can break RSA and elliptic curve cryptography used in most cryptocurrencies\n• **Grover\'s Algorithm**: Reduces Bitcoin\'s SHA-256 hash security from 256-bit to 128-bit effective strength\n• **Timeline**: Practical quantum computers capable of breaking crypto likely 2035-2040\n\n**Mitigation Strategies**:\n• Post-quantum cryptography development (NIST standards)\n• Quantum-resistant blockchain protocols\n• Migration paths for existing cryptocurrencies\n\n**Investment Implications**: Monitor quantum-resistant crypto projects and consider diversification.',
        'machine-learning': 'Gradient Descent Optimization in Neural Networks:\n\n**Core Mechanism:**\nGradient descent minimizes the loss function by iteratively adjusting weights in the direction of steepest descent:\n\nθ(t+1) = θ(t) - α∇J(θ)\n\n**Key Variants:**\n• **Batch GD**: Uses entire dataset, stable but slow\n• **SGD**: Single sample, fast but noisy\n• **Mini-batch**: Balanced approach, most common\n\n**Advanced Optimizers:**\n• **Adam**: Adaptive learning rates with momentum\n• **RMSprop**: Handles sparse gradients well\n• **AdaGrad**: Adapts to parameter frequency\n\n**Practical Considerations:**\n• Learning rate scheduling\n• Gradient clipping for stability\n• Momentum for faster convergence',
        'default': 'Based on specialized domain knowledge, here is a comprehensive technical analysis of your question.'
      }
    };
    
    const pathResponses = responses[path.id];
    return pathResponses[request] || pathResponses['default'];
  };

  const runDynamicRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting dynamic routing process...']);

    // Phase 1: Request Analysis
    setCurrentPhase('analysis');
    setExecutionLog(prev => [...prev, '🔍 Analyzing request content and complexity...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));
    
    setAnalysis(selectedRequest.analysis);
    setExecutionLog(prev => [...prev, `✅ Analysis complete: ${selectedRequest.analysis.type} query, ${selectedRequest.analysis.complexity} complexity (${selectedRequest.analysis.confidence}% confidence)`]);

    // Phase 2: Context Analysis
    setCurrentPhase('context');
    setExecutionLog(prev => [...prev, '👤 Analyzing user context and preferences...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    
    setContext(selectedRequest.context);
    setExecutionLog(prev => [...prev, `✅ Context analysis: ${selectedRequest.context.expertise} user, prefers ${selectedRequest.context.preferredStyle} responses`]);

    // Phase 3: Route Decision
    setCurrentPhase('routing');
    setExecutionLog(prev => [...prev, '🎯 Calculating optimal routing path...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const pathScores = calculatePathScores(selectedRequest.analysis, selectedRequest.context);
    const bestPath = pathScores[0];
    const selectedPathData = ROUTING_PATHS.find(p => p.id === bestPath.path)!;
    
    const decision: RoutingDecision = {
      selectedPath: bestPath.path,
      confidence: bestPath.score,
      reasoning: [
        `Content type (${selectedRequest.analysis.type}) matches ${selectedPathData.name}`,
        `Complexity level (${selectedRequest.analysis.complexity}) appropriate for path`,
        `User expertise (${selectedRequest.context.expertise}) aligns with processing depth`
      ],
      alternativePaths: pathScores.slice(1, 3)
    };

    setRoutingDecision(decision);
    setSelectedPath(selectedPathData);
    setExecutionLog(prev => [...prev, `✅ Route selected: ${selectedPathData.name} (${bestPath.score}% confidence)`]);

    // Phase 4: Path Processing
    setCurrentPhase('processing');
    setIsProcessing(true);
    setExecutionLog(prev => [...prev, `⚡ Processing via ${selectedPathData.name}...`]);
    
    const processingTime = (selectedPathData.processingTime * 1000) / speed;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Phase 5: Response Generation
    const response = generateResponse(selectedPathData, selectedRequest.id);
    setFinalResponse(response);
    setIsProcessing(false);
    setExecutionLog(prev => [...prev, `✅ Processing complete: Response generated via ${selectedPathData.specialization}`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Dynamic routing complete! Response optimized for user context.']);
  }, [selectedRequest, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (analysis && (phase === 'analysis' || (context && (phase === 'context' || (routingDecision && (phase === 'routing' || (finalResponse && phase === 'processing'))))))) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🎯</span>
          Dynamic Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how requests are intelligently analyzed and routed to optimal processing paths based on content and context.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Request
            </label>
            <select
              value={selectedRequest.id}
              onChange={(e) => {
                const request = SAMPLE_REQUESTS.find(r => r.id === e.target.value);
                if (request) setSelectedRequest(request);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_REQUESTS.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.text.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Processing Speed
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
                onClick={runDynamicRouting}
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

        {/* Current Request */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Current Request</h4>
          <p className="text-gray-300 italic">"{selectedRequest.text}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Processing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Dynamic Routing Pipeline</h3>
          
          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Request Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('analysis')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Request Analysis
                </h4>
                {currentPhase === 'analysis' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {analysis && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {analysis && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-400">Type:</span> <span className="text-blue-400 capitalize">{analysis.type}</span></div>
                  <div><span className="text-gray-400">Complexity:</span> <span className="text-purple-400 capitalize">{analysis.complexity}</span></div>
                  <div><span className="text-gray-400">Domain:</span> <span className="text-green-400">{analysis.domain}</span></div>
                  <div><span className="text-gray-400">Confidence:</span> <span className="text-yellow-400">{analysis.confidence}%</span></div>
                </div>
              )}
            </div>

            {/* Context Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('context')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Context Analysis
                </h4>
                {currentPhase === 'context' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {context && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {context && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-400">Expertise:</span> <span className="text-blue-400 capitalize">{context.expertise}</span></div>
                  <div><span className="text-gray-400">Style:</span> <span className="text-purple-400 capitalize">{context.preferredStyle}</span></div>
                  <div><span className="text-gray-400">Urgency:</span> <span className="text-green-400 capitalize">{context.urgency}</span></div>
                  <div><span className="text-gray-400">Topics:</span> <span className="text-yellow-400">{context.previousTopics.join(', ')}</span></div>
                </div>
              )}
            </div>

            {/* Route Decision */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('routing')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Route Decision
                </h4>
                {currentPhase === 'routing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {routingDecision && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingDecision && selectedPath && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded ${selectedPath.color === 'text-green-400' ? 'bg-green-600' : selectedPath.color === 'text-blue-400' ? 'bg-blue-600' : selectedPath.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-red-600'}`}>
                      {selectedPath.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{selectedPath.name}</div>
                      <div className="text-sm text-gray-400">{routingDecision.confidence}% confidence</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Reasoning:</div>
                    <ul className="space-y-1">
                      {routingDecision.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-1">•</span>
                          <span className="text-gray-300">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Path Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  {selectedPath?.icon || <Zap className="w-4 h-4" />}
                  Path Processing
                </h4>
                {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {finalResponse && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedPath && (
                <div className="text-sm text-gray-300">
                  <div className="mb-2"><strong>Specialization:</strong> {selectedPath.specialization}</div>
                  {isProcessing && <div className="text-blue-400">Processing via {selectedPath.name}...</div>}
                </div>
              )}
            </div>
          </div>

          {/* Available Paths */}
          <div>
            <h4 className="font-medium text-white mb-3">Available Processing Paths</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ROUTING_PATHS.map((path) => (
                <div
                  key={path.id}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedPath?.id === path.id 
                      ? path.backgroundColor + ' border-opacity-100' 
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${path.color === 'text-green-400' ? 'bg-green-600' : path.color === 'text-blue-400' ? 'bg-blue-600' : path.color === 'text-purple-400' ? 'bg-purple-600' : 'bg-red-600'}`}>
                      {path.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{path.name}</div>
                      <div className="text-xs text-gray-400">{path.processingTime}s avg.</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">{path.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Log & Results */}
        <div className="space-y-6">
          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-2">
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

          {/* Final Response */}
          {finalResponse && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Generated Response</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedPath?.icon}
                  <span className="font-medium text-white">Via {selectedPath?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">OPTIMIZED</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line">
                  {finalResponse}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicRoutingDemo;