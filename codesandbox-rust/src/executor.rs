use crate::{Result, CodeboxError};
use std::fs;
use std::path::Path;
use std::process::Stdio;
use std::time::Duration;
use tokio::process::Command;
use tokio::time::timeout;
use tracing::error;

pub struct Executor {
    work_dir: String,
    max_file_size: u64,
    max_processes: u32,
    max_memory: u64,
}

impl Executor {
    pub fn new(work_dir: String) -> Self {
        Self {
            work_dir,
            max_file_size: 10 * 1024 * 1024, // 10MB
            max_processes: 10,
            max_memory: 256 * 1024 * 1024, // 256MB
        }
    }

    pub async fn execute_code(&self, language: &str, code: &str, timeout_duration: Duration) -> Result<String> {
        // Create isolated directory for this execution
        let exec_id = format!("{}", chrono::Utc::now().timestamp_nanos_opt().unwrap_or(0));
        let exec_dir = format!("{}/{}", self.work_dir, exec_id);
        
        fs::create_dir_all(&exec_dir)?;
        
        // Ensure cleanup happens
        let _cleanup_guard = CleanupGuard::new(exec_dir.clone());

        // Change to execution directory
        let original_dir = std::env::current_dir()?;
        std::env::set_current_dir(&exec_dir)?;
        
        let result = match language.to_lowercase().as_str() {
            "python" => self.execute_python(code, timeout_duration).await,
            "typescript" => self.execute_typescript(code, timeout_duration).await,
            "rust" => self.execute_rust(code, timeout_duration).await,
            _ => Err(CodeboxError::Execution(format!("unsupported language: {}", language))),
        };

        // Restore original directory
        std::env::set_current_dir(original_dir)?;
        
        result
    }

    async fn execute_python(&self, code: &str, timeout_duration: Duration) -> Result<String> {
        // Write code to file
        let filename = "main.py";
        fs::write(filename, code)?;

        // Execute
        self.run_command(timeout_duration, &["python3", filename]).await
    }

    async fn execute_typescript(&self, code: &str, timeout_duration: Duration) -> Result<String> {
        // Write code to file
        let filename = "main.ts";
        fs::write(filename, code)?;

        // Execute with Deno
        self.run_command(timeout_duration, &["deno", "run", "--allow-all", filename]).await
    }

    async fn execute_rust(&self, code: &str, timeout_duration: Duration) -> Result<String> {
        // Write code to file
        let filename = "main.rs";
        fs::write(filename, code)?;

        // Compile
        let compile_timeout = timeout_duration / 2;
        let result = timeout(
            compile_timeout,
            Command::new("rustc")
                .args(&["-o", "main", filename])
                .stdout(Stdio::piped())
                .stderr(Stdio::piped())
                .spawn()?
                .wait_with_output()
        ).await;

        match result {
            Ok(Ok(output)) => {
                if !output.status.success() {
                    let stderr = String::from_utf8_lossy(&output.stderr);
                    return Err(CodeboxError::Execution(format!("compilation failed: {}", stderr)));
                }
            }
            Ok(Err(e)) => return Err(CodeboxError::Execution(format!("compilation error: {}", e))),
            Err(_) => return Err(CodeboxError::Timeout("compilation timed out".to_string())),
        }

        // Execute
        self.run_command(timeout_duration / 2, &["./main"]).await
    }

    async fn run_command(&self, timeout_duration: Duration, args: &[&str]) -> Result<String> {
        if args.is_empty() {
            return Err(CodeboxError::Execution("empty command".to_string()));
        }

        let mut cmd = Command::new(args[0]);
        cmd.args(&args[1..])
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .kill_on_drop(true);

        // Set environment variables for security
        cmd.env_clear()
            .env("PATH", "/usr/local/bin:/usr/bin:/bin")
            .env("HOME", "/tmp")
            .env("USER", "sandbox")
            .env("TMPDIR", "/tmp");

        // Set Rust environment if needed
        if args[0] == "rustc" || args[0].starts_with("./") {
            cmd.env("PATH", "/root/.cargo/bin:/root/.rustup/toolchains/stable-x86_64-unknown-linux-musl/bin:/usr/local/bin:/usr/bin:/bin")
                .env("RUSTUP_HOME", "/root/.rustup")
                .env("CARGO_HOME", "/root/.cargo");
        }

        let child = cmd.spawn()?;
        
        let result = timeout(timeout_duration, child.wait_with_output()).await;
        
        match result {
            Ok(Ok(output)) => {
                let stdout = String::from_utf8_lossy(&output.stdout);
                let stderr = String::from_utf8_lossy(&output.stderr);
                
                let mut combined_output = String::new();
                if !stdout.is_empty() {
                    combined_output.push_str(&stdout);
                }
                if !stderr.is_empty() {
                    if !combined_output.is_empty() {
                        combined_output.push('\n');
                    }
                    combined_output.push_str(&stderr);
                }

                if !output.status.success() {
                    return Err(CodeboxError::Execution(format!(
                        "process exited with code {}: {}",
                        output.status.code().unwrap_or(-1),
                        combined_output
                    )));
                }

                Ok(combined_output)
            }
            Ok(Err(e)) => Err(CodeboxError::Execution(format!("process error: {}", e))),
            Err(_) => Err(CodeboxError::Timeout(format!("execution timed out after {:?}", timeout_duration))),
        }
    }

    pub fn set_limits() -> Result<()> {
        // Set resource limits using rlimit
        use rlimit::{Resource, setrlimit};

        // CPU time limit (30 seconds)
        setrlimit(Resource::CPU, 30, 30)
            .map_err(|e| CodeboxError::System(format!("failed to set CPU limit: {}", e)))?;

        // Memory limit (256MB)
        setrlimit(Resource::AS, 256 * 1024 * 1024, 256 * 1024 * 1024)
            .map_err(|e| CodeboxError::System(format!("failed to set memory limit: {}", e)))?;

        // File size limit (10MB)
        setrlimit(Resource::FSIZE, 10 * 1024 * 1024, 10 * 1024 * 1024)
            .map_err(|e| CodeboxError::System(format!("failed to set file size limit: {}", e)))?;

        // Process count limit
        setrlimit(Resource::NPROC, 10, 10)
            .map_err(|e| CodeboxError::System(format!("failed to set process limit: {}", e)))?;

        // Open file limit
        setrlimit(Resource::NOFILE, 100, 100)
            .map_err(|e| CodeboxError::System(format!("failed to set file descriptor limit: {}", e)))?;

        Ok(())
    }
}

// RAII cleanup guard to ensure directory cleanup
struct CleanupGuard {
    path: String,
}

impl CleanupGuard {
    fn new(path: String) -> Self {
        Self { path }
    }
}

impl Drop for CleanupGuard {
    fn drop(&mut self) {
        if Path::new(&self.path).exists() {
            if let Err(e) = fs::remove_dir_all(&self.path) {
                error!("Failed to cleanup execution directory {}: {}", self.path, e);
            }
        }
    }
}