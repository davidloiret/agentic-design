"use client"

import React from 'react';
import { Rocket, Clock, DollarSign, Code2 } from 'lucide-react';

export default function SaaSFromScratchContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <Rocket className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Building a SaaS from Scratch with AI</h1>
            <p className="text-gray-400 mt-2">Real case study: Analytics dashboard in 3 days</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Project</h2>
        <p className="text-gray-300 mb-6">
          <strong>Goal:</strong> Build "InsightFlow" - a web analytics SaaS with user auth, event tracking, dashboard, and billing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Timeline</p>
              <p className="text-sm text-gray-400">72 hours (3 days)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <DollarSign className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Cost</p>
              <p className="text-sm text-gray-400">$47 in AI credits</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Code2 className="w-6 h-6 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Lines of Code</p>
              <p className="text-sm text-gray-400">~8,500 (AI wrote 92%)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 1: Foundation (8 hours)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Spec & Planning (2h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4</p>
                <p className="text-sm text-gray-400 mb-3">
                  Created comprehensive spec.md with user stories, data models, API endpoints, tech stack decisions.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "I want to build a web analytics SaaS.
Features: event tracking, dashboard, user auth, billing.
Target: SMB websites. Budget: $0 initial hosting.
Help me create a complete spec with tech stack."`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Output:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Stack: Next.js 14, tRPC, Prisma, PostgreSQL (Supabase)</li>
                  <li>• Auth: Clerk (easiest integration)</li>
                  <li>• Billing: Stripe Checkout</li>
                  <li>• Hosting: Vercel free tier</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Project Setup (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Create Next.js 14 app with TypeScript, tRPC, Prisma, Tailwind"
[Claude sets up project structure]

$ "Create Prisma schema for: User, Website, Event, Subscription"
[Claude creates schema with relations]

$ "Set up tRPC router with auth middleware using Clerk"
[Claude configures tRPC + Clerk integration]`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Result:</p>
                <p className="text-xs text-gray-400">Fully configured project with DB migrations, type-safe API, auth working</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Evening: Core Features (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cmd+K: "Create website registration form with validation"
[Generates React Hook Form with Zod schema]

Cmd+K: "Build event ingestion API endpoint with rate limiting"
[Creates tRPC mutation with Redis rate limiter]

Cmd+K: "Dashboard page with real-time event counter"
[React component with WebSocket connection]`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Stats:</p>
                <p className="text-xs text-gray-400">3,200 lines generated, 0 bugs, all tests passing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 2: Features & Polish (10h)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Analytics Dashboard (4h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: V0 + Cursor</p>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-2">Workflow:</p>
                  <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                    <li>V0: Generate dashboard UI components (charts, metrics cards)</li>
                    <li>Copy components into project</li>
                    <li>Cursor: "Connect these charts to tRPC queries for event data"</li>
                    <li>AI wires up data fetching, loading states, error handling</li>
                  </ol>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Features added:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Real-time visitor count</li>
                  <li>• Page views chart (Recharts)</li>
                  <li>• Top pages table</li>
                  <li>• Geographic map (react-simple-maps)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Billing Integration (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with Stripe docs</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "@docs stripe checkout session"
[AI reads Stripe docs]

Prompt: "Create 3 pricing tiers: Starter ($29), Pro ($99), Enterprise ($299).
Implement Stripe Checkout flow with webhook handler."

[AI generates:]
- Pricing page with tier cards
- tRPC mutation to create checkout session
- Webhook endpoint to handle successful payments
- Subscription status updates in DB`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Evening: Testing (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: GitHub Copilot + Jest</p>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-2">Test generation:</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Highlighted each API route → Asked for tests</li>
                    <li>• Copilot generated unit tests with mocks</li>
                    <li>• Added integration tests for critical flows</li>
                    <li>• 87% coverage achieved</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 3: Production Ready (6h)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Tracking SDK (2h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Create a lightweight JavaScript SDK (<2KB) that:
1. Tracks page views automatically
2. Allows custom events
3. Batches requests
4. Works with React, Vue, vanilla JS"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Output:</p>
                <p className="text-xs text-gray-400">1.8KB minified SDK with TypeScript types, NPM package ready</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-teal-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Midday: Documentation (2h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4</p>
                <p className="text-sm text-gray-400 mb-2">
                  Pasted codebase structure → AI generated:
                </p>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• README.md with setup instructions</li>
                  <li>• API documentation (OpenAPI spec)</li>
                  <li>• SDK usage guide with examples</li>
                  <li>• Architecture diagram (Mermaid)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Deploy (2h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor + Vercel CLI</p>
                <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ vercel deploy --prod
[Vercel builds and deploys]

Cursor: "Set up GitHub Actions for:
- Run tests on PR
- Deploy preview on push
- Production deploy on main merge"

[AI creates .github/workflows/ci.yml]`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Result:</p>
                <p className="text-xs text-gray-400">Live at insightflow.app with SSL, CDN, CI/CD pipeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What AI Did Well</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Boilerplate</p>
                <p className="text-xs text-gray-400">Setup, configs, type definitions</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">CRUD Operations</p>
                <p className="text-xs text-gray-400">Database queries, API routes</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">UI Components</p>
                <p className="text-xs text-gray-400">Forms, tables, charts with styling</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Integration Code</p>
                <p className="text-xs text-gray-400">Stripe, Clerk, Supabase wiring</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Tests</p>
                <p className="text-xs text-gray-400">Unit and integration test suites</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What Required Human Input</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Architecture Decisions</p>
                <p className="text-xs text-gray-400">Choosing tech stack, data models</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Business Logic</p>
                <p className="text-xs text-gray-400">Pricing tiers, rate limits, rules</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">UX Flow</p>
                <p className="text-xs text-gray-400">User journey, error messages</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Edge Cases</p>
                <p className="text-xs text-gray-400">Identifying missing validation</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Review & Refinement</p>
                <p className="text-xs text-gray-400">Code review, security checks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Final Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-400 mb-1">72h</p>
            <p className="text-xs text-gray-500">Total time</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">$47</p>
            <p className="text-xs text-gray-500">AI credits</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-purple-400 mb-1">8.5K</p>
            <p className="text-xs text-gray-500">Lines of code</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-400 mb-1">92%</p>
            <p className="text-xs text-gray-500">AI generated</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Takeaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Success Factors</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Clear spec upfront (2h investment paid off)</li>
              <li>• Used right tool for each task (V0 for UI, Cursor for logic)</li>
              <li>• Iterative prompting (refine, don't restart)</li>
              <li>• Comprehensive tests prevented bugs</li>
              <li>• Leveraged managed services (auth, DB, hosting)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Lessons Learned</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• AI needs detailed context (specs, examples)</li>
              <li>• Review everything (AI makes subtle mistakes)</li>
              <li>• Start simple, iterate (MVP first)</li>
              <li>• Human still drives architecture</li>
              <li>• 10x faster than solo coding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
