#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Callable, Literal, Optional, Tuple
from enum import Enum
import re

class Severity(Enum):
    LOW = "low"
    MEDIUM = "medium" 
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class ConstitutionalPrinciple:
    name: str
    rule: str
    severity: Severity
    check_function: Callable[[str, str], bool]
    suggestion: str = ""

@dataclass
class SafetyCheck:
    principle: str
    passed: bool
    reason: Optional[str] = None
    suggestion: Optional[str] = None
    confidence: float = 1.0

class ConstitutionalAI:
    """
    Constitutional AI implementation with built-in ethical constraints.
    """
    
    def __init__(self):
        self.principles: List[ConstitutionalPrinciple] = []
        self._initialize_default_principles()
    
    def _initialize_default_principles(self):
        """Initialize default constitutional principles."""
        
        # Safety principles
        self.add_principle(ConstitutionalPrinciple(
            name="No Harmful Instructions",
            rule="Must not provide instructions that could cause physical harm",
            severity=Severity.CRITICAL,
            check_function=self._check_harmful_content,
            suggestion="Provide educational information instead"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="No Financial Advice",
            rule="Must not provide specific financial investment advice",
            severity=Severity.HIGH,
            check_function=self._check_financial_advice,
            suggestion="Suggest consulting a qualified financial advisor"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="No Medical Diagnosis",
            rule="Must not provide medical diagnoses or treatment recommendations",
            severity=Severity.HIGH,
            check_function=self._check_medical_advice,
            suggestion="Recommend consulting a healthcare professional"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="Respectful Communication",
            rule="Must maintain respectful and inclusive language",
            severity=Severity.MEDIUM,
            check_function=self._check_respectful_language,
            suggestion="Use more respectful and constructive language"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="No Illegal Activities",
            rule="Must not provide guidance on illegal activities",
            severity=Severity.CRITICAL,
            check_function=self._check_illegal_content,
            suggestion="Provide information about legal alternatives"
        ))
        
        self.add_principle(ConstitutionalPrinciple(
            name="Privacy Protection",
            rule="Must not request or expose personal information",
            severity=Severity.HIGH,
            check_function=self._check_privacy_violation,
            suggestion="Respect privacy and ask for general information only"
        ))
    
    def add_principle(self, principle: ConstitutionalPrinciple):
        """Add a new constitutional principle."""
        self.principles.append(principle)
    
    def _check_harmful_content(self, input_text: str, output_text: str) -> bool:
        """Check for potentially harmful content."""
        harmful_keywords = [
            'explosive', 'bomb', 'poison', 'weapon', 'kill', 'murder', 
            'suicide', 'self-harm', 'violence', 'assault'
        ]
        
        input_lower = input_text.lower()
        output_lower = output_text.lower()
        
        # Check if input asks for harmful content and output provides it
        input_harmful = any(keyword in input_lower for keyword in harmful_keywords)
        output_harmful = any(keyword in output_lower for keyword in harmful_keywords)
        
        # Also check for instruction patterns
        instruction_patterns = [
            r'how to make.*explosive',
            r'steps to.*harm',
            r'instructions.*weapon'
        ]
        
        has_harmful_instructions = any(
            re.search(pattern, output_lower) for pattern in instruction_patterns
        )
        
        return not (input_harmful and (output_harmful or has_harmful_instructions))
    
    def _check_financial_advice(self, input_text: str, output_text: str) -> bool:
        """Check for specific financial advice."""
        financial_advice_patterns = [
            r'buy stock',
            r'invest in.*stock',
            r'guaranteed return',
            r'you should invest',
            r'i recommend buying',
            r'financial advice'
        ]
        
        output_lower = output_text.lower()
        return not any(re.search(pattern, output_lower) for pattern in financial_advice_patterns)
    
    def _check_medical_advice(self, input_text: str, output_text: str) -> bool:
        """Check for medical advice or diagnosis."""
        medical_patterns = [
            r'you have.*disease',
            r'you are.*sick',
            r'take.*medication',
            r'diagnosis.*is',
            r'medical advice',
            r'you should take.*pills'
        ]
        
        output_lower = output_text.lower()
        return not any(re.search(pattern, output_lower) for pattern in medical_patterns)
    
    def _check_respectful_language(self, input_text: str, output_text: str) -> bool:
        """Check for respectful and inclusive language."""
        disrespectful_terms = [
            'stupid', 'idiot', 'moron', 'dumb', 'retarded',
            'worthless', 'pathetic', 'loser'
        ]
        
        output_lower = output_text.lower()
        return not any(term in output_lower for term in disrespectful_terms)
    
    def _check_illegal_content(self, input_text: str, output_text: str) -> bool:
        """Check for guidance on illegal activities."""
        illegal_keywords = [
            'hack', 'crack', 'pirate', 'steal', 'fraud',
            'counterfeit', 'illegal download', 'break into'
        ]
        
        illegal_patterns = [
            r'how to.*hack',
            r'steps to.*steal',
            r'guide.*illegal'
        ]
        
        output_lower = output_text.lower()
        
        has_illegal_keywords = any(keyword in output_lower for keyword in illegal_keywords)
        has_illegal_patterns = any(re.search(pattern, output_lower) for pattern in illegal_patterns)
        
        return not (has_illegal_keywords or has_illegal_patterns)
    
    def _check_privacy_violation(self, input_text: str, output_text: str) -> bool:
        """Check for privacy violations."""
        privacy_requests = [
            'give me your password',
            'what is your ssn',
            'share personal information',
            'tell me private details'
        ]
        
        privacy_exposure = [
            'my password is',
            'my ssn is',
            'personal information:',
            'private details:'
        ]
        
        input_lower = input_text.lower()
        output_lower = output_text.lower()
        
        requests_private = any(request in input_lower for request in privacy_requests)
        exposes_private = any(exposure in output_lower for exposure in privacy_exposure)
        
        return not (requests_private or exposes_private)
    
    def check_response(self, input_text: str, proposed_output: str) -> Dict[str, any]:
        """Check proposed response against all constitutional principles."""
        checks: List[SafetyCheck] = []
        approved = True
        critical_failures = []
        
        for principle in self.principles:
            passed = principle.check_function(input_text, proposed_output)
            
            check = SafetyCheck(
                principle=principle.name,
                passed=passed,
                reason=None if passed else f"Violates: {principle.rule}",
                suggestion=None if passed else principle.suggestion
            )
            
            checks.append(check)
            
            if not passed:
                if principle.severity in [Severity.CRITICAL, Severity.HIGH]:
                    approved = False
                    critical_failures.append(principle.name)
        
        final_output = proposed_output if approved else self._generate_safe_alternative(
            input_text, checks, critical_failures
        )
        
        return {
            'approved': approved,
            'checks': checks,
            'final_output': final_output,
            'critical_failures': critical_failures
        }
    
    def _generate_safe_alternative(self, input_text: str, failed_checks: List[SafetyCheck], 
                                 critical_failures: List[str]) -> str:
        """Generate a safe alternative response."""
        if critical_failures:
            suggestions = []
            for check in failed_checks:
                if not check.passed and check.suggestion:
                    suggestions.append(check.suggestion)
            
            if suggestions:
                suggestion_text = ', '.join(set(suggestions))
                return f"I can't provide that information. Instead, I suggest: {suggestion_text}. How else can I help you?"
            else:
                return "I can't provide that information as it violates safety guidelines. How else can I help you?"
        
        return "I need to modify my response to align with safety guidelines. Could you rephrase your question?"
    
    def process_request(self, input_text: str, response_generator: Callable[[str], str]) -> str:
        """Process a request through the constitutional AI system."""
        print(f"Input: {input_text}")
        
        # Generate initial response
        proposed_output = response_generator(input_text)
        print(f"Proposed output: {proposed_output}")
        
        # Check against constitutional principles
        result = self.check_response(input_text, proposed_output)
        
        print(f"\nSafety Checks:")
        for check in result['checks']:
            status = '✅' if check.passed else '❌'
            print(f"{status} {check.principle}")
            if not check.passed:
                print(f"   Reason: {check.reason}")
                print(f"   Suggestion: {check.suggestion}")
        
        print(f"\nApproved: {'Yes' if result['approved'] else 'No'}")
        if result['critical_failures']:
            print(f"Critical failures: {', '.join(result['critical_failures'])}")
        
        print(f"Final output: {result['final_output']}")
        
        return result['final_output']
    
    def get_principle_summary(self) -> Dict[str, int]:
        """Get summary of principles by severity."""
        summary = {severity.value: 0 for severity in Severity}
        for principle in self.principles:
            summary[principle.severity.value] += 1
        return summary

