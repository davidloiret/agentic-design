import { TheoryLesson } from './types';

export const ontologyEngineeringLesson: TheoryLesson = {
  id: 'ontology-engineering',
  title: 'Ontology Engineering: Building Production-Quality Knowledge Systems',
  description: 'Learn systematic approaches to designing, building, and maintaining ontologies for real-world AI systems',
  learningObjectives: [
    'Learn the complete ontology engineering lifecycle from scoping to maintenance',
    'Master design patterns: class hierarchies, defined classes, property chains',
    'Understand best practices: modularity, naming conventions, documentation',
    'Avoid common anti-patterns that lead to brittle, unmaintainable ontologies'
  ],
  prerequisites: ['ontologies-introduction'],
  sections: [
    {
      id: 'ontology-lifecycle',
      title: '1. The Ontology Engineering Lifecycle',
      content: `## From Idea to Production: Building Ontologies Systematically

Building an ontology isn't just writing RDF triples. It's a systematic engineering process.

---

## The Ontology Development Lifecycle

### 1. **Specification Phase**
Define what your ontology should do.

**Key questions:**
- What domain does it cover? (e.g., medical diagnoses, e-commerce products)
- Who will use it? (humans, AI agents, search engines)
- What competency questions should it answer?
- What's the scope? (narrow/specific vs. broad/general)

**Example: Medical Diagnosis Ontology**
\`\`\`
Domain: Primary care medicine
Users: Clinical decision support system, EHR integration
Scope: Common conditions, symptoms, treatments, contraindications

Competency Questions (CQs):
- CQ1: What medications treat condition X?
- CQ2: What are contraindications for medication Y?
- CQ3: What symptoms are associated with disease Z?
- CQ4: Are medications A and B safe to combine?

Success criteria:
- Ontology + reasoner must be able to answer all CQs
- Coverage: 100 most common conditions
- Response time: < 100ms for typical queries
\`\`\`

### 2. **Conceptualization Phase**
Identify key concepts and relationships.

**Techniques:**

**A) Domain Expert Interviews**
\`\`\`
Interview: "What are the main types of medications?"

Expert: "Well, there are analgesics for pain, antibiotics for infections,
antihistamines for allergies..."

→ Concepts: Medication, Analgesic, Antibiotic, Antihistamine
→ Hierarchy: Medication > [Analgesic, Antibiotic, Antihistamine]
\`\`\`

**B) Text Analysis**
\`\`\`python
# Analyze domain documents (textbooks, papers, guidelines)
from collections import Counter

corpus = load_medical_textbooks()
terms = extract_noun_phrases(corpus)
freq = Counter(terms)

# Top terms become candidate concepts
print(freq.most_common(50))
# → ['medication', 'disease', 'symptom', 'treatment', 'diagnosis', ...]
\`\`\`

**C) Reuse Existing Ontologies**
\`\`\`
# Don't reinvent the wheel!
# Existing medical ontologies:
- SNOMED CT: 350K+ clinical terms
- ICD-10: Disease classifications
- RxNorm: Medications and drugs
- Gene Ontology: Molecular biology

Strategy: Import and extend, don't rebuild
\`\`\`

### 3. **Formalization Phase**
Convert concepts into formal ontology.

**Process:**
\`\`\`turtle
# 1. Define top-level classes
:Medication  rdf:type  owl:Class .
:Disease     rdf:type  owl:Class .
:Symptom     rdf:type  owl:Class .
:Treatment   rdf:type  owl:Class .

# 2. Build class hierarchy
:Analgesic      rdfs:subClassOf  :Medication .
:NSAID          rdfs:subClassOf  :Analgesic .
:Opioid         rdfs:subClassOf  :Analgesic .
:Antibiotic     rdfs:subClassOf  :Medication .

# 3. Define properties
:treats                 rdf:type  owl:ObjectProperty ;
                        rdfs:domain  :Medication ;
                        rdfs:range   :Disease .

:hasSymptom            rdf:type  owl:ObjectProperty ;
                        rdfs:domain  :Disease ;
                        rdfs:range   :Symptom .

:contraindicatedFor    rdf:type  owl:ObjectProperty ;
                        rdfs:domain  :Medication ;
                        rdfs:range   :Disease .

# 4. Add axioms (rules)
:NSAID  owl:equivalentClass  [
    rdf:type  owl:Restriction ;
    owl:onProperty  :hasEffect ;
    owl:someValuesFrom  :AntiInflammatory
] .

# 5. Create instances
:Aspirin  rdf:type  :NSAID ;
         :treats  :Headache, :Inflammation ;
         :contraindicatedFor  :BleedingDisorder .
\`\`\`

### 4. **Implementation Phase**
Choose tools and create the ontology.

**Tool options:**
- **Protégé:** Most popular GUI editor
- **TopBraid Composer:** Enterprise ontology IDE
- **VS Code + Turtle:** For developers
- **owlready2 (Python):** Programmatic creation

**Example: Protégé workflow**
\`\`\`
1. File → New → Create OWL Ontology
2. Set IRI: http://example.org/medical
3. Entities tab:
   - Add classes via Class hierarchy panel
   - Add properties via Object/Data Properties tabs
4. Description Logic tab:
   - Define complex class expressions
   - Add restrictions and axioms
5. Individuals tab:
   - Create instances
6. Reasoner → Pellet/HermiT:
   - Check consistency
   - Compute inferences
7. File → Export:
   - Turtle, RDF/XML, JSON-LD, etc.
\`\`\`

### 5. **Evaluation Phase**
Validate the ontology.

**Evaluation criteria:**

**A) Consistency Checking**
\`\`\`python
# Run reasoner to detect logical inconsistencies
onto = load_ontology("medical.owl")
sync_reasoner()

# Check for:
- Unsatisfiable classes (contradictions)
- Inconsistent individuals
- Unintended inferences
\`\`\`

**B) Competency Question Coverage**
\`\`\`sparql
# Can the ontology answer all CQs?

# CQ1: What medications treat headaches?
SELECT ?med
WHERE {
    ?med  rdf:type  :Medication ;
         :treats  :Headache .
}
# Expected: Aspirin, Ibuprofen, Acetaminophen
# Actual: Check results match expectations
\`\`\`

**C) Domain Expert Review**
\`\`\`
Present ontology to medical professionals:
- Are concepts correctly modeled?
- Are hierarchies accurate?
- Are relationships meaningful?
- Are there missing concepts?
\`\`\`

**D) Metrics**
\`\`\`python
# Quantitative evaluation
metrics = {
    'num_classes': count_classes(onto),
    'num_properties': count_properties(onto),
    'max_depth': max_hierarchy_depth(onto),
    'avg_depth': avg_hierarchy_depth(onto),
    'num_instances': count_individuals(onto),
    'num_axioms': count_axioms(onto)
}

# Good ontology characteristics:
# - Balanced tree (not too shallow or deep)
# - Rich axioms (not just taxonomy)
# - Well-connected (not isolated clusters)
\`\`\`

### 6. **Maintenance Phase**
Keep the ontology current.

**Versioning strategy:**
\`\`\`turtle
<http://example.org/medical>  rdf:type  owl:Ontology ;
    owl:versionIRI  <http://example.org/medical/v2.1> ;
    owl:versionInfo  "2.1.0" ;
    owl:priorVersion  <http://example.org/medical/v2.0> ;
    dcterms:created  "2024-01-15"^^xsd:date ;
    dcterms:modified  "2025-09-28"^^xsd:date ;
    rdfs:comment  "Added cardiovascular conditions and treatments" .
\`\`\`

**Change management:**
\`\`\`
- Use version control (Git)
- Document changes in changelog
- Deprecate rather than delete (for backwards compatibility)
- Test changes with reasoner
- Notify users of breaking changes
\`\`\`

---

## Summary: Lifecycle Phases

| Phase | Outputs | Tools |
|-------|---------|-------|
| **1. Specification** | Requirements doc, CQs | Interviews, domain analysis |
| **2. Conceptualization** | Concept map, glossary | Mind mapping, text mining |
| **3. Formalization** | OWL ontology (draft) | Protégé, owlready2 |
| **4. Implementation** | OWL file, documentation | Protégé, VS Code |
| **5. Evaluation** | Validation report | Reasoners, SPARQL queries |
| **6. Maintenance** | Updated versions | Git, issue tracking |

**Key insight:** Ontology engineering is iterative. You'll cycle through these phases multiple times!
`,
      examples: []
    },
    {
      id: 'best-practices',
      title: '2. Best Practices and Design Patterns',
      content: `## Proven Patterns for Building Great Ontologies

Let's learn from the successes (and failures) of thousands of ontologies.

---

## Core Design Principles

### 1. **Clarity: Make Meaning Explicit**

**Bad:**
\`\`\`turtle
# Ambiguous class names
:Thing1  rdf:type  owl:Class .
:Thing2  rdf:type  owl:Class .
:relatedTo  rdf:type  owl:ObjectProperty .
\`\`\`

**Good:**
\`\`\`turtle
# Clear, unambiguous names
:Medication  rdf:type  owl:Class ;
    rdfs:label  "Medication"@en ;
    rdfs:comment  "A substance used to treat, cure, prevent, or diagnose disease"@en .

:Disease  rdf:type  owl:Class ;
    rdfs:label  "Disease"@en ;
    rdfs:comment  "An abnormal condition affecting the body of an organism"@en .

:treats  rdf:type  owl:ObjectProperty ;
    rdfs:label  "treats"@en ;
    rdfs:comment  "Relates a medication to a disease it is used to treat"@en ;
    rdfs:domain  :Medication ;
    rdfs:range   :Disease .
\`\`\`

**Guidelines:**
- Use descriptive names (Medication not Med, treats not rel)
- Add labels and comments for all entities
- Include examples in comments
- Define domain and range explicitly

---

### 2. **Coherence: Use Consistent Naming Conventions**

**Naming conventions:**
\`\`\`turtle
# Classes: PascalCase (noun phrases)
:Medication, :ChronicDisease, :BloodPressureMedication

# Properties: camelCase (verbs for object properties)
:treats, :hasSymptom, :contraindicatedFor

# Instances: camelCase or snake_case
:aspirinTablet, :patient_12345, :condition_hypertension

# Namespaces: lowercase with dashes
@prefix med: <http://example.org/medical/> .
@prefix drug-interaction: <http://example.org/drug-interaction/> .
\`\`\`

**Consistency matters:**
\`\`\`turtle
# Bad: Inconsistent naming
:medication_1  :Treats  :Disease .
:Medicine  :has-symptom  :pain .

# Good: Consistent pattern
:Medication  :treats      :Disease .
:Disease     :hasSymptom  :Symptom .
\`\`\`

---

### 3. **Modularity: Divide and Conquer**

**Bad: Monolithic ontology**
\`\`\`turtle
# Everything in one huge file (20,000 lines)
medical-ontology.owl:
  - Medications
  - Diseases
  - Anatomy
  - Procedures
  - Lab tests
  - Insurance
  - Billing codes
  - ...
\`\`\`

**Good: Modular design**
\`\`\`turtle
# Core ontology (upper-level concepts)
medical-core.owl:
  :MedicalEntity, :MedicalProcedure, :MedicalCondition

# Domain modules
medications.owl:
  imports: medical-core.owl
  :Medication, :Analgesic, :Antibiotic, ...

diseases.owl:
  imports: medical-core.owl
  :Disease, :Symptom, :ChronicDisease, ...

treatments.owl:
  imports: medical-core.owl, medications.owl, diseases.owl
  :Treatment, :treats, :contraindicatedFor, ...
\`\`\`

**Benefits:**
- ✅ Easier to maintain
- ✅ Parallel development (different teams)
- ✅ Selective import (use only what you need)
- ✅ Faster reasoning (smaller modules)

---

### 4. **Reusability: Don't Reinvent the Wheel**

**Existing ontologies to reuse:**

**Upper ontologies** (top-level concepts):
- **BFO (Basic Formal Ontology):** entities, processes, qualities
- **DOLCE:** objects, events, regions
- **SUMO:** comprehensive upper ontology

**Domain ontologies:**
- **FOAF:** People, social networks
- **Dublin Core:** Metadata (title, creator, date)
- **schema.org:** Web markup (products, events, organizations)
- **SNOMED CT:** Medical terminology
- **ChEBI:** Chemical entities
- **GO:** Gene functions

**Example: Importing FOAF**
\`\`\`turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix med: <http://example.org/medical/> .

# Reuse FOAF for people
:Patient  rdfs:subClassOf  foaf:Person .
:Physician  rdfs:subClassOf  foaf:Person .

# Extend with domain properties
:treatedBy  rdfs:domain  :Patient ;
           rdfs:range   :Physician ;
           rdfs:subPropertyOf  foaf:knows .
\`\`\`

**Import statement:**
\`\`\`turtle
<http://example.org/medical>  rdf:type  owl:Ontology ;
    owl:imports  <http://xmlns.com/foaf/0.1/> .
\`\`\`

---

### 5. **Minimal Commitment: Keep It Simple**

**Principle:** Include only what's necessary. Don't over-engineer.

**Bad: Over-specified**
\`\`\`turtle
# Too much detail for most use cases
:Aspirin  :hasMolecularFormula  "C9H8O4" ;
         :hasMolarMass  "180.16 g/mol" ;
         :hasMeltingPoint  "135 °C" ;
         :hasBoilingPoint  "140 °C" ;
         :hasDensity  "1.40 g/cm³" ;
         :hasSolubility  "3 mg/mL in water at 25 °C" ;
         # ... 50 more properties
\`\`\`

**Good: Essential properties only**
\`\`\`turtle
# What's needed for clinical decision support
:Aspirin  rdf:type  :NSAID ;
         :treats  :Pain, :Inflammation, :Fever ;
         :contraindicatedFor  :BleedingDisorder, :ChildrenUnder12 ;
         :commonDosage  "325-650 mg every 4-6 hours" .

# If needed, link to chemistry ontology for details
:Aspirin  owl:sameAs  chebi:Aspirin .
\`\`\`

**Ask: "What decisions does this property enable?"**
- If no decision depends on it → probably unnecessary
- Focus on competency questions

---

### 6. **Hierarchies: Balance Depth and Breadth**

**Bad: Too shallow**
\`\`\`turtle
:Medication
    ├── :Aspirin
    ├── :Ibuprofen
    ├── :Morphine
    ├── :Penicillin
    └── :Insulin
    # (100 direct subclasses)
\`\`\`

**Bad: Too deep**
\`\`\`turtle
:Medication
  └── :Drug
      └── :TherapeuticDrug
          └── :OralDrug
              └── :PainReliever
                  └── :NonOpioidPainReliever
                      └── :NSAID
                          └── :OverTheCounterNSAID
                              └── :Aspirin
\`\`\`

**Good: Balanced**
\`\`\`turtle
:Medication
    ├── :Analgesic
    │   ├── :NSAID (:Aspirin, :Ibuprofen)
    │   └── :Opioid (:Morphine, :Codeine)
    ├── :Antibiotic
    │   ├── :Penicillin
    │   └── :Cephalosporin
    ├── :Antidiabetic
    │   └── :Insulin
    └── :Cardiovascular
        ├── :Antihypertensive
        └── :Statin
\`\`\`

**Rules of thumb:**
- Depth: 5-7 levels max
- Breadth: 5-12 children per parent
- Use multiple hierarchies if needed (faceted classification)

---

## Common Design Patterns

### Pattern 1: Defined Classes (Necessary & Sufficient Conditions)

**Problem:** You want classes auto-populated based on properties.

\`\`\`turtle
# Instead of manual assignment:
:Aspirin  rdf:type  :NSAID .  # Manual

# Define NSAID by properties:
:NSAID  owl:equivalentClass  [
    rdf:type  owl:Class ;
    owl:intersectionOf (
        :Medication
        [
            rdf:type  owl:Restriction ;
            owl:onProperty  :hasEffect ;
            owl:someValuesFrom  :AntiInflammatory
        ]
        [
            rdf:type  owl:Restriction ;
            owl:onProperty  :inhibits ;
            owl:hasValue  :CyclooxygenaseEnzyme
        ]
    )
] .

# Now, if you say:
:NewDrugX  rdf:type  :Medication ;
          :hasEffect  :AntiInflammatory ;
          :inhibits  :CyclooxygenaseEnzyme .

# Reasoner infers:
:NewDrugX  rdf:type  :NSAID .  # Automatic!
\`\`\`

**When to use:** Classes with clear, objective criteria.

---

### Pattern 2: Value Partitions

**Problem:** Property can only have values from a specific set.

\`\`\`turtle
# Define allowed values
:MedicationForm  rdf:type  owl:Class ;
    owl:oneOf (:Tablet :Capsule :Liquid :Injection :Topical) .

:Medication  rdfs:subClassOf  [
    rdf:type  owl:Restriction ;
    owl:onProperty  :hasForm ;
    owl:allValuesFrom  :MedicationForm
] .

# Now only these values are valid
:Aspirin  :hasForm  :Tablet .  # Valid
:Aspirin  :hasForm  :Powder .  # Invalid (reasoner detects inconsistency)
\`\`\`

**When to use:** Controlled vocabularies, enumerations.

---

### Pattern 3: Property Chains

**Problem:** Derive transitive relationships.

\`\`\`turtle
# Define chain: if A locatedIn B, and B locatedIn C, then A locatedIn C
:locatedIn  owl:propertyChainAxiom  (:locatedIn :locatedIn) .

# Facts:
:HeadachePain  :locatedIn  :Head .
:Head  :locatedIn  :Body .

# Inferred:
:HeadachePain  :locatedIn  :Body .

# Application: "Symptoms affecting the cardiovascular system"
SELECT ?symptom
WHERE {
    ?symptom  :locatedIn  :CardiovascularSystem .
}
# Includes symptoms in heart, arteries, veins (all located in cardiovascular system)
\`\`\`

---

### Pattern 4: Closure Axioms

**Problem:** Make "closed world" assumptions explicit.

\`\`\`turtle
# "Aspirin treats ONLY pain-related conditions"
:Aspirin  rdfs:subClassOf  [
    rdf:type  owl:Restriction ;
    owl:onProperty  :treats ;
    owl:allValuesFrom  :PainRelatedCondition
] .

# If someone adds:
:Aspirin  :treats  :Diabetes .

# Reasoner detects: INCONSISTENT
# (Diabetes is not a PainRelatedCondition)
\`\`\`

**When to use:** Enforce domain constraints, catch errors.

---

## Summary: Design Principles Checklist

Before finalizing your ontology:

- ✅ **Clear** names, labels, comments?
- ✅ **Consistent** naming conventions?
- ✅ **Modular** structure (not monolithic)?
- ✅ **Reuses** existing ontologies where possible?
- ✅ **Minimal** (no unnecessary complexity)?
- ✅ **Balanced** hierarchies (not too deep/shallow)?
- ✅ **Defined classes** for auto-classification?
- ✅ **Documented** with examples and use cases?
- ✅ **Versioned** and maintained?
- ✅ **Tested** with reasoner and queries?

**Next:** Let's learn what NOT to do—common pitfalls!
`,
      examples: [
        {
          title: 'Modular Ontology with Imports',
          description: 'Design a modular medical ontology with separate files for core concepts, medications, and treatments, connected via OWL imports for maintainability',
          code: `@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix med: <http://example.org/medical/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

# medical-core.owl - Core concepts
<http://example.org/medical/core>  rdf:type  owl:Ontology ;
    rdfs:label  "Medical Core Ontology" ;
    rdfs:comment  "Upper-level concepts for medical domain" .

med:MedicalEntity  rdf:type  owl:Class ;
    rdfs:label  "Medical Entity" ;
    rdfs:comment  "Top-level class for all medical concepts" .

med:MedicalProcedure  rdfs:subClassOf  med:MedicalEntity .
med:MedicalCondition  rdfs:subClassOf  med:MedicalEntity .

# medications.owl - Medication module
<http://example.org/medical/medications>  rdf:type  owl:Ontology ;
    rdfs:label  "Medications Ontology" ;
    owl:imports  <http://example.org/medical/core> .

med:Medication  rdfs:subClassOf  med:MedicalEntity ;
    rdfs:label  "Medication" ;
    rdfs:comment  "A substance used to treat disease" .

med:Analgesic  rdfs:subClassOf  med:Medication ;
    rdfs:label  "Analgesic" ;
    rdfs:comment  "Pain-relieving medication" .

med:NSAID  rdfs:subClassOf  med:Analgesic ;
    rdfs:label  "NSAID" ;
    rdfs:comment  "Non-Steroidal Anti-Inflammatory Drug" .

# treatments.owl - Treatment relationships
<http://example.org/medical/treatments>  rdf:type  owl:Ontology ;
    rdfs:label  "Medical Treatments Ontology" ;
    owl:imports  <http://example.org/medical/core>,
                <http://example.org/medical/medications> .

med:treats  rdf:type  owl:ObjectProperty ;
    rdfs:domain  med:Medication ;
    rdfs:range   med:MedicalCondition ;
    rdfs:label  "treats" ;
    rdfs:comment  "Relates medication to condition it treats" .

# Usage: Import only what you need
# Small app: import medications.owl only
# Full system: import treatments.owl (brings in others via owl:imports)`,
        }
      ]
    },
    {
      id: 'pitfalls',
      title: '3. Common Pitfalls and Anti-Patterns',
      content: `## Learn from Others' Mistakes: What NOT to Do

Let's examine common ontology design failures and how to avoid them.

---

## Anti-Pattern 1: Classes as Instances (Metaclass Confusion)

**Problem:** Confusing types with instances.

**Bad:**
\`\`\`turtle
# Color as a class
:Red  rdf:type  owl:Class .
:Blue  rdf:type  owl:Class .
:Green  rdf:type  owl:Class .

# Now what? Can't easily say "car has color Red"
:MyCar  rdf:type  :Red .  # Wrong! Car is not an instance of Red
\`\`\`

**Good:**
\`\`\`turtle
# Color as an enumeration of instances
:Color  rdf:type  owl:Class ;
    owl:oneOf (:Red :Blue :Green) .

:Red    rdf:type  :Color .
:Blue   rdf:type  :Color .
:Green  rdf:type  :Color .

:hasColor  rdf:type  owl:ObjectProperty ;
    rdfs:range  :Color .

# Now it works!
:MyCar  rdf:type  :Car ;
       :hasColor  :Red .  # Correct!
\`\`\`

**Rule:** If you can point to specific things (red objects, not "redness itself"), make it an instance.

---

## Anti-Pattern 2: Over-Proliferation of Properties

**Problem:** Creating too many similar properties.

**Bad:**
\`\`\`turtle
# Separate property for every relationship
:treatsHeadache  rdf:type  owl:ObjectProperty .
:treatsFever     rdf:type  owl:ObjectProperty .
:treatsPain      rdf:type  owl:ObjectProperty .
# ... 100 more

:Aspirin  :treatsHeadache  :Headache ;
         :treatsFever      :Fever ;
         :treatsPain       :Pain .
\`\`\`

**Good:**
\`\`\`turtle
# Single generic property
:treats  rdf:type  owl:ObjectProperty ;
        rdfs:domain  :Medication ;
        rdfs:range   :Condition .

:Aspirin  :treats  :Headache, :Fever, :Pain .

# If you need specificity, use qualifiers or sub-properties
:stronglyTreats  rdfs:subPropertyOf  :treats .
:Aspirin  :stronglyTreats  :Inflammation .
\`\`\`

**Rule:** Start with general properties, specialize only when needed.

---

## Anti-Pattern 3: Redundant Class Hierarchies

**Problem:** Multiple overlapping hierarchies.

**Bad:**
\`\`\`turtle
# Hierarchy 1: By mechanism
:Medication
  ├── :EnzymeInhibitor
  └── :ReceptorBlocker

# Hierarchy 2: By target (overlapping!)
:Medication
  ├── :CardiovascularDrug
  └── :PainReliever

# Now: Is Aspirin an EnzymeInhibitor or PainReliever? Both!
# Multiple inheritance creates confusion
\`\`\`

**Good: Use faceted classification**
\`\`\`turtle
# Primary hierarchy: therapeutic use
:Medication
  ├── :Analgesic
  ├── :Cardiovascular
  └── :Antibiotic

# Properties for other facets
:hasMechanism  rdf:type  owl:ObjectProperty .
:targetsSyste m  rdf:type  owl:ObjectProperty .

:Aspirin  rdf:type  :Analgesic ;
         :hasMechanism  :EnzymeInhibition ;
         :targetsSystem  :CardiovascularSystem .

# Or use defined classes:
:CardiovascularDrug  owl:equivalentClass  [
    owl:intersectionOf (
        :Medication
        [:onProperty :targetsSystem ; :hasValue :CardiovascularSystem]
    )
] .
\`\`\`

**Rule:** One primary hierarchy + properties/defined classes for other dimensions.

---

## Anti-Pattern 4: Overuse of owl:equivalentClass

**Problem:** Declaring unrelated things equivalent.

**Bad:**
\`\`\`turtle
# These are NOT equivalent!
:Medicine  owl:equivalentClass  :Drug .
:Medicine  owl:equivalentClass  :Pharmaceutical .
:Medicine  owl:equivalentClass  :Remedy .

# This means: Medicine = Drug = Pharmaceutical = Remedy
# But they have different meanings!
\`\`\`

**Good:**
\`\`\`turtle
# If they're truly synonyms in YOUR domain:
:Medication  owl:equivalentClass  :Drug .

# If they're similar but not identical:
:Medicine  rdfs:subClassOf  :TherapeuticSubstance .
:Drug      rdfs:subClassOf  :TherapeuticSubstance .
:Pharmaceutical  rdfs:subClassOf  :TherapeuticSubstance .

# Or use skos:exactMatch for alignment (not equivalence):
:Medicine  skos:exactMatch  :Drug .
\`\`\`

**Rule:** Use equivalentClass only when classes are **truly interchangeable** in all contexts.

---

## Anti-Pattern 5: Lack of Disjointness Axioms

**Problem:** Allowing illogical combinations.

**Bad:**
\`\`\`turtle
# No constraints
:Medication  rdf:type  owl:Class .
:Disease     rdf:type  owl:Class .

# Reasoner allows this nonsense:
:Aspirin  rdf:type  :Medication, :Disease .  # Huh?!
\`\`\`

**Good:**
\`\`\`turtle
# Declare disjointness
:Medication  owl:disjointWith  :Disease .

# Now this is inconsistent:
:Aspirin  rdf:type  :Medication, :Disease .
# Reasoner: ERROR - Aspirin can't be both!
\`\`\`

**Rule:** Always declare disjoint classes for mutually exclusive concepts.

---

## Anti-Pattern 6: Ignoring Domain and Range

**Problem:** Properties with undefined domain/range.

**Bad:**
\`\`\`turtle
# No constraints
:treats  rdf:type  owl:ObjectProperty .

# Reasoner allows nonsense:
:Table  :treats  :ChairColor .  # Meaningless!
\`\`\`

**Good:**
\`\`\`turtle
# Define domain and range
:treats  rdf:type  owl:ObjectProperty ;
        rdfs:domain  :Medication ;
        rdfs:range   :Disease .

# Now this is caught:
:Table  :treats  :ChairColor .
# Reasoner infers:
#   :Table is a :Medication (from domain)
#   :ChairColor is a :Disease (from range)
# If :Table is explicitly :Furniture → INCONSISTENT!
\`\`\`

**Rule:** Always define domain and range for properties.

---

## Anti-Pattern 7: String Soup (Using Strings Instead of URIs)

**Problem:** Representing concepts as strings.

**Bad:**
\`\`\`turtle
:Aspirin  :treats  "headache" .  # String literal
:Ibuprofen  :treats  "Headache" .  # Different string (capitalization)

# Can't query effectively:
SELECT ?med WHERE { ?med :treats "headache" }
# Misses Ibuprofen!
\`\`\`

**Good:**
\`\`\`turtle
:Headache  rdf:type  :Disease .
:Aspirin   :treats  :Headache .  # URI reference
:Ibuprofen :treats  :Headache .  # Same URI

# Now queries work:
SELECT ?med WHERE { ?med :treats :Headache }
# Returns both Aspirin and Ibuprofen
\`\`\`

**Rule:** Concepts = URIs, not strings. Use literals only for true values (names, dates, numbers).

---

## Anti-Pattern 8: N-ary Relations as Properties

**Problem:** Trying to model complex relationships with binary properties.

**Bad:**
\`\`\`turtle
# How to represent "Aspirin treats Headache with dosage 500mg every 6 hours"?
:Aspirin  :treats  :Headache .
:Aspirin  :dosage  "500mg" .  # But dosage is specific to treating headaches!

# What if Aspirin treats Fever with different dosage?
:Aspirin  :treats  :Fever .
:Aspirin  :dosage  "325mg" .  # Overwrites previous dosage! Wrong!
\`\`\`

**Good: Use reification or qualified relations**
\`\`\`turtle
# Create an intermediate "Treatment" instance
:Treatment_1  rdf:type  :Treatment ;
             :medication  :Aspirin ;
             :condition   :Headache ;
             :dosage      "500mg" ;
             :frequency   "every 6 hours" .

:Treatment_2  rdf:type  :Treatment ;
             :medication  :Aspirin ;
             :condition   :Fever ;
             :dosage      "325mg" ;
             :frequency   "every 4 hours" .
\`\`\`

**Rule:** For relationships with additional attributes, create intermediate entities.

---

## Anti-Pattern 9: Ontology as Database Schema

**Problem:** Treating ontology like SQL schema.

**Bad:**
\`\`\`turtle
# Just mimicking database tables
:Patient  rdf:type  owl:Class ;
    rdfs:subClassOf  [
        owl:onProperty  :hasFirstName ; owl:cardinality 1 ;
    ] , [
        owl:onProperty  :hasLastName ; owl:cardinality 1 ;
    ] , [
        owl:onProperty  :hasBirthDate ; owl:cardinality 1 ;
    ] , [
        owl:onProperty  :hasSSN ; owl:cardinality 1 ;
    ] .

# This is just a schema, not an ontology!
# No semantics, reasoning, or domain knowledge
\`\`\`

**Good: Add semantic richness**
\`\`\`turtle
# Define meaningful relationships and rules
:Patient  rdfs:subClassOf  foaf:Person ;
    rdfs:subClassOf  [
        owl:onProperty  :hasDiagnosis ;
        owl:someValuesFrom  :Disease
    ] .

# Defined class: A patient with chronic condition
:ChronicPatient  owl:equivalentClass  [
    owl:intersectionOf (
        :Patient
        [:onProperty :hasDiagnosis ; :someValuesFrom :ChronicDisease]
    )
] .

# Rule: If patient has diabetes, require regular checkups
:DiabeticPatient  rdfs:subClassOf  [
    owl:onProperty  :requiresCheckup ;
    owl:hasValue  :RegularMonitoring
] .
\`\`\`

**Rule:** Ontologies model **meaning** and enable **reasoning**, not just data structure.

---

## Anti-Pattern 10: Forgetting Documentation

**Problem:** No comments, labels, or examples.

**Bad:**
\`\`\`turtle
:C1  rdfs:subClassOf  :C2 .
:p1  rdfs:domain  :C1 ; rdfs:range  :C3 .
\`\`\`

**Good:**
\`\`\`turtle
:Medication  rdf:type  owl:Class ;
    rdfs:label  "Medication"@en ;
    rdfs:comment  """A substance used to diagnose, cure, treat, or prevent disease.
    Examples: Aspirin, Penicillin, Insulin."""@en ;
    rdfs:seeAlso  <https://www.fda.gov/drugs> .

:treats  rdf:type  owl:ObjectProperty ;
    rdfs:domain  :Medication ;
    rdfs:range   :Disease ;
    rdfs:label  "treats"@en ;
    rdfs:comment  "Relates a medication to a disease it is used to treat."@en ;
    skos:example  ":Aspirin :treats :Headache" .
\`\`\`

**Rule:** Document everything! Your future self (and others) will thank you.

---

## Validation Checklist

Before deploying your ontology:

### Logical Consistency
- ✅ Run reasoner (Pellet, HermiT)
- ✅ No unsatisfiable classes
- ✅ No inconsistent individuals

### Modeling Quality
- ✅ Domain and range defined for all properties
- ✅ Disjoint classes declared
- ✅ Balanced hierarchies (not too deep/flat)
- ✅ No redundant or overlapping hierarchies

### Documentation
- ✅ Labels for all classes/properties
- ✅ Comments explaining purpose
- ✅ Examples for complex constructs

### Competency Questions
- ✅ Can answer all CQs via SPARQL
- ✅ Queries return expected results
- ✅ Domain expert validation

---

## Summary: Mistakes to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| **Classes as Instances** | Type confusion | Use instances for specific things |
| **Property Proliferation** | Too many similar properties | Use general properties, specialize sparingly |
| **Redundant Hierarchies** | Overlapping classifications | One hierarchy + properties/defined classes |
| **Overuse of Equivalence** | Unintended consequences | Use only for true synonyms |
| **No Disjointness** | Allows illogical combinations | Declare disjoint classes |
| **Missing Domain/Range** | Unconstrained properties | Always define domain and range |
| **String Soup** | Can't query/reason effectively | Use URIs for concepts |
| **N-ary as Binary** | Can't model complex relations | Use reification/intermediate entities |
| **Ontology as Schema** | No semantic value | Add axioms and reasoning |
| **No Documentation** | Unusable by others | Document everything |

**Key insight:** Ontology engineering is a **craft**. Learn from these anti-patterns, and your ontologies will be robust, maintainable, and valuable.

**Next:** Let's put these principles into practice with code challenges! 🚀
`,
      examples: []
    }
  ],
  summary: [
    'Ontology engineering lifecycle: define scope, reuse existing ontologies, build iteratively, evaluate continuously',
    'Design patterns: class hierarchies, defined classes, property chains, modular imports',
    'Best practices: single inheritance, clear naming, domain/range constraints, comprehensive documentation',
    'Anti-patterns: classes as instances, property proliferation, missing disjointness, strings instead of URIs',
    'Production quality: versioned, tested with reasoners, well-documented, incrementally updated'
  ],
  nextSteps: [
    'Build an ontology-based reasoning system with consistency checking',
    'Implement automatic classification with defined classes',
    'Practice ontology design patterns on real-world domains',
    'Explore ontology tools: Protégé, Owlready2, ROBOT'
  ],
  checkYourUnderstanding: [
    {
      question: 'What are the key steps in the ontology engineering lifecycle?',
      answer: '1) Define scope/competency questions, 2) Reuse existing ontologies, 3) Enumerate terms/hierarchy, 4) Define properties/constraints, 5) Create instances, 6) Evaluate with reasoners and queries. Iterate continuously based on feedback.'
    },
    {
      question: 'What is a defined class and why use it?',
      answer: 'Defined class: necessary + sufficient conditions for membership (intersectionOf, restrictions). Reasoner automatically classifies instances. Example: NSAID = Medication AND hasEffect someValuesFrom AntiInflammatory. Benefits: automatic classification, consistency checking, explicit semantics.'
    },
    {
      question: 'What is the "classes as instances" anti-pattern?',
      answer: 'Mistake: treating specific things as classes (e.g., "Aspirin" as class). Correct: Aspirin is instance of class Medication. Rule: if it has properties (dosage, price), it’s an instance. Classes define categories, instances are specific things.'
    },
    {
      question: 'How do you handle n-ary relations in OWL (which only supports binary)?',
      answer: 'Use reification: create intermediate class representing the relation. Example: instead of (Drug, treats, Disease, dosage, frequency), create Treatment class with properties: hasDrug, hasDisease, hasDosage, hasFrequency. Allows capturing all relation aspects.'
    }
  ]
};