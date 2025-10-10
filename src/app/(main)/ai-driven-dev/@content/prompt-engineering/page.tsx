"use client"

import React from 'react';
import { BookOpen, Zap, Target, TrendingUp, RefreshCw, Brain, AlertCircle, Code, Settings, Layers, GitBranch, TestTube } from 'lucide-react';

export default function PromptEngineeringContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold">Prompt Engineering Fundamentals</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Master the art of communicating with AI coding assistants. Learn proven techniques
            to get better, more accurate code from AI tools.
          </p>
        </div>

        {/* Core Principle */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-400 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Foundational Rule: Information Richness Matters</h2>
              <p className="text-gray-300">
                The precision of AI-generated code correlates directly with input specificity. Supply comprehensive background—relevant source files, technical documentation, explicit error traces, and well-defined objectives. Thorough prompts yield superior outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* The Prompt Report: Comprehensive Research (2025) */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-7 h-7 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">The Prompt Report: Comprehensive Research (2025)</h2>
            </div>

            <p className="text-gray-300 mb-6">
              A landmark study by <strong className="text-white">32 AI researchers</strong> from Stanford, UC Berkeley, and OpenAI synthesized the field of prompt engineering into a unified framework. Published January 2025, this is <strong className="text-purple-400">the definitive taxonomy</strong> of prompting techniques for developers.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-purple-500/30">
                <p className="text-5xl font-bold text-purple-400 mb-2">33</p>
                <p className="text-sm text-gray-300">standardized vocabulary terms</p>
                <p className="text-xs text-gray-500 mt-1">for consistent communication</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-pink-500/30">
                <p className="text-5xl font-bold text-pink-400 mb-2">58</p>
                <p className="text-sm text-gray-300">documented techniques</p>
                <p className="text-xs text-gray-500 mt-1">across all AI use cases</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-blue-500/30">
                <p className="text-5xl font-bold text-blue-400 mb-2">6</p>
                <p className="text-sm text-gray-300">problem-solving categories</p>
                <p className="text-xs text-gray-500 mt-1">for systematic application</p>
              </div>
            </div>

            {/* The 6 Core Categories */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">The 6 Problem-Solving Categories</h3>
              <p className="text-sm text-gray-400 mb-4">
                Every prompt engineering technique falls into one of these categories, helping developers choose the right approach systematically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-blue-400">1. In-Context Learning</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Provide examples to guide AI behavior without fine-tuning.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Zero-shot</strong>: Task description only</li>
                    <li>• <strong>Few-shot</strong>: 1-5 examples of desired output</li>
                    <li>• <strong>Many-shot</strong>: 10+ examples for complex patterns</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-green-400">2. Chain-of-Thought (CoT)</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Ask AI to reason step-by-step before answering.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Standard CoT</strong>: "Explain your reasoning..."</li>
                    <li>• <strong>Self-Consistency</strong>: Generate multiple reasoning paths</li>
                    <li>• <strong>Tree-of-Thoughts</strong>: Explore parallel solution branches</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-purple-400">3. Decomposition</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Break complex tasks into smaller, manageable subtasks.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Least-to-Most</strong>: Solve simple → complex sequentially</li>
                    <li>• <strong>Plan-and-Solve</strong>: Create plan, then execute steps</li>
                    <li>• <strong>Subgoal Decomposition</strong>: Define intermediate goals</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-5 h-5 text-orange-400" />
                    <h4 className="font-bold text-orange-400">4. Self-Criticism & Refinement</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">AI evaluates and improves its own outputs iteratively.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>Self-Refine</strong>: Generate → Critique → Improve</li>
                    <li>• <strong>Reflexion</strong>: Learn from past mistakes</li>
                    <li>• <strong>Constitutional AI</strong>: Follow ethical principles</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-bold text-yellow-400">5. Prompt Ensembling</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Combine multiple prompts or approaches for robustness.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>DiVeRSe</strong>: Multiple diverse prompts → vote</li>
                    <li>• <strong>Self-Consistency</strong>: Same prompt, different reasoning</li>
                    <li>• <strong>Model Cascade</strong>: Chain different models (GPT→Claude)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-bold text-cyan-400">6. Context Management</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">Optimize what information is included in prompts.</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• <strong>RAG</strong> (Retrieval-Augmented): Fetch relevant docs</li>
                    <li>• <strong>Context Compression</strong>: Summarize large codebases</li>
                    <li>• <strong>Selective Attention</strong>: Highlight key sections</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Most Effective Techniques for Coding (Research-Backed) */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Most Effective for Code Generation (Research-Backed)</h3>
              <div className="space-y-3">
                <div className="bg-green-900/20 border border-green-500/30 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-green-400">1. Few-Shot with Code Examples</p>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">+87% accuracy</span>
                  </div>
                  <p className="text-xs text-gray-400">Show 2-3 examples of desired code style. Dramatic improvement over zero-shot.</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-blue-400">2. Chain-of-Thought for Debugging</p>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">+62% success rate</span>
                  </div>
                  <p className="text-xs text-gray-400">Asking "explain why this error occurs" before fixing → better solutions.</p>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-purple-400">3. Self-Consistency for Architecture</p>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">+45% better designs</span>
                  </div>
                  <p className="text-xs text-gray-400">Generate 3 different architectural approaches → compare → choose best.</p>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-orange-400">4. Decomposition for Complex Features</p>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">+71% completion rate</span>
                  </div>
                  <p className="text-xs text-gray-400">Break feature into 5-10 subtasks. Implement iteratively. Reduces errors.</p>
                </div>
              </div>
            </div>

            {/* Key Vocabulary Terms (Sample) */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Standardized Vocabulary (Sample from 33 Terms)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-purple-400 mb-1">System Prompt</p>
                  <p className="text-gray-400">Instructions defining AI behavior globally, applied to all interactions.</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-blue-400 mb-1">User Prompt</p>
                  <p className="text-gray-400">Specific task or question for single interaction.</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-green-400 mb-1">Temperature</p>
                  <p className="text-gray-400">Sampling parameter controlling randomness (0.0 = deterministic, 1.0 = creative).</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-orange-400 mb-1">Top-P (Nucleus Sampling)</p>
                  <p className="text-gray-400">Alternative to temperature: selects from top X% probability mass.</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-pink-400 mb-1">Context Window</p>
                  <p className="text-gray-400">Maximum tokens the model can process in one request (e.g., 200K for Claude).</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-cyan-400 mb-1">Role Prompting</p>
                  <p className="text-gray-400">"You are a senior engineer..." — assigns expertise persona to AI.</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-yellow-400 mb-1">Instruction Following</p>
                  <p className="text-gray-400">Direct commands: "Write", "Refactor", "Explain", "Debug".</p>
                </div>
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="font-semibold text-red-400 mb-1">Constraint Specification</p>
                  <p className="text-gray-400">Explicit limits: "Use TypeScript", "Max 50 lines", "No external libraries".</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Full vocabulary: 33 terms covering prompting, sampling, evaluation, and optimization.
                </p>
              </div>
            </div>

            {/* Research Impact */}
            <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-purple-300 mb-2">Why This Research Matters:</p>
                  <p className="text-xs text-gray-300">
                    Before The Prompt Report, developers used inconsistent terminology ("context" vs "examples" vs "samples"). The standardized vocabulary and taxonomy enable <strong className="text-white">reproducible prompt engineering</strong>, making it a true engineering discipline rather than trial-and-error.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anatomy of a Good Prompt */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Anatomy of a Good Prompt</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bad Prompt */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <p className="text-sm text-red-400 font-semibold mb-3">❌ VAGUE PROMPT:</p>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 mb-4">
                "Make a login form"
              </div>
              <p className="text-xs text-gray-400">
                Too vague. Missing: framework, styling, validation requirements, error handling.
              </p>
            </div>

            {/* Good Prompt */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <p className="text-sm text-green-400 font-semibold mb-3">✓ EFFECTIVE PROMPT:</p>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs text-gray-300 mb-4">
                {`Create a React login form with:
- Email & password fields (TypeScript)
- Client-side validation (Zod)
- Error states for invalid credentials
- Loading state during submission
- Tailwind CSS styling
- Accessible (ARIA labels)`}
              </div>
              <p className="text-xs text-gray-400">
                Specific requirements, tech stack, validation, styling, and accessibility.
              </p>
            </div>
          </div>

          {/* Prompt Structure */}
          <div className="mt-6 bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold mb-4 text-purple-400">Essential Prompt Components:</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">1.</span>
                <div>
                  <p className="font-semibold text-gray-200">Context</p>
                  <p className="text-sm text-gray-400">"I'm building a React e-commerce app..."</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">2.</span>
                <div>
                  <p className="font-semibold text-gray-200">Task</p>
                  <p className="text-sm text-gray-400">"Create a product filtering component..."</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">3.</span>
                <div>
                  <p className="font-semibold text-gray-200">Constraints</p>
                  <p className="text-sm text-gray-400">"Must work with TypeScript, use React Query..."</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400 font-bold">4.</span>
                <div>
                  <p className="font-semibold text-gray-200">Output Format</p>
                  <p className="text-sm text-gray-400">"Return a complete component with tests..."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context Window Management */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Context Window Management</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              AI models have limited context windows. Managing what you include is crucial for accuracy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-xl font-bold text-white mb-1">200K</p>
                <p className="text-xs text-gray-400">Claude 3.5 Sonnet</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-xl font-bold text-white mb-1">128K</p>
                <p className="text-xs text-gray-400">GPT-4 Turbo</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-xl font-bold text-white mb-1">1M</p>
                <p className="text-xs text-gray-400">Gemini 1.5 Pro</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-green-400 mb-3">✓ DO: Include Relevant Context</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Current file you're working on</li>
                <li>• Related interfaces/types</li>
                <li>• Error messages</li>
                <li>• Specific requirements</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-red-400 mb-3">✗ DON'T: Waste Context On</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Entire node_modules</li>
                <li>• Unrelated files</li>
                <li>• Generated build artifacts</li>
                <li>• Large test fixtures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Few-Shot Learning */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Few-Shot Learning</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Show the AI examples of what you want. This dramatically improves output quality.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs text-gray-300">
              <pre>{`Prompt: "Create unit tests for my API routes. Follow this style:

Example:
describe('POST /api/users', () => {
  it('creates user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

Now create tests for my /api/products endpoint."`}</pre>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p className="font-semibold text-blue-400 mb-2">Why this works:</p>
              <ul className="space-y-1 ml-4">
                <li>• Shows exact formatting you want</li>
                <li>• Demonstrates assertion style</li>
                <li>• Clarifies testing framework</li>
                <li>• AI mirrors the pattern</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Chain-of-Thought */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold">Chain-of-Thought Prompting</h2>
          </div>

          <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Ask the AI to explain its reasoning step-by-step. This catches errors early.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs text-gray-300 mb-4">
              <pre>{`"I'm getting a 'Cannot read property of undefined' error.

Before fixing, explain:
1. What could cause this error?
2. Where should I look in my code?
3. What's the safest fix?

Then provide the corrected code."`}</pre>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-300">
              <p className="font-semibold text-teal-400 mb-2">AI Response Quality:</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Without chain-of-thought:</span>
                  <span className="text-red-400">65% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span>With chain-of-thought:</span>
                  <span className="text-green-400">87% accuracy</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Source: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2023)
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Prompt Patterns */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold">Advanced Prompt Patterns</h2>
          </div>

          <div className="space-y-6">
            {/* ReAct Pattern */}
            <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-3">ReAct Pattern (Reasoning + Acting)</h3>
              <p className="text-sm text-gray-300 mb-4">
                Interleave reasoning steps with actions. Perfect for complex debugging or refactoring.
              </p>
              <div className="bg-gray-900/50 rounded p-4 font-mono text-xs text-gray-300">
                <pre>{`"I need to refactor this authentication system. Use ReAct approach:

Thought 1: What are the current pain points?
Action 1: Analyze the current code structure
Observation 1: [Your analysis]

Thought 2: What's the cleanest architecture?
Action 2: Propose a new structure
Observation 2: [Proposed structure]

Thought 3: What's the migration path?
Action 3: Create step-by-step refactoring plan
Observation 3: [Migration plan]"`}</pre>
              </div>
            </div>

            {/* Self-Consistency */}
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Self-Consistency Pattern</h3>
              <p className="text-sm text-gray-300 mb-4">
                Ask AI to generate multiple solutions, then pick the best. Reduces errors by 30%.
              </p>
              <div className="bg-gray-900/50 rounded p-4 font-mono text-xs text-gray-300">
                <pre>{`"Generate 3 different approaches to implement rate limiting:

Approach 1: Token bucket algorithm
Approach 2: Sliding window counter
Approach 3: Fixed window counter

Then analyze pros/cons of each and recommend the best for our use case."`}</pre>
              </div>
            </div>

            {/* Tree of Thoughts */}
            <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-3">Tree of Thoughts</h3>
              <p className="text-sm text-gray-300 mb-4">
                Explore multiple solution paths before committing. Best for architecture decisions.
              </p>
              <div className="bg-gray-900/50 rounded p-4 font-mono text-xs text-gray-300">
                <pre>{`"Design a scalable notification system. Explore these paths:

Path A: Event-driven with message queue
  - Branch A1: AWS SQS + Lambda
  - Branch A2: RabbitMQ + Workers

Path B: WebSocket real-time
  - Branch B1: Socket.io
  - Branch B2: Server-Sent Events

Evaluate each path for: scalability, cost, complexity.
Recommend final architecture."`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Domain-Specific Prompting */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Domain-Specific Prompting Strategies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Debugging */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
              <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Debugging Prompts
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-gray-400 mb-2">Template:</p>
                  <p className="text-gray-300 font-mono">
                    "Bug: [description]<br/>
                    Error: [full stack trace]<br/>
                    Context: [what you tried]<br/>
                    Environment: [OS, versions]<br/><br/>
                    Diagnose the root cause, then provide fix."
                  </p>
                </div>
              </div>
            </div>

            {/* API Development */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
              <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                API Development
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-gray-400 mb-2">Template:</p>
                  <p className="text-gray-300 font-mono">
                    "Create REST API endpoint:<br/>
                    - Method: POST /api/users<br/>
                    - Input: {`{email, password}`}<br/>
                    - Validation: Zod schema<br/>
                    - Auth: JWT required<br/>
                    - Error handling: 400, 401, 500<br/>
                    - Include OpenAPI docs"
                  </p>
                </div>
              </div>
            </div>

            {/* Testing */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <h3 className="font-bold text-blue-400 mb-3">Testing & QA</h3>
              <div className="space-y-3 text-xs">
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-gray-400 mb-2">Template:</p>
                  <p className="text-gray-300 font-mono">
                    "Generate tests for [function]:<br/>
                    - Happy path cases<br/>
                    - Edge cases (null, empty, max)<br/>
                    - Error conditions<br/>
                    - Mocking: [dependencies]<br/>
                    - Coverage: aim for 100%"
                  </p>
                </div>
              </div>
            </div>

            {/* Refactoring */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <h3 className="font-bold text-purple-400 mb-3">Refactoring</h3>
              <div className="space-y-3 text-xs">
                <div className="bg-gray-800/50 rounded p-3">
                  <p className="text-gray-400 mb-2">Template:</p>
                  <p className="text-gray-300 font-mono">
                    "Refactor this code to:<br/>
                    - Follow SOLID principles<br/>
                    - Reduce cyclomatic complexity<br/>
                    - Improve type safety<br/>
                    - Add error boundaries<br/>
                    - Preserve existing behavior<br/>
                    - Include migration guide"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Prompts vs User Prompts */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">System Prompts vs User Prompts</h2>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-cyan-400 mb-3">System Prompt</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Sets behavior, persona, and constraints. Applied globally to all interactions.
                </p>
                <div className="bg-gray-900/50 rounded p-3 text-xs font-mono text-gray-300">
                  <pre>{`// .cursorrules or system config
You are a senior TypeScript expert.
Always:
- Use functional programming
- Prefer immutability
- Add JSDoc comments
- Follow our style guide
- Suggest tests for new code`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-teal-400 mb-3">User Prompt</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Specific task or question. Applied to single interaction.
                </p>
                <div className="bg-gray-900/50 rounded p-3 text-xs font-mono text-gray-300">
                  <pre>{`// Individual request
"Create a user authentication
service with JWT tokens,
bcrypt password hashing,
and Redis session store.

Follow the patterns from
our existing auth module."`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Temperature & Sampling */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Temperature & Sampling Parameters</h2>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/30">
            <p className="text-gray-300 mb-4">
              When using AI APIs directly, adjust temperature to control creativity vs. determinism.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">Temperature: 0.0 - 0.3</h4>
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Recommended for Code</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-white">Use for:</strong> Bug fixes, refactoring, API implementations, testing
                </p>
                <p className="text-xs text-gray-500">
                  More deterministic, less creative. Produces consistent, predictable code.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">Temperature: 0.4 - 0.7</h4>
                  <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Balanced</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-white">Use for:</strong> Architecture design, brainstorming, code reviews
                </p>
                <p className="text-xs text-gray-500">
                  Balanced creativity. Good for exploring different approaches.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">Temperature: 0.8 - 1.0</h4>
                  <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded">High Creativity</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-white">Use for:</strong> Naming, documentation, creative problem-solving
                </p>
                <p className="text-xs text-gray-500">
                  Very creative, less predictable. Avoid for production code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Task Breakdown */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold">Break Down Complex Tasks</h2>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Complex tasks should be broken down into smaller, manageable steps. This improves accuracy and makes debugging easier.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400 font-semibold mb-2">❌ Too Complex:</p>
                <div className="bg-gray-900/50 rounded p-3 font-mono text-xs text-gray-300">
                  "Build a complete authentication system with JWT, password reset, email verification, and OAuth"
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-400 font-semibold mb-2">✓ Well Broken Down:</p>
                <div className="bg-gray-900/50 rounded p-3 font-mono text-xs text-gray-300">
                  {`1. Create user model & database schema
2. Implement JWT token generation
3. Add login/logout endpoints
4. Add password reset flow
5. Implement email verification
6. Add OAuth providers`}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-3">
              <p className="text-xs text-pink-200">
                <strong>Pro Tip:</strong> Each step should have clear success criteria and be independently testable.
              </p>
            </div>
          </div>
        </section>

        {/* Prompt Versioning & Testing */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GitBranch className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Prompt Versioning & Testing</h2>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Treat prompts like code: version them, test them, and iterate.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded p-4">
                <h4 className="font-semibold text-green-400 mb-3">Version Control Your Prompts</h4>
                <div className="font-mono text-xs text-gray-300 bg-gray-950/50 rounded p-3">
                  <pre>{`# .cursorrules - Version 2.3.0
# Last updated: 2025-01-15
# Changelog: Added error handling requirements

You are a TypeScript expert specializing in...

## Code Style
- Prefer functional programming patterns
- Use Zod for runtime validation
- Always include error boundaries

## Testing Requirements
- Minimum 80% coverage
- Include edge cases
- Mock external dependencies`}</pre>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded p-4">
                <h4 className="font-semibold text-green-400 mb-3">A/B Test Your Prompts</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Run the same task with different prompts. Compare results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-blue-400 font-semibold mb-1">Prompt A (Concise):</p>
                    <p className="text-gray-300">"Create a user validation function"</p>
                    <p className="text-gray-500 mt-2">Result: 15 lines, basic validation</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-green-400 font-semibold mb-1">Prompt B (Detailed):</p>
                    <p className="text-gray-300">"Create user validation with Zod, email regex, password strength, age check"</p>
                    <p className="text-gray-500 mt-2">Result: 40 lines, comprehensive validation ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anti-Patterns */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold">Common Prompt Anti-Patterns</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ Vague Requests</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: "Make this better"</p>
                  <p className="text-xs text-green-400">Good: "Reduce time complexity from O(n²) to O(n log n)"</p>
                </div>

                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ Overloaded Prompts</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: Asking for 10 features at once</p>
                  <p className="text-xs text-green-400">Good: One feature per prompt, iterate</p>
                </div>

                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ No Examples</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: "Use our coding style"</p>
                  <p className="text-xs text-green-400">Good: Show 2-3 examples of your style</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ Missing Context</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: "Fix this bug" (no code shown)</p>
                  <p className="text-xs text-green-400">Good: Include relevant code + error</p>
                </div>

                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ No Success Criteria</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: "Optimize this"</p>
                  <p className="text-xs text-green-400">Good: "Reduce load time to &lt; 2s"</p>
                </div>

                <div className="bg-gray-900/50 rounded p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">❌ Not Iterating</h3>
                  <p className="text-xs text-gray-400 mb-2">Bad: Expect perfection first try</p>
                  <p className="text-xs text-green-400">Good: Refine through dialogue</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Iterative Refinement */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Iterative Refinement</h2>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Don't expect perfection on first try. Refine incrementally.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">1</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Initial Request</p>
                  <p className="text-sm text-gray-400">"Create a user profile component"</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">2</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Add Constraints</p>
                  <p className="text-sm text-gray-400">"Make it responsive, use CSS Grid"</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">3</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Refine Details</p>
                  <p className="text-sm text-gray-400">"Add loading skeleton, error boundary"</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">4</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Polish</p>
                  <p className="text-sm text-gray-400">"Add animations, optimize re-renders"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Selection */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Model Selection Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Claude */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Claude 3.5 Sonnet</h3>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <p className="font-semibold text-white">Best for:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Complex refactoring</li>
                  <li>• Architecture design</li>
                  <li>• Long context tasks</li>
                  <li>• Detailed explanations</li>
                </ul>
              </div>
              <div className="text-xs text-gray-500">
                200K context • Strong reasoning
              </div>
            </div>

            {/* GPT-4 */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-3">GPT-4 Turbo</h3>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <p className="font-semibold text-white">Best for:</p>
                <ul className="space-y-1 ml-4">
                  <li>• General coding tasks</li>
                  <li>• API integrations</li>
                  <li>• Quick prototypes</li>
                  <li>• Broad knowledge</li>
                </ul>
              </div>
              <div className="text-xs text-gray-500">
                128K context • Fast responses
              </div>
            </div>

            {/* Gemini */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Gemini 1.5 Pro</h3>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <p className="font-semibold text-white">Best for:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Massive codebases</li>
                  <li>• Multi-file analysis</li>
                  <li>• Documentation review</li>
                  <li>• Multimodal tasks</li>
                </ul>
              </div>
              <div className="text-xs text-gray-500">
                1M context • Huge capacity
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Turn Conversations */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GitBranch className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">Multi-Turn Conversation Strategies</h2>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Effective multi-turn conversations build context incrementally and maintain focus.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">✓ Good Multi-Turn Pattern:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-blue-400 font-semibold">Turn 1:</p>
                    <p className="text-gray-300">"Analyze this authentication code and identify security issues"</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-green-400 font-semibold">Turn 2:</p>
                    <p className="text-gray-300">"Fix the SQL injection vulnerability you identified"</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-purple-400 font-semibold">Turn 3:</p>
                    <p className="text-gray-300">"Now add rate limiting to prevent brute force attacks"</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Each turn builds on previous context and stays focused on one improvement.</p>
              </div>

              <div className="bg-gray-900/50 rounded p-4">
                <h4 className="font-semibold text-red-400 mb-2">✗ Avoid Context Drift:</h4>
                <p className="text-sm text-gray-400">
                  Don't switch topics abruptly mid-conversation. Start a new chat for unrelated tasks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Prompt Engineering Cheat Sheet</h2>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-purple-400 mb-3">Do:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✓ Be specific about tech stack</li>
                  <li>✓ Include error messages</li>
                  <li>✓ Show examples of desired output</li>
                  <li>✓ Specify constraints clearly</li>
                  <li>✓ Ask for explanations</li>
                  <li>✓ Iterate incrementally</li>
                  <li>✓ Use chain-of-thought for complex tasks</li>
                  <li>✓ Version control your system prompts</li>
                  <li>✓ Test different temperature settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-3">Don't:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✗ Use vague language</li>
                  <li>✗ Paste entire files unnecessarily</li>
                  <li>✗ Expect perfection first try</li>
                  <li>✗ Forget to specify language/framework</li>
                  <li>✗ Skip context about your project</li>
                  <li>✗ Ignore error handling requirements</li>
                  <li>✗ Switch contexts mid-conversation</li>
                  <li>✗ Ask for too many features at once</li>
                  <li>✗ Ignore model limitations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Prompt Library */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Production-Ready Prompt Templates</h2>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Code Review Prompt</h4>
              <div className="font-mono text-xs text-gray-300 bg-gray-950/50 rounded p-3">
                <pre>{`"Review this pull request for:
1. Security vulnerabilities (SQL injection, XSS, CSRF)
2. Performance issues (N+1 queries, memory leaks)
3. Code quality (SOLID principles, DRY)
4. Testing coverage (missing edge cases)
5. Documentation (JSDoc, README updates)

Provide specific line numbers and severity (Critical/High/Medium/Low)."`}</pre>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Performance Optimization Prompt</h4>
              <div className="font-mono text-xs text-gray-300 bg-gray-950/50 rounded p-3">
                <pre>{`"Optimize this [component/function/query]:

Current performance: [metrics]
Target: [desired metrics]

Analyze:
1. Time complexity
2. Memory usage
3. Database query efficiency
4. Rendering performance (if React)

Provide optimized code with before/after benchmarks."`}</pre>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Legacy Code Migration Prompt</h4>
              <div className="font-mono text-xs text-gray-300 bg-gray-950/50 rounded p-3">
                <pre>{`"Migrate this [language/framework] code to [new stack]:

Source: [old tech]
Target: [new tech]
Constraints: [backward compatibility, API contracts]

Provide:
1. Migration strategy (big bang vs incremental)
2. Refactored code
3. Test cases to verify behavior preservation
4. Rollback plan"`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/prompt-libraries" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Prompt Libraries</p>
              <p className="text-sm text-gray-400">Browse 200+ ready-to-use prompts</p>
            </a>
            <a href="/ai-driven-dev/choosing-tools" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Choosing Tools</p>
              <p className="text-sm text-gray-400">Pick the right AI tool for your task</p>
            </a>
            <a href="/ai-driven-dev/ai-pair-programming" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">AI Pair Programming</p>
              <p className="text-sm text-gray-400">Work effectively with AI assistants</p>
            </a>
            <a href="/ai-driven-dev/debugging" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Debugging with AI</p>
              <p className="text-sm text-gray-400">Advanced debugging strategies</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
