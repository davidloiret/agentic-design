"""
Security configuration and policies for Firecracker-based code execution.
Implements comprehensive security controls and resource limits.
"""

import re
from typing import List, Dict, Set
from dataclasses import dataclass
from enum import Enum

class SecurityLevel(Enum):
    SANDBOX = "sandbox"      # Maximum security, minimal access
    RESTRICTED = "restricted" # Limited access for basic operations
    STANDARD = "standard"    # Normal code execution

@dataclass
class ResourceLimits:
    """Resource limits for VM execution"""
    max_execution_time_seconds: int = 10
    max_memory_mb: int = 64
    max_cpu_percent: int = 50
    max_disk_io_mb: int = 10
    max_network_connections: int = 0  # 0 = no network access
    max_file_size_mb: int = 1
    max_open_files: int = 10

@dataclass
class SecurityPolicy:
    """Complete security policy for code execution"""
    security_level: SecurityLevel
    resource_limits: ResourceLimits
    allowed_imports: Set[str]
    blocked_patterns: List[str]
    allowed_file_extensions: Set[str]
    enable_network: bool = False
    enable_filesystem_write: bool = False

class SecurityManager:
    """Manages security policies and code validation"""
    
    def __init__(self):
        self.policies = self._create_default_policies()
        self.dangerous_patterns = self._get_dangerous_patterns()
    
    def _create_default_policies(self) -> Dict[SecurityLevel, SecurityPolicy]:
        """Create default security policies for each level"""
        
        # Sandbox policy - maximum security
        sandbox_policy = SecurityPolicy(
            security_level=SecurityLevel.SANDBOX,
            resource_limits=ResourceLimits(
                max_execution_time_seconds=5,
                max_memory_mb=32,
                max_cpu_percent=25,
                max_disk_io_mb=1,
                max_network_connections=0,
                max_file_size_mb=0.5,
                max_open_files=5
            ),
            allowed_imports={
                # Python safe imports
                "math", "random", "datetime", "json", "re", "string", 
                "collections", "itertools", "functools", "operator",
                # Safe standard library only
            },
            blocked_patterns=self._get_dangerous_patterns(),
            allowed_file_extensions={".py", ".ts", ".rs"},
            enable_network=False,
            enable_filesystem_write=False
        )
        
        # Restricted policy - limited access
        restricted_policy = SecurityPolicy(
            security_level=SecurityLevel.RESTRICTED,
            resource_limits=ResourceLimits(
                max_execution_time_seconds=10,
                max_memory_mb=64,
                max_cpu_percent=50,
                max_disk_io_mb=5,
                max_network_connections=0,
                max_file_size_mb=1,
                max_open_files=10
            ),
            allowed_imports={
                # Python
                "math", "random", "datetime", "json", "re", "string",
                "collections", "itertools", "functools", "operator",
                "urllib.parse", "base64", "hashlib", "hmac",
                # Limited data processing
                "csv", "xml.etree.ElementTree",
                # TypeScript/JavaScript - no additional restrictions in VM
                # Rust - controlled by VM environment
            },
            blocked_patterns=self._get_dangerous_patterns(),
            allowed_file_extensions={".py", ".ts", ".rs", ".json", ".txt"},
            enable_network=False,
            enable_filesystem_write=False
        )
        
        # Standard policy - normal execution
        standard_policy = SecurityPolicy(
            security_level=SecurityLevel.STANDARD,
            resource_limits=ResourceLimits(
                max_execution_time_seconds=30,
                max_memory_mb=128,
                max_cpu_percent=75,
                max_disk_io_mb=20,
                max_network_connections=0,  # Still no network by default
                max_file_size_mb=5,
                max_open_files=20
            ),
            allowed_imports=set(),  # Empty = allow all except blocked
            blocked_patterns=self._get_critical_dangerous_patterns(),
            allowed_file_extensions={".py", ".ts", ".rs", ".json", ".txt", ".csv"},
            enable_network=False,
            enable_filesystem_write=False
        )
        
        return {
            SecurityLevel.SANDBOX: sandbox_policy,
            SecurityLevel.RESTRICTED: restricted_policy,
            SecurityLevel.STANDARD: standard_policy
        }
    
    def _get_dangerous_patterns(self) -> List[str]:
        """Get comprehensive list of dangerous code patterns"""
        return [
            # Only the most critical dangerous operations
            r"import\s+os",
            r"import\s+subprocess", 
            r"\.system\s*\(",
            r"eval\s*\(",
            r"exec\s*\(",
            r"__import__\s*\(",
            
            # Rust critical patterns
            r"std::process",
            r"Command::new",
            
            # TypeScript/JavaScript critical patterns
            r"require\s*\(\s*['\"]child_process['\"]",
            r"\.exec\s*\(",
            r"\.spawn\s*\(",
        ]
    
    def _get_critical_dangerous_patterns(self) -> List[str]:
        """Get only the most critical dangerous patterns (for standard policy)"""
        return [
            r"import\s+os",
            r"import\s+subprocess",
            r"\.system\s*\(",
            r"eval\s*\(",
            r"exec\s*\(",
            r"__import__\s*\(",
            r"std::process",
            r"Command::new",
            r"require\s*\(\s*['\"]child_process['\"]",
            r"\.exec\s*\(",
            r"\.spawn\s*\(",
        ]
    
    def validate_code(self, code: str, language: str, security_level: SecurityLevel = SecurityLevel.SANDBOX) -> tuple[bool, List[str]]:
        """
        Validate code against security policies.
        Returns (is_valid, list_of_violations)
        """
        policy = self.policies[security_level]
        violations = []
        
        # Check code length
        if len(code) > 50000:  # 50KB limit
            violations.append("Code exceeds maximum length limit")
        
        # Check for dangerous patterns
        for pattern in policy.blocked_patterns:
            if re.search(pattern, code, re.IGNORECASE):
                violations.append(f"Dangerous pattern detected: {pattern}")
        
        # Language-specific validation
        if language == "python":
            violations.extend(self._validate_python_code(code, policy))
        elif language == "rust":
            violations.extend(self._validate_rust_code(code, policy))
        elif language == "typescript":
            violations.extend(self._validate_typescript_code(code, policy))
        
        return len(violations) == 0, violations
    
    def _validate_python_code(self, code: str, policy: SecurityPolicy) -> List[str]:
        """Python-specific validation"""
        violations = []
        
        # Check imports if policy has restrictions
        if policy.allowed_imports:
            import_pattern = r"^\s*(?:from\s+(\S+)\s+)?import\s+([^#\n]+)"
            for match in re.finditer(import_pattern, code, re.MULTILINE):
                module = match.group(1) or match.group(2).split()[0]
                if module not in policy.allowed_imports:
                    violations.append(f"Unauthorized import: {module}")
        
        return violations
    
    def _validate_rust_code(self, code: str, policy: SecurityPolicy) -> List[str]:
        """Rust-specific validation"""
        violations = []
        
        # Check for unsafe blocks
        if re.search(r"unsafe\s*{", code):
            violations.append("Unsafe Rust code blocks are not allowed")
        
        # Check for external crate usage
        if re.search(r"extern\s+crate", code):
            violations.append("External crate declarations are not allowed")
        
        return violations
    
    def _validate_typescript_code(self, code: str, policy: SecurityPolicy) -> List[str]:
        """TypeScript-specific validation"""
        violations = []
        
        # Check for Node.js specific requires that might be dangerous
        dangerous_requires = [
            "fs", "child_process", "cluster", "dgram", "dns", "net", 
            "os", "path", "process", "stream", "tls", "url", "worker_threads"
        ]
        
        for req in dangerous_requires:
            if re.search(rf"require\s*\(\s*['\"]{{req}}['\"]", code):
                violations.append(f"Dangerous require detected: {req}")
        
        return violations
    
    def get_vm_config_for_policy(self, security_level: SecurityLevel) -> dict:
        """Get Firecracker VM configuration based on security policy"""
        policy = self.policies[security_level]
        limits = policy.resource_limits
        
        return {
            "vcpu_count": 1,
            "mem_size_mib": limits.max_memory_mb,
            "timeout_seconds": limits.max_execution_time_seconds,
            "network_enabled": policy.enable_network,
            "cpu_template": "T2",  # Restrict CPU features
            "boot_args": f"console=ttyS0 reboot=k panic=1 pci=off mem={limits.max_memory_mb}M",
            "resource_limits": {
                "max_open_files": limits.max_open_files,
                "max_file_size": limits.max_file_size_mb * 1024 * 1024,
                "max_disk_io": limits.max_disk_io_mb * 1024 * 1024,
            }
        }

# Global security manager instance
security_manager = SecurityManager()