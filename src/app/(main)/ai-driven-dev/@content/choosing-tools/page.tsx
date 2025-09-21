"use client"

import React, { useState } from 'react';
import {
  Wrench, DollarSign, Zap, Shield, Users, Code2, Terminal, Globe,
  CheckCircle, XCircle, AlertCircle, TrendingUp, Package, Brain,
  ArrowRight, ChevronRight, Star, GitBranch, Cloud, Lock
} from 'lucide-react';
import { UnderConstructionOverlay } from '../../../../components/UnderConstructionOverlay';

export default function ChoosingToolsPage() {
  const [selectedBudget, setSelectedBudget] = useState<'free' | 'personal' | 'team' | 'enterprise'>('personal');
  const [selectedPriority, setSelectedPriority] = useState<'speed' | 'accuracy' | 'privacy' | 'cost'>('accuracy');

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <UnderConstructionOverlay />
      <div className="px-8 py-12 filter blur-sm pointer-events-none">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
              <Wrench className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Choosing Your AI Coding Tool
              </h1>
              <p className="text-gray-400 mt-2">
                A comprehensive guide to selecting the right AI assistant for your development workflow in 2025
              </p>
            </div>
          </div>
        </div>

        {/* Quick Decision Framework */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-amber-400" />
            Quick Decision Framework
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setSelectedBudget('free')}
              className={`p-4 rounded-lg border transition-all ${
                selectedBudget === 'free'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <span className="block text-lg font-semibold">Free</span>
              <span className="text-xs">$0/month</span>
            </button>
            <button
              onClick={() => setSelectedBudget('personal')}
              className={`p-4 rounded-lg border transition-all ${
                selectedBudget === 'personal'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <span className="block text-lg font-semibold">Personal</span>
              <span className="text-xs">$10-20/month</span>
            </button>
            <button
              onClick={() => setSelectedBudget('team')}
              className={`p-4 rounded-lg border transition-all ${
                selectedBudget === 'team'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <span className="block text-lg font-semibold">Team</span>
              <span className="text-xs">$20-40/month</span>
            </button>
            <button
              onClick={() => setSelectedBudget('enterprise')}
              className={`p-4 rounded-lg border transition-all ${
                selectedBudget === 'enterprise'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <span className="block text-lg font-semibold">Enterprise</span>
              <span className="text-xs">Custom pricing</span>
            </button>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="font-medium text-white mb-3">Recommended for {selectedBudget === 'free' ? 'Free' : selectedBudget === 'personal' ? 'Personal' : selectedBudget === 'team' ? 'Team' : 'Enterprise'} Budget:</h3>
            {selectedBudget === 'free' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Codeium Free</span>
                  <span className="text-gray-400">- Unlimited autocomplete & chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Amazon Q Developer</span>
                  <span className="text-gray-400">- Full features, AWS optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">GitHub Copilot Free</span>
                  <span className="text-gray-400">- 2000 completions/month</span>
                </div>
              </div>
            )}
            {selectedBudget === 'personal' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">Claude Code ($20-100)</span>
                  <span className="text-gray-400">- Best for large codebases, terminal workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Cursor ($20)</span>
                  <span className="text-gray-400">- Advanced AI features, agent mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Windsurf ($15)</span>
                  <span className="text-gray-400">- Better value, great UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">GitHub Copilot ($10)</span>
                  <span className="text-gray-400">- Reliable, universal support</span>
                </div>
              </div>
            )}
            {selectedBudget === 'team' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">Claude Code Team</span>
                  <span className="text-gray-400">- Best for complex refactoring, multi-repo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Cursor Business ($40)</span>
                  <span className="text-gray-400">- Advanced collaboration features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Qodo Teams ($30)</span>
                  <span className="text-gray-400">- Code integrity & test automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">GitHub Copilot Business ($19)</span>
                  <span className="text-gray-400">- GitHub ecosystem integration</span>
                </div>
              </div>
            )}
            {selectedBudget === 'enterprise' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">Tabnine Enterprise</span>
                  <span className="text-gray-400">- On-premise, air-gapped deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">GitHub Copilot Enterprise ($39)</span>
                  <span className="text-gray-400">- Enterprise security & compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Claude Code Enterprise</span>
                  <span className="text-gray-400">- Custom deployment options</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            2025 Performance Benchmarks
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* HumanEval Performance */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">HumanEval (Code Generation)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Claude 3.7 Sonnet</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">GPT-4.1/o-series</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" style={{width: '90%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">90%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Gemini 2.5 Pro</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full" style={{width: '99%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">99%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">DeepSeek (Open)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SWE-bench Performance */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">SWE-bench (Real-world Issues)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Claude Opus 4</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{width: '72.5%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">72.5%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Claude 3.7 Sonnet</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{width: '70.3%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">70.3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Gemini 2.5 Pro</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full" style={{width: '63.8%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">63.8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">GPT-4.1</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" style={{width: '54.6%'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">54.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-400">
              <AlertCircle className="w-4 h-4 inline mr-2 text-amber-400" />
              <strong>Note:</strong> AI solving rate on SWE-bench improved from 4.4% (2023) to 69.1% (2025) - a 15x improvement in 2 years!
            </p>
          </div>
        </div>

        {/* Detailed Tool Comparison Matrix */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Comprehensive Tool Comparison</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tool</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Best For</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Key Features</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Limitations</th>
              </tr>
            </thead>
            <tbody>
              {/* Claude Code */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white font-medium">Claude Code</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Anthropic</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">$20-100/mo</td>
                <td className="py-4 px-4 text-gray-300">Large codebases, CLI workflows</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Terminal-first<br/>
                    • 200k token context<br/>
                    • Multi-file refactoring
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • No GUI<br/>
                    • CLI only<br/>
                    • Usage-based pricing
                  </div>
                </td>
              </tr>

              {/* Cursor */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white font-medium">Cursor</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Anysphere</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">$20/mo</td>
                <td className="py-4 px-4 text-gray-300">Power users, multi-model</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Agent mode<br/>
                    • All frontier models<br/>
                    • VS Code familiar
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Higher price<br/>
                    • Manual context<br/>
                    • Limited requests
                  </div>
                </td>
              </tr>

              {/* Windsurf */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white font-medium">Windsurf</span>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Codeium</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">$15/mo</td>
                <td className="py-4 px-4 text-gray-300">Beginners, UI-focused devs</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Cascade auto-context<br/>
                    • Polished UI<br/>
                    • Lower price
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • BYOK for Claude<br/>
                    • Gemini default<br/>
                    • Newer platform
                  </div>
                </td>
              </tr>

              {/* GitHub Copilot */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-white font-medium">GitHub Copilot</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded">Microsoft</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">$10/mo</td>
                <td className="py-4 px-4 text-gray-300">Universal compatibility</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Works everywhere<br/>
                    • GitHub integration<br/>
                    • Reliable
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Basic features<br/>
                    • No agent mode<br/>
                    • Limited context
                  </div>
                </td>
              </tr>

              {/* Codeium */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white font-medium">Codeium</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Free</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Free</td>
                <td className="py-4 px-4 text-gray-300">Budget-conscious devs</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Unlimited free<br/>
                    • Chat + autocomplete<br/>
                    • IDE support
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Less sophisticated<br/>
                    • Weaker on complex<br/>
                    • Limited features
                  </div>
                </td>
              </tr>

              {/* Tabnine */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-white font-medium">Tabnine</span>
                    <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded">Privacy</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">$20/mo</td>
                <td className="py-4 px-4 text-gray-300">Enterprise, offline needs</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • On-premise deploy<br/>
                    • Offline mode<br/>
                    • Team training
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Expensive<br/>
                    • Less accurate<br/>
                    • Setup complexity
                  </div>
                </td>
              </tr>

              {/* Amazon Q */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white font-medium">Amazon Q</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">AWS</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Free</td>
                <td className="py-4 px-4 text-gray-300">AWS developers</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • AWS optimized<br/>
                    • Security scanning<br/>
                    • Free tier
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • AWS-centric<br/>
                    • Limited languages<br/>
                    • Basic features
                  </div>
                </td>
              </tr>

              {/* Qodo (Codium) */}
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-white font-medium">Qodo (Codium)</span>
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">Testing</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Free/$30/mo</td>
                <td className="py-4 px-4 text-gray-300">Test-driven development</td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • AI test generation<br/>
                    • Edge case detection<br/>
                    • Code integrity focus
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-400">
                    • Testing-focused<br/>
                    • Not general coding<br/>
                    • Still in evolution
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Use Case Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              By Developer Type
            </h2>

            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Solo Developer</h3>
                <p className="text-sm text-gray-400 mb-2">Working on personal projects, startups</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Cursor ($20) or Windsurf ($15)</span>
                </div>
              </div>

              <div className="border-l-2 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Enterprise Developer</h3>
                <p className="text-sm text-gray-400 mb-2">Strict security requirements, compliance</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Tabnine Enterprise or GitHub Copilot Business</span>
                </div>
              </div>

              <div className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Open Source Contributor</h3>
                <p className="text-sm text-gray-400 mb-2">Working on public repos, community projects</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Codeium Free or GitHub Copilot</span>
                </div>
              </div>

              <div className="border-l-2 border-orange-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">AWS Developer</h3>
                <p className="text-sm text-gray-400 mb-2">Building on AWS, using AWS services</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Amazon Q Developer (Free)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-400" />
              By Project Type
            </h2>

            <div className="space-y-4">
              <div className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Large Refactoring</h3>
                <p className="text-sm text-gray-400 mb-2">Multi-file changes, architecture updates</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Claude Code or Cursor Agent Mode</span>
                </div>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Rapid Prototyping</h3>
                <p className="text-sm text-gray-400 mb-2">Quick MVPs, proof of concepts</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Windsurf with Cascade</span>
                </div>
              </div>

              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Production Systems</h3>
                <p className="text-sm text-gray-400 mb-2">Mission-critical, high reliability needed</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">GitHub Copilot + Manual review</span>
                </div>
              </div>

              <div className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Learning & Education</h3>
                <p className="text-sm text-gray-400 mb-2">Students, bootcamps, tutorials</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Codeium Free or GitHub Copilot Free</span>
                </div>
              </div>

              <div className="border-l-2 border-amber-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Test-Driven Development</h3>
                <p className="text-sm text-gray-400 mb-2">Focus on quality, edge cases, testing</p>
                <div className="text-sm">
                  <span className="text-cyan-400">Best Choice:</span>
                  <span className="text-white ml-2">Qodo (Free/Teams) + Your coding tool</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Flowchart */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Decision Flowchart</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-2">What's your budget?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-300">$0/month</p>
                    <ArrowRight className="w-3 h-3 text-gray-500 mt-1" />
                    <p className="text-xs text-cyan-400 mt-1">Codeium or Amazon Q</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-300">$10-15/month</p>
                    <ArrowRight className="w-3 h-3 text-gray-500 mt-1" />
                    <p className="text-xs text-cyan-400 mt-1">Copilot or Windsurf</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-300">$20-30/month</p>
                    <ArrowRight className="w-3 h-3 text-gray-500 mt-1" />
                    <p className="text-xs text-cyan-400 mt-1">Cursor or Claude Code</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-300">Enterprise</p>
                    <ArrowRight className="w-3 h-3 text-gray-500 mt-1" />
                    <p className="text-xs text-cyan-400 mt-1">Tabnine or Copilot Biz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-2">What's your priority?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Zap className="w-4 h-4 text-yellow-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Speed</p>
                    <p className="text-xs text-cyan-400 mt-1">Cursor or Windsurf</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Brain className="w-4 h-4 text-purple-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Accuracy</p>
                    <p className="text-xs text-cyan-400 mt-1">Claude Code</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Shield className="w-4 h-4 text-green-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Privacy</p>
                    <p className="text-xs text-cyan-400 mt-1">Tabnine</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <DollarSign className="w-4 h-4 text-amber-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Value</p>
                    <p className="text-xs text-cyan-400 mt-1">Codeium or Windsurf</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-2">What's your environment?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Terminal className="w-4 h-4 text-blue-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Terminal/CLI</p>
                    <p className="text-xs text-cyan-400 mt-1">Claude Code</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Code2 className="w-4 h-4 text-green-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">IDE/Editor</p>
                    <p className="text-xs text-cyan-400 mt-1">Cursor or Windsurf</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <Cloud className="w-4 h-4 text-purple-400 mb-1" />
                    <p className="text-sm font-medium text-gray-300">Cloud/Remote</p>
                    <p className="text-xs text-cyan-400 mt-1">GitHub Copilot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Recommendations */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-teal-400" />
            Our Top Recommendations for 2025
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Best Overall</h3>
              </div>
              <p className="text-white font-medium mb-2">Cursor - $20/month</p>
              <p className="text-sm text-gray-400">
                Perfect balance of features, model access, and IDE integration. Agent mode and frontier models make it worth the price.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Best Value</h3>
              </div>
              <p className="text-white font-medium mb-2">Windsurf - $15/month</p>
              <p className="text-sm text-gray-400">
                Cascade auto-context and polished UI at a lower price point. Great for beginners and UI-focused developers.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Best Free Option</h3>
              </div>
              <p className="text-white font-medium mb-2">Codeium - Free</p>
              <p className="text-sm text-gray-400">
                Unlimited autocomplete and chat for $0. Perfect for students, learners, and budget-conscious developers.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Best Enterprise</h3>
              </div>
              <p className="text-white font-medium mb-2">Tabnine Enterprise</p>
              <p className="text-sm text-gray-400">
                On-premise deployment, offline mode, and team training on your codebase. Perfect for regulated industries.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Pro Tip:</strong> Start with a free option (Codeium/Amazon Q) to understand AI coding, then upgrade to Cursor or Windsurf once you know what features matter most to you. Most tools offer free trials!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}