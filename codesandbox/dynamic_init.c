#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mount.h>
#include <sys/wait.h>
#include <string.h>

int main() {
    printf("Starting dynamic init...\n");
    
    // Mount essential filesystems
    mount("proc", "/proc", "proc", 0, NULL);
    mount("sysfs", "/sys", "sysfs", 0, NULL);
    mount("devtmpfs", "/dev", "devtmpfs", 0, NULL);
    
    // Parse VM ID from kernel command line
    FILE *cmdline = fopen("/proc/cmdline", "r");
    char buffer[1024];
    int vm_id = 0;
    
    if (cmdline) {
        fgets(buffer, sizeof(buffer), cmdline);
        fclose(cmdline);
        
        char *vm_id_str = strstr(buffer, "vm_id=");
        if (vm_id_str) {
            vm_id = atoi(vm_id_str + 6);
        }
    }
    
    printf("VM ID: %d\n", vm_id);
    
    // Configure network interface with dynamic IP
    // Bring up loopback first
    system("ip link set lo up");
    
    // First check what network interfaces exist
    printf("Available network interfaces:\n");
    system("ls /sys/class/net/");
    
    // The virtio network device should be eth0
    printf("Configuring eth0...\n");
    if (system("ip link set eth0 up") != 0) {
        printf("ERROR: Failed to bring up eth0!\n");
        // Try to show what's available
        system("ip link show");
    }
    
    char ip_cmd[256];
    snprintf(ip_cmd, sizeof(ip_cmd), "ip addr add 172.16.0.%d/24 dev eth0", 100 + vm_id);
    if (system(ip_cmd) != 0) {
        printf("ERROR: Failed to add IP address to eth0!\n");
    }
    
    if (system("ip route add default via 172.16.0.1") != 0) {
        printf("ERROR: Failed to add default route!\n");
    }
    
    // Show final network configuration for debugging
    printf("Final network configuration:\n");
    system("ip addr show");
    system("ip route show");
    
    printf("Network configured with IP: 172.16.0.%d\n", 100 + vm_id);
    
    // Wait for network
    sleep(1);
    
    // Start agent if available
    if (access("/usr/local/bin/agent", X_OK) == 0) {
        printf("Starting agent...\n");
        system("/usr/local/bin/agent &");
    } else {
        printf("Agent not found\n");
    }
    
    printf("Init complete, going to sleep\n");
    while (1) {
        sleep(60);
    }
    
    return 0;
}