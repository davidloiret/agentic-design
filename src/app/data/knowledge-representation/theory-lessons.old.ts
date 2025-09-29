export interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples?: {
    title: string;
    description: string;
    code?: string;
  }[];
  keyPoints?: string[];
  interactiveElement?: {
    type: 'visualization' | 'exercise' | 'diagram';
    data: any;
  };
}

export interface TheoryLesson {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisites?: string[];
  sections: TheorySection[];
  summary: string[];
  nextSteps: string[];
  checkYourUnderstanding: {
    question: string;
    answer: string;
  }[];
}

// ===========================================
// INTRODUCTION TO SETS - Theory Lesson
// ===========================================

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

export const cartesianProductsLesson: TheoryLesson = {
  id: 'cartesian-products-theory',
  title: 'Cartesian Products: Combining Sets',
  description: 'Master the art of combining sets to create structured relationships and multi-dimensional spaces',
  learningObjectives: [
    'Understand what Cartesian products are and how they combine sets',
    'Calculate the size of Cartesian products using the multiplication principle',
    'Apply Cartesian products to databases, coordinate systems, and relations',
    'Distinguish between A × B and B × A (order matters!)',
    'Use Cartesian products to model real-world structured data'
  ],
  prerequisites: ['what-are-sets'],
  sections: [
    {
      id: 'what-is-cartesian-product',
      title: 'What is a Cartesian Product?',
      content: `The **Cartesian product** is one of the most important operations for combining sets. Named after René Descartes (of "I think, therefore I am" fame), it's the foundation for coordinate systems, databases, and mathematical relations.

**Definition:** The Cartesian product A × B (read "A cross B") is the set of all **ordered pairs** (a, b) where:
- The first element a comes from set A
- The second element b comes from set B

Think of it like creating all possible combinations when you have two choices to make:
- **First choice:** Pick something from set A
- **Second choice:** Pick something from set B
- **Result:** One ordered pair (first choice, second choice)

**Key Insight:** Order matters! The pair (a, b) is different from (b, a) unless a = b. This is why we use parentheses (ordered pair) not curly braces (set).`,
      examples: [
        {
          title: 'Simple Example: Shirts and Pants',
          description: 'Creating outfits from clothing items',
          code: `Shirts = {blue, red}
Pants = {jeans, khakis}

Shirts × Pants = {
  (blue, jeans),
  (blue, khakis),
  (red, jeans),
  (red, khakis)
}

# 4 possible outfits = 2 shirts × 2 pants
# Each pair represents one complete outfit`
        },
        {
          title: 'Mathematical Example',
          description: 'Numbers and letters',
          code: `A = {1, 2}
B = {x, y, z}

A × B = {
  (1, x), (1, y), (1, z),
  (2, x), (2, y), (2, z)
}

# Notice: 6 pairs = 2 numbers × 3 letters
# |A × B| = |A| × |B| = 2 × 3 = 6`
        },
        {
          title: 'Programming Example: Form Validation',
          description: 'All combinations of username and password requirements',
          code: `# Python
usernames = {"alice", "bob", "charlie"}
auth_methods = {"password", "2FA", "biometric"}

credentials = {
    (user, method)
    for user in usernames
    for method in auth_methods
}

# Result: 9 possible authentication pairs
# Each user can authenticate 3 different ways`
        }
      ],
      keyPoints: [
        'Cartesian product A × B creates ordered pairs (a, b)',
        'Order matters: (a, b) ≠ (b, a) in general',
        'Size formula: |A × B| = |A| × |B| (multiplication principle)',
        'Result is a new set containing tuples, not individual elements',
        'If either set is empty, the product is empty: A × ∅ = ∅'
      ]
    },
    {
      id: 'size-and-properties',
      title: 'Size and Properties of Cartesian Products',
      content: `Understanding the size of Cartesian products is crucial for database design, algorithm analysis, and combinatorics.

**The Multiplication Principle**
|A × B| = |A| × |B|

This simple formula has profound implications:
- If A has 10 elements and B has 5 elements, A × B has 50 pairs
- If either set is empty, the product has 0 pairs
- The product grows multiplicatively, not additively!

**Order Matters: Non-Commutativity**
A × B ≠ B × A (in general)

While both products have the same number of pairs, the pairs themselves are different:
- A × B contains pairs (a, b)
- B × A contains pairs (b, a)
- These are different unless A = B

**Example:**
If A = {1, 2} and B = {x, y}:
- A × B = {(1,x), (1,y), (2,x), (2,y)}
- B × A = {(x,1), (x,2), (y,1), (y,2)}

Notice: (1,x) ∈ A × B but (1,x) ∉ B × A`,
      examples: [
        {
          title: 'Size Calculations',
          description: 'Computing product sizes',
          code: `# Example 1: Small sets
A = {1, 2, 3}      # |A| = 3
B = {a, b}         # |B| = 2
|A × B| = 3 × 2 = 6 pairs

# Example 2: Larger sets
Students = {all students in class}   # 30 students
Projects = {proj1, proj2, proj3}     # 3 projects
|Students × Projects| = 30 × 3 = 90 possible assignments

# Example 3: Empty set
A = {1, 2, 3}
∅ = {}
|A × ∅| = 3 × 0 = 0 (empty product)`
        },
        {
          title: 'Database Table Size',
          description: 'Estimating cross join result size',
          code: `# SQL CROSS JOIN creates Cartesian product
Users table: 1,000 rows
Orders table: 5,000 rows

# CROSS JOIN result:
SELECT * FROM Users CROSS JOIN Orders
# Result: 1,000 × 5,000 = 5,000,000 rows!

# Warning: Cartesian products explode in size
# Always use WHERE clauses to filter
SELECT * FROM Users u, Orders o
WHERE u.user_id = o.user_id  # This filters the product`
        }
      ],
      keyPoints: [
        'Size grows multiplicatively: |A × B| = |A| × |B|',
        'Cartesian products can become very large very quickly',
        'A × B and B × A have the same size but different elements',
        'Empty set makes any product empty',
        'In databases, unfiltered joins create Cartesian products (danger!)'
      ]
    },
    {
      id: 'coordinate-systems',
      title: 'Cartesian Products as Coordinate Systems',
      content: `The most famous application of Cartesian products is the **Cartesian coordinate system** - the (x, y) graphs you know from mathematics!

**The 2D Plane: ℝ × ℝ = ℝ²**

When we take the Cartesian product of real numbers with themselves, we get the 2D plane:
- ℝ = {all real numbers}
- ℝ × ℝ = {(x, y) | x, y ∈ ℝ}
- Each point (x, y) represents a location in 2D space

This is why we call them "Cartesian coordinates" - they come from the Cartesian product!

**Higher Dimensions**
- ℝ³ = ℝ × ℝ × ℝ (3D space with points (x, y, z))
- ℝⁿ = ℝ × ℝ × ... × ℝ (n-dimensional space)

**Discrete Grids**
For computer graphics and game development, we use discrete Cartesian products:
- Grid = {0, 1, 2, ..., width-1} × {0, 1, 2, ..., height-1}
- Each pair (x, y) is one pixel position`,
      examples: [
        {
          title: 'Game Board as Cartesian Product',
          description: 'Chess board positions',
          code: `# Chess board: 8×8 grid
Files = {a, b, c, d, e, f, g, h}  # columns
Ranks = {1, 2, 3, 4, 5, 6, 7, 8}  # rows

Chess_Board = Files × Ranks
# = {(a,1), (a,2), ..., (h,7), (h,8)}
# 64 squares total

# Each position like (e, 4) is one square
# Notation: "e4" represents the pair (e, 4)`
        },
        {
          title: 'Image Pixels',
          description: 'Digital image representation',
          code: `# Image: 1920×1080 pixels
Width = {0, 1, 2, ..., 1919}   # x-coordinates
Height = {0, 1, 2, ..., 1079}  # y-coordinates

Pixel_Positions = Width × Height
# 1920 × 1080 = 2,073,600 pixel locations

# Each pixel (x, y) has a color value
# Image is a function: Pixel_Positions → RGB_Colors`
        },
        {
          title: 'Feature Space in Machine Learning',
          description: 'Data points as Cartesian products',
          code: `# Simple ML example: House prices
Square_Footage = {500, 501, ..., 5000}  # continuous
Bedrooms = {1, 2, 3, 4, 5}              # discrete

Feature_Space = Square_Footage × Bedrooms
# Each house is a point (sqft, beds)
# Example: (1200, 3) = 1200 sqft, 3 bedrooms

# Model learns: Feature_Space → Price`
        }
      ],
      keyPoints: [
        'The 2D plane ℝ² is the Cartesian product ℝ × ℝ',
        'Every coordinate system is built on Cartesian products',
        'Discrete grids (pixels, game boards) use finite Cartesian products',
        'ML feature spaces are Cartesian products of feature domains',
        'Higher dimensions = more Cartesian products: ℝⁿ'
      ]
    },
    {
      id: 'relations-as-subsets',
      title: 'Relations: Subsets of Cartesian Products',
      content: `One of the most important applications of Cartesian products in computer science and mathematics is defining **relations**.

**Definition:** A relation R from set A to set B is any subset of A × B.

R ⊆ A × B

In other words:
- Start with all possible pairs in A × B
- Pick some of those pairs
- That's your relation!

**Notation:**
If (a, b) ∈ R, we often write: a R b (read "a is related to b")

**Why This Matters:**
Relations model connections, mappings, and associations:
- "is less than" between numbers
- "is a friend of" between people
- "is a prerequisite for" between courses
- "bought" between customers and products

Every relation is fundamentally a Cartesian product with some pairs selected.`,
      examples: [
        {
          title: 'Less Than Relation',
          description: 'Mathematical ordering',
          code: `A = {1, 2, 3}
A × A = {
  (1,1), (1,2), (1,3),
  (2,1), (2,2), (2,3),
  (3,1), (3,2), (3,3)
}  # All 9 possible pairs

# "Less than" relation: R = {(a,b) | a < b}
R = {(1,2), (1,3), (2,3)}  # Subset of A × A

# We can write: 1 < 2, 1 < 3, 2 < 3
# In relation notation: 1 R 2, 1 R 3, 2 R 3`
        },
        {
          title: 'Database Relations',
          description: 'SQL foreign key relationships',
          code: `# Students table
Students = {Alice, Bob, Charlie}

# Courses table
Courses = {Math, CS, Physics}

# Enrollment relation: Students × Courses
Enrollments = {
  (Alice, Math),
  (Alice, CS),
  (Bob, CS),
  (Charlie, Physics)
}  # Subset of Students × Courses

# This is literally a database table!
# Each row is one pair from the relation`
        },
        {
          title: 'Social Network Graph',
          description: 'Friendship connections',
          code: `Users = {User1, User2, User3, User4}

# All possible friendships: Users × Users
# (4 users → 16 possible directed connections)

# Actual friendships (symmetric relation)
Friendships = {
  (User1, User2), (User2, User1),  # bidirectional
  (User1, User3), (User3, User1),
  (User2, User4), (User4, User2)
}  # 6 pairs out of 16 possible

# This represents the social graph structure`
        }
      ],
      keyPoints: [
        'A relation from A to B is any subset R ⊆ A × B',
        'Relations formalize connections and associations',
        'Database tables are literally relations (subsets of Cartesian products)',
        'Graph edges are relations between vertices',
        'Functions are special relations where each input maps to exactly one output',
        'Every association in programming can be modeled as a relation'
      ]
    },
    {
      id: 'n-fold-products',
      title: 'N-Fold Cartesian Products and Powers',
      content: `We can extend Cartesian products beyond just two sets to create higher-dimensional structures.

**N-Fold Product:** S₁ × S₂ × S₃ × ... × Sₙ
The set of all n-tuples (s₁, s₂, s₃, ..., sₙ) where sᵢ ∈ Sᵢ

**Size:** |S₁ × S₂ × ... × Sₙ| = |S₁| × |S₂| × ... × |Sₙ|

**Cartesian Power:** Sⁿ = S × S × ... × S (n times)
When all sets are the same, we write Sⁿ

**Examples:**
- ℝ³ = ℝ × ℝ × ℝ (3D space)
- {0, 1}⁸ = all 8-bit binary strings (256 strings)
- {a,b,...,z}⁵ = all 5-letter combinations (26⁵ = 11,881,376!)

**Exponential Growth:**
Cartesian powers grow exponentially with n:
- {0, 1}ⁿ has 2ⁿ elements
- {A-Z}ⁿ has 26ⁿ elements
- This is why password length matters so much!`,
      examples: [
        {
          title: 'RGB Color Space',
          description: '3D Cartesian product for colors',
          code: `# RGB: Red, Green, Blue channels
# Each channel: 0-255 (256 values)
R = {0, 1, 2, ..., 255}
G = {0, 1, 2, ..., 255}
B = {0, 1, 2, ..., 255}

RGB_Space = R × G × B
# Each color is a triple (r, g, b)
# Example: (255, 0, 0) = pure red

# Total colors: 256 × 256 × 256 = 16,777,216
# This is why we have "16 million colors"`
        },
        {
          title: 'Password Strength',
          description: 'Cartesian powers and security',
          code: `# Lowercase letters only
Alphabet = {a, b, c, ..., z}  # 26 letters

# 4-character passwords
Passwords_4 = Alphabet⁴
|Passwords_4| = 26⁴ = 456,976 possible

# 8-character passwords
Passwords_8 = Alphabet⁸
|Passwords_8| = 26⁸ = 208,827,064,576

# Adding uppercase, numbers, symbols:
Full_Charset = {A-Z, a-z, 0-9, symbols}  # ~94 chars
Full_8 = Full_Charset⁸
|Full_8| = 94⁸ = 6,095,689,385,410,816

# Exponential growth makes passwords secure!`
        },
        {
          title: 'Combinatorial Optimization',
          description: 'Search spaces in AI',
          code: `# Traveling Salesman Problem (TSP)
# Visit n cities in some order
Cities = {City1, City2, ..., Cityₙ}

# All possible routes (permutations)
# Not quite Cartesian product, but related concept
Routes = {all permutations of Cities}
|Routes| = n! (factorial)

# For n=10 cities: 10! = 3,628,800 routes
# For n=20 cities: 20! = 2.4 × 10¹⁸ routes
# Combinatorial explosion!`
        }
      ],
      keyPoints: [
        'N-fold products create n-tuples: (s₁, s₂, ..., sₙ)',
        'Size multiplies: |S₁ × S₂ × ... × Sₙ| = |S₁| × |S₂| × ... × |Sₙ|',
        'Cartesian power Sⁿ = S × S × ... × S (n times)',
        'Sⁿ has |S|ⁿ elements (exponential growth!)',
        'Applications: color spaces, passwords, feature vectors, coordinate systems',
        'Exponential growth is both powerful and dangerous (computational complexity)'
      ]
    },
    {
      id: 'applications-in-ai',
      title: 'Cartesian Products in AI and Data Science',
      content: `Cartesian products are fundamental to how we structure data, design algorithms, and represent knowledge in AI systems.

**1. Feature Engineering**
Every data point in machine learning is a point in a feature space built from Cartesian products:
- Features: F₁ × F₂ × ... × Fₙ
- Each data point: (f₁, f₂, ..., fₙ)
- Model learns: Feature_Space → Output

**2. Hyperparameter Tuning (Grid Search)**
Testing all combinations of hyperparameters:
- Learning_rates × Batch_sizes × Regularization_values
- Each combination is one experiment
- Systematic exploration via Cartesian product

**3. Multi-Agent Systems**
Action spaces for multiple agents:
- Agent1_Actions × Agent2_Actions × ... × AgentN_Actions
- Each tuple is one joint action
- Coordination requires exploring this product space

**4. Knowledge Graphs**
Entities and relations form Cartesian products:
- (Entity1, Relation, Entity2) ∈ Entities × Relations × Entities
- Triple stores are subsets of these products
- Link prediction = completing the Cartesian product

**5. Reinforcement Learning**
State-action spaces:
- States × Actions = all possible (state, action) pairs
- Q-function maps: States × Actions → Values
- Policy maps: States → Actions (subset of product)`,
      examples: [
        {
          title: 'Grid Search in ML',
          description: 'Hyperparameter optimization',
          code: `# Hyperparameter space
learning_rates = {0.001, 0.01, 0.1}
batch_sizes = {16, 32, 64, 128}
dropout_rates = {0.0, 0.2, 0.5}

# All combinations to test
configs = learning_rates × batch_sizes × dropout_rates
# 3 × 4 × 3 = 36 configurations

# Grid search tries every pair
for lr in learning_rates:
    for bs in batch_sizes:
        for dr in dropout_rates:
            model = train(lr, bs, dr)
            evaluate(model)

# This is explicit Cartesian product iteration`
        },
        {
          title: 'A/B Testing Combinations',
          description: 'Experimental design',
          code: `# Website variations
Headlines = {headline_A, headline_B, headline_C}
Button_Colors = {blue, green, red}
Layouts = {layout_1, layout_2}

# All possible page variants
Variants = Headlines × Button_Colors × Layouts
# 3 × 3 × 2 = 18 different pages to test

# Each variant (h, c, l) is one experiment
# Measure conversion rate for each
# Find optimal combination`
        },
        {
          title: 'Recommendation Systems',
          description: 'User-item interaction space',
          code: `# Recommender system problem
Users = {user1, user2, ..., userₘ}
Items = {item1, item2, ..., itemₙ}

# Interaction space
User_Item_Pairs = Users × Items
# m × n possible ratings

# Observed ratings: Sparse subset
Observed = {(user, item, rating) | user rated item}
# Typically < 1% of full Cartesian product

# Goal: Predict missing pairs (matrix completion)
# Fill in the rest of the Cartesian product!`
        }
      ],
      keyPoints: [
        'ML feature spaces are Cartesian products of feature domains',
        'Hyperparameter tuning explores products of parameter values',
        'Recommender systems complete sparse Cartesian products',
        'Knowledge graphs are relations (subsets of entity products)',
        'State-action spaces in RL are Cartesian products',
        'Experimental design uses products to test all combinations',
        'Most AI problems involve navigating large Cartesian product spaces'
      ]
    }
  ],
  summary: [
    'Cartesian product A × B is the set of all ordered pairs (a, b) where a ∈ A, b ∈ B',
    'Size formula: |A × B| = |A| × |B| (multiplication principle)',
    'Order matters: (a, b) ≠ (b, a) and A × B ≠ B × A in general',
    'Coordinate systems (ℝ², ℝ³) are Cartesian products of real numbers',
    'Relations are subsets of Cartesian products: R ⊆ A × B',
    'Database tables are relations (selected pairs from Cartesian products)',
    'N-fold products create n-tuples: S₁ × S₂ × ... × Sₙ',
    'Cartesian power Sⁿ grows exponentially: |Sⁿ| = |S|ⁿ',
    'Feature spaces, hyperparameter grids, and state-action spaces use Cartesian products',
    'Understanding Cartesian products is essential for database design, ML, and algorithm analysis'
  ],
  nextSteps: [
    'Practice implementing Cartesian product generators in code',
    'Study relations and their properties (reflexive, symmetric, transitive)',
    'Explore functions as special relations (one output per input)',
    'Learn about matrix representations of relations',
    'Apply Cartesian products to database schema design',
    'Understand combinatorial complexity and optimization challenges'
  ],
  checkYourUnderstanding: [
    {
      question: 'If A = {1, 2, 3} and B = {x, y}, how many pairs are in A × B? List them.',
      answer: '|A × B| = |A| × |B| = 3 × 2 = 6 pairs. They are: {(1,x), (1,y), (2,x), (2,y), (3,x), (3,y)}. Each number from A pairs with each letter from B.'
    },
    {
      question: 'Is A × B the same as B × A? Why or why not?',
      answer: 'No! While they have the same size, they contain different pairs. A × B has pairs (a, b) while B × A has pairs (b, a). For example, if A = {1} and B = {x}, then A × B = {(1, x)} but B × A = {(x, 1)}. These are different ordered pairs.'
    },
    {
      question: 'A database has a Users table with 1,000 rows and a Products table with 500 rows. What is the size of their Cartesian product?',
      answer: '1,000 × 500 = 500,000 pairs. This would be the result of SELECT * FROM Users, Products (or CROSS JOIN). This is why unfiltered joins are dangerous - they create massive result sets!'
    },
    {
      question: 'How many 4-digit PIN codes are possible using digits 0-9?',
      answer: 'This is {0,1,2,...,9}⁴. Size = 10⁴ = 10,000 possible PINs. Each of the 4 positions can be any of 10 digits, giving 10 × 10 × 10 × 10 combinations.'
    },
    {
      question: 'What is a relation? How does it relate to Cartesian products?',
      answer: 'A relation R from set A to set B is any subset of the Cartesian product A × B. It selects certain pairs from all possible pairs. For example, the "less than" relation on {1,2,3} is the subset {(1,2), (1,3), (2,3)} ⊆ {1,2,3} × {1,2,3}.'
    },
    {
      question: 'An ML model has 3 hyperparameters: learning_rate (5 options), batch_size (4 options), dropout (3 options). How many configurations must grid search test?',
      answer: '5 × 4 × 3 = 60 configurations. Grid search tests every combination in the Cartesian product learning_rates × batch_sizes × dropout_rates. This is why random search or Bayesian optimization is often preferred for large hyperparameter spaces!'
    }
  ]
};

