import { TheoryLesson } from './types';

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

