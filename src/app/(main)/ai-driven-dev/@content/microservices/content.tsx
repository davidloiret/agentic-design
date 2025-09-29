"use client"

import React from 'react';
import { Workflow, Box, Database, GitBranch } from 'lucide-react';

export default function MicroservicesContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-xl">
            <Workflow className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Microservices Architecture with AI</h1>
            <p className="text-gray-400 mt-2">Designing and implementing distributed systems</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Architecture Overview</h2>
        <p className="text-gray-300 mb-6">
          Building a microservices-based e-commerce platform with AI assistance for service design, API contracts, and inter-service communication.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <Box className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-medium">8 Services</p>
            <p className="text-xs text-gray-400">Independent deployments</p>
          </div>
          <div className="text-center">
            <Database className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-white font-medium">Database per Service</p>
            <p className="text-xs text-gray-400">Data isolation</p>
          </div>
          <div className="text-center">
            <GitBranch className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-medium">Event-Driven</p>
            <p className="text-xs text-gray-400">Async communication</p>
          </div>
          <div className="text-center">
            <Workflow className="w-12 h-12 text-orange-400 mx-auto mb-2" />
            <p className="text-white font-medium">API Gateway</p>
            <p className="text-xs text-gray-400">Unified interface</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Service Breakdown</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-2">User Service</h3>
            <p className="text-sm text-gray-400 mb-3">Authentication, authorization, user profiles</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Tech Stack</p>
                <p className="text-sm text-gray-300">Node.js, Express, MongoDB</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Events Published</p>
                <p className="text-sm text-gray-300">UserCreated, UserUpdated</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-2">Product Service</h3>
            <p className="text-sm text-gray-400 mb-3">Product catalog, inventory management</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Tech Stack</p>
                <p className="text-sm text-gray-300">Python, FastAPI, PostgreSQL</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Events</p>
                <p className="text-sm text-gray-300">ProductCreated, StockUpdated</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-2">Order Service</h3>
            <p className="text-sm text-gray-400 mb-3">Order processing, order history, saga orchestration</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Tech Stack</p>
                <p className="text-sm text-gray-300">Go, PostgreSQL, Redis</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Pattern</p>
                <p className="text-sm text-gray-300">Saga, CQRS</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-2">Payment Service</h3>
            <p className="text-sm text-gray-400 mb-3">Payment processing, refunds, Stripe integration</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Tech Stack</p>
                <p className="text-sm text-gray-300">Node.js, PostgreSQL</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">External</p>
                <p className="text-sm text-gray-300">Stripe, PayPal APIs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">AI-Assisted Implementation</h2>
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">1. Service Definition with AI</h3>
            <p className="text-sm text-gray-400 mb-4">
              Using AI to define service boundaries following Domain-Driven Design principles.
            </p>
            <div className="bg-gray-950/50 rounded p-4 font-mono text-xs">
              <pre className="text-gray-300">{`ChatGPT Prompt: "Analyze this e-commerce domain.
Identify bounded contexts and suggest microservices.
For each service, define:
- Core responsibilities
- Data ownership
- Events published/consumed
- API contracts"`}</pre>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">2. API Gateway with AI</h3>
            <p className="text-sm text-gray-400 mb-4">
              Generating GraphQL schema and REST API Gateway with routing, rate limiting, authentication.
            </p>
            <div className="bg-gray-950/50 rounded p-4 font-mono text-xs">
              <pre className="text-gray-300">{`Cursor: "Create API Gateway with:
- GraphQL federation for all services
- JWT authentication middleware
- Rate limiting per endpoint
- Request/response logging
- Circuit breaker pattern"`}</pre>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">3. Event-Driven Communication</h3>
            <p className="text-sm text-gray-400 mb-4">
              Setting up message broker (RabbitMQ/Kafka) with AI-generated event schemas and handlers.
            </p>
            <div className="bg-gray-950/50 rounded p-4 font-mono text-xs">
              <pre className="text-gray-300">{`Claude: "Generate event schemas for:
- OrderPlaced → Payment, Inventory, Notification services
- PaymentProcessed → Order, Notification services
- OrderShipped → Notification service

Include: TypeScript types, validation, versioning"`}</pre>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">4. Service Mesh & Observability</h3>
            <p className="text-sm text-gray-400 mb-4">
              Infrastructure setup with Istio, distributed tracing (Jaeger), metrics (Prometheus), logging (ELK).
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Service-to-service encryption with mTLS</li>
              <li>• Distributed tracing across all services</li>
              <li>• Centralized logging with correlation IDs</li>
              <li>• Health checks and automatic recovery</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Learnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">AI Strengths</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Generating boilerplate service code</li>
              <li>• API contract definitions (OpenAPI, gRPC)</li>
              <li>• Event schema design and validation</li>
              <li>• Docker/K8s configuration files</li>
              <li>• Inter-service communication patterns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Human Expertise Needed</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Defining service boundaries (DDD)</li>
              <li>• Choosing consistency models (eventual vs strong)</li>
              <li>• Designing compensation logic (saga failures)</li>
              <li>• Performance tuning and optimization</li>
              <li>• Security and compliance decisions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
