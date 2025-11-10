import axios, { AxiosError } from 'axios';

/**
 * Test script to verify refresh token functionality
 *
 * Usage: npm run test:refresh -- --email=user@example.com --password=yourpassword
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

// Get credentials from command line args
const args = process.argv.slice(2);
const emailArg = args.find(arg => arg.startsWith('--email='));
const passwordArg = args.find(arg => arg.startsWith('--password='));

if (!emailArg || !passwordArg) {
  console.error('Usage: npm run test:refresh -- --email=user@example.com --password=yourpassword');
  process.exit(1);
}

const email = emailArg.split('=')[1];
const password = passwordArg.split('=')[1];

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRefreshToken() {
  try {
    console.log('🚀 Starting refresh token test...\n');

    // Step 1: Login to get tokens
    console.log('1. Logging in...');
    const loginResponse = await axios.post<AuthResponse>(
      `${API_BASE}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const { access_token, refresh_token, user } = loginResponse.data;
    console.log(`✅ Login successful for user: ${user.email}`);
    console.log(`   Access Token: ${access_token.substring(0, 20)}...`);
    console.log(`   Refresh Token: ${refresh_token.substring(0, 20)}...`);

    // Step 2: Verify access token works
    console.log('\n2. Testing authenticated endpoint with access token...');
    const meResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    console.log(`✅ Access token valid, user: ${meResponse.data.email}`);

    // Step 3: Wait a bit (simulate time passing)
    console.log('\n3. Waiting 5 seconds to simulate time passing...');
    await sleep(5000);

    // Step 4: Test refresh with mobile endpoint (explicit refresh)
    console.log('\n4. Testing explicit refresh via mobile endpoint...');
    try {
      const refreshResponse = await axios.post<AuthResponse>(
        `${API_BASE}/auth/mobile/refresh`,
        { refresh_token }
      );

      const newTokens = refreshResponse.data;
      console.log(`✅ Refresh successful!`);
      console.log(`   New Access Token: ${newTokens.access_token.substring(0, 20)}...`);
      console.log(`   New Refresh Token: ${newTokens.refresh_token ? newTokens.refresh_token.substring(0, 20) + '...' : 'not provided'}`);

      // Step 5: Verify new access token works
      console.log('\n5. Testing authenticated endpoint with NEW access token...');
      const meResponse2 = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${newTokens.access_token}` }
      });
      console.log(`✅ New access token valid, user: ${meResponse2.data.email}`);

    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('❌ Refresh failed:', axiosError.response?.data || axiosError.message);
    }

    // Step 6: Test cookie-based refresh (automatic)
    console.log('\n6. Testing automatic cookie-based refresh...');
    console.log('   Sending request with cookies only (no Authorization header)...');

    // First, let's set up cookies by logging in via the web endpoint
    const cookieJar = await axios.post(
      `${API_BASE}/auth/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Cookie': loginResponse.headers['set-cookie']?.join('; ') || ''
        }
      }
    );

    // Extract cookies from response
    const cookies = cookieJar.headers['set-cookie'];
    console.log(`   Cookies received: ${cookies ? 'Yes' : 'No'}`);

    if (cookies) {
      // Test with cookies
      const meWithCookies = await axios.get(`${API_BASE}/auth/me`, {
        headers: {
          'Cookie': cookies.join('; ')
        },
        withCredentials: true
      });
      console.log(`✅ Cookie-based auth successful, user: ${meWithCookies.data.email}`);
    }

    // Step 7: Test with invalid refresh token
    console.log('\n7. Testing with invalid refresh token (negative test)...');
    try {
      await axios.post(`${API_BASE}/auth/mobile/refresh`, {
        refresh_token: 'invalid_token_123'
      });
      console.log('❌ Should have failed with invalid token!');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 401) {
        console.log('✅ Correctly rejected invalid refresh token');
      } else {
        console.error('❌ Unexpected error:', axiosError.message);
      }
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('\n❌ Test failed:', {
      status: axiosError.response?.status,
      message: axiosError.response?.data?.message || axiosError.message,
      error: axiosError.response?.data?.error
    });
    process.exit(1);
  }
}

// Run the test
testRefreshToken().catch(console.error);