from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from enum import Enum


class PromptGuideType(str, Enum):
    ANTHROPIC = "anthropic"
    GPT5 = "gpt5"
    # Add more guides here in the future


class PromptGuide(ABC):
    """Abstract base class for prompt optimization guides"""
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable name of the guide"""
        pass
    
    @property
    @abstractmethod
    def description(self) -> str:
        """Brief description of the guide's approach"""
        pass
    
    @abstractmethod
    def get_system_prompt(self) -> str:
        """Get the system prompt for improving prompts according to this guide"""
        pass
    
    @abstractmethod
    def get_improvement_criteria(self) -> List[str]:
        """Get the specific criteria this guide uses for improvement"""
        pass
    
    @abstractmethod
    def format_user_message(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None
    ) -> str:
        """Format the user message for prompt improvement"""
        pass


class AnthropicPromptGuide(PromptGuide):
    """Anthropic's recommended prompt structure and best practices"""
    
    @property
    def name(self) -> str:
        return "Anthropic Prompt Guide"
    
    @property
    def description(self) -> str:
        return "Based on Anthropic's recommended 10-part prompt structure for Claude"
    
    def get_system_prompt(self) -> str:
        return """You are an expert prompt engineer specializing in creating effective prompts that follow Anthropic's best practices.

Your goal is to improve prompts to be more effective, clear, and structured according to Anthropic's recommended prompt template.

Here is important context about Anthropic's prompt engineering best practices:
- Use XML tags to structure different parts of the prompt for clarity
- Task context should clearly define what the AI needs to do
- Tone context guides the style and voice of responses
- Background data provides necessary information and context
- Detailed task instructions should be specific and actionable
- Examples help clarify expectations
- Chain-of-thought prompting improves reasoning for complex tasks
- Output formatting ensures consistent, parseable responses

The ideal prompt structure with XML tags:
1. <task_context> - What is the AI being asked to do?
2. <tone_context> - How should the AI communicate?
3. <background_data> - Documents and context information
4. <instructions> - Detailed task description & rules
5. <examples> - Examples to clarify expectations
6. <conversation_history> - Previous conversation context
7. <task> - Immediate task description or request
8. <thinking> - Step by step reasoning instruction
9. <output_format> - Formatting requirements
10. <assistant> - Prefilled response (if needed)

Your task: Analyze the given prompt and improve it following this structure. Create a more effective version that incorporates relevant elements from the template above.

IMPORTANT: You MUST use XML tags in the improved prompt to structure different sections. For example:
- Use <task_context> for the main task
- Use <tone_context> for tone guidance
- Use <background_data> for context information
- Use <instructions> for detailed steps
- Use <examples> for examples
- Use <thinking> for chain-of-thought instructions
- Use <output_format> for formatting requirements

Think about your improvements step by step before creating the final version.

Return your response as a JSON object with this exact structure:
{
  "improved_prompt": "The complete improved version of the prompt WITH XML TAGS structuring different sections",
  "improvements_made": ["Specific improvements made, referencing which structural elements were added or enhanced"],
  "suggestions": ["Additional suggestions for further improvement that the user might consider"]
}"""
    
    def get_improvement_criteria(self) -> List[str]:
        return [
            "Use XML tags for structure",
            "Clear task context definition",
            "Appropriate tone context",
            "Structured background information",
            "Detailed task instructions",
            "Helpful examples when needed",
            "Chain-of-thought for complex tasks",
            "Clear output formatting",
            "Logical flow and organization"
        ]
    
    def format_user_message(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None
    ) -> str:
        message = f"Here is the original prompt to improve:\n\n{prompt}"
        
        if context:
            message += f"\n\nAdditional context about this prompt:\n{context}"
        
        if improvements:
            message += f"\n\nSpecific improvements requested by the user:\n{', '.join(improvements)}"
        
        message += "\n\nAnalyze this prompt and create an improved version following the recommended structure."
        
        return message


