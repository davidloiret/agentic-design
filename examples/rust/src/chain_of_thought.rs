use std::fmt::Display;

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
            write!(f, "\n  Calculation: {}", calc)?;
        }
        if let Some(result) = self.result {
            write!(f, "\n  Result: {}", result)?;
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
        println!("Problem: {}\n", problem);
        self.thoughts.clear();
        
        self.execute_solution()
    }

    fn execute_solution(&mut self) -> f64 {
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

pub struct MathChainOfThought {
    solver: ChainOfThoughtSolver,
}

impl MathChainOfThought {
    pub fn new() -> Self {
        Self {
            solver: ChainOfThoughtSolver::new(),
        }
    }

    pub fn solve_quadratic(&mut self, a: f64, b: f64, c: f64) -> (Option<f64>, Option<f64>) {
        println!("Problem: Solve {}x² + {}x + {} = 0\n", a, b, c);
        self.solver.thoughts.clear();
        
        self.solver.think(1, &format!("Identify coefficients: a={}, b={}, c={}", a, b, c), None, None);
        
        let discriminant = b * b - 4.0 * a * c;
        self.solver.think(
            2, 
            "Calculate discriminant", 
            Some(&format!("b² - 4ac = {}² - 4({})({}) = {}", b, a, c, discriminant)),
            Some(discriminant)
        );
        
        if discriminant < 0.0 {
            self.solver.think(3, "Discriminant is negative", None, None);
            println!("  Result: No real solutions");
            (None, None)
        } else if discriminant == 0.0 {
            self.solver.think(3, "Discriminant is zero", None, None);
            let x = -b / (2.0 * a);
            self.solver.think(
                4, 
                "Calculate solution", 
                Some(&format!("-b / (2a) = -{} / (2×{}) = {}", b, a, x)),
                Some(x)
            );
            (Some(x), Some(x))
        } else {
            self.solver.think(3, "Discriminant is positive", None, None);
            let sqrt_disc = discriminant.sqrt();
            self.solver.think(
                4, 
                "Calculate square root of discriminant", 
                Some(&format!("√{} = {}", discriminant, sqrt_disc)),
                Some(sqrt_disc)
            );
            
            let x1 = (-b + sqrt_disc) / (2.0 * a);
            let x2 = (-b - sqrt_disc) / (2.0 * a);
            
            self.solver.think(
                5, 
                "Calculate first solution", 
                Some(&format!("(-{} + {}) / (2×{}) = {}", b, sqrt_disc, a, x1)),
                Some(x1)
            );
            self.solver.think(
                6, 
                "Calculate second solution", 
                Some(&format!("(-{} - {}) / (2×{}) = {}", b, sqrt_disc, a, x2)),
                Some(x2)
            );
            
            (Some(x1), Some(x2))
        }
    }

    pub fn get_thoughts(&self) -> &[Thought] {
        self.solver.get_thoughts()
    }
}

fn main() {
    // Basic example
    let mut solver = ChainOfThoughtSolver::new();
    
    let problem = "If a train travels 120 miles in 2 hours, and then 180 miles in 3 hours, what is its average speed?";
    let answer = solver.solve(problem);
    
    println!("\nFinal Answer: {} mph", answer);
    println!("Thought process had {} steps", solver.get_thoughts().len());
    
    println!("\n{}", "=".repeat(50));
    println!();
    
    // Mathematical example
    let mut math_solver = MathChainOfThought::new();
    let solutions = math_solver.solve_quadratic(1.0, -5.0, 6.0);
    
    match solutions {
        (Some(x1), Some(x2)) => {
            if x1 == x2 {
                println!("\nSolution: x = {}", x1);
            } else {
                println!("\nSolutions: x₁ = {}, x₂ = {}", x1, x2);
            }
        }
        _ => println!("\nNo real solutions"),
    }
    println!("Thought process had {} steps", math_solver.get_thoughts().len());
}