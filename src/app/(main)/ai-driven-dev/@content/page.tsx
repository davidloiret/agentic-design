"use client"

import React from 'react';
import { Code2, Sparkles, GitBranch, FileText, Zap, Users, BookOpen, Target } from 'lucide-react';
import { UnderConstructionOverlay } from '../../../components/UnderConstructionOverlay';

export default function AIDrivenDevOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      <UnderConstructionOverlay />

      {/* Blurred Content */}
      <div className="px-8 py-12 filter blur-sm pointer-events-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
              <Code2 className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                AI Driven Development
              </h1>
              <p className="text-gray-400 mt-2">Master the art of coding with AI - methodologies, tools, and real-world practices</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-white">30%</span>
            </div>
            <p className="text-sm text-gray-400">Faster Development</p>
            <p className="text-xs text-gray-500 mt-1">Average productivity gain</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold text-white">76%</span>
            </div>
            <p className="text-sm text-gray-400">Developer Adoption</p>
            <p className="text-xs text-gray-500 mt-1">Using AI coding tools</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <GitBranch className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">80%</span>
            </div>
            <p className="text-sm text-gray-400">Projects with AI</p>
            <p className="text-xs text-gray-500 mt-1">By end of 2025</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-2xl font-bold text-white">53%</span>
            </div>
            <p className="text-sm text-gray-400">SWE-Bench Score</p>
            <p className="text-xs text-gray-500 mt-1">AI solving real issues</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* What is AI Driven Development */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-teal-400" />
              What is AI Driven Development?
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                AI Driven Development represents a fundamental shift in how software is created. Instead of writing every line manually,
                developers now collaborate with AI to accelerate development, improve code quality, and handle complex tasks.
              </p>
              <p>
                Key principles:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span><strong>Specification-first:</strong> Start with clear specs that guide AI implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span><strong>AI as co-pilot:</strong> AI handles repetitive tasks while you focus on architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span><strong>Continuous iteration:</strong> Rapid prototyping and refinement with AI assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span><strong>Context-aware coding:</strong> AI understands your entire codebase</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Methodologies */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              Core Methodologies
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-teal-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Spec-Driven Development</h3>
                <p className="text-sm text-gray-400">
                  Write specifications first, let AI implement. Your spec becomes the contract that drives code generation, testing, and validation.
                </p>
              </div>

              <div className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Domain-Driven Design (DDD)</h3>
                <p className="text-sm text-gray-400">
                  Model complex business domains with AI assistance. AI helps maintain bounded contexts and ubiquitous language.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Hexagonal Architecture</h3>
                <p className="text-sm text-gray-400">
                  Build adaptable systems with clear boundaries. AI generates adapters and ports while you focus on core logic.
                </p>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Test-Driven AI Development</h3>
                <p className="text-sm text-gray-400">
                  Write tests first, let AI implement solutions. Ensures code quality and catches edge cases automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Categories Overview */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            AI Coding Tools Ecosystem (40+ Tools)
          </h2>
          <p className="text-gray-400 mb-6">The complete landscape of AI coding assistants, agents, and platforms in 2025</p>

          {/* Tool Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">IDE Assistants</h3>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Full IDE replacements with AI</p>
              <div className="text-xs text-gray-500">Cursor, Windsurf, Continue, Augment</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Terminal Agents</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">CLI-based coding agents</p>
              <div className="text-xs text-gray-500">Claude Code, Aider, OpenHands, SWE-agent</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">VS Code Extensions</h3>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Powerful VS Code plugins</p>
              <div className="text-xs text-gray-500">Cline, Roo Code, Kilo Code, Copilot</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Web Platforms</h3>
                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">5 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Browser-based builders</p>
              <div className="text-xs text-gray-500">Bolt, V0, Lovable, Replit, A0</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Autocomplete</h3>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Code completion tools</p>
              <div className="text-xs text-gray-500">Copilot, Codeium, Tabnine, Amazon Q</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Testing & Quality</h3>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">3 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Code integrity & testing</p>
              <div className="text-xs text-gray-500">Qodo, Snyk Code, DeepCode</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Autonomous</h3>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">AI software engineers</p>
              <div className="text-xs text-gray-500">Devin, OpenHands, SWE-agent, Goose</div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">No-Code AI</h3>
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded">4 tools</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">For non-developers</p>
              <div className="text-xs text-gray-500">Databutton, Canvas, Trae, Grok Studio</div>
            </div>
          </div>

          {/* Featured Tools - Sample from each category */}
          <h3 className="text-lg font-semibold text-white mb-4">Featured Tools by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Claude Code */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">Claude Code</h3>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Anthropic</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Terminal-based AI coding with deep reasoning. Handles entire repositories and complex refactors.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Million-line codebases</li>
                <li>• Multi-file editing</li>
                <li>• Git workflow integration</li>
                <li>• Safety-focused</li>
              </ul>
            </div>

            {/* Cursor */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">Cursor</h3>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Anysphere</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                AI-native IDE with inline commands. Fast, keyboard-first workflows with multi-model support.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Agent mode</li>
                <li>• //fix, //explain commands</li>
                <li>• Custom API support</li>
                <li>• Lightweight & fast</li>
              </ul>
            </div>

            {/* Windsurf */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">Windsurf</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Codeium</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Features Cascade for deep context awareness. Built by Codeium team with advanced AI capabilities.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Cascade interface</li>
                <li>• Supercomplete</li>
                <li>• Multi-file workflows</li>
                <li>• Repository indexing</li>
              </ul>
            </div>

            {/* Qodo (Codium) */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">Qodo (Codium)</h3>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">Testing AI</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Code integrity platform focused on test generation and finding edge cases, not just code completion.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• AI test generation</li>
                <li>• Edge case detection</li>
                <li>• Code review automation</li>
                <li>• Free for individuals</li>
              </ul>
            </div>

            {/* GitHub Copilot */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">GitHub Copilot</h3>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">Microsoft</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Universal AI pair programmer. Works everywhere, reliable autocomplete with GitHub integration.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Universal IDE support</li>
                <li>• $10/month individual</li>
                <li>• GitHub ecosystem</li>
                <li>• Stable & reliable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Start?</h2>
          <p className="text-gray-300 mb-6">
            Explore our comprehensive guides on methodologies, tools, and real-world examples to master AI-driven development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium">
              Getting Started →
            </button>
            <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium">
              Methodologies →
            </button>
            <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium">
              Tools & Workflows →
            </button>
            <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium">
              Real Examples →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}