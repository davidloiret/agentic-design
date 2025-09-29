"use client"

import React from 'react';
import { TestTube, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function TDDWorkflowsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-xl">
            <TestTube className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Test-Driven Development with AI</h1>
            <p className="text-gray-400 mt-2">Red → Green → Refactor with AI assistance</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The TDD Cycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Red</h3>
              <p className="text-sm text-gray-400">Write failing test first</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Green</h3>
              <p className="text-sm text-gray-400">Make test pass (minimal code)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Refactor</h3>
              <p className="text-sm text-gray-400">Improve code quality</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI TDD Workflow</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-red-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">Step 1: Write Test with AI</h3>
              <span className="text-red-400 font-bold text-sm">RED</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Prompt: "Write a test for a function that calculates compound interest. It should take principal, rate, and years."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`describe('calculateCompoundInterest', () => {
  it('calculates correctly for 1 year', () => {
    const result = calculateCompoundInterest(1000, 5, 1);
    expect(result).toBe(1050);
  });

  it('handles multiple years', () => {
    const result = calculateCompoundInterest(1000, 5, 2);
    expect(result).toBeCloseTo(1102.50, 2);
  });
});`}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-3">Run tests → They fail (function doesn't exist yet)</p>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">Step 2: Implement with AI</h3>
              <span className="text-green-400 font-bold text-sm">GREEN</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Prompt: "Implement calculateCompoundInterest to make these tests pass. Use the formula A = P(1 + r)^t."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number
): number {
  const rateDecimal = rate / 100;
  return principal * Math.pow(1 + rateDecimal, years);
}`}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-3">Run tests → All pass ✓</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">Step 3: Refactor with AI</h3>
              <span className="text-blue-400 font-bold text-sm">REFACTOR</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Prompt: "Refactor this to add input validation and make it more robust. Keep tests passing."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number
): number {
  if (principal <= 0) throw new Error('Principal must be positive');
  if (rate < 0) throw new Error('Rate cannot be negative');
  if (years < 0) throw new Error('Years cannot be negative');
  
  const rateDecimal = rate / 100;
  return Number((principal * Math.pow(1 + rateDecimal, years)).toFixed(2));
}`}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-3">Add tests for edge cases → All pass ✓</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Benefits</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Prevents Over-Engineering</p>
                <p className="text-sm text-gray-400">AI only writes code to pass tests</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Living Documentation</p>
                <p className="text-sm text-gray-400">Tests describe expected behavior</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Confidence in Refactoring</p>
                <p className="text-sm text-gray-400">Tests catch regressions immediately</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Forces Good Design</p>
                <p className="text-sm text-gray-400">Testable code = decoupled code</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Common Pitfalls</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Testing Implementation</p>
                <p className="text-sm text-gray-400">Test behavior, not internals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Skipping Red Phase</p>
                <p className="text-sm text-gray-400">See test fail before implementing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Large Test Cases</p>
                <p className="text-sm text-gray-400">Keep tests small and focused</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">No Refactoring</p>
                <p className="text-sm text-gray-400">Green isn't the end - improve it</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Advanced: TDD Guard Integration</h2>
        <p className="text-gray-300 mb-6">
          TDD Guard enforces test-first development by blocking AI code generation until tests exist.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Setup</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`// .tddguard.json
{
  "enabled": true,
  "testPattern": "**/*.test.{ts,js}",
  "minCoverage": 80,
  "enforceBeforeCommit": true
}`}</pre>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">How It Works</h3>
            <ol className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">1.</span>
                <span>You ask AI to implement a feature</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">2.</span>
                <span>TDD Guard intercepts: "Write tests first!"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">3.</span>
                <span>AI generates failing tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">4.</span>
                <span>You run tests (they fail)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">5.</span>
                <span>Now AI can write implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">6.</span>
                <span>Tests pass, commit allowed</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Real Example: User Authentication</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Prompt Sequence</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">You:</strong></p>
                <p className="text-sm text-gray-300">"Write tests for a login function that takes email and password, returns a JWT on success, throws error on invalid credentials"</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">AI:</strong> Generates tests ↓</p>
                <div className="font-mono text-xs text-gray-300 mt-2">
                  <pre>{`describe('login', () => {
  it('returns JWT for valid credentials', async () => {
    const result = await login('user@example.com', 'password123');
    expect(result.token).toBeTruthy();
    expect(typeof result.token).toBe('string');
  });

  it('throws error for invalid password', async () => {
    await expect(login('user@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">You:</strong></p>
                <p className="text-sm text-gray-300">"Now implement the login function to make these pass"</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">AI:</strong> Generates implementation ↓</p>
                <div className="font-mono text-xs text-gray-300 mt-2">
                  <pre>{`async function login(email: string, password: string) {
  const user = await userRepo.findByEmail(email);
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new Error('Invalid credentials');
  }
  return { token: jwt.sign({ userId: user.id }, SECRET) };
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Start with simplest test case</li>
              <li>• See test fail before implementing</li>
              <li>• Write minimal code to pass</li>
              <li>• Refactor after green</li>
              <li>• Commit after each cycle</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Write multiple tests at once</li>
              <li>• Skip the red phase</li>
              <li>• Add features without tests</li>
              <li>• Test private methods</li>
              <li>• Ignore failing tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
