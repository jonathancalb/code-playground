// Centralized HTTP Interceptor - shared across all microfrontends
export const httpInterceptor = {
  async request(url, options = {}) {
    console.log('[HTTP Interceptor] Request:', url);
    
    const headers = {
      ...options.headers,
      'Authorization': 'Bearer shared-token-123',
      'X-Request-ID': `req-${Date.now()}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        if (response.status === 401) {
          console.error('[HTTP Interceptor] 401 Unauthorized: Please login.');
          throw new Error('Unauthorized - Please login');
        } else if (response.status === 404) {
          console.error('[HTTP Interceptor] 404 Resource not found.');
          throw new Error('Resource not found');
        } else if (response.status >= 500) {
          console.error('[HTTP Interceptor] 5xx Server error: Please try again later.');
          throw new Error('Server error - Please try again later');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(`[HTTP Interceptor] Response OK: ${response.status}`);
      return response;
    } catch (error) {
      console.error('[HTTP Interceptor] Fetch error:', error.message);
      throw error;
    }
  }
};
