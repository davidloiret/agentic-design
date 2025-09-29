import { TheoryLesson } from './types';

export const firstOrderLogicLesson: TheoryLesson = {
  id: 'first-order-logic',
  title: 'First-Order Logic & Predicates',
  description: 'Master quantifiers, predicates, and formal reasoning - the language of AI knowledge representation',
  learningObjectives: [
    'Understand what first-order logic (FOL) is and why it\'s more powerful than propositional logic',
    'Master predicates and their role in expressing properties and relationships',
    'Learn universal (∀) and existential (∃) quantifiers',
    'Translate between natural language and formal FOL expressions',
    'Apply FOL to AI knowledge representation and automated reasoning'
  ],
  prerequisites: ['Propositional logic basics', 'Set theory fundamentals'],
  sections: [
    {
      id: 'from-propositional-to-fol',
      title: '1. From Propositional to First-Order Logic',
      content: `## The Limitations of Propositional Logic

**Propositional logic** lets us reason about simple statements:
- P: "It is raining"
- Q: "I carry an umbrella"
- P → Q: "If it is raining, then I carry an umbrella"

But propositional logic can't express:
- **Properties**: "x is even", "y is prime", "z is a cat"
- **Relationships**: "x is greater than y", "Alice knows Bob"
- **Quantification**: "All humans are mortal", "Some birds can fly"

**First-order logic (FOL)** extends propositional logic with:
1. **Predicates**: Express properties and relationships
2. **Variables**: Represent objects in a domain
3. **Quantifiers**: Express "for all" and "there exists"
4. **Functions**: Map objects to other objects

This makes FOL the foundation of AI knowledge representation, automated theorem proving, and logic programming (Prolog).`,
      examples: [
        {
          title: 'Propositional Logic is Too Rigid',
          description: 'Why we need first-order logic',
          code: `# Propositional Logic - Each statement is atomic:
P1 = "Socrates is mortal"
P2 = "Plato is mortal"
P3 = "Aristotle is mortal"
# ...thousands more statements for each human!

# Can't express the general rule:
"All humans are mortal"

# First-Order Logic - Express patterns:
Human(x) → Mortal(x)  # For all x, if x is human, x is mortal
Human(Socrates)        # Socrates is human
# Therefore: Mortal(Socrates) ✓ (automatically derived!)

# FOL lets us reason about infinite domains with finite rules`
        },
        {
          title: 'Knowledge That Propositional Logic Cannot Capture',
          description: 'Real-world scenarios requiring FOL',
          code: `# Database queries need FOL:
# "Find all students who passed every course"
∀c (Course(c) → Passed(student, c))

# Family relationships need FOL:
# "Everyone has a biological mother"
∀x ∃y (Mother(y, x))

# Social networks need FOL:
# "Alice's friends are also Bob's friends"
∀x (Friend(Alice, x) → Friend(Bob, x))

# Type systems need FOL:
# "All lists contain elements of the same type"
∀L ∀x ∀y (InList(x, L) ∧ InList(y, L) → SameType(x, y))`
        }
      ],
      keyPoints: [
        'Propositional logic has atomic statements; FOL has internal structure',
        'FOL can express properties, relationships, and patterns',
        'FOL is the foundation of knowledge representation in AI',
        'FOL enables reasoning about infinite domains with finite rules'
      ]
    },
    {
      id: 'predicates',
      title: '2. Predicates: Properties and Relationships',
      content: `## What is a Predicate?

A **predicate** is a function that takes arguments and returns **true** or **false**.

**Notation**: P(x), Q(x, y), R(x, y, z)

**Types of Predicates:**

1. **Unary predicates** (1 argument) - express properties:
   - Cat(x): "x is a cat"
   - Even(n): "n is even"
   - Prime(p): "p is prime"

2. **Binary predicates** (2 arguments) - express relationships:
   - Loves(x, y): "x loves y"
   - GreaterThan(x, y): "x > y"
   - ParentOf(x, y): "x is parent of y"

3. **n-ary predicates** (n arguments) - complex relationships:
   - Between(x, y, z): "x is between y and z"
   - Transfer(account1, account2, amount): "transfer amount from account1 to account2"

**Domain of Discourse:**
The set of objects we're reasoning about. For example:
- Domain: {1, 2, 3, 4, 5}
- Predicate: Even(x)
- Even(2) is **true**, Even(3) is **false**`,
      examples: [
        {
          title: 'Predicates in AI and Databases',
          description: 'How predicates model real-world knowledge',
          code: `# Social Network Knowledge Base
Person(alice)
Person(bob)
Person(charlie)
Friend(alice, bob)
Friend(bob, charlie)
Age(alice, 25)
Age(bob, 30)

# Queries using predicates:
# "Is Alice a person?" → Person(alice) → true
# "Are Alice and Bob friends?" → Friend(alice, bob) → true
# "Is Alice older than Bob?"
#   → Age(alice, 25) ∧ Age(bob, 30) ∧ GreaterThan(25, 30) → false

# Complex relationships:
Sibling(x, y) ≡ ParentOf(p, x) ∧ ParentOf(p, y) ∧ (x ≠ y)
# "x and y are siblings if they share a parent and are different people"`
        },
        {
          title: 'Type Systems as Predicates',
          description: 'Programming language type checking with FOL',
          code: `# Type system in FOL
Int(x): "x is an integer"
String(x): "x is a string"
List(L, T): "L is a list of type T"

# Type checking rules:
∀x (Int(x) → Number(x))  # All ints are numbers
∀x ∀y (Int(x) ∧ Int(y) → Int(x + y))  # Adding ints gives int

# Function signatures:
Length(L, n) ≡ List(L, _) ∧ Int(n) ∧ (n = size of L)
# "Length relates a list L to an integer n representing its size"

# This is how type checkers work internally!`
        },
        {
          title: 'Predicates in Natural Language Processing',
          description: 'Semantic parsing converts text to FOL',
          code: `# Natural language → FOL translation
Sentence: "All cats are mammals"
FOL: ∀x (Cat(x) → Mammal(x))

Sentence: "Some birds can fly"
FOL: ∃x (Bird(x) ∧ CanFly(x))

Sentence: "John loves Mary"
FOL: Loves(john, mary)

Sentence: "No student failed the exam"
FOL: ¬∃x (Student(x) ∧ Failed(x, exam))
# Or equivalently: ∀x (Student(x) → ¬Failed(x, exam))

# Modern LLMs use predicates for structured reasoning!`
        }
      ],
      keyPoints: [
        'Predicates express properties (unary) and relationships (binary, n-ary)',
        'Predicates are evaluated over a domain of discourse',
        'FOL predicates form the basis of knowledge graphs and databases',
        'Type systems, semantic parsing, and AI reasoning use predicates'
      ]
    },
    {
      id: 'quantifiers',
      title: '3. Quantifiers: Expressing "All" and "Some"',
      content: `## Universal Quantifier: ∀ (For All)

**Notation**: ∀x P(x)
**Meaning**: "For all x in the domain, P(x) is true"
**Example**: ∀x (Human(x) → Mortal(x)) - "All humans are mortal"

**When ∀ is True:**
- P(x) must be true for **every** object in the domain
- If domain = {1, 2, 3} and P(x) means "x > 0", then ∀x P(x) is **true**
- If one object fails, the whole statement is **false**

**Common Patterns:**
- ∀x (P(x) → Q(x)): "All P's are Q's"
- ∀x ∀y (R(x, y) → R(y, x)): "R is symmetric"

## Existential Quantifier: ∃ (There Exists)

**Notation**: ∃x P(x)
**Meaning**: "There exists at least one x such that P(x) is true"
**Example**: ∃x (Cat(x) ∧ Black(x)) - "There exists a black cat"

**When ∃ is True:**
- P(x) must be true for **at least one** object
- If domain = {1, 2, 3} and P(x) means "x is even", then ∃x P(x) is **true** (because 2 is even)

**Common Patterns:**
- ∃x (P(x) ∧ Q(x)): "There exists something that is both P and Q"
- ∃x ∀y R(x, y): "There exists an x related to all y"

## Negation Rules

**De Morgan's Laws for Quantifiers:**
- ¬(∀x P(x)) ≡ ∃x ¬P(x) - "Not all x are P" = "Some x is not P"
- ¬(∃x P(x)) ≡ ∀x ¬P(x) - "Nothing is P" = "Everything is not P"

These are crucial for logical reasoning!`,
      examples: [
        {
          title: 'Quantifiers in Mathematics',
          description: 'Formal definitions use quantifiers',
          code: `# Definition of "even number":
Even(n) ≡ ∃k (n = 2k)
# "n is even if there exists a k such that n = 2k"

# Definition of "bounded above":
BoundedAbove(S) ≡ ∃M ∀x (x ∈ S → x ≤ M)
# "Set S is bounded above if there exists an M such that
#  all elements x in S satisfy x ≤ M"

# Continuity of a function:
Continuous(f, a) ≡
  ∀ε > 0 ∃δ > 0 ∀x (|x - a| < δ → |f(x) - f(a)| < ε)
# This is the famous epsilon-delta definition!`
        },
        {
          title: 'Quantifiers in Database Queries',
          description: 'SQL and database logic use quantifiers',
          code: `# Database: Students and Courses
Student(alice)
Student(bob)
Course(cs101)
Course(cs102)
Enrolled(alice, cs101)
Enrolled(bob, cs101)
Enrolled(bob, cs102)

# Query: "Find students enrolled in ALL courses"
# FOL: ∀c (Course(c) → Enrolled(student, c))
# SQL: SELECT student WHERE NOT EXISTS (
#        SELECT * FROM courses c WHERE NOT EXISTS (
#          SELECT * FROM enrolled WHERE student=s AND course=c))

# Query: "Find students enrolled in SOME course with 'cs' in name"
# FOL: ∃c (Course(c) ∧ Contains(c, 'cs') ∧ Enrolled(student, c))
# SQL: SELECT student WHERE EXISTS (
#        SELECT * FROM enrolled e JOIN courses c
#        WHERE e.student=s AND c.name LIKE '%cs%')`
        },
        {
          title: 'Nested Quantifiers - Order Matters!',
          description: 'Different orderings mean different things',
          code: `# Order matters with nested quantifiers!

# 1. ∀x ∃y Loves(x, y)
# "Everyone loves someone (possibly different for each person)"
# Alice loves Bob, Bob loves Charlie, Charlie loves Alice ✓

# 2. ∃y ∀x Loves(x, y)
# "There exists someone whom everyone loves"
# Everyone loves Bob ✓

# These are DIFFERENT statements!
# (1) can be true when (2) is false

# Real example:
# ∀student ∃course Passed(student, course)
# "Every student passed at least one course"

# vs.

# ∃course ∀student Passed(student, course)
# "There's a course that every student passed" (much stronger!)`
        }
      ],
      keyPoints: [
        '∀x means "for all x" - universal quantification',
        '∃x means "there exists x" - existential quantification',
        'Negation swaps quantifiers: ¬∀x P(x) ≡ ∃x ¬P(x)',
        'Order of nested quantifiers matters: ∀x ∃y ≠ ∃y ∀x',
        'Quantifiers are essential for expressing mathematical definitions'
      ]
    },
    {
      id: 'translation',
      title: '4. Translating Natural Language to FOL',
      content: `## Systematic Translation Process

**Step 1:** Identify the domain (what objects are we talking about?)
**Step 2:** Define predicates (what properties and relationships?)
**Step 3:** Identify quantifiers ("all", "some", "every", "no one")
**Step 4:** Determine the logical structure (→, ∧, ∨, ¬)

**Common Translation Patterns:**

| Natural Language | FOL Pattern | Example |
|-----------------|-------------|---------|
| "All X are Y" | ∀x (X(x) → Y(x)) | All birds have wings |
| "Some X are Y" | ∃x (X(x) ∧ Y(x)) | Some cats are black |
| "No X are Y" | ∀x (X(x) → ¬Y(x)) | No humans are perfect |
| "X if and only if Y" | ∀x (X(x) ↔ Y(x)) | Even iff divisible by 2 |

**Watch Out for These Traps:**

❌ **Wrong**: ∀x (Human(x) ∧ Mortal(x)) - "All things are human AND mortal"
✓ **Right**: ∀x (Human(x) → Mortal(x)) - "All humans are mortal"

❌ **Wrong**: ∃x (Cat(x) → Black(x)) - "There exists something: if it's a cat, it's black"
✓ **Right**: ∃x (Cat(x) ∧ Black(x)) - "There exists a black cat"

**Key insight**:
- Use **→** with **∀** (all X → Y)
- Use **∧** with **∃** (some X ∧ Y)`,
      examples: [
        {
          title: 'Practice Translations',
          description: 'Common sentences in FOL',
          code: `# Domain: People and their properties
Person(x), Programmer(x), Happy(x), KnowsPython(x)

# 1. "All programmers know Python"
∀x (Programmer(x) → KnowsPython(x))

# 2. "Some programmers are happy"
∃x (Programmer(x) ∧ Happy(x))

# 3. "No programmer is unhappy" (two equivalent forms)
∀x (Programmer(x) → ¬Unhappy(x))
¬∃x (Programmer(x) ∧ Unhappy(x))

# 4. "Not all programmers know Python"
¬∀x (Programmer(x) → KnowsPython(x))
# Equivalent to: ∃x (Programmer(x) ∧ ¬KnowsPython(x))

# 5. "If anyone knows Python, Alice does"
(∃x KnowsPython(x)) → KnowsPython(alice)

# 6. "Everyone who knows Python is a programmer"
∀x (KnowsPython(x) → Programmer(x))`
        },
        {
          title: 'Complex Multi-Quantifier Statements',
          description: 'Breaking down intricate sentences',
          code: `# "Every student has a favorite course"
∀s (Student(s) → ∃c (Course(c) ∧ Favorite(s, c)))
# For all students s, there exists a course c that s likes

# "There's a course that every student has taken"
∃c (Course(c) ∧ ∀s (Student(s) → HasTaken(s, c)))
# There exists a course c such that all students have taken c

# "No student has taken every course"
¬∃s (Student(s) ∧ ∀c (Course(c) → HasTaken(s, c)))
# Equivalent to: ∀s (Student(s) → ∃c (Course(c) ∧ ¬HasTaken(s, c)))

# "Every professor teaches at least one course"
∀p (Professor(p) → ∃c (Course(c) ∧ Teaches(p, c)))

# "Some student has passed all courses they've taken"
∃s (Student(s) ∧ ∀c ((Course(c) ∧ HasTaken(s, c)) → Passed(s, c)))`
        }
      ],
      keyPoints: [
        'Systematic translation: identify domain, predicates, quantifiers, structure',
        'Use → with ∀ (all X are Y), use ∧ with ∃ (some X and Y)',
        'Negation can be pushed inside using De Morgan\'s laws',
        'Multiple quantifiers require careful attention to order',
        'Practice is essential - translation becomes intuitive over time'
      ]
    },
    {
      id: 'inference',
      title: '5. Inference and Reasoning with FOL',
      content: `## Inference Rules in First-Order Logic

FOL extends propositional inference rules with quantifier manipulation.

**Universal Instantiation (UI):**
- From ∀x P(x), infer P(c) for any constant c
- "If something is true for all x, it's true for any specific object"

**Universal Generalization (UG):**
- From P(c) for arbitrary c, infer ∀x P(x)
- "If something is true for an arbitrary object, it's true for all"

**Existential Instantiation (EI):**
- From ∃x P(x), infer P(c) for a new constant c
- "If something exists with property P, name it c"

**Existential Generalization (EG):**
- From P(c), infer ∃x P(x)
- "If a specific object has property P, then something has property P"

**Unification:**
The process of finding substitutions that make expressions identical.
- Unify(Human(x), Human(Socrates)) → {x/Socrates}
- This is the core of Prolog and automated theorem proving!

## Forward vs. Backward Chaining

**Forward Chaining (data-driven):**
- Start with facts, apply rules, derive new facts
- Used in expert systems, rule-based AI

**Backward Chaining (goal-driven):**
- Start with a goal, work backwards to find supporting facts
- Used in Prolog, logic programming`,
      examples: [
        {
          title: 'Logical Deduction Example',
          description: 'Step-by-step reasoning',
          code: `# Given knowledge base:
1. ∀x (Human(x) → Mortal(x))     # All humans are mortal
2. ∀x (Greek(x) → Human(x))       # All Greeks are human
3. Greek(Socrates)                 # Socrates is Greek

# Prove: Mortal(Socrates)

# Proof:
Step 1: Greek(Socrates)                 [Given: fact 3]
Step 2: Greek(Socrates) → Human(Socrates) [UI on fact 2]
Step 3: Human(Socrates)                 [Modus Ponens: 1,2]
Step 4: Human(Socrates) → Mortal(Socrates) [UI on fact 1]
Step 5: Mortal(Socrates)                [Modus Ponens: 3,4] ∎

# This is how automated theorem provers work!`
        },
        {
          title: 'Forward Chaining in Action',
          description: 'Rule-based reasoning system',
          code: `# Knowledge Base (rules + facts):
Rules:
R1: ∀x (Bird(x) ∧ ¬Penguin(x) → CanFly(x))  # Birds fly (except penguins)
R2: ∀x (Penguin(x) → Bird(x))                # Penguins are birds
R3: ∀x (Bird(x) → HasWings(x))               # Birds have wings

Facts:
F1: Penguin(tweety)

# Forward chaining - derive all consequences:
Iteration 1:
  - Apply R2 with F1: Bird(tweety) ✓ [new fact]

Iteration 2:
  - Apply R3 with Bird(tweety): HasWings(tweety) ✓ [new fact]
  - Apply R1 with Bird(tweety) ∧ ¬Penguin(tweety):
    But Penguin(tweety) is true! So CanFly(tweety) is FALSE ✓

Derived facts: {Bird(tweety), HasWings(tweety), ¬CanFly(tweety)}
# Tweety has wings but can't fly - correct! Penguins can't fly.`
        },
        {
          title: 'Unification in Prolog-style Logic Programming',
          description: 'Pattern matching for automated reasoning',
          code: `# Prolog-style rules (FOL under the hood):
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
parent(bob, pat).
parent(pat, jim).

# Rule: grandparent relationship
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

# Query: ?- grandparent(tom, Who)
# Unification process:
1. Match grandparent(tom, Who) with rule head grandparent(X, Z)
   Substitution: {X/tom, Z/Who}
2. Need to prove: parent(tom, Y), parent(Y, Z)
3. parent(tom, Y) matches parent(tom, bob) → Y=bob
4. parent(bob, Z) matches parent(bob, ann) → Z=ann
5. Substitute back: Who=ann ✓

# Results: tom is grandparent of ann and pat
# This is automated reasoning!`
        }
      ],
      keyPoints: [
        'Inference rules let us derive new knowledge from existing facts',
        'Universal/existential instantiation and generalization handle quantifiers',
        'Unification matches patterns and substitutes variables',
        'Forward chaining: facts → rules → conclusions (data-driven)',
        'Backward chaining: goal → subgoals → facts (goal-driven)',
        'Modern AI systems use FOL inference for reasoning'
      ]
    },
    {
      id: 'applications',
      title: '6. First-Order Logic in AI and Computer Science',
      content: `## Why FOL Matters for AI

First-order logic is the foundation of:

**1. Knowledge Representation**
- Semantic Web (RDF, OWL)
- Knowledge graphs (Google, Facebook)
- Expert systems

**2. Automated Reasoning**
- Theorem provers (Coq, Isabelle, Lean)
- SAT/SMT solvers
- Constraint satisfaction

**3. Logic Programming**
- Prolog language
- Answer Set Programming (ASP)
- Datalog databases

**4. Natural Language Processing**
- Semantic parsing
- Question answering
- Textual entailment

**5. Formal Verification**
- Software verification
- Hardware verification
- Protocol verification

**6. Database Systems**
- SQL query optimization
- Integrity constraints
- Datalog queries

Modern AI combines FOL with machine learning:
- Neuro-symbolic AI: neural networks + logical reasoning
- Differentiable logic: making logic differentiable for deep learning
- Knowledge graph embeddings: vectors + symbolic knowledge`,
      examples: [
        {
          title: 'Knowledge Graph: DBpedia/Wikidata',
          description: 'How Wikipedia becomes structured knowledge',
          code: `# Wikipedia text: "Albert Einstein was born in Germany"
# → Knowledge graph triples (FOL facts):

Person(AlbertEinstein)
Country(Germany)
BornIn(AlbertEinstein, Germany)

# More complex facts:
Scientist(AlbertEinstein)
Physicist(AlbertEinstein)
NobelPrizeWinner(AlbertEinstein)
BornInYear(AlbertEinstein, 1879)
DiedInYear(AlbertEinstein, 1955)
DevelopedTheory(AlbertEinstein, Relativity)

# Rules for reasoning:
∀x (NobelPrizeWinner(x) → Famous(x))
∀x ∀y (BornIn(x, y) ∧ Country(y) → HasNationality(x, y))

# Query: "Who are famous German physicists?"
# FOL: ∃x (Physicist(x) ∧ Famous(x) ∧ HasNationality(x, Germany))
# Answer: AlbertEinstein (and others) ✓`
        },
        {
          title: 'Prolog: Logic Programming Language',
          description: 'Coding in pure logic',
          code: `% Facts (FOL ground atoms):
human(socrates).
human(plato).
mortal(X) :- human(X).  % Rule: All humans are mortal

% Query:
?- mortal(socrates).
% Prolog proves this using backward chaining
Yes

% Lists and recursion:
length([], 0).
length([H|T], N) :- length(T, N1), N is N1 + 1.

% Prolog does automated reasoning!
?- length([a,b,c], N).
N = 3.

% This is FOL with automated proof search built-in`
        },
        {
          title: 'Formal Verification: Proving Program Correctness',
          description: 'Math proves code is bug-free',
          code: `# Hoare Logic - program verification with FOL

# Function to verify:
def abs(x):
    if x < 0:
        return -x
    else:
        return x

# Specification in FOL:
# Precondition: True (any x)
# Postcondition: ∀x (result ≥ 0 ∧ (result = x ∨ result = -x))

# Proof using Hoare triples:
{True}
if x < 0:
    {x < 0}
    return -x
    {result = -x ∧ result ≥ 0}  # Since -x > 0 when x < 0
else:
    {x ≥ 0}
    return x
    {result = x ∧ result ≥ 0}
{result ≥ 0 ∧ (result = x ∨ result = -x)} ✓

# Theorem: abs is correct! No bugs possible.
# Tools like Coq, Dafny, and F* use FOL to verify real code`
        }
      ],
      keyPoints: [
        'FOL is the mathematical foundation of AI knowledge representation',
        'Knowledge graphs use FOL to structure human knowledge',
        'Prolog and logic programming are FOL made executable',
        'Formal verification uses FOL to prove programs correct',
        'Modern AI combines FOL reasoning with machine learning',
        'Understanding FOL is essential for explainable AI'
      ]
    }
  ],
  summary: [
    'First-order logic extends propositional logic with predicates, variables, and quantifiers',
    'Predicates express properties (unary) and relationships (binary, n-ary)',
    '∀ (forall) expresses universal quantification - "all objects satisfy P"',
    '∃ (exists) expresses existential quantification - "some object satisfies P"',
    'Translation: use → with ∀, use ∧ with ∃',
    'Inference rules (UI, UG, EI, EG) enable automated reasoning',
    'FOL powers knowledge graphs, logic programming, and formal verification',
    'Modern AI combines FOL with neural networks (neuro-symbolic AI)'
  ],
  nextSteps: [
    'Practice translating natural language to FOL',
    'Learn Prolog or another logic programming language',
    'Study automated theorem proving and SAT solvers',
    'Explore knowledge graphs and semantic web technologies',
    'Understand how databases use FOL for queries',
    'Learn about neuro-symbolic AI and differentiable logic'
  ],
  checkYourUnderstanding: [
    {
      question: 'What is the difference between propositional logic and first-order logic? Why do we need FOL?',
      answer: 'Propositional logic treats statements as atomic (indivisible). FOL adds predicates (properties/relationships), variables, and quantifiers. We need FOL to express patterns like "All humans are mortal" without listing every human individually. FOL can reason about infinite domains with finite rules, making it essential for AI, databases, and mathematical reasoning.'
    },
    {
      question: 'Translate to FOL: "All birds can fly, except penguins." Why is this challenging?',
      answer: 'Challenging because we need to handle exceptions. Possible FOL: ∀x ((Bird(x) ∧ ¬Penguin(x)) → CanFly(x)). This says "for all x, if x is a bird AND not a penguin, then x can fly." Shows FOL handles nuanced rules. Real AI systems use default logic or non-monotonic reasoning for exceptions.'
    },
    {
      question: 'What is the difference between ∀x ∃y Loves(x,y) and ∃y ∀x Loves(x,y)?',
      answer: '∀x ∃y Loves(x,y) means "everyone loves someone (possibly different)." Alice loves Bob, Bob loves Charlie, etc. ∃y ∀x Loves(x,y) means "there\'s someone whom everyone loves" - much stronger! Order of quantifiers matters. First is weaker (likely true), second is stronger (rarely true).'
    },
    {
      question: 'Explain universal instantiation and why it\'s useful for automated reasoning.',
      answer: 'Universal Instantiation (UI): From ∀x P(x), derive P(c) for any constant c. If "all humans are mortal" is true, we can conclude "Socrates is mortal." This lets automated theorem provers apply general rules to specific cases. Without UI, we couldn\'t use universal statements to make concrete deductions. Foundation of logic programming (Prolog).'
    },
    {
      question: 'How do knowledge graphs like Google\'s Knowledge Graph use first-order logic?',
      answer: 'Knowledge graphs store facts as FOL predicates: Person(Einstein), BornIn(Einstein, Germany), ScientistOf(Einstein, Physics). They use FOL rules for inference: ∀x∀y (BornIn(x,y) ∧ Country(y) → Nationality(x,y)). Query answering becomes logical inference. This enables semantic search: "German physicists" queries for ∃x (Physicist(x) ∧ Nationality(x, Germany)). FOL makes knowledge structured and machine-readable.'
    },
    {
      question: 'Why can\'t we always translate FOL to propositional logic? Give an example.',
      answer: 'FOL can express statements about infinite domains that propositional logic cannot finitely represent. Example: ∀n (Even(n) → Even(n+2)) expresses a pattern over infinite integers. To convert to propositional logic, we\'d need infinite propositions: Even(0)→Even(2), Even(2)→Even(4), Even(4)→Even(6),... forever. FOL\'s quantifiers compress infinite information into finite formulas, making it fundamentally more expressive.'
    }
  ]
};

