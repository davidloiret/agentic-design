"use client"

import React from 'react';
import { Package, Users, Star } from 'lucide-react';

export default function VSCodeExtensionsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <Package className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">VS Code AI Extensions</h1>
            <p className="text-gray-400 mt-2">Powerful AI assistants that work in your existing VS Code setup</p>
          </div>
        </div>
      </div>

      {/* Cline */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Cline (formerly Claude Dev)</h2>
            <p className="text-sm text-gray-400">1.2M+ installs • Most Popular</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Full-featured agentic coding assistant. Can read/write files, run terminal commands, use browser. Autonomous task completion.
        </p>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Why #1:</strong> Most mature VS Code AI extension. Supports all major models via API keys.
          </p>
        </div>
      </div>

      {/* GitHub Copilot */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">GitHub Copilot</h2>
            <p className="text-sm text-gray-400">Microsoft • Universal</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$10/mo</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          The OG. Works everywhere (VS Code, JetBrains, Vim, etc). Reliable autocomplete, chat, and inline suggestions.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Best for:</strong> Teams needing universal IDE support, GitHub ecosystem integration
          </p>
        </div>
      </div>

      {/* Roo Code */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Roo Code</h2>
            <p className="text-sm text-gray-400">Rising Star</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Focused on multi-file context and codebase understanding. Similar to Cline but with different UX.
        </p>
      </div>

      {/* Kilo Code */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Kilo Code</h2>
            <p className="text-sm text-gray-400">Newer Entrant</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Lightweight alternative with focus on simplicity. Good for basic autocomplete and chat.
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Recommendation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Star className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Most Powerful</p>
            <p className="text-sm text-gray-400">Cline - Autonomous agent, all models</p>
          </div>
          <div>
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">Best for Teams</p>
            <p className="text-sm text-gray-400">GitHub Copilot - Works everywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}
