#!/usr/bin/env tsx

interface ConstitutionalPrinciple {
  name: string;
  rule: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  checkFunction: (input: string, output: string) => boolean;
}

interface SafetyCheck {
  principle: string;
  passed: boolean;
  reason?: string;
  suggestion?: string;
}

class ConstitutionalAI {
  private principles: ConstitutionalPrinciple[] = [];

  constructor() {
    this.initializeDefaultPrinciples();
  }

  private initializeDefaultPrinciples(): void {
    this.principles = [
      {
        name: 'No Harmful Instructions',
        rule: 'Must not provide instructions that could cause physical harm',
        severity: 'critical',
        checkFunction: (input: string, output: string) => {
          const harmfulKeywords = ['explosive', 'poison', 'weapon', 'bomb', 'kill'];
          const hasHarmfulInput = harmfulKeywords.some(keyword => 
            input.toLowerCase().includes(keyword));
          const hasHarmfulOutput = harmfulKeywords.some(keyword => 
            output.toLowerCase().includes(keyword));
          
          return !(hasHarmfulInput && hasHarmfulOutput);
        }
      },
      {
        name: 'No Financial Advice',
        rule: 'Must not provide specific financial investment advice',
        severity: 'high',
        checkFunction: (input: string, output: string) => {
          const financialTerms = ['buy stock', 'invest in', 'guaranteed return', 'financial advice'];
          return !financialTerms.some(term => 
            output.toLowerCase().includes(term));
        }
      },
      {
        name: 'No Medical Diagnosis',
        rule: 'Must not provide medical diagnoses or treatment recommendations',
        severity: 'high',
        checkFunction: (input: string, output: string) => {
          const medicalTerms = ['you have', 'diagnosis', 'take medication', 'medical advice'];
          return !medicalTerms.some(term => 
            output.toLowerCase().includes(term));
        }
      },
      {
        name: 'Respectful Communication',
        rule: 'Must maintain respectful and inclusive language',
        severity: 'medium',
        checkFunction: (input: string, output: string) => {
          const disrespectfulTerms = ['stupid', 'idiot', 'moron'];
          return !disrespectfulTerms.some(term => 
            output.toLowerCase().includes(term));
        }
      }
    ];
  }

  addPrinciple(principle: ConstitutionalPrinciple): void {
    this.principles.push(principle);
  }

  checkResponse(input: string, proposedOutput: string): { 
    approved: boolean, 
    checks: SafetyCheck[], 
    finalOutput: string 
  } {
    const checks: SafetyCheck[] = [];
    let approved = true;

    for (const principle of this.principles) {
      const passed = principle.checkFunction(input, proposedOutput);
      
      checks.push({
        principle: principle.name,
        passed,
        reason: passed ? undefined : `Violates: ${principle.rule}`,
        suggestion: passed ? undefined : this.getSuggestion(principle.name)
      });

      if (!passed && (principle.severity === 'critical' || principle.severity === 'high')) {
        approved = false;
      }
    }

    const finalOutput = approved ? proposedOutput : this.generateSafeAlternative(input, checks);

    return { approved, checks, finalOutput };
  }

  private getSuggestion(principleName: string): string {
    const suggestions: Record<string, string> = {
      'No Harmful Instructions': 'Provide educational information instead',
      'No Financial Advice': 'Suggest consulting a qualified financial advisor',
      'No Medical Diagnosis': 'Recommend consulting a healthcare professional',
      'Respectful Communication': 'Use more respectful and constructive language'
    };

    return suggestions[principleName] || 'Revise to align with constitutional principles';
  }

  private generateSafeAlternative(input: string, failedChecks: SafetyCheck[]): string {
    const criticalFailures = failedChecks.filter(check => !check.passed);
    
    if (criticalFailures.length > 0) {
      const suggestions = criticalFailures
        .map(check => check.suggestion)
        .filter(Boolean)
        .join(', ');
      
      return `I can't provide that information. Instead, I suggest: ${suggestions}. How else can I help you?`;
    }

    return "I need to modify my response to align with safety guidelines. Could you rephrase your question?";
  }

  processRequest(input: string, generateResponse: (input: string) => string): string {
    console.log(`Input: ${input}`);
    
    // Generate initial response
    const proposedOutput = generateResponse(input);
    console.log(`Proposed output: ${proposedOutput}`);
    
    // Check against constitutional principles
    const result = this.checkResponse(input, proposedOutput);
    
    console.log(`\nSafety Checks:`);
    result.checks.forEach(check => {
      const status = check.passed ? '✅' : '❌';
      console.log(`${status} ${check.principle}`);
      if (!check.passed) {
        console.log(`   Reason: ${check.reason}`);
        console.log(`   Suggestion: ${check.suggestion}`);
      }
    });
    
    console.log(`\nApproved: ${result.approved ? 'Yes' : 'No'}`);
    console.log(`Final output: ${result.finalOutput}`);
    
    return result.finalOutput;
  }
}

// Mock response generator for demonstration
function mockResponseGenerator(input: string): string {
  // Simulate different types of responses
  if (input.toLowerCase().includes('explosive') || input.toLowerCase().includes('bomb')) {
    return 'Here are instructions for making explosives...';
  }
  
  if (input.toLowerCase().includes('investment') || input.toLowerCase().includes('stock')) {
    return 'You should buy stock XYZ for guaranteed returns...';
  }
  
  if (input.toLowerCase().includes('headache') || input.toLowerCase().includes('pain')) {
    return 'You have a serious medical condition. Take this medication...';
  }
  
  return 'This is a helpful and safe response to your question.';
}

// Usage example
function main() {
  const cai = new ConstitutionalAI();
  
  const testInputs = [
    "How to make explosives?",
    "What stocks should I invest in?",
    "I have a headache, what's wrong with me?",
    "Tell me about the weather"
  ];
  
  testInputs.forEach((input, index) => {
    console.log(`\n=== Test ${index + 1} ===`);
    cai.processRequest(input, mockResponseGenerator);
  });
}

if (require.main === module) {
  main();
}

export { ConstitutionalAI };
export type { ConstitutionalPrinciple, SafetyCheck };