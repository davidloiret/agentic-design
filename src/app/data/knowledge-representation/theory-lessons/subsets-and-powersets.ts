import { TheoryLesson } from './types';

export const subsetsAndPowerSetsLesson: TheoryLesson = {
  id: 'subsets-powersets-theory',
  title: 'Subsets and Power Sets',
  description: 'Explore subset relationships and discover the power set - the set of all possible subsets',
  learningObjectives: [
    'Understand what subsets are and how to identify them',
    'Distinguish between proper and improper subsets',
    'Master power set construction and the 2^n formula',
    'Apply subset reasoning to real-world problems',
    'Recognize subset relationships in AI and computer science'
  ],
  prerequisites: ['Introduction to Sets', 'Set Notation'],
  sections: [
    {
      id: 'what-is-subset',
      title: '1. What is a Subset?',
      content: `A **subset** is a set where every element is also contained in another set. If every element of set A is also in set B, we say "A is a subset of B" and write **A ⊆ B**.

**Formal Definition:**
A ⊆ B means: for every element x, if x ∈ A, then x ∈ B.

Think of it as a containment relationship - the smaller set is "contained within" the larger one.

**Key Insight:** The subset relation (⊆) is about **containment**, not membership!`,
      examples: [
        {
          title: 'Basic Subset Examples',
          description: 'Understanding subset relationships',
          code: `# Example 1: Clear subset relationship
A = {1, 2}
B = {1, 2, 3, 4}
# A ⊆ B is TRUE (every element of A is in B)

# Example 2: Not a subset
A = {1, 5}
B = {1, 2, 3, 4}
# A ⊆ B is FALSE (5 is in A but not in B)

# Example 3: Equal sets
A = {1, 2, 3}
B = {3, 2, 1}
# A ⊆ B and B ⊆ A (both TRUE - they're equal!)`
        },
        {
          title: 'Real-World: Permission Systems',
          description: 'User roles as subset relationships',
          code: `admin_permissions = {'read', 'write', 'delete', 'admin'}
editor_permissions = {'read', 'write'}
viewer_permissions = {'read'}

# Clear hierarchy:
# viewer_permissions ⊆ editor_permissions ⊆ admin_permissions

# Check if user has sufficient permissions
def can_perform_action(user_perms, required_perms):
    return required_perms <= user_perms  # subset check!

print(can_perform_action(editor_permissions, {'read', 'write'}))
# True - editor has all required permissions`
        },
        {
          title: 'AI Example: Feature Selection',
          description: 'Selected features as subset of all features',
          code: `all_features = {'age', 'income', 'location', 'clicks',
                'time_on_site', 'device', 'referrer'}

# After feature selection, we choose a subset
selected_features = {'age', 'income', 'clicks'}

# selected_features ⊆ all_features
print(selected_features <= all_features)  # True

# This helps reduce dimensionality and prevent overfitting`
        }
      ],
      keyPoints: [
        '**A ⊆ B** means every element of A is also in B',
        'Order doesn\'t matter: {1,2} ⊆ {3,2,1}',
        'The empty set ∅ is a subset of every set',
        'Every set is a subset of itself: A ⊆ A',
        'If A ⊆ B and B ⊆ C, then A ⊆ C (transitive property)'
      ]
    },
    {
      id: 'subset-properties',
      title: '2. Special Subset Properties',
      content: `**Two Universal Truths About Subsets:**

**1. The Empty Set Rule:**
The empty set ∅ is a subset of EVERY set. Why? Because there are no elements in ∅ to violate the subset condition. This is a vacuous truth - "every element of ∅ is in A" is true because there are no elements to check!

**2. Reflexivity:**
Every set is a subset of itself: A ⊆ A. This always holds because every element of A is definitely in A.

**Transitivity:**
If A ⊆ B and B ⊆ C, then A ⊆ C. Subset relationships chain together logically.

**Anti-symmetry:**
If A ⊆ B and B ⊆ A, then A = B. This is actually how we prove two sets are equal!`,
      examples: [
        {
          title: 'Proving Set Equality Using Subsets',
          description: 'The double-subset method',
          code: `# To prove A = B, we show:
# (1) A ⊆ B (every element of A is in B)
# (2) B ⊆ A (every element of B is in A)

A = {x for x in range(10) if x % 2 == 0}  # Even numbers
B = {0, 2, 4, 6, 8}

# Proof that A = B:
print(A <= B)  # A ⊆ B? True
print(B <= A)  # B ⊆ A? True
print(A == B)  # Therefore A = B!`
        },
        {
          title: 'Empty Set is Universal Subset',
          description: 'Why ∅ ⊆ A for any set A',
          code: `empty = set()

# Empty set is subset of everything
print(empty <= {1, 2, 3})        # True
print(empty <= {'a', 'b'})       # True
print(empty <= set())            # True (even subset of itself!)

# Why? "All elements of ∅ are in A" is vacuously true
# because there are no elements to check!`
        }
      ],
      keyPoints: [
        '**∅ ⊆ A** for any set A (empty set is universal subset)',
        '**A ⊆ A** always (reflexive property)',
        'If **A ⊆ B** and **B ⊆ C**, then **A ⊆ C** (transitive)',
        'If **A ⊆ B** and **B ⊆ A**, then **A = B** (used to prove equality)',
        'These properties make ⊆ a "partial order relation"'
      ]
    },
    {
      id: 'proper-subsets',
      title: '3. Proper vs Improper Subsets',
      content: `Not all subsets are created equal! We distinguish between **proper** and **improper** subsets.

**Proper Subset (⊂):**
A is a **proper subset** of B if A ⊆ B BUT A ≠ B. In other words, A is contained in B, but B has at least one element that A doesn't have.

We write: **A ⊂ B** (note: some books use ⊊)

**Improper Subset:**
If A = B, then A is an **improper subset** of B (and vice versa). It's technically a subset, but not a "proper" one.

**Analogy:**
- ⊆ is like ≤ (less than or equal to)
- ⊂ is like < (strictly less than)

**Visual Intuition:**
Think of Venn diagrams - a proper subset sits entirely inside another set without filling it completely.`,
      examples: [
        {
          title: 'Proper vs Improper Subsets',
          description: 'Understanding the distinction',
          code: `A = {1, 2}
B = {1, 2, 3}
C = {1, 2}

# A is a PROPER subset of B
print(A < B)   # True (A ⊂ B)
print(A <= B)  # True (A ⊆ B)

# A is an IMPROPER subset of C (they're equal)
print(A < C)   # False (NOT A ⊂ C, because A = C)
print(A <= C)  # True (A ⊆ C holds)

# Every proper subset is a subset, but not vice versa!`
        },
        {
          title: 'Counting Proper Subsets',
          description: 'How many proper subsets does a set have?',
          code: `S = {1, 2, 3}

# All subsets (including S itself):
# ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}
# Count: 2³ = 8 subsets

# Proper subsets (excluding S itself):
# ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}
# Count: 2³ - 1 = 7 proper subsets

# General formula:
# Subsets: 2^n
# Proper subsets: 2^n - 1`
        }
      ],
      keyPoints: [
        '**A ⊂ B** means A ⊆ B AND A ≠ B (proper subset)',
        'Every set has itself as an improper subset',
        'Proper subsets are "strictly smaller"',
        'Think: ⊂ is to ⊆ as < is to ≤',
        'Number of proper subsets = 2^n - 1'
      ]
    },
    {
      id: 'power-sets',
      title: '4. The Power Set',
      content: `The **power set** of a set S, written **P(S)** or **2^S**, is the set of ALL possible subsets of S.

**Definition:**
P(S) = {A : A ⊆ S}

This includes:
- The empty set ∅
- All subsets with one element
- All subsets with two elements
- ... all the way up to ...
- The set S itself

**Example:**
If S = {1, 2}, then:
P(S) = {∅, {1}, {2}, {1,2}}

**The Magic Number:**
If |S| = n, then |P(S)| = **2^n**

Why? For each element in S, you have 2 choices: include it or don't. With n elements, that's 2 × 2 × ... × 2 (n times) = 2^n possible combinations.`,
      examples: [
        {
          title: 'Building Power Sets',
          description: 'Step-by-step construction',
          code: `# Example 1: Small set
S = {1, 2}

# Binary choice for each element:
# Include 1? Yes/No → {1} or {}
# Include 2? Yes/No → {2} or {}

# All combinations:
# (No 1, No 2) → ∅
# (Yes 1, No 2) → {1}
# (No 1, Yes 2) → {2}
# (Yes 1, Yes 2) → {1, 2}

P_S = {frozenset(), frozenset({1}),
       frozenset({2}), frozenset({1, 2})}

print(f"|S| = 2, |P(S)| = {len(P_S)} = 2² = 4")`
        },
        {
          title: 'Power Set Growth',
          description: 'Exponential explosion',
          code: `# Power sets grow EXTREMELY fast
import math

for n in range(11):
    size = 2 ** n
    print(f"Set of size {n:2d} → Power set size: {size:5d}")

# Output:
# Set of size  0 → Power set size:     1
# Set of size  1 → Power set size:     2
# Set of size  2 → Power set size:     4
# Set of size  3 → Power set size:     8
# Set of size  4 → Power set size:    16
# Set of size  5 → Power set size:    32
# Set of size 10 → Power set size:  1024

# This is why brute-force subset enumeration becomes
# impractical very quickly!`
        },
        {
          title: 'Real-World: Feature Subsets in ML',
          description: 'Feature selection as power set exploration',
          code: `# Given 10 features, how many feature subsets exist?
features = {
    'age', 'income', 'education', 'location', 'clicks',
    'time_on_site', 'device', 'referrer', 'session_count', 'purchases'
}

n_features = len(features)
n_subsets = 2 ** n_features

print(f"Number of features: {n_features}")
print(f"Number of possible feature subsets: {n_subsets:,}")
# Output: 1,024 possible combinations!

# This is why we need smart feature selection algorithms
# instead of trying every subset (brute force)`
        }
      ],
      keyPoints: [
        '**P(S)** is the set of all subsets of S',
        'Always includes ∅ and S itself',
        'Size formula: **|P(S)| = 2^|S|**',
        'Power sets grow exponentially',
        'Each element gives a binary choice: in or out'
      ]
    },
    {
      id: 'power-set-structure',
      title: '5. Understanding the 2^n Formula',
      content: `Why does |P(S)| = 2^n? Let's build intuition through multiple perspectives:

**Perspective 1: Binary Choices**
For each of the n elements, you decide: "include it or not?" That's 2 choices per element.
- Element 1: in or out? (2 choices)
- Element 2: in or out? (2 choices)
- Element 3: in or out? (2 choices)
Total: 2 × 2 × 2 = 2^n combinations

**Perspective 2: Binary Strings**
Every subset corresponds to a unique n-bit binary string where bit i indicates whether element i is included.

Example: S = {a, b, c}
- 000 → ∅
- 001 → {c}
- 010 → {b}
- 011 → {b, c}
- 100 → {a}
- 101 → {a, c}
- 110 → {a, b}
- 111 → {a, b, c}

8 binary strings = 2³ subsets

**Perspective 3: Recursive Structure**
P({1, 2, 3}) can be built from P({1, 2}):
- Take all subsets of {1, 2}
- Copy them and add 3 to each copy
- Combine both groups
This doubles the size: |P({1,2,3})| = 2 × |P({1,2})| = 2 × 4 = 8`,
      examples: [
        {
          title: 'Binary String Representation',
          description: 'Mapping subsets to binary numbers',
          code: `S = ['a', 'b', 'c']
n = len(S)

print("All subsets as binary representations:")
for i in range(2 ** n):
    # Convert i to binary and build subset
    binary = format(i, f'0{n}b')
    subset = {S[j] for j in range(n) if binary[j] == '1'}
    print(f"{i}: {binary} → {subset if subset else '∅'}")

# Output:
# 0: 000 → ∅
# 1: 001 → {'c'}
# 2: 010 → {'b'}
# 3: 011 → {'b', 'c'}
# 4: 100 → {'a'}
# ...`
        },
        {
          title: 'Recursive Power Set Construction',
          description: 'Building power sets recursively',
          code: `def powerset_recursive(elements):
    if not elements:
        return [set()]  # Base case: P(∅) = {∅}

    # Take one element out
    first, *rest = elements

    # Get power set of remaining elements
    subsets_without_first = powerset_recursive(rest)

    # Create new subsets by adding first to each
    subsets_with_first = [
        s | {first} for s in subsets_without_first
    ]

    # Combine both groups
    return subsets_without_first + subsets_with_first

S = {1, 2, 3}
result = powerset_recursive(list(S))
print(f"P({S}) has {len(result)} subsets = 2^{len(S)}")`
        }
      ],
      keyPoints: [
        'Each element gives 2 choices → 2^n total combinations',
        'Subsets map to binary strings of length n',
        'Recursive doubling: P(S ∪ {x}) = P(S) ∪ {A ∪ {x} : A ∈ P(S)}',
        'Power sets contain both small and large subsets',
        'Exponential growth makes enumeration expensive for large sets'
      ]
    },
    {
      id: 'applications',
      title: '6. Applications in AI and Computer Science',
      content: `Subsets and power sets appear everywhere in computer science and AI:

**1. Feature Selection (Machine Learning)**
Given n features, you must choose a subset to train your model on. Testing all possibilities means exploring the power set!

**2. Combinatorial Search**
Many optimization problems involve finding the "best subset" - knapsack problem, set cover, maximum clique, etc.

**3. Access Control & Security**
User permissions are subsets of all possible permissions. Role hierarchies form subset chains.

**4. Test Case Generation**
Testing all input combinations often requires exploring subsets of test parameters.

**5. Configuration Management**
Software features can be enabled/disabled - each configuration is a subset of all features.

**6. Database Queries**
SQL's "IN" operator checks subset membership. Query optimization considers different index subsets.

**7. Knowledge Graphs**
Entity relationships often involve subset reasoning: "all CEOs are people" means CEOs ⊂ People.`,
      examples: [
        {
          title: 'Feature Selection Problem',
          description: 'Finding optimal feature subset',
          code: `from itertools import combinations

def evaluate_feature_subset(features, subset):
    """Simulate model accuracy for a feature subset"""
    # In reality, this would train a model
    return len(subset) * 0.1 + 0.5  # Dummy score

features = {'age', 'income', 'clicks', 'time_on_site'}

# Exhaustive search over all subsets (not scalable!)
best_score = 0
best_subset = None

for size in range(1, len(features) + 1):
    for subset in combinations(features, size):
        score = evaluate_feature_subset(features, set(subset))
        if score > best_score:
            best_score = score
            best_subset = subset

print(f"Best features: {best_subset}")
print(f"Score: {best_score:.2f}")
print(f"Evaluated {2**len(features) - 1} subsets")`
        },
        {
          title: 'Subset Sum Problem (NP-Complete)',
          description: 'Finding subsets that sum to a target',
          code: `def subset_sum(numbers, target):
    """Find all subsets that sum to target"""
    n = len(numbers)
    solutions = []

    # Check all 2^n subsets
    for i in range(2 ** n):
        subset = [numbers[j] for j in range(n)
                  if (i >> j) & 1]
        if sum(subset) == target:
            solutions.append(subset)

    return solutions

numbers = [3, 1, 5, 9, 12]
target = 14

result = subset_sum(numbers, target)
print(f"Subsets summing to {target}:")
for subset in result:
    print(f"  {subset} → sum = {sum(subset)}")

# Output:
#   [3, 1, 5, 9] → sum = 14
# Note: This brute-force approach is O(2^n)!`
        }
      ],
      keyPoints: [
        'Many AI problems involve finding optimal subsets',
        'Exhaustive subset search is often impractical (2^n)',
        'Greedy algorithms and heuristics approximate optimal subsets',
        'Subset relationships model hierarchies and constraints',
        'Power set explosion motivates smarter search strategies'
      ]
    }
  ],
  summary: [
    'A subset A ⊆ B means every element of A is in B',
    'Empty set ∅ is subset of all sets; every set is subset of itself',
    'Proper subsets (A ⊂ B) exclude equality',
    'Power set P(S) contains all 2^n subsets of S',
    'Binary choice for each element explains the 2^n formula',
    'Subsets model hierarchies, permissions, and feature selection',
    'Power set explosion makes brute-force subset search impractical'
  ],
  nextSteps: [
    'Implement power set generators using recursion and iteration',
    'Practice subset checking algorithms',
    'Study combinatorial optimization problems',
    'Learn subset-based algorithms (dynamic programming, backtracking)',
    'Explore lattice theory and subset ordering',
    'Apply subset reasoning to real machine learning problems'
  ],
  checkYourUnderstanding: [
    {
      question: 'Is {1, 2} ⊆ {1, 2, 3}? Is it a proper subset?',
      answer: 'Yes, {1, 2} ⊆ {1, 2, 3} because both elements (1 and 2) are in the larger set. Yes, it is a proper subset (⊂) because {1, 2} ≠ {1, 2, 3} - the larger set has element 3 that the smaller set doesn\'t have.'
    },
    {
      question: 'True or False: The empty set ∅ is a subset of itself.',
      answer: 'TRUE. Every set is a subset of itself by the reflexive property. So ∅ ⊆ ∅. In fact, ∅ is the ONLY subset of the empty set, so P(∅) = {∅} which has size 2^0 = 1.'
    },
    {
      question: 'How many subsets does {1, 2, 3, 4} have? How many are proper subsets?',
      answer: 'Total subsets: 2^4 = 16 (including the set itself and the empty set). Proper subsets: 2^4 - 1 = 15 (excluding the set itself). Every element has a binary choice (in/out), giving 2^n total combinations.'
    },
    {
      question: 'If you have 5 features for an ML model, how many possible feature subsets can you test?',
      answer: '2^5 = 32 different feature subsets (including the empty set with no features and the full set with all 5). This includes subsets of size 0, 1, 2, 3, 4, and 5. This exponential growth is why exhaustive feature selection becomes impractical for large feature sets.'
    },
    {
      question: 'What is P(P(∅))? How many elements does it have?',
      answer: 'First: P(∅) = {∅}, which has 1 element. Then: P({∅}) = {∅, {∅}}, which has 2 elements. So |P(P(∅))| = 2. This shows that the power set of the power set can get complex quickly!'
    },
    {
      question: 'Can a set be a proper subset of itself?',
      answer: 'NO. A set is always a subset of itself (A ⊆ A), but NEVER a proper subset. For A ⊂ B to be true, we need A ⊆ B AND A ≠ B. Since A = A always, we can never have A ⊂ A.'
    }
  ]
};

// ===========================================
// INTRODUCTION TO GRAPHS - Theory Lesson
// ===========================================

