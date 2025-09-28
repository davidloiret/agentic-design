"use client"

import React from 'react';
import { Target, Zap, User, AlertCircle, CheckCircle, Code2, Brain, Wrench } from 'lucide-react';

export default function SeventyPercentProblemPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
            <Target className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              The 70% Problem
            </h1>
            <p className="text-gray-400 mt-2">
              AI generates 70% quickly, but the final 30% requires deep expertise
            </p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm text-amber-200">
            Understanding this dynamic is critical for effective AI-driven development
          </p>
        </div>
      </div>

      {/* The Problem Explained */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">What is the 70% Problem?</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              The Fast 70%
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                AI excels at generating the bulk of your solution quickly:
              </p>
              <ul className="space-y-2 text-sm text-gray-400 ml-4">
                <li>• Boilerplate code and project structure</li>
                <li>• Standard CRUD operations</li>
                <li>• Common patterns and implementations</li>
                <li>• Basic business logic</li>
                <li>• Straightforward algorithms</li>
                <li>• Documentation and tests (structure)</li>
              </ul>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
                <p className="text-xs text-amber-200">
                  <strong>Timeline:</strong> Minutes to hours
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              The Challenging 30%
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                The final portion requires human expertise:
              </p>
              <ul className="space-y-2 text-sm text-gray-400 ml-4">
                <li>• Edge cases and error handling</li>
                <li>• Integration with existing systems</li>
                <li>• Performance optimization</li>
                <li>• Security hardening</li>
                <li>• Complex business rules</li>
                <li>• Production-readiness concerns</li>
              </ul>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 mt-4">
                <p className="text-xs text-purple-200">
                  <strong>Timeline:</strong> Hours to days (can take as long as the 70%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Time & Effort Distribution</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Traditional Development</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-700 rounded-full h-8 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full w-[100%] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">100% Human Effort</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Everything written manually from scratch</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">AI-Driven Development</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-700 rounded-full h-8 overflow-hidden flex">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[70%] flex items-center justify-center">
                    <span className="text-white text-xs font-medium">70% AI (Fast)</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[30%] flex items-center justify-center">
                    <span className="text-white text-xs font-medium">30% Human</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">AI generates foundation, human expertise refines</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-lg p-6">
          <h4 className="text-white font-medium mb-2">The Trap</h4>
          <p className="text-sm text-gray-300">
            The 70% comes so fast that it feels like you're almost done. But that final 30% is where most of the value—and time—actually lies.
            Don't underestimate it.
          </p>
        </div>
      </div>

      {/* Solution Framework */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Solution Framework: AI First Draft Pattern</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-medium text-white mb-2">1. Generate Foundation</h3>
            <p className="text-sm text-gray-400">
              Use AI to generate the initial 70% - structure, boilerplate, basic logic
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: Claude, Cursor, GitHub Copilot
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-2">2. Manual Review & Refactor</h3>
            <p className="text-sm text-gray-400">
              Review every line, refactor for clarity, fix subtle bugs, improve naming
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: Your expertise + IDE
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-medium text-white mb-2">3. Error Handling</h3>
            <p className="text-sm text-gray-400">
              Add comprehensive error handling, edge case coverage, input validation
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: Your domain knowledge
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-medium text-white mb-2">4. Write Tests</h3>
            <p className="text-sm text-gray-400">
              Write thorough tests, especially for edge cases AI might have missed
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: TDD approach + AI assist
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-medium text-white mb-2">5. Integration</h3>
            <p className="text-sm text-gray-400">
              Integrate with existing systems, handle compatibility, migration paths
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: System knowledge + testing
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-medium text-white mb-2">6. Optimize</h3>
            <p className="text-sm text-gray-400">
              Performance tuning, memory optimization, production hardening
            </p>
            <div className="mt-3 text-xs text-gray-500">
              Tool: Profiling + expertise
            </div>
          </div>
        </div>
      </div>

      {/* What AI Misses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What AI Often Misses</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Edge Cases</h3>
                <p className="text-sm text-gray-400">
                  Null checks, empty arrays, race conditions, timezone handling, internationalization
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Security Concerns</h3>
                <p className="text-sm text-gray-400">
                  SQL injection, XSS, CSRF, authentication bypass, authorization edge cases
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Performance Issues</h3>
                <p className="text-sm text-gray-400">
                  N+1 queries, memory leaks, inefficient algorithms, blocking operations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Business Logic Nuances</h3>
                <p className="text-sm text-gray-400">
                  Complex domain rules, regulatory compliance, company-specific requirements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">System Integration</h3>
                <p className="text-sm text-gray-400">
                  Legacy system compatibility, API versioning, backward compatibility
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Production Readiness</h3>
                <p className="text-sm text-gray-400">
                  Logging, monitoring, error tracking, graceful degradation, rollback strategies
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What Humans Excel At</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Domain Expertise</h3>
                <p className="text-sm text-gray-400">
                  Understanding business context, regulatory requirements, user needs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">System Context</h3>
                <p className="text-sm text-gray-400">
                  Knowing existing architecture, legacy constraints, team conventions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Critical Thinking</h3>
                <p className="text-sm text-gray-400">
                  Evaluating trade-offs, spotting subtle bugs, questioning assumptions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">User Empathy</h3>
                <p className="text-sm text-gray-400">
                  Understanding real user needs, UX concerns, accessibility requirements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Long-term Vision</h3>
                <p className="text-sm text-gray-400">
                  Maintainability concerns, future extensibility, technical debt management
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Creative Problem Solving</h3>
                <p className="text-sm text-gray-400">
                  Novel solutions, innovative approaches, unconventional thinking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Best Practices for Managing the 70/30 Split</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-xs font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Set Realistic Expectations</h3>
                <p className="text-sm text-gray-400">
                  Don't assume you're 70% done when AI finishes. You're maybe 40-50% done in real time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Review Immediately</h3>
                <p className="text-sm text-gray-400">
                  Don't accumulate AI-generated code. Review and refine it immediately while context is fresh.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Test Everything</h3>
                <p className="text-sm text-gray-400">
                  Write tests for edge cases AI might miss. Use TDD to guide AI generation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-amber-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-xs font-bold">4</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Document Decisions</h3>
                <p className="text-sm text-gray-400">
                  AI won't explain why. Add comments explaining business logic and architectural decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">5</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Security Review</h3>
                <p className="text-sm text-gray-400">
                  Always manually review security-critical code. Never trust AI with auth/payment logic.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">6</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Performance Testing</h3>
                <p className="text-sm text-gray-400">
                  AI optimizes for correctness, not always performance. Profile and optimize critical paths.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">7</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Iterative Refinement</h3>
                <p className="text-sm text-gray-400">
                  Use AI for initial draft, refine manually, then use AI again for specific improvements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">8</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Know When to Start Over</h3>
                <p className="text-sm text-gray-400">
                  If AI generates fundamentally flawed code, it's often faster to regenerate than fix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Takeaway</h2>
        <p className="text-gray-300 text-lg mb-6">
          AI-driven development is not about eliminating human work—it's about shifting it. You go from writing code to reviewing, refining, and hardening AI-generated code. The 70% comes fast, but the 30% is where your expertise truly matters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <Code2 className="w-6 h-6 text-amber-400 mb-2" />
            <p className="text-sm text-white font-medium mb-1">Use AI for Structure</p>
            <p className="text-xs text-gray-400">Boilerplate, patterns, initial implementation</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <Brain className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-sm text-white font-medium mb-1">Apply Human Expertise</p>
            <p className="text-xs text-gray-400">Edge cases, security, performance, integration</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <Target className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-sm text-white font-medium mb-1">Achieve Production Quality</p>
            <p className="text-xs text-gray-400">Robust, maintainable, secure systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}