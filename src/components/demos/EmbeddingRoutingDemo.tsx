'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Search, Brain, Calculator, Globe, Sparkles, CheckCircle, AlertCircle, BarChart, Activity } from 'lucide-react';

interface EmbeddingVector {
  id: string;
  dimensions: number[];
  magnitude: number;
  dominant_features: string[];
}

interface QueryAnalysis {
  text: string;
  embedding: EmbeddingVector;
  semantic_type: 'technical' | 'creative' | 'factual' | 'analytical' | 'conversational';
  confidence: number;
  keywords: string[];
}

interface ExpertAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  embedding: EmbeddingVector;
  expertise_areas: string[];
  processing_approach: string;
  similarity_threshold: number;
}

interface RoutingResult {
  selected_agent: string;
  similarity_score: number;
  confidence: number;
  reasoning: string[];
  alternative_agents: { agent: string; score: number }[];
}

const EXPERT_AGENTS: ExpertAgent[] = [
  {
    id: 'technical',
    name: 'Technical Expert',
    description: 'Deep technical knowledge and problem-solving',
    icon: <Calculator className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    embedding: {
      id: 'tech-embed',
      dimensions: [0.9, 0.2, 0.1, 0.8, 0.3, 0.9, 0.2, 0.7],
      magnitude: 2.1,
      dominant_features: ['code', 'algorithms', 'systems', 'architecture']
    },
    expertise_areas: ['Programming', 'System design', 'Algorithms', 'Debugging'],
    processing_approach: 'Structured problem decomposition with technical depth',
    similarity_threshold: 0.75
  },
  {
    id: 'creative',
    name: 'Creative Agent',
    description: 'Innovative thinking and creative solutions',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    embedding: {
      id: 'creative-embed',
      dimensions: [0.2, 0.9, 0.8, 0.3, 0.9, 0.2, 0.8, 0.4],
      magnitude: 2.0,
      dominant_features: ['ideation', 'design', 'brainstorm', 'innovation']
    },
    expertise_areas: ['Content creation', 'Design thinking', 'Brainstorming', 'Writing'],
    processing_approach: 'Divergent thinking with creative exploration',
    similarity_threshold: 0.70
  },
  {
    id: 'analytical',
    name: 'Analytical Agent',
    description: 'Data analysis and logical reasoning',
    icon: <BarChart className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    embedding: {
      id: 'analytical-embed',
      dimensions: [0.7, 0.3, 0.2, 0.9, 0.8, 0.6, 0.3, 0.9],
      magnitude: 2.0,
      dominant_features: ['data', 'analysis', 'statistics', 'metrics']
    },
    expertise_areas: ['Data analysis', 'Statistical modeling', 'Business intelligence', 'Research'],
    processing_approach: 'Systematic analysis with data-driven insights',
    similarity_threshold: 0.72
  },
  {
    id: 'general',
    name: 'General Assistant',
    description: 'Broad knowledge across multiple domains',
    icon: <Globe className="w-5 h-5" />,
    color: 'text-yellow-400',
    backgroundColor: 'bg-yellow-900/20 border-yellow-500/30',
    embedding: {
      id: 'general-embed',
      dimensions: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      magnitude: 1.4,
      dominant_features: ['general', 'help', 'information', 'assistance']
    },
    expertise_areas: ['General knowledge', 'Everyday tasks', 'Basic explanations', 'Casual conversation'],
    processing_approach: 'Balanced approach with broad coverage',
    similarity_threshold: 0.60
  }
];

