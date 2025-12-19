// ============================================
// CORE API SERVICE - HTTP CLIENT
// ============================================

import { API_CONFIG, API_ERROR_MESSAGES, STORAGE_KEYS } from '@/config/api.config';
import { ApiError } from '@/types';

/**
 * Request Configuration Interface
 */
interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
}

/**
 * Core API Service Class
 * Handles all HTTP requests with proper error handling, authentication, and retries
 */
class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Set authentication token in storage
   */
  public setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  /**
   * Remove authentication token from storage
   */
  public removeAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Build request headers
   */
  private buildHeaders(requiresAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Handle fetch with timeout
   */
  private async fetchWithTimeout(
    url: string,
    config: RequestConfig
  ): Promise<Response> {
    const timeout = config.timeout || this.timeout;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(API_ERROR_MESSAGES.TIMEOUT);
      }
      throw error;
    }
  }

  /**
   * Handle API errors
   */
  private async handleError(response: Response): Promise<never> {
    let errorData: ApiError;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: this.getErrorMessageByStatus(response.status),
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    }

    // Handle 401 - Unauthorized (token expired)
    if (response.status === 401) {
      this.removeAuthToken();
      // Redirect to login or trigger auth refresh
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    throw errorData;
  }

  /**
   * Get error message by HTTP status code
   */
  private getErrorMessageByStatus(status: number): string {
    switch (status) {
      case 400:
        return API_ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return API_ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return API_ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return API_ERROR_MESSAGES.NOT_FOUND;
      case 500:
      case 502:
      case 503:
        return API_ERROR_MESSAGES.SERVER_ERROR;
      default:
        return API_ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  /**
   * Retry logic for failed requests
   */
  private async retryRequest<T>(
    request: () => Promise<T>,
    retries: number
  ): Promise<T> {
    try {
      return await request();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(API_CONFIG.RETRY_DELAY);
        return this.retryRequest(request, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    // Retry on network errors or 5xx server errors
    if (error instanceof TypeError) return true; // Network error
    if (error?.statusCode >= 500) return true;
    return false;
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generic request method
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      requiresAuth = true,
      retries = API_CONFIG.RETRY_ATTEMPTS,
      ...fetchConfig
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(requiresAuth);

    const makeRequest = async (): Promise<T> => {
      try {
        const response = await this.fetchWithTimeout(url, {
          ...fetchConfig,
          headers: {
            ...headers,
            ...fetchConfig.headers,
          },
        });

        if (!response.ok) {
          await this.handleError(response);
        }

        // Handle 204 No Content
        if (response.status === 204) {
          return {} as T;
        }

        return await response.json();
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error(API_ERROR_MESSAGES.NETWORK_ERROR);
        }
        throw error;
      }
    };

    return this.retryRequest(makeRequest, retries);
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    });
  }

  /**
   * File upload with FormData
   */
  async uploadFile<T>(
    endpoint: string,
    formData: FormData,
    config?: RequestConfig
  ): Promise<T> {
    const requiresAuth = config?.requiresAuth ?? true;
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {};
    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'POST',
        body: formData,
        headers,
        ...config,
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(API_ERROR_MESSAGES.NETWORK_ERROR);
      }
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
