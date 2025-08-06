use axum::{
    extract::Json,
    http::StatusCode,
    response::Json as ResponseJson,
    routing::{get, post},
    Router,
};
use codesandbox_rust::{
    executor::Executor,
    get_language_configs, ExecuteRequest, ExecuteResponse,
};
use serde_json::{json, Value};
use std::fs;
use std::path::Path;
use std::time::{Duration, Instant};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use tracing::{error, info};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "agent=info".into()),
        )
        .json()
        .init();

    // Set resource limits
    if let Err(e) = Executor::set_limits() {
        error!("Failed to set resource limits: {}", e);
        std::process::exit(1);
    }

    // Create temp directories for each language
    let language_configs = get_language_configs();
    for config in language_configs.values() {
        if let Err(e) = fs::create_dir_all(&config.temp_dir) {
            error!("Failed to create temp directory {}: {}", config.temp_dir, e);
            std::process::exit(1);
        }
    }

    // Set up the application
    let app = create_app();

    // Get port from environment or use default
    let port = std::env::var("AGENT_PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse::<u16>()
        .unwrap_or(8080);

    let listener = TcpListener::bind(format!("0.0.0.0:{}", port))
        .await
        .expect("Failed to bind to address");

    info!("Agent server starting on port {}", port);

    // Start the server
    axum::serve(listener, app)
        .await
        .expect("Failed to start server");
}

fn create_app() -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/execute", post(execute_code))
        .layer(CorsLayer::permissive())
}

async fn health_check() -> ResponseJson<Value> {
    ResponseJson(json!({
        "status": "healthy",
        "time": chrono::Utc::now().timestamp()
    }))
}

async fn execute_code(Json(req): Json<ExecuteRequest>) -> std::result::Result<ResponseJson<ExecuteResponse>, (StatusCode, ResponseJson<ExecuteResponse>)> {
    let start_time = Instant::now();

    // Validate language
    let language_configs = get_language_configs();
    let _lang_config = match language_configs.get(&req.language.to_lowercase()) {
        Some(config) => config,
        None => {
            let response = ExecuteResponse {
                request_id: None,
                success: false,
                output: None,
                error: Some(format!("Unsupported language: {}", req.language)),
                execution_time: start_time.elapsed().as_secs_f64(),
            };
            return Err((StatusCode::BAD_REQUEST, ResponseJson(response)));
        }
    };

    // Set default timeout
    let timeout_secs = req.timeout.unwrap_or(30);
    let timeout_duration = Duration::from_secs(timeout_secs);

    // Create executor
    let executor = Executor::new("/tmp".to_string());

    // Execute code
    let result = executor.execute_code(&req.language, &req.code, timeout_duration).await;
    let execution_time = start_time.elapsed().as_secs_f64();

    match result {
        Ok(output) => {
            let response = ExecuteResponse {
                request_id: None,
                success: true,
                output: Some(output),
                error: None,
                execution_time,
            };
            Ok(ResponseJson(response))
        }
        Err(e) => {
            error!("Code execution failed for language {}: {}", req.language, e);
            let response = ExecuteResponse {
                request_id: None,
                success: false,
                output: None,
                error: Some(e.to_string()),
                execution_time,
            };
            Ok(ResponseJson(response))
        }
    }
}

// RAII guard for file cleanup
struct FileCleanupGuard {
    path: String,
}

impl FileCleanupGuard {
    fn new(path: String) -> Self {
        Self { path }
    }
}

impl Drop for FileCleanupGuard {
    fn drop(&mut self) {
        if Path::new(&self.path).exists() {
            if let Err(e) = fs::remove_file(&self.path) {
                error!("Failed to cleanup file {}: {}", self.path, e);
            }
        }
        
        // Also try to clean up executable for compiled languages
        let executable_path = self.path.trim_end_matches(".rs").to_string();
        if executable_path != self.path && Path::new(&executable_path).exists() {
            if let Err(e) = fs::remove_file(&executable_path) {
                error!("Failed to cleanup executable {}: {}", executable_path, e);
            }
        }
    }
}