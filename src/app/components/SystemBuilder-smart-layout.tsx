// Smart layout calculation for agentic-ai-system template

interface NodePosition {
  id: string;
  x: number;
  y: number;
  zone: string;
}

interface ZoneBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  nodes: string[];
}

function calculateSmartLayout() {
  const nodeWidth = 220;
  const nodeHeight = 140;
  const zonePadding = 80;
  const nodeSpacingX = 400;
  const nodeSpacingY = 200;
  
  // Define node positions by zone
  const nodePositions: NodePosition[] = [
    // Internet Zone nodes
    { id: 'chat-ui', x: 150, y: 100, zone: 'internet' },
    { id: 'user', x: 550, y: 100, zone: 'internet' },
    { id: 'dashboard', x: 950, y: 100, zone: 'internet' },
    
    // DMZ Zone nodes
    { id: 'load-balancer', x: 350, y: 400, zone: 'dmz' },
    { id: 'api-gateway', x: 750, y: 400, zone: 'dmz' },
    
    // Application Zone nodes
    { id: 'input-validator', x: 150, y: 700, zone: 'application' },
    { id: 'guard-agent', x: 550, y: 700, zone: 'application' },
    { id: 'output-filter', x: 950, y: 700, zone: 'application' },
    { id: 'audit-logger', x: 1350, y: 700, zone: 'application' },
    
    { id: 'agent-registry', x: 350, y: 900, zone: 'application' },
    { id: 'master-orchestrator', x: 750, y: 900, zone: 'application' },
    { id: 'task-dispatcher', x: 1150, y: 900, zone: 'application' },
    
    { id: 'planning-agent', x: 150, y: 1100, zone: 'application' },
    { id: 'execution-agent', x: 550, y: 1100, zone: 'application' },
    { id: 'memory-agent', x: 950, y: 1100, zone: 'application' },
    { id: 'tool-agent', x: 1350, y: 1100, zone: 'application' },
    { id: 'evaluation-agent', x: 1750, y: 1100, zone: 'application' },
    { id: 'reflection-agent', x: 950, y: 1300, zone: 'application' },
    
    // Data Zone nodes
    { id: 'vector-db', x: 150, y: 1550, zone: 'data' },
    { id: 'knowledge-graph', x: 550, y: 1550, zone: 'data' },
    { id: 'short-term-memory', x: 950, y: 1550, zone: 'data' },
    { id: 'long-term-memory', x: 1350, y: 1550, zone: 'data' },
    { id: 'episodic-memory', x: 1750, y: 1550, zone: 'data' },
    
    // Infrastructure Zone nodes
    { id: 'message-queue', x: 150, y: 1850, zone: 'infrastructure' },
    { id: 'config-manager', x: 550, y: 1850, zone: 'infrastructure' },
    { id: 'tool-registry', x: 950, y: 1850, zone: 'infrastructure' },
    { id: 'code-executor', x: 350, y: 2050, zone: 'infrastructure' },
    { id: 'web-scraper', x: 750, y: 2050, zone: 'infrastructure' },
    
    // External Zone nodes
    { id: 'llm-provider', x: 2400, y: 700, zone: 'external' },
    { id: 'external-apis', x: 2400, y: 1100, zone: 'external' },
    
    // Monitoring Zone nodes
    { id: 'feedback-collector', x: 1450, y: 1850, zone: 'monitoring' },
    { id: 'preference-learner', x: 1850, y: 1850, zone: 'monitoring' },
    { id: 'model-trainer', x: 2250, y: 1850, zone: 'monitoring' },
    { id: 'performance-monitor', x: 1550, y: 2050, zone: 'monitoring' },
    { id: 'trace-logger', x: 1850, y: 2050, zone: 'monitoring' },
    { id: 'error-monitor', x: 2150, y: 2050, zone: 'monitoring' },
    { id: 'cost-tracker', x: 2450, y: 2050, zone: 'monitoring' },
  ];
  
  // Calculate zone boundaries
  const zones = ['internet', 'dmz', 'application', 'data', 'infrastructure', 'external', 'monitoring'];
  const zoneBounds: Record<string, ZoneBounds> = {};
  
  zones.forEach(zone => {
    const zoneNodes = nodePositions.filter(n => n.zone === zone);
    if (zoneNodes.length > 0) {
      const minX = Math.min(...zoneNodes.map(n => n.x)) - zonePadding;
      const minY = Math.min(...zoneNodes.map(n => n.y)) - zonePadding;
      const maxX = Math.max(...zoneNodes.map(n => n.x)) + nodeWidth + zonePadding;
      const maxY = Math.max(...zoneNodes.map(n => n.y)) + nodeHeight + zonePadding;
      
      zoneBounds[zone] = {
        minX,
        minY,
        maxX,
        maxY,
        nodes: zoneNodes.map(n => n.id)
      };
    }
  });
  
  // Ensure zones don't overlap vertically with proper spacing
  const zoneSpacing = 50; // Minimum space between zones
  const sortedZones = Object.entries(zoneBounds).sort((a, b) => a[1].minY - b[1].minY);
  
  for (let i = 1; i < sortedZones.length; i++) {
    const prevZone = sortedZones[i - 1][1];
    const currZone = sortedZones[i][1];
    const [currZoneName] = sortedZones[i];
    
    const requiredMinY = prevZone.maxY + zoneSpacing;
    if (currZone.minY < requiredMinY) {
      const overlap = requiredMinY - currZone.minY;
      
      // Adjust current zone bounds
      currZone.minY = requiredMinY;
      currZone.maxY += overlap;
      
      // Adjust all nodes in this zone
      nodePositions.filter(n => n.zone === currZoneName).forEach(n => {
        n.y += overlap;
      });
    }
  }
  
  // Handle horizontal overlaps for external zone
  const externalZone = zoneBounds['external'];
  const monitoringZone = zoneBounds['monitoring'];
  
  if (externalZone && monitoringZone) {
    // Move external zone to the right if it overlaps with monitoring
    const requiredMinX = Math.max(...Object.values(zoneBounds).filter(z => z !== externalZone).map(z => z.maxX)) + 50;
    if (externalZone.minX < requiredMinX) {
      const xShift = requiredMinX - externalZone.minX;
      externalZone.minX = requiredMinX;
      externalZone.maxX += xShift;
      
      // Adjust external zone nodes
      nodePositions.filter(n => n.zone === 'external').forEach(n => {
        n.x += xShift;
      });
    }
  }
  
  return { nodePositions, zoneBounds };
}

export default calculateSmartLayout;