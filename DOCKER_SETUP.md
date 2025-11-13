# Docker Setup Guide - Complete Analytics Stack

This guide covers running your complete development environment with integrated analytics using a single Docker Compose file.

## 📦 What's Included

Everything runs from `docker-compose.dev.yml`:

### Your Application
- **Frontend** - Next.js application (port 3002)

### Plausible Analytics (Self-Hosted Web Analytics)
- **Plausible Web UI** - Privacy-focused web analytics (port 8000)
- **PostgreSQL** - Plausible database
- **ClickHouse** - Event storage

### Highlight.io (Session Replay & Error Tracking) - Apache 2.0
- **Highlight Dashboard** - Session replay UI (port 3100)
- **Highlight Backend** - API server (port 8082)
- **PostgreSQL** - Metadata storage (port 5433)
- **Redis** - Caching (port 6380)
- **ClickHouse** - Analytics data (port 9001)
- **OpenSearch** - Full-text search (port 9200)
- **MinIO** - Object storage for recordings (port 9000)

## 🚀 Quick Start

### Start Everything

```bash
./scripts/start-dev.sh
```

This single command starts all services. Wait 30-60 seconds for initialization.

### Stop Everything

```bash
./scripts/stop-dev.sh
```

### View Logs

```bash
# All services
./scripts/logs.sh

# Specific service
./scripts/logs.sh highlight-backend
./scripts/logs.sh frontend-dev
./scripts/logs.sh plausible
```

## 🛠️ Initial Setup

### 1. Start Services

```bash
./scripts/start-dev.sh
```

### 2. Configure Plausible (Optional)

1. Visit **http://localhost:8000**
2. Login:
   - Email: `admin@agentic-design.ai`
   - Password: `rvTvcxJGuDU722`
3. Add your site and get tracking code

### 3. Configure Highlight.io

1. Visit **http://localhost:3100**
2. **Create an account** (first user becomes admin)
3. **Create a project** and copy the Project ID

### 4. Configure Your Application

Update `.env.local`:

```bash
# Highlight.io Configuration
NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=<your_project_id_from_step_3>
NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=http://localhost:8082/public
HIGHLIGHT_PROJECT_ID=<your_project_id_from_step_3>

# Plausible (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=localhost
NEXT_PUBLIC_PLAUSIBLE_SRC=http://localhost:8000/js/script.js
NEXT_PUBLIC_PLAUSIBLE_ENABLED=true
```

### 5. Start Your Application

```bash
npm run dev
```

Visit **http://localhost:3002** - session recording and error tracking are now active!

## 📊 Service Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| **Your Frontend** | http://localhost:3002 | - |
| **Plausible Dashboard** | http://localhost:8000 | admin@agentic-design.ai / rvTvcxJGuDU722 |
| **Highlight Dashboard** | http://localhost:3100 | Account you created |
| **Highlight API** | http://localhost:8082 | - |
| **MinIO Console** | http://localhost:9090 | minioadmin / minioadmin |
| **OpenSearch** | http://localhost:9200 | - |

## 📋 Common Commands

### Service Management

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Restart a specific service
docker-compose -f docker-compose.dev.yml restart highlight-backend

# View service status
docker-compose -f docker-compose.dev.yml ps

# Remove everything including data
docker-compose -f docker-compose.dev.yml down -v
```

### Logs & Debugging

```bash
# All logs
docker-compose -f docker-compose.dev.yml logs -f

# Specific service logs
docker-compose -f docker-compose.dev.yml logs -f highlight-backend
docker-compose -f docker-compose.dev.yml logs -f plausible
docker-compose -f docker-compose.dev.yml logs -f frontend-dev

# Last 100 lines
docker-compose -f docker-compose.dev.yml logs --tail=100 highlight-backend
```

### Health Checks

```bash
# Check all containers
docker ps

# Check specific service health
docker inspect --format='{{.State.Health.Status}}' highlight-backend

