# TypeScript Agentic Design Patterns

This directory contains runnable TypeScript examples for various agentic design patterns.

## Setup

```bash
npm install
```

## Running Examples

Each pattern can be run individually:

```bash
# Chain of Thought
npm run cot

# Tree of Thought
npm run tot

# ReAct Pattern
npm run react

# Constitutional AI
npm run constitutional

# Sequential Chaining
npm run sequential
```

## Patterns Included

### Reasoning Patterns

- **Chain of Thought** (`chain-of-thought.ts`): Step-by-step reasoning for problem solving
- **Tree of Thought** (`tree-of-thought.ts`): Explores multiple reasoning paths with branching
- **ReAct** (`react-pattern.ts`): Reasoning + Acting with tool use simulation

### Safety Patterns

- **Constitutional AI** (`constitutional-ai.ts`): Built-in ethical constraints and safety checks

### Chaining Patterns

- **Sequential Chaining** (`sequential-chaining.ts`): Linear workflow execution with state management

## Modifying Examples

Each example is self-contained and can be easily modified:

1. Open the TypeScript file you want to modify
2. Change the parameters, logic, or add new functionality
3. Run with `tsx filename.ts` or use the npm scripts

## Example Structure

Each pattern follows a similar structure:
- Class-based implementation for the core pattern
- Clear interfaces for type safety
- Usage example in the `main()` function
- Exportable components for reuse