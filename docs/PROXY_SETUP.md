# Proxy Setup Documentation

## Overview

The application uses Next.js's built-in proxy capabilities to route backend API calls through the same domain, eliminating CORS issues and providing a unified domain experience.

## How It Works

### Development Environment
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- API calls to `/api/v1/*` are proxied to `http://localhost:3001/api/v1/*`

### Production Environment (Vercel)
- Frontend: `https://your-app.vercel.app`
- Backend: `http://51.15.191.100:3001`
- API calls to `/api/v1/*` are proxied to backend server

## Configuration

### 1. Next.js Configuration (`next.config.js`)
```javascript
async rewrites() {
  return [
    {
      source: '/api/v1/:path*',
      destination: process.env.BACKEND_URL || 'http://localhost:3001/api/v1/:path*',
    },
  ];
}
```

### 2. Environment Variables
```bash
# .env.local (Development)
BACKEND_URL=http://localhost:3001

# Vercel Environment Variables (Production)
BACKEND_URL=http://51.15.191.100:3001
```

### 3. Frontend API Calls
```javascript
// ❌ Don't use absolute URLs
await fetch('http://localhost:3001/api/v1/auth/login')

// ✅ Use relative URLs
await fetch('/api/v1/auth/login')
```

## Benefits

1. **Same Domain**: All requests appear to come from the same domain
2. **No CORS Issues**: Since everything is on the same domain, no CORS configuration needed
3. **Simplified Frontend**: No need to manage different API URLs for different environments
4. **Cookie Support**: HTTP-only cookies work seamlessly
5. **Security**: Backend server IP is not exposed to the client

## Authentication Flow

1. User logs in via `/api/v1/auth/login`
2. Next.js proxies the request to the NestJS backend
3. Backend sets HTTP-only cookies in the response
4. Cookies are automatically included in subsequent requests
5. All API calls use the same domain, maintaining the session

## Deployment

### Vercel Deployment
1. Set the `BACKEND_URL` environment variable in Vercel:
   ```
   BACKEND_URL=http://51.15.191.100:3001
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

### Backend Deployment
1. Deploy backend to `51.15.191.100`
2. Ensure backend CORS allows your Vercel domain
3. Backend should accept cookies from the proxied requests

## Troubleshooting

### Cookies Not Being Set
- Ensure `credentials: 'include'` is set in fetch requests
- Check that backend is setting cookies with proper `sameSite` and `secure` flags

### Proxy Not Working
- Verify `BACKEND_URL` environment variable is set correctly
- Check Next.js build logs for rewrite configuration
- Ensure backend server is accessible from Vercel's servers

### Authentication Issues
- Verify Supabase credentials are correct
- Check that both frontend and backend have matching Supabase configuration
- Ensure cookies are being properly forwarded through the proxy