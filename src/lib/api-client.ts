// API client with automatic cookie handling
export async function apiClient(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  // Use the frontend's proxy route which forwards to the backend
  const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    credentials: 'include', // Always include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    // Don't throw for 401 on /me endpoint - just return the response
    if (response.status === 401 && url.includes('/auth/me')) {
      return response;
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response;
}

// Helper functions for common HTTP methods
export const api = {
  get: (endpoint: string) => apiClient(endpoint, { method: 'GET' }),
  
  post: (endpoint: string, data: any) =>
    apiClient(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any) =>
    apiClient(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string) => apiClient(endpoint, { method: 'DELETE' }),
};