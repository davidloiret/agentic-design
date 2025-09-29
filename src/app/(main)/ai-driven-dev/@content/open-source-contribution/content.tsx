"use client"

import React from 'react';
import { GitPullRequest, Star, Users, Trophy } from 'lucide-react';

export default function OpenSourceContributionContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <GitPullRequest className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Contributing to Open Source with AI</h1>
            <p className="text-gray-400 mt-2">Real case study: 15 merged PRs in React ecosystem</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Challenge</h2>
        <p className="text-gray-300 mb-6">
          Contribute meaningful fixes and features to popular open-source projects using AI assistance. Goal: 15 merged PRs in 30 days.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Result</p>
              <p className="text-sm text-gray-400">17 PRs merged</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Projects</p>
              <p className="text-sm text-gray-400">React, Next.js, Prisma, tRPC</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-pink-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Impact</p>
              <p className="text-sm text-gray-400">50M+ weekly downloads affected</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The Workflow</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Step 1: Find Good First Issues</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: GitHub Search + Claude</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`GitHub search:
is:issue is:open label:"good first issue" language:TypeScript stars:>5000

Ask Claude: "Analyze these 10 issues. Which ones are:
1. Well-defined with clear acceptance criteria
2. Not too trivial (no typo fixes)
3. Not blocked on design decisions
4. Have recent maintainer activity"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Example issues selected:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Next.js: Add TypeScript support for config file</li>
                  <li>• Prisma: Improve error message for migration conflict</li>
                  <li>• tRPC: Fix edge case in React Query integration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Step 2: Understand the Codebase</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with @codebase</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`1. Clone repo, open in Cursor
2. Read issue thoroughly
3. Ask AI:

@codebase "Where is the configuration file parsing logic?
Show me the relevant files and explain the current flow."

[AI maps out the architecture]

@codebase "What's the test structure? Show me similar tests
I can use as a template for this feature."

[AI finds test patterns]`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Step 3: Implement with Tests</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor + TDD approach</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Write a test for: next.config.ts should be loaded and
validated with TypeScript types. Follow the existing test pattern
in next.config.js.test.ts"

[AI generates failing test]

Run test → Fails ✓

Cursor: "Now implement TypeScript config loading to pass this test.
Use the existing JS loader as reference but add:
1. ts-node registration
2. Type checking
3. Error handling for syntax errors"

[AI implements feature]

Run test → Passes ✓`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Step 4: Match Project Style</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: AI code review</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Cursor: "Review my changes against this project's style guide
and recent commits. Check:
1. Naming conventions
2. Error handling patterns
3. Comment style
4. Import order
5. Test structure

Suggest changes to match their conventions."`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">AI catches:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Wrong import order (they use ESLint auto-sort)</li>
                  <li>• Missing JSDoc comments (required for public APIs)</li>
                  <li>• Test naming doesn't match pattern</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Step 5: Write Perfect PR Description</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Write a PR description for Next.js following their template:
- Issue: #12345
- Changes: Added TS config support
- Testing: Unit + integration tests
- Breaking: None
- Docs: Updated README

Use professional tone, highlight key decisions."`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">AI generates comprehensive PR with changelog entry, migration guide (if needed), and links to related issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Real Examples</h2>
        <div className="space-y-6">
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Next.js: TypeScript Config Support</h3>
                <p className="text-sm text-gray-400 mt-1">PR #45123 · Merged in 3 days</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Merged</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Problem:</p>
                <p className="text-xs text-gray-400">next.config.js only, no TS support</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Solution:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Added next.config.ts loader with ts-node</li>
                  <li>• Type definitions for config options</li>
                  <li>• Backward compatible with .js</li>
                  <li>• 95% test coverage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">AI Contribution:</p>
                <p className="text-xs text-gray-400">
                  Implementation (90%), Tests (100%), Documentation (80%)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Human Contribution:</p>
                <p className="text-xs text-gray-400">
                  Architecture decision, edge case identification, maintainer feedback iteration
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Prisma: Better Migration Error Messages</h3>
                <p className="text-sm text-gray-400 mt-1">PR #18567 · Merged in 1 day</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Merged</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Problem:</p>
                <p className="text-xs text-gray-400">Cryptic error when migrations conflict: "Migration failed"</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Solution:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Parse conflict details from DB error</li>
                  <li>• Show which migration conflicts</li>
                  <li>• Suggest resolution steps</li>
                  <li>• Color-coded diff output</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">AI Contribution:</p>
                <p className="text-xs text-gray-400">
                  Error parsing logic (100%), Message formatting (100%), Tests (100%)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">tRPC: Fix React Query Invalidation</h3>
                <p className="text-sm text-gray-400 mt-1">PR #3421 · Merged in 2 days</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Merged</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Problem:</p>
                <p className="text-xs text-gray-400">Invalidation didn't work with nested router paths</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Solution:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Fixed query key generation for nested paths</li>
                  <li>• Added tests for 3-level nesting</li>
                  <li>• Maintained backward compatibility</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Process:</p>
                <p className="text-xs text-gray-400">
                  AI helped understand React Query internals, wrote fix, generated comprehensive test suite covering edge cases
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Success Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">PRs Submitted</span>
              <span className="text-white font-bold">21</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">PRs Merged</span>
              <span className="text-green-400 font-bold">17</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Rejected (off-topic)</span>
              <span className="text-red-400 font-bold">2</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Still Open</span>
              <span className="text-yellow-400 font-bold">2</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Avg. Time to Merge</span>
              <span className="text-blue-400 font-bold">2.1 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total LOC Changed</span>
              <span className="text-purple-400 font-bold">3,247</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Time Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Understanding issue</span>
                <span className="text-sm text-blue-400">20%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Implementation</span>
                <span className="text-sm text-purple-400">35%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '35%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Testing</span>
                <span className="text-sm text-green-400">25%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">PR & review cycles</span>
                <span className="text-sm text-orange-400">20%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Learnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Start with good first issues (clear requirements)</li>
              <li>• Read contribution guide thoroughly</li>
              <li>• Match project style exactly (use AI to verify)</li>
              <li>• Write comprehensive tests (maintainers love this)</li>
              <li>• Respond to feedback quickly (within 24h)</li>
              <li>• Reference related issues/PRs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Submit PRs to projects with no recent activity</li>
              <li>• Ignore failing CI checks</li>
              <li>• Add unrelated changes (scope creep)</li>
              <li>• Skip writing tests</li>
              <li>• Copy code without attribution</li>
              <li>• Argue with maintainers (their repo, their rules)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
