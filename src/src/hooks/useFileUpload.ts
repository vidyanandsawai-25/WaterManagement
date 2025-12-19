// Custom hook for file uploads

import { useState, useCallback } from 'react';
import { FileUploadResult } from '@/types';
import { toast } from 'sonner@2.0.3';

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
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
   * Validate file
   */
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' };
    }

    return { valid: true };
  }, []);

  /**
   * Upload single file
   */
  const uploadFile = useCallback(
    async (file: File): Promise<FileUploadResult | null> => {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid file');
        return null;
      }

      setState({ uploading: true, progress: 0, error: null });

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const result = await response.json();

        setState({ uploading: false, progress: 100, error: null });
        toast.success('File uploaded successfully');

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
        setState({ uploading: false, progress: 0, error: errorMessage });
        toast.error(errorMessage);
        return null;
      }
    },
    [validateFile]
  );

  /**
   * Upload multiple files
   */
  const uploadMultipleFiles = useCallback(
    async (files: File[]): Promise<FileUploadResult[] | null> => {
      // Validate all files
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`);
          return null;
        }
      }

      setState({ uploading: true, progress: 0, error: null });

      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });

        const response = await fetch('/api/upload/multiple', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload files');
        }

        const result = await response.json();

        setState({ uploading: false, progress: 100, error: null });
        toast.success(`${files.length} files uploaded successfully`);

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload files';
        setState({ uploading: false, progress: 0, error: errorMessage });
        toast.error(errorMessage);
        return null;
      }
    },
    [validateFile]
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
