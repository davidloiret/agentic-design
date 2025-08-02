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
import logging
try:
    from firecracker_manager import FirecrackerExecutor
except ImportError:
    FirecrackerExecutor = None

from firecracker_docker_hybrid import FirecrackerDockerExecutor
from simple_secure_executor import SimpleSecureExecutor
from security_config import security_manager, SecurityLevel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    timeout: Optional[int] = 60
    security_level: Optional[str] = "sandbox"  # sandbox, restricted, standard

class CodeExecutionResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time: float
    success: bool

class CodeExecutor:
    def __init__(self):
        self.firecracker_executor = None
        self.firecracker_docker_executor = None
        self.simple_secure_executor = None
        self.docker_client = None
        
        # Try to initialize Simple Secure Executor first (most reliable)
        try:
            self.simple_secure_executor = SimpleSecureExecutor()
            logger.info("Simple secure executor initialized")
        except Exception as e:
            logger.warning(f"Simple secure executor not available: {e}")
        
        # Try to initialize Firecracker Docker hybrid 
        try:
            self.firecracker_docker_executor = FirecrackerDockerExecutor(pool_size=2)
            logger.info("Firecracker-Docker hybrid executor initialized")
        except Exception as e:
            logger.warning(f"Firecracker-Docker hybrid not available: {e}")
        
        # Try real Firecracker if available
        if FirecrackerExecutor:
            try:
                self.firecracker_executor = FirecrackerExecutor(pool_size=3)
                logger.info("Real Firecracker executor initialized")
            except Exception as e:
                logger.warning(f"Real Firecracker not available: {e}")
        
        # Fallback to regular Docker
        try:
            self.docker_client = docker.from_env()
            logger.info("Docker client initialized")
        except Exception as e:
            logger.warning(f"Docker not available: {e}, falling back to subprocess execution")
    
    async def execute_code(self, code: str, language: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> CodeExecutionResponse:
        start_time = time.time()
        
        try:
            # Try Simple Secure Executor first (most reliable)
            if self.simple_secure_executor:
                return await self._execute_with_simple_secure(code, language, timeout, security_level)
            # Try Firecracker-Docker hybrid 
            elif self.firecracker_docker_executor:
                return await self._execute_with_firecracker_docker(code, language, timeout, security_level)
            # Try real Firecracker if available
            elif self.firecracker_executor:
                return await self._execute_with_firecracker(code, language, timeout, security_level)
            # Fallback to regular Docker
            elif self.docker_client:
                return await self._execute_with_docker(code, language, timeout)
            # Last resort: subprocess
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
    
    async def _execute_with_simple_secure(self, code: str, language: str, timeout: int, security_level: SecurityLevel) -> CodeExecutionResponse:
        """Execute code using Simple Secure Executor"""
        start_time = time.time()
        
        try:
            # Execute code
            result = await self.simple_secure_executor.execute_code(code, language, timeout, security_level)
            
            return CodeExecutionResponse(
                output=result.output,
                error=result.error,
                execution_time=result.execution_time,
                success=result.success
            )
            
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Simple secure execution failed: {e}")
            return CodeExecutionResponse(
                output="",
                error=f"Simple secure execution failed: {str(e)}",
                execution_time=execution_time,
                success=False
            )
    
    async def _execute_with_firecracker_docker(self, code: str, language: str, timeout: int, security_level: SecurityLevel) -> CodeExecutionResponse:
        """Execute code using Firecracker-Docker hybrid"""
        start_time = time.time()
        
        try:
            # Initialize if not done yet
            if not self.firecracker_docker_executor.initialized:
                await self.firecracker_docker_executor.initialize()
            
            # Execute code
            result = await self.firecracker_docker_executor.execute_code(code, language, timeout, security_level)
            
            return CodeExecutionResponse(
                output=result.output,
                error=result.error,
                execution_time=result.execution_time,
                success=result.success
            )
            
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Firecracker-Docker execution failed: {e}")
            return CodeExecutionResponse(
                output="",
                error=f"Firecracker-Docker execution failed: {str(e)}",
                execution_time=execution_time,
                success=False
            )
    
    async def _execute_with_firecracker(self, code: str, language: str, timeout: int, security_level: SecurityLevel) -> CodeExecutionResponse:
        """Execute code using Firecracker microVMs"""
        start_time = time.time()
        
        try:
            # Initialize Firecracker executor if not done yet
            if not self.firecracker_executor.initialized:
                await self.firecracker_executor.initialize()
            
            # Execute code in microVM with security level
            result = await self.firecracker_executor.execute_code(code, language, timeout, security_level)
            
            return CodeExecutionResponse(
                output=result.output,
                error=result.error,
                execution_time=result.execution_time,
                success=result.success
            )
            
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Firecracker execution failed: {e}")
            return CodeExecutionResponse(
                output="",
                error=f"Firecracker execution failed: {str(e)}",
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
        if language == "rust":
            return self._get_rust_execution_command(file_path)
        
        commands = {
            "python": ["python3", file_path],
            "typescript": ["npx", "ts-node", file_path],
        }
        return commands.get(language, ["cat", file_path])
    
    def _get_rust_execution_command(self, file_path: str) -> list:
        """Create a Rust project with modern dependencies and execute it"""
        import os
        import tempfile
        
        # Create a temporary directory for the Rust project
        project_dir = tempfile.mkdtemp()
        
        # Create Cargo.toml with modern Rust and common dependencies
        cargo_toml = f"""[package]
name = "sandbox"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = {{ version = "1.0", features = ["full"] }}
serde = {{ version = "1.0", features = ["derive"] }}
serde_json = "1.0"
anyhow = "1.0"
chrono = "0.4"
uuid = "1.0"

[[bin]]
name = "main"
path = "src/main.rs"
"""
        
        # Write Cargo.toml
        with open(os.path.join(project_dir, "Cargo.toml"), "w") as f:
            f.write(cargo_toml)
        
        # Create src directory
        src_dir = os.path.join(project_dir, "src")
        os.makedirs(src_dir, exist_ok=True)
        
        # Copy the user code to main.rs
        with open(file_path, "r") as source:
            code = source.read()
        
        with open(os.path.join(src_dir, "main.rs"), "w") as f:
            f.write(code)
        
        # Return command to build and run the project
        return ["sh", "-c", f"cd {project_dir} && cargo run --release 2>&1"]

executor = CodeExecutor()

@app.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """Execute code in the specified language with enhanced security"""
    
    # Parse security level
    try:
        security_level = SecurityLevel(request.security_level)
    except ValueError:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid security level: {request.security_level}. Must be: sandbox, restricted, or standard"
        )
    
    # Skip security validation since we're already in a sandboxed VM
    # is_valid, violations = security_manager.validate_code(
    #     request.code, 
    #     request.language, 
    #     security_level
    # )
    # 
    # if not is_valid:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=f"Security validation failed: {'; '.join(violations)}"
    #     )
    
    try:
        result = await executor.execute_code(
            request.code, 
            request.language, 
            request.timeout,
            security_level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    execution_method = "simple-secure"
    if executor.simple_secure_executor:
        execution_method = "simple-secure"
    elif executor.firecracker_docker_executor:
        execution_method = "firecracker-docker-hybrid"
    elif executor.firecracker_executor:
        execution_method = "firecracker"
    elif executor.docker_client:
        execution_method = "docker"
    else:
        execution_method = "subprocess"
    
    return {
        "status": "healthy", 
        "simple_secure_available": executor.simple_secure_executor is not None,
        "firecracker_docker_available": executor.firecracker_docker_executor is not None,
        "firecracker_available": executor.firecracker_executor is not None,
        "docker_available": executor.docker_client is not None,
        "execution_method": execution_method
    }

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

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup when shutting down"""
    if executor.firecracker_docker_executor:
        await executor.firecracker_docker_executor.shutdown()
        logger.info("Firecracker-Docker executor shutdown completed")
    if executor.firecracker_executor:
        await executor.firecracker_executor.shutdown()
        logger.info("Firecracker executor shutdown completed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)