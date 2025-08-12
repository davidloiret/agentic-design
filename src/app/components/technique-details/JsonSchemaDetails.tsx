'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const JsonSchemaDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            JSON Schema defines machine-validated constraints and annotations for JSON data using a standardized vocabulary
            (e.g., types, enums, ranges, formats, references). Schemas travel with data contracts, enabling validation,
            type/code generation, documentation, and interop across services, SDKs, and UI forms.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li>Choose dialect and declare it with <code className="text-gray-300">$schema</code> (commonly JSON Schema 2020-12).</li>
            <li>Model data: <code className="text-gray-300">type</code>, <code className="text-gray-300">properties</code>, <code className="text-gray-300">required</code>, constraints (<code className="text-gray-300">minimum</code>, <code className="text-gray-300">pattern</code>, <code className="text-gray-300">format</code>).</li>
            <li>Factor shared parts into <code className="text-gray-300">$defs</code>; reference with <code className="text-gray-300">$ref</code> (and optional <code className="text-gray-300">$id</code>/<code className="text-gray-300">$anchor</code>).</li>
            <li>Compose with <code className="text-gray-300">oneOf</code>/<code className="text-gray-300">anyOf</code>/<code className="text-gray-300">allOf</code>/<code className="text-gray-300">not</code> and conditional <code className="text-gray-300">if/then/else</code>.</li>
            <li>Validate instances in CI and at runtime using a standards-compliant validator.</li>
            <li>Generate types, docs, or forms; wire schema into API contracts and tool/function parameters.</li>
            <li>Version schemas; publish and deprecate safely; monitor validation failures and drift.</li>
          </ol>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded-full"></div>
          Best Practices
        </h2>
        <div className="grid gap-3">
          {[
            'Declare the dialect via $schema and stick to one (e.g., 2020-12) per system boundary.',
            'Keep schemas tight: use enums, const, min/max, patterns, and formats for strong guarantees.',
            'Use $defs for reuse; avoid duplication; prefer stable $id for reusable modules.',
            'Be explicit about additionalProperties/items (set to false when appropriate).',
            'Validate both inbound requests and outbound responses; gate CI on schema checks.',
            'Document examples and default values; keep examples valid against the schema.',
            'Align with OpenAPI 3.1 when exposing HTTP APIs; note 3.1 adopts JSON Schema 2020-12.',
            'Benchmark validators (e.g., Ajv options) and enable strict modes and format assertions.',
            'Version schemas semantically; include changelogs and migration notes.',
            'Centralize $ref resolution; bundle for environments without network access.'
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
              <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* When NOT to Use */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full"></div>
          When NOT to Use
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Deeply procedural or stateful validation that exceeds JSON Schema’s declarative model.</li>
            <li>Cross-record validations requiring external lookups or temporal state (use custom logic).</li>
            <li>Binary payloads or streams where JSON structure does not apply.</li>
            <li>Domains needing complex inference or computation rather than structural validation.</li>
          </ul>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Dialect mismatch (Draft-07 vs 2019-09 vs 2020-12) causing validator differences.</li>
            <li>Assuming OpenAPI 3.0 compatibility with JSON Schema (use 3.1 for alignment).</li>
            <li>Unbounded <code className="text-gray-300">additionalProperties</code> allowing unexpected fields.</li>
            <li>Misusing <code className="text-gray-300">oneOf</code> vs <code className="text-gray-300">anyOf</code>; missing <code className="text-gray-300">discriminator</code> patterns for unions.</li>
            <li>Relying on <code className="text-gray-300">format</code> without enabling format assertions in the validator.</li>
            <li>Broken or cyclic <code className="text-gray-300">$ref</code> and remote resolution issues.</li>
            <li>Conditional <code className="text-gray-300">if/then/else</code> that is too permissive; missing negative tests.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Types, enums, const, numeric and string constraints',
            '$ref, $id, $anchor, $defs for modularity and reuse',
            'Combinators: oneOf, anyOf, allOf, not',
            'Conditionals: if / then / else',
            'Array/object controls: prefixItems/items, unevaluatedItems/properties',
            'Dependent schemas and required relations',
            'Formats and content assertions (contentMediaType/Encoding)',
            'Vocabularies and annotations for tooling',
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Validation pass/fail rate; false-positive/false-negative rate on test suites.</li>
            <li>Schema drift incidents and rollback frequency.</li>
            <li>Type/codegen accuracy and compile-time error reduction.</li>
            <li>Production incident rate attributable to contract mismatches.</li>
            <li>Schema reuse coverage (% refs vs duplicates) and bundle size.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Prompt tokens: small when embedding parameter schemas; constrain outputs with enums/const to reduce tokens.</li>
            <li>Favor short, composable schemas; avoid verbose descriptions in hot paths.</li>
            <li>Cache shared schemas; inline critical $refs to avoid repeated transmission.</li>
            <li>Validator CPU cost depends on combinators and deep nesting; benchmark and cap depth.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Tool/function calling parameter contracts for LLMs.</li>
            <li>HTTP APIs (OpenAPI 3.1), events (CloudEvents), and message schemas.</li>
            <li>Configuration files and feature flags with safe defaults.</li>
            <li>Data pipelines and storage validation at ingestion boundaries.</li>
            <li>Form generation and UI input validation backed by a single source of truth.</li>
          </ul>
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Academic Papers</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>JSON Pointer (RFC 6901), JSON Patch (RFC 6902) for related standards</li>
              <li>Schema languages survey and validation theory (general background)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Understanding JSON Schema (official guide)</li>
              <li>OpenAPI 3.1 and JSON Schema 2020-12 alignment notes</li>
              <li>Schema versioning and $ref/$id best practices</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>JavaScript/TypeScript: Ajv, TypeBox, zod-to-json-schema</li>
              <li>Python: jsonschema, fastjsonschema, Pydantic v2 JSON Schema</li>
              <li>Java: everit-org/json-schema, networknt/json-schema-validator</li>
              <li>Go: gojsonschema, invopop/jsonschema</li>
              <li>Rust: schemars</li>
              <li>Codegen: quicktype</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>JSON Schema organization website and GitHub discussions</li>
              <li>Validator maintainers’ docs (Ajv, jsonschema)</li>
              <li>OpenAPI/AsyncAPI community posts on schema alignment</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};