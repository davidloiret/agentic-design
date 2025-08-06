use thiserror::Error;

pub type Result<T> = std::result::Result<T, CodeboxError>;

#[derive(Error, Debug)]
pub enum CodeboxError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("HTTP error: {0}")]
    Http(String),

    #[error("Request error: {0}")]
    Request(#[from] reqwest::Error),

    #[error("JSON error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("UUID error: {0}")]
    Uuid(#[from] uuid::Error),

    #[error("Network error: {0}")]
    Network(String),

    #[error("VM error: {0}")]
    Vm(String),

    #[error("Execution error: {0}")]
    Execution(String),

    #[error("Timeout error: {0}")]
    Timeout(String),

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Resource unavailable: {0}")]
    ResourceUnavailable(String),

    #[error("System error: {0}")]
    System(String),

    #[error("Configuration error: {0}")]
    Config(String),
}