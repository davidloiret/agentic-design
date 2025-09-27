'use client';

import React, { useState } from 'react';
import { Brain, TreePine, GitBranch, Network, Zap, Trees, Eye, ChevronRight, Sparkles, X } from 'lucide-react';
import CoTDemo from './CoTDemo';
import ToTDemo from './ToTDemo';
import GoTDemo from './GoTDemo';
import ReActDemo from './ReActDemo';
import FoTDemo from './FoTDemo';
import MCMDemo from './MCMDemo';

interface TechniqueInfo {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  description: string;
  keyFeature: string;
  color: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Very High';
  category: 'Prompting' | 'Search' | 'Graph' | 'Tool Use' | 'Ensemble' | 'Meta';
}

const techniques: TechniqueInfo[] = [
  {
    id: 'cot',
    name: 'Chain-of-Thought',
    shortName: 'CoT',
    icon: <Brain className="w-5 h-5" />,
    description: 'Simple prompting with "Let\'s think step by step"',
    keyFeature: 'Linear reasoning through steps',
    color: 'from-blue-500 to-blue-600',
    complexity: 'Low',
    category: 'Prompting'
  },
  {
    id: 'tot',
    name: 'Tree-of-Thought',
    shortName: 'ToT',
    icon: <TreePine className="w-5 h-5" />,
    description: 'Explores multiple reasoning paths with backtracking',
    keyFeature: 'Tree search with evaluation',
    color: 'from-green-500 to-green-600',
    complexity: 'High',
    category: 'Search'
  },
  {
    id: 'got',
    name: 'Graph-of-Thought',
    shortName: 'GoT',
    icon: <Network className="w-5 h-5" />,
    description: 'Non-linear reasoning with thought aggregation',
    keyFeature: 'Graph operations: merge, refine, generate',
    color: 'from-purple-500 to-purple-600',
    complexity: 'Very High',
    category: 'Graph'
  },
  {
    id: 'react',
    name: 'ReAct',
    shortName: 'ReAct',
    icon: <Zap className="w-5 h-5" />,
    description: 'Combines reasoning with tool use',
    keyFeature: 'Thought → Action → Observation',
    color: 'from-orange-500 to-orange-600',
    complexity: 'Medium',
    category: 'Tool Use'
  },
  {
    id: 'fot',
    name: 'Forest-of-Thoughts',
    shortName: 'FoT',
    icon: <Trees className="w-5 h-5" />,
    description: 'Multiple trees with voting consensus',
    keyFeature: 'Ensemble reasoning with voting',
    color: 'from-teal-500 to-teal-600',
    complexity: 'Very High',
    category: 'Ensemble'
  },
  {
    id: 'mcm',
    name: 'Metacognitive Monitoring',
    shortName: 'MCM',
    icon: <Eye className="w-5 h-5" />,
    description: 'Self-awareness and confidence assessment',
    keyFeature: 'Monitors own reasoning quality',
    color: 'from-pink-500 to-pink-600',
    complexity: 'High',
    category: 'Meta'
  }
];