// ===========================================
// SUBSETS AND POWER SETS - Theory Lesson
// ===========================================

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

export const introductionToGraphsLesson: TheoryLesson = {
  id: 'what-are-graphs',
  title: 'Introduction to Graphs',
  description: 'Discover graphs - the mathematical structures that model relationships and connections',
  learningObjectives: [
    'Understand what graphs are and why they\'re fundamental to computer science',
    'Learn the key components: vertices (nodes) and edges',
    'Distinguish between different types of graphs',
    'Recognize graph structures in real-world applications',
    'Apply graph thinking to AI and network problems'
  ],
  prerequisites: ['Basic set theory', 'Cartesian products'],
  sections: [
    {
      id: 'what-is-graph',
      title: '1. What is a Graph?',
      content: `A **graph** is a mathematical structure used to model relationships between objects. It consists of two fundamental components:

**Vertices (V):** Also called nodes or points - the objects themselves
**Edges (E):** Also called links or connections - the relationships between objects

**Formal Definition:**
A graph G = (V, E) where:
- V is a set of vertices
- E is a set of edges (pairs of vertices)

**Key Insight:** Graphs represent **relationships**, not just collections. While sets tell us "what exists", graphs tell us "what connects to what".

**Visual Representation:**
Graphs are typically drawn with dots (vertices) connected by lines (edges).`,
      examples: [
        {
          title: 'Simple Graph Example',
          description: 'A social network with 4 people',
          code: `# Graph G = (V, E)

# Vertices: People
V = {'Alice', 'Bob', 'Charlie', 'Diana'}

# Edges: Friendships (who knows whom)
E = {
    ('Alice', 'Bob'),
    ('Bob', 'Charlie'),
    ('Charlie', 'Diana'),
    ('Diana', 'Alice')
}

# This creates a square of friendships:
# Alice -- Bob
#   |        |
# Diana -- Charlie`
        },
        {
          title: 'Real-World: City Road Network',
          description: 'Cities as vertices, roads as edges',
          code: `# Graph of major cities
cities = {'NYC', 'Boston', 'Philly', 'DC'}

# Direct highways connecting cities
highways = {
    ('NYC', 'Boston'),     # I-95
    ('NYC', 'Philly'),     # I-95
    ('Philly', 'DC'),      # I-95
    ('Boston', 'NYC')      # I-95 (reverse)
}

# This models which cities have direct connections
# Useful for: route planning, logistics, traffic analysis`
        },
        {
          title: 'AI Example: Knowledge Graph',
          description: 'Entities and their relationships',
          code: `# Vertices: Entities
entities = {'Python', 'Guido', 'Programming', 'AI', 'Machine Learning'}

# Edges: Relationships
relationships = {
    ('Guido', 'created', 'Python'),
    ('Python', 'used_for', 'Programming'),
    ('Python', 'used_for', 'AI'),
    ('AI', 'includes', 'Machine Learning')
}

# Knowledge graphs power:
# - Search engines (Google Knowledge Graph)
# - Recommendation systems
# - Question answering systems`
        }
      ],
      keyPoints: [
        '**Graph G = (V, E)** where V = vertices, E = edges',
        'Vertices represent objects, edges represent relationships',
        'Graphs model networks, connections, and structures',
        'Different from trees (graphs can have cycles)',
        'Fundamental to AI, databases, and network analysis'
      ]
    },
    {
      id: 'directed-vs-undirected',
      title: '2. Directed vs Undirected Graphs',
      content: `Graphs come in two fundamental flavors based on whether edges have direction:

**Undirected Graph:**
Edges are bidirectional - if there's an edge between A and B, you can traverse it in either direction.
Example: Friendship (if Alice is friends with Bob, Bob is friends with Alice)

**Directed Graph (Digraph):**
Edges have direction - an edge from A to B doesn't imply an edge from B to A.
We write directed edges as (A → B) or (A, B) with understood direction.
Example: Twitter following (Alice following Bob doesn't mean Bob follows Alice)

**Notation:**
- Undirected: {A, B} or (A, B) with no arrow
- Directed: (A → B) or just (A, B) in context

**Key Difference:** Directed graphs can model asymmetric relationships!`,
      examples: [
        {
          title: 'Undirected Graph: Facebook Friendships',
          description: 'Symmetric relationships',
          code: `# Undirected graph - friendships are mutual
class UndirectedGraph:
    def __init__(self):
        self.vertices = set()
        self.edges = set()

    def add_edge(self, u, v):
        # Store as unordered pair (both directions)
        self.edges.add(frozenset({u, v}))
        self.vertices.add(u)
        self.vertices.add(v)

    def are_connected(self, u, v):
        # Check either direction
        return frozenset({u, v}) in self.edges

graph = UndirectedGraph()
graph.add_edge('Alice', 'Bob')
print(graph.are_connected('Bob', 'Alice'))  # True (symmetric!)`
        },
        {
          title: 'Directed Graph: Twitter Follows',
          description: 'Asymmetric relationships',
          code: `# Directed graph - following is one-way
class DirectedGraph:
    def __init__(self):
        self.vertices = set()
        self.edges = set()  # Set of ordered pairs

    def add_edge(self, from_vertex, to_vertex):
        # Direction matters!
        self.edges.add((from_vertex, to_vertex))
        self.vertices.add(from_vertex)
        self.vertices.add(to_vertex)

    def has_edge(self, u, v):
        # Must check exact direction
        return (u, v) in self.edges

graph = DirectedGraph()
graph.add_edge('Alice', 'Bob')  # Alice follows Bob
print(graph.has_edge('Alice', 'Bob'))  # True
print(graph.has_edge('Bob', 'Alice'))  # False (not mutual!)`
        },
        {
          title: 'Web Page Links (Directed)',
          description: 'PageRank uses directed graphs',
          code: `# Web pages and hyperlinks
pages = {'home.html', 'about.html', 'contact.html', 'blog.html'}

# Links are directed (one-way)
links = {
    ('home.html', 'about.html'),    # Home links to About
    ('home.html', 'blog.html'),     # Home links to Blog
    ('blog.html', 'home.html'),     # Blog links back to Home
    ('about.html', 'contact.html')  # About links to Contact
}

# Google's PageRank algorithm uses this directed structure
# to determine which pages are most important`
        }
      ],
      keyPoints: [
        '**Undirected:** Edges work both ways (symmetric relationships)',
        '**Directed:** Edges have direction (asymmetric relationships)',
        'Social networks often mix both types',
        'Choice affects which algorithms you can use',
        'Directed graphs are more general (can model any relationship)'
      ]
    },
    {
      id: 'weighted-graphs',
      title: '3. Weighted Graphs',
      content: `Sometimes edges aren't just "connected or not" - they have associated costs, distances, or strengths. These are **weighted graphs**.

**Weight:** A number assigned to each edge representing some quantity:
- Distance (miles between cities)
- Cost (price of flight)
- Capacity (bandwidth of network link)
- Strength (confidence in relationship)
- Time (duration of journey)

**Notation:**
We write weighted edges as (A, B, w) where w is the weight.

**Example:**
A weighted edge (NYC, Boston, 215) means "NYC to Boston with distance 215 miles"

**Why Weights Matter:**
Many real-world problems involve optimization - finding the shortest path, minimum cost, or maximum flow. Weights let us model these quantities directly.`,
      examples: [
        {
          title: 'Weighted Graph: Flight Prices',
          description: 'Finding cheapest flights',
          code: `# Cities and flight costs
class WeightedGraph:
    def __init__(self):
        self.vertices = set()
        self.edges = {}  # (u, v) -> weight

    def add_edge(self, u, v, weight):
        self.edges[(u, v)] = weight
        self.vertices.add(u)
        self.vertices.add(v)

    def get_weight(self, u, v):
        return self.edges.get((u, v), float('inf'))

graph = WeightedGraph()
graph.add_edge('NYC', 'LA', 350)      # $350
graph.add_edge('NYC', 'Chicago', 200)  # $200
graph.add_edge('Chicago', 'LA', 180)   # $180

# Total: NYC -> Chicago -> LA = $200 + $180 = $380
# Direct: NYC -> LA = $350 (cheaper!)
# Weights enable route optimization`
        },
        {
          title: 'Weighted Graph: Road Distances',
          description: 'GPS navigation systems',
          code: `# Road network with distances in miles
roads = {
    ('Boston', 'NYC'): 215,
    ('NYC', 'Philly'): 95,
    ('Philly', 'DC'): 140,
    ('Boston', 'Philly'): 305
}

# Dijkstra's algorithm uses these weights
# to find shortest paths for navigation
# This is how Google Maps works!

def shortest_distance(roads, start, end):
    # Would implement Dijkstra's algorithm here
    pass`
        },
        {
          title: 'AI Example: Neural Network',
          description: 'Weights represent connection strength',
          code: `# Neural network as weighted directed graph
# Vertices: Neurons
# Edges: Connections with weights (learned parameters)

class NeuralNetworkGraph:
    def __init__(self):
        self.neurons = set()
        self.weights = {}  # (neuron_i, neuron_j) -> weight

    def add_connection(self, from_neuron, to_neuron, weight):
        self.weights[(from_neuron, to_neuron)] = weight
        self.neurons.add(from_neuron)
        self.neurons.add(to_neuron)

# Input layer -> Hidden layer -> Output layer
nn = NeuralNetworkGraph()
nn.add_connection('input_1', 'hidden_1', 0.5)
nn.add_connection('input_2', 'hidden_1', -0.3)
nn.add_connection('hidden_1', 'output', 0.8)

# Forward pass computes: output = Σ(weight × input)`
        }
      ],
      keyPoints: [
        '**Weighted edges** have numerical values (cost, distance, etc.)',
        'Enable optimization problems (shortest path, min cost)',
        'Essential for GPS, logistics, and network routing',
        'Neural networks are weighted directed graphs',
        'Weights can be positive, negative, or zero'
      ]
    },
    {
      id: 'special-graphs',
      title: '4. Special Types of Graphs',
      content: `Certain graph structures appear so frequently they have special names:

**Complete Graph (Kₙ):**
Every vertex is connected to every other vertex. If |V| = n, then |E| = n(n-1)/2.
Example: A group chat where everyone can message everyone.

**Bipartite Graph:**
Vertices can be divided into two disjoint sets where edges only connect vertices from different sets.
Example: Students and courses (students enroll in courses, but courses don't connect to each other).

**Tree:**
A connected graph with no cycles. Exactly n-1 edges for n vertices.
Example: File system hierarchy, organizational chart, decision trees.

**Cyclic Graph:**
Contains at least one cycle (path that starts and ends at the same vertex).
Example: Ring network, circular dependencies.

**DAG (Directed Acyclic Graph):**
Directed graph with no cycles. Crucial for task scheduling and dependency resolution.
Example: Course prerequisites, build dependencies, blockchain.`,
      examples: [
        {
          title: 'Complete Graph: Tournament',
          description: 'Every team plays every other team',
          code: `# Round-robin tournament - everyone plays everyone
teams = {'Team A', 'Team B', 'Team C', 'Team D'}

# Complete graph K₄ has 4×3/2 = 6 edges
matches = {
    ('Team A', 'Team B'),
    ('Team A', 'Team C'),
    ('Team A', 'Team D'),
    ('Team B', 'Team C'),
    ('Team B', 'Team D'),
    ('Team C', 'Team D')
}

print(f"Number of matches: {len(matches)}")  # 6
print(f"Formula: n(n-1)/2 = 4×3/2 = {4*3//2}")  # 6`
        },
        {
          title: 'Bipartite Graph: Students and Courses',
          description: 'Two distinct sets with connections between',
          code: `# Bipartite graph: Students <-> Courses
students = {'Alice', 'Bob', 'Charlie'}
courses = {'CS101', 'MATH200', 'PHYS150'}

# Enrollments (edges only between different sets)
enrollments = {
    ('Alice', 'CS101'),
    ('Alice', 'MATH200'),
    ('Bob', 'CS101'),
    ('Bob', 'PHYS150'),
    ('Charlie', 'MATH200')
}

# No edge between two students or two courses
# This structure is common in recommendation systems:
# Users <-> Products they bought/rated`
        },
        {
          title: 'DAG: Course Prerequisites',
          description: 'Directed acyclic graph for dependencies',
          code: `# University course prerequisites (DAG)
courses = {
    'CS101': [],                          # No prereqs
    'CS201': ['CS101'],                   # Needs CS101
    'CS301': ['CS201'],                   # Needs CS201
    'MATH200': [],                        # No prereqs
    'CS250': ['CS101', 'MATH200'],        # Needs both
    'CS350': ['CS250', 'CS301']           # Needs both
}

# No cycles allowed - can't have circular prerequisites!
# DAGs enable topological sorting (valid course ordering)

def can_graduate(courses_taken, courses_required):
    # Check if all prerequisites are satisfied
    pass

# Used in: package managers (npm, pip), build systems (Make)`
        }
      ],
      keyPoints: [
        '**Complete graphs** connect everything to everything',
        '**Bipartite graphs** have two distinct groups',
        '**Trees** are connected and acyclic',
        '**DAGs** are directed without cycles (dependencies)',
        'Special structures enable specialized algorithms'
      ]
    },
    {
      id: 'graph-properties',
      title: '5. Essential Graph Properties',
      content: `Understanding these properties helps analyze and categorize graphs:

**Degree:**
The number of edges incident to a vertex.
- In undirected graphs: degree(v) = number of neighbors
- In directed graphs: in-degree + out-degree

**Path:**
A sequence of vertices where each adjacent pair is connected by an edge.
Example: A → B → C → D is a path of length 3

**Cycle:**
A path that starts and ends at the same vertex.
Example: A → B → C → A

**Connected:**
An undirected graph is connected if there's a path between every pair of vertices.

**Strongly Connected:**
A directed graph is strongly connected if there's a directed path between every pair of vertices in both directions.

**Sparse vs Dense:**
- Sparse: Few edges relative to vertices (|E| ≈ |V|)
- Dense: Many edges (|E| ≈ |V|²)`,
      examples: [
        {
          title: 'Computing Vertex Degrees',
          description: 'Counting connections',
          code: `# Undirected graph
graph = {
    'A': {'B', 'C', 'D'},      # A connects to B, C, D
    'B': {'A', 'C'},           # B connects to A, C
    'C': {'A', 'B', 'D'},      # C connects to A, B, D
    'D': {'A', 'C'}            # D connects to A, C
}

# Degree = number of neighbors
for vertex, neighbors in graph.items():
    print(f"degree({vertex}) = {len(neighbors)}")

# Output:
# degree(A) = 3
# degree(B) = 2
# degree(C) = 3
# degree(D) = 2

# Handshaking lemma: Sum of degrees = 2|E|
# 3 + 2 + 3 + 2 = 10 = 2 × 5 edges`
        },
        {
          title: 'Directed Graph: In-Degree and Out-Degree',
          description: 'Followers and following on Twitter',
          code: `# Directed graph (following relationships)
followers = {
    'Alice': {'Bob', 'Charlie'},  # Alice follows Bob & Charlie
    'Bob': {'Alice'},             # Bob follows Alice
    'Charlie': {'Alice', 'Bob'}   # Charlie follows Alice & Bob
}

# Out-degree: How many you follow
# In-degree: How many follow you

def compute_degrees(graph):
    out_degree = {v: len(following) for v, following in graph.items()}
    in_degree = {}

    for v, following in graph.items():
        for followed in following:
            in_degree[followed] = in_degree.get(followed, 0) + 1

    return out_degree, in_degree

out, in_ = compute_degrees(followers)
print(f"Alice: {out['Alice']} following, {in_['Alice']} followers")
# Alice: 2 following, 2 followers`
        },
        {
          title: 'Finding Paths: BFS Preview',
          description: 'Check if two vertices are connected',
          code: `from collections import deque

def is_connected(graph, start, end):
    """Check if there's a path from start to end"""
    if start == end:
        return True

    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        vertex = queue.popleft()

        for neighbor in graph.get(vertex, set()):
            if neighbor == end:
                return True
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return False

# Example: Social network
network = {
    'Alice': {'Bob'},
    'Bob': {'Charlie'},
    'Charlie': {'Diana'}
}

print(is_connected(network, 'Alice', 'Diana'))  # True (path exists)
print(is_connected(network, 'Diana', 'Alice'))  # False (one-way)`
        }
      ],
      keyPoints: [
        '**Degree** counts edges at a vertex',
        '**Paths** connect vertices through edges',
        '**Cycles** are closed paths',
        '**Connected** means all vertices are reachable',
        'Properties determine which algorithms apply'
      ]
    },
    {
      id: 'graphs-in-ai',
      title: '6. Graphs in AI and Computer Science',
      content: `Graphs are everywhere in computer science and AI:

**1. Social Networks**
People are vertices, friendships/follows are edges. Used for friend recommendations, influence analysis, community detection.

**2. Knowledge Graphs**
Entities are vertices, relationships are edges. Powers Google Search, question answering, semantic search.

**3. Neural Networks**
Neurons are vertices, connections are weighted edges. Deep learning architectures are graphs.

**4. Search Problems**
States are vertices, actions are edges. A*, Dijkstra's, and BFS find optimal paths.

**5. Dependency Resolution**
Tasks/packages are vertices, dependencies are edges. Build systems, package managers use topological sort.

**6. Recommendation Systems**
Users and items form bipartite graphs. Collaborative filtering uses graph structure.

**7. Computer Networks**
Routers are vertices, connections are edges. Routing algorithms find best paths.

**8. Program Analysis**
Functions/classes are vertices, calls/imports are edges. Detects circular dependencies, optimization opportunities.`,
      examples: [
        {
          title: 'Knowledge Graph: Movie Recommendations',
          description: 'Graph-based filtering',
          code: `# Simple movie recommendation graph
# Users, Movies, Genres, Actors all as vertices

knowledge_graph = {
    # User preferences
    ('User_1', 'likes', 'Inception'),
    ('User_1', 'likes', 'Interstellar'),

    # Movie properties
    ('Inception', 'genre', 'Sci-Fi'),
    ('Interstellar', 'genre', 'Sci-Fi'),
    ('Inception', 'director', 'Nolan'),
    ('Interstellar', 'director', 'Nolan'),

    # Another user
    ('User_2', 'likes', 'Inception'),
}

# Graph reasoning:
# User_1 likes Sci-Fi → recommend more Sci-Fi
# User_1 likes Nolan → recommend Nolan films
# User_2 likes same as User_1 → recommend Interstellar

# This is how Netflix/Spotify work!`
        },
        {
          title: 'Dependency Graph: Build System',
          description: 'Determining build order',
          code: `# Software build dependencies (DAG)
dependencies = {
    'main.o': ['main.c', 'utils.h'],
    'utils.o': ['utils.c', 'utils.h'],
    'app': ['main.o', 'utils.o']
}

# Topological sort gives valid build order:
# 1. Compile main.c -> main.o
# 2. Compile utils.c -> utils.o
# 3. Link main.o + utils.o -> app

# Make, Bazel, Webpack all use dependency graphs
# Enables parallel builds and incremental compilation`
        },
        {
          title: 'Search Problem: Route Planning',
          description: 'State space as a graph',
          code: `# GPS navigation as graph search
# Vertices: Intersections/landmarks
# Edges: Road segments with distances

city_map = {
    'Home': [('Store', 2.5), ('Park', 1.8)],
    'Store': [('Home', 2.5), ('Work', 3.2)],
    'Park': [('Home', 1.8), ('Work', 2.1)],
    'Work': [('Store', 3.2), ('Park', 2.1)]
}

# Dijkstra's algorithm finds shortest path
# From: Home
# To: Work
# Options:
#   Home -> Store -> Work = 2.5 + 3.2 = 5.7 miles
#   Home -> Park -> Work = 1.8 + 2.1 = 3.9 miles ✓ (shorter!)

# This is the foundation of all GPS systems`
        }
      ],
      keyPoints: [
        'Graphs model relationships in almost every domain',
        'Social networks, knowledge graphs, and neural nets are all graphs',
        'Search and pathfinding are fundamental graph problems',
        'Dependencies and scheduling use DAGs',
        'Understanding graphs unlocks countless algorithms'
      ]
    }
  ],
  summary: [
    'Graphs G = (V, E) consist of vertices and edges',
    'Directed graphs have one-way edges; undirected have two-way',
    'Weighted graphs assign costs/distances to edges',
    'Special types: trees, DAGs, bipartite, complete graphs',
    'Key properties: degree, paths, cycles, connectivity',
    'Graphs power social networks, knowledge bases, and AI systems',
    'Understanding graphs is essential for modern computing'
  ],
  nextSteps: [
    'Learn graph representation techniques (adjacency matrix vs list)',
    'Master graph traversal algorithms (BFS, DFS)',
    'Study shortest path algorithms (Dijkstra\'s, A*)',
    'Explore graph neural networks (GNNs)',
    'Apply graphs to real-world problems',
    'Understand computational complexity of graph algorithms'
  ],
  checkYourUnderstanding: [
    {
      question: 'What are the two fundamental components of a graph? Give an example.',
      answer: 'Vertices (V) and Edges (E). Example: In a social network, vertices are people and edges are friendships. Graph G = (V, E) where V = {Alice, Bob, Charlie} and E = {(Alice, Bob), (Bob, Charlie)}.'
    },
    {
      question: 'What is the difference between a directed and undirected graph? Give a real-world example of each.',
      answer: 'Undirected: edges work both ways (symmetric). Example: Facebook friendships - if Alice is friends with Bob, Bob is friends with Alice. Directed: edges have one direction (asymmetric). Example: Twitter following - Alice can follow Bob without Bob following Alice back.'
    },
    {
      question: 'A complete graph K₅ has 5 vertices. How many edges does it have?',
      answer: 'Using the formula n(n-1)/2 = 5(4)/2 = 10 edges. In a complete graph, every vertex connects to every other vertex, so with 5 vertices, each connects to 4 others, giving 5×4/2 = 10 total edges (divided by 2 to avoid counting each edge twice).'
    },
    {
      question: 'What is a DAG and why is it useful? Give an example.',
      answer: 'DAG = Directed Acyclic Graph - a directed graph with no cycles (you can\'t follow edges and return to where you started). Useful for modeling dependencies that can\'t be circular. Example: Course prerequisites (CS201 requires CS101, but CS101 can\'t require CS201). Used in build systems, package managers, and task scheduling.'
    },
    {
      question: 'In a directed graph, what is the difference between in-degree and out-degree?',
      answer: 'In-degree = number of edges coming IN to a vertex. Out-degree = number of edges going OUT from a vertex. On Twitter: in-degree = your followers, out-degree = who you follow. They can be different! You might follow 100 people but have 10 followers.'
    },
    {
      question: 'Why are graphs called the "universal data structure" in computer science?',
      answer: 'Graphs can model almost any relationship or network: social connections, web pages, neural networks, dependencies, maps, etc. Many specialized structures (trees, lists) are special cases of graphs. Most real-world problems involve relationships, making graphs fundamental to AI, databases, networks, and algorithms.'
    }
  ]
};

// ============================================
// LOGIC & RELATIONS THEORY LESSONS
// ============================================

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

export const theoryLessons: { [key: string]: TheoryLesson } = {
  'what-are-sets': introductionToSetsLesson,
  'subsets-powersets-theory': subsetsAndPowerSetsLesson,
  'cartesian-products-theory': cartesianProductsLesson,
  'what-are-graphs': introductionToGraphsLesson,
  'first-order-logic': firstOrderLogicLesson,
  'relations-theory': relationsTheoryLesson
};