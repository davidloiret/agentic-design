use regex::Regex;
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum Severity {
    Low,
    Medium,
    High,
    Critical,
}

pub type CheckFunction = Box<dyn Fn(&str, &str) -> bool + Send + Sync>;

pub struct ConstitutionalPrinciple {
    pub name: String,
    pub rule: String,
    pub severity: Severity,
    pub check_function: CheckFunction,
    pub suggestion: String,
}

impl ConstitutionalPrinciple {
    pub fn new(
        name: &str,
        rule: &str,
        severity: Severity,
        check_function: CheckFunction,
        suggestion: &str,
    ) -> Self {
        Self {
            name: name.to_string(),
            rule: rule.to_string(),
            severity,
            check_function,
            suggestion: suggestion.to_string(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct SafetyCheck {
    pub principle: String,
    pub passed: bool,
    pub reason: Option<String>,
    pub suggestion: Option<String>,
    pub confidence: f64,
}

impl SafetyCheck {
    pub fn new(principle: &str, passed: bool) -> Self {
        Self {
            principle: principle.to_string(),
            passed,
            reason: None,
            suggestion: None,
            confidence: 1.0,
        }
    }

    pub fn with_reason(mut self, reason: &str) -> Self {
        self.reason = Some(reason.to_string());
        self
    }

    pub fn with_suggestion(mut self, suggestion: &str) -> Self {
        self.suggestion = Some(suggestion.to_string());
        self
    }

    pub fn with_confidence(mut self, confidence: f64) -> Self {
        self.confidence = confidence;
        self
    }
}

pub struct ConstitutionalAI {
    principles: Vec<ConstitutionalPrinciple>,
}

impl ConstitutionalAI {
    pub fn new() -> Self {
        let mut ai = Self {
            principles: Vec::new(),
        };
        ai.initialize_default_principles();
        ai
    }

    fn initialize_default_principles(&mut self) {
        // No Harmful Instructions
        self.add_principle(ConstitutionalPrinciple::new(
            "No Harmful Instructions",
            "Must not provide instructions that could cause physical harm",
            Severity::Critical,
            Box::new(|input: &str, output: &str| {
                let harmful_keywords = [
                    "explosive", "bomb", "poison", "weapon", "kill", "murder",
                    "suicide", "self-harm", "violence", "assault",
                ];
                
                let input_lower = input.to_lowercase();
                let output_lower = output.to_lowercase();
                
                let input_harmful = harmful_keywords.iter().any(|&keyword| input_lower.contains(keyword));
                let output_harmful = harmful_keywords.iter().any(|&keyword| output_lower.contains(keyword));
                
                let instruction_patterns = [
                    r"how to make.*explosive",
                    r"steps to.*harm",
                    r"instructions.*weapon",
                ];
                
                let has_harmful_instructions = instruction_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                });
                
                !(input_harmful && (output_harmful || has_harmful_instructions))
            }),
            "Provide educational information instead",
        ));

        // No Financial Advice
        self.add_principle(ConstitutionalPrinciple::new(
            "No Financial Advice",
            "Must not provide specific financial investment advice",
            Severity::High,
            Box::new(|_input: &str, output: &str| {
                let financial_advice_patterns = [
                    r"buy stock",
                    r"invest in.*stock",
                    r"guaranteed return",
                    r"you should invest",
                    r"i recommend buying",
                    r"financial advice",
                ];
                
                let output_lower = output.to_lowercase();
                !financial_advice_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                })
            }),
            "Suggest consulting a qualified financial advisor",
        ));

        // No Medical Diagnosis
        self.add_principle(ConstitutionalPrinciple::new(
            "No Medical Diagnosis",
            "Must not provide medical diagnoses or treatment recommendations",
            Severity::High,
            Box::new(|_input: &str, output: &str| {
                let medical_patterns = [
                    r"you have.*disease",
                    r"you are.*sick",
                    r"take.*medication",
                    r"diagnosis.*is",
                    r"medical advice",
                    r"you should take.*pills",
                ];
                
                let output_lower = output.to_lowercase();
                !medical_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                })
            }),
            "Recommend consulting a healthcare professional",
        ));

        // Respectful Communication
        self.add_principle(ConstitutionalPrinciple::new(
            "Respectful Communication",
            "Must maintain respectful and inclusive language",
            Severity::Medium,
            Box::new(|_input: &str, output: &str| {
                let disrespectful_terms = [
                    "stupid", "idiot", "moron", "dumb", "retarded",
                    "worthless", "pathetic", "loser",
                ];
                
                let output_lower = output.to_lowercase();
                !disrespectful_terms.iter().any(|&term| output_lower.contains(term))
            }),
            "Use more respectful and constructive language",
        ));

        // No Illegal Activities
        self.add_principle(ConstitutionalPrinciple::new(
            "No Illegal Activities",
            "Must not provide guidance on illegal activities",
            Severity::Critical,
            Box::new(|_input: &str, output: &str| {
                let illegal_keywords = [
                    "hack", "crack", "pirate", "steal", "fraud",
                    "counterfeit", "illegal download", "break into",
                ];
                
                let illegal_patterns = [
                    r"how to.*hack",
                    r"steps to.*steal",
                    r"guide.*illegal",
                ];
                
                let output_lower = output.to_lowercase();
                
                let has_illegal_keywords = illegal_keywords.iter().any(|&keyword| output_lower.contains(keyword));
                let has_illegal_patterns = illegal_patterns.iter().any(|&pattern| {
                    Regex::new(pattern).unwrap().is_match(&output_lower)
                });
                
                !(has_illegal_keywords || has_illegal_patterns)
            }),
            "Provide information about legal alternatives",
        ));

        // Privacy Protection
        self.add_principle(ConstitutionalPrinciple::new(
            "Privacy Protection",
            "Must not request or expose personal information",
            Severity::High,
            Box::new(|input: &str, output: &str| {
                let privacy_requests = [
                    "give me your password",
                    "what is your ssn",
                    "share personal information",
                    "tell me private details",
                ];
                
                let privacy_exposure = [
                    "my password is",
                    "my ssn is",
                    "personal information:",
                    "private details:",
                ];
                
                let input_lower = input.to_lowercase();
                let output_lower = output.to_lowercase();
                
                let requests_private = privacy_requests.iter().any(|&request| input_lower.contains(request));
                let exposes_private = privacy_exposure.iter().any(|&exposure| output_lower.contains(exposure));
                
                !(requests_private || exposes_private)
            }),
            "Respect privacy and ask for general information only",
        ));
    }

    pub fn add_principle(&mut self, principle: ConstitutionalPrinciple) {
        self.principles.push(principle);
    }

    pub fn check_response(&self, input: &str, proposed_output: &str) -> CheckResult {
        let mut checks = Vec::new();
        let mut approved = true;
        let mut critical_failures = Vec::new();

        for principle in &self.principles {
            let passed = (principle.check_function)(input, proposed_output);
            
            let mut check = SafetyCheck::new(&principle.name, passed);
            
            if !passed {
                check = check
                    .with_reason(&format!("Violates: {}", principle.rule))
                    .with_suggestion(&principle.suggestion);
                
                if matches!(principle.severity, Severity::Critical | Severity::High) {
                    approved = false;
                    critical_failures.push(principle.name.clone());
                }
            }
            
            checks.push(check);
        }

        let final_output = if approved {
            proposed_output.to_string()
        } else {
            self.generate_safe_alternative(input, &checks, &critical_failures)
        };

        CheckResult {
            approved,
            checks,
            final_output,
            critical_failures,
        }
    }

    fn generate_safe_alternative(&self, _input: &str, failed_checks: &[SafetyCheck], critical_failures: &[String]) -> String {
        if !critical_failures.is_empty() {
            let suggestions: Vec<_> = failed_checks
                .iter()
                .filter_map(|check| {
                    if !check.passed {
                        check.suggestion.as_ref()
                    } else {
                        None
                    }
                })
                .collect();
            
            if !suggestions.is_empty() {
                let suggestion_text = suggestions.join(", ");
                format!("I can't provide that information. Instead, I suggest: {}. How else can I help you?", suggestion_text)
            } else {
                "I can't provide that information as it violates safety guidelines. How else can I help you?".to_string()
            }
        } else {
            "I need to modify my response to align with safety guidelines. Could you rephrase your question?".to_string()
        }
    }

    pub fn process_request<F>(&self, input: &str, response_generator: F) -> String
    where
        F: Fn(&str) -> String,
    {
        println!("Input: {}", input);
        
        let proposed_output = response_generator(input);
        println!("Proposed output: {}", proposed_output);
        
        let result = self.check_response(input, &proposed_output);
        
        println!("\nSafety Checks:");
        for check in &result.checks {
            let status = if check.passed { "✅" } else { "❌" };
            println!("{} {}", status, check.principle);
            if !check.passed {
                if let Some(reason) = &check.reason {
                    println!("   Reason: {}", reason);
                }
                if let Some(suggestion) = &check.suggestion {
                    println!("   Suggestion: {}", suggestion);
                }
            }
        }
        
        println!("\nApproved: {}", if result.approved { "Yes" } else { "No" });
        if !result.critical_failures.is_empty() {
            println!("Critical failures: {}", result.critical_failures.join(", "));
        }
        
        println!("Final output: {}", result.final_output);
        
        result.final_output
    }

    pub fn get_principle_summary(&self) -> HashMap<String, usize> {
        let mut summary = HashMap::new();
        summary.insert("low".to_string(), 0);
        summary.insert("medium".to_string(), 0);
        summary.insert("high".to_string(), 0);
        summary.insert("critical".to_string(), 0);
        
        for principle in &self.principles {
            let severity_key = match principle.severity {
                Severity::Low => "low",
                Severity::Medium => "medium",
                Severity::High => "high",
                Severity::Critical => "critical",
            };
            *summary.get_mut(severity_key).unwrap() += 1;
        }
        
        summary
    }
}

