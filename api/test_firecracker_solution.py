#!/usr/bin/env python3
"""
Quick test script for the Firecracker-based code execution solution.
Tests basic functionality, security validation, and performance.
"""

import asyncio
import json
import time
from typing import Dict, Any
import sys
import os

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from firecracker_manager import FirecrackerExecutor, Language
from security_config import security_manager, SecurityLevel

class FirecrackerTester:
    """Test suite for Firecracker code execution"""
    
    def __init__(self):
        self.executor = None
        self.test_results = []
    
    async def run_all_tests(self):
        """Run comprehensive test suite"""
        print("🧪 Starting Firecracker Code Execution Tests\n")
        
        # Test security validation
        await self.test_security_validation()
        
        # Test language support (if Firecracker is available)
        try:
            self.executor = FirecrackerExecutor(pool_size=1)
            await self.executor.initialize()
            
            await self.test_python_execution()
            await self.test_rust_execution()
            await self.test_typescript_execution()
            await self.test_security_levels()
            await self.test_performance()
            
        except Exception as e:
            print(f"⚠️  Firecracker not available, testing security validation only: {e}")
        
        # Print test summary
        self.print_test_summary()
    
    async def test_security_validation(self):
        """Test security policy validation"""
        print("🔒 Testing Security Validation...")
        
        test_cases = [
            {
                "name": "Safe Python code",
                "code": "print(sum(range(10)))",
                "language": "python",
                "level": SecurityLevel.SANDBOX,
                "should_pass": True
            },
            {
                "name": "Dangerous import",
                "code": "import os\nos.system('ls')",
                "language": "python", 
                "level": SecurityLevel.SANDBOX,
                "should_pass": False
            },
            {
                "name": "File operation",
                "code": "with open('/etc/passwd', 'r') as f: print(f.read())",
                "language": "python",
                "level": SecurityLevel.SANDBOX,
                "should_pass": False
            },
            {
                "name": "Safe Rust code",
                "code": "fn main() { println!(\"Hello World\"); }",
                "language": "rust",
                "level": SecurityLevel.SANDBOX,
                "should_pass": True
            },
            {
                "name": "Unsafe Rust block",
                "code": "fn main() { unsafe { println!(\"Unsafe!\"); } }",
                "language": "rust",
                "level": SecurityLevel.SANDBOX,
                "should_pass": False
            },
            {
                "name": "Safe TypeScript",
                "code": "console.log(Math.PI);",
                "language": "typescript",
                "level": SecurityLevel.SANDBOX,
                "should_pass": True
            },
            {
                "name": "Dangerous Node.js require",
                "code": "const fs = require('fs'); fs.readFileSync('/etc/passwd');",
                "language": "typescript",
                "level": SecurityLevel.SANDBOX,
                "should_pass": False
            }
        ]
        
        for test_case in test_cases:
            is_valid, violations = security_manager.validate_code(
                test_case["code"],
                test_case["language"],
                test_case["level"]
            )
            
            passed = (is_valid == test_case["should_pass"])
            status = "✅ PASS" if passed else "❌ FAIL"
            
            print(f"  {status} {test_case['name']}")
            if not passed:
                print(f"    Expected: {test_case['should_pass']}, Got: {is_valid}")
                if violations:
                    print(f"    Violations: {violations}")
            
            self.test_results.append({
                "test": test_case["name"],
                "passed": passed,
                "category": "security"
            })
        
        print()
    
    async def test_python_execution(self):
        """Test Python code execution"""
        print("🐍 Testing Python Execution...")
        
        test_cases = [
            {
                "name": "Basic arithmetic",
                "code": "print(2 + 2)",
                "expected": "4"
            },
            {
                "name": "List comprehension",
                "code": "print([x*2 for x in range(5)])",
                "expected": "[0, 2, 4, 6, 8]"
            },
            {
                "name": "Math operations",
                "code": "import math\nprint(math.sqrt(16))",
                "expected": "4.0"
            }
        ]
        
        await self._run_execution_tests(test_cases, "python")
    
    async def test_rust_execution(self):
        """Test Rust code execution"""
        print("🦀 Testing Rust Execution...")
        
        test_cases = [
            {
                "name": "Hello World",
                "code": "fn main() { println!(\"Hello Rust\"); }",
                "expected": "Hello Rust"
            },
            {
                "name": "Simple calculation",
                "code": "fn main() { let x = 5; let y = 10; println!(\"{}\", x + y); }",
                "expected": "15"
            }
        ]
        
        await self._run_execution_tests(test_cases, "rust")
    
    async def test_typescript_execution(self):
        """Test TypeScript code execution"""
        print("📘 Testing TypeScript Execution...")
        
        test_cases = [
            {
                "name": "Console output",
                "code": "console.log('Hello TypeScript');",
                "expected": "Hello TypeScript"
            },
            {
                "name": "Type annotations",
                "code": "const x: number = 42; console.log(x);",
                "expected": "42"
            }
        ]
        
        await self._run_execution_tests(test_cases, "typescript")
    
    async def test_security_levels(self):
        """Test different security levels"""
        print("🔐 Testing Security Levels...")
        
        code = "import json\nprint(json.dumps({'test': 123}))"
        
        levels = [SecurityLevel.SANDBOX, SecurityLevel.RESTRICTED, SecurityLevel.STANDARD]
        
        for level in levels:
            try:
                result = await self.executor.execute_code(code, "python", 10, level)
                status = "✅ PASS" if result.success else "❌ FAIL"
                print(f"  {status} {level.value} level - JSON import")
                
                self.test_results.append({
                    "test": f"{level.value} level execution",
                    "passed": result.success,
                    "category": "security_levels"
                })
            except Exception as e:
                print(f"  ❌ FAIL {level.value} level - Error: {e}")
                self.test_results.append({
                    "test": f"{level.value} level execution",
                    "passed": False,
                    "category": "security_levels"
                })
        
        print()
    
    async def test_performance(self):
        """Test execution performance"""
        print("⚡ Testing Performance...")
        
        code = "print(sum(range(1000)))"
        times = []
        
        # Run multiple executions to measure performance
        for i in range(3):
            start_time = time.time()
            result = await self.executor.execute_code(code, "python", 10)
            end_time = time.time()
            
            execution_time = end_time - start_time
            times.append(execution_time)
            
            status = "✅ PASS" if result.success and execution_time < 2.0 else "❌ FAIL"
            print(f"  {status} Execution {i+1}: {execution_time:.3f}s")
        
        avg_time = sum(times) / len(times)
        performance_pass = avg_time < 1.0  # Should be under 1 second on average
        
        print(f"  📊 Average execution time: {avg_time:.3f}s")
        print(f"  🎯 Performance target (<1.0s): {'✅ PASS' if performance_pass else '❌ FAIL'}")
        
        self.test_results.append({
            "test": "Performance benchmark",
            "passed": performance_pass,
            "category": "performance"
        })
        
        print()
    
    async def _run_execution_tests(self, test_cases: list, language: str):
        """Helper to run execution test cases"""
        for test_case in test_cases:
            try:
                result = await self.executor.execute_code(
                    test_case["code"], 
                    language, 
                    10,
                    SecurityLevel.RESTRICTED
                )
                
                output_match = test_case["expected"] in result.output.strip()
                passed = result.success and output_match
                status = "✅ PASS" if passed else "❌ FAIL"
                
                print(f"  {status} {test_case['name']}")
                if not passed:
                    print(f"    Expected: {test_case['expected']}")
                    print(f"    Got: {result.output.strip()}")
                    if result.error:
                        print(f"    Error: {result.error}")
                
                self.test_results.append({
                    "test": f"{language} - {test_case['name']}",
                    "passed": passed,
                    "category": f"{language}_execution"
                })
                
            except Exception as e:
                print(f"  ❌ FAIL {test_case['name']} - Error: {e}")
                self.test_results.append({
                    "test": f"{language} - {test_case['name']}",
                    "passed": False,
                    "category": f"{language}_execution"
                })
        
        print()
    
    def print_test_summary(self):
        """Print comprehensive test summary"""
        print("📋 Test Summary")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["passed"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        # Group by category
        categories = {}
        for result in self.test_results:
            category = result["category"]
            if category not in categories:
                categories[category] = {"passed": 0, "total": 0}
            categories[category]["total"] += 1
            if result["passed"]:
                categories[category]["passed"] += 1
        
        print("Results by Category:")
        for category, stats in categories.items():
            success_rate = (stats["passed"] / stats["total"]) * 100
            print(f"  {category}: {stats['passed']}/{stats['total']} ({success_rate:.1f}%)")
        
        print()
        
        # Show failures
        failures = [r for r in self.test_results if not r["passed"]]
        if failures:
            print("Failed Tests:")
            for failure in failures:
                print(f"  ❌ {failure['test']}")
        else:
            print("🎉 All tests passed!")
        
    async def cleanup(self):
        """Cleanup resources"""
        if self.executor:
            await self.executor.shutdown()

async def main():
    """Main test runner"""
    tester = FirecrackerTester()
    
    try:
        await tester.run_all_tests()
    except KeyboardInterrupt:
        print("\n⚠️  Tests interrupted by user")
    except Exception as e:
        print(f"\n💥 Test runner error: {e}")
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    asyncio.run(main())