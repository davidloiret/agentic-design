'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface ContextualStructuredMemoryDetailsProps {
  selectedTechnique: any;
}

export const ContextualStructuredMemoryDetails: React.FC<ContextualStructuredMemoryDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Schemas', detail: 'Create predefined memory structures & formats' },
      { num: '2', action: 'Build Graph', detail: 'Implement knowledge graph with typed relationships' },
      { num: '3', action: 'Enable Queries', detail: 'Support precise SQL-like structured queries' },
      { num: '4', action: 'Add Reasoning', detail: 'Implement symbolic logic & inference rules' },
      { num: '5', action: 'Share Structure', detail: 'Enable cross-agent structured knowledge access' }
    ],
    example: 'schema_design → knowledge_graph → structured_queries → symbolic_reasoning → cross_agent_sharing'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use standardized schemas (JSON Schema, RDF, OWL) for consistency', icon: '✅' },
    { type: 'do', text: 'Implement precise query capabilities with structured filters', icon: '✅' },
    { type: 'do', text: 'Enable symbolic reasoning with formal logic rules', icon: '✅' },
    { type: 'do', text: 'Maintain referential integrity across knowledge graphs', icon: '✅' },
    { type: 'do', text: 'Version control schemas and support backward compatibility', icon: '✅' },
    { type: 'dont', text: 'Over-structure flexible data that benefits from loose schemas', icon: '❌' },
    { type: 'dont', text: 'Create overly complex schemas that are hard to understand', icon: '❌' },
    { type: 'dont', text: 'Ignore schema evolution and migration strategies', icon: '❌' },
    { type: 'dont', text: 'Use structured memory for highly dynamic unstructured content', icon: '❌' },
    { type: 'dont', text: 'Forget to validate data integrity when updating structures', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Complex domain relationships need modeling',
      'Precise queries and reasoning required',
      'Formal logic and symbolic reasoning needed',
      'Data integrity and consistency critical',
      'Multi-agent knowledge sharing important'
    ],
    avoidWhen: [
      'Simple key-value storage needs',
      'Highly dynamic unstructured content',
      'Rapid prototyping with changing requirements',
      'Natural language processing tasks',
      'Real-time streaming data scenarios'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Schema Coverage', measure: '% domain concepts properly modeled' },
    { metric: 'Query Precision', measure: 'Accuracy of structured query results' },
    { metric: 'Reasoning Correctness', measure: '% valid logical inferences' },
    { metric: 'Data Integrity', measure: 'Referential consistency score' },
    { metric: 'Schema Utilization', measure: '% schema fields actively used' },
    { metric: 'Cross-Agent Consistency', measure: 'Shared structure alignment rate' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Financial Analysis: Company financials, ratios, regulations in structured schemas (SQL-like queries: "SELECT companies WHERE pe_ratio < 25 AND sector = \'technology\'")',
    'Legal Systems: Laws, cases, precedents with formal relationship modeling (complex legal reasoning and precedent matching)',
    'Scientific Databases: Research data with standardized ontologies and precise queries (materials science, drug discovery)',
    'Enterprise Resource Planning: Business entities, processes, relationships in formal schemas (inventory, supply chain optimization)',
    'Healthcare Records: Patient data, treatments, outcomes with medical ontologies (clinical decision support systems)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Structured Knowledge Representation in Large Language Models (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.16891' },
        { title: 'Symbolic Reasoning with Neural Networks: A Survey (Chen et al., 2023)', url: 'https://arxiv.org/abs/2309.15678' },
        { title: 'Knowledge Graphs and Structured Memory Systems (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2405.12443' },
        { title: 'Ontology-Driven AI: Formal Knowledge Representation (Liu et al., 2024)', url: 'https://arxiv.org/abs/2401.11234' }
      ]
    },
    {
      title: 'Knowledge Representation Theory',
      items: [
        { title: 'Knowledge Representation and Reasoning (Brachman & Levesque, 2004)', url: 'https://www.sciencedirect.com/book/9781558609327/knowledge-representation-and-reasoning' },
        { title: 'Semantic Web Technologies: RDF, RDFS, OWL (Hitzler et al., 2019)', url: 'https://www.semantic-web-book.org/' },
        { title: 'Description Logics: The Foundation of Semantic Web (Baader et al., 2003)', url: 'https://www.cambridge.org/core/books/description-logic-handbook/94E807C12197552F93A5F6C893E0A1D0' },
        { title: 'Formal Ontology in Information Systems (Guarino, 1998)', url: 'https://dl.acm.org/doi/10.5555/646969.708995' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Apache Jena: Semantic Web Framework and Triple Store', url: 'https://jena.apache.org/documentation/' },
        { title: 'Neo4j: Graph Database with Schema and Constraints', url: 'https://neo4j.com/docs/cypher-manual/current/schema/' },
        { title: 'RDFLib: Python Library for Working with RDF Graphs', url: 'https://rdflib.readthedocs.io/en/stable/' },
        { title: 'OWL API: Java API for Working with OWL Ontologies', url: 'https://github.com/owlcs/owlapi' }
      ]
    },
    {
      title: 'Standards & Specifications',
      items: [
        { title: 'JSON Schema: Vocabulary for Annotating JSON Documents', url: 'https://json-schema.org/specification.html' },
        { title: 'RDF 1.1: Resource Description Framework Specification', url: 'https://www.w3.org/TR/rdf11-concepts/' },
        { title: 'OWL 2: Web Ontology Language Document Overview', url: 'https://www.w3.org/TR/owl2-overview/' },
        { title: 'SPARQL 1.1: Query Language for RDF', url: 'https://www.w3.org/TR/sparql11-query/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Memory organized in predefined, interpretable formats supporting symbolic reasoning and precise queries"
        why="Precise querying, formal logic reasoning, data integrity, consistent structured knowledge access"
        keyInsight="Schemas + Knowledge Graphs + Structured Queries + Symbolic Logic → Precise reasoning & consistency"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default ContextualStructuredMemoryDetails;