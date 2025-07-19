#!/usr/bin/env tsx

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
    console.log(`Step ${step}: ${reasoning}`);
    if (calculation) console.log(`  Calculation: ${calculation}`);
    if (result !== undefined) console.log(`  Result: ${result}`);
  }

  solve(problem: string): any {
    console.log(`Problem: ${problem}\n`);
    this.thoughts = [];
    
    return this.executeSolution();
  }

  private executeSolution(): any {
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
  
  console.log(`\nFinal Answer: ${answer} mph`);
  console.log(`\nThought process had ${solver.getThoughts().length} steps`);
}

if (require.main === module) {
  main();
}

export { ChainOfThoughtSolver };
export type { Thought };