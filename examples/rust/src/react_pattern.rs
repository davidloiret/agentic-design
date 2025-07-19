use std::collections::HashMap;
use std::time::{Duration, SystemTime, UNIX_EPOCH};
use tokio::time::sleep;

#[derive(Debug, Clone)]
pub struct Observation {
    pub content: String,
    pub success: bool,
    pub timestamp: u64,
    pub metadata: Option<HashMap<String, String>>,
}

impl Observation {
    pub fn new(content: String, success: bool) -> Self {
        Self {
            content,
            success,
            timestamp: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            metadata: None,
        }
    }

    pub fn with_metadata(mut self, metadata: HashMap<String, String>) -> Self {
        self.metadata = Some(metadata);
        self
    }
}

#[derive(Debug, Clone)]
pub struct Action {
    pub action_type: String,
    pub parameters: HashMap<String, String>,
    pub result: Option<String>,
}

impl Action {
    pub fn new(action_type: &str) -> Self {
        Self {
            action_type: action_type.to_string(),
            parameters: HashMap::new(),
            result: None,
        }
    }

    pub fn with_param(mut self, key: &str, value: &str) -> Self {
        self.parameters.insert(key.to_string(), value.to_string());
        self
    }
}

pub struct ReActAgent {
    thoughts: Vec<String>,
    actions: Vec<Action>,
    observations: Vec<Observation>,
    tools: HashMap<String, Box<dyn Fn(&HashMap<String, String>) -> Result<String, String> + Send + Sync>>,
}

impl ReActAgent {
    pub fn new() -> Self {
        let mut agent = Self {
            thoughts: Vec::new(),
            actions: Vec::new(),
            observations: Vec::new(),
            tools: HashMap::new(),
        };
        
        agent.setup_tools();
        agent
    }

    fn setup_tools(&mut self) {
        // Search tool
        self.tools.insert(
            "search".to_string(),
            Box::new(|params| {
                std::thread::sleep(Duration::from_millis(100));
                
                let query = params.get("query").unwrap_or("");
                let search_results = [
                    ("OpenAI CEO 2024", "Search results show Sam Altman returned as CEO of OpenAI in November 2023"),
                    ("current weather", "Weather API shows 72°F, partly cloudy"),
                    ("Python features", "Python 3.12 released with new features including match statements and type hints"),
                    ("machine learning", "Latest ML research shows advances in transformer architectures"),
                ];
                
                for (key, result) in &search_results {
                    if query.to_lowercase().contains(&key.to_lowercase()) {
                        return Ok(result.to_string());
                    }
                }
                
                Ok(format!("Search results for '{}': Found 42 results about {}", query, query))
            })
        );

        // Fetch tool
        self.tools.insert(
            "fetch".to_string(),
            Box::new(|params| {
                std::thread::sleep(Duration::from_millis(200));
                
                let url = params.get("url").unwrap_or("");
                let url_responses = [
                    ("openai.com", "OpenAI About page confirms Sam Altman as CEO"),
                    ("weather.gov", "Current temperature: 72°F, Humidity: 45%, Wind: 5mph"),
                    ("python.org", "Official Python documentation and downloads"),
                    ("github.com", "GitHub repository with latest code and issues"),
                ];
                
                for (domain, response) in &url_responses {
                    if url.contains(domain) {
                        return Ok(response.to_string());
                    }
                }
                
                Ok(format!("Content fetched from {}: Page loaded successfully", url))
            })
        );

        // Calculate tool
        self.tools.insert(
            "calculate".to_string(),
            Box::new(|params| {
                let expression = params.get("expression").unwrap_or("");
                
                // Simple expression evaluation (very basic for demo)
                match expression {
                    "2+2" => Ok("Calculation result: 2+2 = 4".to_string()),
                    "10*5" => Ok("Calculation result: 10*5 = 50".to_string()),
                    "2^3" => Ok("Calculation result: 2^3 = 8".to_string()),
                    _ => Ok(format!("Calculation result: {} = [computed]", expression)),
                }
            })
        );

        // Finish tool
        self.tools.insert(
            "finish".to_string(),
            Box::new(|params| {
                let result = params.get("result").unwrap_or("Task completed");
                Ok(format!("Task completed: {}", result))
            })
        );
    }

    pub fn think(&mut self, thought: &str) {
        self.thoughts.push(thought.to_string());
        println!("Thought: {}", thought);
    }

    pub fn act(&mut self, action: Action) -> Observation {
        let formatted_params = action.parameters
            .iter()
            .map(|(k, v)| format!("{}='{}'", k, v))
            .collect::<Vec<_>>()
            .join(", ");
        
        println!("Action: {}({})", action.action_type, formatted_params);
        
        let observation = if let Some(tool) = self.tools.get(&action.action_type) {
            match tool(&action.parameters) {
                Ok(result) => Observation::new(result, true),
                Err(error) => Observation::new(
                    format!("Error executing {}: {}", action.action_type, error),
                    false,
                ),
            }
        } else {
            Observation::new(
                format!("Unknown action type: {}", action.action_type),
                false,
            )
        };
        
        println!("Observation: {}", observation.content);
        
        self.actions.push(action);
        self.observations.push(observation.clone());
        
        observation
    }

