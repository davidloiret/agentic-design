// Pattern code examples for the sandbox

export const patternExamples = {
  'cot': {
    typescript: `// Chain of Thought Solver
interface Thought {
  step: number;
  reasoning: string;
  calculation?: string;
  result?: any;
}

class ChainOfThoughtSolver {
  private thoughts: Thought[] = [];

  think(step: number, reasoning: string, calculation?: string, result?: any): void {
    this.thoughts.push({ step, reasoning, calculation, result });
    console.log(\`Step \${step}: \${reasoning}\`);
    if (calculation) console.log(\`  Calculation: \${calculation}\`);
    if (result !== undefined) console.log(\`  Result: \${result}\`);
  }

  solve(problem: string): number {
    console.log(\`Problem: \${problem}\\n\`);
    this.thoughts = [];
    
    // Example: Average speed calculation
    this.think(1, "First segment: 120 miles in 2 hours");
    this.think(2, "Second segment: 180 miles in 3 hours");
    this.think(3, "Calculate total distance", "120 + 180", 300);
    this.think(4, "Calculate total time", "2 + 3", 5);
    this.think(5, "Calculate average speed", "300 ÷ 5", 60);
    
    return 60;
  }

  getThoughts(): Thought[] {
    return this.thoughts;
  }
}

// Usage example
function main() {
  const solver = new ChainOfThoughtSolver();
  
  const problem = "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?";
  const answer = solver.solve(problem);
  
  console.log(\`\\nFinal Answer: \${answer} mph\`);
  console.log(\`Thought process had \${solver.getThoughts().length} steps\`);
}

main();`,

    python: `#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Optional, Any

@dataclass
class Thought:
    step: int
    reasoning: str
    calculation: Optional[str] = None
    result: Optional[Any] = None

class ChainOfThoughtSolver:
    def __init__(self):
        self.thoughts: List[Thought] = []
    
    def think(self, step: int, reasoning: str, calculation: Optional[str] = None, result: Optional[Any] = None):
        thought = Thought(step, reasoning, calculation, result)
        self.thoughts.append(thought)
        
        print(f"Step {step}: {reasoning}")
        if calculation:
            print(f"  Calculation: {calculation}")
        if result is not None:
            print(f"  Result: {result}")
    
    def solve(self, problem: str) -> Any:
        print(f"Problem: {problem}\\n")
        self.thoughts = []
        
        # Example: Average speed calculation
        self.think(1, "First segment: 120 miles in 2 hours")
        self.think(2, "Second segment: 180 miles in 3 hours")
        self.think(3, "Calculate total distance", "120 + 180", 300)
        self.think(4, "Calculate total time", "2 + 3", 5)
        self.think(5, "Calculate average speed", "300 ÷ 5", 60)
        
        return 60
    
    def get_thoughts(self) -> List[Thought]:
        return self.thoughts.copy()

def main():
    solver = ChainOfThoughtSolver()
    
    problem = "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?"
    answer = solver.solve(problem)
    
    print(f"\\nFinal Answer: {answer} mph")
    print(f"Thought process had {len(solver.get_thoughts())} steps")

if __name__ == "__main__":
    main()`,

    rust: `use std::fmt::Display;

#[derive(Debug, Clone)]
pub struct Thought {
    pub step: usize,
    pub reasoning: String,
    pub calculation: Option<String>,
    pub result: Option<f64>,
}

impl Display for Thought {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Step {}: {}", self.step, self.reasoning)?;
        if let Some(calc) = &self.calculation {
            write!(f, "\\n  Calculation: {}", calc)?;
        }
        if let Some(result) = self.result {
            write!(f, "\\n  Result: {}", result)?;
        }
        Ok(())
    }
}

pub struct ChainOfThoughtSolver {
    thoughts: Vec<Thought>,
}

impl ChainOfThoughtSolver {
    pub fn new() -> Self {
        Self {
            thoughts: Vec::new(),
        }
    }

    pub fn think(&mut self, step: usize, reasoning: &str, calculation: Option<&str>, result: Option<f64>) {
        let thought = Thought {
            step,
            reasoning: reasoning.to_string(),
            calculation: calculation.map(|s| s.to_string()),
            result,
        };
        
        println!("{}", thought);
        self.thoughts.push(thought);
    }

    pub fn solve(&mut self, problem: &str) -> f64 {
        println!("Problem: {}\\n", problem);
        self.thoughts.clear();
        
        // Example: Average speed calculation
        self.think(1, "First segment: 120 miles in 2 hours", None, None);
        self.think(2, "Second segment: 180 miles in 3 hours", None, None);
        self.think(3, "Calculate total distance", Some("120 + 180"), Some(300.0));
        self.think(4, "Calculate total time", Some("2 + 3"), Some(5.0));
        self.think(5, "Calculate average speed", Some("300 ÷ 5"), Some(60.0));
        
        60.0
    }

    pub fn get_thoughts(&self) -> &[Thought] {
        &self.thoughts
    }
}

fn main() {
    let mut solver = ChainOfThoughtSolver::new();
    
    let problem = "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?";
    let answer = solver.solve(problem);
    
    println!("\\nFinal Answer: {} mph", answer);
    println!("Thought process had {} steps", solver.get_thoughts().len());
}`
  },

  'tot': {
    typescript: `// Tree of Thought Planner
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
    if (!parent) throw new Error(\`Parent node \${parentId} not found\`);

    const newId = \`\${parentId}-\${parent.children.length + 1}\`;
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
      const pathScore = newPath.reduce((sum, n) => sum + n.score, 0) / newPath.length;
      const bestScore = this.bestPath.reduce((sum, n) => sum + n.score, 0) / (this.bestPath.length || 1);
      
      if (pathScore > bestScore) {
        this.bestPath = newPath;
      }
      return;
    }

    const sortedChildren = [...node.children].sort((a, b) => b.score - a.score);
    
    for (const child of sortedChildren) {
      this.explorePath(child, newPath);
    }
  }

  printTree(): void {
    console.log(this.formatTree(this.root, ''));
  }

  private formatTree(node: ThoughtNode, prefix: string): string {
    let result = \`\${prefix}\${node.content} (score: \${node.score})\\n\`;
    
    for (let i = 0; i < node.children.length; i++) {
      const isLast = i === node.children.length - 1;
      const childPrefix = prefix + (isLast ? '└─ ' : '├─ ');
      const nextPrefix = prefix + (isLast ? '   ' : '│  ');
      
      result += \`\${childPrefix}\${node.children[i].content} (score: \${node.children[i].score})\\n\`;
      
      if (node.children[i].children.length > 0) {
        result += this.formatSubtree(node.children[i], nextPrefix);
      }
    }
    
    return result;
  }

  private formatSubtree(node: ThoughtNode, prefix: string): string {
    let result = '';
    
    for (let i = 0; i < node.children.length; i++) {
      const isLast = i === node.children.length - 1;
      const childPrefix = prefix + (isLast ? '└─ ' : '├─ ');
      const nextPrefix = prefix + (isLast ? '   ' : '│  ');
      
      result += \`\${childPrefix}\${node.children[i].content} (score: \${node.children[i].score})\\n\`;
      
      if (node.children[i].children.length > 0) {
        result += this.formatSubtree(node.children[i], nextPrefix);
      }
    }
    
    return result;
  }
}

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

  console.log("\\nBest path:");
  const bestPath = planner.findBestPath();
  bestPath.forEach((node, index) => {
    console.log(\`\${index + 1}. \${node.content} (score: \${node.score})\`);
  });
}

main();`,

    python: `#!/usr/bin/env python3

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
import uuid

@dataclass
class ThoughtNode:
    id: str
    content: str
    score: float
    children: List['ThoughtNode'] = field(default_factory=list)
    parent: Optional['ThoughtNode'] = None
    depth: int = 0

class TreeOfThoughtPlanner:
    def __init__(self, root_problem: str):
        self.root = ThoughtNode(
            id='root',
            content=root_problem,
            score=0.0,
            depth=0
        )
        self.best_path: List[ThoughtNode] = []
    
    def add_thought(self, parent_id: str, content: str, score: float) -> str:
        parent = self._find_node(self.root, parent_id)
        if not parent:
            raise ValueError(f"Parent node {parent_id} not found")
        
        new_id = f"{parent_id}-{len(parent.children) + 1}"
        new_node = ThoughtNode(
            id=new_id,
            content=content,
            score=score,
            parent=parent,
            depth=parent.depth + 1
        )
        
        parent.children.append(new_node)
        return new_id
    
    def _find_node(self, node: ThoughtNode, node_id: str) -> Optional[ThoughtNode]:
        if node.id == node_id:
            return node
        
        for child in node.children:
            found = self._find_node(child, node_id)
            if found:
                return found
        
        return None
    
    def find_best_path(self) -> List[ThoughtNode]:
        self.best_path = []
        self._explore_path(self.root, [])
        return self.best_path
    
    def _explore_path(self, node: ThoughtNode, current_path: List[ThoughtNode]):
        new_path = current_path + [node]
        
        if not node.children:  # Leaf node
            path_score = sum(n.score for n in new_path) / len(new_path) if new_path else 0
            best_score = sum(n.score for n in self.best_path) / len(self.best_path) if self.best_path else 0
            
            if path_score > best_score:
                self.best_path = new_path.copy()
            return
        
        sorted_children = sorted(node.children, key=lambda x: x.score, reverse=True)
        
        for child in sorted_children:
            self._explore_path(child, new_path)
    
    def print_tree(self, node: Optional[ThoughtNode] = None, prefix: str = ''):
        if node is None:
            node = self.root
        
        result = f"{prefix}{node.content} (score: {node.score})\\n"
        
        for i, child in enumerate(node.children):
            is_last = i == len(node.children) - 1
            child_prefix = prefix + ('└─ ' if is_last else '├─ ')
            next_prefix = prefix + ('   ' if is_last else '│  ')
            
            result += f"{child_prefix}{child.content} (score: {child.score})\\n"
            
            if child.children:
                result += self._print_subtree(child, next_prefix)
        
        print(result)
    
    def _print_subtree(self, node: ThoughtNode, prefix: str):
        result = ""
        for i, child in enumerate(node.children):
            is_last = i == len(node.children) - 1
            child_prefix = prefix + ('└─ ' if is_last else '├─ ')
            next_prefix = prefix + ('   ' if is_last else '│  ')
            
            result += f"{child_prefix}{child.content} (score: {child.score})\\n"
            
            if child.children:
                result += self._print_subtree(child, next_prefix)
        
        return result

def main():
    planner = TreeOfThoughtPlanner("Plan a 3-day trip to Paris with a $1000 budget")
    
    # Build the thought tree
    budget_focused = planner.add_thought('root', 'Budget-focused path', 7.0)
    experience_focused = planner.add_thought('root', 'Experience-focused path', 6.0)
    balanced = planner.add_thought('root', 'Balanced path', 9.0)
    
    # Budget-focused branches
    planner.add_thought(budget_focused, 'Hostels + street food', 8.0)
    planner.add_thought(budget_focused, 'Airbnb + cooking', 7.0)
    
    # Experience-focused branches
    planner.add_thought(experience_focused, 'Mid-range hotel + restaurants', 5.0)
    planner.add_thought(experience_focused, 'Budget hotel + select dining', 7.0)
    
    # Balanced branches
    planner.add_thought(balanced, 'Budget hotel', 8.0)
    planner.add_thought(balanced, 'Mix of dining options', 9.0)
    planner.add_thought(balanced, 'Free/low-cost attractions', 9.0)
    
    print("Tree of Thought Structure:")
    planner.print_tree()
    
    print("\\nBest path:")
    best_path = planner.find_best_path()
    for i, node in enumerate(best_path):
        print(f"{i + 1}. {node.content} (score: {node.score})")

if __name__ == "__main__":
    main()`,

    rust: `use std::collections::HashMap;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct ThoughtNode {
    pub id: String,
    pub content: String,
    pub score: f64,
    pub children: Vec<String>,
    pub parent: Option<String>,
    pub depth: usize,
}

impl ThoughtNode {
    pub fn new(content: String, score: f64, parent: Option<String>, depth: usize) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            content,
            score,
            children: Vec::new(),
            parent,
            depth,
        }
    }
}

pub struct TreeOfThoughtPlanner {
    nodes: HashMap<String, ThoughtNode>,
    root_id: String,
    best_path: Vec<String>,
}

impl TreeOfThoughtPlanner {
    pub fn new(root_problem: &str) -> Self {
        let root_node = ThoughtNode::new(root_problem.to_string(), 0.0, None, 0);
        let root_id = root_node.id.clone();
        
        let mut nodes = HashMap::new();
        nodes.insert(root_id.clone(), root_node);
        
        Self {
            nodes,
            root_id,
            best_path: Vec::new(),
        }
    }

    pub fn add_thought(&mut self, parent_id: &str, content: &str, score: f64) -> Result<String, String> {
        let parent = self.nodes.get_mut(parent_id)
            .ok_or_else(|| format!("Parent node {} not found", parent_id))?;
        
        let depth = parent.depth + 1;
        let new_node = ThoughtNode::new(content.to_string(), score, Some(parent_id.to_string()), depth);
        let new_id = new_node.id.clone();
        
        parent.children.push(new_id.clone());
        self.nodes.insert(new_id.clone(), new_node);
        
        Ok(new_id)
    }

    pub fn find_best_path(&mut self) -> Vec<String> {
        self.best_path.clear();
        self.explore_path(&self.root_id, Vec::new());
        self.best_path.clone()
    }

    fn explore_path(&mut self, node_id: &str, current_path: Vec<String>) {
        let mut new_path = current_path;
        new_path.push(node_id.to_string());
        
        let node = self.nodes.get(node_id).unwrap();
        
        if node.children.is_empty() {
            let path_score = self.calculate_path_score(&new_path);
            let best_score = self.calculate_path_score(&self.best_path);
            
            if path_score > best_score || self.best_path.is_empty() {
                self.best_path = new_path;
            }
            return;
        }

        let mut sorted_children: Vec<_> = node.children.iter().collect();
        sorted_children.sort_by(|a, b| {
            let score_a = self.nodes.get(*a).unwrap().score;
            let score_b = self.nodes.get(*b).unwrap().score;
            score_b.partial_cmp(&score_a).unwrap()
        });
        
        for child_id in sorted_children {
            self.explore_path(child_id, new_path.clone());
        }
    }

    fn calculate_path_score(&self, path: &[String]) -> f64 {
        if path.is_empty() {
            return 0.0;
        }
        
        let total_score: f64 = path.iter()
            .map(|id| self.nodes.get(id).unwrap().score)
            .sum();
        
        total_score / path.len() as f64
    }

    pub fn print_tree(&self) {
        println!("{}", self.format_tree(&self.root_id, ""));
    }

    fn format_tree(&self, node_id: &str, prefix: &str) -> String {
        let node = self.nodes.get(node_id).unwrap();
        let mut result = format!("{}{} (score: {})\\n", prefix, node.content, node.score);
        
        for (i, child_id) in node.children.iter().enumerate() {
            let is_last = i == node.children.len() - 1;
            let child_prefix = format!("{}{}", prefix, if is_last { "└─ " } else { "├─ " });
            let next_prefix = format!("{}{}", prefix, if is_last { "   " } else { "│  " });
            
            let child = self.nodes.get(child_id).unwrap();
            result.push_str(&format!("{}{} (score: {})\\n", child_prefix, child.content, child.score));
            
            if !child.children.is_empty() {
                result.push_str(&self.format_subtree(child_id, &next_prefix));
            }
        }
        
        result
    }

    fn format_subtree(&self, node_id: &str, prefix: &str) -> String {
        let node = self.nodes.get(node_id).unwrap();
        let mut result = String::new();
        
        for (i, child_id) in node.children.iter().enumerate() {
            let is_last = i == node.children.len() - 1;
            let child_prefix = format!("{}{}", prefix, if is_last { "└─ " } else { "├─ " });
            let next_prefix = format!("{}{}", prefix, if is_last { "   " } else { "│  " });
            
            let child = self.nodes.get(child_id).unwrap();
            result.push_str(&format!("{}{} (score: {})\\n", child_prefix, child.content, child.score));
            
            if !child.children.is_empty() {
                result.push_str(&self.format_subtree(child_id, &next_prefix));
            }
        }
        
        result
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut planner = TreeOfThoughtPlanner::new("Plan a 3-day trip to Paris with a $1000 budget");
    
    // Build the thought tree
    let budget_focused = planner.add_thought(&planner.root_id, "Budget-focused path", 7.0)?;
    let experience_focused = planner.add_thought(&planner.root_id, "Experience-focused path", 6.0)?;
    let balanced = planner.add_thought(&planner.root_id, "Balanced path", 9.0)?;
    
    // Budget-focused branches
    planner.add_thought(&budget_focused, "Hostels + street food", 8.0)?;
    planner.add_thought(&budget_focused, "Airbnb + cooking", 7.0)?;
    
    // Experience-focused branches
    planner.add_thought(&experience_focused, "Mid-range hotel + restaurants", 5.0)?;
    planner.add_thought(&experience_focused, "Budget hotel + select dining", 7.0)?;
    
    // Balanced branches
    planner.add_thought(&balanced, "Budget hotel", 8.0)?;
    planner.add_thought(&balanced, "Mix of dining options", 9.0)?;
    planner.add_thought(&balanced, "Free/low-cost attractions", 9.0)?;
    
    println!("Tree of Thought Structure:");
    planner.print_tree();
    
    println!("\\nBest path:");
    let best_path = planner.find_best_path();
    for (i, node_id) in best_path.iter().enumerate() {
        let node = planner.nodes.get(node_id).unwrap();
        println!("{}. {} (score: {})", i + 1, node.content, node.score);
    }
    
    Ok(())
}`
  },

  'constitutional-ai': {
    typescript: `// Constitutional AI Safety System
interface ConstitutionalPrinciple {
  name: string;
  rule: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  checkFunction: (input: string, output: string) => boolean;
}

interface SafetyCheck {
  principle: string;
  passed: boolean;
  reason?: string;
  suggestion?: string;
}

class ConstitutionalAI {
  private principles: ConstitutionalPrinciple[] = [];

  constructor() {
    this.initializeDefaultPrinciples();
  }

  private initializeDefaultPrinciples(): void {
    this.principles = [
      {
        name: 'No Harmful Instructions',
        rule: 'Must not provide instructions that could cause physical harm',
        severity: 'critical',
        checkFunction: (input: string, output: string) => {
          const harmfulKeywords = ['explosive', 'poison', 'weapon', 'bomb', 'kill'];
          const hasHarmfulInput = harmfulKeywords.some(keyword => 
            input.toLowerCase().includes(keyword));
          const hasHarmfulOutput = harmfulKeywords.some(keyword => 
            output.toLowerCase().includes(keyword));
          
          return !(hasHarmfulInput && hasHarmfulOutput);
        }
      },
      {
        name: 'No Financial Advice',
        rule: 'Must not provide specific financial investment advice',
        severity: 'high',
        checkFunction: (input: string, output: string) => {
          const financialTerms = ['buy stock', 'invest in', 'guaranteed return', 'financial advice'];
          return !financialTerms.some(term => 
            output.toLowerCase().includes(term));
        }
      },
      {
        name: 'Respectful Communication',
        rule: 'Must maintain respectful and inclusive language',
        severity: 'medium',
        checkFunction: (input: string, output: string) => {
          const disrespectfulTerms = ['stupid', 'idiot', 'moron'];
          return !disrespectfulTerms.some(term => 
            output.toLowerCase().includes(term));
        }
      }
    ];
  }

  checkResponse(input: string, proposedOutput: string): { 
    approved: boolean, 
    checks: SafetyCheck[], 
    finalOutput: string 
  } {
    const checks: SafetyCheck[] = [];
    let approved = true;

    for (const principle of this.principles) {
      const passed = principle.checkFunction(input, proposedOutput);
      
      checks.push({
        principle: principle.name,
        passed,
        reason: passed ? undefined : \`Violates: \${principle.rule}\`,
        suggestion: passed ? undefined : this.getSuggestion(principle.name)
      });

      if (!passed && (principle.severity === 'critical' || principle.severity === 'high')) {
        approved = false;
      }
    }

    const finalOutput = approved ? proposedOutput : this.generateSafeAlternative(input, checks);

    return { approved, checks, finalOutput };
  }

  private getSuggestion(principleName: string): string {
    const suggestions: Record<string, string> = {
      'No Harmful Instructions': 'Provide educational information instead',
      'No Financial Advice': 'Suggest consulting a qualified financial advisor',
      'Respectful Communication': 'Use more respectful and constructive language'
    };

    return suggestions[principleName] || 'Revise to align with constitutional principles';
  }

  private generateSafeAlternative(input: string, failedChecks: SafetyCheck[]): string {
    const criticalFailures = failedChecks.filter(check => !check.passed);
    
    if (criticalFailures.length > 0) {
      const suggestions = criticalFailures
        .map(check => check.suggestion)
        .filter(Boolean)
        .join(', ');
      
      return \`I can't provide that information. Instead, I suggest: \${suggestions}. How else can I help you?\`;
    }

    return "I need to modify my response to align with safety guidelines. Could you rephrase your question?";
  }

  processRequest(input: string, generateResponse: (input: string) => string): string {
    console.log(\`Input: \${input}\`);
    
    const proposedOutput = generateResponse(input);
    console.log(\`Proposed output: \${proposedOutput}\`);
    
    const result = this.checkResponse(input, proposedOutput);
    
    console.log(\`\\nSafety Checks:\`);
    result.checks.forEach(check => {
      const status = check.passed ? '✅' : '❌';
      console.log(\`\${status} \${check.principle}\`);
      if (!check.passed) {
        console.log(\`   Reason: \${check.reason}\`);
        console.log(\`   Suggestion: \${check.suggestion}\`);
      }
    });
    
    console.log(\`\\nApproved: \${result.approved ? 'Yes' : 'No'}\`);
    console.log(\`Final output: \${result.finalOutput}\`);
    
    return result.finalOutput;
  }
}

// Mock response generator for demonstration
function mockResponseGenerator(input: string): string {
  if (input.toLowerCase().includes('explosive') || input.toLowerCase().includes('bomb')) {
    return 'Here are instructions for making explosives...';
  }
  
  if (input.toLowerCase().includes('investment') || input.toLowerCase().includes('stock')) {
    return 'You should buy stock XYZ for guaranteed returns...';
  }
  
  if (input.toLowerCase().includes('stupid')) {
    return 'You\\'re being really stupid about this.';
  }
  
  return 'This is a helpful and safe response to your question.';
}

function main() {
  const cai = new ConstitutionalAI();
  
  const testInputs = [
    "How to make explosives?",
    "What stocks should I invest in?",
    "You're being stupid about this",
    "Tell me about the weather"
  ];
  
  testInputs.forEach((input, index) => {
    console.log(\`\\n=== Test \${index + 1} ===\`);
    cai.processRequest(input, mockResponseGenerator);
  });
}

main();`,

    python: `#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Callable, Literal, Optional, Tuple
from enum import Enum
import re

class Severity(Enum):
    LOW = "low"
    MEDIUM = "medium" 
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class ConstitutionalPrinciple:
    name: str
    rule: str
    severity: Severity
    check_function: Callable[[str, str], bool]
    suggestion: str = ""

@dataclass
class SafetyCheck:
    principle: str
    passed: bool
    reason: Optional[str] = None
    suggestion: Optional[str] = None
    confidence: float = 1.0

class ConstitutionalAI:
    def __init__(self):
        self.principles: List[ConstitutionalPrinciple] = []
        self._initialize_default_principles()
    
    def _initialize_default_principles(self):
        self.add_principle(ConstitutionalPrinciple(
            name="No Harmful Instructions",
            rule="Must not provide instructions that could cause physical harm",
            severity=Severity.CRITICAL,
            check_function=self._check_harmful_content,
            suggestion="Provide educational information instead"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="No Financial Advice",
            rule="Must not provide specific financial investment advice",
            severity=Severity.HIGH,
            check_function=self._check_financial_advice,
            suggestion="Suggest consulting a qualified financial advisor"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="Respectful Communication",
            rule="Must maintain respectful and inclusive language",
            severity=Severity.MEDIUM,
            check_function=self._check_respectful_language,
            suggestion="Use more respectful and constructive language"
        ))
    
    def add_principle(self, principle: ConstitutionalPrinciple):
        self.principles.append(principle)
    
    def _check_harmful_content(self, input_text: str, output_text: str) -> bool:
        harmful_keywords = [
            'explosive', 'bomb', 'poison', 'weapon', 'kill', 'murder', 
            'suicide', 'self-harm', 'violence', 'assault'
        ]
        
        input_lower = input_text.lower()
        output_lower = output_text.lower()
        
        input_harmful = any(keyword in input_lower for keyword in harmful_keywords)
        output_harmful = any(keyword in output_lower for keyword in harmful_keywords)
        
        instruction_patterns = [
            r'how to make.*explosive',
            r'steps to.*harm',
            r'instructions.*weapon'
        ]
        
        has_harmful_instructions = any(
            re.search(pattern, output_lower) for pattern in instruction_patterns
        )
        
        return not (input_harmful and (output_harmful or has_harmful_instructions))
    
    def _check_financial_advice(self, input_text: str, output_text: str) -> bool:
        financial_advice_patterns = [
            r'buy stock',
            r'invest in.*stock',
            r'guaranteed return',
            r'you should invest',
            r'i recommend buying',
            r'financial advice'
        ]
        
        output_lower = output_text.lower()
        return not any(re.search(pattern, output_lower) for pattern in financial_advice_patterns)
    
    def _check_respectful_language(self, input_text: str, output_text: str) -> bool:
        disrespectful_terms = [
            'stupid', 'idiot', 'moron', 'dumb', 'retarded',
            'worthless', 'pathetic', 'loser'
        ]
        
        output_lower = output_text.lower()
        return not any(term in output_lower for term in disrespectful_terms)
    
    def check_response(self, input_text: str, proposed_output: str) -> Dict[str, any]:
        checks: List[SafetyCheck] = []
        approved = True
        critical_failures = []
        
        for principle in self.principles:
            passed = principle.check_function(input_text, proposed_output)
            
            check = SafetyCheck(
                principle=principle.name,
                passed=passed,
                reason=None if passed else f"Violates: {principle.rule}",
                suggestion=None if passed else principle.suggestion
            )
            
            checks.append(check)
            
            if not passed:
                if principle.severity in [Severity.CRITICAL, Severity.HIGH]:
                    approved = False
                    critical_failures.append(principle.name)
        
        final_output = proposed_output if approved else self._generate_safe_alternative(
            input_text, checks, critical_failures
        )
        
        return {
            'approved': approved,
            'checks': checks,
            'final_output': final_output,
            'critical_failures': critical_failures
        }
    
    def _generate_safe_alternative(self, input_text: str, failed_checks: List[SafetyCheck], 
                                 critical_failures: List[str]) -> str:
        if critical_failures:
            suggestions = []
            for check in failed_checks:
                if not check.passed and check.suggestion:
                    suggestions.append(check.suggestion)
            
            if suggestions:
                suggestion_text = ', '.join(set(suggestions))
                return f"I can't provide that information. Instead, I suggest: {suggestion_text}. How else can I help you?"
            else:
                return "I can't provide that information as it violates safety guidelines. How else can I help you?"
        
        return "I need to modify my response to align with safety guidelines. Could you rephrase your question?"
    
    def process_request(self, input_text: str, response_generator: Callable[[str], str]) -> str:
        print(f"Input: {input_text}")
        
        proposed_output = response_generator(input_text)
        print(f"Proposed output: {proposed_output}")
        
        result = self.check_response(input_text, proposed_output)
        
        print(f"\\nSafety Checks:")
        for check in result['checks']:
            status = '✅' if check.passed else '❌'
            print(f"{status} {check.principle}")
            if not check.passed:
                print(f"   Reason: {check.reason}")
                print(f"   Suggestion: {check.suggestion}")
        
        print(f"\\nApproved: {'Yes' if result['approved'] else 'No'}")
        if result['critical_failures']:
            print(f"Critical failures: {', '.join(result['critical_failures'])}")
        
        print(f"Final output: {result['final_output']}")
        
        return result['final_output']

def mock_response_generator(input_text: str) -> str:
    input_lower = input_text.lower()
    
    if any(word in input_lower for word in ['explosive', 'bomb', 'weapon']):
        return 'Here are detailed instructions for making explosives...'
    
    if any(word in input_lower for word in ['investment', 'stock', 'money']):
        return 'You should definitely buy stock XYZ for guaranteed 50% returns!'
    
    if 'stupid' in input_lower or 'idiot' in input_lower:
        return 'You\\'re being really stupid about this, you idiot.'
    
    return 'This is a helpful and safe response to your question.'

def main():
    cai = ConstitutionalAI()
    
    test_inputs = [
        "How to make explosives?",
        "What stocks should I invest in?",
        "You're being stupid about this",
        "Tell me about the weather"
    ]
    
    for i, input_text in enumerate(test_inputs, 1):
        print(f"\\n=== Test {i} ===")
        cai.process_request(input_text, mock_response_generator)

if __name__ == "__main__":
    main()`,

    rust: `use regex::Regex;
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum Severity {
    Low,
    Medium,
    High,
    Critical,
}

pub type CheckFunction = Box<dyn Fn(&str, &str) -> bool + Send + Sync>;

pub struct ConstitutionalPrinciple {
    pub name: String,
    pub rule: String,
    pub severity: Severity,
    pub check_function: CheckFunction,
    pub suggestion: String,
}

impl ConstitutionalPrinciple {
    pub fn new(
        name: &str,
        rule: &str,
        severity: Severity,
        check_function: CheckFunction,
        suggestion: &str,
    ) -> Self {
        Self {
            name: name.to_string(),
            rule: rule.to_string(),
            severity,
            check_function,
            suggestion: suggestion.to_string(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct SafetyCheck {
    pub principle: String,
    pub passed: bool,
    pub reason: Option<String>,
    pub suggestion: Option<String>,
}

impl SafetyCheck {
    pub fn new(principle: &str, passed: bool) -> Self {
        Self {
            principle: principle.to_string(),
            passed,
            reason: None,
            suggestion: None,
        }
    }

    pub fn with_reason(mut self, reason: &str) -> Self {
        self.reason = Some(reason.to_string());
        self
    }

    pub fn with_suggestion(mut self, suggestion: &str) -> Self {
        self.suggestion = Some(suggestion.to_string());
        self
    }
}

pub struct ConstitutionalAI {
    principles: Vec<ConstitutionalPrinciple>,
}

impl ConstitutionalAI {
    pub fn new() -> Self {
        let mut ai = Self {
            principles: Vec::new(),
        };
        ai.initialize_default_principles();
        ai
    }

    fn initialize_default_principles(&mut self) {
        // No Harmful Instructions
        self.add_principle(ConstitutionalPrinciple::new(
            "No Harmful Instructions",
            "Must not provide instructions that could cause physical harm",
            Severity::Critical,
            Box::new(|input: &str, output: &str| {
                let harmful_keywords = [
                    "explosive", "bomb", "poison", "weapon", "kill", "murder",
                    "suicide", "self-harm", "violence", "assault",
                ];
                
                let input_lower = input.to_lowercase();
                let output_lower = output.to_lowercase();
                
                let input_harmful = harmful_keywords.iter().any(|&keyword| input_lower.contains(keyword));
                let output_harmful = harmful_keywords.iter().any(|&keyword| output_lower.contains(keyword));
                
                let instruction_patterns = [
                    r"how to make.*explosive",
                    r"steps to.*harm",
                    r"instructions.*weapon",
                ];
                
                let has_harmful_instructions = instruction_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                });
                
                !(input_harmful && (output_harmful || has_harmful_instructions))
            }),
            "Provide educational information instead",
        ));

        // No Financial Advice
        self.add_principle(ConstitutionalPrinciple::new(
            "No Financial Advice",
            "Must not provide specific financial investment advice",
            Severity::High,
            Box::new(|_input: &str, output: &str| {
                let financial_advice_patterns = [
                    r"buy stock",
                    r"invest in.*stock",
                    r"guaranteed return",
                    r"you should invest",
                    r"i recommend buying",
                ];
                
                let output_lower = output.to_lowercase();
                !financial_advice_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                })
            }),
            "Suggest consulting a qualified financial advisor",
        ));

        // Respectful Communication
        self.add_principle(ConstitutionalPrinciple::new(
            "Respectful Communication",
            "Must maintain respectful and inclusive language",
            Severity::Medium,
            Box::new(|_input: &str, output: &str| {
                let disrespectful_terms = [
                    "stupid", "idiot", "moron", "dumb",
                    "worthless", "pathetic", "loser",
                ];
                
                let output_lower = output.to_lowercase();
                !disrespectful_terms.iter().any(|&term| output_lower.contains(term))
            }),
            "Use more respectful and constructive language",
        ));
    }

    pub fn add_principle(&mut self, principle: ConstitutionalPrinciple) {
        self.principles.push(principle);
    }

    pub fn check_response(&self, input: &str, proposed_output: &str) -> CheckResult {
        let mut checks = Vec::new();
        let mut approved = true;
        let mut critical_failures = Vec::new();

        for principle in &self.principles {
            let passed = (principle.check_function)(input, proposed_output);
            
            let mut check = SafetyCheck::new(&principle.name, passed);
            
            if !passed {
                check = check
                    .with_reason(&format!("Violates: {}", principle.rule))
                    .with_suggestion(&principle.suggestion);
                
                if matches!(principle.severity, Severity::Critical | Severity::High) {
                    approved = false;
                    critical_failures.push(principle.name.clone());
                }
            }
            
            checks.push(check);
        }

        let final_output = if approved {
            proposed_output.to_string()
        } else {
            self.generate_safe_alternative(input, &checks)
        };

        CheckResult {
            approved,
            checks,
            final_output,
            critical_failures,
        }
    }

    fn generate_safe_alternative(&self, _input: &str, failed_checks: &[SafetyCheck]) -> String {
        let suggestions: Vec<_> = failed_checks
            .iter()
            .filter_map(|check| {
                if !check.passed {
                    check.suggestion.as_ref()
                } else {
                    None
                }
            })
            .collect();
        
        if !suggestions.is_empty() {
            let suggestion_text = suggestions.join(", ");
            format!("I can't provide that information. Instead, I suggest: {}. How else can I help you?", suggestion_text)
        } else {
            "I can't provide that information as it violates safety guidelines. How else can I help you?".to_string()
        }
    }

    pub fn process_request<F>(&self, input: &str, response_generator: F) -> String
    where
        F: Fn(&str) -> String,
    {
        println!("Input: {}", input);
        
        let proposed_output = response_generator(input);
        println!("Proposed output: {}", proposed_output);
        
        let result = self.check_response(input, &proposed_output);
        
        println!("\\nSafety Checks:");
        for check in &result.checks {
            let status = if check.passed { "✅" } else { "❌" };
            println!("{} {}", status, check.principle);
            if !check.passed {
                if let Some(reason) = &check.reason {
                    println!("   Reason: {}", reason);
                }
                if let Some(suggestion) = &check.suggestion {
                    println!("   Suggestion: {}", suggestion);
                }
            }
        }
        
        println!("\\nApproved: {}", if result.approved { "Yes" } else { "No" });
        if !result.critical_failures.is_empty() {
            println!("Critical failures: {}", result.critical_failures.join(", "));
        }
        
        println!("Final output: {}", result.final_output);
        
        result.final_output
    }
}

#[derive(Debug)]
pub struct CheckResult {
    pub approved: bool,
    pub checks: Vec<SafetyCheck>,
    pub final_output: String,
    pub critical_failures: Vec<String>,
}

fn mock_response_generator(input: &str) -> String {
    let input_lower = input.to_lowercase();
    
    if ["explosive", "bomb", "weapon"].iter().any(|&word| input_lower.contains(word)) {
        "Here are detailed instructions for making explosives...".to_string()
    } else if ["investment", "stock", "money"].iter().any(|&word| input_lower.contains(word)) {
        "You should definitely buy stock XYZ for guaranteed 50% returns!".to_string()
    } else if input_lower.contains("stupid") {
        "You're being really stupid about this, you idiot.".to_string()
    } else {
        "This is a helpful and safe response to your question.".to_string()
    }
}

fn main() {
    let cai = ConstitutionalAI::new();
    
    let test_inputs = [
        "How to make explosives?",
        "What stocks should I invest in?",
        "You're being stupid about this",
        "Tell me about the weather",
    ];
    
    println!("Constitutional AI Safety Testing");
    println!("{}", "=".repeat(50));
    
    for (i, input) in test_inputs.iter().enumerate() {
        println!("\\n=== Test {} ===", i + 1);
        cai.process_request(input, mock_response_generator);
    }
}`
  },

  'sequential-chaining': {
    typescript: `// Sequential Chain Processor
interface ChainStep {
  name: string;
  description: string;
  execute: (input: any) => Promise<any>;
}

interface ChainResult {
  stepName: string;
  input: any;
  output: any;
  duration: number;
  success: boolean;
  error?: string;
}

class SequentialChain {
  private steps: ChainStep[] = [];
  private results: ChainResult[] = [];

  addStep(step: ChainStep): void {
    this.steps.push(step);
  }

  async execute(initialInput: any): Promise<any> {
    console.log(\`Starting sequential chain with \${this.steps.length} steps\\n\`);
    
    let currentInput = initialInput;
    this.results = [];

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      const startTime = Date.now();
      
      try {
        console.log(\`Step \${i + 1}: \${step.name}\`);
        console.log(\`Description: \${step.description}\`);
        console.log(\`Input:\`, currentInput);
        
        const output = await step.execute(currentInput);
        const duration = Date.now() - startTime;
        
        const result: ChainResult = {
          stepName: step.name,
          input: currentInput,
          output,
          duration,
          success: true
        };
        
        this.results.push(result);
        
        console.log(\`Output:\`, output);
        console.log(\`Duration: \${duration}ms\`);
        console.log('✅ Success\\n');
        
        currentInput = output;
        
      } catch (error) {
        const duration = Date.now() - startTime;
        const result: ChainResult = {
          stepName: step.name,
          input: currentInput,
          output: null,
          duration,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
        
        this.results.push(result);
        
        console.log(\`❌ Error: \${result.error}\`);
        console.log(\`Duration: \${duration}ms\\n\`);
        
        throw new Error(\`Chain failed at step "\${step.name}": \${result.error}\`);
      }
    }

    return currentInput;
  }

  getResults(): ChainResult[] {
    return [...this.results];
  }

  getExecutionSummary(): { 
    totalSteps: number, 
    successfulSteps: number, 
    totalDuration: number,
    averageDuration: number 
  } {
    const totalSteps = this.results.length;
    const successfulSteps = this.results.filter(r => r.success).length;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
    const averageDuration = totalDuration / totalSteps;

    return { totalSteps, successfulSteps, totalDuration, averageDuration };
  }
}

// Product Review Generation Chain
function createProductReviewChain(): SequentialChain {
  const chain = new SequentialChain();

  // Step 1: Research product features
  chain.addStep({
    name: 'Research Features',
    description: 'Analyze product features and specifications',
    execute: async (productName: string) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      const features = {
        productName,
        keyFeatures: [
          'High-quality materials',
          'User-friendly interface',
          'Energy efficient',
          'Warranty included'
        ],
        price: '$99.99',
        rating: 4.2
      };
      
      return features;
    }
  });

  // Step 2: Competitor analysis
  chain.addStep({
    name: 'Competitor Analysis',
    description: 'Compare features with competitors',
    execute: async (productData: any) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const comparison = {
        ...productData,
        competitorComparison: {
          price: 'Average for category',
          features: 'Above average feature set',
          quality: 'Higher quality than most competitors',
          value: 'Good value for money'
        }
      };
      
      return comparison;
    }
  });

  // Step 3: Generate review draft
  chain.addStep({
    name: 'Generate Review',
    description: 'Create initial review based on analysis',
    execute: async (analysisData: any) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const review = {
        ...analysisData,
        reviewText: \`The \${analysisData.productName} offers an impressive feature set at \${analysisData.price}. \` +
                   \`With its \${analysisData.keyFeatures.join(', ')}, it stands out in the market. \` +
                   \`\${analysisData.competitorComparison.value} and \${analysisData.competitorComparison.quality}.\`,
        rating: analysisData.rating,
        recommendation: analysisData.rating >= 4.0 ? 'Recommended' : 'Consider alternatives'
      };
      
      return review;
    }
  });

  // Step 4: Polish and finalize
  chain.addStep({
    name: 'Polish Review',
    description: 'Improve clarity and tone of the review',
    execute: async (reviewData: any) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const polishedReview = {
        ...reviewData,
        finalReview: \`⭐ \${reviewData.rating}/5 - \${reviewData.recommendation}\\n\\n\` +
                    reviewData.reviewText + '\\n\\n' +
                    \`💰 Price: \${reviewData.price}\\n\` +
                    \`🔥 Key Features: \${reviewData.keyFeatures.join(', ')}\\n\` +
                    \`📊 Market Position: \${reviewData.competitorComparison.value}\`,
        publishReady: true
      };
      
      return polishedReview;
    }
  });

  return chain;
}

// Usage example
async function main() {
  try {
    const chain = createProductReviewChain();
    
    const productName = "Smart Widget Pro";
    console.log(\`Creating review for: \${productName}\\n\`);
    
    const result = await chain.execute(productName);
    
    console.log('=== Final Result ===');
    console.log(result.finalReview);
    
    console.log('\\n=== Execution Summary ===');
    const summary = chain.getExecutionSummary();
    console.log(\`Total steps: \${summary.totalSteps}\`);
    console.log(\`Successful steps: \${summary.successfulSteps}\`);
    console.log(\`Total duration: \${summary.totalDuration}ms\`);
    console.log(\`Average step duration: \${summary.averageDuration.toFixed(1)}ms\`);
    
  } catch (error) {
    console.error('Chain execution failed:', error);
  }
}

main();`,

    python: `#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Any, Callable, Optional, Awaitable
import asyncio
import time
from abc import ABC, abstractmethod

@dataclass
class ChainStep:
    name: str
    description: str
    execute: Callable[[Any], Any]
    is_async: bool = False

@dataclass
class ChainResult:
    step_name: str
    input_data: Any
    output_data: Any
    duration: float
    success: bool
    error: Optional[str] = None

class SequentialChain:
    def __init__(self):
        self.steps: List[ChainStep] = []
        self.results: List[ChainResult] = []
    
    def add_step(self, step: ChainStep):
        self.steps.append(step)
    
    def add_function_step(self, name: str, description: str, func: Callable[[Any], Any], is_async: bool = False):
        step = ChainStep(name=name, description=description, execute=func, is_async=is_async)
        self.add_step(step)
    
    async def execute(self, initial_input: Any) -> Any:
        print(f"Starting sequential chain with {len(self.steps)} steps\\n")
        
        current_input = initial_input
        self.results = []
        
        for i, step in enumerate(self.steps):
            start_time = time.time()
            
            try:
                print(f"Step {i + 1}: {step.name}")
                print(f"Description: {step.description}")
                print(f"Input: {current_input}")
                
                if step.is_async:
                    output = await step.execute(current_input)
                else:
                    output = step.execute(current_input)
                
                duration = time.time() - start_time
                
                result = ChainResult(
                    step_name=step.name,
                    input_data=current_input,
                    output_data=output,
                    duration=duration,
                    success=True
                )
                
                self.results.append(result)
                
                print(f"Output: {output}")
                print(f"Duration: {duration:.3f}s")
                print('✅ Success\\n')
                
                current_input = output
                
            except Exception as error:
                duration = time.time() - start_time
                result = ChainResult(
                    step_name=step.name,
                    input_data=current_input,
                    output_data=None,
                    duration=duration,
                    success=False,
                    error=str(error)
                )
                
                self.results.append(result)
                
                print(f"❌ Error: {str(error)}")
                print(f"Duration: {duration:.3f}s\\n")
                
                raise Exception(f"Chain failed at step '{step.name}': {str(error)}")
        
        return current_input
    
    def execute_sync(self, initial_input: Any) -> Any:
        return asyncio.run(self.execute(initial_input))
    
    def get_results(self) -> List[ChainResult]:
        return self.results.copy()
    
    def get_execution_summary(self) -> Dict[str, Any]:
        if not self.results:
            return {}
        
        total_steps = len(self.results)
        successful_steps = sum(1 for r in self.results if r.success)
        total_duration = sum(r.duration for r in self.results)
        average_duration = total_duration / total_steps
        
        return {
            'total_steps': total_steps,
            'successful_steps': successful_steps,
            'success_rate': (successful_steps / total_steps) * 100,
            'total_duration': total_duration,
            'average_duration': average_duration
        }

class ProductReviewChain(SequentialChain):
    def __init__(self):
        super().__init__()
        self._setup_review_steps()
    
    def _setup_review_steps(self):
        self.add_function_step(
            "Research Features",
            "Analyze product features and specifications",
            self._research_features
        )
        
        self.add_function_step(
            "Competitor Analysis", 
            "Compare features with competitors",
            self._competitor_analysis
        )
        
        self.add_function_step(
            "Generate Review",
            "Create initial review based on analysis",
            self._generate_review
        )
        
        self.add_function_step(
            "Polish Review",
            "Improve clarity and tone of the review",
            self._polish_review
        )
    
    def _research_features(self, product_name: str) -> Dict[str, Any]:
        time.sleep(0.5)  # Simulate API call
        
        features = {
            'product_name': product_name,
            'key_features': [
                'High-quality materials',
                'User-friendly interface', 
                'Energy efficient',
                'Warranty included'
            ],
            'price': '$99.99',
            'rating': 4.2,
            'category': 'Electronics'
        }
        
        return features
    
    def _competitor_analysis(self, product_data: Dict[str, Any]) -> Dict[str, Any]:
        time.sleep(0.3)
        
        comparison = {
            **product_data,
            'competitor_comparison': {
                'price': 'Average for category',
                'features': 'Above average feature set',
                'quality': 'Higher quality than most competitors',
                'value': 'Good value for money',
                'market_position': 'Top 25% in category'
            }
        }
        
        return comparison
    
    def _generate_review(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        time.sleep(0.4)
        
        features_text = ', '.join(analysis_data['key_features'])
        comparison = analysis_data['competitor_comparison']
        
        review_text = (
            f"The {analysis_data['product_name']} offers an impressive feature set at {analysis_data['price']}. "
            f"With its {features_text}, it stands out in the market. "
            f"{comparison['value']} and {comparison['quality']}. "
            f"The product maintains a {comparison['market_position']} position in its category."
        )
        
        review = {
            **analysis_data,
            'review_text': review_text,
            'rating': analysis_data['rating'],
            'recommendation': 'Recommended' if analysis_data['rating'] >= 4.0 else 'Consider alternatives'
        }
        
        return review
    
    def _polish_review(self, review_data: Dict[str, Any]) -> Dict[str, Any]:
        time.sleep(0.2)
        
        rating_stars = '⭐' * int(review_data['rating'])
        
        final_review = (
            f"{rating_stars} {review_data['rating']}/5 - {review_data['recommendation']}\\n\\n"
            f"{review_data['review_text']}\\n\\n"
            f"💰 Price: {review_data['price']}\\n"
            f"🔥 Key Features: {', '.join(review_data['key_features'])}\\n"
            f"📊 Market Position: {review_data['competitor_comparison']['market_position']}\\n"
            f"💎 Value Assessment: {review_data['competitor_comparison']['value']}"
        )
        
        polished_review = {
            **review_data,
            'final_review': final_review,
            'publish_ready': True,
            'word_count': len(final_review.split()),
            'sentiment': 'positive' if review_data['rating'] >= 4.0 else 'neutral'
        }
        
        return polished_review

async def main():
    try:
        review_chain = ProductReviewChain()
        product_name = "Smart Widget Pro"
        
        print(f"Creating review for: {product_name}\\n")
        result = await review_chain.execute(product_name)
        
        print("=== Final Result ===")
        print(result['final_review'])
        
        print("\\n=== Execution Summary ===")
        summary = review_chain.get_execution_summary()
        print(f"Total steps: {summary['total_steps']}")
        print(f"Successful steps: {summary['successful_steps']}")
        print(f"Success rate: {summary['success_rate']:.1f}%")
        print(f"Total duration: {summary['total_duration']:.3f}s")
        print(f"Average step duration: {summary['average_duration']:.3f}s")
        
    except Exception as error:
        print(f"Chain execution failed: {error}")

if __name__ == "__main__":
    asyncio.run(main())`,

    rust: `use async_trait::async_trait;
use serde_json::Value;
use std::collections::HashMap;
use std::fmt::Debug;
use std::time::{Duration, Instant};
use tokio::time::sleep;

#[async_trait]
pub trait ChainStep: Send + Sync {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>>;
}

#[derive(Debug, Clone)]
pub struct ChainResult {
    pub step_name: String,
    pub input_data: Value,
    pub output_data: Option<Value>,
    pub duration: Duration,
    pub success: bool,
    pub error: Option<String>,
}

impl ChainResult {
    pub fn success(step_name: String, input: Value, output: Value, duration: Duration) -> Self {
        Self {
            step_name,
            input_data: input,
            output_data: Some(output),
            duration,
            success: true,
            error: None,
        }
    }

    pub fn failure(step_name: String, input: Value, duration: Duration, error: String) -> Self {
        Self {
            step_name,
            input_data: input,
            output_data: None,
            duration,
            success: false,
            error: Some(error),
        }
    }
}

pub struct SequentialChain {
    steps: Vec<Box<dyn ChainStep>>,
    results: Vec<ChainResult>,
}

impl SequentialChain {
    pub fn new() -> Self {
        Self {
            steps: Vec::new(),
            results: Vec::new(),
        }
    }

    pub fn add_step<T: ChainStep + 'static>(&mut self, step: T) {
        self.steps.push(Box::new(step));
    }

    pub async fn execute(&mut self, initial_input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        println!("Starting sequential chain with {} steps\\n", self.steps.len());
        
        let mut current_input = initial_input;
        self.results.clear();

        for (i, step) in self.steps.iter().enumerate() {
            let start_time = Instant::now();
            
            println!("Step {}: {}", i + 1, step.name());
            println!("Description: {}", step.description());
            println!("Input: {}", current_input);
            
            match step.execute(current_input.clone()).await {
                Ok(output) => {
                    let duration = start_time.elapsed();
                    let result = ChainResult::success(
                        step.name().to_string(),
                        current_input.clone(),
                        output.clone(),
                        duration,
                    );
                    
                    self.results.push(result);
                    
                    println!("Output: {}", output);
                    println!("Duration: {:.3}s", duration.as_secs_f64());
                    println!("✅ Success\\n");
                    
                    current_input = output;
                }
                Err(error) => {
                    let duration = start_time.elapsed();
                    let result = ChainResult::failure(
                        step.name().to_string(),
                        current_input,
                        duration,
                        error.to_string(),
                    );
                    
                    self.results.push(result);
                    
                    println!("❌ Error: {}", error);
                    println!("Duration: {:.3}s\\n", duration.as_secs_f64());
                    
                    return Err(format!("Chain failed at step '{}': {}", step.name(), error).into());
                }
            }
        }

        Ok(current_input)
    }

    pub fn get_results(&self) -> &[ChainResult] {
        &self.results
    }

    pub fn print_summary(&self) {
        if self.results.is_empty() {
            return;
        }

        let total_steps = self.results.len();
        let successful_steps = self.results.iter().filter(|r| r.success).count();
        let total_duration: Duration = self.results.iter().map(|r| r.duration).sum();
        let average_duration = total_duration / total_steps as u32;

        println!("=== Execution Summary ===");
        println!("Total steps: {}", total_steps);
        println!("Successful steps: {}", successful_steps);
        println!("Success rate: {:.1}%", (successful_steps as f64 / total_steps as f64) * 100.0);
        println!("Total duration: {:.3}s", total_duration.as_secs_f64());
        println!("Average step duration: {:.3}s", average_duration.as_secs_f64());
    }
}

// Product Review Chain Implementation
pub struct ResearchFeaturesStep;

#[async_trait]
impl ChainStep for ResearchFeaturesStep {
    fn name(&self) -> &str {
        "Research Features"
    }

    fn description(&self) -> &str {
        "Analyze product features and specifications"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(500)).await;
        
        let product_name = input.as_str().unwrap_or("Unknown Product");
        
        let features = serde_json::json!({
            "product_name": product_name,
            "key_features": [
                "High-quality materials",
                "User-friendly interface",
                "Energy efficient",
                "Warranty included"
            ],
            "price": "$99.99",
            "rating": 4.2,
            "category": "Electronics"
        });
        
        Ok(features)
    }
}

pub struct CompetitorAnalysisStep;

#[async_trait]
impl ChainStep for CompetitorAnalysisStep {
    fn name(&self) -> &str {
        "Competitor Analysis"
    }

    fn description(&self) -> &str {
        "Compare features with competitors"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(300)).await;
        
        let mut product_data = input;
        
        product_data["competitor_comparison"] = serde_json::json!({
            "price": "Average for category",
            "features": "Above average feature set",
            "quality": "Higher quality than most competitors",
            "value": "Good value for money",
            "market_position": "Top 25% in category"
        });
        
        Ok(product_data)
    }
}

pub struct GenerateReviewStep;

#[async_trait]
impl ChainStep for GenerateReviewStep {
    fn name(&self) -> &str {
        "Generate Review"
    }

    fn description(&self) -> &str {
        "Create initial review based on analysis"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(400)).await;
        
        let mut review_data = input;
        
        let product_name = review_data["product_name"].as_str().unwrap_or("Product");
        let price = review_data["price"].as_str().unwrap_or("$0");
        let key_features = review_data["key_features"].as_array().unwrap();
        let features_text = key_features
            .iter()
            .map(|f| f.as_str().unwrap_or(""))
            .collect::<Vec<_>>()
            .join(", ");
        
        let comparison = &review_data["competitor_comparison"];
        let value = comparison["value"].as_str().unwrap_or("Good value");
        let quality = comparison["quality"].as_str().unwrap_or("Good quality");
        let market_position = comparison["market_position"].as_str().unwrap_or("Good position");
        
        let review_text = format!(
            "The {} offers an impressive feature set at {}. \\
             With its {}, it stands out in the market. \\
             {} and {}. The product maintains a {} position in its category.",
            product_name, price, features_text, value, quality, market_position
        );
        
        let rating = review_data["rating"].as_f64().unwrap_or(0.0);
        
        review_data["review_text"] = Value::String(review_text);
        review_data["recommendation"] = Value::String(
            if rating >= 4.0 { "Recommended" } else { "Consider alternatives" }.to_string()
        );
        
        Ok(review_data)
    }
}

pub struct PolishReviewStep;

#[async_trait]
impl ChainStep for PolishReviewStep {
    fn name(&self) -> &str {
        "Polish Review"
    }

    fn description(&self) -> &str {
        "Improve clarity and tone of the review"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(200)).await;
        
        let mut polished_data = input;
        
        let rating = polished_data["rating"].as_f64().unwrap_or(0.0);
        let rating_stars = "⭐".repeat(rating as usize);
        let recommendation = polished_data["recommendation"].as_str().unwrap_or("Unknown");
        let review_text = polished_data["review_text"].as_str().unwrap_or("");
        let price = polished_data["price"].as_str().unwrap_or("$0");
        
        let key_features = polished_data["key_features"].as_array().unwrap();
        let features_text = key_features
            .iter()
            .map(|f| f.as_str().unwrap_or(""))
            .collect::<Vec<_>>()
            .join(", ");
        
        let market_position = polished_data["competitor_comparison"]["market_position"]
            .as_str().unwrap_or("Good position");
        let value_assessment = polished_data["competitor_comparison"]["value"]
            .as_str().unwrap_or("Good value");
        
        let final_review = format!(
            "{} {}/5 - {}\\n\\n{}\\n\\n💰 Price: {}\\n🔥 Key Features: {}\\n📊 Market Position: {}\\n💎 Value Assessment: {}",
            rating_stars, rating, recommendation, review_text, price, features_text, market_position, value_assessment
        );
        
        polished_data["final_review"] = Value::String(final_review);
        polished_data["publish_ready"] = Value::Bool(true);
        polished_data["word_count"] = Value::Number(final_review.split_whitespace().count().into());
        polished_data["sentiment"] = Value::String(
            if rating >= 4.0 { "positive" } else { "neutral" }.to_string()
        );
        
        Ok(polished_data)
    }
}

pub fn create_product_review_chain() -> SequentialChain {
    let mut chain = SequentialChain::new();
    
    chain.add_step(ResearchFeaturesStep);
    chain.add_step(CompetitorAnalysisStep);
    chain.add_step(GenerateReviewStep);
    chain.add_step(PolishReviewStep);
    
    chain
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("=== Product Review Chain ===");
    
    let mut review_chain = create_product_review_chain();
    let product_name = Value::String("Smart Widget Pro".to_string());
    
    println!("Creating review for: {}\\n", product_name);
    
    match review_chain.execute(product_name).await {
        Ok(result) => {
            println!("=== Final Result ===");
            if let Some(final_review) = result["final_review"].as_str() {
                println!("{}", final_review);
            }
            println!();
            review_chain.print_summary();
        }
        Err(error) => {
            println!("Review chain failed: {}", error);
        }
    }
    
    Ok(())
}`
  },

  'react': {
    typescript: `// ReAct (Reasoning + Acting) Agent
interface Observation {
  content: string;
  success: boolean;
  timestamp: Date;
}

interface Action {
  type: 'search' | 'fetch' | 'finish';
  query?: string;
  url?: string;
  result?: string;
}

class ReActAgent {
  private thoughts: string[] = [];
  private actions: Action[] = [];
  private observations: Observation[] = [];

  think(thought: string): void {
    this.thoughts.push(thought);
    console.log(\`Thought: \${thought}\`);
  }

  act(action: Action): Observation {
    this.actions.push(action);
    console.log(\`Action: \${action.type}\${action.query ? \`("\${action.query}")\` : ''}\${action.url ? \`(\${action.url})\` : ''}\`);

    // Simulate action execution
    let observation: Observation;

    switch (action.type) {
      case 'search':
        observation = this.simulateSearch(action.query!);
        break;
      case 'fetch':
        observation = this.simulateFetch(action.url!);
        break;
      case 'finish':
        observation = {
          content: action.result || 'Task completed',
          success: true,
          timestamp: new Date()
        };
        break;
      default:
        observation = {
          content: 'Unknown action type',
          success: false,
          timestamp: new Date()
        };
    }

    this.observations.push(observation);
    console.log(\`Observation: \${observation.content}\`);
    return observation;
  }

  private simulateSearch(query: string): Observation {
    // Simulate search results based on query
    const searchResults: Record<string, string> = {
      'OpenAI CEO 2024': 'Search results show Sam Altman returned as CEO of OpenAI in November 2023',
      'current weather': 'Weather API shows 72°F, partly cloudy',
      'latest news': 'Breaking: Technology companies announce new AI developments'
    };

    const result = searchResults[query] || \`No specific results found for "\${query}"\`;
    
    return {
      content: result,
      success: true,
      timestamp: new Date()
    };
  }

  private simulateFetch(url: string): Observation {
    // Simulate fetching from different URLs
    const urlResponses: Record<string, string> = {
      'openai.com/about': 'OpenAI About page confirms Sam Altman as CEO',
      'weather.gov': 'Current temperature: 72°F, Humidity: 45%',
      'news.com': 'Latest headlines and breaking news stories'
    };

    const result = urlResponses[url] || \`Content fetched from \${url}\`;
    
    return {
      content: result,
      success: true,
      timestamp: new Date()
    };
  }

  solve(task: string): string {
    console.log(\`Task: \${task}\\n\`);

    // Clear previous state
    this.thoughts = [];
    this.actions = [];
    this.observations = [];

    // Example: Find current OpenAI CEO
    this.think("Need to search for current OpenAI leadership");
    let obs = this.act({ type: 'search', query: 'OpenAI CEO 2024' });

    this.think("Should verify with official source");
    obs = this.act({ type: 'fetch', url: 'openai.com/about' });

    this.think("Have reliable answer from official source");
    const finalAnswer = "Sam Altman is the current CEO of OpenAI";
    this.act({ type: 'finish', result: finalAnswer });

    return finalAnswer;
  }

  getExecutionTrace(): { thoughts: string[], actions: Action[], observations: Observation[] } {
    return {
      thoughts: [...this.thoughts],
      actions: [...this.actions],
      observations: [...this.observations]
    };
  }

  printExecutionSummary(): void {
    const trace = this.getExecutionTrace();
    console.log(\`\\nExecution Summary:\`);
    console.log(\`- Thoughts: \${trace.thoughts.length}\`);
    console.log(\`- Actions: \${trace.actions.length}\`);
    console.log(\`- Observations: \${trace.observations.length}\`);
    console.log(\`- Success rate: \${trace.observations.filter(obs => obs.success).length / trace.observations.length * 100}%\`);
  }
}

function main() {
  const agent = new ReActAgent();
  
  const task = "Find the current CEO of OpenAI";
  const result = agent.solve(task);
  
  console.log(\`\\nFinal Result: \${result}\`);
  agent.printExecutionSummary();
}

main();`,

    python: `#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Optional, Any, Literal
from datetime import datetime
import time

@dataclass
class Observation:
    content: str
    success: bool
    timestamp: datetime
    metadata: Optional[Dict[str, Any]] = None

@dataclass 
class Action:
    action_type: Literal['search', 'fetch', 'calculate', 'finish']
    parameters: Dict[str, Any]
    result: Optional[str] = None

class ReActAgent:
    def __init__(self):
        self.thoughts: List[str] = []
        self.actions: List[Action] = []
        self.observations: List[Observation] = []
        self.tools = self._setup_tools()
    
    def _setup_tools(self) -> Dict[str, callable]:
        return {
            'search': self._simulate_search,
            'fetch': self._simulate_fetch,
            'calculate': self._simulate_calculate,
            'finish': self._finish_task
        }
    
    def think(self, thought: str):
        self.thoughts.append(thought)
        print(f"Thought: {thought}")
    
    def act(self, action_type: str, **parameters) -> Observation:
        action = Action(action_type=action_type, parameters=parameters)
        self.actions.append(action)
        
        print(f"Action: {action_type}({self._format_parameters(parameters)})")
        
        if action_type not in self.tools:
            observation = Observation(
                content=f"Unknown action type: {action_type}",
                success=False,
                timestamp=datetime.now()
            )
        else:
            try:
                result = self.tools[action_type](**parameters)
                observation = Observation(
                    content=result,
                    success=True,
                    timestamp=datetime.now()
                )
            except Exception as e:
                observation = Observation(
                    content=f"Error executing {action_type}: {str(e)}",
                    success=False,
                    timestamp=datetime.now()
                )
        
        self.observations.append(observation)
        print(f"Observation: {observation.content}")
        return observation
    
    def _format_parameters(self, params: Dict[str, Any]) -> str:
        return ", ".join(f"{k}='{v}'" for k, v in params.items())
    
    def _simulate_search(self, query: str) -> str:
        time.sleep(0.1)  # Simulate API delay
        
        search_results = {
            'OpenAI CEO 2024': 'Search results show Sam Altman returned as CEO of OpenAI in November 2023',
            'current weather': 'Weather API shows 72°F, partly cloudy',
            'Python features': 'Python 3.12 released with new features including match statements and type hints',
            'machine learning': 'Latest ML research shows advances in transformer architectures'
        }
        
        for key, result in search_results.items():
            if any(word.lower() in query.lower() for word in key.split()):
                return result
        
        return f"Search results for '{query}': Found 42 results about {query}"
    
    def _simulate_fetch(self, url: str) -> str:
        time.sleep(0.2)  # Simulate network delay
        
        url_responses = {
            'openai.com': 'OpenAI About page confirms Sam Altman as CEO',
            'weather.gov': 'Current temperature: 72°F, Humidity: 45%, Wind: 5mph',
            'python.org': 'Official Python documentation and downloads',
            'github.com': 'GitHub repository with latest code and issues'
        }
        
        for domain, response in url_responses.items():
            if domain in url:
                return response
        
        return f"Content fetched from {url}: Page loaded successfully"
    
    def _simulate_calculate(self, expression: str) -> str:
        try:
            result = eval(expression.replace('^', '**'))
            return f"Calculation result: {expression} = {result}"
        except Exception as e:
            return f"Calculation error: {str(e)}"
    
    def _finish_task(self, result: str) -> str:
        return f"Task completed: {result}"
    
    def solve(self, task: str) -> str:
        print(f"Task: {task}\\n")
        
        # Clear previous state
        self.thoughts = []
        self.actions = []
        self.observations = []
        
        return self._execute_task_logic(task)
    
    def _execute_task_logic(self, task: str) -> str:
        if "OpenAI CEO" in task:
            return self._find_openai_ceo()
        elif "weather" in task:
            return self._get_weather_info()
        elif "calculate" in task:
            return self._perform_calculation(task)
        else:
            return self._general_research(task)
    
    def _find_openai_ceo(self) -> str:
        self.think("Need to search for current OpenAI leadership")
        obs = self.act('search', query='OpenAI CEO 2024')
        
        if obs.success:
            self.think("Should verify with official source")
            obs = self.act('fetch', url='openai.com')
            
            if obs.success:
                self.think("Have reliable answer from official source")
                final_answer = "Sam Altman is the current CEO of OpenAI"
                self.act('finish', result=final_answer)
                return final_answer
        
        return "Could not determine current OpenAI CEO"
    
    def _get_weather_info(self) -> str:
        self.think("Need to get current weather data")
        obs = self.act('search', query='current weather')
        
        if obs.success:
            self.think("Should get more detailed information")
            obs = self.act('fetch', url='weather.gov')
            
            if obs.success:
                self.think("Have comprehensive weather data")
                final_answer = "Current weather: 72°F, partly cloudy, humidity 45%"
                self.act('finish', result=final_answer)
                return final_answer
        
        return "Could not retrieve weather information"
    
    def _perform_calculation(self, task: str) -> str:
        self.think("Need to extract mathematical expression from task")
        
        if "2+2" in task:
            expression = "2+2"
        elif "10*5" in task:
            expression = "10*5"
        else:
            expression = "2^3"
        
        self.think(f"Identified expression: {expression}")
        obs = self.act('calculate', expression=expression)
        
        if obs.success:
            self.think("Calculation completed successfully")
            final_answer = obs.content
            self.act('finish', result=final_answer)
            return final_answer
        
        return "Could not perform calculation"
    
    def _general_research(self, task: str) -> str:
        self.think(f"Need to research topic: {task}")
        obs = self.act('search', query=task)
        
        if obs.success:
            self.think("Found relevant information, getting more details")
            url = "github.com" if "code" in task.lower() else "python.org"
            obs = self.act('fetch', url=url)
            
            if obs.success:
                self.think("Have sufficient information to provide answer")
                final_answer = f"Research completed on: {task}"
                self.act('finish', result=final_answer)
                return final_answer
        
        return f"Could not complete research on: {task}"
    
    def get_execution_trace(self) -> Dict[str, List]:
        return {
            'thoughts': self.thoughts.copy(),
            'actions': [action.__dict__ for action in self.actions],
            'observations': [obs.__dict__ for obs in self.observations]
        }
    
    def print_execution_summary(self):
        print(f"\\nExecution Summary:")
        print(f"- Thoughts: {len(self.thoughts)}")
        print(f"- Actions: {len(self.actions)}")
        print(f"- Observations: {len(self.observations)}")
        print(f"- Success rate: {sum(1 for obs in self.observations if obs.success) / len(self.observations) * 100:.1f}%")

def main():
    agent = ReActAgent()
    
    tasks = [
        "Find the current CEO of OpenAI",
        "What's the current weather?",
        "Calculate 2+2",
        "Research Python programming"
    ]
    
    for i, task in enumerate(tasks, 1):
        print(f"\\n{'='*50}")
        print(f"Test {i}: {task}")
        print('='*50)
        
        result = agent.solve(task)
        print(f"\\nFinal Result: {result}")
        agent.print_execution_summary()
        
        if i < len(tasks):
            print("\\n" + "-"*30 + "\\n")

if __name__ == "__main__":
    main()`,

    rust: `use std::collections::HashMap;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

#[derive(Debug, Clone)]
pub struct Observation {
    pub content: String,
    pub success: bool,
    pub timestamp: u64,
    pub metadata: Option<HashMap<String, String>>,
}

impl Observation {
    pub fn new(content: String, success: bool) -> Self {
        Self {
            content,
            success,
            timestamp: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            metadata: None,
        }
    }
}

#[derive(Debug, Clone)]
pub struct Action {
    pub action_type: String,
    pub parameters: HashMap<String, String>,
    pub result: Option<String>,
}

impl Action {
    pub fn new(action_type: &str) -> Self {
        Self {
            action_type: action_type.to_string(),
            parameters: HashMap::new(),
            result: None,
        }
    }

    pub fn with_param(mut self, key: &str, value: &str) -> Self {
        self.parameters.insert(key.to_string(), value.to_string());
        self
    }
}

pub struct ReActAgent {
    thoughts: Vec<String>,
    actions: Vec<Action>,
    observations: Vec<Observation>,
    tools: HashMap<String, Box<dyn Fn(&HashMap<String, String>) -> Result<String, String> + Send + Sync>>,
}

impl ReActAgent {
    pub fn new() -> Self {
        let mut agent = Self {
            thoughts: Vec::new(),
            actions: Vec::new(),
            observations: Vec::new(),
            tools: HashMap::new(),
        };
        
        agent.setup_tools();
        agent
    }

    fn setup_tools(&mut self) {
        // Search tool
        self.tools.insert(
            "search".to_string(),
            Box::new(|params| {
                std::thread::sleep(Duration::from_millis(100));
                
                let query = params.get("query").unwrap_or("");
                let search_results = [
                    ("OpenAI CEO 2024", "Search results show Sam Altman returned as CEO of OpenAI in November 2023"),
                    ("current weather", "Weather API shows 72°F, partly cloudy"),
                    ("Python features", "Python 3.12 released with new features including match statements and type hints"),
                ];
                
                for (key, result) in &search_results {
                    if query.to_lowercase().contains(&key.to_lowercase()) {
                        return Ok(result.to_string());
                    }
                }
                
                Ok(format!("Search results for '{}': Found 42 results about {}", query, query))
            })
        );

        // Fetch tool
        self.tools.insert(
            "fetch".to_string(),
            Box::new(|params| {
                std::thread::sleep(Duration::from_millis(200));
                
                let url = params.get("url").unwrap_or("");
                let url_responses = [
                    ("openai.com", "OpenAI About page confirms Sam Altman as CEO"),
                    ("weather.gov", "Current temperature: 72°F, Humidity: 45%, Wind: 5mph"),
                    ("python.org", "Official Python documentation and downloads"),
                ];
                
                for (domain, response) in &url_responses {
                    if url.contains(domain) {
                        return Ok(response.to_string());
                    }
                }
                
                Ok(format!("Content fetched from {}: Page loaded successfully", url))
            })
        );

        // Calculate tool
        self.tools.insert(
            "calculate".to_string(),
            Box::new(|params| {
                let expression = params.get("expression").unwrap_or("");
                
                match expression {
                    "2+2" => Ok("Calculation result: 2+2 = 4".to_string()),
                    "10*5" => Ok("Calculation result: 10*5 = 50".to_string()),
                    "2^3" => Ok("Calculation result: 2^3 = 8".to_string()),
                    _ => Ok(format!("Calculation result: {} = [computed]", expression)),
                }
            })
        );

        // Finish tool
        self.tools.insert(
            "finish".to_string(),
            Box::new(|params| {
                let result = params.get("result").unwrap_or("Task completed");
                Ok(format!("Task completed: {}", result))
            })
        );
    }

    pub fn think(&mut self, thought: &str) {
        self.thoughts.push(thought.to_string());
        println!("Thought: {}", thought);
    }

    pub fn act(&mut self, action: Action) -> Observation {
        let formatted_params = action.parameters
            .iter()
            .map(|(k, v)| format!("{}='{}'", k, v))
            .collect::<Vec<_>>()
            .join(", ");
        
        println!("Action: {}({})", action.action_type, formatted_params);
        
        let observation = if let Some(tool) = self.tools.get(&action.action_type) {
            match tool(&action.parameters) {
                Ok(result) => Observation::new(result, true),
                Err(error) => Observation::new(
                    format!("Error executing {}: {}", action.action_type, error),
                    false,
                ),
            }
        } else {
            Observation::new(
                format!("Unknown action type: {}", action.action_type),
                false,
            )
        };
        
        println!("Observation: {}", observation.content);
        
        self.actions.push(action);
        self.observations.push(observation.clone());
        
        observation
    }

    pub fn solve(&mut self, task: &str) -> String {
        println!("Task: {}\\n", task);
        
        // Clear previous state
        self.thoughts.clear();
        self.actions.clear();
        self.observations.clear();
        
        self.execute_task_logic(task)
    }

    fn execute_task_logic(&mut self, task: &str) -> String {
        if task.contains("OpenAI CEO") {
            self.find_openai_ceo()
        } else if task.contains("weather") {
            self.get_weather_info()
        } else if task.contains("calculate") {
            self.perform_calculation(task)
        } else {
            self.general_research(task)
        }
    }

    fn find_openai_ceo(&mut self) -> String {
        self.think("Need to search for current OpenAI leadership");
        let obs = self.act(Action::new("search").with_param("query", "OpenAI CEO 2024"));
        
        if obs.success {
            self.think("Should verify with official source");
            let obs = self.act(Action::new("fetch").with_param("url", "openai.com"));
            
            if obs.success {
                self.think("Have reliable answer from official source");
                let final_answer = "Sam Altman is the current CEO of OpenAI";
                self.act(Action::new("finish").with_param("result", final_answer));
                return final_answer.to_string();
            }
        }
        
        "Could not determine current OpenAI CEO".to_string()
    }

    fn get_weather_info(&mut self) -> String {
        self.think("Need to get current weather data");
        let obs = self.act(Action::new("search").with_param("query", "current weather"));
        
        if obs.success {
            self.think("Should get more detailed information");
            let obs = self.act(Action::new("fetch").with_param("url", "weather.gov"));
            
            if obs.success {
                self.think("Have comprehensive weather data");
                let final_answer = "Current weather: 72°F, partly cloudy, humidity 45%";
                self.act(Action::new("finish").with_param("result", final_answer));
                return final_answer.to_string();
            }
        }
        
        "Could not retrieve weather information".to_string()
    }

    fn perform_calculation(&mut self, task: &str) -> String {
        self.think("Need to extract mathematical expression from task");
        
        let expression = if task.contains("2+2") {
            "2+2"
        } else if task.contains("10*5") {
            "10*5"
        } else {
            "2^3"
        };
        
        self.think(&format!("Identified expression: {}", expression));
        let obs = self.act(Action::new("calculate").with_param("expression", expression));
        
        if obs.success {
            self.think("Calculation completed successfully");
            let final_answer = obs.content;
            self.act(Action::new("finish").with_param("result", &final_answer));
            return final_answer;
        }
        
        "Could not perform calculation".to_string()
    }

    fn general_research(&mut self, task: &str) -> String {
        self.think(&format!("Need to research topic: {}", task));
        let obs = self.act(Action::new("search").with_param("query", task));
        
        if obs.success {
            self.think("Found relevant information, getting more details");
            let url = if task.to_lowercase().contains("code") {
                "github.com"
            } else {
                "python.org"
            };
            let obs = self.act(Action::new("fetch").with_param("url", url));
            
            if obs.success {
                self.think("Have sufficient information to provide answer");
                let final_answer = format!("Research completed on: {}", task);
                self.act(Action::new("finish").with_param("result", &final_answer));
                return final_answer;
            }
        }
        
        format!("Could not complete research on: {}", task)
    }

    pub fn print_execution_summary(&self) {
        let success_count = self.observations.iter().filter(|obs| obs.success).count();
        let success_rate = if self.observations.is_empty() {
            0.0
        } else {
            (success_count as f64 / self.observations.len() as f64) * 100.0
        };
        
        println!("\\nExecution Summary:");
        println!("- Thoughts: {}", self.thoughts.len());
        println!("- Actions: {}", self.actions.len());
        println!("- Observations: {}", self.observations.len());
        println!("- Success rate: {:.1}%", success_rate);
    }
}

fn main() {
    let mut agent = ReActAgent::new();
    
    let tasks = [
        "Find the current CEO of OpenAI",
        "What's the current weather?",
        "Calculate 2+2",
        "Research Python programming",
    ];
    
    for (i, task) in tasks.iter().enumerate() {
        println!("{}", "=".repeat(50));
        println!("Test {}: {}", i + 1, task);
        println!("{}", "=".repeat(50));
        
        let result = agent.solve(task);
        println!("\\nFinal Result: {}", result);
        agent.print_execution_summary();
        
        if i < tasks.len() - 1 {
            println!("\\n{}", "-".repeat(30));
            println!();
        }
    }
}`
  }
} as const;

// Add mappings for additional patterns that may exist
export const getPatternExample = (patternId: string, language: LanguageType): string => {
  if (patternExamples[patternId as PatternId]) {
    return patternExamples[patternId as PatternId][language];
  }
  
  // Default example for patterns not yet implemented
  const defaultExamples = {
    typescript: `// ${patternId.toUpperCase()} Pattern - Coming Soon
// This pattern example will be available in a future update
console.log("${patternId} pattern example coming soon!");`,
    python: `# ${patternId.toUpperCase()} Pattern - Coming Soon
# This pattern example will be available in a future update
print("${patternId} pattern example coming soon!")`,
    rust: `// ${patternId.toUpperCase()} Pattern - Coming Soon
// This pattern example will be available in a future update
fn main() {
    println!("${patternId} pattern example coming soon!");
}`
  };
  
  return defaultExamples[language];
};

export type PatternId = keyof typeof patternExamples;
export type LanguageType = 'typescript' | 'python' | 'rust';