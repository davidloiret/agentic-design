# Agentic Design Patterns - Examples

This directory contains runnable examples for agentic design patterns in TypeScript, Python, and Rust. Each language implementation demonstrates the same core patterns with language-specific optimizations and idioms.

## Directory Structure

```
examples/
├── typescript/          # TypeScript implementations
│   ├── chain-of-thought.ts
│   ├── tree-of-thought.ts
│   ├── react-pattern.ts
│   ├── constitutional-ai.ts
│   ├── sequential-chaining.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── python/              # Python implementations
│   ├── chain_of_thought.py
│   ├── tree_of_thought.py
│   ├── react_pattern.py
│   ├── constitutional_ai.py
│   ├── sequential_chaining.py
│   ├── requirements.txt
│   └── README.md
├── rust/                # Rust implementations
│   ├── src/
│   │   ├── chain_of_thought.rs
│   │   ├── tree_of_thought.rs
│   │   ├── react_pattern.rs
│   │   ├── constitutional_ai.rs
│   │   └── sequential_chaining.rs
│   ├── Cargo.toml
│   └── README.md
└── README.md           # This file
```

## Patterns Implemented

### Reasoning Patterns

1. **Chain of Thought (CoT)**
   - Step-by-step reasoning decomposition
   - Mathematical problem solving examples
   - Transparent reasoning process

2. **Tree of Thought (ToT)**
   - Multi-path exploration with branching
   - Travel planning and decision-making scenarios
   - Path scoring and optimization

3. **ReAct (Reasoning + Acting)**
   - Thought-Action-Observation loops
   - Simulated tool use and external interactions
   - Research and information gathering tasks

### Safety Patterns

4. **Constitutional AI**
   - Built-in ethical constraints and principles
   - Multi-severity safety checks
   - Safe alternative response generation

### Chaining Patterns

5. **Sequential Chaining**
   - Linear workflow execution
   - State management between steps
   - Error handling and recovery

## Quick Start

Choose your preferred language and follow the setup instructions:

### TypeScript
```bash
cd typescript
npm install
npm run cot  # Run Chain of Thought example
```

### Python
```bash
cd python
python chain_of_thought.py  # Run Chain of Thought example
```

### Rust
```bash
cd rust
cargo run --bin chain_of_thought  # Run Chain of Thought example
```

## Language Comparison

| Feature | TypeScript | Python | Rust |
|---------|------------|--------|------|
| **Type Safety** | Compile-time with strict mode | Runtime with type hints | Compile-time guaranteed |
| **Performance** | Fast (V8 JIT) | Moderate (interpreted) | Fastest (compiled) |
| **Memory Safety** | GC managed | GC managed | Zero-cost, ownership-based |
| **Async Support** | Native promises/async-await | asyncio library | Native tokio async-await |
| **Learning Curve** | Moderate | Easy | Steep |
| **Ecosystem** | Rich (npm) | Rich (pip) | Growing (crates.io) |

## Common Design Principles

All implementations follow these patterns:

1. **Modular Design**: Each pattern is self-contained and reusable
2. **Error Handling**: Robust error handling appropriate to each language
3. **Extensibility**: Easy to extend with custom logic
4. **Documentation**: Comprehensive inline documentation
5. **Testing**: Examples include verification and demonstration code

## Usage Patterns

### Basic Pattern Usage
```typescript
// TypeScript
const solver = new ChainOfThoughtSolver();
const result = solver.solve("What is 2+2?");
```

```python
# Python
solver = ChainOfThoughtSolver()
result = solver.solve("What is 2+2?")
```

```rust
// Rust
let mut solver = ChainOfThoughtSolver::new();
let result = solver.solve("What is 2+2?");
```

### Advanced Chaining
```typescript
// TypeScript
const chain = new SequentialChain();
chain.addStep(step1);
chain.addStep(step2);
const result = await chain.execute(input);
```

```python
# Python
chain = SequentialChain()
chain.add_function_step("Step 1", "Description", my_function)
result = await chain.execute(input)
```

```rust
// Rust
let mut chain = SequentialChain::new();
chain.add_step(MyCustomStep);
let result = chain.execute(input).await?;
```

## Customization Examples

### Adding Custom Reasoning Steps
Each language provides mechanisms to extend the base patterns:

- **TypeScript**: Class inheritance and composition
- **Python**: Class inheritance and duck typing  
- **Rust**: Trait implementation and generics

### Custom Safety Principles
Add domain-specific safety constraints:

- **TypeScript**: Function-based check implementation
- **Python**: Callable objects with regex patterns
- **Rust**: Boxed closures with compile-time safety

## Performance Considerations

### TypeScript
- Use async/await for I/O operations
- Leverage V8 optimizations
- Consider memory usage with large datasets

### Python
- Use asyncio for concurrent operations
- Consider type hints for better IDE support
- Profile memory usage for large chains

### Rust
- Zero-cost abstractions provide optimal performance
- Compile-time guarantees eliminate runtime checks
- Async operations are highly efficient

## Contributing

When adding new patterns:

1. Implement in all three languages
2. Follow existing code style and patterns
3. Include comprehensive examples
4. Add performance benchmarks where applicable
5. Update README documentation

## License

These examples are provided for educational purposes. See the main project license for details.