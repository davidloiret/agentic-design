#!/usr/bin/env tsx

interface ThoughtNode {
  id: string;
  content: string;
  score: number;
  children: ThoughtNode[];
  parent?: ThoughtNode;
  depth: number;
}

class TreeOfThoughtPlanner {
  private root: ThoughtNode;
  private bestPath: ThoughtNode[] = [];

  constructor(rootProblem: string) {
    this.root = {
      id: 'root',
      content: rootProblem,
      score: 0,
      children: [],
      depth: 0
    };
  }

  addThought(parentId: string, content: string, score: number): string {
    const parent = this.findNode(this.root, parentId);
    if (!parent) throw new Error(`Parent node ${parentId} not found`);

    const newId = `${parentId}-${parent.children.length + 1}`;
    const newNode: ThoughtNode = {
      id: newId,
      content,
      score,
      children: [],
      parent,
      depth: parent.depth + 1
    };

    parent.children.push(newNode);
    return newId;
  }

  private findNode(node: ThoughtNode, id: string): ThoughtNode | null {
    if (node.id === id) return node;
    
    for (const child of node.children) {
      const found = this.findNode(child, id);
      if (found) return found;
    }
    
    return null;
  }

  findBestPath(): ThoughtNode[] {
    this.bestPath = [];
    this.explorePath(this.root, []);
    return this.bestPath;
  }

  private explorePath(node: ThoughtNode, currentPath: ThoughtNode[]): void {
    const newPath = [...currentPath, node];
    
    if (node.children.length === 0) {
      // Leaf node - evaluate path
      const pathScore = newPath.reduce((sum, n) => sum + n.score, 0) / newPath.length;
      const bestScore = this.bestPath.reduce((sum, n) => sum + n.score, 0) / (this.bestPath.length || 1);
      
      if (pathScore > bestScore) {
        this.bestPath = newPath;
      }
      return;
    }

    // Sort children by score and explore best ones first
    const sortedChildren = [...node.children].sort((a, b) => b.score - a.score);
    
    for (const child of sortedChildren) {
      this.explorePath(child, newPath);
    }
  }

  printTree(node: ThoughtNode = this.root, prefix: string = ''): void {
    console.log(`${prefix}${node.content} (score: ${node.score})`);
    
    for (let i = 0; i < node.children.length; i++) {
      const isLast = i === node.children.length - 1;
      const childPrefix = prefix + (isLast ? '└─ ' : '├─ ');
      const nextPrefix = prefix + (isLast ? '   ' : '│  ');
      
      console.log(childPrefix + node.children[i].content + ` (score: ${node.children[i].score})`);
      
      if (node.children[i].children.length > 0) {
        this.printSubtree(node.children[i], nextPrefix);
      }
    }
  }

  private printSubtree(node: ThoughtNode, prefix: string): void {
    for (let i = 0; i < node.children.length; i++) {
      const isLast = i === node.children.length - 1;
      const childPrefix = prefix + (isLast ? '└─ ' : '├─ ');
      const nextPrefix = prefix + (isLast ? '   ' : '│  ');
      
      console.log(childPrefix + node.children[i].content + ` (score: ${node.children[i].score})`);
      
      if (node.children[i].children.length > 0) {
        this.printSubtree(node.children[i], nextPrefix);
      }
    }
  }
}

// Usage example
function main() {
  const planner = new TreeOfThoughtPlanner("Plan a 3-day trip to Paris with a $1000 budget");

  // Build the thought tree
  const budgetFocused = planner.addThought('root', 'Budget-focused path', 7);
  const experienceFocused = planner.addThought('root', 'Experience-focused path', 6);
  const balanced = planner.addThought('root', 'Balanced path', 9);

  // Budget-focused branches
  planner.addThought(budgetFocused, 'Hostels + street food', 8);
  planner.addThought(budgetFocused, 'Airbnb + cooking', 7);

  // Experience-focused branches
  planner.addThought(experienceFocused, 'Mid-range hotel + restaurants', 5);
  planner.addThought(experienceFocused, 'Budget hotel + select dining', 7);

  // Balanced branches
  planner.addThought(balanced, 'Budget hotel', 8);
  planner.addThought(balanced, 'Mix of dining options', 9);
  planner.addThought(balanced, 'Free/low-cost attractions', 9);

  console.log("Tree of Thought Structure:");
  planner.printTree();

  console.log("\nBest path:");
  const bestPath = planner.findBestPath();
  bestPath.forEach((node, index) => {
    console.log(`${index + 1}. ${node.content} (score: ${node.score})`);
  });
}

if (require.main === module) {
  main();
}

export { TreeOfThoughtPlanner };
export type { ThoughtNode };
