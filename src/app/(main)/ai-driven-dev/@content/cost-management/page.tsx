"use client"

import React from 'react';
import { DollarSign, TrendingDown, Calculator, AlertCircle } from 'lucide-react';

export default function CostManagementPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI Coding Cost Management</h1>
            <p className="text-gray-400 mt-2">Optimize spend while maximizing productivity</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding AI Coding Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-white font-medium mb-2">Subscription Costs</p>
            <p className="text-3xl font-bold text-green-400 mb-1">$10-100</p>
            <p className="text-xs text-gray-400">per developer/month</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-white font-medium mb-2">Token/API Costs</p>
            <p className="text-3xl font-bold text-blue-400 mb-1">$0.03</p>
            <p className="text-xs text-gray-400">per 1K tokens (Claude)</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-white font-medium mb-2">Typical Monthly</p>
            <p className="text-3xl font-bold text-purple-400 mb-1">$50-200</p>
            <p className="text-xs text-gray-400">per developer all-in</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Cost Comparison by Tool</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400">Tool</th>
                <th className="text-left py-3 text-gray-400">Price/Month</th>
                <th className="text-left py-3 text-gray-400">Token Limits</th>
                <th className="text-left py-3 text-gray-400">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3 text-white">GitHub Copilot</td>
                <td className="py-3 text-gray-300">$10</td>
                <td className="py-3 text-gray-400">Unlimited</td>
                <td className="py-3 text-gray-400 text-xs">Budget-conscious</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 text-white">Cursor</td>
                <td className="py-3 text-gray-300">$20</td>
                <td className="py-3 text-gray-400">500 fast requests</td>
                <td className="py-3 text-gray-400 text-xs">Power users</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 text-white">Claude Code (Pro)</td>
                <td className="py-3 text-gray-300">$20</td>
                <td className="py-3 text-gray-400">5x Claude limit</td>
                <td className="py-3 text-gray-400 text-xs">Complex projects</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 text-white">ChatGPT Plus</td>
                <td className="py-3 text-gray-300">$20</td>
                <td className="py-3 text-gray-400">40 msgs/3h (GPT-4)</td>
                <td className="py-3 text-gray-400 text-xs">Occasional use</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 text-white">Windsurf</td>
                <td className="py-3 text-gray-300">$15</td>
                <td className="py-3 text-gray-400">Unlimited Cascade</td>
                <td className="py-3 text-gray-400 text-xs">Best value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-green-400" />
          Cost Optimization Strategies
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">1. Choose the Right Tool for the Task</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400 space-y-2">
              <p>• **Autocomplete** (GitHub Copilot $10): Daily coding, boilerplate</p>
              <p>• **IDE Assistant** (Cursor $20): Complex refactors, multi-file edits</p>
              <p>• **Terminal Agent** (Aider free): Large codebase migrations</p>
              <p>• **Web Platform** (Bolt $20): Quick prototypes, MVPs</p>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">2. Optimize Context Window Usage</h3>
            <div className="bg-gray-900/50 rounded p-4 space-y-3">
              <p className="text-sm text-gray-400">Tokens = $$$. Reduce context to save money:</p>
              <div className="font-mono text-xs space-y-2">
                <div className="bg-gray-950/50 rounded p-2">
                  <p className="text-gray-500 mb-1">✓ Be specific with file selection</p>
                  <pre className="text-gray-300">Instead of: @codebase "fix this bug"
Use: @src/components/Header.tsx "fix dropdown"</pre>
                </div>
                <div className="bg-gray-950/50 rounded p-2">
                  <p className="text-gray-500 mb-1">✓ Use .cursorignore/.aiderignore</p>
                  <pre className="text-gray-300">node_modules/
dist/
*.log
test-data/</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">3. Hybrid Approach</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400">
              <p className="mb-3">Don't use expensive tools for everything:</p>
              <table className="w-full text-xs">
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">Simple completions</td>
                  <td className="py-2 text-gray-500">→</td>
                  <td className="py-2 text-green-400">Free: Codeium, TabNine</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">Quick questions</td>
                  <td className="py-2 text-gray-500">→</td>
                  <td className="py-2 text-blue-400">$0: Claude.ai (free tier)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-white">Complex refactors</td>
                  <td className="py-2 text-gray-500">→</td>
                  <td className="py-2 text-orange-400">$20: Cursor/Claude Code</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">4. Monitor Usage</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400">
              <p className="mb-2">Track your AI spend:</p>
              <ul className="space-y-1 ml-4">
                <li>• Cursor: Settings → Usage</li>
                <li>• Claude API: Console → Usage</li>
                <li>• OpenAI: Dashboard → Usage</li>
                <li>• GitHub Copilot: Included (flat rate)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-400" />
            ROI Calculator
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded p-4">
              <p className="text-sm text-gray-400 mb-3">Typical productivity gains:</p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Developer hourly cost</span>
                  <span className="text-white">$75/hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Time saved with AI</span>
                  <span className="text-white">30%</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span>Monthly savings</span>
                  <span className="text-green-400 font-bold">$4,200</span>
                </div>
                <div className="flex justify-between">
                  <span>AI tool cost</span>
                  <span className="text-red-400">-$50</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span className="font-bold">Net benefit</span>
                  <span className="text-green-400 font-bold">$4,150/mo</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">ROI: 8,300% per developer</p>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Team Budget Planning</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded p-4">
              <p className="text-sm font-medium text-white mb-2">Small Team (5 devs)</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>• Base: GitHub Copilot ($50/mo)</p>
                <p>• 2-3 power users: Cursor ($40-60/mo)</p>
                <p>• Shared API keys: $100/mo buffer</p>
                <p className="text-green-400 font-bold pt-2">Total: ~$200/mo</p>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded p-4">
              <p className="text-sm font-medium text-white mb-2">Mid-size (20 devs)</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>• Enterprise Copilot ($200/mo)</p>
                <p>• 5 Cursor Pro ($100/mo)</p>
                <p>• API credits ($300/mo)</p>
                <p className="text-green-400 font-bold pt-2">Total: ~$600/mo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Key Takeaways</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
              <div>
                <p className="text-white font-medium mb-2">Do:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Start with free tiers to evaluate</li>
                  <li>• Use cheaper tools for simple tasks</li>
                  <li>• Monitor usage patterns</li>
                  <li>• Optimize context windows</li>
                  <li>• Calculate ROI regularly</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Don't:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Buy all tools at once</li>
                  <li>• Send entire codebase unnecessarily</li>
                  <li>• Ignore usage limits</li>
                  <li>• Use expensive tools for autocomplete</li>
                  <li>• Forget to track spend</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
