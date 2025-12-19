'use server';

import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getApplications(filters?: {
  status?: string;
  type?: string;
  zone?: string;
  search?: string;
}) {
  try {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.zone) params.append('zone', filters.zone);
    if (filters?.search) params.append('search', filters.search);
    
    const url = `${API_BASE_URL}/api/applications${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // Always fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }
    
    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in getApplications:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch applications' 
    };
  }
}

export async function getApplicationById(id: string) {
  try {
    const url = `${API_BASE_URL}/api/applications/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Application not found');
    }
    
    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in getApplicationById:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch application' 
    };
  }
}

export async function createApplication(data: any) {
  try {
    const url = `${API_BASE_URL}/api/applications`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create application');
    }
    
    const result = await response.json();
    
    // Revalidate pages that display applications
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in createApplication:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create application' 
    };
  }
}

export async function updateApplication(id: string, data: any) {
  try {
    const url = `${API_BASE_URL}/api/applications/${id}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update application');
    }
    
    const result = await response.json();
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in updateApplication:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update application' 
    };
  }
}

export async function patchApplication(id: string, data: any) {
  try {
    const url = `${API_BASE_URL}/api/applications/${id}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update application');
    }
    
    const result = await response.json();
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in patchApplication:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update application' 
    };
  }
}

export async function deleteApplication(id: string) {
  try {
    const url = `${API_BASE_URL}/api/applications/${id}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete application');
    }
    
    const result = await response.json();
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in deleteApplication:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete application' 
    };
  }
}

export async function bulkUpdateApplications(ids: string[], updates: any) {
  try {
    const url = `${API_BASE_URL}/api/applications`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, updates }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update applications');
    }
    
    const result = await response.json();
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, count: result.count };
  } catch (error) {
    console.error('Error in bulkUpdateApplications:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update applications' 
    };
  }
}

export async function bulkDeleteApplications(ids: string[]) {
  try {
    const url = `${API_BASE_URL}/api/applications?ids=${ids.join(',')}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete applications');
    }
    
    const result = await response.json();
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/dashboard');
    
    return { success: true, count: result.count };
  } catch (error) {
    console.error('Error in bulkDeleteApplications:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete applications' 
    };
  }
}
