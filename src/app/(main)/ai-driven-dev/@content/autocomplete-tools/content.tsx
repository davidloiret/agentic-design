"use client"

import React from 'react';
import { Zap, TrendingUp, DollarSign, Code2 } from 'lucide-react';

export default function AutocompleteToolsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Autocomplete Tools</h1>
            <p className="text-gray-400 mt-2">Real-time code suggestions as you type</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Top Autocomplete Solutions</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">GitHub Copilot</h3>
                <p className="text-sm text-gray-400 mt-1">Industry standard autocomplete</p>
              </div>
              <span className="text-blue-400 font-bold">$10/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Model</p>
                <p className="text-sm text-gray-300">GPT-4 + Codex</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Best For</p>
                <p className="text-sm text-gray-300">All developers</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Trained on billions of lines of code. Works in every major IDE. Built-in chat for explanations.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Cursor Tab</h3>
                <p className="text-sm text-gray-400 mt-1">Context-aware predictions</p>
              </div>
              <span className="text-purple-400 font-bold">$20/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Context</p>
                <p className="text-sm text-gray-300">Full codebase</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Best For</p>
                <p className="text-sm text-gray-300">Large projects</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Uses your entire codebase for suggestions. Predicts multi-line edits. Understands your patterns.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Tabnine</h3>
                <p className="text-sm text-gray-400 mt-1">Privacy-focused autocomplete</p>
              </div>
              <span className="text-green-400 font-bold">$12/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Privacy</p>
                <p className="text-sm text-gray-300">Local models</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Best For</p>
                <p className="text-sm text-gray-300">Enterprises</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Train on your private code. Runs locally or self-hosted. GDPR compliant.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Amazon CodeWhisperer</h3>
                <p className="text-sm text-gray-400 mt-1">AWS-optimized suggestions</p>
              </div>
              <span className="text-orange-400 font-bold">Free</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Specialty</p>
                <p className="text-sm text-gray-300">AWS SDKs</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Best For</p>
                <p className="text-sm text-gray-300">Cloud devs</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Trained on AWS code examples. Security scanning built-in. Free for individual use.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">Performance Comparison</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">GitHub Copilot</span>
                <span className="text-sm text-blue-400">46%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '46%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Cursor Tab</span>
                <span className="text-sm text-purple-400">52%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '52%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Tabnine</span>
                <span className="text-sm text-green-400">38%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '38%'}}></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Acceptance rate across 10k developers</p>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold text-white">When to Use</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Boilerplate Code</p>
                <p className="text-sm text-gray-400">Import statements, type definitions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Repetitive Patterns</p>
                <p className="text-sm text-gray-400">CRUD operations, API calls</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Learning New APIs</p>
                <p className="text-sm text-gray-400">Discover methods as you type</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Pro Tip: Hybrid Approach</h2>
        <p className="text-gray-300 mb-4">
          Use autocomplete for speed + agentic tools for complex tasks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-yellow-400 mb-2">Autocomplete (90% of time)</p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Writing function bodies</li>
              <li>• Adding imports</li>
              <li>• Implementing interfaces</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-400 mb-2">Agentic (10% of time)</p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Refactoring architecture</li>
              <li>• Debugging complex issues</li>
              <li>• Writing tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
