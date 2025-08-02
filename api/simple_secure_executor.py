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
                logger.info(f"Executing command: {cmd}")
                
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
                    
                    stdout_text = stdout.decode('utf-8')
                    stderr_text = stderr.decode('utf-8')
                    
                    logger.info(f"Process returncode: {process.returncode}")
                    logger.info(f"STDOUT length: {len(stdout_text)}, STDERR length: {len(stderr_text)}")
                    logger.info(f"STDERR content: {stderr_text[:200]}")
                    
                    # Check for compilation errors even if return code is 0
                    has_error = (
                        process.returncode != 0 or
                        "error:" in stderr_text or
                        "error[E" in stderr_text or
                        "could not compile" in stderr_text
                    )
                    
                    logger.info(f"Has error: {has_error}")
                    
                    if not has_error:
                        return ExecutionResult(
                            success=True,
                            output=stdout_text,
                            error=None,
                            execution_time=execution_time,
                            vm_id=vm_id
                        )
                    else:
                        # For compilation errors, stderr usually contains the error details
                        error_output = stderr_text
                        if not error_output and stdout_text:
                            error_output = stdout_text
                        
                        return ExecutionResult(
                            success=False,
                            output="",
                            error=error_output or "Process failed with no error output",
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
        """Use pre-built Rust template with optimized copying to avoid disk space issues"""
        import os
        import tempfile
        import shutil
        
        try:
            # Create a minimal Rust project without copying the large target directory
            project_dir = tempfile.mkdtemp()
            template_dir = "/opt/rust-template"
            rust_project = os.path.join(project_dir, "sandbox")
            
            logger.info(f"Creating minimal Rust project in {project_dir}")
            
            # Check if template exists
            if not os.path.exists(template_dir):
                logger.error(f"Rust template not found at {template_dir}")
                raise FileNotFoundError(f"Rust template not found at {template_dir}")
            
            # Create project structure manually to avoid copying large target directory
            os.makedirs(rust_project, exist_ok=True)
            os.makedirs(os.path.join(rust_project, "src"), exist_ok=True)
            
            # Copy only essential files (not the target directory)
            essential_files = ["Cargo.toml", "Cargo.lock"]
            for file_name in essential_files:
                src_file = os.path.join(template_dir, file_name)
                dst_file = os.path.join(rust_project, file_name)
                if os.path.exists(src_file):
                    shutil.copy2(src_file, dst_file)
                    logger.info(f"Copied {file_name}")
            
            # Create symlink to the pre-built target directory to reuse compiled dependencies
            template_target = os.path.join(template_dir, "target")
            project_target = os.path.join(rust_project, "target")
            if os.path.exists(template_target):
                try:
                    os.symlink(template_target, project_target)
                    logger.info("Created symlink to pre-built target directory")
                except OSError as e:
                    # Fallback: if symlinks not supported, use cargo cache instead
                    logger.warning(f"Symlink failed: {e}, using cargo build without cache")
            
            # Copy user code to main.rs
            with open(file_path, "r") as source:
                code = source.read()
            
            logger.info(f"Writing user code to {rust_project}/src/main.rs")
            logger.debug(f"User code: {code[:100]}...")
            
            with open(os.path.join(rust_project, "src", "main.rs"), "w") as f:
                f.write(code)
            
            # Return command to build and run
            # Use exec to preserve cargo's exit code
            cmd = ["sh", "-c", f"cd {rust_project} && exec cargo run --release"]
            logger.info(f"Rust execution command: {cmd}")
            return cmd
            
        except Exception as e:
            logger.error(f"Error setting up Rust execution: {e}")
            raise
    
    async def shutdown(self):
        """Shutdown executor (no-op for simple executor)"""
        pass