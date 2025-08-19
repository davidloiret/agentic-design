from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    app_name: str = "Prompt Optimizer"
    app_version: str = "0.1.0"
    debug: bool = False
    
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    
    default_model: Optional[str] = "gpt-4o-mini"
    max_optimization_iterations: int = 50
    default_validation_split: float = 0.2
    
    log_level: str = "INFO"
    
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        if not self.openai_api_key:
            self.openai_api_key = os.getenv("OPENAI_API_KEY")
        if not self.anthropic_api_key:
            self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")


settings = Settings()