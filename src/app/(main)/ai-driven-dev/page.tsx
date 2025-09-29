"use client"

import React from 'react';
import { ArrowRight, Sparkles, Code2, Zap, Shield, DollarSign, Users, BookOpen, GitBranch, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AIDrivenDevPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-teal-400" />
            <h1 className="text-5xl font-bold">AI-Driven Development</h1>
          </div>
          <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Build software 30-50% faster with AI coding assistants. Comprehensive guide to tools, 
            methodologies, and production workflows.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => router.push('/ai-driven-dev/first-project')}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push('/ai-driven-dev/tools')}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse 45+ Tools
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">45+</p>
            <p className="text-gray-400">AI Tools Covered</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">35%</p>
            <p className="text-gray-400">Faster Development</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-purple-400 mb-2">70%</p>
            <p className="text-gray-400">Code Auto-Generated</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/10 border border-orange-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-orange-400 mb-2">$10-100</p>
            <p className="text-gray-400">Monthly Cost/Dev</p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What You'll Master</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-teal-500/50 transition-colors">
              <Code2 className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Choose the Right Tools</h3>
              <p className="text-gray-400 mb-4">
                Compare 45+ AI coding tools: Cursor, Claude Code, GitHub Copilot, Windsurf, and more. 
                Find the perfect fit for your workflow.
              </p>
              <button 
                onClick={() => router.push('/ai-driven-dev/decision-guide')}
                className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm font-semibold"
              >
                Tool Decision Guide <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
              <BookOpen className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Methodologies</h3>
              <p className="text-gray-400 mb-4">
                Learn spec-driven development, TDD with AI, domain-driven design, and production workflows 
                used by top engineers.
              </p>
              <button 
                onClick={() => router.push('/ai-driven-dev/spec-driven')}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-semibold"
              >
                Spec-Driven Development <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors">
              <GitBranch className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Production Workflows</h3>
              <p className="text-gray-400 mb-4">
                Deploy AI-generated code confidently with CI/CD integration, monitoring, security best 
                practices, and team workflows.
              </p>
              <button 
                onClick={() => router.push('/ai-driven-dev/cicd-integration')}
                className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm font-semibold"
              >
                CI/CD Integration <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Most Popular Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors cursor-pointer"
                 onClick={() => router.push('/ai-driven-dev/ide-assistants')}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Cursor</h3>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400 mb-3">AI-first IDE, forked from VS Code</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">$20/mo</span>
                <span className="text-teal-400 font-semibold">Most Popular</span>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors cursor-pointer"
                 onClick={() => router.push('/ai-driven-dev/terminal-agents')}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Claude Code</h3>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400 mb-3">Terminal agent, 70% on SWE-bench</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">$20-100/mo</span>
                <span className="text-purple-400 font-semibold">Best Quality</span>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-colors cursor-pointer"
                 onClick={() => router.push('/ai-driven-dev/autocomplete-tools')}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">GitHub Copilot</h3>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400 mb-3">Autocomplete, chat, PR reviews</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">$10/mo</span>
                <span className="text-green-400 font-semibold">Most Adopted</span>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors cursor-pointer"
                 onClick={() => router.push('/ai-driven-dev/web-platforms')}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Bolt.new</h3>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400 mb-3">Fullstack apps from prompts</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">$20/mo</span>
                <span className="text-orange-400 font-semibold">Fastest</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button 
              onClick={() => router.push('/ai-driven-dev/tools')}
              className="text-teal-400 hover:text-teal-300 font-semibold"
            >
              View All 45+ Tools →
            </button>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">🚀 Quick Start: Build Your First AI Project</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Follow our 30-minute guide to build a complete task manager app using AI. 
              Zero to deployed app with authentication, database, and responsive UI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold">1</div>
                <div>
                  <p className="font-semibold text-white">Setup</p>
                  <p className="text-sm text-gray-400">Install tools, get API keys (5 min)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold">2</div>
                <div>
                  <p className="font-semibold text-white">Build</p>
                  <p className="text-sm text-gray-400">AI generates code (15 min)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold">3</div>
                <div>
                  <p className="font-semibold text-white">Deploy</p>
                  <p className="text-sm text-gray-400">Ship to production (10 min)</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => router.push('/ai-driven-dev/first-project')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              Start Building <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Key Topics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Essential Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => router.push('/ai-driven-dev/security-best-practices')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-colors text-left"
            >
              <Shield className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">Security Best Practices</h3>
              <p className="text-sm text-gray-400">
                Protect API keys, review AI code for vulnerabilities, comply with SOC 2 and HIPAA.
              </p>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/cost-management')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-colors text-left"
            >
              <DollarSign className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">Cost Management</h3>
              <p className="text-sm text-gray-400">
                Optimize spending, calculate ROI (8,300% typical), budget for teams of 5-20 devs.
              </p>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/team-workflows')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors text-left"
            >
              <Users className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">Team Workflows</h3>
              <p className="text-sm text-gray-400">
                Onboard teams, manage API keys securely, create shared prompt libraries.
              </p>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/prompt-engineering')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors text-left"
            >
              <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">Prompt Engineering</h3>
              <p className="text-sm text-gray-400">
                Write effective prompts, manage context windows, use few-shot learning.
              </p>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/cicd-integration')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-teal-500/50 transition-colors text-left"
            >
              <GitBranch className="w-8 h-8 text-teal-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">CI/CD Integration</h3>
              <p className="text-sm text-gray-400">
                Automate code review, run security scans, enforce test coverage in pipelines.
              </p>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/monitoring-observability')}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors text-left"
            >
              <Zap className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-bold mb-2">Monitoring & Observability</h3>
              <p className="text-sm text-gray-400">
                Track AI code in production, measure error rates, set up alerts.
              </p>
            </button>
          </div>
        </div>

        {/* Real Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-World Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => router.push('/ai-driven-dev/saas-from-scratch')}
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-left hover:border-blue-500/60 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">SaaS in 72 Hours</h3>
              <p className="text-sm text-gray-400 mb-4">
                Built complete analytics dashboard with auth, billing, charts in 3 days using Cursor + Claude.
              </p>
              <span className="text-blue-400 text-sm font-semibold">Read Case Study →</span>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/mobile-app-mvp')}
              className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6 text-left hover:border-green-500/60 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Mobile App MVP</h3>
              <p className="text-sm text-gray-400 mb-4">
                React Native social app with real-time messaging, 14 days from idea to App Store.
              </p>
              <span className="text-green-400 text-sm font-semibold">Read Case Study →</span>
            </button>

            <button 
              onClick={() => router.push('/ai-driven-dev/legacy-modernization')}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6 text-left hover:border-purple-500/60 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Legacy Modernization</h3>
              <p className="text-sm text-gray-400 mb-4">
                Migrated 50k lines jQuery → React, improved performance 80%, 4 weeks with AI.
              </p>
              <span className="text-purple-400 text-sm font-semibold">Read Case Study →</span>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to 2x Your Development Speed?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using AI to ship faster, write better code, and focus on what matters.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => router.push('/ai-driven-dev/first-project')}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              Start Your First Project <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push('/ai-driven-dev/tools')}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-lg transition-colors"
            >
              Explore Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
