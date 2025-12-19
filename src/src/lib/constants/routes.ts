// Application route constants

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  APPLICATIONS: {
    LIST: '/applications',
    NEW: '/applications/new',
    DETAILS: (id: string) => `/applications/${id}`,
    EDIT: (id: string) => `/applications/${id}/edit`,
  },
  PAYMENTS: {
    LIST: '/payments',
    DETAILS: (id: string) => `/payments/${id}`,
  },
  REPORTS: {
    INDEX: '/reports',
    ZONEWISE: '/reports/zonewise',
    DOWNLOAD: '/reports/download',
  },
  NOTESHEETS: {
    LIST: '/notesheets',
    DETAILS: (id: string) => `/notesheets/${id}`,
  },
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export const API_ROUTES = {
  APPLICATIONS: {
    BASE: '/api/applications',
    BY_ID: (id: string) => `/api/applications/${id}`,
    APPROVE: (id: string) => `/api/applications/${id}/approve`,
    REJECT: (id: string) => `/api/applications/${id}/reject`,
  },
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id: string) => `/api/payments/${id}`,
    APPROVE: (id: string) => `/api/payments/${id}/approve`,
  },
  NOTESHEETS: {
    BASE: '/api/notesheets',
    BY_ID: (id: string) => `/api/notesheets/${id}`,
  },
  UPLOAD: {
    FILE: '/api/upload',
    MULTIPLE: '/api/upload/multiple',
  },
  REPORTS: {
    GENERATE: '/api/reports/generate',
    DOWNLOAD: '/api/reports/download',
  },
} as const;