# Test Highlight API
curl http://localhost:8082/health

# Test Plausible
curl http://localhost:8000
```

## 🔧 Troubleshooting

### Services Won't Start

**Check Docker resources:**
```bash
docker info
```

Ensure you have:
- **8GB RAM minimum** (16GB recommended)
- **4 CPU cores minimum**
- **64GB disk space**

**Check for port conflicts:**
```bash
lsof -i :3100  # Highlight frontend
lsof -i :8082  # Highlight backend
lsof -i :8000  # Plausible
lsof -i :9200  # OpenSearch
```

**Solution:** Edit `docker-compose.dev.yml` and change conflicting ports.

### Highlight Dashboard Not Loading

1. **Check if backend is ready:**
   ```bash
   curl http://localhost:8082/health
   ```

2. **View backend logs:**
   ```bash
   ./scripts/logs.sh highlight-backend
   ```

3. **Wait longer** - First startup takes 60-90 seconds

4. **Restart services:**
   ```bash
   docker-compose -f docker-compose.dev.yml restart highlight-backend
   docker-compose -f docker-compose.dev.yml restart highlight-frontend
   ```

### Session Replay Not Working

1. **Check browser console** for "Highlight.io initialized" message
2. **Verify environment variables** in `.env.local`
3. **Check network tab** - Look for requests to `localhost:8082`
4. **Ensure correct Project ID** from dashboard

### Database Connection Errors

```bash
# Restart databases first
docker-compose -f docker-compose.dev.yml restart highlight-postgres
docker-compose -f docker-compose.dev.yml restart plausible_db

# Wait 10 seconds, then restart dependent services
sleep 10
docker-compose -f docker-compose.dev.yml restart highlight-backend
docker-compose -f docker-compose.dev.yml restart plausible
```

### High Memory Usage

**Reduce OpenSearch memory:**

Edit `docker-compose.dev.yml`:
```yaml
highlight-opensearch:
  environment:
    - "OPENSEARCH_JAVA_OPTS=-Xms256m -Xmx512m"  # Reduced from 512m/512m
```

**Limit Redis memory:**
Already configured with 2GB limit in the compose file.

### OpenSearch Won't Start

OpenSearch requires `vm.max_map_count` to be increased:

```bash
# macOS/Windows Docker Desktop - Already handled
# Linux:
sudo sysctl -w vm.max_map_count=262144

# Make permanent
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
```

## 🗄️ Data Management

### Backup Data

```bash
# Create backups directory
mkdir -p backups

# Backup Highlight PostgreSQL
docker exec highlight-postgres pg_dump -U highlight highlight > backups/highlight-$(date +%Y%m%d).sql

# Backup Plausible PostgreSQL
docker exec plausible_postgres pg_dump -U postgres plausible > backups/plausible-$(date +%Y%m%d).sql

# Backup MinIO data (recordings)
docker exec highlight-minio mc mirror minio/highlight-sessions ./backups/recordings
```

### Restore Data

```bash
# Restore Highlight
docker exec -i highlight-postgres psql -U highlight highlight < backups/highlight-20250113.sql

# Restore Plausible
docker exec -i plausible_postgres psql -U postgres plausible < backups/plausible-20250113.sql
```

### Clear All Data (Fresh Start)

```bash
# WARNING: This deletes ALL data
docker-compose -f docker-compose.dev.yml down -v

# Start fresh
./scripts/start-dev.sh
```

### View Storage Usage

```bash
docker system df -v
```

## ⚙️ Configuration

### Change Ports

Edit `docker-compose.dev.yml`:

```yaml
highlight-frontend:
  ports:
    - "3200:3000"  # Change from 3100 to 3200
```

Don't forget to update `.env.local`:
```bash
NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=http://localhost:8082/public
```

### Adjust Memory Limits

Add resource limits in `docker-compose.dev.yml`:

```yaml
highlight-backend:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 4G
      reservations:
        cpus: '1'
        memory: 2G
