// Application configuration

export const appConfig = {
  name: 'Panvel Municipal Corporation',
  shortName: 'PMC',
  description: 'Water Tax Management Portal',
  version: '1.0.0',
  
  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: 30000,
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
  },
  
  // File Upload
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'],
  },
  
  // Date Format
  dateFormat: {
    display: 'DD/MM/YYYY',
    displayWithTime: 'DD/MM/YYYY HH:mm',
    api: 'YYYY-MM-DD',
  },
  
  // Application Types
  applicationTypes: {
    new_connection: 'New Connection',
    mutation: 'Mutation',
    alteration: 'Alteration',
    disconnection: 'Disconnection',
  },
  
  // Application Status
  applicationStatus: {
    pending_approval: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
    pending_payment: 'Pending Payment',
    payment_completed: 'Payment Completed',
    in_progress: 'In Progress',
    completed: 'Completed',
  },
  
  // Zones
  zones: [
    { value: 'zone-a', label: 'Zone A' },
    { value: 'zone-b', label: 'Zone B' },
    { value: 'zone-c', label: 'Zone C' },
    { value: 'zone-d', label: 'Zone D' },
  ],
  
  // Connection Types
  connectionTypes: [
    { value: 'domestic', label: 'Domestic' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'institutional', label: 'Institutional' },
  ],
  
  // Property Types
  propertyTypes: [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'mixed', label: 'Mixed Use' },
  ],
} as const;
