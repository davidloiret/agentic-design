# Plausible Analytics Setup for Agentic Design

## Security Configuration

Plausible Analytics has been configured with the following security settings:

### Access Control
- **Public Registration**: DISABLED
- **Authentication Required**: YES (DISABLE_AUTH=false)
- **Domain**: Only tracks `agentic-design.ai`
- **URL**: https://plausible.agentic-design.ai

### Default Admin Credentials
- **Email**: admin@agentic-design.ai
- **Username**: Admin
- **Password**: changeme123

⚠️ **IMPORTANT**: Please change the default password immediately after first login!

### To Change the Admin Password

1. Login to Plausible at https://plausible.agentic-design.ai
2. Navigate to your account settings
3. Change the password from the default

### To Update the Default Password in Configuration

Edit the file `/backend/docker-compose.prod.yml` and change the `ADMIN_USER_PWD` environment variable:

```yaml
- ADMIN_USER_PWD=your_new_secure_password_here
```

Then restart Plausible:

```bash
./manage.sh restart plausible
```

### Adding the Agentic Design Domain

After logging in as admin:

1. Click on "+ Add a website" 
2. Enter domain: `agentic-design.ai`
3. Configure your tracking preferences
4. Copy the tracking script and add it to your Next.js application

### Security Features Enabled

- ✅ Registration disabled (DISABLE_REGISTRATION=true)
- ✅ Authentication required (DISABLE_AUTH=false)
- ✅ SSL/TLS enabled via nginx proxy
- ✅ Rate limiting configured in nginx
- ✅ Secure headers configured

### Monitoring

To check Plausible status:

```bash
./manage.sh status
docker logs plausible_analytics
```

### Troubleshooting

If you cannot access Plausible:

1. Check if the container is running:
   ```bash
   docker ps | grep plausible
   ```

2. Check logs for errors:
   ```bash
   docker logs plausible_analytics
   docker logs plausible_postgres
   docker logs plausible_clickhouse
   ```

3. Ensure SSL certificates are valid:
   ```bash
   ls -la backend/certbot/conf/live/plausible.agentic-design.ai/
   ```

4. Restart the service:
   ```bash
   ./manage.sh restart plausible
   ```

## Environment Variables Reference

All Plausible configuration is done through environment variables in `docker-compose.prod.yml`:

- `BASE_URL`: The public URL where Plausible is accessible
- `SECRET_KEY_BASE`: Secret key for encrypting data (keep this secure!)
- `DISABLE_REGISTRATION`: Prevents new users from registering
- `DISABLE_AUTH`: When false, requires authentication to access
- `ADMIN_USER_EMAIL`: Initial admin user email
- `ADMIN_USER_NAME`: Initial admin username  
- `ADMIN_USER_PWD`: Initial admin password (CHANGE THIS!)

## Database Backup

To backup Plausible data:

```bash
# Backup PostgreSQL database
docker exec plausible_postgres pg_dump -U postgres plausible > plausible_backup_$(date +%Y%m%d).sql

# Backup ClickHouse events
docker exec plausible_clickhouse clickhouse-client --query="SELECT * FROM plausible_events_db.events" > events_backup_$(date +%Y%m%d).csv
```

## Notes

- Plausible runs on port 8000 internally, proxied through nginx
- Data is persisted in Docker volumes: `plausible_db_data` and `plausible_events_db_data`
- The service is configured to restart automatically on failure