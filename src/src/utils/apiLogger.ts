/**
 * API Logger Utility
 * Provides beautiful, clear console logging for all API calls
 */

const colors = {
  info: '#3B82F6',      // Blue
  success: '#10B981',   // Green
  error: '#EF4444',     // Red
  warning: '#F59E0B',   // Orange
  request: '#8B5CF6',   // Purple
  response: '#06B6D4',  // Cyan
};

interface LogOptions {
  method: string;
  url: string;
  data?: any;
  response?: any;
  status?: number;
  error?: any;
}

/**
 * Log API Request Start
 */
export function logApiRequest(title: string, options: LogOptions) {
  console.log('\n' + '='.repeat(80));
  console.log(
    `%c🚀 ${title.toUpperCase()}`,
    `color: white; background: ${colors.request}; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 14px;`
  );
  console.log('='.repeat(80));
  
  console.log(
    `%c📤 REQUEST`,
    `color: ${colors.request}; font-weight: bold;`
  );
  console.log(`   Method: %c${options.method}`, `color: ${colors.info}; font-weight: bold;`);
  console.log(`   URL: %c${options.url}`, `color: ${colors.info};`);
  
  if (options.data) {
    console.log(`   Data:`, options.data);
  }
  
  console.log('─'.repeat(80));
}

/**
 * Log API Response Success
 */
export function logApiSuccess(title: string, options: LogOptions) {
  console.log(
    `%c📥 RESPONSE - SUCCESS`,
    `color: ${colors.success}; font-weight: bold;`
  );
  console.log(`   Status: %c${options.status || 200}`, `color: ${colors.success}; font-weight: bold;`);
  
  if (options.response) {
    console.log(`   Response:`, options.response);
  }
  
  console.log(
    `%c✅ ${title.toUpperCase()} - COMPLETED SUCCESSFULLY`,
    `color: white; background: ${colors.success}; padding: 4px 8px; border-radius: 3px; font-weight: bold;`
  );
  console.log('='.repeat(80) + '\n');
}

/**
 * Log API Response Error
 */
export function logApiError(title: string, options: LogOptions) {
  console.log(
    `%c📥 RESPONSE - ERROR`,
    `color: ${colors.error}; font-weight: bold;`
  );
  console.log(`   Status: %c${options.status || 'N/A'}`, `color: ${colors.error}; font-weight: bold;`);
  
  if (options.error) {
    console.log(`   Error:`, options.error);
  }
  
  console.log(
    `%c❌ ${title.toUpperCase()} - FAILED`,
    `color: white; background: ${colors.error}; padding: 4px 8px; border-radius: 3px; font-weight: bold;`
  );
  console.log('='.repeat(80) + '\n');
}

/**
 * Log Operation Start (non-API)
 */
export function logOperationStart(title: string, details?: any) {
  console.log('\n' + '='.repeat(80));
  console.log(
    `%c⚡ ${title.toUpperCase()}`,
    `color: white; background: ${colors.info}; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 14px;`
  );
  
  if (details) {
    console.log('   Details:', details);
  }
  
  console.log('─'.repeat(80));
}

/**
 * Log Operation Complete
 */
export function logOperationComplete(title: string, result?: any) {
  if (result) {
    console.log('   Result:', result);
  }
  
  console.log(
    `%c✅ ${title.toUpperCase()} - COMPLETED`,
    `color: white; background: ${colors.success}; padding: 4px 8px; border-radius: 3px; font-weight: bold;`
  );
  console.log('='.repeat(80) + '\n');
}

/**
 * Log Page Load
 */
export function logPageLoad(pageName: string) {
  console.log('\n\n' + '█'.repeat(80));
  console.log(
    `%c🏛️ ${pageName.toUpperCase()} - PAGE LOADED`,
    `color: white; background: #0A4D9E; padding: 8px 16px; border-radius: 3px; font-weight: bold; font-size: 16px;`
  );
  console.log('█'.repeat(80) + '\n');
}

/**
 * Log Section Header
 */
export function logSection(title: string) {
  console.log('\n' + '─'.repeat(80));
  console.log(
    `%c📋 ${title}`,
    `color: ${colors.info}; font-weight: bold; font-size: 13px;`
  );
  console.log('─'.repeat(80));
}

/**
 * Predefined API operation loggers
 */
export const apiOperations = {
  // Registration
  registration: {
    start: (data: any) => logApiRequest('Registration Application', {
      method: 'POST',
      url: '/api/applications',
      data
    }),
    success: (response: any) => logApiSuccess('Registration Successful', {
      status: 201,
      response
    }),
    error: (error: any) => logApiError('Registration Failed', {
      status: 400,
      error
    })
  },
  
  // Fetch Applications
  fetchApplications: {
    start: () => logApiRequest('Fetch Applications', {
      method: 'GET',
      url: '/api/applications'
    }),
    success: (response: any) => logApiSuccess('Applications Fetched Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Fetch Applications Failed', {
      status: 500,
      error
    })
  },
  
  // Update Application
  updateApplication: {
    start: (id: any, data: any) => logApiRequest('Update Application', {
      method: 'PUT',
      url: `/api/applications/${id}`,
      data
    }),
    success: (response: any) => logApiSuccess('Application Updated Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Update Application Failed', {
      status: 400,
      error
    })
  },
  
  // Delete Application
  deleteApplication: {
    start: (id: any) => logApiRequest('Delete Application', {
      method: 'DELETE',
      url: `/api/applications/${id}`
    }),
    success: (response: any) => logApiSuccess('Application Deleted Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Delete Application Failed', {
      status: 400,
      error
    })
  },
  
  // Approve Application
  approveApplication: {
    start: (id: any, data?: any) => logApiRequest('Approve Application', {
      method: 'POST',
      url: `/api/applications/${id}/approve`,
      data
    }),
    success: (response: any) => logApiSuccess('Application Approved Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Approve Application Failed', {
      status: 400,
      error
    })
  },
  
  // Allocate Application
  allocateApplication: {
    start: (data: any) => logApiRequest('Allocate Application', {
      method: 'POST',
      url: '/api/applications/allocate',
      data
    }),
    success: (response: any) => logApiSuccess('Application Allocated Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Allocate Application Failed', {
      status: 400,
      error
    })
  },
  
  // Upload Notesheet
  uploadNotesheet: {
    start: (id: any, data: any) => logApiRequest('Upload Notesheet', {
      method: 'POST',
      url: `/api/applications/${id}/notesheet`,
      data
    }),
    success: (response: any) => logApiSuccess('Notesheet Uploaded Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Upload Notesheet Failed', {
      status: 400,
      error
    })
  },
  
  // Make Payment
  makePayment: {
    start: (id: any, data: any) => logApiRequest('Make Payment', {
      method: 'POST',
      url: `/api/applications/${id}/payment`,
      data
    }),
    success: (response: any) => logApiSuccess('Payment Completed Successfully', {
      status: 200,
      response
    }),
    error: (error: any) => logApiError('Payment Failed', {
      status: 400,
      error
    })
  }
};
