# Code Execution API

A FastAPI service that provides secure code execution for Python, TypeScript, and Rust in isolated environments.

## Features

- **Multi-language support**: Python, TypeScript, and Rust
- **Security-first**: Sandboxed execution with Docker containers
- **Resource limits**: Memory and CPU constraints to prevent abuse
- **Network isolation**: Containers run without network access
- **Input validation**: Blocks potentially dangerous operations
- **CORS enabled**: Works seamlessly with web frontends

## Quick Start

### Using Docker Compose (Recommended)

```bash
cd api
docker-compose up -d
```

The API will be available at `http://localhost:8000`

### Manual Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Install runtime dependencies:
   - Python 3.11+
   - Node.js 18+ with TypeScript
   - Rust toolchain
   - Docker (for containerized execution)

3. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### POST /execute

Execute code in the specified language.

**Request:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "timeout": 10
}
```

**Response:**
```json
{
  "output": "Hello, World!\n",
  "error": null,
  "execution_time": 0.123,
  "success": true
}
```

### GET /health

Health check endpoint that returns API status and Docker availability.

### GET /

Root endpoint with API information and supported languages.

## Security Features

- **Input validation**: Code length limits and dangerous pattern detection
- **Resource limits**: 128MB memory, 50% CPU quota per execution
- **Network isolation**: Containers cannot access external networks
- **Timeout protection**: Configurable execution timeouts
- **Temporary files**: All code files are automatically cleaned up

## Supported Languages

- **Python**: Executes with Python 3.11
- **TypeScript**: Compiled and executed with ts-node
- **Rust**: Compiled with rustc and executed

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Frontend API base URL (default: http://localhost:8000)

## Integration with CodeSandbox

The API is designed to work seamlessly with the CodeSandbox component. Simply set the `NEXT_PUBLIC_API_URL` environment variable in your Next.js application to point to your API server.

## Development

### Running Tests

```bash
pytest tests/
```

### Linting

```bash
black main.py
flake8 main.py
```

### Adding New Languages

1. Add language to `images` dictionary in `CodeExecutor`
2. Add file extension mapping in `_get_file_extension`
3. Add execution command in `_get_execution_command` and `_get_subprocess_command`
4. Update dangerous patterns list if needed

## Production Deployment

For production deployment:

1. Use a proper ASGI server like Gunicorn with Uvicorn workers
2. Set up proper logging and monitoring
3. Configure firewall rules to restrict API access
4. Use a reverse proxy (nginx) for SSL termination
5. Implement rate limiting
6. Consider using a dedicated execution service for enhanced security

## Troubleshooting

- **Docker not available**: The API falls back to subprocess execution
- **Permission denied**: Ensure Docker socket has proper permissions
- **Out of memory**: Increase container memory limits in the code
- **Timeout errors**: Increase the timeout parameter in requests