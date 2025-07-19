from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import os
import time
import json
import sys
from typing import Optional, Dict, Any
import docker
import asyncio
from pathlib import Path

app = FastAPI(title="Code Execution API", description="Execute code in multiple languages safely")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str
    language: str
    timeout: Optional[int] = 10

class CodeExecutionResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time: float
    success: bool

class CodeExecutor:
    def __init__(self):
        self.docker_client = None
        try:
            self.docker_client = docker.from_env()
        except:
            print("Docker not available, falling back to subprocess execution")
    
    async def execute_code(self, code: str, language: str, timeout: int = 10) -> CodeExecutionResponse:
        start_time = time.time()
        
        try:
            if self.docker_client:
                return await self._execute_with_docker(code, language, timeout)
            else:
                return await self._execute_with_subprocess(code, language, timeout)
        except Exception as e:
            execution_time = time.time() - start_time
            return CodeExecutionResponse(
                output="",
                error=str(e),
                execution_time=execution_time,
                success=False
            )
    
    async def _execute_with_docker(self, code: str, language: str, timeout: int) -> CodeExecutionResponse:
        start_time = time.time()
        
        # Docker image mapping
        images = {
            "python": "python:3.11-slim",
            "typescript": "node:18-slim",
            "rust": "rust:1.70-slim"
        }
        
        if language not in images:
            raise ValueError(f"Unsupported language: {language}")
        
        try:
            # Create temporary file with code
            with tempfile.NamedTemporaryFile(mode='w', suffix=self._get_file_extension(language), delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            # Prepare Docker command
            container_file = f"/app/code{self._get_file_extension(language)}"
            command = self._get_execution_command(language, container_file)
            
            # Run container
            container = self.docker_client.containers.run(
                images[language],
                command=command,
                volumes={temp_file: {'bind': container_file, 'mode': 'ro'}},
                working_dir='/app',
                detach=True,
                mem_limit='128m',
                cpu_period=100000,
                cpu_quota=50000,
                network_disabled=True,
                remove=True
            )
            
            # Wait for completion with timeout
            try:
                result = container.wait(timeout=timeout)
                logs = container.logs().decode('utf-8')
                
                execution_time = time.time() - start_time
                
                if result['StatusCode'] == 0:
                    return CodeExecutionResponse(
                        output=logs,
                        execution_time=execution_time,
                        success=True
                    )
                else:
                    return CodeExecutionResponse(
                        output="",
                        error=logs,
                        execution_time=execution_time,
                        success=False
                    )
            except:
                container.kill()
                raise TimeoutError(f"Execution timed out after {timeout} seconds")
                
        finally:
            if 'temp_file' in locals():
                os.unlink(temp_file)
    
    async def _execute_with_subprocess(self, code: str, language: str, timeout: int) -> CodeExecutionResponse:
        start_time = time.time()
        
        try:
            with tempfile.NamedTemporaryFile(mode='w', suffix=self._get_file_extension(language), delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            command = self._get_subprocess_command(language, temp_file)
            
            process = await asyncio.create_subprocess_exec(
                *command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=tempfile.gettempdir()
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(), 
                    timeout=timeout
                )
                
                execution_time = time.time() - start_time
                
                if process.returncode == 0:
                    return CodeExecutionResponse(
                        output=stdout.decode('utf-8'),
                        execution_time=execution_time,
                        success=True
                    )
                else:
                    return CodeExecutionResponse(
                        output="",
                        error=stderr.decode('utf-8'),
                        execution_time=execution_time,
                        success=False
                    )
            except asyncio.TimeoutError:
                process.kill()
                raise TimeoutError(f"Execution timed out after {timeout} seconds")
                
        finally:
            if 'temp_file' in locals():
                os.unlink(temp_file)
    
    def _get_file_extension(self, language: str) -> str:
        extensions = {
            "python": ".py",
            "typescript": ".ts",
            "rust": ".rs"
        }
        return extensions.get(language, ".txt")
    
    def _get_execution_command(self, language: str, file_path: str) -> list:
        commands = {
            "python": ["python", file_path],
            "typescript": ["sh", "-c", f"npm install -g typescript ts-node && ts-node {file_path}"],
            "rust": ["sh", "-c", f"rustc {file_path} -o /app/output && /app/output"]
        }
        return commands.get(language, ["cat", file_path])
    
    def _get_subprocess_command(self, language: str, file_path: str) -> list:
        commands = {
            "python": ["python3", file_path],
            "typescript": ["npx", "ts-node", file_path],
            "rust": ["sh", "-c", f"rustc {file_path} -o {file_path}.out && {file_path}.out"]
        }
        return commands.get(language, ["cat", file_path])

executor = CodeExecutor()

@app.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """Execute code in the specified language"""
    
    # Basic security checks
    if len(request.code) > 10000:
        raise HTTPException(status_code=400, detail="Code too long (max 10000 characters)")
    
    # Check for potentially dangerous operations
    dangerous_patterns = [
        "import os", "import subprocess", "import sys", "eval(", "exec(",
        "__import__", "open(", "file(", "input(", "raw_input(",
        "std::process", "std::fs", "std::env", "Command::new",
        "require('fs')", "require('child_process')", "require('os')",
        "process.exit", "process.env"
    ]
    
    for pattern in dangerous_patterns:
        if pattern in request.code:
            raise HTTPException(
                status_code=400, 
                detail=f"Potentially dangerous operation detected: {pattern}"
            )
    
    try:
        result = await executor.execute_code(
            request.code, 
            request.language, 
            request.timeout
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "docker_available": executor.docker_client is not None}

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Code Execution API",
        "version": "1.0.0",
        "supported_languages": ["python", "typescript", "rust"],
        "endpoints": {
            "execute": "POST /execute - Execute code",
            "health": "GET /health - Health check"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)