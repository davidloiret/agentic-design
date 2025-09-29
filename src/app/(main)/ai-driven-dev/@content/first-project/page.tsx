"use client"

import React, { useState } from 'react';
import { Rocket, CheckCircle, Code2, Database, Globe, Terminal, AlertCircle, Clock, Trophy } from 'lucide-react';

export default function FirstProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Setup Environment',
    'Create Project',
    'Generate Backend',
    'Build Frontend',
    'Deploy',
    'Done!'
  ];

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <Rocket className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Your First AI-Coded Project
            </h1>
            <p className="text-gray-400 mt-2">
              Build a complete Task Manager app with AI in 30 minutes
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {steps.map((step, idx) => (
            <span key={step} className={idx <= currentStep ? 'text-green-400' : ''}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <Clock className="w-6 h-6 text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Time Estimate</h3>
          <p className="text-gray-400 text-sm">30-45 minutes total</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <Trophy className="w-6 h-6 text-amber-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Difficulty</h3>
          <p className="text-gray-400 text-sm">Beginner friendly</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <Code2 className="w-6 h-6 text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Stack</h3>
          <p className="text-gray-400 text-sm">Next.js + tRPC + Prisma + SQLite</p>
        </div>
      </div>

      {/* What You'll Build */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">What You'll Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Create, read, update, delete tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Mark tasks as complete/incomplete</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Filter by status (all, active, completed)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Persistent storage with SQLite</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Responsive UI with Tailwind CSS</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">→</span>
                <span>How to prompt AI for complete features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">→</span>
                <span>Iterating on AI-generated code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">→</span>
                <span>Testing AI code (what to check)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">→</span>
                <span>When to accept vs. regenerate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-0.5">→</span>
                <span>Deploying AI-generated apps</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
          <p className="text-sm text-green-200">
            <strong>Goal:</strong> By the end, you'll have a working task manager deployed to Vercel, and understand the AI development workflow.
          </p>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Setup Environment</h2>
              <p className="text-sm text-gray-400">5 minutes • One-time setup</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Prerequisites:</strong></p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Node.js 18+ installed</li>
                <li>• VS Code or Cursor installed</li>
                <li>• Claude or OpenAI API key</li>
                <li>• GitHub account (for deployment)</li>
              </ul>
            </div>

            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Install Cursor (Recommended):</strong></p>
              <p className="text-sm text-gray-400 mb-3">
                Download from <a href="https://cursor.sh" className="text-cyan-400 hover:text-cyan-300">cursor.sh</a>, install, and configure your API key in Settings → Models
              </p>
              <p className="text-xs text-gray-500">
                Alternative: Use Claude.ai web interface or any AI coding tool you prefer
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep))}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Mark as Complete →
          </button>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Create Project Structure</h2>
              <p className="text-sm text-gray-400">5 minutes • Let AI scaffold everything</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>The Prompt:</strong></p>
              <div className="bg-gray-900 rounded p-4 border border-gray-700">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`Create a new Next.js 14 project with TypeScript called "task-manager" with:
- tRPC for type-safe API
- Prisma ORM with SQLite database
- Tailwind CSS for styling
- App Router
- Project structure following best practices

Generate all config files, setup Prisma schema for a Task model (id, title, description, completed, createdAt), and create the basic folder structure (app/, server/, prisma/).`}
                </pre>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
              <p className="text-sm text-green-200">
                <strong>💡 Tip:</strong> AI will generate package.json, tsconfig.json, tailwind.config.js, and prisma/schema.prisma. Review each file briefly to understand the structure.
              </p>
            </div>

            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>After AI generates files:</strong></p>
              <div className="bg-gray-900 rounded p-4 border border-gray-700">
                <pre className="text-sm text-gray-300">
{`npm install
npx prisma generate
npx prisma db push
npm run dev`}
                </pre>
              </div>
              <p className="text-xs text-gray-400 mt-3">Project should now run at http://localhost:3000</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(Math.max(2, currentStep))}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Mark as Complete →
          </button>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <span className="text-cyan-400 font-bold">3</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Build Backend API</h2>
              <p className="text-sm text-gray-400">10 minutes • tRPC routes + Prisma</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>The Prompt:</strong></p>
              <div className="bg-gray-900 rounded p-4 border border-gray-700">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`Create tRPC router in server/routers/task.ts with these procedures:
- getTasks: get all tasks with optional filter (all/active/completed)
- createTask: create new task (input: title, description)
- updateTask: update task (input: id, title?, description?, completed?)
- deleteTask: delete task by id

Use Prisma client to interact with database. Include proper TypeScript types and Zod validation for inputs.`}
                </pre>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-200 font-medium mb-1">Check AI Output:</p>
                  <ul className="text-xs text-amber-200/80 space-y-1">
                    <li>• Verify Zod schemas match Prisma types</li>
                    <li>• Ensure error handling exists</li>
                    <li>• Check that completed is boolean</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Test the API:</strong></p>
              <p className="text-sm text-gray-400">
                Use tRPC's built-in playground or create a simple test file to verify CRUD operations work.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(Math.max(3, currentStep))}
            className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors font-medium"
          >
            Mark as Complete →
          </button>
        </div>

        {/* Step 4 */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 font-bold">4</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Build Frontend UI</h2>
              <p className="text-sm text-gray-400">15 minutes • React components</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>The Prompt:</strong></p>
              <div className="bg-gray-900 rounded p-4 border border-gray-700">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`Create app/page.tsx with a task manager UI using Tailwind CSS:

1. TaskInput component: form to add new tasks (title, description)
2. TaskList component: displays tasks with checkboxes and delete buttons
3. Filter buttons: All, Active, Completed
4. Use tRPC client to call our API
5. Optimistic updates for better UX
6. Clean, modern design with hover effects

Make it responsive and accessible.`}
                </pre>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
              <p className="text-sm text-green-200">
                <strong>💡 Iteration Tip:</strong> After initial generation, ask AI to improve specific aspects: "Make the delete button red and add a confirm dialog" or "Add loading states"
              </p>
            </div>

            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Common Improvements to Request:</strong></p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Add loading spinners during API calls</li>
                <li>• Implement error toast notifications</li>
                <li>• Add keyboard shortcuts (Enter to submit)</li>
                <li>• Improve mobile responsiveness</li>
                <li>• Add task count badges</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(Math.max(4, currentStep))}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            Mark as Complete →
          </button>
        </div>

        {/* Step 5 */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
              <span className="text-orange-400 font-bold">5</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Deploy to Vercel</h2>
              <p className="text-sm text-gray-400">5 minutes • One-click deploy</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Deployment Steps:</strong></p>
              <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                <li>Push code to GitHub: <code className="text-cyan-400">git init && git add . && git commit -m "Initial commit"</code></li>
                <li>Create repo on GitHub and push</li>
                <li>Go to <a href="https://vercel.com" className="text-cyan-400">vercel.com</a>, click "New Project"</li>
                <li>Import your GitHub repository</li>
                <li>Vercel auto-detects Next.js, click "Deploy"</li>
              </ol>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4">
              <p className="text-sm text-amber-200">
                <strong>Note:</strong> SQLite works for demo, but for production, switch to PostgreSQL (Vercel Postgres or Supabase). AI can help migrate in 2 minutes.
              </p>
            </div>

            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <p className="text-sm text-gray-300 mb-3"><strong>Post-Deployment:</strong></p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Test all CRUD operations on live site</li>
                <li>• Share URL with friends</li>
                <li>• Check Vercel logs for any errors</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(Math.max(5, currentStep))}
            className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
          >
            Mark as Complete →
          </button>
        </div>

        {/* Congratulations */}
        {currentStep === 5 && (
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 text-center">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Congratulations!</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              You've built and deployed your first AI-coded application. You now understand the core workflow:
              clear prompts → review output → iterate → deploy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Next Challenge</h3>
                <p className="text-sm text-gray-400">Add user authentication with Clerk or NextAuth</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Level Up</h3>
                <p className="text-sm text-gray-400">Explore advanced patterns: DDD, Hexagonal Architecture</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Share</h3>
                <p className="text-sm text-gray-400">Post your deployed app on Twitter with #AICodedThis</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Common Pitfalls */}
      <div className="mt-12 bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8">
        <div className="flex items-start gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Common Pitfalls to Avoid</h2>
            <p className="text-gray-400">Learn from common mistakes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Vague prompts</p>
            <p className="text-sm text-gray-400">Be specific about tech stack, file structure, features</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Not testing AI code</p>
            <p className="text-sm text-gray-400">Always test immediately, don't accumulate untested code</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Accepting first output</p>
            <p className="text-sm text-gray-400">Iterate 2-3 times for better quality</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Ignoring errors</p>
            <p className="text-sm text-gray-400">Copy full error messages to AI for better fixes</p>
          </div>
        </div>
      </div>
    </div>
  );
}