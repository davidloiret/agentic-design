"use client"

import React from 'react';
import { Sparkles, AlertTriangle, CheckCircle, XCircle, Code2, Zap, Shield, Rocket, BookOpen } from 'lucide-react';

export default function VibeCodingPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl">
            <Sparkles className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Vibe Coding
            </h1>
            <p className="text-gray-400 mt-2">
              Rapid AI-driven development: forgetting the code exists and letting AI generate without careful review
            </p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-sm text-amber-200 font-medium">Coined by Andrej Karpathy (Feb 2025)</p>
              <p className="text-xs text-amber-300/80 mt-1">
                A chatbot-based approach where developers describe tasks to LLMs and accept generated code without full understanding
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What It Is */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-pink-400" />
            Key Characteristics
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-pink-500 pl-4">
              <h3 className="text-lg font-medium text-white mb-1">Speed-First Approach</h3>
              <p className="text-sm text-gray-400">
                Generating code extremely quickly using LLMs. Velocity over precision.
              </p>
            </div>

            <div className="border-l-2 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-white mb-1">Fluid Artifact Treatment</h3>
              <p className="text-sm text-gray-400">
                Treating code as rapidly evolving, disposable. Easy to regenerate, hard to maintain.
              </p>
            </div>

            <div className="border-l-2 border-fuchsia-500 pl-4">
              <h3 className="text-lg font-medium text-white mb-1">Minimal Review</h3>
              <p className="text-sm text-gray-400">
                Accepting AI-generated changes without thorough analysis. Trust over verification.
              </p>
            </div>

            <div className="border-l-2 border-violet-500 pl-4">
              <h3 className="text-lg font-medium text-white mb-1">Experimental Focus</h3>
              <p className="text-sm text-gray-400">
                Prioritizing rapid iteration over precision. Bugs become features.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            Simon Willison's Take
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                "If an LLM wrote every line but you've reviewed, tested, and understood it all, that's not vibe coding—that's using an LLM as a typing assistant"
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Simon Willison</span>
                <span>80+ experiments published</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                <strong className="text-white">His Approach:</strong>
              </p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• Uses vibe coding for experimental projects</li>
                <li>• Projects where "bugs are features"</li>
                <li>• Emphasizes knowing when NOT to use it</li>
                <li>• Published 80+ vibe-coded experiments</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
              <p className="text-xs text-purple-200">
                Key insight: Vibe coding is about the mindset, not the tool. It's deliberately choosing speed over careful engineering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* When to Use / Not Use */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Appropriate Use Cases */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold text-white">✅ Appropriate For</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Rocket className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Low-Stakes Personal Projects</p>
                <p className="text-sm text-gray-400">Weekend hacks, personal tools, throwaway prototypes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Rapid Proof-of-Concepts</p>
                <p className="text-sm text-gray-400">Validating ideas before investing in proper implementation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Learning AI Capabilities</p>
                <p className="text-sm text-gray-400">Exploring what LLMs can and cannot do effectively</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Weekend Experiments</p>
                <p className="text-sm text-gray-400">Fun projects where bugs are actually features</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inappropriate Use Cases */}
        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <XCircle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-semibold text-white">❌ Avoid For</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Production Software</p>
                <p className="text-sm text-gray-400">Any code that real users depend on for critical functionality</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">High-Security Applications</p>
                <p className="text-sm text-gray-400">Auth systems, payment processing, data handling</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Systems Handling Sensitive Data</p>
                <p className="text-sm text-gray-400">PII, financial data, health records, credentials</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Code with Potential for Harm</p>
                <p className="text-sm text-gray-400">Infrastructure, automation, anything that could cause damage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Framework */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Safety Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-400 font-bold text-lg">1</span>
            </div>
            <h3 className="font-medium text-white mb-2">Sandboxed Environments</h3>
            <p className="text-sm text-gray-400">
              Run vibe-coded projects in isolated containers or VMs to prevent system-wide issues
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-400 font-bold text-lg">2</span>
            </div>
            <h3 className="font-medium text-white mb-2">Understand Before Deploy</h3>
            <p className="text-sm text-gray-400">
              Never deploy code you don't understand, even if it "works" in testing
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-pink-400 font-bold text-lg">3</span>
            </div>
            <h3 className="font-medium text-white mb-2">Consult Experts</h3>
            <p className="text-sm text-gray-400">
              For complex projects, have experienced developers review critical sections
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-cyan-400 font-bold text-lg">4</span>
            </div>
            <h3 className="font-medium text-white mb-2">Consider Consequences</h3>
            <p className="text-sm text-gray-400">
              Think about worst-case scenarios: data loss, security breaches, API costs
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-400 font-bold text-lg">5</span>
            </div>
            <h3 className="font-medium text-white mb-2">Test Thoroughly</h3>
            <p className="text-sm text-gray-400">
              Even in experiments, basic testing prevents catastrophic failures
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-400 font-bold text-lg">6</span>
            </div>
            <h3 className="font-medium text-white mb-2">Mind Data Privacy</h3>
            <p className="text-sm text-gray-400">
              Never vibe-code with real user data or sensitive information
            </p>
          </div>
        </div>
      </div>

      {/* Vibe Coding vs Proper AI Development */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Vibe Coding vs Proper AI Development</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Aspect</th>
                <th className="text-left py-3 px-4 text-pink-400 font-medium">Vibe Coding</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-medium">Proper AI Development</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-gray-300 font-medium">Code Review</td>
                <td className="py-4 px-4 text-gray-400">Minimal or none</td>
                <td className="py-4 px-4 text-gray-400">Every line reviewed and understood</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-gray-300 font-medium">Testing</td>
                <td className="py-4 px-4 text-gray-400">"It works on my machine"</td>
                <td className="py-4 px-4 text-gray-400">Comprehensive test coverage</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-gray-300 font-medium">Speed</td>
                <td className="py-4 px-4 text-gray-400">Extremely fast (minutes/hours)</td>
                <td className="py-4 px-4 text-gray-400">Fast but deliberate (hours/days)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-gray-300 font-medium">Maintainability</td>
                <td className="py-4 px-4 text-gray-400">Low - regenerate rather than maintain</td>
                <td className="py-4 px-4 text-gray-400">High - designed for long-term maintenance</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-gray-300 font-medium">Use Case</td>
                <td className="py-4 px-4 text-gray-400">Experiments, prototypes, learning</td>
                <td className="py-4 px-4 text-gray-400">Production systems, critical apps</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-300 font-medium">Risk Tolerance</td>
                <td className="py-4 px-4 text-gray-400">High - bugs are acceptable</td>
                <td className="py-4 px-4 text-gray-400">Low - bugs are unacceptable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Example Workflow */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Typical Vibe Coding Workflow</h2>

        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <span className="text-pink-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Describe What You Want</h3>
              <p className="text-sm text-gray-400 mb-2">Tell the LLM your idea in natural language</p>
              <div className="bg-gray-950 rounded p-3 border border-gray-800">
                <code className="text-xs text-green-400">
                  "Build me a React app that fetches weather data and shows it on a map"
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Accept Generated Code</h3>
              <p className="text-sm text-gray-400">Take the code without deep review, paste it in</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center">
              <span className="text-fuchsia-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Run It</h3>
              <p className="text-sm text-gray-400">See if it works, note what breaks</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <span className="text-violet-400 font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Iterate Fast</h3>
              <p className="text-sm text-gray-400 mb-2">Tell AI what's wrong, get new code, repeat</p>
              <div className="bg-gray-950 rounded p-3 border border-gray-800">
                <code className="text-xs text-red-400">
                  "The map isn't showing, fix it" → Get new code → Try again
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <span className="text-cyan-400 font-bold">5</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Ship or Discard</h3>
              <p className="text-sm text-gray-400">Use it for your personal project or throw it away</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4">
          <p className="text-sm text-amber-200">
            <strong>Key Insight:</strong> No architectural planning, no proper error handling, no tests. Just rapid iteration.
          </p>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Learn More</h2>
        <div className="space-y-4">
          <a
            href="https://gist.github.com/spilist/8bbf75568c0214083e4d0fbbc1f8a09c?ref=stdy.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-900/50 border border-gray-700 hover:border-pink-500/50 rounded-lg p-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <Code2 className="w-5 h-5 text-pink-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Vibe Coding Gist</h3>
                <p className="text-sm text-gray-400 mb-2">Comprehensive guide and examples from the community</p>
                <span className="text-xs text-pink-400">github.com/spilist/vibe-coding</span>
              </div>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=aSXaxOdVtAQ"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 rounded-lg p-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Vibe Coding Video Explanation</h3>
                <p className="text-sm text-gray-400 mb-2">Deep dive into the methodology and when to use it</p>
                <span className="text-xs text-purple-400">youtube.com</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}