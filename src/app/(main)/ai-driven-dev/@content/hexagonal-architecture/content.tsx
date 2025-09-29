"use client"

import React from 'react';
import { Hexagon, ArrowRightLeft, Box, Database } from 'lucide-react';

export default function HexagonalArchitectureContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
            <Hexagon className="w-8 h-8 text-teal-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Hexagonal Architecture with AI</h1>
            <p className="text-gray-400 mt-2">Ports & Adapters for flexible, testable systems</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Core Concept</h2>
        <p className="text-gray-300 mb-6">
          Your business logic (the hexagon) is isolated from external concerns. Everything outside connects through well-defined ports and adapters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Box className="w-6 h-6 text-teal-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Core (Hexagon)</p>
              <p className="text-sm text-gray-400">Pure business logic, no dependencies</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRightLeft className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Ports</p>
              <p className="text-sm text-gray-400">Interfaces defining contracts</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Adapters</p>
              <p className="text-sm text-gray-400">Concrete implementations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Structure Breakdown</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-teal-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <Hexagon className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-semibold text-white">Application Core</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Business logic, use cases, domain entities. Zero external dependencies.
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`// src/core/domain/Order.ts
export class Order {
  constructor(
    public readonly id: string,
    public readonly items: OrderItem[],
    public status: OrderStatus
  ) {}

  calculateTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.price),
      Money.zero()
    );
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    this.status = OrderStatus.CONFIRMED;
  }
}`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-cyan-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <ArrowRightLeft className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Ports (Interfaces)</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Define how external systems interact with core. Two types: incoming (primary) and outgoing (secondary).
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`// src/core/ports/OrderRepository.ts (outgoing port)
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

// src/core/ports/OrderService.ts (incoming port)
export interface OrderService {
  createOrder(items: OrderItem[]): Promise<Order>;
  confirmOrder(orderId: string): Promise<void>;
}`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start gap-3 mb-3">
              <Database className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Adapters (Implementations)</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Concrete implementations of ports. Database, HTTP, file system, etc.
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-300">{`// src/adapters/out/PostgresOrderRepository.ts
export class PostgresOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Order | null> {
    const row = await this.prisma.order.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async save(order: Order): Promise<void> {
    await this.prisma.order.upsert({
      where: { id: order.id },
      create: this.toDb(order),
      update: this.toDb(order)
    });
  }
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI Prompting Strategy</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-teal-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Start with Core Domain</h3>
              <p className="text-sm text-gray-400 mb-3">
                Prompt: "Create an Order entity with items, status, and calculateTotal method. No database or framework code."
              </p>
              <p className="text-xs text-gray-500 italic">AI generates pure TypeScript classes with no external deps</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Define Ports</h3>
              <p className="text-sm text-gray-400 mb-3">
                Prompt: "Create OrderRepository interface with findById, save, and findByCustomerId methods."
              </p>
              <p className="text-xs text-gray-500 italic">AI generates TypeScript interfaces, no implementations yet</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Implement Use Cases</h3>
              <p className="text-sm text-gray-400 mb-3">
                Prompt: "Create CreateOrderUseCase that depends on OrderRepository interface and validates input."
              </p>
              <p className="text-xs text-gray-500 italic">AI injects dependencies through constructor</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Build Adapters</h3>
              <p className="text-sm text-gray-400 mb-3">
                Prompt: "Implement PostgresOrderRepository using Prisma. Map between DB rows and Order domain objects."
              </p>
              <p className="text-xs text-gray-500 italic">AI creates adapter that implements the port</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">5</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Wire Everything Up</h3>
              <p className="text-sm text-gray-400 mb-3">
                Prompt: "Create dependency injection container that wires OrderRepository to CreateOrderUseCase."
              </p>
              <p className="text-xs text-gray-500 italic">AI creates composition root</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Benefits</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Testability</p>
                <p className="text-sm text-gray-400">Mock adapters, test core in isolation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Flexibility</p>
                <p className="text-sm text-gray-400">Swap databases without touching core</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Independence</p>
                <p className="text-sm text-gray-400">Core has zero framework dependencies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Clarity</p>
                <p className="text-sm text-gray-400">Clear separation of concerns</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Testing Strategy</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-white font-medium text-sm mb-1">Core Domain Tests</p>
              <p className="text-xs text-gray-400">No mocks, pure unit tests</p>
            </div>
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-white font-medium text-sm mb-1">Use Case Tests</p>
              <p className="text-xs text-gray-400">Mock adapters via interfaces</p>
            </div>
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-white font-medium text-sm mb-1">Adapter Tests</p>
              <p className="text-xs text-gray-400">Integration tests with real DB</p>
            </div>
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-white font-medium text-sm mb-1">E2E Tests</p>
              <p className="text-xs text-gray-400">Full stack through HTTP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Folder Structure</h2>
        <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-300">{`src/
├── core/
│   ├── domain/
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   └── Money.ts
│   ├── ports/
│   │   ├── OrderRepository.ts (interface)
│   │   ├── PaymentGateway.ts (interface)
│   │   └── OrderService.ts (interface)
│   └── use-cases/
│       ├── CreateOrder.ts
│       └── ConfirmOrder.ts
├── adapters/
│   ├── in/
│   │   ├── http/
│   │   │   └── OrderController.ts
│   │   └── graphql/
│   │       └── OrderResolver.ts
│   └── out/
│       ├── persistence/
│       │   └── PostgresOrderRepository.ts
│       └── payment/
│           └── StripePaymentGateway.ts
└── config/
    └── dependencies.ts (DI container)`}</pre>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Example: Payment Processing</h2>
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Core: Define Port</h3>
            <div className="font-mono text-xs text-gray-300">
              <pre>{`interface PaymentGateway {
  charge(amount: Money, token: string): Promise<PaymentResult>;
}`}</pre>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Use Case: Use Port</h3>
            <div className="font-mono text-xs text-gray-300">
              <pre>{`class ProcessPaymentUseCase {
  constructor(private paymentGateway: PaymentGateway) {}
  
  async execute(amount: Money, token: string) {
    return await this.paymentGateway.charge(amount, token);
  }
}`}</pre>
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Adapters: Multiple Implementations</h3>
            <div className="font-mono text-xs text-gray-300 space-y-2">
              <pre>{`class StripeAdapter implements PaymentGateway { ... }
class MockAdapter implements PaymentGateway { ... } // for testing
class PayPalAdapter implements PaymentGateway { ... } // swap anytime`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
