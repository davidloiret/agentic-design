/**
 * Test script to verify refresh token functionality
 *
 * Usage: npm run test:refresh -- --email=user@example.com --password=yourpassword [--mode=both|cookie|mobile] [--wait-for-expiry]
 *
 * IMPORTANT: For proper testing of token refresh:
 * 1. Configure Supabase JWT expiry to a short duration (e.g., 10-60 seconds) in your Supabase dashboard:
 *    Settings → Auth → JWT Settings → JWT expiry limit
 * 2. Use --wait-for-expiry flag to wait for actual token expiration (will wait based on Supabase setting)
 *
 * What this test verifies:
 * - Mobile mode: Tests explicit refresh via /auth/mobile/refresh endpoint
 * - Cookie mode: Tests automatic refresh when AuthGuard detects expired access_token in cookies
 *   The AuthGuard should automatically use the refresh_token cookie to get new tokens
 * - Both mode: Tests both mobile and cookie-based refresh mechanisms
 *
 * Note: Supabase default access token expiry is 3600 seconds (1 hour)
 */

const API_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const API_BASE = `${API_URL}/api/v1`;

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}

// Helper function to handle fetch errors
async function fetchWithError(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
      error: 'Unknown error'
    }));

    const error: any = new Error(errorData.message || `HTTP ${response.status}`);
    error.response = {
      status: response.status,
      data: errorData
    };
    throw error;
  }

  return response;
}

// Helper to parse cookies from set-cookie headers
function parseCookies(headers: Headers): string {
  const setCookieHeader = headers.get('set-cookie');
  if (!setCookieHeader) {
    console.log('   DEBUG: No set-cookie header found');
    return '';
  }

  console.log(`   DEBUG: Raw set-cookie header (first 200 chars): ${setCookieHeader.substring(0, 200)}...`);

  // Parse cookies more carefully to handle complex cookie strings
  const cookieMap = new Map<string, string>();

  // Split by comma but be careful of expires dates that contain commas
  // Look for comma followed by a space and a cookie name (word characters followed by =)
  const cookieStrings = setCookieHeader.split(/, (?=\w+=)/);

  console.log(`   DEBUG: Found ${cookieStrings.length} cookie strings`);

  for (const cookieString of cookieStrings) {
    const [nameValuePart] = cookieString.split(';');
    if (nameValuePart && nameValuePart.includes('=')) {
      const [name, ...valueParts] = nameValuePart.trim().split('=');
      const value = valueParts.join('='); // Rejoin in case value contains =
      if (name && value) {
        console.log(`   DEBUG: Parsed cookie: ${name}=${value.substring(0, 20)}...`);
        cookieMap.set(name, value);
      }
    }
  }

  // Return cookies in the format expected by Cookie header
  const result = Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');

  console.log(`   DEBUG: Final cookie string (first 200 chars): ${result.substring(0, 200)}...`);
  return result;
}

// Get credentials and options from command line args
const args = process.argv.slice(2);
const emailArg = args.find(arg => arg.startsWith('--email='));
const passwordArg = args.find(arg => arg.startsWith('--password='));
const waitForExpiry = args.includes('--wait-for-expiry');
const expiryTime = parseInt(args.find(arg => arg.startsWith('--expiry-seconds='))?.split('=')[1] || '60');
const modeArg = args.find(arg => arg.startsWith('--mode='));
const testMode = modeArg ? modeArg.split('=')[1] : 'both';

// Validate test mode
if (!['both', 'cookie', 'mobile'].includes(testMode)) {
  console.error(`Invalid mode: ${testMode}. Must be 'both', 'cookie', or 'mobile'.`);
  process.exit(1);
}

