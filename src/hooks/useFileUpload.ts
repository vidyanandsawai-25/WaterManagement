// ============================================
// CUSTOM HOOK - useFileUpload
// ============================================

import { useState, useCallback } from 'react';
import { fileService } from '@/services/file.service';
import { FileUploadResponse, ApiError } from '@/types';
import { toast } from 'sonner';

interface UploadState {
  uploading: boolean;
  progress: number;
  error: ApiError | null;
}

/**
 * Custom hook for file uploads
 */
export function useFileUpload() {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  /**
   * Upload single file
   */
  const uploadFile = useCallback(
    async (file: File): Promise<FileUploadResponse | null> => {
      // Validate file
      const validation = fileService.validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error);
        return null;
      }

      setState({ uploading: true, progress: 0, error: null });

      try {
        const response = await fileService.uploadFile(file);
        
        setState({ uploading: false, progress: 100, error: null });
        toast.success('File uploaded successfully');
        
        return response.data;
      } catch (err) {
        const apiError = err as ApiError;
        setState({ uploading: false, progress: 0, error: apiError });
        toast.error(apiError.message || 'Failed to upload file');
        return null;
      }
    },
    []
  );

  /**
   * Upload multiple files
   */
  const uploadMultipleFiles = useCallback(
    async (files: File[]): Promise<FileUploadResponse[] | null> => {
      // Validate all files
      for (const file of files) {
        const validation = fileService.validateFile(file);
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`);
          return null;
        }
      }

      setState({ uploading: true, progress: 0, error: null });

      try {
        const response = await fileService.uploadMultipleFiles(files);
        
        setState({ uploading: false, progress: 100, error: null });
        toast.success(`${files.length} files uploaded successfully`);
        
        return response.data;
      } catch (err) {
        const apiError = err as ApiError;
        setState({ uploading: false, progress: 0, error: apiError });
        toast.error(apiError.message || 'Failed to upload files');
        return null;
      }
    },
    []
  );

  /**
   * Reset upload state
   */
  const reset = useCallback(() => {
    setState({ uploading: false, progress: 0, error: null });
  }, []);

  return {
    uploading: state.uploading,
    progress: state.progress,
    error: state.error,
    uploadFile,
    uploadMultipleFiles,
    reset,
  };
}
