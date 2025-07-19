"use client"

import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight, Brain, Target, Code, MessageSquare, TreePine, RefreshCw, Network, Zap, X, Check, ArrowRight, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

export const AIReasoningExplorer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [userComplexity, setUserComplexity] = useState('');
  const [userConstraints, setUserConstraints] = useState([]);

  const techniques = [
    {
      id: 'cot',
      name: 'Chain-of-Thought',
      abbr: 'CoT',
      icon: '🔗',
      color: 'from-blue-500 to-blue-600',
      description: 'Breaks down complex problems into step-by-step intermediate reasoning steps',
      features: [
        'Decomposes complex problems into manageable sub-problems',
        'Provides transparent reasoning process',
        'Uses "think step by step" approach',
        'Foundation for advanced agent actions'
      ],
      useCases: ['complex-qa', 'math', 'planning', 'analysis'],
      complexity: 'low',
      example: 'Problem: "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?"\n\nCoT Response:\n1. First segment: 120 miles in 2 hours\n2. Second segment: 180 miles in 3 hours\n3. Total distance: 120 + 180 = 300 miles\n4. Total time: 2 + 3 = 5 hours\n5. Average speed: 300 ÷ 5 = 60 mph'
    },
    {
      id: 'tot',
      name: 'Tree-of-Thought',
      abbr: 'ToT',
      icon: '🌳',
      color: 'from-green-500 to-green-600',
      description: 'Explores multiple reasoning paths through branching and backtracking',
      features: [
        'Tree structure for exploring alternatives',
        'Supports backtracking and revision',
        'Evaluates multiple solution paths',
        'Ideal for strategic planning and complex decisions'
      ],
      useCases: ['planning', 'complex-qa', 'creative', 'optimization'],
      complexity: 'high',
      example: 'Problem: "Plan a 3-day trip to Paris with a $1000 budget"\n\nToT Branches:\n├─ Budget-focused path\n│  ├─ Hostels + street food\n│  └─ Airbnb + cooking\n├─ Experience-focused path\n│  ├─ Mid-range hotel + restaurants\n│  └─ Budget hotel + select dining\n└─ Balanced path (selected)\n   ├─ Budget hotel\n   ├─ Mix of dining options\n   └─ Free/low-cost attractions'
    },
    {
      id: 'self-correction',
      name: 'Self-Correction',
      abbr: '',
      icon: '🔄',
      color: 'from-purple-500 to-purple-600',
      description: 'Iteratively evaluates and refines generated content',
      features: [
        'Built-in quality control',
        'Identifies ambiguities and errors',
        'Iterative refinement process',
        'Enhances reliability and accuracy'
      ],
      useCases: ['content', 'code', 'analysis', 'creative'],
      complexity: 'medium',
      example: 'Initial Draft: "AI is good for business"\n\nSelf-Correction Process:\n1. Review: Too vague, lacks specifics\n2. Identify gaps: No examples, no metrics\n3. Revise: "AI enhances business operations through:\n   • 40% reduction in data processing time\n   • Automated customer service (24/7)\n   • Predictive analytics for inventory\n   • Personalized marketing campaigns"'
    },
    {
      id: 'palm',
      name: 'Program-Aided LMs',
      abbr: 'PALMs',
      icon: '💻',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Integrates code generation and execution for precise calculations',
      features: [
        'Generates executable code',
        'Deterministic computation',
        'Handles complex calculations',
        'Combines language and programming'
      ],
      useCases: ['math', 'data-analysis', 'scientific', 'financial'],
      complexity: 'medium',
      example: 'Question: "Calculate compound interest for $10,000 at 5% annually for 10 years"\n\nPALM generates:\n```python\nprincipal = 10000\nrate = 0.05\ntime = 10\namount = principal * (1 + rate) ** time\ninterest = amount - principal\nprint(f"Final amount: ${amount:.2f}")\nprint(f"Interest earned: ${interest:.2f}")\n```\nOutput: Final amount: $16,288.95\n        Interest earned: $6,288.95'
    },
    {
      id: 'react',
      name: 'ReAct',
      abbr: '',
      icon: '🎯',
      color: 'from-red-500 to-red-600',
      description: 'Combines reasoning with acting through external tool use',
      features: [
        'Thought → Action → Observation loop',
        'Integrates external tools',
        'Dynamic strategy adaptation',
        'Real-time environmental feedback'
      ],
      useCases: ['research', 'complex-qa', 'automation', 'investigation'],
      complexity: 'high',
      example: 'Task: "Find the current CEO of OpenAI"\n\nReAct Process:\nThought: Need to search for current OpenAI leadership\nAction: search("OpenAI CEO 2024")\nObservation: Results show Sam Altman returned as CEO\nThought: Should verify with official source\nAction: fetch("openai.com/about")\nObservation: Confirmed Sam Altman as CEO\nThought: Have reliable answer\nAction: finish("Sam Altman is the current CEO of OpenAI")'
    },
    {
      id: 'cod',
      name: 'Chain of Debates',
      abbr: 'CoD',
      icon: '💬',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Multiple AI models collaborate and debate to reach conclusions',
      features: [
        'Multi-model collaboration',
        'Peer review mechanism',
        'Reduces individual bias',
        'Leverages collective intelligence'
      ],
      useCases: ['analysis', 'decision-making', 'review', 'validation'],
      complexity: 'high',
      example: 'Question: "Should a startup use microservices architecture?"\n\nModel A: "Yes, microservices provide scalability and independence"\nModel B: "No, too complex for startups with limited resources"\nModel C: "Depends on team size and growth projections"\n\nDebate Resolution:\n• For startups <10 developers: Monolithic recommended\n• For rapid scaling needs: Microservices beneficial\n• Hybrid approach: Start monolithic, plan for migration'
    },
    {
      id: 'god',
      name: 'Graph of Debates',
      abbr: 'GoD',
      icon: '🕸️',
      color: 'from-pink-500 to-pink-600',
      description: 'Non-linear network of arguments with dynamic branching',
      features: [
        'Network structure of arguments',
        'Dynamic idea branching',
        'Relationship mapping',
        'Consensus through clustering'
      ],
      useCases: ['complex-analysis', 'research', 'policy', 'innovation'],
      complexity: 'very-high',
      example: 'Topic: "AI Regulation Strategy"\n\nGraph Structure:\n[Innovation] ←conflicts→ [Safety]\n     ↓ supports           ↑ supports\n[Economic Growth]    [Public Trust]\n     ↓ requires           ↑ requires\n[Investment] ←→ [Transparency]\n\nConsensus Cluster: Adaptive regulation framework'
    },
    {
      id: 'rlvr',
      name: 'RLVR',
      abbr: '',
      icon: '🧬',
      color: 'from-teal-500 to-teal-600',
      description: 'Reinforcement Learning with Verifiable Rewards for extended reasoning',
      features: [
        'Variable thinking time allocation',
        'Extended reasoning chains',
        'Self-correction capabilities',
        'Trial-and-error learning'
      ],
      useCases: ['math', 'complex-qa', 'optimization', 'scientific'],
      complexity: 'very-high',
      example: 'Problem: "Find the 47th Fibonacci number"\n\nRLVR Process:\n• Allocates extended thinking time\n• Generates multiple solution attempts\n• Verifies against known Fibonacci properties\n• Self-corrects calculation errors\n• Optimizes approach through iterations\n• Final answer: 2,971,215,073'
    }
  ];

  const useCases = [
    { id: 'complex-qa', name: 'Complex Question Answering', icon: '❓', description: 'Multi-hop queries requiring information synthesis' },
    { id: 'math', name: 'Mathematical Problem Solving', icon: '🔢', description: 'Calculations and mathematical reasoning' },
    { id: 'code', name: 'Code Generation & Debugging', icon: '🐛', description: 'Writing and fixing code' },
    { id: 'planning', name: 'Strategic Planning', icon: '📋', description: 'Developing comprehensive plans and strategies' },
    { id: 'analysis', name: 'Analysis & Evaluation', icon: '📊', description: 'Deep analysis of data or situations' },
    { id: 'content', name: 'Content Creation', icon: '✍️', description: 'Writing and creative content generation' },
    { id: 'research', name: 'Research & Investigation', icon: '🔬', description: 'In-depth research on topics' },
    { id: 'creative', name: 'Creative Problem Solving', icon: '🎨', description: 'Innovative and creative solutions' },
    { id: 'data-analysis', name: 'Data Analysis', icon: '📈', description: 'Processing and analyzing data' },
    { id: 'scientific', name: 'Scientific Computing', icon: '🧪', description: 'Scientific calculations and modeling' },
    { id: 'financial', name: 'Financial Analysis', icon: '💰', description: 'Financial calculations and planning' },
    { id: 'decision-making', name: 'Decision Making', icon: '🤔', description: 'Complex decision analysis' },
    { id: 'automation', name: 'Task Automation', icon: '🤖', description: 'Automating complex workflows' },
    { id: 'optimization', name: 'Optimization Problems', icon: '⚡', description: 'Finding optimal solutions' },
    { id: 'validation', name: 'Validation & Review', icon: '✅', description: 'Checking and validating work' },
    { id: 'policy', name: 'Policy Analysis', icon: '📜', description: 'Analyzing policies and regulations' },
    { id: 'innovation', name: 'Innovation Strategy', icon: '💡', description: 'Developing innovative approaches' },
    { id: 'investigation', name: 'Investigation', icon: '🔍', description: 'Investigating complex topics' },
    { id: 'review', name: 'Peer Review', icon: '👥', description: 'Reviewing and improving work' },
    { id: 'complex-analysis', name: 'Complex Systems Analysis', icon: '🌐', description: 'Analyzing complex interconnected systems' }
  ];

  const constraints = [
    { id: 'speed', name: 'Need fast responses', icon: '⚡' },
    { id: 'accuracy', name: 'Require high accuracy', icon: '🎯' },
    { id: 'transparency', name: 'Need explainable results', icon: '🔍' },
    { id: 'resources', name: 'Limited computational resources', icon: '💻' },
    { id: 'scale', name: 'Need to handle scale', icon: '📈' }
  ];

  const getRecommendations = () => {
    if (!selectedUseCase && !userComplexity) return [];

    let recommendations = techniques.map(technique => {
      let score = 0;
      let reasons = [];

      // Use case matching
      if (selectedUseCase && technique.useCases.includes(selectedUseCase)) {
        score += 3;
        const useCase = useCases.find(uc => uc.id === selectedUseCase);
        reasons.push(`Excellent for ${useCase.name}`);
      }

      // Complexity matching
      if (userComplexity === 'simple' && technique.complexity === 'low') {
        score += 2;
        reasons.push('Simple to implement');
      } else if (userComplexity === 'moderate' && technique.complexity === 'medium') {
        score += 2;
        reasons.push('Balanced complexity');
      } else if (userComplexity === 'complex' && ['high', 'very-high'].includes(technique.complexity)) {
        score += 2;
        reasons.push('Handles complex scenarios');
      }

      // Constraint matching
      if (userConstraints.includes('speed') && ['cot', 'self-correction'].includes(technique.id)) {
        score += 1;
        reasons.push('Relatively fast execution');
      }
      if (userConstraints.includes('accuracy') && ['palm', 'rlvr', 'tot'].includes(technique.id)) {
        score += 1;
        reasons.push('High accuracy potential');
      }
      if (userConstraints.includes('transparency') && ['cot', 'react'].includes(technique.id)) {
        score += 1;
        reasons.push('Transparent reasoning process');
      }
      if (userConstraints.includes('resources') && technique.complexity === 'low') {
        score += 1;
        reasons.push('Resource efficient');
      }

      return {
        ...technique,
        score,
        reasons,
        recommended: score > 0
      };
    });

    return recommendations
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  const filteredTechniques = techniques.filter(technique =>
    technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    technique.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleConstraint = (constraintId) => {
    setUserConstraints(prev =>
      prev.includes(constraintId)
        ? prev.filter(c => c !== constraintId)
        : [...prev, constraintId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                AI Reasoning Techniques Explorer
              </h1>
              <p className="text-gray-400 mt-1">Discover the right reasoning technique for your use case</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('explore')}
              className={`py-4 px-6 font-medium transition-all border-b-2 ${
                activeTab === 'explore'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Explore Techniques
            </button>
            <button
              onClick={() => setActiveTab('recommend')}
              className={`py-4 px-6 font-medium transition-all border-b-2 ${
                activeTab === 'recommend'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Lightbulb className="w-4 h-4 inline mr-2" />
              Get Recommendations
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'explore' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Techniques List */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search techniques..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredTechniques.map((technique) => (
                  <button
                    key={technique.id}
                    onClick={() => setSelectedTechnique(technique)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedTechnique?.id === technique.id
                        ? 'bg-gradient-to-r ' + technique.color + ' border-transparent'
                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{technique.icon}</span>
                        <div>
                          <h3 className="font-semibold">
                            {technique.name}
                            {technique.abbr && (
                              <span className="text-sm ml-2 opacity-75">({technique.abbr})</span>
                            )}
                          </h3>
                          <p className={`text-sm mt-1 line-clamp-1 ${
                            selectedTechnique?.id === technique.id ? 'text-white/80' : 'text-gray-400'
                          }`}>
                            {technique.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-50" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Technique Details */}
            <div className="lg:col-span-2">
              {selectedTechnique ? (
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{selectedTechnique.icon}</span>
                      <div>
                        <h2 className="text-3xl font-bold">
                          {selectedTechnique.name}
                          {selectedTechnique.abbr && (
                            <span className="text-xl ml-2 text-gray-400">({selectedTechnique.abbr})</span>
                          )}
                        </h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 bg-gradient-to-r ${selectedTechnique.color}`}>
                          Complexity: {selectedTechnique.complexity}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-300">{selectedTechnique.description}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {selectedTechnique.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Best Use Cases</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechnique.useCases.map(useCaseId => {
                        const useCase = useCases.find(uc => uc.id === useCaseId);
                        return (
                          <span
                            key={useCaseId}
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                          >
                            {useCase?.icon} {useCase?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Example</h3>
                    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-gray-300">{selectedTechnique.example}</pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 flex items-center justify-center h-96">
                  <div className="text-center">
                    <Brain className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg">Select a technique to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Recommendation Tab */
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold mb-6">Find Your Perfect Reasoning Technique</h2>
              
              {/* Use Case Selection */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-4">What's your primary use case?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {useCases.slice(0, 12).map(useCase => (
                    <button
                      key={useCase.id}
                      onClick={() => setSelectedUseCase(useCase.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedUseCase === useCase.id
                          ? 'bg-blue-500 border-blue-400'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{useCase.icon}</div>
                      <div className="text-sm">{useCase.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Selection */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-4">How complex is your problem?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'simple', name: 'Simple', description: 'Straightforward tasks' },
                    { id: 'moderate', name: 'Moderate', description: 'Multi-step problems' },
                    { id: 'complex', name: 'Complex', description: 'Highly intricate challenges' }
                  ].map(level => (
                    <button
                      key={level.id}
                      onClick={() => setUserComplexity(level.id)}
                      className={`p-4 rounded-lg border transition-all ${
                        userComplexity === level.id
                          ? 'bg-purple-500 border-purple-400'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium">{level.name}</div>
                      <div className="text-sm opacity-75 mt-1">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-4">Any specific requirements?</label>
                <div className="flex flex-wrap gap-3">
                  {constraints.map(constraint => (
                    <button
                      key={constraint.id}
                      onClick={() => toggleConstraint(constraint.id)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        userConstraints.includes(constraint.id)
                          ? 'bg-green-500 border-green-400'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <span className="mr-2">{constraint.icon}</span>
                      {constraint.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowRecommendations(true)}
                disabled={!selectedUseCase && !userComplexity}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium transition-all hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Recommendations
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>

            {/* Recommendations */}
            {showRecommendations && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4">Recommended Techniques</h3>
                {getRecommendations().map((technique, idx) => (
                  <div
                    key={technique.id}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{technique.icon}</span>
                          <div>
                            <h4 className="text-xl font-semibold">
                              {idx + 1}. {technique.name}
                              {technique.abbr && <span className="text-gray-400 ml-2">({technique.abbr})</span>}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-yellow-400">
                                {'★'.repeat(Math.min(technique.score, 5))}
                              </span>
                              <span className="text-sm text-gray-400">
                                Match score: {technique.score}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{technique.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {technique.reasons.map((reason, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTechnique(technique);
                          setActiveTab('explore');
                        }}
                        className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
