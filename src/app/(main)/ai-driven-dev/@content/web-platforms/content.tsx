"use client"

import React from 'react';
import { Globe, Zap, DollarSign } from 'lucide-react';

export default function WebPlatformsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
            <Globe className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Web-Based AI Platforms</h1>
            <p className="text-gray-400 mt-2">Build full apps in the browser with AI</p>
          </div>
        </div>
      </div>

      {/* Bolt.new */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Bolt.new</h2>
            <p className="text-sm text-gray-400">by StackBlitz • $40M ARR</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          The king of web-based AI coding. In-browser full-stack development with instant preview. Deploy to production in clicks.
        </p>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded p-4 mb-4">
          <p className="text-sm text-orange-200">
            <strong>Why Popular:</strong> Fastest way to go from idea to working app. No local setup required.
          </p>
        </div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• React, Vue, Svelte support</li>
          <li>• Instant hot reload</li>
          <li>• Built-in deployment</li>
          <li>• $20/month Pro</li>
        </ul>
      </div>

      {/* V0 by Vercel */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">V0 by Vercel</h2>
            <p className="text-sm text-gray-400">UI Component Generator</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Generate beautiful React/Next.js components with shadcn/ui. Perfect for UI-focused work.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Best for:</strong> UI/UX developers, design system work, component libraries
          </p>
        </div>
      </div>

      {/* Lovable */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Lovable (formerly GPT Engineer)</h2>
            <p className="text-sm text-gray-400">$17M ARR • Full-stack</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Full-stack app builder with database included. Chat your way to working apps. Strong on backend.
        </p>
      </div>

      {/* Replit Agent */}
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Replit Agent</h2>
            <p className="text-sm text-gray-400">Replit • Established Platform</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Build on top of established Replit infrastructure. Good for learning and small projects.
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">When to Use Web Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Zap className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Rapid Prototyping</p>
            <p className="text-sm text-gray-400">Idea to working demo in minutes</p>
          </div>
          <div>
            <Globe className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">No Local Setup</p>
            <p className="text-sm text-gray-400">Work from any device, anywhere</p>
          </div>
          <div>
            <DollarSign className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Demo & Pitch</p>
            <p className="text-sm text-gray-400">Show investors working prototypes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