const SAMPLE_QUERIES = [
  {
    id: 'debug-code',
    text: 'Debug this Python function that calculates fibonacci numbers recursively',
    embedding: { dimensions: [0.85, 0.25, 0.15, 0.75, 0.35, 0.85, 0.25, 0.65], magnitude: 1.9, dominant_features: ['debug', 'python', 'recursive', 'function'] },
    semantic_type: 'technical' as const,
    keywords: ['debug', 'Python', 'fibonacci', 'recursive'],
    expected_agent: 'technical'
  },
  {
    id: 'logo-design',
    text: 'Create a modern logo design for my eco-friendly startup',
    embedding: { dimensions: [0.25, 0.85, 0.75, 0.35, 0.85, 0.25, 0.75, 0.45], magnitude: 1.9, dominant_features: ['design', 'creative', 'visual', 'branding'] },
    semantic_type: 'creative' as const,
    keywords: ['logo', 'design', 'startup', 'eco-friendly'],
    expected_agent: 'creative'
  },
  {
    id: 'sales-analysis',
    text: 'Analyze quarterly sales trends and identify growth opportunities',
    embedding: { dimensions: [0.65, 0.35, 0.25, 0.85, 0.75, 0.55, 0.35, 0.85], magnitude: 1.8, dominant_features: ['sales', 'trends', 'analysis', 'business'] },
    semantic_type: 'analytical' as const,
    keywords: ['analyze', 'sales', 'trends', 'growth'],
    expected_agent: 'analytical'
  },
  {
    id: 'recipe-help',
    text: 'What\'s a good recipe for chocolate chip cookies?',
    embedding: { dimensions: [0.45, 0.55, 0.45, 0.55, 0.45, 0.55, 0.45, 0.55], magnitude: 1.3, dominant_features: ['recipe', 'cooking', 'help', 'general'] },
    semantic_type: 'conversational' as const,
    keywords: ['recipe', 'cookies', 'cooking'],
    expected_agent: 'general'
  },
  {
    id: 'ml-architecture',
    text: 'Design a neural network architecture for image classification with attention mechanisms',
    embedding: { dimensions: [0.92, 0.18, 0.12, 0.88, 0.28, 0.92, 0.18, 0.78], magnitude: 2.2, dominant_features: ['neural', 'architecture', 'ML', 'technical'] },
    semantic_type: 'technical' as const,
    keywords: ['neural network', 'architecture', 'attention', 'classification'],
    expected_agent: 'technical'
  }
];

