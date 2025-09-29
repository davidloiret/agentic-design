"use client"

import React, { useState } from 'react';
import { Target, CheckCircle, AlertCircle, ArrowRight, Users, DollarSign, Zap, Code2, Globe, Terminal, Package } from 'lucide-react';

export default function DecisionGuideContent() {
  const [projectType, setProjectType] = useState<string>('');
  const [teamSize, setTeamSize] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const getRecommendation = () => {
    if (!projectType || !teamSize || !budget) return null;

    // Decision logic
    if (projectType === 'prototype' && budget === 'free') {
      return {
        primary: 'Bolt.new or Lovable',
        secondary: 'Claude.ai with Projects',
        reason: 'Fast prototyping with free tiers, visual feedback'
      };
    }

    if (projectType === 'production' && teamSize === 'team' && budget === 'enterprise') {
      return {
        primary: 'Cursor or Windsurf',
        secondary: 'GitHub Copilot for team',
        reason: 'Team collaboration, enterprise support, robust workflows'
      };
    }

    if (projectType === 'production' && teamSize === 'solo' && budget === 'paid') {
      return {
        primary: 'Claude Code',
        secondary: 'Cursor with Claude 4',
        reason: 'Deep reasoning for complex refactors, multi-file editing'
      };
    }

    if (projectType === 'learning') {
      return {
        primary: 'GitHub Copilot',
        secondary: 'Cursor (free tier)',
        reason: 'Low commitment, universal IDE support, great for exploration'
      };
    }

    return {
      primary: 'Cursor or Claude Code',
      secondary: 'GitHub Copilot',
      reason: 'Balanced power and ease of use'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
            <Target className="w-8 h-8 text-teal-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              AI Coding Tool Decision Guide
            </h1>
            <p className="text-gray-400 mt-2">
              Find the right AI coding tool for your specific needs
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Decision Tool */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Quick Recommendation Tool</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Project Type</label>
            <div className="space-y-2">
              {['prototype', 'production', 'learning', 'refactor'].map((type) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    projectType === type
                      ? 'bg-teal-500/20 border-2 border-teal-500 text-white'
                      : 'bg-gray-900/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Team Size</label>
            <div className="space-y-2">
              {['solo', 'small', 'team', 'enterprise'].map((size) => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    teamSize === size
                      ? 'bg-cyan-500/20 border-2 border-cyan-500 text-white'
                      : 'bg-gray-900/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {size === 'solo' ? 'Solo (1)' :
                   size === 'small' ? 'Small (2-5)' :
                   size === 'team' ? 'Team (6-20)' :
                   'Enterprise (20+)'}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Budget</label>
            <div className="space-y-2">
              {['free', 'paid', 'enterprise'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    budget === b
                      ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                      : 'bg-gray-900/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {b === 'free' ? 'Free / Open Source' :
                   b === 'paid' ? '$10-40/month' :
                   'Enterprise'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-teal-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Recommended Tools</h3>
                <p className="text-gray-300 mb-4">{recommendation.reason}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Primary Choice</p>
                <p className="text-lg font-semibold text-teal-400">{recommendation.primary}</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Alternative</p>
                <p className="text-lg font-semibold text-cyan-400">{recommendation.secondary}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Use Case Matrix */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Use Case → Tool Matrix</h2>

        <div className="space-y-6">
          {/* Rapid Prototyping */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Rapid Prototyping / MVPs</h3>
                <p className="text-sm text-gray-400 mb-4">Need to validate ideas quickly, visual feedback important</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Bolt.new</p>
                    <p className="text-xs text-gray-400">In-browser, instant preview, $40M ARR for a reason</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: V0 by Vercel</p>
                    <p className="text-xs text-gray-400">UI components, shadcn/ui, clean code</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Lovable</p>
                    <p className="text-xs text-gray-400">Full-stack, database included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Production Development */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Production Development</h3>
                <p className="text-sm text-gray-400 mb-4">Building real applications, need quality code and testing</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Cursor</p>
                    <p className="text-xs text-gray-400">Agent mode, all models, IDE replacement</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Claude Code</p>
                    <p className="text-xs text-gray-400">Deep reasoning, large codebases, CLI</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Windsurf</p>
                    <p className="text-xs text-gray-400">Cascade context, polished UX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Large Codebase Refactoring */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Package className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Large Codebase Refactoring</h3>
                <p className="text-sm text-gray-400 mb-4">Million+ line codebases, complex architecture changes</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Claude Code</p>
                    <p className="text-xs text-gray-400">200k context, multi-file editing, git integration</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Cursor Max Mode</p>
                    <p className="text-xs text-gray-400">1M token context window</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Sourcegraph Cody</p>
                    <p className="text-xs text-gray-400">Multi-repo context, enterprise code search</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLI / Terminal Workflows */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Terminal className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">CLI / Terminal Workflows</h3>
                <p className="text-sm text-gray-400 mb-4">Prefer command line, automation, scripts</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Aider</p>
                    <p className="text-xs text-gray-400">Git integration, open source, fast</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Claude Code</p>
                    <p className="text-xs text-gray-400">Safety-focused, terminal native</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: OpenHands</p>
                    <p className="text-xs text-gray-400">Autonomous, 53% SWE-bench</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Team Collaboration</h3>
                <p className="text-sm text-gray-400 mb-4">Multiple developers, shared context, code review</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: GitHub Copilot</p>
                    <p className="text-xs text-gray-400">Universal IDE support, $19/dev business</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Cursor (Team)</p>
                    <p className="text-xs text-gray-400">Shared API keys, team settings</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Augment</p>
                    <p className="text-xs text-gray-400">Enterprise features, on-premise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget-Conscious */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Budget-Conscious / Free Tier</h3>
                <p className="text-sm text-gray-400 mb-4">Want powerful AI without monthly costs</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Codeium</p>
                    <p className="text-xs text-gray-400">Unlimited free autocomplete + chat</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Best: Continue.dev</p>
                    <p className="text-xs text-gray-400">Open source, BYOK (API keys)</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 border border-gray-800">
                    <p className="font-medium text-white mb-1">Good: Aider</p>
                    <p className="text-xs text-gray-400">Free CLI tool, bring your own API</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Factors */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Decision Factors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Context Window */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Context Window Size</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300 font-medium">Small Projects (&lt;10k lines)</p>
                <p className="text-gray-400">Any tool works. GitHub Copilot sufficient.</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Medium (10k-100k lines)</p>
                <p className="text-gray-400">Cursor, Windsurf, Claude Code (100k-200k context)</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Large (100k-1M+ lines)</p>
                <p className="text-gray-400">Claude Code, Cursor Max Mode (1M tokens), Sourcegraph Cody</p>
              </div>
            </div>
          </div>

          {/* Model Access */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Model Access</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300 font-medium">Single Model</p>
                <p className="text-gray-400">GitHub Copilot (GPT-4), Claude Code (Claude only)</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Multi-Model</p>
                <p className="text-gray-400">Cursor (all models), Continue.dev (customizable)</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Custom API</p>
                <p className="text-gray-400">Continue.dev, Aider, Cline with BYOK</p>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Deployment Preference</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300 font-medium">Cloud/Browser</p>
                <p className="text-gray-400">Bolt.new, V0, Lovable, Replit, Claude.ai</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Local Desktop</p>
                <p className="text-gray-400">Cursor, Windsurf, VS Code extensions</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Terminal/CLI</p>
                <p className="text-gray-400">Claude Code, Aider, OpenHands</p>
              </div>
            </div>
          </div>

          {/* Learning Curve */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Learning Curve</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300 font-medium">Beginner Friendly</p>
                <p className="text-gray-400">GitHub Copilot, Windsurf, Bolt.new</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Intermediate</p>
                <p className="text-gray-400">Cursor, Cline, V0</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Advanced</p>
                <p className="text-gray-400">Claude Code, Aider, Continue.dev (requires config)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8">
        <div className="flex items-start gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">⚠️ Warning Signs</h2>
            <p className="text-gray-400">Avoid tools that show these red flags:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Vendor Lock-in</p>
              <p className="text-sm text-gray-400">Can't export your data, forced upgrades, proprietary formats</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Unclear Pricing</p>
              <p className="text-gray-400">Hidden fees, usage-based without caps, surprise charges</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">No Code Ownership</p>
              <p className="text-gray-400">Can't download code, must use their platform forever</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            <div>
              <p className="text-white font-medium">Poor Security</p>
              <p className="text-gray-400">No SOC2, unclear data handling, sends all code to cloud</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}