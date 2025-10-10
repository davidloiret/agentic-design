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

      {/* GitHub's Spec-Driven Approach (2025) */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-7 h-7 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">GitHub's Spec-Driven Development Toolkit (2025)</h2>
        </div>

        <p className="text-gray-300 mb-6">
          In early 2025, GitHub open-sourced their internal spec-driven development toolkit, providing a standardized approach to AI-native software engineering. This represents a major shift toward <strong className="text-white">specification-first development</strong> as the industry standard.
        </p>

        {/* Core Components */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">GitHub Toolkit Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">1. Spec Templates Library</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• <strong>Technical Specs</strong>: API design, database schemas, system architecture</li>
                <li>• <strong>Feature Specs</strong>: User stories, acceptance criteria, edge cases</li>
                <li>• <strong>Refactor Specs</strong>: Performance goals, migration plans, risk assessment</li>
                <li>• <strong>Bug Fix Specs</strong>: Reproduction steps, expected behavior, test criteria</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-400 mb-3">2. AI-Optimized Format</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• <strong>Structured YAML/JSON</strong>: Machine-readable specifications</li>
                <li>• <strong>Context Injection</strong>: Automatic codebase linking</li>
                <li>• <strong>Validation Rules</strong>: Spec completeness checks</li>
                <li>• <strong>Version Control</strong>: Git-native spec tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The GitHub Workflow */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">The GitHub Spec → Code → Ship Workflow</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">Write Specification (SPEC.md)</p>
                <p className="text-sm text-gray-400 mb-2">Use GitHub's spec template to define requirements, constraints, and acceptance criteria.</p>
                <div className="bg-gray-950/50 rounded p-3 font-mono text-xs text-gray-300">
                  <pre>{`# Specification: User Authentication API

## Context
We need to replace our legacy auth system with JWT-based authentication.

## Requirements
- JWT token generation with 1-hour expiry
- Refresh token mechanism (30-day expiry)
- Password hashing with bcrypt (cost factor 12)
- Rate limiting: 5 failed attempts = 15min lockout

## API Endpoints
POST /auth/login -> { accessToken, refreshToken }
POST /auth/refresh -> { accessToken }
POST /auth/logout -> 204 No Content

## Testing
- Unit tests for token generation/validation
- Integration tests for full auth flow
- Load test: 1000 concurrent requests`}</pre>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">Generate Implementation Plan (via GitHub Copilot)</p>
                <p className="text-sm text-gray-400">AI reads SPEC.md, analyzes codebase, generates step-by-step implementation plan with file changes.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">Execute & Validate (Copilot Workspace / Claude Code)</p>
                <p className="text-sm text-gray-400">AI implements each step, runs tests, validates against spec. Developer reviews and approves.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">Ship with Confidence (CI/CD + Spec Validation)</p>
                <p className="text-sm text-gray-400">Automated checks verify implementation matches spec. Green build = ship.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Adoption */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3">✓ GitHub's Internal Results (2024-2025)</h4>
            <ul className="text-xs text-gray-300 space-y-2">
              <li>• <strong className="text-white">40% faster feature delivery</strong> (idea → production)</li>
              <li>• <strong className="text-white">60% reduction in spec-code misalignment</strong> bugs</li>
              <li>• <strong className="text-white">3x improvement in AI code quality</strong> (measured by review iterations)</li>
              <li>• <strong className="text-white">85% developer satisfaction</strong> with spec-driven workflow</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3">🚀 Early Adopters (2025)</h4>
            <ul className="text-xs text-gray-300 space-y-2">
              <li>• <strong>Stripe</strong>: API development with spec-first approach</li>
              <li>• <strong>Vercel</strong>: Full-stack features with AI execution</li>
              <li>• <strong>Shopify</strong>: Microservices refactoring at scale</li>
              <li>• <strong>Linear</strong>: Issue-to-code automation pipeline</li>
            </ul>
          </div>
        </div>

        {/* Key Success Factors */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Why GitHub's Approach Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-blue-400 mb-2">Standardization</p>
              <p className="text-xs text-gray-400">Consistent spec format = better AI understanding. GitHub templates reduce cognitive load.</p>
            </div>
            <div>
              <p className="font-semibold text-green-400 mb-2">Verification</p>
              <p className="text-xs text-gray-400">Automated spec-to-code validation catches drift. Tests generated from spec ensure compliance.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-2">Iteration</p>
              <p className="text-xs text-gray-400">Spec changes propagate to code automatically. No manual sync required.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started with GitHub's Toolkit */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Getting Started with GitHub's Toolkit</h2>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white">1. Install the GitHub Spec Extension (VS Code)</p>
              <p className="text-gray-400">Provides spec templates, validation, and AI integration for GitHub Copilot.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white">2. Choose Your Spec Type</p>
              <p className="text-gray-400">Feature, Refactor, Bug Fix, or Technical Design. Each has optimized prompts for AI agents.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white">3. Let AI Generate Implementation Plan</p>
              <p className="text-gray-400">GitHub Copilot Workspace reads your spec and proposes step-by-step file changes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white">4. Review, Validate, Ship</p>
              <p className="text-gray-400">AI executes plan, you review diffs, tests run automatically. Ship when green.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-xs text-blue-200">
            <strong>Resources:</strong> <a href="https://github.com/github/spec-driven-development" className="underline hover:text-blue-400">GitHub Spec Toolkit</a> • <a href="https://docs.github.com/copilot/workspace" className="underline hover:text-blue-400">Copilot Workspace Docs</a> • <a href="https://github.com/topics/spec-driven-dev" className="underline hover:text-blue-400">Community Examples</a>
          </p>
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

        <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-purple-400">2025 Prediction:</strong> By end of year, <strong className="text-white">60% of new enterprise features</strong> will start with a spec document, not a code commit. Spec-driven development is becoming the AI-native standard.
          </p>
        </div>
      </div>
    </div>
  );
}
