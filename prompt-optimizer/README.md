# Prompt Optimizer

A microservice for prompt optimization using DSPy framework.

## Features

- DSPy-based prompt optimization
- RESTful API endpoints
- Clean Architecture pattern
- Docker support

## Installation

```bash
uv sync
```

## Usage

```bash
uv run dev
```

The service will be available at `http://localhost:9090`

## Development

```bash
uv sync --group dev
uv run dev
```


uv run uvicorn src.app.main:app --reload --port 9090


---------
---------

Company policy: Employees get 15 vacation days/year plus 1 extra day per year of service after 5 years. Unused days carry over but cap at 30 total. Sarah started in 2018, used 12 days in 2023, and 8 days so far in 2024. Today is November 2024. Vacation days refresh every January 

How many vacation days does Sarah have available for the rest of 2024, and how many will she have on January 1, 2025 if she doesn't use any more?

Response should be 28


{"facts": "Company policy: Employees get 15 vacation days/year plus 1 extra day per year of service after 5 years. Unused days carry over but cap at 30 total. Sarah started in 2018, used 12 days in 2023, and 8 days so far in 2024. Today is November 2024. Vacation days refresh every January", "question": "How many vacation days does Sarah have available for the rest of 2024, and how many will she have on January 1, 2025 if she doesn't use any more?"}
---------

  Key Differences:

  Without Optimization (❌):

  - Wrong calculation: Says Sarah has 11 days left in 2024 and 27 days for 2025
  - Incorrect logic: Assumes she only gets 1 extra day total (not per year after 5)
  - Long rambling answer: Provides a wall of text that's hard to follow

  With DSPy Optimization (✅):

  - Correct calculation: 22 days left in 2024, 30 days for 2025 (capped)
  - Better logic: Correctly calculates 1 extra day PER year after 5 years
  - Step-by-step reasoning: Clear breakdown of the calculation
  - Concise answer: Direct answer followed by detailed reasoning

  The Magic of DSPy:

  The optimized version:
  1. Includes reasoning steps from the training examples
  2. Handles the cap correctly (30 days maximum)
  3. Calculates bonus days properly (2 extra days for 7 years of service in 2025)
  4. Shows its work in a structured way

  This demonstrates how DSPy Bootstrap FewShot learns from your examples to:
  - Add Chain-of-Thought reasoning
  - Handle complex multi-step calculations
  - Apply business rules correctly
  - Format answers consistently

  Try it with the other complex examples - you'll see similar improvements!



  ===

  Fine tuning