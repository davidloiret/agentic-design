# Rust Agentic Design Patterns

This directory contains runnable Rust examples for various agentic design patterns.

## Setup

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build all examples
cargo build

# Or build in release mode for better performance
cargo build --release
```

## Running Examples

Each pattern can be run individually:

```bash
# Chain of Thought
cargo run --bin chain_of_thought

# Tree of Thought
cargo run --bin tree_of_thought

# ReAct Pattern
cargo run --bin react_pattern

# Constitutional AI
cargo run --bin constitutional_ai

# Sequential Chaining
cargo run --bin sequential_chaining
```

## Patterns Included

### Reasoning Patterns

- **Chain of Thought** (`src/chain_of_thought.rs`): Step-by-step reasoning with mathematical problem solving
- **Tree of Thought** (`src/tree_of_thought.rs`): Multi-path exploration with travel planning scenarios
- **ReAct** (`src/react_pattern.rs`): Reasoning + Acting with async tool simulation

### Safety Patterns

- **Constitutional AI** (`src/constitutional_ai.rs`): Comprehensive safety system with regex-based checks

### Chaining Patterns

- **Sequential Chaining** (`src/sequential_chaining.rs`): Async workflow execution with trait-based steps

## Key Features

- **Type Safety**: Full Rust type system with compile-time guarantees
- **Memory Safety**: Zero-cost abstractions with no garbage collection
- **Async Support**: Native Tokio async/await support
- **Error Handling**: Robust Result-based error handling
- **Performance**: Optimized for speed and memory efficiency
- **Trait System**: Extensible design using Rust traits

## Dependencies

- `tokio`: Async runtime for concurrent operations
- `serde/serde_json`: Serialization for data exchange
- `uuid`: Unique identifier generation
- `async-trait`: Async traits support
- `regex`: Pattern matching for safety checks

## Architecture

### Chain of Thought
```rust
pub struct ChainOfThoughtSolver {
    thoughts: Vec<Thought>,
}

impl ChainOfThoughtSolver {
    pub fn think(&mut self, step: usize, reasoning: &str, calculation: Option<&str>, result: Option<f64>);
    pub fn solve(&mut self, problem: &str) -> f64;
}
```

### Sequential Chaining
```rust
#[async_trait]
pub trait ChainStep: Send + Sync {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>>;
}
```

### Constitutional AI
```rust
pub struct ConstitutionalPrinciple {
    pub name: String,
    pub rule: String,
    pub severity: Severity,
    pub check_function: CheckFunction,
    pub suggestion: String,
}
```

## Performance

Run benchmarks to measure performance:

```bash
cargo bench
```

## Extending Examples

### Custom Chain Steps
```rust
pub struct MyCustomStep;

#[async_trait]
impl ChainStep for MyCustomStep {
    fn name(&self) -> &str { "Custom Step" }
    fn description(&self) -> &str { "My custom processing step" }
    
    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        // Your custom logic here
        Ok(input)
    }
}
```

### Custom Safety Principles
```rust
cai.add_principle(ConstitutionalPrinciple::new(
    "Custom Rule",
    "My custom safety rule",
    Severity::High,
    Box::new(|input, output| {
        // Your custom check logic
        true
    }),
    "Custom suggestion"
));
```

## Error Handling

All examples use Rust's Result type for robust error handling:

```rust
match chain.execute(input).await {
    Ok(result) => println!("Success: {:?}", result),
    Err(error) => eprintln!("Error: {}", error),
}
```

## Memory Management

Rust's ownership system ensures memory safety without garbage collection:
- No memory leaks
- No dangling pointers  
- Zero-cost abstractions
- Predictable performance