"use client"

import React from 'react';
import { Layers, Package, Shield, Users, GitBranch, Database, ArrowRight, Code2, BookOpen, Sparkles } from 'lucide-react';

export default function DDDPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
              <Layers className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Domain-Driven Design with AI
              </h1>
              <p className="text-gray-400 mt-2">
                Model complex business domains with AI assistance while maintaining clear boundaries and ubiquitous language
              </p>
            </div>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              DDD Core Concepts
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Bounded Contexts</h3>
                <p className="text-sm text-gray-400">
                  AI helps identify and maintain clear boundaries between different parts of your system, ensuring each context has its own consistent model.
                </p>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Ubiquitous Language</h3>
                <p className="text-sm text-gray-400">
                  Use AI to ensure consistent terminology across code, documentation, and team communication. AI enforces the domain vocabulary.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Aggregates</h3>
                <p className="text-sm text-gray-400">
                  AI assists in designing aggregate roots and ensuring consistency boundaries are properly enforced in your domain model.
                </p>
              </div>

              <div className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Domain Events</h3>
                <p className="text-sm text-gray-400">
                  Generate event-driven architectures with AI, capturing important business moments as domain events.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-indigo-400" />
              AI-Enhanced DDD Benefits
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Automatic Model Generation</h3>
                  <p className="text-sm text-gray-400">
                    AI generates domain models from business requirements, ensuring they align with DDD principles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Invariant Protection</h3>
                  <p className="text-sm text-gray-400">
                    AI helps identify and protect business invariants, generating validation logic automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <GitBranch className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Context Mapping</h3>
                  <p className="text-sm text-gray-400">
                    AI assists in creating context maps, identifying relationships and integration patterns between bounded contexts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Team Alignment</h3>
                  <p className="text-sm text-gray-400">
                    AI ensures all team members use consistent domain language in code and communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Example */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">DDD Implementation with AI</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3">1. Define Domain</h3>
              <p className="text-sm text-gray-400 mb-4">
                Describe your business domain to AI in natural language
              </p>
              <div className="bg-gray-950 rounded p-3">
                <code className="text-xs text-green-400">
                  "E-commerce platform with orders, inventory, and shipping"
                </code>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3">2. AI Generates Model</h3>
              <p className="text-sm text-gray-400 mb-4">
                AI creates bounded contexts and aggregates
              </p>
              <div className="bg-gray-950 rounded p-3">
                <code className="text-xs text-blue-400">
                  OrderContext, InventoryContext, ShippingContext
                </code>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3">3. Implement Logic</h3>
              <p className="text-sm text-gray-400 mb-4">
                AI implements business rules and invariants
              </p>
              <div className="bg-gray-950 rounded p-3">
                <code className="text-xs text-purple-400">
                  Order.place(), Inventory.reserve(), Ship.dispatch()
                </code>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">Example: AI-Generated Domain Model</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">TypeScript</span>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`// Bounded Context: Order Management
class Order {
  private items: OrderItem[] = [];
  private status: OrderStatus;

  // Aggregate Root with invariants
  constructor(
    private readonly id: OrderId,
    private customerId: CustomerId
  ) {
    this.status = OrderStatus.PENDING;
  }

  // Domain logic with business rules
  addItem(product: Product, quantity: number): void {
    // AI ensures invariant: Cannot add items to shipped orders
    if (this.status === OrderStatus.SHIPPED) {
      throw new DomainError("Cannot modify shipped orders");
    }

    // AI maintains ubiquitous language
    const orderItem = new OrderItem(product, quantity);
    this.items.push(orderItem);

    // Emit domain event
    this.addDomainEvent(new ItemAddedToOrder(this.id, orderItem));
  }

  // AI generates appropriate value objects
  calculateTotal(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.getSubtotal()),
      Money.zero()
    );
  }
}`}</code>
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Best Practices for AI-Assisted DDD</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Start with Event Storming</p>
                  <p className="text-sm text-gray-400">Use AI to facilitate event storming sessions and identify domain events</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Define Clear Boundaries</p>
                  <p className="text-sm text-gray-400">Let AI help identify and maintain bounded context boundaries</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Maintain Language Consistency</p>
                  <p className="text-sm text-gray-400">Use AI to enforce ubiquitous language across the codebase</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Focus on Business Logic</p>
                  <p className="text-sm text-gray-400">Let AI handle boilerplate while you focus on core domain logic</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Test Invariants</p>
                  <p className="text-sm text-gray-400">AI generates tests to ensure business invariants are protected</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Iterate with Domain Experts</p>
                  <p className="text-sm text-gray-400">Use AI to bridge technical and business communication</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Native DDD Approach */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-semibold text-white">AI-Native DDD: The New Paradigm</h2>
          </div>

          <p className="text-gray-300 mb-6">
            AI systems are no longer just tools—they're first-class participants in your domain model.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Ubiquitous Language Evolution</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Traditional:</p>
                    <p className="text-gray-400">Shared language between business and tech teams</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">AI-Enhanced:</p>
                    <p className="text-gray-400">Shared language that includes AI systems as participants with their own understanding</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded p-3">
                <p className="text-xs text-cyan-200">
                  Example: "Customer Lifecycle Stage" understood by business, developers, AND ML models
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Bounded Contexts with AI Integration</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-3">AI components must respect domain boundaries:</p>
                <div className="bg-gray-950 rounded p-3 mb-3">
                  <code className="text-xs text-cyan-400">
{`Domain: Product Recommendation
├── Entities: Customer, Product
├── AI Component: RecommendationEngine
└── Shared Language:
    • "Affinity Score" (business + AI)
    • "Context Vector" (AI embedding)
    • "Recommendation Confidence"`}
                  </code>
                </div>
                <p className="text-gray-400 text-xs">
                  Both humans and AI use same terminology and business rules within the bounded context
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools and Resources */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Tools for DDD</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Claude Code</h3>
              <p className="text-sm text-gray-400">
                Excellent for generating complete bounded contexts and maintaining consistency across large codebases.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Cursor with DDD Prompts</h3>
              <p className="text-sm text-gray-400">
                Use custom prompts to enforce DDD patterns and generate domain models from specifications.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">GitHub Copilot</h3>
              <p className="text-sm text-gray-400">
                Great for autocompleting domain logic and suggesting appropriate patterns based on context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}