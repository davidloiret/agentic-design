"use client"

import React from 'react';
import { Cpu, Zap, Target, TrendingUp } from 'lucide-react';

export default function PerformanceContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
            <Cpu className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Performance Optimization with AI</h1>
            <p className="text-gray-400 mt-2">From 2s to 200ms: Real optimization case study</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Challenge</h2>
        <p className="text-gray-300 mb-6">
          Production React app with severe performance issues: 2-second initial load, laggy interactions, poor Lighthouse scores.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400 mb-1">2.0s</p>
            <p className="text-xs text-gray-400">Initial load time</p>
            <p className="text-xs text-gray-500">Before</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-1">200ms</p>
            <p className="text-xs text-gray-400">Optimized load</p>
            <p className="text-xs text-gray-500">After</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-400 mb-1">45</p>
            <p className="text-xs text-gray-400">Lighthouse score</p>
            <p className="text-xs text-gray-500">Before</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-1">98</p>
            <p className="text-xs text-gray-400">Lighthouse score</p>
            <p className="text-xs text-gray-500">After</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI-Assisted Performance Audit</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Step 1: Identify Bottlenecks</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude with Lighthouse Report</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Analyze this Lighthouse report and Chrome DevTools
Performance profile. Identify top 5 performance bottlenecks:
[paste JSON report]

For each issue, explain:
1. Root cause
2. Impact on user experience
3. Recommended fix with code examples"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-2">AI Findings:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Bundle size: 2.8MB (unoptimized images, duplicate dependencies)</li>
                  <li>• Unnecessary re-renders: 47 components re-rendering on every state change</li>
                  <li>• No code splitting: Everything in one bundle</li>
                  <li>• Blocking 3rd-party scripts (analytics, ads)</li>
                  <li>• N+1 queries: 250+ API calls on initial load</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Step 2: Bundle Size Optimization</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with webpack-bundle-analyzer</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Analyze bundle and optimize:
1. Remove duplicate lodash imports (use lodash-es)
2. Replace moment.js with date-fns (92% smaller)
3. Lazy load react-big-calendar
4. Tree-shake unused Material-UI components
5. Compress images with next/image

Show before/after bundle sizes"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">Result: 2.8MB → 480KB (83% reduction)</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Step 3: React Performance</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with React DevTools Profiler</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Fix React performance issues:

1. Memoize expensive calculations in Dashboard component
2. Add React.memo to pure components (ProductCard, UserAvatar)
3. Use useCallback for event handlers in lists
4. Implement virtualization for 500-item table
5. Debounce search input

Show which components had most renders"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">Result: 47 → 3 components re-rendering (94% reduction)</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Step 4: API & Data Fetching</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Optimize data fetching:

1. Implement React Query with proper caching
2. Batch 250 individual requests into 3 bulk endpoints
3. Add pagination (infinite scroll)
4. Implement optimistic updates
5. Use SWR for real-time data

Generate the React Query setup and custom hooks"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">Result: 250 requests → 8 requests on initial load</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Step 5: Code Splitting & Lazy Loading</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Cursor: "Implement code splitting:

1. Route-based splitting with React.lazy()
2. Component-level splitting for heavy components
3. Preload critical routes on hover
4. Dynamic imports for modals and drawers
5. Generate loading skeletons for each lazy component"`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Before vs After Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">First Contentful Paint</span>
                <span className="text-sm text-green-400">-85%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-500/10 rounded p-2">
                  <span className="text-red-400">Before: 1.8s</span>
                </div>
                <div className="bg-green-500/10 rounded p-2">
                  <span className="text-green-400">After: 0.3s</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Time to Interactive</span>
                <span className="text-sm text-green-400">-90%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-500/10 rounded p-2">
                  <span className="text-red-400">Before: 3.2s</span>
                </div>
                <div className="bg-green-500/10 rounded p-2">
                  <span className="text-green-400">After: 0.4s</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Total Bundle Size</span>
                <span className="text-sm text-green-400">-83%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-500/10 rounded p-2">
                  <span className="text-red-400">Before: 2.8MB</span>
                </div>
                <div className="bg-green-500/10 rounded p-2">
                  <span className="text-green-400">After: 480KB</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">API Requests (initial)</span>
                <span className="text-sm text-green-400">-97%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-500/10 rounded p-2">
                  <span className="text-red-400">Before: 250</span>
                </div>
                <div className="bg-green-500/10 rounded p-2">
                  <span className="text-green-400">After: 8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Business Impact</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Bounce Rate</span>
              <span className="text-green-400 font-bold">-42%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-green-400 font-bold">+23%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Mobile Performance</span>
              <span className="text-green-400 font-bold">+118%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">SEO Ranking</span>
              <span className="text-green-400 font-bold">+15 positions</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Time to Optimize</span>
              <span className="text-blue-400 font-bold">18 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Optimization Strategies */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI-Powered Performance Analysis Techniques</h2>
        <p className="text-gray-300 mb-6">
          AI can analyze profiling data, execution plans, and metrics to identify optimization opportunities humans might miss.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Database Query Optimization
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Analyzing execution plans for slow queries</li>
              <li>• Suggesting optimal indexes based on query patterns</li>
              <li>• Identifying N+1 query problems</li>
              <li>• Recommending connection pooling strategies</li>
              <li>• Optimizing JOIN operations and subqueries</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Memory Usage Analysis
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Detecting memory leaks in closures</li>
              <li>• Identifying unnecessary object allocations</li>
              <li>• Optimizing data structures for memory efficiency</li>
              <li>• Suggesting caching opportunities</li>
              <li>• Analyzing heap snapshots for bloat</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Runtime Performance
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Profiling hot code paths</li>
              <li>• Identifying algorithmic inefficiencies (O(n²) → O(n))</li>
              <li>• Suggesting Web Workers for heavy computation</li>
              <li>• Optimizing render performance</li>
              <li>• Detecting layout thrashing</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Network Optimization
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Analyzing waterfall charts for sequential loading</li>
              <li>• Suggesting resource hints (preload, prefetch)</li>
              <li>• Optimizing API payload sizes</li>
              <li>• Implementing request batching/deduplication</li>
              <li>• Recommending CDN strategies</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Pro Tip:</strong> Feed AI your Chrome DevTools Performance profiles, Lighthouse reports, and database execution plans. Ask it to prioritize fixes by impact vs effort ratio for maximum efficiency.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Takeaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">AI Accelerated</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Analyzing performance profiles (saved 4h)</li>
              <li>• Generating optimized code patterns</li>
              <li>• Suggesting modern alternatives (date-fns vs moment)</li>
              <li>• Writing memoization wrappers</li>
              <li>• Creating virtualization components</li>
              <li>• Identifying optimization opportunities from metrics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Human Expertise</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Prioritizing optimizations (impact vs effort)</li>
              <li>• Understanding business metrics</li>
              <li>• Testing on real devices</li>
              <li>• Monitoring production performance</li>
              <li>• Making architectural trade-offs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
