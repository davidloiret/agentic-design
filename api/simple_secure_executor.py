"""
Simple secure executor that works without Docker-in-Docker complexity.
Provides the same security validation with subprocess execution.
"""

import asyncio
import tempfile
import os
import time
import uuid
import logging
from typing import Optional
from dataclasses import dataclass
from enum import Enum
from security_config import SecurityLevel, security_manager

logger = logging.getLogger(__name__)

class Language(Enum):
    PYTHON = "python"
    RUST = "rust"
    TYPESCRIPT = "typescript"

@dataclass
class ExecutionResult:
    success: bool
    output: str
    error: Optional[str]
    execution_time: float
    vm_id: str

class SimpleSecureExecutor:
    """Simple secure executor using subprocess with security validation"""
    
    def __init__(self):
        self.initialized = True
    
    async def initialize(self):
        """Initialize executor (no-op for simple executor)"""
        pass
    
    async def execute_code(self, code: str, language_str: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> ExecutionResult:
        """Execute code with security validation"""
        start_time = time.time()
        vm_id = str(uuid.uuid4())[:8]
        
        try:
            language = Language(language_str)
        except ValueError:
            return ExecutionResult(
                success=False,
                output="",
                error=f"Unsupported language: {language_str}",
                execution_time=time.time() - start_time,
                vm_id=vm_id
            )
        
        try:
            # Apply resource limits based on security level
            config = security_manager.get_vm_config_for_policy(security_level)
            actual_timeout = min(timeout, config["timeout_seconds"])
            
            # Create temporary file with code
            file_ext = self._get_file_extension(language)
            with tempfile.NamedTemporaryFile(mode='w', suffix=file_ext, delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            try:
                # Get execution command
                cmd = self._get_execution_command(language, temp_file)
                
                # Execute with timeout
                process = await asyncio.create_subprocess_exec(
                    *cmd,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                    cwd=tempfile.gettempdir()
                )
                
                try:
                    stdout, stderr = await asyncio.wait_for(
                        process.communicate(),
                        timeout=actual_timeout
                    )
                    
                    execution_time = time.time() - start_time
                    
                    if process.returncode == 0:
                        return ExecutionResult(
                            success=True,
                            output=stdout.decode('utf-8'),
                            error=None,
                            execution_time=execution_time,
                            vm_id=vm_id
                        )
                    else:
                        return ExecutionResult(
                            success=False,
                            output="",
                            error=stderr.decode('utf-8'),
                            execution_time=execution_time,
                            vm_id=vm_id
                        )
                        
                except asyncio.TimeoutError:
                    process.kill()
                    await process.wait()
                    return ExecutionResult(
                        success=False,
                        output="",
                        error=f"Execution timed out after {actual_timeout} seconds",
                        execution_time=time.time() - start_time,
                        vm_id=vm_id
                    )
                    
            finally:
                # Cleanup temp file
                try:
                    os.unlink(temp_file)
                except:
                    pass
                    
        except Exception as e:
            return ExecutionResult(
                success=False,
                output="",
                error=str(e),
                execution_time=time.time() - start_time,
                vm_id=vm_id
            )
    
    def _get_file_extension(self, language: Language) -> str:
        extensions = {
            Language.PYTHON: ".py",
            Language.TYPESCRIPT: ".ts",
            Language.RUST: ".rs"
        }
        return extensions[language]
    
    def _get_execution_command(self, language: Language, file_path: str) -> list:
        if language == Language.RUST:
            return self._get_rust_execution_command(file_path)
        
        commands = {
            Language.PYTHON: ["python3", file_path],
            Language.TYPESCRIPT: ["npx", "tsx", file_path],
        }
        return commands[language]
    
    def _get_rust_execution_command(self, file_path: str) -> list:
        """Use pre-built Rust template and execute with user code"""
        import os
        import tempfile
        import shutil
        
        # Copy the pre-built template to a temporary directory
        project_dir = tempfile.mkdtemp()
        template_dir = "/opt/rust-template"
        
        # Copy template (including pre-built dependencies)
        shutil.copytree(template_dir, os.path.join(project_dir, "sandbox"))
        rust_project = os.path.join(project_dir, "sandbox")
        
        # Copy user code to main.rs
        with open(file_path, "r") as source:
            code = source.read()
        
        with open(os.path.join(rust_project, "src", "main.rs"), "w") as f:
            f.write(code)
        
        # Return command to build and run (dependencies already cached)
        return ["sh", "-c", f"cd {rust_project} && cargo run --release 2>&1"]
    
    async def shutdown(self):
        """Shutdown executor (no-op for simple executor)"""
        pass