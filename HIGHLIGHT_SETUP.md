# Highlight.io Self-Hosted Setup Guide

## Overview

Highlight.io is an Apache 2.0 licensed session replay and error tracking platform that you can self-host for complete data control and privacy.

**Features:**
- Session replay with DOM recording
- Error tracking and monitoring
- Performance monitoring
- Network request tracking
- Console logs capture
- User identification

## Prerequisites

- Docker & Docker Compose
- 8GB RAM minimum
- 4 CPU cores minimum
- 64GB disk space minimum
- Domain name (optional, for production)

## Quick Start (Testing with Cloud)

For initial testing, you can use Highlight's cloud service:

1. Visit https://app.highlight.io and create an account
2. Create a new project and get your Project ID
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
   HIGHLIGHT_PROJECT_ID=your_project_id
   ```
4. Start your application:
   ```bash
   npm run dev
   ```

## Self-Hosted Deployment

### Option 1: Docker Compose (Hobby/Development)

1. **Clone Highlight repository:**
   ```bash
   git clone https://github.com/highlight/highlight.git
   cd highlight/docker
   ```

2. **Start services:**
   ```bash
   ./run-hobby.sh
   ```

   This will start all required services:
   - Frontend UI (http://localhost:3000)
   - Backend API (http://localhost:8082)
   - PostgreSQL (database)
   - ClickHouse (analytics)
   - Redis (caching)
   - OpenSearch (search)
   - MinIO (object storage)

3. **Create your first project:**
   - Visit http://localhost:3000
   - Sign up for an account
   - Create a new project
   - Copy your Project ID

4. **Configure your application:**

   Update `.env.local`:
   ```bash
   NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_self_hosted_project_id
   NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
   NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=http://localhost:8082/public
   HIGHLIGHT_PROJECT_ID=your_self_hosted_project_id
   ```

### Option 2: Kubernetes (Production)

For production deployments, use the Kubernetes helm charts:

1. **Add Highlight Helm repository:**
   ```bash
   helm repo add highlight https://highlight.github.io/highlight
   helm repo update
   ```

2. **Create values file (`values.yaml`):**
   ```yaml
   ingress:
     enabled: true
     hostname: highlight.yourdomain.com

   postgresql:
     primary:
       persistence:
         size: 100Gi

   clickhouse:
     persistence:
       size: 500Gi

   redis:
     master:
       persistence:
         size: 10Gi
   ```

3. **Install Highlight:**
   ```bash
   helm install highlight highlight/highlight -f values.yaml
   ```

4. **Get the load balancer IP:**
   ```bash
   kubectl get svc highlight-frontend
   ```

5. **Configure DNS:**
   Point your domain to the load balancer IP

6. **Configure your application:**
   ```bash
   NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
   NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=https://highlight.yourdomain.com/public
   HIGHLIGHT_PROJECT_ID=your_project_id
   ```

## Environment Variables Reference

### Frontend Variables (NEXT_PUBLIC_*)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID` | Yes | Your Highlight project ID | - |
| `NEXT_PUBLIC_HIGHLIGHT_ENABLED` | No | Enable/disable tracking | `true` |
| `NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL` | No | Custom backend URL for self-hosted | Cloud URL |

### Backend Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `HIGHLIGHT_PROJECT_ID` | Yes | Your Highlight project ID | - |

## Integration Details

### Frontend Integration

The integration is already set up in your application:

- **Component:** `src/components/HighlightInit.tsx`
- **Layout:** `src/app/layout.tsx` (line 133-137)
- **Features enabled:**
  - Session replay
  - Network recording
  - Console logs
  - Error tracking

### Backend Integration

For server-side error tracking:

```typescript
import { initHighlightBackend, trackBackendError } from '@/lib/highlight-backend';

// Initialize once in your server startup
initHighlightBackend();

// Track errors
try {
  // your code
} catch (error) {
  trackBackendError(error as Error, {
    context: 'user-action',
    userId: user.id,
  });
}
```

### API Route Example

```typescript
// app/api/example/route.ts
import { initHighlightBackend, H } from '@/lib/highlight-backend';

initHighlightBackend();

export async function POST(request: Request) {
  try {
    // Your API logic
    return Response.json({ success: true });
  } catch (error) {
    H.consumeError(error as Error);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
```

## Usage Examples

### Manual Event Tracking

```typescript
import { trackEvent, identifyUser } from '@/components/HighlightInit';

// Track custom events
trackEvent('button_clicked', {
  button_name: 'signup',
  page: '/pricing',
});

// Identify users
identifyUser('user-123', {
  email: 'user@example.com',
  plan: 'premium',
});
```