if (!emailArg || !passwordArg) {
  console.error('Usage: npm run test:refresh -- --email=user@example.com --password=yourpassword [--mode=both|cookie|mobile] [--wait-for-expiry] [--expiry-seconds=60]');
  console.error('\nOptions:');
  console.error('  --mode=MODE          Test mode: both, cookie, or mobile (default: both)');
  console.error('  --wait-for-expiry    Wait for actual token expiration (default: false)');
  console.error('  --expiry-seconds=N   Expected token expiry in seconds (default: 60, should match Supabase setting)');
  process.exit(1);
}

const email = emailArg.split('=')[1];
const password = passwordArg.split('=')[1];

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRefreshToken() {
  try {
    console.log(`🚀 Starting refresh token test (mode: ${testMode})...\n`);

    // Step 0: Logout first to clear any existing session
    console.log('0. Logging out to clear existing session...');
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.log('⚠️ Logout failed or no existing session');
    }

    await sleep(1000);

    // Step 1: Login to get tokens
    console.log('\n1. Logging in...');
    const loginResponse = await fetchWithError(
      `${API_BASE}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      }
    );

    const loginData: AuthResponse = await loginResponse.json();
    const { access_token, refresh_token, user } = loginData;
    console.log(`✅ Login successful for user: ${user.email}`);
    console.log(`   Access Token: ${access_token.substring(0, 20)}...`);
    console.log(`   Refresh Token: ${refresh_token.substring(0, 20)}...`);

    // Store cookies from login response
    const loginCookies = parseCookies(loginResponse.headers);
    const cookieNames = loginCookies.split('; ').map(c => c.split('=')[0]);
    console.log(`   Parsed cookies: [${cookieNames.join(', ')}]`);

    // Step 2: Verify access token works (don't send cookies to avoid consuming refresh token)
    console.log('\n2. Testing authenticated endpoint with access token...');
    console.log('   Using Authorization header only (no cookies)');
    const meResponse = await fetchWithError(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
      // Don't include credentials to avoid sending cookies
    });
    const meData = await meResponse.json();
    console.log(`✅ Access token valid, user: ${meData.email}`);

    // Step 3: Wait for token expiration if requested
    if (waitForExpiry) {
      console.log(`\n3. Waiting ${expiryTime} seconds for token to expire...`);
      console.log('   (Make sure Supabase JWT expiry is configured to match)');
      // Add a small buffer to ensure expiration
      const waitTime = (expiryTime + 5) * 1000;
      for (let i = 0; i < expiryTime + 5; i += 10) {
        await sleep(10000);
        console.log(`   ... ${i + 10} seconds passed`);
      }
    } else {
      console.log('\n3. Skipping wait for expiry (use --wait-for-expiry to test with actual expired token)');
      await sleep(2000);
    }

    // Step 3.5: If we waited for expiry, test that the old token is now invalid
    if (waitForExpiry) {
      console.log('\n3.5. Testing that expired access token is rejected...');
      try {
        await fetchWithError(`${API_BASE}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
          // Don't include credentials to avoid sending cookies
        });
        console.log('❌ Expired token should have been rejected!');
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log('✅ Expired token correctly rejected with 401');
        } else {
          console.error('❌ Unexpected error:', error.message);
        }
      }
    }

    // Step 4: Test refresh with mobile endpoint (explicit refresh)
    if (testMode === 'mobile' || testMode === 'both') {
      console.log('\n4. Testing explicit refresh via mobile endpoint...');
      try {
        const refreshResponse = await fetchWithError(
          `${API_BASE}/auth/mobile/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token })
          }
        );

        const newTokens: AuthResponse = await refreshResponse.json();
        console.log(`✅ Refresh successful!`);
        console.log(`   New Access Token: ${newTokens.access_token.substring(0, 20)}...`);
        console.log(`   New Refresh Token: ${newTokens.refresh_token ? newTokens.refresh_token.substring(0, 20) + '...' : 'not provided'}`);

        // Step 5: Verify new access token works
        console.log('\n5. Testing authenticated endpoint with NEW access token...');
        const meResponse2 = await fetchWithError(`${API_BASE}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${newTokens.access_token}`
          }
        });
        const meData2 = await meResponse2.json();
        console.log(`✅ New access token valid, user: ${meData2.email}`);

      } catch (error: any) {
        console.error('❌ Refresh failed:', error.response?.data || error.message);
      }
    }

    // Step 6: Test cookie-based refresh (automatic)
    if (testMode === 'cookie' || testMode === 'both') {
      console.log('\n6. Testing automatic cookie-based refresh...');

      // Use the cookies from the initial login (they should contain both access_token and refresh_token)
      console.log('   Using cookies from initial login...');
      const cookieNamesBeingSent = loginCookies.split('; ').map(c => c.split('=')[0]);
      console.log(`   Cookie names being sent: [${cookieNamesBeingSent.join(', ')}]`);

      if (waitForExpiry) {
        // If we waited for expiry, the access_token cookie should be expired
        // but the refresh_token should still be valid
        console.log('   Access token in cookie should be expired, testing automatic refresh...');
      }

      try {
        // Make a request with cookies only (no Authorization header)
        // The AuthGuard should automatically use the refresh_token cookie if access_token is expired
        const meWithCookiesResponse = await fetchWithError(`${API_BASE}/auth/me`, {
          headers: {
            'Cookie': loginCookies
          }
          // Don't use credentials: 'include' when manually setting Cookie header
        });

        const meWithCookiesData = await meWithCookiesResponse.json();
        console.log(`✅ Cookie-based auth successful, user: ${meWithCookiesData.email}`);

        // Check if new cookies were set (indicating a refresh occurred)
        const newCookies = parseCookies(meWithCookiesResponse.headers);
        let updatedCookies = loginCookies; // Default to original cookies

        if (newCookies) {
          const newCookieNames = newCookies.split('; ').map(c => c.split('=')[0]);
          console.log(`   New cookies received: [${newCookieNames.join(', ')}]`);

          if (waitForExpiry && newCookieNames.includes('access_token')) {
            console.log('✅ Automatic refresh successful - new access_token received');
            if (newCookieNames.includes('refresh_token')) {
              console.log('✅ New refresh_token also received');
            }

            // Use the new cookies for subsequent requests
            updatedCookies = newCookies;
            console.log('   Using new cookies for verification request...');
          }
        } else if (waitForExpiry) {
          console.log('⚠️ No new cookies received - refresh may not have occurred');
        }

        // Step 6.5: Make another request with the updated cookies to verify they work
        if (waitForExpiry) {
          console.log('\n6.5. Verifying new tokens work...');
          try {
            const verifyResponse = await fetchWithError(`${API_BASE}/auth/me`, {
              headers: {
                'Cookie': updatedCookies
              }
            });
            const verifyData = await verifyResponse.json();
            console.log(`✅ New tokens verified, user: ${verifyData.email}`);
          } catch (error: any) {
            console.error('❌ New tokens verification failed:', error.message);
          }
        }

      } catch (error: any) {
        console.error('❌ Cookie-based automatic refresh failed:', error.message);
        // If this fails when waitForExpiry is true, it means the automatic refresh isn't working
        if (waitForExpiry) {
          console.error('   The AuthGuard should have automatically refreshed the expired token using the refresh_token cookie');
        }
      }
    }

    // Step 7: Test with invalid refresh token (for mobile mode)
    if (testMode === 'mobile' || testMode === 'both') {
      console.log('\n7. Testing with invalid refresh token (negative test)...');
      try {
        await fetchWithError(`${API_BASE}/auth/mobile/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: 'invalid_token_123'
          })
        });
        console.log('❌ Should have failed with invalid token!');
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log('✅ Correctly rejected invalid refresh token');
        } else {
          console.error('❌ Unexpected error:', error.message);
        }
      }
    }

    console.log('\n🎉 All tests completed!');

  } catch (error: any) {
    console.error('\n❌ Test failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      error: error.response?.data?.error
    });
    process.exit(1);
  }
}

// Run the test
testRefreshToken().catch(console.error);