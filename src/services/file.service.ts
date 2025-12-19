// ============================================
// FILE SERVICE - File Upload/Download
// ============================================

import { apiService } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import { ApiResponse, FileUploadResponse } from '@/types';

/**
 * File Service
 * Handles file uploads and downloads
 */
class FileService {
  /**
   * Upload a single file
   */
  async uploadFile(file: File): Promise<ApiResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiService.uploadFile<ApiResponse<FileUploadResponse>>(
      API_ENDPOINTS.FILES.UPLOAD,
      formData
    );
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: File[]
  ): Promise<ApiResponse<FileUploadResponse[]>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    return apiService.uploadFile<ApiResponse<FileUploadResponse[]>>(
      API_ENDPOINTS.FILES.UPLOAD,
      formData
    );
  }

  /**
   * Download file
   */
  async downloadFile(fileName: string): Promise<Blob> {
    const response = await fetch(
      `${apiService['baseURL']}${API_ENDPOINTS.FILES.DOWNLOAD(fileName)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('akola_access_token')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    return response.blob();
  }

  /**
   * Delete file
   */
  async deleteFile(fileName: string): Promise<ApiResponse<void>> {
    return apiService.delete<ApiResponse<void>>(
      API_ENDPOINTS.FILES.DELETE(fileName)
    );
  }

  /**
   * Get file URL for preview
   */
  getFileUrl(fileName: string): string {
    return `${apiService['baseURL']}${API_ENDPOINTS.FILES.DOWNLOAD(fileName)}`;
  }

  /**
   * Validate file before upload
   */
  validateFile(
    file: File,
    maxSizeMB: number = 10,
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']
  ): { valid: boolean; error?: string } {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    return { valid: true };
  }
}

export const fileService = new FileService();
