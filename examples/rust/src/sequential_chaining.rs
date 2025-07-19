use async_trait::async_trait;
use serde_json::Value;
use std::collections::HashMap;
use std::fmt::Debug;
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

    pub fn get_execution_summary(&self) -> ExecutionSummary {
        if self.results.is_empty() {
            return ExecutionSummary::default();
        }

        let total_steps = self.results.len();
        let successful_steps = self.results.iter().filter(|r| r.success).count();
        let total_duration = self.results.iter().map(|r| r.duration).sum();
        let average_duration = total_duration / total_steps as u32;

        ExecutionSummary {
            total_steps,
            successful_steps,
            success_rate: (successful_steps as f64 / total_steps as f64) * 100.0,
            total_duration,
            average_duration,
        }
    }

    pub fn print_summary(&self) {
        let summary = self.get_execution_summary();
        println!("=== Execution Summary ===");
        println!("Total steps: {}", summary.total_steps);
        println!("Successful steps: {}", summary.successful_steps);
        println!("Success rate: {:.1}%", summary.success_rate);
        println!("Total duration: {:.3}s", summary.total_duration.as_secs_f64());
        println!("Average step duration: {:.3}s", summary.average_duration.as_secs_f64());
    }
}

#[derive(Debug, Default)]
pub struct ExecutionSummary {
    pub total_steps: usize,
    pub successful_steps: usize,
    pub success_rate: f64,
    pub total_duration: Duration,
    pub average_duration: Duration,
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
        sleep(Duration::from_millis(500)).await; // Simulate API call
        
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
        
        polished_data["final_review"] = Value::String(final_review);
        polished_data["publish_ready"] = Value::Bool(true);
        polished_data["word_count"] = Value::Number(final_review.split_whitespace().count().into());
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

// Data Processing Chain Implementation
pub struct LoadDataStep;

#[async_trait]
impl ChainStep for LoadDataStep {
    fn name(&self) -> &str {
        "Load Data"
    }

    fn description(&self) -> &str {
        "Load and validate input data"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(200)).await;
        
        let data_source = input.as_str().unwrap_or("unknown");
        
        let mock_data = serde_json::json!({
            "source": data_source,
            "records": [
                {"id": 1, "value": 100, "category": "A"},
                {"id": 2, "value": 200, "category": "B"},
                {"id": 3, "value": 150, "category": "A"},
                {"id": 4, "value": 300, "category": "C"}
            ],
            "metadata": {
                "total_records": 4,
                "loaded_at": chrono::Utc::now().timestamp()
            }
        });
        
        Ok(mock_data)
    }
}

pub struct CleanDataStep;

#[async_trait]
impl ChainStep for CleanDataStep {
    fn name(&self) -> &str {
        "Clean Data"
    }

    fn description(&self) -> &str {
        "Clean and normalize data"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(300)).await;
        
        let mut data = input;
        let records = data["records"].as_array().unwrap();
        
        let mut cleaned_records = Vec::new();
        for record in records {
            let value = record["value"].as_f64().unwrap_or(0.0);
            if value > 0.0 {
                let cleaned_record = serde_json::json!({
                    "id": record["id"],
                    "value": (value * 100.0).round() / 100.0,
                    "category": record["category"].as_str().unwrap_or("").to_uppercase()
                });
                cleaned_records.push(cleaned_record);
            }
        }
        
        let original_count = records.len();
        let cleaned_count = cleaned_records.len();
        
        data["records"] = Value::Array(cleaned_records);
        data["metadata"]["cleaned_records"] = Value::Number(cleaned_count.into());
        data["metadata"]["removed_records"] = Value::Number((original_count - cleaned_count).into());
        
        Ok(data)
    }
}

pub struct TransformDataStep;

#[async_trait]
impl ChainStep for TransformDataStep {
    fn name(&self) -> &str {
        "Transform Data"
    }

