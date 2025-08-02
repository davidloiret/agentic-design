use async_trait::async_trait;
use serde_json::Value;
use std::time::{Duration, Instant};
use tokio::time::sleep;

#[async_trait]
pub trait ChainStep: Send + Sync {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>>;
}

#[derive(Debug, Clone)]
pub struct ChainResult {
    pub step_name: String,
    pub input_data: Value,
    pub output_data: Option<Value>,
    pub duration: Duration,
    pub success: bool,
    pub error: Option<String>,
}

impl ChainResult {
    pub fn success(step_name: String, input: Value, output: Value, duration: Duration) -> Self {
        Self {
            step_name,
            input_data: input,
            output_data: Some(output),
            duration,
            success: true,
            error: None,
        }
    }

    pub fn failure(step_name: String, input: Value, duration: Duration, error: String) -> Self {
        Self {
            step_name,
            input_data: input,
            output_data: None,
            duration,
            success: false,
            error: Some(error),
        }
    }
}

pub struct SequentialChain {
    steps: Vec<Box<dyn ChainStep>>,
    results: Vec<ChainResult>,
}

impl SequentialChain {
    pub fn new() -> Self {
        Self {
            steps: Vec::new(),
            results: Vec::new(),
        }
    }

    pub fn add_step<T: ChainStep + 'static>(&mut self, step: T) {
        self.steps.push(Box::new(step));
    }

    pub async fn execute(&mut self, initial_input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        println!("Starting sequential chain with {} steps\n", self.steps.len());
        
        let mut current_input = initial_input;
        self.results.clear();

        for (i, step) in self.steps.iter().enumerate() {
            let start_time = Instant::now();
            
            println!("Step {}: {}", i + 1, step.name());
            println!("Description: {}", step.description());
            println!("Input: {}", current_input);
            
            match step.execute(current_input.clone()).await {
                Ok(output) => {
                    let duration = start_time.elapsed();
                    let result = ChainResult::success(
                        step.name().to_string(),
                        current_input.clone(),
                        output.clone(),
                        duration,
                    );
                    
                    self.results.push(result);
                    
                    println!("Output: {}", output);
                    println!("Duration: {:.3}s", duration.as_secs_f64());
                    println!("✅ Success\n");
                    
                    current_input = output;
                }
                Err(error) => {
                    let duration = start_time.elapsed();
                    let result = ChainResult::failure(
                        step.name().to_string(),
                        current_input,
                        duration,
                        error.to_string(),
                    );
                    
                    self.results.push(result);
                    
                    println!("❌ Error: {}", error);
                    println!("Duration: {:.3}s\n", duration.as_secs_f64());
                    
                    return Err(format!("Chain failed at step '{}': {}", step.name(), error).into());
                }
            }
        }

        Ok(current_input)
    }

    pub fn get_results(&self) -> &[ChainResult] {
        &self.results
    }

    pub fn print_summary(&self) {
        if self.results.is_empty() {
            return;
        }

        let total_steps = self.results.len();
        let successful_steps = self.results.iter().filter(|r| r.success).count();
        let total_duration: Duration = self.results.iter().map(|r| r.duration).sum();
        let average_duration = total_duration / total_steps as u32;

        println!("=== Execution Summary ===");
        println!("Total steps: {}", total_steps);
        println!("Successful steps: {}", successful_steps);
        println!("Success rate: {:.1}%", (successful_steps as f64 / total_steps as f64) * 100.0);
        println!("Total duration: {:.3}s", total_duration.as_secs_f64());
        println!("Average step duration: {:.3}s", average_duration.as_secs_f64());
    }
}

// Product Review Chain Implementation
pub struct ResearchFeaturesStep;

#[async_trait]
impl ChainStep for ResearchFeaturesStep {
    fn name(&self) -> &str {
        "Research Features"
    }

    fn description(&self) -> &str {
        "Analyze product features and specifications"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(500)).await;
        
        let product_name = input.as_str().unwrap_or("Unknown Product");
        
        let features = serde_json::json!({
            "product_name": product_name,
            "key_features": [
                "High-quality materials",
                "User-friendly interface",
                "Energy efficient",
                "Warranty included"
            ],
            "price": "$99.99",
            "rating": 4.2,
            "category": "Electronics"
        });
        
        Ok(features)
    }
}

pub struct CompetitorAnalysisStep;

#[async_trait]
impl ChainStep for CompetitorAnalysisStep {
    fn name(&self) -> &str {
        "Competitor Analysis"
    }

    fn description(&self) -> &str {
        "Compare features with competitors"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(300)).await;
        
        let mut product_data = input;
        
