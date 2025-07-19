#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Optional, Any
import time

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
        """Add a reasoning step to the chain of thought."""
        thought = Thought(step, reasoning, calculation, result)
        self.thoughts.append(thought)
        
        print(f"Step {step}: {reasoning}")
        if calculation:
            print(f"  Calculation: {calculation}")
        if result is not None:
            print(f"  Result: {result}")
    
    def solve(self, problem: str) -> Any:
        """Solve a problem using chain of thought reasoning."""
        print(f"Problem: {problem}\n")
        self.thoughts = []
        
        return self._execute_solution()
    
    def _execute_solution(self) -> Any:
        """Execute the specific solution logic."""
        # Example: Average speed calculation
        self.think(1, "First segment: 120 miles in 2 hours")
        self.think(2, "Second segment: 180 miles in 3 hours")
        self.think(3, "Calculate total distance", "120 + 180", 300)
        self.think(4, "Calculate total time", "2 + 3", 5)
        self.think(5, "Calculate average speed", "300 ÷ 5", 60)
        
        return 60
    
    def get_thoughts(self) -> List[Thought]:
        """Get all thoughts in the reasoning chain."""
        return self.thoughts.copy()

class MathChainOfThought(ChainOfThoughtSolver):
    """Specialized solver for mathematical problems."""
    
    def solve_quadratic(self, a: float, b: float, c: float) -> tuple:
        """Solve quadratic equation ax² + bx + c = 0"""
        print(f"Problem: Solve {a}x² + {b}x + {c} = 0\n")
        self.thoughts = []
        
        self.think(1, f"Identify coefficients: a={a}, b={b}, c={c}")
        
        discriminant = b**2 - 4*a*c
        self.think(2, "Calculate discriminant", f"b² - 4ac = {b}² - 4({a})({c})", discriminant)
        
        if discriminant < 0:
            self.think(3, "Discriminant is negative", None, "No real solutions")
            return None, None
        elif discriminant == 0:
            self.think(3, "Discriminant is zero", None, "One solution")
            x = -b / (2*a)
            self.think(4, "Calculate solution", f"-b / (2a) = -{b} / (2×{a})", x)
            return x, x
        else:
            self.think(3, "Discriminant is positive", None, "Two solutions")
            import math
            sqrt_disc = math.sqrt(discriminant)
            self.think(4, "Calculate square root of discriminant", f"√{discriminant}", sqrt_disc)
            
            x1 = (-b + sqrt_disc) / (2*a)
            x2 = (-b - sqrt_disc) / (2*a)
            
            self.think(5, "Calculate first solution", f"(-{b} + {sqrt_disc}) / (2×{a})", x1)
            self.think(6, "Calculate second solution", f"(-{b} - {sqrt_disc}) / (2×{a})", x2)
            
            return x1, x2

def main():
    # Basic example
    solver = ChainOfThoughtSolver()
    
    problem = "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?"
    answer = solver.solve(problem)
    
    print(f"\nFinal Answer: {answer} mph")
    print(f"Thought process had {len(solver.get_thoughts())} steps")
    
    print("\n" + "="*50 + "\n")
    
    # Mathematical example
    math_solver = MathChainOfThought()
    solutions = math_solver.solve_quadratic(1, -5, 6)
    
    print(f"\nSolutions: x₁ = {solutions[0]}, x₂ = {solutions[1]}")
    print(f"Thought process had {len(math_solver.get_thoughts())} steps")

if __name__ == "__main__":
    main()