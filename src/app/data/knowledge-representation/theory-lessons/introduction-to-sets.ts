import { TheoryLesson } from './types';

export const introductionToSetsLesson: TheoryLesson = {
  id: 'what-are-sets',
  title: 'Introduction to Sets',
  description: 'Master the fundamental concept of sets - the foundation of mathematical reasoning and knowledge representation',
  learningObjectives: [
    'Understand what sets are and why they matter in AI and mathematics',
    'Learn to recognize and create sets using proper notation',
    'Distinguish between elements, collections, and sets',
    'Apply set concepts to real-world and AI scenarios'
  ],
  prerequisites: [],
  sections: [
    {
      id: 'what-is-a-set',
      title: 'What is a Set?',
      content: `A **set** is one of the most fundamental concepts in mathematics and computer science. At its core, a set is simply a **collection of distinct objects**, which we call **elements** or **members**.

Think of a set like a bag or container that holds things - but with special rules:
- **Each item appears only once** (no duplicates)
- **Order doesn't matter** (the bag doesn't care which item you put in first)
- **Items are either in the set or not** (no "half-in" or "maybe")

This simplicity is what makes sets so powerful. They're the building blocks for representing knowledge, organizing data, and reasoning about relationships in AI systems.`,
      examples: [
        {
          title: 'Everyday Sets',
          description: 'Sets appear everywhere in daily life:',
          code: `• Days of the week: {Monday, Tuesday, Wednesday, ...}
• Primary colors: {Red, Blue, Yellow}
• Vowels in English: {A, E, I, O, U}
• Your favorite movies: {Inception, The Matrix, Interstellar}`
        },
        {
          title: 'AI & Computer Science Sets',
          description: 'In AI and programming, sets are fundamental:',
          code: `• Training data labels: {cat, dog, bird, fish}
• Feature names: {age, height, weight, income}
• Valid actions: {move_forward, turn_left, turn_right, stop}
• Token vocabulary: {the, is, a, and, ...} (all words an LLM knows)`
        }
      ],
      keyPoints: [
        'A set is a well-defined collection of distinct objects',
        'Elements in a set are unique - no duplicates allowed',
        'Order does not matter: {1, 2, 3} = {3, 2, 1}',
        'Sets can contain anything: numbers, words, objects, even other sets!'
      ]
    },
    {
      id: 'set-notation',
      title: 'How to Write Sets: Notation',
      content: `Mathematicians and computer scientists use special notation to write sets clearly and precisely. Let's learn the standard ways to represent sets.

**Roster Notation (Explicit Listing)**
The most straightforward way is to list all elements inside curly braces:

\`\`\`
A = {1, 2, 3, 4, 5}
B = {apple, banana, cherry}
C = {red, green, blue}
\`\`\`

**Set-Builder Notation (Implicit Definition)**
When sets are large or infinite, we describe the pattern or rule:

\`\`\`
D = {x | x is an even number between 1 and 10}
   = {2, 4, 6, 8, 10}

E = {x | x is a positive integer}
   = {1, 2, 3, 4, 5, ...}  (infinite!)
\`\`\`

Read the "|" symbol as "such that" or "where". This says: "The set of all x such that x satisfies this condition."`,
      examples: [
        {
          title: 'Python Set Syntax',
          description: 'In Python, sets use the same curly brace notation:',
          code: `# Creating sets in Python
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
mixed = {1, "hello", 3.14, True}

# Using set comprehension (like set-builder notation)
evens = {x for x in range(1, 11) if x % 2 == 0}
# Result: {2, 4, 6, 8, 10}`
        },
        {
          title: 'AI Application: Feature Sets',
          description: 'Defining valid features for a machine learning model:',
          code: `# All available features for a user profile
user_features = {
    "age", "location", "interests",
    "browsing_history", "purchase_history"
}

# Features selected for privacy-preserving model
selected_features = {
    f for f in user_features
    if f not in {"browsing_history", "purchase_history"}
}
# Result: {"age", "location", "interests"}`
        }
      ],
      keyPoints: [
        'Curly braces {} denote a set',
        'Elements are separated by commas',
        'Roster notation lists all elements explicitly',
        'Set-builder notation describes elements by a rule or property',
        'Most programming languages support sets natively'
      ]
    },
    {
      id: 'membership',
      title: 'Membership: Is It In The Set?',
      content: `The most basic question we ask about sets is: **"Is this thing in the set?"**

We use special symbols to express membership:
- **∈** means "is an element of" or "is in"
- **∉** means "is not an element of" or "is not in"

For example, if A = {1, 2, 3, 4, 5}:
- 3 ∈ A (true: 3 is in the set)
- 7 ∉ A (true: 7 is not in the set)
- 2 ∈ A (true: 2 is in the set)

This simple test - checking membership - is one of the most common operations in computer science. Hash tables, databases, and search algorithms all optimize this operation.`,
      examples: [
        {
          title: 'Checking Membership in Code',
          description: 'Testing if an element exists in a set:',
          code: `# Python
valid_actions = {"login", "logout", "register", "reset_password"}

if "login" in valid_actions:
    print("Valid action!")  # This prints

if "delete_account" in valid_actions:
    print("Valid action!")  # This does NOT print`
        },
        {
          title: 'AI Application: Label Validation',
          description: 'Ensuring predicted labels are valid:',
          code: `# Valid output labels for an image classifier
valid_labels = {"cat", "dog", "bird", "fish"}

# Model prediction
predicted_label = model.predict(image)

# Validate prediction
if predicted_label in valid_labels:
    return predicted_label
else:
    return "unknown"  # Handle invalid prediction`
        }
      ],
      keyPoints: [
        'Membership is the fundamental set operation',
        '∈ (element of) tests if something is in a set',
        '∉ (not element of) tests if something is NOT in a set',
        'Set membership tests are typically O(1) or O(log n) - very fast!',
        'This operation is crucial for validation, filtering, and access control'
      ]
    },
    {
      id: 'special-sets',
      title: 'Special Sets You Should Know',
      content: `Certain sets appear so frequently that they have special names and symbols.

**The Empty Set (∅ or {})**
The set with no elements at all. Think of it as an empty container.
- Important in logic: it represents "nothing" or "false conditions"
- Useful in AI: empty feature sets, no valid actions, no matching results

**Finite vs Infinite Sets**
- **Finite set**: Has a countable number of elements
  - Example: {1, 2, 3, 4, 5} has exactly 5 elements
- **Infinite set**: Goes on forever
  - Example: ℕ = {1, 2, 3, 4, ...} (all natural numbers)

**Universal Set (U)**
The set of "everything" in the context of your problem. It contains all possible elements you're considering.
- In a card game: U = {all 52 cards}
- In an LLM: U = {all tokens in the vocabulary}
- In a classification task: U = {all possible classes}`,
      examples: [
        {
          title: 'Empty Set in Practice',
          description: 'The empty set has practical meaning:',
          code: `# No results found
search_results = set()  # Empty set

# No common interests between users
user1_interests = {"hiking", "reading", "gaming"}
user2_interests = {"cooking", "dancing", "traveling"}
common = user1_interests & user2_interests  # {}

# No valid moves available (game over!)
valid_moves = set()  # Empty - game cannot continue`
        },
        {
          title: 'Universal Set in Classification',
          description: 'Defining all possible outcomes:',
          code: `# Binary classification
U_binary = {"positive", "negative"}

# Multi-class classification
U_sentiment = {"very_negative", "negative", "neutral",
               "positive", "very_positive"}

# Open-vocabulary classification (infinite!)
U_open = "any possible text string"  # Conceptually infinite`
        }
      ],
      keyPoints: [
        'The empty set (∅) is the set containing no elements',
        'Empty sets are not "nothing" - they are a valid, useful concept',
        'Finite sets have a countable number of elements',
        'Infinite sets continue forever (like all integers)',
        'The universal set defines the "universe of discourse" for your problem'
      ]
    },
    {
      id: 'cardinality',
      title: 'Cardinality: How Big Is The Set?',
      content: `The **cardinality** of a set is simply the number of elements it contains. We write it as |A| (read: "the cardinality of A" or "the size of A").

For finite sets, this is straightforward:
- A = {1, 2, 3} → |A| = 3
- B = {cat, dog} → |B| = 2
- ∅ (empty set) → |∅| = 0

Cardinality tells us "how much information" or "how many options" a set represents. In AI:
- |vocabulary| = how many unique words an LLM knows
- |training_data| = how many examples we have
- |valid_actions| = how many choices an agent has

For infinite sets, cardinality gets more interesting (some infinities are "bigger" than others!), but that's advanced mathematics we'll skip for now.`,
      examples: [
        {
          title: 'Computing Cardinality',
          description: 'Finding the size of sets in code:',
          code: `# Python
actions = {"move", "jump", "duck", "shoot"}
print(len(actions))  # 4

# Even with duplicates, sets store unique elements
numbers = {1, 2, 2, 3, 3, 3, 4}
print(len(numbers))  # 4 (not 7!)

# Empty set
empty = set()
print(len(empty))  # 0`
        },
        {
          title: 'Cardinality in ML',
          description: 'Understanding dataset and model properties:',
          code: `# Classification problem setup
num_classes = len(label_set)  # |label_set|
num_features = len(feature_set)  # |feature_set|
dataset_size = len(training_examples)  # |training_data|

print(f"Training {dataset_size} examples")
print(f"with {num_features} features")
print(f"to predict {num_classes} classes")

# Example output:
# Training 10000 examples
# with 50 features
# to predict 5 classes`
        }
      ],
      keyPoints: [
        'Cardinality |A| is the number of elements in set A',
        'For finite sets, it\'s a simple count',
        'The empty set has cardinality 0',
        'Cardinality measures "information content" or "choice space"',
        'In code, use len(set) in Python or set.size() in other languages'
      ]
    },
    {
      id: 'why-sets-matter-ai',
      title: 'Why Sets Matter for AI & Knowledge Representation',
      content: `Sets are not just abstract mathematics - they're the foundation of how we represent and reason about knowledge in AI systems.

**1. Categorical Knowledge**
Sets naturally represent categories and classifications:
- "Dogs are mammals" → dog ∈ mammals
- "Python is a programming language" → Python ∈ programming_languages

**2. Feature Spaces**
Every ML model works with sets of features:
- Valid inputs: F = {feature₁, feature₂, ..., featureₙ}
- Data point: A vector in the feature space defined by F

**3. Discrete Action Spaces**
Reinforcement learning agents choose from a set of actions:
- A = {up, down, left, right, jump, shoot}
- Policy: π(state) → action ∈ A

**4. Knowledge Graphs**
Sets define the entities and relations:
- Entities: E = {person, place, organization, ...}
- Relations: R = {works_for, located_in, born_in, ...}
- Triple: (entity₁, relation, entity₂) where entity₁, entity₂ ∈ E and relation ∈ R

**5. Constraint Satisfaction**
AI planning uses sets to define:
- Valid states: S (set of all possible world states)
- Goal states: G ⊆ S (subset of states that satisfy goals)
- Actions available in each state: A(s) ⊆ A for state s ∈ S`,
      examples: [
        {
          title: 'Sets in Natural Language Processing',
          description: 'How sets structure language understanding:',
          code: `# Token vocabulary - fundamental set for any NLP model
vocabulary = {"the", "is", "a", "cat", "dog", ...}  # |V| ≈ 50,000+

# Named entity types
entity_types = {"PERSON", "LOCATION", "ORGANIZATION",
                "DATE", "MONEY"}

# Part-of-speech tags
pos_tags = {"NOUN", "VERB", "ADJ", "ADV", "PREP", ...}

# Every word must be: word ∈ vocabulary
# Every entity tagged as: entity_type ∈ entity_types
# Every token tagged with: pos ∈ pos_tags`
        },
        {
          title: 'Sets in Recommendation Systems',
          description: 'Representing user preferences and items:',
          code: `# All available items
all_items = {item_1, item_2, ..., item_n}

# User has interacted with
user_history = {item_5, item_17, item_23, ...}

# Items user hasn't seen yet (candidate set)
candidates = all_items - user_history

# Final recommendations (subset of candidates)
recommendations = top_k(candidates)  # recommendations ⊆ candidates`
        }
      ],
      keyPoints: [
        'Sets formalize categories, types, and classifications',
        'All AI models implicitly use sets to define their "vocabulary"',
        'Feature engineering is about choosing the right set of features',
        'Action spaces in RL are sets of possible actions',
        'Knowledge graphs are built from sets of entities and relations',
        'Understanding sets is essential for AI system design'
      ]
    }
  ],
  summary: [
    'A **set** is a collection of distinct objects called elements',
    'Elements appear only once (no duplicates), and order doesn\'t matter',
    'We write sets using **curly braces**: A = {1, 2, 3, 4}',
    'The **∈** symbol means "is an element of" (membership test)',
    'The **empty set** (∅) contains no elements and has cardinality 0',
    '**Cardinality** |A| is the number of elements in set A',
    'Sets are fundamental to AI: they represent vocabularies, action spaces, feature sets, and categories',
    'Every AI system uses sets to define what\'s valid, possible, or known'
  ],
  nextSteps: [
    'Learn set operations (union, intersection, difference) to combine and compare sets',
    'Study subsets and power sets to understand hierarchical relationships',
    'Explore Cartesian products to create structured data representations',
    'Apply set theory to design better AI systems and knowledge representations'
  ],
  checkYourUnderstanding: [
    {
      question: 'What makes {1, 2, 3} and {3, 2, 1} the same set?',
      answer: 'Order doesn\'t matter in sets. Both contain exactly the same elements (1, 2, and 3), so they are the same set. We write {1, 2, 3} = {3, 2, 1}.'
    },
    {
      question: 'If A = {cat, dog, bird}, what is |A|? Is fish ∈ A?',
      answer: '|A| = 3 (three elements). No, fish ∉ A (fish is not an element of A). Only cat, dog, and bird are in the set.'
    },
    {
      question: 'Why is the empty set (∅) useful in AI systems?',
      answer: 'The empty set represents "no results," "no valid options," or "no matches." For example: no search results found, no valid moves available in a game, or no common features between two data points. It\'s a valid and meaningful state.'
    },
    {
      question: 'An LLM has a vocabulary set V with |V| = 50,000 tokens. What does this mean?',
      answer: 'The LLM knows exactly 50,000 unique words/tokens. Any text it processes must be made up of elements from this set V. If it encounters a word not in V, it must handle it specially (unknown token, subword tokenization, etc.).'
    },
    {
      question: 'Write a set containing all even numbers between 1 and 10 in both roster and set-builder notation.',
      answer: 'Roster notation: E = {2, 4, 6, 8, 10}. Set-builder notation: E = {x | x is an even integer and 1 < x ≤ 10} or E = {x | x = 2n where n ∈ {1, 2, 3, 4, 5}}.'
    }
  ]
};

// ===========================================
// CARTESIAN PRODUCTS - Theory Lesson
// ===========================================

