"use client"

import React from 'react';
import { Wand2, Zap, Clock, DollarSign } from 'lucide-react';

export default function NoCodeBuildersContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl">
            <Wand2 className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">No-Code AI Builders</h1>
            <p className="text-gray-400 mt-2">From prompt to deployed app in minutes</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The No-Code Promise</h2>
        <p className="text-gray-300 mb-4">
          Describe your app in plain English → Get a deployed, working application. No code editor. No git. No deployment hassles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-pink-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Speed</p>
              <p className="text-sm text-gray-400">5-30 minutes to working app</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-rose-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Simplicity</p>
              <p className="text-sm text-gray-400">No technical knowledge required</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <DollarSign className="w-6 h-6 text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Cost</p>
              <p className="text-sm text-gray-400">$20-40/mo all-inclusive</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Top No-Code Builders</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Bolt.new</h3>
                <p className="text-sm text-gray-400 mt-1">StackBlitz's AI app builder</p>
              </div>
              <span className="text-blue-400 font-bold">$20/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Stack</p>
                <p className="text-sm text-gray-300">React, Vite, Tailwind</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Hosting</p>
                <p className="text-sm text-gray-300">Instant preview</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Export</p>
                <p className="text-sm text-gray-300">Download code</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Full-stack apps in browser. Real-time preview. Can install npm packages. Exports clean, editable code.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Lovable (formerly GPT Engineer)</h3>
                <p className="text-sm text-gray-400 mt-1">Full-stack with database</p>
              </div>
              <span className="text-purple-400 font-bold">$39/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Stack</p>
                <p className="text-sm text-gray-300">React, Supabase</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Database</p>
                <p className="text-sm text-gray-300">PostgreSQL</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Auth</p>
                <p className="text-sm text-gray-300">Built-in</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Complete backend with auth and database. Deploy to production. Real-time collaboration. GitHub sync.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">V0 by Vercel</h3>
                <p className="text-sm text-gray-400 mt-1">UI component generator</p>
              </div>
              <span className="text-green-400 font-bold">$20/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Stack</p>
                <p className="text-sm text-gray-300">React, shadcn/ui</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Focus</p>
                <p className="text-sm text-gray-300">Frontend only</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Quality</p>
                <p className="text-sm text-gray-300">Production-ready</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Generates beautiful UI components. Uses shadcn/ui design system. Copy-paste into your project. Multiple variants.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Replit Agent</h3>
                <p className="text-sm text-gray-400 mt-1">AI pair programmer in cloud IDE</p>
              </div>
              <span className="text-orange-400 font-bold">$25/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Languages</p>
                <p className="text-sm text-gray-300">50+ supported</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Deployment</p>
                <p className="text-sm text-gray-300">One-click</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Collaboration</p>
                <p className="text-sm text-gray-300">Real-time</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Full development environment. Supports any language. Built-in deployment. Multiplayer coding.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Create.xyz (A0)</h3>
                <p className="text-sm text-gray-400 mt-1">Screenshot to working app</p>
              </div>
              <span className="text-red-400 font-bold">$30/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Input</p>
                <p className="text-sm text-gray-300">Screenshot, text</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Output</p>
                <p className="text-sm text-gray-300">React components</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Iterations</p>
                <p className="text-sm text-gray-300">Unlimited</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Upload design mockup → Get working code. Conversational edits. Pixel-perfect recreation. Export to React.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">When to Use No-Code</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Prototypes & MVPs</p>
                <p className="text-sm text-gray-400">Test ideas in hours, not weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Internal Tools</p>
                <p className="text-sm text-gray-400">Admin panels, dashboards</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Landing Pages</p>
                <p className="text-sm text-gray-400">Marketing sites, portfolios</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Learning Projects</p>
                <p className="text-sm text-gray-400">Study the generated code</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">When NOT to Use</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Complex Business Logic</p>
                <p className="text-sm text-gray-400">Payment processing, workflows</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">High-Traffic Apps</p>
                <p className="text-sm text-gray-400">Performance optimization needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Existing Codebases</p>
                <p className="text-sm text-gray-400">Hard to integrate with legacy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Custom Architecture</p>
                <p className="text-sm text-gray-400">Locked into their stack</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Typical Workflow</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-pink-400 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Describe Your App</h3>
              <p className="text-sm text-gray-400">"Build a todo app with user auth and categories"</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-rose-400 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">AI Generates Code</h3>
              <p className="text-sm text-gray-400">Creates components, routes, database schema (2-5 minutes)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-400 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Preview & Iterate</h3>
              <p className="text-sm text-gray-400">See live preview, ask for changes: "Make the buttons bigger"</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">4</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Deploy</h3>
              <p className="text-sm text-gray-400">One-click deployment, get shareable URL</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Exit Strategy</h2>
        <p className="text-gray-300 mb-6">
          Most no-code builders let you export code. When your app outgrows the platform:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">1. Export</h3>
            <p className="text-sm text-gray-400">Download full source code</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">2. Customize</h3>
            <p className="text-sm text-gray-400">Edit with Claude Code/Cursor</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">3. Self-Host</h3>
            <p className="text-sm text-gray-400">Deploy to your own infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
