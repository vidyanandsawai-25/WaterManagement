// Custom hook for managing applications

import { useState, useCallback } from 'react';
import { Application, FilterOptions, PaginationOptions } from '@/types';
import { toast } from 'sonner@2.0.3';

interface UseApplicationsState {
  applications: Application[];
  loading: boolean;
  error: string | null;
  pagination: PaginationOptions;
}

/**
 * Custom hook for managing applications
 */
export function useApplications(initialData: Application[] = []) {
  const [state, setState] = useState<UseApplicationsState>({
    applications: initialData,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pageSize: 10,
      total: initialData.length,
    },
  });

  /**
   * Fetch applications with filters
   */
  const fetchApplications = useCallback(
    async (filters?: FilterOptions, pagination?: Partial<PaginationOptions>) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // In a real app, this would call an API
        // For now, we'll simulate with existing data
        const queryParams = new URLSearchParams();
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
          });
        }
        
        if (pagination) {
          if (pagination.page) queryParams.append('page', pagination.page.toString());
          if (pagination.pageSize) queryParams.append('pageSize', pagination.pageSize.toString());
        }

        // Simulate API call
        const response = await fetch(`/api/applications?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();

        setState({
          applications: data.applications || [],
          pagination: {
            page: data.page || 1,
            pageSize: data.pageSize || 10,
            total: data.total || 0,
          },
          loading: false,
          error: null,
        });

        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch applications';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        toast.error(errorMessage);
        throw error;
      }
    },
    []
  );

  /**
   * Refresh applications
   */
  const refreshApplications = useCallback(async () => {
    return fetchApplications();
  }, [fetchApplications]);

  /**
   * Update local application state
   */
  const updateApplication = useCallback((updatedApp: Application) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.map((app) =>
        app.id === updatedApp.id ? updatedApp : app
      ),
    }));
  }, []);

  /**
   * Remove application from local state
   */
  const removeApplication = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.filter((app) => app.id !== id),
      pagination: {
        ...prev.pagination,
        total: prev.pagination.total - 1,
      },
    }));
  }, []);

  return {
    applications: state.applications,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    fetchApplications,
    refreshApplications,
    updateApplication,
    removeApplication,
  };
}
