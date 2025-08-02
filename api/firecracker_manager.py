"""
Firecracker-based secure code execution manager.
Provides fast microVM-based sandboxing for Python, Rust, and TypeScript.
"""

import asyncio
import json
import os
import tempfile
import time
import uuid
from pathlib import Path
from typing import Dict, Optional, List
import subprocess
import aiofiles
import logging
from dataclasses import dataclass
from enum import Enum
from security_config import SecurityLevel, security_manager

logger = logging.getLogger(__name__)

class Language(Enum):
    PYTHON = "python"
    RUST = "rust"
    TYPESCRIPT = "typescript"

@dataclass
class VMConfig:
    """Configuration for a Firecracker microVM"""
    vcpu_count: int = 1
    mem_size_mib: int = 64
    timeout_seconds: int = 10
    network_enabled: bool = False
    security_level: SecurityLevel = SecurityLevel.SANDBOX

@dataclass
class ExecutionResult:
    """Result of code execution in a microVM"""
    success: bool
    output: str
    error: Optional[str]
    execution_time: float
    vm_id: str

class FirecrackerVM:
    """Manages a single Firecracker microVM instance"""
    
    def __init__(self, vm_id: str, language: Language, config: VMConfig):
        self.vm_id = vm_id
        self.language = language
        self.config = config
        self.socket_path = f"/tmp/firecracker-{vm_id}.socket"
        self.process: Optional[subprocess.Popen] = None
        self.is_running = False
        self.created_at = time.time()
        
    async def start(self) -> bool:
        """Start the Firecracker microVM"""
        try:
            # Prepare VM configuration
            vm_config = {
                "boot-source": {
                    "kernel_image_path": f"/opt/firecracker/kernels/{self.language.value}/vmlinux",
                    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off"
                },
                "drives": [{
                    "drive_id": "rootfs",
                    "path_on_host": f"/opt/firecracker/rootfs/{self.language.value}/rootfs.ext4",
                    "is_root_device": True,
                    "is_read_only": False
                }],
                "machine-config": {
                    "vcpu_count": self.config.vcpu_count,
                    "mem_size_mib": self.config.mem_size_mib
                }
            }
            
            # Start Firecracker process
            cmd = [
                "firecracker",
                "--api-sock", self.socket_path,
                "--config-file", "/dev/stdin"
            ]
            
            self.process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Send configuration
            config_json = json.dumps(vm_config)
            self.process.stdin.write(config_json)
            self.process.stdin.close()
            
            # Wait for VM to be ready (simplified - in production use API calls)
            await asyncio.sleep(0.5)
            self.is_running = True
            return True
            
        except Exception as e:
            logger.error(f"Failed to start VM {self.vm_id}: {e}")
            return False
    
    async def execute_code(self, code: str) -> ExecutionResult:
        """Execute code in the microVM"""
        start_time = time.time()
        
        try:
            # Create temporary file with code
            code_file = f"/tmp/code_{self.vm_id}{self._get_file_extension()}"
            async with aiofiles.open(code_file, 'w') as f:
                await f.write(code)
            
            # Execute via VM (simplified - would use actual VM communication)
            # This is a placeholder for the actual VM execution
            cmd = self._get_execution_command(code_file)
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(),
                    timeout=self.config.timeout_seconds
                )
                
                execution_time = time.time() - start_time
                
                if process.returncode == 0:
                    return ExecutionResult(
                        success=True,
                        output=stdout.decode('utf-8'),
                        error=None,
                        execution_time=execution_time,
                        vm_id=self.vm_id
                    )
                else:
                    return ExecutionResult(
                        success=False,
                        output="",
                        error=stderr.decode('utf-8'),
                        execution_time=execution_time,
                        vm_id=self.vm_id
                    )
                    
            except asyncio.TimeoutError:
                process.kill()
                return ExecutionResult(
                    success=False,
                    output="",
                    error=f"Execution timed out after {self.config.timeout_seconds} seconds",
                    execution_time=time.time() - start_time,
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
        finally:
            # Cleanup
            try:
                os.unlink(code_file)
            except:
                pass
    
    async def stop(self):
        """Stop the microVM"""
        if self.process:
            self.process.terminate()
            try:
                # Use asyncio.to_thread to make the blocking wait() call async
                await asyncio.wait_for(
                    asyncio.to_thread(self.process.wait), 
                    timeout=5
                )
            except asyncio.TimeoutError:
                self.process.kill()
                # Wait synchronously for the kill to complete
                await asyncio.to_thread(self.process.wait)
        
        # Cleanup socket
        try:
            os.unlink(self.socket_path)
        except:
            pass
        
        self.is_running = False
    
    def _get_file_extension(self) -> str:
        extensions = {
            Language.PYTHON: ".py",
            Language.TYPESCRIPT: ".ts", 
            Language.RUST: ".rs"
        }
        return extensions[self.language]
    
    def _get_execution_command(self, file_path: str) -> List[str]:
        """Get command to execute code (placeholder for VM communication)"""
        commands = {
            Language.PYTHON: ["python3", file_path],
            Language.TYPESCRIPT: ["tsx", file_path],
            Language.RUST: ["sh", "-c", f"rustc {file_path} -o {file_path}.out && {file_path}.out"]
        }
        return commands[self.language]

class VMPool:
    """Manages a pool of Firecracker VMs for fast execution"""
    
    def __init__(self, pool_size: int = 3):
        self.pool_size = pool_size
        self.pools: Dict[Language, List[FirecrackerVM]] = {
            Language.PYTHON: [],
            Language.TYPESCRIPT: [],
            Language.RUST: []
        }
        self.vm_stats = {
            'total_created': 0,
            'total_destroyed': 0,
            'executions_count': 0,
            'pool_hits': 0,
            'pool_misses': 0,
            'by_language': {
                lang.value: {
                    'created': 0,
                    'destroyed': 0,
                    'executions': 0,
                    'pool_hits': 0,
                    'pool_misses': 0
                }
                for lang in Language
            }
        }
        self.active_vms: Dict[str, FirecrackerVM] = {}
        self.created_at = time.time()
        
    async def initialize(self):
        """Initialize VM pools for all languages"""
        logger.info("Initializing Firecracker VM pools...")
        
        for language in Language:
            for i in range(self.pool_size):
                vm = await self._create_vm(language)
                if vm:
                    self.pools[language].append(vm)
                    
        logger.info(f"VM pools initialized: {self._get_pool_stats()}")
    
    async def get_vm(self, language: Language, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> Optional[FirecrackerVM]:
        """Get an available VM from the pool"""
        pool = self.pools[language]
        
        if pool:
            vm = pool.pop(0)
            self.vm_stats['pool_hits'] += 1
            self.vm_stats['by_language'][language.value]['pool_hits'] += 1
            self.active_vms[vm.vm_id] = vm
            # Start replenishing the pool in the background
            asyncio.create_task(self._replenish_pool(language))
            return vm
        
        # If no VMs available, create one on demand
        self.vm_stats['pool_misses'] += 1
        self.vm_stats['by_language'][language.value]['pool_misses'] += 1
        vm = await self._create_vm(language)
        if vm:
            self.active_vms[vm.vm_id] = vm
        return vm
    
    async def return_vm(self, vm: FirecrackerVM):
        """Return a VM to the pool (or dispose if pool is full)"""
        language = vm.language
        
        # Remove from active VMs
        if vm.vm_id in self.active_vms:
            del self.active_vms[vm.vm_id]
        
        # Track execution
        self.vm_stats['executions_count'] += 1
        self.vm_stats['by_language'][language.value]['executions'] += 1
        
        if len(self.pools[language]) < self.pool_size:
            # Reset VM state and return to pool
            await self._reset_vm(vm)
            self.pools[language].append(vm)
        else:
            # Pool is full, dispose of the VM
            await vm.stop()
            self.vm_stats['total_destroyed'] += 1
            self.vm_stats['by_language'][language.value]['destroyed'] += 1
    
    async def _create_vm(self, language: Language) -> Optional[FirecrackerVM]:
        """Create and start a new VM"""
        try:
            vm_id = str(uuid.uuid4())[:8]
            config = VMConfig()
            vm = FirecrackerVM(vm_id, language, config)
            
            if await vm.start():
                self.vm_stats['total_created'] += 1
                self.vm_stats['by_language'][language.value]['created'] += 1
                return vm
            else:
                return None
                
        except Exception as e:
            logger.error(f"Failed to create VM for {language.value}: {e}")
            return None
    
    async def _reset_vm(self, vm: FirecrackerVM):
        """Reset VM to clean state (simplified - would use snapshots)"""
        # In a full implementation, this would restore from snapshot
        # For now, just a placeholder
        pass
    
    async def _replenish_pool(self, language: Language):
        """Replenish the VM pool in the background"""
        while len(self.pools[language]) < self.pool_size:
            vm = await self._create_vm(language)
            if vm:
                self.pools[language].append(vm)
            else:
                break
    
    def _get_pool_stats(self) -> Dict[str, int]:
        """Get current pool statistics"""
        return {
            lang.value: len(vms) 
            for lang, vms in self.pools.items()
        }
    
    def get_debug_info(self) -> Dict:
        """Get comprehensive debugging information about VM pools"""
        current_time = time.time()
        uptime = current_time - self.created_at
        
        pool_status = {}
        for lang, vms in self.pools.items():
            pool_status[lang.value] = {
                'available': len(vms),
                'target_size': self.pool_size,
                'vm_ids': [vm.vm_id for vm in vms],
                'vm_ages': [current_time - vm.created_at for vm in vms]
            }
        
        active_status = {
            'count': len(self.active_vms),
            'vms': {
                vm_id: {
                    'language': vm.language.value,
                    'age': current_time - vm.created_at,
                    'is_running': vm.is_running
                }
                for vm_id, vm in self.active_vms.items()
            }
        }
        
        return {
            'timestamp': current_time,
            'uptime_seconds': uptime,
            'pool_status': pool_status,
            'active_vms': active_status,
            'statistics': self.vm_stats,
            'health': {
                'total_pools': len(self.pools),
                'healthy_pools': sum(1 for vms in self.pools.values() if len(vms) > 0),
                'pool_utilization': {
                    lang.value: len(vms) / self.pool_size * 100
                    for lang, vms in self.pools.items()
                }
            }
        }
    
    async def shutdown(self):
        """Shutdown all VMs in the pools"""
        logger.info("Shutting down VM pools...")
        
        for language, pool in self.pools.items():
            for vm in pool:
                await vm.stop()
            pool.clear()

class FirecrackerExecutor:
    """Main executor class using Firecracker VMs"""
    
    def __init__(self, pool_size: int = 3):
        self.vm_pool = VMPool(pool_size)
        self.initialized = False
    
    async def initialize(self):
        """Initialize the Firecracker executor"""
        if not self.initialized:
            await self.vm_pool.initialize()
            self.initialized = True
    
    async def execute_code(self, code: str, language_str: str, timeout: int = 10, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> ExecutionResult:
        """Execute code using Firecracker microVMs"""
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
            # Update VM configuration based on security level
            vm_config_update = security_manager.get_vm_config_for_policy(security_level)
            if timeout != vm.config.timeout_seconds:
                vm.config.timeout_seconds = min(timeout, vm_config_update["timeout_seconds"])
            vm.config.mem_size_mib = min(vm.config.mem_size_mib, vm_config_update["mem_size_mib"])
            
            result = await vm.execute_code(code)
            return result
            
        finally:
            # Return VM to pool
            await self.vm_pool.return_vm(vm)
    
    async def shutdown(self):
        """Shutdown the executor"""
        await self.vm_pool.shutdown()
        self.initialized = False