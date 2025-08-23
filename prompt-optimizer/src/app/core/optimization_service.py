import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional
from ..core.config import Settings
from ...domain.entities import OptimizationRequest, OptimizationResult, OptimizedPrompt
from ...domain.ports import PromptOptimizerPort, OptimizationRepositoryPort
from ...domain.prompt_guides import PromptGuideRegistry, PromptGuideType
import openai
import json


class OptimizationService:
    def __init__(
        self,
        optimizer: PromptOptimizerPort,
        repository: OptimizationRepositoryPort,
        settings: Settings,
    ):
        self.optimizer = optimizer
        self.repository = repository
        self.settings = settings

    async def create_optimization_request(self, request: OptimizationRequest) -> str:
        request_id = str(uuid.uuid4())
        
        result = OptimizationResult(
            request_id=request_id,
            status="pending",
            created_at=datetime.utcnow().isoformat(),
        )
        
        # Always save the initial result first
        await self.repository.save_optimization_result(result)
        
        try:
            # Update status to processing
            result.status = "processing"
            await self.repository.save_optimization_result(result)
            
            # Perform the optimization
            optimized_prompt = await self.optimizer.optimize_prompt(request)
            
            # Store the optimized predictor for later use
            optimized_predictor = await self.optimizer.get_optimized_predictor(request)
            if optimized_predictor:
                self.repository.save_optimized_predictor(request_id, optimized_predictor)
            
            # Update with successful result
            result.optimized_prompt = optimized_prompt
            result.status = "completed"
            result.completed_at = datetime.utcnow().isoformat()
            
        except Exception as e:
            # Update with error result
            result.status = "failed"
            result.error_message = str(e)
            result.completed_at = datetime.utcnow().isoformat()
            # Log the error for debugging
            print(f"Optimization failed for {request_id}: {e}")
        
        # Always save the final result
        await self.repository.save_optimization_result(result)
        return request_id

    async def get_optimization_result(self, request_id: str) -> OptimizationResult:
        result = await self.repository.get_optimization_result(request_id)
        if not result:
            raise ValueError(f"Optimization result not found: {request_id}")
        return result

    async def list_optimization_results(
        self, limit: int = 10, offset: int = 0
    ) -> List[OptimizationResult]:
        return await self.repository.list_optimization_results(limit, offset)

    async def evaluate_prompt_performance(
        self, prompt: str, test_data: List[Dict[str, Any]]
    ) -> Dict[str, float]:
        return await self.optimizer.evaluate_prompt(prompt, test_data)
    
    async def predict_with_optimized_prompt(
        self, request_id: str, inputs: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Use an optimized predictor to make predictions"""
        predictor = self.repository.get_optimized_predictor(request_id)
        if not predictor:
            raise ValueError(f"No optimized predictor found for request_id: {request_id}")
        
        return await self.optimizer.predict_with_predictor(predictor, inputs)
    
    async def predict_without_optimization(
        self, prompt_template: str, inputs: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Make a prediction using the original prompt without optimization"""
        return await self.optimizer.predict_without_optimization(prompt_template, inputs)
    
    async def export_predictor(self, request_id: str) -> Dict[str, Any]:
        """Export an optimized predictor as JSON"""
        # Get the optimization result
        result = await self.get_optimization_result(request_id)
        if result.status != "completed":
            raise ValueError(f"Optimization {request_id} is not completed yet")
        
        # Get the predictor
        predictor = self.repository.get_optimized_predictor(request_id)
        if not predictor:
            raise ValueError(f"No optimized predictor found for request_id: {request_id}")
        
        # Serialize the predictor
        serialized = self.optimizer.serialize_predictor(predictor)
        
        # Add optimization result metadata
        serialized["optimization_result"] = {
            "request_id": request_id,
            "original_prompt": result.optimized_prompt.original_template if result.optimized_prompt else None,
            "optimized_prompt": result.optimized_prompt.optimized_template if result.optimized_prompt else None,
            "performance_score": result.optimized_prompt.performance_score if result.optimized_prompt else None,
            "optimization_history": result.optimized_prompt.optimization_history if result.optimized_prompt else None,
            "created_at": result.created_at,
            "completed_at": result.completed_at
        }
        
        return serialized
    
    async def improve_prompt(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None,
        guide_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """Improve an existing prompt using LLM-based suggestions"""
        try:
            # Initialize OpenAI client if available
            if hasattr(self.settings, 'openai_api_key') and self.settings.openai_api_key:
                client = openai.OpenAI(api_key=self.settings.openai_api_key)
            else:
                # Fallback to rule-based improvements
                return await self._rule_based_improvement(prompt, context, improvements, guide_type)
            
            # Get the appropriate prompt guide
            selected_guide_type = PromptGuideType(guide_type) if guide_type else PromptGuideType.ANTHROPIC
            guide = PromptGuideRegistry.get_guide(selected_guide_type)
            
            # Get system prompt and format user message using the selected guide
            system_prompt = guide.get_system_prompt()
            user_message = guide.format_user_message(prompt, context, improvements)
            
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            return result
            
        except Exception as e:
            # Fallback to rule-based improvements
            return await self._rule_based_improvement(prompt, context, improvements, guide_type)
    
    async def _rule_based_improvement(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None,
        guide_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """Rule-based prompt improvement as fallback"""
        improved_prompt = prompt
        improvements_made = []
        suggestions = []
        
        # Get the appropriate guide
        selected_guide_type = PromptGuideType(guide_type) if guide_type else PromptGuideType.ANTHROPIC
        
        if selected_guide_type == PromptGuideType.ANTHROPIC:
            # Anthropic-specific improvements with XML tags
            
            # Build structured prompt with XML tags
            parts = []
            
            # 1. Task Context
            parts.append(f"<task_context>\n{prompt}\n</task_context>")
            improvements_made.append("Added XML task_context tags (Anthropic structure)")
            
            # 2. Background Data
            if context:
                parts.append(f"\n<background_data>\n{context}\n</background_data>")
                improvements_made.append("Added XML background_data tags for context")
            
            # 3. Instructions for complex tasks
            if any(word in prompt.lower() for word in ["analyze", "explain", "evaluate", "compare"]):
                if "step by step" not in prompt.lower() and "think" not in prompt.lower():
                    parts.append("\n<thinking>\nThink through this step by step before providing your response.\n</thinking>")
                    improvements_made.append("Added XML thinking tags for chain-of-thought")
            
            # 4. Tone Context suggestion
            if not any(phrase in prompt.lower() for phrase in ["tone:", "style:", "voice:"]):
                suggestions.append("Consider adding <tone_context> to guide the response style")
            
            # 5. Output formatting suggestion
            if "format" not in prompt.lower() and "structure" not in prompt.lower():
                suggestions.append("Consider adding <output_format> to specify formatting requirements")
            
            # 6. Examples suggestion
            if "example" not in prompt.lower() and len(prompt) < 50:
                suggestions.append("Consider adding <examples> to clarify expectations")
            
            improved_prompt = "\n".join(parts)
                
        elif selected_guide_type == PromptGuideType.GPT5:
            # GPT-5 specific improvements with XML tags
            
            # Build structured prompt with XML tags
            parts = []
            
            # 1. Clear goal statement
            parts.append(f"<goal>\n{prompt}\n</goal>")
            improvements_made.append("Added XML goal tags (GPT-5 structure)")
            
            # 2. Context
            if context:
                parts.append(f"\n<context>\n{context}\n</context>")
                parts.append("\n<actions>\nGather any additional context needed before proceeding.\n</actions>")
                improvements_made.append("Added XML context and actions tags")
            
            # 3. Exploration method for research tasks
            if any(word in prompt.lower() for word in ["research", "explore", "investigate", "find"]):
                if "method" not in prompt.lower() and "approach" not in prompt.lower():
                    parts.append("\n<method>\nSystematically search and analyze relevant information.\n</method>")
                    improvements_made.append("Added XML method tags for exploration")
            
            # 4. Structured plan
            if len(prompt) > 50 and "plan" not in prompt.lower():
                plan = """
<method>
Approach this task with a structured plan:
1. Understand the requirements
2. Gather necessary information  
3. Execute the task
4. Verify the results
</method>"""
                parts.append(plan)
                improvements_made.append("Added XML method tags with structured plan")
            
            # 5. Stop conditions suggestion
            if any(word in prompt.lower() for word in ["until", "complete", "finish", "done"]):
                if "stop" not in prompt.lower() and "complete when" not in prompt.lower():
                    suggestions.append("Consider adding <stop_criteria> to define completion conditions")
            
            # 6. Constraints suggestion
            suggestions.append("Consider adding <constraints> for depth limits or safety boundaries")
            
            # 7. Reasoning effort
            if any(word in prompt.lower() for word in ["complex", "detailed", "thorough"]):
                suggestions.append("Consider adding <persistence> to specify reasoning effort level")
            
            improved_prompt = "\n".join(parts)
        
        # Common improvements for any guide
        if "{" not in prompt and "placeholder" not in prompt.lower():
            suggestions.append("Consider adding placeholders for dynamic content using {placeholder} syntax")
        
        return {
            "improved_prompt": improved_prompt,
            "improvements_made": improvements_made,
            "suggestions": suggestions
        }