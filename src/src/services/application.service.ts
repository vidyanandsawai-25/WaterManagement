// Application Service - handles all application-related API calls

import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/constants/routes';
import {
  Application,
  ApplicationCreateInput,
  ApplicationUpdateInput,
  FilterOptions,
  PaginationOptions,
  ApiResponse,
} from '@/types';

export const applicationService = {
  /**
   * Get all applications with filters
   */
  async getApplications(filters?: FilterOptions, pagination?: Partial<PaginationOptions>): Promise<ApiResponse<Application[]>> {
    const params: Record<string, string> = {};
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
    }
    
    if (pagination) {
      if (pagination.page) params.page = pagination.page.toString();
      if (pagination.pageSize) params.pageSize = pagination.pageSize.toString();
    }
    
    return apiClient.get<ApiResponse<Application[]>>(API_ROUTES.APPLICATIONS.BASE, params);
  },

  /**
   * Get application by ID
   */
  async getApplicationById(id: string): Promise<ApiResponse<Application>> {
    return apiClient.get<ApiResponse<Application>>(API_ROUTES.APPLICATIONS.BY_ID(id));
  },

  /**
   * Create new application
   */
  async createApplication(data: ApplicationCreateInput): Promise<ApiResponse<Application>> {
    return apiClient.post<ApiResponse<Application>>(API_ROUTES.APPLICATIONS.BASE, data);
  },

  /**
   * Update application
   */
  async updateApplication(id: string, data: ApplicationUpdateInput): Promise<ApiResponse<Application>> {
    return apiClient.put<ApiResponse<Application>>(API_ROUTES.APPLICATIONS.BY_ID(id), data);
  },

  /**
   * Approve application
   */
  async approveApplication(id: string, comments?: string): Promise<ApiResponse<Application>> {
    return apiClient.post<ApiResponse<Application>>(API_ROUTES.APPLICATIONS.APPROVE(id), { comments });
  },

  /**
   * Reject application
   */
  async rejectApplication(id: string, reason: string): Promise<ApiResponse<Application>> {
    return apiClient.post<ApiResponse<Application>>(API_ROUTES.APPLICATIONS.REJECT(id), { reason });
  },

  /**
   * Delete application
   */
  async deleteApplication(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(API_ROUTES.APPLICATIONS.BY_ID(id));
  },
};
