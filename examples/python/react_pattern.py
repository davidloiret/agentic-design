#!/usr/bin/env python3

from dataclasses import dataclass
from typing import List, Dict, Optional, Any, Literal
from datetime import datetime
import time
import json

@dataclass
class Observation:
    content: str
    success: bool
    timestamp: datetime
    metadata: Optional[Dict[str, Any]] = None

@dataclass 
class Action:
    action_type: Literal['search', 'fetch', 'calculate', 'finish']
    parameters: Dict[str, Any]
    result: Optional[str] = None

class ReActAgent:
    """
    ReAct (Reasoning + Acting) agent that combines reasoning with external tool use.
    """
    
    def __init__(self):
        self.thoughts: List[str] = []
        self.actions: List[Action] = []
        self.observations: List[Observation] = []
        self.tools = self._setup_tools()
    
    def _setup_tools(self) -> Dict[str, callable]:
        """Setup available tools for the agent."""
        return {
            'search': self._simulate_search,
            'fetch': self._simulate_fetch,
            'calculate': self._simulate_calculate,
            'finish': self._finish_task
        }
    
    def think(self, thought: str):
        """Add a reasoning step."""
        self.thoughts.append(thought)
        print(f"Thought: {thought}")
    
    def act(self, action_type: str, **parameters) -> Observation:
        """Execute an action and return observation."""
        action = Action(action_type=action_type, parameters=parameters)
        self.actions.append(action)
        
        print(f"Action: {action_type}({self._format_parameters(parameters)})")
        
        if action_type not in self.tools:
            observation = Observation(
                content=f"Unknown action type: {action_type}",
                success=False,
                timestamp=datetime.now()
            )
        else:
            try:
                result = self.tools[action_type](**parameters)
                observation = Observation(
                    content=result,
                    success=True,
                    timestamp=datetime.now()
                )
            except Exception as e:
                observation = Observation(
                    content=f"Error executing {action_type}: {str(e)}",
                    success=False,
                    timestamp=datetime.now()
                )
        
        self.observations.append(observation)
        print(f"Observation: {observation.content}")
        return observation
    
    def _format_parameters(self, params: Dict[str, Any]) -> str:
        """Format parameters for display."""
        return ", ".join(f"{k}='{v}'" for k, v in params.items())
    
    def _simulate_search(self, query: str) -> str:
        """Simulate search tool."""
        time.sleep(0.1)  # Simulate API delay
        
        search_results = {
            'OpenAI CEO 2024': 'Search results show Sam Altman returned as CEO of OpenAI in November 2023',
            'current weather': 'Weather API shows 72°F, partly cloudy',
            'Python features': 'Python 3.12 released with new features including match statements and type hints',
            'machine learning': 'Latest ML research shows advances in transformer architectures'
        }
        
        # Find best match
        for key, result in search_results.items():
            if any(word.lower() in query.lower() for word in key.split()):
                return result
        
        return f"Search results for '{query}': Found 42 results about {query}"
    
    def _simulate_fetch(self, url: str) -> str:
        """Simulate fetching content from URL."""
        time.sleep(0.2)  # Simulate network delay
        
        url_responses = {
            'openai.com': 'OpenAI About page confirms Sam Altman as CEO',
            'weather.gov': 'Current temperature: 72°F, Humidity: 45%, Wind: 5mph',
            'python.org': 'Official Python documentation and downloads',
            'github.com': 'GitHub repository with latest code and issues'
        }
        
        for domain, response in url_responses.items():
            if domain in url:
                return response
        
        return f"Content fetched from {url}: Page loaded successfully"
    
    def _simulate_calculate(self, expression: str) -> str:
        """Simulate calculation tool."""
        try:
            # Simple expression evaluation (be careful in real applications!)
            result = eval(expression.replace('^', '**'))
            return f"Calculation result: {expression} = {result}"
        except Exception as e:
            return f"Calculation error: {str(e)}"
    
    def _finish_task(self, result: str) -> str:
        """Finish the task with a result."""
        return f"Task completed: {result}"
    
    def solve(self, task: str) -> str:
        """Solve a task using ReAct methodology."""
        print(f"Task: {task}\n")
        
        # Clear previous state
        self.thoughts = []
        self.actions = []
        self.observations = []
        
        return self._execute_task_logic(task)
    
    def _execute_task_logic(self, task: str) -> str:
        """Execute the specific task logic."""
        if "OpenAI CEO" in task:
            return self._find_openai_ceo()
        elif "weather" in task:
            return self._get_weather_info()
        elif "calculate" in task:
            return self._perform_calculation(task)
        else:
            return self._general_research(task)
    
    def _find_openai_ceo(self) -> str:
        """Find current OpenAI CEO."""
        self.think("Need to search for current OpenAI leadership")
        obs = self.act('search', query='OpenAI CEO 2024')
        
        if obs.success:
            self.think("Should verify with official source")
            obs = self.act('fetch', url='openai.com')
            
            if obs.success:
                self.think("Have reliable answer from official source")
                final_answer = "Sam Altman is the current CEO of OpenAI"
                self.act('finish', result=final_answer)
                return final_answer
        
        return "Could not determine current OpenAI CEO"
    
    def _get_weather_info(self) -> str:
        """Get weather information."""
        self.think("Need to get current weather data")
        obs = self.act('search', query='current weather')
        
        if obs.success:
            self.think("Should get more detailed information")
            obs = self.act('fetch', url='weather.gov')
            
            if obs.success:
                self.think("Have comprehensive weather data")
                final_answer = "Current weather: 72°F, partly cloudy, humidity 45%"
                self.act('finish', result=final_answer)
                return final_answer
        
        return "Could not retrieve weather information"
    
    def _perform_calculation(self, task: str) -> str:
        """Perform mathematical calculation."""
        self.think("Need to extract mathematical expression from task")
        
        # Simple extraction (in real implementation, use NLP)
        if "2+2" in task:
            expression = "2+2"
        elif "10*5" in task:
            expression = "10*5"
        else:
            expression = "2^3"  # Default example
        
        self.think(f"Identified expression: {expression}")
        obs = self.act('calculate', expression=expression)
        
        if obs.success:
            self.think("Calculation completed successfully")
            final_answer = obs.content
            self.act('finish', result=final_answer)
            return final_answer
        
        return "Could not perform calculation"
    
    def _general_research(self, task: str) -> str:
        """General research approach."""
        self.think(f"Need to research topic: {task}")
        obs = self.act('search', query=task)
        
        if obs.success:
            self.think("Found relevant information, getting more details")
            # Extract a reasonable URL from the task or use a default
            url = "github.com" if "code" in task.lower() else "python.org"
            obs = self.act('fetch', url=url)
            
            if obs.success:
                self.think("Have sufficient information to provide answer")
                final_answer = f"Research completed on: {task}"
                self.act('finish', result=final_answer)
                return final_answer
        
        return f"Could not complete research on: {task}"
    
    def get_execution_trace(self) -> Dict[str, List]:
        """Get complete execution trace."""
        return {
            'thoughts': self.thoughts.copy(),
            'actions': [action.__dict__ for action in self.actions],
            'observations': [obs.__dict__ for obs in self.observations]
        }
    
    def print_execution_summary(self):
        """Print a summary of the execution."""
        print(f"\nExecution Summary:")
        print(f"- Thoughts: {len(self.thoughts)}")
        print(f"- Actions: {len(self.actions)}")
        print(f"- Observations: {len(self.observations)}")
        print(f"- Success rate: {sum(1 for obs in self.observations if obs.success) / len(self.observations) * 100:.1f}%")

def main():
    agent = ReActAgent()
    
    # Test different types of tasks
    tasks = [
        "Find the current CEO of OpenAI",
        "What's the current weather?",
        "Calculate 2+2",
        "Research Python programming"
    ]
    
    for i, task in enumerate(tasks, 1):
        print(f"\n{'='*50}")
        print(f"Test {i}: {task}")
        print('='*50)
        
        result = agent.solve(task)
        print(f"\nFinal Result: {result}")
        agent.print_execution_summary()
        
        if i < len(tasks):
            print("\n" + "-"*30 + "\n")

if __name__ == "__main__":
    main()