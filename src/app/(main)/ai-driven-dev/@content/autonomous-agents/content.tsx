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

      {/* Multi-Agent Orchestration */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Coordinated Agent Teams</h2>
        <p className="text-gray-300 mb-6">
          Sophisticated systems deploy multiple specialized AI assistants that divide responsibilities, execute concurrently, and cross-validate results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Strategy Specialist</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Decomposes feature requests</li>
              <li>• Architects solution approach</li>
              <li>• Establishes acceptance metrics</li>
              <li>• Assesses implementation effort</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-400 mb-3">Implementation Expert</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Produces functional code</li>
              <li>• Maintains style guidelines</li>
              <li>• Generates inline comments</li>
              <li>• Addresses boundary conditions</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-3">Validation Specialist</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Creates test scenarios</li>
              <li>• Executes verification suites</li>
              <li>• Analyzes code coverage</li>
              <li>• Validates corner cases</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-3">Quality Auditor</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Scans for vulnerabilities</li>
              <li>• Evaluates efficiency metrics</li>
              <li>• Assesses maintainability</li>
              <li>• Verifies standards compliance</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
          <p className="text-sm text-cyan-200">
            <strong>Core Advantage:</strong> Concurrent task execution by focused specialists elevates result quality while preserving human judgment for pivotal architectural choices.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
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
              <p className="text-white font-medium">Maintain Human Oversight</p>
              <p className="text-sm text-gray-400">Never deploy autonomous agent code without review. Humans maintain control at critical decision points.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-400 text-xl">✓</span>
            </div>
            <div>
              <p className="text-white font-medium">Implement Verification Layers</p>
              <p className="text-sm text-gray-400">Use multiple agents for verification (testing, security, performance) before deployment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Agentic AI Development Paradigm (2025) */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">The Agentic AI Development Paradigm</h2>
        </div>

        <p className="text-gray-300 mb-6 text-lg">
          We're witnessing a fundamental shift from <strong className="text-white">AI-assisted coding</strong> to <strong className="text-cyan-400">Agentic AI Development</strong>—where autonomous agents orchestrate entire development workflows, from planning to deployment.
        </p>

        {/* Market Adoption Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-cyan-500/30">
            <p className="text-5xl font-bold text-cyan-400 mb-2">25%</p>
            <p className="text-sm text-gray-300">of enterprises running agentic AI pilots</p>
            <p className="text-xs text-gray-500 mt-1">2025 (current)</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-purple-500/30">
            <p className="text-5xl font-bold text-purple-400 mb-2">50%</p>
            <p className="text-sm text-gray-300">projected enterprise adoption</p>
            <p className="text-xs text-gray-500 mt-1">by 2027 (Gartner)</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-blue-500/30">
            <p className="text-5xl font-bold text-blue-400 mb-2">3-5x</p>
            <p className="text-sm text-gray-300">productivity multiplier</p>
            <p className="text-xs text-gray-500 mt-1">for well-scoped tasks</p>
          </div>
        </div>

        {/* What Defines Agentic AI Development */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">What Defines Agentic AI Development?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Traditional AI-Assisted Coding:</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Human writes code, AI suggests completions</li>
                <li>• Single-turn interactions</li>
                <li>• Human-directed workflows</li>
                <li>• Context limited to current file</li>
                <li>• Reactive: responds to developer input</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Agentic AI Development:</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• <strong className="text-white">AI executes multi-step workflows autonomously</strong></li>
                <li>• <strong className="text-white">Multi-agent collaboration</strong> (planning, coding, testing, review)</li>
                <li>• <strong className="text-white">Goal-directed</strong>: given objectives, not instructions</li>
                <li>• <strong className="text-white">Full codebase context</strong> + external tool access</li>
                <li>• <strong className="text-white">Proactive</strong>: suggests improvements, detects issues</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Agentic Workflow Pipeline */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">The Agentic Workflow Pipeline</h3>
          <p className="text-sm text-gray-400 mb-4">
            Modern agentic systems orchestrate specialized agents across the entire development lifecycle:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Planning Agent</p>
                <p className="text-sm text-gray-400">Decomposes high-level goals into actionable tasks, identifies dependencies, estimates effort</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Implementation Agent</p>
                <p className="text-sm text-gray-400">Writes code, refactors modules, applies design patterns, handles file operations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Testing Agent</p>
                <p className="text-sm text-gray-400">Generates unit/integration tests, runs test suites, analyzes coverage, validates behavior</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Review Agent</p>
                <p className="text-sm text-gray-400">Performs security audits, checks performance, enforces coding standards, suggests improvements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 font-bold">5</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Deployment Agent</p>
                <p className="text-sm text-gray-400">Creates PRs, manages CI/CD, handles rollbacks, monitors production health</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Enterprise Use Cases */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Real Enterprise Use Cases (2025)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-950/50 rounded p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">✓ High Success Rate</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• <strong>Bug Triage & Fixing</strong>: 70% resolution rate on well-defined issues</li>
                <li>• <strong>Test Coverage Expansion</strong>: Automated generation increases coverage 40-60%</li>
                <li>• <strong>Code Migration</strong>: Library upgrades, framework migrations (React 17→18)</li>
                <li>• <strong>Documentation Generation</strong>: API docs, READMEs, inline comments</li>
                <li>• <strong>Refactoring</strong>: SOLID principles, performance optimization, cleanup</li>
              </ul>
            </div>
            <div className="bg-gray-950/50 rounded p-4 border border-yellow-500/30">
              <h4 className="font-semibold text-yellow-400 mb-2">⚠ Moderate Success</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• <strong>Feature Implementation</strong>: Requires detailed specs, 50-60% success</li>
                <li>• <strong>API Wrapper Creation</strong>: Good for simple REST/GraphQL wrappers</li>
                <li>• <strong>CRUD Operations</strong>: Standard database operations, forms, validation</li>
                <li>• <strong>Microservice Scaffolding</strong>: Boilerplate generation works well</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Challenges & Limitations */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Current Challenges (2025)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-red-300 mb-2">Technical Barriers:</p>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Context window limitations (even with 1M tokens)</li>
                    <li>• High latency for complex multi-step tasks (10-60 min)</li>
                    <li>• Cost: $5-50 per task (enterprise budgets strained)</li>
                    <li>• Determinism issues: same input ≠ same output</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-300 mb-2">Organizational Barriers:</p>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Security concerns: code exfiltration, injection attacks</li>
                    <li>• Trust deficit: only 24% high trust (despite 90% usage)</li>
                    <li>• Skill gap: developers need prompt engineering expertise</li>
                    <li>• Governance: unclear accountability for agent-generated code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Path Forward: 2025-2027 */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">The Path Forward: 2025-2027</h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Economic Drivers:</p>
                <p className="text-gray-400">Average $85K/month AI spend (up 36% from 2024). ROI: 10-15% productivity gains = $120K-180K annual value per 10-dev team.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Technology Evolution:</p>
                <p className="text-gray-400">Longer context windows (2M+ tokens), faster inference (100ms response times), cheaper costs (50% reduction expected), better reasoning (GPT-5, Claude Opus 4).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Standardization:</p>
                <p className="text-gray-400">Model Context Protocol (MCP) emerging as standard for agent communication. GitHub, AWS, Anthropic backing it. Expect ecosystem consolidation by 2026.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Getting Started with Agentic AI</h3>
        <p className="text-gray-300 mb-6">
          The transition to agentic workflows is happening now. Start small, build trust, scale gradually.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/ai-driven-dev/tools" className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400 transition-colors">
            <p className="font-semibold text-cyan-400 mb-1">Explore Tools →</p>
            <p className="text-xs text-gray-400">Browse 45+ AI coding tools</p>
          </a>
          <a href="/ai-driven-dev/spec-driven" className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400 transition-colors">
            <p className="font-semibold text-purple-400 mb-1">Spec-Driven Dev →</p>
            <p className="text-xs text-gray-400">Learn to write effective specs</p>
          </a>
          <a href="/ai-driven-dev/risk-management" className="bg-gray-900/50 rounded-lg p-4 border border-red-500/30 hover:border-red-400 transition-colors">
            <p className="font-semibold text-red-400 mb-1">Risk Management →</p>
            <p className="text-xs text-gray-400">Understand CVEs & security</p>
          </a>
        </div>
      </div>
    </div>
  );
}
