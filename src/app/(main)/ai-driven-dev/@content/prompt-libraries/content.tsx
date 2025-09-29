"use client"

import React, { useState } from 'react';
import { Code2, Copy, Check, Search, Layers, TestTube, RefreshCw, Bug, Database, Rocket } from 'lucide-react';

export default function PromptLibrariesContent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const prompts = [
    {
      id: 'architecture-design',
      category: 'Architecture & Design',
      icon: Layers,
      color: 'blue',
      title: 'System Architecture Design',
      description: 'Design modular, maintainable architecture with clean boundaries',
      prompt: `Architectural Analysis:

1. Identify module boundaries
2. Design clean, framework-agnostic interfaces
3. Ensure single responsibility per module
4. Create "black box interfaces" with clean APIs
5. Design replaceable components
6. Minimize future editing complexity

Philosophy: "It's faster to write five lines of code today than to write one line today and then have to edit it in the future."

For [YOUR_SYSTEM_DESCRIPTION], create:
- Module boundary definitions
- Interface contracts
- Dependency flow diagram
- Component replacement strategy`
    },
    {
      id: 'tdd-implementation',
      category: 'Testing',
      icon: TestTube,
      color: 'green',
      title: 'TDD Implementation',
      description: 'Generate implementation from comprehensive test suite',
      prompt: `Write a [LANGUAGE] function that satisfies all the following unit tests in the most performant way possible but still easy to maintain long term:

[INCLUDE COMPLETE TEST SUITE]

Requirements:
- Handle all edge cases shown in tests
- Optimize for performance
- Include proper error handling
- Follow clean code principles
- Use appropriate data structures
- Add comprehensive comments
- Ensure type safety

Return:
1. Complete implementation
2. Explanation of algorithm choices
3. Time/space complexity analysis`
    },
    {
      id: 'edge-case-generation',
      category: 'Testing',
      icon: TestTube,
      color: 'green',
      title: 'Edge Case Generation',
      description: 'Generate comprehensive edge cases for testing',
      prompt: `Generate comprehensive edge cases for testing [FUNCTION/COMPONENT]:

Consider:
- Boundary values (min/max, zero, negative)
- Empty/null/undefined inputs
- Invalid data types
- Malformed data
- Race conditions and concurrency issues
- Network failures and timeouts
- Resource exhaustion scenarios
- Security concerns (injection attacks, XSS, etc.)
- Performance under load
- Internationalization edge cases

For each edge case, provide:
1. Test case description
2. Input data
3. Expected behavior
4. Why this edge case matters`
    },
    {
      id: 'root-cause-analysis',
      category: 'Debugging',
      icon: Bug,
      color: 'red',
      title: 'Root Cause Analysis',
      description: 'Systematic debugging using the 5 Whys method',
      prompt: `Conduct comprehensive root cause analysis for this issue:

Problem Definition: [STATE_THE_PROBLEM]
Symptoms: [DESCRIBE_SYMPTOMS]
Code Context: [RELEVANT_CODE]
Error Logs: [ERROR_MESSAGES]

Steps:
1. Define the Problem: [Clear, specific problem statement]
2. Gather Data and Evidence: [Relevant logs, stack traces, conditions]
3. Identify Possible Causal Factors: [List contributing factors]
4. Analyze for Root Cause: [Apply 5 Whys method]
   - Why did this fail?
   - Why did that condition occur?
   - Why wasn't it caught?
   - Why does the code allow this?
   - Why wasn't this tested?
5. Verify Root Cause: [How to confirm this is the real cause]
6. Develop Action Plan: [Immediate fix + preventive measures]
7. Monitor Results: [How to verify fix works]

Output detailed report for each section.`
    },
    {
      id: 'refactoring-optimization',
      category: 'Refactoring',
      icon: RefreshCw,
      color: 'purple',
      title: 'Performance Refactoring',
      description: 'Optimize code for performance while maintaining readability',
      prompt: `Refactor this [LANGUAGE] code for better performance:

[CODE_BLOCK]

Focus on:
- Algorithm efficiency and Big O complexity
- Memory usage optimization
- Caching strategies
- Database query optimization (N+1 queries, indexing)
- Concurrent/parallel processing opportunities
- Resource pooling and reuse
- Lazy loading where appropriate

Provide:
1. Refactored code
2. Performance comparison (before/after Big O)
3. Explanation of each optimization
4. Trade-offs and considerations
5. Benchmarking suggestions`
    },
    {
      id: 'api-design-fastapi',
      category: 'Implementation',
      icon: Code2,
      color: 'cyan',
      title: 'FastAPI Best Practices',
      description: 'Build scalable FastAPI endpoints following best practices',
      prompt: `You are an expert in Python, FastAPI, and scalable API development.

Key Principles:
- Write concise, technical responses with accurate Python examples
- Use functional, declarative programming; avoid classes where possible
- Prefer iteration and modularization over code duplication
- Use def for pure functions and async def for asynchronous operations
- Use type hints for all function signatures
- Prefer Pydantic models over raw dictionaries
- File structure: exported router, sub-routes, utilities, static content, types

For [API_ENDPOINT_DESCRIPTION], create:
- Pydantic request/response models
- Router with proper HTTP methods
- Dependency injection for shared logic
- Proper error handling with HTTPException
- Input validation
- API documentation with examples
- Rate limiting considerations`
    },
    {
      id: 'database-schema',
      category: 'Architecture & Design',
      icon: Database,
      color: 'blue',
      title: 'Database Schema Design',
      description: 'Design optimized database schemas',
      prompt: `Design a database schema for [DOMAIN] considering:

Requirements:
- Entity relationships and normalization (3NF minimum)
- Indexing strategy for common queries
- Data integrity constraints (foreign keys, unique, checks)
- Performance optimization
- Migration strategy (safe for zero-downtime)
- Audit trails and versioning
- Soft deletes vs hard deletes
- Partitioning strategy for large tables

Provide:
1. Entity-Relationship Diagram (Mermaid or text)
2. SQL DDL statements
3. Index definitions with rationale
4. Common queries and their optimization
5. Migration plan
6. Scaling considerations`
    },
    {
      id: 'code-review',
      category: 'Refactoring',
      icon: Code2,
      color: 'purple',
      title: 'Comprehensive Code Review',
      description: 'Get detailed code review covering all aspects',
      prompt: `Perform comprehensive code review on this [LANGUAGE] code:

[CODE_BLOCK]

Evaluate:
1. **Code Efficiency & Performance**
   - Algorithm complexity
   - Memory usage
   - Potential bottlenecks

2. **Readability & Maintainability**
   - Clear variable/function names
   - Proper abstraction levels
   - Code organization

3. **Security**
   - Input validation
   - SQL injection risks
   - XSS vulnerabilities
   - Authentication/authorization issues

4. **Best Practices**
   - SOLID principles adherence
   - Design patterns usage
   - Framework conventions

5. **Error Handling**
   - Edge case coverage
   - Proper exception handling
   - Informative error messages

6. **Testing**
   - Test coverage adequacy
   - Missing test cases

For each issue, provide:
- Severity (Critical/High/Medium/Low)
- Specific code location
- Explanation of the problem
- Concrete fix with code example`
    },
    {
      id: 'legacy-migration',
      category: 'Refactoring',
      icon: Rocket,
      color: 'purple',
      title: 'Legacy Code Migration',
      description: 'Strategy for modernizing legacy codebases',
      prompt: `I'm refactoring a legacy codebase with these issues:
[LEGACY_ISSUES]

Current tech stack: [OLD_STACK]
Target tech stack: [NEW_STACK]

Provide strategy to:
1. **Assess Current State**
   - Technical debt inventory
   - Dependency analysis
   - Risk assessment

2. **Migration Approach**
   - Strangler fig pattern
   - Big bang vs incremental
   - Feature flags strategy

3. **Maintain Backward Compatibility**
   - API versioning
   - Adapter patterns
   - Gradual cutover plan

4. **Testing Strategy**
   - Characterization tests
   - Regression test suite
   - A/B testing approach

5. **Risk Mitigation**
   - Rollback procedures
   - Monitoring and alerts
   - Gradual traffic shifting

6. **Timeline & Phases**
   - Milestone breakdown
   - Dependencies and blockers
   - Resource requirements

Provide detailed, step-by-step migration plan.`
    },
    {
      id: 'domain-modeling',
      category: 'Architecture & Design',
      icon: Layers,
      color: 'blue',
      title: 'DDD Domain Modeling',
      description: 'Design domain models following DDD principles',
      prompt: `Design a domain model for [DOMAIN] using Domain-Driven Design:

Consider:
1. **Core Entities**
   - Identity and lifecycle
   - Business rules and invariants
   - Entity relationships

2. **Value Objects**
   - Immutable types
   - Self-validation
   - Equality by value

3. **Bounded Contexts**
   - Context boundaries
   - Ubiquitous language per context
   - Context mapping

4. **Aggregates**
   - Aggregate roots
   - Consistency boundaries
   - Transaction boundaries

5. **Domain Events**
   - Business-significant events
   - Event naming conventions
   - Event handlers

6. **Domain Services**
   - Stateless operations
   - Multi-aggregate coordination

Provide:
- Context map diagram
- Aggregate definitions with code
- Domain event catalog
- Ubiquitous language glossary`
    },
    {
      id: 'debugging-walkthrough',
      category: 'Debugging',
      icon: Bug,
      color: 'red',
      title: 'Step-by-Step Debugging',
      description: 'Systematic debugging with detailed analysis',
      prompt: `Debug this [LANGUAGE] code that [PROBLEM_DESCRIPTION]:

Expected Behavior: [SPECIFIC_EXPECTED_BEHAVIOR]
Actual Behavior: [SPECIFIC_ACTUAL_BEHAVIOR]
Error Message: [EXACT_ERROR_MESSAGE]

Code:
[CODE_BLOCK]

Logs:
[ERROR_LOGS]

Walk through the code:
1. **Line-by-line analysis**
   - What each line does
   - Variable state at each step
   - Where logic might fail

2. **Root cause identification**
   - Exact point of failure
   - Why it fails
   - Conditions that trigger it

3. **Fix recommendation**
   - Complete fixed code
   - Explanation of changes
   - Why this fixes the root cause

4. **Prevention**
   - Unit tests to catch this bug
   - Logging improvements
   - Assertions or validation to add

5. **Related issues**
   - Similar bugs that might exist
   - Refactoring opportunities`
    },
    {
      id: 'hexagonal-architecture',
      category: 'Architecture & Design',
      icon: Layers,
      color: 'blue',
      title: 'Hexagonal Architecture',
      description: 'Design ports and adapters for clean architecture',
      prompt: `Design hexagonal architecture for [SYSTEM]:

Structure:
1. **Domain Core (Ports)**
   - Business logic interfaces
   - Domain models
   - No external dependencies

2. **Application Services**
   - Use case orchestration
   - Transaction management
   - Port definitions

3. **Adapters**
   - Input adapters (REST, GraphQL, CLI)
   - Output adapters (Database, API clients, Message queues)
   - Adapter implementations

For each port, provide:
- Interface definition
- Multiple adapter implementations
- Dependency injection setup
- Testing strategy (mock adapters)

Benefits to highlight:
- Testability
- Framework independence
- Technology flexibility
- Domain focus

Provide complete code example with:
- Port interfaces
- Adapter implementations
- Wiring/dependency injection
- Test examples`
    }
  ];

  const categories = Array.from(new Set(prompts.map(p => p.category)));

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
    purple: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    red: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400',
    cyan: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400',
  };

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Code2 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Prompt Libraries
            </h1>
            <p className="text-gray-400 mt-2">
              Real prompt snippets used by professional developers - copy, customize, and use
            </p>
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-cyan-200">
            <strong>Pro tip:</strong> These are actual prompts from production workflows, not theoretical examples.
            Replace [PLACEHOLDERS] with your specific context for best results.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">{prompts.length}</div>
          <div className="text-sm text-gray-400">Total Prompts</div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">{categories.length}</div>
          <div className="text-sm text-gray-400">Categories</div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">100%</div>
          <div className="text-sm text-gray-400">Production-Tested</div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">Free</div>
          <div className="text-sm text-gray-400">Open Source</div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryPrompts = filteredPrompts.filter(p => p.category === category);
          if (categoryPrompts.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-white mb-6">{category}</h2>
              <div className="grid grid-cols-1 gap-6">
                {categoryPrompts.map(prompt => {
                  const Icon = prompt.icon;
                  return (
                    <div
                      key={prompt.id}
                      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all"
                    >
                      {/* Header */}
                      <div className="p-6 border-b border-gray-700/50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 bg-gradient-to-br ${colorClasses[prompt.color as keyof typeof colorClasses]} rounded-lg`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white mb-2">{prompt.title}</h3>
                              <p className="text-sm text-gray-400">{prompt.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-sm text-gray-300"
                          >
                            {copiedId === prompt.id ? (
                              <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Prompt Content */}
                      <div className="p-6">
                        <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                            {prompt.prompt}
                          </pre>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder Guide */}
      <div className="mt-12 bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Common Placeholders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { placeholder: '[LANGUAGE]', example: 'Python, JavaScript, TypeScript, Rust' },
            { placeholder: '[FRAMEWORK]', example: 'React, Django, FastAPI, Next.js' },
            { placeholder: '[CODE_BLOCK]', example: 'Your actual code to analyze' },
            { placeholder: '[DOMAIN]', example: 'e-commerce, finance, healthcare' },
            { placeholder: '[COMPONENT]', example: 'PaymentProcessor, UserService' },
            { placeholder: '[ERROR_TYPE]', example: 'TypeError, RuntimeError, 500 error' },
          ].map(({ placeholder, example }) => (
            <div key={placeholder} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <code className="text-sm text-cyan-400 font-mono">{placeholder}</code>
              <p className="text-xs text-gray-400 mt-2">{example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}