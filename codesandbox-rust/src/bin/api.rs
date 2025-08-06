use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::Json as ResponseJson,
    routing::{get, post},
    Router,
};
use codesandbox_rust::{
    vm::{Manager, VM},
    Config, ExecuteRequest, ExecuteResponse, Result, CodeboxError,
    get_supported_languages, is_valid_language,
};
use serde_json::{json, Value};
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use tracing::{error, info};
use tracing_subscriber;
use uuid::Uuid;

#[derive(Clone)]
struct AppState {
    vm_manager: Arc<Manager>,
    config: Config,
}

#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "api=info".into()),
        )
        .json()
        .init();

    // Load configuration
    let config = load_config();
    info!("Starting API server with config: {:?}", config);

    // Create VM manager
    let vm_manager = match Manager::new(config.clone()).await {
        Ok(manager) => Arc::new(manager),
        Err(e) => {
            error!("Failed to create VM manager: {}", e);
            std::process::exit(1);
        }
    };

    // Create application state
    let state = AppState {
        vm_manager,
        config: config.clone(),
    };

    // Create the application
    let app = create_app(state);

    // Start the server
    let listener = TcpListener::bind(format!("0.0.0.0:{}", config.port))
        .await
        .expect("Failed to bind to address");

    info!("API server starting on port {}", config.port);

    // Start the server
    axum::serve(listener, app)
        .await
        .expect("Failed to start server");
}

fn load_config() -> Config {
    let mut config = Config::default();

    // Override with environment variables
    if let Ok(port) = std::env::var("API_PORT") {
        if let Ok(p) = port.parse() {
            config.port = p;
        }
    }

    if let Ok(rootfs_path) = std::env::var("ROOTFS_PATH") {
        config.rootfs_path = rootfs_path;
    }

    if let Ok(kernel_path) = std::env::var("KERNEL_PATH") {
        config.kernel_path = kernel_path;
    }

    config
}

fn create_app(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/execute", post(execute_code))
        .route("/languages", get(get_languages))
        .layer(CorsLayer::permissive())
        .with_state(state)
}

async fn health_check() -> ResponseJson<Value> {
    ResponseJson(json!({
        "status": "healthy",
        "time": chrono::Utc::now().timestamp()
    }))
}

async fn get_languages() -> ResponseJson<Value> {
    ResponseJson(json!({
        "languages": get_supported_languages()
    }))
}

async fn execute_code(
    State(state): State<AppState>,
    Json(req): Json<ExecuteRequest>,
) -> std::result::Result<ResponseJson<ExecuteResponse>, (StatusCode, ResponseJson<ExecuteResponse>)> {
    let request_id = Uuid::new_v4().to_string();
    let start_time = Instant::now();

    // Validate request
    if req.code.trim().is_empty() {
        let response = ExecuteResponse {
            request_id: Some(request_id),
            success: false,
            output: None,
            error: Some("Code cannot be empty".to_string()),
            execution_time: start_time.elapsed().as_secs_f64(),
        };
        return Err((StatusCode::BAD_REQUEST, ResponseJson(response)));
    }

    // Validate language
    if !is_valid_language(&req.language) {
        let response = ExecuteResponse {
            request_id: Some(request_id),
            success: false,
            output: None,
            error: Some(format!("Unsupported language: {}", req.language)),
            execution_time: start_time.elapsed().as_secs_f64(),
        };
        return Err((StatusCode::BAD_REQUEST, ResponseJson(response)));
    }

    // Set default timeout
    let _timeout = req.timeout.unwrap_or(30);

    // Get a VM from the pool
    let vm = match state.vm_manager.get_vm().await {
        Ok(vm) => vm,
        Err(e) => {
            error!("Failed to get VM from pool: {}", e);
            let response = ExecuteResponse {
                request_id: Some(request_id),
                success: false,
                output: None,
                error: Some("No available VMs".to_string()),
                execution_time: start_time.elapsed().as_secs_f64(),
            };
            return Err((StatusCode::SERVICE_UNAVAILABLE, ResponseJson(response)));
        }
    };

    // Execute code in the VM
    let result = execute_in_vm(&vm, &req, &request_id).await;
    let execution_time = start_time.elapsed().as_secs_f64();

    // Return VM to pool
    state.vm_manager.return_vm(vm).await;

    match result {
        Ok(mut response) => {
            response.request_id = Some(request_id);
            response.execution_time = execution_time;
            Ok(ResponseJson(response))
        }
        Err(e) => {
            error!("Code execution failed for request {}: {}", request_id, e);
            let response = ExecuteResponse {
                request_id: Some(request_id),
                success: false,
                output: None,
                error: Some(e.to_string()),
                execution_time,
            };
            Ok(ResponseJson(response))
        }
    }
}

async fn execute_in_vm(vm: &VM, req: &ExecuteRequest, request_id: &str) -> Result<ExecuteResponse> {
    let agent_url = format!("http://{}:8080/execute", vm.ip_addr);
    
    // Create HTTP client with timeout
    let timeout_duration = Duration::from_secs(req.timeout.unwrap_or(30) + 5);
    let client = reqwest::Client::builder()
        .timeout(timeout_duration)
        .build()?;

    info!("Sending request {} to agent at {}", request_id, agent_url);

    // Send request to agent
    let response = client
        .post(&agent_url)
        .json(req)
        .send()
        .await?;

    if !response.status().is_success() {
        let status = response.status();
        let body = response.text().await.unwrap_or_default();
        return Err(CodeboxError::Http(format!(
            "agent returned status {}: {}",
            status, body
        )));
    }

    // Parse response
    let result: ExecuteResponse = response.json().await?;
    Ok(result)
}

// Graceful shutdown handler
async fn shutdown_signal() {
    use tokio::signal;

    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    info!("Received shutdown signal");
}