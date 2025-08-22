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


{"asks": "Company policy: Employees get 15 vacation days/year plus 1 extra day per year of service after 5 years. Unused days carry over but cap at 30 total. Sarah started in 2018, used 12 days in 2023, and 8 days so far in 2024. Today is November 2024. Vacation days refresh every January", "question": "How many vacation days does Sarah have available for the rest of 2024, and how many will she have on January 1, 2025 if she doesn't use any more?"}
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

  ===============


  # Prompt Optimizer Service

A microservice for prompt optimization using DSPy.

## Features
- Multiple optimization strategies (Bootstrap Few-Shot, MIPRO, COPRO, Bootstrap Fine-tune)
- Full DSPy history capture
- Performance metrics evaluation
- Predictor export for production deployment

## API
See API documentation at http://localhost:8001/docs when running.

---

 How to Use It:

  1. Complete the optimization in the stepper UI
  2. Go to Results view
  3. Click the "Copy" button next to "Optimized Prompt"
  4. Paste it into any system (ChatGPT, Claude, your own app, etc.)
  5. Replace placeholders ({context}, {question}) with your actual values

  Important Notes:

  - The optimized prompt is self-contained - it includes all the examples and instructions
  - You can use it without DSPy - just standard string replacement for the placeholders
  - The prompt has been optimized for your specific task based on your training examples
  - All demonstrations are included (not limited to 3 - we fixed that earlier)

  The beauty is that DSPy has already done the hard work of finding the best examples and instructions. You just copy and use the result!


  -------

  https://github.com/anthropics/prompt-eng-interactive-tutorial
  https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver#improved-prompt


  https://x.com/mattpocockuk/status/1958179930262356032/photo/1


  Original prompt => what's werong

  eval 
  https://docs.anthropic.com/en/docs/test-and-evaluate/eval-tool#prompt-structure-for-evaluation


  ====

  voir comment c fait chez anthropic et tester plusieurs methode en meme temps => voir le resultat sous forme de tableau

  faire comme l'eval avec diff que j'avais commencé