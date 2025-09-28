"use client"

import React from 'react';
import { TestTube, Code2, CheckCircle, RefreshCw, Zap, DollarSign, Clock, Target, Shield, GitBranch, Wrench } from 'lucide-react';

export default function TestDrivenAIPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <TestTube className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Test-Driven AI Development
            </h1>
            <p className="text-gray-400 mt-2">
              YOU write tests → AI generates implementation → YOU verify → Iterate
            </p>
          </div>
        </div>
      </div>

      {/* Revolutionary Workflow */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The Revolutionary Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Traditional TDD</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-sm font-bold">1</span>
                </div>
                <p className="text-gray-300">Red - Write failing test</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-sm font-bold">2</span>
                </div>
                <p className="text-gray-300">Green - Write minimal code to pass</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-bold">3</span>
                </div>
                <p className="text-gray-300">Refactor - Improve code quality</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">AI-Enhanced TDD</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 text-sm font-bold">1</span>
                </div>
                <p className="text-gray-300">Test-First - YOU write comprehensive tests</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 text-sm font-bold">2</span>
                </div>
                <p className="text-gray-300">AI-Generate - AI writes passing code</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-400 text-sm font-bold">3</span>
                </div>
                <p className="text-gray-300">Verify - YOU review and iterate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-green-400" />
            Step 1: Developer-Written Tests
          </h2>

          <p className="text-gray-300 mb-4">YOU write comprehensive tests covering all requirements and edge cases</p>

          <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Example: Payment Processor Tests</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">JavaScript</span>
            </div>
            <pre className="text-xs text-gray-300 overflow-x-auto">
              <code>{`describe('PaymentProcessor', () => {
  it('should process valid payment', () => {
    const processor = new PaymentProcessor();
    const result = processor.process({
      amount: 100.00,
      card: '4111111111111111',
      cvv: '123'
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid card numbers', () => {
    const processor = new PaymentProcessor();
    expect(() => {
      processor.process({
        amount: 100.00,
        card: '1234',
        cvv: '123'
      });
    }).toThrow('Invalid card number');
  });

  it('should respect rate limits', () => {
    const processor = new PaymentProcessor();
    for (let i = 0; i < 100; i++) {
      processor.process(validPayment);
    }
    expect(() => processor.process(validPayment))
      .toThrow('Rate limit exceeded');
  });
});`}</code>
            </pre>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <p className="text-sm text-green-200">
              Key: You maintain complete control over requirements through tests
            </p>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Step 2: AI Code Generation
          </h2>

          <p className="text-gray-300 mb-4">AI generates implementation that satisfies all your tests</p>

          <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Prompt Template</span>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Prompt</span>
            </div>
            <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
              <code>{`Write a Node.js function handler that satisfies all the following unit tests in the most performant way possible but still easy to maintain long term:

[Include complete test suite]

Requirements:
- Handle all edge cases shown in tests
- Optimize for performance
- Include proper error handling
- Follow clean code principles
- Use appropriate data structures
- Add JSDoc comments`}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
              <p className="text-sm text-gray-300">AI understands all requirements from tests</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
              <p className="text-sm text-gray-300">Implementation matches exact specifications</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
              <p className="text-sm text-gray-300">Edge cases are handled automatically</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test-Driven Generation (TDG) Pattern */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Test-Driven Generation (TDG) Pattern</h2>
        <p className="text-gray-400 mb-6">Advanced pattern where AI helps generate both tests and implementation</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <h3 className="font-medium text-white mb-2">Define Test Descriptions</h3>
            <p className="text-sm text-gray-400">
              Write test descriptions covering all requirements and edge cases
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-cyan-400 font-bold">2</span>
            </div>
            <h3 className="font-medium text-white mb-2">Implement Seed Test</h3>
            <p className="text-sm text-gray-400">
              Create one example test to establish conventions and style
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-teal-400 font-bold">3</span>
            </div>
            <h3 className="font-medium text-white mb-2">Generate Tests</h3>
            <p className="text-sm text-gray-400">
              Use AI to generate remaining tests based on seed and descriptions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-400 font-bold">4</span>
            </div>
            <h3 className="font-medium text-white mb-2">Review & Refine</h3>
            <p className="text-sm text-gray-400">
              Review generated tests, ensure they match requirements
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold">5</span>
            </div>
            <h3 className="font-medium text-white mb-2">Generate Implementation</h3>
            <p className="text-sm text-gray-400">
              AI generates code with full test context
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-400 font-bold">6</span>
            </div>
            <h3 className="font-medium text-white mb-2">Run & Iterate</h3>
            <p className="text-sm text-gray-400">
              Run test suite, iterate until all tests pass
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">80%</div>
              <div className="text-sm text-gray-400">Time Savings</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Up to 80% reduction in test case creation time compared to manual writing
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$310</div>
              <div className="text-sm text-gray-400">Monthly Cost</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Professional usage: 50 runs/day, 20 days/month, 5 iterations per run
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Oversight</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Maintain complete control through human-written tests and review
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Write Tests First, Always</h3>
                <p className="text-sm text-gray-400">
                  Never let AI write tests without your guidance. Tests are your requirements specification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Cover Edge Cases Comprehensively</h3>
                <p className="text-sm text-gray-400">
                  Think of edge cases AI might miss: null values, empty arrays, boundary conditions, race conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Review Generated Code Thoroughly</h3>
                <p className="text-sm text-gray-400">
                  Just because tests pass doesn't mean code is optimal. Check for performance, security, maintainability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Include Performance Tests</h3>
                <p className="text-sm text-gray-400">
                  Add tests for performance characteristics (time complexity, memory usage) to guide AI optimization.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Iterate on Test Quality</h3>
                <p className="text-sm text-gray-400">
                  If AI generates buggy code, improve your tests to catch those bugs, then regenerate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Use Descriptive Test Names</h3>
                <p className="text-sm text-gray-400">
                  Clear test names help AI understand intent: "should_reject_expired_tokens" vs "test2".
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Maintain Test Independence</h3>
                <p className="text-sm text-gray-400">
                  Each test should be runnable in isolation. AI needs clear, independent test cases to generate correct code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white mb-1">Document Test Intent</h3>
                <p className="text-sm text-gray-400">
                  Add comments explaining WHY a test exists, especially for complex business rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TDD Guard */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold text-white">TDD Guard: Automated Enforcement</h2>
        </div>

        <p className="text-gray-300 mb-6">
          TDD Guard is an automated enforcement tool for Claude Code that ensures AI agents follow proper TDD principles during development.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">How It Works</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Hook Interception</p>
                  <p className="text-gray-400">Uses Claude Code Hooks to intercept file modifications</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Real-time Validation</p>
                  <p className="text-gray-400">Validates TDD adherence before allowing code changes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">AI-Powered Analysis</p>
                  <p className="text-gray-400">Leverages Anthropic API for intelligent TDD rule validation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Key Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Blocks implementation without failing tests</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Prevents over-implementation beyond test requirements</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Stops addition of multiple tests simultaneously</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Provides real-time feedback and corrective guidance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Supported Languages</h4>
            <p className="text-xs text-gray-400">TypeScript, JavaScript, Python, PHP, Go, Rust</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Test Frameworks</h4>
            <p className="text-xs text-gray-400">Jest, Vitest, pytest, PHPUnit</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Installation</h4>
            <p className="text-xs text-gray-400">npm install -g tdd-guard</p>
          </div>
        </div>

        <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Setup Example</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">bash</span>
          </div>
          <pre className="text-xs text-gray-300 overflow-x-auto">
            <code>{`# Install TDD Guard globally
npm install -g tdd-guard

# Configure Claude Code hooks
# Add to your Claude configuration:
# - PreToolUse hook
# - UserPromptSubmit hook
# - SessionStart hook

# TDD Guard will now enforce TDD principles automatically
# Data saved to: .claude/tdd-guard/data/test.json`}</code>
          </pre>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <div className="text-blue-400 text-sm">→</div>
          <div className="text-sm">
            <p className="text-blue-200 font-medium mb-1">GitHub Repository</p>
            <a href="https://github.com/nizos/tdd-guard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              github.com/nizos/tdd-guard
            </a>
          </div>
        </div>
      </div>

      {/* TidyFirst by Kent Beck */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-semibold text-white">TidyFirst by Kent Beck: Refactoring Methodology</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Kent Beck's methodology for incremental refactoring that separates structural changes from behavioral changes, emphasizing small, safe steps toward better code design.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Core Principle</h3>
            <div className="space-y-3">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                <p className="text-sm font-medium text-orange-200 mb-1">Hard Split</p>
                <p className="text-xs text-gray-400">Never mix structural and behavioral changes in the same commit</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                <p className="text-sm font-medium text-orange-200 mb-1">Tidy First</p>
                <p className="text-xs text-gray-400">Make structural improvements before adding new functionality</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Key Techniques</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Guard clauses at top</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Extract helper functions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Remove dead code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Normalize symmetries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>New interface, old implementation</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">With AI</h3>
            <p className="text-sm text-gray-400 mb-3">
              Kent Beck's principles for AI coding:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">1.</span>
                <span>"Augmented Coding" - AI as assistant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">2.</span>
                <span>Maintain quality standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">3.</span>
                <span>Active human guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">4.</span>
                <span>TDD as "superpower"</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">TidyFirst Workflow with AI</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 text-xs font-bold">1</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium mb-1">Write failing test (TDD Guard enforces)</p>
                <div className="bg-gray-900 rounded p-2 text-xs text-gray-400">
                  <code>git commit -m "Add failing test for user validation"</code>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xs font-bold">2</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium mb-1">AI implements minimal passing code</p>
                <div className="bg-gray-900 rounded p-2 text-xs text-gray-400">
                  <code>git commit -m "Implement basic user validation"</code>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xs font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium mb-1">Apply TidyFirst - structural improvements</p>
                <div className="bg-gray-900 rounded p-2 text-xs text-gray-400 space-y-1">
                  <div><code>git commit -m "Extract guard clauses to top"</code></div>
                  <div><code>git commit -m "Extract helper function for email validation"</code></div>
                  <div><code>git commit -m "Remove dead code from old implementation"</code></div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xs font-bold">4</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">TDD Guard prevents regression during tidying</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <span className="text-red-400">❌</span>
              Warning Signs
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• AI mixing structural and behavioral changes</li>
              <li>• Test deletion without approval</li>
              <li>• Over-complex implementations</li>
              <li>• Missing edge case coverage</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Always separate commits by change type</li>
              <li>• Tidy before adding new features</li>
              <li>• Let AI handle boilerplate</li>
              <li>• Human guides architecture</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Combined Approach */}
      <div className="bg-gradient-to-br from-blue-500/10 via-orange-500/10 to-green-500/10 border border-blue-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">TDD Guard + TidyFirst: Synergistic Benefits</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Combining automated TDD enforcement with principled refactoring methodology creates a robust framework for AI-assisted development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-medium text-white mb-2">TDD Guard</h3>
            <p className="text-sm text-gray-400">Ensures tests exist before implementation. Prevents AI from bypassing TDD discipline.</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="font-medium text-white mb-2">TidyFirst</h3>
            <p className="text-sm text-gray-400">Provides methodology for structural improvements. Separate commits for behavior vs. structure.</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-medium text-white mb-2">Combined Power</h3>
            <p className="text-sm text-gray-400">Test-first development with incremental refactoring. Quality code at AI speed.</p>
          </div>
        </div>
      </div>

      {/* When to Use */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">When to Use TDD with AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-green-400 mb-4">✅ Perfect For</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Well-defined business logic with clear requirements</li>
              <li>• API endpoints with specific contracts</li>
              <li>• Data transformation and validation functions</li>
              <li>• Algorithm implementations with known behavior</li>
              <li>• Refactoring existing code while maintaining behavior</li>
              <li>• Microservices with clear interfaces</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-amber-400 mb-4">⚠️ Less Effective For</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Exploratory prototyping without clear requirements</li>
              <li>• UI/UX development requiring visual iteration</li>
              <li>• Complex integration scenarios (better to test manually first)</li>
              <li>• Real-time systems with timing constraints</li>
              <li>• When you don't understand the domain well enough to write tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}