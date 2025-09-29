import { TheoryLesson } from './types';

export const ontologiesIntroductionLesson: TheoryLesson = {
  id: 'ontologies-introduction',
  title: 'Introduction to Ontologies, RDF, and OWL: Formal Knowledge Representation',
  description: 'Master ontologies - the backbone of semantic web, knowledge graphs, and intelligent systems that understand meaning',
  learningObjectives: [
    'Understand what ontologies are and why they enable machine reasoning',
    'Master RDF triple structure and semantic web foundations',
    'Learn RDFS and OWL for class hierarchies and logical constraints',
    'Explore production ontology systems in healthcare, search, and enterprise AI'
  ],
  prerequisites: ['first-order-logic', 'relations-theory'],
  sections: [
    {
      id: 'what-are-ontologies',
      title: '1. What Are Ontologies? From Human Knowledge to Machine Understanding',
      content: `## The Challenge: Making Machines Understand Meaning

**Scenario:** You're building an AI medical assistant. Users ask:
- "What medications treat high blood pressure?"
- "Is acetaminophen safe with liver disease?"
- "Show me all cardiovascular conditions"

Your database has the data, but how does the AI **understand**:
- That "hypertension" = "high blood pressure"?
- That "acetaminophen" is a type of "analgesic"?
- That "cardiovascular" includes heart attacks, arrhythmia, etc.?

**This is where ontologies come in.**

---

## Ontologies: Formal, Shared Conceptualizations

> **Ontology (Philosophy):** The study of what exists and how things relate
>
> **Ontology (Computer Science):** A formal, explicit specification of a shared conceptualization

**In plain English:**
An ontology is a structured way to define:
1. **Concepts** (classes/types): Person, Disease, Medication
2. **Relationships** (properties): treats, causes, isPartOf
3. **Rules** (axioms): "If X treats Y, and Y affects Z, then X is relevant to Z"

**Key difference from databases:**

\`\`\`python
# Database Schema (syntax only)
CREATE TABLE medications (
    id INT,
    name VARCHAR(100),
    treats_condition VARCHAR(100)
);

# Ontology (meaning + reasoning)
Medication ⊑ Drug                          # Medications are a type of Drug
treats ⊑ MedicalIntervention              # "treats" is a medical intervention
∀x,y: treats(x,y) ∧ Disease(y) → Medication(x)  # If x treats disease y, x is a Medication
\`\`\`

**Databases store data. Ontologies capture meaning.**

---

## Why Ontologies Matter in AI Systems

### 1. **Semantic Interoperability**
Different systems use different terms for the same concept.

**Example: Healthcare**
- Hospital A: "BP medication"
- Hospital B: "Antihypertensive drug"
- Hospital C: "Blood pressure treatment"

With ontologies:
\`\`\`turtle
# All mapped to same concept
:BPMedication owl:equivalentClass :AntihypertensiveDrug .
:AntihypertensiveDrug owl:equivalentClass :BloodPressureTreatment .
\`\`\`

Systems can **automatically** understand these are the same thing!

### 2. **Automated Reasoning**
Derive new knowledge from existing facts.

\`\`\`python
# Facts in knowledge base
aspirin rdf:type :Medication
aspirin :treats :Headache
:Headache rdf:type :Pain

# Ontology rules
:Medication ⊑ :Drug
:Pain ⊑ :Symptom
∀x,y: treats(x,y) ∧ Symptom(y) → PainReliever(x)

# Reasoner infers (automatically!)
aspirin rdf:type :Drug           # From subclass relationship
aspirin rdf:type :PainReliever   # From reasoning rule
\`\`\`

**No explicit programming needed!** The ontology + reasoner figures it out.

### 3. **Knowledge Graph Foundation**
Google, Microsoft, Facebook all use ontologies for their knowledge graphs.

**Google Search:**
- Search "Tom Cruise movies"
- Google understands:
  - Tom Cruise is a Person (specifically Actor)
  - Movies are CreativeWork
  - Actors actedIn Movies
  - Returns: Top Gun, Mission Impossible, etc.

This is powered by the **schema.org** ontology!

### 4. **Natural Language Understanding**
LLMs hallucinate. Ontologies provide ground truth.

\`\`\`python
# User query
"Is it safe to take ibuprofen with aspirin?"

# RAG with ontology
1. Extract entities: ibuprofen, aspirin
2. Query ontology:
   - ibuprofen rdf:type :NSAID
   - aspirin rdf:type :NSAID
   - :NSAID :hasRisk :GastrointestinalBleeding
   - :NSAID + :NSAID :increasesRisk :GastrointestinalBleeding
3. Generate response: "Both are NSAIDs. Taking together increases GI bleeding risk."

# Result: Accurate, explainable, grounded in medical ontology
\`\`\`

---

## Real-World Ontologies in Production

### 1. **Schema.org** (Web-Scale)
- Used by Google, Bing, Yahoo, Yandex
- 800+ types, 1,400+ properties
- Powers rich search results

\`\`\`html
<!-- Website markup -->
<div itemscope itemtype="https://schema.org/Recipe">
  <span itemprop="name">Chocolate Chip Cookies</span>
  <span itemprop="recipeYield">24 cookies</span>
</div>

<!-- Google understands structure, shows rich result with ratings, time, etc. -->
\`\`\`

### 2. **SNOMED CT** (Healthcare)
- 350,000+ medical concepts
- Used in electronic health records worldwide
- Supports clinical decision support

### 3. **Gene Ontology** (Bioinformatics)
- 45,000+ terms describing gene functions
- Used in every major genomics database
- Powers drug discovery AI

### 4. **DOLCE / SUMO** (Upper Ontologies)
- Top-level concepts applicable to any domain
- Physical objects, events, qualities, etc.
- Foundation for domain-specific ontologies

---

## Ontologies vs. Other Knowledge Structures

| Structure | Purpose | Example | Reasoning |
|-----------|---------|---------|-----------|
| **Database Schema** | Store data efficiently | SQL tables | None (just queries) |
| **Taxonomy** | Hierarchical classification | Animal kingdom | Simple (is-a only) |
| **Thesaurus** | Synonyms and related terms | WordNet | None (just lookup) |
| **Ontology** | Formal semantics + reasoning | SNOMED CT | Full (logic-based) |
| **Knowledge Graph** | Large-scale fact storage | Google KG | Query + basic reasoning |

**Key insight:** Ontologies provide the **schema and reasoning rules** for knowledge graphs!

---

## Ontologies in Modern AI Pipelines

\`\`\`python
# Traditional AI (brittle)
def get_medication_info(drug_name):
    # Hardcoded logic, breaks with new data
    if drug_name == "aspirin" or drug_name == "ibuprofen":
        return "NSAID"
    elif drug_name == "acetaminophen":
        return "Analgesic"
    # ... 1000s more conditions

# Ontology-powered AI (robust)
def get_medication_info(drug_name):
    # Query ontology
    drug_uri = ontology.find_entity(drug_name)
    drug_types = ontology.get_types(drug_uri)
    # Automatically handles synonyms, hierarchies, reasoning
    return drug_types
\`\`\`

**Benefits:**
- 🎯 **Accurate:** Grounded in expert knowledge
- 🔄 **Maintainable:** Update ontology, not code
- 🌍 **Interoperable:** Standard formats (RDF, OWL)
- 🧠 **Intelligent:** Automatic inference
- 📖 **Explainable:** Trace reasoning paths

---

## Summary: Why Learn Ontologies?

If you're building AI systems that:
- ✅ Need to **understand** domain knowledge (not just pattern match)
- ✅ Must **reason** over complex relationships
- ✅ Require **explainability** and trust
- ✅ Integrate data from **multiple sources**
- ✅ Work in **regulated domains** (healthcare, finance, legal)

**Then ontologies are essential.**

**Next:** Let's dive into RDF, the foundation of all semantic web technologies.
`,
      examples: []
    },
    {
      id: 'rdf-fundamentals',
      title: '2. RDF: The Language of the Semantic Web',
      content: `## RDF (Resource Description Framework): Everything is a Triple

RDF is the foundational data model for ontologies. It's breathtakingly simple yet infinitely expressive.

---

## The Core Idea: Subject-Predicate-Object Triples

**Every statement has exactly 3 parts:**

\`\`\`
Subject    Predicate    Object
-------    ---------    ------
John       knows        Mary
Aspirin    treats       Headache
Paris      capitalOf    France
\`\`\`

That's it! The entire semantic web is built on this simple pattern.

---

## URIs: Universal Identifiers

To avoid ambiguity, RDF uses URIs (like URLs) to identify things:

\`\`\`turtle
# Turtle syntax (human-readable RDF)
<http://example.org/john>  <http://xmlns.com/foaf/0.1/knows>  <http://example.org/mary> .

# With prefixes (cleaner)
@prefix ex: <http://example.org/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

ex:john  foaf:knows  ex:mary .
\`\`\`

**Why URIs?**
- Globally unique (no conflicts)
- Dereferenceable (can fetch info about resource)
- Web-scale (works across organizations)

---

## RDF Graph Structure

Triples naturally form a **directed labeled graph**:

\`\`\`
    knows          hasAge
John -----> Mary  <------ 30
 |                  |
 | hasAge           | livesIn
 v                  v
 25               Boston
\`\`\`

**Triples:**
\`\`\`turtle
ex:John  foaf:knows   ex:Mary .
ex:John  foaf:age     25 .
ex:Mary  foaf:age     30 .
ex:Mary  ex:livesIn   ex:Boston .
\`\`\`

**Key insight:** Knowledge is naturally graph-structured, not table-structured!

---

## RDF Data Types and Literals

**Resources** (things) vs **Literals** (values):

\`\`\`turtle
# Resources (identified by URI)
ex:John  rdf:type  foaf:Person .

# Literals (plain values)
ex:John  foaf:name  "John Smith" .
ex:John  foaf:age   25 .
ex:John  foaf:height  180.5 .

# Typed literals
ex:John  ex:birthDate  "1998-05-15"^^xsd:date .
ex:John  ex:salary     50000^^xsd:integer .
ex:John  ex:bio        "Software engineer"@en .  # Language tag
\`\`\`

---

## Example: Medical Knowledge in RDF

Let's represent medication information:

\`\`\`turtle
@prefix med: <http://example.org/medical/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# Entities
med:Aspirin  rdf:type  med:Medication .
med:Ibuprofen  rdf:type  med:Medication .
med:Headache  rdf:type  med:Condition .
med:Inflammation  rdf:type  med:Condition .

# Relationships
med:Aspirin  med:treats  med:Headache .
med:Aspirin  med:treats  med:Inflammation .
med:Ibuprofen  med:treats  med:Headache .
med:Ibuprofen  med:treats  med:Inflammation .

# Properties
med:Aspirin  med:activeIngredient  "acetylsalicylic acid" .
med:Aspirin  med:dosage  "325-650mg every 4-6 hours" .
med:Aspirin  med:sideEffect  "stomach upset" .
med:Aspirin  med:contraindication  med:BleedingDisorder .
\`\`\`

**Query example:** "What medications treat headaches?"

\`\`\`sparql
SELECT ?medication
WHERE {
    ?medication  rdf:type  med:Medication .
    ?medication  med:treats  med:Headache .
}
# Result: Aspirin, Ibuprofen
\`\`\`

---

## RDF Serialization Formats

Same data, different formats:

### 1. **Turtle** (Human-Readable)
\`\`\`turtle
ex:John  foaf:knows  ex:Mary ;
         foaf:age   25 ;
         foaf:name  "John Smith" .
\`\`\`

### 2. **N-Triples** (One Triple Per Line)
\`\`\`ntriples
<http://example.org/John> <http://xmlns.com/foaf/0.1/knows> <http://example.org/Mary> .
<http://example.org/John> <http://xmlns.com/foaf/0.1/age> "25"^^<http://www.w3.org/2001/XMLSchema#integer> .
<http://example.org/John> <http://xmlns.com/foaf/0.1/name> "John Smith" .
\`\`\`

### 3. **RDF/XML** (Verbose but Standard)
\`\`\`xml
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:foaf="http://xmlns.com/foaf/0.1/">
  <foaf:Person rdf:about="http://example.org/John">
    <foaf:knows rdf:resource="http://example.org/Mary"/>
    <foaf:age rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">25</foaf:age>
    <foaf:name>John Smith</foaf:name>
  </foaf:Person>
</rdf:RDF>
\`\`\`

### 4. **JSON-LD** (JSON for Linked Data)
\`\`\`json
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/"
  },
  "@id": "http://example.org/John",
  "@type": "foaf:Person",
  "foaf:knows": {"@id": "http://example.org/Mary"},
  "foaf:age": 25,
  "foaf:name": "John Smith"
}
\`\`\`

**In practice:** Use Turtle for human editing, JSON-LD for web APIs.

---

## RDF in Python: rdflib

\`\`\`python
from rdflib import Graph, Namespace, Literal, URIRef
from rdflib.namespace import RDF, FOAF

# Create graph
g = Graph()

# Define namespaces
EX = Namespace("http://example.org/")

# Add triples
john = EX.John
mary = EX.Mary

g.add((john, RDF.type, FOAF.Person))
g.add((john, FOAF.knows, mary))
g.add((john, FOAF.age, Literal(25)))
g.add((john, FOAF.name, Literal("John Smith")))

# Serialize to Turtle
print(g.serialize(format='turtle'))

# Query
for s, p, o in g.triples((john, FOAF.knows, None)):
    print(f"{s} knows {o}")
# Output: http://example.org/John knows http://example.org/Mary
\`\`\`

---

## RDF Power: Graph Queries

Unlike SQL (table joins), RDF naturally handles:

### 1. **Multi-Hop Relationships**
\`\`\`sparql
# Find friends of friends
SELECT ?fof
WHERE {
    ex:John  foaf:knows  ?friend .
    ?friend  foaf:knows  ?fof .
}
\`\`\`

### 2. **Variable-Length Paths**
\`\`\`sparql
# Find all ancestors (any generation)
SELECT ?ancestor
WHERE {
    ex:John  ex:hasParent+  ?ancestor .
}
\`\`\`

### 3. **Schema-Free Extensions**
Add new properties without changing existing data:

\`\`\`turtle
# Original data
ex:John  foaf:name  "John Smith" .

# Later, add new property (no schema migration!)
ex:John  ex:favoriteColor  "blue" .
ex:John  ex:githubProfile  <https://github.com/jsmith> .
\`\`\`

---

## Summary: RDF Core Concepts

| Concept | Meaning | Example |
|---------|---------|---------|
| **Triple** | Subject-Predicate-Object | John knows Mary |
| **URI** | Global identifier | http://example.org/John |
| **Literal** | Concrete value | "John Smith", 25, 180.5 |
| **Graph** | Set of triples | Directed labeled graph |
| **Namespace** | URI prefix | foaf: http://xmlns.com/foaf/0.1/ |

**Key Advantages:**
- ✅ Simple data model (just triples!)
- ✅ Naturally graph-structured
- ✅ Globally distributed (URIs)
- ✅ Schema-free (add properties anytime)
- ✅ Standard query language (SPARQL)

**Next:** Let's add semantics with RDFS and OWL!
`,
      examples: [
        {
          title: 'Creating RDF Triples with rdflib',
          description: 'Build an RDF graph in Python using rdflib to represent medical knowledge with triples, namespaces, and SPARQL-like queries',
          code: `from rdflib import Graph, Namespace, Literal, URIRef
from rdflib.namespace import RDF, RDFS, FOAF

# Create a new graph
g = Graph()

# Define custom namespace
MED = Namespace("http://example.org/medical/")
g.bind("med", MED)

# Add medical knowledge triples
aspirin = MED.Aspirin
ibuprofen = MED.Ibuprofen
headache = MED.Headache
inflammation = MED.Inflammation

# Type declarations
g.add((aspirin, RDF.type, MED.Medication))
g.add((ibuprofen, RDF.type, MED.Medication))
g.add((headache, RDF.type, MED.Condition))

# Treatment relationships
g.add((aspirin, MED.treats, headache))
g.add((aspirin, MED.treats, inflammation))
g.add((ibuprofen, MED.treats, headache))

# Properties with literals
g.add((aspirin, MED.activeIngredient, Literal("acetylsalicylic acid")))
g.add((aspirin, MED.dosage, Literal("325-650mg")))
g.add((aspirin, RDFS.label, Literal("Aspirin", lang="en")))

# Serialize to Turtle format
print(g.serialize(format='turtle'))

# Query: Find all medications that treat headaches
print("\\nMedications treating headaches:")
for med, _, _ in g.triples((None, MED.treats, headache)):
    # Get label if available
    label = g.value(med, RDFS.label) or med
    print(f"  - {label}")`,
        }
      ]
    },
    {
      id: 'rdfs-owl',
      title: '3. RDFS and OWL: Adding Semantics and Reasoning',
      content: `## From Data to Knowledge: RDFS and OWL

RDF gives us triples. But to enable **reasoning**, we need to define:
- What types of things exist (classes)
- How they relate (properties)
- What rules apply (axioms)

This is where **RDFS** and **OWL** come in.

---

## RDFS (RDF Schema): Basic Ontology Vocabulary

RDFS adds minimal vocabulary for defining classes and properties.

### 1. **Defining Classes**

\`\`\`turtle
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix med: <http://example.org/medical/> .

# Define classes
med:Medication  rdf:type  rdfs:Class .
med:Disease     rdf:type  rdfs:Class .
med:Symptom     rdf:type  rdfs:Class .

# Class hierarchy (subclass relationships)
med:Analgesic    rdfs:subClassOf  med:Medication .
med:NSAID        rdfs:subClassOf  med:Analgesic .
med:Opioid       rdfs:subClassOf  med:Analgesic .

med:ChronicDisease  rdfs:subClassOf  med:Disease .
med:Diabetes        rdfs:subClassOf  med:ChronicDisease .
med:Hypertension    rdfs:subClassOf  med:ChronicDisease .
\`\`\`

**Inference enabled:**
\`\`\`turtle
# You state:
med:Aspirin  rdf:type  med:NSAID .

# Reasoner infers:
med:Aspirin  rdf:type  med:Analgesic .    # From: NSAID subClassOf Analgesic
med:Aspirin  rdf:type  med:Medication .   # From: Analgesic subClassOf Medication
\`\`\`

### 2. **Defining Properties**

\`\`\`turtle
# Define properties
med:treats         rdf:type  rdf:Property .
med:hasSideEffect  rdf:type  rdf:Property .
med:contraindicatedFor  rdf:type  rdf:Property .

# Property hierarchy
med:stronglyTreats  rdfs:subPropertyOf  med:treats .

# Domain and range
med:treats  rdfs:domain  med:Medication .  # Subject must be a Medication
med:treats  rdfs:range   med:Disease .     # Object must be a Disease
\`\`\`

**Inference enabled:**
\`\`\`turtle
# You state:
med:Aspirin  med:stronglyTreats  med:Inflammation .

# Reasoner infers:
med:Aspirin  med:treats  med:Inflammation .  # From: stronglyTreats subPropertyOf treats
med:Aspirin  rdf:type  med:Medication .      # From: treats domain is Medication
med:Inflammation  rdf:type  med:Disease .    # From: treats range is Disease
\`\`\`

### 3. **Documentation Properties**

\`\`\`turtle
med:Aspirin  rdfs:label  "Aspirin" .
med:Aspirin  rdfs:comment  "A common NSAID used for pain relief and anti-inflammation." .
med:NSAID  rdfs:label  "Non-Steroidal Anti-Inflammatory Drug" .
\`\`\`

---

## OWL (Web Ontology Language): Advanced Semantics

OWL adds much richer expressiveness based on **Description Logics**.

### OWL Profiles:
- **OWL Lite:** Simple hierarchies, limited constraints
- **OWL DL:** Full Description Logic (decidable, good balance)
- **OWL Full:** Maximum expressiveness (undecidable)

**Most systems use OWL DL.**

---

## Key OWL Constructs

### 1. **Class Relationships**

\`\`\`turtle
# Equivalence
med:NSAID  owl:equivalentClass  med:NonSteroidalAntiInflammatoryDrug .

# Disjointness (mutually exclusive)
med:Medication  owl:disjointWith  med:Disease .
# Nothing can be both a Medication and a Disease

# Complement
med:NonMedication  owl:complementOf  med:Medication .
# Everything that's not a Medication
\`\`\`

### 2. **Property Characteristics**

\`\`\`turtle
# Transitive: if A-R-B and B-R-C, then A-R-C
med:isAncestorOf  rdf:type  owl:TransitiveProperty .
# If John isAncestorOf Mary, and Mary isAncestorOf Sue
# Then: John isAncestorOf Sue (inferred!)

# Symmetric: if A-R-B then B-R-A
foaf:knows  rdf:type  owl:SymmetricProperty .
# If John knows Mary, then Mary knows John

# Functional: each subject has at most one value
med:hasPrimaryIngredient  rdf:type  owl:FunctionalProperty .
# Each medication has exactly one primary ingredient

# Inverse
med:treatedBy  owl:inverseOf  med:treats .
# If Aspirin treats Headache, then Headache treatedBy Aspirin
\`\`\`

### 3. **Property Restrictions**

**Universal quantification (all values):**
\`\`\`turtle
# All medications that treat something must treat only diseases
med:Medication  rdfs:subClassOf  [
    rdf:type  owl:Restriction ;
    owl:onProperty  med:treats ;
    owl:allValuesFrom  med:Disease
] .
\`\`\`

**Existential quantification (some values):**
\`\`\`turtle
# An Antibiotic is a Medication that treats at least one bacterial infection
med:Antibiotic  owl:equivalentClass  [
    rdf:type  owl:Class ;
    owl:intersectionOf (
        med:Medication
        [
            rdf:type  owl:Restriction ;
            owl:onProperty  med:treats ;
            owl:someValuesFrom  med:BacterialInfection
        ]
    )
] .
\`\`\`

**Cardinality constraints:**
\`\`\`turtle
# Each medication must have at least 1 and at most 3 active ingredients
med:Medication  rdfs:subClassOf  [
    rdf:type  owl:Restriction ;
    owl:onProperty  med:hasActiveIngredient ;
    owl:minCardinality  1 ;
    owl:maxCardinality  3
] .
\`\`\`

### 4. **Class Expressions**

**Union:**
\`\`\`turtle
# PainReliever is either Analgesic or Anesthetic
med:PainReliever  owl:equivalentClass  [
    owl:unionOf (med:Analgesic med:Anesthetic)
] .
\`\`\`

**Intersection:**
\`\`\`turtle
# SafeMedication is Medication AND has no severe side effects
med:SafeMedication  owl:equivalentClass  [
    owl:intersectionOf (
        med:Medication
        [
            rdf:type  owl:Class ;
            owl:complementOf  [
                rdf:type  owl:Restriction ;
                owl:onProperty  med:hasSideEffect ;
                owl:someValuesFrom  med:SevereSideEffect
            ]
        ]
    )
] .
\`\`\`

---

## Real Example: Medical Ontology

\`\`\`turtle
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix med: <http://example.org/medical/> .

# Classes
med:Medication  rdf:type  owl:Class .
med:Disease  rdf:type  owl:Class .
med:NSAID  rdfs:subClassOf  med:Medication .
med:Opioid  rdfs:subClassOf  med:Medication .

# Disjoint classes (can't be both)
med:NSAID  owl:disjointWith  med:Opioid .

# Properties with characteristics
med:treats  rdf:type  owl:ObjectProperty ;
           rdfs:domain  med:Medication ;
           rdfs:range   med:Disease .

med:contraindicatedFor  rdf:type  owl:ObjectProperty ;
                        rdfs:domain  med:Medication ;
                        rdfs:range   med:Disease .

med:treatedBy  owl:inverseOf  med:treats .

# Define NSAID by properties
med:NSAID  owl:equivalentClass  [
    rdf:type  owl:Class ;
    owl:intersectionOf (
        med:Medication
        [
            rdf:type  owl:Restriction ;
            owl:onProperty  med:hasEffect ;
            owl:someValuesFrom  med:AntiInflammatory
        ]
        [
            rdf:type  owl:Restriction ;
            owl:onProperty  med:mechanism ;
            owl:hasValue  med:COXInhibition
        ]
    )
] .

# Instances
med:Aspirin  rdf:type  med:NSAID ;
            med:treats  med:Headache, med:Fever, med:Inflammation ;
            med:hasSideEffect  med:StomachIrritation ;
            med:contraindicatedFor  med:BleedingDisorder .

med:Morphine  rdf:type  med:Opioid ;
             med:treats  med:SeverePain ;
             med:hasSideEffect  med:Addiction, med:RespiratoryDepression .
\`\`\`

**What a reasoner can infer:**

1. **From subclass:**
   - Aspirin is an NSAID → Aspirin is a Medication

2. **From property domain/range:**
   - Aspirin treats Headache → Headache is a Disease

3. **From inverse properties:**
   - Aspirin treats Headache → Headache treatedBy Aspirin

4. **From restrictions:**
   - Aspirin hasEffect AntiInflammatory → Aspirin is NSAID

5. **From disjointness:**
   - Aspirin is NSAID → Aspirin is NOT Opioid

6. **Consistency checking:**
   - If you try to assert: "Aspirin rdf:type Opioid"
   - Reasoner detects: INCONSISTENT! (NSAID and Opioid are disjoint)

---

## Reasoning in Action: Medical Decision Support

\`\`\`python
# Scenario: Patient has bleeding disorder, needs pain relief

# Knowledge base facts:
patient_123  rdf:type  med:Patient ;
            med:hasDiagnosis  med:BleedingDisorder ;
            med:requiresTreatment  med:Pain .

med:Aspirin  med:contraindicatedFor  med:BleedingDisorder .
med:Aspirin  med:treats  med:Pain .

med:Acetaminophen  med:treats  med:Pain .
# (no contraindication for bleeding disorder)

# Query: Safe pain medications for this patient?
SELECT ?medication
WHERE {
    ?medication  med:treats  med:Pain .
    FILTER NOT EXISTS {
        ?medication  med:contraindicatedFor  med:BleedingDisorder .
    }
}

# Result: Acetaminophen (NOT Aspirin)
# This is clinical decision support powered by ontologies!
\`\`\`

---

## OWL Reasoners

Popular tools that perform inference:

1. **Pellet** - Open source, full OWL DL
2. **HermiT** - Very fast, theorem-proving based
3. **Fact++** - Efficient DL reasoner
4. **ELK** - Ultra-fast for large ontologies (OWL EL profile)

\`\`\`python
from owlready2 import *

# Load ontology
onto = get_ontology("http://example.org/medical.owl").load()

# Run reasoner
with onto:
    sync_reasoner()  # Infers new facts

# Check inferred types
aspirin = onto.Aspirin
print(aspirin.is_a)  # Shows all inferred classes
\`\`\`

---

## Summary: RDFS vs OWL

| Feature | RDFS | OWL |
|---------|------|-----|
| **Class hierarchy** | ✅ subClassOf | ✅ subClassOf + equivalentClass |
| **Property hierarchy** | ✅ subPropertyOf | ✅ subPropertyOf + equivalentProperty |
| **Domain/Range** | ✅ Basic | ✅ Complex restrictions |
| **Disjointness** | ❌ | ✅ disjointWith |
| **Cardinality** | ❌ | ✅ min/max/exact |
| **Property characteristics** | ❌ | ✅ Transitive, Symmetric, Functional |
| **Class expressions** | ❌ | ✅ Union, Intersection, Complement |
| **Reasoning** | Simple | Full Description Logic |
| **Use case** | Simple taxonomies | Complex domains (medical, science) |

**Rule of thumb:**
- **RDFS:** Good for simple hierarchies (like folder structures)
- **OWL:** Necessary for domains requiring logical reasoning and consistency checking

---

## Applications in AI

### 1. **Healthcare AI**
- Clinical decision support (contraindication checking)
- Electronic health record integration
- Drug-drug interaction detection

### 2. **Knowledge Graphs**
- Google, Microsoft, IBM use OWL for schema
- Automatic inference enriches KGs
- Query expansion (find related entities)

### 3. **Explainable AI**
- Trace reasoning steps
- Show why a conclusion was reached
- Regulatory compliance (FDA, GDPR)

### 4. **Semantic Search**
- Understand query intent
- Find conceptually similar results
- Works across terminology variations

---

## What's Next?

We've covered:
- ✅ RDF (data model)
- ✅ RDFS (basic schema)
- ✅ OWL (advanced semantics)

**Next up:** Building practical ontologies and reasoning systems!

**Key takeaway:** Ontologies aren't just academic exercises—they're the foundation of intelligent, explainable AI systems in production today at Google, IBM, healthcare organizations, and beyond.
`,
      examples: [
        {
          title: 'OWL Reasoning with Owlready2',
          description: 'Build a production-quality medical ontology with OWL reasoning, automatic classification, and consistency checking using Owlready2',
          code: `from owlready2 import *

# Create ontology
onto = get_ontology("http://example.org/medical.owl")

with onto:
    # Define classes
    class Medication(Thing): pass
    class Disease(Thing): pass
    class NSAID(Medication): pass
    class Opioid(Medication): pass

    # Disjoint classes
    AllDisjoint([NSAID, Opioid])

    # Define properties
    class treats(ObjectProperty):
        domain = [Medication]
        range = [Disease]

    class contraindicatedFor(ObjectProperty):
        domain = [Medication]
        range = [Disease]

    # Inverse property
    class treatedBy(ObjectProperty):
        inverse_property = treats

    # Create instances
    aspirin = NSAID("Aspirin")
    headache = Disease("Headache")
    bleeding_disorder = Disease("BleedingDisorder")

    aspirin.treats.append(headache)
    aspirin.contraindicatedFor.append(bleeding_disorder)

    # Define NSAID by restriction
    class AntiInflammatory(Thing): pass
    class hasEffect(ObjectProperty):
        domain = [Medication]
        range = [AntiInflammatory]

    NSAID.equivalent_to.append(
        Medication & hasEffect.some(AntiInflammatory)
    )

# Save ontology
onto.save(file="medical.owl")

# Load and reason
onto = get_ontology("medical.owl").load()

print("Before reasoning:")
print(f"Aspirin types: {aspirin.is_a}")

# Run reasoner
with onto:
    sync_reasoner(infer_property_values=True)

print("\\nAfter reasoning:")
print(f"Aspirin types: {aspirin.is_a}")
print(f"Headache treatedBy: {headache.treatedBy}")

# Query safe medications
print("\\nChecking contraindications:")
patient_disease = bleeding_disorder
safe_meds = []
for med in Medication.instances():
    if patient_disease not in med.contraindicatedFor:
        safe_meds.append(med.name)
print(f"Safe medications: {safe_meds}")`,
        }
      ]
    },
    {
      id: 'applications',
      title: '4. Applications: Ontologies in Modern AI Systems',
      content: `## Ontologies in Production AI Systems

Let's see how major companies and systems use ontologies today.

---

## 1. Google Knowledge Graph

**Scale:**
- 500+ billion facts
- 5+ billion entities
- Powers Google Search, Assistant, Ads

**How it works:**
\`\`\`
User query: "Who is the CEO of Apple?"

1. Parse query → extract entities: [CEO, Apple]
2. Match to KG:
   - Apple (Q312) type: Company
   - CEO relationship: hasChiefExecutiveOfficer
3. Traverse KG:
   - Apple hasChiefExecutiveOfficer → Tim Cook
4. Return: "Tim Cook is the CEO of Apple"
\`\`\`

**Ontology role:**
- schema.org + Freebase ontology defines entity types
- Relationships have formal semantics
- Reasoning expands queries (CEO ⊂ Executive)

---

## 2. IBM Watson Health

**Application:** Clinical decision support

**Ontology:** SNOMED CT (350K+ medical concepts)

**Example workflow:**
\`\`\`
Patient symptoms: fever, cough, fatigue
Patient history: diabetes, hypertension

Watson queries SNOMED CT:
1. Find diseases with these symptoms
   → Flu, COVID-19, Pneumonia, etc.

2. Check contraindications for treatments
   → Patient has diabetes
   → Certain steroids contraindicated

3. Recommend tests and treatments
   → PCR test for COVID-19
   → Acetaminophen for fever (safe with diabetes)

4. Explain reasoning path
   → Shows ontology traversal for transparency
\`\`\`

**Why ontologies matter:**
- Medical accuracy requires formal semantics
- Reasoning prevents dangerous drug interactions
- Explainability for FDA compliance

---

## 3. Amazon Product Recommendations

**Ontology:** Product taxonomy + schema.org

\`\`\`
Product: "Sony WH-1000XM5"

Ontology facts:
- Type: Headphones
- SubType: OverEarHeadphones
- Feature: NoiseCancellation
- Brand: Sony
- Category: Electronics > Audio > Headphones

Reasoning:
1. User bought WH-1000XM5 (over-ear, noise-canceling)
2. Query: similar products
   - Same category: Headphones
   - Same feature: NoiseCancellation
   - Different brand: Bose QuietComfort 45
3. Recommend: "Customers also viewed..."

Advanced:
- Complementary products
  → Headphones + Case (ontology: hasAccessory)
- Product bundles
  → Headphones + DAC (ontology: compatibleWith)
\`\`\`

---

## 4. Biomedical Research: Gene Ontology

**Use case:** Understanding gene functions

**Ontology:** Gene Ontology (GO) - 45K+ terms

\`\`\`
Question: "What genes are involved in DNA repair?"

GO hierarchy:
- BiologicalProcess
  └── CellularProcess
      └── DNAMetabolicProcess
          └── DNARepair
              ├── BaseExcisionRepair
              ├── NucleotideExcisionRepair
              └── MismatchRepair

Query:
SELECT ?gene
WHERE {
    ?gene  go:involvedIn  ?process .
    ?process  rdfs:subClassOf*  go:DNARepair .
}

# Returns: BRCA1, BRCA2, TP53, ATM, etc.
# Reasoning traverses subclass hierarchy!
\`\`\`

**Impact:**
- Drug discovery (target genes for cancer)
- Personalized medicine (genetic variants)
- Research automation (literature mining)

---

## 5. Autonomous Vehicles: OpenStreetMap + Ontologies

**Challenge:** Cars need to understand the world semantically.

\`\`\`
Sensor data: "Object ahead, moving slowly"

Ontology reasoning:
1. Classify object
   - Shape + speed → Pedestrian or Cyclist
2. Check rules
   - Pedestrian in crosswalk → YieldRequired
   - School zone + child pedestrian → ReduceSpeed
3. Plan action
   - IF Pedestrian AND Crosswalk THEN Stop
   - IF Child AND SchoolZone THEN MaxSpeed(25mph)

Without ontology:
- Hardcoded rules (brittle, incomplete)
- Can't handle new scenarios

With ontology:
- Semantic understanding
- Reasoning over complex situations
- Explainable decisions (safety-critical!)
\`\`\`

---

## 6. Legal AI: Legal Ontologies

**Application:** Contract analysis, legal research

**Ontologies:**
- Legal Ontology (LKIF) - laws, cases, contracts
- Time ontology - effective dates, durations

\`\`\`
Question: "Is this contract enforceable?"

Ontology checks:
1. Parties
   - Party1: hasLegalCapacity → True
   - Party2: hasLegalCapacity → True

2. Consideration
   - ContractHasConsideration → True

3. Legality
   - ContractPurpose: rdfs:subClassOf LegalActivity → True
   - NOT (ContractPurpose: rdfs:subClassOf IllegalActivity) → True

4. Proper execution
   - hasSig nature: true
   - hasWitness: true
   - meetsFormalRequirements: true

Reasoning: All conditions satisfied → Contract IS enforceable

If NOT enforceable:
- Explain why (missing signatures, illegal purpose, etc.)
- Cite relevant law (ontology links to statutes)
\`\`\`

**Why it matters:**
- Legal reasoning requires formal logic
- Case law has complex precedent relationships
- Explainability is legally required

---

## 7. Semantic Search: DBpedia & Wikidata

**Use case:** Answer complex queries

**Example:**
\`\`\`
Query: "European cities with population > 1M near coastline"

Traditional keyword search:
- Matches documents containing these words
- No semantic understanding
- Poor precision/recall

Ontology-powered search:
1. Parse semantic query:
   - City(x) ∧ location(x, Europe) ∧ population(x, >1M) ∧ near(x, Coast)

2. Query knowledge graph:
   SELECT ?city ?pop
   WHERE {
       ?city  rdf:type  dbo:City ;
              dbo:country/dbo:continent  dbr:Europe ;
              dbo:populationTotal  ?pop ;
              dbo:location  ?geo .
       ?geo  geo:distance  ?coast .
       ?coast  rdf:type  dbo:Coast .
       FILTER(?pop > 1000000)
       FILTER(?distance < 50km)
   }

3. Results:
   - Barcelona (1.6M, Mediterranean)
   - Marseille (870K) - EXCLUDED (< 1M)
   - Hamburg (1.8M, North Sea)
   - Rome (2.8M, Tyrrhenian Sea)

# Semantic understanding, not keyword matching!
\`\`\`

---

## 8. E-commerce: Schema.org Markup

**Application:** Rich snippets in search results

\`\`\`html
<!-- Product page markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sony WH-1000XM5",
  "description": "Industry-leading noise canceling headphones",
  "brand": {
    "@type": "Brand",
    "name": "Sony"
  },
  "offers": {
    "@type": "Offer",
    "price": "399.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "1234"
  }
}
</script>
\`\`\`

**What Google does:**
1. Parses schema.org markup (RDF in JSON-LD)
2. Understands: Product, Price, Rating, Availability
3. Shows rich result:
   \`\`\`
   Sony WH-1000XM5 - $399.99
   ⭐⭐⭐⭐⭐ 4.7/5 (1,234 reviews)
   In Stock
   \`\`\`

**Impact:**
- 30% higher click-through rates
- Better shopping experience
- Structured data enables voice search

---

## 9. Retrieval-Augmented Generation (RAG) with Ontologies

**Modern LLM problem:** Hallucination

**Solution:** Ground LLM responses in ontologies

\`\`\`python
# User query
query = "Is ibuprofen safe for someone with kidney disease?"

# Traditional LLM (may hallucinate)
llm_response = gpt4(query)
# Risk: Confident but possibly incorrect answer

# Ontology-grounded RAG
def ontology_rag(query):
    # 1. Extract entities
    entities = extract_entities(query)
    # → [ibuprofen, kidney disease]

    # 2. Query medical ontology
    facts = ontology.query(\"\"\"
        SELECT ?contraindication ?reason
        WHERE {
            med:Ibuprofen  med:contraindicatedFor  ?contraindication .
            ?contraindication  rdfs:subClassOf*  med:KidneyDisease .
            ?contraindication  med:contraindicationReason  ?reason .
        }
    \"\"\")

    # 3. Augment prompt with facts
    augmented_prompt = f\"\"\"
    Question: {query}

    Relevant medical facts from ontology:
    - Ibuprofen is contraindicated for chronic kidney disease
    - Reason: NSAIDs can worsen kidney function
    - Risk: Acute kidney injury

    Answer based on these facts:
    \"\"\"

    # 4. Generate grounded response
    response = gpt4(augmented_prompt)
    return response, facts  # Include sources!

# Result: Accurate, explainable, traceable
\`\`\`

**Benefits:**
- ✅ Factually accurate (grounded in expert ontology)
- ✅ Explainable (can cite sources)
- ✅ Auditable (reasoning path is explicit)
- ✅ Updateable (update ontology, not model)

---

## 10. Multi-Agent Systems: Shared Ontology for Communication

**Challenge:** AI agents need common understanding

\`\`\`python
# Scenario: Hospital multi-agent system

# Agents:
- DiagnosisAgent: Suggests diagnoses
- TreatmentAgent: Recommends treatments
- PharmacyAgent: Checks drug interactions
- SchedulingAgent: Books appointments

# Without shared ontology:
DiagnosisAgent: "Patient has HTN"
TreatmentAgent: "What's HTN?"  # Different terminology
# → Communication fails

# With shared ontology (SNOMED CT):
DiagnosisAgent: sends(patient_123, hasDiagnosis, snomed:Hypertension)
TreatmentAgent: receives → queries ontology:
  → Hypertension equivalentClass HighBloodPressure
  → Hypertension subClassOf CardiovascularDisease
  → Standard treatment: Antihypertensives

TreatmentAgent: sends(patient_123, recommendsTreatment, snomed:Lisinopril)
PharmacyAgent: receives → queries ontology:
  → Lisinopril rdf:type ACEInhibitor
  → Check interactions with patient's other meds
  → No conflicts found → Approve

# Agents communicate via shared semantic model!
\`\`\`

---

## Summary: Why Ontologies Win in Production

| Approach | Pros | Cons | Use Case |
|----------|------|------|----------|
| **Hardcoded Rules** | Simple, fast | Brittle, not maintainable | Toy projects |
| **Pure ML** | Learns from data | Black box, hallucinations | Image recognition |
| **Ontology + Reasoning** | Explainable, accurate | Requires expertise | Healthcare, legal, finance |
| **Hybrid (Ontology + LLM)** | Best of both worlds | Complex architecture | Modern AI systems (RAG) |

**The trend:** Modern AI systems increasingly use **hybrid approaches**—neural networks for perception/generation, ontologies for reasoning and explainability.

**Next lesson:** Let's build these systems ourselves! 💪
`,
      examples: []
    }
  ],
  summary: [
    'Ontologies define formal semantics: concepts, relationships, constraints, and reasoning rules',
    'RDF: triple-based data model (subject, predicate, object)',
    'RDFS/OWL: add class hierarchies, property constraints, and reasoning capabilities',
    'Production systems: Google Knowledge Graph, healthcare (SNOMED CT), biomedical research',
    'Hybrid AI: combine ontologies (reasoning, explainability) with LLMs (generation, NLU)'
  ],
  nextSteps: [
    'Learn ontology engineering best practices and patterns',
    'Build an RDF triple store with SPARQL-like queries',
    'Implement ontology-based reasoning with OWL',
    'Explore production ontology tools (Protégé, Owlready2)'
  ],
  checkYourUnderstanding: [
    {
      question: 'What is the difference between RDF, RDFS, and OWL?',
      answer: 'RDF: data model (triples). RDFS: vocabulary for class hierarchies and property constraints (subClassOf, domain, range). OWL: full logic with equivalence, disjointness, restrictions, and automated reasoning. OWL ⊃ RDFS ⊃ RDF.'
    },
    {
      question: 'How do ontologies enable automated reasoning?',
      answer: 'Ontologies define logical axioms (subClassOf, equivalentClass, restrictions). Reasoners apply inference rules to derive new facts. Example: if Aspirin subClassOf Medication, and Medication subClassOf Drug, reasoner infers Aspirin subClassOf Drug.'
    },
    {
      question: 'Give an example of ontologies in production AI systems.',
      answer: 'Examples: 1) IBM Watson uses medical ontologies (SNOMED CT) for diagnosis, 2) Google Knowledge Graph uses schema.org for structured web data, 3) Healthcare: drug-disease ontologies for contraindication checking, 4) RAG systems with ontology-grounded retrieval.'
    },
    {
      question: 'Why use ontologies instead of hardcoded if-else rules?',
      answer: 'Ontologies: declarative (specify what, not how), maintainable (add new facts without code changes), reasoning (automatic inference), interoperable (standard formats). Hardcoded rules: brittle, not scalable, cannot share knowledge across systems.'
    }
  ]
};