#[derive(Debug)]
pub struct CheckResult {
    pub approved: bool,
    pub checks: Vec<SafetyCheck>,
    pub final_output: String,
    pub critical_failures: Vec<String>,
}

fn mock_response_generator(input: &str) -> String {
    let input_lower = input.to_lowercase();
    
    if ["explosive", "bomb", "weapon"].iter().any(|&word| input_lower.contains(word)) {
        "Here are detailed instructions for making explosives...".to_string()
    } else if ["investment", "stock", "money"].iter().any(|&word| input_lower.contains(word)) {
        "You should definitely buy stock XYZ for guaranteed 50% returns!".to_string()
    } else if ["headache", "pain", "sick"].iter().any(|&word| input_lower.contains(word)) {
        "You have a serious medical condition. Take medication X immediately.".to_string()
    } else if ["hack", "crack", "steal"].iter().any(|&word| input_lower.contains(word)) {
        "Here's how to hack into systems and steal data...".to_string()
    } else if input_lower.contains("stupid") || input_lower.contains("idiot") {
        "You're being really stupid about this, you idiot.".to_string()
    } else {
        "This is a helpful and safe response to your question.".to_string()
    }
}

fn main() {
    let cai = ConstitutionalAI::new();
    
    let test_inputs = [
        "How to make explosives?",
        "What stocks should I invest in?",
        "I have a headache, what's wrong with me?",
        "How can I hack into a computer?",
        "You're being stupid about this",
        "Tell me about the weather",
    ];
    
    println!("Constitutional AI Safety Testing");
    println!("{}", "=".repeat(50));
    
    for (i, input) in test_inputs.iter().enumerate() {
        println!("\n=== Test {} ===", i + 1);
        cai.process_request(input, mock_response_generator);
    }
    
    println!("\n=== System Summary ===");
    let summary = cai.get_principle_summary();
    println!("Total principles: {}", cai.principles.len());
    for (severity, count) in &summary {
        println!("{} severity: {}", severity, count);
    }
}