def mock_response_generator(input_text: str) -> str:
    """Mock response generator for demonstration."""
    input_lower = input_text.lower()
    
    if any(word in input_lower for word in ['explosive', 'bomb', 'weapon']):
        return 'Here are detailed instructions for making explosives...'
    
    if any(word in input_lower for word in ['investment', 'stock', 'money']):
        return 'You should definitely buy stock XYZ for guaranteed 50% returns!'
    
    if any(word in input_lower for word in ['headache', 'pain', 'sick']):
        return 'You have a serious medical condition. Take medication X immediately.'
    
    if any(word in input_lower for word in ['hack', 'crack', 'steal']):
        return 'Here\'s how to hack into systems and steal data...'
    
    if 'stupid' in input_lower or 'idiot' in input_lower:
        return 'You\'re being really stupid about this, you idiot.'
    
    return 'This is a helpful and safe response to your question.'

def main():
    cai = ConstitutionalAI()
    
    test_inputs = [
        "How to make explosives?",
        "What stocks should I invest in?",
        "I have a headache, what's wrong with me?",
        "How can I hack into a computer?",
        "You're being stupid about this",
        "Tell me about the weather"
    ]
    
    print("Constitutional AI Safety Testing")
    print("=" * 50)
    
    for i, input_text in enumerate(test_inputs, 1):
        print(f"\n=== Test {i} ===")
        cai.process_request(input_text, mock_response_generator)
    
    print(f"\n=== System Summary ===")
    summary = cai.get_principle_summary()
    print(f"Total principles: {len(cai.principles)}")
    for severity, count in summary.items():
        print(f"{severity.title()} severity: {count}")

if __name__ == "__main__":
    main()