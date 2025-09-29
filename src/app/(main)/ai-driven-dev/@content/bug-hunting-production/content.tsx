"use client"

import React from 'react';
import { Bug, Target, Clock, CheckCircle } from 'lucide-react';

export default function BugHuntingProductionContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
            <Bug className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Hunting Production Bugs with AI</h1>
            <p className="text-gray-400 mt-2">Solving 3 critical production issues in 6 hours</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Scenario</h2>
        <p className="text-gray-300 mb-6">
          <strong>3 AM Alert:</strong> Production e-commerce site with 3 critical bugs affecting checkout. Revenue loss: $8K/hour. No sleep until fixed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Resolution Time</p>
              <p className="text-sm text-gray-400">6 hours total</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Issues Fixed</p>
              <p className="text-sm text-gray-400">3 critical bugs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Revenue Saved</p>
              <p className="text-sm text-gray-400">$48K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Bug #1: Payment Processing Failures (3:00-4:30 AM)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Symptoms</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400 space-y-2">
              <p>• Stripe checkout failing for 40% of users</p>
              <p>• Error: "Payment intent already confirmed"</p>
              <p>• Started 2 hours ago, no recent deploys</p>
              <p>• Only affects users with saved cards</p>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">AI-Assisted Investigation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 1: Log Analysis with Claude</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ grep "Payment intent" logs/*.log > payment_errors.log

Paste into Claude: "Analyze these Stripe errors.
Find pattern in failing requests. What's different
about users with saved cards vs new cards?"

AI Response:
"Failed requests have duplicate idempotency keys.
The key generation uses userId + timestamp, but
timestamp precision is only seconds, not milliseconds.
If user retries within 1 second, same key is reused
for different payment intent → Stripe rejects."`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 2: Root Cause Confirmation</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "@codebase show me where we generate
idempotency keys for Stripe payments"

[AI locates file: src/services/payment.ts:123]

const idempotencyKey = \`\${userId}_\${Date.now()}\`;
//                                    ^^^^^^^^^^
//                                    Only milliseconds,
//                                    not unique enough!

Cursor: "This is the bug. Users clicking 'Pay' multiple
times get same key. Fix by adding random suffix."`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 3: Fix & Test</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Generate fix with:
1. crypto.randomUUID() in idempotency key
2. Add test to verify uniqueness
3. Add rate limiting on payment button
   (prevent double-click spam)"

[AI generates fix + tests]

Deploy to staging → Test → Deploy to prod
Time: 1.5 hours (3:00 AM - 4:30 AM)`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-sm font-medium text-green-400 mb-2">✓ Bug #1 Resolved</p>
            <p className="text-xs text-gray-400">Payment success rate: 40% → 99.2%</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Bug #2: Cart Data Loss (4:30-6:30 AM)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Symptoms</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400 space-y-2">
              <p>• Users reporting empty carts after login</p>
              <p>• Only on mobile Safari</p>
              <p>• Cart data exists in database</p>
              <p>• Happens during OAuth redirect flow</p>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">AI-Assisted Investigation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 1: Reproduce with AI</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`ChatGPT: "User reports: Add items to cart → Login
with Google → Cart empty. Only Safari mobile.
What are common causes of data loss during OAuth?"

AI Suggests:
1. Cookie issues (SameSite, Safari ITP)
2. LocalStorage cleared
3. Session not persisted
4. Race condition in auth flow`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 2: Code Analysis</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "@codebase trace the cart data flow:
1. Where is cart stored pre-auth?
2. How is it retrieved post-auth?
3. What happens during OAuth callback?"

AI finds:
- Pre-auth: Cart in localStorage (key: 'guest_cart')
- Post-auth: Supposed to merge with user cart
- OAuth callback: Runs before localStorage read!

The bug:
app.get('/auth/callback', async (req, res) => {
  await createSession(req.user);
  res.redirect('/checkout');
  // ❌ Page loads, localStorage read happens async
  // ❌ But cart merge already ran (no guest cart yet!)
});`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 3: Fix Implementation</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Fix this race condition:
1. Pass guest cart ID through OAuth state parameter
2. Retrieve from state in callback
3. Merge before redirect
4. Add fallback: client-side merge if server misses it"

[AI generates fix with both server + client fallback]

