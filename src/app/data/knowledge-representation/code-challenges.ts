import { CodeChallenge } from '../learning-content';

// ===========================================
// SUBSETS AND POWER SETS - Code Challenges
// ===========================================

export const implementPowersetChallenge: CodeChallenge = {
  id: 'implement-powerset',
  title: 'Implement Power Set Generator',
  description: `The **power set** of a set S is the set of all possible subsets of S, including the empty set and S itself.

**Key Concepts:**
- If |S| = n, then |P(S)| = 2^n
- Each element can either be included or excluded (binary choice)
- The empty set ∅ is always a subset
- The set itself is always a subset

**Example:**
If S = {1, 2, 3}, then P(S) = {
  ∅,           // empty set
  {1}, {2}, {3},           // single elements
  {1,2}, {1,3}, {2,3},     // pairs
  {1,2,3}                  // full set
}

**Your Task:**
Implement a function that generates the power set of a given set. Think about the recursive structure: P(S) can be built from P(S - {x}) for any element x.

**Approach:**
- Use recursion or iteration
- For each element, decide: include it or don't include it
- Build up all combinations systematically`,
  difficulty: 'medium',
  topic: 'Set Theory',
  template: `def powerset(s):
    """
    Generate the power set of a given set.

    Args:
        s: A set of elements (can be numbers, strings, etc.)

    Returns:
        A set of frozensets representing all subsets

    Examples:
        >>> powerset({1, 2})
        {frozenset(), frozenset({1}), frozenset({2}), frozenset({1, 2})}

        >>> powerset({})
        {frozenset()}  # Power set of empty set contains only empty set

        >>> len(powerset({1, 2, 3, 4}))
        16  # 2^4 = 16 subsets
    """
    # Your implementation here
    pass


def is_subset(a, b):
    """
    Check if set A is a subset of set B.

    A subset means every element of A is also in B.

    Args:
        a: First set
        b: Second set

    Returns:
        True if A ⊆ B, False otherwise

    Examples:
        >>> is_subset({1, 2}, {1, 2, 3})
        True

        >>> is_subset({1, 4}, {1, 2, 3})
        False

        >>> is_subset(set(), {1, 2, 3})
        True  # Empty set is subset of everything
    """
    # Your implementation here
    pass


def proper_subsets(s):
    """
    Generate all proper subsets of a set.

    A proper subset is a subset that is not equal to the original set.
    In other words, P(S) - {S}

    Args:
        s: A set of elements

    Returns:
        A set of frozensets representing all proper subsets

    Examples:
        >>> proper_subsets({1, 2})
        {frozenset(), frozenset({1}), frozenset({2})}
        # Note: {1, 2} itself is NOT included
    """
    # Your implementation here
    pass`,
  solution: `def powerset(s):
    """
    Generate the power set of a given set using recursive approach.

    Time Complexity: O(2^n) where n = |s|
    Space Complexity: O(2^n) for storing all subsets
    """
    # Convert to list for easier indexing
    elements = list(s)
    result = set()

    def generate(index, current_subset):
        """
        Recursive helper: at each position, decide include/exclude element.
        """
        # Base case: processed all elements
        if index == len(elements):
            # Add current subset to result (use frozenset since sets can't contain sets)
            result.add(frozenset(current_subset))
            return

        # Choice 1: Don't include current element
        generate(index + 1, current_subset)

        # Choice 2: Include current element
        generate(index + 1, current_subset | {elements[index]})

    generate(0, set())
    return result


# Alternative iterative solution using bit manipulation
def powerset_iterative(s):
    """
    Generate power set using iterative bit manipulation approach.

    Each subset corresponds to a binary number where bit i indicates
    whether element i is included.
    """
    elements = list(s)
    n = len(elements)
    result = set()

    # Generate all 2^n possible subsets
    for i in range(2 ** n):
        subset = set()
        for j in range(n):
            # Check if j-th bit is set
            if (i >> j) & 1:
                subset.add(elements[j])
        result.add(frozenset(subset))

    return result


def is_subset(a, b):
    """
    Check if A is a subset of B.

    Multiple approaches:
    1. Use built-in: a <= b or a.issubset(b)
    2. Check all elements: all(x in b for x in a)
    3. Set difference: (a - b) == set()
    """
    # Approach 1: Most Pythonic (built-in operator)
    return a <= b

    # Approach 2: Explicit checking
    # return all(element in b for element in a)

    # Approach 3: Set difference
    # return len(a - b) == 0


def proper_subsets(s):
    """
    Generate all proper subsets (exclude the set itself).
    """
    # Generate full power set
    power = powerset(s)

    # Remove the set itself (convert to frozenset for comparison)
    power.discard(frozenset(s))

    return power


# Bonus: More advanced subset operations
def count_subsets_of_size(s, k):
    """
    Count subsets of exactly size k.

    This is the binomial coefficient C(n, k) = n! / (k! * (n-k)!)

    Args:
        s: The set
        k: Desired subset size

    Returns:
        Number of subsets of size k

    Examples:
        >>> count_subsets_of_size({1, 2, 3}, 2)
        3  # {1,2}, {1,3}, {2,3}
    """
    from math import factorial
    n = len(s)
    if k > n or k < 0:
        return 0
    return factorial(n) // (factorial(k) * factorial(n - k))


def subsets_of_size(s, k):
    """
    Generate all subsets of exactly size k.

    Args:
        s: The set
        k: Desired subset size

    Returns:
        Set of frozensets of size k

    Examples:
        >>> subsets_of_size({1, 2, 3}, 2)
        {frozenset({1, 2}), frozenset({1, 3}), frozenset({2, 3})}
    """
    from itertools import combinations
    return {frozenset(combo) for combo in combinations(s, k)}`,
  tests: [
    {
      input: { set: [1, 2] },
      expectedOutput: { size: 4, contains_empty: true, contains_full: true },
      description: "Power set of {1, 2} has 4 subsets: ∅, {1}, {2}, {1,2}"
    },
    {
      input: { set: [] },
      expectedOutput: { size: 1, contains_empty: true },
      description: "Power set of empty set is {∅}"
    },
    {
      input: { set: [1, 2, 3] },
      expectedOutput: { size: 8 },
      description: "Power set of {1, 2, 3} has 2³ = 8 subsets"
    },
    {
      input: { subset_check: { a: [1, 2], b: [1, 2, 3] } },
      expectedOutput: { is_subset: true },
      description: "{1, 2} ⊆ {1, 2, 3} is true"
    },
    {
      input: { subset_check: { a: [1, 4], b: [1, 2, 3] } },
      expectedOutput: { is_subset: false },
      description: "{1, 4} ⊆ {1, 2, 3} is false (4 not in B)"
    },
    {
      input: { proper_subsets: [1, 2] },
      expectedOutput: { size: 3 },
      description: "Proper subsets of {1, 2} exclude {1, 2} itself, so 4 - 1 = 3"
    }
  ],
  hints: [
    "For power set: Think recursively - for each element, you have 2 choices: include it or exclude it",
    "Base case: The power set of an empty set is {∅}",
    "For a set with n elements, the power set has exactly 2^n subsets",
    "You can use bit manipulation: each binary number from 0 to 2^n - 1 represents a different subset",
    "For is_subset: Check if every element of A is in B. Python has a built-in operator: a <= b",
    "Remember: The empty set is a subset of every set, and every set is a subset of itself",
    "Use frozenset() when storing sets inside other sets (regular sets are not hashable)"
  ]
};

export const cartesianProductChallenge: CodeChallenge = {
  id: 'cartesian-product-challenge',
  title: 'Build Cartesian Products',
  description: `The **Cartesian product** A × B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.

**Key Concepts:**
- Order matters: (a, b) ≠ (b, a) unless a = b
- Size: |A × B| = |A| × |B|
- Not commutative: A × B ≠ B × A (unless A = B)
- Used in databases (SQL joins), coordinate systems, and relation definitions

**Example:**
If A = {1, 2} and B = {x, y, z}, then:
A × B = {(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)}
|A × B| = 2 × 3 = 6 pairs

**Applications:**
- Database joins: Combine records from two tables
- Coordinate systems: ℝ² = ℝ × ℝ (2D plane)
- Feature combinations: All possible (feature1, feature2) pairs
- Relations: R ⊆ A × B defines relationships between sets

**Your Task:**
Implement Cartesian product and explore its properties.`,
  difficulty: 'medium',
  topic: 'Set Theory',
  template: `def cartesian_product(a, b):
    """
    Compute the Cartesian product A × B.

    Args:
        a: First set
        b: Second set

    Returns:
        Set of tuples representing all ordered pairs (a, b)

    Examples:
        >>> cartesian_product({1, 2}, {'x', 'y'})
        {(1, 'x'), (1, 'y'), (2, 'x'), (2, 'y')}

        >>> len(cartesian_product({1, 2, 3}, {4, 5}))
        6  # 3 × 2 = 6 pairs
    """
    # Your implementation here
    pass


def n_fold_cartesian_product(sets_list):
    """
    Compute the Cartesian product of n sets: S₁ × S₂ × ... × Sₙ

    Args:
        sets_list: List of sets

    Returns:
        Set of tuples representing all ordered n-tuples

    Examples:
        >>> n_fold_cartesian_product([{1, 2}, {'a', 'b'}, {True}])
        {(1, 'a', True), (1, 'b', True), (2, 'a', True), (2, 'b', True)}
    """
    # Your implementation here
    pass


def cartesian_power(s, n):
    """
    Compute the n-th Cartesian power: S^n = S × S × ... × S (n times)

    This represents all possible sequences of length n from set S.

    Args:
        s: The set
        n: Power (number of times to take Cartesian product with itself)

    Returns:
        Set of n-tuples

    Examples:
        >>> cartesian_power({0, 1}, 3)
        # All 3-bit binary strings
        {(0,0,0), (0,0,1), (0,1,0), (0,1,1),
         (1,0,0), (1,0,1), (1,1,0), (1,1,1)}
    """
    # Your implementation here
    pass`,
  solution: `def cartesian_product(a, b):
    """
    Compute Cartesian product using set comprehension.

    Time Complexity: O(|A| × |B|)
    Space Complexity: O(|A| × |B|)
    """
    # Method 1: Set comprehension (most readable)
    return {(x, y) for x in a for y in b}

    # Method 2: Using itertools.product
    # from itertools import product
    # return set(product(a, b))


def n_fold_cartesian_product(sets_list):
    """
    Compute Cartesian product of multiple sets.

    Uses itertools.product which handles n-ary products elegantly.
    """
    from itertools import product

    if not sets_list:
        return {()}  # Empty product is the singleton set containing empty tuple

    return set(product(*sets_list))


def cartesian_power(s, n):
    """
    Compute n-th Cartesian power S^n.

    This is a special case of n_fold_cartesian_product where all sets are the same.

    Time Complexity: O(|S|^n)
    Space Complexity: O(|S|^n)
    """
    from itertools import product

    if n == 0:
        return {()}  # S^0 = {()} by convention

    return set(product(s, repeat=n))


# Bonus: Advanced Cartesian product operations
def is_relation(r, a, b):
    """
    Check if R is a valid relation from A to B.

    A relation R from A to B is any subset of A × B.

    Args:
        r: Proposed relation (set of pairs)
        a: Domain set
        b: Codomain set

    Returns:
        True if R ⊆ A × B

    Examples:
        >>> is_relation({(1, 'x'), (2, 'y')}, {1, 2}, {'x', 'y', 'z'})
        True

        >>> is_relation({(1, 'w')}, {1, 2}, {'x', 'y'})
        False  # 'w' not in B
    """
    cartesian = cartesian_product(a, b)
    return r <= cartesian  # R is subset of A × B


def domain(relation):
    """
    Extract the domain of a relation (all first elements).

    Args:
        relation: Set of ordered pairs

    Returns:
        Set of all first elements

    Examples:
        >>> domain({(1, 'x'), (2, 'y'), (1, 'z')})
        {1, 2}
    """
    return {pair[0] for pair in relation}


def range_set(relation):
    """
    Extract the range of a relation (all second elements).

    Args:
        relation: Set of ordered pairs

    Returns:
        Set of all second elements

    Examples:
        >>> range_set({(1, 'x'), (2, 'y'), (1, 'z')})
        {'x', 'y', 'z'}
    """
    return {pair[1] for pair in relation}


def inverse_relation(relation):
    """
    Compute the inverse relation R⁻¹.

    If (a, b) ∈ R, then (b, a) ∈ R⁻¹

    Args:
        relation: Set of ordered pairs

    Returns:
        Set of inverted pairs

    Examples:
        >>> inverse_relation({(1, 'x'), (2, 'y')})
        {('x', 1), ('y', 2)}
    """
    return {(b, a) for (a, b) in relation}`,
  tests: [
    {
      input: { a: [1, 2], b: ['x', 'y'] },
      expectedOutput: { size: 4 },
      description: "Cartesian product {1,2} × {x,y} has 2 × 2 = 4 pairs"
    },
    {
      input: { a: [1, 2, 3], b: ['a', 'b'] },
      expectedOutput: { size: 6 },
      description: "{1,2,3} × {a,b} has 3 × 2 = 6 pairs"
    },
    {
      input: { a: [], b: [1, 2] },
      expectedOutput: { size: 0 },
      description: "Cartesian product with empty set is empty"
    },
    {
      input: { power: { set: [0, 1], n: 2 } },
      expectedOutput: { size: 4 },
      description: "{0,1}² has 2² = 4 pairs: all 2-bit binary strings"
    },
    {
      input: { power: { set: [0, 1], n: 3 } },
      expectedOutput: { size: 8 },
      description: "{0,1}³ has 2³ = 8 triples: all 3-bit binary strings"
    },
    {
      input: { n_fold: [[1, 2], ['a'], [true]] },
      expectedOutput: { size: 2 },
      description: "{1,2} × {a} × {true} has 2 × 1 × 1 = 2 triples"
    }
  ],
  hints: [
    "Use nested loops or set comprehension: {(x, y) for x in A for y in B}",
    "Python's itertools.product is perfect for Cartesian products",
    "For n-fold products, use product(*sets_list) with unpacking",
    "For Cartesian power, use product(s, repeat=n)",
    "Remember: |A × B| = |A| × |B|, so empty set makes the product empty",
    "Cartesian products create ordered pairs (tuples), not sets",
    "Relations in mathematics are just subsets of Cartesian products!"
  ]
};

// ===========================================
// GRAPH REPRESENTATIONS - Code Challenge
// ===========================================

export const graphRepresentationsChallenge: CodeChallenge = {
  id: 'implement-graph-representations',
  title: 'Implement Graph Representations',
  description: `There are two primary ways to represent graphs in memory: **adjacency matrix** and **adjacency list**. Each has tradeoffs for space and time complexity.

**Adjacency Matrix:**
A 2D array where matrix[i][j] = 1 if there's an edge from vertex i to vertex j, 0 otherwise.
- Space: O(V²) - always uses V×V space
- Edge lookup: O(1) - constant time
- Iteration over neighbors: O(V) - must check all vertices
- Good for: Dense graphs, frequent edge queries

**Adjacency List:**
For each vertex, store a list of its neighbors.
- Space: O(V + E) - proportional to actual edges
- Edge lookup: O(degree) - depends on vertex degree
- Iteration over neighbors: O(degree) - only actual neighbors
- Good for: Sparse graphs, iterating neighbors

**Example:**
Graph with 3 vertices: 0, 1, 2
Edges: (0→1), (0→2), (1→2)

Adjacency Matrix:
[
  [0, 1, 1],  # Vertex 0 connects to 1, 2
  [0, 0, 1],  # Vertex 1 connects to 2
  [0, 0, 0]   # Vertex 2 connects to nothing
]

Adjacency List:
{
  0: [1, 2],
  1: [2],
  2: []
}

**Your Task:**
Implement both representations and their core operations.`,
  difficulty: 'medium',
  topic: 'Graph Theory',
  template: `class GraphAdjacencyMatrix:
    """
    Directed graph using adjacency matrix representation.

    Space complexity: O(V²) where V is number of vertices
    """

    def __init__(self, num_vertices):
        """
        Initialize graph with num_vertices vertices (0 to num_vertices-1).

        Args:
            num_vertices: Number of vertices in graph
        """
        pass

    def add_edge(self, u, v):
        """
        Add directed edge from vertex u to vertex v.

        Args:
            u: Source vertex
            v: Destination vertex
        """
        pass

    def has_edge(self, u, v):
        """
        Check if there's an edge from u to v.

        Args:
            u: Source vertex
            v: Destination vertex

        Returns:
            True if edge exists, False otherwise

        Time complexity: O(1)
        """
        pass

    def get_neighbors(self, u):
        """
        Get all neighbors of vertex u (vertices u points to).

        Args:
            u: Source vertex

        Returns:
            List of neighbor vertices

        Time complexity: O(V) - must check all vertices
        """
        pass

    def remove_edge(self, u, v):
        """
        Remove edge from u to v if it exists.

        Args:
            u: Source vertex
            v: Destination vertex
        """
        pass


class GraphAdjacencyList:
    """
    Directed graph using adjacency list representation.

    Space complexity: O(V + E) where V = vertices, E = edges
    """

    def __init__(self):
        """Initialize empty graph."""
        pass

    def add_vertex(self, v):
        """
        Add a vertex to the graph.

        Args:
            v: Vertex to add
        """
        pass

    def add_edge(self, u, v):
        """
        Add directed edge from vertex u to vertex v.
        Creates vertices if they don't exist.

        Args:
            u: Source vertex
            v: Destination vertex
        """
        pass

    def has_edge(self, u, v):
        """
        Check if there's an edge from u to v.

        Args:
            u: Source vertex
            v: Destination vertex

        Returns:
            True if edge exists, False otherwise

        Time complexity: O(degree(u))
        """
        pass

    def get_neighbors(self, u):
        """
        Get all neighbors of vertex u.

        Args:
            u: Source vertex

        Returns:
            List of neighbor vertices

        Time complexity: O(1) to get the list reference
        """
        pass

    def get_vertices(self):
        """
        Get all vertices in the graph.

        Returns:
            Set of all vertices
        """
        pass

    def remove_edge(self, u, v):
        """
        Remove edge from u to v if it exists.

        Args:
            u: Source vertex
            v: Destination vertex
        """
        pass`,
  solution: `class GraphAdjacencyMatrix:
    """Directed graph using adjacency matrix."""

    def __init__(self, num_vertices):
        self.num_vertices = num_vertices
        # Initialize V×V matrix with zeros
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]

    def add_edge(self, u, v):
        """Add edge u → v. O(1) time."""
        if 0 <= u < self.num_vertices and 0 <= v < self.num_vertices:
            self.matrix[u][v] = 1

    def has_edge(self, u, v):
        """Check edge existence. O(1) time."""
        if 0 <= u < self.num_vertices and 0 <= v < self.num_vertices:
            return self.matrix[u][v] == 1
        return False

    def get_neighbors(self, u):
        """Get all neighbors of u. O(V) time."""
        if not (0 <= u < self.num_vertices):
            return []

        neighbors = []
        for v in range(self.num_vertices):
            if self.matrix[u][v] == 1:
                neighbors.append(v)
        return neighbors

    def remove_edge(self, u, v):
        """Remove edge u → v. O(1) time."""
        if 0 <= u < self.num_vertices and 0 <= v < self.num_vertices:
            self.matrix[u][v] = 0

    def get_num_edges(self):
        """Count total edges. O(V²) time."""
        return sum(sum(row) for row in self.matrix)

    def get_degree(self, u):
        """
        Get out-degree of vertex u (how many edges go OUT from u).
        O(V) time.
        """
        if not (0 <= u < self.num_vertices):
            return 0
        return sum(self.matrix[u])


class GraphAdjacencyList:
    """Directed graph using adjacency list."""

    def __init__(self):
        # Dictionary: vertex -> list of neighbors
        self.adj_list = {}

    def add_vertex(self, v):
        """Add vertex if it doesn't exist. O(1) time."""
        if v not in self.adj_list:
            self.adj_list[v] = []

    def add_edge(self, u, v):
        """Add edge u → v. O(1) amortized time."""
        # Ensure both vertices exist
        self.add_vertex(u)
        self.add_vertex(v)

        # Add edge (avoid duplicates)
        if v not in self.adj_list[u]:
            self.adj_list[u].append(v)

    def has_edge(self, u, v):
        """Check edge existence. O(degree(u)) time."""
        if u not in self.adj_list:
            return False
        return v in self.adj_list[u]

    def get_neighbors(self, u):
        """Get neighbors of u. O(1) to return list reference."""
        return self.adj_list.get(u, [])

    def get_vertices(self):
        """Get all vertices. O(1) time."""
        return set(self.adj_list.keys())

    def remove_edge(self, u, v):
        """Remove edge u → v. O(degree(u)) time."""
        if u in self.adj_list and v in self.adj_list[u]:
            self.adj_list[u].remove(v)

    def get_degree(self, u):
        """Get out-degree of u. O(1) time."""
        return len(self.adj_list.get(u, []))

    def get_num_edges(self):
        """Count total edges. O(V) time."""
        return sum(len(neighbors) for neighbors in self.adj_list.values())


# Bonus: Undirected graph adapter
class UndirectedGraph:
    """
    Undirected graph (edges go both ways).
    Built on top of directed graph by adding edges in both directions.
    """

    def __init__(self, use_matrix=False, num_vertices=10):
        if use_matrix:
            self.graph = GraphAdjacencyMatrix(num_vertices)
        else:
            self.graph = GraphAdjacencyList()

    def add_edge(self, u, v):
        """Add undirected edge u ↔ v."""
        self.graph.add_edge(u, v)
        self.graph.add_edge(v, u)  # Bidirectional!

    def has_edge(self, u, v):
        """Check if edge exists (either direction)."""
        return self.graph.has_edge(u, v)

    def get_neighbors(self, u):
        """Get all neighbors of u."""
        return self.graph.get_neighbors(u)


# Bonus: Weighted graph
class WeightedGraphAdjacencyList:
    """
    Weighted directed graph using adjacency list.
    Stores (neighbor, weight) pairs.
    """

    def __init__(self):
        # vertex -> list of (neighbor, weight) tuples
        self.adj_list = {}

    def add_vertex(self, v):
        if v not in self.adj_list:
            self.adj_list[v] = []

    def add_edge(self, u, v, weight):
        """Add weighted edge u → v with given weight."""
        self.add_vertex(u)
        self.add_vertex(v)

        # Remove old edge if exists (update weight)
        self.adj_list[u] = [(n, w) for n, w in self.adj_list[u] if n != v]

        # Add new edge
        self.adj_list[u].append((v, weight))

    def get_weight(self, u, v):
        """Get weight of edge u → v. Returns None if no edge."""
        if u not in self.adj_list:
            return None

        for neighbor, weight in self.adj_list[u]:
            if neighbor == v:
                return weight
        return None

    def get_neighbors_with_weights(self, u):
        """Get list of (neighbor, weight) tuples for vertex u."""
        return self.adj_list.get(u, [])`,
  tests: [
    {
      input: { graph_type: 'matrix', vertices: 3, edges: [[0, 1], [0, 2], [1, 2]] },
      expectedOutput: { has_edge: [[0, 1, true], [1, 0, false]], neighbors_0: [1, 2] },
      description: "Adjacency matrix: verify directed edges and neighbors"
    },
    {
      input: { graph_type: 'list', edges: [['A', 'B'], ['B', 'C'], ['A', 'C']] },
      expectedOutput: { has_edge: [['A', 'B', true], ['B', 'A', false]], neighbors_A: ['B', 'C'] },
      description: "Adjacency list: verify string vertices work correctly"
    },
    {
      input: { graph_type: 'matrix', vertices: 4, check_space: true },
      expectedOutput: { space_used: 16 },
      description: "Matrix uses O(V²) space even for empty graph (4² = 16 cells)"
    },
    {
      input: { graph_type: 'list', edges: [['A', 'B'], ['B', 'C']], check_space: true },
      expectedOutput: { space_used: 5 },
      description: "List uses O(V + E) space (3 vertices + 2 edges = 5 units)"
    },
    {
      input: { operation: 'remove_edge', edges: [[0, 1], [0, 2]], remove: [0, 1] },
      expectedOutput: { has_edge_after: false, neighbors_0_after: [2] },
      description: "Edge removal works correctly in both representations"
    },
    {
      input: { graph_type: 'weighted', edges: [['A', 'B', 5], ['B', 'C', 3], ['A', 'C', 10]] },
      expectedOutput: { weight_AB: 5, weight_BC: 3 },
      description: "Weighted graph stores and retrieves edge weights"
    }
  ],
  hints: [
    "Adjacency matrix: Use a 2D list initialized with zeros. matrix[i][j] = 1 means edge from i to j",
    "Adjacency list: Use a dictionary where keys are vertices and values are lists of neighbors",
    "For undirected graphs, add edges in both directions: add_edge(u,v) and add_edge(v,u)",
    "Matrix is better for dense graphs (many edges); list is better for sparse graphs (few edges)",
    "To iterate neighbors in matrix: check entire row. In list: directly iterate the neighbor list",
    "Weighted graphs: Store (neighbor, weight) tuples in adjacency list",
    "Space comparison: Matrix always uses V², list uses V + E. For sparse graphs (E << V²), list wins!"
  ]
};

