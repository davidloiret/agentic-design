use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExecuteRequest {
    pub language: String,
    pub code: String,
    #[serde(default)]
    pub timeout: Option<u64>, // in seconds, default 30
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExecuteResponse {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
    pub execution_time: f64, // in seconds
}

#[derive(Debug, Clone)]
pub struct Config {
    pub port: u16,
    pub vm_pool_size: usize,
    pub rootfs_path: String,
    pub kernel_path: String,
    pub mem_size_mib: i64,
    pub cpu_count: i64,
    pub network_prefix: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            port: 8000,
            vm_pool_size: 3,
            rootfs_path: "./rootfs/rootfs.ext4".to_string(),
            kernel_path: "./kernel/vmlinux".to_string(),
            mem_size_mib: 2048,
            cpu_count: 1,
            network_prefix: "172.16.0".to_string(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct VMConfig {
    pub id: String,
    pub kernel_path: String,
    pub rootfs_path: String,
    pub mem_size_mib: i64,
    pub cpu_count: i64,
    pub network_config: NetworkConfig,
}

#[derive(Debug, Clone)]
pub struct NetworkConfig {
    pub host_device_name: String,
    pub ip_addr: String,
    pub gateway_addr: String,
    pub netmask: String,
}

#[derive(Debug, Clone)]
pub struct LanguageConfig {
    pub file_extension: String,
    pub run_command: Vec<String>,
    pub compile_cmd: Option<Vec<String>>,
    pub temp_dir: String,
}

pub fn get_language_configs() -> std::collections::HashMap<String, LanguageConfig> {
    let mut configs = std::collections::HashMap::new();
    
    configs.insert("python".to_string(), LanguageConfig {
        file_extension: ".py".to_string(),
        run_command: vec!["python3".to_string(), "%s".to_string()],
        compile_cmd: None,
        temp_dir: "/tmp/python".to_string(),
    });
    
    configs.insert("typescript".to_string(), LanguageConfig {
        file_extension: ".ts".to_string(),
        run_command: vec!["deno".to_string(), "run".to_string(), "--allow-all".to_string(), "%s".to_string()],
        compile_cmd: None,
        temp_dir: "/tmp/typescript".to_string(),
    });
    
    configs.insert("rust".to_string(), LanguageConfig {
        file_extension: ".rs".to_string(),
        run_command: vec!["%s".to_string()],
        compile_cmd: Some(vec!["rustc".to_string(), "-o".to_string(), "%s".to_string(), "%s".to_string()]),
        temp_dir: "/tmp/rust".to_string(),
    });
    
    configs
}

pub fn is_valid_language(lang: &str) -> bool {
    matches!(lang, "python" | "typescript" | "rust")
}

pub fn get_supported_languages() -> Vec<String> {
    vec!["python".to_string(), "typescript".to_string(), "rust".to_string()]
}