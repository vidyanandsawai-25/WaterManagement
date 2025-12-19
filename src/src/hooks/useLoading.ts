// Custom hook for managing loading states

import { useState, useCallback } from 'react';

/**
 * Custom hook for managing loading states
 */
export function useLoading(initialState: boolean = false) {
  const [loading, setLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const withLoading = useCallback(async <T,>(asyncFunction: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
