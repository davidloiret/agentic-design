"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronRight, Brain, Target, Code, MessageSquare, TreePine, RefreshCw, Network, Zap, X, Check, ArrowRight, Lightbulb, BookOpen, Sparkles, Share2, FlaskConical, Play, BarChart3, TestTube } from 'lucide-react';
import { NetworkGraph } from './NetworkGraph';
import { EvaluationInterface } from './EvaluationInterface';
import CodeSandbox from '../components/CodeSandbox';
import { techniques } from './techniques';
import { useCases } from './use-cases';
import { categories } from './categories';
import { constraints } from './constraints';
import { patternExamples, getPatternExample, type PatternId, type LanguageType } from './pattern-examples';

export const AIReasoningExplorer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [userComplexity, setUserComplexity] = useState('');
  const [userConstraints, setUserConstraints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Code sandbox state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('typescript');
  const [detailsTab, setDetailsTab] = useState<'overview' | 'code'>('overview');
  
  // Evaluation state
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [evaluationCriteria, setEvaluationCriteria] = useState([]);
  const [testScenario, setTestScenario] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [apiTokens, setApiTokens] = useState({});
  const [showTokenModal, setShowTokenModal] = useState(false);

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

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technique.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || technique.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                Agentic Design Patterns
              </h1>
              <p className="text-gray-400 mt-1">Comprehensive cheatsheet for building agentic systems</p>
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
              data-tab="explore"
              className={`py-4 px-6 font-medium transition-all border-b-2 ${
                activeTab === 'explore'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Explore Patterns
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
            <button
              onClick={() => setActiveTab('graph')}
              className={`py-4 px-6 font-medium transition-all border-b-2 ${
                activeTab === 'graph'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Pattern Network
            </button>
            <button
              onClick={() => setActiveTab('evaluate')}
              className={`py-4 px-6 font-medium transition-all border-b-2 ${
                activeTab === 'evaluate'
                  ? 'text-orange-400 border-orange-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <FlaskConical className="w-4 h-4 inline mr-2" />
              Evaluate & Compare
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
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search patterns..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Categories</label>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg border transition-all text-left ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 border-blue-400 text-white'
                            : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <div>
                            <div className="font-medium text-sm">{category.name}</div>
                            <div className="text-xs opacity-75">{category.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {filteredTechniques.map((technique) => (
                  <button
                    key={technique.id}
                    onClick={() => setSelectedTechnique(technique)}
                    className={`w-full text-left p-4 rounded-lg border transition-all group ${
                      selectedTechnique?.id === technique.id
                        ? 'bg-gradient-to-r ' + technique.color + ' border-transparent shadow-lg'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                        selectedTechnique?.id === technique.id 
                          ? 'bg-white/20' 
                          : 'bg-gray-700 group-hover:bg-gray-600'
                      }`}>
                        {technique.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold text-sm truncate ${
                            selectedTechnique?.id === technique.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {technique.name}
                            {technique.abbr && (
                              <span className="text-xs ml-1 opacity-75">({technique.abbr})</span>
                            )}
                          </h3>
                          <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                            selectedTechnique?.id === technique.id ? 'text-white/70' : 'text-gray-500'
                          }`} />
                        </div>
                        <p className={`text-xs leading-relaxed line-clamp-2 ${
                          selectedTechnique?.id === technique.id ? 'text-white/80' : 'text-gray-400'
                        }`}>
                          {technique.description}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            selectedTechnique?.id === technique.id 
                              ? 'bg-white/20 text-white/90' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {categories.find(c => c.id === technique.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Technique Details */}
            <div className="lg:col-span-2">
              {selectedTechnique ? (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                          {selectedTechnique.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h1 className="text-2xl font-bold text-white mb-1">
                              {selectedTechnique.name}
                              {selectedTechnique.abbr && (
                                <span className="text-lg ml-2 text-gray-400 font-normal">({selectedTechnique.abbr})</span>
                              )}
                            </h1>
                            <p className="text-gray-300 text-base leading-relaxed mb-3">{selectedTechnique.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedTechnique.color} text-white`}>
                                Complexity: {selectedTechnique.complexity}
                              </span>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-200">
                                {categories.find(c => c.id === selectedTechnique.category)?.name || 'Pattern'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Tabs */}
                  <div className="border-b border-gray-600">
                    <div className="flex gap-6 px-6">
                      <button
                        onClick={() => setDetailsTab('overview')}
                        className={`py-4 px-2 font-medium transition-all border-b-2 ${
                          detailsTab === 'overview'
                            ? 'text-blue-400 border-blue-400'
                            : 'text-gray-400 border-transparent hover:text-gray-200'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 inline mr-2" />
                        Overview
                      </button>
                      <button
                        onClick={() => setDetailsTab('code')}
                        className={`py-4 px-2 font-medium transition-all border-b-2 ${
                          detailsTab === 'code'
                            ? 'text-green-400 border-green-400'
                            : 'text-gray-400 border-transparent hover:text-gray-200'
                        }`}
                      >
                        <Code className="w-4 h-4 inline mr-2" />
                        Interactive Code
                      </button>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="p-6">
                    {detailsTab === 'overview' ? (
                      <div className="space-y-8">
                        {/* Key Features */}
                        <section>
                          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                            Key Features
                          </h2>
                          <div className="grid gap-3">
                            {selectedTechnique.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Best Use Cases */}
                        <section>
                          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                            Best Use Cases
                          </h2>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedTechnique.useCases.map(useCaseId => {
                              const useCase = useCases.find(uc => uc.id === useCaseId);
                              return (
                                <div
                                  key={useCaseId}
                                  className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg text-sm"
                                >
                                  <span className="text-base">{useCase?.icon}</span>
                                  <span className="text-gray-300 font-medium">{useCase?.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </section>

                        {/* Example */}
                        <section>
                          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                            Example
                          </h2>
                          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                              <span className="text-xs font-medium text-gray-400">Implementation Example</span>
                            </div>
                            <div className="p-4">
                              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-mono">{selectedTechnique.example}</pre>
                            </div>
                          </div>
                        </section>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Language Selection */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                            Interactive Code Examples
                          </h2>
                          <div className="flex gap-2">
                            {(['typescript', 'python', 'rust'] as LanguageType[]).map(lang => (
                              <button
                                key={lang}
                                onClick={() => setSelectedLanguage(lang)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  selectedLanguage === lang
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                              >
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Code Sandbox */}
                        {patternExamples[selectedTechnique.id as PatternId] ? (
                          <CodeSandbox
                            patternId={selectedTechnique.id}
                            initialCode={patternExamples[selectedTechnique.id as PatternId][selectedLanguage]}
                            language={selectedLanguage}
                            onCodeChange={(code) => {
                              // Optional: Handle code changes if needed
                              console.log('Code changed:', code);
                            }}
                          />
                        ) : (
                          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                            <Code className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                            <p className="text-gray-400">Code examples coming soon for this pattern</p>
                          </div>
                        )}
                      </div>
                    )}
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
        ) : activeTab === 'recommend' ? (
          /* Recommendation Tab */
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold mb-6">Find Your Perfect Agentic Pattern</h2>
              
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
                <h3 className="text-2xl font-bold mb-4">Recommended Patterns</h3>
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
        ) : activeTab === 'graph' ? (
          /* Graph Tab */
          <div className="h-[calc(100vh-16rem)]">
            <NetworkGraph 
              techniques={techniques} 
              categories={categories} 
              useCases={useCases}
              onTechniqueSelect={setSelectedTechnique}
              selectedTechnique={selectedTechnique}
            />
          </div>
        ) : (
          /* Evaluation Tab */
          <EvaluationInterface 
            techniques={techniques}
            categories={categories}
            useCases={useCases}
            selectedPatterns={selectedPatterns}
            setSelectedPatterns={setSelectedPatterns}
            evaluationCriteria={evaluationCriteria}
            setEvaluationCriteria={setEvaluationCriteria}
            testScenario={testScenario}
            setTestScenario={setTestScenario}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            evaluationResults={evaluationResults}
            setEvaluationResults={setEvaluationResults}
            apiTokens={apiTokens}
            setApiTokens={setApiTokens}
            showTokenModal={showTokenModal}
            setShowTokenModal={setShowTokenModal}
          />
        )}
      </div>
    </div>
  );
};
