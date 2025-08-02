# Code Execution API - Usage Guide

This API provides secure code execution using Firecracker microVMs with comprehensive debugging capabilities.

## Base URL
```
http://localhost:8000
```

## Endpoints

### 1. Execute Code
**POST** `/execute`

Execute code in Python, TypeScript, or Rust with security isolation.

#### Request Body
```json
{
  "code": "string",     // Code to execute
  "language": "string", // "python", "typescript", or "rust"
  "timeout": 10         // Optional: timeout in seconds (default: 60)
}
```

#### Response
```json
{
  "output": "string",        // Program output
  "error": "string|null",    // Error message if any
  "execution_time": 0.123,   // Execution time in seconds
  "success": true            // Whether execution succeeded
}
```

#### Examples

**Python Code Execution:**
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello Python!\")\nfor i in range(3):\n    print(f\"Count: {i}\")",
    "language": "python",
    "timeout": 10
  }'
```

**TypeScript Code Execution:**
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const message: string = \"Hello TypeScript!\"; console.log(message); const numbers = [1,2,3]; numbers.forEach(n => console.log(`Number: ${n}`));",
    "language": "typescript",
    "timeout": 10
  }'
```

**Rust Code Execution:**
```bash
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "fn main() { println!(\"Hello Rust!\"); for i in 1..4 { println!(\"Count: {}\", i); } }",
    "language": "rust",
    "timeout": 15
  }'
```

**Using a JSON file (recommended for complex code):**
```bash
# Create a file with your code
cat > code.json << 'EOF'
{
  "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfor i in range(10):\n    print(f\"fib({i}) = {fibonacci(i)}\")",
  "language": "python",
  "timeout": 30
}
EOF

# Execute the code
curl -X POST http://localhost:8000/execute \
  -H "Content-Type: application/json" \
  -d @code.json
```

### 2. Health Check
**GET** `/health`

Check API health and execution method status.

```bash
curl -X GET http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "firecracker_available": true,
  "execution_method": "firecracker",
  "security_level": "sandbox"
}
```

### 3. VM Pool Debugging
**GET** `/debug/vm-pools`

Get comprehensive VM pool statistics and monitoring information.

```bash
curl -X GET http://localhost:8000/debug/vm-pools
```

**Formatted output:**
```bash
curl -X GET http://localhost:8000/debug/vm-pools | python3 -m json.tool
```

**Response includes:**
- **timestamp**: Current server timestamp
- **uptime_seconds**: How long the VM pools have been running
- **pool_status**: Available VMs per language with IDs and ages
- **active_vms**: Currently executing VMs
- **statistics**: Creation/destruction/execution counts by language
- **health**: Pool utilization and health metrics

### 4. API Information
**GET** `/`

Get API information and available endpoints.

```bash
curl -X GET http://localhost:8000/
```

## Security Configuration

Security level is configured via environment variables on the server side:

- **sandbox** (default): Maximum isolation, limited resources
- **restricted**: Moderate restrictions
- **standard**: Minimal restrictions, more resources

**Environment Variable:**
```bash
# Set security level (server-side configuration)
export SECURITY_LEVEL=sandbox  # or "restricted" or "standard"
```

**Note:** Security level cannot be modified by API requests for security reasons.

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad request (invalid language, security level, etc.)
- **500**: Internal server error
- **503**: Service unavailable (executor not initialized)

## Language-Specific Notes

### Python
- Supports Python 3.x
- Standard library available
- Print statements appear in output

### TypeScript
- Uses `tsx` runtime
- Modern ES features supported
- Console.log appears in output

### Rust
- Code must include `fn main()` entry point
- Compiled and executed automatically
- Println! macro output appears in output

## Monitoring VM Pools

Use the debug endpoint to monitor:
- VM pool sizes and utilization
- Execution statistics (hits vs misses)
- VM creation and destruction counts
- Active VM status

**Example monitoring script:**
```bash
#!/bin/bash
echo "VM Pool Status:"
curl -s http://localhost:8000/debug/vm-pools | python3 -c "
import json, sys
data = json.load(sys.stdin)['data']
print(f\"Uptime: {data['uptime_seconds']:.1f}s\")
print(f\"Total Executions: {data['statistics']['executions_count']}\")
for lang, stats in data['statistics']['by_language'].items():
    print(f\"{lang}: {stats['executions']} executions, {stats['pool_hits']} hits\")
"
```

## Performance Tips

1. **VM Pool Prewarming**: The first execution per language may be slower as VMs initialize
2. **Batch Operations**: Multiple executions reuse VMs from the pool for better performance
3. **Timeout Settings**: Set appropriate timeouts for long-running code
4. **Monitoring**: Use debug endpoint to monitor pool efficiency

## Docker Development

If running via docker-compose:
```bash
# Start services
docker-compose -f docker-compose.dev.yml up -d

# Check logs
docker-compose -f docker-compose.dev.yml logs firecracker-api

# Restart API only
docker-compose -f docker-compose.dev.yml restart firecracker-api
```

### Setting Security Level in Docker

Add environment variable to docker-compose.yml:
```yaml
services:
  firecracker-api:
    environment:
      - SECURITY_LEVEL=sandbox  # or "restricted" or "standard"
```

Or use .env file:
```bash
# .env file
SECURITY_LEVEL=sandbox
```