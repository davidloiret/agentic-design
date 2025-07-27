"use client"

import React from 'react';
import { Shield, Target, Lock, Zap, AlertTriangle, BookOpen, Users, Eye } from 'lucide-react';
import { redTeamingCategories } from '../red-teaming';

interface RedTeamingCategoryDetailsProps {
  categoryId: string;
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

export const RedTeamingCategoryDetails = ({ categoryId }: RedTeamingCategoryDetailsProps) => {
  const category = redTeamingCategories[categoryId as keyof typeof redTeamingCategories];
  
  if (!category) {
    return (
      <div className="lg:col-span-3 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">Category Not Found</h3>
          <p>The requested red teaming category could not be found.</p>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[categoryId as keyof typeof categoryIcons] || Shield;
  const difficultyColors = {
    low: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    high: 'text-red-400 bg-red-400/10'
  };

  const difficultyDistribution = category.techniques.reduce((acc, technique) => {
    acc[technique.complexity] = (acc[technique.complexity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="lg:col-span-3 overflow-y-auto">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{category.name}</h1>
              <p className="text-gray-400 mt-1">{category.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{category.techniques.length}</div>
              <div className="text-gray-400 text-sm">Techniques</div>
            </div>
            {Object.entries(difficultyDistribution).map(([difficulty, count]) => (
              <div key={difficulty} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className={`text-lg font-bold ${difficultyColors[difficulty as keyof typeof difficultyColors].split(' ')[0]}`}>
                    {count}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
                    {difficulty}
                  </div>
                </div>
                <div className="text-gray-400 text-sm capitalize">{difficulty} Complexity</div>
              </div>
            ))}
          </div>
        </div>

        {/* Techniques Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Techniques</h2>
          <div className="grid gap-6">
            {category.techniques.map((technique) => (
              <div
                key={technique.id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{technique.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{technique.name}</h3>
                      {technique.abbr && (
                        <span className="text-gray-500 text-sm">({technique.abbr})</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[technique.complexity]}`}>
                    {technique.complexity}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{technique.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {technique.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Primary Defenses
                    </h4>
                    <ul className="space-y-1">
                      {technique.defenses.slice(0, 3).map((defense, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {defense}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {technique.risks.length > 0 && (
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Key Risks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technique.risks.slice(0, 4).map((risk, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-red-900/20 text-red-300 text-xs rounded-md border border-red-500/30"
                        >
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ethical Guidelines */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Ethical Guidelines for {category.name}
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                When working with {category.name.toLowerCase()} techniques, always follow these ethical guidelines:
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Only test on systems you own or have explicit written permission to test</li>
                <li>• Focus on building better defenses, not conducting attacks</li>
                <li>• Follow responsible disclosure practices for any vulnerabilities found</li>
                <li>• Document and report findings to improve security for everyone</li>
                <li>• Consider the potential impact on users and society</li>
                <li>• Ensure compliance with all applicable laws and regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};