# Production Deployment Guide - With Highlight.io

This guide covers deploying your application with Highlight.io in production using `docker-compose.prod.yml`.

## ✅ What's Included in Production

### Your Application
- **Frontend** - Next.js (port 3002)
- **Backend** - Node.js API (port 3001)
- **Nginx** - Reverse proxy with SSL (ports 80, 443)

### Analytics Services
- **Plausible** + PostgreSQL + ClickHouse
- **Highlight.io** + PostgreSQL + Redis + ClickHouse + OpenSearch + MinIO

## 🚀 Quick Deploy

### 1. Prerequisites

- Server with minimum:
  - 16GB RAM (32GB recommended)
  - 8 CPU cores
  - 200GB disk space
- Docker & Docker Compose installed
- Domain names configured:
  - `agentic-design.ai` → Frontend
  - `backend.agentic-design.ai` → Backend API
  - `plausible.agentic-design.ai` → Plausible
  - `highlight.agentic-design.ai` → Highlight.io

### 2. Set Up Environment Variables

Create `backend/.env`:

```bash
# Application
NODE_ENV=production
PORT=3001

# Highlight.io Security
HIGHLIGHT_DB_PASSWORD=your_secure_db_password_here
HIGHLIGHT_MINIO_ACCESS_KEY=your_minio_access_key
HIGHLIGHT_MINIO_SECRET_KEY=your_minio_secret_key

# Application Project ID (get from Highlight dashboard after setup)
HIGHLIGHT_PROJECT_ID=your_project_id
```

Create root `.env`:

```bash
# Frontend Environment
NODE_ENV=production
PORT=3002
BACKEND_URL=https://backend.agentic-design.ai

# Highlight.io (will be configured after deployment)
NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id
NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=https://highlight.agentic-design.ai/public
HIGHLIGHT_PROJECT_ID=your_project_id

# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=agentic-design.ai
NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.agentic-design.ai/js/script.js
NEXT_PUBLIC_PLAUSIBLE_ENABLED=true
```

### 3. Set Up SSL Certificates

First, obtain SSL certificates for all domains:

```bash
cd backend

# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Get certificates
sudo certbot certonly --standalone -d agentic-design.ai -d www.agentic-design.ai
sudo certbot certonly --standalone -d backend.agentic-design.ai
sudo certbot certonly --standalone -d plausible.agentic-design.ai
sudo certbot certonly --standalone -d highlight.agentic-design.ai

# Copy certificates to project
sudo cp -r /etc/letsencrypt certbot/conf/
```

### 4. Deploy Services

```bash
cd backend
docker-compose -f docker-compose.prod.yml up -d
```

Wait 2-3 minutes for all services to initialize.

### 5. Configure Highlight.io

1. **Visit**: https://highlight.agentic-design.ai
2. **Create account** (first user = admin)
3. **Create project**
4. **Copy Project ID**
5. **Update environment files** with your Project ID
6. **Restart frontend**:
   ```bash
   docker-compose -f docker-compose.prod.yml restart frontend
   ```

## 📊 Access Points (Production)

| Service | URL | Notes |
|---------|-----|-------|
| **Frontend** | https://agentic-design.ai | Main application |
| **Backend API** | https://backend.agentic-design.ai | REST API |
| **Plausible** | https://plausible.agentic-design.ai | Web analytics |
| **Highlight.io** | https://highlight.agentic-design.ai | Session replay |

## 🔧 Production Commands

### Start/Stop Services

```bash
cd backend

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Stop all services
docker-compose -f docker-compose.prod.yml down

# Restart specific service
docker-compose -f docker-compose.prod.yml restart highlight-backend

# View status
docker-compose -f docker-compose.prod.yml ps
```

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f highlight-backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f nginx

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100 highlight-backend
```

### Health Checks

```bash
# Check services
docker-compose -f docker-compose.prod.yml ps

# Test Highlight API (internal)
docker exec highlight-backend curl -f http://localhost:8082/health

