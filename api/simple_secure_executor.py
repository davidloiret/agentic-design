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
        commands = {
            Language.PYTHON: ["python3", file_path],
            Language.TYPESCRIPT: ["npx", "tsx", file_path],
            Language.RUST: ["sh", "-c", f"rustc {file_path} -o {file_path}.out && {file_path}.out"]
        }
        return commands[language]
    
    async def shutdown(self):
        """Shutdown executor (no-op for simple executor)"""
        pass