// ============================================
// APPLICATION SERVICE - Business Logic Layer
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import {
  Application,
  ApplicationQueryParams,
  PaginatedResponse,
  ApiResponse,
  CreateApplicationDto,
  UpdateApplicationDto,
  AllocateApplicationDto,
  DashboardStats,
} from '@/types';

/**
 * Application Service
 * Handles all application-related API calls
 */
class ApplicationService {
  /**
   * Get paginated list of applications with filters and sorting
   */
  async getApplications(
    params: ApplicationQueryParams
  ): Promise<PaginatedResponse<Application>> {
    const queryParams = new URLSearchParams();
    
    // Pagination
    queryParams.append('page', params.page.toString());
    queryParams.append('pageSize', params.pageSize.toString());
    
    // Filters
    if (params.filters) {
      if (params.filters.applicationType) {
        queryParams.append('applicationType', params.filters.applicationType);
      }
      if (params.filters.status) {
        queryParams.append('status', params.filters.status);
      }
      if (params.filters.priority) {
        queryParams.append('priority', params.filters.priority);
      }
      if (params.filters.assignedTo) {
        queryParams.append('assignedTo', params.filters.assignedTo);
      }
      if (params.filters.searchQuery) {
        queryParams.append('search', params.filters.searchQuery);
      }
      if (params.filters.dateFrom) {
        queryParams.append('dateFrom', params.filters.dateFrom);
      }
      if (params.filters.dateTo) {
        queryParams.append('dateTo', params.filters.dateTo);
      }
    }
    
    // Sorting
    if (params.sort) {
      queryParams.append('sortField', params.sort.field);
      queryParams.append('sortDirection', params.sort.direction);
    }
    
    const endpoint = `${API_ENDPOINTS.APPLICATIONS.LIST}?${queryParams.toString()}`;
    return apiService.get<PaginatedResponse<Application>>(endpoint);
  }

  /**
   * Get single application by ID
   */
  async getApplicationById(id: string): Promise<ApiResponse<Application>> {
    return apiService.get<ApiResponse<Application>>(
      API_ENDPOINTS.APPLICATIONS.GET_BY_ID(id)
    );
  }

  /**
   * Create new application
   */
  async createApplication(
    data: CreateApplicationDto
  ): Promise<ApiResponse<Application>> {
    return apiService.post<ApiResponse<Application>>(
      API_ENDPOINTS.APPLICATIONS.CREATE,
      data
    );
  }

  /**
   * Update existing application
   */
  async updateApplication(
    id: string,
    data: UpdateApplicationDto
  ): Promise<ApiResponse<Application>> {
    return apiService.put<ApiResponse<Application>>(
      API_ENDPOINTS.APPLICATIONS.UPDATE(id),
      data
    );
  }

  /**
   * Delete application
   */
  async deleteApplication(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<ApiResponse<void>>(
      API_ENDPOINTS.APPLICATIONS.DELETE(id)
    );
  }

  /**
   * Allocate application to employee
   */
  async allocateApplication(
    data: AllocateApplicationDto
  ): Promise<ApiResponse<Application>> {
    return apiService.post<ApiResponse<Application>>(
      API_ENDPOINTS.APPLICATIONS.ALLOCATE,
      data
    );
  }

  /**
   * Bulk update applications
   */
  async bulkUpdateApplications(
    applicationIds: string[],
    updates: Partial<UpdateApplicationDto>
  ): Promise<ApiResponse<Application[]>> {
    return apiService.post<ApiResponse<Application[]>>(
      API_ENDPOINTS.APPLICATIONS.BULK_UPDATE,
      {
        applicationIds,
        updates,
      }
    );
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiService.get<ApiResponse<DashboardStats>>(
      API_ENDPOINTS.APPLICATIONS.STATS
    );
  }

  /**
   * Export applications to Excel/CSV
   */
  async exportApplications(
    params: ApplicationQueryParams,
    format: 'excel' | 'csv' = 'excel'
  ): Promise<Blob> {
    const queryParams = new URLSearchParams();
    queryParams.append('format', format);
    
    // Add filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    
    const endpoint = `${API_ENDPOINTS.APPLICATIONS.EXPORT}?${queryParams.toString()}`;
    
    // For file download, we need to handle it differently
    const response = await fetch(`${apiService['baseURL']}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('akola_access_token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to export applications');
    }
    
    return response.blob();
  }
}

export const applicationService = new ApplicationService();
