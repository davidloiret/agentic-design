"use client"

import React from 'react';
import { RefreshCw, Package, Zap, AlertTriangle } from 'lucide-react';

export default function LegacyModernizationContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl">
            <RefreshCw className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Legacy Code Modernization with AI</h1>
            <p className="text-gray-400 mt-2">Migrating jQuery app to React + TypeScript</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Project</h2>
        <p className="text-gray-300 mb-6">
          <strong>Task:</strong> Modernize a 50K LOC jQuery + PHP admin panel to React + TypeScript + Node.js without breaking production.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-bold text-red-400 mb-1">50,000</p>
            <p className="text-xs text-gray-500">Lines of legacy code</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400 mb-1">8 weeks</p>
            <p className="text-xs text-gray-500">Migration timeline</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400 mb-1">0</p>
            <p className="text-xs text-gray-500">Production incidents</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400 mb-1">75%</p>
            <p className="text-xs text-gray-500">AI-generated code</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Phase 1: Analysis (Week 1)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Understanding the Beast</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude with Code Analysis</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Analyze this legacy codebase structure.
Identify:
1. Core business logic vs UI coupling
2. API endpoints (document all routes)
3. Database schema and queries
4. Third-party dependencies
5. Critical paths (auth, payments)

Files: [uploaded 50 key files]"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-2">AI Output:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• 42 API endpoints (RESTful PHP)</li>
                  <li>• 12 MySQL tables</li>
                  <li>• Heavy jQuery DOM manipulation</li>
                  <li>• No tests (!)  </li>
                  <li>• Business logic scattered across JS + PHP</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Create Migration Plan</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4 with o1-preview</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Create a zero-downtime migration plan.
Strategy: Strangler Fig pattern
- Keep PHP backend initially
- Replace frontend piece by piece
- Add proxy layer for gradual rollout
- Feature flags for rollback"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-1">AI generates 8-week phased plan:</p>
                <p className="text-xs text-gray-400">Week 1: Setup, Week 2-3: Auth, Week 4-5: Core features, Week 6-7: Data views, Week 8: Polish & deploy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Phase 2: Foundation (Week 2)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">New Stack Setup</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Set up React + TypeScript + Vite project with:
- React Router for routing
- TanStack Query for data fetching
- Zustand for state
- Axios configured to hit existing PHP API"

[Claude creates project structure]

$ "Create TypeScript types for all 42 API endpoints.
Here's the PHP route file: [paste routes.php]"

[Claude generates 800 lines of types]`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Proxy Layer</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Cursor: "Create Express middleware that:
- Routes /api/* to PHP backend (legacy)
- Routes /app/* to React frontend (new)
- Adds feature flag support (check Redis)
- Logs all traffic for debugging"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">This allows gradual rollout: users see new UI only if their account has feature flag enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Phase 3: Component Migration (Weeks 3-7)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Automated jQuery → React Conversion</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude with systematic approach</p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">Example: User Table Component</p>
                    <p className="text-xs text-gray-500 mb-2">Legacy jQuery (250 lines):</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`$('#user-table').DataTable({
  ajax: '/api/users',
  columns: [...],
  drawCallback: function() {
    $('.edit-btn').click(function() {
      var userId = $(this).data('id');
      // 150 more lines...
    });
  }
});`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">Prompt to Claude:</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`"Convert this jQuery DataTable to React + TypeScript:
- Use TanStack Table
- Maintain exact same features (sorting, filtering, pagination)
- Add TypeScript types for all data
- Use React Query for data fetching
- Keep the same API endpoint"`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">AI Output: Modern React Component (180 lines):</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`const UserTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const table = useReactTable({
    data,
    columns,
    // ... type-safe config
  });

  return <div className="table-container">...</div>
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Complex Forms Migration</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor + V0</p>
                <div className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-400 space-y-2">
                  <p>1. Screenshot legacy form</p>
                  <p>2. V0: Generate React form UI matching design</p>
                  <p>3. Cursor: "Add validation with Zod, connect to /api/users/create"</p>
                  <p>4. AI adds form logic, error handling, success states</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Testing Each Migration</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: GitHub Copilot</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`For each migrated component:

1. Copilot generates React Testing Library tests
2. Mock API responses to match PHP behavior
3. Visual regression tests (Percy/Chromatic)
4. E2E tests for critical flows (Playwright)

Result: 92% test coverage on new code`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Phase 4: Backend Migration (Week 6-7)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">PHP → Node.js API</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Convert this PHP API endpoint to Express + Prisma:
[paste PHP code]

Requirements:
- Same request/response format (backward compatible)
- Use Prisma for database
- Add input validation with Zod
- Include error handling
- Write tests"

[AI converts endpoint by endpoint]

$ "Create migration script that:
1. Sets up Prisma schema from MySQL
2. Generates types
3. Validates data integrity"`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-indigo-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Parallel Running</h3>
            <div className="bg-gray-900/50 rounded p-4 text-xs text-gray-400 space-y-2">
              <p>• Both PHP and Node.js backends run simultaneously</p>
              <p>• Proxy routes 10% traffic to Node.js (canary)</p>
              <p>• Compare responses for 1 week (AI helps analyze diffs)</p>
              <p>• Gradually increase to 100%</p>
              <p>• Retire PHP backend</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Challenges & Solutions</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />
                <p className="text-sm font-medium text-white">Challenge: No Documentation</p>
              </div>
              <p className="text-xs text-gray-400 ml-7">
                Solution: AI analyzed code comments and behavior to infer business rules. Generated docs from code.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />
                <p className="text-sm font-medium text-white">Challenge: Spaghetti Code</p>
              </div>
              <p className="text-xs text-gray-400 ml-7">
                Solution: Used DDD principles. AI helped extract business logic into domain services.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />
                <p className="text-sm font-medium text-white">Challenge: Hidden Dependencies</p>
              </div>
              <p className="text-xs text-gray-400 ml-7">
                Solution: AI traced all $.ajax calls, document.cookie usage, localStorage access. Created dependency map.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />
                <p className="text-sm font-medium text-white">Challenge: Zero Test Coverage</p>
              </div>
              <p className="text-xs text-gray-400 ml-7">
                Solution: AI generated comprehensive test suite for new code. Caught 47 edge cases we missed.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Migration Time</span>
              <span className="text-white font-bold">8 weeks</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Code Quality</span>
              <span className="text-green-400 font-bold">A+ (SonarQube)</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Test Coverage</span>
              <span className="text-blue-400 font-bold">92%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Performance</span>
              <span className="text-purple-400 font-bold">3.2x faster</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Bundle Size</span>
              <span className="text-cyan-400 font-bold">-65%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Production Incidents</span>
              <span className="text-green-400 font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Developer Velocity</span>
              <span className="text-orange-400 font-bold">+5x</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Takeaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">What Worked</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Strangler Fig pattern (gradual replacement)</li>
              <li>• Feature flags for safe rollout</li>
              <li>• AI-generated tests caught issues early</li>
              <li>• Parallel running validated correctness</li>
              <li>• Component-by-component approach (not big bang)</li>
              <li>• AI excelled at mechanical translation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Human Still Needed For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Architecture decisions (DDD, clean architecture)</li>
              <li>• Business logic validation</li>
              <li>• Security review (AI missed 2 issues)</li>
              <li>• Performance optimization strategy</li>
              <li>• Stakeholder communication</li>
              <li>• Rollback procedures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
