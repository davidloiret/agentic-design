import { Technique } from './types';

export const knowledgeRepresentationTechniques: Technique[] = [
  {
    id: 'rdf-knowledge-modeling',
    name: 'RDF Knowledge Modeling', 
    abbr: 'RDF',
    icon: '🕸️',
    color: 'from-emerald-500 to-teal-600',
    category: 'knowledge-representation',
    description: 'Structured knowledge representation using Resource Description Framework for semantic data modeling and linking',
    features: [
      'Triple-based data modeling',
      'URI-based resource identification', 
      'Semantic relationships definition',
      'Linked data compatibility',
      'Machine-readable knowledge graphs',
      'Standards-based interoperability'
    ],
    useCases: ['knowledge-graphs', 'semantic-web', 'data-integration', 'scientific-data', 'enterprise-knowledge'],
    complexity: 'medium',
    example: 'Scientific Publication Modeling:\n\nRDF Triples:\n\n```turtle\n@prefix ex: <http://example.org/> .\n@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n@prefix dc: <http://purl.org/dc/terms/> .\n\nex:paper123 a ex:ResearchPaper ;\n    dc:title "Machine Learning in Healthcare" ;\n    dc:creator ex:johnsmith ;\n    dc:subject ex:MachineLearning, ex:Healthcare ;\n    dc:published "2024-01-15"^^xsd:date ;\n    ex:citedBy ex:paper456, ex:paper789 .\n\nex:johnsmith a foaf:Person ;\n    foaf:name "John Smith" ;\n    foaf:affiliation ex:StanfordUniv ;\n    ex:expertise ex:MachineLearning .\n```\n\nKnowledge Graph Structure:\n• Papers linked to authors, institutions, topics\n• Semantic relationships between concepts\n• Machine-queryable research network\n• Cross-reference discovery capabilities\n• Standards-compliant data exchange\n\nResult: Rich, interconnected knowledge representation enabling semantic search, relationship discovery, and automated reasoning'
  },
  {
    id: 'shacl-validation',
    name: 'SHACL Constraint Validation',
    abbr: 'SHACL',
    icon: '✅',
    color: 'from-blue-500 to-cyan-600',
    category: 'knowledge-representation',
    description: 'Shapes Constraint Language for validating RDF data against defined schemas and business rules',
    features: [
      'Shape-based data validation',
      'Constraint definition and checking',
      'Property path validation',
      'Cardinality constraints',
      'Value type validation',
      'Custom validation rules'
    ],
    useCases: ['data-quality-assurance', 'schema-validation', 'compliance-checking', 'data-governance', 'api-validation'],
    complexity: 'high',
    example: 'Healthcare Data Validation:\n\nSHACL Shape Definition:\n\n```turtle\n@prefix sh: <http://www.w3.org/ns/shacl#> .\n@prefix ex: <http://example.org/> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\nex:PatientShape a sh:NodeShape ;\n    sh:targetClass ex:Patient ;\n    sh:property [\n        sh:path ex:patientId ;\n        sh:datatype xsd:string ;\n        sh:minCount 1 ;\n        sh:maxCount 1 ;\n        sh:pattern "^P[0-9]{6}$" ;\n    ] ;\n    sh:property [\n        sh:path ex:birthDate ;\n        sh:datatype xsd:date ;\n        sh:minCount 1 ;\n        sh:maxCount 1 ;\n        sh:lessThan ex:admissionDate ;\n    ] ;\n    sh:property [\n        sh:path ex:medicalRecord ;\n        sh:node ex:MedicalRecordShape ;\n        sh:minCount 1 ;\n    ] .\n```\n\nValidation Process:\n1. Define patient data constraints\n2. Validate incoming patient records\n3. Check ID format compliance\n4. Verify date relationships\n5. Ensure required fields present\n6. Generate detailed validation reports\n\nResult: Automated data quality assurance with detailed error reporting and compliance verification'
  },
  {
    id: 'owl-reasoning',
    name: 'OWL Ontological Reasoning',
    abbr: 'OWL',
    icon: '🦉',
    color: 'from-purple-500 to-indigo-600',
    category: 'knowledge-representation',
    description: 'Web Ontology Language for defining complex semantic relationships and enabling automated logical reasoning',
    features: [
      'Formal ontology definition',
      'Class hierarchy modeling',
      'Property restrictions',
      'Logical inference rules',
      'Consistency checking',
      'Automated classification'
    ],
    useCases: ['expert-systems', 'automated-reasoning', 'knowledge-inference', 'semantic-search', 'decision-support'],
    complexity: 'high',
    example: 'Medical Diagnosis Ontology:\n\nOWL Class Definitions:\n\n```turtle\n@prefix owl: <http://www.w3.org/2002/07/owl#> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix med: <http://example.org/medical#> .\n\nmed:Disease a owl:Class .\nmed:Symptom a owl:Class .\nmed:Treatment a owl:Class .\n\nmed:hasSymptom a owl:ObjectProperty ;\n    rdfs:domain med:Disease ;\n    rdfs:range med:Symptom .\n\nmed:treatedBy a owl:ObjectProperty ;\n    rdfs:domain med:Disease ;\n    rdfs:range med:Treatment .\n\n# Define specific diseases\nmed:Diabetes a owl:Class ;\n    rdfs:subClassOf med:Disease ;\n    rdfs:subClassOf [\n        a owl:Restriction ;\n        owl:onProperty med:hasSymptom ;\n        owl:someValuesFrom med:HighBloodSugar\n    ] .\n\nmed:Type2Diabetes a owl:Class ;\n    rdfs:subClassOf med:Diabetes ;\n    owl:equivalentClass [\n        a owl:Class ;\n        owl:intersectionOf (\n            med:Diabetes\n            [a owl:Restriction ;\n             owl:onProperty med:hasSymptom ;\n             owl:someValuesFrom med:InsulinResistance]\n        )\n    ] .\n```\n\nReasoning Capabilities:\n• Automatic classification of diseases based on symptoms\n• Inference of treatment options from disease classifications\n• Consistency checking of medical knowledge\n• Discovery of implicit relationships\n• Automated diagnostic suggestions\n\nResult: Intelligent medical knowledge system with automated reasoning and inference capabilities'
  },
  {
    id: 'knowledge-graph-construction',
    name: 'Knowledge Graph Construction',
    abbr: 'KGC',
    icon: '🔗',
    color: 'from-green-500 to-emerald-600',
    category: 'knowledge-representation',
    description: 'Systematic construction of knowledge graphs from structured and unstructured data sources',
    features: [
      'Multi-source data integration',
      'Entity extraction and linking',
      'Relationship discovery',
      'Schema alignment',
      'Quality assessment',
      'Incremental graph building'
    ],
    useCases: ['enterprise-knowledge', 'research-databases', 'product-catalogs', 'social-networks', 'content-management'],
    complexity: 'high',
    example: 'E-commerce Knowledge Graph:\n\nConstruction Pipeline:\n\n1. Data Source Integration:\n   • Product databases (structured)\n   • Customer reviews (unstructured)\n   • Supplier information (semi-structured)\n   • Market data APIs (real-time)\n\n2. Entity Extraction:\n   • Products: iPhone 15, Samsung Galaxy S24\n   • Brands: Apple, Samsung, Google\n   • Categories: Smartphones, Electronics\n   • Features: Camera, Battery, Display\n\n3. Relationship Discovery:\n   • Product → hasFeature → Camera\n   • Product → manufacturedBy → Apple\n   • Product → competesWith → Galaxy S24\n   • Customer → purchased → iPhone 15\n   • Review → mentions → BatteryLife\n\n4. Schema Alignment:\n   • Map product codes to standard identifiers\n   • Normalize brand names and variants\n   • Align category hierarchies\n   • Standardize feature descriptions\n\n5. Quality Assurance:\n   • Validate entity consistency\n   • Detect duplicate relationships\n   • Verify data completeness\n   • Check referential integrity\n\nKnowledge Graph Output:\n```turtle\nex:iPhone15 a ex:Smartphone ;\n    ex:brand ex:Apple ;\n    ex:hasFeature ex:AdvancedCamera, ex:LongBattery ;\n    ex:priceRange ex:Premium ;\n    ex:competesWith ex:GalaxyS24 ;\n    ex:averageRating "4.5"^^xsd:decimal .\n```\n\nResult: Comprehensive product knowledge graph enabling intelligent recommendations, competitor analysis, and enhanced search capabilities'
  },
  {
    id: 'semantic-validation',
    name: 'Semantic Data Validation',
    abbr: 'SDV',
    icon: '🔍',
    color: 'from-orange-500 to-red-600',
    category: 'knowledge-representation',
    description: 'Multi-layered validation of semantic data using ontological constraints, business rules, and logical consistency checks',
    features: [
      'Ontology-based validation',
      'Business rule enforcement',
      'Logical consistency checking',
      'Cross-reference validation',
      'Temporal constraint verification',
      'Multi-level error reporting'
    ],
    useCases: ['data-governance', 'compliance-monitoring', 'quality-assurance', 'regulatory-compliance', 'knowledge-curation'],
    complexity: 'high',
    example: 'Financial Regulatory Compliance:\n\nValidation Framework:\n\n1. Ontological Constraints:\n```turtle\nfin:Transaction a owl:Class ;\n    rdfs:subClassOf [\n        a owl:Restriction ;\n        owl:onProperty fin:amount ;\n        owl:someValuesFrom xsd:decimal\n    ] ;\n    rdfs:subClassOf [\n        a owl:Restriction ;\n        owl:onProperty fin:currency ;\n        owl:cardinality 1\n    ] .\n```\n\n2. Business Rules (SWRL):\n```\nfin:Transaction(?t) ∧ fin:amount(?t, ?amt) ∧ swrlb:greaterThan(?amt, 10000)\n→ fin:requiresApproval(?t, true)\n```\n\n3. Temporal Constraints:\n```turtle\nfin:transactionDate sh:lessThan fin:settlementDate ;\nfin:reportingDate sh:lessThanOrEquals "today"^^xsd:date .\n```\n\n4. Cross-Reference Validation:\n• Account existence verification\n• Customer KYC status checking\n• Regulatory blacklist screening\n• Anti-money laundering rules\n\n5. Validation Results:\n```json\n{\n  "validationStatus": "failed",\n  "errors": [\n    {\n      "level": "critical",\n      "rule": "AML_SCREENING",\n      "message": "Transaction involves sanctioned entity",\n      "entity": "fin:transaction_12345"\n    },\n    {\n      "level": "warning", \n      "rule": "AMOUNT_THRESHOLD",\n      "message": "Large transaction requires approval",\n      "suggestion": "Add approval workflow"\n    }\n  ]\n}\n```\n\nResult: Comprehensive regulatory compliance validation with automated rule enforcement and detailed audit trails'
  }
]; 