"use client"

import React from 'react';
import { BookOpen, Zap, Target, TrendingUp, RefreshCw, Brain } from 'lucide-react';

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
                </ul>
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
          </div>
        </section>
      </div>
    </div>
  );
}
