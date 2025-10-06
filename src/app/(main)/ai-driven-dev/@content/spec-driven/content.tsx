"use client"

import React from 'react';
import { FileText, ArrowRight, Code2, CheckCircle, Sparkles } from 'lucide-react';

export default function SpecDrivenContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl">
            <FileText className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Spec-Driven Development</h1>
            <p className="text-gray-400 mt-2">Write specifications first, let AI implement</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 mb-12">
        <h2 className="text-xl font-semibold text-white mb-3">Foundation: Rich Context Drives Quality</h2>
        <p className="text-gray-300 text-sm">
          Your AI assistant's effectiveness hinges on what you feed it. Detailed specifications, existing codebase samples, clear error logs, and explicit requirements dramatically improve code generation accuracy. Think of context as fuel—skimping leads to sputtering results.
        </p>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The 3-Phase Workflow</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Planning & Preparation → SPEC.md</h3>
              <p className="text-sm text-gray-400 mb-3">Use AI to refine your idea into a comprehensive specification with detailed requirements</p>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2 font-semibold">What to include:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Business requirements and constraints</li>
                  <li>• Technical architecture and stack</li>
                  <li>• User stories and acceptance criteria</li>
                  <li>• Security and performance requirements</li>
                  <li>• API contracts and data models</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Implementation Blueprint → prompt_plan.md</h3>
              <p className="text-sm text-gray-400 mb-3">Break down the spec into specific, actionable implementation steps</p>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Break down complex tasks into:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Smaller, manageable steps</li>
                  <li>• Clear success criteria for each step</li>
                  <li>• Specific technical implementation details</li>
                  <li>• Testing strategy for each component</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Execution & Validation → working code</h3>
              <p className="text-sm text-gray-400 mb-3">Use AI coding assistants to execute each prompt with continuous testing</p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-xs text-amber-200">
                  <strong>Essential Practice:</strong> Validate rigorously at every checkpoint. Each modification should trigger comprehensive verification—security audits, performance benchmarks, and quality checks prevent downstream disasters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Engineering Strategies */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Prompt Engineering Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Be Precise & Specific</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• State exact technical requirements</li>
              <li>• Specify frameworks and versions</li>
              <li>• Include error messages verbatim</li>
              <li>• Define clear success criteria</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Provide Examples</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Show desired code patterns</li>
              <li>• Include sample inputs/outputs</li>
              <li>• Reference existing code style</li>
              <li>• Demonstrate edge cases</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">Use Constraints</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Define performance requirements</li>
              <li>• Specify security constraints</li>
              <li>• Set code quality standards</li>
              <li>• Limit scope appropriately</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-orange-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-orange-400 mb-4">Role-Based Prompting</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• "As a senior architect..."</li>
              <li>• "As a security expert..."</li>
              <li>• "As a testing specialist..."</li>
              <li>• Guides AI perspective</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Context Management */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Context Management</h2>
        <p className="text-gray-300 mb-6">
          Dynamically assemble relevant information to provide AI with the right context at the right time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Include</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Relevant code files</li>
              <li>• Type definitions</li>
              <li>• Error messages</li>
              <li>• Requirements docs</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Exclude</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Unrelated files</li>
              <li>• Build artifacts</li>
              <li>• Large dependencies</li>
              <li>• Test fixtures</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">RAG Approach</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Retrieve relevant docs</li>
              <li>• Augment prompts</li>
              <li>• Generate with context</li>
              <li>• Keep context fresh</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Spec-Driven Wins</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Faster Iterations</p>
              <p className="text-sm text-gray-400">Regenerate code anytime with consistent quality</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Better Quality</p>
              <p className="text-sm text-gray-400">AI has full context and clear requirements</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Reduced Errors</p>
              <p className="text-sm text-gray-400">Comprehensive testing catches issues early</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Production Ready</p>
              <p className="text-sm text-gray-400">Security, performance, and quality built-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Outlook */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">The Future: Intent-Driven Development</h2>
        <p className="text-gray-300 mb-4">
          We're shifting from writing code to expressing intent. AI handles implementation while developers focus on:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">High-Level Problem Solving</h3>
            <p className="text-sm text-gray-400">System architecture and design decisions</p>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">AI Collaboration</h3>
            <p className="text-sm text-gray-400">Effective prompting and critical evaluation</p>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">Continuous Learning</h3>
            <p className="text-sm text-gray-400">Adapting to rapidly evolving AI capabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
