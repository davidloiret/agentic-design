#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mount.h>
#include <sys/wait.h>
#include <string.h>

int main() {
    printf("Starting init process...\n");
    
    // Mount essential filesystems
    mount("proc", "/proc", "proc", 0, NULL);
    mount("sysfs", "/sys", "sysfs", 0, NULL);
    mount("devtmpfs", "/dev", "devtmpfs", 0, NULL);
    
    // Configure network
    system("ip link set lo up");
    system("ip addr add 172.16.0.102/24 dev eth0");
    system("ip link set eth0 up");
    system("ip route add default via 172.16.0.1");
    
    // Wait for network
    sleep(2);
    
    // Start agent if available
    if (access("/usr/local/bin/agent", X_OK) == 0) {
        printf("Starting agent...\n");
        if (fork() == 0) {
            execl("/usr/local/bin/agent", "agent", NULL);
        }
    }
    
    // Keep running
    printf("Init complete, system ready\n");
    while (1) {
        sleep(30);
    }
    
    return 0;
}