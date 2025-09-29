"use client"

import React from 'react';
import { TestTube2, Shield, Zap, CheckCircle, AlertCircle } from 'lucide-react';

export default function TestingQualityContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <TestTube2 className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Testing & Quality with AI</h1>
            <p className="text-gray-400 mt-2">Test generation, coverage, and TDD workflows</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">🚨 TDD Guard: The Game Changer</h2>
        <p className="text-gray-300 mb-6">
          Forces AI to write tests BEFORE implementation. Blocks code generation until tests exist.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">How It Works</h3>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">1.</span>
                <span>You describe feature to AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">2.</span>
                <span>TDD Guard intercepts request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">3.</span>
                <span>AI writes tests first (fails initially)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">4.</span>
                <span>AI implements code to pass tests</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Impact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">87% fewer bugs</p>
                  <p className="text-xs text-gray-500">vs AI without TDD</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">100% test coverage</p>
                  <p className="text-xs text-gray-500">enforced automatically</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <div>
                  <p className="text-white text-sm font-medium">Faster refactoring</p>
                  <p className="text-xs text-gray-500">tests catch regressions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI Testing Tools</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">GitHub Copilot for Tests</h3>
                <p className="text-sm text-gray-400 mt-1">Generate unit tests from code</p>
              </div>
              <span className="text-green-400 font-bold">$10/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Frameworks</p>
                <p className="text-sm text-gray-300">Jest, Pytest, JUnit</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Speed</p>
                <p className="text-sm text-gray-300">Instant</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Quality</p>
                <p className="text-sm text-gray-300">Good</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Highlight function → Ask for tests → Get full test suite. Understands mocking and edge cases.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Cursor Test Generation</h3>
                <p className="text-sm text-gray-400 mt-1">Context-aware test creation</p>
              </div>
              <span className="text-blue-400 font-bold">$20/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Context</p>
                <p className="text-sm text-gray-300">Full codebase</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Integration</p>
                <p className="text-sm text-gray-300">Auto-imports</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Quality</p>
                <p className="text-sm text-gray-300">Excellent</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Uses your existing tests as examples. Matches your style. Automatically imports test utilities.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Codium Cover Agent</h3>
                <p className="text-sm text-gray-400 mt-1">Automated coverage improvement</p>
              </div>
              <span className="text-purple-400 font-bold">Free</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Target</p>
                <p className="text-sm text-gray-300">Low coverage areas</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Approach</p>
                <p className="text-sm text-gray-300">Iterative</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Open Source</p>
                <p className="text-sm text-gray-300">Yes</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Analyzes coverage report. Generates tests for uncovered lines. Runs in CI/CD.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Machinet Unit Test AI</h3>
                <p className="text-sm text-gray-400 mt-1">Java-focused test generation</p>
              </div>
              <span className="text-orange-400 font-bold">$15/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Language</p>
                <p className="text-sm text-gray-300">Java</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Frameworks</p>
                <p className="text-sm text-gray-300">JUnit, Mockito</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">IDE</p>
                <p className="text-sm text-gray-300">IntelliJ</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Purpose-built for Java. Handles Spring Boot complexity. Generates mocks for dependencies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Types of Tests AI Generates</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <div>
                <p className="text-white font-medium text-sm">Unit Tests</p>
                <p className="text-xs text-gray-400">Isolated function behavior</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <div>
                <p className="text-white font-medium text-sm">Integration Tests</p>
                <p className="text-xs text-gray-400">API endpoints, database queries</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <div>
                <p className="text-white font-medium text-sm">Edge Cases</p>
                <p className="text-xs text-gray-400">Null values, empty arrays, errors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <div>
                <p className="text-white font-medium text-sm">Snapshot Tests</p>
                <p className="text-xs text-gray-400">React component outputs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Common Pitfalls</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-500/20 rounded mt-1"></div>
              <div>
                <p className="text-white font-medium text-sm">Over-mocking</p>
                <p className="text-xs text-gray-400">Tests become brittle and meaningless</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-500/20 rounded mt-1"></div>
              <div>
                <p className="text-white font-medium text-sm">Testing Implementation</p>
                <p className="text-xs text-gray-400">Should test behavior, not internals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-500/20 rounded mt-1"></div>
              <div>
                <p className="text-white font-medium text-sm">Ignoring Failures</p>
                <p className="text-xs text-gray-400">Review generated tests before committing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-500/20 rounded mt-1"></div>
              <div>
                <p className="text-white font-medium text-sm">No Assertions</p>
                <p className="text-xs text-gray-400">Tests that don't check anything</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Workflow Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Standard Workflow (No TDD Guard)
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="text-gray-400">1. Write implementation code</p>
              <p className="text-gray-400">2. Run code, find bugs</p>
              <p className="text-gray-400">3. Fix bugs</p>
              <p className="text-gray-400">4. Write tests (if you remember)</p>
              <p className="text-red-400">❌ Tests often skipped or incomplete</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              TDD Guard Workflow
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="text-gray-400">1. Describe feature to AI</p>
              <p className="text-gray-400">2. AI writes failing tests first</p>
              <p className="text-gray-400">3. AI implements code to pass tests</p>
              <p className="text-gray-400">4. All tests pass, commit</p>
              <p className="text-green-400">✓ 100% coverage guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Use TDD Guard for new features</li>
              <li>• Review AI-generated tests critically</li>
              <li>• Run tests locally before committing</li>
              <li>• Keep test files next to implementation</li>
              <li>• Use coverage reports to find gaps</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Trust tests without reading them</li>
              <li>• Skip flaky tests (fix or delete)</li>
              <li>• Aim for 100% coverage everywhere</li>
              <li>• Test trivial getters/setters</li>
              <li>• Commit failing tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
