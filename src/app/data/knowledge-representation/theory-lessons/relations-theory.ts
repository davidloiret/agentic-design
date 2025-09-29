import { TheoryLesson } from './types';

export const relationsTheoryLesson: TheoryLesson = {
  id: 'relations-theory',
  title: 'Relations: Modeling Connections and Structure',
  description: 'Master binary relations, their properties, and how they structure knowledge - from databases to type systems',
  learningObjectives: [
    'Understand what relations are and how they model connections',
    'Master the fundamental properties: reflexive, symmetric, transitive, antisymmetric',
    'Learn equivalence relations and how they partition sets',
    'Understand partial orders and total orders',
    'Apply relations to databases, knowledge graphs, and type systems'
  ],
  prerequisites: ['Set theory', 'Cartesian products', 'Basic logic'],
  sections: [
    {
      id: 'what-are-relations',
      title: '1. What is a Relation?',
      content: `## Relations: Formalizing Connections

A **relation** is a mathematical way to express connections between objects.

**Formal Definition:**
A **binary relation** R from set A to set B is a subset of the Cartesian product A × B.
- R ⊆ A × B
- If (a, b) ∈ R, we write **aRb** (read: "a is related to b")

**Intuition:**
- Cartesian product A × B gives us **all possible pairs** (a, b)
- A relation R **selects which pairs** are actually connected
- Relations are everywhere: social networks, databases, dependencies, type hierarchies

**Examples:**

1. **"Less than" on numbers:**
   - A = B = ℤ (integers)
   - R = {(x, y) | x < y}
   - 3R5 is true (3 < 5), but 5R3 is false

2. **"Friend" on social network:**
   - A = B = {all users}
   - R = {(u, v) | u and v are friends}
   - AliceRBob means Alice and Bob are friends

3. **"Prerequisite" for courses:**
   - A = B = {all courses}
   - R = {(x, y) | x is prerequisite for y}
   - CS101 R CS201 means CS101 is required for CS201

**Key Insight:** Relations are just sets of ordered pairs. The power comes from **which** pairs we include!`,
      examples: [
        {
          title: 'Relations in a Database',
          description: 'Tables are relations!',
          code: `# SQL table "Employees" is a relation
# A relation from {employee_ids} to {names, departments, salaries}

Employees = {
    (1, 'Alice', 'Engineering', 120000),
    (2, 'Bob', 'Sales', 80000),
    (3, 'Charlie', 'Engineering', 110000)
}

# "Works_In" is a binary relation:
# {employee_id} × {department}
Works_In = {
    (1, 'Engineering'),
    (2, 'Sales'),
    (3, 'Engineering')
}

# Query: "Who works in Engineering?"
# Find all x where (x, 'Engineering') ∈ Works_In
# Answer: {1, 3} = {Alice, Charlie}`
        },
        {
          title: 'Relations as Directed Graphs',
          description: 'Visualizing relations',
          code: `# Relation R on set A = {1, 2, 3, 4}
# "Divides" relation: xRy if x divides y

R = {
    (1, 1), (1, 2), (1, 3), (1, 4),  # 1 divides everything
    (2, 2), (2, 4),                   # 2 divides 2 and 4
    (3, 3),                           # 3 divides only 3
    (4, 4)                            # 4 divides only 4
}

# As a directed graph:
#     ┌──┐
#     │  ↓
#  1 ─→ 2 ──→ 4
#  │         ↗
#  │    ↗───┘
#  └─→ 3

# Arrows show the "divides" relationship
# This visualization is a **Hasse diagram**`
        },
        {
          title: 'Relation Composition',
          description: 'Combining relations',
          code: `# Parent-Child relation
ParentOf = {
    ('Alice', 'Bob'),
    ('Alice', 'Charlie'),
    ('Bob', 'Dave'),
    ('Bob', 'Eve')
}

# Compose ParentOf with itself to get GrandparentOf
# (x, z) ∈ GrandparentOf if ∃y: (x,y) ∈ ParentOf ∧ (y,z) ∈ ParentOf

GrandparentOf = {
    ('Alice', 'Dave'),   # Alice → Bob → Dave
    ('Alice', 'Eve')     # Alice → Bob → Eve
}

# Relation composition: R ∘ S = {(a,c) | ∃b: aRb ∧ bSc}
# This is how we derive indirect relationships!`
        }
      ],
      keyPoints: [
        'A relation R ⊆ A × B is a set of ordered pairs',
        'Notation: aRb means (a,b) ∈ R',
        'Relations model connections: social, prerequisite, database, hierarchy',
        'Relations can be visualized as directed graphs',
        'Relations can be composed to find indirect connections'
      ]
    },
    {
      id: 'relation-properties',
      title: '2. Fundamental Properties of Relations',
      content: `## Properties That Define Relation Behavior

Relations on a set A (where R ⊆ A × A) can have special properties:

### 1. Reflexive
**Definition:** ∀a ∈ A, aRa
**Meaning:** Every element is related to itself
**Examples:**
- "Equals" (=): Every number equals itself
- "Is subset of" (⊆): Every set is subset of itself
- "Is at least as tall as": Everyone is at least as tall as themselves

**Non-example:** "Less than" (<) is NOT reflexive: 5 < 5 is false

### 2. Symmetric
**Definition:** ∀a, b ∈ A, aRb → bRa
**Meaning:** If a relates to b, then b relates to a
**Examples:**
- "Is sibling of": If Alice is sibling of Bob, Bob is sibling of Alice
- "Equals" (=): If x = y, then y = x
- "Is friend with" (on Facebook): mutual relationship

**Non-example:** "Less than" (<) is NOT symmetric: 3 < 5 but NOT 5 < 3

### 3. Antisymmetric
**Definition:** ∀a, b ∈ A, (aRb ∧ bRa) → a = b
**Meaning:** If a relates to b AND b relates to a, they must be the same
**Examples:**
- "Less than or equal" (≤): If x ≤ y and y ≤ x, then x = y
- "Is subset of" (⊆): If A ⊆ B and B ⊆ A, then A = B
- "Is ancestor of": If x is ancestor of y and vice versa, x = y

**Note:** A relation can be neither symmetric nor antisymmetric!

### 4. Transitive
**Definition:** ∀a, b, c ∈ A, (aRb ∧ bRc) → aRc
**Meaning:** If a relates to b and b relates to c, then a relates to c
**Examples:**
- "Less than" (<): If a < b and b < c, then a < c
- "Is ancestor of": If x is ancestor of y, and y is ancestor of z, then x is ancestor of z
- "Implies" (→) in logic: If P → Q and Q → R, then P → R

**Non-example:** "Is parent of" is NOT transitive:
- Alice is parent of Bob, Bob is parent of Charlie
- But Alice is NOT parent of Charlie (she's grandparent!)

### 5. Irreflexive
**Definition:** ∀a ∈ A, ¬(aRa)
**Meaning:** No element is related to itself
**Examples:**
- "Less than" (<): No number is less than itself
- "Is proper subset of" (⊂): No set is proper subset of itself

**Note:** Irreflexive is NOT the same as "not reflexive"!`,
      examples: [
        {
          title: 'Analyzing Relation Properties',
          description: 'Checking which properties hold',
          code: `# Relation: "Divides" on {1, 2, 3, 4, 5, 6}
# xRy if x divides y evenly

# Check reflexive:
# Does every number divide itself? YES ✓
# 1|1, 2|2, 3|3, ... all true
# REFLEXIVE ✓

# Check symmetric:
# If x|y, does y|x?
# 2|4 (true), but 4|2 (false) ✗
# NOT SYMMETRIC ✗

# Check antisymmetric:
# If x|y AND y|x, is x = y?
# Only way both hold is if x = y
# ANTISYMMETRIC ✓

# Check transitive:
# If x|y and y|z, does x|z?
# 2|4 and 4|8, and indeed 2|8 ✓
# TRANSITIVE ✓

# Result: Divides is reflexive, antisymmetric, transitive
# This makes it a PARTIAL ORDER!`
        },
        {
          title: 'Property Matrix Visualization',
          description: 'Quick reference table',
          code: `# Common Relations and Their Properties
# R = reflexive, S = symmetric, A = antisymmetric, T = transitive

Relation             | R  | S  | A  | T  | Special Type
---------------------|----|----|----|----|-------------
Equals (=)           | ✓  | ✓  | ✓  | ✓  | Equivalence
Less than (<)        | ✗  | ✗  | ✓  | ✓  | Strict order
Less/equal (≤)       | ✓  | ✗  | ✓  | ✓  | Partial order
Divides (|)          | ✓  | ✗  | ✓  | ✓  | Partial order
Subset (⊆)           | ✓  | ✗  | ✓  | ✓  | Partial order
Friends (Facebook)   | ✗  | ✓  | ✗  | ✗  | Symmetric
Follows (Twitter)    | ✗  | ✗  | ✗  | ✗  | Directed graph
Is sibling of        | ✗  | ✓  | ✗  | ✗  | Symmetric
Is ancestor of       | ✗  | ✗  | ✓  | ✓  | Strict order
Congruent mod n (≡)  | ✓  | ✓  | ✗  | ✓  | Equivalence`
        }
      ],
      keyPoints: [
        'Reflexive: every element relates to itself (aRa)',
        'Symmetric: if aRb then bRa (bidirectional)',
        'Antisymmetric: if aRb and bRa, then a=b (mostly one-way)',
        'Transitive: if aRb and bRc, then aRc (chains connect)',
        'Different combinations give special relation types'
      ]
    },
    {
      id: 'equivalence-relations',
      title: '3. Equivalence Relations: Partitioning Sets',
      content: `## The Most Important Relation Type

An **equivalence relation** is reflexive, symmetric, AND transitive.

**Definition:** R on A is an equivalence relation if:
1. Reflexive: ∀a, aRa
2. Symmetric: ∀a,b, aRb → bRa
3. Transitive: ∀a,b,c, (aRb ∧ bRc) → aRc

**Why "Equivalence"?**
These relations capture the idea of "sameness" or "equivalence" while not being strict equality.

**Classic Examples:**

1. **Equality (=)**: The prototype equivalence relation
   - Reflexive: x = x
   - Symmetric: x = y → y = x
   - Transitive: x = y ∧ y = z → x = z

2. **Congruence modulo n (≡ₙ)**: "Same remainder when divided by n"
   - 14 ≡₅ 9 (both have remainder 4 when divided by 5)
   - Reflexive, symmetric, transitive ✓

3. **"Lives in same city"**: Groups people by city
   - Reflexive, symmetric, transitive ✓

4. **"Has same birthday"**: Groups people by birthdate
   - Reflexive, symmetric, transitive ✓

## Equivalence Classes

The **equivalence class** of a is the set of all elements equivalent to a:
[a] = {x ∈ A | xRa}

**Fundamental Theorem:**
An equivalence relation **partitions** a set into disjoint equivalence classes.

**Properties:**
1. Every element belongs to exactly one equivalence class
2. Two equivalence classes are either identical or disjoint
3. Union of all equivalence classes = original set

This is why equivalence relations are so important: they give us a principled way to **group objects by similarity**!`,
      examples: [
        {
          title: 'Congruence Modulo 3',
          description: 'Partitioning integers',
          code: `# Relation: x ≡₃ y if (x - y) is divisible by 3
# "x and y have the same remainder when divided by 3"

# This is an equivalence relation ✓

# Equivalence classes:
[0] = {..., -6, -3, 0, 3, 6, 9, ...}    # remainder 0
[1] = {..., -5, -2, 1, 4, 7, 10, ...}   # remainder 1
[2] = {..., -4, -1, 2, 5, 8, 11, ...}   # remainder 2

# Every integer belongs to exactly one class!
# The classes partition ℤ into three disjoint sets

# Applications:
# - Cryptography (RSA uses modular arithmetic)
# - Hashing (hash tables use mod operations)
# - Cyclic patterns (days of week, etc.)`
        },
        {
          title: 'Partitioning Students by Grade',
          description: 'Real-world equivalence classes',
          code: `# Students = {Alice, Bob, Charlie, Dave, Eve, Frank}
# Grades = {A: 95, B: 88, A: 92, B: 85, C: 75, A: 97}

# Relation: "Has same letter grade"
# This is an equivalence relation ✓

# Equivalence classes (partitions):
[A] = {Alice, Charlie, Frank}  # All A students
[B] = {Bob, Dave}              # All B students
[C] = {Eve}                    # All C students

# Properties:
# 1. Every student in exactly one class ✓
# 2. Classes are disjoint (no overlap) ✓
# 3. Union of classes = all students ✓

# This is how grading naturally partitions students!`
        },
        {
          title: 'Equivalence Relations in Type Theory',
          description: 'Structural vs nominal type equality',
          code: `# TypeScript type system uses structural equivalence

type Point2D = { x: number, y: number }
type Vector2D = { x: number, y: number }

# These types are EQUIVALENT (same structure)
# Even though they have different names!

const p: Point2D = { x: 1, y: 2 }
const v: Vector2D = p  # ✓ Allowed! Structurally equivalent

# Contrast with Java (nominal typing):
# class Point2D { int x; int y; }
# class Vector2D { int x; int y; }
# These are NOT equivalent in Java!

# Equivalence relation: "Has same structure"
# Partitions types into equivalence classes by shape`
        }
      ],
      keyPoints: [
        'Equivalence relation = reflexive + symmetric + transitive',
        'Models "sameness" without being strict equality',
        'Partitions set into disjoint equivalence classes',
        'Every element belongs to exactly one equivalence class',
        'Used for: grouping, classification, modular arithmetic, type systems'
      ]
    },
    {
      id: 'partial-orders',
      title: '4. Partial Orders: Hierarchies and Rankings',
      content: `## Ordering Relations

A **partial order** is reflexive, antisymmetric, AND transitive.

**Definition:** R on A is a partial order if:
1. Reflexive: ∀a, aRa
2. Antisymmetric: ∀a,b, (aRb ∧ bRa) → a = b
3. Transitive: ∀a,b,c, (aRb ∧ bRc) → aRc

**Notation:** Often written with ≤ or ⊑

**Why "Partial"?**
Not all elements need to be comparable! Some pairs might have no order relationship.

**Classic Examples:**

1. **Less than or equal (≤)** on numbers:
   - Reflexive: x ≤ x
   - Antisymmetric: x ≤ y and y ≤ x → x = y
   - Transitive: x ≤ y and y ≤ z → x ≤ z
   - This is actually a **total order** (every pair is comparable)

2. **Subset (⊆)** on sets:
   - Reflexive: A ⊆ A
   - Antisymmetric: A ⊆ B and B ⊆ A → A = B
   - Transitive: A ⊆ B and B ⊆ C → A ⊆ C
   - Partial but not total: {1,2} and {2,3} are incomparable!

3. **Divides (|)** on positive integers:
   - 2 | 6 (2 divides 6)
   - Partial: 3 and 5 are incomparable (neither divides the other)

## Total Order vs. Partial Order

**Total Order (Linear Order):**
- Partial order where EVERY pair is comparable
- Examples: numbers with ≤, strings with lexicographic ordering
- Can always be arranged in a line

**Partial Order:**
- Some pairs might be incomparable
- Examples: subsets with ⊆, tasks with dependencies
- Forms a DAG (directed acyclic graph), not a line

**Hasse Diagrams:**
Visual representation of partial orders:
- Elements as nodes
- aRb shown by a going below b with an edge
- Transitive edges omitted (implied)`,
      examples: [
        {
          title: 'Subset Partial Order',
          description: 'Power set of {a,b,c} ordered by ⊆',
          code: `# P({a,b,c}) with subset relation
# Hasse diagram:

                {a,b,c}
               /   |    \\
            {a,b} {a,c} {b,c}
             / \\   / \\   / \\
          {a}   {b}   {c}
             \\    |    /
                 ∅

# Incomparable pairs: {a,b} and {a,c}
# Neither {a,b} ⊆ {a,c} nor {a,c} ⊆ {a,b}
# This is why it's a PARTIAL order!

# Chains (totally ordered subsets):
# ∅ ⊆ {a} ⊆ {a,b} ⊆ {a,b,c}`
        },
        {
          title: 'Task Dependencies (Topological Sort)',
          description: 'Partial order in project management',
          code: `# Software project tasks with dependencies

Tasks = {
    'Design',
    'Implement_Backend',
    'Implement_Frontend',
    'Write_Tests',
    'Deploy'
}

# Dependency relation (must do before):
Dependencies = {
    ('Design', 'Implement_Backend'),
    ('Design', 'Implement_Frontend'),
    ('Implement_Backend', 'Write_Tests'),
    ('Implement_Frontend', 'Write_Tests'),
    ('Write_Tests', 'Deploy')
}

# This is a partial order ✓
# Some tasks can be done in parallel:
# - Implement_Backend and Implement_Frontend are incomparable
# - Can work on both simultaneously!

# Valid orderings (topological sorts):
# 1. Design → Backend → Frontend → Tests → Deploy
# 2. Design → Frontend → Backend → Tests → Deploy
# Both valid! Partial order allows flexibility`
        },
        {
          title: 'Type Hierarchy (Subtyping)',
          description: 'Partial order in programming languages',
          code: `# Object-oriented type hierarchy

class Animal { }
class Mammal extends Animal { }
class Dog extends Mammal { }
class Cat extends Mammal { }
class Bird extends Animal { }

# Subtype relation (<:) is a partial order:
#
#          Animal
#         /      \\
#      Mammal   Bird
#      /   \\
#    Dog   Cat

# Dog <: Mammal <: Animal (transitive)
# Dog and Cat are incomparable (siblings)
# This is a PARTIAL order on types

# Used for:
# - Type checking: Can pass Dog where Mammal expected
# - Method dispatch: Which method to call?
# - Generic constraints: <T extends Mammal>`
        }
      ],
      keyPoints: [
        'Partial order = reflexive + antisymmetric + transitive',
        'Models hierarchies, rankings, dependencies',
        'Not all elements need to be comparable (hence "partial")',
        'Total order = partial order where all pairs are comparable',
        'Applications: subsets, divisibility, task scheduling, type hierarchies'
      ]
    },
    {
      id: 'inverse-composition',
      title: '5. Inverse and Composition of Relations',
      content: `## Operations on Relations

Just like functions, relations can be inverted and composed.

### Inverse Relation

The **inverse** of relation R ⊆ A × B is:
R⁻¹ = {(b, a) | (a, b) ∈ R}

**Intuition:** Reverse all the arrows

**Properties:**
- (R⁻¹)⁻¹ = R (inverse of inverse is original)
- (R ∘ S)⁻¹ = S⁻¹ ∘ R⁻¹ (reverses composition order)
- R is symmetric ⟺ R = R⁻¹

**Examples:**
- If R = "is parent of", then R⁻¹ = "is child of"
- If R = "is less than" (<), then R⁻¹ = "is greater than" (>)
- If R = "is prerequisite for", then R⁻¹ = "requires as prerequisite"

### Composition of Relations

The **composition** of R ⊆ A × B and S ⊆ B × C is:
S ∘ R = {(a, c) | ∃b ∈ B : aRb and bSc}

**Intuition:** Follow R, then follow S

**Properties:**
- Composition is associative: (R ∘ S) ∘ T = R ∘ (S ∘ T)
- Generally NOT commutative: R ∘ S ≠ S ∘ R
- Identity relation: R ∘ I = I ∘ R = R

**Examples:**
- ParentOf ∘ ParentOf = GrandparentOf
- ParentOf ∘ Sibling = AuntUncle
- Prerequisite ∘ Prerequisite = Indirect prerequisite`,
      examples: [
        {
          title: 'Family Relations Through Composition',
          description: 'Building complex relations from simple ones',
          code: `# Base relations:
ParentOf = {
    ('Alice', 'Bob'),
    ('Alice', 'Charlie'),
    ('Bob', 'Dave'),
    ('Charlie', 'Eve')
}

Sibling = {
    ('Bob', 'Charlie'),
    ('Charlie', 'Bob')
}

# Derived relations through composition:

# GrandparentOf = ParentOf ∘ ParentOf
GrandparentOf = {
    ('Alice', 'Dave'),  # Alice → Bob → Dave
    ('Alice', 'Eve')    # Alice → Charlie → Eve
}

# AuntUncle = Sibling ∘ ParentOf
# "Your parent's sibling"
AuntUncle = {
    ('Charlie', 'Dave'),  # Charlie → Bob → Dave (Uncle)
    ('Bob', 'Eve')        # Bob → Charlie → Eve (Uncle)
}

# Cousin = (ParentOf⁻¹ ∘ Sibling ∘ ParentOf)
# "Children of your parent's siblings"
# Dave and Eve are cousins!`
        },
        {
          title: 'Transitive Closure',
          description: 'Finding all indirect connections',
          code: `# Direct flights relation:
DirectFlight = {
    ('NYC', 'Chicago'),
    ('Chicago', 'Denver'),
    ('Denver', 'LA'),
    ('NYC', 'Boston'),
    ('Boston', 'Chicago')
}

# Reachable cities (transitive closure):
# R⁺ = R ∪ R² ∪ R³ ∪ ...
# where R² = R ∘ R, R³ = R ∘ R ∘ R, etc.

Reachable = {
    # Direct (R):
    ('NYC', 'Chicago'), ('Chicago', 'Denver'), ...
    # 2 hops (R²):
    ('NYC', 'Denver'),  # NYC → Chicago → Denver
    ('Boston', 'Denver'), # Boston → Chicago → Denver
    # 3 hops (R³):
    ('NYC', 'LA'),      # NYC → Chicago → Denver → LA
    ('Boston', 'LA'),   # Boston → Chicago → Denver → LA
    ...
}

# This is how routing algorithms work!
# Transitive closure finds all paths`
        },
        {
          title: 'Database Joins as Relation Composition',
          description: 'SQL joins are relation operations',
          code: `# SQL tables are relations

# Employees(emp_id, dept_id)
Employees = {
    (1, 10),  # Alice in dept 10
    (2, 20),  # Bob in dept 20
    (3, 10)   # Charlie in dept 10
}

# Departments(dept_id, dept_name)
Departments = {
    (10, 'Engineering'),
    (20, 'Sales')
}

# SQL: SELECT emp_id, dept_name
#      FROM Employees JOIN Departments
#      ON Employees.dept_id = Departments.dept_id

# This is RELATION COMPOSITION!
# Employees ∘ Departments = {
#     (1, 'Engineering'),  # emp 1 → dept 10 → 'Engineering'
#     (2, 'Sales'),         # emp 2 → dept 20 → 'Sales'
#     (3, 'Engineering')   # emp 3 → dept 10 → 'Engineering'
# }

# Database joins ARE relation operations!`
        }
      ],
      keyPoints: [
        'Inverse R⁻¹ reverses all pairs: (a,b) ∈ R ⟺ (b,a) ∈ R⁻¹',
        'Composition S ∘ R follows R then S: aRb and bSc → a(S∘R)c',
        'Composition builds complex relations from simple ones',
        'Transitive closure R⁺ finds all indirect connections',
        'Database joins are relation composition'
      ]
    },
    {
      id: 'applications',
      title: '6. Relations in Computer Science and AI',
      content: `## Why Relations Matter

Relations are fundamental to computer science and AI:

**1. Databases**
- Tables are relations
- Joins are composition
- Keys ensure functional dependencies
- Foreign keys model relationships

**2. Knowledge Graphs**
- Entities connected by relations
- Query answering uses relation traversal
- Inference derives new relations
- RDF triples: (subject, predicate, object)

**3. Type Systems**
- Subtyping is a partial order
- Type inference uses relations
- Inheritance hierarchies
- Generic constraints

**4. Program Analysis**
- Control flow graphs
- Data dependencies
- Pointer analysis
- Call graphs

**5. Social Networks**
- Friend/follower relations
- Communities via equivalence classes
- Influence propagation
- Recommendation systems

**6. Scheduling and Planning**
- Task dependencies (partial order)
- Topological sort for execution order
- Critical path analysis
- Resource allocation`,
      examples: [
        {
          title: 'Knowledge Graph: Semantic Web',
          description: 'RDF triples are binary relations',
          code: `# RDF triples: (subject, relation, object)

# Facts (relations):
(Einstein, bornIn, Germany)
(Einstein, wonPrize, NobelPrize1921)
(Einstein, developedTheory, Relativity)
(Germany, locatedIn, Europe)
(NobelPrize1921, awardedFor, Physics)

# Relations form a graph:
#
# Einstein ─bornIn→ Germany ─locatedIn→ Europe
#    │
#    ├─wonPrize→ NobelPrize1921 ─awardedFor→ Physics
#    │
#    └─developedTheory→ Relativity

# Query: "Find European Nobel Prize winners in Physics"
# Traverse relations:
# ?person bornIn ?country
# ?country locatedIn Europe
# ?person wonPrize ?prize
# ?prize awardedFor Physics`
        },
        {
          title: 'Union-Find for Equivalence Classes',
          description: 'Efficient data structure for dynamic equivalence',
          code: `# Problem: Dynamic equivalence relation
# Operations:
# - union(a, b): Merge equivalence classes of a and b
# - find(a): Which equivalence class does a belong to?

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each element in own class
        self.rank = [0] * n

    def find(self, x):
        # Find representative of x's class
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        # Merge classes containing x and y
        px, py = self.find(x), self.find(y)
        if px == py: return  # Already in same class

        # Union by rank (optimization)
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

# Applications:
# - Kruskal's MST algorithm
# - Image segmentation (connected components)
# - Network connectivity
# - Percolation theory`
        },
        {
          title: 'Topological Sort for Build Systems',
          description: 'Ordering based on partial order',
          code: `# Build system: files depend on other files
# Partial order: "must compile before"

dependencies = {
    'main.o': ['utils.o', 'math.o'],
    'utils.o': ['types.h'],
    'math.o': ['types.h'],
    'types.h': []
}

def topological_sort(deps):
    """Return valid build order"""
    # Kahn's algorithm
    in_degree = {node: 0 for node in deps}
    for node in deps:
        for dep in deps[node]:
            in_degree[dep] += 1

    queue = [node for node in deps if in_degree[node] == 0]
    result = []

    while queue:
        node = queue.pop(0)
        result.append(node)
        for dep in deps[node]:
            in_degree[dep] -= 1
            if in_degree[dep] == 0:
                queue.append(dep)

    return result

# Output: ['types.h', 'utils.o', 'math.o', 'main.o']
# Valid build order respecting dependencies!`
        }
      ],
      keyPoints: [
        'Relations are the foundation of databases and knowledge graphs',
        'Type systems use partial orders (subtyping)',
        'Social networks model connections as relations',
        'Task scheduling uses partial orders (dependencies)',
        'Union-Find efficiently manages dynamic equivalence relations',
        'Understanding relations is essential for modern software'
      ]
    }
  ],
  summary: [
    'A relation R ⊆ A × B is a set of ordered pairs modeling connections',
    'Reflexive: every element relates to itself (aRa)',
    'Symmetric: if aRb then bRa (bidirectional)',
    'Antisymmetric: if aRb and bRa, then a=b',
    'Transitive: if aRb and bRc, then aRc',
    'Equivalence relation (R+S+T) partitions sets into equivalence classes',
    'Partial order (R+A+T) models hierarchies with incomparable elements',
    'Relations power databases, knowledge graphs, and type systems'
  ],
  nextSteps: [
    'Implement equivalence class computation algorithms',
    'Study graph algorithms (relations as directed graphs)',
    'Learn database query optimization (relational algebra)',
    'Explore knowledge graph reasoning and SPARQL',
    'Understand type theory and subtyping',
    'Practice with Union-Find and topological sorting'
  ],
  checkYourUnderstanding: [
    {
      question: 'What is the difference between symmetric and antisymmetric? Can a relation be both?',
      answer: 'Symmetric: if aRb then bRa (works both ways). Antisymmetric: if aRb and bRa, then a=b (can\'t go both ways unless same element). A relation can be BOTH if it only relates elements to themselves (like equality on a singleton set). Most relations are neither (like "less than") or one but not the other.'
    },
    {
      question: 'Why is "is parent of" NOT transitive? Give a counterexample.',
      answer: '"Is parent of" is NOT transitive because: Alice is parent of Bob, Bob is parent of Charlie, but Alice is NOT parent of Charlie (she\'s grandparent). Transitive would mean aRb ∧ bRc → aRc, but this fails here. However, "is ancestor of" IS transitive.'
    },
    {
      question: 'What makes equivalence relations so important? Give two real-world examples.',
      answer: 'Equivalence relations partition sets into disjoint groups (equivalence classes), letting us group "similar" objects. Examples: (1) Congruence mod n - partitions integers by remainder, used in cryptography and hashing. (2) "Same birthday" - partitions people into 365 classes, used for birthday paradox. Key: they give principled way to classify and group objects.'
    },
    {
      question: 'In a partial order, what does it mean for two elements to be "incomparable"? Give an example.',
      answer: 'Two elements a and b are incomparable if neither aRb nor bRa. Example: In the subset partial order (⊆), sets {1,2} and {2,3} are incomparable - neither is a subset of the other. This is why it\'s a PARTIAL order, not total. In task scheduling, parallel tasks are incomparable (no dependency either way).'
    },
    {
      question: 'How are database JOIN operations related to relation composition? Explain.',
      answer: 'A database JOIN is literally relation composition! If Employees = {(emp_id, dept_id)} and Departments = {(dept_id, dept_name)}, then Employees JOIN Departments = {(emp_id, dept_name)} where emp_id relates to dept_name through dept_id. This is composition: follow first relation, then second. SQL syntax hides the mathematical operation!'
    },
    {
      question: 'Explain the Union-Find data structure and why it\'s useful for equivalence relations.',
      answer: 'Union-Find maintains a dynamic equivalence relation with two operations: find(x) returns which equivalence class x belongs to, union(x,y) merges classes containing x and y. With path compression and union by rank, both operations are nearly O(1) amortized. Used in: Kruskal\'s MST, connected components, image segmentation, network connectivity. Essential when equivalence classes change dynamically.'
    }
  ]
};

