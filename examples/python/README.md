# Python Agentic Design Patterns

This directory contains runnable Python examples for various agentic design patterns.

## Setup

No external dependencies required! All examples use only Python standard library.

```bash
# Python 3.7+ required
python --version

# Optional: Install development dependencies
pip install -r requirements.txt
```

## Running Examples

Each pattern can be run directly:

```bash
# Chain of Thought
python chain_of_thought.py

# Tree of Thought
python tree_of_thought.py

# ReAct Pattern  
python react_pattern.py

# Constitutional AI
python constitutional_ai.py

# Sequential Chaining
python sequential_chaining.py
```

## Patterns Included

### Reasoning Patterns

- **Chain of Thought** (`chain_of_thought.py`): Step-by-step reasoning with mathematical examples
- **Tree of Thought** (`tree_of_thought.py`): Multi-path exploration with travel planning example
- **ReAct** (`react_pattern.py`): Reasoning + Acting with simulated tool use

### Safety Patterns

- **Constitutional AI** (`constitutional_ai.py`): Comprehensive safety checks with multiple principles

### Chaining Patterns

- **Sequential Chaining** (`sequential_chaining.py`): Async/sync workflow execution with error handling

## Key Features

- **Type Safety**: Full type hints using Python's typing module
- **Error Handling**: Robust error handling and recovery
- **Async Support**: Native asyncio support where beneficial
- **Extensibility**: Easy to extend with custom logic
- **Documentation**: Comprehensive docstrings and comments

## Example Structure

Each pattern includes:
- Main class implementation with type hints
- Specialized subclasses for different use cases
- Comprehensive examples in `main()` function
- Error handling and edge cases
- Performance metrics and summaries

## Modifying Examples

1. Open any Python file
2. Modify the logic in the main class or create subclasses
3. Run with `python filename.py`
4. All examples are self-contained and easily extensible

## Advanced Usage

### Custom Chain Steps
```python
# Create custom sequential chain
chain = SequentialChain()
chain.add_function_step("My Step", "Description", my_function)
result = chain.execute_sync(initial_data)
```

### Custom Constitutional Principles
```python
# Add custom safety principle
cai = ConstitutionalAI()
cai.add_principle(ConstitutionalPrinciple(
    name="Custom Rule",
    rule="Custom safety rule",
    severity=Severity.HIGH,
    check_function=my_check_function
))
```