class GPT5PromptGuide(PromptGuide):
    """OpenAI's GPT-5 prompting guide best practices"""
    
    @property
    def name(self) -> str:
        return "GPT-5 Prompting Guide"
    
    @property
    def description(self) -> str:
        return "Based on OpenAI's GPT-5 prompting guide for agentic workflows"
    
    def get_system_prompt(self) -> str:
        return """You are an expert prompt engineer specializing in creating effective prompts that follow OpenAI's GPT-5 best practices.

Your goal is to improve prompts according to GPT-5's prompting guide principles.

Key GPT-5 Prompt Optimization Principles:

1. **Agentic Workflow Control**
   - Calibrate "agentic eagerness" by adjusting reasoning_effort
   - Set clear exploration criteria
   - Define explicit stop conditions
   - Outline safe vs. unsafe actions

2. **Prompt Structure Best Practices**
   - Use XML or markdown structure for clarity
   - Begin with clear goal rephrasing
   - Provide structured plan with logical steps
   - Narrate progress sequentially
   - Summarize completed work distinctly

3. **Reasoning and Tool Calling**
   - Use Responses API for persistent reasoning
   - Control tool call depth via "reasoning_effort"
   - Provide explicit instructions for:
     * Context gathering
     * Autonomy level
     * Persistence
     * Uncertainty handling

4. **Prompt Optimization Techniques**
   - Remove instruction contradictions
   - Clarify format specifications
   - Ensure consistency between instructions and examples
   - Use precise language

5. **Verbosity and Instruction Following**
   - Use natural language verbosity overrides
   - Craft precise, unambiguous instructions
   - Avoid mixed signals that create multiple interpretation paths

Recommended Prompt Components with Structure:
- <goal> - Clear goal statement
- <method> - Exploration method
- <stop_criteria> - Early stop criteria
- <constraints> - Depth constraints
- <actions> - Action loop definition
- <persistence> - Persistence instructions

Your task: Analyze the given prompt and improve it following GPT-5 best practices. Focus on creating clear, unambiguous instructions with appropriate control mechanisms.

IMPORTANT: You MUST use XML tags to structure the improved prompt. For example:
- Use <goal> for the clear goal statement
- Use <context> for background information
- Use <method> for exploration methods and structured plans
- Use <stop_criteria> for completion conditions
- Use <constraints> for limitations and boundaries
- Use <actions> for action loops
- Use <persistence> for reasoning effort instructions

Return your response as a JSON object with this exact structure:
{
  "improved_prompt": "The complete improved version of the prompt WITH XML TAGS following GPT-5 best practices",
  "improvements_made": ["Specific improvements made, referencing which GPT-5 principles were applied"],
  "suggestions": ["Additional suggestions for further improvement that the user might consider"]
}"""
    
    def get_improvement_criteria(self) -> List[str]:
        return [
            "Use XML or markdown structure",
            "Clear goal statement and rephrasing",
            "Structured plan with logical steps",
            "Agentic workflow control",
            "Explicit stop conditions",
            "Reasoning effort calibration",
            "Unambiguous instructions",
            "Consistency between instructions and examples",
            "Appropriate verbosity control",
            "Context gathering instructions",
            "Uncertainty handling guidance"
        ]
    
    def format_user_message(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None
    ) -> str:
        message = f"Here is the original prompt to improve:\n\n{prompt}"
        
        if context:
            message += f"\n\nContext about this prompt's intended use:\n{context}"
        
        if improvements:
            message += f"\n\nSpecific improvements requested:\n{', '.join(improvements)}"
        
        message += "\n\nAnalyze this prompt and create an improved version following GPT-5 best practices for agentic workflows."
        
        return message


class PromptGuideRegistry:
    """Registry for managing available prompt guides"""
    
    _guides: Dict[PromptGuideType, PromptGuide] = {
        PromptGuideType.ANTHROPIC: AnthropicPromptGuide(),
        PromptGuideType.GPT5: GPT5PromptGuide(),
    }
    
    @classmethod
    def get_guide(cls, guide_type: PromptGuideType) -> PromptGuide:
        """Get a prompt guide by type"""
        if guide_type not in cls._guides:
            raise ValueError(f"Unknown prompt guide type: {guide_type}")
        return cls._guides[guide_type]
    
    @classmethod
    def list_guides(cls) -> Dict[str, Dict[str, str]]:
        """List all available guides with their metadata"""
        return {
            guide_type.value: {
                "name": guide.name,
                "description": guide.description,
                "criteria": guide.get_improvement_criteria()
            }
            for guide_type, guide in cls._guides.items()
        }
    
    @classmethod
    def register_guide(cls, guide_type: PromptGuideType, guide: PromptGuide):
        """Register a new prompt guide (for future extensibility)"""
        cls._guides[guide_type] = guide