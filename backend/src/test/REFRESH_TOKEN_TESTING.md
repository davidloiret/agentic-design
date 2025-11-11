# Refresh Token Testing Guide

## Overview
This guide explains how to properly test refresh token functionality, including cookie-based authentication with automatic token refresh.

## Why Short Token Expiry is Needed
By default, Supabase sets access tokens to expire after 3600 seconds (1 hour). This makes it impractical to test refresh token functionality in development. For proper testing, you need to configure a much shorter expiry time.

## Configuration Steps

### 1. Configure Supabase for Testing

#### Option A: Temporary Testing Configuration (Recommended for Development)
1. Log into your Supabase Dashboard
2. Navigate to: **Settings → Authentication → JWT Settings**
3. Change **JWT expiry limit** to a short duration:
   - For quick testing: `10` seconds
   - For more realistic testing: `60` seconds
4. Save the changes

**Important:** Remember to change this back to a production-appropriate value (3600+ seconds) after testing!

#### Option B: Create a Test-Specific Supabase Project
1. Create a separate Supabase project specifically for testing
2. Configure it with short JWT expiry times
3. Use different environment variables for this test project

### 2. Run the Test Script

#### Basic Test (without waiting for expiry)
```bash
npm run test:refresh -- --email=user@example.com --password=yourpassword
```

#### Full Test with Token Expiry
```bash
# If Supabase is configured for 10-second expiry
npm run test:refresh -- --email=user@example.com --password=yourpassword --wait-for-expiry --expiry-seconds=10

# If Supabase is configured for 60-second expiry (default)
npm run test:refresh -- --email=user@example.com --password=yourpassword --wait-for-expiry --expiry-seconds=60
```

## What the Test Does

1. **Login**: Obtains access and refresh tokens
2. **Verify Access Token**: Tests that the access token works
3. **Wait for Expiry** (optional): Waits for the access token to expire
4. **Test Expired Token** (if waited): Verifies the expired token is rejected
5. **Explicit Refresh**: Tests manual refresh via `/auth/mobile/refresh`
6. **Cookie-Based Auth**: Tests automatic refresh with cookies
7. **Invalid Token Test**: Verifies invalid tokens are properly rejected

## Understanding Token Types

### Access Token
- Short-lived (configured in Supabase: 10s-3600s)
- Used for API authentication
- Sent in `Authorization: Bearer <token>` header
- Should be refreshed when expired

### Refresh Token
- Long-lived (typically 1 week+)
- Used to obtain new access tokens
- Can be stored in cookies for web apps
- Should be kept secure

## Cookie-Based Authentication Flow

When using cookie-based auth, the system should:
1. Store refresh token in an httpOnly cookie
2. Detect when access token expires (401 response)
3. Automatically use refresh token to get new access token
4. Retry the original request with new token
5. Update cookies with new tokens

## Troubleshooting

### Token Not Expiring
- **Important:** Supabase's default JWT expiry is 3600 seconds (1 hour)
- Check Supabase JWT expiry configuration in Dashboard → Settings → Authentication → JWT Settings
- Ensure `--expiry-seconds` matches your actual Supabase setting
- Wait for the full expiry time plus buffer (test adds 5 seconds)

### Refresh Failing with "Already Used" Error
- This can occur if the refresh token is consumed elsewhere before the test attempts to use it
- Ensure test requests with Authorization header don't also send cookies (which could trigger unwanted refresh)
- Check that only expired tokens trigger refresh logic
- Note: Supabase refresh tokens are single-use; once used, they're invalid

### Refresh Failing
- Verify refresh token is valid and not expired
- Check cookie configuration (httpOnly, secure, sameSite)
- Ensure CORS settings allow credentials
- Verify the AuthGuard is properly setting new cookies after refresh

### Cookie Issues
- Check browser/client sends `credentials: 'include'`
- Verify server sets proper cookie headers
- Check domain and path settings on cookies

## Security Considerations

1. **Never use short token expiry in production** - This is only for testing
2. **Refresh tokens should be stored securely** - Use httpOnly cookies
3. **Implement token rotation** - Issue new refresh token on each refresh
4. **Add refresh token revocation** - For logout and security events

## Production Recommendations

- Access token expiry: 15-60 minutes
- Refresh token expiry: 7-30 days
- Implement sliding sessions (refresh token rotation)
- Add rate limiting on refresh endpoints
- Log refresh events for security monitoring