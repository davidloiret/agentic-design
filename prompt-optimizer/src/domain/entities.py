from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
from enum import Enum


class OptimizationMetric(str, Enum):
    ACCURACY = "accuracy"
    PRECISION = "precision"
    RECALL = "recall"
    F1_SCORE = "f1_score"
    CUSTOM = "custom"


class OptimizationStrategy(str, Enum):
    BOOTSTRAP_FEWSHOT = "bootstrap_fewshot"
    MIPRO = "mipro"
    COPRO = "copro"
    BOOTSTRAP_FINETUNE = "bootstrap_finetune"


class PromptTemplate(BaseModel):
    id: Optional[str] = None
    template: str = Field(..., description="The prompt template with placeholders")
    parameters: Dict[str, Any] = Field(default_factory=dict)
    description: Optional[str] = None


class TrainingExample(BaseModel):
    inputs: Dict[str, Any]
    expected_output: str
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class OptimizationRequest(BaseModel):
    prompt_template: PromptTemplate
    training_data: List[TrainingExample]
    metric: OptimizationMetric = OptimizationMetric.ACCURACY
    strategy: OptimizationStrategy = OptimizationStrategy.BOOTSTRAP_FEWSHOT
    max_iterations: int = Field(default=10, ge=1, le=100)
    validation_split: float = Field(default=0.2, ge=0.1, le=0.5)
    target_model: str = Field(default="openai/gpt-3.5-turbo")


class OptimizedPrompt(BaseModel):
    original_template: str
    optimized_template: str
    dspy_signature: Optional[str] = None  # DSPy internal representation
    dspy_history: Optional[str] = None  # DSPy inspect_history visualization
    performance_score: float
    optimization_history: List[Dict[str, Any]] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class OptimizationResult(BaseModel):
    request_id: str
    status: str
    optimized_prompt: Optional[OptimizedPrompt] = None
    error_message: Optional[str] = None
    created_at: str
    completed_at: Optional[str] = None