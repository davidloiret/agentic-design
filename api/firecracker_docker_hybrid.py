"""
Hybrid implementation: Firecracker API with Docker backend for testing.
This provides the same interface but uses Docker containers for simplicity.
"""

import asyncio
import docker
import tempfile
import os
import time
import uuid
import logging
from typing import Dict, Optional, List
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

class FirecrackerDockerVM:
    """Docker-based VM that mimics Firecracker behavior"""
    
    def __init__(self, vm_id: str, language: Language, security_level: SecurityLevel):
        self.vm_id = vm_id
        self.language = language
        self.security_level = security_level
        try:
            self.docker_client = docker.DockerClient(base_url='unix://var/run/docker.sock')
        except Exception:
            try:
                self.docker_client = docker.from_env()
            except Exception:
                raise RuntimeError("Cannot connect to Docker daemon")
        self.container = None
        self.created_at = time.time()
        
    async def start(self) -> bool:
        """Start the Docker container (simulating VM start)"""
        try:
            # Get security-aware resource limits
            config = security_manager.get_vm_config_for_policy(self.security_level)
            
            # Docker image mapping
            images = {
                Language.PYTHON: "python:3.11-alpine",
                Language.TYPESCRIPT: "node:18-alpine", 
                Language.RUST: "rust:1.70-alpine"
            }
            
            # Create container with security limits
            self.container = self.docker_client.containers.create(
                images[self.language],
                command="sleep 300",  # Keep alive for 5 minutes
                name=f"firecracker-vm-{self.vm_id}",
                mem_limit=f"{config['mem_size_mib']}m",
                cpu_period=100000,
                cpu_quota=50000,  # 50% CPU limit
                network_disabled=not config.get('network_enabled', False),
                detach=True,
                remove=True,
                working_dir="/tmp"
            )
            
            self.container.start()
            
            # Install TypeScript if needed
            if self.language == Language.TYPESCRIPT:
                self.container.exec_run("npm install -g typescript ts-node")
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to start VM {self.vm_id}: {e}")
            return False
    
    async def execute_code(self, code: str) -> ExecutionResult:
        """Execute code in the container"""
        start_time = time.time()
        
        try:
            # Create code file in container
            file_ext = self._get_file_extension()
            code_file = f"/tmp/code_{self.vm_id}{file_ext}"
            
            # Write code to container
            exec_result = self.container.exec_run(
                f"sh -c 'cat > {code_file}'",
                stdin=True
            )
            exec_result._response.send(code.encode())
            exec_result._response.close()
            
            # Execute code
            cmd = self._get_execution_command(code_file)
            exec_result = self.container.exec_run(
                cmd,
                stdout=True,
                stderr=True
            )
            
            execution_time = time.time() - start_time
            
            if exec_result.exit_code == 0:
                return ExecutionResult(
                    success=True,
                    output=exec_result.output.decode('utf-8'),
                    error=None,
                    execution_time=execution_time,
                    vm_id=self.vm_id
                )
            else:
                return ExecutionResult(
                    success=False,
                    output="",
                    error=exec_result.output.decode('utf-8'),
                    execution_time=execution_time,
                    vm_id=self.vm_id
                )
                
        except Exception as e:
            return ExecutionResult(
                success=False,
                output="",
                error=str(e),
                execution_time=time.time() - start_time,
                vm_id=self.vm_id
            )
    
    async def stop(self):
        """Stop the container"""
        if self.container:
            try:
                self.container.stop(timeout=5)
                self.container.remove()
            except:
                pass
    
    def _get_file_extension(self) -> str:
        extensions = {
            Language.PYTHON: ".py",
            Language.TYPESCRIPT: ".ts",
            Language.RUST: ".rs"
        }
        return extensions[self.language]
    
    def _get_execution_command(self, file_path: str) -> str:
        commands = {
            Language.PYTHON: f"python3 {file_path}",
            Language.TYPESCRIPT: f"npx ts-node {file_path}",
            Language.RUST: f"rustc {file_path} -o /tmp/program && /tmp/program"
        }
        return commands[self.language]

class FirecrackerDockerPool:
    """Pool manager for Docker-based VMs"""
    
    def __init__(self, pool_size: int = 2):
        self.pool_size = pool_size
        self.pools: Dict[Language, List[FirecrackerDockerVM]] = {
            Language.PYTHON: [],
            Language.TYPESCRIPT: [],
            Language.RUST: []
        }
        
    async def initialize(self):
        """Initialize VM pools"""
        logger.info("Initializing Firecracker-Docker VM pools...")
        
        for language in Language:
            for i in range(self.pool_size):
                vm = await self._create_vm(language, SecurityLevel.SANDBOX)
                if vm:
                    self.pools[language].append(vm)
                    
        logger.info(f"VM pools initialized: {self._get_pool_stats()}")
    
    async def get_vm(self, language: Language, security_level: SecurityLevel) -> Optional[FirecrackerDockerVM]:
        """Get a VM from pool or create new one"""
        pool = self.pools[language]
        
        if pool:
            vm = pool.pop(0)
            # Update security level
            vm.security_level = security_level
            # Replenish pool in background
            asyncio.create_task(self._replenish_pool(language))
            return vm
        
        # Create on demand
        return await self._create_vm(language, security_level)
    
    async def return_vm(self, vm: FirecrackerDockerVM):
        """Return VM to pool"""
        language = vm.language
        
        if len(self.pools[language]) < self.pool_size:
            self.pools[language].append(vm)
        else:
            await vm.stop()
    
    async def _create_vm(self, language: Language, security_level: SecurityLevel) -> Optional[FirecrackerDockerVM]:
        """Create new VM"""
        try:
            vm_id = str(uuid.uuid4())[:8]
            vm = FirecrackerDockerVM(vm_id, language, security_level)
            
            if await vm.start():
                return vm
            else:
                return None
                
        except Exception as e:
            logger.error(f"Failed to create VM for {language.value}: {e}")
            return None
    
    async def _replenish_pool(self, language: Language):
        """Replenish pool in background"""
        while len(self.pools[language]) < self.pool_size:
            vm = await self._create_vm(language, SecurityLevel.SANDBOX)
            if vm:
                self.pools[language].append(vm)
            else:
                break
    
    def _get_pool_stats(self) -> Dict[str, int]:
        return {lang.value: len(vms) for lang, vms in self.pools.items()}
    
    async def shutdown(self):
        """Shutdown all VMs"""
        for language, pool in self.pools.items():
            for vm in pool:
                await vm.stop()
            pool.clear()

class FirecrackerDockerExecutor:
    """Main executor using Docker backend with Firecracker API"""
    
    def __init__(self, pool_size: int = 2):
        self.vm_pool = FirecrackerDockerPool(pool_size)
        self.initialized = False
    
    async def initialize(self):
        """Initialize executor"""
        if not self.initialized:
            await self.vm_pool.initialize()
            self.initialized = True
    
    async def execute_code(self, code: str, language_str: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> ExecutionResult:
        """Execute code with security validation"""
        if not self.initialized:
            await self.initialize()
        
        try:
            language = Language(language_str)
        except ValueError:
            raise ValueError(f"Unsupported language: {language_str}")
        
        vm = await self.vm_pool.get_vm(language, security_level)
        if not vm:
            raise RuntimeError(f"Could not obtain VM for {language_str}")
        
        try:
            result = await vm.execute_code(code)
            return result
        finally:
            await self.vm_pool.return_vm(vm)
    
    async def shutdown(self):
        """Shutdown executor"""
        await self.vm_pool.shutdown()
        self.initialized = False