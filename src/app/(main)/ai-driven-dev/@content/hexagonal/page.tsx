"use client"

import React from 'react';
import { Hexagon, Layers, ArrowRightLeft, Shield, Database, Terminal, Globe, Package, Code2 } from 'lucide-react';
import { UnderConstructionOverlay } from '../../../../components/UnderConstructionOverlay';

export default function HexagonalArchitecturePage() {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      <UnderConstructionOverlay />
      <div className="px-8 py-12 filter blur-sm pointer-events-none">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
              <Hexagon className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Hexagonal Architecture with AI
              </h1>
              <p className="text-gray-400 mt-2">
                Build adaptable systems with clear boundaries - AI generates adapters while you focus on core business logic
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" />
            Architecture Overview
          </h2>

          {/* Hexagonal Diagram */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Core Domain (Center) */}
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">Domain Core</p>
                  <p className="text-xs text-gray-400 mt-1">Business Logic</p>
                </div>
              </div>

              {/* Ports (Around Core) */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2">
                  <p className="text-xs text-cyan-400">Input Ports</p>
                </div>
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2">
                  <p className="text-xs text-cyan-400">Output Ports</p>
                </div>
              </div>

              {/* Adapters (Outer Layer) */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <Globe className="w-5 h-5 text-green-400 mb-1" />
                  <p className="text-xs text-gray-300">REST API</p>
                </div>
              </div>
              <div className="absolute -right-20 top-1/2 -translate-y-1/2">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <Database className="w-5 h-5 text-purple-400 mb-1" />
                  <p className="text-xs text-gray-300">Database</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                Domain Core
              </h3>
              <p className="text-sm text-gray-400">
                Pure business logic with no external dependencies. This is where you focus your effort while AI handles the adapters.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                Ports (Interfaces)
              </h3>
              <p className="text-sm text-gray-400">
                Define contracts for external communication. AI ensures all ports follow consistent patterns and naming.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-green-400" />
                Adapters
              </h3>
              <p className="text-sm text-gray-400">
                AI generates adapters for databases, APIs, and external services, implementing the port interfaces perfectly.
              </p>
            </div>
          </div>
        </div>

        {/* AI Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-cyan-400" />
              AI-Powered Benefits
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Automatic Adapter Generation</h3>
                <p className="text-sm text-gray-400">
                  AI creates all adapters from port definitions - REST controllers, database repositories, message queues, etc.
                </p>
              </div>

              <div className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Dependency Inversion</h3>
                <p className="text-sm text-gray-400">
                  AI ensures proper dependency direction - adapters depend on core, never the other way around.
                </p>
              </div>

              <div className="border-l-2 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Testing Infrastructure</h3>
                <p className="text-sm text-gray-400">
                  AI generates test doubles, mocks, and in-memory adapters for comprehensive testing.
                </p>
              </div>

              <div className="border-l-2 border-purple-500 pl-4">
                <h3 className="text-lg font-medium text-white mb-1">Framework Agnostic</h3>
                <p className="text-sm text-gray-400">
                  Switch frameworks easily - AI regenerates adapters for new frameworks while core remains unchanged.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Implementation Process</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Define Core Domain</h3>
                  <p className="text-sm text-gray-400">
                    Write pure business logic without any external dependencies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Create Port Interfaces</h3>
                  <p className="text-sm text-gray-400">
                    Define contracts for all external interactions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">AI Generates Adapters</h3>
                  <p className="text-sm text-gray-400">
                    Let AI implement all adapters based on port specifications
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Wire Dependencies</h3>
                  <p className="text-sm text-gray-400">
                    AI configures dependency injection and wiring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Example Implementation</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Port Definition */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">Port Interface (You Write)</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">TypeScript</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Domain Port - defines the contract
interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | null>;
}

// Core Domain Entity
class User {
  constructor(
    private id: UserId,
    private email: Email,
    private name: string
  ) {}

  // Business logic here
  changeEmail(newEmail: Email): void {
    // Domain rules
    if (!newEmail.isValid()) {
      throw new InvalidEmailError();
    }
    this.email = newEmail;
  }
}`}</code>
              </pre>
            </div>

            {/* AI-Generated Adapter */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">Adapter (AI Generates)</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">AI Generated</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// PostgreSQL Adapter - AI generated
class PostgresUserRepository implements UserRepository {
  constructor(private db: PgClient) {}

  async findById(id: UserId): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id.value]
    );

    if (result.rows.length === 0) return null;

    return this.mapToDomain(result.rows[0]);
  }

  async save(user: User): Promise<void> {
    const data = this.mapToDb(user);
    await this.db.query(
      'INSERT INTO users (id, email, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET
         email = $2, name = $3',
      [data.id, data.email, data.name]
    );
  }

  // AI handles all mapping logic
  private mapToDomain(row: any): User {
    return new User(
      new UserId(row.id),
      new Email(row.email),
      row.name
    );
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Terminal className="w-4 h-4 text-blue-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Start with Use Cases</p>
                  <p className="text-sm text-gray-400">Define application services that orchestrate domain logic</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Keep Core Pure</p>
                  <p className="text-sm text-gray-400">No framework dependencies in domain core</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Database className="w-4 h-4 text-blue-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Test Through Ports</p>
                  <p className="text-sm text-gray-400">Use in-memory adapters for fast testing</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">One Adapter Per Technology</p>
                  <p className="text-sm text-gray-400">Separate adapters for Postgres, MongoDB, Redis, etc.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRightLeft className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Use Dependency Injection</p>
                  <p className="text-sm text-gray-400">Let AI configure DI containers and wiring</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">Version Your Ports</p>
                  <p className="text-sm text-gray-400">Maintain backwards compatibility with versioned interfaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">AI Tools for Hexagonal Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Claude Code</h3>
              <p className="text-sm text-gray-400">
                Excels at generating complete adapter implementations from port definitions. Maintains consistency across all adapters.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Windsurf Cascade</h3>
              <p className="text-sm text-gray-400">
                Great for refactoring existing code into hexagonal architecture. Can transform monoliths incrementally.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Cursor Agent Mode</h3>
              <p className="text-sm text-gray-400">
                Automatically generates test adapters and mocks. Perfect for test-driven development with ports and adapters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}