        product_data["competitor_comparison"] = serde_json::json!({
            "price": "Average for category",
            "features": "Above average feature set",
            "quality": "Higher quality than most competitors",
            "value": "Good value for money",
            "market_position": "Top 25% in category"
        });
        
        Ok(product_data)
    }
}

pub struct GenerateReviewStep;

#[async_trait]
impl ChainStep for GenerateReviewStep {
    fn name(&self) -> &str {
        "Generate Review"
    }

    fn description(&self) -> &str {
        "Create initial review based on analysis"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(400)).await;
        
        let mut review_data = input;
        
        let product_name = review_data["product_name"].as_str().unwrap_or("Product");
        let price = review_data["price"].as_str().unwrap_or("$0");
        let key_features = review_data["key_features"].as_array().unwrap();
        let features_text = key_features
            .iter()
            .map(|f| f.as_str().unwrap_or(""))
            .collect::<Vec<_>>()
            .join(", ");
        
        let comparison = &review_data["competitor_comparison"];
        let value = comparison["value"].as_str().unwrap_or("Good value");
        let quality = comparison["quality"].as_str().unwrap_or("Good quality");
        let market_position = comparison["market_position"].as_str().unwrap_or("Good position");
        
        let review_text = format!(
            "The {} offers an impressive feature set at {}. \
             With its {}, it stands out in the market. \
             {} and {}. The product maintains a {} position in its category.",
            product_name, price, features_text, value, quality, market_position
        );
        
        let rating = review_data["rating"].as_f64().unwrap_or(0.0);
        
        review_data["review_text"] = Value::String(review_text);
        review_data["recommendation"] = Value::String(
            if rating >= 4.0 { "Recommended" } else { "Consider alternatives" }.to_string()
        );
        
        Ok(review_data)
    }
}

pub struct PolishReviewStep;

#[async_trait]
impl ChainStep for PolishReviewStep {
    fn name(&self) -> &str {
        "Polish Review"
    }

    fn description(&self) -> &str {
        "Improve clarity and tone of the review"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(200)).await;
        
        let mut polished_data = input;
        
        let rating = polished_data["rating"].as_f64().unwrap_or(0.0);
        let rating_stars = "⭐".repeat(rating as usize);
        let recommendation = polished_data["recommendation"].as_str().unwrap_or("Unknown");
        let review_text = polished_data["review_text"].as_str().unwrap_or("");
        let price = polished_data["price"].as_str().unwrap_or("$0");
        
        let key_features = polished_data["key_features"].as_array().unwrap();
        let features_text = key_features
            .iter()
            .map(|f| f.as_str().unwrap_or(""))
            .collect::<Vec<_>>()
            .join(", ");
        
        let market_position = polished_data["competitor_comparison"]["market_position"]
            .as_str().unwrap_or("Good position");
        let value_assessment = polished_data["competitor_comparison"]["value"]
            .as_str().unwrap_or("Good value");
        
        let final_review = format!(
            "{} {}/5 - {}\n\n{}\n\n💰 Price: {}\n🔥 Key Features: {}\n📊 Market Position: {}\n💎 Value Assessment: {}",
            rating_stars, rating, recommendation, review_text, price, features_text, market_position, value_assessment
        );

        // Compute word_count BEFORE moving `final_review` into the JSON value
        let word_count = final_review.split_whitespace().count() as u64;
        
        polished_data["final_review"] = Value::String(final_review);
        polished_data["publish_ready"] = Value::Bool(true);
        polished_data["word_count"] = Value::Number(word_count.into());
        polished_data["sentiment"] = Value::String(
            if rating >= 4.0 { "positive" } else { "neutral" }.to_string()
        );
        
        Ok(polished_data)
    }
}

pub fn create_product_review_chain() -> SequentialChain {
    let mut chain = SequentialChain::new();
    
    chain.add_step(ResearchFeaturesStep);
    chain.add_step(CompetitorAnalysisStep);
    chain.add_step(GenerateReviewStep);
    chain.add_step(PolishReviewStep);
    
    chain
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("=== Product Review Chain ===");
    
    let mut review_chain = create_product_review_chain();
    let product_name = Value::String("Smart Widget Pro".to_string());
    
    println!("Creating review for: {}\n", product_name);
    
    match review_chain.execute(product_name).await {
        Ok(result) => {
            println!("=== Final Result ===");
            if let Some(final_review) = result["final_review"].as_str() {
                println!("{}", final_review);
            }
            println!();
            review_chain.print_summary();
        }
        Err(error) => {
            println!("Review chain failed: {}", error);
        }
    }
    
    Ok(())
}
