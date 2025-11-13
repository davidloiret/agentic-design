# Highlight.io Integration - Complete Setup

✅ **Highlight.io (Apache 2.0) is now fully integrated into your project!**

## What's Been Done

### ✅ Frontend Integration
- **Installed**: `@highlight-run/next` package
- **Component**: `src/components/HighlightInit.tsx` - Session replay & error tracking
- **Layout**: `src/app/layout.tsx` - Integrated into root layout
- **Features**:
  - Session replay with DOM recording
  - Network request tracking
  - Console logs capture
  - Error tracking & monitoring
  - User identification

### ✅ Backend Integration
- **Installed**: `@highlight-run/node` package
- **Utility**: `src/lib/highlight-backend.ts` - Server-side error tracking
- **Features**: Error tracking with custom metadata

### ✅ Docker Compose Integration
- **Updated**: `docker-compose.dev.yml` - All services in one file
- **Services added**:
  - Highlight Dashboard (port 3100)
  - Highlight Backend API (port 8082)
  - PostgreSQL for metadata (port 5433)
  - Redis for caching (port 6380)
  - ClickHouse for analytics (port 9001)
  - OpenSearch for search (port 9200)
  - MinIO for object storage (port 9000)

### ✅ Management Scripts
- `./scripts/start-dev.sh` - Start all services
- `./scripts/stop-dev.sh` - Stop all services
- `./scripts/logs.sh` - View logs (all or specific service)

### ✅ Documentation
- `DOCKER_SETUP.md` - Complete Docker setup guide
- `HIGHLIGHT_SETUP.md` - Detailed Highlight.io guide
- `.env.example` - Updated with Highlight configuration

## 🚀 Quick Start

### 1. Start All Services

```bash
./scripts/start-dev.sh
```

This starts:
- Your Next.js frontend
- Plausible Analytics
- Highlight.io complete stack

### 2. Configure Highlight.io

1. Visit **http://localhost:3100**
2. Create an account (first user = admin)
3. Create a project and **copy the Project ID**

### 3. Update Environment Variables

Create/update `.env.local`:

```bash
NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_HIGHLIGHT_ENABLED=true
NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=http://localhost:8082/public
HIGHLIGHT_PROJECT_ID=your_project_id_here
```

### 4. Start Your Application

```bash
npm run dev
```

Visit **http://localhost:3002** - Session recording is now active!

## 📊 Access Points

| Service | URL | Notes |
|---------|-----|-------|
| **Your Frontend** | http://localhost:3002 | Your Next.js app |
| **Highlight Dashboard** | http://localhost:3100 | View sessions & errors |
| **Highlight API** | http://localhost:8082 | Backend API |
| **Plausible Analytics** | http://localhost:8000 | Web analytics |
| **MinIO Console** | http://localhost:9090 | Object storage admin |

## 📋 Common Commands

```bash
# Start everything
./scripts/start-dev.sh

# Stop everything
./scripts/stop-dev.sh

# View logs
./scripts/logs.sh                    # All services
./scripts/logs.sh highlight-backend  # Specific service

# Restart a service
docker-compose -f docker-compose.dev.yml restart highlight-backend

# Check status
docker-compose -f docker-compose.dev.yml ps
```

## 🔧 Usage Examples

### Track Custom Events

```typescript
import { trackEvent } from '@/components/HighlightInit';

trackEvent('button_clicked', {
  button_name: 'signup',
  page: '/pricing',
});
```

### Identify Users

```typescript
import { identifyUser } from '@/components/HighlightInit';

identifyUser(user.id, {
  email: user.email,
  plan: 'premium',
});
```

### Track Backend Errors

```typescript
import { initHighlightBackend, trackBackendError } from '@/lib/highlight-backend';

// Initialize once on server startup
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

## 📚 Documentation

- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Complete Docker guide
- **[HIGHLIGHT_SETUP.md](./HIGHLIGHT_SETUP.md)** - Highlight.io details & Kubernetes
- **[.env.example](./.env.example)** - Environment variable reference

## 🎯 What You Get

### Session Replay
- Watch exactly what users do
- See console logs & errors
- Network requests & responses
- Clickable elements & interactions

### Error Tracking
- Automatic error capture
- Full stack traces
- User session context
- Breadcrumbs timeline

### Performance Monitoring
- Page load times
- API response times
- Resource timing
- Custom metrics

### Privacy & Control
- **Self-hosted**: All data on your infrastructure
- **No limits**: Free for self-hosted
- **Apache 2.0**: Open source license
- **Full control**: Your data, your rules

## 🔒 License

- **Highlight.io**: Apache 2.0
- **Repository**: https://github.com/highlight/highlight
- **Self-hosted**: No usage limits
- **Data ownership**: 100% yours

## 🐛 Troubleshooting

### Services won't start
```bash
# Check Docker resources (need 8GB RAM, 4 CPUs)
docker info

# Check logs
./scripts/logs.sh highlight-backend
```

### Dashboard not loading
```bash
# Wait 60-90 seconds on first start
# Check backend health
curl http://localhost:8082/health
```

### Session replay not working
1. Check browser console for "Highlight.io initialized"
2. Verify Project ID in `.env.local`
3. Check network tab for requests to `localhost:8082`

## ✅ Verification

After setup, check:

- [ ] All Docker services running: `docker ps`
- [ ] Highlight dashboard loads: http://localhost:3100
- [ ] Backend responds: `curl http://localhost:8082/health`
- [ ] Browser console shows "Highlight.io initialized"
- [ ] New session appears in dashboard
- [ ] Test error is captured

## 🎉 You're All Set!

Highlight.io is fully integrated and ready to use. Start your services, configure your project ID, and begin tracking sessions and errors!

---

**Need help?** Check the full documentation in `DOCKER_SETUP.md` and `HIGHLIGHT_SETUP.md`
