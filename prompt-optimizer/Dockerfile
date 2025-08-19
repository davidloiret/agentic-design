FROM python:3.12-slim

WORKDIR /app

RUN pip install uv

COPY pyproject.toml README.md ./

RUN uv sync --no-dev

COPY src/ ./src/

EXPOSE 9090

ENV PYTHONPATH=/app

CMD ["uv", "run", "uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "9090"]