export const EmbeddingRoutingDemo: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_QUERIES[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [queryAnalysis, setQueryAnalysis] = useState<QueryAnalysis | null>(null);
  const [embeddingVisualization, setEmbeddingVisualization] = useState<boolean>(false);
  const [similarityScores, setSimilarityScores] = useState<{ agent: string; score: number }[]>([]);
  const [routingResult, setRoutingResult] = useState<RoutingResult | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<ExpertAgent | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResponse, setFinalResponse] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setQueryAnalysis(null);
    setEmbeddingVisualization(false);
    setSimilarityScores([]);
    setRoutingResult(null);
    setSelectedAgent(null);
    setIsProcessing(false);
    setFinalResponse('');
    setExecutionLog([]);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedQuery, resetDemo]);

  const calculateCosineSimilarity = (vec1: number[], vec2: number[]): number => {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      magnitude1 += vec1[i] * vec1[i];
      magnitude2 += vec2[i] * vec2[i];
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) return 0;

    return dotProduct / (magnitude1 * magnitude2);
  };

  const findBestAgent = (queryEmbedding: EmbeddingVector): { scores: { agent: string; score: number }[]; best: ExpertAgent } => {
    const scores = EXPERT_AGENTS.map(agent => ({
      agent: agent.id,
      score: calculateCosineSimilarity(queryEmbedding.dimensions, agent.embedding.dimensions)
    })).sort((a, b) => b.score - a.score);

    const bestAgent = EXPERT_AGENTS.find(a => a.id === scores[0].agent)!;
    return { scores, best: bestAgent };
  };

  const generateResponse = (agent: ExpertAgent, query: string): string => {
    const responses: { [key: string]: { [key: string]: string } } = {
      'technical': {
        'debug-code': '**Debugging Analysis:**\n\n🔍 **Issue Found**: Stack overflow in recursive implementation\n\n**Problem Code:**\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)  # No memoization\n```\n\n**Fixed Solution:**\n```python\ndef fibonacci(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)\n    return memo[n]\n```\n\n**Key Improvements:**\n• Added memoization to cache results\n• Reduced time complexity from O(2^n) to O(n)\n• Prevents stack overflow for large inputs',
        'ml-architecture': '**Neural Network Architecture Design:**\n\n📐 **Proposed Architecture:**\n\n1. **Input Layer**: Conv2D(32, 3x3) → BatchNorm → ReLU\n2. **Feature Extraction**:\n   - ResNet-style blocks with skip connections\n   - Progressive channel expansion: 32→64→128→256\n\n3. **Attention Module**:\n   - Multi-head self-attention (8 heads)\n   - Position encoding for spatial awareness\n   - Feature map size: 14x14x256\n\n4. **Classification Head**:\n   - Global average pooling\n   - Dense(512) → Dropout(0.5)\n   - Dense(num_classes) → Softmax\n\n**Training Strategy:**\n• Optimizer: AdamW with cosine annealing\n• Loss: Label smoothing cross-entropy\n• Augmentation: MixUp + CutMix',
        'default': 'Technical analysis complete. Solution implemented using best practices and optimized algorithms.'
      },
      'creative': {
        'logo-design': '**Logo Design Concepts:**\n\n🎨 **Concept 1: "Living Leaf Circuit"**\n• Combines organic leaf shape with circuit board patterns\n• Color palette: Forest green (#2D5A3D) + Electric mint (#00FF88)\n• Symbolizes tech-nature harmony\n\n🌱 **Concept 2: "Infinity Garden"**\n• Infinity symbol formed by intertwining vines\n• Gradient from earth brown to sky blue\n• Represents sustainable cycles\n\n💡 **Concept 3: "Solar Seed"**\n• Minimalist seed pod with solar panel texture\n• Monochrome with gold accent\n• Clean, modern, scalable\n\n**Typography Recommendation:**\n• Primary: Montserrat (modern, clean)\n• Tagline: Poppins Light (friendly, approachable)\n\n**Applications:** Works across digital, print, merchandise',
        'default': 'Creative solution generated with innovative approaches and aesthetic considerations.'
      },
      'analytical': {
        'sales-analysis': '**Quarterly Sales Analysis:**\n\n📊 **Performance Metrics:**\n• Q3 Revenue: $2.4M (+18% QoQ)\n• Units Sold: 8,500 (+12% QoQ)\n• Average Order Value: $282 (+5.2%)\n\n📈 **Growth Opportunities Identified:**\n\n1. **Geographic Expansion** (Impact: +25% revenue)\n   - Untapped markets in Southeast region\n   - 40% lower competition density\n   \n2. **Product Bundle Optimization** (Impact: +15% AOV)\n   - Cross-sell rate currently 23% (industry avg: 35%)\n   - Recommended bundles based on purchase patterns\n   \n3. **Customer Retention** (Impact: +20% LTV)\n   - Current churn: 18%\n   - Implement loyalty program\n   - Personalized re-engagement campaigns\n\n**Action Priority:** Geographic > Retention > Bundling',
        'default': 'Analytical processing complete. Data-driven insights and recommendations provided.'
      },
      'general': {
        'recipe-help': '**Classic Chocolate Chip Cookies Recipe:**\n\n🍪 **Ingredients:**\n• 2¼ cups all-purpose flour\n• 1 tsp baking soda\n• 1 tsp salt\n• 1 cup butter (softened)\n• ¾ cup granulated sugar\n• ¾ cup brown sugar\n• 2 large eggs\n• 2 tsp vanilla extract\n• 2 cups chocolate chips\n\n**Instructions:**\n1. Preheat oven to 375°F (190°C)\n2. Mix flour, baking soda, and salt\n3. Cream butter and sugars until fluffy\n4. Beat in eggs and vanilla\n5. Gradually blend in flour mixture\n6. Stir in chocolate chips\n7. Drop rounded tablespoons onto baking sheets\n8. Bake 9-11 minutes until golden\n\n**Pro tip:** Chill dough for 30 mins for thicker cookies!',
        'default': 'Here\'s the information you requested. Let me know if you need any clarification!'
      }
    };

    const agentResponses = responses[agent.id];
    const queryKey = SAMPLE_QUERIES.find(q => q.text === query)?.id || 'default';
    return agentResponses[queryKey] || agentResponses['default'];
  };

  const runEmbeddingRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting embedding-based routing process...']);

    // Phase 1: Query Analysis
    setCurrentPhase('analysis');
    setExecutionLog(prev => [...prev, '📝 Analyzing query and generating embeddings...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const analysis: QueryAnalysis = {
      text: selectedQuery.text,
      embedding: selectedQuery.embedding,
      semantic_type: selectedQuery.semantic_type,
      confidence: 92,
      keywords: selectedQuery.keywords
    };

    setQueryAnalysis(analysis);
    setExecutionLog(prev => [...prev, `✅ Query embedding generated: ${analysis.embedding.dimensions.length}D vector`]);
    setExecutionLog(prev => [...prev, `✅ Semantic type: ${analysis.semantic_type}, Keywords: ${analysis.keywords.join(', ')}`]);

    // Phase 2: Embedding Visualization
    setCurrentPhase('embedding');
    setEmbeddingVisualization(true);
    setExecutionLog(prev => [...prev, '🔍 Computing similarity scores with agent embeddings...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const { scores, best } = findBestAgent(selectedQuery.embedding);
    setSimilarityScores(scores);
    setExecutionLog(prev => [...prev, '✅ Cosine similarity computed for all agents']);

    // Log top similarities
    scores.slice(0, 3).forEach((s, i) => {
      const agent = EXPERT_AGENTS.find(a => a.id === s.agent);
      setExecutionLog(prev => [...prev, `  ${i + 1}. ${agent?.name}: ${(s.score * 100).toFixed(1)}% similarity`]);
    });

    // Phase 3: Agent Selection
    setCurrentPhase('routing');
    setExecutionLog(prev => [...prev, '🎯 Selecting optimal agent based on embedding similarity...']);
    await new Promise(resolve => setTimeout(resolve, 1200 / speed));

    const result: RoutingResult = {
      selected_agent: best.id,
      similarity_score: scores[0].score,
      confidence: Math.min(scores[0].score * 100, 95),
      reasoning: [
        `Highest cosine similarity: ${(scores[0].score * 100).toFixed(1)}%`,
        `Dominant features match: ${best.embedding.dominant_features.join(', ')}`,
        `Meets threshold of ${(best.similarity_threshold * 100).toFixed(0)}%`
      ],
      alternative_agents: scores.slice(1, 3)
    };

    setRoutingResult(result);
    setSelectedAgent(best);
    setExecutionLog(prev => [...prev, `✅ Agent selected: ${best.name} (${(result.confidence).toFixed(1)}% confidence)`]);

    // Phase 4: Agent Processing
    setCurrentPhase('processing');
    setIsProcessing(true);
    setExecutionLog(prev => [...prev, `⚡ Processing with ${best.name}...`]);
    setExecutionLog(prev => [...prev, `  → Applying: ${best.processing_approach}`]);

    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    // Generate specialized response
    const response = generateResponse(best, selectedQuery.text);
    setFinalResponse(response);
    setIsProcessing(false);
    setExecutionLog(prev => [...prev, `✅ Processing complete via ${best.name}`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Embedding-based routing completed successfully!']);
  }, [selectedQuery, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (queryAnalysis && (phase === 'analysis' || (embeddingVisualization && (phase === 'embedding' || (routingResult && (phase === 'routing' || (finalResponse && phase === 'processing'))))))) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getEmbeddingBar = (value: number) => {
    const width = Math.abs(value) * 100;
    const color = value > 0 ? 'bg-blue-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-gray-700 rounded h-2 relative">
          <div
            className={`absolute top-0 left-0 h-full rounded ${color}`}
            style={{ width: `${width}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">{value.toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🧮</span>
          Embedding-based Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how semantic embeddings are used to route queries to the most suitable expert agent through vector similarity.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Query
            </label>
            <select
              value={selectedQuery.id}
              onChange={(e) => {
                const query = SAMPLE_QUERIES.find(q => q.id === e.target.value);
                if (query) setSelectedQuery(query);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_QUERIES.map((query) => (
                <option key={query.id} value={query.id}>
                  {query.text.substring(0, 50)}...
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
                onClick={runEmbeddingRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Processing...' : 'Start Routing'}
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

        {/* Query Preview */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Query to Route</h4>
          <p className="text-gray-300 italic">"{selectedQuery.text}"</p>
          <div className="mt-2 flex gap-2">
            {selectedQuery.keywords.map((keyword, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-700 rounded text-blue-400">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Embedding Routing Pipeline</h3>

          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Query Analysis */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('analysis')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Query Analysis & Embedding
                </h4>
                {currentPhase === 'analysis' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {queryAnalysis && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {queryAnalysis && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-400">Semantic Type:</span> <span className="text-purple-400 capitalize">{queryAnalysis.semantic_type}</span></div>
                    <div><span className="text-gray-400">Confidence:</span> <span className="text-yellow-400">{queryAnalysis.confidence}%</span></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Query Embedding Vector (8D):</div>
                    <div className="grid grid-cols-4 gap-2">
                      {queryAnalysis.embedding.dimensions.map((dim, idx) => (
                        <div key={idx} className="text-xs">
                          {getEmbeddingBar(dim)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Embedding Similarity */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('embedding')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Similarity Computation
                </h4>
                {currentPhase === 'embedding' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {embeddingVisualization && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {similarityScores.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400 mb-2">Cosine Similarity Scores:</div>
                  {similarityScores.map((score) => {
                    const agent = EXPERT_AGENTS.find(a => a.id === score.agent)!;
                    return (
                      <div key={score.agent} className="flex items-center gap-2">
                        <div className={`p-1 rounded ${agent.color === 'text-blue-400' ? 'bg-blue-600' : agent.color === 'text-purple-400' ? 'bg-purple-600' : agent.color === 'text-green-400' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                          {agent.icon}
                        </div>
                        <span className="text-sm text-white flex-1">{agent.name}</span>
                        <div className="w-32 bg-gray-700 rounded h-2 relative">
                          <div
                            className="absolute top-0 left-0 h-full rounded bg-gradient-to-r from-blue-500 to-green-500"
                            style={{ width: `${score.score * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-300">{(score.score * 100).toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Agent Selection */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('routing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Agent Selection
                </h4>
                {currentPhase === 'routing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {routingResult && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {routingResult && selectedAgent && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${selectedAgent.color === 'text-blue-400' ? 'bg-blue-600' : selectedAgent.color === 'text-purple-400' ? 'bg-purple-600' : selectedAgent.color === 'text-green-400' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {selectedAgent.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{selectedAgent.name}</div>
                      <div className="text-sm text-gray-400">Similarity: {(routingResult.similarity_score * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Selection Reasoning:</div>
                    <ul className="space-y-1">
                      {routingResult.reasoning.map((reason, idx) => (
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

            {/* Agent Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  {selectedAgent?.icon || <Brain className="w-4 h-4" />}
                  Specialized Processing
                </h4>
                {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {finalResponse && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedAgent && (
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Processing Approach:</span> <span className="text-white">{selectedAgent.processing_approach}</span></div>
                  <div>
                    <span className="text-gray-400">Expertise Areas:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedAgent.expertise_areas.map((area, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Available Agents */}
          <div>
            <h4 className="font-medium text-white mb-3">Expert Agent Pool</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EXPERT_AGENTS.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedAgent?.id === agent.id
                      ? agent.backgroundColor + ' border-opacity-100'
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${agent.color === 'text-blue-400' ? 'bg-blue-600' : agent.color === 'text-purple-400' ? 'bg-purple-600' : agent.color === 'text-green-400' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {agent.icon}
                    </div>
                    <div className="font-medium text-white text-sm">{agent.name}</div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{agent.description}</div>
                  <div className="text-xs text-gray-400">
                    <div className="mb-1">Embedding features:</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.embedding.dominant_features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-1 py-0.5 bg-gray-700/50 rounded text-blue-400">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
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

          {/* Final Response */}
          {finalResponse && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Agent Response</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedAgent?.icon}
                  <span className="font-medium text-white">Response from {selectedAgent?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">ROUTED</span>
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

export default EmbeddingRoutingDemo;