# Test external access
curl https://highlight.agentic-design.ai/health
curl https://agentic-design.ai/health
curl https://backend.agentic-design.ai/health
```

## 🗄️ Data Management

### Backups

```bash
cd backend

# Create backup directory
mkdir -p backups/$(date +%Y%m%d)

# Backup Highlight PostgreSQL
docker exec highlight-postgres pg_dump -U highlight highlight > backups/$(date +%Y%m%d)/highlight.sql

# Backup Plausible PostgreSQL
docker exec plausible_postgres pg_dump -U postgres plausible > backups/$(date +%Y%m%d)/plausible.sql

# Backup Highlight recordings (MinIO)
docker exec highlight-minio mc mirror minio/highlight-sessions ./backups/$(date +%Y%m%d)/recordings

# Backup Nginx logs
cp -r nginx/logs backups/$(date +%Y%m%d)/nginx-logs

# Create compressed archive
tar -czf backups/backup-$(date +%Y%m%d).tar.gz backups/$(date +%Y%m%d)/
```

### Automated Backups

Create `scripts/backup.sh`:

```bash
#!/bin/bash
# Add this to crontab: 0 2 * * * /path/to/backup.sh

BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR/$DATE

# Backup databases
docker exec highlight-postgres pg_dump -U highlight highlight > $BACKUP_DIR/$DATE/highlight.sql
docker exec plausible_postgres pg_dump -U postgres plausible > $BACKUP_DIR/$DATE/plausible.sql

# Compress
tar -czf $BACKUP_DIR/backup-$DATE.tar.gz $BACKUP_DIR/$DATE/

# Remove backups older than 30 days
find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +30 -delete

# Upload to S3 (optional)
# aws s3 cp $BACKUP_DIR/backup-$DATE.tar.gz s3://your-backup-bucket/
```

### Restore from Backup

```bash
# Stop services
docker-compose -f docker-compose.prod.yml down

# Restore Highlight
docker-compose -f docker-compose.prod.yml up -d highlight-postgres
sleep 10
docker exec -i highlight-postgres psql -U highlight highlight < backups/20250113/highlight.sql

# Restore Plausible
docker-compose -f docker-compose.prod.yml up -d plausible_db
sleep 10
docker exec -i plausible_postgres psql -U postgres plausible < backups/20250113/plausible.sql

# Restart all services
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Security

### Change Default Passwords

**Before deploying**, update these in `docker-compose.prod.yml`:

1. **Plausible Admin Password** (line 121):
   ```yaml
   - ADMIN_USER_PWD=your_secure_password
   ```

2. **Highlight PostgreSQL** - Use environment variable:
   ```bash
   export HIGHLIGHT_DB_PASSWORD=your_secure_password
   ```

3. **MinIO Credentials** - Use environment variables:
   ```bash
   export HIGHLIGHT_MINIO_ACCESS_KEY=your_access_key
   export HIGHLIGHT_MINIO_SECRET_KEY=your_secret_key
   ```

### Firewall Setup

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 22/tcp    # SSH
sudo ufw enable
```

### SSL Certificate Renewal

Certificates auto-renew via certbot. To manually renew:

```bash
# Stop nginx temporarily
docker-compose -f docker-compose.prod.yml stop nginx

# Renew certificates
sudo certbot renew

# Copy renewed certificates
sudo cp -r /etc/letsencrypt certbot/conf/

# Restart nginx
docker-compose -f docker-compose.prod.yml start nginx
```

### Security Headers

All security headers are already configured in `nginx/nginx.conf`:
- HSTS (Strict-Transport-Security)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 📊 Monitoring

### Resource Usage

```bash
# Real-time container stats
docker stats

# Disk usage
docker system df -v

# Specific service stats
docker stats highlight-backend highlight-postgres highlight-clickhouse
```

### Nginx Access Logs

```bash
# Tail logs
tail -f backend/nginx/logs/access.log

# Analyze requests
cat backend/nginx/logs/access.log | grep "GET" | wc -l

# Find slow requests
cat backend/nginx/logs/access.log | awk '$NF > 1.0' | tail -20
```

### Application Logs

```bash
# View application logs
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f backend

