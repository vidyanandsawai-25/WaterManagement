// ============================================
// API CONFIGURATION
// ============================================

/**
 * API Base URLs - These should be configured in environment variables
 */
export const API_CONFIG = {
  // Base URL for the .NET microservices
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  
  // Individual microservice endpoints (if using separate services)
  APPLICATIONS_SERVICE: process.env.NEXT_PUBLIC_APPLICATIONS_API_URL || 'http://localhost:5001/api',
  AUTH_SERVICE: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:5002/api',
  FILE_SERVICE: process.env.NEXT_PUBLIC_FILE_API_URL || 'http://localhost:5003/api',
  USERS_SERVICE: process.env.NEXT_PUBLIC_USERS_API_URL || 'http://localhost:5004/api',
  
  // API Timeout
  TIMEOUT: 30000, // 30 seconds
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Applications
  APPLICATIONS: {
    LIST: '/applications',
    GET_BY_ID: (id: string) => `/applications/${id}`,
    CREATE: '/applications',
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
    ALLOCATE: '/applications/allocate',
    BULK_UPDATE: '/applications/bulk-update',
    STATS: '/applications/stats',
    EXPORT: '/applications/export',
  },
  
  // Files
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (fileName: string) => `/files/download/${fileName}`,
    DELETE: (fileName: string) => `/files/${fileName}`,
  },
  
  // Users/Employees
  USERS: {
    LIST: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    SEARCH: '/users/search',
  },
  
  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITIES: '/dashboard/activities',
  },
} as const;

/**
 * HTTP Methods
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'akola_access_token',
  REFRESH_TOKEN: 'akola_refresh_token',
  USER_DATA: 'akola_user_data',
} as const;

/**
 * API Error Messages
 */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
