// ============================================
// CUSTOM HOOK - useApplications
// ============================================

import { useState, useCallback } from 'react';
import { applicationService } from '@/services/application.service';
import {
  Application,
  ApplicationQueryParams,
  PaginatedResponse,
  ApiError,
} from '@/types';
import { toast } from 'sonner';

interface UseApplicationsState {
  applications: Application[];
  loading: boolean;
  error: ApiError | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

/**
 * Custom hook for managing applications
 */
export function useApplications(initialParams?: ApplicationQueryParams) {
  const [state, setState] = useState<UseApplicationsState>({
    applications: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
  });

  /**
   * Fetch applications
   */
  const fetchApplications = useCallback(
    async (params: ApplicationQueryParams) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await applicationService.getApplications(params);

        setState({
          applications: response.data,
          pagination: response.pagination,
          loading: false,
          error: null,
        });

        return response;
      } catch (error) {
        const apiError = error as ApiError;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
        }));
        toast.error(apiError.message || 'Failed to fetch applications');
        throw error;
      }
    },
    []
  );

  /**
   * Refresh applications
   */
  const refreshApplications = useCallback(
    async (params?: ApplicationQueryParams) => {
      const queryParams = params || initialParams || { page: 1, pageSize: 10 };
      return fetchApplications(queryParams);
    },
    [fetchApplications, initialParams]
  );

  return {
    applications: state.applications,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    fetchApplications,
    refreshApplications,
  };
}
