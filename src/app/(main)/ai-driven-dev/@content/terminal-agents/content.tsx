"use client"

import React from 'react';
import { Terminal, Zap, GitBranch, Star } from 'lucide-react';

export default function TerminalAgentsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <Terminal className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Terminal-Based AI Agents</h1>
            <p className="text-gray-400 mt-2">Command-line coding assistants for terminal workflows</p>
          </div>
        </div>
      </div>

      {/* Claude Code */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Claude Code</h2>
            <p className="text-sm text-gray-400">by Anthropic • 70.3% SWE-bench</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$20-100/mo</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Official Anthropic CLI agent. Best for large codebases (200k context), multi-file refactoring, and complex architectural changes.
        </p>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Best for:</strong> Production refactoring, million-line codebases, safety-critical changes
          </p>
        </div>
      </div>

      {/* Aider */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Aider</h2>
            <p className="text-sm text-gray-400">Open Source • 55% SWE-bench</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Free</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Fast, lightweight CLI tool with git integration. BYOK (bring your own key). Perfect for quick iterations and automated workflows.
        </p>
        <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
          <p className="text-sm text-green-200">
            <strong>Best for:</strong> Budget-conscious devs, automation scripts, CI/CD integration
          </p>
        </div>
      </div>

      {/* OpenHands */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">OpenHands</h2>
            <p className="text-sm text-gray-400">Open Source • 53% SWE-bench</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Free</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Autonomous agent that can browse web, run commands, write code. More experimental but powerful for research tasks.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Best for:</strong> Research projects, exploratory coding, learning
          </p>
        </div>
      </div>

      {/* Gemini CLI */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Gemini CLI</h2>
            <p className="text-sm text-gray-400">by Google • 1M token context</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Free tier</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Google's command-line AI assistant with massive 1M token context window. Excellent for analyzing entire codebases, long documentation, and complex multi-file operations.
        </p>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded p-4">
          <p className="text-sm text-orange-200">
            <strong>Best for:</strong> Massive codebases, documentation analysis, multi-file context understanding
          </p>
        </div>
      </div>

      {/* Amp Code */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Amp Code</h2>
            <p className="text-sm text-gray-400">Agentic coding tool • Multi-agent</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Beta</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Terminal-based agentic coding tool with multi-agent orchestration. Features specialized agents for planning, coding, testing, and review working in parallel.
        </p>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4 mb-4">
          <p className="text-sm text-cyan-200 mb-2">
            <strong>Multi-Agent Workflow:</strong>
          </p>
          <ul className="text-xs text-cyan-200 space-y-1">
            <li>• Planning Agent: Breaks down tasks and creates implementation strategy</li>
            <li>• Coding Agent: Writes implementation following plans</li>
            <li>• Testing Agent: Generates and runs comprehensive tests</li>
            <li>• Review Agent: Validates security, performance, and quality</li>
          </ul>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Best for:</strong> Complex features requiring planning, parallel task execution, quality-focused development
          </p>
        </div>
      </div>

      {/* SWE-agent */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">SWE-agent</h2>
            <p className="text-sm text-gray-400">Princeton NLP • Research</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Academic project focused on solving real GitHub issues. Interesting for research but less practical for daily use.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Pick</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Star className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Production Work</p>
            <p className="text-sm text-gray-400">Claude Code - Best quality, safety</p>
          </div>
          <div>
            <Zap className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Fast Iteration</p>
            <p className="text-sm text-gray-400">Aider - Free, fast, git-integrated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