### Error Tracking

```typescript
import { trackError } from '@/components/HighlightInit';

try {
  // Your code
} catch (error) {
  trackError(error as Error, {
    component: 'PaymentForm',
    action: 'submit',
  });
}
```

## Monitoring Your Instance

### Health Checks

```bash
# Frontend
curl http://localhost:3000/health

# Backend
curl http://localhost:8082/health
```

### View Logs

```bash
# All services
docker-compose -f docker-compose.hobby.yml logs -f

# Specific service
docker-compose -f docker-compose.hobby.yml logs -f backend
```

### Database Access

```bash
# PostgreSQL
docker exec -it highlight-postgres psql -U postgres -d highlight

# ClickHouse
docker exec -it highlight-clickhouse clickhouse-client
```

## Resource Requirements

### Hobby Deployment (< 10k sessions/month)
- 8GB RAM
- 4 CPU cores
- 64GB disk space

### Small Production (< 100k sessions/month)
- 16GB RAM
- 8 CPU cores
- 250GB disk space

### Medium Production (< 1M sessions/month)
- 32GB RAM
- 16 CPU cores
- 1TB disk space

## Troubleshooting

### Session Replay Not Working

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID` is set correctly
3. Check network tab for requests to Highlight backend
4. Ensure `NEXT_PUBLIC_HIGHLIGHT_ENABLED` is not `false`

### Backend Errors Not Showing

1. Verify `HIGHLIGHT_PROJECT_ID` is set (without NEXT_PUBLIC prefix)
2. Check that `initHighlightBackend()` is called on server startup
3. Verify backend can reach Highlight API

### Self-Hosted Instance Not Starting

1. Check Docker logs: `docker-compose logs`
2. Verify port availability (3000, 8082, 5432, 9000)
3. Ensure sufficient disk space
4. Check Docker resources in Docker Desktop settings

### High Memory Usage

1. Reduce ClickHouse retention period
2. Limit session replay buffer size
3. Implement sampling for high-traffic sites

## Security Considerations

1. **Network Isolation:** Run Highlight in a private network
2. **SSL/TLS:** Use HTTPS for production deployments
3. **Authentication:** Change default passwords
4. **Access Control:** Limit who can access the Highlight dashboard
5. **Data Retention:** Configure appropriate retention policies
6. **Backups:** Regularly backup PostgreSQL and ClickHouse data

## Upgrading

```bash
# Pull latest changes
cd highlight/docker
git pull

# Rebuild and restart
docker-compose -f docker-compose.hobby.yml down
docker-compose -f docker-compose.hobby.yml pull
docker-compose -f docker-compose.hobby.yml up -d
```

## Backup & Restore

### Backup

```bash
# PostgreSQL
docker exec highlight-postgres pg_dump -U postgres highlight > backup.sql

# ClickHouse
docker exec highlight-clickhouse clickhouse-client --query="BACKUP DATABASE highlight" > backup_clickhouse.sql
```

### Restore

```bash
# PostgreSQL
docker exec -i highlight-postgres psql -U postgres highlight < backup.sql

# ClickHouse
docker exec -i highlight-clickhouse clickhouse-client < backup_clickhouse.sql
```

## Performance Tuning

### Sampling

For high-traffic sites, implement sampling:

```typescript
<HighlightInit
  projectId={projectId}
  enabled={enabled}
  // Only record 10% of sessions
  sessionSampleRate={0.1}
/>
```

### Conditional Loading

```typescript
// Only load for logged-in users
<HighlightInit
  projectId={projectId}
  enabled={enabled && user?.isPremium}
/>
```

## License

Highlight.io is licensed under Apache 2.0. See:
https://github.com/highlight/highlight/blob/main/LICENSE

## Support & Documentation

- **Official Docs:** https://www.highlight.io/docs
- **GitHub:** https://github.com/highlight/highlight
- **Discord:** https://highlight.io/community
- **Self-Hosting Docs:** https://www.highlight.io/docs/general/company/open-source/hosting/self-host-hobby

## Next Steps

1. ✅ Frontend integration complete
2. ✅ Backend tracking ready
3. ⏱️  Deploy self-hosted instance (optional)
4. ⏱️  Configure alerts and notifications
5. ⏱️  Set up team access and dashboards

## Notes

- **Data Privacy:** With self-hosting, all user data stays on your infrastructure
- **No Limits:** Self-hosted version has no session or error limits (hobby tier: 10k sessions)
- **Full Features:** All features available in self-hosted (no enterprise restrictions for Apache 2.0 core)
- **Updates:** Check GitHub releases for security updates and new features
