/**
 * API Service Layer
 * Handles all HTTP requests to backend API endpoints
 */

import { apiOperations } from '@/utils/apiLogger';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  timestamp?: string;
}

export interface Application {
  id: number | string;
  applicationNo: string;
  dateTime: string;
  upicId: string;
  consumerNo: string;
  details: string;
  applicantName: string;
  mobileNumber: string;
  stage: string;
  status: string;
  office: string;
  date: string;
  days: number;
  [key: string]: any;
}

/**
 * Application API Service
 */
export const applicationApi = {
  /**
   * Get all applications with optional filters
   */
  async getAll(filters?: {
    status?: string;
    type?: string;
    zone?: string;
    search?: string;
  }): Promise<ApiResponse<Application[]>> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.zone) params.append('zone', filters.zone);
    if (filters?.search) params.append('search', filters.search);
    
    const query = params.toString();
    const endpoint = `/api/applications${query ? `?${query}` : ''}`;
    
    // Log API call start
    apiOperations.fetchApplications.start();
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        apiOperations.fetchApplications.error(data.error || 'Request failed');
        return { success: false, error: data.error || 'Request failed' };
      }
      
      // Log success
      apiOperations.fetchApplications.success(data);
      
      return data;
    } catch (error) {
      apiOperations.fetchApplications.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Get single application by ID
   */
  async getById(id: string | number): Promise<ApiResponse<Application>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Create new application
   */
  async create(application: Partial<Application>): Promise<ApiResponse<Application>> {
    // Log API call start
    apiOperations.registration.start(application);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        apiOperations.registration.error(data.error || 'Request failed');
        return { success: false, error: data.error || 'Request failed' };
      }
      
      // Log success
      apiOperations.registration.success(data);
      
      return data;
    } catch (error) {
      apiOperations.registration.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Update existing application (full update)
   */
  async update(
    id: string | number,
    application: Partial<Application>
  ): Promise<ApiResponse<Application>> {
    // Log API call start
    apiOperations.updateApplication.start(id, application);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        apiOperations.updateApplication.error(data.error || 'Request failed');
        return { success: false, error: data.error || 'Request failed' };
      }
      
      // Log success
      apiOperations.updateApplication.success(data);
      
      return data;
    } catch (error) {
      apiOperations.updateApplication.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Partial update application
   */
  async patch(
    id: string | number,
    updates: Partial<Application>
  ): Promise<ApiResponse<Application>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Delete application
   */
  async delete(id: string | number): Promise<ApiResponse<Application>> {
    // Log API call start
    apiOperations.deleteApplication.start(id);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        apiOperations.deleteApplication.error(data.error || 'Request failed');
        return { success: false, error: data.error || 'Request failed' };
      }
      
      // Log success
      apiOperations.deleteApplication.success(data);
      
      return data;
    } catch (error) {
      apiOperations.deleteApplication.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Approve application
   */
  async approve(
    id: string | number,
    data?: { remarks?: string; approvedBy?: string }
  ): Promise<ApiResponse<Application>> {
    // Log API call start
    apiOperations.approveApplication.start(id, data);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        apiOperations.approveApplication.error(responseData.error || 'Request failed');
        return { success: false, error: responseData.error || 'Request failed' };
      }
      
      // Log success
      apiOperations.approveApplication.success(responseData);
      
      return responseData;
    } catch (error) {
      apiOperations.approveApplication.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Reject application
   */
  async reject(
    id: string | number,
    data: { reason: string; rejectedBy?: string }
  ): Promise<ApiResponse<Application>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

/**
 * Health check API
 */
export const healthApi = {
  /**
   * Check API health status
   */
  async check(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

/**
 * Utility function to log API calls (for debugging)
 */
export function enableApiLogging() {
  console.log('🔍 API Logging Enabled');
  console.log('📍 API Base URL:', API_BASE_URL || 'Relative URLs');
}

/**
 * Export all API services
 */
export default {
  applications: applicationApi,
  health: healthApi,
  enableLogging: enableApiLogging,
};