    pub fn solve(&mut self, task: &str) -> String {
        println!("Task: {}\n", task);
        
        // Clear previous state
        self.thoughts.clear();
        self.actions.clear();
        self.observations.clear();
        
        self.execute_task_logic(task)
    }

    fn execute_task_logic(&mut self, task: &str) -> String {
        if task.contains("OpenAI CEO") {
            self.find_openai_ceo()
        } else if task.contains("weather") {
            self.get_weather_info()
        } else if task.contains("calculate") {
            self.perform_calculation(task)
        } else {
            self.general_research(task)
        }
    }

    fn find_openai_ceo(&mut self) -> String {
        self.think("Need to search for current OpenAI leadership");
        let obs = self.act(Action::new("search").with_param("query", "OpenAI CEO 2024"));
        
        if obs.success {
            self.think("Should verify with official source");
            let obs = self.act(Action::new("fetch").with_param("url", "openai.com"));
            
            if obs.success {
                self.think("Have reliable answer from official source");
                let final_answer = "Sam Altman is the current CEO of OpenAI";
                self.act(Action::new("finish").with_param("result", final_answer));
                return final_answer.to_string();
            }
        }
        
        "Could not determine current OpenAI CEO".to_string()
    }

    fn get_weather_info(&mut self) -> String {
        self.think("Need to get current weather data");
        let obs = self.act(Action::new("search").with_param("query", "current weather"));
        
        if obs.success {
            self.think("Should get more detailed information");
            let obs = self.act(Action::new("fetch").with_param("url", "weather.gov"));
            
            if obs.success {
                self.think("Have comprehensive weather data");
                let final_answer = "Current weather: 72°F, partly cloudy, humidity 45%";
                self.act(Action::new("finish").with_param("result", final_answer));
                return final_answer.to_string();
            }
        }
        
        "Could not retrieve weather information".to_string()
    }

    fn perform_calculation(&mut self, task: &str) -> String {
        self.think("Need to extract mathematical expression from task");
        
        let expression = if task.contains("2+2") {
            "2+2"
        } else if task.contains("10*5") {
            "10*5"
        } else {
            "2^3"
        };
        
        self.think(&format!("Identified expression: {}", expression));
        let obs = self.act(Action::new("calculate").with_param("expression", expression));
        
        if obs.success {
            self.think("Calculation completed successfully");
            let final_answer = obs.content;
            self.act(Action::new("finish").with_param("result", &final_answer));
            return final_answer;
        }
        
        "Could not perform calculation".to_string()
    }

    fn general_research(&mut self, task: &str) -> String {
        self.think(&format!("Need to research topic: {}", task));
        let obs = self.act(Action::new("search").with_param("query", task));
        
        if obs.success {
            self.think("Found relevant information, getting more details");
            let url = if task.to_lowercase().contains("code") {
                "github.com"
            } else {
                "python.org"
            };
            let obs = self.act(Action::new("fetch").with_param("url", url));
            
            if obs.success {
                self.think("Have sufficient information to provide answer");
                let final_answer = format!("Research completed on: {}", task);
                self.act(Action::new("finish").with_param("result", &final_answer));
                return final_answer;
            }
        }
        
        format!("Could not complete research on: {}", task)
    }

    pub fn get_execution_trace(&self) -> ExecutionTrace {
        ExecutionTrace {
            thoughts: self.thoughts.clone(),
            actions: self.actions.clone(),
            observations: self.observations.clone(),
        }
    }

    pub fn print_execution_summary(&self) {
        let success_count = self.observations.iter().filter(|obs| obs.success).count();
        let success_rate = if self.observations.is_empty() {
            0.0
        } else {
            (success_count as f64 / self.observations.len() as f64) * 100.0
        };
        
        println!("\nExecution Summary:");
        println!("- Thoughts: {}", self.thoughts.len());
        println!("- Actions: {}", self.actions.len());
        println!("- Observations: {}", self.observations.len());
        println!("- Success rate: {:.1}%", success_rate);
    }
}

#[derive(Debug)]
pub struct ExecutionTrace {
    pub thoughts: Vec<String>,
    pub actions: Vec<Action>,
    pub observations: Vec<Observation>,
}

#[tokio::main]
async fn main() {
    let mut agent = ReActAgent::new();
    
    // Test different types of tasks
    let tasks = [
        "Find the current CEO of OpenAI",
        "What's the current weather?",
        "Calculate 2+2",
        "Research Python programming",
    ];
    
    for (i, task) in tasks.iter().enumerate() {
        println!("{}", "=".repeat(50));
        println!("Test {}: {}", i + 1, task);
        println!("{}", "=".repeat(50));
        
        let result = agent.solve(task);
        println!("\nFinal Result: {}", result);
        agent.print_execution_summary();
        
        if i < tasks.len() - 1 {
            println!("\n{}", "-".repeat(30));
            println!();
        }
    }
}