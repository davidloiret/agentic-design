import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional
from ..core.config import Settings
from ...domain.entities import OptimizationRequest, OptimizationResult, OptimizedPrompt
from ...domain.ports import PromptOptimizerPort, OptimizationRepositoryPort
from ...domain.prompt_guides import PromptGuideRegistry, PromptGuideType
from ...infrastructure.gepa_optimizer import GEPAOptimizer, EvolutionConfig, OptimizationObjective
import openai
import json
import asyncio


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

    async def gepa_optimize(
        self,
        prompt: str,
        input_variables: List[str],
        output_variables: List[str],
        training_examples: Optional[List[dict]] = None,
        validation_examples: Optional[List[dict]] = None,
        max_generations: int = 30,
        population_size: int = 15,
        objectives: List[str] = None
    ) -> Dict[str, Any]:
        """Optimize prompt using GEPA (Generalized Evolutionary Prompt Adaptation)"""
        try:
            # Initialize OpenAI client
            if hasattr(self.settings, 'openai_api_key') and self.settings.openai_api_key:
                client = openai.AsyncOpenAI(api_key=self.settings.openai_api_key)
            else:
                raise ValueError("OpenAI API key is required for GEPA optimization")

            # Convert string objectives to enum
            objective_map = {
                "performance": OptimizationObjective.PERFORMANCE,
                "clarity": OptimizationObjective.CLARITY,
                "efficiency": OptimizationObjective.EFFICIENCY,
                "robustness": OptimizationObjective.ROBUSTNESS,
                "conciseness": OptimizationObjective.CONCISENESS
            }

            optimization_objectives = [
                objective_map.get(obj, OptimizationObjective.PERFORMANCE)
                for obj in (objectives or ["performance", "clarity", "efficiency"])
            ]

            # Create GEPA configuration
            config = EvolutionConfig(
                population_size=population_size,
                max_generations=max_generations,
                objectives=optimization_objectives
            )

            # Initialize GEPA optimizer
            gepa = GEPAOptimizer(
                llm_client=client,
                config=config,
                training_examples=training_examples or [],
                validation_examples=validation_examples or []
            )

            # Run optimization
            result = await gepa.optimize(
                initial_prompt=prompt,
                input_variables=input_variables,
                output_variables=output_variables,
                max_iterations=max_generations
            )

            return result

        except Exception as e:
            raise ValueError(f"GEPA optimization failed: {str(e)}")

    async def gepa_think(
        self,
        prompt: str,
        context: Optional[str] = None,
        optimization_goal: str = "general"
    ) -> Dict[str, Any]:
        """Generate thinking and optimization suggestions for a prompt using GEPA insights"""
        try:
            # Initialize OpenAI client
            if hasattr(self.settings, 'openai_api_key') and self.settings.openai_api_key:
                client = openai.AsyncOpenAI(api_key=self.settings.openai_api_key)
            else:
                # Fallback to rule-based thinking
                return await self._rule_based_gepa_think(prompt, context, optimization_goal)

            # Define optimization goals and their characteristics
            goal_contexts = {
                "general": "general-purpose optimization for clarity, effectiveness, and versatility",
                "performance": "maximizing task performance and accuracy",
                "efficiency": "minimizing token usage and response time",
                "clarity": "improving prompt understandability and reducing ambiguity",
                "robustness": "enhancing prompt resilience to varied inputs",
                "creativity": "encouraging more creative and diverse responses"
            }

            goal_description = goal_contexts.get(optimization_goal, goal_contexts["general"])

            system_prompt = """You are an expert prompt engineer with deep knowledge of the GEPA (Generalized Evolutionary Prompt Adaptation) framework.

Your task is to analyze prompts and provide thinking-based optimization suggestions. Focus on:

1. **Prompt Structure Analysis**: Evaluate the current structure, identify weaknesses, and suggest improvements
2. **Evolutionary Potential**: Identify aspects that could benefit from evolutionary optimization
3. **Objective Alignment**: Ensure the prompt aligns with the specified optimization goal
4. **Multi-objective Considerations**: Balance different optimization objectives (performance, clarity, efficiency, robustness)
5. **Optimization Strategy**: Suggest specific optimization approaches and mutations

Provide your analysis in the following JSON format:
{
    "analysis": {
        "current_strengths": ["strength1", "strength2"],
        "improvement_areas": ["area1", "area2"],
        "optimization_potential": "high/medium/low"
    },
    "suggestions": {
        "structural_improvements": ["improvement1", "improvement2"],
        "content_enhancements": ["enhancement1", "enhancement2"],
        "evolutionary_mutations": ["mutation1", "mutation2"]
    },
    "optimization_thinking": "Detailed thinking about how this prompt could be optimized using evolutionary approaches",
    "recommended_approach": "Specific recommendation for the best optimization approach",
    "expected_outcomes": ["outcome1", "outcome2"]
}"""

            user_message = f"""Analyze this prompt for {goal_description}:

**Prompt:**
{prompt}

**Context:** {context or "No additional context provided"}

**Optimization Goal:** {optimization_goal}

Please provide a comprehensive analysis and optimization suggestions using the GEPA framework insights."""

            response = await client.chat.completions.create(
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
            # Fallback to rule-based thinking
            return await self._rule_based_gepa_think(prompt, context, optimization_goal)

    async def _rule_based_gepa_think(
        self,
        prompt: str,
        context: Optional[str] = None,
        optimization_goal: str = "general"
    ) -> Dict[str, Any]:
        """Rule-based thinking as fallback when LLM is not available"""

        # Basic analysis
        strengths = []
        improvement_areas = []
        structural_improvements = []
        content_enhancements = []
        evolutionary_mutations = []

        # Analyze prompt characteristics
        word_count = len(prompt.split())
        sentence_count = len(prompt.split('.'))

        # Strengths analysis
        if word_count > 20:
            strengths.append("Adequate length for detailed instructions")
        if any(word in prompt.lower() for word in ["example", "for instance", "such as"]):
            strengths.append("Contains examples for clarity")
        if any(word in prompt.lower() for word in ["step", "first", "then", "finally"]):
            strengths.append("Has structural elements")

        # Improvement areas
        if word_count < 20:
            improvement_areas.append("May benefit from more detailed instructions")
        if "example" not in prompt.lower():
            improvement_areas.append("Could benefit from examples")
        if not any(word in prompt.lower() for word in ["step", "first", "then"]):
            improvement_areas.append("Lacks clear step-by-step structure")

        # Structural improvements
        if not any(phrase in prompt.lower() for phrase in ["your task", "you are", "please"]):
            structural_improvements.append("Add clear role definition")
        if not any(phrase in prompt.lower() for phrase in ["format", "structure", "output"]):
            structural_improvements.append("Specify desired output format")
        if not any(phrase in prompt.lower() for phrase in ["consider", "remember", "note"]):
            structural_improvements.append("Add important constraints or considerations")

        # Content enhancements based on goal
        goal_specific_enhancements = {
            "performance": ["Add performance criteria", "Include evaluation metrics", "Specify quality standards"],
            "efficiency": ["Simplify language", "Remove redundancy", "Focus on essential requirements"],
            "clarity": ["Define ambiguous terms", "Add clarifying examples", "Use simpler sentence structure"],
            "robustness": ["Add edge case handling", "Include input validation", "Specify fallback behavior"],
            "creativity": ["Encourage divergent thinking", "Allow multiple approaches", "Include creative constraints"]
        }

        content_enhancements = goal_specific_enhancements.get(optimization_goal, [
            "Add specific examples",
            "Include step-by-step instructions",
            "Specify desired output format"
        ])

        # Evolutionary mutations based on GEPA approach
        evolutionary_mutations = [
            "Rephrase for clarity using different wording",
            "Add contextual examples to improve understanding",
            "Restructure with better logical flow",
            "Add specific constraints and guidelines",
            "Simplify while preserving key instructions"
        ]

        if optimization_goal == "performance":
            evolutionary_mutations.extend([
                "Add performance criteria and evaluation metrics",
                "Include high-quality examples of desired output"
            ])
        elif optimization_goal == "efficiency":
            evolutionary_mutations.extend([
                "Remove redundant instructions",
                "Consolidate related points",
                "Use more concise phrasing"
            ])

        # Generate optimization thinking
        optimization_thinking = f"""This prompt shows potential for evolutionary optimization.

Current analysis indicates the prompt could benefit from {len(improvement_areas)} key improvement areas.
The evolutionary approach would involve systematically exploring variations through:

1. **Mutation-based improvements**: Applying targeted mutations like {', '.join(evolutionary_mutations[:3])}
2. **Crossover combinations**: Blending successful elements from multiple prompt variations
3. **Multi-objective selection**: Balancing {optimization_goal} with clarity, efficiency, and robustness
4. **Iterative refinement**: Progressive improvement through evolutionary selection

The optimization potential appears {'high' if len(improvement_areas) > 2 else 'medium'} given the current prompt structure."""

        # Recommended approach
        recommended_approach = f"Apply GEPA evolutionary optimization with focus on {optimization_goal}, using population-based exploration and multi-objective selection to identify the optimal prompt variants."

        # Expected outcomes
        expected_outcomes = [
            f"Improved {optimization_goal} through systematic refinement",
            "Enhanced prompt clarity and effectiveness",
            "Better balance of competing objectives",
            "More robust prompt that handles varied inputs"
        ]

        return {
            "analysis": {
                "current_strengths": strengths,
                "improvement_areas": improvement_areas,
                "optimization_potential": "high" if len(improvement_areas) > 2 else "medium"
            },
            "suggestions": {
                "structural_improvements": structural_improvements,
                "content_enhancements": content_enhancements,
                "evolutionary_mutations": evolutionary_mutations
            },
            "optimization_thinking": optimization_thinking,
            "recommended_approach": recommended_approach,
            "expected_outcomes": expected_outcomes
        }