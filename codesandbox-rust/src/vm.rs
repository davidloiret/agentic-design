use crate::{Result, CodeboxError, Config, VMConfig, NetworkConfig};
use crate::network::NetworkManager;
use std::fs;
use std::path::Path;
use std::process::Stdio;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::net::TcpStream;
use tokio::sync::{mpsc, Mutex};
use tokio::time::timeout;
use tracing::{debug, error, info};
use uuid::Uuid;

#[derive(Debug)]
pub struct VM {
    pub id: String,
    pub config: VMConfig,
    pub ip_addr: String,
    process: Option<tokio::process::Child>,
}

pub struct Manager {
    available_vms: Arc<Mutex<mpsc::UnboundedReceiver<VM>>>,
    available_sender: mpsc::UnboundedSender<VM>,
    config: Config,
    net_manager: NetworkManager,
}

impl VM {
    pub async fn stop(&mut self) -> Result<()> {
        if let Some(mut process) = self.process.take() {
            // Attempt graceful shutdown first
            let _ = process.kill().await;
            let _ = process.wait().await;
        }

        // Cleanup resources
        if Path::new(&self.config.rootfs_path).exists() {
            let _ = fs::remove_file(&self.config.rootfs_path);
        }

        Ok(())
    }

    pub async fn reset(&self) -> Result<()> {
        // For now, we'll just ensure the VM is still responsive
        // In production, you might want to snapshot/restore the rootfs
        self.wait_for_ready().await
    }

    pub async fn wait_for_ready(&self) -> Result<()> {
        let timeout_duration = Duration::from_secs(30);
        let mut interval = tokio::time::interval(Duration::from_secs(1));
        
        let start = Instant::now();
        
        loop {
            if start.elapsed() > timeout_duration {
                return Err(CodeboxError::Timeout("timeout waiting for VM to be ready".to_string()));
            }
            
            interval.tick().await;
            
            // Try to connect to the agent inside the VM
            match timeout(Duration::from_secs(2), TcpStream::connect(format!("{}:8080", self.ip_addr))).await {
                Ok(Ok(_)) => {
                    debug!("VM {} is ready", self.id);
                    return Ok(());
                }
                Ok(Err(_)) | Err(_) => {
                    // Connection failed, continue waiting
                    continue;
                }
            }
        }
    }
}

impl Manager {
    pub async fn new(config: Config) -> Result<Self> {
        // Create network manager
        let net_manager = NetworkManager::new(config.network_prefix.clone());
        net_manager.setup()?;

        let (sender, receiver) = mpsc::unbounded_channel();

        let manager = Self {
            available_vms: Arc::new(Mutex::new(receiver)),
            available_sender: sender,
            config,
            net_manager,
        };

        // Initialize VM pool
        for i in 0..manager.config.vm_pool_size {
            match manager.create_vm(i).await {
                Ok(vm) => {
                    let _ = manager.available_sender.send(vm);
                }
                Err(e) => {
                    error!("Failed to create VM {}: {}", i, e);
                    continue;
                }
            }
        }

        info!("VM manager initialized with {} VMs", manager.config.vm_pool_size);
        Ok(manager)
    }

    async fn create_vm(&self, index: usize) -> Result<VM> {
        let vm_id = Uuid::new_v4().to_string();
        
        // Create VM-specific rootfs (copy-on-write)
        let vm_rootfs = format!("/tmp/rootfs-{}.ext4", vm_id);
        self.copy_file(&self.config.rootfs_path, &vm_rootfs)?;

        // Network configuration
        let net_config = NetworkConfig {
            host_device_name: format!("fc-tap-{}", index),
            ip_addr: format!("{}.{}", self.config.network_prefix, 100 + index),
            gateway_addr: format!("{}.1", self.config.network_prefix),
            netmask: "255.255.255.0".to_string(),
        };

        let vm_config = VMConfig {
            id: vm_id.clone(),
            kernel_path: self.config.kernel_path.clone(),
            rootfs_path: vm_rootfs,
            mem_size_mib: self.config.mem_size_mib,
            cpu_count: self.config.cpu_count,
            network_config: net_config,
        };

        self.start_vm(vm_config, index).await
    }