export default function DemoIndex() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareTechniques, setCompareTechniques] = useState<string[]>([]);

  const handleTechniqueSelect = (id: string) => {
    if (compareMode) {
      if (compareTechniques.includes(id)) {
        setCompareTechniques(compareTechniques.filter(t => t !== id));
      } else if (compareTechniques.length < 2) {
        setCompareTechniques([...compareTechniques, id]);
      }
    } else {
      setSelectedTechnique(id);
    }
  };

  const renderDemo = (techniqueId: string) => {
    switch (techniqueId) {
      case 'cot':
        return <CoTDemo />;
      case 'tot':
        return <ToTDemo />;
      case 'got':
        return <GoTDemo />;
      case 'react':
        return <ReActDemo />;
      case 'fot':
        return <FoTDemo />;
      case 'mcm':
        return <MCMDemo />;
      default:
        return null;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'text-green-400 bg-green-900/20 border-green-800/30';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-800/30';
      case 'High':
        return 'text-orange-400 bg-orange-900/20 border-orange-800/30';
      case 'Very High':
        return 'text-red-400 bg-red-900/20 border-red-800/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-800/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prompting':
        return 'bg-blue-600';
      case 'Search':
        return 'bg-green-600';
      case 'Graph':
        return 'bg-purple-600';
      case 'Tool Use':
        return 'bg-orange-600';
      case 'Ensemble':
        return 'bg-teal-600';
      case 'Meta':
        return 'bg-pink-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (selectedTechnique) {
    return (
      <div className="w-full">
        <div className="mb-6 p-4 bg-slate-900/50 border border-slate-700 rounded-xl">
          <button
            onClick={() => setSelectedTechnique(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Technique Overview
          </button>
        </div>
        {renderDemo(selectedTechnique)}
      </div>
    );
  }

  if (compareMode && compareTechniques.length === 2) {
    const [tech1, tech2] = compareTechniques.map(id => techniques.find(t => t.id === id)!);

    return (
      <div className="w-full space-y-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Technique Comparison</h2>
          <button
            onClick={() => {
              setCompareMode(false);
              setCompareTechniques([]);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Exit Comparison
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${tech1.color} mb-4`}>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {tech1.icon}
                {tech1.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Description</h4>
                <p className="text-white">{tech1.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Key Feature</h4>
                <p className="text-blue-300">{tech1.keyFeature}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Complexity</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs border ${getComplexityColor(tech1.complexity)}`}>
                  {tech1.complexity}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Category</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getCategoryColor(tech1.category)}`}>
                  {tech1.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setCompareMode(false);
                setCompareTechniques([]);
                setSelectedTechnique(tech1.id);
              }}
              className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View Demo →
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${tech2.color} mb-4`}>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {tech2.icon}
                {tech2.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Description</h4>
                <p className="text-white">{tech2.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Key Feature</h4>
                <p className="text-blue-300">{tech2.keyFeature}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Complexity</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs border ${getComplexityColor(tech2.complexity)}`}>
                  {tech2.complexity}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Category</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getCategoryColor(tech2.category)}`}>
                  {tech2.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setCompareMode(false);
                setCompareTechniques([]);
                setSelectedTechnique(tech2.id);
              }}
              className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View Demo →
            </button>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Comparison</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="pb-2">Aspect</th>
                <th className="pb-2">{tech1.shortName}</th>
                <th className="pb-2">{tech2.shortName}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-slate-700">
                <td className="py-2 text-slate-400">Complexity</td>
                <td className="py-2 text-white">{tech1.complexity}</td>
                <td className="py-2 text-white">{tech2.complexity}</td>
              </tr>
              <tr className="border-t border-slate-700">
                <td className="py-2 text-slate-400">Category</td>
                <td className="py-2 text-white">{tech1.category}</td>
                <td className="py-2 text-white">{tech2.category}</td>
              </tr>
              <tr className="border-t border-slate-700">
                <td className="py-2 text-slate-400">Best For</td>
                <td className="py-2 text-white">
                  {tech1.category === 'Prompting' ? 'Simple tasks' :
                   tech1.category === 'Search' ? 'Complex exploration' :
                   tech1.category === 'Tool Use' ? 'External data' :
                   tech1.category === 'Graph' ? 'Non-linear problems' :
                   tech1.category === 'Ensemble' ? 'High accuracy' :
                   'Self-improvement'}
                </td>
                <td className="py-2 text-white">
                  {tech2.category === 'Prompting' ? 'Simple tasks' :
                   tech2.category === 'Search' ? 'Complex exploration' :
                   tech2.category === 'Tool Use' ? 'External data' :
                   tech2.category === 'Graph' ? 'Non-linear problems' :
                   tech2.category === 'Ensemble' ? 'High accuracy' :
                   'Self-improvement'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          AI Reasoning Techniques Interactive Demos
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Explore and understand different AI reasoning techniques through interactive demonstrations.
          Each technique offers unique approaches to problem-solving, from simple prompting to complex graph-based reasoning.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setCompareMode(!compareMode);
            setCompareTechniques([]);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            compareMode
              ? 'bg-purple-600 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
        >
          {compareMode ? 'Comparing... Select 2 techniques' : 'Compare Techniques'}
        </button>
      </div>

      {/* Technique Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techniques.map((tech) => (
          <div
            key={tech.id}
            onClick={() => handleTechniqueSelect(tech.id)}
            className={`relative bg-slate-900/50 border rounded-xl p-6 transition-all cursor-pointer hover:shadow-xl ${
              compareMode && compareTechniques.includes(tech.id)
                ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            {/* Selection indicator for compare mode */}
            {compareMode && (
              <div className="absolute top-4 right-4">
                {compareTechniques.includes(tech.id) ? (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {compareTechniques.indexOf(tech.id) + 1}
                    </span>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-slate-500 rounded-full" />
                )}
              </div>
            )}

            {/* Header with gradient */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${tech.color} mb-4`}>
              {tech.icon}
              <h3 className="font-semibold text-white">{tech.shortName}</h3>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>

            {/* Description */}
            <p className="text-sm text-slate-400 mb-4">{tech.description}</p>

            {/* Key Feature */}
            <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-300">
                <strong>Key:</strong> {tech.keyFeature}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded border ${getComplexityColor(tech.complexity)}`}>
                {tech.complexity}
              </span>
              <span className={`text-xs px-2 py-1 rounded text-white ${getCategoryColor(tech.category)}`}>
                {tech.category}
              </span>
            </div>

            {/* Action button */}
            {!compareMode && (
              <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Demo
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Comparison hint */}
      {compareMode && compareTechniques.length < 2 && (
        <div className="text-center text-slate-400 text-sm">
          Select {2 - compareTechniques.length} more technique{compareTechniques.length === 1 ? '' : 's'} to compare
        </div>
      )}
    </div>
  );
}