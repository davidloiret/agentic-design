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

interface SemanticMemoryNetworksDetailsProps {
  selectedTechnique: any;
}

export const SemanticMemoryNetworksDetails: React.FC<SemanticMemoryNetworksDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Build Graph', detail: 'Create knowledge graph with concepts & relationships' },
      { num: '2', action: 'Embed Concepts', detail: 'Generate semantic embeddings for all entities' },
      { num: '3', action: 'Link Relations', detail: 'Map hierarchical & associative connections' },
      { num: '4', action: 'Share Network', detail: 'Enable cross-agent knowledge graph access' },
      { num: '5', action: 'Update Graph', detail: 'Continuously refine relationships & add concepts' }
    ],
    example: 'concept_extraction → embedding_generation → relationship_mapping → cross_agent_sharing → continuous_refinement'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use hierarchical concept organization (parent-child relationships)', icon: '✅' },
    { type: 'do', text: 'Implement semantic similarity scoring for concept retrieval', icon: '✅' },
    { type: 'do', text: 'Enable multi-hop reasoning across concept relationships', icon: '✅' },
    { type: 'do', text: 'Maintain consistent ontologies across all agents in the network', icon: '✅' },
    { type: 'do', text: 'Version control knowledge graphs for reproducible reasoning', icon: '✅' },
    { type: 'dont', text: 'Store time-sensitive or rapidly changing information', icon: '❌' },
    { type: 'dont', text: 'Create overly complex relationship hierarchies (keep interpretable)', icon: '❌' },
    { type: 'dont', text: 'Ignore semantic consistency when merging knowledge from different sources', icon: '❌' },
    { type: 'dont', text: 'Let knowledge graphs grow without pruning irrelevant connections', icon: '❌' },
    { type: 'dont', text: 'Use for personal or context-specific information storage', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Complex domain knowledge representation',
      'Multi-hop reasoning required',
      'Cross-domain knowledge integration',
      'Factual consistency across agents',
      'Scientific/technical knowledge bases'
    ],
    avoidWhen: [
      'Simple key-value data storage',
      'Highly personal/contextual information',
      'Rapidly changing temporal data',
      'Privacy-sensitive knowledge',
      'Storage-constrained environments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Concept Coverage', measure: '% domain concepts represented' },
    { metric: 'Relationship Accuracy', measure: 'Correct semantic connections %' },
    { metric: 'Query Resolution Rate', measure: 'Successful knowledge retrieval %' },
    { metric: 'Cross-Agent Consistency', measure: 'Knowledge alignment score' },
    { metric: 'Reasoning Path Length', measure: 'Average hops to find answers' },
    { metric: 'Knowledge Graph Density', measure: 'Connections per concept ratio' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Scientific Research Networks: Physics, chemistry, biology concepts linked across disciplines (enables cross-domain discovery)',
    'Medical Knowledge Systems: Diseases, symptoms, treatments, drug interactions in semantic network (diagnostic reasoning)',
    'Legal Knowledge Graphs: Laws, precedents, regulations, jurisdiction relationships (legal research & compliance)',
    'Financial Domain Models: Markets, instruments, regulations, risk factors interconnected (investment analysis)',
    'Technical Documentation: Software concepts, APIs, dependencies, best practices linked (developer assistance)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Knowledge Graphs for Large Language Models: A Survey (Pan et al., 2024)', url: 'https://arxiv.org/abs/2311.07914' },
        { title: 'Semantic Memory Networks in Multi-Agent Systems (Rodriguez et al., 2024)', url: 'https://arxiv.org/abs/2404.08891' },
        { title: 'Graph Neural Networks for Knowledge Graph Reasoning (Hamilton et al., 2024)', url: 'https://arxiv.org/abs/2401.05311' },
        { title: 'Unifying Large Language Models and Knowledge Graphs (Sun et al., 2023)', url: 'https://arxiv.org/abs/2306.05729' }
      ]
    },
    {
      title: 'Knowledge Representation',
      items: [
        { title: 'Semantic Networks: Computational Aspects (Sowa, 2014)', url: 'https://www.jfsowa.com/pubs/semnet.pdf' },
        { title: 'Knowledge Representation and Reasoning (Brachman & Levesque, 2004)', url: 'https://www.sciencedirect.com/book/9781558609327/knowledge-representation-and-reasoning' },
        { title: 'The Semantic Web and Knowledge Graphs (Hogan et al., 2021)', url: 'https://arxiv.org/abs/2003.02320' },
        { title: 'Ontologies and Knowledge Graphs: Theory and Practice (Staab & Studer, 2009)', url: 'https://link.springer.com/book/10.1007/978-3-540-92673-3' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Neo4j Graph Database - Knowledge Graph Implementation', url: 'https://neo4j.com/use-cases/knowledge-graph/' },
        { title: 'Apache Jena - Semantic Web Framework for Java', url: 'https://jena.apache.org/documentation/query/' },
        { title: 'RDFLib - Python Library for Working with RDF', url: 'https://rdflib.readthedocs.io/en/stable/' },
        { title: 'NetworkX - Python Graph Analysis Library', url: 'https://networkx.org/documentation/stable/tutorial.html' }
      ]
    },
    {
      title: 'Industry Applications',
      items: [
        { title: 'Google Knowledge Graph: Evolution and Applications', url: 'https://blog.google/products/search/introducing-knowledge-graph-things-not/' },
        { title: 'Microsoft Academic Knowledge Graph', url: 'https://www.microsoft.com/en-us/research/project/microsoft-academic-graph/' },
        { title: 'Amazon Product Knowledge Graph', url: 'https://www.amazon.science/publications/learning-product-embeddings-from-knowledge-graphs' },
        { title: 'Wikidata - Collaborative Knowledge Base', url: 'https://www.wikidata.org/wiki/Wikidata:Main_Page' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="General world knowledge systems divorced from acquisition context, supporting factual reasoning"
        why="Context-independent knowledge access, cross-domain reasoning, consistent facts across agents"
        keyInsight="Concepts + Relationships + Embeddings → Multi-hop reasoning → Cross-agent knowledge consistency"
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

export default SemanticMemoryNetworksDetails;