# Search for errors
docker-compose -f docker-compose.prod.yml logs | grep -i error
```

## 🔄 Updates

### Update Services

```bash
cd backend

# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Recreate containers
docker-compose -f docker-compose.prod.yml up -d

# Remove old images
docker image prune -a
```

### Zero-Downtime Deployment

For frontend/backend updates:

```bash
# Build new images
docker-compose -f docker-compose.prod.yml build frontend backend

# Rolling update (one at a time)
docker-compose -f docker-compose.prod.yml up -d --no-deps frontend
docker-compose -f docker-compose.prod.yml up -d --no-deps backend
```

## 📈 Performance Tuning

### Enable Resource Limits

Uncomment `deploy` sections in `docker-compose.prod.yml` for each service:

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

### Optimize Database

```bash
# PostgreSQL vacuum
docker exec highlight-postgres vacuumdb -U highlight --analyze --verbose highlight
docker exec plausible_postgres vacuumdb -U postgres --analyze --verbose plausible

# ClickHouse optimize
docker exec highlight-clickhouse clickhouse-client --query="OPTIMIZE TABLE events"
```

### Clean Up Old Data

```bash
# Remove old Docker logs
truncate -s 0 /var/lib/docker/containers/*/*-json.log

# Clean old ClickHouse data (30 days)
docker exec highlight-clickhouse clickhouse-client --query="
ALTER TABLE events MODIFY TTL toDateTime(timestamp) + INTERVAL 30 DAY
"
```

## 🐛 Troubleshooting

### Services Won't Start

```bash
# Check Docker logs
docker-compose -f docker-compose.prod.yml logs

# Check disk space
df -h

# Check memory
free -m

# Restart Docker daemon
sudo systemctl restart docker
```

### SSL Certificate Issues

```bash
# Verify certificates
sudo certbot certificates

# Check nginx config
docker exec agentic-design-nginx nginx -t

# View nginx errors
docker logs agentic-design-nginx
```

### Database Connection Errors

```bash
# Restart databases
docker-compose -f docker-compose.prod.yml restart highlight-postgres plausible_db

# Check database logs
docker logs highlight-postgres
docker logs plausible_postgres

# Verify connections
docker exec highlight-backend curl -v http://highlight-postgres:5432
```

### High Memory Usage

```bash
# Check which service is using memory
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}"

# Restart high-memory service
docker-compose -f docker-compose.prod.yml restart highlight-opensearch

# Add memory limits (see Performance Tuning section)
```

## 🔄 Rollback

If deployment fails:

```bash
# Stop new deployment
docker-compose -f docker-compose.prod.yml down

# Restore from backup
# (See Restore from Backup section)

# Start with old configuration
docker-compose -f docker-compose.prod.yml up -d
```

## ✅ Post-Deployment Checklist

- [ ] All services running: `docker-compose -f docker-compose.prod.yml ps`
- [ ] SSL certificates valid: `curl -vI https://agentic-design.ai`
- [ ] Highlight dashboard accessible: https://highlight.agentic-design.ai
- [ ] Frontend loads properly: https://agentic-design.ai
- [ ] Backend API responds: https://backend.agentic-design.ai/api/v1/health
- [ ] Session recording works (check browser console)
- [ ] Error tracking configured
- [ ] Backups configured and tested
- [ ] Monitoring alerts set up
- [ ] Firewall configured
- [ ] DNS records updated

## 📚 Additional Resources

- [Highlight.io Documentation](https://www.highlight.io/docs)
- [Nginx Optimization Guide](https://www.nginx.com/blog/tuning-nginx/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

## 🆘 Support

1. Check logs first: `docker-compose -f docker-compose.prod.yml logs`
2. Verify environment variables
3. Check service health endpoints
4. Review Highlight.io dashboard for errors
5. Check nginx error logs: `docker logs agentic-design-nginx`

---

**License**: Highlight.io is Apache 2.0 licensed
**Production Ready**: ✅ Fully configured with SSL, monitoring, and backups
