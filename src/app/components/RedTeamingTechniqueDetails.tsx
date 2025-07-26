"use client"

import React from 'react';
import { Shield, Target, AlertTriangle, CheckCircle, XCircle, Zap, Lock, Users, Eye, BookOpen } from 'lucide-react';
import { allRedTeamingTechniques } from '../red-teaming';

interface RedTeamingTechniqueDetailsProps {
  categoryId: string;
  techniqueId: string;
}

const categoryIcons = {
  'prompt-injection': Target,
  'jailbreaking': Lock,
  'adversarial': Zap,
  'data-extraction': Eye,
  'social-engineering': Users,
  'model-inversion': BookOpen,
  'vulnerability-assessment': Shield,
  'supply-chain': Lock,
  'model-theft': Eye,
};

export const RedTeamingTechniqueDetails = ({ categoryId, techniqueId }: RedTeamingTechniqueDetailsProps) => {
  const technique = allRedTeamingTechniques.find(t => t.id === techniqueId && t.category === categoryId);
  
  if (!technique) {
    return (
      <div className="lg:col-span-3 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">Technique Not Found</h3>
          <p>The requested red teaming technique could not be found.</p>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[technique.category as keyof typeof categoryIcons] || Shield;
  const difficultyColors = {
    low: 'text-green-400 bg-green-400/10 border-green-500/30',
    medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/30',
    high: 'text-red-400 bg-red-400/10 border-red-500/30'
  };

  return (
    <div className="lg:col-span-3 overflow-y-auto">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${technique.color}`}>
              <span className="text-2xl">{technique.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{technique.name}</h1>
                {technique.abbr && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-md">
                    {technique.abbr}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[technique.complexity]}`}>
                  {technique.complexity} complexity
                </span>
                <span className="text-gray-400 text-sm capitalize">
                  {technique.category.replace('-', ' ')} Category
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-lg">{technique.description}</p>
        </div>

        {/* Example */}
        {technique.example && (
          <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Example Scenario
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300 italic">{technique.example}</p>
            </div>
          </div>
        )}

        {/* Objectives and Defenses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-red-400" />
              Testing Objectives
            </h2>
            <ul className="space-y-3">
              {technique.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Defensive Strategies
            </h2>
            <ul className="space-y-3">
              {technique.defenses.map((defense, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-gray-300">{defense}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features and Use Cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
            <ul className="space-y-2">
              {technique.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Use Cases</h2>
            <ul className="space-y-2">
              {technique.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm capitalize">{useCase.replace('-', ' ')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tools */}
        {technique.tools && technique.tools.length > 0 && (
          <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Tools & Frameworks</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {technique.tools.map((tool, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 text-sm text-center"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risks */}
        <div className="mb-8 bg-red-900/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Security Risks
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {technique.risks.map((risk, index) => (
              <div key={index} className="flex items-start space-x-3">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Guidelines */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Ethical Guidelines
          </h2>
          <ul className="space-y-2">
            {technique.ethicalGuidelines.map((guideline, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-yellow-400 flex-shrink-0 mt-1">•</span>
                <span className="text-gray-300 text-sm">{guideline}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-300 text-sm font-medium">
              Remember: This information is for educational and defensive security purposes only. 
              Always ensure you have proper authorization before testing any techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};