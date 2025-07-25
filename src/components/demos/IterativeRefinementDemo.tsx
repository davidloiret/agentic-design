'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Play, Pause, Zap, TrendingUp, Target, Star } from 'lucide-react';

interface RefinementCycle {
  id: number;
  type: 'structure' | 'content' | 'style' | 'final';
  title: string;
  focus: string;
  content: string;
  qualityScore: number;
  improvements: string[];
  timestamp: Date;
}

const SAMPLE_TOPICS = [
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Essay',
    description: 'Write an essay about renewable energy and climate change',
    cycles: [
      {
        type: 'structure' as const,
        title: 'Structure & Organization',
        focus: 'Improve logical flow, transitions, and paragraph structure',
        content: 'Renewable energy is important for fighting climate change. There are different types like solar, wind, and hydroelectric power.\n\nSolar panels convert sunlight into electricity. Wind turbines use moving air to generate power. Both are becoming more popular and cheaper.\n\nFossil fuels cause pollution and contribute to global warming. Renewable energy sources are cleaner and more sustainable for the future.\n\nGovernments should invest more in renewable energy infrastructure to create jobs and protect the environment.',
        qualityScore: 6.0,
        improvements: [
          'Added clear introduction and conclusion',
          'Organized content into logical paragraphs',
          'Improved transitions between ideas',
          'Created coherent argument structure'
        ]
      },
      {
        type: 'content' as const,
        title: 'Content & Evidence',
        focus: 'Add data, examples, and strengthen arguments with evidence',
        content: 'The transition to renewable energy represents a critical response to climate change, with global capacity reaching 3,372 GW in 2022 (IRENA).\n\nSolar energy costs have plummeted 85% since 2010, making it the cheapest electricity source in many regions. Wind power generates over 1,800 TWh annually, with Denmark producing 140% of its needs and exporting surplus to neighboring countries.\n\nFossil fuel combustion accounts for 75% of global greenhouse gas emissions. In contrast, renewable sources produce virtually zero operational emissions while creating 12 million jobs worldwide (IRENA, 2022).\n\nLeading nations like Germany (46% renewable electricity) and Costa Rica (99% renewable grid) demonstrate successful transition models, proving that ambitious renewable targets are achievable with proper policy frameworks.',
        qualityScore: 7.8,
        improvements: [
          'Integrated current statistics and data',
          'Added specific country examples',
          'Included comparative analysis',
          'Strengthened arguments with evidence'
        ]
      },
      {
        type: 'style' as const,
        title: 'Style & Polish',
        focus: 'Enhance readability, tone, and overall presentation',
        content: 'The renewable energy revolution has transformed from environmental aspiration to economic imperative, with global capacity surging to unprecedented heights as nations recognize that sustainability and prosperity are inextricably linked.\n\nSolar technology exemplifies this transformation most dramatically. Once prohibitively expensive, photovoltaic systems now deliver electricity at costs that would have seemed impossible just a decade ago—an 85% price reduction that has democratized clean energy access across continents. Meanwhile, wind power has matured into a cornerstone of modern energy systems, with Denmark\'s remarkable achievement of generating 140% of its electrical needs serving as a beacon for what\'s possible when vision meets commitment.\n\nThe environmental imperative remains stark: fossil fuel combustion continues driving three-quarters of global emissions, making the renewable transition not merely beneficial but existentially necessary. Yet the economic case proves equally compelling, with 12 million renewable energy professionals now building the foundation of tomorrow\'s economy.\n\nPioneering nations have illuminated the path forward. Germany\'s integration of 46% renewable electricity and Costa Rica\'s achievement of 99% clean power demonstrate that ambitious targets, once considered utopian, become achievable realities when supported by thoughtful policy and sustained commitment.',
        qualityScore: 9.2,
        improvements: [
          'Enhanced engaging opening with compelling narrative',
          'Improved sentence variety and flow',
          'Strengthened vocabulary and tone',
          'Added emotional resonance and persuasive elements'
        ]
      }
    ]
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics Article',
    description: 'Write an article about ethical considerations in artificial intelligence',
    cycles: [
      {
        type: 'structure' as const,
        title: 'Structure & Organization',
        focus: 'Organize ethical concerns into clear categories',
        content: 'Artificial intelligence raises important ethical questions that society must address.\n\nBias in AI systems can lead to unfair outcomes for certain groups. Privacy concerns arise when AI processes personal data.\n\nTransparency is important so people understand how AI makes decisions. Accountability matters when AI systems make mistakes.\n\nJob displacement from automation affects workers. AI should benefit everyone, not just tech companies.\n\nWe need regulations and guidelines to ensure AI development serves humanity\'s best interests.',
        qualityScore: 5.8,
        improvements: [
          'Organized content into thematic sections',
          'Created clearer argument progression',
          'Improved paragraph coherence',
          'Added logical transitions'
        ]
      },
      {
        type: 'content' as const,
        title: 'Content & Evidence',
        focus: 'Add research, case studies, and specific examples',
        content: 'Artificial intelligence\'s rapid advancement demands urgent ethical consideration as algorithms increasingly shape human experiences and opportunities.\n\nAlgorithmic bias presents immediate challenges: Amazon\'s hiring algorithm showed gender discrimination, while facial recognition systems demonstrate higher error rates for minorities (MIT study, 2019). These cases reveal how training data inequities perpetuate societal biases at scale.\n\nPrivacy erosion accelerates as AI systems process vast personal datasets. China\'s social credit system and predictive policing algorithms in US cities demonstrate surveillance capabilities that reshape citizen-state relationships fundamentally.\n\nEconomic disruption looms large, with McKinsey estimating 375 million workers may need retraining by 2030 due to automation. However, AI also creates opportunities: healthcare diagnostics, climate modeling, and accessibility tools showcase positive potential.\n\nRegulatory frameworks are emerging globally. The EU\'s AI Act establishes risk-based governance, while IEEE develops technical standards. Corporate initiatives like Partnership on AI promote responsible development practices.',
        qualityScore: 8.1,
        improvements: [
          'Added concrete examples and case studies',
          'Integrated research findings and statistics',
          'Included global regulatory context',
          'Balanced concerns with positive applications'
        ]
      },
      {
        type: 'style' as const,
        title: 'Style & Polish',
        focus: 'Refine tone for thoughtful, accessible discourse',
        content: 'As artificial intelligence weaves itself into the fabric of modern life, humanity stands at a crossroads where technological capability meets moral responsibility—a junction that demands not just innovation, but wisdom.\n\nThe specter of algorithmic bias haunts our digital age, manifesting in hiring systems that inadvertently discriminate and facial recognition technologies that fail minority communities disproportionately. Amazon\'s abandoned recruiting tool, which systematically downgraded resumes containing words like "women\'s," serves as a sobering reminder that our algorithms inherit not just our data, but our prejudices.\n\nPrivacy, once considered a fundamental right, faces unprecedented challenges as AI systems demonstrate voracious appetites for personal information. From China\'s comprehensive social credit system to predictive policing algorithms in American cities, we witness the emergence of surveillance capabilities that would have seemed fantastical just decades ago.\n\nYet within these challenges lies profound opportunity. AI democratizes medical diagnosis in underserved regions, accelerates climate research crucial for planetary survival, and creates accessibility tools that transform lives. The technology that threatens to displace 375 million workers also holds promise to augment human potential in ways we\'re only beginning to understand.\n\nOur response must be measured and inclusive, drawing from the EU\'s pioneering AI Act, IEEE\'s technical standards, and collaborative efforts like the Partnership on AI. The path forward requires not just regulatory frameworks, but a fundamental commitment to ensuring that humanity\'s greatest technological achievement serves all of humanity.',
        qualityScore: 9.4,
        improvements: [
          'Created compelling narrative structure',
          'Enhanced metaphorical language',
          'Improved emotional resonance',
          'Strengthened conclusion with call to action'
        ]
      }
    ]
  }
];

