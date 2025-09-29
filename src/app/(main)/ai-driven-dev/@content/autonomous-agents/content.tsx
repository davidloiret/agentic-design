"use client"

import React from 'react';
import { Bot, Zap, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AutonomousAgentsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Autonomous AI Agents</h1>
            <p className="text-gray-400 mt-2">End-to-end software engineering without human intervention</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">What Makes an Agent "Autonomous"?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 font-bold">1</span>
            </div>
            <div>
              <p className="text-white font-medium">Self-Planning</p>
              <p className="text-sm text-gray-400">Breaks down tasks into steps</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div>
              <p className="text-white font-medium">Tool Use</p>
              <p className="text-sm text-gray-400">Terminal, browser, APIs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">3</span>
            </div>
            <div>
              <p className="text-white font-medium">Error Recovery</p>
              <p className="text-sm text-gray-400">Debugs and retries automatically</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Top Autonomous Agents</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Devin by Cognition</h3>
                <p className="text-sm text-gray-400 mt-1">First AI software engineer</p>
              </div>
              <span className="text-orange-400 font-bold">$500/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">SWE-bench</p>
                <p className="text-sm text-gray-300">13.86% resolved</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Environment</p>
                <p className="text-sm text-gray-300">Sandboxed VM</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Access</p>
                <p className="text-sm text-gray-300">Waitlist only</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Full dev environment with shell, editor, browser. Plans multi-step tasks. Can deploy to production. Currently invite-only with months-long waitlist.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">OpenHands (fka OpenDevin)</h3>
                <p className="text-sm text-gray-400 mt-1">Open-source Devin alternative</p>
              </div>
              <span className="text-blue-400 font-bold">Free</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">SWE-bench Lite</p>
                <p className="text-sm text-gray-300">29.0% resolved</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Models</p>
                <p className="text-sm text-gray-300">Claude, GPT-4</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Deployment</p>
                <p className="text-sm text-gray-300">Self-hosted</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Run locally with Docker. Uses multiple models. Active community. GitHub integration. Real-time collaboration mode.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">SWE-agent by Princeton</h3>
                <p className="text-sm text-gray-400 mt-1">Research-grade agent framework</p>
              </div>
              <span className="text-purple-400 font-bold">Free</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">SWE-bench</p>
                <p className="text-sm text-gray-300">12.47% resolved</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Focus</p>
                <p className="text-sm text-gray-300">Bug fixing</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Open Source</p>
                <p className="text-sm text-gray-300">MIT License</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Designed for GitHub issues. Custom agent-computer interface (ACI). Works with Claude 3.5 Sonnet. Great for research and benchmarking.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Factory Code Droid</h3>
                <p className="text-sm text-gray-400 mt-1">Enterprise autonomous coding</p>
              </div>
              <span className="text-green-400 font-bold">Custom pricing</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Target</p>
                <p className="text-sm text-gray-300">Large codebases</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Scale</p>
                <p className="text-sm text-gray-300">Multi-file edits</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Security</p>
                <p className="text-sm text-gray-300">SOC 2 compliant</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Built for enterprises. Handles complex refactors. Integration with Jira/Linear. On-premise deployment available.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">SWE-bench Leaderboard</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">OpenHands (Claude 3.5)</span>
                <span className="text-sm text-cyan-400">29.0%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{width: '29%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Devin</span>
                <span className="text-sm text-orange-400">13.9%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '13.9%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">SWE-agent</span>
                <span className="text-sm text-purple-400">12.5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '12.5%'}}></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">% of real GitHub issues resolved automatically</p>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Best Use Cases</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Bug Fixes</p>
                <p className="text-sm text-gray-400">Well-defined GitHub issues</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Feature Implementation</p>
                <p className="text-sm text-gray-400">From detailed specifications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Test Coverage</p>
                <p className="text-sm text-gray-400">Expanding existing test suites</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Code Migration</p>
                <p className="text-sm text-gray-400">Library upgrades, refactors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Current Limitations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Technical Limits</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Low success rates (13-29% on SWE-bench)</li>
                  <li>• High cost ($5-50 per task)</li>
                  <li>• Slow execution (10-60 minutes per issue)</li>
                  <li>• Struggles with ambiguous requirements</li>
                  <li>• Can't handle architectural decisions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Practical Issues</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Requires very detailed instructions</li>
                  <li>• May break existing functionality</li>
                  <li>• No understanding of business context</li>
                  <li>• Security risks with code execution</li>
                  <li>• Difficult to debug when it fails</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Recommended Approach</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 text-xl">✓</span>
            </div>
            <div>
              <p className="text-white font-medium">Start with Semi-Autonomous</p>
              <p className="text-sm text-gray-400">Use Claude Code or Cursor where you approve each step. Build trust gradually.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 text-xl">✓</span>
            </div>
            <div>
              <p className="text-white font-medium">Use Agents for Well-Defined Tasks</p>
              <p className="text-sm text-gray-400">Bug fixes with clear reproduction steps work best. Avoid open-ended features.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-xl">✓</span>
            </div>
            <div>
              <p className="text-white font-medium">Always Review Output</p>
              <p className="text-sm text-gray-400">Never merge autonomous agent code without human review. Use as a draft, not final.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
