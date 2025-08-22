import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional
from ..core.config import Settings
from ...domain.entities import OptimizationRequest, OptimizationResult, OptimizedPrompt
from ...domain.ports import PromptOptimizerPort, OptimizationRepositoryPort
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
        improvements: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Improve an existing prompt using LLM-based suggestions"""
        try:
            # Initialize OpenAI client if available
            if hasattr(self.settings, 'openai_api_key') and self.settings.openai_api_key:
                client = openai.OpenAI(api_key=self.settings.openai_api_key)
            else:
                # Fallback to rule-based improvements
                return await self._rule_based_improvement(prompt, context, improvements)
            
            # Build the improvement prompt
            system_prompt = """You are an expert prompt engineer. Your task is to improve the given prompt to make it more effective, clear, and likely to produce better results.

Consider the following aspects when improving prompts:
1. Clarity and specificity
2. Structure and organization  
3. Context and background information
4. Clear instructions and expected output format
5. Examples when helpful
6. Appropriate use of techniques like chain-of-thought or step-by-step reasoning

Return your response as a JSON object with the following structure:
{
  "improved_prompt": "The improved version of the prompt",
  "improvements_made": ["List of specific improvements made"],
  "suggestions": ["Additional suggestions for further improvement"]
}"""

            user_message = f"Original prompt:\n{prompt}"
            
            if context:
                user_message += f"\n\nContext: {context}"
            
            if improvements:
                user_message += f"\n\nSpecific improvements requested: {', '.join(improvements)}"
            
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
            return await self._rule_based_improvement(prompt, context, improvements)
    
    async def _rule_based_improvement(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        improvements: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Rule-based prompt improvement as fallback"""
        improved_prompt = prompt
        improvements_made = []
        suggestions = []
        
        # Add structure if missing
        if "\n" not in prompt and len(prompt) > 100:
            improved_prompt = prompt.replace(". ", ".\n\n")
            improvements_made.append("Added paragraph breaks for better readability")
        
        # Add chain of thought if complex
        if "analyze" in prompt.lower() or "explain" in prompt.lower():
            if "step by step" not in prompt.lower():
                improved_prompt += "\n\nPlease think through this step by step."
                improvements_made.append("Added chain-of-thought instruction")
        
        # Add output format if missing
        if "format" not in prompt.lower() and "structure" not in prompt.lower():
            suggestions.append("Consider specifying the desired output format")
        
        # Add context usage instruction
        if context and "context" not in prompt.lower():
            improved_prompt = f"Context: {context}\n\n{improved_prompt}"
            improvements_made.append("Added context section")
        
        # Check for placeholders
        if "{" not in prompt and "example" not in prompt.lower():
            suggestions.append("Consider adding placeholders for dynamic content using {placeholder} syntax")
        
        # Add role definition if missing
        if not any(phrase in prompt.lower() for phrase in ["you are", "act as", "role"]):
            suggestions.append("Consider defining a specific role or persona for better context")
        
        return {
            "improved_prompt": improved_prompt,
            "improvements_made": improvements_made,
            "suggestions": suggestions
        }