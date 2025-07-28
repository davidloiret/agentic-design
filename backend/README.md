# Agentic Design Backend

NestJS backend with Supabase authentication for Agentic Design.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `JWT_SECRET`: Secret key for JWT tokens
   - `FRONTEND_URL`: Frontend URL for CORS

3. **Development:**
   ```bash
   npm run start:dev
   ```

4. **Production build:**
   ```bash
   npm run build
   npm run start:prod
   ```

## Deployment

### Docker Compose Deployment (Recommended)

#### Development
```bash
# Start development environment with hot-reload
make dev

# Or using docker-compose directly
docker-compose -f docker-compose.dev.yml up
```

#### Production
```bash
# Deploy to production
make deploy

# Or using docker-compose directly
docker-compose -f docker-compose.prod.yml up -d

# Or use the deployment script
./deploy.sh
```

#### Available Make Commands
- `make dev` - Start development environment
- `make prod` - Start production environment
- `make build` - Build Docker images
- `make logs` - View logs
- `make clean` - Clean up volumes and images

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Run with PM2:
   ```bash
   pm2 start ecosystem.config.js
   ```

## API Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user (protected)
- `GET /api/v1/users/profile` - Get user profile (protected)

## Authentication

The backend uses Supabase for authentication with JWT tokens stored in HTTP-only cookies. The authentication flow:

1. User registers/logs in through Supabase
2. Backend creates session cookies
3. All protected routes require valid authentication
4. Tokens are automatically refreshed when expired

## Architecture

Following clean architecture principles with:
- **Application Layer**: Use cases and DTOs
- **Domain Layer**: Entities and business logic
- **Infrastructure Layer**: External services and persistence
- **Presentation Layer**: Controllers and guards