// ===========================================
// GRAPH TRAVERSAL ALGORITHMS - Code Challenge
// ===========================================

export const graphTraversalChallenge: CodeChallenge = {
  id: 'graph-traversal-challenge',
  title: 'Graph Traversal: BFS and DFS',
  description: `Graph traversal algorithms systematically visit all vertices in a graph. The two fundamental approaches are:

**Breadth-First Search (BFS):**
Explores neighbors level by level, like ripples in water.
- Uses a **queue** (FIFO - First In, First Out)
- Visits vertices by distance from start (closest first)
- Finds shortest path in unweighted graphs
- Time: O(V + E), Space: O(V)

**Depth-First Search (DFS):**
Explores as deep as possible before backtracking.
- Uses a **stack** (or recursion)
- Goes down one path completely before trying others
- Useful for detecting cycles, topological sort
- Time: O(V + E), Space: O(V)

**Visualization:**
Graph: A → B, A → C, B → D, C → D

BFS from A: A → B → C → D (level by level)
         Level 0: A
         Level 1: B, C
         Level 2: D

DFS from A: A → B → D → C (depth first)
         Path: A → B → D, backtrack, A → C

**Applications:**
- BFS: Shortest path, level-order traversal, connected components
- DFS: Cycle detection, topological sort, maze solving, dependency resolution`,
  difficulty: 'hard',
  topic: 'Graph Theory',
  template: `from collections import deque

def bfs(graph, start):
    """
    Breadth-First Search traversal of a graph.

    Args:
        graph: Dictionary representing adjacency list {vertex: [neighbors]}
        start: Starting vertex

    Returns:
        List of vertices in BFS order

    Example:
        graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}
        bfs(graph, 'A') -> ['A', 'B', 'C', 'D']
    """
    pass


def dfs(graph, start):
    """
    Depth-First Search traversal of a graph (iterative version).

    Args:
        graph: Dictionary representing adjacency list
        start: Starting vertex

    Returns:
        List of vertices in DFS order

    Example:
        graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}
        dfs(graph, 'A') -> ['A', 'B', 'D', 'C'] or ['A', 'C', 'D', 'B']
    """
    pass


def dfs_recursive(graph, start, visited=None):
    """
    Depth-First Search using recursion.

    Args:
        graph: Dictionary representing adjacency list
        start: Starting vertex
        visited: Set of already visited vertices (used in recursion)

    Returns:
        List of vertices in DFS order
    """
    pass


def shortest_path_bfs(graph, start, goal):
    """
    Find shortest path between start and goal using BFS.

    Args:
        graph: Dictionary representing adjacency list
        start: Starting vertex
        goal: Target vertex

    Returns:
        List representing shortest path from start to goal,
        or None if no path exists

    Example:
        graph = {'A': ['B'], 'B': ['C'], 'C': ['D'], 'D': []}
        shortest_path_bfs(graph, 'A', 'D') -> ['A', 'B', 'C', 'D']
    """
    pass


def is_connected(graph, u, v):
    """
    Check if there's a path from u to v using BFS.

    Args:
        graph: Dictionary representing adjacency list
        u: Source vertex
        v: Target vertex

    Returns:
        True if path exists, False otherwise
    """
    pass


def has_cycle_directed(graph):
    """
    Detect if a directed graph has a cycle using DFS.

    A cycle exists if we encounter a vertex that's currently in our
    recursion stack (being processed).

    Args:
        graph: Dictionary representing adjacency list

    Returns:
        True if cycle exists, False otherwise

    Example:
        graph = {'A': ['B'], 'B': ['C'], 'C': ['A']}  # A→B→C→A (cycle!)
        has_cycle_directed(graph) -> True
    """
    pass`,
  solution: `from collections import deque

def bfs(graph, start):
    """
    BFS traversal using a queue.

    Time: O(V + E) - visit each vertex once, check each edge once
    Space: O(V) - queue and visited set
    """
    if start not in graph:
        return []

    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        vertex = queue.popleft()  # FIFO: First In, First Out
        result.append(vertex)

        # Visit all unvisited neighbors
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result


def dfs(graph, start):
    """
    DFS traversal using a stack (iterative).

    Time: O(V + E)
    Space: O(V)
    """
    if start not in graph:
        return []

    visited = set()
    stack = [start]
    result = []

    while stack:
        vertex = stack.pop()  # LIFO: Last In, First Out

        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)

            # Add neighbors to stack (reverse order for left-to-right traversal)
            for neighbor in reversed(graph.get(vertex, [])):
                if neighbor not in visited:
                    stack.append(neighbor)

    return result


def dfs_recursive(graph, start, visited=None):
    """
    DFS using recursion (more elegant but uses call stack).

    Time: O(V + E)
    Space: O(V) for visited + O(V) for recursion stack
    """
    if visited is None:
        visited = set()

    if start not in graph or start in visited:
        return []

    visited.add(start)
    result = [start]

    # Recursively visit all unvisited neighbors
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))

    return result


def shortest_path_bfs(graph, start, goal):
    """
    Find shortest path using BFS.

    BFS guarantees shortest path in unweighted graphs because it
    explores vertices by distance (level by level).

    Time: O(V + E)
    Space: O(V)
    """
    if start not in graph or goal not in graph:
        return None

    if start == goal:
        return [start]

    visited = set()
    queue = deque([(start, [start])])  # (vertex, path_to_vertex)
    visited.add(start)

    while queue:
        vertex, path = queue.popleft()

        for neighbor in graph.get(vertex, []):
            if neighbor == goal:
                return path + [neighbor]  # Found goal!

            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None  # No path exists


def is_connected(graph, u, v):
    """
    Check connectivity using BFS.
    Could also use DFS - both work!
    """
    if u not in graph or v not in graph:
        return False

    if u == v:
        return True

    visited = set()
    queue = deque([u])
    visited.add(u)

    while queue:
        vertex = queue.popleft()

        for neighbor in graph.get(vertex, []):
            if neighbor == v:
                return True
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return False


def has_cycle_directed(graph):
    """
    Detect cycle in directed graph using DFS.

    We track three states:
    - WHITE: Unvisited
    - GRAY: Currently being processed (in recursion stack)
    - BLACK: Completely processed

    A cycle exists if we encounter a GRAY vertex (back edge).

    Time: O(V + E)
    Space: O(V)
    """
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {v: WHITE for v in graph}

    def dfs_visit(vertex):
        color[vertex] = GRAY  # Start processing

        for neighbor in graph.get(vertex, []):
            if color.get(neighbor, WHITE) == GRAY:
                # Found a back edge to ancestor -> cycle!
                return True
            if color.get(neighbor, WHITE) == WHITE:
                if dfs_visit(neighbor):
                    return True

        color[vertex] = BLACK  # Done processing
        return False

    # Check all vertices (graph might be disconnected)
    for vertex in graph:
        if color[vertex] == WHITE:
            if dfs_visit(vertex):
                return True

    return False


# Bonus: Topological sort (only works on DAGs)
def topological_sort(graph):
    """
    Topological sort using DFS.

    Only works on DAGs (Directed Acyclic Graphs).
    Returns vertices in an order where all dependencies come before dependents.

    Time: O(V + E)

    Example:
        graph = {'shirt': ['jacket'], 'jacket': [], 'pants': ['shoes'], 'shoes': []}
        topological_sort(graph) -> ['shirt', 'jacket', 'pants', 'shoes']
        (or any valid ordering where shirt before jacket, pants before shoes)
    """
    visited = set()
    stack = []

    def dfs_visit(vertex):
        visited.add(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                dfs_visit(neighbor)

        # Add to stack AFTER visiting all descendants
        stack.append(vertex)

    for vertex in graph:
        if vertex not in visited:
            dfs_visit(vertex)

    return stack[::-1]  # Reverse the stack


# Bonus: Find all paths between two vertices
def find_all_paths(graph, start, goal, path=[]):
    """
    Find all possible paths from start to goal using DFS.

    Time: Can be exponential in worst case (many paths)
    Space: O(V) for recursion depth
    """
    path = path + [start]

    if start == goal:
        return [path]

    if start not in graph:
        return []

    paths = []
    for neighbor in graph.get(start, []):
        if neighbor not in path:  # Avoid cycles
            new_paths = find_all_paths(graph, neighbor, goal, path)
            paths.extend(new_paths)

    return paths`,
  tests: [
    {
      input: { algorithm: 'bfs', graph: {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, start: 'A' },
      expectedOutput: { order: ['A', 'B', 'C', 'D'], levels: [[0], [1, 1], [2]] },
      description: "BFS visits vertices level by level (breadth-first)"
    },
    {
      input: { algorithm: 'dfs', graph: {'A': ['B', 'C'], 'B': ['D'], 'C': [], 'D': []}, start: 'A' },
      expectedOutput: { visits_D_before_C: true },
      description: "DFS goes deep before exploring siblings"
    },
    {
      input: { algorithm: 'shortest_path', graph: {'A': ['B'], 'B': ['C', 'D'], 'C': ['E'], 'D': ['E'], 'E': []}, start: 'A', goal: 'E' },
      expectedOutput: { path: ['A', 'B', 'D', 'E'], length: 4 },
      description: "BFS finds shortest path (A→B→D→E is shorter than A→B→C→E)"
    },
    {
      input: { algorithm: 'is_connected', graph: {'A': ['B'], 'B': ['C'], 'C': [], 'D': []}, check: ['A', 'C'] },
      expectedOutput: { connected: true },
      description: "A and C are connected through B"
    },
    {
      input: { algorithm: 'is_connected', graph: {'A': ['B'], 'B': [], 'C': ['D'], 'D': []}, check: ['A', 'D'] },
      expectedOutput: { connected: false },
      description: "A and D are in different components (disconnected)"
    },
    {
      input: { algorithm: 'has_cycle', graph: {'A': ['B'], 'B': ['C'], 'C': ['A']} },
      expectedOutput: { has_cycle: true },
      description: "Cycle detection: A→B→C→A forms a cycle"
    },
    {
      input: { algorithm: 'has_cycle', graph: {'A': ['B'], 'B': ['C'], 'C': []} },
      expectedOutput: { has_cycle: false },
      description: "No cycle: A→B→C is a DAG"
    }
  ],
  hints: [
    "BFS uses a queue (collections.deque). Add neighbors to back, remove from front (FIFO)",
    "DFS uses a stack (Python list). Add neighbors, pop from end (LIFO). Or use recursion!",
    "Always track visited vertices to avoid infinite loops in cyclic graphs",
    "BFS finds shortest path because it explores by distance: level 0, then level 1, then level 2...",
    "For shortest path, store the path along with each vertex in the queue: (vertex, path_to_vertex)",
    "Cycle detection: If you visit a vertex that's in your current recursion stack (being processed), there's a cycle",
    "DFS is perfect for topological sort: visit all descendants, then add to result"
  ]
};

// ============================================
// LOGIC & RELATIONS CODE CHALLENGES
// ============================================

export const equivalenceRelationsChallenge: CodeChallenge = {
  id: 'equivalence-relations-challenge',
  title: 'Equivalence Relations & Partitions',
  description: `An **equivalence relation** is reflexive, symmetric, and transitive. These special relations partition sets into disjoint **equivalence classes**.

Your task: Implement algorithms to check equivalence relation properties, compute equivalence classes, and use the Union-Find data structure.

**Key Concepts:**
- Reflexive: ∀a, aRa (every element relates to itself)
- Symmetric: ∀a,b, aRb → bRa (bidirectional)
- Transitive: ∀a,b,c, aRb ∧ bRc → aRc (chains connect)
- Equivalence class [a] = {x | xRa}
- Partition: disjoint subsets covering entire set

**Applications:**
- Modular arithmetic (congruence classes)
- Connected components in graphs
- Type equivalence in compilers
- Clustering in machine learning`,
  difficulty: 'hard',
  topic: 'Relations',
  template: `def is_reflexive(relation, elements):
    """Check if relation is reflexive on set of elements."""
    pass

def is_symmetric(relation):
    """Check if relation is symmetric."""
    pass

def is_transitive(relation):
    """Check if relation is transitive."""
    pass

def is_equivalence_relation(relation, elements):
    """Check if relation is an equivalence relation."""
    pass

def compute_equivalence_classes(relation, elements):
    """
    Compute all equivalence classes for an equivalence relation.
    Returns: list of sets, where each set is one equivalence class
    """
    pass

class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n):
        """Initialize n disjoint sets."""
        pass

    def find(self, x):
        """Find the representative of x's equivalence class."""
        pass

    def union(self, x, y):
        """Merge the equivalence classes containing x and y."""
        pass

    def same_class(self, x, y):
        """Check if x and y are in the same equivalence class."""
        pass`,
  solution: `def is_reflexive(relation, elements):
    """Check if relation is reflexive on set of elements."""
    for a in elements:
        if (a, a) not in relation:
            return False
    return True

def is_symmetric(relation):
    """Check if relation is symmetric."""
    for (a, b) in relation:
        if (b, a) not in relation:
            return False
    return True

def is_transitive(relation):
    """Check if relation is transitive."""
    # For all (a,b) and (b,c), check if (a,c) exists
    relation_set = set(relation)
    for (a, b) in relation:
        for (c, d) in relation:
            if b == c:  # Found (a,b) and (b,d)
                if (a, d) not in relation_set:
                    return False
    return True

def is_equivalence_relation(relation, elements):
    """Check if relation is an equivalence relation."""
    return (is_reflexive(relation, elements) and
            is_symmetric(relation) and
            is_transitive(relation))

def compute_equivalence_classes(relation, elements):
    """
    Compute all equivalence classes for an equivalence relation.
    Returns: list of sets, where each set is one equivalence class
    """
    # Build adjacency for easy lookup
    from collections import defaultdict
    adj = defaultdict(set)
    for (a, b) in relation:
        adj[a].add(b)

    visited = set()
    classes = []

    for elem in elements:
        if elem not in visited:
            # BFS to find all elements in this equivalence class
            eq_class = set()
            queue = [elem]
            while queue:
                current = queue.pop(0)
                if current in visited:
                    continue
                visited.add(current)
                eq_class.add(current)
                for neighbor in adj[current]:
                    if neighbor not in visited:
                        queue.append(neighbor)
            classes.append(eq_class)

    return classes

class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n):
        """Initialize n disjoint sets."""
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        """Find the representative of x's equivalence class (with path compression)."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        """Merge the equivalence classes containing x and y (union by rank)."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return  # Already in same class

        # Union by rank
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

    def same_class(self, x, y):
        """Check if x and y are in the same equivalence class."""
        return self.find(x) == self.find(y)`,
  tests: [
    {
      input: 'Reflexive check on {1,2,3} with relation {(1,1), (2,2), (3,3), (1,2)}',
      expectedOutput: 'True (all elements relate to themselves)',
      description: 'Check that (a,a) exists for all a in elements'
    },
    {
      input: 'Symmetric check on {(1,2), (2,1), (2,3), (3,2)}',
      expectedOutput: 'True (every pair has its reverse)',
      description: 'For each (a,b), verify (b,a) exists'
    },
    {
      input: 'Transitive check on {(1,2), (2,3), (1,3)}',
      expectedOutput: 'True (if aRb and bRc, then aRc)',
      description: 'Check all chains: if (a,b) and (b,c), then (a,c) must exist'
    },
    {
      input: 'Equivalence relation: Congruence mod 3 on {0,1,2,3,4,5}',
      expectedOutput: 'Classes: {0,3}, {1,4}, {2,5}',
      description: 'Elements are equivalent if they have the same remainder when divided by 3'
    },
    {
      input: 'Union-Find: union(0,1), union(2,3), union(1,2), same_class(0,3)?',
      expectedOutput: 'True (all four elements now in same class)',
      description: 'Union operations merge equivalence classes transitively'
    },
    {
      input: 'Compute equivalence classes for "same parity" on {1,2,3,4,5,6}',
      expectedOutput: '{1,3,5}, {2,4,6} (odds and evens)',
      description: 'Two numbers are equivalent if both odd or both even'
    },
    {
      input: 'Is {(a,b), (b,a), (a,a), (b,b)} an equivalence relation on {a,b}?',
      expectedOutput: 'True (reflexive, symmetric, transitive)',
      description: 'Check all three properties systematically'
    }
  ],
  hints: [
    "Reflexive: Every element must have a self-loop (a,a)",
    "Symmetric: Relations work both ways - if (a,b) then (b,a)",
    "Transitive: Follow chains - if a→b and b→c, then a→c must exist",
    "Equivalence classes form a partition: disjoint sets covering all elements",
    "Union-Find uses path compression: update parent pointers during find()",
    "Union by rank: attach smaller tree under larger tree to keep height small",
    "To find equivalence classes: start from each unvisited element and explore all related elements"
  ]
};

export const logicSystemChallenge: CodeChallenge = {
  id: 'build-logic-system',
  title: 'Build a Logic-Based Knowledge System',
  description: `Build a simple **rule-based reasoning system** that can store facts, define rules, and perform logical inference.

This is a mini-Prolog: you'll implement forward chaining (data-driven) and backward chaining (goal-driven) inference engines.

**Key Concepts:**
- **Facts:** Ground truths like Human(socrates), Mortal(x)
- **Rules:** Implications like Human(x) → Mortal(x)
- **Forward Chaining:** Start with facts, apply rules, derive new facts
- **Backward Chaining:** Start with goal, work backwards to find supporting facts
- **Unification:** Pattern matching to bind variables

**Applications:**
- Expert systems (medical diagnosis, financial advice)
- Prolog and logic programming languages
- Rule engines (business rules, workflows)
- Knowledge graphs and semantic reasoning
- AI planning and problem solving`,
  difficulty: 'hard',
  topic: 'Logic',
  template: `class KnowledgeBase:
    """A simple rule-based knowledge system."""

    def __init__(self):
        """Initialize empty knowledge base."""
        pass

    def add_fact(self, fact):
        """
        Add a fact to the knowledge base.
        Fact format: ("predicate", arg1, arg2, ...)
        Example: ("Human", "socrates")
        """
        pass

    def add_rule(self, premises, conclusion):
        """
        Add a rule: premises → conclusion
        premises: list of fact patterns (can contain variables)
        conclusion: fact pattern
        Example: [("Human", "?x")] → ("Mortal", "?x")
        """
        pass

    def query(self, fact_pattern):
        """
        Query if a fact (or pattern with variables) can be proven.
        Returns: list of variable bindings that make the query true
        Example: query(("Mortal", "?x")) → [{"?x": "socrates"}]
        """
        pass

    def forward_chain(self):
        """
        Apply forward chaining: repeatedly apply rules to derive new facts
        until no new facts can be derived.
        """
        pass

    def backward_chain(self, goal):
        """
        Use backward chaining to prove a goal.
        Returns True if goal can be proven, False otherwise.
        """
        pass

def unify(pattern, fact, bindings):
    """
    Attempt to unify a pattern with a fact given existing variable bindings.
    Returns: updated bindings if successful, None if unification fails
    Example: unify(("Human", "?x"), ("Human", "socrates"), {})
             → {"?x": "socrates"}
    """
    pass`,
  solution: `class KnowledgeBase:
    """A simple rule-based knowledge system."""

    def __init__(self):
        """Initialize empty knowledge base."""
        self.facts = set()
        self.rules = []

    def add_fact(self, fact):
        """Add a fact to the knowledge base."""
        self.facts.add(fact)

    def add_rule(self, premises, conclusion):
        """Add a rule: premises → conclusion."""
        self.rules.append((premises, conclusion))

    def query(self, fact_pattern):
        """Query if a fact pattern can be proven."""
        results = []

        # Check if pattern matches any known fact
        for fact in self.facts:
            bindings = unify(fact_pattern, fact, {})
            if bindings is not None:
                results.append(bindings)

        return results if results else [{}] if fact_pattern in self.facts else []

    def forward_chain(self):
        """Apply forward chaining to derive all possible facts."""
        changed = True
        while changed:
            changed = False
            new_facts = set()

            for premises, conclusion in self.rules:
                # Try to match all premises
                matches = self._match_premises(premises)

                for bindings in matches:
                    # Apply bindings to conclusion
                    new_fact = self._apply_bindings(conclusion, bindings)
                    if new_fact not in self.facts:
                        new_facts.add(new_fact)
                        changed = True

            self.facts.update(new_facts)

    def _match_premises(self, premises):
        """Find all ways to match a list of premises against facts."""
        if not premises:
            return [{}]

        first_premise = premises[0]
        rest_premises = premises[1:]

        results = []
        for fact in self.facts:
            bindings = unify(first_premise, fact, {})
            if bindings is not None:
                # Recursively match remaining premises
                for rest_bindings in self._match_premises(rest_premises):
                    combined = {**bindings, **rest_bindings}
                    # Check consistency
                    if self._consistent_bindings(combined):
                        results.append(combined)

        return results

    def _apply_bindings(self, pattern, bindings):
        """Apply variable bindings to a pattern."""
        result = []
        for item in pattern:
            if isinstance(item, str) and item.startswith('?'):
                result.append(bindings.get(item, item))
            else:
                result.append(item)
        return tuple(result)

    def _consistent_bindings(self, bindings):
        """Check if variable bindings are consistent."""
        return True  # Simplified for this implementation

    def backward_chain(self, goal):
        """Use backward chaining to prove a goal."""
        # Base case: goal is a known fact
        if goal in self.facts:
            return True

        # Recursive case: try to prove goal using rules
        for premises, conclusion in self.rules:
            bindings = unify(goal, conclusion, {})
            if bindings is not None:
                # Try to prove all premises
                all_proven = True
                for premise in premises:
                    premise_with_bindings = self._apply_bindings(premise, bindings)
                    if not self.backward_chain(premise_with_bindings):
                        all_proven = False
                        break

                if all_proven:
                    return True

        return False

def unify(pattern, fact, bindings):
    """Attempt to unify a pattern with a fact."""
    if len(pattern) != len(fact):
        return None

    new_bindings = bindings.copy()

    for p_item, f_item in zip(pattern, fact):
        # Variable in pattern
        if isinstance(p_item, str) and p_item.startswith('?'):
            if p_item in new_bindings:
                # Variable already bound, check consistency
                if new_bindings[p_item] != f_item:
                    return None
            else:
                # Bind variable
                new_bindings[p_item] = f_item
        # Constant in pattern must match fact
        elif p_item != f_item:
            return None

    return new_bindings`,
  tests: [
    {
      input: 'Add facts: Human(socrates), Greek(socrates). Rule: Greek(x)→Philosopher(x)',
      expectedOutput: 'Forward chain derives: Philosopher(socrates)',
      description: 'Apply rule with x=socrates to derive new fact'
    },
    {
      input: 'Unify pattern ("Human", "?x") with fact ("Human", "socrates")',
      expectedOutput: '{"?x": "socrates"}',
      description: 'Bind variable ?x to the constant socrates'
    },
    {
      input: 'KB: Human(socrates), Human(x)→Mortal(x). Query: Mortal(?y)',
      expectedOutput: '[{"?y": "socrates"}]',
      description: 'Forward chain first, then query for all mortal beings'
    },
    {
      input: 'Backward chain to prove Mortal(socrates) from Human(socrates) and rule',
      expectedOutput: 'True (goal proven by rule)',
      description: 'Work backwards: need Human(socrates), which is a fact'
    },
    {
      input: 'Multiple rules: Bird(x)→HasWings(x), Penguin(x)→Bird(x), Penguin(tweety)',
      expectedOutput: 'Derives: Bird(tweety), HasWings(tweety)',
      description: 'Chain multiple rules: Penguin→Bird→HasWings'
    },
    {
      input: 'Rule with multiple premises: Parent(x,y)∧Parent(y,z)→Grandparent(x,z)',
      expectedOutput: 'Match both premises before concluding',
      description: 'Need to find consistent bindings for all premises'
    },
    {
      input: 'Query with no matches: Mortal(?x) when no mortal facts exist',
      expectedOutput: '[] (empty list)',
      description: 'Return empty list when no facts match the pattern'
    }
  ],
  hints: [
    "Facts are ground truths - they have no variables, only constants",
    "Rules connect patterns: if premises match, conclusion can be derived",
    "Variables start with '?' by convention (like ?x, ?y)",
    "Unification binds variables to make patterns match facts",
    "Forward chaining: start with facts, apply rules, repeat until no new facts",
    "Backward chaining: start with goal, work backwards through rules to find supporting facts",
    "Keep applying rules until reaching a fixed point (no new facts can be derived)"
  ]
};

// ===========================================
// VECTOR OPERATIONS - Code Challenge
// ===========================================

export const vectorOperationsChallenge: CodeChallenge = {
  id: 'vector-operations-challenge',
  title: 'Implement Core Vector Operations for AI',
  description: `Vectors are the foundation of all modern AI. In this challenge, you'll implement the essential vector operations that power neural networks, embeddings, and machine learning algorithms.

**Key Concepts:**
- Vectors are ordered lists of numbers: [1, 2, 3]
- Every neural network operates on vectors
- Dot product is THE most important operation in AI
- Norms measure vector magnitude (used in regularization)
- Distance metrics compare vectors (used in KNN, clustering)
- Cosine similarity measures semantic similarity (used in search, recommendations)

**Why This Matters:**
- **Neural networks:** Every neuron computes a dot product
- **Word embeddings:** Similarity = cosine(v1, v2)
- **Regularization:** L1/L2 norms prevent overfitting
- **KNN:** Classification based on Euclidean distance
- **Attention:** Transformers use dot products for attention scores

**Your Task:**
Implement fundamental vector operations from scratch. These are the building blocks of NumPy, PyTorch, and TensorFlow.`,
  difficulty: 'medium',
  topic: 'Linear Algebra',
  template: `import math
from typing import List

# Type alias for clarity
Vector = List[float]

def vector_add(v: Vector, w: Vector) -> Vector:
    """
    Add two vectors element-wise.

    Args:
        v: First vector
        w: Second vector (must have same length as v)

    Returns:
        v + w (element-wise sum)

    Examples:
        >>> vector_add([1, 2, 3], [4, 5, 6])
        [5, 7, 9]

        >>> vector_add([1.5, 2.5], [0.5, 1.5])
        [2.0, 4.0]

    Raises:
        ValueError: If vectors have different lengths
    """
    # Your implementation here
    pass


def vector_subtract(v: Vector, w: Vector) -> Vector:
    """
    Subtract vector w from vector v element-wise.

    Args:
        v: First vector
        w: Second vector (must have same length as v)

    Returns:
        v - w (element-wise difference)

    Examples:
        >>> vector_subtract([5, 7, 9], [4, 5, 6])
        [1, 2, 3]

    Raises:
        ValueError: If vectors have different lengths
    """
    # Your implementation here
    pass


def scalar_multiply(c: float, v: Vector) -> Vector:
    """
    Multiply vector by a scalar.

    Args:
        c: Scalar value
        v: Vector

    Returns:
        c * v (each element multiplied by c)

    Examples:
        >>> scalar_multiply(2, [1, 2, 3])
        [2, 4, 6]

        >>> scalar_multiply(0.5, [4, 6, 8])
        [2.0, 3.0, 4.0]
    """
    # Your implementation here
    pass


def dot_product(v: Vector, w: Vector) -> float:
    """
    Compute dot product (inner product) of two vectors.

    This is THE most important operation in AI!
    - Every neuron in a neural network computes: activation = dot(weights, input) + bias
    - Transformer attention: score = dot(query, key)
    - Cosine similarity: cos(v, w) = dot(v, w) / (||v|| * ||w||)

    Args:
        v: First vector
        w: Second vector (must have same length as v)

    Returns:
        v · w = v[0]*w[0] + v[1]*w[1] + ... + v[n-1]*w[n-1]

    Examples:
        >>> dot_product([1, 2, 3], [4, 5, 6])
        32  # 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32

        >>> dot_product([1, 0], [0, 1])
        0  # Orthogonal vectors have dot product 0

    Raises:
        ValueError: If vectors have different lengths
    """
    # Your implementation here
    pass


def l1_norm(v: Vector) -> float:
    """
    Compute L1 norm (Manhattan norm) of a vector.

    L1 norm = |v[0]| + |v[1]| + ... + |v[n-1]|

    Used in:
    - L1 regularization (Lasso): encourages sparsity
    - Manhattan distance (taxi-cab distance)

    Args:
        v: Vector

    Returns:
        L1 norm (sum of absolute values)

    Examples:
        >>> l1_norm([3, 4])
        7.0  # |3| + |4| = 7

        >>> l1_norm([-1, 2, -3])
        6.0  # |-1| + |2| + |-3| = 1 + 2 + 3 = 6
    """
    # Your implementation here
    pass


def l2_norm(v: Vector) -> float:
    """
    Compute L2 norm (Euclidean norm) of a vector.

    L2 norm = sqrt(v[0]^2 + v[1]^2 + ... + v[n-1]^2)

    This is the "length" of the vector in Euclidean space.

    Used in:
    - L2 regularization (Ridge): weight decay in neural networks
    - Euclidean distance
    - Gradient clipping (prevent exploding gradients)

    Args:
        v: Vector

    Returns:
        L2 norm (Euclidean length)

    Examples:
        >>> l2_norm([3, 4])
        5.0  # sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5

        >>> l2_norm([1, 0, 0])
        1.0  # Unit vector in x-direction
    """
    # Your implementation here
    pass


def linf_norm(v: Vector) -> float:
    """
    Compute L∞ norm (max norm) of a vector.

    L∞ norm = max(|v[0]|, |v[1]|, ..., |v[n-1]|)

    Used in:
    - Adversarial robustness (bound perturbations)
    - Convergence criteria (max change in parameters)

    Args:
        v: Vector

    Returns:
        L∞ norm (maximum absolute value)

    Examples:
        >>> linf_norm([3, -7, 2])
        7.0  # max(|3|, |-7|, |2|) = 7

        >>> linf_norm([1, 1, 1])
        1.0
    """
    # Your implementation here
    pass


def euclidean_distance(v: Vector, w: Vector) -> float:
    """
    Compute Euclidean distance between two vectors.

    Distance = L2_norm(v - w) = sqrt((v[0]-w[0])^2 + (v[1]-w[1])^2 + ...)

    Used in:
    - K-Nearest Neighbors (KNN)
    - K-Means clustering
    - Distance-based similarity

    Args:
        v: First vector
        w: Second vector

    Returns:
        Euclidean distance between v and w

    Examples:
        >>> euclidean_distance([0, 0], [3, 4])
        5.0  # sqrt((3-0)^2 + (4-0)^2) = sqrt(9 + 16) = 5

        >>> euclidean_distance([1, 2, 3], [1, 2, 3])
        0.0  # Distance to self is 0

    Raises:
        ValueError: If vectors have different lengths
    """
    # Your implementation here
    pass


def manhattan_distance(v: Vector, w: Vector) -> float:
    """
    Compute Manhattan distance between two vectors.

    Distance = L1_norm(v - w) = |v[0]-w[0]| + |v[1]-w[1]| + ...

    Also called "taxi-cab distance" or "city block distance".

    Args:
        v: First vector
        w: Second vector

    Returns:
        Manhattan distance between v and w

    Examples:
        >>> manhattan_distance([0, 0], [3, 4])
        7.0  # |3-0| + |4-0| = 3 + 4 = 7

        >>> manhattan_distance([1, 2, 3], [4, 6, 5])
        9.0  # |1-4| + |2-6| + |3-5| = 3 + 4 + 2 = 9

    Raises:
        ValueError: If vectors have different lengths
    """
    # Your implementation here
    pass


def cosine_similarity(v: Vector, w: Vector) -> float:
    """
    Compute cosine similarity between two vectors.

    Cosine similarity = dot(v, w) / (||v|| * ||w||)

    Range: [-1, 1]
    - 1: vectors point in same direction (identical)
    - 0: vectors are orthogonal (unrelated)
    - -1: vectors point in opposite directions (opposite)

    This is THE key operation for semantic similarity!

    Used in:
    - Word embeddings: similarity between words
    - Document similarity: TF-IDF vectors
    - Recommendation systems: user/item similarity
    - Neural network embeddings: measure semantic similarity

    Args:
        v: First vector
        w: Second vector

    Returns:
        Cosine similarity (-1 to 1)

    Examples:
        >>> cosine_similarity([1, 0], [1, 0])
        1.0  # Identical vectors

        >>> cosine_similarity([1, 0], [0, 1])
        0.0  # Orthogonal vectors

        >>> cosine_similarity([1, 2, 3], [2, 4, 6])
        1.0  # Parallel vectors (one is scaled version of other)

    Raises:
        ValueError: If vectors have different lengths or if either vector has zero norm
    """
    # Your implementation here
    pass


def angle_between(v: Vector, w: Vector) -> float:
    """
    Compute angle (in radians) between two vectors.

    Angle = arccos(cosine_similarity(v, w))

    Range: [0, π] (0 to 180 degrees)
    - 0: vectors point in same direction
    - π/2: vectors are orthogonal
    - π: vectors point in opposite directions

    Args:
        v: First vector
        w: Second vector

    Returns:
        Angle in radians

    Examples:
        >>> angle_between([1, 0], [0, 1])
        1.5707963267948966  # π/2 radians (90 degrees)

        >>> angle_between([1, 0], [1, 0])
        0.0  # 0 radians (parallel)

    Raises:
        ValueError: If vectors have different lengths or zero norm
    """
    # Your implementation here
    pass


def project(v: Vector, w: Vector) -> Vector:
    """
    Project vector v onto vector w.

    Projection = (dot(v, w) / dot(w, w)) * w

    This gives the component of v that points in the direction of w.

    Used in:
    - Gram-Schmidt orthogonalization
    - Principal Component Analysis (PCA)
    - Removing components (e.g., bias direction in embeddings)

    Args:
        v: Vector to project
        w: Vector to project onto

    Returns:
        Projection of v onto w

    Examples:
        >>> project([3, 4], [1, 0])
        [3.0, 0.0]  # Project onto x-axis

        >>> project([1, 1], [1, 0])
        [1.0, 0.0]  # Project onto x-axis

    Raises:
        ValueError: If vectors have different lengths or w has zero norm
    """
    # Your implementation here
    pass


def normalize(v: Vector) -> Vector:
    """
    Normalize vector to unit length (L2 norm = 1).

    Normalized vector = v / ||v||

    Used in:
    - Cosine similarity (normalize before dot product)
    - Neural network weights (weight normalization)
    - Gradient clipping (normalize gradients)

    Args:
        v: Vector to normalize

    Returns:
        Unit vector in the same direction as v

    Examples:
        >>> normalize([3, 4])
        [0.6, 0.8]  # ||[3, 4]|| = 5, so [3/5, 4/5] = [0.6, 0.8]

        >>> l2_norm(normalize([1, 2, 3]))
        1.0  # Normalized vector always has length 1

    Raises:
        ValueError: If vector has zero norm (can't normalize zero vector)
    """
    # Your implementation here
    pass`,
  solution: `import math
from typing import List

Vector = List[float]

def vector_add(v: Vector, w: Vector) -> Vector:
    """Add two vectors element-wise."""
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")
    return [vi + wi for vi, wi in zip(v, w)]


def vector_subtract(v: Vector, w: Vector) -> Vector:
    """Subtract vector w from vector v element-wise."""
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")
    return [vi - wi for vi, wi in zip(v, w)]


def scalar_multiply(c: float, v: Vector) -> Vector:
    """Multiply vector by a scalar."""
    return [c * vi for vi in v]


def dot_product(v: Vector, w: Vector) -> float:
    """
    Compute dot product of two vectors.
    This is THE most important operation in AI!
    """
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")
    return sum(vi * wi for vi, wi in zip(v, w))


def l1_norm(v: Vector) -> float:
    """Compute L1 norm (Manhattan norm)."""
    return sum(abs(vi) for vi in v)


def l2_norm(v: Vector) -> float:
    """Compute L2 norm (Euclidean norm)."""
    return math.sqrt(sum(vi ** 2 for vi in v))


def linf_norm(v: Vector) -> float:
    """Compute L∞ norm (max norm)."""
    return max(abs(vi) for vi in v)


def euclidean_distance(v: Vector, w: Vector) -> float:
    """Compute Euclidean distance between two vectors."""
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")
    return l2_norm(vector_subtract(v, w))


def manhattan_distance(v: Vector, w: Vector) -> float:
    """Compute Manhattan distance between two vectors."""
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")
    return l1_norm(vector_subtract(v, w))


def cosine_similarity(v: Vector, w: Vector) -> float:
    """
    Compute cosine similarity between two vectors.
    THE key operation for semantic similarity in NLP!
    """
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")

    norm_v = l2_norm(v)
    norm_w = l2_norm(w)

    if norm_v == 0 or norm_w == 0:
        raise ValueError("Cannot compute cosine similarity with zero vector")

    return dot_product(v, w) / (norm_v * norm_w)


def angle_between(v: Vector, w: Vector) -> float:
    """Compute angle (in radians) between two vectors."""
    cos_sim = cosine_similarity(v, w)
    # Clamp to [-1, 1] to avoid numerical errors in acos
    cos_sim = max(-1.0, min(1.0, cos_sim))
    return math.acos(cos_sim)


def project(v: Vector, w: Vector) -> Vector:
    """Project vector v onto vector w."""
    if len(v) != len(w):
        raise ValueError("Vectors must have the same length")

    w_norm_squared = dot_product(w, w)
    if w_norm_squared == 0:
        raise ValueError("Cannot project onto zero vector")

    scalar = dot_product(v, w) / w_norm_squared
    return scalar_multiply(scalar, w)


def normalize(v: Vector) -> Vector:
    """Normalize vector to unit length."""
    norm = l2_norm(v)
    if norm == 0:
        raise ValueError("Cannot normalize zero vector")
    return scalar_multiply(1.0 / norm, v)`,
  tests: [
    {
      input: 'vector_add([1, 2, 3], [4, 5, 6])',
      expectedOutput: '[5, 7, 9]',
      description: 'Add corresponding elements'
    },
    {
      input: 'dot_product([1, 2, 3], [4, 5, 6])',
      expectedOutput: '32',
      description: '1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32'
    },
    {
      input: 'l2_norm([3, 4])',
      expectedOutput: '5.0',
      description: 'sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5'
    },
    {
      input: 'cosine_similarity([1, 0], [0, 1])',
      expectedOutput: '0.0',
      description: 'Orthogonal vectors have cosine similarity 0'
    },
    {
      input: 'cosine_similarity([1, 2, 3], [2, 4, 6])',
      expectedOutput: '1.0',
      description: 'Parallel vectors (one is scaled version) have cosine similarity 1'
    },
    {
      input: 'euclidean_distance([0, 0], [3, 4])',
      expectedOutput: '5.0',
      description: 'sqrt((3-0)^2 + (4-0)^2) = sqrt(9 + 16) = 5'
    },
    {
      input: 'normalize([3, 4])',
      expectedOutput: '[0.6, 0.8]',
      description: 'Divide by L2 norm: [3/5, 4/5] = [0.6, 0.8]'
    },
    {
      input: 'l2_norm(normalize([1, 2, 3]))',
      expectedOutput: '1.0',
      description: 'Normalized vectors always have L2 norm = 1'
    }
  ],
  hints: [
    "Use list comprehensions for element-wise operations: [vi + wi for vi, wi in zip(v, w)]",
    "Dot product is sum of element-wise products: sum(vi * wi for vi, wi in zip(v, w))",
    "L2 norm is sqrt of sum of squares: math.sqrt(sum(vi**2 for vi in v))",
    "Always check vector lengths match before operating on them",
    "Cosine similarity = dot(v, w) / (||v|| * ||w||) - normalize by both norms",
    "To normalize a vector, divide by its L2 norm: [vi / ||v|| for vi in v]",
    "For projection, use formula: (dot(v, w) / dot(w, w)) * w",
    "Handle edge cases: zero vectors, division by zero",
    "These operations are the foundation of NumPy/PyTorch - you're building them from scratch!"
  ]
};

// ===========================================
// MATRIX OPERATIONS & NEURAL NETWORKS - Code Challenge
// ===========================================

export const matrixNeuralNetworkChallenge: CodeChallenge = {
  id: 'matrix-neural-network-challenge',
  title: 'Build a Neural Network Layer with Matrices',
  description: `Every neural network layer is just a matrix multiplication. In this challenge, you'll implement the core matrix operations and build a complete neural network layer with forward and backward passes.

**Key Concepts:**
- Neural network layer: h = activation(W @ x + b)
- Forward pass: compute output from input
- Backward pass: compute gradients for weight updates
- Matrix multiplication is THE operation that powers all of deep learning
- Transpose reverses transformations (essential for backpropagation)

**Why This Matters:**
- **Understanding:** See exactly how neural networks work under the hood
- **Implementation:** PyTorch/TensorFlow do this, but with GPU optimization
- **Debugging:** Know what's happening when you write \`model.forward(x)\`
- **Foundation:** These operations are the building blocks of ALL deep learning

**Your Task:**
Implement matrix operations and build a complete neural network layer with automatic gradient computation. This is what happens inside every \`nn.Linear\` layer in PyTorch!

**Real-World Context:**
- GPT-3 performs ~350 trillion matrix operations per forward pass
- Training one iteration: ~1 quadrillion operations (forward + backward)
- Your CPU can do ~10 billion ops/sec, GPU ~10 trillion ops/sec
- This is why deep learning requires GPUs!`,
  difficulty: 'hard',
  topic: 'Linear Algebra',
  template: `import math
from typing import List, Tuple

# Type aliases
Matrix = List[List[float]]
Vector = List[float]

def matrix_shape(A: Matrix) -> Tuple[int, int]:
    """
    Get the shape of a matrix.

    Args:
        A: Input matrix

    Returns:
        Tuple of (rows, cols)

    Examples:
        >>> matrix_shape([[1, 2, 3], [4, 5, 6]])
        (2, 3)  # 2 rows, 3 columns
    """
    # Your implementation here
    pass


def matrix_add(A: Matrix, B: Matrix) -> Matrix:
    """
    Add two matrices element-wise.

    Args:
        A: First matrix
        B: Second matrix (must have same shape as A)

    Returns:
        A + B (element-wise sum)

    Examples:
        >>> matrix_add([[1, 2], [3, 4]], [[5, 6], [7, 8]])
        [[6, 8], [10, 12]]

    Raises:
        ValueError: If matrices have different shapes
    """
    # Your implementation here
    pass


def scalar_matrix_multiply(c: float, A: Matrix) -> Matrix:
    """
    Multiply matrix by a scalar.

    Args:
        c: Scalar value
        A: Matrix

    Returns:
        c * A (each element multiplied by c)

    Examples:
        >>> scalar_matrix_multiply(2, [[1, 2], [3, 4]])
        [[2, 4], [6, 8]]
    """
    # Your implementation here
    pass


def matrix_vector_multiply(A: Matrix, x: Vector) -> Vector:
    """
    Multiply matrix by vector.

    This is THE core operation in neural networks!
    Every layer computes: h = W @ x + b

    Args:
        A: Matrix of shape (m, n)
        x: Vector of length n

    Returns:
        A @ x (vector of length m)

    Examples:
        >>> matrix_vector_multiply([[1, 2], [3, 4]], [5, 6])
        [17, 39]  # [1*5 + 2*6, 3*5 + 4*6] = [5+12, 15+24] = [17, 39]

        >>> matrix_vector_multiply([[1, 0], [0, 1]], [3, 4])
        [3, 4]  # Identity matrix doesn't change vector

    Raises:
        ValueError: If dimensions don't match (A has n columns, x has length n)
    """
    # Your implementation here
    pass


def matrix_multiply(A: Matrix, B: Matrix) -> Matrix:
    """
    Multiply two matrices.

    C[i,j] = sum of A[i,:] · B[:,j]
    (Dot product of i-th row of A with j-th column of B)

    Args:
        A: Matrix of shape (m, n)
        B: Matrix of shape (n, p)

    Returns:
        A @ B (matrix of shape (m, p))

    Examples:
        >>> matrix_multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]])
        [[19, 22], [43, 50]]
        # [1*5 + 2*7, 1*6 + 2*8] = [5+14, 6+16] = [19, 22]
        # [3*5 + 4*7, 3*6 + 4*8] = [15+28, 18+32] = [43, 50]

    Raises:
        ValueError: If dimensions don't match (A has n columns, B has n rows)
    """
    # Your implementation here
    pass


def transpose(A: Matrix) -> Matrix:
    """
    Transpose a matrix (swap rows and columns).

    This is ESSENTIAL for backpropagation!
    Transpose reverses the transformation: if forward is W @ x, backward is W^T @ gradient

    Args:
        A: Matrix of shape (m, n)

    Returns:
        A^T (matrix of shape (n, m))

    Examples:
        >>> transpose([[1, 2, 3], [4, 5, 6]])
        [[1, 4], [2, 5], [3, 6]]

        >>> transpose([[1, 2], [3, 4]])
        [[1, 3], [2, 4]]
    """
    # Your implementation here
    pass


def relu(x: Vector) -> Vector:
    """
    Apply ReLU activation: max(0, x) element-wise.

    ReLU is the most common activation function in deep learning.
    It introduces nonlinearity (without it, deep networks collapse to single layer).

    Args:
        x: Input vector

    Returns:
        ReLU(x) = [max(0, xi) for xi in x]

    Examples:
        >>> relu([1, -2, 3, -4])
        [1, 0, 3, 0]

        >>> relu([-1, -2, -3])
        [0, 0, 0]
    """
    # Your implementation here
    pass


def relu_gradient(x: Vector) -> Vector:
    """
    Compute gradient of ReLU.

    ReLU gradient = 1 if x > 0, else 0

    This is used in backpropagation.

    Args:
        x: Input vector (before ReLU)

    Returns:
        Gradient vector: [1 if xi > 0 else 0 for xi in x]

    Examples:
        >>> relu_gradient([1, -2, 3, -4])
        [1, 0, 1, 0]

        >>> relu_gradient([0.1, -0.1, 0])
        [1, 0, 0]  # Note: x=0 typically returns 0
    """
    # Your implementation here
    pass


class NeuralNetworkLayer:
    """
    A single fully-connected neural network layer.

    Forward pass: h = ReLU(W @ x + b)
    Backward pass: compute gradients dL/dW, dL/db, dL/dx

    This is what nn.Linear + nn.ReLU does in PyTorch!
    """

    def __init__(self, input_dim: int, output_dim: int):
        """
        Initialize layer with random weights.

        Args:
            input_dim: Number of input features
            output_dim: Number of output features
        """
        # Initialize weights with small random values (He initialization)
        scale = math.sqrt(2.0 / input_dim)
        self.W = [[scale * (hash((i, j)) % 1000 - 500) / 1000
                   for j in range(input_dim)]
                  for i in range(output_dim)]
        self.b = [0.0] * output_dim

        # Cache for backpropagation
        self.x = None  # Input
        self.z = None  # W @ x + b (pre-activation)
        self.h = None  # ReLU(z) (output)

    def forward(self, x: Vector) -> Vector:
        """
        Forward pass: compute h = ReLU(W @ x + b)

        This is what happens in EVERY neural network layer!

        Args:
            x: Input vector of length input_dim

        Returns:
            h: Output vector of length output_dim

        Implementation:
            1. Compute z = W @ x + b (linear transformation)
            2. Compute h = ReLU(z) (nonlinear activation)
            3. Cache x, z, h for backpropagation
        """
        # Your implementation here
        pass

    def backward(self, dL_dh: Vector, learning_rate: float = 0.01) -> Vector:
        """
        Backward pass: compute gradients and update weights.

        Chain rule:
        - dL/dz = dL/dh * dh/dz = dL/dh * relu_gradient(z)
        - dL/dW = dL/dz @ x^T (outer product)
        - dL/db = dL/dz
        - dL/dx = W^T @ dL/dz (gradient flows backward through transpose!)

        Args:
            dL_dh: Gradient of loss with respect to output
            learning_rate: Step size for gradient descent

        Returns:
            dL_dx: Gradient of loss with respect to input (for previous layer)

        Implementation:
            1. Compute dL/dz = dL/dh * relu_gradient(z) (element-wise)
            2. Compute dL/dW = outer_product(dL/dz, x)
            3. Compute dL/db = dL/dz
            4. Compute dL/dx = W^T @ dL/dz
            5. Update weights: W = W - learning_rate * dL/dW
            6. Update bias: b = b - learning_rate * dL/db
            7. Return dL/dx
        """
        # Your implementation here
        pass


def outer_product(v: Vector, w: Vector) -> Matrix:
    """
    Compute outer product of two vectors.

    Result[i,j] = v[i] * w[j]

    Used in gradient computation: dL/dW = outer_product(dL/dz, x)

    Args:
        v: First vector (length m)
        w: Second vector (length n)

    Returns:
        Outer product (m × n matrix)

    Examples:
        >>> outer_product([1, 2], [3, 4, 5])
        [[3, 4, 5], [6, 8, 10]]
        # [1*3, 1*4, 1*5] = [3, 4, 5]
        # [2*3, 2*4, 2*5] = [6, 8, 10]
    """
    # Your implementation here
    pass


def train_neural_network(X: List[Vector], y: List[int], epochs: int = 100) -> NeuralNetworkLayer:
    """
    Train a simple 2-layer neural network on data.

    Architecture: input (2D) → hidden (4D) → output (2D)

    This demonstrates the complete training loop:
    - Forward pass (compute predictions)
    - Compute loss
    - Backward pass (compute gradients)
    - Update weights (gradient descent)

    Args:
        X: List of input vectors (each is 2D)
        y: List of labels (0 or 1)
        epochs: Number of training iterations

    Returns:
        Trained layer (just the first layer for simplicity)

    Note: This is a simplified version. Real training uses:
    - Batching (process multiple examples at once)
    - Better optimizers (Adam, not just SGD)
    - Regularization (L2, dropout)
    - Learning rate schedules
    """
    # Your implementation here
    # Create two layers: 2 → 4 → 2
    # For each epoch:
    #   For each example:
    #     Forward pass through both layers
    #     Compute loss (cross-entropy or MSE)
    #     Backward pass through both layers
    #     Update weights
    pass`,
  solution: `import math
from typing import List, Tuple

Matrix = List[List[float]]
Vector = List[float]

def matrix_shape(A: Matrix) -> Tuple[int, int]:
    """Get the shape of a matrix."""
    if not A:
        return (0, 0)
    return (len(A), len(A[0]) if A else 0)


def matrix_add(A: Matrix, B: Matrix) -> Matrix:
    """Add two matrices element-wise."""
    rows_a, cols_a = matrix_shape(A)
    rows_b, cols_b = matrix_shape(B)

    if rows_a != rows_b or cols_a != cols_b:
        raise ValueError("Matrices must have the same shape")

    return [[A[i][j] + B[i][j] for j in range(cols_a)] for i in range(rows_a)]


def scalar_matrix_multiply(c: float, A: Matrix) -> Matrix:
    """Multiply matrix by a scalar."""
    return [[c * A[i][j] for j in range(len(A[0]))] for i in range(len(A))]


def matrix_vector_multiply(A: Matrix, x: Vector) -> Vector:
    """
    Multiply matrix by vector.
    THE core operation in neural networks!
    """
    rows, cols = matrix_shape(A)
    if cols != len(x):
        raise ValueError(f"Matrix has {cols} columns but vector has {len(x)} elements")

    return [sum(A[i][j] * x[j] for j in range(cols)) for i in range(rows)]


def matrix_multiply(A: Matrix, B: Matrix) -> Matrix:
    """Multiply two matrices."""
    rows_a, cols_a = matrix_shape(A)
    rows_b, cols_b = matrix_shape(B)

    if cols_a != rows_b:
        raise ValueError(f"Cannot multiply {rows_a}×{cols_a} by {rows_b}×{cols_b}")

    result = []
    for i in range(rows_a):
        row = []
        for j in range(cols_b):
            # Dot product of row i of A with column j of B
            val = sum(A[i][k] * B[k][j] for k in range(cols_a))
            row.append(val)
        result.append(row)
    return result


def transpose(A: Matrix) -> Matrix:
    """
    Transpose a matrix.
    ESSENTIAL for backpropagation!
    """
    rows, cols = matrix_shape(A)
    return [[A[i][j] for i in range(rows)] for j in range(cols)]


def relu(x: Vector) -> Vector:
    """Apply ReLU activation: max(0, x)"""
    return [max(0.0, xi) for xi in x]


def relu_gradient(x: Vector) -> Vector:
    """Compute gradient of ReLU: 1 if x > 0, else 0"""
    return [1.0 if xi > 0 else 0.0 for xi in x]


def outer_product(v: Vector, w: Vector) -> Matrix:
    """Compute outer product: result[i,j] = v[i] * w[j]"""
    return [[vi * wj for wj in w] for vi in v]


def vector_add(v: Vector, w: Vector) -> Vector:
    """Add two vectors element-wise."""
    return [vi + wi for vi, wi in zip(v, w)]


def element_wise_multiply(v: Vector, w: Vector) -> Vector:
    """Multiply two vectors element-wise."""
    return [vi * wi for vi, wi in zip(v, w)]


class NeuralNetworkLayer:
    """
    A single fully-connected neural network layer.
    This is what nn.Linear + nn.ReLU does in PyTorch!
    """

    def __init__(self, input_dim: int, output_dim: int):
        """Initialize layer with random weights."""
        # He initialization for ReLU
        scale = math.sqrt(2.0 / input_dim)
        self.W = [[scale * (hash((i, j)) % 1000 - 500) / 1000
                   for j in range(input_dim)]
                  for i in range(output_dim)]
        self.b = [0.0] * output_dim

        # Cache for backpropagation
        self.x = None
        self.z = None
        self.h = None

    def forward(self, x: Vector) -> Vector:
        """
        Forward pass: h = ReLU(W @ x + b)
        This happens in EVERY neural network layer!
        """
        self.x = x

        # Linear transformation: z = W @ x + b
        self.z = vector_add(matrix_vector_multiply(self.W, x), self.b)

        # Nonlinear activation: h = ReLU(z)
        self.h = relu(self.z)

        return self.h

    def backward(self, dL_dh: Vector, learning_rate: float = 0.01) -> Vector:
        """
        Backward pass: compute gradients and update weights.
        This is automatic differentiation (autograd)!
        """
        # Gradient through ReLU: dL/dz = dL/dh * relu'(z)
        relu_grad = relu_gradient(self.z)
        dL_dz = element_wise_multiply(dL_dh, relu_grad)

        # Gradient for weights: dL/dW = dL/dz @ x^T (outer product)
        dL_dW = outer_product(dL_dz, self.x)

        # Gradient for bias: dL/db = dL/dz
        dL_db = dL_dz

        # Gradient for input: dL/dx = W^T @ dL/dz
        # This is how gradient flows backward through the network!
        W_T = transpose(self.W)
        dL_dx = matrix_vector_multiply(W_T, dL_dz)

        # Update weights using gradient descent
        # W = W - learning_rate * dL/dW
        update = scalar_matrix_multiply(learning_rate, dL_dW)
        self.W = matrix_add(self.W, scalar_matrix_multiply(-1, update))

        # Update bias
        self.b = vector_add(self.b, [(-learning_rate * db) for db in dL_db])

        return dL_dx


def train_neural_network(X: List[Vector], y: List[int], epochs: int = 100) -> NeuralNetworkLayer:
    """
    Train a simple 2-layer neural network.
    This demonstrates the complete training loop!
    """
    # Create two layers: 2 → 4 → 2
    layer1 = NeuralNetworkLayer(2, 4)
    layer2 = NeuralNetworkLayer(4, 2)

    for epoch in range(epochs):
        total_loss = 0.0

        for xi, yi in zip(X, y):
            # Forward pass
            h1 = layer1.forward(xi)
            h2 = layer2.forward(h1)

            # Simple loss: MSE
            # Target: [1, 0] if y=0, [0, 1] if y=1
            target = [1.0, 0.0] if yi == 0 else [0.0, 1.0]
            loss = sum((h2[i] - target[i]) ** 2 for i in range(2))
            total_loss += loss

            # Backward pass (compute gradients)
            # Gradient of MSE: dL/dh2 = 2 * (h2 - target)
            dL_dh2 = [2 * (h2[i] - target[i]) for i in range(2)]

            # Backpropagate through layer 2
            dL_dh1 = layer2.backward(dL_dh2, learning_rate=0.01)

            # Backpropagate through layer 1
            layer1.backward(dL_dh1, learning_rate=0.01)

        if epoch % 20 == 0:
            print(f"Epoch {epoch}: Loss = {total_loss:.4f}")

    return layer1  # Return first layer as example`,
  tests: [
    {
      input: 'matrix_vector_multiply([[1, 2], [3, 4]], [5, 6])',
      expectedOutput: '[17, 39]',
      description: '[1*5 + 2*6, 3*5 + 4*6] = [5+12, 15+24] = [17, 39]'
    },
    {
      input: 'matrix_multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]])',
      expectedOutput: '[[19, 22], [43, 50]]',
      description: 'Row 0: [1*5+2*7, 1*6+2*8] = [19, 22]'
    },
    {
      input: 'transpose([[1, 2, 3], [4, 5, 6]])',
      expectedOutput: '[[1, 4], [2, 5], [3, 6]]',
      description: 'Swap rows and columns'
    },
    {
      input: 'relu([1, -2, 3, -4])',
      expectedOutput: '[1, 0, 3, 0]',
      description: 'max(0, x) for each element'
    },
    {
      input: 'relu_gradient([1, -2, 3, -4])',
      expectedOutput: '[1, 0, 1, 0]',
      description: '1 if x > 0, else 0'
    },
    {
      input: 'outer_product([1, 2], [3, 4, 5])',
      expectedOutput: '[[3, 4, 5], [6, 8, 10]]',
      description: 'result[i][j] = v[i] * w[j]'
    },
    {
      input: 'layer = NeuralNetworkLayer(2, 3); layer.forward([1.0, 2.0]); len(layer.h)',
      expectedOutput: '3',
      description: 'Output dimension should match output_dim'
    },
    {
      input: 'Matrix multiply is associative: (AB)C = A(BC)',
      expectedOutput: 'True - same result, but different computation order',
      description: 'Order matters for efficiency! A@(B@c) much faster than (A@B)@c when c is vector'
    }
  ],
  hints: [
    "Matrix-vector multiply: result[i] = sum(A[i][j] * x[j] for j in range(cols))",
    "Matrix multiply: C[i][j] = sum(A[i][k] * B[k][j] for k in range(cols_A))",
    "Transpose: result[j][i] = A[i][j] (swap indices)",
    "Forward pass caches x, z, h for use in backward pass",
    "Backward pass uses chain rule: dL/dz = dL/dh * relu'(z) (element-wise)",
    "Weight gradient: dL/dW = outer_product(dL/dz, x)",
    "Input gradient: dL/dx = W^T @ dL/dz (transpose reverses transformation!)",
    "Update rule: W = W - learning_rate * dL/dW (gradient descent)",
    "This is exactly what PyTorch autograd does - you're building it from scratch!",
    "Every @ symbol in 'model.forward(x)' is a matrix multiplication like these"
  ]
};

// ===========================================
// BAYESIAN NETWORKS - Code Challenge
// ===========================================

export const bayesianNetworkChallenge: CodeChallenge = {
  id: 'bayesian-network-challenge',
  title: 'Build a Bayesian Network for Probabilistic Reasoning',
  description: `Bayesian Networks are powerful probabilistic models that represent dependencies among variables. In this challenge, you'll build a Bayesian Network from scratch and implement inference algorithms to reason under uncertainty.

**Key Concepts:**
- Directed Acyclic Graph (DAG) structure represents conditional dependencies
- Conditional Probability Tables (CPTs) encode P(X | Parents(X))
- Joint distribution: P(X₁...Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ))
- Inference: compute P(Query | Evidence) using probability rules
- Variable elimination for efficient marginalization

**Why This Matters:**
- **Medical diagnosis:** P(disease | symptoms)
- **Spam filtering:** P(spam | features)
- **Recommendation systems:** P(user likes item | context)
- **Robot localization:** P(position | sensor readings)
- **Natural language:** P(syntax tree | sentence)

**Your Task:**
Implement a Bayesian Network with:
1. DAG structure (nodes and directed edges)
2. Conditional probability tables (CPTs)
3. Inference: compute marginals and conditional probabilities
4. Variable elimination for efficient computation`,
  difficulty: 'hard',
  topic: 'Probability and Statistics',
  template: `from typing import List, Dict, Tuple, Set
from itertools import product

class BayesianNetwork:
    """
    Bayesian Network: probabilistic graphical model

    Represents: P(X₁...Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ))

    Example: Medical diagnosis network
    - Disease → Symptom1, Symptom2
    - P(Disease), P(Symptom1 | Disease), P(Symptom2 | Disease)
    """

    def __init__(self):
        """Initialize empty Bayesian Network"""
        # Graph structure: node → list of parents
        self.parents: Dict[str, List[str]] = {}

        # Variable domains: node → list of possible values
        self.domains: Dict[str, List[str]] = {}

        # Conditional Probability Tables: node → CPT
        # CPT format: {(parent_values_tuple,): {node_value: probability}}
        self.cpts: Dict[str, Dict[Tuple, Dict[str, float]]] = {}

    def add_variable(self, name: str, domain: List[str]):
        """
        Add a variable (node) to the network

        Args:
            name: variable name
            domain: list of possible values
        """
        # Your implementation here
        pass

    def add_edge(self, parent: str, child: str):
        """
        Add directed edge: parent → child

        Args:
            parent: parent variable name
            child: child variable name

        Raises:
            ValueError: if creates cycle (must be DAG!)
        """
        # Your implementation here
        # IMPORTANT: Check for cycles! Use DFS or topological sort
        pass

    def set_cpt(self, variable: str, cpt: Dict):
        """
        Set Conditional Probability Table for a variable

        Args:
            variable: variable name
            cpt: dictionary mapping parent values to probability distributions

        Format for node with parents [A, B]:
            {
                ('a1', 'b1'): {'v1': 0.7, 'v2': 0.3},
                ('a1', 'b2'): {'v1': 0.4, 'v2': 0.6},
                ('a2', 'b1'): {'v1': 0.9, 'v2': 0.1},
                ('a2', 'b2'): {'v1': 0.2, 'v2': 0.8},
            }

        Format for node with no parents:
            {
                (): {'v1': 0.6, 'v2': 0.4}
            }
        """
        # Your implementation here
        # Validate: probabilities sum to 1 for each parent configuration
        pass

    def get_probability(self, variable: str, value: str, parent_values: Tuple) -> float:
        """
        Get P(variable=value | parents=parent_values) from CPT

        Args:
            variable: variable name
            value: value of variable
            parent_values: tuple of parent values (in order)

        Returns:
            Conditional probability
        """
        # Your implementation here
        pass

    def _has_cycle(self) -> bool:
        """
        Check if graph has a cycle (must be acyclic!)

        Use DFS with recursion stack
        """
        # Your implementation here
        pass

    def compute_joint_probability(self, assignment: Dict[str, str]) -> float:
        """
        Compute joint probability P(X₁=x₁, ..., Xₙ=xₙ)

        Using chain rule:
        P(X₁...Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ))

        Args:
            assignment: dictionary mapping variables to values

        Returns:
            Joint probability

        Example:
            P(Disease=True, Symptom=Fever) = P(Disease=True) * P(Symptom=Fever | Disease=True)
        """
        # Your implementation here
        pass

    def marginalize(self, variable: str, evidence: Dict[str, str] = {}) -> Dict[str, float]:
        """
        Compute marginal distribution P(variable | evidence)

        Marginalization: sum out all other variables
        P(X | e) = Σ P(X, Y, e) / P(e)
                   Y

        Args:
            variable: query variable
            evidence: observed variables (dict: var → value)

        Returns:
            Probability distribution: {value: probability}

        Example:
            P(Disease | Symptom=Fever) = ?
        """
        # Your implementation here
        # 1. Enumerate all possible assignments to non-evidence variables
        # 2. For each assignment, compute joint probability
        # 3. Sum probabilities where query variable takes each value
        # 4. Normalize by dividing by P(evidence)
        pass

    def variable_elimination(self, query: str, evidence: Dict[str, str] = {}) -> Dict[str, float]:
        """
        Efficient inference using Variable Elimination algorithm

        More efficient than naive enumeration!

        Basic idea:
        1. Choose elimination order for non-query, non-evidence variables
        2. For each variable, create factor and eliminate (marginalize)
        3. Combine factors and normalize

        Args:
            query: query variable
            evidence: observed variables

        Returns:
            Probability distribution P(query | evidence)

        Note: This is a simplified version. Real VE is more complex.
        """
        # Your implementation here (optional advanced challenge)
        # For now, can use naive marginalize as fallback
        return self.marginalize(query, evidence)

    def most_probable_explanation(self, evidence: Dict[str, str] = {}) -> Tuple[Dict[str, str], float]:
        """
        Find Most Probable Explanation (MPE): argmax P(variables | evidence)

        This is MAP inference: find most likely assignment to all non-evidence variables

        Args:
            evidence: observed variables

        Returns:
            Tuple of (best_assignment, probability)
        """
        # Your implementation here
        # Similar to marginalize, but use max instead of sum
        pass


def build_medical_diagnosis_network() -> BayesianNetwork:
    """
    Build a simple medical diagnosis Bayesian Network

    Structure:
      Disease
       /    \\
    Fever  Cough

    P(Disease=True) = 0.01 (rare disease, 1% of population)
    P(Fever | Disease=True) = 0.9
    P(Fever | Disease=False) = 0.2
    P(Cough | Disease=True) = 0.8
    P(Cough | Disease=False) = 0.1
    """
    bn = BayesianNetwork()

    # Add variables
    bn.add_variable('Disease', ['True', 'False'])
    bn.add_variable('Fever', ['True', 'False'])
    bn.add_variable('Cough', ['True', 'False'])

    # Add edges
    bn.add_edge('Disease', 'Fever')
    bn.add_edge('Disease', 'Cough')

    # Set CPTs
    # Prior: P(Disease)
    bn.set_cpt('Disease', {
        (): {'True': 0.01, 'False': 0.99}
    })

    # P(Fever | Disease)
    bn.set_cpt('Fever', {
        ('True',): {'True': 0.9, 'False': 0.1},
        ('False',): {'True': 0.2, 'False': 0.8}
    })

    # P(Cough | Disease)
    bn.set_cpt('Cough', {
        ('True',): {'True': 0.8, 'False': 0.2},
        ('False',): {'True': 0.1, 'False': 0.9}
    })

    return bn`,
  solution: `from typing import List, Dict, Tuple, Set
from itertools import product

class BayesianNetwork:
    """Bayesian Network implementation"""

    def __init__(self):
        self.parents: Dict[str, List[str]] = {}
        self.domains: Dict[str, List[str]] = {}
        self.cpts: Dict[str, Dict[Tuple, Dict[str, float]]] = {}

    def add_variable(self, name: str, domain: List[str]):
        """Add a variable to the network"""
        self.parents[name] = []
        self.domains[name] = domain
        self.cpts[name] = {}

    def add_edge(self, parent: str, child: str):
        """Add directed edge parent → child"""
        if child not in self.parents:
            raise ValueError(f"Variable {child} not found")
        if parent not in self.parents:
            raise ValueError(f"Variable {parent} not found")

        self.parents[child].append(parent)

        # Check for cycles
        if self._has_cycle():
            self.parents[child].remove(parent)  # Undo
            raise ValueError(f"Adding edge {parent} → {child} creates a cycle!")

    def set_cpt(self, variable: str, cpt: Dict):
        """Set Conditional Probability Table"""
        # Validate probabilities sum to 1
        for parent_config, probs in cpt.items():
            total = sum(probs.values())
            if not (0.999 <= total <= 1.001):  # Floating point tolerance
                raise ValueError(f"Probabilities must sum to 1, got {total}")

        self.cpts[variable] = cpt

    def get_probability(self, variable: str, value: str, parent_values: Tuple) -> float:
        """Get P(variable=value | parents=parent_values)"""
        return self.cpts[variable][parent_values][value]

    def _has_cycle(self) -> bool:
        """Check for cycles using DFS"""
        visited = set()
        rec_stack = set()

        def dfs(node):
            visited.add(node)
            rec_stack.add(node)

            # Visit children (nodes where this is a parent)
            for child, parents_list in self.parents.items():
                if node in parents_list:
                    if child not in visited:
                        if dfs(child):
                            return True
                    elif child in rec_stack:
                        return True

            rec_stack.remove(node)
            return False

        for node in self.parents:
            if node not in visited:
                if dfs(node):
                    return True

        return False

    def compute_joint_probability(self, assignment: Dict[str, str]) -> float:
        """Compute joint probability using chain rule"""
        prob = 1.0

        for variable, value in assignment.items():
            # Get parent values
            parent_values = tuple(assignment[p] for p in self.parents[variable])

            # Multiply by P(variable=value | parents)
            prob *= self.get_probability(variable, value, parent_values)

        return prob

    def marginalize(self, variable: str, evidence: Dict[str, str] = {}) -> Dict[str, float]:
        """Compute marginal distribution P(variable | evidence)"""
        # Get all variables except query
        all_vars = list(self.domains.keys())

        # Variables to sum out
        hidden_vars = [v for v in all_vars if v not in evidence and v != variable]

        # Enumerate all possible assignments
        result = {val: 0.0 for val in self.domains[variable]}

        # Generate all combinations of hidden variable values
        if hidden_vars:
            hidden_domains = [self.domains[v] for v in hidden_vars]
            for hidden_assignment in product(*hidden_domains):
                # Build full assignment
                assignment = dict(evidence)
                for var, val in zip(hidden_vars, hidden_assignment):
                    assignment[var] = val

                # For each value of query variable
                for query_value in self.domains[variable]:
                    assignment[variable] = query_value
                    prob = self.compute_joint_probability(assignment)
                    result[query_value] += prob
        else:
            # No hidden variables
            for query_value in self.domains[variable]:
                assignment = dict(evidence)
                assignment[variable] = query_value
                result[query_value] = self.compute_joint_probability(assignment)

        # Normalize
        total = sum(result.values())
        if total > 0:
            result = {k: v / total for k, v in result.items()}

        return result

    def variable_elimination(self, query: str, evidence: Dict[str, str] = {}) -> Dict[str, float]:
        """Variable Elimination (using marginalize as fallback)"""
        return self.marginalize(query, evidence)

    def most_probable_explanation(self, evidence: Dict[str, str] = {}) -> Tuple[Dict[str, str], float]:
        """Find Most Probable Explanation (MAP)"""
        all_vars = list(self.domains.keys())
        hidden_vars = [v for v in all_vars if v not in evidence]

        best_assignment = None
        best_prob = 0.0

        # Enumerate all possible assignments to hidden variables
        hidden_domains = [self.domains[v] for v in hidden_vars]
        for hidden_assignment in product(*hidden_domains):
            assignment = dict(evidence)
            for var, val in zip(hidden_vars, hidden_assignment):
                assignment[var] = val

            prob = self.compute_joint_probability(assignment)
            if prob > best_prob:
                best_prob = prob
                best_assignment = assignment

        return best_assignment, best_prob


def build_medical_diagnosis_network() -> BayesianNetwork:
    """Build medical diagnosis network"""
    bn = BayesianNetwork()

    bn.add_variable('Disease', ['True', 'False'])
    bn.add_variable('Fever', ['True', 'False'])
    bn.add_variable('Cough', ['True', 'False'])

    bn.add_edge('Disease', 'Fever')
    bn.add_edge('Disease', 'Cough')

    bn.set_cpt('Disease', {
        (): {'True': 0.01, 'False': 0.99}
    })

    bn.set_cpt('Fever', {
        ('True',): {'True': 0.9, 'False': 0.1},
        ('False',): {'True': 0.2, 'False': 0.8}
    })

    bn.set_cpt('Cough', {
        ('True',): {'True': 0.8, 'False': 0.2},
        ('False',): {'True': 0.1, 'False': 0.9}
    })

    return bn`,
  tests: [
    {
      input: 'bn = build_medical_diagnosis_network(); bn.compute_joint_probability({"Disease": "True", "Fever": "True", "Cough": "True"})',
      expectedOutput: '0.0072',
      description: 'P(D=T, F=T, C=T) = P(D=T) * P(F=T|D=T) * P(C=T|D=T) = 0.01 * 0.9 * 0.8'
    },
    {
      input: 'bn = build_medical_diagnosis_network(); p = bn.marginalize("Disease", {"Fever": "True", "Cough": "True"}); p["True"]',
      expectedOutput: '0.034 (approximately)',
      description: 'P(Disease=True | Fever=True, Cough=True) using Bayes rule'
    },
    {
      input: 'bn = build_medical_diagnosis_network(); p = bn.marginalize("Disease", {}); p["True"]',
      expectedOutput: '0.01',
      description: 'No evidence → returns prior P(Disease=True) = 0.01'
    },
    {
      input: 'bn = build_medical_diagnosis_network(); p = bn.marginalize("Fever", {"Disease": "True"}); p["True"]',
      expectedOutput: '0.9',
      description: 'P(Fever=True | Disease=True) = 0.9 from CPT'
    },
    {
      input: 'bn = build_medical_diagnosis_network(); assignment, prob = bn.most_probable_explanation({"Fever": "True"}); assignment["Disease"]',
      expectedOutput: '"False"',
      description: 'Most likely: Disease=False because prior is 0.99 (very rare disease)'
    }
  ],
  hints: [
    "Start with add_variable and add_edge - build the DAG structure",
    "Use DFS with recursion stack to detect cycles in _has_cycle",
    "Joint probability: multiply all conditional probabilities using chain rule",
    "Marginalize: enumerate all possible assignments, sum probabilities for each query value",
    "Remember to normalize marginal distributions (divide by sum)",
    "CPT format: parent_values_tuple → {node_value: probability}",
    "For nodes with no parents, use empty tuple () as key",
    "Test with simple examples first (2 variables) before complex networks",
    "MPE: like marginalize but use max instead of sum"
  ]
};

// ===========================================
// ONTOLOGIES & SEMANTIC WEB - Code Challenges
// ===========================================

export const rdfTripleStoreChallenge: CodeChallenge = {
  id: 'rdf-triple-store-challenge',
  title: 'Build an RDF Triple Store with SPARQL-like Queries',
  description: `RDF (Resource Description Framework) is the foundation of the semantic web. Every piece of knowledge is represented as a **triple**: (subject, predicate, object).

**Key Concepts:**
- **Triple:** Basic unit of RDF: (subject, predicate, object)
  - Example: (Aspirin, treats, Headache)
- **Graph Structure:** Triples naturally form a directed labeled graph
- **SPARQL:** Query language for RDF (like SQL for databases)
- **Inference:** RDFS provides basic reasoning (subClassOf, subPropertyOf)

**Real-World Applications:**
- Google Knowledge Graph (500B+ triples)
- DBpedia (3B+ triples from Wikipedia)
- Healthcare ontologies (SNOMED CT, ICD-10)

**Your Task:**
Implement an RDF triple store that can:
1. Store triples efficiently
2. Parse simplified Turtle syntax
3. Query triples with pattern matching
4. Perform basic RDFS inference (subclass/subproperty reasoning)

**Example:**
\`\`\`python
store = RDFTripleStore()

# Add triples
store.add_triple("Aspirin", "rdf:type", "Medication")
store.add_triple("Medication", "rdfs:subClassOf", "Drug")
store.add_triple("Aspirin", "treats", "Headache")

# Query
results = store.query("?s", "treats", "Headache")
# Returns: [{"?s": "Aspirin"}]

# With inference
results = store.query("Aspirin", "rdf:type", "?o")
# Returns: [{"?o": "Medication"}, {"?o": "Drug"}]  # Drug is inferred!
\`\`\`

**This is the foundation of semantic web technologies used by Google, IBM, and healthcare systems worldwide.**`,
  difficulty: 'hard',
  topic: 'Ontologies and Semantic Web',
  template: `from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict

class RDFTripleStore:
    """
    RDF Triple Store with SPARQL-like queries and RDFS reasoning.

    RDF represents knowledge as triples: (subject, predicate, object)
    Example: (Aspirin, treats, Headache)

    Supports:
    - Triple storage and retrieval
    - Pattern matching with variables (?x)
    - RDFS inference (subClassOf, subPropertyOf)
    """

    def __init__(self):
        # Primary storage: list of triples
        self.triples: List[Tuple[str, str, str]] = []

        # Indexes for fast lookup (like database indexes)
        # Subject index: subject -> [(predicate, object), ...]
        self.spo_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

        # Predicate index: predicate -> [(subject, object), ...]
        self.pos_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

        # Object index: object -> [(subject, predicate), ...]
        self.osp_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

    def add_triple(self, subject: str, predicate: str, obj: str) -> None:
        """
        Add a triple to the store.

        Args:
            subject: Subject (resource)
            predicate: Predicate (relationship)
            obj: Object (resource or literal)

        Example:
            store.add_triple("Aspirin", "treats", "Headache")
        """
        # TODO: Add triple to main storage

        # TODO: Update indexes for fast lookup

        pass

    def get_triples(self) -> List[Tuple[str, str, str]]:
        """Return all triples."""
        return self.triples

    def query(
        self,
        subject: Optional[str],
        predicate: Optional[str],
        obj: Optional[str]
    ) -> List[Dict[str, str]]:
        """
        Query triples with pattern matching.

        Variables start with '?' (e.g., '?x', '?medication')
        None or '?' matches anything.

        Args:
            subject: Subject pattern (or '?var' for variable)
            predicate: Predicate pattern (or '?var' for variable)
            obj: Object pattern (or '?var' for variable)

        Returns:
            List of binding dictionaries mapping variables to values

        Examples:
            # Find all medications treating headaches
            query("?med", "treats", "Headache")
            → [{"?med": "Aspirin"}, {"?med": "Ibuprofen"}]

            # Find everything Aspirin treats
            query("Aspirin", "treats", "?condition")
            → [{"?condition": "Headache"}, {"?condition": "Fever"}]

            # Find all type relationships
            query("?s", "rdf:type", "?t")
            → [{"?s": "Aspirin", "?t": "Medication"}, ...]
        """
        # TODO: Extract variables from pattern
        # Variables start with '?'

        # TODO: Choose best index based on what's bound
        # If subject is bound → use spo_index
        # If predicate is bound → use pos_index
        # If object is bound → use osp_index
        # Otherwise → scan all triples

        # TODO: Match triples against pattern

        # TODO: Build bindings for each match

        pass

    def infer_subclass(self) -> None:
        """
        Perform RDFS subclass inference.

        Rule: If (X, subClassOf, Y) and (A, type, X), then infer (A, type, Y)

        Example:
            (Aspirin, rdf:type, Medication)
            (Medication, rdfs:subClassOf, Drug)
            → Infer: (Aspirin, rdf:type, Drug)

        Implementation:
        1. Find all (X, rdfs:subClassOf, Y) triples
        2. For each (A, rdf:type, X), add (A, rdf:type, Y)
        3. Repeat until no new triples (transitive closure)
        """
        # TODO: Build subclass hierarchy
        # Use graph traversal to find transitive closure

        # TODO: For each instance, infer all ancestor types

        # HINT: Use DFS/BFS to traverse hierarchy

        pass

    def infer_subproperty(self) -> None:
        """
        Perform RDFS subproperty inference.

        Rule: If (P, subPropertyOf, Q) and (A, P, B), then infer (A, Q, B)

        Example:
            (stronglyTreats, rdfs:subPropertyOf, treats)
            (Morphine, stronglyTreats, SeverePain)
            → Infer: (Morphine, treats, SeverePain)
        """
        # TODO: Similar to subclass inference
        # Build property hierarchy and infer triples

        pass

    def parse_turtle(self, turtle_str: str) -> None:
        """
        Parse simplified Turtle syntax and add triples.

        Turtle format: subject predicate object .

        Example:
            Aspirin treats Headache .
            Aspirin rdf:type Medication .
            Medication rdfs:subClassOf Drug .

        Note: This is a simplified parser (real Turtle is more complex)
        """
        # TODO: Split by lines
        # TODO: Parse each line as "subject predicate object ."
        # TODO: Handle prefixes (simplified: just use full URIs)
        # TODO: Add each triple

        pass


def test_rdf_triple_store():
    """Test the RDF triple store."""
    store = RDFTripleStore()

    # Test 1: Basic triple storage
    print("Test 1: Adding triples")
    store.add_triple("Aspirin", "rdf:type", "Medication")
    store.add_triple("Aspirin", "treats", "Headache")
    store.add_triple("Aspirin", "treats", "Fever")
    store.add_triple("Ibuprofen", "rdf:type", "Medication")
    store.add_triple("Ibuprofen", "treats", "Headache")

    triples = store.get_triples()
    print(f"Stored {len(triples)} triples")
    assert len(triples) == 5

    # Test 2: Pattern queries
    print("\\nTest 2: Pattern matching")

    # Query: What treats headaches?
    results = store.query("?med", "treats", "Headache")
    print(f"Medications treating headaches: {results}")
    assert len(results) == 2
    assert {"?med": "Aspirin"} in results
    assert {"?med": "Ibuprofen"} in results

    # Query: What does Aspirin treat?
    results = store.query("Aspirin", "treats", "?condition")
    print(f"Aspirin treats: {results}")
    assert len(results) == 2

    # Query: All type statements
    results = store.query("?s", "rdf:type", "?t")
    print(f"Type statements: {results}")
    assert len(results) == 2

    # Test 3: RDFS inference
    print("\\nTest 3: RDFS inference")

    # Build hierarchy
    store.add_triple("Medication", "rdfs:subClassOf", "Drug")
    store.add_triple("Drug", "rdfs:subClassOf", "Substance")

    # Before inference
    results = store.query("Aspirin", "rdf:type", "?type")
    print(f"Before inference - Aspirin types: {results}")

    # Run inference
    store.infer_subclass()

    # After inference (should include superclasses)
    results = store.query("Aspirin", "rdf:type", "?type")
    print(f"After inference - Aspirin types: {results}")
    assert len(results) == 3  # Medication, Drug, Substance

    # Test 4: Turtle parsing
    print("\\nTest 4: Turtle parsing")
    turtle = """
        Morphine rdf:type Opioid .
        Opioid rdfs:subClassOf Analgesic .
        Morphine treats SeverePain .
    """
    store.parse_turtle(turtle)

    results = store.query("Morphine", "treats", "?condition")
    print(f"Morphine treats: {results}")
    assert len(results) == 1

    # Test 5: Property hierarchy
    print("\\nTest 5: Property inference")
    store.add_triple("stronglyTreats", "rdfs:subPropertyOf", "treats")
    store.add_triple("Morphine", "stronglyTreats", "SeverePain")

    store.infer_subproperty()

    results = store.query("Morphine", "treats", "?condition")
    print(f"After property inference - Morphine treats: {results}")
    # Should include both stronglyTreats and inferred treats

    print("\\n✅ All tests passed!")

# Run tests
test_rdf_triple_store()`,
  solution: `from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict, deque

class RDFTripleStore:
    """
    RDF Triple Store with SPARQL-like queries and RDFS reasoning.
    """

    def __init__(self):
        self.triples: List[Tuple[str, str, str]] = []
        self.spo_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)
        self.pos_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)
        self.osp_index: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

    def add_triple(self, subject: str, predicate: str, obj: str) -> None:
        """Add a triple to the store."""
        triple = (subject, predicate, obj)

        # Avoid duplicates
        if triple in self.triples:
            return

        # Add to main storage
        self.triples.append(triple)

        # Update indexes
        self.spo_index[subject].append((predicate, obj))
        self.pos_index[predicate].append((subject, obj))
        self.osp_index[obj].append((subject, predicate))

    def get_triples(self) -> List[Tuple[str, str, str]]:
        """Return all triples."""
        return self.triples.copy()

    def _is_variable(self, term: Optional[str]) -> bool:
        """Check if term is a variable (starts with ?)."""
        return term is not None and term.startswith('?')

    def query(
        self,
        subject: Optional[str],
        predicate: Optional[str],
        obj: Optional[str]
    ) -> List[Dict[str, str]]:
        """Query triples with pattern matching."""
        # Extract variables
        variables = []
        if self._is_variable(subject):
            variables.append(subject)
        if self._is_variable(predicate):
            variables.append(predicate)
        if self._is_variable(obj):
            variables.append(obj)

        # Choose best index
        candidates = None

        if subject and not self._is_variable(subject):
            # Use subject index
            if subject in self.spo_index:
                candidates = [(subject, p, o) for p, o in self.spo_index[subject]]
            else:
                candidates = []
        elif predicate and not self._is_variable(predicate):
            # Use predicate index
            if predicate in self.pos_index:
                candidates = [(s, predicate, o) for s, o in self.pos_index[predicate]]
            else:
                candidates = []
        elif obj and not self._is_variable(obj):
            # Use object index
            if obj in self.osp_index:
                candidates = [(s, p, obj) for s, p in self.osp_index[obj]]
            else:
                candidates = []
        else:
            # Full scan
            candidates = self.triples

        # Match pattern
        results = []
        for s, p, o in candidates:
            # Check if triple matches pattern
            if subject and not self._is_variable(subject) and s != subject:
                continue
            if predicate and not self._is_variable(predicate) and p != predicate:
                continue
            if obj and not self._is_variable(obj) and o != obj:
                continue

            # Build bindings
            bindings = {}
            if self._is_variable(subject):
                bindings[subject] = s
            if self._is_variable(predicate):
                bindings[predicate] = p
            if self._is_variable(obj):
                bindings[obj] = o

            results.append(bindings)

        return results

    def _get_superclasses(self, cls: str) -> Set[str]:
        """Get all superclasses of a class (transitive closure)."""
        visited = set()
        queue = deque([cls])

        while queue:
            current = queue.popleft()
            if current in visited:
                continue
            visited.add(current)

            # Find direct superclasses
            for s, p, o in self.triples:
                if s == current and p == "rdfs:subClassOf":
                    if o not in visited:
                        queue.append(o)

        visited.discard(cls)  # Remove self
        return visited

    def infer_subclass(self) -> None:
        """Perform RDFS subclass inference."""
        # Find all instances and their types
        instances_types = defaultdict(set)
        for s, p, o in self.triples:
            if p == "rdf:type":
                instances_types[s].add(o)

        # For each instance, infer superclass types
        new_triples = []
        for instance, types in instances_types.items():
            for typ in types:
                superclasses = self._get_superclasses(typ)
                for superclass in superclasses:
                    new_triple = (instance, "rdf:type", superclass)
                    if new_triple not in self.triples:
                        new_triples.append(new_triple)

        # Add inferred triples
        for s, p, o in new_triples:
            self.add_triple(s, p, o)

    def _get_superproperties(self, prop: str) -> Set[str]:
        """Get all superproperties (transitive closure)."""
        visited = set()
        queue = deque([prop])

        while queue:
            current = queue.popleft()
            if current in visited:
                continue
            visited.add(current)

            # Find direct superproperties
            for s, p, o in self.triples:
                if s == current and p == "rdfs:subPropertyOf":
                    if o not in visited:
                        queue.append(o)

        visited.discard(prop)  # Remove self
        return visited

    def infer_subproperty(self) -> None:
        """Perform RDFS subproperty inference."""
        # Group triples by property
        property_triples = defaultdict(list)
        for s, p, o in self.triples:
            if p not in ["rdfs:subPropertyOf", "rdfs:subClassOf", "rdf:type"]:
                property_triples[p].append((s, o))

        # For each property, infer superproperty triples
        new_triples = []
        for prop, triples in property_triples.items():
            superprops = self._get_superproperties(prop)
            for superprop in superprops:
                for s, o in triples:
                    new_triple = (s, superprop, o)
                    if new_triple not in self.triples:
                        new_triples.append(new_triple)

        # Add inferred triples
        for s, p, o in new_triples:
            self.add_triple(s, p, o)

    def parse_turtle(self, turtle_str: str) -> None:
        """Parse simplified Turtle syntax."""
        lines = turtle_str.strip().split('\\n')

        for line in lines:
            line = line.strip()
            if not line or line.startswith('#'):
                continue

            # Remove trailing period
            if line.endswith('.'):
                line = line[:-1].strip()

            # Split into subject, predicate, object
            parts = line.split(None, 2)  # Split on whitespace, max 3 parts
            if len(parts) == 3:
                subject, predicate, obj = parts
                self.add_triple(subject, predicate, obj)


def test_rdf_triple_store():
    """Test the RDF triple store."""
    store = RDFTripleStore()

    print("Test 1: Adding triples")
    store.add_triple("Aspirin", "rdf:type", "Medication")
    store.add_triple("Aspirin", "treats", "Headache")
    store.add_triple("Aspirin", "treats", "Fever")
    store.add_triple("Ibuprofen", "rdf:type", "Medication")
    store.add_triple("Ibuprofen", "treats", "Headache")

    triples = store.get_triples()
    print(f"✓ Stored {len(triples)} triples")

    print("\\nTest 2: Pattern matching")
    results = store.query("?med", "treats", "Headache")
    print(f"✓ Medications treating headaches: {[r['?med'] for r in results]}")

    results = store.query("Aspirin", "treats", "?condition")
    print(f"✓ Aspirin treats: {[r['?condition'] for r in results]}")

    print("\\nTest 3: RDFS inference")
    store.add_triple("Medication", "rdfs:subClassOf", "Drug")
    store.add_triple("Drug", "rdfs:subClassOf", "Substance")

    print(f"Before inference - Aspirin types: {len(store.query('Aspirin', 'rdf:type', '?type'))}")
    store.infer_subclass()
    results = store.query("Aspirin", "rdf:type", "?type")
    print(f"✓ After inference - Aspirin types: {[r['?type'] for r in results]}")

    print("\\nTest 4: Turtle parsing")
    turtle = """
        Morphine rdf:type Opioid .
        Opioid rdfs:subClassOf Analgesic .
        Morphine treats SeverePain .
    """
    store.parse_turtle(turtle)
    results = store.query("Morphine", "treats", "?condition")
    print(f"✓ Morphine treats: {[r['?condition'] for r in results]}")

    print("\\nTest 5: Property inference")
    store.add_triple("stronglyTreats", "rdfs:subPropertyOf", "treats")
    store.add_triple("Morphine", "stronglyTreats", "SeverePain")
    store.infer_subproperty()
    results = store.query("Morphine", "treats", "?condition")
    print(f"✓ After property inference - Morphine treats: {[r['?condition'] for r in results]}")

    print("\\n✅ All tests passed!")

test_rdf_triple_store()`,
  tests: [
    {
      input: 'Basic triple storage and retrieval',
      expectedOutput: 'Triples stored and retrieved correctly',
      description: 'Add and query triples with pattern matching'
    },
    {
      input: 'RDFS inference with subClassOf',
      expectedOutput: 'Inferred types returned correctly',
      description: 'Test transitive reasoning through class hierarchy'
    },
    {
      input: 'Query with variable bindings',
      expectedOutput: 'Multiple variable bindings returned',
      description: 'Test pattern matching with variables'
    }
  ],
  hints: [
    "Use three dictionaries (SPO, POS, OSP indexes) for fast lookup based on which part is bound",
    "Variables start with '?' - check with term.startswith('?')",
    "For inference, use BFS/DFS to compute transitive closure of subClassOf/subPropertyOf",
    "Avoid duplicate triples - check if triple exists before adding",
    "Pattern matching: iterate candidates from best index, check if each triple matches pattern",
    "Turtle parsing: split each line by whitespace, extract subject/predicate/object",
    "Subclass inference: for each (A, type, X), find all superclasses of X, add (A, type, superclass)",
    "Use collections.deque for BFS traversal of hierarchies"
  ]
};

export const ontologyReasoningChallenge: CodeChallenge = {
  id: 'ontology-reasoning-challenge',
  title: 'Build an Ontology-Based Reasoning System',
  description: `Ontologies aren't just data—they enable **automated reasoning**. A reasoner can deduce new facts from existing knowledge using logical rules.

**Key Concepts:**
- **Class Hierarchy:** SubClassOf enables type inference
- **Property Restrictions:** someValuesFrom, allValuesFrom define membership
- **Consistency Checking:** Detect logical contradictions
- **Defined Classes:** Classes defined by necessary & sufficient conditions

**Real-World Applications:**
- Clinical decision support (drug contraindication checking)
- Semantic search (find conceptually similar items)
- Data validation (ensure logical consistency)
- Automated classification (assign types based on properties)

**Your Task:**
Implement an OWL-like reasoner that can:
1. Check ontology consistency (detect contradictions)
2. Compute inferred class hierarchy
3. Classify individuals based on property restrictions
4. Detect violations of constraints

**Example:**
\`\`\`python
reasoner = OntologyReasoner()

# Define ontology
reasoner.add_subclass("NSAID", "Medication")
reasoner.add_disjoint("Medication", "Disease")
reasoner.add_individual("Aspirin", "NSAID")

# Check consistency
reasoner.check_consistency()  # Should pass

# Try to add contradiction
reasoner.add_individual("Aspirin", "Disease")
reasoner.check_consistency()  # Should fail! (Medication and Disease are disjoint)

# Defined class: NSAID ≡ Medication ⊓ (hasEffect some AntiInflammatory)
reasoner.define_class("NSAID",
    intersectionOf=["Medication"],
    restrictions=[("hasEffect", "someValuesFrom", "AntiInflammatory")]
)

# Automatic classification
reasoner.add_individual("NewDrug", "Medication")
reasoner.add_property("NewDrug", "hasEffect", "AntiInflammatory")
reasoner.classify()
# NewDrug is automatically classified as NSAID!
\`\`\`

**This is the core of OWL reasoners used in healthcare, semantic web, and enterprise knowledge management.**`,
  difficulty: 'hard',
  topic: 'Ontologies and Semantic Web',
  template: `from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict, deque
from enum import Enum

class RestrictionType(Enum):
    SOME_VALUES_FROM = "someValuesFrom"  # ∃ (existential)
    ALL_VALUES_FROM = "allValuesFrom"    # ∀ (universal)
    HAS_VALUE = "hasValue"                # specific value

class OntologyReasoner:
    """
    OWL-like reasoner for ontology-based inference.

    Supports:
    - Class hierarchy reasoning (subClassOf)
    - Property restrictions (someValuesFrom, allValuesFrom)
    - Consistency checking (disjointness, contradictions)
    - Automatic classification (defined classes)
    """

    def __init__(self):
        # Class hierarchy: child -> parents
        self.subclass_of: Dict[str, Set[str]] = defaultdict(set)

        # Disjoint classes: {(A, B), (C, D), ...}
        self.disjoint_pairs: Set[Tuple[str, str]] = set()

        # Individuals: individual -> direct types
        self.individuals: Dict[str, Set[str]] = defaultdict(set)

        # Property assertions: (subject, property) -> objects
        self.properties: Dict[Tuple[str, str], Set[str]] = defaultdict(set)

        # Defined classes: class -> definition
        self.defined_classes: Dict[str, Dict] = {}

    def add_subclass(self, subclass: str, superclass: str) -> None:
        """
        Add subclass relationship: subclass ⊑ superclass

        Example:
            add_subclass("NSAID", "Medication")
            # NSAID is a subclass of Medication
        """
        # TODO: Add to subclass hierarchy
        pass

    def add_disjoint(self, class1: str, class2: str) -> None:
        """
        Declare two classes disjoint (mutually exclusive).

        Example:
            add_disjoint("Medication", "Disease")
            # Nothing can be both a Medication and a Disease
        """
        # TODO: Add disjoint pair (both directions)
        pass

    def add_individual(self, individual: str, class_name: str) -> None:
        """
        Add an individual as an instance of a class.

        Example:
            add_individual("Aspirin", "NSAID")
        """
        # TODO: Add individual to class
        pass

    def add_property(self, subject: str, property_name: str, obj: str) -> None:
        """
        Add a property assertion: subject has property_name with value obj.

        Example:
            add_property("Aspirin", "treats", "Headache")
        """
        # TODO: Add property assertion
        pass

    def get_all_superclasses(self, class_name: str) -> Set[str]:
        """
        Get all superclasses of a class (transitive closure).

        Example:
            add_subclass("NSAID", "Analgesic")
            add_subclass("Analgesic", "Medication")
            get_all_superclasses("NSAID")
            → {"Analgesic", "Medication"}
        """
        # TODO: Use BFS to compute transitive closure
        # Start from class_name, traverse up the hierarchy
        pass

    def check_consistency(self) -> Tuple[bool, Optional[str]]:
        """
        Check if the ontology is logically consistent.

        Checks:
        1. No individual is member of disjoint classes
        2. All property restrictions are satisfied
        3. No contradictory type assertions

        Returns:
            (is_consistent, error_message)

        Example:
            add_individual("Aspirin", "Medication")
            add_individual("Aspirin", "Disease")
            add_disjoint("Medication", "Disease")
            check_consistency()
            → (False, "Aspirin is both Medication and Disease (disjoint classes)")
        """
        # TODO: Check disjointness violations
        # For each individual, check if any of its types are disjoint

        # TODO: Check property restrictions
        # For each defined class with restrictions, verify individuals satisfy them

        pass

    def define_class(
        self,
        class_name: str,
        intersection_of: Optional[List[str]] = None,
        restrictions: Optional[List[Tuple[str, str, str]]] = None
    ) -> None:
        """
        Define a class by necessary & sufficient conditions.

        Format: class ≡ intersection_of ⊓ (restrictions)

        Args:
            class_name: Name of defined class
            intersection_of: List of classes to intersect
            restrictions: List of (property, restriction_type, filler)

        Example:
            # NSAID ≡ Medication ⊓ (hasEffect some AntiInflammatory)
            define_class("NSAID",
                intersection_of=["Medication"],
                restrictions=[("hasEffect", "someValuesFrom", "AntiInflammatory")]
            )

            # Now any Medication with AntiInflammatory effect is automatically an NSAID
        """
        # TODO: Store definition
        # Format: {"intersectionOf": [...], "restrictions": [...]}
        pass

    def classify(self) -> Dict[str, Set[str]]:
        """
        Automatically classify individuals based on defined classes.

        For each individual and each defined class:
        - Check if individual satisfies necessary conditions
        - If yes, infer membership in defined class

        Returns:
            Dictionary mapping individuals to inferred types

        Example:
            define_class("NSAID",
                intersection_of=["Medication"],
                restrictions=[("hasEffect", "someValuesFrom", "AntiInflammatory")]
            )

            add_individual("NewDrug", "Medication")
            add_property("NewDrug", "hasEffect", "AntiInflammatory")

            classify()
            → {"NewDrug": {"NSAID"}}  # Automatically classified!
        """
        # TODO: For each individual, check all defined classes

        # TODO: Check if individual satisfies definition:
        # 1. Is it a member of all intersection_of classes?
        # 2. Does it satisfy all restrictions?

        # TODO: If yes, add as inferred type

        pass

    def _satisfies_restriction(
        self,
        individual: str,
        property_name: str,
        restriction_type: str,
        filler: str
    ) -> bool:
        """
        Check if an individual satisfies a property restriction.

        Restriction types:
        - someValuesFrom: ∃ property.filler (at least one value is of type filler)
        - allValuesFrom: ∀ property.filler (all values are of type filler)
        - hasValue: property has specific value
        """
        # TODO: Get property values for individual

        # TODO: Check restriction type
        # someValuesFrom: at least one value matches filler
        # allValuesFrom: all values match filler
        # hasValue: specific value exists

        pass

    def explain_type(self, individual: str, class_name: str) -> List[str]:
        """
        Explain why an individual is inferred to be of a certain type.

        Returns reasoning path.

        Example:
            explain_type("Aspirin", "Medication")
            → ["Aspirin is NSAID (asserted)",
               "NSAID subClassOf Analgesic",
               "Analgesic subClassOf Medication"]
        """
        # TODO: Find path from individual's direct type to target class
        # Use BFS through class hierarchy

        pass


def test_ontology_reasoner():
    """Test the ontology reasoner."""
    reasoner = OntologyReasoner()

    # Test 1: Basic class hierarchy
    print("Test 1: Class hierarchy reasoning")
    reasoner.add_subclass("NSAID", "Analgesic")
    reasoner.add_subclass("Analgesic", "Medication")
    reasoner.add_subclass("Medication", "Drug")

    superclasses = reasoner.get_all_superclasses("NSAID")
    print(f"✓ Superclasses of NSAID: {superclasses}")
    assert "Analgesic" in superclasses
    assert "Medication" in superclasses
    assert "Drug" in superclasses

    # Test 2: Consistency checking (disjointness)
    print("\\nTest 2: Consistency checking")
    reasoner.add_disjoint("Medication", "Disease")
    reasoner.add_individual("Aspirin", "Medication")

    is_consistent, msg = reasoner.check_consistency()
    print(f"✓ Ontology is consistent: {is_consistent}")
    assert is_consistent

    # Add contradiction
    reasoner.add_individual("Aspirin", "Disease")
    is_consistent, msg = reasoner.check_consistency()
    print(f"✓ Detected inconsistency: {msg}")
    assert not is_consistent

    # Fix by removing contradictory assertion
    reasoner.individuals["Aspirin"].discard("Disease")

    # Test 3: Defined classes
    print("\\nTest 3: Defined classes and classification")

    # Define NSAID by properties
    reasoner.define_class("NSAID",
        intersection_of=["Medication"],
        restrictions=[("hasEffect", "someValuesFrom", "AntiInflammatory")]
    )

    # Add a new drug with anti-inflammatory effect
    reasoner.add_individual("Ibuprofen", "Medication")
    reasoner.add_property("Ibuprofen", "hasEffect", "AntiInflammatory")

    # Classify
    inferred = reasoner.classify()
    print(f"✓ Inferred types: {inferred}")
    assert "Ibuprofen" in inferred
    assert "NSAID" in inferred["Ibuprofen"]

    # Test 4: Property restrictions
    print("\\nTest 4: Property restrictions")

    # SafeMedication: all side effects are mild
    reasoner.define_class("SafeMedication",
        intersection_of=["Medication"],
        restrictions=[("hasSideEffect", "allValuesFrom", "MildSideEffect")]
    )

    reasoner.add_individual("Acetaminophen", "Medication")
    reasoner.add_property("Acetaminophen", "hasSideEffect", "MildStomachUpset")
    reasoner.individuals["MildStomachUpset"] = {"MildSideEffect"}

    inferred = reasoner.classify()
    print(f"✓ Acetaminophen classified as: {inferred.get('Acetaminophen', set())}")

    # Test 5: Explanation
    print("\\nTest 5: Reasoning explanation")
    reasoner.add_individual("NewDrug", "NSAID")
    explanation = reasoner.explain_type("NewDrug", "Drug")
    print(f"✓ Explanation for NewDrug being Drug:")
    for step in explanation:
        print(f"  - {step}")

    print("\\n✅ All tests passed!")

# Run tests
test_ontology_reasoner()`,
  solution: `from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict, deque
from enum import Enum

class RestrictionType(Enum):
    SOME_VALUES_FROM = "someValuesFrom"
    ALL_VALUES_FROM = "allValuesFrom"
    HAS_VALUE = "hasValue"

class OntologyReasoner:
    """OWL-like reasoner for ontology-based inference."""

    def __init__(self):
        self.subclass_of: Dict[str, Set[str]] = defaultdict(set)
        self.disjoint_pairs: Set[Tuple[str, str]] = set()
        self.individuals: Dict[str, Set[str]] = defaultdict(set)
        self.properties: Dict[Tuple[str, str], Set[str]] = defaultdict(set)
        self.defined_classes: Dict[str, Dict] = {}

    def add_subclass(self, subclass: str, superclass: str) -> None:
        """Add subclass relationship."""
        self.subclass_of[subclass].add(superclass)

    def add_disjoint(self, class1: str, class2: str) -> None:
        """Declare two classes disjoint."""
        self.disjoint_pairs.add((class1, class2))
        self.disjoint_pairs.add((class2, class1))  # Symmetric

    def add_individual(self, individual: str, class_name: str) -> None:
        """Add an individual as an instance of a class."""
        self.individuals[individual].add(class_name)

    def add_property(self, subject: str, property_name: str, obj: str) -> None:
        """Add a property assertion."""
        self.properties[(subject, property_name)].add(obj)

    def get_all_superclasses(self, class_name: str) -> Set[str]:
        """Get all superclasses (transitive closure)."""
        visited = set()
        queue = deque([class_name])

        while queue:
            current = queue.popleft()
            if current in visited:
                continue
            visited.add(current)

            # Add direct superclasses to queue
            for superclass in self.subclass_of[current]:
                if superclass not in visited:
                    queue.append(superclass)

        visited.discard(class_name)  # Remove self
        return visited

    def check_consistency(self) -> Tuple[bool, Optional[str]]:
        """Check if the ontology is logically consistent."""
        # Check disjointness violations
        for individual, types in self.individuals.items():
            # Get all types (direct + inferred)
            all_types = set()
            for typ in types:
                all_types.add(typ)
                all_types.update(self.get_all_superclasses(typ))

            # Check if any pair is disjoint
            for type1 in all_types:
                for type2 in all_types:
                    if type1 != type2 and (type1, type2) in self.disjoint_pairs:
                        return (False,
                            f"{individual} is both {type1} and {type2} (disjoint classes)")

        return (True, None)

    def define_class(
        self,
        class_name: str,
        intersection_of: Optional[List[str]] = None,
        restrictions: Optional[List[Tuple[str, str, str]]] = None
    ) -> None:
        """Define a class by necessary & sufficient conditions."""
        self.defined_classes[class_name] = {
            "intersectionOf": intersection_of or [],
            "restrictions": restrictions or []
        }

    def _satisfies_restriction(
        self,
        individual: str,
        property_name: str,
        restriction_type: str,
        filler: str
    ) -> bool:
        """Check if an individual satisfies a property restriction."""
        # Get property values
        values = self.properties.get((individual, property_name), set())

        if restriction_type == "someValuesFrom":
            # At least one value matches filler
            for value in values:
                # Check if value is of type filler
                if filler in self.individuals.get(value, set()):
                    return True
                # Or if value is filler itself (for named individuals)
                if value == filler:
                    return True
                # Or if value's type matches filler
                value_types = self.individuals.get(value, set())
                value_types.update(self.get_all_superclasses_for_individual(value))
                if filler in value_types:
                    return True
            return False

        elif restriction_type == "allValuesFrom":
            # All values must match filler
            if not values:
                return True  # Vacuously true if no values
            for value in values:
                value_types = self.individuals.get(value, set())
                value_types.update(self.get_all_superclasses_for_individual(value))
                if filler not in value_types and value != filler:
                    return False
            return True

        elif restriction_type == "hasValue":
            # Specific value must exist
            return filler in values

        return False

    def get_all_superclasses_for_individual(self, individual: str) -> Set[str]:
        """Get all superclasses for an individual's types."""
        all_types = set()
        for typ in self.individuals.get(individual, set()):
            all_types.update(self.get_all_superclasses(typ))
        return all_types

    def classify(self) -> Dict[str, Set[str]]:
        """Automatically classify individuals based on defined classes."""
        inferred_types = defaultdict(set)

        for individual in self.individuals.keys():
            # Get all current types (direct + inferred)
            current_types = set(self.individuals[individual])
            for typ in list(current_types):
                current_types.update(self.get_all_superclasses(typ))

            # Check each defined class
            for class_name, definition in self.defined_classes.items():
                # Check intersection_of
                intersection_ok = all(
                    cls in current_types
                    for cls in definition["intersectionOf"]
                )

                if not intersection_ok:
                    continue

                # Check restrictions
                restrictions_ok = all(
                    self._satisfies_restriction(individual, prop, rtype, filler)
                    for prop, rtype, filler in definition["restrictions"]
                )

                if restrictions_ok:
                    # Infer membership
                    inferred_types[individual].add(class_name)
                    self.individuals[individual].add(class_name)

        return dict(inferred_types)

    def explain_type(self, individual: str, class_name: str) -> List[str]:
        """Explain why an individual is inferred to be of a certain type."""
        explanation = []

        # Get direct types
        direct_types = self.individuals.get(individual, set())

        # Find path from direct type to target class
        for direct_type in direct_types:
            if direct_type == class_name:
                explanation.append(f"{individual} is {class_name} (directly asserted)")
                return explanation

            # BFS to find path
            queue = deque([(direct_type, [direct_type])])
            visited = set()

            while queue:
                current, path = queue.popleft()
                if current in visited:
                    continue
                visited.add(current)

                if current == class_name:
                    # Found path
                    explanation.append(f"{individual} is {direct_type} (asserted)")
                    for i in range(len(path) - 1):
                        explanation.append(f"{path[i]} subClassOf {path[i+1]}")
                    return explanation

                # Explore superclasses
                for superclass in self.subclass_of[current]:
                    queue.append((superclass, path + [superclass]))

        return [f"No reasoning path found from {individual} to {class_name}"]


def test_ontology_reasoner():
    """Test the ontology reasoner."""
    reasoner = OntologyReasoner()

    print("Test 1: Class hierarchy reasoning")
    reasoner.add_subclass("NSAID", "Analgesic")
    reasoner.add_subclass("Analgesic", "Medication")
    reasoner.add_subclass("Medication", "Drug")

    superclasses = reasoner.get_all_superclasses("NSAID")
    print(f"✓ Superclasses of NSAID: {superclasses}")

    print("\\nTest 2: Consistency checking")
    reasoner.add_disjoint("Medication", "Disease")
    reasoner.add_individual("Aspirin", "Medication")

    is_consistent, _ = reasoner.check_consistency()
    print(f"✓ Ontology is consistent: {is_consistent}")

    reasoner.add_individual("Aspirin", "Disease")
    is_consistent, msg = reasoner.check_consistency()
    print(f"✓ Detected inconsistency: {msg}")

    reasoner.individuals["Aspirin"].discard("Disease")

    print("\\nTest 3: Defined classes and classification")
    reasoner.define_class("NSAID",
        intersection_of=["Medication"],
        restrictions=[("hasEffect", "someValuesFrom", "AntiInflammatory")]
    )

    reasoner.add_individual("Ibuprofen", "Medication")
    reasoner.add_property("Ibuprofen", "hasEffect", "AntiInflammatory")

    inferred = reasoner.classify()
    print(f"✓ Classified Ibuprofen as: {inferred.get('Ibuprofen', set())}")

    print("\\nTest 4: Reasoning explanation")
    reasoner.add_individual("NewDrug", "NSAID")
    explanation = reasoner.explain_type("NewDrug", "Drug")
    print(f"✓ Explanation:")
    for step in explanation:
        print(f"  - {step}")

    print("\\n✅ All tests passed!")

test_ontology_reasoner()`,
  tests: [
    {
      input: 'Class hierarchy reasoning',
      expectedOutput: 'Superclasses computed correctly',
      description: 'Test transitive closure of subClassOf relations'
    },
    {
      input: 'Consistency checking with disjoint classes',
      expectedOutput: 'Inconsistency detected correctly',
      description: 'Test disjointness constraints validation'
    },
    {
      input: 'Defined class classification',
      expectedOutput: 'Individuals classified into defined classes',
      description: 'Test reasoning with restrictions and intersections'
    }
  ],
  hints: [
    "Use BFS/DFS for computing transitive closure of subClassOf",
    "Disjointness is symmetric - add both (A,B) and (B,A)",
    "For consistency: check all pairs of types for each individual",
    "Defined classes: check intersectionOf AND all restrictions must be satisfied",
    "someValuesFrom: at least one property value matches",
    "allValuesFrom: all property values must match (vacuously true if no values)",
    "Classification: iterate all individuals × all defined classes, check if definition satisfied",
    "Explanation: BFS from individual's direct type to target class through hierarchy"
  ]
};

// ===========================================
// KNOWLEDGE GRAPHS - Code Challenges
// ===========================================

export const buildKnowledgeGraphChallenge: CodeChallenge = {
  id: 'build-knowledge-graph-challenge',
  title: 'Build a Knowledge Graph from Scratch',
  description: `Knowledge graphs connect entities through relationships, enabling powerful queries and reasoning. Build a practical KG system!

**Key Concepts:**
- **Entities:** Nodes representing real-world objects
- **Relationships:** Labeled, directed edges
- **Attributes:** Properties of entities
- **Querying:** Path finding, pattern matching

**Real-World Use:**
- Google Knowledge Graph powers search
- Product recommendation systems
- Fraud detection in finance

**Your Task:**
Build a knowledge graph that supports:
1. Adding entities with types and attributes
2. Creating relationships between entities
3. Querying with path finding
4. Pattern matching (find all entities matching criteria)

**Example:**
\`\`\`python
kg = KnowledgeGraph()

# Add entities
kg.add_entity("Obama", entity_type="Person", attributes={"birthYear": 1961})
kg.add_entity("Hawaii", entity_type="Location")
kg.add_entity("USA", entity_type="Country")

# Add relationships
kg.add_relationship("Obama", "bornIn", "Hawaii")
kg.add_relationship("Hawaii", "partOf", "USA")

# Query
path = kg.find_path("Obama", "USA")
# Returns: ["Obama", "bornIn", "Hawaii", "partOf", "USA"]
\`\`\``,
  difficulty: 'medium',
  topic: 'Knowledge Graphs',
  template: `from typing import Dict, List, Set, Tuple, Any, Optional
from collections import defaultdict, deque

class KnowledgeGraph:
    """
    A practical knowledge graph implementation.

    Supports:
    - Entity management with types and attributes
    - Relationships (directed labeled edges)
    - Path finding
    - Pattern queries
    """

    def __init__(self):
        # Entities: id -> {type, attributes}
        self.entities: Dict[str, Dict[str, Any]] = {}

        # Relationships: (subject, predicate, object) triples
        self.triples: Set[Tuple[str, str, str]] = set()

        # Index: entity -> outgoing edges
        self.outgoing: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

        # Index: entity -> incoming edges
        self.incoming: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

    def add_entity(
        self,
        entity_id: str,
        entity_type: str = "Entity",
        attributes: Optional[Dict[str, Any]] = None
    ) -> None:
        """
        Add an entity to the knowledge graph.

        Args:
            entity_id: Unique identifier
            entity_type: Type/class of entity
            attributes: Dictionary of properties
        """
        # TODO: Store entity with type and attributes
        pass

    def add_relationship(
        self,
        subject: str,
        predicate: str,
        obj: str
    ) -> None:
        """
        Add a relationship (triple) to the graph.

        Args:
            subject: Source entity
            predicate: Relationship type
            obj: Target entity
        """
        # TODO: Add triple
        # TODO: Update outgoing/incoming indexes
        pass

    def get_entity(self, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get entity details."""
        return self.entities.get(entity_id)

    def get_relationships(
        self,
        subject: Optional[str] = None,
        predicate: Optional[str] = None,
        obj: Optional[str] = None
    ) -> List[Tuple[str, str, str]]:
        """
        Query relationships matching pattern.

        None matches anything (like a variable).

        Examples:
            get_relationships("Obama", None, None)  # All from Obama
            get_relationships(None, "bornIn", "Hawaii")  # All born in Hawaii
        """
        # TODO: Filter triples by pattern
        pass

    def find_path(
        self,
        start: str,
        end: str,
        max_depth: int = 5
    ) -> Optional[List[str]]:
        """
        Find shortest path between two entities.

        Returns:
            Path as list: [entity1, relation1, entity2, relation2, ..., target]
            None if no path exists

        Use BFS for shortest path.
        """
        # TODO: BFS to find shortest path
        pass

    def find_all_paths(
        self,
        start: str,
        end: str,
        max_depth: int = 3
    ) -> List[List[str]]:
        """Find all paths (up to max_depth) between entities."""
        # TODO: DFS or BFS to find all paths
        pass

    def query_by_type(self, entity_type: str) -> List[str]:
        """Find all entities of a given type."""
        # TODO: Filter entities by type
        pass

    def query_by_attribute(
        self,
        attribute: str,
        value: Any
    ) -> List[str]:
        """Find entities with specific attribute value."""
        # TODO: Filter entities by attribute
        pass

    def get_neighbors(
        self,
        entity_id: str,
        direction: str = "outgoing"
    ) -> List[Tuple[str, str]]:
        """
        Get neighboring entities.

        Args:
            entity_id: Entity to query
            direction: "outgoing", "incoming", or "both"

        Returns:
            List of (relation, neighbor) pairs
        """
        # TODO: Return neighbors from index
        pass

    def to_dict(self) -> Dict[str, Any]:
        """Export KG to dictionary format."""
        return {
            "entities": self.entities,
            "triples": list(self.triples)
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'KnowledgeGraph':
        """Load KG from dictionary format."""
        kg = cls()
        # TODO: Reconstruct from data
        return kg


def test_knowledge_graph():
    """Test the knowledge graph."""
    kg = KnowledgeGraph()

    # Test 1: Add entities
    print("Test 1: Adding entities")
    kg.add_entity("Obama", "Person", {"birthYear": 1961, "firstName": "Barack"})
    kg.add_entity("Michelle", "Person", {"birthYear": 1964, "firstName": "Michelle"})
    kg.add_entity("Hawaii", "Location", {"type": "State"})
    kg.add_entity("USA", "Country")
    kg.add_entity("Chicago", "Location", {"type": "City"})

    assert kg.get_entity("Obama")["type"] == "Person"
    assert kg.get_entity("Obama")["attributes"]["birthYear"] == 1961
    print("✓ Entities added")

    # Test 2: Add relationships
    print("\\nTest 2: Adding relationships")
    kg.add_relationship("Obama", "bornIn", "Hawaii")
    kg.add_relationship("Michelle", "bornIn", "Chicago")
    kg.add_relationship("Obama", "spouse", "Michelle")
    kg.add_relationship("Hawaii", "partOf", "USA")
    kg.add_relationship("Chicago", "partOf", "USA")

    assert len(kg.triples) == 5
    print("✓ Relationships added")

    # Test 3: Query relationships
    print("\\nTest 3: Querying relationships")
    results = kg.get_relationships("Obama", None, None)
    print(f"Obama's relationships: {len(results)}")
    assert len(results) == 2

    results = kg.get_relationships(None, "bornIn", None)
    print(f"All bornIn relationships: {len(results)}")
    assert len(results) == 2

    # Test 4: Find path
    print("\\nTest 4: Path finding")
    path = kg.find_path("Obama", "USA")
    print(f"Path from Obama to USA: {path}")
    assert path is not None
    assert path[0] == "Obama"
    assert path[-1] == "USA"

    # Test 5: Query by type
    print("\\nTest 5: Query by type")
    people = kg.query_by_type("Person")
    print(f"People: {people}")
    assert "Obama" in people
    assert "Michelle" in people

    # Test 6: Query by attribute
    print("\\nTest 6: Query by attribute")
    born_1961 = kg.query_by_attribute("birthYear", 1961)
    print(f"Born in 1961: {born_1961}")
    assert "Obama" in born_1961

    # Test 7: Get neighbors
    print("\\nTest 7: Get neighbors")
    neighbors = kg.get_neighbors("Obama", "outgoing")
    print(f"Obama's outgoing: {neighbors}")
    assert len(neighbors) == 2

    print("\\n✅ All tests passed!")

test_knowledge_graph()`,
  solution: `from typing import Dict, List, Set, Tuple, Any, Optional
from collections import defaultdict, deque

class KnowledgeGraph:
    """A practical knowledge graph implementation."""

    def __init__(self):
        self.entities: Dict[str, Dict[str, Any]] = {}
        self.triples: Set[Tuple[str, str, str]] = set()
        self.outgoing: Dict[str, List[Tuple[str, str]]] = defaultdict(list)
        self.incoming: Dict[str, List[Tuple[str, str]]] = defaultdict(list)

    def add_entity(
        self,
        entity_id: str,
        entity_type: str = "Entity",
        attributes: Optional[Dict[str, Any]] = None
    ) -> None:
        """Add an entity to the knowledge graph."""
        self.entities[entity_id] = {
            "type": entity_type,
            "attributes": attributes or {}
        }

    def add_relationship(self, subject: str, predicate: str, obj: str) -> None:
        """Add a relationship (triple) to the graph."""
        # Ensure entities exist
        if subject not in self.entities:
            self.add_entity(subject)
        if obj not in self.entities:
            self.add_entity(obj)

        # Add triple
        triple = (subject, predicate, obj)
        if triple in self.triples:
            return

        self.triples.add(triple)
        self.outgoing[subject].append((predicate, obj))
        self.incoming[obj].append((predicate, subject))

    def get_entity(self, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get entity details."""
        return self.entities.get(entity_id)

    def get_relationships(
        self,
        subject: Optional[str] = None,
        predicate: Optional[str] = None,
        obj: Optional[str] = None
    ) -> List[Tuple[str, str, str]]:
        """Query relationships matching pattern."""
        results = []
        for s, p, o in self.triples:
            if subject is not None and s != subject:
                continue
            if predicate is not None and p != predicate:
                continue
            if obj is not None and o != obj:
                continue
            results.append((s, p, o))
        return results

    def find_path(
        self,
        start: str,
        end: str,
        max_depth: int = 5
    ) -> Optional[List[str]]:
        """Find shortest path between two entities using BFS."""
        if start not in self.entities or end not in self.entities:
            return None

        if start == end:
            return [start]

        queue = deque([(start, [start])])
        visited = {start}

        while queue:
            current, path = queue.popleft()

            if len(path) // 2 >= max_depth:
                continue

            # Explore neighbors
            for relation, neighbor in self.outgoing[current]:
                if neighbor == end:
                    return path + [relation, neighbor]

                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [relation, neighbor]))

        return None

    def find_all_paths(
        self,
        start: str,
        end: str,
        max_depth: int = 3
    ) -> List[List[str]]:
        """Find all paths between entities."""
        if start not in self.entities or end not in self.entities:
            return []

        all_paths = []

        def dfs(current: str, path: List[str], visited: Set[str]):
            if current == end and len(path) > 1:
                all_paths.append(path[:])
                return

            if len(path) // 2 >= max_depth:
                return

            for relation, neighbor in self.outgoing[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    path.extend([relation, neighbor])
                    dfs(neighbor, path, visited)
                    path.pop()
                    path.pop()
                    visited.remove(neighbor)

        dfs(start, [start], {start})
        return all_paths

    def query_by_type(self, entity_type: str) -> List[str]:
        """Find all entities of a given type."""
        return [
            entity_id
            for entity_id, data in self.entities.items()
            if data["type"] == entity_type
        ]

    def query_by_attribute(self, attribute: str, value: Any) -> List[str]:
        """Find entities with specific attribute value."""
        return [
            entity_id
            for entity_id, data in self.entities.items()
            if data["attributes"].get(attribute) == value
        ]

    def get_neighbors(
        self,
        entity_id: str,
        direction: str = "outgoing"
    ) -> List[Tuple[str, str]]:
        """Get neighboring entities."""
        if entity_id not in self.entities:
            return []

        if direction == "outgoing":
            return self.outgoing[entity_id]
        elif direction == "incoming":
            return self.incoming[entity_id]
        elif direction == "both":
            return self.outgoing[entity_id] + self.incoming[entity_id]
        else:
            raise ValueError(f"Invalid direction: {direction}")

    def to_dict(self) -> Dict[str, Any]:
        """Export KG to dictionary format."""
        return {
            "entities": self.entities,
            "triples": list(self.triples)
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'KnowledgeGraph':
        """Load KG from dictionary format."""
        kg = cls()

        # Add entities
        for entity_id, entity_data in data["entities"].items():
            kg.add_entity(
                entity_id,
                entity_data["type"],
                entity_data["attributes"]
            )

        # Add triples
        for s, p, o in data["triples"]:
            kg.add_relationship(s, p, o)

        return kg


def test_knowledge_graph():
    """Test the knowledge graph."""
    kg = KnowledgeGraph()

    print("Test 1: Adding entities")
    kg.add_entity("Obama", "Person", {"birthYear": 1961, "firstName": "Barack"})
    kg.add_entity("Michelle", "Person", {"birthYear": 1964, "firstName": "Michelle"})
    kg.add_entity("Hawaii", "Location", {"type": "State"})
    kg.add_entity("USA", "Country")
    kg.add_entity("Chicago", "Location", {"type": "City"})
    print("✓ Entities added")

    print("\\nTest 2: Adding relationships")
    kg.add_relationship("Obama", "bornIn", "Hawaii")
    kg.add_relationship("Michelle", "bornIn", "Chicago")
    kg.add_relationship("Obama", "spouse", "Michelle")
    kg.add_relationship("Hawaii", "partOf", "USA")
    kg.add_relationship("Chicago", "partOf", "USA")
    print("✓ Relationships added")

    print("\\nTest 3: Querying relationships")
    results = kg.get_relationships("Obama", None, None)
    print(f"✓ Obama's relationships: {len(results)}")

    print("\\nTest 4: Path finding")
    path = kg.find_path("Obama", "USA")
    print(f"✓ Path: {' → '.join(path)}")

    print("\\nTest 5: Query by type")
    people = kg.query_by_type("Person")
    print(f"✓ People: {people}")

    print("\\nTest 6: Query by attribute")
    born_1961 = kg.query_by_attribute("birthYear", 1961)
    print(f"✓ Born in 1961: {born_1961}")

    print("\\nTest 7: Get neighbors")
    neighbors = kg.get_neighbors("Obama", "outgoing")
    print(f"✓ Obama's neighbors: {[(r, n) for r, n in neighbors]}")

    print("\\n✅ All tests passed!")

test_knowledge_graph()`,
  tests: [
    {
      input: 'Entity and relationship storage',
      expectedOutput: 'Entities and triples stored correctly',
      description: 'Test basic KG construction'
    },
    {
      input: 'Path finding between entities',
      expectedOutput: 'Shortest path found via BFS',
      description: 'Test graph traversal algorithms'
    },
    {
      input: 'Query by type and attributes',
      expectedOutput: 'Filtered entities returned',
      description: 'Test semantic queries'
    }
  ],
  hints: [
    "Use dictionaries for entities: {id: {type, attributes}}",
    "Use set for triples to avoid duplicates",
    "Maintain two indexes: outgoing and incoming for fast neighbor lookup",
    "Path finding: Use BFS for shortest path, DFS for all paths",
    "Pattern matching: iterate all triples, filter by conditions",
    "Query by type: filter entities dict by type field",
    "Query by attribute: filter entities dict where attribute matches value"
  ]
};

export const transeImplementationChallenge: CodeChallenge = {
  id: 'transe-implementation-challenge',
  title: 'Implement TransE for Link Prediction',
  description: `TransE is the foundational knowledge graph embedding model. Implement it to predict missing facts!

**Key Concepts:**
- **TransE principle:** h + r ≈ t (entities + relation = target)
- **Scoring:** -||h + r - t|| (lower distance = higher score)
- **Training:** Margin ranking loss with negative sampling
- **Link prediction:** Rank candidate entities by score

**Real-World Use:**
- Google KG completion
- Drug discovery (predict protein-drug interactions)
- Recommendation systems

**Your Task:**
Implement TransE from scratch:
1. Initialize entity and relation embeddings
2. Compute TransE scores
3. Generate negative samples
4. Train with margin ranking loss
5. Predict missing entities

**Example:**
\`\`\`python
# Train on facts
train_triples = [
    (0, 0, 1),  # (Obama, bornIn, Hawaii)
    (1, 1, 0),  # (Michelle, spouse, Obama)
]

model = TransE(num_entities=10, num_relations=5, dim=50)
model.train(train_triples, epochs=100)

# Predict: (Obama, bornIn, ?)
scores = model.predict_tail(0, 0)  # entity 0, relation 0
top_entity = torch.argmax(scores)  # Should be 1 (Hawaii)
\`\`\``,
  difficulty: 'hard',
  topic: 'Knowledge Graphs',
  template: `import torch
import torch.nn as nn
import torch.optim as optim
from typing import List, Tuple
import random

class TransE(nn.Module):
    """
    TransE: Translation-based knowledge graph embedding.

    Principle: h + r ≈ t
    Score: -||h + r - t||
    """

    def __init__(
        self,
        num_entities: int,
        num_relations: int,
        embedding_dim: int = 50,
        margin: float = 1.0,
        norm: int = 2
    ):
        super().__init__()

        self.num_entities = num_entities
        self.num_relations = num_relations
        self.embedding_dim = embedding_dim
        self.margin = margin
        self.norm = norm  # L1 or L2

        # Entity embeddings
        self.entity_embeddings = nn.Embedding(num_entities, embedding_dim)

        # Relation embeddings
        self.relation_embeddings = nn.Embedding(num_relations, embedding_dim)

        # Initialize embeddings
        self._init_embeddings()

    def _init_embeddings(self):
        """Initialize embeddings with Xavier uniform."""
        # TODO: Initialize entity and relation embeddings
        # Use nn.init.xavier_uniform_
        pass

    def forward(self, h: torch.Tensor, r: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        Compute TransE score: -||h + r - t||

        Args:
            h: Head entity IDs (batch_size,)
            r: Relation IDs (batch_size,)
            t: Tail entity IDs (batch_size,)

        Returns:
            scores: TransE scores (batch_size,) - higher is better
        """
        # TODO: Get embeddings
        h_emb = None  # Get entity embedding for h
        r_emb = None  # Get relation embedding for r
        t_emb = None  # Get entity embedding for t

        # TODO: Compute distance ||h + r - t||
        # Use torch.norm(..., p=self.norm, dim=1)
        distance = None

        # TODO: Return negative distance (higher score = better)
        return None

    def normalize_embeddings(self):
        """Normalize entity embeddings to unit length."""
        # TODO: Normalize entity embeddings (NOT relations)
        # Use F.normalize(..., p=2, dim=1)
        pass

    def loss_function(
        self,
        pos_h: torch.Tensor,
        pos_r: torch.Tensor,
        pos_t: torch.Tensor,
        neg_h: torch.Tensor,
        neg_r: torch.Tensor,
        neg_t: torch.Tensor
    ) -> torch.Tensor:
        """
        Compute margin ranking loss.

        Loss = max(0, margin - pos_score + neg_score)

        Goal: pos_score > neg_score + margin
        """
        # TODO: Compute positive scores
        pos_score = None

        # TODO: Compute negative scores
        neg_score = None

        # TODO: Margin ranking loss
        loss = None

        return loss.mean()

    def generate_negative_sample(
        self,
        h: int,
        r: int,
        t: int,
        triples_set: set
    ) -> Tuple[int, int, int]:
        """
        Generate negative sample by corrupting head or tail.

        Avoid generating a true triple from the training set.
        """
        # TODO: Randomly corrupt head or tail
        # Keep trying until we get a triple not in triples_set
        pass

    def predict_tail(self, h: int, r: int) -> torch.Tensor:
        """
        Predict tail entity for (h, r, ?).

        Returns:
            scores: Score for each possible tail entity (num_entities,)
        """
        # TODO: Compute score for (h, r, each_entity)
        # Repeat h and r for all entities, compute scores
        pass

    def predict_head(self, r: int, t: int) -> torch.Tensor:
        """
        Predict head entity for (?, r, t).

        Returns:
            scores: Score for each possible head entity (num_entities,)
        """
        # TODO: Similar to predict_tail
        pass

    def rank_triples(
        self,
        test_triples: List[Tuple[int, int, int]]
    ) -> dict:
        """
        Evaluate model on test triples.

        For each (h, r, t), rank all possible tails and compute metrics:
        - Mean Rank (MR)
        - Mean Reciprocal Rank (MRR)
        - Hits@1, Hits@3, Hits@10
        """
        # TODO: For each test triple (h, r, t):
        # 1. Get scores for all possible tails
        # 2. Rank them (argsort)
        # 3. Find position of true tail t
        # 4. Compute metrics

        metrics = {
            "MR": 0.0,     # Mean Rank
            "MRR": 0.0,    # Mean Reciprocal Rank
            "Hits@1": 0.0,
            "Hits@3": 0.0,
            "Hits@10": 0.0
        }

        # TODO: Implement evaluation

        return metrics


def train_transe(
    model: TransE,
    train_triples: List[Tuple[int, int, int]],
    epochs: int = 100,
    batch_size: int = 128,
    learning_rate: float = 0.01
):
    """Train TransE model."""
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    triples_set = set(train_triples)

    for epoch in range(epochs):
        total_loss = 0
        random.shuffle(train_triples)

        # Mini-batch training
        for i in range(0, len(train_triples), batch_size):
            batch = train_triples[i:i+batch_size]

            # Prepare positive samples
            pos_h = torch.tensor([t[0] for t in batch])
            pos_r = torch.tensor([t[1] for t in batch])
            pos_t = torch.tensor([t[2] for t in batch])

            # Generate negative samples
            neg_samples = [
                model.generate_negative_sample(h, r, t, triples_set)
                for h, r, t in batch
            ]
            neg_h = torch.tensor([n[0] for n in neg_samples])
            neg_r = torch.tensor([n[1] for n in neg_samples])
            neg_t = torch.tensor([n[2] for n in neg_samples])

            # Compute loss
            loss = model.loss_function(pos_h, pos_r, pos_t, neg_h, neg_r, neg_t)

            # Backprop
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            # Normalize embeddings
            model.normalize_embeddings()

            total_loss += loss.item()

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch+1}/{epochs}, Loss: {total_loss/len(train_triples):.4f}")


def test_transe():
    """Test TransE implementation."""
    # Simple knowledge graph
    # Entities: 0=Obama, 1=Hawaii, 2=Michelle, 3=USA, 4=Chicago
    # Relations: 0=bornIn, 1=spouse, 2=locatedIn

    train_triples = [
        (0, 0, 1),  # Obama bornIn Hawaii
        (2, 0, 4),  # Michelle bornIn Chicago
        (0, 1, 2),  # Obama spouse Michelle
        (1, 2, 3),  # Hawaii locatedIn USA
        (4, 2, 3),  # Chicago locatedIn USA
    ]

    test_triples = [
        (2, 1, 0),  # Michelle spouse Obama (should be predictable)
    ]

    print("Training TransE...")
    model = TransE(num_entities=5, num_relations=3, embedding_dim=20)
    train_transe(model, train_triples, epochs=50, batch_size=2, learning_rate=0.01)

    print("\\nTesting predictions:")
    # Predict: (Obama, bornIn, ?)
    scores = model.predict_tail(0, 0)
    predicted = torch.argmax(scores).item()
    print(f"(Obama, bornIn, ?) → Predicted: {predicted}, Actual: 1 (Hawaii)")

    # Predict: (?, spouse, Obama)
    scores = model.predict_head(1, 0)
    predicted = torch.argmax(scores).item()
    print(f"(?, spouse, Obama) → Predicted: {predicted}, Actual: 2 (Michelle)")

    # Evaluate
    print("\\nEvaluating on test set:")
    metrics = model.rank_triples(test_triples)
    print(f"Metrics: {metrics}")

    print("\\n✅ TransE test complete!")

test_transe()`,
  solution: `import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from typing import List, Tuple
import random

class TransE(nn.Module):
    """TransE: Translation-based knowledge graph embedding."""

    def __init__(
        self,
        num_entities: int,
        num_relations: int,
        embedding_dim: int = 50,
        margin: float = 1.0,
        norm: int = 2
    ):
        super().__init__()

        self.num_entities = num_entities
        self.num_relations = num_relations
        self.embedding_dim = embedding_dim
        self.margin = margin
        self.norm = norm

        self.entity_embeddings = nn.Embedding(num_entities, embedding_dim)
        self.relation_embeddings = nn.Embedding(num_relations, embedding_dim)

        self._init_embeddings()

    def _init_embeddings(self):
        """Initialize embeddings with Xavier uniform."""
        nn.init.xavier_uniform_(self.entity_embeddings.weight.data)
        nn.init.xavier_uniform_(self.relation_embeddings.weight.data)

    def forward(self, h: torch.Tensor, r: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """Compute TransE score: -||h + r - t||"""
        h_emb = self.entity_embeddings(h)
        r_emb = self.relation_embeddings(r)
        t_emb = self.entity_embeddings(t)

        distance = torch.norm(h_emb + r_emb - t_emb, p=self.norm, dim=1)
        return -distance

    def normalize_embeddings(self):
        """Normalize entity embeddings to unit length."""
        self.entity_embeddings.weight.data = F.normalize(
            self.entity_embeddings.weight.data, p=2, dim=1
        )

    def loss_function(
        self,
        pos_h: torch.Tensor,
        pos_r: torch.Tensor,
        pos_t: torch.Tensor,
        neg_h: torch.Tensor,
        neg_r: torch.Tensor,
        neg_t: torch.Tensor
    ) -> torch.Tensor:
        """Compute margin ranking loss."""
        pos_score = self.forward(pos_h, pos_r, pos_t)
        neg_score = self.forward(neg_h, neg_r, neg_t)

        # Margin ranking: want pos_score > neg_score + margin
        loss = torch.relu(self.margin + neg_score - pos_score)
        return loss.mean()

    def generate_negative_sample(
        self,
        h: int,
        r: int,
        t: int,
        triples_set: set
    ) -> Tuple[int, int, int]:
        """Generate negative sample by corrupting head or tail."""
        while True:
            if random.random() < 0.5:
                # Corrupt head
                neg_h = random.randint(0, self.num_entities - 1)
                neg_triple = (neg_h, r, t)
            else:
                # Corrupt tail
                neg_t = random.randint(0, self.num_entities - 1)
                neg_triple = (h, r, neg_t)

            # Ensure it's not a true triple
            if neg_triple not in triples_set:
                return neg_triple

    def predict_tail(self, h: int, r: int) -> torch.Tensor:
        """Predict tail entity for (h, r, ?)."""
        h_batch = torch.tensor([h] * self.num_entities)
        r_batch = torch.tensor([r] * self.num_entities)
        t_batch = torch.arange(self.num_entities)

        with torch.no_grad():
            scores = self.forward(h_batch, r_batch, t_batch)

        return scores

    def predict_head(self, r: int, t: int) -> torch.Tensor:
        """Predict head entity for (?, r, t)."""
        h_batch = torch.arange(self.num_entities)
        r_batch = torch.tensor([r] * self.num_entities)
        t_batch = torch.tensor([t] * self.num_entities)

        with torch.no_grad():
            scores = self.forward(h_batch, r_batch, t_batch)

        return scores

    def rank_triples(self, test_triples: List[Tuple[int, int, int]]) -> dict:
        """Evaluate model on test triples."""
        ranks = []
        reciprocal_ranks = []
        hits_at_1 = 0
        hits_at_3 = 0
        hits_at_10 = 0

        for h, r, t in test_triples:
            # Predict tail
            scores = self.predict_tail(h, r)

            # Rank entities by score (descending)
            sorted_indices = torch.argsort(scores, descending=True)

            # Find rank of true tail
            rank = (sorted_indices == t).nonzero(as_tuple=True)[0].item() + 1

            ranks.append(rank)
            reciprocal_ranks.append(1.0 / rank)

            if rank <= 1:
                hits_at_1 += 1
            if rank <= 3:
                hits_at_3 += 1
            if rank <= 10:
                hits_at_10 += 1

        n = len(test_triples)
        return {
            "MR": sum(ranks) / n,
            "MRR": sum(reciprocal_ranks) / n,
            "Hits@1": hits_at_1 / n,
            "Hits@3": hits_at_3 / n,
            "Hits@10": hits_at_10 / n
        }


def train_transe(
    model: TransE,
    train_triples: List[Tuple[int, int, int]],
    epochs: int = 100,
    batch_size: int = 128,
    learning_rate: float = 0.01
):
    """Train TransE model."""
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    triples_set = set(train_triples)

    for epoch in range(epochs):
        total_loss = 0
        random.shuffle(train_triples)

        for i in range(0, len(train_triples), batch_size):
            batch = train_triples[i:i+batch_size]

            pos_h = torch.tensor([t[0] for t in batch])
            pos_r = torch.tensor([t[1] for t in batch])
            pos_t = torch.tensor([t[2] for t in batch])

            neg_samples = [
                model.generate_negative_sample(h, r, t, triples_set)
                for h, r, t in batch
            ]
            neg_h = torch.tensor([n[0] for n in neg_samples])
            neg_r = torch.tensor([n[1] for n in neg_samples])
            neg_t = torch.tensor([n[2] for n in neg_samples])

            loss = model.loss_function(pos_h, pos_r, pos_t, neg_h, neg_r, neg_t)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            model.normalize_embeddings()

            total_loss += loss.item()

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch+1}/{epochs}, Loss: {total_loss/len(train_triples):.4f}")


def test_transe():
    """Test TransE implementation."""
    train_triples = [
        (0, 0, 1),  # Obama bornIn Hawaii
        (2, 0, 4),  # Michelle bornIn Chicago
        (0, 1, 2),  # Obama spouse Michelle
        (1, 2, 3),  # Hawaii locatedIn USA
        (4, 2, 3),  # Chicago locatedIn USA
    ]

    test_triples = [(2, 1, 0)]

    print("Training TransE...")
    model = TransE(num_entities=5, num_relations=3, embedding_dim=20)
    train_transe(model, train_triples, epochs=50, batch_size=2, learning_rate=0.01)

    print("\\nTesting predictions:")
    scores = model.predict_tail(0, 0)
    predicted = torch.argmax(scores).item()
    print(f"✓ (Obama, bornIn, ?) → Predicted: {predicted}")

    print("\\nEvaluating:")
    metrics = model.rank_triples(test_triples)
    print(f"✓ MRR: {metrics['MRR']:.3f}, Hits@10: {metrics['Hits@10']:.1%}")

    print("\\n✅ TransE test complete!")

test_transe()`,
  tests: [
    {
      input: 'TransE embedding initialization',
      expectedOutput: 'Entity and relation embeddings initialized',
      description: 'Test model setup with proper dimensions'
    },
    {
      input: 'Link prediction with trained embeddings',
      expectedOutput: 'Correct tail entity predicted',
      description: 'Test h + r ≈ t scoring'
    },
    {
      input: 'Ranking metrics computation',
      expectedOutput: 'MRR and Hits@10 calculated',
      description: 'Test evaluation metrics'
    }
  ],
  hints: [
    "Initialize with xavier_uniform for stable training",
    "Score: -||h + r - t|| where || is L1 or L2 norm",
    "Normalize entity embeddings after each update (not relations!)",
    "Negative sampling: corrupt head OR tail, avoid true triples",
    "Margin ranking loss: max(0, margin - pos_score + neg_score)",
    "Prediction: compute scores for (h, r, all_entities), return argmax",
    "Ranking: argsort scores descending, find position of true entity",
    "Typical hyperparams: dim=50-100, margin=1.0, lr=0.001-0.01"
  ]
};

// ===========================================
// GRAPH NEURAL NETWORKS - Code Challenges
// ===========================================

export const buildGNNChallenge: CodeChallenge = {
  id: 'build-gnn-challenge',
  title: 'Build a Graph Neural Network from Scratch',
  description: `Graph Neural Networks (GNNs) enable deep learning on graph-structured data through **message passing**: nodes aggregate information from neighbors, update their embeddings, and repeat for multiple layers.

**The Message Passing Framework:**
1. **Message:** Each neighbor sends a message to the target node
2. **Aggregate:** Combine all messages (sum, mean, max, attention)
3. **Update:** Update node embedding using aggregated messages
4. **Repeat:** Stack multiple layers for multi-hop reasoning

**Real-world applications:**
- **Drug discovery:** Predict molecule properties (atoms = nodes, bonds = edges)
- **Recommendation:** Pinterest PinSage (3B pins, 18B edges)
- **Traffic prediction:** Google Maps road networks
- **Fraud detection:** PayPal transaction graphs

**Your Task:**
Implement a Graph Convolutional Network (GCN) from scratch. You'll build:
1. **GCNLayer:** Single message-passing layer with mean aggregation
2. **GCN:** Multi-layer network for node classification
3. **Training loop:** Semi-supervised learning on citation network

**Key concepts:**
- Message passing: \`h_v^{(l+1)} = σ(W @ mean(h_u for u in neighbors(v)))\`
- Normalization: Divide by sqrt(degree) to prevent vanishing/exploding gradients
- Semi-supervised: Train on few labeled nodes, predict on rest`,
  difficulty: 'hard',
  topic: 'Graph Neural Networks',
  template: `import torch
import torch.nn as nn
import torch.nn.functional as F

class GCNLayer(nn.Module):
    """
    Single Graph Convolutional Network layer.

    Performs message passing: each node aggregates features from neighbors,
    applies a linear transformation, and passes through activation.

    Formula:
        h_v^{(l+1)} = σ( Σ_{u ∈ N(v) ∪ {v}} (1/√(d_u * d_v)) * W @ h_u^{(l)} )

    Where:
        - N(v): neighbors of node v
        - d_u, d_v: degrees of nodes u and v
        - W: learnable weight matrix
        - σ: activation function (ReLU)
    """

    def __init__(self, in_features, out_features):
        """
        Initialize GCN layer.

        Args:
            in_features: Input feature dimension
            out_features: Output feature dimension
        """
        super().__init__()
        # TODO: Create linear transformation
        self.linear = None
        pass

    def forward(self, X, adj):
        """
        Forward pass through GCN layer.

        Args:
            X: Node features, shape (num_nodes, in_features)
            adj: Adjacency matrix, shape (num_nodes, num_nodes)
                 adj[i, j] = 1 if edge from i to j, else 0

        Returns:
            Updated node features, shape (num_nodes, out_features)

        Steps:
            1. Add self-loops: adj = adj + I
            2. Compute degree matrix D (diagonal with node degrees)
            3. Normalize: D^{-1/2} @ adj @ D^{-1/2}
            4. Aggregate: normalized_adj @ X
            5. Transform: linear(aggregated)
            6. Activate: ReLU
        """
        # TODO: Implement forward pass
        pass


class GCN(nn.Module):
    """
    Two-layer Graph Convolutional Network for node classification.

    Architecture:
        Input → GCNLayer(hidden) → Dropout → GCNLayer(output) → LogSoftmax
    """

    def __init__(self, input_dim, hidden_dim, output_dim, dropout=0.5):
        """
        Initialize GCN.

        Args:
            input_dim: Input feature dimension
            hidden_dim: Hidden layer dimension
            output_dim: Number of classes
            dropout: Dropout probability
        """
        super().__init__()
        # TODO: Create two GCN layers
        self.conv1 = None
        self.conv2 = None
        self.dropout = dropout

    def forward(self, X, adj):
        """
        Forward pass through GCN.

        Args:
            X: Node features, shape (num_nodes, input_dim)
            adj: Adjacency matrix, shape (num_nodes, num_nodes)

        Returns:
            Log probabilities for each class, shape (num_nodes, output_dim)
        """
        # TODO: Implement forward pass with dropout
        pass


def train_gnn(model, X, adj, labels, train_mask, val_mask, epochs=200, lr=0.01):
    """
    Train GNN with semi-supervised learning.

    Args:
        model: GCN model
        X: Node features
        adj: Adjacency matrix
        labels: Ground truth labels (only train_mask indices are used)
        train_mask: Boolean mask for training nodes
        val_mask: Boolean mask for validation nodes
        epochs: Number of training epochs
        lr: Learning rate

    Returns:
        Trained model
    """
    # TODO: Implement training loop
    # - Use Adam optimizer
    # - Loss: NLL loss on train_mask nodes only
    # - Track validation accuracy
    pass


def evaluate_gnn(model, X, adj, labels, test_mask):
    """
    Evaluate GNN on test set.

    Args:
        model: Trained GCN model
        X: Node features
        adj: Adjacency matrix
        labels: Ground truth labels
        test_mask: Boolean mask for test nodes

    Returns:
        Test accuracy
    """
    # TODO: Implement evaluation
    # - Set model to eval mode
    # - Compute predictions
    # - Calculate accuracy on test_mask nodes
    pass


# Test on Karate Club dataset (small graph for testing)
def test_gcn():
    """Test GCN on Zachary's Karate Club network."""
    # Karate Club: 34 nodes, 2 communities
    adj = torch.tensor([
        # Simplified adjacency matrix (34x34)
        # (In practice, use a real dataset like Cora from PyTorch Geometric)
        # Here we create a small 7-node toy graph for testing
        [0, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 0],
    ], dtype=torch.float32)

    # Node features (7 nodes, 3 features each)
    X = torch.tensor([
        [1.0, 0.0, 0.5],
        [0.8, 0.2, 0.3],
        [0.9, 0.1, 0.4],
        [0.3, 0.7, 0.6],
        [0.2, 0.8, 0.7],
        [0.1, 0.9, 0.8],
        [0.0, 1.0, 0.9],
    ])

    # Labels: 2 communities (0 or 1)
    labels = torch.tensor([0, 0, 0, 1, 1, 1, 1])

    # Train/val/test masks (semi-supervised: only 2 labeled nodes!)
    train_mask = torch.tensor([True, False, False, False, False, False, True])
    val_mask = torch.tensor([False, True, False, False, False, True, False])
    test_mask = torch.tensor([False, False, True, True, True, False, False])

    print("Creating GCN...")
    model = GCN(input_dim=3, hidden_dim=16, output_dim=2)

    print("Training GCN (semi-supervised with only 2 labeled nodes)...")
    train_gnn(model, X, adj, labels, train_mask, val_mask, epochs=100, lr=0.01)

    print("\\nEvaluating on test set...")
    test_acc = evaluate_gnn(model, X, adj, labels, test_mask)
    print(f"✓ Test Accuracy: {test_acc:.1%}")

    print("\\n✅ GCN test complete!")

test_gcn()`,
  solution: `import torch
import torch.nn as nn
import torch.nn.functional as F

class GCNLayer(nn.Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features)

    def forward(self, X, adj):
        # Step 1: Add self-loops
        adj = adj + torch.eye(adj.shape[0])

        # Step 2: Compute degree matrix
        deg = adj.sum(dim=1)

        # Step 3: Normalization: D^{-1/2}
        deg_inv_sqrt = torch.pow(deg, -0.5)
        deg_inv_sqrt[torch.isinf(deg_inv_sqrt)] = 0.0

        # Normalize adjacency matrix
        deg_mat_inv_sqrt = torch.diag(deg_inv_sqrt)
        adj_normalized = deg_mat_inv_sqrt @ adj @ deg_mat_inv_sqrt

        # Step 4: Aggregate from neighbors
        aggregated = adj_normalized @ X

        # Step 5: Linear transformation
        output = self.linear(aggregated)

        # Step 6: Activation
        return F.relu(output)


class GCN(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, dropout=0.5):
        super().__init__()
        self.conv1 = GCNLayer(input_dim, hidden_dim)
        self.conv2 = GCNLayer(hidden_dim, output_dim)
        self.dropout = dropout

    def forward(self, X, adj):
        # First GCN layer
        X = self.conv1(X, adj)

        # Dropout
        X = F.dropout(X, p=self.dropout, training=self.training)

        # Second GCN layer
        X = self.conv2(X, adj)

        # Log softmax for classification
        return F.log_softmax(X, dim=1)


def train_gnn(model, X, adj, labels, train_mask, val_mask, epochs=200, lr=0.01):
    optimizer = torch.optim.Adam(model.parameters(), lr=lr, weight_decay=5e-4)

    best_val_acc = 0.0

    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()

        # Forward pass
        out = model(X, adj)

        # Loss on training nodes only (semi-supervised!)
        loss = F.nll_loss(out[train_mask], labels[train_mask])

        # Backward pass
        loss.backward()
        optimizer.step()

        # Validation
        if epoch % 20 == 0:
            model.eval()
            with torch.no_grad():
                out = model(X, adj)
                pred = out.argmax(dim=1)

                train_acc = (pred[train_mask] == labels[train_mask]).float().mean()
                val_acc = (pred[val_mask] == labels[val_mask]).float().mean()

                if val_acc > best_val_acc:
                    best_val_acc = val_acc

                print(f"Epoch {epoch:3d}: Loss={loss.item():.4f}, "
                      f"Train Acc={train_acc:.2%}, Val Acc={val_acc:.2%}")

    return model


def evaluate_gnn(model, X, adj, labels, test_mask):
    model.eval()
    with torch.no_grad():
        out = model(X, adj)
        pred = out.argmax(dim=1)
        test_acc = (pred[test_mask] == labels[test_mask]).float().mean()
        return test_acc.item()


def test_gcn():
    adj = torch.tensor([
        [0, 1, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 0],
    ], dtype=torch.float32)

    X = torch.tensor([
        [1.0, 0.0, 0.5],
        [0.8, 0.2, 0.3],
        [0.9, 0.1, 0.4],
        [0.3, 0.7, 0.6],
        [0.2, 0.8, 0.7],
        [0.1, 0.9, 0.8],
        [0.0, 1.0, 0.9],
    ])

    labels = torch.tensor([0, 0, 0, 1, 1, 1, 1])

    train_mask = torch.tensor([True, False, False, False, False, False, True])
    val_mask = torch.tensor([False, True, False, False, False, True, False])
    test_mask = torch.tensor([False, False, True, True, True, False, False])

    print("Creating GCN...")
    model = GCN(input_dim=3, hidden_dim=16, output_dim=2)

    print("Training GCN (semi-supervised with only 2 labeled nodes)...")
    train_gnn(model, X, adj, labels, train_mask, val_mask, epochs=100, lr=0.01)

    print("\\nEvaluating on test set...")
    test_acc = evaluate_gnn(model, X, adj, labels, test_mask)
    print(f"✓ Test Accuracy: {test_acc:.1%}")

    print("\\n✅ GCN test complete!")

test_gcn()`,
  tests: [
    {
      input: 'GCN layer forward pass',
      expectedOutput: 'Node embeddings aggregated from neighbors',
      description: 'Test message passing mechanism'
    },
    {
      input: 'Semi-supervised node classification',
      expectedOutput: 'Unlabeled nodes classified correctly',
      description: 'Test label propagation through graph'
    },
    {
      input: 'Adjacency normalization',
      expectedOutput: 'Normalized adjacency matrix computed',
      description: 'Test D^{-1/2} A D^{-1/2} transformation'
    }
  ],
  hints: [
    "Add self-loops before normalization: adj + I",
    "Degree matrix D is diagonal: D[i,i] = sum of row i in adj",
    "Normalization: D^{-1/2} @ A @ D^{-1/2} prevents gradient issues",
    "Use torch.diag() to create diagonal matrix from vector",
    "Handle infinite values: deg^{-1/2} is inf for isolated nodes (set to 0)",
    "Semi-supervised: loss computed only on train_mask nodes!",
    "Validation: use torch.no_grad() to disable gradient computation",
    "Typical hyperparams: hidden_dim=16-64, dropout=0.5, lr=0.01, weight_decay=5e-4"
  ]
};

export const ragWithKGChallenge: CodeChallenge = {
  id: 'rag-with-kg-challenge',
  title: 'Build a RAG System with Knowledge Graph Retrieval',
  description: `Retrieval-Augmented Generation (RAG) fixes LLM hallucinations by augmenting generation with retrieval from external knowledge sources. This is the architecture used by **ChatGPT**, **Perplexity**, **Bing Chat**, and most production LLM systems.

**The RAG Pipeline:**
1. **Query Understanding:** Parse user query, extract entities/intent
2. **Retrieval:** Query knowledge graph for relevant facts
3. **Context Assembly:** Format retrieved facts as context
4. **Augmented Generation:** LLM generates answer using retrieved context
5. **Citation:** Track provenance of claims back to source facts

**Why RAG with Knowledge Graphs?**
- **Structured knowledge:** KGs encode facts as triples (subject, predicate, object)
- **Multi-hop reasoning:** Follow graph edges for complex queries
- **Provenance:** Every fact has a source (triple in KG)
- **Composability:** Combine with vector search for hybrid retrieval

**Real-world examples:**
- **Google Search:** LLM + Knowledge Graph for featured snippets
- **Enterprise RAG:** Company LLM + internal knowledge base
- **Medical QA:** LLM + UMLS/DrugBank knowledge graphs
- **Customer support:** LLM + product documentation graph

**Your Task:**
Build a production-quality RAG system that:
1. Maintains a knowledge graph of facts
2. Retrieves relevant facts via pattern matching and graph traversal
3. Formats context for LLM (with citations)
4. Simulates LLM generation (you'll implement a simple template-based generator)
5. Returns answer with source citations

**Key concepts:**
- Pattern matching: \`(?subject, relation, ?object)\` queries
- Multi-hop: Follow edges in KG (e.g., "Obama → bornIn → Hawaii → locatedIn → USA")
- Context ranking: Score facts by relevance to query
- Citation tracking: Map each claim to source triple`,
  difficulty: 'hard',
  topic: 'Neural-Symbolic AI',
  template: `from typing import List, Dict, Tuple, Optional, Set
from collections import defaultdict
import re

class KnowledgeGraph:
    """
    Knowledge Graph for RAG retrieval.

    Stores facts as (subject, predicate, object) triples.
    Supports pattern matching and multi-hop traversal.
    """

    def __init__(self):
        self.triples: Set[Tuple[str, str, str]] = set()
        # Indexes for fast retrieval
        self.spo: Dict[str, Dict[str, List[str]]] = defaultdict(lambda: defaultdict(list))
        self.ops: Dict[str, Dict[str, List[str]]] = defaultdict(lambda: defaultdict(list))

    def add_triple(self, subject: str, predicate: str, obj: str):
        """
        Add a triple to the knowledge graph.

        Args:
            subject: Subject entity (e.g., "Obama")
            predicate: Relation (e.g., "bornIn")
            obj: Object entity (e.g., "Hawaii")
        """
        # TODO: Add triple and update indexes
        pass

    def query_pattern(self, subject: Optional[str], predicate: Optional[str],
                     obj: Optional[str]) -> List[Tuple[str, str, str]]:
        """
        Query KG with pattern (supports variables via None).

        Examples:
            query_pattern("Obama", "bornIn", None) → [("Obama", "bornIn", "Hawaii")]
            query_pattern(None, "bornIn", "Hawaii") → [("Obama", "bornIn", "Hawaii")]
            query_pattern("Obama", None, None) → all triples with Obama as subject

        Args:
            subject: Subject entity or None (variable)
            predicate: Relation or None (variable)
            obj: Object entity or None (variable)

        Returns:
            List of matching triples
        """
        # TODO: Implement pattern matching using indexes
        pass

    def find_path(self, start: str, end: str, max_depth: int = 3) -> Optional[List[Tuple[str, str, str]]]:
        """
        Find path from start entity to end entity (multi-hop).

        Uses BFS to find shortest path.

        Args:
            start: Starting entity
            end: Target entity
            max_depth: Maximum path length

        Returns:
            List of triples forming path, or None if no path found

        Example:
            find_path("Obama", "USA") might return:
            [("Obama", "bornIn", "Hawaii"), ("Hawaii", "locatedIn", "USA")]
        """
        # TODO: Implement BFS path finding
        pass


class RAGSystem:
    """
    Retrieval-Augmented Generation system with Knowledge Graph backend.

    Combines KG retrieval with LLM generation for grounded answers.
    """

    def __init__(self, kg: KnowledgeGraph):
        self.kg = kg

    def retrieve_facts(self, query: str, top_k: int = 5) -> List[Tuple[Tuple[str, str, str], float]]:
        """
        Retrieve relevant facts from KG given natural language query.

        Strategy:
            1. Extract entities from query (simple: find capitalized words or known entities)
            2. Query KG for facts involving those entities
            3. Score facts by relevance
            4. Return top-k facts with scores

        Args:
            query: Natural language query (e.g., "Where was Obama born?")
            top_k: Number of facts to retrieve

        Returns:
            List of (triple, relevance_score) tuples

        Example:
            query = "Where was Obama born?"
            → [
                (("Obama", "bornIn", "Hawaii"), 0.95),
                (("Hawaii", "locatedIn", "USA"), 0.7)
            ]
        """
        # TODO: Implement entity extraction and fact retrieval
        pass

    def assemble_context(self, facts: List[Tuple[Tuple[str, str, str], float]]) -> str:
        """
        Format retrieved facts as context for LLM.

        Args:
            facts: List of (triple, score) tuples

        Returns:
            Formatted context string

        Example output:
            '''
            Context (from Knowledge Graph):
            [1] Obama bornIn Hawaii
            [2] Hawaii locatedIn USA
            '''
        """
        # TODO: Format facts with citation numbers
        pass

    def generate_answer(self, query: str, context: str) -> Dict[str, any]:
        """
        Generate answer to query using retrieved context.

        In production: Call LLM API (OpenAI, Anthropic, etc.)
        Here: Simple template-based generation for demonstration

        Args:
            query: Natural language query
            context: Retrieved facts formatted as string

        Returns:
            Dictionary with:
                - 'answer': Generated answer string
                - 'citations': List of citation numbers used
                - 'confidence': Confidence score (0-1)

        Example:
            query = "Where was Obama born?"
            context = "[1] Obama bornIn Hawaii\\n[2] Hawaii locatedIn USA"
            → {
                'answer': "Obama was born in Hawaii [1], which is located in the USA [2].",
                'citations': [1, 2],
                'confidence': 0.95
            }
        """
        # TODO: Implement answer generation with citations
        # For simplicity, use template matching
        # In production, you'd call: openai.ChatCompletion.create(...)
        pass

    def answer_question(self, query: str, top_k: int = 5) -> Dict[str, any]:
        """
        Full RAG pipeline: retrieve → assemble context → generate answer.

        Args:
            query: Natural language query

        Returns:
            Dictionary with answer, citations, and metadata
        """
        # TODO: Implement full pipeline
        # 1. Retrieve facts
        # 2. Assemble context
        # 3. Generate answer
        # 4. Return result with citations
        pass


# Test RAG system
def test_rag():
    """Test RAG system on a toy knowledge base."""
    print("Building Knowledge Graph...")
    kg = KnowledgeGraph()

    # Add facts
    facts = [
        ("Obama", "bornIn", "Hawaii"),
        ("Hawaii", "locatedIn", "USA"),
        ("Obama", "profession", "Politician"),
        ("Obama", "spouse", "Michelle"),
        ("Michelle", "bornIn", "Chicago"),
        ("Chicago", "locatedIn", "Illinois"),
        ("Illinois", "locatedIn", "USA"),
        ("Obama", "education", "Harvard"),
        ("Harvard", "locatedIn", "Massachusetts"),
    ]

    for s, p, o in facts:
        kg.add_triple(s, p, o)

    print(f"✓ Loaded {len(facts)} facts")

    print("\\nTesting KG queries...")
    results = kg.query_pattern("Obama", "bornIn", None)
    print(f"✓ Obama bornIn ? → {results}")

    results = kg.query_pattern(None, "locatedIn", "USA")
    print(f"✓ ? locatedIn USA → {results}")

    print("\\nTesting multi-hop path finding...")
    path = kg.find_path("Obama", "USA")
    print(f"✓ Path from Obama to USA: {path}")

    print("\\nBuilding RAG system...")
    rag = RAGSystem(kg)

    print("\\nTesting RAG queries...")

    queries = [
        "Where was Obama born?",
        "Where was Michelle born?",
        "What is the connection between Obama and the USA?",
    ]

    for query in queries:
        print(f"\\n{'='*60}")
        print(f"Query: {query}")
        result = rag.answer_question(query, top_k=3)
        print(f"Answer: {result['answer']}")
        print(f"Citations: {result['citations']}")
        print(f"Confidence: {result['confidence']:.0%}")

    print("\\n✅ RAG test complete!")

test_rag()`,
  solution: `from typing import List, Dict, Tuple, Optional, Set
from collections import defaultdict, deque
import re

class KnowledgeGraph:
    def __init__(self):
        self.triples: Set[Tuple[str, str, str]] = set()
        self.spo: Dict[str, Dict[str, List[str]]] = defaultdict(lambda: defaultdict(list))
        self.ops: Dict[str, Dict[str, List[str]]] = defaultdict(lambda: defaultdict(list))

    def add_triple(self, subject: str, predicate: str, obj: str):
        if (subject, predicate, obj) not in self.triples:
            self.triples.add((subject, predicate, obj))
            self.spo[subject][predicate].append(obj)
            self.ops[obj][predicate].append(subject)

    def query_pattern(self, subject: Optional[str], predicate: Optional[str],
                     obj: Optional[str]) -> List[Tuple[str, str, str]]:
        results = []

        if subject is not None and predicate is not None and obj is not None:
            # Fully specified
            if (subject, predicate, obj) in self.triples:
                results.append((subject, predicate, obj))

        elif subject is not None and predicate is not None:
            # (s, p, ?)
            for o in self.spo[subject][predicate]:
                results.append((subject, predicate, o))

        elif subject is not None and obj is not None:
            # (s, ?, o)
            for s, p, o in self.triples:
                if s == subject and o == obj:
                    results.append((s, p, o))

        elif predicate is not None and obj is not None:
            # (?, p, o)
            for s in self.ops[obj][predicate]:
                results.append((s, predicate, obj))

        elif subject is not None:
            # (s, ?, ?)
            for p, objs in self.spo[subject].items():
                for o in objs:
                    results.append((subject, p, o))

        elif obj is not None:
            # (?, ?, o)
            for p, subjs in self.ops[obj].items():
                for s in subjs:
                    results.append((s, p, obj))

        elif predicate is not None:
            # (?, p, ?)
            for s, p, o in self.triples:
                if p == predicate:
                    results.append((s, p, o))

        else:
            # (?, ?, ?)
            results = list(self.triples)

        return results

    def find_path(self, start: str, end: str, max_depth: int = 3) -> Optional[List[Tuple[str, str, str]]]:
        if start == end:
            return []

        queue = deque([(start, [])])
        visited = {start}

        while queue:
            current, path = queue.popleft()

            if len(path) >= max_depth:
                continue

            # Explore outgoing edges
            for predicate, objs in self.spo[current].items():
                for obj in objs:
                    new_path = path + [(current, predicate, obj)]

                    if obj == end:
                        return new_path

                    if obj not in visited:
                        visited.add(obj)
                        queue.append((obj, new_path))

        return None


class RAGSystem:
    def __init__(self, kg: KnowledgeGraph):
        self.kg = kg

    def retrieve_facts(self, query: str, top_k: int = 5) -> List[Tuple[Tuple[str, str, str], float]]:
        # Extract entities (simple: words starting with capital letter)
        entities = re.findall(r'\\b[A-Z][a-z]+\\b', query)

        if not entities:
            return []

        # Retrieve facts mentioning entities
        facts_with_scores = []
        seen = set()

        for entity in entities:
            # Facts where entity is subject
            for triple in self.kg.query_pattern(entity, None, None):
                if triple not in seen:
                    seen.add(triple)
                    # Score: 1.0 for direct mention, 0.5 for multi-hop
                    facts_with_scores.append((triple, 1.0))

            # Facts where entity is object
            for triple in self.kg.query_pattern(None, None, entity):
                if triple not in seen:
                    seen.add(triple)
                    facts_with_scores.append((triple, 0.8))

        # Multi-hop: if query asks "connection" or "related"
        if "connection" in query.lower() or "related" in query.lower():
            if len(entities) >= 2:
                path = self.kg.find_path(entities[0], entities[1])
                if path:
                    for triple in path:
                        if triple not in seen:
                            seen.add(triple)
                            facts_with_scores.append((triple, 0.9))

        # Sort by score and return top-k
        facts_with_scores.sort(key=lambda x: x[1], reverse=True)
        return facts_with_scores[:top_k]

    def assemble_context(self, facts: List[Tuple[Tuple[str, str, str], float]]) -> str:
        if not facts:
            return "No relevant facts found."

        lines = ["Context (from Knowledge Graph):"]
        for i, (triple, score) in enumerate(facts, 1):
            s, p, o = triple
            lines.append(f"[{i}] {s} {p} {o}")

        return "\\n".join(lines)

    def generate_answer(self, query: str, context: str) -> Dict[str, any]:
        # Parse context to extract facts
        lines = context.split("\\n")[1:]  # Skip header
        facts = []
        for line in lines:
            match = re.match(r'\\[(\\d+)\\] (\\w+) (\\w+) (\\w+)', line)
            if match:
                cite_num, s, p, o = match.groups()
                facts.append((cite_num, s, p, o))

        if not facts:
            return {
                'answer': "I don't have enough information to answer that.",
                'citations': [],
                'confidence': 0.0
            }

        # Simple template-based generation
        answer = ""
        citations_used = []

        # "Where was X born?" pattern
        if "where" in query.lower() and "born" in query.lower():
            for cite, s, p, o in facts:
                if p == "bornIn":
                    answer = f"{s} was born in {o} [{cite}]."
                    citations_used.append(int(cite))

                    # Add location info if available
                    for cite2, s2, p2, o2 in facts:
                        if s2 == o and p2 == "locatedIn":
                            answer += f" {o} is located in {o2} [{cite2}]."
                            citations_used.append(int(cite2))
                            break
                    break

        # "Connection" or "relation" pattern
        elif "connection" in query.lower() or "relation" in query.lower():
            path_str = " → ".join([f"{s} ({p})" for cite, s, p, o in facts])
            answer = f"The connection is: {path_str}. "
            answer += "Citations: " + ", ".join([f"[{cite}]" for cite, _, _, _ in facts])
            citations_used = [int(cite) for cite, _, _, _ in facts]

        # Generic: just list facts
        else:
            answer = "Based on the knowledge graph: "
            for cite, s, p, o in facts:
                answer += f"{s} {p} {o} [{cite}]. "
                citations_used.append(int(cite))

        confidence = min(1.0, len(citations_used) * 0.3)

        return {
            'answer': answer,
            'citations': citations_used,
            'confidence': confidence
        }

    def answer_question(self, query: str, top_k: int = 5) -> Dict[str, any]:
        # 1. Retrieve facts
        facts = self.retrieve_facts(query, top_k)

        # 2. Assemble context
        context = self.assemble_context(facts)

        # 3. Generate answer
        result = self.generate_answer(query, context)

        # 4. Add metadata
        result['num_facts_retrieved'] = len(facts)
        result['context'] = context

        return result


def test_rag():
    print("Building Knowledge Graph...")
    kg = KnowledgeGraph()

    facts = [
        ("Obama", "bornIn", "Hawaii"),
        ("Hawaii", "locatedIn", "USA"),
        ("Obama", "profession", "Politician"),
        ("Obama", "spouse", "Michelle"),
        ("Michelle", "bornIn", "Chicago"),
        ("Chicago", "locatedIn", "Illinois"),
        ("Illinois", "locatedIn", "USA"),
        ("Obama", "education", "Harvard"),
        ("Harvard", "locatedIn", "Massachusetts"),
    ]

    for s, p, o in facts:
        kg.add_triple(s, p, o)

    print(f"✓ Loaded {len(facts)} facts")

    print("\\nTesting KG queries...")
    results = kg.query_pattern("Obama", "bornIn", None)
    print(f"✓ Obama bornIn ? → {results}")

    results = kg.query_pattern(None, "locatedIn", "USA")
    print(f"✓ ? locatedIn USA → {results}")

    print("\\nTesting multi-hop path finding...")
    path = kg.find_path("Obama", "USA")
    print(f"✓ Path from Obama to USA: {path}")

    print("\\nBuilding RAG system...")
    rag = RAGSystem(kg)

    print("\\nTesting RAG queries...")

    queries = [
        "Where was Obama born?",
        "Where was Michelle born?",
        "What is the connection between Obama and the USA?",
    ]

    for query in queries:
        print(f"\\n{'='*60}")
        print(f"Query: {query}")
        result = rag.answer_question(query, top_k=3)
        print(f"Answer: {result['answer']}")
        print(f"Citations: {result['citations']}")
        print(f"Confidence: {result['confidence']:.0%}")

    print("\\n✅ RAG test complete!")

test_rag()`,
  tests: [
    {
      input: 'Entity extraction from query',
      expectedOutput: 'Relevant entities identified',
      description: 'Test query understanding'
    },
    {
      input: 'Fact retrieval from knowledge graph',
      expectedOutput: 'Top-k relevant facts retrieved',
      description: 'Test semantic search in KG'
    },
    {
      input: 'Answer generation with citations',
      expectedOutput: 'Natural language answer with numbered citations',
      description: 'Test RAG pipeline end-to-end'
    }
  ],
  hints: [
    "KG indexes: spo[(subject, predicate)] = [objects], ops[(object, predicate)] = [subjects]",
    "Pattern matching: check which fields are None, query appropriate index",
    "BFS for path finding: use deque, track visited nodes, max depth",
    "Entity extraction: use regex r'\\\\b[A-Z][a-z]+\\\\b' or check against known entities",
    "Fact scoring: direct mention = 1.0, multi-hop = 0.5-0.9",
    "Context formatting: number citations [1], [2] for provenance",
    "Template generation: match query patterns (where/who/what) to generate answers",
    "Production: replace template generator with OpenAI API or Claude API"
  ]
};

// Export all challenges
export const knowledgeRepresentationCodeChallenges: CodeChallenge[] = [
  implementPowersetChallenge,
  cartesianProductChallenge,
  graphRepresentationsChallenge,
  graphTraversalChallenge,
  equivalenceRelationsChallenge,
  logicSystemChallenge,
  vectorOperationsChallenge,
  matrixNeuralNetworkChallenge,
  bayesianNetworkChallenge,
  rdfTripleStoreChallenge,
  ontologyReasoningChallenge,
  buildKnowledgeGraphChallenge,
  transeImplementationChallenge,
  buildGNNChallenge,
  ragWithKGChallenge
];