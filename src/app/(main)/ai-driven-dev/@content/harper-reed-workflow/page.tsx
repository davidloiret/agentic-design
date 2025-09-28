"use client"

import React from 'react';
import { GitBranch, Lightbulb, FileText, Rocket, Code2, CheckCircle, ArrowRight } from 'lucide-react';

export default function HarperReedWorkflowPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
            <GitBranch className="w-8 h-8 text-teal-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Harper Reed's Production Workflow
            </h1>
            <p className="text-gray-400 mt-2">
              Battle-tested 3-phase workflow: Idea Honing → Planning → Execution
            </p>
          </div>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
          <p className="text-sm text-teal-200">
            <strong>Source:</strong> Harper Reed, CTO Obama 2012 Campaign, Threadless founder, Modest Inc CEO
          </p>
        </div>
      </div>

      {/* 3-Phase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Lightbulb className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Phase 1</h3>
              <p className="text-sm text-gray-400">Idea Honing</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-2">ChatGPT 4o/o3</p>
          <p className="text-xs text-gray-400">Iterative spec development → spec.md</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Phase 2</h3>
              <p className="text-sm text-gray-400">Planning</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-2">Reasoning models (o1*, o3*, r1)</p>
          <p className="text-xs text-gray-400">Blueprint creation → prompt_plan.md + todo.md</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Phase 3</h3>
              <p className="text-sm text-gray-400">Execution</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-2">Claude.ai / Aider</p>
          <p className="text-xs text-gray-400">Implementation from prompts → iteration</p>
        </div>
      </div>

      {/* Phase 1: Idea Honing */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Lightbulb className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Phase 1: Idea Honing</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Use conversational LLMs to refine your idea into a detailed specification
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Start with rough idea</p>
                  <p className="text-sm text-gray-400">Describe what you want to build in natural language</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Iterate with AI</p>
                  <p className="text-sm text-gray-400">Ask questions, refine requirements, explore edge cases</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Document everything</p>
                  <p className="text-sm text-gray-400">AI helps structure your thoughts into spec.md</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-white font-medium">Review and refine</p>
                  <p className="text-sm text-gray-400">Keep iterating until spec is comprehensive</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Spec.md Structure</h3>
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
{`# Project Spec

## Overview
- What the project does
- Why it exists
- Who it's for

## Core Requirements
- Feature 1: [Description]
- Feature 2: [Description]
- Feature 3: [Description]

## Technical Constraints
- Tech stack preferences
- Performance requirements
- Security considerations

## Success Criteria
- What "done" looks like
- Metrics for success
- Acceptance criteria

## Non-Functional Requirements
- Scalability needs
- Availability targets
- User experience goals`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Tool Choice:</strong> ChatGPT 4o/o3 works best for conversational refinement.
            These models excel at asking clarifying questions and helping you think through your idea.
          </p>
        </div>
      </div>

      {/* Phase 2: Planning */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Phase 2: Planning</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Use reasoning models to create detailed implementation blueprint from your spec
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Feed spec.md to reasoning model</p>
                  <p className="text-sm text-gray-400">o1*, o3*, or r1 models think deeply about architecture</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Get detailed breakdown</p>
                  <p className="text-sm text-gray-400">Model generates step-by-step implementation plan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Create prompt_plan.md</p>
                  <p className="text-sm text-gray-400">Detailed prompts for each implementation step</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-white font-medium">Generate todo.md</p>
                  <p className="text-sm text-gray-400">Task breakdown with dependencies and order</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Prompt_plan.md Example</h3>
            <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
{`# Implementation Plan

## Prompt 1: Setup Project Structure
Create a Next.js project with:
- TypeScript configuration
- Tailwind CSS setup
- ESLint and Prettier
- Folder structure: app, components, lib

## Prompt 2: Database Schema
Design Prisma schema for:
- User model with auth
- Post model with relations
- Comment model
Include indexes for common queries

## Prompt 3: API Routes
Implement /api/posts endpoints:
- GET /api/posts (with pagination)
- POST /api/posts (auth required)
- GET /api/posts/[id]
Include validation and error handling

[... more prompts ...]`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Why Reasoning Models:</strong> o1, o3, r1 models "think" before responding.
            They're better at architectural decisions, edge case consideration, and detailed planning than regular LLMs.
          </p>
        </div>
      </div>

      {/* Phase 3: Execution */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Rocket className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Phase 3: Execution</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Execute the plan using coding-specific AI tools
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Set up repository</p>
                  <p className="text-sm text-gray-400">Initialize git, create project structure</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Paste prompts from prompt_plan.md</p>
                  <p className="text-sm text-gray-400">Feed each prompt to Claude.ai or Aider</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Copy generated code</p>
                  <p className="text-sm text-gray-400">Take AI output, paste into your codebase</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-white font-medium">Test and validate</p>
                  <p className="text-sm text-gray-400">Run tests, check functionality, fix issues</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-xs font-bold">5</span>
                </div>
                <div>
                  <p className="text-white font-medium">Iterate or move to next prompt</p>
                  <p className="text-sm text-gray-400">If working, move on. If not, refine prompt and regenerate</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Preferred Tools</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-white">Claude.ai</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  Web interface with projects feature. Great for generating complete components.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Large context window</li>
                  <li>• Can see entire codebase with Projects</li>
                  <li>• Excellent at following detailed prompts</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-medium text-white">Aider</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  Terminal-based AI coding assistant. Excellent for direct code editing.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Automatically edits files in place</li>
                  <li>• Git integration built-in</li>
                  <li>• Fast iteration cycle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
          <p className="text-sm text-green-200">
            <strong>Key Insight:</strong> By having detailed prompts prepared, execution becomes mechanical.
            You're not thinking about WHAT to build, just feeding prompts and validating output.
          </p>
        </div>
      </div>

      {/* Complete Workflow Example */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Complete Workflow Example</h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/50 to-blue-500/50 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-medium text-white mb-2">Idea: Build a URL Shortener</h3>
              <p className="text-sm text-gray-400 mb-3">
                Chat with ChatGPT about features: custom slugs, analytics, API, rate limiting, user accounts
              </p>
              <div className="bg-gray-950 rounded p-3 border border-gray-800">
                <p className="text-xs text-gray-400 mb-1">Output: spec.md</p>
                <code className="text-xs text-green-400">
                  Complete spec with features, tech stack (Next.js + Prisma + Redis), requirements
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-green-500/50 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-medium text-white mb-2">Planning with o1</h3>
              <p className="text-sm text-gray-400 mb-3">
                Feed spec.md to o1. Get back detailed implementation plan with 15 prompts covering setup → deployment
              </p>
              <div className="bg-gray-950 rounded p-3 border border-gray-800">
                <p className="text-xs text-gray-400 mb-1">Output: prompt_plan.md + todo.md</p>
                <code className="text-xs text-blue-400">
                  15 detailed prompts + task dependency graph
                </code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Execution with Claude/Aider</h3>
              <p className="text-sm text-gray-400 mb-3">
                Go through prompts 1-15, generating code for each step, testing as you go
              </p>
              <div className="bg-gray-950 rounded p-3 border border-gray-800">
                <p className="text-xs text-gray-400 mb-1">Result:</p>
                <code className="text-xs text-green-400">
                  Working URL shortener deployed to Vercel in 4-6 hours
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Why This Workflow Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Separation of Concerns</p>
                <p className="text-sm text-gray-400">
                  Think, plan, and execute are separate phases with specialized tools for each
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Detailed Planning Reduces Errors</p>
                <p className="text-sm text-gray-400">
                  Reasoning models think through edge cases and architecture decisions upfront
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Execution Becomes Mechanical</p>
                <p className="text-sm text-gray-400">
                  With prompts prepared, you're just feeding and validating, not thinking
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Reproducible Process</p>
                <p className="text-sm text-gray-400">
                  Artifacts (spec, plan, prompts) are reusable and shareable
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Right Tool for Each Phase</p>
                <p className="text-sm text-gray-400">
                  Conversational AI for ideas, reasoning for planning, coding AI for execution
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Easy to Iterate</p>
                <p className="text-sm text-gray-400">
                  If execution fails, go back to planning. If plan is wrong, refine spec
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}