    async fn start_vm(&self, config: VMConfig, index: usize) -> Result<VM> {
        // Pre-create TAP device with proper ownership
        self.net_manager.create_tap_device(&config.network_config.host_device_name)?;

        // Socket path for Firecracker API
        let socket_path = format!("/tmp/firecracker-{}.sock", config.id);

        // Generate MAC address for the VM
        let mac_addr = self.generate_mac();

        // Create Firecracker config JSON
        let firecracker_config = serde_json::json!({
            "boot-source": {
                "kernel_image_path": config.kernel_path,
                "boot_args": format!("console=ttyS0 reboot=k panic=1 pci=off vm_id={} init=/init", index)
            },
            "drives": [{
                "drive_id": "rootfs",
                "path_on_host": config.rootfs_path,
                "is_root_device": true,
                "is_read_only": false
            }],
            "machine-config": {
                "vcpu_count": config.cpu_count,
                "mem_size_mib": config.mem_size_mib
            },
            "network-interfaces": [{
                "iface_id": "eth0",
                "guest_mac": mac_addr,
                "host_dev_name": config.network_config.host_device_name
            }]
        });

        // Write config to temporary file
        let config_path = format!("/tmp/firecracker-config-{}.json", config.id);
        fs::write(&config_path, firecracker_config.to_string())?;

        // Start Firecracker process
        let mut cmd = tokio::process::Command::new("firecracker");
        cmd.arg("--api-sock").arg(&socket_path)
            .arg("--config-file").arg(&config_path)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped());

        let process = cmd.spawn()?;

        let ip_addr = config.network_config.ip_addr.clone();
        let vm_id = config.id.clone();
        
        let mut vm = VM {
            id: vm_id,
            config,
            ip_addr,
            process: Some(process),
        };

        // Wait for VM to be ready
        if let Err(e) = vm.wait_for_ready().await {
            vm.stop().await?;
            return Err(CodeboxError::Vm(format!("VM failed to become ready: {}", e)));
        }

        // Cleanup temporary config file
        let _ = fs::remove_file(&config_path);

        info!("VM {} started successfully", vm.id);
        Ok(vm)
    }

    pub async fn get_vm(&self) -> Result<VM> {
        let mut receiver = self.available_vms.lock().await;
        
        match timeout(Duration::from_secs(5), receiver.recv()).await {
            Ok(Some(vm)) => Ok(vm),
            Ok(None) => Err(CodeboxError::ResourceUnavailable("VM pool is closed".to_string())),
            Err(_) => Err(CodeboxError::ResourceUnavailable("No available VMs".to_string())),
        }
    }

    pub async fn return_vm(&self, mut vm: VM) {
        // Reset VM state
        match vm.reset().await {
            Ok(_) => {
                let _ = self.available_sender.send(vm);
            }
            Err(e) => {
                error!("Failed to reset VM {}: {}", vm.id, e);
                // Create a new VM to replace the broken one
                let _ = vm.stop().await;
                
                // Try to create a replacement VM
                match self.create_vm(0).await {
                    Ok(new_vm) => {
                        let _ = self.available_sender.send(new_vm);
                    }
                    Err(e) => {
                        error!("Failed to create replacement VM: {}", e);
                    }
                }
            }
        }
    }

    pub async fn cleanup(&mut self) {
        info!("Cleaning up VM manager");
        
        // Note: In the original Go version, VMs were tracked in vm_pool for cleanup
        // In this Rust version, VMs are managed through channels, so we can't easily
        // iterate over all VMs for cleanup. In production, you might want to maintain
        // a separate registry of VM IDs for cleanup purposes.
        
        // Clean up network
        if let Err(e) = self.net_manager.cleanup() {
            error!("Failed to cleanup network manager: {}", e);
        }
    }

    fn copy_file(&self, src: &str, dst: &str) -> Result<()> {
        fs::copy(src, dst)?;
        Ok(())
    }

    fn generate_mac(&self) -> String {
        use std::time::{SystemTime, UNIX_EPOCH};
        
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_nanos();
        
        let mac: [u8; 6] = [
            0x02, // Locally administered
            ((now >> 8) & 0xff) as u8,
            ((now >> 16) & 0xff) as u8,
            ((now >> 24) & 0xff) as u8,
            ((now >> 32) & 0xff) as u8,
            ((now >> 40) & 0xff) as u8,
        ];
        
        format!("{:02x}:{:02x}:{:02x}:{:02x}:{:02x}:{:02x}",
            mac[0], mac[1], mac[2], mac[3], mac[4], mac[5])
    }
}