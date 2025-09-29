import { TheoryLesson } from './types';

export const knowledgeGraphsIntroductionLesson: TheoryLesson = {
  id: 'knowledge-graphs-introduction',
  title: 'Knowledge Graphs: Representing the World at Scale',
  description: 'Master knowledge graphs - the technology powering Google Search, recommendation systems, and modern AI applications',
  learningObjectives: [
    'Understand how knowledge graphs represent real-world entities and relationships',
    'Learn how Google, Amazon, and enterprise systems use KGs at scale',
    'Master KG construction: entity linking, relation extraction, knowledge fusion',
    'Explore applications from search to drug discovery'
  ],
  prerequisites: ['ontologies-introduction', 'first-order-logic'],
  sections: [
    {
      id: 'what-are-knowledge-graphs',
      title: '1. What Are Knowledge Graphs? The Power of Connected Facts',
      content: `## From Isolated Data to Connected Knowledge

Imagine you have these facts scattered across databases:
- "Barack Obama was born in Hawaii"
- "Hawaii is a state in USA"
- "Barack Obama was the 44th President"
- "The President is the head of government"

**Databases:** Store these as disconnected rows in tables
**Knowledge Graphs:** Connect them into a unified, queryable web of knowledge

---

## Knowledge Graphs: Definition

> **Knowledge Graph (KG):** A structured representation of entities, their attributes, and the relationships between them, forming a graph of interconnected facts.

**Core components:**
1. **Entities** (nodes): Real-world objects, people, places, concepts
2. **Relationships** (edges): How entities connect to each other
3. **Attributes** (properties): Facts about entities

**Example KG:**
\`\`\`
    bornIn        locatedIn
Obama -------> Hawaii -------> USA
  |                             |
  | wasPres                     | hasGovt
  v                             v
44thPresident              President
  |                             |
  | instanceOf                  | roleType
  v                             v
President <-------------------- HeadOfGovernment
\`\`\`

**Query:** "Where was the 44th President born?"
- Follow: Obama → wasPres → 44thPresident (backwards) → bornIn → Hawaii
- Answer: Hawaii

**The magic:** Graphs make connections explicit and queryable!

---

## Knowledge Graphs vs. Other Approaches

### KG vs. Relational Database

**Relational Database:**
\`\`\`sql
-- Separate tables
People: id | name | birthplace | job_title
Places: id | name | country
Jobs: id | title | department

-- Query requires complex joins
SELECT p.name, pl.name
FROM People p
JOIN Places pl ON p.birthplace = pl.id
WHERE p.job_title = 'President';
\`\`\`

**Knowledge Graph:**
\`\`\`sparql
# Natural graph traversal
SELECT ?name ?place
WHERE {
    ?person  rdf:type     :President ;
             foaf:name    ?name ;
             :bornIn      ?location .
    ?location :name      ?place .
}
\`\`\`

**Key differences:**

| Feature | Relational DB | Knowledge Graph |
|---------|---------------|-----------------|
| **Structure** | Fixed schema (tables) | Flexible graph (nodes/edges) |
| **Relationships** | Foreign keys (implicit) | Edges (explicit, labeled) |
| **Schema changes** | Requires migration | Add new edge types anytime |
| **Queries** | Joins (expensive) | Graph traversal (natural) |
| **Multi-hop** | Multiple joins | Single path query |
| **Semantics** | Minimal | Rich (via ontologies) |

**When to use KGs:**
- ✅ Complex, interconnected data
- ✅ Frequent schema evolution
- ✅ Multi-hop queries (friends-of-friends)
- ✅ Semantic reasoning needed
- ✅ Integration from multiple sources

**When to use RDBMS:**
- ✅ Tabular data with fixed schema
- ✅ ACID transactions critical
- ✅ Simple queries (no graph traversal)

---

### KG vs. Ontology

**Ontology:**
- **Focus:** Schema, types, rules
- **Scale:** Usually smaller (thousands of classes)
- **Purpose:** Define what CAN exist
- **Example:** "Person subClassOf LivingThing"

**Knowledge Graph:**
- **Focus:** Instances, facts
- **Scale:** Massive (billions of entities)
- **Purpose:** Record what DOES exist
- **Example:** "Obama type Person, Obama bornIn Hawaii"

**Relationship:** Ontologies provide the schema/vocabulary for KGs!

\`\`\`
Ontology (Schema Layer):
  Person ⊑ LivingThing
  bornIn ⊆ Person × Place

Knowledge Graph (Instance Layer):
  Obama rdf:type Person
  Obama bornIn Hawaii
  Hawaii rdf:type Place
\`\`\`

**In practice:** Modern KGs combine both (schema + instances).

---

## The Entity-Relationship-Attribute Model

**Entities (nodes):**
- Represent real-world things
- Have unique identifiers (URIs)
- Examples: Obama (person), Hawaii (place), Google (organization)

**Relationships (edges):**
- Connect entities
- Labeled, directed edges
- Examples: bornIn, workAt, locatedIn, friendOf

**Attributes (properties):**
- Facts about entities
- Usually literals (strings, numbers, dates)
- Examples: name="Barack Obama", population=1400000, founded=1998

**Triple representation:**
\`\`\`
Entity-Relationship-Entity:
  (Obama, bornIn, Hawaii)
  (Obama, worksAt, WhiteHouse)

Entity-Attribute-Value:
  (Obama, name, "Barack Obama")
  (Obama, birthDate, "1961-08-04")
  (Hawaii, population, 1400000)
\`\`\`

---

## Real-World Knowledge Graphs at Scale

### 1. **Google Knowledge Graph** (The OG)

**Launch:** 2012
**Scale:** 500+ billion facts, 5+ billion entities
**Purpose:** Power Google Search

**What it does:**
\`\`\`
User search: "height of eiffel tower"

Without KG:
  → Returns web pages about Eiffel Tower
  → User must find answer in text

With KG:
  → Recognizes "Eiffel Tower" as entity
  → Retrieves fact: height = 300m
  → Shows answer directly in search result box
\`\`\`

**Knowledge Panel example:**
\`\`\`
Search: "Barack Obama"

Google shows:
┌─────────────────────────────┐
│ Barack Obama                │
│ 44th President of USA      │
│ Born: Aug 4, 1961 (age 63) │
│ Height: 6'1"                │
│ Spouse: Michelle Obama      │
│ Children: Malia, Sasha      │
│ Education: Columbia, Harvard│
└─────────────────────────────┘

All from Knowledge Graph!
\`\`\`

**How it's built:**
- Scrapes Wikipedia, Wikidata, Freebase
- Extracts entities and relationships from web
- Human curation and verification
- Continuous updates (10M+ updates/day)

---

### 2. **Wikidata** (Open KG)

**Scale:** 100M+ entities, 1.4B+ statements
**Nature:** Collaborative, like Wikipedia for structured data
**License:** CC0 (public domain)

**Example entity: "Python (programming language)" (Q28865)**
\`\`\`
Properties:
- instance of: programming language
- developer: Guido van Rossum
- inception: 1991
- influenced by: ABC, Modula-3, C
- website: python.org
- logo image: Python-logo.png
\`\`\`

**SPARQL endpoint:** query.wikidata.org
\`\`\`sparql
# Find all female Nobel Prize winners in Physics
SELECT ?person ?personLabel ?year
WHERE {
  ?person wdt:P31 wd:Q5 ;           # instance of human
          wdt:P21 wd:Q6581072 ;      # gender: female
          wdt:P166 wd:Q38104 ;       # award: Nobel Prize in Physics
          wdt:P585 ?year .           # point in time
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
\`\`\`

---

### 3. **Microsoft Satori**

**Purpose:** Power Bing search and Cortana
**Scale:** Billions of entities
**Special:** Focus on entities with "intent" (things users search for)

---

### 4. **Facebook Social Graph**

**Scale:** 3B+ users, trillions of connections
**Entities:** People, pages, events, photos
**Relationships:** friendOf, likes, attendedEvent, taggedIn

**Graph Search (deprecated but concept lives on):**
\`\`\`
Query: "Friends who work at Google and live in Seattle"

Graph traversal:
  Me → friendOf → ?person
  ?person → worksAt → Google
  ?person → livesIn → Seattle
\`\`\`

---

### 5. **Amazon Product Graph**

**Entities:** Products, categories, brands, features
**Relationships:** isRelatedTo, boughtTogether, similarTo
**Purpose:** Recommendations, search

**Example:**
\`\`\`
User views: "Sony WH-1000XM5 headphones"

Graph finds:
- Products boughtTogether: headphone case, audio cable
- Products similarTo: Bose QuietComfort, AirPods Max
- Products inCategory: Over-ear headphones
- Products withFeature: Noise cancellation

→ Show recommendations
\`\`\`

---

## Building Knowledge Graphs: From Text to Graph

### Step 1: Entity Extraction (Named Entity Recognition)

**Goal:** Identify entities in text

\`\`\`python
text = "Barack Obama was born in Honolulu, Hawaii in 1961."

# NER (using spaCy or similar)
entities = extract_entities(text)
# → [("Barack Obama", PERSON), ("Honolulu", PLACE), ("Hawaii", PLACE), ("1961", DATE)]
\`\`\`

### Step 2: Entity Linking (Disambiguation)

**Goal:** Link mentions to canonical entities

\`\`\`python
# "Apple" could be:
# - Apple Inc. (company)
# - Apple (fruit)
# - Apple Records (music label)

context = "Apple released the iPhone in 2007"
entity = disambiguate("Apple", context)
# → Apple Inc. (Q312) in Wikidata
\`\`\`

### Step 3: Relation Extraction

**Goal:** Identify relationships between entities

\`\`\`python
sentence = "Barack Obama was born in Honolulu."

relation = extract_relation(sentence)
# → (Barack_Obama, bornIn, Honolulu)
\`\`\`

**Approaches:**
- **Pattern-based:** "X was born in Y" → (X, bornIn, Y)
- **ML-based:** Train classifier on labeled data
- **LLM-based:** Use GPT/Claude for extraction

### Step 4: Knowledge Fusion

**Goal:** Merge facts from multiple sources

\`\`\`python
Source 1: Obama bornIn Honolulu
Source 2: Obama birthPlace Hawaii
Source 3: Barack_Obama birthLocation Honolulu

# Entity resolution: all refer to same person
# Relation alignment: bornIn ≈ birthPlace ≈ birthLocation

Merged: Obama bornIn Honolulu, Hawaii
\`\`\`

### Step 5: Quality Assurance

**Goal:** Validate facts

- **Consistency checking:** Does Obama have two birthplaces? (error)
- **Plausibility:** Is birthDate in the future? (error)
- **Source credibility:** Weight facts by source authority
- **Crowdsourcing:** Human verification (Wikidata model)

---

## Applications: Where KGs Shine

### 1. **Semantic Search**

**Traditional search:** Keyword matching
**KG-powered search:** Understanding and reasoning

\`\`\`
Query: "Obama's wife's profession"

KG reasoning:
1. Entity: Obama → Barack Obama
2. Relationship: spouse → Michelle Obama
3. Attribute: profession → Lawyer, Writer

Answer: "Michelle Obama is a lawyer and writer"
\`\`\`

### 2. **Question Answering**

**Simple QA:**
\`\`\`
Q: "How tall is the Eiffel Tower?"
KG: (Eiffel_Tower, height, 300m)
A: "300 meters"
\`\`\`

**Complex QA (multi-hop):**
\`\`\`
Q: "Who is the spouse of the 44th US President?"
KG path:
  44thPresident → heldBy → Obama
  Obama → spouse → Michelle Obama
A: "Michelle Obama"
\`\`\`

### 3. **Recommendation Systems**

**Collaborative filtering + KG:**
\`\`\`
User likes: "Inception" (movie)

KG paths:
- Inception → directedBy → Christopher Nolan
- Nolan → directed → "Interstellar", "The Dark Knight"
- Inception → hasGenre → Sci-Fi
- Sci-Fi → includesMovies → "The Matrix", "Blade Runner"

Recommend: Movies by Nolan OR Sci-Fi movies
\`\`\`

### 4. **Drug Discovery**

**Biomedical KGs:**
\`\`\`
Query: "Find drugs that treat diseases with similar symptoms to COVID-19"

KG reasoning:
- COVID-19 → hasSymptom → Fever, Cough
- ?disease → hasSymptom → Fever, Cough
- ?drug → treats → ?disease

Candidates: Antivirals used for similar respiratory diseases
\`\`\`

### 5. **Fraud Detection**

**Financial KGs:**
\`\`\`
Suspicious pattern:
- Person A → transfersTo → Person B
- Person B → transfersTo → Person C
- Person C → transfersTo → Person A
- All within 24 hours, amounts just below reporting threshold

Flag: Potential money laundering (circular transfer pattern)
\`\`\`

### 6. **Conversational AI**

**Context-aware responses:**
\`\`\`
User: "Tell me about Tesla"
Bot: "Tesla Inc. or Nikola Tesla?"
User: "The car company"

KG lookup:
- Tesla (company) → founded → 2003
- Tesla → founders → Elon Musk, ...
- Tesla → products → Model S, Model 3, ...

Bot: "Tesla Inc. was founded in 2003 by Elon Musk and others.
      They produce electric vehicles like the Model S and Model 3."
\`\`\`

---

## Summary: Why Knowledge Graphs Matter

**Key advantages:**
- ✅ **Explainability:** Trace reasoning paths through graph
- ✅ **Flexibility:** Add new entities/relationships without schema migration
- ✅ **Integration:** Merge data from heterogeneous sources
- ✅ **Reasoning:** Infer new facts via graph traversal
- ✅ **Context:** Understand entities in relation to others

**Real-world impact:**
- 🔍 **Search:** 30% of Google queries answered directly via KG
- 🛒 **E-commerce:** 35% revenue from KG-powered recommendations (Amazon)
- 🏥 **Healthcare:** Clinical decision support, drug discovery
- 💰 **Finance:** Fraud detection, risk assessment
- 🤖 **AI:** Grounding LLMs, reducing hallucination

**The future:** KGs + LLMs = Next generation of AI
- LLMs for generation
- KGs for facts and reasoning
- **Hybrid systems** = best of both worlds

**Next:** Let's dive into how to represent and query KGs efficiently!
`,
      examples: [
        {
          title: 'Simple Knowledge Graph in Python',
          description: 'A minimal knowledge graph implementation showing entity-relationship storage, indexing for fast lookup, and path finding between entities using BFS',
          code: `from typing import Dict, List, Set, Tuple

class SimpleKnowledgeGraph:
    """
    A basic knowledge graph implementation.

    Stores entities, relationships, and attributes.
    """

    def __init__(self):
        # Store triples: (subject, predicate, object)
        self.triples: Set[Tuple[str, str, str]] = set()

        # Index for fast lookup
        self.entity_relations: Dict[str, List[Tuple[str, str]]] = {}

    def add_triple(self, subject: str, predicate: str, obj: str):
        """Add a fact to the knowledge graph."""
        self.triples.add((subject, predicate, obj))

        # Update index
        if subject not in self.entity_relations:
            self.entity_relations[subject] = []
        self.entity_relations[subject].append((predicate, obj))

    def get_relations(self, entity: str) -> List[Tuple[str, str]]:
        """Get all relations for an entity."""
        return self.entity_relations.get(entity, [])

    def find_path(self, start: str, end: str, max_depth: int = 3) -> List[List[str]]:
        """
        Find paths between two entities using BFS.

        Returns list of paths, where each path is a list of:
        [entity1, relation1, entity2, relation2, ..., target]
        """
        from collections import deque

        queue = deque([(start, [start])])
        paths = []
        visited = set()

        while queue:
            current, path = queue.popleft()

            if len(path) // 2 >= max_depth:
                continue

            if current == end and len(path) > 1:
                paths.append(path)
                continue

            if current in visited:
                continue
            visited.add(current)

            # Explore neighbors
            for relation, neighbor in self.get_relations(current):
                if neighbor not in visited:
                    new_path = path + [relation, neighbor]
                    queue.append((neighbor, new_path))

        return paths

# Example usage
kg = SimpleKnowledgeGraph()

# Add facts about Obama
kg.add_triple("Obama", "type", "Person")
kg.add_triple("Obama", "bornIn", "Hawaii")
kg.add_triple("Obama", "wasPres", "44thPresident")
kg.add_triple("Obama", "spouse", "Michelle")

# Add facts about Hawaii
kg.add_triple("Hawaii", "type", "State")
kg.add_triple("Hawaii", "locatedIn", "USA")
kg.add_triple("Hawaii", "population", "1400000")

# Add facts about presidency
kg.add_triple("44thPresident", "instanceOf", "President")
kg.add_triple("President", "roleType", "HeadOfGovernment")

# Query: What are Obama's relations?
print("Obama's relations:")
for relation, value in kg.get_relations("Obama"):
    print(f"  {relation}: {value}")

# Query: Find path from Obama to USA
print("\\nPaths from Obama to USA:")
paths = kg.find_path("Obama", "USA")
for path in paths:
    print("  " + " → ".join(path))
# Output: Obama → bornIn → Hawaii → locatedIn → USA`,
        }
      ]
    },
    {
      id: 'kg-construction',
      title: '2. Building Knowledge Graphs: Practical Techniques',
      content: `## From Raw Data to Knowledge Graph

Building a KG is an engineering challenge. Let's walk through practical techniques used in production systems.

---

## Technique 1: Schema Design

**Before adding data, design your schema (ontology).**

### Entity Types (Classes)
\`\`\`turtle
# Core types
:Person  rdf:type  owl:Class .
:Organization  rdf:type  owl:Class .
:Location  rdf:type  owl:Class .
:Event  rdf:type  owl:Class .
:Product  rdf:type  owl:Class .

# Subtypes
:Company  rdfs:subClassOf  :Organization .
:University  rdfs:subClassOf  :Organization .
:City  rdfs:subClassOf  :Location .
:Country  rdfs:subClassOf  :Location .
\`\`\`

### Relationship Types (Properties)
\`\`\`turtle
# Person relationships
:bornIn  rdfs:domain  :Person ; rdfs:range  :Location .
:worksAt  rdfs:domain  :Person ; rdfs:range  :Organization .
:spouse  rdf:type  owl:SymmetricProperty .  # If A spouse B, then B spouse A

# Organization relationships
:locatedIn  rdfs:domain  :Organization ; rdfs:range  :Location .
:foundedBy  rdfs:domain  :Organization ; rdfs:range  :Person .
:owns  rdfs:domain  :Organization ; rdfs:range  :Organization .

# Inverse properties
:employeeOf  owl:inverseOf  :worksAt .
# If Person worksAt Company, then Company employeeOf Person (inferred)
\`\`\`

### Attributes (Data Properties)
\`\`\`turtle
:name  rdf:type  owl:DatatypeProperty ; rdfs:range  xsd:string .
:birthDate  rdf:type  owl:DatatypeProperty ; rdfs:range  xsd:date .
:revenue  rdf:type  owl:DatatypeProperty ; rdfs:range  xsd:decimal .
\`\`\`

**Design principles:**
- Start minimal, extend as needed
- Reuse existing vocabularies (schema.org, FOAF)
- Document entity/relationship semantics
- Plan for multi-source integration

---

## Technique 2: Entity Resolution

**Problem:** Same entity, different names

\`\`\`
Source 1: "Barack Obama"
Source 2: "Barack H. Obama"
Source 3: "President Obama"
Source 4: "Obama"

→ All refer to same person!
\`\`\`

**Solution approaches:**

### A) String Similarity
\`\`\`python
from difflib import SequenceMatcher

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

names = ["Barack Obama", "Barack H. Obama", "President Obama"]
threshold = 0.7

# Compare all pairs
for i, name1 in enumerate(names):
    for name2 in names[i+1:]:
        sim = similarity(name1, name2)
        if sim > threshold:
            print(f"Match: {name1} ≈ {name2} (sim={sim:.2f})")
\`\`\`

### B) Blocking + Matching
\`\`\`python
# Step 1: Blocking (reduce comparison space)
# Group by first name
blocks = {
    "Barack": ["Barack Obama", "Barack H. Obama"],
    "President": ["President Obama"]
}

# Step 2: Match within blocks only
for block_key, candidates in blocks.items():
    # Only compare within this block
    # Much faster than all-pairs
    ...
\`\`\`

### C) Embedding-Based
\`\`\`python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

names = ["Barack Obama", "Barack H. Obama", "President Obama", "Donald Trump"]
embeddings = model.encode(names)

# Compute similarity
from sklearn.metrics.pairwise import cosine_similarity

sim_matrix = cosine_similarity(embeddings)
# High similarity → likely same entity
\`\`\`

### D) Canonical URIs
**Best practice:** Assign canonical identifiers

\`\`\`turtle
# All refer to same URI
<http://dbpedia.org/resource/Barack_Obama>  foaf:name  "Barack Obama" .
<http://dbpedia.org/resource/Barack_Obama>  foaf:name  "Barack H. Obama" .
<http://dbpedia.org/resource/Barack_Obama>  foaf:name  "President Obama" .

# Aliases/alternate names stored as properties
\`\`\`

---

## Technique 3: Information Extraction from Text

### Pipeline Architecture

\`\`\`
Text → NER → Entity Linking → Relation Extraction → KG
\`\`\`

### Example: Full Pipeline

**Input text:**
> "Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976."

**Step 1: Named Entity Recognition**
\`\`\`python
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp(text)

entities = [(ent.text, ent.label_) for ent in doc.ents]
# [("Apple Inc.", "ORG"), ("Steve Jobs", "PERSON"),
#  ("Cupertino", "GPE"), ("California", "GPE"), ("1976", "DATE")]
\`\`\`

**Step 2: Entity Linking**
\`\`\`python
# Link to Wikidata
"Apple Inc." → wd:Q312
"Steve Jobs" → wd:Q19837
"Cupertino" → wd:Q49255
"California" → wd:Q99
\`\`\`

**Step 3: Relation Extraction**
\`\`\`python
# Pattern matching or ML
relations = [
    ("Apple Inc.", "foundedBy", "Steve Jobs"),
    ("Apple Inc.", "locatedIn", "Cupertino"),
    ("Cupertino", "locatedIn", "California"),
    ("Apple Inc.", "inception", "1976")
]
\`\`\`

**Step 4: Add to KG**
\`\`\`turtle
wd:Q312  rdf:type  :Company ;
        rdfs:label  "Apple Inc." ;
        :foundedBy  wd:Q19837 ;
        :locatedIn  wd:Q49255 ;
        :inception  "1976"^^xsd:gYear .

wd:Q19837  rdf:type  :Person ;
          rdfs:label  "Steve Jobs" .

wd:Q49255  rdf:type  :City ;
          rdfs:label  "Cupertino" ;
          :locatedIn  wd:Q99 .
\`\`\`

---

## Technique 4: Confidence Scores

**Not all facts are equally certain.**

\`\`\`python
class Fact:
    def __init__(self, subject, predicate, obj, confidence, source):
        self.subject = subject
        self.predicate = predicate
        self.object = obj
        self.confidence = confidence  # 0.0 to 1.0
        self.source = source

# Example facts with confidence
facts = [
    Fact("Obama", "bornIn", "Hawaii", 0.99, "Wikipedia"),
    Fact("Obama", "bornIn", "Kenya", 0.05, "UnverifiedBlog"),
    Fact("Obama", "height", "185cm", 0.85, "CelebrityHeights"),
]

# Filter by confidence threshold
high_conf_facts = [f for f in facts if f.confidence > 0.8]
\`\`\`

**Sources of confidence:**
- **Source reliability:** Wikipedia > random blog
- **Multiple sources:** 5 sources agree → high confidence
- **Extraction method:** Manual curation > automatic extraction
- **Temporal validity:** Recent facts > outdated facts

---

## Technique 5: Temporal Knowledge

**Facts change over time!**

\`\`\`turtle
# Reified statement (n-ary pattern)
:stmt1  rdf:type  rdf:Statement ;
       rdf:subject  :Obama ;
       rdf:predicate  :hasRole ;
       rdf:object  :President ;
       :startTime  "2009-01-20"^^xsd:date ;
       :endTime  "2017-01-20"^^xsd:date .

# Or use named graphs (quad store)
:Obama  :hasRole  :President .  # Triple
<http://ex.org/timeframe/2009-2017> :contains :stmt1 .  # Graph metadata
\`\`\`

**Query: "Who was US President in 2015?"**
\`\`\`sparql
SELECT ?person
WHERE {
    ?stmt rdf:subject ?person ;
         rdf:predicate :hasRole ;
         rdf:object :President ;
         :startTime ?start ;
         :endTime ?end .
    FILTER(?start <= "2015-01-01"^^xsd:date && ?end >= "2015-01-01"^^xsd:date)
}
# Result: Obama
\`\`\`

---

## Technique 6: Provenance Tracking

**Where did this fact come from?**

\`\`\`turtle
# Using W3C PROV ontology
:fact1  rdf:type  prov:Entity ;
       prov:wasGeneratedBy  :extraction_job_12345 ;
       prov:wasDerivedFrom  :wikipedia_dump_2023 ;
       prov:wasAttributedTo  :spacy_ner_model_v3 ;
       dcterms:created  "2023-11-15T10:30:00Z"^^xsd:dateTime .

# The actual fact
:Obama  :bornIn  :Hawaii .

# Link fact to provenance
:fact1  prov:value  "Obama bornIn Hawaii" .
\`\`\`

**Why provenance matters:**
- Debug extraction errors
- Update facts when source changes
- Comply with data regulations (GDPR)
- Trust assessment

---

## Production KG Architecture

**Typical pipeline:**

\`\`\`
┌─────────────┐
│  Raw Data   │ (Wikipedia, news, databases, APIs)
└──────┬──────┘
       │
       v
┌─────────────┐
│  Ingestion  │ (ETL, data cleaning)
└──────┬──────┘
       │
       v
┌─────────────┐
│ Extraction  │ (NER, relation extraction)
└──────┬──────┘
       │
       v
┌─────────────┐
│ Resolution  │ (Entity linking, deduplication)
└──────┬──────┘
       │
       v
┌─────────────┐
│   Fusion    │ (Merge from multiple sources)
└──────┬──────┘
       │
       v
┌─────────────┐
│    QA       │ (Validation, confidence scoring)
└──────┬──────┘
       │
       v
┌─────────────┐
│ KG Storage  │ (Triple store: Virtuoso, Neo4j, Amazon Neptune)
└──────┬──────┘
       │
       v
┌─────────────┐
│  Serving    │ (Query API, SPARQL endpoint)
└─────────────┘
\`\`\`

**Storage options:**

| System | Type | Scale | Query Language |
|--------|------|-------|----------------|
| **Neo4j** | Property graph | Billions | Cypher |
| **Virtuoso** | RDF store | Trillions | SPARQL |
| **Amazon Neptune** | Multi-model | Billions | SPARQL + Gremlin |
| **GraphDB** | RDF store | Billions | SPARQL |
| **JanusGraph** | Distributed | Trillions | Gremlin |

---

## Quality Metrics

**How good is your KG?**

### 1. Completeness
\`\`\`python
# % of expected facts present
total_entities = 1000000
entities_with_birthdate = 750000
completeness = entities_with_birthdate / total_entities
# 75% of people have birthdates
\`\`\`

### 2. Accuracy
\`\`\`python
# % of facts that are correct
sampled_facts = 1000
correct_facts = 950
accuracy = correct_facts / sampled_facts
# 95% accuracy
\`\`\`

### 3. Consistency
\`\`\`python
# No contradictions
check_constraints = [
    "No person has two birthplaces",
    "No organization founded before 1000 AD",
    "No person born after death date"
]
violations = run_consistency_checks()
consistency_score = 1 - (violations / total_facts)
\`\`\`

### 4. Timeliness
\`\`\`python
# How fresh is the data?
current_date = datetime.now()
avg_fact_age = (current_date - avg_last_updated).days
# Younger = better
\`\`\`

---

## Summary: KG Construction Best Practices

**Design:**
- ✅ Start with clear schema/ontology
- ✅ Reuse standard vocabularies
- ✅ Plan for evolution

**Extraction:**
- ✅ Use state-of-art NER/RE models
- ✅ Combine rule-based + ML approaches
- ✅ Human-in-the-loop for quality

**Integration:**
- ✅ Robust entity resolution
- ✅ Confidence scoring
- ✅ Provenance tracking

**Maintenance:**
- ✅ Continuous quality monitoring
- ✅ Incremental updates
- ✅ Version control

**The reality:** Building production KGs is hard! But the payoff is immense.

**Next:** Let's explore knowledge graph embeddings—how to make graphs amenable to machine learning! 🚀
`,
      examples: []
    }
  ],
  summary: [
    'Knowledge graphs represent real-world entities and relationships as graph-structured data',
    'Production KGs: Google (500B+ facts), Amazon product graph, Wikidata (100M entities)',
    'Construction: entity linking, relation extraction, knowledge fusion, quality assessment',
    'Applications: search, recommendations, question answering, drug discovery',
    'Challenges: scale, ambiguity, incompleteness, schema evolution'
  ],
  nextSteps: [
    'Learn knowledge graph embeddings (TransE, DistMult, ComplEx)',
    'Build a knowledge graph from scratch with entity/relationship storage',
    'Implement link prediction and multi-hop reasoning',
    'Explore production KG systems (Neo4j, Amazon Neptune)'
  ],
  checkYourUnderstanding: [
    {
      question: 'What is the difference between a knowledge graph and a relational database?',
      answer: 'KGs use flexible graph structure (nodes, edges) with varied schemas, optimized for relationships and multi-hop queries. RDBs use fixed tables with rigid schemas, optimized for structured data and joins. KGs excel at: heterogeneous data, evolving schemas, complex relationship queries.'
    },
    {
      question: 'How does Google use knowledge graphs for search?',
      answer: 'Google\'s Knowledge Graph (500B+ facts) powers knowledge panels, entity disambiguation, semantic search, and direct answers. Example: "who is Obama\'s wife" → KG lookup → Michelle Obama → structured answer with facts, images, related entities.'
    },
    {
      question: 'What are the main challenges in building production knowledge graphs?',
      answer: 'Scale (billions of entities), entity disambiguation (which "Jordan"?), relation extraction accuracy, schema evolution, data quality/freshness, and computational cost of reasoning/queries at scale.'
    },
    {
      question: 'Give an example of multi-hop reasoning in a knowledge graph.',
      answer: 'Query: "drugs treating diseases caused by bacteria resistant to penicillin". Requires 3 hops: (1) bacteria resistantTo penicillin, (2) bacteria causes disease, (3) drug treats disease. KG traversal finds answer paths through graph structure.'
    }
  ]
};