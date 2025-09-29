import { TheoryLesson } from './types';

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