Also AI suggests: "Add E2E test for this flow
with Playwright, simulating OAuth redirect"`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-sm font-medium text-green-400 mb-2">✓ Bug #2 Resolved</p>
            <p className="text-xs text-gray-400">Cart preservation rate: 60% → 99.8%</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Bug #3: Inventory Overselling (6:30-9:00 AM)</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Symptoms</h3>
            <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400 space-y-2">
              <p>• Products showing "In Stock" but actually sold out</p>
              <p>• Multiple orders for last item in stock</p>
              <p>• Race condition during checkout</p>
              <p>• Refund nightmare brewing</p>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">AI-Assisted Investigation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 1: Database Analysis</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Claude: "Explain how we can oversell inventory.
Here's our order creation logic: [paste code]

And inventory check: [paste code]"

AI identifies:
"You have a time-of-check to time-of-use (TOCTOU) bug.
Process:
1. Check inventory: 1 item left ✓
2. User clicks buy
3. Another user clicks buy (also sees 1 left)
4. Both orders complete
5. Inventory goes to -1 ❌

Your SELECT and UPDATE are not atomic."`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 2: Fix with Database Transactions</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Fix this with PostgreSQL row-level locking:
1. Use SELECT FOR UPDATE in transaction
2. Decrement inventory atomically
3. Rollback if insufficient stock
4. Add test with concurrent requests"

[AI generates proper transaction handling]

Before (WRONG):
const product = await db.product.findOne(id);
if (product.inventory < quantity) throw Error();
await db.product.update({ inventory: - quantity });

After (CORRECT):
await db.transaction(async (tx) => {
  const product = await tx.product.findOne(id, {
    lock: 'FOR UPDATE'  // ← Lock row
  });
  if (product.inventory < quantity) {
    throw new Error('Out of stock');
  }
  await tx.product.update({
    inventory: product.inventory - quantity
  });
});`}</pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Step 3: Load Testing</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Create load test with k6:
- 100 concurrent users
- All buying last item in stock
- Verify only 1 succeeds
- Others get proper 'out of stock' error"

[AI generates k6 script]

Run test → All pass → Deploy to prod`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-sm font-medium text-green-400 mb-2">✓ Bug #3 Resolved</p>
            <p className="text-xs text-gray-400">Overselling incidents: 12/day → 0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Time Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Bug #1: Payment failures</span>
                <span className="text-sm text-red-400">1.5h</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Bug #2: Cart data loss</span>
                <span className="text-sm text-orange-400">2h</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '33%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Bug #3: Inventory race condition</span>
                <span className="text-sm text-yellow-400">2.5h</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '42%'}}></div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-300 font-bold">Total Resolution Time</span>
                <span className="text-green-400 font-bold">6 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Contribution</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Log Pattern Analysis</p>
                <p className="text-xs text-gray-400">Found idempotency key bug in 10 min</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Code Tracing</p>
                <p className="text-xs text-gray-400">Mapped auth flow race condition</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Fix Generation</p>
                <p className="text-xs text-gray-400">Proper transaction handling code</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Test Creation</p>
                <p className="text-xs text-gray-400">Load tests, E2E tests, unit tests</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Root Cause Analysis</p>
                <p className="text-xs text-gray-400">Explained TOCTOU and concurrency bugs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Without AI: Estimated Timeline</h2>
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-300">Bug #1 (Payment)</p>
              <span className="text-red-400">4-6 hours</span>
            </div>
            <p className="text-xs text-gray-400">
              Manual log grepping, trial-and-error debugging, Stripe docs reading
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-300">Bug #2 (Cart)</p>
              <span className="text-orange-400">6-8 hours</span>
            </div>
            <p className="text-xs text-gray-400">
              Mobile debugging, OAuth flow understanding, timing issues are notoriously hard
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-300">Bug #3 (Inventory)</p>
              <span className="text-yellow-400">8-12 hours</span>
            </div>
            <p className="text-xs text-gray-400">
              Race conditions require deep DB knowledge, load testing setup, might need DBA help
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="text-white font-bold">Traditional Total</p>
              <span className="text-red-400 font-bold">18-26 hours</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Revenue loss: ~$150K (vs $48K with AI-assisted debugging)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Takeaways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">AI Strengths in Debugging</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Pattern recognition in logs (faster than grep)</li>
              <li>• Explaining complex bugs (race conditions, timing)</li>
              <li>• Suggesting known solutions (transactions, locks)</li>
              <li>• Generating test cases</li>
              <li>• Code tracing across large codebases</li>
              <li>• Domain knowledge (OAuth, Stripe, DB transactions)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Still Need Human For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Reproducing bugs (AI can't click buttons)</li>
              <li>• Intuition about what changed recently</li>
              <li>• Business context (why this matters)</li>
              <li>• Rollback decisions</li>
              <li>• Customer communication</li>
              <li>• Final verification and deployment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
