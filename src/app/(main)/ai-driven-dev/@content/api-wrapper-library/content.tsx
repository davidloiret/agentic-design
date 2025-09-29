"use client"

import React from 'react';
import { Package, Code2, Rocket, GitBranch } from 'lucide-react';

export default function APIWrapperLibraryContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl">
            <Package className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Building an API Wrapper Library</h1>
            <p className="text-gray-400 mt-2">TypeScript SDK for Stripe API in 48 hours</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Project</h2>
        <p className="text-gray-300 mb-6">
          <strong>Goal:</strong> Create a type-safe, production-ready TypeScript wrapper for Stripe API with better DX than the official SDK.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-bold text-orange-400 mb-1">48h</p>
            <p className="text-xs text-gray-500">Time to v1.0</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400 mb-1">127</p>
            <p className="text-xs text-gray-500">API endpoints wrapped</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400 mb-1">100%</p>
            <p className="text-xs text-gray-500">Type coverage</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400 mb-1">85%</p>
            <p className="text-xs text-gray-500">AI generated</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 1: Foundation (12 hours)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Research & Planning (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4 with web browsing</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Analyze Stripe API documentation.
Extract:
1. All REST endpoints (list by resource)
2. Request/response schemas
3. Authentication methods
4. Rate limiting rules
5. Webhook event types

Compare to official stripe-node SDK.
What DX improvements are possible?"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-500 mb-2">AI Output:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• 127 endpoints across 18 resources</li>
                  <li>• Official SDK uses callback hell (pre-Promise)</li>
                  <li>• Opportunity: Modern async/await, better types</li>
                  <li>• Opportunity: Request builder pattern</li>
                  <li>• Opportunity: Automatic retry with exponential backoff</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Project Setup (4h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Create TypeScript library with:
- tsup for bundling (ESM + CJS)
- Vitest for testing
- Prettier + ESLint
- Changesets for versioning
- GitHub Actions for CI/CD"

[Claude sets up modern TS project]

$ "Create base HTTP client with:
- Axios wrapper
- Exponential backoff retry
- Request/response interceptors
- Type-safe error handling"`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Evening: Type Generation (5h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with OpenAPI spec</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Generate TypeScript types from Stripe OpenAPI spec.
For each resource (Customer, Charge, etc):
1. Create interface for object
2. Create types for create/update params
3. Create types for list params
4. Add JSDoc comments from descriptions"

[AI generates 3,200 lines of types]

Cursor: "Now create Zod schemas for runtime validation
from these TypeScript types"

[AI generates matching Zod schemas]`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">Result: Complete type safety at compile-time AND runtime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 2: Implementation (12 hours)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Resource Classes (4h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude with pattern replication</p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">Prompt Strategy:</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`"Create a Customers resource class:

class Customers extends Resource {
  async create(params: CustomerCreateParams): Promise<Customer>
  async retrieve(id: string): Promise<Customer>
  async update(id: string, params: CustomerUpdateParams): Promise<Customer>
  async list(params?: CustomerListParams): Promise<List<Customer>>
  async del(id: string): Promise<DeletedCustomer>
}

Include:
- JSDoc for each method
- Input validation with Zod
- Proper error handling
- Rate limit handling"`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Then scale:</p>
                    <p className="text-xs text-gray-400">"Now create the same for: Charges, PaymentIntents, Subscriptions, Invoices..."</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">AI generated 18 resource classes (2,800 LOC) in 4 hours</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Midday: Request Builder API (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor with fluent API design</p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">Goal: Better DX than official SDK</p>
                    <div className="font-mono text-xs space-y-3">
                      <div>
                        <p className="text-gray-500 mb-1">❌ Official SDK:</p>
                        <pre className="text-gray-400">{`stripe.customers.create({
  email: 'user@example.com',
  metadata: { userId: '123' }
}, { idempotencyKey: 'key' });`}</pre>
                      </div>
                      <div>
                        <p className="text-green-500 mb-1">✓ Our SDK:</p>
                        <pre className="text-gray-400">{`await stripe.customers
  .create({ email: 'user@example.com' })
  .withMetadata({ userId: '123' })
  .withIdempotency('key')
  .exec();`}</pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Prompt:</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`"Create a fluent builder pattern for Stripe requests.
Allow chaining: .expand(), .withMetadata(), .withIdempotency()
Keep full type safety throughout the chain"`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Testing (5h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: GitHub Copilot + Vitest</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`For each resource class, Copilot generates:

1. Unit tests (mock HTTP responses)
describe('Customers', () => {
  it('creates customer with valid params', async () => {
    // AI-generated test
  });
});

2. Integration tests (Stripe test mode)
describe('Customers Integration', () => {
  it('full CRUD cycle', async () => {
    // AI-generated test using real API
  });
});

3. Error handling tests
it('retries on rate limit', async () => {
  // AI-generated retry logic test
});`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">Coverage: 94% (AI wrote 100% of tests)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Day 3: Polish & Publish (12 hours)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Morning: Documentation (4h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Prompt: "Generate documentation for this SDK.
Include:
1. README with installation, quickstart, examples
2. API reference (all methods with examples)
3. Migration guide from official SDK
4. Advanced usage (webhooks, pagination, etc)
5. TypeScript usage examples

Source: [paste all type definitions and class signatures]"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">AI generates 80-page documentation site with live code examples</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-teal-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Midday: Examples & Recipes (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`Cursor: "Create example applications:
1. Express API with subscription billing
2. Next.js checkout flow
3. Webhook handler with signature verification
4. Customer portal with React

All using our new SDK"`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-3">
                <p className="text-xs text-gray-400">4 complete example apps generated, all working out of the box</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Afternoon: Publish (2h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Set up automated releases:
- Changesets for version management
- GitHub Action to publish to npm
- Automated changelog generation
- Tag releases on merge to main"

[Claude creates CI/CD pipeline]

$ npm publish
✓ Published @yourusername/stripe-sdk@1.0.0`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Evening: Marketing (3h)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4</p>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <ul className="text-xs text-gray-400 space-y-2">
                    <li>• Twitter thread (AI wrote)</li>
                    <li>• Dev.to article comparing to official SDK (AI wrote)</li>
                    <li>• Reddit r/typescript post (AI wrote)</li>
                    <li>• Product Hunt launch copy (AI wrote)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Improvements Over Official SDK</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Modern TypeScript</p>
                <p className="text-xs text-gray-400">100% type coverage, no any types</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Fluent API</p>
                <p className="text-xs text-gray-400">Chain methods for better readability</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Runtime Validation</p>
                <p className="text-xs text-gray-400">Zod schemas catch errors early</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Automatic Retry</p>
                <p className="text-xs text-gray-400">Exponential backoff built-in</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Better DX</p>
                <p className="text-xs text-gray-400">Autocomplete, inline docs, examples</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">First Week Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">npm Downloads</span>
              <span className="text-white font-bold">2,347</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">GitHub Stars</span>
              <span className="text-yellow-400 font-bold">487</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Contributors</span>
              <span className="text-green-400 font-bold">12</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Issues Opened</span>
              <span className="text-blue-400 font-bold">8</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">PRs Merged</span>
              <span className="text-purple-400 font-bold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Community Interest</span>
              <span className="text-orange-400 font-bold">High</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Code Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Official SDK</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
              <pre className="text-gray-400">{`const stripe = require('stripe')('sk_...');

const customer = await stripe.customers.create({
  email: 'user@example.com',
  name: 'John Doe',
  metadata: {
    userId: '123'
  }
}, {
  idempotencyKey: 'key'
});

// No type safety
// Callbacks or promises
// Manual error handling`}</pre>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Our SDK</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
              <pre className="text-gray-400">{`import { Stripe } from '@you/stripe-sdk';

const stripe = new Stripe('sk_...');

const customer = await stripe.customers
  .create({
    email: 'user@example.com',
    name: 'John Doe'
  })
  .withMetadata({ userId: '123' })
  .withIdempotency('key')
  .exec();

// Full TypeScript types
// Fluent API
// Auto-retry on errors`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Lessons Learned</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">AI Excelled At</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Type generation from OpenAPI specs</li>
              <li>• Repetitive resource class creation</li>
              <li>• Test suite generation (saved 20+ hours)</li>
              <li>• Documentation writing</li>
              <li>• Example code creation</li>
              <li>• CI/CD pipeline setup</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Human Required For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• API design decisions (fluent vs traditional)</li>
              <li>• Error handling strategy</li>
              <li>• Rate limiting approach</li>
              <li>• DX improvements over official SDK</li>
              <li>• Marketing strategy</li>
              <li>• Community engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