export const IterativeRefinementDemo: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(SAMPLE_TOPICS[0]);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [completedCycles, setCompletedCycles] = useState<RefinementCycle[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [showComparison, setShowComparison] = useState(false);

  const runRefinementProcess = useCallback(async () => {
    setIsRunning(true);
    setCompletedCycles([]);
    setCurrentCycle(0);
    setShowComparison(false);

    // Initial draft
    const initialDraft: RefinementCycle = {
      id: 0,
      type: 'structure',
      title: 'Initial Draft',
      focus: 'Basic content creation without refinement',
      content: selectedTopic.id === 'renewable-energy' 
        ? 'Renewable energy is good for the environment. Solar and wind power are clean. Fossil fuels are bad and cause pollution. We should use more renewable energy.'
        : 'AI ethics is important. AI can be biased and unfair. Privacy is a concern. We need rules for AI development.',
      qualityScore: 4.2,
      improvements: ['Initial draft created'],
      timestamp: new Date()
    };

    setCompletedCycles([initialDraft]);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    // Run refinement cycles
    for (let i = 0; i < selectedTopic.cycles.length; i++) {
      setCurrentCycle(i + 1);
      await new Promise(resolve => setTimeout(resolve, 2000 / speed));

      const cycle = selectedTopic.cycles[i];
      const refinedCycle: RefinementCycle = {
        id: i + 1,
        type: cycle.type,
        title: cycle.title,
        focus: cycle.focus,
        content: cycle.content,
        qualityScore: cycle.qualityScore,
        improvements: cycle.improvements,
        timestamp: new Date()
      };

      setCompletedCycles(prev => [...prev, refinedCycle]);
      await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    }

    setIsRunning(false);
    setShowComparison(true);
  }, [selectedTopic, speed]);

  const resetDemo = () => {
    setIsRunning(false);
    setCompletedCycles([]);
    setCurrentCycle(0);
    setShowComparison(false);
  };

  const getQualityColor = (score: number) => {
    if (score >= 9) return 'text-green-400';
    if (score >= 7) return 'text-blue-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getQualityBadge = (score: number) => {
    if (score >= 9) return 'bg-green-900/30 text-green-300 border-green-500/30';
    if (score >= 7) return 'bg-blue-900/30 text-blue-300 border-blue-500/30';
    if (score >= 5) return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30';
    return 'bg-red-900/30 text-red-300 border-red-500/30';
  };

  const getCycleIcon = (type: string) => {
    switch (type) {
      case 'structure': return <Target className="w-4 h-4" />;
      case 'content': return <Zap className="w-4 h-4" />;
      case 'style': return <Star className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔄</span>
          Iterative Refinement Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch content improve through systematic refinement cycles, each focusing on different aspects of quality.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content Topic
            </label>
            <select
              value={selectedTopic.id}
              onChange={(e) => {
                const topic = SAMPLE_TOPICS.find(t => t.id === e.target.value);
                if (topic) setSelectedTopic(topic);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Refinement Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-purple-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runRefinementProcess}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Refining...' : 'Start Refinement'}
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

        {/* Topic Description */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Current Task</h4>
          <p className="text-sm text-gray-300">{selectedTopic.description}</p>
        </div>
      </div>

      {/* Refinement Progress */}
      {completedCycles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Refinement Progress</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-400">Cycle {currentCycle} of {selectedTopic.cycles.length + 1}</span>
              {completedCycles.length > 1 && (
                <span className="text-blue-400">
                  Quality: {completedCycles[0].qualityScore.toFixed(1)} → {completedCycles[completedCycles.length - 1].qualityScore.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          
          {completedCycles.map((cycle, index) => (
            <div
              key={cycle.id}
              className={`border rounded-lg p-6 transition-all ${
                index === completedCycles.length - 1 && isRunning
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-gray-600 bg-gray-800/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  {getCycleIcon(cycle.type)}
                  {cycle.title}
                  {index === 0 && <span className="text-xs bg-gray-700 px-2 py-1 rounded">BASELINE</span>}
                </h4>
                <div className="flex items-center space-x-4">
                  <span className={`text-2xl font-bold ${getQualityColor(cycle.qualityScore)}`}>
                    {cycle.qualityScore.toFixed(1)}/10
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQualityBadge(cycle.qualityScore)}`}>
                    {cycle.qualityScore >= 9 ? 'Excellent' :
                     cycle.qualityScore >= 7 ? 'Good' :
                     cycle.qualityScore >= 5 ? 'Fair' : 'Needs Work'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content */}
                <div>
                  <h5 className="font-medium text-gray-300 mb-2">
                    {index === 0 ? 'Initial Content' : 'Refined Content'}
                  </h5>
                  <div className="bg-gray-800/40 p-4 rounded border border-gray-600/50 text-sm text-gray-200 max-h-48 overflow-y-auto">
                    {cycle.content}
                  </div>
                </div>

                {/* Improvements */}
                <div>
                  <h5 className="font-medium text-gray-300 mb-2">
                    {index === 0 ? 'Starting Point' : 'Improvements Made'}
                  </h5>
                  <div className="space-y-2">
                    {index > 0 && (
                      <div className="text-sm text-gray-400 mb-2 italic">
                        Focus: {cycle.focus}
                      </div>
                    )}
                    <ul className="space-y-1">
                      {cycle.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quality Progression Chart */}
          {showComparison && completedCycles.length > 1 && (
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/50">
              <h4 className="font-medium text-white mb-4">Quality Progression Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-300">Total Cycles:</span>
                  <span className="text-white ml-2">{completedCycles.length - 1}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-300">Quality Improvement:</span>
                  <span className="text-green-400 ml-2">
                    +{(completedCycles[completedCycles.length - 1].qualityScore - completedCycles[0].qualityScore).toFixed(1)} points
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-300">Final Grade:</span>
                  <span className={`ml-2 ${getQualityColor(completedCycles[completedCycles.length - 1].qualityScore)}`}>
                    {completedCycles[completedCycles.length - 1].qualityScore >= 9 ? 'A' :
                     completedCycles[completedCycles.length - 1].qualityScore >= 7 ? 'B' :
                     completedCycles[completedCycles.length - 1].qualityScore >= 5 ? 'C' : 'D'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-900/20 rounded border-l-4 border-purple-400">
                <p className="text-sm text-gray-200">
                  <strong>Refinement Complete:</strong> Through systematic improvement across structure, content, and style, 
                  the final output demonstrates significant quality enhancement while maintaining the original intent and core message.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IterativeRefinementDemo;