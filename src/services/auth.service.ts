// ============================================
// AUTHENTICATION SERVICE
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/config/api.config';
import { AuthResponse, User, ApiResponse } from '@/types';

/**
 * Authentication Service
 * Handles user authentication and authorization
 */
class AuthService {
  /**
   * Login user
   */
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
      { requiresAuth: false }
    );

    // Store tokens and user data
    if (response.success && response.data) {
      this.storeAuthData(response.data);
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken },
      { requiresAuth: false }
    );

    if (response.success && response.data) {
      this.storeAuthData(response.data);
    }

    return response;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Get access token from storage
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Get user data from storage
   */
  getUserData(): User | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Store authentication data
   */
  private storeAuthData(authData: AuthResponse): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authData.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authData.user));
    
    // Set token in API service
    apiService.setAuthToken(authData.token);
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    
    // Remove token from API service
    apiService.removeAuthToken();
  }
}

export const authService = new AuthService();
