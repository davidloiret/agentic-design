"use client"

import React from 'react';
import { Layers, GitBranch, Box, Shield } from 'lucide-react';

export default function DDDWithAIContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
            <Layers className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Domain-Driven Design with AI</h1>
            <p className="text-gray-400 mt-2">Building maintainable systems with AI assistance</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Why DDD + AI?</h2>
        <p className="text-gray-300 mb-6">
          AI excels at generating code but struggles with architecture. DDD provides the structure, AI fills in the implementation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Without DDD</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• AI creates tightly coupled code</li>
              <li>• Business logic mixed with infrastructure</li>
              <li>• Hard to maintain and test</li>
              <li>• Difficult to change requirements</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">With DDD</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Clear boundaries and responsibilities</li>
              <li>• Business logic isolated and testable</li>
              <li>• AI follows established patterns</li>
              <li>• Easy to refactor and extend</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Core DDD Concepts for AI</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <Box className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Entities</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Objects with unique identity that persist over time. AI prompt: "Create a User entity with email, name, and unique ID."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string
  ) {}

  changeEmail(newEmail: string) {
    // Business logic here
    this.email = newEmail;
  }
}`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Value Objects</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Immutable objects defined by their attributes. AI prompt: "Create an Email value object with validation."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`class Email {
  private constructor(public readonly value: string) {}

  static create(email: string): Email | Error {
    if (!email.includes('@')) {
      return new Error('Invalid email');
    }
    return new Email(email);
  }
}`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <GitBranch className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Aggregates</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Cluster of entities and value objects with a root entity. AI prompt: "Create an Order aggregate with OrderItems."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`class Order {
  private items: OrderItem[] = [];

  addItem(product: Product, quantity: number) {
    // Enforce business rules
    if (quantity <= 0) throw new Error('Invalid quantity');
    this.items.push(new OrderItem(product, quantity));
  }

  calculateTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      Money.zero()
    );
  }
}`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <Layers className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-semibold text-white">Repositories</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Abstract data access. AI prompt: "Create a UserRepository interface with findById and save methods."
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

// Implementation hidden from domain
class PostgresUserRepository implements UserRepository {
  // DB-specific code here
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Layered Architecture with AI</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Domain Layer (Core)</h3>
              <p className="text-sm text-gray-400 mb-3">Entities, value objects, aggregates. Pure business logic, no dependencies.</p>
              <p className="text-xs text-gray-500 italic">AI Prompt: "Create domain models following DDD patterns. No database or framework code."</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Application Layer</h3>
              <p className="text-sm text-gray-400 mb-3">Use cases, application services. Orchestrates domain objects.</p>
              <p className="text-xs text-gray-500 italic">AI Prompt: "Create a CreateOrderUseCase that validates input and calls domain methods."</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Infrastructure Layer</h3>
              <p className="text-sm text-gray-400 mb-3">Database, external APIs, file system. Implements repository interfaces.</p>
              <p className="text-xs text-gray-500 italic">AI Prompt: "Implement PostgresUserRepository using Prisma, following the UserRepository interface."</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-400 font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Presentation Layer</h3>
              <p className="text-sm text-gray-400 mb-3">API controllers, GraphQL resolvers, UI components.</p>
              <p className="text-xs text-gray-500 italic">AI Prompt: "Create REST endpoints that call application use cases. Handle errors gracefully."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Prompting Strategy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">❌ Bad Prompt</h3>
              <p className="text-sm text-gray-400 bg-gray-900/50 rounded p-3">
                "Build a user registration system with database"
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">✓ Good Prompt</h3>
              <p className="text-sm text-gray-400 bg-gray-900/50 rounded p-3">
                "Create a User entity with Email value object. Then build a RegisterUserUseCase that validates email uniqueness via UserRepository interface. Keep domain logic separate from database."
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Testing Strategy</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Domain Tests</p>
                <p className="text-xs text-gray-400">Pure unit tests, no mocks needed</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Use Case Tests</p>
                <p className="text-xs text-gray-400">Mock repositories, test logic</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">Integration Tests</p>
                <p className="text-xs text-gray-400">Test with real database</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium text-sm">E2E Tests</p>
                <p className="text-xs text-gray-400">Full stack with API calls</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Example: E-commerce Bounded Context</h2>
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">1. Define Ubiquitous Language</h3>
            <p className="text-sm text-gray-400 mb-2">Tell AI: "Use these terms consistently:"</p>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Order (not Cart, not Purchase)</li>
              <li>• Product (not Item, not Good)</li>
              <li>• Customer (not User in this context)</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">2. Create Aggregates</h3>
            <p className="text-sm text-gray-400">AI generates: Order (root), OrderItem, ShippingAddress</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">3. Implement Use Cases</h3>
            <p className="text-sm text-gray-400">PlaceOrder, CancelOrder, UpdateShipping</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">4. Add Infrastructure</h3>
            <p className="text-sm text-gray-400">PostgreSQL repositories, Stripe payment gateway</p>
          </div>
        </div>
      </div>
    </div>
  );
}