    fn description(&self) -> &str {
        "Apply transformations and calculations"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(400)).await;
        
        let mut data = input;
        let records = data["records"].as_array().unwrap();
        
        let total_value: f64 = records
            .iter()
            .map(|r| r["value"].as_f64().unwrap_or(0.0))
            .sum();
        
        let avg_value = if !records.is_empty() {
            total_value / records.len() as f64
        } else {
            0.0
        };
        
        let mut category_sums: HashMap<String, f64> = HashMap::new();
        for record in records {
            let category = record["category"].as_str().unwrap_or("").to_string();
            let value = record["value"].as_f64().unwrap_or(0.0);
            *category_sums.entry(category).or_insert(0.0) += value;
        }
        
        let category_breakdown: Value = category_sums
            .into_iter()
            .map(|(k, v)| (k, Value::Number(serde_json::Number::from_f64(v).unwrap())))
            .collect::<serde_json::Map<_, _>>()
            .into();
        
        data["aggregates"] = serde_json::json!({
            "total_value": total_value,
            "average_value": avg_value,
            "category_breakdown": category_breakdown,
            "record_count": records.len()
        });
        
        Ok(data)
    }
}

pub struct ValidateResultsStep;

#[async_trait]
impl ChainStep for ValidateResultsStep {
    fn name(&self) -> &str {
        "Validate Results"
    }

    fn description(&self) -> &str {
        "Validate the processed data"
    }

    async fn execute(&self, input: Value) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        sleep(Duration::from_millis(100)).await;
        
        let mut data = input;
        let records = data["records"].as_array().unwrap();
        
        let data_integrity = true;
        let completeness = !records.is_empty();
        let consistency = records.iter().all(|r| r["value"].as_f64().unwrap_or(-1.0) >= 0.0);
        
        let calculated_total: f64 = records
            .iter()
            .map(|r| r["value"].as_f64().unwrap_or(0.0))
            .sum();
        
        let stored_total = data["aggregates"]["total_value"].as_f64().unwrap_or(0.0);
        let aggregate_accuracy = (calculated_total - stored_total).abs() < 0.01;
        
        let validation_results = serde_json::json!({
            "data_integrity": data_integrity,
            "completeness": completeness,
            "consistency": consistency,
            "aggregate_accuracy": aggregate_accuracy
        });
        
        let quality_score = [data_integrity, completeness, consistency, aggregate_accuracy]
            .iter()
            .map(|&b| if b { 1.0 } else { 0.0 })
            .sum::<f64>() / 4.0;
        
        data["validation"] = validation_results;
        data["quality_score"] = Value::Number(serde_json::Number::from_f64(quality_score).unwrap());
        
        Ok(data)
    }
}

pub fn create_data_processing_chain() -> SequentialChain {
    let mut chain = SequentialChain::new();
    
    chain.add_step(LoadDataStep);
    chain.add_step(CleanDataStep);
    chain.add_step(TransformDataStep);
    chain.add_step(ValidateResultsStep);
    
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
    
    println!("\n{}\n", "=".repeat(50));
    
    println!("=== Data Processing Chain ===");
    
    let mut data_chain = create_data_processing_chain();
    let data_source = Value::String("sales_data.csv".to_string());
    
    println!("Processing data from: {}\n", data_source);
    
    match data_chain.execute(data_source).await {
        Ok(result) => {
            println!("=== Final Result ===");
            if let Some(aggregates) = result["aggregates"].as_object() {
                println!("Processed {} records", aggregates["record_count"]);
                println!("Total value: ${}", aggregates["total_value"]);
                println!("Average value: ${:.2}", aggregates["average_value"]);
            }
            if let Some(quality_score) = result["quality_score"].as_f64() {
                println!("Quality score: {:.1}%", quality_score * 100.0);
            }
            println!();
            data_chain.print_summary();
        }
        Err(error) => {
            println!("Data processing chain failed: {}", error);
        }
    }
    
    Ok(())
}