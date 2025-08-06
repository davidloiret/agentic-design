use crate::{Result, CodeboxError};
use std::process::Command;
use std::sync::Mutex;
use std::thread::sleep;
use std::time::Duration;
use tracing::{debug, error};

pub struct NetworkManager {
    bridge_name: String,
    subnet: String,
}

// Serialize TAP creation to avoid name races
static TAP_MUTEX: Mutex<()> = Mutex::new(());

impl NetworkManager {
    pub fn new(subnet: String) -> Self {
        Self {
            bridge_name: "fcbridge".to_string(),
            subnet,
        }
    }

    pub fn setup(&self) -> Result<()> {
        let output = Command::new("ip")
            .args(&["link", "show", &self.bridge_name])
            .output()?;

        if !output.status.success() {
            return Err(CodeboxError::Network(format!(
                "bridge {} not found. Please run scripts/setup-host-network.sh first: {}",
                self.bridge_name,
                String::from_utf8_lossy(&output.stderr)
            )));
        }

        let stdout = String::from_utf8_lossy(&output.stdout);
        if !stdout.contains("UP") {
            self.exec_command(&["sudo", "ip", "link", "set", &self.bridge_name, "up"])?;
        }

        Ok(())
    }

    pub fn cleanup(&self) -> Result<()> {
        // No-op; TAPs are per-VM
        Ok(())
    }

    pub fn create_tap_device_auto(&self) -> Result<String> {
        let _guard = TAP_MUTEX.lock().unwrap();

        // Try a small number of candidates to be resilient to races with other processes
        const MAX_CANDIDATES: usize = 64;
        for _ in 0..MAX_CANDIDATES {
            let name = self.next_free_tap_name("fc-tap")?;
            
            // Attempt creation; if busy, loop to a new candidate
            match self.create_tap_internal(&name) {
                Ok(_) => return Ok(name),
                Err(e) if e.to_string().contains("Device or resource busy") => {
                    // Someone beat us to it. Try another name after a tiny backoff.
                    sleep(Duration::from_millis(50));
                    continue;
                }
                Err(e) => return Err(e),
            }
        }
        
        Err(CodeboxError::Network("exhausted candidates while creating TAP device (busy)".to_string()))
    }

    pub fn create_tap_device(&self, name: &str) -> Result<()> {
        let _guard = TAP_MUTEX.lock().unwrap();
        self.create_tap_internal(name)
    }

    fn create_tap_internal(&self, name: &str) -> Result<()> {
        // If device exists, try to delete it first
        if self.tap_exists(name) {
            let _ = self.safe_delete_tap(name);
            sleep(Duration::from_millis(150));
        }

        let mut err = self.exec_command(&[
            "sudo", "ip", "tuntap", "add", "dev", name, "mode", "tap", "user", "dlo", "group", "dlo"
        ]);

        if let Err(e) = &err {
            if e.to_string().contains("Device or resource busy") {
                // Last-ditch cleanup + one retry—some processes keep fds briefly
                let _ = self.safe_delete_tap(name);
                sleep(Duration::from_millis(200));
                err = self.exec_command(&[
                    "sudo", "ip", "tuntrap", "add", "dev", name, "mode", "tap", "user", "dlo", "group", "dlo"
                ]);
            }
        }

        if let Err(e) = err {
            return Err(CodeboxError::Network(format!("failed to create TAP device: {}", e)));
        }

        // Attach to bridge
        if let Err(e) = self.exec_command(&["sudo", "ip", "link", "set", name, "master", &self.bridge_name]) {
            let _ = self.safe_delete_tap(name);
            return Err(CodeboxError::Network(format!("failed to connect TAP to bridge: {}", e)));
        }

        // Bring up + promisc
        self.exec_command(&["sudo", "ip", "link", "set", name, "up"])
            .map_err(|e| CodeboxError::Network(format!("failed to bring up TAP device: {}", e)))?;
        
        self.exec_command(&["sudo", "ip", "link", "set", name, "promisc", "on"])
            .map_err(|e| CodeboxError::Network(format!("failed to set TAP device to promiscuous mode: {}", e)))?;

        Ok(())
    }

    pub fn delete_tap_device(&self, name: &str) -> Result<()> {
        self.safe_delete_tap(name)
    }

    fn tap_exists(&self, name: &str) -> bool {
        if Command::new("ip")
            .args(&["link", "show", name])
            .output()
            .map(|o| o.status.success())
            .unwrap_or(false)
        {
            return true;
        }

        // Fallback check via `ip tuntap list`
        if let Ok(taps) = self.list_taps() {
            return taps.iter().any(|t| t == name);
        }

        false
    }

    fn safe_delete_tap(&self, name: &str) -> Result<()> {
        let _ = self.exec_command(&["sudo", "ip", "link", "set", name, "down"]);
        
        if self.exec_command(&["sudo", "ip", "link", "delete", name]).is_ok() {
            return Ok(());
        }
        
        self.exec_command(&["sudo", "ip", "tuntap", "del", "dev", name, "mode", "tap"])
    }

    fn list_taps(&self) -> Result<Vec<String>> {
        let output = Command::new("ip")
            .args(&["tuntap", "list"])
            .output()?;

        if !output.status.success() {
            // Some distros may not support list; return empty set
            return Ok(vec![]);
        }

        let stdout = String::from_utf8_lossy(&output.stdout);
        let mut result = vec![];
        
        for line in stdout.lines() {
            let line = line.trim();
            if let Some(name) = line.split(':').next() {
                result.push(name.to_string());
            }
        }

        Ok(result)
    }

    fn next_free_tap_name(&self, prefix: &str) -> Result<String> {
        let mut existing = std::collections::HashSet::new();

        // ip -o link shows all netdevs
        if let Ok(output) = Command::new("ip").args(&["-o", "link"]).output() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            for line in stdout.lines() {
                if let Some(captures) = regex::Regex::new(r"^\d+:\s*([^:@]+)")
                    .unwrap()
                    .captures(line)
                {
                    if let Some(name) = captures.get(1) {
                        existing.insert(name.as_str().to_string());
                    }
                }
            }
        }

        // also add tuntap list
        if let Ok(taps) = self.list_taps() {
            for tap in taps {
                existing.insert(tap);
            }
        }

        // search a reasonable window
        const MAX: usize = 4096;
        for i in 0..MAX {
            let name = format!("{}-{}", prefix, i);
            if !existing.contains(&name) {
                // double-check with ip link show in case of TOCTOU
                if !Command::new("ip")
                    .args(&["link", "show", &name])
                    .output()
                    .map(|o| o.status.success())
                    .unwrap_or(false)
                {
                    return Ok(name);
                }
            }
        }

        Err(CodeboxError::Network(format!(
            "no free TAP names available (checked {} candidates)", MAX
        )))
    }

    fn exec_command(&self, args: &[&str]) -> Result<()> {
        debug!("Executing command: {:?}", args);
        
        let mut cmd = if args[0] == "sudo" {
            let mut cmd = Command::new("sudo");
            cmd.env("SUDO_ASKPASS", "/data/code/agentic-design/codesandbox/askpass.sh");
            cmd.arg("-A");
            cmd.args(&args[1..]);
            cmd
        } else {
            let mut cmd = Command::new(args[0]);
            cmd.args(&args[1..]);
            cmd
        };

        let output = cmd.output()?;
        
        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            error!("Command failed: {:?}, output: {}", args, stderr);
            return Err(CodeboxError::Network(format!(
                "command '{:?}' failed: {}",
                args, stderr
            )));
        }

        Ok(())
    }
}