```

### Change Database Passwords

Edit `docker-compose.dev.yml`:

```yaml
highlight-postgres:
  environment:
    - POSTGRES_PASSWORD=your_new_secure_password

highlight-backend:
  environment:
    - PSQL_PASSWORD=your_new_secure_password
```

## 🔒 Security

### Default Passwords to Change

1. **Plausible Admin**: `rvTvcxJGuDU722` → Change after first login
2. **Highlight PostgreSQL**: `highlight_password` → Change in compose file
3. **MinIO**: `minioadmin` → Change in compose file

### Production Considerations

For production deployment:

1. **Use secrets** instead of environment variables
2. **Enable SSL/TLS** with reverse proxy (nginx/Traefik)
3. **Restrict network access** - Remove unnecessary port exposures
4. **Regular backups** - Automate daily backups
5. **Monitor resources** - Set up alerts for memory/CPU
6. **Use external databases** for production scale

## 📊 Monitoring

### Resource Usage

```bash
# Real-time stats
docker stats

# Specific services
docker stats highlight-backend highlight-postgres highlight-clickhouse
```

### Service Health

```bash
# Check all services
docker-compose -f docker-compose.dev.yml ps

# Check specific health status
docker inspect --format='{{json .State.Health}}' highlight-backend | jq
```

## 🔄 Updates

### Update All Services

```bash
# Pull latest images
docker-compose -f docker-compose.dev.yml pull

# Restart with new images
docker-compose -f docker-compose.dev.yml up -d
```

### Update Specific Service

```bash
# Pull specific image
docker-compose -f docker-compose.dev.yml pull highlight-backend

# Recreate container
docker-compose -f docker-compose.dev.yml up -d highlight-backend
```

## 📈 Performance Tips

### 1. Session Replay Sampling

For high-traffic sites, sample sessions in your code:

```typescript
// src/components/HighlightInit.tsx
H.init(projectId, {
  sessionSampleRate: 0.1,  // Only record 10% of sessions
});
```

### 2. Conditional Loading

Only load for specific users:

```typescript
<HighlightInit
  projectId={projectId}
  enabled={user?.isPremium || isDevelopment}
/>
```

### 3. Cleanup Old Data

```bash
# Connect to ClickHouse and set retention
docker exec -it highlight-clickhouse clickhouse-client

# Set 30-day retention
ALTER TABLE events MODIFY TTL toDateTime(timestamp) + INTERVAL 30 DAY;
```

## 🐛 Common Issues

### "Network agentic-network not found"

```bash
docker network create agentic-network
./scripts/start-dev.sh
```

### "Port already in use"

```bash
# Find what's using the port
lsof -i :8082

# Kill the process or change the port in docker-compose.dev.yml
```

### "Container name already exists"

```bash
# Remove old container
docker rm -f highlight-backend

# Restart
./scripts/start-dev.sh
```

## ✅ Verification Checklist

After setup, verify:

- [ ] All services running: `docker ps | grep -E "highlight|plausible"`
- [ ] Highlight dashboard loads: http://localhost:3100
- [ ] Backend API responds: `curl http://localhost:8082/health`
- [ ] Frontend loads without errors
- [ ] Browser console shows "Highlight.io initialized"
- [ ] Can see new session in Highlight dashboard
- [ ] Errors are captured and visible

## 📚 Additional Resources

- [Highlight.io Documentation](https://www.highlight.io/docs)
- [Plausible Documentation](https://plausible.io/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Full Setup Guide](./HIGHLIGHT_SETUP.md)

## 🆘 Need Help?

1. Check logs: `./scripts/logs.sh <service-name>`
2. Verify environment variables in `.env.local`
3. Ensure Docker has sufficient resources
4. Try clean restart: `./scripts/stop-dev.sh && ./scripts/start-dev.sh`

---

**License**: Highlight.io is Apache 2.0 licensed
**Repository**: https://github.com/highlight/highlight
