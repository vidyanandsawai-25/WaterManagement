// ============================================
// CUSTOM HOOK - useApplication (Single)
// ============================================

import { useState, useCallback } from 'react';
import { applicationService } from '@/services/application.service';
import {
  Application,
  CreateApplicationDto,
  UpdateApplicationDto,
  ApiError,
} from '@/types';
import { toast } from 'sonner';

/**
 * Custom hook for managing a single application
 */
export function useApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  /**
   * Get application by ID
   */
  const getApplication = useCallback(async (id: string): Promise<Application | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await applicationService.getApplicationById(id);
      setLoading(false);
      return response.data;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      setLoading(false);
      toast.error(apiError.message || 'Failed to fetch application');
      return null;
    }
  }, []);

  /**
   * Create new application
   */
  const createApplication = useCallback(
    async (data: CreateApplicationDto): Promise<Application | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await applicationService.createApplication(data);
        setLoading(false);
        toast.success('Application created successfully');
        return response.data;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        setLoading(false);
        toast.error(apiError.message || 'Failed to create application');
        return null;
      }
    },
    []
  );

  /**
   * Update application
   */
  const updateApplication = useCallback(
    async (
      id: string,
      data: UpdateApplicationDto
    ): Promise<Application | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await applicationService.updateApplication(id, data);
        setLoading(false);
        toast.success('Application updated successfully');
        return response.data;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        setLoading(false);
        toast.error(apiError.message || 'Failed to update application');
        return null;
      }
    },
    []
  );

  /**
   * Delete application
   */
  const deleteApplication = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await applicationService.deleteApplication(id);
      setLoading(false);
      toast.success('Application deleted successfully');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      setLoading(false);
      toast.error(apiError.message || 'Failed to delete application');
      return false;
    }
  }, []);

  return {
    loading,
    error,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}
